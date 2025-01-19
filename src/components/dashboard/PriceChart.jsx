import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

const PriceChart = () => {
    const { marketData, loading } = useWallet();

    if (loading) return null;

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Price History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={marketData?.history || []}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="timestamp"
                                stroke="#525252"
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                            />
                            <YAxis stroke="#525252" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                    borderColor: '#374151',
                                    borderRadius: '0.5rem',
                                    color: '#fff'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceChart;