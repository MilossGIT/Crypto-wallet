import { Routes, Route } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import Portfolio from '../../pages/Portfolio';
import Settings from '../../pages/Settings';
import Transactions from '../../pages/Transactions';

const Layout = () => {
    const { error } = useWallet();

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {error && (
                        <div className="text-red-400 mb-4 p-4 bg-red-900/20 rounded-lg">
                            {error}
                        </div>
                    )}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Layout;