import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.VITE_INSTAGRAM_API_KEY;
const IG_USER_ID = process.env.VITE_IG_USERID;
const INPUT_PATH = "public/soldiersData/soldiersData.json";

async function fetchJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(`${data.error.message}`);
  return data;
}

async function fetchAllMedia(igUserId) {
  let url = `https://graph.facebook.com/v18.0/${igUserId}/media?fields=id,media_url,permalink&access_token=${ACCESS_TOKEN}`;
  let allPosts = [];

  while (url) {
    const response = await fetchJSON(url);
    if (response.data) allPosts.push(...response.data);
    url = response.paging?.next ?? null;

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return allPosts;
}

async function updateImageSources() {
  try {
    if (!fs.existsSync(INPUT_PATH)) {
      throw new Error("Existing data file not found.");
    }

    const existingData = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));
    const updatedPosts = await fetchAllMedia(IG_USER_ID);

    const permalinkToMedia = new Map();
    for (const post of updatedPosts) {
      permalinkToMedia.set(post.permalink, post.media_url);
    }

    const updatedData = existingData.map((soldier) => {
      const updatedSrc = permalinkToMedia.get(soldier.permalink);
      return updatedSrc ? { ...soldier, imgSrc: updatedSrc } : soldier;
    });

    fs.writeFileSync(INPUT_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    console.log(`Updated imgSrc for ${updatedData.length} entries.`);
  } catch (err) {
    console.error("Update failed:", err.message);
  }
}

updateImageSources();
