// const urlAkromaApi = 'https://api.akroma.org';
const urlAkromaApi = 'http://192.168.1.2:3000';

export const getTransactionsByAddress = async (address: string, page: number) => {
  try {
    // console.debug('transact url:', `${urlAkromaApi}/addresses/${address}/transactions/${page}`);
    const res = await fetch(`${urlAkromaApi}/addresses/${address}/transactions/${page}`);
    const json = await res.json();
    return json;
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
