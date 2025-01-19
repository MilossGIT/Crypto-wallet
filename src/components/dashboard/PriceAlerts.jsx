import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Plus, X, AlertTriangle, Settings } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { useWallet } from '../../hooks/useWallet';

const AlertTypes = {
    PRICE_ABOVE: 'PRICE_ABOVE',
    PRICE_BELOW: 'PRICE_BELOW',
    PERCENT_CHANGE: 'PERCENT_CHANGE'
};

const PriceAlerts = () => {
    const { marketData } = useWallet();
    const [alerts, setAlerts] = useState([]);
    const [priceAlerts, setPriceAlerts] = useState([]);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [newAlert, setNewAlert] = useState({
        coin: 'bitcoin',
        type: AlertTypes.PRICE_ABOVE,
        value: '',
        triggered: false
    });

    // Monitor prices for alerts
    useEffect(() => {
        if (!marketData?.prices) return;

        const checkAlerts = () => {
            const newTriggeredAlerts = [];

            priceAlerts.forEach(alert => {
                const currentPrice = marketData.prices[alert.coin];
                const currentChange = marketData.changes[alert.coin]?.['24h'] || 0;

                switch (alert.type) {
                    case AlertTypes.PRICE_ABOVE:
                        if (currentPrice > alert.value && !alert.triggered) {
                            newTriggeredAlerts.push({
                                id: Date.now(),
                                coin: alert.coin,
                                message: `${alert.coin.toUpperCase()} price is above $${alert.value}`,
                                type: 'above',
                                timestamp: new Date()
                            });
                        }
                        break;
                    case AlertTypes.PRICE_BELOW:
                        if (currentPrice < alert.value && !alert.triggered) {
                            newTriggeredAlerts.push({
                                id: Date.now(),
                                coin: alert.coin,
                                message: `${alert.coin.toUpperCase()} price is below $${alert.value}`,
                                type: 'below',
                                timestamp: new Date()
                            });
                        }
                        break;
                    case AlertTypes.PERCENT_CHANGE:
                        if (Math.abs(currentChange) >= alert.value && !alert.triggered) {
                            newTriggeredAlerts.push({
                                id: Date.now(),
                                coin: alert.coin,
                                message: `${alert.coin.toUpperCase()} changed by ${currentChange.toFixed(2)}%`,
                                type: currentChange > 0 ? 'increase' : 'decrease',
                                timestamp: new Date()
                            });
                        }
                        break;
                }
            });

            if (newTriggeredAlerts.length > 0) {
                setAlerts(prev => [...newTriggeredAlerts, ...prev].slice(0, 10));
                // Update triggered status
                setPriceAlerts(prev =>
                    prev.map(alert => ({
                        ...alert,
                        triggered: true
                    }))
                );
            }
        };

        checkAlerts();
    }, [marketData, priceAlerts]);

    const addAlert = () => {
        if (!newAlert.value) return;

        setPriceAlerts(prev => [
            ...prev,
            {
                ...newAlert,
                id: Date.now(),
                triggered: false
            }
        ]);
        setShowAddAlert(false);
        setNewAlert({
            coin: 'bitcoin',
            type: AlertTypes.PRICE_ABOVE,
            value: '',
            triggered: false
        });
    };

    const removeAlert = (alertId) => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
        setPriceAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };

    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-400" />
                    Price Alerts
                </CardTitle>
                <button
                    onClick={() => setShowAddAlert(!showAddAlert)}
                    className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors"
                >
                    <Plus className="h-5 w-5 text-gray-400" />
                </button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {showAddAlert && (
                        <div className="bg-black/20 p-4 rounded-lg space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="bg-black/20 rounded-lg px-4 py-2 text-sm text-white"
                                    value={newAlert.coin}
                                    onChange={(e) => setNewAlert(prev => ({ ...prev, coin: e.target.value }))}
                                >
                                    {Object.keys(marketData?.prices || {}).map(coin => (
                                        <option key={coin} value={coin}>{coin.toUpperCase()}</option>
                                    ))}
                                </select>
                                <select
                                    className="bg-black/20 rounded-lg px-4 py-2 text-sm text-white"
                                    value={newAlert.type}
                                    onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                                >
                                    <option value={AlertTypes.PRICE_ABOVE}>Price Above</option>
                                    <option value={AlertTypes.PRICE_BELOW}>Price Below</option>
                                    <option value={AlertTypes.PERCENT_CHANGE}>Percent Change</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    className="flex-1 bg-black/20 rounded-lg px-4 py-2 text-sm text-white"
                                    placeholder={newAlert.type === AlertTypes.PERCENT_CHANGE ? "Percentage %" : "Price $"}
                                    value={newAlert.value}
                                    onChange={(e) => setNewAlert(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                                />
                                <button
                                    onClick={addAlert}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    Add Alert
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Active Price Alerts */}
                    {priceAlerts.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-400">Active Alerts</h3>
                            {priceAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="flex justify-between items-center p-3 bg-black/20 rounded-lg"
                                >
                                    <div>
                                        <span className="text-white">{alert.coin.toUpperCase()}</span>
                                        <span className="text-gray-400 ml-2">
                                            {alert.type === AlertTypes.PERCENT_CHANGE
                                                ? `${alert.value}% change`
                                                : `${alert.type === AlertTypes.PRICE_ABOVE ? '>' : '<'} $${alert.value}`}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeAlert(alert.id)}
                                        className="text-gray-400 hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Triggered Alerts */}
                    {alerts.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-400">Recent Alerts</h3>
                            {alerts.map((alert) => (
                                <Alert
                                    key={alert.id}
                                    className={`
                    ${alert.type === 'increase' ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}
                    flex justify-between items-center
                  `}
                                >
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className={`h-4 w-4 ${alert.type === 'increase' ? 'text-green-400' : 'text-red-400'}`} />
                                        <span className="text-gray-200">{alert.message}</span>
                                    </div>
                                    <button
                                        onClick={() => removeAlert(alert.id)}
                                        className="text-gray-400 hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </Alert>
                            ))}
                        </div>
                    )}

                    {alerts.length === 0 && priceAlerts.length === 0 && (
                        <div className="text-gray-400 text-center py-4">
                            No active alerts - click + to add one
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceAlerts;