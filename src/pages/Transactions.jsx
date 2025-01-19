import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { fetchTransactionHistory } from '../services/api';
import { ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setLoading(true);
                const history = await fetchTransactionHistory(selectedCoin);
                setTransactions(history);
            } catch (error) {
                console.error('Failed to load transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, [selectedCoin]);

    const filteredTransactions = transactions
        .filter(tx => filter === 'all' || tx.type === filter)
        .filter(tx =>
            searchQuery === '' ||
            tx.coin.includes(searchQuery.toLowerCase()) ||
            tx.type.includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (loading) {
        return (
            <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-gray-800/50 rounded-lg" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Transaction History</CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="pl-10 pr-4 py-2 bg-black/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="bg-black/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Transactions</option>
                            <option value="buy">Buy Only</option>
                            <option value="sell">Sell Only</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${tx.type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                        {tx.type === 'buy' ? (
                                            <ArrowUpRight className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium capitalize">
                                            {tx.type} {tx.coin}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-medium">
                                        {tx.amount.toFixed(8)} {tx.coin.toUpperCase()}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        ${tx.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Transactions;