const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct way to use an environment variable for your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const userInput = req.body.query;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're an assistant that extracts Roblox game search keywords." },
        { role: "user", content: `Find keywords from this game idea: "${userInput}"` }
      ],
    });

    const keywords = response.data.choices[0].message.content.trim();
    res.json({ keywords });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

// ✅ Use the port Render provides, or default to 3000 for local dev
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI server running on http://localhost:${PORT}`);
});
