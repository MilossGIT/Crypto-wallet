// src/services/api.js
import CryptoJS from 'crypto-js';

const API_KEY = import.meta.env.VITE_CRYPTO_COM_API_KEY;
const API_SECRET = import.meta.env.VITE_CRYPTO_COM_API_SECRET;
const API_URL = import.meta.env.VITE_CRYPTO_COM_API_URL;

// Generate signature for API authentication
const generateSignature = (method, endpoint, data = '') => {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsString = data ? JSON.stringify(data) : '';
  const signString = `${timestamp}${method}${endpoint}${paramsString}`;

  const signature = CryptoJS.HmacSHA256(signString, API_SECRET).toString();

  return {
    signature,
    timestamp,
  };
};

// Base API call function
const apiCall = async (method, endpoint, data = null) => {
  const { signature, timestamp } = generateSignature(method, endpoint, data);

  const headers = {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    sig: signature,
    nonce: timestamp.toString(),
  };

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Get current market data for specified symbols
export const fetchMarketData = async (
  symbols = ['BTC_USDT', 'ETH_USDT', 'DOGE_USDT']
) => {
  try {
    const response = await apiCall('GET', '/public/get-ticker', {
      instrument_name: symbols.join(','),
    });

    const formattedData = response.result.data.reduce(
      (acc, item) => {
        const symbol = item.instrument_name.split('_')[0].toLowerCase();
        acc.prices[symbol] = parseFloat(item.last_trade_price);
        acc.changes[symbol] = parseFloat(item.price_change_24h);
        return acc;
      },
      { prices: {}, changes: {} }
    );

    return formattedData;
  } catch (error) {
    throw new Error('Failed to fetch market data: ' + error.message);
  }
};

// Get account balances
export const fetchWalletBalance = async () => {
  try {
    const response = await apiCall('GET', '/private/get-account-summary');

    const balances = response.result.accounts.reduce((acc, account) => {
      acc[account.currency.toLowerCase()] = parseFloat(account.balance);
      return acc;
    }, {});

    return balances;
  } catch (error) {
    throw new Error('Failed to fetch wallet balance: ' + error.message);
  }
};

// Get order history
export const fetchOrderHistory = async (startTime, endTime) => {
  try {
    const response = await apiCall('GET', '/private/get-order-history', {
      start_time: startTime,
      end_time: endTime,
    });

    return response.result.order_list;
  } catch (error) {
    throw new Error('Failed to fetch order history: ' + error.message);
  }
};

// Place a new order
export const placeOrder = async (
  instrumentName,
  side,
  type,
  quantity,
  price = null
) => {
  try {
    const orderData = {
      instrument_name: instrumentName,
      side: side.toUpperCase(), // BUY or SELL
      type: type.toUpperCase(), // LIMIT or MARKET
      quantity: quantity.toString(),
    };

    if (type === 'LIMIT') {
      orderData.price = price.toString();
    }

    const response = await apiCall('POST', '/private/create-order', orderData);
    return response.result;
  } catch (error) {
    throw new Error('Failed to place order: ' + error.message);
  }
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  try {
    const response = await apiCall('POST', '/private/cancel-order', {
      order_id: orderId,
    });
    return response.result;
  } catch (error) {
    throw new Error('Failed to cancel order: ' + error.message);
  }
};

// Get trading pairs information
export const getTradingPairs = async () => {
  try {
    const response = await apiCall('GET', '/public/get-instruments');
    return response.result.instruments;
  } catch (error) {
    throw new Error('Failed to fetch trading pairs: ' + error.message);
  }
};

// Get market depth
export const getMarketDepth = async (instrumentName) => {
  try {
    const response = await apiCall('GET', '/public/get-book', {
      instrument_name: instrumentName,
      depth: 50,
    });
    return response.result.data;
  } catch (error) {
    throw new Error('Failed to fetch market depth: ' + error.message);
  }
};

// Get candlestick data
export const getCandlesticks = async (instrumentName, timeframe = '1D') => {
  try {
    const response = await apiCall('GET', '/public/get-candlestick', {
      instrument_name: instrumentName,
      timeframe,
    });
    return response.result.data;
  } catch (error) {
    throw new Error('Failed to fetch candlestick data: ' + error.message);
  }
};

// Error handling utility
export const handleApiError = (error) => {
  // Add any specific error handling logic here
  console.error('API Error:', error);

  if (error.message.includes('authentication')) {
    return {
      type: 'AUTH_ERROR',
      message: 'Authentication failed. Please check your API credentials.',
    };
  }

  if (error.message.includes('rate limit')) {
    return {
      type: 'RATE_LIMIT',
      message: 'Rate limit exceeded. Please try again later.',
    };
  }

  return {
    type: 'GENERAL_ERROR',
    message: 'An unexpected error occurred. Please try again.',
  };
};
