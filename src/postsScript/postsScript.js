import fetch from "node-fetch";
import { Buffer } from "buffer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

//–– Config & clients
const ACCESS_TOKEN = process.env.VITE_INSTAGRAM_API_KEY;
const IG_USER_ID = process.env.VITE_IG_USERID;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET_NAME = "post-images";
const FOLDER_NAME = "posts";
const BUCKET_URL_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${FOLDER_NAME}/`;

if (!ACCESS_TOKEN || !IG_USER_ID || !SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing one of the required env vars!");
  console.log(ACCESS_TOKEN, IG_USER_ID, SUPABASE_URL, SERVICE_KEY);
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
      console.log(
        `  ↳ Fetched ${data.length} posts, total so far ${all.length}`
      );
      url = paging?.next || null;
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error("⚠️ Error fetching page:", err.message);
      console.warn("⚠️ Stopping pagination early.");
      break;
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

  console.log("2) Filtering by #חללזכרונות…");
  const soldiers = posts.filter((p) =>
    extractHashtags(p.caption).includes("#חללזכרונות")
  );
  console.log(`→ ${soldiers.length} posts matched the hashtag`);

  for (const post of soldiers) {
    console.log("\n---\nPost:", post.permalink);

    // 1) Check if post exists in DB
    const { data: existing, error: chkErr } = await supabase
      .from("posts")
      .select("id, img_url")
      .eq("permalink", post.permalink)
      .maybeSingle();

    if (chkErr) {
      console.error("DB check error:", chkErr);
      continue;
    }

    const updateFields = {
      like_count: post.like_count,
      comments_count: post.comments_count,
    };

    if (existing) {
      console.log("→ Existing post: updating counts…");

      if (!existing.img_url?.startsWith(BUCKET_URL_PREFIX)) {
        console.log("  • img_url not in bucket → re-uploading image");

        let name = "UnNamed";
        const m = (post.caption || "").match(/^(.*?)\s+ז["״׳’']{0,2}ל/);
        if (m) name = m[1].trim();

        try {
          const res = await fetch(post.media_url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buffer = Buffer.from(await res.arrayBuffer());
          const contentType = res.headers.get("content-type");
          const ext = contentType?.split("/")[1] || "jpg";
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 8)}.${ext}`;

          const { error: upErr } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(`${FOLDER_NAME}/${fileName}`, buffer, { contentType });
          if (upErr) throw upErr;

          const { data: pu } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(`${FOLDER_NAME}/${fileName}`);
          updateFields.img_url = pu.publicUrl;
          console.log("  • Uploaded new image:", pu.publicUrl);
        } catch (err) {
          console.error("  • Image re-upload failed:", err);
        }
      }

      const { error: updErr } = await supabase
        .from("posts")
        .update(updateFields)
        .eq("id", existing.id);

      if (updErr) {
        console.error("  • update error:", updErr);
      } else {
        console.log("✅ Counts (and image if re-uploaded) updated.");
      }
    } else {
      console.log("→ New post: inserting…");
      let name = "UnNamed";
      const m = (post.caption || "").match(/^(.*?)\s+ז["״׳’']{0,2}ל/);
      if (m) name = m[1].trim();

      let buffer, contentType;
      try {
        const res = await fetch(post.media_url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        contentType = res.headers.get("content-type");
        buffer = Buffer.from(await res.arrayBuffer());
      } catch (err) {
        console.error("  • download failed:", err);
        continue;
      }

      const ext = contentType?.split("/")[1] || "jpg";
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${FOLDER_NAME}/${fileName}`, buffer, { contentType });
      if (upErr) {
        console.error("  • upload error:", upErr);
        continue;
      }
      const { data: pu } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(`${FOLDER_NAME}/${fileName}`);

      const { error: insErr } = await supabase.from("posts").insert([
        {
          name,
          caption: post.caption,
          img_url: pu.publicUrl,
          like_count: post.like_count,
          comments_count: post.comments_count,
          permalink: post.permalink,
        },
      ]);

      if (insErr) {
        console.error("  • insert error:", insErr);
      } else {
        console.log("✅ New post inserted with caption.");
      }
    }
  }

  console.log("\n✅ Script finished.");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
