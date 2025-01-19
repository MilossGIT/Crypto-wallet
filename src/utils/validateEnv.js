export const validateEnv = () => {
  const required = [
    'VITE_CRYPTO_COM_API_KEY',
    'VITE_CRYPTO_COM_API_SECRET',
    'VITE_CRYPTO_COM_API_URL',
    'VITE_WEBSOCKET_URL',
  ];

  for (const variable of required) {
    if (!import.meta.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }
};
