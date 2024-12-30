import process from "process";
import dotenv from "dotenv";
import axios from "axios";
import { getToken } from "./getToken.js";
import { addToken, getCurrentDBTokens } from "../db/queries/tokenQueries.js";

dotenv.config();

const { TELEGRAM_TOKEN } = process.env;
const url = "https://api.dexscreener.com/token-boosts/latest/v1";

async function alertNewToken(tokenProfile, tokenBoostInfo) {
  addToken(tokenProfile);
  let secondPosted = new Date().getSeconds();
  const baseToken = tokenProfile.pairs[0].baseToken;
  const { address, name } = baseToken;
  const boostAmount = tokenBoostInfo.amount;
  const volume = tokenProfile.pairs[0].volume.h24;
  const formattedVolume = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(volume);

  const text = `*[${name}](${tokenProfile.pairs[0].url})*\n${address}\nVolume \\(24h\\): *${formattedVolume}*\n\nSpent: *${boostAmount}*\nPosted: ${secondPosted} seconds`;
  const safeText = text.replaceAll(".", "\\.");
  try {
    await axios.post(`http://localhost:5500/webhook/${TELEGRAM_TOKEN}/test`, {
      chat_id: 6482260190,
      text: safeText,
    });
    console.log({ address, boostAmount });
    console.log("--------");
  } catch (e) {
    console.log(e);
  }
}

export async function fetchTokens() {
  const newList = await fetch(url).then((response) => response.json());
  const existingTokens = await getCurrentDBTokens().then((res) =>
    res.map((t) => t.tokenAddress)
  );

  for (let item of newList) {
    if (
      item.amount > 20 &&
      item.chainId === "solana" &&
      !existingTokens.includes(item.tokenAddress)
    ) {
      const tokenProfile = await getToken(item.tokenAddress);
      if (tokenProfile?.pairs[0].volume.h24 > 50000) {
        alertNewToken(tokenProfile, item);
      }
    }
  }
}
