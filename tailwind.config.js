/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d9d9e0',
          300: '#b7b7c5',
          400: '#8e8ea3',
          500: '#6c6c85',
          600: '#55556d',
          700: '#454559',
          800: '#3b3b4b',
          900: '#27272f',
          950: '#1a1a20',
        },
      },
    },
  },
  plugins: [],
};