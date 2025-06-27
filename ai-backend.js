require('dotenv').config(); // Load .env file
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Uses key from .env
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Switched to a more reliable model
      messages: [{ role: 'user', content: message }],
    });

    const aiReply = response.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'AI failed to respond. Check server logs.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
