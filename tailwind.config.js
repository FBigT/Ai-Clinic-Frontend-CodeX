/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.15)'
        },
        'neo-gray': {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d8d9dd',
          300: '#b6b7be',
          400: '#92939d',
          500: '#737480',
          600: '#5c5d67',
          700: '#4a4b53',
          800: '#3e3f45',
          900: '#36373c',
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
};