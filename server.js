import process from "process";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";

import messageRouter from "./routes/message.route.js";
import { fetchTokens } from "./lib/fetchTokens.js";
import { TELEGRAM_API_URL, webhookURL, URI } from "./telegram.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const init = async () => {
  const response = await axios.get(
    `${TELEGRAM_API_URL}/setWebhook?url=${webhookURL}`
  );
  console.log(response.data);
  setInterval(() => fetchTokens(), 1500);
};

app.use(express.json());
app.use(URI, messageRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await init();
});
