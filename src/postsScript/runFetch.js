import { fetchInstagramPosts } from "./postsScript.js";

const INSTAGRAM_USER_ID = "ron_mordo";
const ACCESS_TOKEN =
  "EAATipd6s1goBOyPUtYwSlJVbu8RYWRybXlKS6pPX5I5XzMSK04iPZB8T1yAqaZB88cvGb0FciARyVq6GNFs43Wq7k2ANx4AIHluPppCK7CWfeH1wFcyIA8XKLxxPfWMosaUUZCZCJdXzhZAunRbFSjMooQ4pLry9QTxqsexHtn8vup0HWPutejcZBeZAIekt2lwLg8wOJZALaUnYcEMCrO64mpJv7RcZD";

fetchInstagramPosts(
  INSTAGRAM_USER_ID,
  ACCESS_TOKEN,
  "public/soldiersData.json"
);
