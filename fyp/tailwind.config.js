/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      san: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      sati: ["Satisfy", "cursive"],
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
