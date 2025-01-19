import PortfolioOverview from '../components/dashboard/PortfolioOverview';
import PriceChart from '../components/dashboard/PriceChart';
import PriceAlerts from '../components/dashboard/PriceAlerts';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <PortfolioOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PriceChart />
                <PriceAlerts />
            </div>
        </div>
    );
};

export default Dashboard;