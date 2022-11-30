const urlAkromaApi = 'https://api.akroma.org';

export const getTransactionsByAddress = async (address: string, page: number) => {
  const res = await fetch(`${urlAkromaApi}/addresses/${address}/transactions/${page}`);
  const json = await res.json();
  return json;
};
