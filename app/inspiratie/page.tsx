"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase/client";
import { getCategories, type Categorie } from "@/lib/supabase/studio";

type Project = {
  id: string;
  titel: string;
  category_id: string | null;
  before_url: string | null;
  after_url: string | null;
};

export default function InspiratieWall() {
  const [categorieen, setCategorieen] = useState<Categorie[]>([]);
  const [projecten, setProjecten] = useState<Project[] | null>(null);
  const [filter, setFilter] = useState<string>("alle");

  useEffect(() => {
    getCategories().then(setCategorieen).catch(() => {});
    supabase
      .from("inspiration_projects")
      .select("id, titel, category_id, before_url, after_url")
      .eq("actief", true)
      .order("volgorde")
      .then(({ data }) => setProjecten(data ?? []));
  }, []);

  const zichtbaar = (projecten ?? []).filter((p) => {
    if (filter === "alle") return true;
    const c = categorieen.find((c) => c.slug === filter);
    return c ? p.category_id === c.id : true;
  });

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="eyebrow">Inspiration Wall</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Wat anderen lieten dippen
          </h1>
          <p className="text-pearl/60 max-w-md">
            Een greep uit afgeronde projecten — als voorbeeld voor jouw eigen idee.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <button
            onClick={() => setFilter("alle")}
            className={`text-xs tracking-[0.08em] uppercase px-4 py-2 border ${
              filter === "alle" ? "border-bronze text-pearl" : "border-pearl/25 text-pearl/50"
            }`}
          >
            Alle
          </button>
          {categorieen.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.slug)}
              className={`text-xs tracking-[0.08em] uppercase px-4 py-2 border ${
                filter === c.slug ? "border-bronze text-pearl" : "border-pearl/25 text-pearl/50"
              }`}
            >
              {c.naam}
            </button>
          ))}
        </div>

        {projecten === null && <p className="text-center text-pearl/40 text-sm">Laden…</p>}

        {projecten !== null && zichtbaar.length === 0 && (
          <div className="flex flex-col items-center text-center gap-5 py-16">
            <p className="text-pearl/60 max-w-md">
              Deze muur vullen we binnenkort met echte projecten. Wil je alvast weten wat er
              mogelijk is met jouw eigen product?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/ontdek" className="btn-primary">
                Ontdek de mogelijkheden
              </a>
              <a href="/check-mijn-idee" className="btn-outline-dark">
                Breng het tot leven
              </a>
            </div>
          </div>
        )}

        {zichtbaar.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {zichtbaar.map((p) => (
              <div key={p.id} className="flex flex-col gap-3">
                <div className="relative h-64 rounded overflow-hidden flex bg-[#17181a]">
                  {p.before_url && p.after_url ? (
                    <>
                      <img src={p.before_url} alt="" className="flex-1 object-cover" />
                      <img src={p.after_url} alt="" className="flex-1 object-cover" />
                    </>
                  ) : (
                    <div className="flex-1 pat-abstract" />
                  )}
                </div>
                <span className="text-sm tracking-[0.06em] font-semibold text-pearl">{p.titel}</span>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
