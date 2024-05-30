/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "overlay-color": "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
