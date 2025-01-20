/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A651', // Oolu green
          dark: '#008f45',
          light: '#00bf5e'
        },
        secondary: {
          DEFAULT: '#F7941D', // Oolu orange
          dark: '#e68710',
          light: '#ffa12f'
        }
      }
    },
  },
  plugins: [],
};