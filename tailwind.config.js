/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#ababab",
        customYellow: "#F6BC0A",
        customBoxGray: "#484848",
        customInputGray: "#555555",
        customRed: "#E43131",
        customItemBackgroundGray: "#646464"
        

      },
      fontFamily: {
        alatsi: ["Alatsi", "sans-serif"],
        sans: ["Albert Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}

