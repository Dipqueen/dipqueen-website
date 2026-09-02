"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/studio/StepIndicator";
import { getCategories, type Categorie } from "@/lib/supabase/studio";

const ACCENT: Record<string, string> = {
  lifestyle: "pat-marble",
  branded: "pat-luxury",
  toolcover: "pat-carbon",
  sport: "pat-graphic",
};

export default function InspirationStudioStart() {
  const [categorieen, setCategorieen] = useState<Categorie[] | null>(null);
  const [fout, setFout] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategorieen)
      .catch(() => setFout(true));
  }, []);

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-4">
          <span className="eyebrow">Inspiration Studio</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Stap 1 — Kies een categorie
          </h1>
          <p className="text-pearl/60 max-w-md">
            Kies waar jouw idee thuishoort. Daarna kies je een product, een patroon, en zien we
            hoe het eruit gaat zien.
          </p>
        </div>

        <StepIndicator actief={1} />

        {fout && (
          <p className="text-center text-pearl/50">
            Kon de categorieën niet laden. Probeer de pagina te verversen.
          </p>
        )}

        {!fout && !categorieen && (
          <p className="text-center text-pearl/40 text-sm">Laden…</p>
        )}

        {categorieen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categorieen.map((c) => (
              <a
                key={c.id}
                href={`/ontdek/${c.slug}`}
                className="group relative h-72 md:h-80 rounded overflow-hidden border border-pearl/15 transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 transition-transform duration-500 group-hover:scale-105 ${
                    ACCENT[c.slug] ?? "pat-abstract"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute left-5 bottom-5 right-5">
                  <span className="text-base font-semibold text-pearl">{c.naam}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
