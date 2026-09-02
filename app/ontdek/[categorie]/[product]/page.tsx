"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/studio/StepIndicator";
import {
  getCategorie,
  getProduct,
  getPatronenVoorProduct,
  type Categorie,
  type Product,
  type Patroon,
} from "@/lib/supabase/studio";

export default function KiesPatroon() {
  const params = useParams<{ categorie: string; product: string }>();
  const [categorie, setCategorie] = useState<Categorie | null | undefined>(undefined);
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [patronen, setPatronen] = useState<Patroon[] | null>(null);
  const [fout, setFout] = useState(false);

  useEffect(() => {
    getCategorie(params.categorie)
      .then((c) => {
        setCategorie(c);
        if (!c) return;
        return getProduct(c.id, params.product).then((p) => {
          setProduct(p);
          if (p) return getPatronenVoorProduct(p.id).then(setPatronen);
        });
      })
      .catch(() => setFout(true));
  }, [params.categorie, params.product]);

  const basisHref = `/ontdek/${params.categorie}/${params.product}`;

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-4">
          <span className="eyebrow">Inspiration Studio</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Stap 3 — Kies een patroon
          </h1>
          {product && (
            <p className="text-pearl/60 max-w-md">
              Hoe moet jouw <span className="text-bronze">{product.naam}</span> eruit gaan zien?
            </p>
          )}
        </div>

        <StepIndicator actief={3} />

        {fout && <p className="text-center text-pearl/50">Er ging iets mis bij het laden.</p>}

        {(categorie === null || product === null) && (
          <p className="text-center text-pearl/50">
            Dat konden we niet vinden.{" "}
            <a href="/ontdek" className="text-bronze hover:text-pearl">
              Terug naar stap 1
            </a>
            .
          </p>
        )}

        {(categorie === undefined || product === undefined) && !fout && (
          <p className="text-center text-pearl/40 text-sm">Laden…</p>
        )}

        {patronen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {patronen.map((pat) => (
              <a
                key={pat.id}
                href={`${basisHref}/${pat.slug}`}
                className="group relative h-56 rounded overflow-hidden border border-pearl/15 transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 transition-transform duration-500 group-hover:scale-105 pat-${pat.slug}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute left-4 bottom-4">
                  <span className="text-sm font-semibold text-pearl">{pat.naam}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {patronen && patronen.length === 0 && (
          <p className="text-center text-pearl/50">
            Voor dit product staan nog geen patronen klaar — check gerust je eigen idee via de
            knop hieronder.
          </p>
        )}

        <div className="flex justify-center mt-14">
          <a
            href={`/ontdek/${params.categorie}`}
            className="text-sm tracking-[0.08em] uppercase text-pearl/50 hover:text-pearl"
          >
            &larr; Ander product
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
