import process from "process";

const { TELEGRAM_TOKEN } = process.env;

export const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export const URI = `/webhook/${TELEGRAM_TOKEN}`;

export const webhookURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NGROK_SERVER_URL}${URI}`
    : `${process.env.RENDER_SERVER_URL}${URI}`;
