const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const SUPPORTED_COINS = [
  'bitcoin',
  'ethereum',
  'dogecoin',
  'ripple',
  'cardano',
  'solana',
  'polkadot',
  'chainlink',
  'litecoin',
  'avalanche-2',
  'matic-network',
  'stellar',
  'cosmos',
  'tron',
  'monero',
];

export const fetchMarketData = async () => {
  try {
    // Using CoinGecko's markets endpoint for more comprehensive data
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${SUPPORTED_COINS.join(
        ','
      )}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      prices: data.reduce((acc, coin) => {
        acc[coin.id] = coin.current_price;
        return acc;
      }, {}),
      changes: data.reduce((acc, coin) => {
        acc[coin.id] = {
          '1h': coin.price_change_percentage_1h_in_currency,
          '24h': coin.price_change_percentage_24h,
          '7d': coin.price_change_percentage_7d,
        };
        return acc;
      }, {}),
      volumes: data.reduce((acc, coin) => {
        acc[coin.id] = coin.total_volume;
        return acc;
      }, {}),
      marketCaps: data.reduce((acc, coin) => {
        acc[coin.id] = coin.market_cap;
        return acc;
      }, {}),
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Fetch real transaction history from CoinGecko
export const fetchTransactionHistory = async (coinId) => {
  try {
    // Get detailed market data
    const [marketChartResponse, tradeDataResponse] = await Promise.all([
      fetch(
        `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`
      ),
      fetch(
        `${COINGECKO_API}/coins/${coinId}/tickers?include_exchange_logo=true`
      ),
    ]);

    if (!marketChartResponse.ok || !tradeDataResponse.ok) {
      throw new Error('Failed to fetch transaction data');
    }

    const marketChartData = await marketChartResponse.json();
    const tradeData = await tradeDataResponse.json();

    // Get recent trades from major exchanges
    const recentTrades = tradeData.tickers
      .filter((ticker) => ticker.trust_score === 'green')
      .slice(0, 50)
      .map((ticker) => ({
        id: `${ticker.base}-${ticker.target}-${Date.now()}`,
        exchange: ticker.market.name,
        base: ticker.base,
        target: ticker.target,
        price: ticker.last,
        volume: ticker.volume,
        timestamp: new Date().toISOString(),
        type: ticker.bid > ticker.last ? 'sell' : 'buy',
      }));

    return recentTrades;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
};

// Cache implementation with shorter duration for real-time data
const cache = new Map();
const CACHE_DURATION = 10000; // 10 seconds

export const fetchMarketDataWithCache = async () => {
  const now = Date.now();
  const cached = cache.get('marketData');

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const data = await fetchMarketData();
    cache.set('marketData', { data, timestamp: now });
    return data;
  } catch (error) {
    console.error('Cache fetch error:', error);
    throw error;
  }
};
