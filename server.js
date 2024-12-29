import util from "util";
import process from "process";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";

import messageRouter from "./routes/message.route.js";
import { getTokens } from "./lib/getTokens.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
  setInterval(() => getTokens(), 1500);
};

app.use(express.json());
app.use(URI, messageRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await init();
});
