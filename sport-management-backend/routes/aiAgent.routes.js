import express from "express";
import OpenAI from "openai";

// console.log("API key loaded?", process.env.OPENAI_API_KEY);


const router = express.Router();

// Init OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /ai/ask
router.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;

    // Example: later you can fetch DB context (players, clubs, etc.)
    // const players = await Player.find();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Sportbit AI, a sports management assistant. Provide clear, data-driven, concise recommendations." },
        { role: "user", content: query },
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI Agent error:", error);
    res.status(500).json({ error: "Failed to process query" });
  }
});

export default router;
