import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PieChart, Clock, Settings } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
        { icon: Clock, label: 'Transactions', path: '/transactions' },
        { icon: Settings, label: 'Settings', path: '/settings' }
    ];

    return (
        <aside className="w-64 bg-[#111111] border-r border-[#2A2A2A] min-h-screen p-4">
            <nav className="space-y-2">
                {menuItems.map(({ icon: Icon, label, path }) => (
                    <div
                        key={label}
                        className={`flex items-center gap-3 px-4 py-3 text-gray-400 
              hover:text-white hover:bg-[#2A2A2A] rounded-lg cursor-pointer transition-colors
              ${location.pathname === path ? 'bg-[#2A2A2A] text-white' : ''}`}
                        onClick={() => navigate(path)}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;