# Crypto Wallet Dashboard

A modern cryptocurrency wallet dashboard built with React, featuring real-time price updates, portfolio tracking, and transaction management.

## Features

- Real-time cryptocurrency price tracking
- Portfolio management
- Transaction history
- Price alerts
- Dark mode interface
- Responsive design

## Technologies Used

- React
- Tailwind CSS
- React Router
- Recharts for charts
- Crypto.com API integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MilossGIT/Crypto-wallet.git
cd Crypto-wallet
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Crypto.com API credentials:

```env
VITE_CRYPTO_COM_API_KEY=your_api_key
VITE_CRYPTO_COM_API_SECRET=your_api_secret
VITE_CRYPTO_COM_API_URL=https://api.crypto.com/v2
VITE_WEBSOCKET_URL=wss://stream.crypto.com/v2/market
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_CRYPTO_COM_API_KEY=
VITE_CRYPTO_COM_API_SECRET=
VITE_CRYPTO_COM_API_URL=https://api.crypto.com/v2
VITE_WEBSOCKET_URL=wss://stream.crypto.com/v2/market
```

## Usage

1. Set up your Crypto.com API credentials
2. Add cryptocurrencies to your portfolio
3. Monitor real-time price changes
4. Set up price alerts
5. Track your transaction history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Crypto.com for providing the API
- React and Tailwind CSS communities
