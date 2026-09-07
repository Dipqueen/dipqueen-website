"use client";

import { useState } from "react";
import { THEMES, useTheme } from "@/lib/theme/ThemeProvider";

export default function ThemePickerModal() {
  const { theme, dipped, chooseTheme, dip } = useTheme();
  const [dismissed, setDismissed] = useState(false);

  if (dipped || dismissed) {
    return (
      <>
        {!dipped && (
          <button
            type="button"
            onClick={() => setDismissed(false)}
            className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-onyx border border-pearl/25 text-pearl text-xs font-semibold tracking-[0.1em] uppercase px-5 py-3 rounded-full shadow-xl hover:border-pearl transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-bronze animate-breathe" />
            Kies je finish
          </button>
        )}
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx/85 backdrop-blur-sm p-6">
      <div className="relative bg-onyx border border-pearl/15 rounded-2xl p-8 md:p-10 max-w-sm w-full flex flex-col items-center gap-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Later kiezen"
          className="absolute top-4 right-4 text-pearl/40 hover:text-pearl text-lg leading-none"
        >
          &times;
        </button>

        <span className="eyebrow">Hydro Dipping Studio</span>
        <h2 className="font-display text-3xl text-pearl leading-tight">
          Kies jouw
          <br />
          <span className="text-bronze italic">finish.</span>
        </h2>
        <p className="text-sm text-pearl/60 -mt-2">
          De site is nu kleurloos. Kies een thema en dip 'm in kleur.
        </p>

        <div className="flex items-center justify-center gap-5">
          {THEMES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => chooseTheme(t.key)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`w-14 h-14 rounded-full ${t.swatch} transition-all ${
                  theme === t.key
                    ? "ring-2 ring-pearl ring-offset-2 ring-offset-onyx scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
              <span
                className={`text-[11px] tracking-[0.08em] uppercase ${
                  theme === t.key ? "text-pearl font-semibold" : "text-pearl/50"
                }`}
              >
                {t.naam}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={dip}
          disabled={!theme}
          className={`w-full py-4 text-sm font-bold tracking-[0.16em] uppercase transition-all rounded ${
            theme
              ? "bg-bronze text-pearl hover:-translate-y-0.5"
              : "bg-pearl/10 text-pearl/30 cursor-not-allowed"
          }`}
        >
          Dip it!
        </button>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-xs tracking-[0.08em] uppercase text-pearl/35 hover:text-pearl/60 transition-colors"
        >
          Later kiezen
        </button>
      </div>
    </div>
  );
}
