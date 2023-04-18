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
    fontSize: {
      xs: ['14px', '16px'],
      sm: ['24px', '26px'],
      md: ['40px', '42px'],
      lg: ['64px', '66px'],
      xl: ['92px', '94px'],
    },
    extend: {
      fontFamily: {
        sans: ['var(--archivo-font)', 'sans-serif'],
      },
    },
    spacing: {
      xs: '10px',
      sm: '25px',
      md: '50px',
      lg: '75px',
      xl: '100px',
    }
  },
  plugins: [],
}