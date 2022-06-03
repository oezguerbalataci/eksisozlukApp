const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      green: colors.green,
    },
    extend: {
      colors: {
        eksisozluk: "#2d2d2d",
        eksiyellow: " #81c14b",
      },
    },
  },
  plugins: [],
};
