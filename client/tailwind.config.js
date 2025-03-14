/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["Firago", "sans-serif"],
      },
      colors: {
        bgColor: "#063776",
        bgColorSecondary: "#E0EAFC",
        textColor: "#334155",
        white: "#FFFEFE",
        black: "#1C1C1C",
        errorRed: "#FF0000",
        placeholder: "#898A8A",
        popupBackground: "rgba(0, 0, 0, 0.59)",
        green: "#15CD5C",
      },
      borderRadius: {
        default: "10px",
      },
      screens: {
        lg: "1440px",
        xl: "1920px",
      },
    },
  },
  plugins: [],
};
