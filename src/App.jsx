import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletProvider from './context/WalletProvider';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <WalletProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </WalletProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;