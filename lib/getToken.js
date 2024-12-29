const baseApiUrl = "https://api.dexscreener.com/latest/dex/tokens";

export async function getToken(address) {
  try {
    const response = await fetch(`${baseApiUrl}/${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("something went wrong in getToken: ", error);
  }
}
