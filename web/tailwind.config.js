const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    screens: {
      'xs': '425px',
      'sm': '768px',
      'md': '1024px',
      'lg': '1440px',
      'xl': '1920px'
    },
    fontFamily: {
      'josefin': ['Josefin Sans', 'sans-serif'],
      'nunito': ['Nunito', 'sans-serif'],
      'sourcesans': ['Source Sans 3', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
      'dosis': ['Dosis', 'sans-serif']
    },
    colors: {
      darkNavBg: '#1a1a1c',
      ...colors
    },
    extend: {},
  },
  plugins: [],
}