export const formatCurrency = (value, currency = 'USD', decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatCryptoAmount = (value, symbol) => {
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  })} ${symbol}`;
};
