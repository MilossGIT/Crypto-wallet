import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useWallet } from '../hooks/useWallet';

const Portfolio = () => {
    const { walletBalances, marketData } = useWallet();

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
                <CardTitle className="text-white">Portfolio Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-gray-300">
                    Portfolio page content coming soon...
                </div>
            </CardContent>
        </Card>
    );
};

export default Portfolio;