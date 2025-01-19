import { useState, useEffect, useCallback } from 'react';
import { fetchMarketData } from '../services/api';

export const useMarketData = (updateInterval = 30000) => {
  // Increased interval to 30 seconds
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateData = useCallback(async () => {
    try {
      const newData = await fetchMarketData();
      setData((prevData) => {
        if (!prevData) return newData;

        // Compare with previous data
        return {
          ...newData,
          prices: Object.entries(newData.prices).reduce(
            (acc, [coin, price]) => {
              acc[coin] = {
                value: price,
                changed: prevData.prices[coin] !== price,
              };
              return acc;
            },
            {}
          ),
        };
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating market data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, updateInterval);
    return () => clearInterval(interval);
  }, [updateData, updateInterval]);

  return { data, loading, error, refetch: updateData };
};
