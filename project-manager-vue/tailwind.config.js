/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#0B3166",
        },
        secondary: {
          900: "#FF6A0F",
        },
      },
    },
  },
  plugins: [],
}
