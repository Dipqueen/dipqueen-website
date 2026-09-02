"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/studio/StepIndicator";
import { getCategorie, getProduct, getPatroon, type Categorie, type Product, type Patroon } from "@/lib/supabase/studio";

export default function Transformatie() {
  const params = useParams<{ categorie: string; product: string; patroon: string }>();
  const [categorie, setCategorie] = useState<Categorie | null | undefined>(undefined);
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [patroon, setPatroon] = useState<Patroon | null | undefined>(undefined);
  const [fout, setFout] = useState(false);
  const [gedipt, setGedipt] = useState(false);

  useEffect(() => {
    getCategorie(params.categorie)
      .then((c) => {
        setCategorie(c);
        if (!c) return;
        return Promise.all([getProduct(c.id, params.product), getPatroon(params.patroon)]).then(
          ([p, pat]) => {
            setProduct(p);
            setPatroon(pat);
          }
        );
      })
      .catch(() => setFout(true));
  }, [params.categorie, params.product, params.patroon]);

  useEffect(() => {
    if (!product || !patroon) return;
    const t = setTimeout(() => setGedipt(true), 350);
    return () => clearTimeout(t);
  }, [product, patroon]);

  const alleGeladen = categorie && product && patroon;
  const ietsNietGevonden = categorie === null || product === null || patroon === null;

  const wizardHref =
    categorie && product && patroon
      ? `/check-mijn-idee?categorie=${encodeURIComponent(categorie.naam)}&product=${encodeURIComponent(
          product.naam
        )}&patroon=${encodeURIComponent(patroon.naam)}`
      : "/check-mijn-idee";

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen flex flex-col items-center">
        <span className="eyebrow">Inspiration Studio</span>
        <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3 text-center">
          Stap 4 — Zo zou het eruit zien
        </h1>
        {alleGeladen && (
          <p className="text-pearl/60 max-w-md text-center mb-4">
            <span className="text-bronze">{product!.naam}</span> in{" "}
            <span className="text-bronze">{patroon!.naam}</span>
          </p>
        )}

        <StepIndicator actief={4} />

        {fout && <p className="text-center text-pearl/50">Er ging iets mis bij het laden.</p>}

        {ietsNietGevonden && (
          <p className="text-center text-pearl/50">
            Dat konden we niet vinden.{" "}
            <a href="/ontdek" className="text-bronze hover:text-pearl">
              Terug naar stap 1
            </a>
            .
          </p>
        )}

        {!alleGeladen && !fout && !ietsNietGevonden && (
          <p className="text-center text-pearl/40 text-sm">Laden…</p>
        )}

        {alleGeladen && (
          <>
            <div className="relative w-72 h-80 md:w-96 md:h-[420px]">
              <div className="absolute inset-0 rounded-blob bg-[#1c1d1f] border border-pearl/10" />
              <div
                className={`absolute inset-0 rounded-blob pat-${patroon!.slug} transition-all duration-[1400ms] ease-out ${
                  gedipt ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-12 justify-center">
              <a href={wizardHref} className="btn-primary">
                Breng het tot leven
              </a>
              <a
                href={`/ontdek/${params.categorie}/${params.product}`}
                className="btn-outline-dark"
              >
                Ander patroon proberen
              </a>
            </div>

            <p className="text-xs text-pearl/40 max-w-sm text-center mt-8">
              Dit is een impressie op basis van goedgekeurde patronen — geen exacte weergave van
              jouw eigen product. Na het insturen bekijken we samen wat er precies mogelijk is.
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
