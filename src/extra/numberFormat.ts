const localStringOptions = {
  maximumFractionDigits: 12,
  minimumFractionDigits: 2,
};

const formatNumber: (value: number) => string = (value: number) => {
  return value?.toLocaleString('en-US', localStringOptions);
};

export default formatNumber;
