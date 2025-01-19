import { Bell, Settings, User } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

const Header = () => {
    const { notifications = [] } = useWallet() || {};

    return (
        <header className="h-16 bg-[#111111] border-b border-[#2A2A2A] px-6">
            <div className="h-full flex items-center justify-between">
                <div className="text-xl font-bold text-white">Crypto Wallet</div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                    <Settings className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                    <User className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;