import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign } from 'lucide-react';

const CryptoCard = ({
    coin,
    balance = 0,
    price = 0,
    change = 0,
    loading = false,
    volume = 0,
    marketCap = 0
}) => {
    const [priceColor, setPriceColor] = useState('text-white');
    const [prevPrice, setPrevPrice] = useState(price);

    const numericPrice = Number(price) || 0;
    const numericChange = Number(change) || 0;
    const value = balance * numericPrice;
    const isPositive = numericChange >= 0;

    useEffect(() => {
        if (prevPrice !== numericPrice && prevPrice !== 0) {
            setPriceColor(numericPrice > prevPrice ? 'text-green-400' : 'text-red-400');
            const timer = setTimeout(() => setPriceColor('text-white'), 1000);
            setPrevPrice(numericPrice);
            return () => clearTimeout(timer);
        }
    }, [numericPrice, prevPrice]);

    const getCoinIcon = (coinName) => {
        // You can replace this with actual coin icons
        const icons = {
            bitcoin: "₿",
            ethereum: "Ξ",
            dogecoin: "Ð",
            // Add more coins as needed
        };
        return icons[coinName.toLowerCase()] || coinName.charAt(0).toUpperCase();
    };

    if (loading) {
        return (
            <Card className="bg-[#1A1A1A]/80 backdrop-blur-sm border-[#2A2A2A] animate-pulse">
                <CardContent className="pt-6">
                    <div className="h-[200px] bg-gray-800/50 rounded-lg animate-pulse"></div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-[#1A1A1A]/80 backdrop-blur-sm border-[#2A2A2A] hover:bg-[#222222]/90 transition-all duration-300 group">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 font-bold text-xl">
                                {getCoinIcon(coin)}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white capitalize bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {coin}
                            </h3>
                            <p className={`text-sm transition-all duration-500 ${priceColor} font-medium`}>
                                ${numericPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                    <div className={`flex flex-col items-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        <div className="flex items-center gap-1">
                            {isPositive ? (
                                <ArrowUpRight className="h-5 w-5 animate-bounce" />
                            ) : (
                                <ArrowDownRight className="h-5 w-5 animate-bounce" />
                            )}
                            <span className="font-semibold">{Math.abs(numericChange).toFixed(2)}%</span>
                        </div>
                        <span className="text-xs text-gray-400">24h change</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-black/20 space-y-3">
                        <div className="flex justify-between items-center text-gray-300">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">Balance</span>
                            </div>
                            <span className="font-mono text-sm">
                                {balance.toLocaleString(undefined, { minimumFractionDigits: 8 })} {coin.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-300">Value</span>
                            </div>
                            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-black/20">
                            <span className="text-gray-400">Volume 24h</span>
                            <p className="text-white font-medium mt-1">
                                ${(volume || 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-black/20">
                            <span className="text-gray-400">Market Cap</span>
                            <p className="text-white font-medium mt-1">
                                ${(marketCap || 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

CryptoCard.propTypes = {
    coin: PropTypes.string.isRequired,
    balance: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    loading: PropTypes.bool,
    volume: PropTypes.number,
    marketCap: PropTypes.number
};

export default CryptoCard;