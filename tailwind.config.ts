import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#0D0D0D",
        pearl: "#F4EFE8",
        // bronze en bordeaux verwijzen naar CSS-variabelen die per gekozen thema
        // (Marmer/Carbon/Luxury) van waarde wisselen, zie app/globals.css.
        bronze: "var(--accent)",
        "bronze-soft": "var(--accent-soft)",
        bordeaux: "var(--cta-bg)",
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
