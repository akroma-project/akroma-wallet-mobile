export const getAddressFormat = (address: string) => {
  const addressLength = address.length;
  return address
    .substring(0, 7)
    .concat('...')
    .concat(address.substring(addressLength - 5, addressLength));
};
