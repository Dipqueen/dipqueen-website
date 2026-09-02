type Categorie = {
  slug: string;
  naam: string;
  href: string;
  pattern?: string;
  monogram?: boolean;
};

// Statische fallback voor de vier vaste categorieën. Zodra de Inspiration Studio
// gebouwd wordt wisselt dit naar een fetch uit de `categories`-tabel in Supabase.
const CATEGORIEEN: Categorie[] = [
  { slug: "lifestyle", naam: "Lifestyle", href: "/ontdek/lifestyle", pattern: "pat-marble" },
  { slug: "branded", naam: "Branded Product", href: "/ontdek/branded", monogram: true },
  { slug: "toolcover", naam: "Toolcover", href: "/ontdek/toolcover", pattern: "pat-carbon" },
  { slug: "sport", naam: "Sportartikel", href: "/ontdek/sport", pattern: "pat-graphic" },
];

export default function WhatCanWeDip() {
  return (
    <section className="px-6 md:px-16 py-24 md:py-28 flex flex-col items-center">
      <span className="eyebrow">Vier categorieën</span>
      <h2 className="font-display text-4xl md:text-5xl mb-14 text-pearl text-center">What can we dip?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {CATEGORIEEN.map((c) => (
          <a
            key={c.slug}
            href={c.href}
            className="group relative h-72 md:h-80 rounded overflow-hidden border border-pearl/15 transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {c.monogram ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#17181a]">
                <span className="font-display text-3xl tracking-[0.08em] text-bronze/70 text-center">
                  YOUR
                  <br />
                  BRAND
                </span>
              </div>
            ) : (
              <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-105 ${c.pattern}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute left-5 bottom-5 right-5">
              <span className="text-base font-semibold text-pearl">{c.naam}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
