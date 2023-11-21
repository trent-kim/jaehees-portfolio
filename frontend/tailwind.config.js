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
      'green': '#254F35',
      'red' : '#D62B2C',
      'grey' : '#909090'
    },
    fontSize: {
      xs: ['12px', '14px'],
      sm: ['16px', '18px'],
      md: ['32px', '32px'],
      lg: ['48px', '48px'],
      xl: ['64px', '64px'],
    },
    extend: {
      fontFamily: {
        sans: ['var(--dmSans-font)', 'sans-serif'],
        mono: ['var(--dmMono-font)', 'mono'],
      },
      animation: {
        fade: 'fadeOut 500ms ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }),
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
      }
    },
    spacing: {
      xs: '12px',
      sm: '24px',
      md: '48px',
      lg: '72px',
      xl: '96px',
    }
  },
  plugins: [],
}