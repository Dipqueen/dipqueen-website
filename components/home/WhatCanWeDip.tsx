"use client";

import Reveal from "@/components/ui/Reveal";

type Categorie = {
  nummer: string;
  naam: string;
  finish: string;
  beschrijving: string;
  href: string;
  pattern: string;
  altPattern: string;
};

// Statische fallback voor de vier vaste categorieën. Zodra de Inspiration Studio
// gebouwd wordt wisselt dit naar een fetch uit de `categories`-tabel in Supabase.
const CATEGORIEEN: Categorie[] = [
  {
    nummer: "01",
    naam: "Lifestyle",
    finish: "Marble Pearl",
    beschrijving:
      "Interieurobjecten en consumentenproducten met een verfijnde, natuurlijke uitstraling.",
    href: "#offerte",
    pattern: "pat-marble",
    altPattern: "pat-luxury",
  },
  {
    nummer: "02",
    naam: "Branded Product",
    finish: "Custom Identity",
    beschrijving:
      "Logo, kleur en patroon volledig geïntegreerd in het oppervlak van het product zelf.",
    href: "#offerte",
    pattern: "pat-abstract",
    altPattern: "pat-graphic",
  },
  {
    nummer: "03",
    naam: "Toolcover",
    finish: "Carbon Tactical",
    beschrijving:
      "Functionele afwerkingen voor gereedschap en technische producten, slijtvast en herkenbaar.",
    href: "#offerte",
    pattern: "pat-carbon",
    altPattern: "pat-wood",
  },
  {
    nummer: "04",
    naam: "Sportartikel",
    finish: "Graphic Camo",
    beschrijving: "Gedurfde patronen voor sport- en lifestylemerken die willen opvallen.",
    href: "#offerte",
    pattern: "pat-graphic",
    altPattern: "pat-camo",
  },
];

export default function WhatCanWeDip() {
  return (
    <section className="bg-onyx px-6 py-24 text-pearl md:px-16 md:py-32">
      <Reveal>
        <span className="eyebrow">Premium showroom</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display mb-16 max-w-2xl text-4xl leading-tight md:mb-24 md:text-6xl">
          Elke categorie, <span className="italic text-bronze">een andere finish.</span>
        </h2>
      </Reveal>

      <div className="flex flex-col gap-20 md:gap-28">
        {CATEGORIEEN.map((c, i) => {
          const omgekeerd = i % 2 === 1;
          return (
            <Reveal key={c.naam} delay={i * 60}>
              <a
                href={c.href}
                className={`group relative flex flex-col gap-8 md:flex-row md:items-center ${
                  omgekeerd ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    el.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 6}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                  }}
                  className="relative h-72 w-full overflow-hidden rounded-sm transition-transform duration-500 ease-out md:h-[26rem] md:w-7/12"
                >
                  <div className={`absolute inset-0 ${c.pattern}`} />
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${c.altPattern}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 font-display text-7xl text-pearl/10 md:text-8xl">
                    {c.nummer}
                  </span>
                  <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-pearl/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {c.finish} — hover voor andere finish
                  </span>
                </div>

                <div className="flex flex-col gap-4 md:w-5/12">
                  <span className="eyebrow">
                    {c.nummer} — {c.finish}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl">{c.naam}</h3>
                  <p className="max-w-sm text-pearl/65">{c.beschrijving}</p>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-bronze">
                    Bekijk mogelijkheden
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
