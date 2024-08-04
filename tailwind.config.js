/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        cursive: ["Pacifico", "Sriracha", "cursive"],
        cursive2: ["Sriracha", "cursive"],
      },
      colors: {
        text: {
          DEFAULT: "#eff2f4",
          dark: "#f7f2e8",
        },
        background: {
          DEFAULT: "#0b1115",
          dark: "#14120f",
        },
        primary: {
          DEFAULT: "#92b6d4",
          dark: "#bf9940",
        },
        secondary: {
          DEFAULT: "#265883",
          dark: "#606722",
        },
        accent: {
          DEFAULT: "#2f89d5",
          dark: "#788e2f",
        },
        lighter: {
          DEFAULT: "#101f2b",
          dark: "#191a09",
        },
      },
    },
  },
  plugins: [],
};

export const darkMode = "class";