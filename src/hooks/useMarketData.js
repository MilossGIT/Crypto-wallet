import { useState, useEffect } from 'react';
import { fetchMarketData } from '../services/api';
import { websocketService } from '../services/websocket';

export const useMarketData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketData = await fetchMarketData();
        setData(marketData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const unsubscribe = websocketService.subscribe((wsData) => {
      setData((prev) => ({
        ...prev,
        ...wsData,
      }));
    });

    return () => unsubscribe();
  }, []);

  return { data, error, loading };
};
