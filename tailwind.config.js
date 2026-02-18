/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      darkMode: "class",

      fontFamily: {
        sn: ["SN Pro", "sans-serif"],
      },
      colors: {
        primaryBlue: "#0A1F44",
        premiumBlue: "#0B1E3C",
        premiumGold: "#F5C56B",
        goldDark: "#D4A017",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
        "blue-hero":
          "radial-gradient(circle at 70% 30%, rgba(20,60,140,0.6), transparent 60%)",
      },
    },
  },
  plugins: [],
};
