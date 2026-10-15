import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#0D0D0D",
        bronze: "#8C6A4A",
        pearl: "#F4EFE8",
        bordeaux: "#5E1F3A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 45% 40% 60% 55%",
      },
    },
  },
  plugins: [],
};
export default config;
