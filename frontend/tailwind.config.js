/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#F8F8F8',
      'black': '#1E1E1E',
      'green': '#145727',
      'red' : '#FE0002',
    },
    extend: {
      fontFamily: {
        sans: ['var(--archivo-font)', 'sans-serif'],
      },
    },
    spacing: {
      sm: '25px',
      md: '50px',
      lg: '75px',
      xl: '100px',
    }
  },
  plugins: [],
}