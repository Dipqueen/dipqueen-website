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
  /** Telt alleen omhoog bij een échte klik op "Dip it!". Componenten zoals de
   * hero-foto gebruiken dit om hun dip-bak animatie precies één keer te tonen. */
  dipTrigger: number;
  chooseTheme: (t: ThemeKey) => void;
  dip: () => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Bewust geen sessionStorage: de keuze mag blijven staan zolang je binnen de
  // site doorklikt, maar bij elke verse laadbeurt van de pagina (nieuw
  // tabblad, verversen, de homepage opnieuw openen) begint het weer bij nul en
  // vraagt de pop-up opnieuw.
  const [theme, setThemeState] = useState<ThemeKey | null>(null);
  const [dipped, setDipped] = useState(false);
  const [dipTrigger, setDipTrigger] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    if (dipped) root.setAttribute("data-dipped", "1");
    else root.removeAttribute("data-dipped");
  }, [theme, dipped]);

  function chooseTheme(t: ThemeKey) {
    setThemeState(t);
  }

  function dip() {
    setDipped(true);
    setDipTrigger((n) => n + 1);
  }

  function reset() {
    setThemeState(null);
    setDipped(false);
  }

  return (
    <ThemeContext.Provider value={{ theme, dipped, dipTrigger, chooseTheme, dip, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme moet binnen ThemeProvider gebruikt worden");
  return ctx;
}
