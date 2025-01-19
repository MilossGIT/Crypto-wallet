import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { WalletProvider } from './context/WalletProvider';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <WalletProvider>
          <Layout />
        </WalletProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;