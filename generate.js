import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { prompt } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.status(200).json({
      success: true,
      output: response.output_text
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
