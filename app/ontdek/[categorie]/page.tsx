"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/studio/StepIndicator";
import { getCategorie, getProducten, type Categorie, type Product } from "@/lib/supabase/studio";

export default function KiesProduct() {
  const params = useParams<{ categorie: string }>();
  const [categorie, setCategorie] = useState<Categorie | null | undefined>(undefined);
  const [producten, setProducten] = useState<Product[] | null>(null);
  const [fout, setFout] = useState(false);

  useEffect(() => {
    getCategorie(params.categorie)
      .then((c) => {
        setCategorie(c);
        if (c) return getProducten(c.id).then(setProducten);
      })
      .catch(() => setFout(true));
  }, [params.categorie]);

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-4">
          <span className="eyebrow">Inspiration Studio</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Stap 2 — Kies een product
          </h1>
          {categorie && (
            <p className="text-pearl/60 max-w-md">
              Binnen <span className="text-bronze">{categorie.naam}</span> — welk product wil je
              zien?
            </p>
          )}
        </div>

        <StepIndicator actief={2} />

        {fout && (
          <p className="text-center text-pearl/50">
            Er ging iets mis bij het laden. Probeer de pagina te verversen.
          </p>
        )}

        {categorie === null && (
          <p className="text-center text-pearl/50">
            Deze categorie kennen we niet.{" "}
            <a href="/ontdek" className="text-bronze hover:text-pearl">
              Terug naar stap 1
            </a>
            .
          </p>
        )}

        {categorie === undefined && !fout && (
          <p className="text-center text-pearl/40 text-sm">Laden…</p>
        )}

        {producten && categorie && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {producten.map((p) => (
              <a
                key={p.id}
                href={`/ontdek/${categorie.slug}/${p.slug}`}
                className="group relative h-64 rounded overflow-hidden border border-pearl/15 flex flex-col items-center justify-center gap-4 bg-[#17181a] transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="rounded-blob w-24 h-24 bg-pearl/10 border border-pearl/20 transition-transform duration-500 group-hover:scale-105" />
                <span className="text-sm font-semibold text-pearl">{p.naam}</span>
              </a>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-14">
          <a href="/ontdek" className="text-sm tracking-[0.08em] uppercase text-pearl/50 hover:text-pearl">
            &larr; Andere categorie
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
