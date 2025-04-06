/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/sharedStyles.js",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 4s linear infinite",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        ooohBaby: ["Oooh Baby", "sans-serif"],
      },
      colors: {
        textDefault: "var(--text-default)",
        textLink: "var(--text-link)",

        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      dropShadow: {
        sm: "0 1px 1px var(--drop-shadow-color)",
        md: [
          "0 4px 3px var(--drop-shadow-color)",
          "0 2px 2px var(--drop-shadow-color)",
        ],
        lg: [
          "0 10px 8px var(--drop-shadow-color)",
          "0 4px 3px var(--drop-shadow-color)",
        ],
        xl: [
          "0 20px 13px var(--drop-shadow-color)",
          "0 8px 5px var(--drop-shadow-color)",
        ],
        "2xl": "0 25px 25px var(--drop-shadow-color)",

        star: [
          "0 4px 3px var(--star-drop-shadow)",
          "0 2px 2px var(--star-drop-shadow)",
        ],
      },
      boxShadow: {
        card: "0px 35px 120px -15px  var(--drop-shadow-color)",
        sm: "0 1px 2px 0 var(--drop-shadow-color)",
        md: "0 4px 6px -1px var(--drop-shadow-color), 0 2px 4px -2px var(--drop-shadow-color)",
        lg: "0 10px 15px -3px var(--drop-shadow-color), 0 4px 6px -4px var(--drop-shadow-color)",
        xl: "0 20px 25px -5px var(--drop-shadow-color), 0 8px 10px -6px var(--drop-shadow-color)",
        "2xl": "0 25px 50px -12px var(--drop-shadow-color)",
        "3xl":
          "0 20px 25px -5px var(--drop-shadow-color), 0 8px 10px -6px var(--drop-shadow-color)",
      },
      screens: {
        xs: "450px",
        nav: "1080px",
        "3xl": "1921px",
      },
    },
  },
  plugins: [],
};
export default config;
