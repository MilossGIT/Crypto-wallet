import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { WalletContext } from './WalletContext';
import { fetchMarketData } from '../services/api';

const WalletProvider = ({ children }) => {
    const [marketData, setMarketData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [walletBalances] = useState({
        bitcoin: 0.5,
        ethereum: 2.0,
        dogecoin: 1000
    });

    useEffect(() => {
        const updateMarketData = async () => {
            try {
                const data = await fetchMarketData();
                setMarketData(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch market data");
                console.error(err);
            }
        };

        updateMarketData();
        const interval = setInterval(updateMarketData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <WalletContext.Provider
            value={{
                marketData,
                walletBalances,
                notifications,
                error,
                loading,
                setNotifications
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

WalletProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WalletProvider;