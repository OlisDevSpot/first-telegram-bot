import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const { TELEGRAM_TOKEN } = process.env;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const URI = `/webhook/${TELEGRAM_TOKEN}`;
const webhookURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NGROK_SERVER_URL}${URI}`
    : `${process.env.RENDER_SERVER_URL}${URI}`;

const init = async () => {
  const response = await axios.get(
    `${TELEGRAM_API_URL}/setWebhook?url=${webhookURL}`
  );
  console.log(response.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body.message);
  const message = req.body.message;

  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: message.chat.id,
    text: message.text,
  });

  res.sendStatus(200);
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await init();
});
