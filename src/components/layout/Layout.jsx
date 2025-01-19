import { useWallet } from '../../hooks/useWallet';
import Header from './Header';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
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
                    {children}
                </main>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;