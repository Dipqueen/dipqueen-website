"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";

const FOTO_FILTER: Record<string, string> = {
  marble: "none",
  carbon: "grayscale(1) contrast(1.15) brightness(0.92)",
  luxury: "sepia(0.55) saturate(1.5) brightness(1.05) hue-rotate(-8deg)",
};

const WIT_FILTER = "grayscale(1) brightness(2.1) contrast(0.45) saturate(0)";

export default function Hero() {
  const { theme, dipped, reset } = useTheme();

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

        {dipped && (
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
          className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-[1600ms] ease-out"
          style={{ filter: dipped && theme ? FOTO_FILTER[theme] : WIT_FILTER }}
        />
      </div>
    </section>
  );
}
