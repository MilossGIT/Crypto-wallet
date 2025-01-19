import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { WalletContext } from './WalletContext';
import { fetchMarketDataWithCache } from '../services/api';

export const WalletProvider = ({ children }) => {
    const [state, setState] = useState({
        marketData: null,
        loading: true,
        error: null,
        notifications: [],
        walletBalances: {
            bitcoin: 0.5,
            ethereum: 2.0,
            dogecoin: 1000
        }
    });

    const fetchData = useCallback(async () => {
        console.log('Fetching new data...'); // Debug log
        try {
            setState(prev => ({ ...prev, loading: true }));
            const data = await fetchMarketDataWithCache();
            console.log('Received new data:', data); // Debug log
            setState(prev => ({
                ...prev,
                marketData: data,
                loading: false,
                error: null
            }));
        } catch (err) {
            console.error('Data fetch error:', err);
            setState(prev => ({
                ...prev,
                error: err.message || 'Failed to fetch market data',
                loading: false
            }));
        }
    }, []);

    useEffect(() => {
        console.log('Setting up data fetching...'); // Debug log
        fetchData();
        const interval = setInterval(fetchData, 30000);

        return () => {
            console.log('Cleaning up...'); // Debug log
            clearInterval(interval);
        };
    }, [fetchData]);

    console.log('Current state:', state); // Debug log

    return (
        <WalletContext.Provider value={state}>
            {children}
        </WalletContext.Provider>
    );
};

WalletProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WalletProvider;