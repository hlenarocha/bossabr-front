/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#ababab",
        customYellow: "#F6BC0A"
      },
      fontFamily: {
        alatsi: ["Alatsi", "sans-serif"],
        sans: ["Albert Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}

