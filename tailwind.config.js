/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        blueBg: "#1B3764",
        btnBg: "#3949AB",
        contentBg: "#F5F6F8",
        btnYellow: "#FFCA42",
        textBlue: "#374151",
      },
      colors: {
        authorText: "#FFCA42",
        blueText: "#1B3764",
      },
      borderColor: {
        readNowBorder: "#FFCA42",
      },

      fontFamily: {
        rowdies: ["Rowdies", "Ubuntu", "cursive"],
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
