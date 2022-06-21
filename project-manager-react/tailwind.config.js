/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
