/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        card: '#111111',
        'card-hover': '#222222',
        border: '#2A2A2A',
        muted: '#888888',
        accent: '#3B82F6',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};
