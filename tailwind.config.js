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
        customRedAlert: "#E43131",
        customYellowTask: "#EEBD4A",
        customBlueTask: "#4D95E8",
        customGreenTask: "#48B472",
        customRedTask: "#E54C4C",
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

