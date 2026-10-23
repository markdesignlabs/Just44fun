import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shantell: ["var(--font-shantell-sans)", "'Shantell Sans'", "cursive", "sans-serif"],
      },
      colors: {
        cyber: {
          black: "#0D0E1A",
          dark: "#121324",
          card: "#16182e",
          border: "#282a4d",
        },
        neon: {
          purple: "#9D4EDD",
          magenta: "#E0218A",
          pink: "#F72585",
          orange: "#FF7700",
          cyan: "#00F0FF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
