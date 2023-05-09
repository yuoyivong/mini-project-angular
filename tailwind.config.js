/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#4ECDC4",
        "customBlue" : "#3797F0",
      },

      fontFamily : {
        'ubuntu' : ['Ubuntu', 'sans-serif']
      }
    },
  },
  plugins: [],
}