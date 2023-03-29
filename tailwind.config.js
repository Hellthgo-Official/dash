/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sofia Sans"],
      },
      colors: {
        primary: "#07A53D",
        secondary: "#DBFAE7",
        tertiary: "#6D6D6D",
        blackk: "#002912",
      },
    },
  },
  plugins: [],
};
