const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/ask', async (req, res) => {
  const userInput = req.body.query;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: "You're an assistant that extracts Roblox game search keywords." },
        { role: 'user', content: `Find keywords from this game idea: "${userInput}"` },
      ],
    });

    const keywords = response.choices[0].message.content.trim();
    res.json({ keywords });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI server running on http://localhost:${PORT}`);
});
