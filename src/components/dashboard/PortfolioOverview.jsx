import { useWallet } from '../../hooks/useWallet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CryptoCard from './CryptoCard';

const PortfolioOverview = () => {
    const { marketData, loading, error, walletBalances } = useWallet();

    if (loading) {
        return (
            <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardContent>
                    <div className="text-red-400 p-4">
                        Error loading data: {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!marketData) {
        return null;
    }

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
                <CardTitle className="text-white">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(walletBalances).map(([coin, balance]) => (
                        <CryptoCard
                            key={coin}
                            coin={coin}
                            balance={balance}
                            price={marketData.prices[coin]}
                            change={marketData.changes[coin]}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PortfolioOverview;