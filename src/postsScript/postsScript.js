import fetch from "node-fetch";
import fs from "fs";
import { extractNameFromImage } from "./extractNameFromImage.js";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.VITE_INSTAGRAM_API_KEY;
const IG_USER_ID = process.env.VITE_IG_USERID;
const OUTPUT_PATH = "public/soldiersData/soldiersData.json";

async function fetchJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(`${data.error.message}`);
  }
  return data;
}

async function fetchAllMedia(igUserId) {
  let url = `https://graph.facebook.com/v18.0/${igUserId}/media?fields=id,caption,media_url,like_count,comments_count,permalink&access_token=${ACCESS_TOKEN}`;
  let allPosts = [];

  while (url) {
    const response = await fetchJSON(url);
    if (response.data) {
      allPosts.push(...response.data);
    }
    url = response.paging?.next ?? null;

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return allPosts;
}

async function fetchInstagramPosts() {
  try {
    if (!fs.existsSync("public")) fs.mkdirSync("public");

    const posts = await fetchAllMedia(IG_USER_ID);
    function extractHashtags(caption = "") {
      return caption.match(/#[\wא-ת0-9]+/g) || [];
    }
    console.log(posts.length);
    const soldiers = await Promise.all(
      posts
        .filter((post) => extractHashtags(post.caption).includes("#חללזכרונות"))
        .map(async (post) => {
          const caption = post.caption ?? "";
          const nameMatch = caption.match(/^(.*?)\s+ז["״׳’']{0,2}ל/);
          let name = nameMatch ? nameMatch[1].trim() : null;

          if (!name) {
            console.log(`No name in caption, using GPT for: ${post.media_url}`);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            name = await extractNameFromImage(post.media_url);
          }

          return {
            name,
            caption,
            imgSrc: post.media_url,
            likeCount: post.like_count,
            commentsCount: post.comments_count,
            permalink: post.permalink,
          };
        })
    );
    console.log(soldiers.length);

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(soldiers, null, 2), "utf-8");
    console.log(`Saved ${soldiers.length} soldiers to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fetchInstagramPosts();
