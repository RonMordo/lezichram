import fetch from "node-fetch";
import { Buffer } from "buffer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { extractNameFromImage } from "./extractNameFromImage.js";

dotenv.config();

//–– Config & clients
const ACCESS_TOKEN = process.env.VITE_INSTAGRAM_API_KEY;
const IG_USER_ID = process.env.VITE_IG_USERID;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Starting script");
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
    const { data, paging } = await fetchJSON(url);
    all.push(...data);
    url = paging?.next || null;
    console.log(`  ↳ Fetched ${data.length} posts, total so far ${all.length}`);
    await new Promise((r) => setTimeout(r, 300));
  }
  return all;
}

function extractHashtags(caption = "") {
  return caption.match(/#[\wא-ת0-9]+/g) || [];
}

async function run() {
  console.log("1) Fetching all media…");
  let insertedPostsCount = 0;
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

    // 3) Check duplicate
    const { data: exists, error: chkErr } = await supabase
      .from("posts")
      .select("permalink")
      .eq("permalink", post.permalink)
      .maybeSingle();
    if (chkErr) {
      console.error("Error checking DB:", chkErr);
      continue;
    }
    if (exists) {
      console.log("Already in DB, skipping");
      continue;
    }

    // 4) Determine name
    let name = null;
    const match = (post.caption || "").match(/^(.*?)\s+ז["״׳’']{0,2}ל/);
    if (match) {
      name = match[1].trim();
      console.log("Found name in caption:", name);
    } else {
      console.log("No name in caption, calling GPT…");
      await new Promise((r) => setTimeout(r, 1500));
      name = await extractNameFromImage(post.media_url);
      console.log("GPT returned name:", name);
    }

    // 5) Download image
    let buffer, contentType;
    try {
      console.log("Downloading image from:", post.media_url);
      const res = await fetch(post.media_url);
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
    console.log("Uploading to bucket as:", fileName);
    const { data: upData, error: upErr } = await supabase.storage
      .from("post-images")
      .upload(fileName, buffer, { contentType });
    if (upErr) {
      console.error("Storage upload error:", upErr);
      continue;
    }
    const key = upData.Key;
    const { data: urlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(key);
    console.log("Uploaded → publicURL:", urlData.publicUrl);

    // 7) Insert row
    console.log("Inserting row into posts table…");
    const { error: insErr } = await supabase.from("posts").insert([
      {
        name,
        caption: post.caption,
        img_url: urlData.publicUrl,
        like_count: post.like_count,
        comments_count: post.comments_count,
        permalink: post.permalink,
      },
    ]);
    if (insErr) {
      console.error("Insert error:", insErr);
      insertedPostsCount++;
    } else {
      console.log("Inserted:", post.permalink);
    }
  }

  console.log("\nDone.");
  console.log(`Inserted: ${insertedPostsCount}, new posts.`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
});
