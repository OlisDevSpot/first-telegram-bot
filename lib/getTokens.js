import process from "process";
import dotenv from "dotenv";
import axios from "axios";
import util from "util";
import { getToken } from "./getToken.js";

dotenv.config();

const { TELEGRAM_TOKEN } = process.env;
const url = "https://api.dexscreener.com/token-boosts/latest/v1";
let tokens = [];

async function addToTokenList(tokenProfile, tokenBoostInfo) {
  const existingToken = tokens.find(
    (t) => t.address === tokenProfile.pairs[0].baseToken.address
  );
  if (existingToken) return;
  tokens.push(tokenProfile.pairs[0].baseToken);
  alert(tokenProfile, tokenBoostInfo);
}

async function alert(tokenProfile, tokenBoostInfo) {
  let secondPosted = new Date().getSeconds();
  const baseToken = tokenProfile.pairs[0].baseToken;
  const { address, name, symbol } = baseToken;
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

export async function getTokens() {
  const newList = await fetch(url).then((response) => response.json());
  const existingTokens = tokens.map((t) => t.address);
  //   console.log("existing tokens: ", existingTokens.length);

  for (let item of newList) {
    // console.log("new coin checking: ", item.tokenAddress);
    if (
      item.amount > 20 &&
      item.chainId === "solana" &&
      !existingTokens.includes(item.tokenAddress)
    ) {
      const tokenProfile = await getToken(item.tokenAddress);
      if (tokenProfile?.pairs[0].volume.h24 > 50000) {
        addToTokenList(tokenProfile, item);
      }
    }
  }
}
