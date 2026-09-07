"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";

const FOTO_FILTER: Record<string, string> = {
  marble: "none",
  carbon: "grayscale(1) contrast(1.15) brightness(0.92)",
  luxury: "sepia(0.55) saturate(1.5) brightness(1.05) hue-rotate(-8deg)",
};

const WIT_FILTER = "grayscale(1) brightness(2.1) contrast(0.45) saturate(0)";

export default function Hero() {
  const { theme, dipped, dipTrigger, reset } = useTheme();
  // 'submerging' = de dipbak-vloeistof stijgt en dekt de foto af (naar binnen dippen)
  // 'coated' = de vloeistof trekt weer terug en laat de gedipte foto zien (eruit trekken)
  const [animating, setAnimating] = useState<"submerging" | "coated" | null>(null);

  useEffect(() => {
    if (dipTrigger === 0) return; // niet afspelen bij een hersteld thema uit deze sessie
    setAnimating("submerging");
    const t1 = setTimeout(() => setAnimating("coated"), 800);
    const t2 = setTimeout(() => setAnimating(null), 800 + 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [dipTrigger]);

  const fotoFilter =
    animating === "submerging" ? WIT_FILTER : dipped && theme ? FOTO_FILTER[theme] : WIT_FILTER;
  const vloeistofDekt = animating === "submerging";

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

        {dipped && !animating && (
          <button
            type="button"
            onClick={reset}
            className="mt-2 self-start text-xs tracking-[0.1em] uppercase text-pearl/40 hover:text-pearl/70 transition-colors"
          >
            Ander thema? →
          </button>
        )}
      </div>

      <div className="relative flex-1 w-full max-w-md md:max-w-none h-[320px] md:h-[560px] rounded-2xl overflow-hidden border border-pearl/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-product.jpg"
          alt="DipQueen hydro dipped champagneset, fles, koeler en dienblad"
          className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-[900ms] ease-out"
          style={{ filter: fotoFilter }}
        />

        {/* Dipbak-effect: vloeistof in de gekozen kleur stijgt over de foto (ondergedompeld),
           en trekt daarna weer terug, alsof het product uit de bak omhoog komt, gedipt. */}
        {animating && (
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none transition-[top] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              top: vloeistofDekt ? "0%" : "100%",
              transitionDuration: vloeistofDekt ? "800ms" : "950ms",
              background: "var(--accent)",
              opacity: 0.42,
            }}
          >
            <svg
              viewBox="0 0 400 24"
              preserveAspectRatio="none"
              className="absolute -top-4 left-0 w-[140%] h-6 animate-wave-drift"
            >
              <path
                d="M0,12 C50,24 100,0 150,12 C200,24 250,0 300,12 C350,24 400,0 400,12 L400,24 L0,24 Z"
                fill="var(--accent)"
                opacity="0.9"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
