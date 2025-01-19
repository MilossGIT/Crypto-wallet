// src/pages/Transactions.jsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useWallet } from '../hooks/useWallet';
import { formatCurrency, formatCryptoAmount } from '../utils/formatters';

const Transactions = () => {
    const [transactions] = useState([
        {
            id: 1,
            type: 'buy',
            coin: 'bitcoin',
            amount: 0.1,
            price: 45000,
            date: new Date().toISOString(),
        },
        // Add more sample transactions
    ]);

    return (
        <div className="space-y-6">
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-center justify-between p-4 border-b border-border"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`text-sm ${tx.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.type.toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-medium">{formatCryptoAmount(tx.amount, tx.coin)}</div>
                                        <div className="text-sm text-gray-400">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{formatCurrency(tx.price * tx.amount)}</div>
                                    <div className="text-sm text-gray-400">@ {formatCurrency(tx.price)}</div>
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