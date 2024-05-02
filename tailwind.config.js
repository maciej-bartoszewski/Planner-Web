/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#2BA1F0',
      'lightblue': '#2BDFF0'
    },
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [],
}