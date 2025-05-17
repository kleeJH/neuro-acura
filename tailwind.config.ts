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

        /* from shadcn */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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

      /* from shadcn */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
