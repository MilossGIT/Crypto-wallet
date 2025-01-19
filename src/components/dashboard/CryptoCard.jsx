import PropTypes from 'prop-types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CryptoCard = ({ coin, balance, price, change }) => {
    const value = balance * price;

    return (
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:bg-[#222222] transition-all duration-300">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <span className="text-blue-400 font-bold">
                                {coin.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-white capitalize">{coin}</p>
                            <p className="text-sm text-gray-400">${price?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className={`flex items-center ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {change >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                        <span className="ml-1">{Math.abs(change).toFixed(2)}%</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-300">
                        <span>Balance</span>
                        <span className="font-mono">{balance} {coin.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Value</span>
                        <span className="text-xl font-bold text-white">
                            ${value.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

CryptoCard.propTypes = {
    coin: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    price: PropTypes.number,
    change: PropTypes.number
};

export default CryptoCard;