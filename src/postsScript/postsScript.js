import fetch from "node-fetch";
import { Buffer } from "buffer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

//–– Config & clients
const ACCESS_TOKEN = process.env.VITE_INSTAGRAM_API_KEY;
const IG_USER_ID = process.env.VITE_IGUSERID;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET_NAME = "post-images";
const FOLDER_NAME = "posts"; // ✅ target subfolder
const BUCKET_URL_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${FOLDER_NAME}/`;

console.log("Starting script...");
console.log({
  ACCESS_TOKEN: !!ACCESS_TOKEN,
  IG_USER_ID,
  SUPABASE_URL: !!SUPABASE_URL,
  SERVICE_KEY: !!SERVICE_KEY,
});

if (!ACCESS_TOKEN || !IG_USER_ID || !SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing one of the required env vars!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

//–– Helpers
async function fetchJSON(url) {
  console.log("→ Fetching URL:", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

async function fetchAllMedia(igUserId) {
  let url =
    `https://graph.facebook.com/v18.0/${igUserId}/media` +
    `?fields=id,caption,media_url,like_count,comments_count,permalink` +
    `&access_token=${ACCESS_TOKEN}`;
  const all = [];

  while (url) {
    try {
      const { data, paging } = await fetchJSON(url);
      all.push(...data);
      url = paging?.next || null;
      console.log(
        `  ↳ Fetched ${data.length} posts, total so far ${all.length}`
      );
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error("⚠️ Error fetching page:", err.message);
      console.warn("⚠️ Stopping pagination early.");
      break; // safe exit on server error
    }
  }

  return all;
}

function extractHashtags(caption = "") {
  return caption.match(/#[\wא-ת0-9]+/g) || [];
}

async function run() {
  console.log("1) Fetching all media…");
  const posts = await fetchAllMedia(IG_USER_ID);
  console.log(`→ Total posts fetched: ${posts.length}`);

  console.log("2) Filtering by #חללזכרונות…");
  const soldiers = posts.filter((p) =>
    extractHashtags(p.caption).includes("#חללזכרונות")
  );
  console.log(`→ ${soldiers.length} posts matched the hashtag`);

  for (const post of soldiers) {
    console.log("\n---");
    console.log("Post permalink:", post.permalink);

    // 3) Check if post already exists
    const { data: existingPost, error: chkErr } = await supabase
      .from("posts")
      .select("id, img_url")
      .eq("permalink", post.permalink)
      .maybeSingle();

    if (chkErr) {
      console.error("Error checking DB:", chkErr);
      continue;
    }

    if (existingPost) {
      console.log("Post exists in DB, checking img_url...");

      if (existingPost.img_url?.startsWith(BUCKET_URL_PREFIX)) {
        console.log("✅ img_url is already from Supabase bucket. Skipping.");
        continue;
      } else {
        console.log("⚠️ img_url is NOT from Supabase. Will re-upload and fix.");
      }
    }

    // 4) Determine name
    let name = null;
    const match = (post.caption || "").match(/^(.*?)\s+ז["״׳’']{0,2}ל/);
    if (match) {
      name = match[1].trim();
      console.log("Found name in caption:", name);
    } else {
      console.log("Could not extract name.");
      name = "UnNamed";
    }

    // 5) Download image
    let buffer, contentType;
    try {
      console.log("Downloading image from:", post.media_url);
      const res = await fetch(post.media_url);
      if (!res.ok) {
        console.error(`Failed to download image. HTTP status ${res.status}`);
        continue;
      }
      contentType = res.headers.get("content-type");
      const array = await res.arrayBuffer();
      buffer = Buffer.from(array);
    } catch (e) {
      console.error("Failed to download image:", e);
      continue;
    }

    // 6) Upload to storage
    const ext = contentType?.split("/")[1] || "jpg";
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    console.log(
      "Uploading to Supabase Storage as:",
      `${FOLDER_NAME}/${fileName}`
    );

    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`${FOLDER_NAME}/${fileName}`, buffer, { contentType });

    if (uploadErr) {
      console.error("Storage upload error:", uploadErr);
      continue;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`${FOLDER_NAME}/${fileName}`);
    const publicUrl = publicUrlData?.publicUrl;

    console.log("Image uploaded. Public URL:", publicUrl);

    // 7) Insert or Update row
    if (existingPost) {
      console.log("Updating existing post...");
      const { error: updateErr } = await supabase
        .from("posts")
        .update({ img_url: publicUrl })
        .eq("id", existingPost.id);

      if (updateErr) {
        console.error("Update error:", updateErr);
      } else {
        console.log("✅ Post updated successfully.");
      }
    } else {
      console.log("Inserting new post...");
      const { error: insertErr } = await supabase.from("posts").insert([
        {
          name,
          caption: post.caption,
          img_url: publicUrl,
          like_count: post.like_count,
          comments_count: post.comments_count,
          permalink: post.permalink,
        },
      ]);

      if (insertErr) {
        console.error("Insert error:", insertErr);
      } else {
        console.log("✅ Post inserted successfully.");
      }
    }
  }

  console.log("\n✅ Script finished.");
}

run().catch((err) => {
  console.error("Fatal error:", err);
});
