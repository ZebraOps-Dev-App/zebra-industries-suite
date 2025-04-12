/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        zebra: {
          blue: "#0D1F2D",
          red: "#C8102E",
          gold: "#FFD700",
        }
      },
    },
  },
  plugins: [],
}