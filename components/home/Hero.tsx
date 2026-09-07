"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [dipped, setDipped] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("dq-dipped") === "1") {
        setDipped(true);
        return;
      }
    } catch {
      // sessionStorage kan onbeschikbaar zijn, geen probleem, gewoon door
    }
    const timer = setTimeout(() => dip(), 2200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dip() {
    setDipped(true);
    try {
      sessionStorage.setItem("dq-dipped", "1");
    } catch {
      // geen probleem als dit niet lukt
    }
  }

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
        <div className="flex flex-wrap items-center gap-5 mt-2 animate-fade-up [animation-delay:360ms]">
          <a href="/ontdek" className="btn-primary">
            Ontdek de mogelijkheden
          </a>
          <a href="/check-mijn-idee" className="btn-outline-dark">
            Breng het tot leven
          </a>
          {!dipped && (
            <button
              type="button"
              onClick={dip}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-bronze hover:text-pearl transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-bronze animate-breathe" />
              Dip it
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1 w-full max-w-md md:max-w-none h-[320px] md:h-[560px] rounded-2xl overflow-hidden border border-pearl/10 bg-[#111214]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-product.jpg"
          alt="DipQueen hydro dipped champagneset in marmerpatroon: fles, koeler en dienblad"
          className="absolute inset-0 w-full h-full object-cover transition-[clip-path] duration-[1600ms] ease-out"
          style={{ clipPath: dipped ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
        />
      </div>
    </section>
  );
}
