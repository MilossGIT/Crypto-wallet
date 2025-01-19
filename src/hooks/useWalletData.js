import { useState, useEffect } from 'react';
import { fetchWalletBalance } from '../services/api';

export const useWalletData = () => {
  const [balances, setBalances] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWalletBalance();
        setBalances(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return { balances, error, loading };
};
