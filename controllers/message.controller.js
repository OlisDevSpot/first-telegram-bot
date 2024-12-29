import axios from "axios";
import process from "process";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

const { TELEGRAM_TOKEN } = process.env;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export const onReceiveMessage = async (req, res) => {
  console.log(util.inspect(req.body, false, null, true));
  const message = req.body?.message;

  if (message?.chat) {
    console.log(req.body.message);
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: message.chat.id,
      text: message.text,
    });
  }
  console.log("message received!");
  res.status(200).json({ message: "ok" });
};

export const sendMessage = async (req, res) => {
  //   console.log(util.inspect(req.body, false, null, true));
  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: req.body.chat_id,
    text: req.body.text,
    parse_mode: "MarkdownV2",
  });

  res.sendStatus(200);
};

export const getWebhookInfo = async (req, res) => {
  console.log(util.inspect(req.body, false, null, true));
  try {
    const info = await axios
      .post(`${TELEGRAM_API_URL}/getWebhookInfo`)
      .then((res) => res.data);
    console.log(info);

    res.status(200).json(info);
  } catch (e) {
    console.log("something went wrong: ", e);
  }
};
