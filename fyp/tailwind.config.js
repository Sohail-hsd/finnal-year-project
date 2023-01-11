/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "warm-gray": colors.warmGray,
        teal: colors.teal,
      },
    },
    fontFamily: {
      san: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      sati: ["Satisfy", "cursive"],
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("tw-elements/dist/plugin"),
  ],
};
