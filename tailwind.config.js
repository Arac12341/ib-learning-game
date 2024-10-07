module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Includes all JS/TS/JSX/TSX files in src/
    './pages/**/*.{js,ts,jsx,tsx}', // In case you have some pages in the default pages/ folder
    './components/**/*.{js,ts,jsx,tsx}', // Include components directory if outside src
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        primary: '#2D5F7A',
        secondary: '#F78C6B',
        accent: '#43AA8B',
        background: '#F4F4F9',
        text: '#333',
      },
    },
  },
  plugins: [],
}
