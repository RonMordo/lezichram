import fetch from "node-fetch";
import fs from "fs";

// Replace with your access token
const ACCESS_TOKEN =
  "EAARFqvyaChQBO7ygsjZAkGq6uYabhZAn6X5riJZBYCKIirZBESR5aYqpMtfPIdG7iDroTEohKKzGZArQLPn58ZCNmDF8Dgs28ZBsW5AiDeTZBCruVpTzouThn7OOG5ZBPoToyM1nQjTAxpy4m12BT2EcTX6EdgRvOxcw8zJw2e0fFZCjZANoKAoBsZA35NY5sdgOqW2aZAQPlTsKYcUc1tYMQ3KXRxWsE0ZBc0PSF203bQ199h";
const IG_USER_ID = "17841453211543989";
const OUTPUT_PATH = "public/soldiersData.json";

async function fetchJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(`${data.error.message}`);
  }
  return data;
}

async function fetchAllMedia(igUserId) {
  let url = `https://graph.facebook.com/v18.0/${igUserId}/media?fields=id,caption,media_url,media_type,like_count,permalink,timestamp&access_token=${ACCESS_TOKEN}`;
  let allPosts = [];

  while (url) {
    const response = await fetchJSON(url);
    if (response.data) {
      allPosts.push(...response.data);
    }
    url = response.paging?.next ?? null;

    // Optional: rate limit to avoid hitting API caps
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return allPosts;
}

async function fetchInstagramPosts() {
  try {
    if (!fs.existsSync("public")) fs.mkdirSync("public");

    const posts = await fetchAllMedia(IG_USER_ID);

    const soldiers = posts
      .filter((post) => post.caption?.includes('ז"ל'))
      .map((post) => {
        const nameMatch = post.caption.match(/^(.*?) ז"ל/);
        const name = nameMatch ? nameMatch[1].trim() : "שם לא ידוע";

        return {
          name,
          caption: post.caption,
          imgSrc: post.media_url,
          likeCount: post.like_count,
          permalink: post.permalink,
        };
      });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(soldiers, null, 2), "utf-8");
    console.log(`✅ Saved ${soldiers.length} soldiers to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

fetchInstagramPosts();
