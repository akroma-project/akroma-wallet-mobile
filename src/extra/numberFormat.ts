const formatNumber: (value: number) => string = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export default formatNumber;
