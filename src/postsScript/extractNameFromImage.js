import fetch from "node-fetch";
import { config } from "dotenv";

config();
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

export async function extractNameFromImage(imageUrl) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "This is a memorial image of a fallen Israeli soldier. Please extract and return only the full name of the person being remembered, in Hebrew. No extra text.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 50,
      }),
    });

    const data = await response.json();

    console.log("🔍 OpenAI response:", JSON.stringify(data, null, 2));

    const name = data?.choices?.[0]?.message?.content?.trim();
    return name || "שם לא ידוע";
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    return "שם לא ידוע";
  }
}
