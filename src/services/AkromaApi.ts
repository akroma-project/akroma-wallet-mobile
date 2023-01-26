const urlAkromaApi = 'https://api.akroma.org';
const urlStexAPI = 'https://api3.stex.com/public'; // endpoint /ticker/374 /ticker/406
// const urlCoingeckoAPI = 'https://api.coingecko.com/api/v3'; // endpoint /simple/price?ids=akroma&vs_currencies=usd

export const getTransactionsByAddress = async (address: string, page: number) => {
  try {
    const res = await fetch(`${urlAkromaApi}/addresses/${address}/transactions/${page}`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAkromaPrice = async () => {
  try {
    const akromaBTC = await fetch(`${urlStexAPI}/ticker/374`);
    const akromaJson = await akromaBTC.json();

    const btcUSDT = await fetch(`${urlStexAPI}/ticker/406`);
    const btcJson = await btcUSDT.json();

    const akromaValue = akromaJson.data.last * btcJson.data.last;

    return akromaValue;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBlockByNumber = async (blockNumber: string) => {
  try {
    const res = await fetch(`${urlAkromaApi}/blocks/${blockNumber}`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};
