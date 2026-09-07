"use client";

import { THEMES, useTheme } from "@/lib/theme/ThemeProvider";

const FOTO_FILTER: Record<string, string> = {
  marble: "none",
  carbon: "grayscale(1) contrast(1.15) brightness(0.92)",
  luxury: "sepia(0.55) saturate(1.5) brightness(1.05) hue-rotate(-8deg)",
};

export default function Hero() {
  const { theme, dipped, chooseTheme, dip, reset } = useTheme();

  return (
    <section className="relative flex flex-col md:flex-row items-center gap-12 md:gap-16 px-6 md:px-16 pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      <div className="flex-1 max-w-xl flex flex-col gap-6 z-10">
        <span className="eyebrow animate-fade-up [animation-delay:0ms]">Hydro Dipping Studio</span>
        <h1 className="font-display text-6xl md:text-7xl leading-[1.02] text-pearl animate-fade-up [animation-delay:120ms]">
          MAKE IT
          <br />
          <span className="text-bronze italic">YOURS.</span>
        </h1>
        <p className="text-lg text-pearl/70 max-w-md animate-fade-up [animation-delay:240ms]">
          Van standaard naar allesbehalve standaard. DipQueen verandert bestaande producten via
          hydro dipping, met patronen, prints en designs.
        </p>

        <div className="flex flex-wrap gap-3 mt-2 animate-fade-up [animation-delay:360ms]">
          <a href="/ontdek" className="btn-primary">
            Ontdek de mogelijkheden
          </a>
          <a href="/check-mijn-idee" className="btn-outline-dark">
            Breng het tot leven
          </a>
        </div>

        {/* Kies je thema en dip de site */}
        {!dipped ? (
          <div className="mt-4 flex flex-col gap-3 animate-fade-up [animation-delay:480ms]">
            <span className="text-xs tracking-[0.14em] uppercase text-pearl/50">
              Kies jouw finish
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => chooseTheme(t.key)}
                  className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full border text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                    theme === t.key
                      ? "border-pearl text-pearl"
                      : "border-pearl/25 text-pearl/60 hover:border-pearl/50 hover:text-pearl/85"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full ${t.swatch}`} />
                  {t.naam}
                </button>
              ))}

              <button
                type="button"
                onClick={dip}
                disabled={!theme}
                className={`flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase transition-all ${
                  theme ? "text-bronze hover:text-pearl" : "text-pearl/25 cursor-not-allowed"
                }`}
              >
                <span className={`w-2 h-2 rounded-full bg-bronze ${theme ? "animate-breathe" : ""}`} />
                Dip it!
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="mt-2 self-start text-xs tracking-[0.1em] uppercase text-pearl/40 hover:text-pearl/70 transition-colors animate-fade-up"
          >
            Ander thema? →
          </button>
        )}
      </div>

      <div className="relative flex-1 w-full max-w-md md:max-w-none h-[320px] md:h-[560px] rounded-2xl overflow-hidden border border-pearl/10 pat-undipped">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-product.jpg"
          alt="DipQueen hydro dipped champagneset, fles, koeler en dienblad"
          className="absolute inset-0 w-full h-full object-cover transition-[clip-path] duration-[1600ms] ease-out"
          style={{
            clipPath: dipped ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            filter: theme ? FOTO_FILTER[theme] : "none",
          }}
        />
      </div>
    </section>
  );
}
