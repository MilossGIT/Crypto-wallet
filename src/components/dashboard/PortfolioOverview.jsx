import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useWallet } from '../../hooks/useWallet';
import CryptoCard from './CryptoCard';

const PortfolioOverview = () => {
    const { marketData, walletBalances, loading } = useWallet();

    if (loading) return <div className="text-center py-8 text-gray-400">Loading...</div>;

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
                <CardTitle className="text-white">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(walletBalances).map(([coin, balance]) => (
                        <CryptoCard
                            key={coin}
                            coin={coin}
                            balance={balance}
                            price={marketData?.prices[coin]}
                            change={marketData?.changes[coin]}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PortfolioOverview;