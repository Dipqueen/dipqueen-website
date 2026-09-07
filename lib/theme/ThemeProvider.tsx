"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeKey = "marble" | "carbon" | "luxury";

export const THEMES: { key: ThemeKey; naam: string; swatch: string }[] = [
  { key: "marble", naam: "Marmer", swatch: "pat-marble" },
  { key: "carbon", naam: "Carbon", swatch: "pat-carbon" },
  { key: "luxury", naam: "Luxury goud", swatch: "pat-luxury" },
];

type ThemeState = {
  theme: ThemeKey | null;
  dipped: boolean;
  chooseTheme: (t: ThemeKey) => void;
  dip: () => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey | null>(null);
  const [dipped, setDipped] = useState(false);

  // Bij het laden: gekozen thema uit deze sessie herstellen, zodat je niet op elke
  // pagina opnieuw hoeft te kiezen.
  useEffect(() => {
    try {
      const savedTheme = sessionStorage.getItem("dq-site-theme") as ThemeKey | null;
      const savedDipped = sessionStorage.getItem("dq-site-dipped") === "1";
      if (savedTheme) setThemeState(savedTheme);
      if (savedDipped) setDipped(true);
      // Opruimen: oude sleutelnamen uit eerdere testversies, anders lijkt het alsof
      // er al gedipt is terwijl de pop-up nooit is gezien.
      sessionStorage.removeItem("dq-theme");
      sessionStorage.removeItem("dq-dipped");
    } catch {
      // sessionStorage kan onbeschikbaar zijn, geen probleem
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    if (dipped) root.setAttribute("data-dipped", "1");
    else root.removeAttribute("data-dipped");
  }, [theme, dipped]);

  function chooseTheme(t: ThemeKey) {
    setThemeState(t);
    try {
      sessionStorage.setItem("dq-site-theme", t);
    } catch {
      // geen probleem
    }
  }

  function dip() {
    setDipped(true);
    try {
      sessionStorage.setItem("dq-site-dipped", "1");
    } catch {
      // geen probleem
    }
  }

  function reset() {
    setThemeState(null);
    setDipped(false);
    try {
      sessionStorage.removeItem("dq-site-theme");
      sessionStorage.removeItem("dq-site-dipped");
    } catch {
      // geen probleem
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, dipped, chooseTheme, dip, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme moet binnen ThemeProvider gebruikt worden");
  return ctx;
}
