import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Plus } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { useWallet } from '../../hooks/useWallet';

const PriceAlerts = () => {
    const { notifications } = useWallet();

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-400" />
                    Price Alerts
                </CardTitle>
                <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
                    <Plus className="h-5 w-5 text-gray-400" />
                </button>
            </CardHeader>
            <CardContent>
                {notifications.length === 0 ? (
                    <div className="text-gray-400 text-center py-4">
                        No active alerts
                    </div>
                ) : (
                    <div className="space-y-2">
                        {notifications.map((notification, index) => (
                            <Alert
                                key={index}
                                className="bg-blue-900/20 border-blue-500/50 text-gray-200"
                            >
                                {notification.message}
                            </Alert>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default PriceAlerts;