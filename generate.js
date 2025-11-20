import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Accept either single message or chat history
    const messages = req.body.messages || [{ role: 'user', content: req.body.message || '' }];

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: messages
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
