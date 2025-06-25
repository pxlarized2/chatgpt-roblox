const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post('/recommend', async (req, res) => {
  const userInput = req.body.message;

  const prompt = `The user said: "${userInput}". Suggest a fun Roblox game ID with a short explanation (like genre). Respond only in JSON format like this:
  {
    "gameName": "Brookhaven",
    "gameId": 4924922222,
    "reason": "It’s a popular roleplaying game"
  }`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiReply = response.data.choices[0].message.content;
    const json = JSON.parse(aiReply);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).send("AI Error");
  }
});

app.listen(3000, () => console.log('AI server running on port 3000'));
