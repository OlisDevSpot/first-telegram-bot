import { db } from "../index.js";
import { token } from "../schema/token.js";

export const getCurrentDBTokens = async () => {
  const tokens = await db.query.token.findMany();
  return tokens;
};

export const addToken = async (tokenProfile) => {
  // console.log(util.inspect(tokenProfile, false, null, true));
  const tokenAddress = tokenProfile.pairs[0].baseToken.address;
  const volume24h = Math.round(tokenProfile.pairs[0].volume.h24) || 0;
  const marketCap = Math.round(tokenProfile.pairs[0].marketCap) || 0;
  await db.insert(token).values({ tokenAddress, volume24h, marketCap });
};
