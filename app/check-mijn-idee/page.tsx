"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/studio/StepIndicator";
import { getCategories, type Categorie } from "@/lib/supabase/studio";
import { verstuurAanvraag } from "@/lib/supabase/ideeAanvraag";

const STAPPEN = ["Jouw idee", "Stijl", "Aantal & wensen", "Contact", "Overzicht"];

const AANTAL_OPTIES = [
  { waarde: "1", label: "Eén stuk" },
  { waarde: "2-10", label: "Klein aantal (2–10)" },
  { waarde: "10+", label: "Grotere serie (10+)" },
];

function BrengHetTotLevenForm() {
  const searchParams = useSearchParams();

  const [stap, setStap] = useState(1);
  const [categorieen, setCategorieen] = useState<Categorie[]>([]);
  const [verzenden, setVerzenden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [aanvraagnummer, setAanvraagnummer] = useState<string | null>(null);

  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bedrijf, setBedrijf] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [aantalRange, setAantalRange] = useState(AANTAL_OPTIES[0].waarde);
  const [opmerkingen, setOpmerkingen] = useState("");
  const [productFoto, setProductFoto] = useState<File | null>(null);
  const [inspiratieFoto, setInspiratieFoto] = useState<File | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategorieen)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const categorie = searchParams.get("categorie");
    const product = searchParams.get("product");
    const patroon = searchParams.get("patroon");
    if (product && patroon) {
      setOmschrijving(`Ik wil graag een ${product} laten dippen in ${patroon}.`);
    }
    if (categorie && categorieen.length) {
      const match = categorieen.find((c) => c.naam.toLowerCase() === categorie.toLowerCase());
      if (match) setCategorySlug(match.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorieen]);

  const volgende = () => setStap((s) => Math.min(s + 1, STAPPEN.length));
  const terug = () => setStap((s) => Math.max(s - 1, 1));

  const stap1Geldig = omschrijving.trim().length > 0;
  const stap4Geldig = naam.trim().length > 0 && email.trim().length > 0;

  async function versturen() {
    setVerzenden(true);
    setFout(null);
    try {
      const nummer = await verstuurAanvraag({
        naam,
        email,
        telefoon,
        bedrijf,
        categorySlug: categorySlug || null,
        omschrijving,
        aantalRange,
        opmerkingen,
        productFoto,
        inspiratieFoto,
      });
      setAanvraagnummer(nummer);
    } catch (e) {
      setFout("Er ging iets mis bij het versturen. Probeer het nog eens, of mail ons direct.");
    } finally {
      setVerzenden(false);
    }
  }

  if (aanvraagnummer) {
    return (
      <>
        <Header />
        <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen flex flex-col items-center text-center">
          <span className="eyebrow">Verstuurd</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-4">
            Bedankt, {naam.split(" ")[0]}.
          </h1>
          <p className="text-pearl/70 max-w-md mb-2">
            Jouw idee is bij ons binnen onder aanvraagnummer
          </p>
          <p className="font-display text-2xl text-bronze mb-6">{aanvraagnummer}</p>
          <p className="text-pearl/60 max-w-md mb-10">
            We bekijken jouw idee en laten binnen enkele werkdagen weten wat er mogelijk is — dit
            is nog geen bevestigde bestelling. Bewaar het aanvraagnummer voor je eigen
            administratie.
          </p>
          <a href="/" className="btn-outline-dark">
            Terug naar home
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-4">
          <span className="eyebrow">Breng het tot leven</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Vertel ons over jouw idee
          </h1>
          <p className="text-pearl/60 max-w-md">
            Vijf korte stappen. Geen automatische bestelling — we bekijken elk idee persoonlijk en
            laten weten wat er mogelijk is.
          </p>
        </div>

        <StepIndicator actief={stap} labels={STAPPEN} />

        <div className="max-w-xl mx-auto flex flex-col gap-6">
          {stap === 1 && (
            <>
              <div>
                <label className="field-label" htmlFor="omschrijving">
                  Wat wil je laten dippen — en hoe zie je het voor je?
                </label>
                <textarea
                  id="omschrijving"
                  className="field-input min-h-[140px]"
                  placeholder="Bijv. een set gereedschap in carbon, of een helm met eigen logo…"
                  value={omschrijving}
                  onChange={(e) => setOmschrijving(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="categorie">
                  Categorie (optioneel)
                </label>
                <select
                  id="categorie"
                  className="field-input"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                >
                  <option value="">Weet ik nog niet</option>
                  {categorieen.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.naam}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="field-label">Foto van het product (optioneel)</span>
                <label className="field-upload block">
                  {productFoto ? productFoto.name : "Klik om een foto te kiezen"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setProductFoto(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </>
          )}

          {stap === 2 && (
            <>
              <div>
                <span className="field-label">Inspiratiefoto (optioneel)</span>
                <p className="text-pearl/50 text-sm mb-3">
                  Heb je een voorbeeld, screenshot of moodboard-plaatje van de stijl die je voor
                  ogen hebt? Upload 'm hier.
                </p>
                <label className="field-upload block">
                  {inspiratieFoto ? inspiratieFoto.name : "Klik om een foto te kiezen"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setInspiratieFoto(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              <p className="text-pearl/40 text-xs">
                Geen foto bij de hand? Geen probleem — beschrijf de stijl gewoon in de
                omschrijving van stap 1, dat mag ook.
              </p>
            </>
          )}

          {stap === 3 && (
            <>
              <div>
                <span className="field-label">Om hoeveel stuks gaat het ongeveer?</span>
                <div className="flex flex-col gap-2 mt-1">
                  {AANTAL_OPTIES.map((o) => (
                    <label
                      key={o.waarde}
                      className={`field-input flex items-center gap-3 cursor-pointer ${
                        aantalRange === o.waarde ? "border-bronze" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="aantal"
                        value={o.waarde}
                        checked={aantalRange === o.waarde}
                        onChange={() => setAantalRange(o.waarde)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="opmerkingen">
                  Nog iets dat we moeten weten? (optioneel)
                </label>
                <textarea
                  id="opmerkingen"
                  className="field-input min-h-[100px]"
                  placeholder="Deadline, budget-indicatie, materiaal van het product, etc."
                  value={opmerkingen}
                  onChange={(e) => setOpmerkingen(e.target.value)}
                />
              </div>
            </>
          )}

          {stap === 4 && (
            <>
              <div>
                <label className="field-label" htmlFor="naam">
                  Naam
                </label>
                <input
                  id="naam"
                  className="field-input"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="email">
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="telefoon">
                  Telefoonnummer (optioneel)
                </label>
                <input
                  id="telefoon"
                  className="field-input"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="bedrijf">
                  Bedrijfsnaam (optioneel)
                </label>
                <input
                  id="bedrijf"
                  className="field-input"
                  value={bedrijf}
                  onChange={(e) => setBedrijf(e.target.value)}
                />
              </div>
            </>
          )}

          {stap === 5 && (
            <div className="flex flex-col gap-4 text-sm">
              <div className="border border-pearl/15 p-5 flex flex-col gap-3">
                <div>
                  <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Idee</span>
                  <p className="text-pearl">{omschrijving || "—"}</p>
                </div>
                {categorySlug && (
                  <div>
                    <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Categorie</span>
                    <p className="text-pearl">
                      {categorieen.find((c) => c.slug === categorySlug)?.naam ?? categorySlug}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Aantal</span>
                  <p className="text-pearl">
                    {AANTAL_OPTIES.find((o) => o.waarde === aantalRange)?.label}
                  </p>
                </div>
                {opmerkingen && (
                  <div>
                    <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Opmerkingen</span>
                    <p className="text-pearl">{opmerkingen}</p>
                  </div>
                )}
                <div>
                  <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Contact</span>
                  <p className="text-pearl">
                    {naam} — {email}
                    {telefoon ? ` — ${telefoon}` : ""}
                    {bedrijf ? ` — ${bedrijf}` : ""}
                  </p>
                </div>
                {(productFoto || inspiratieFoto) && (
                  <div>
                    <span className="text-pearl/40 uppercase text-xs tracking-[0.08em]">Bijlagen</span>
                    <p className="text-pearl">
                      {[productFoto?.name, inspiratieFoto?.name].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-pearl/40 text-xs">
                Dit is een aanvraag, geen bestelling — we nemen persoonlijk contact op om te
                bespreken wat er mogelijk is.
              </p>
              {fout && <p className="text-bronze text-sm">{fout}</p>}
            </div>
          )}

          <div className="flex justify-between mt-4">
            {stap > 1 ? (
              <button onClick={terug} className="btn-outline-dark" type="button">
                Terug
              </button>
            ) : (
              <span />
            )}

            {stap < STAPPEN.length && (
              <button
                onClick={volgende}
                className="btn-primary"
                type="button"
                disabled={(stap === 1 && !stap1Geldig) || (stap === 4 && !stap4Geldig)}
              >
                Volgende
              </button>
            )}

            {stap === STAPPEN.length && (
              <button
                onClick={versturen}
                className="btn-primary"
                type="button"
                disabled={verzenden}
              >
                {verzenden ? "Versturen…" : "Idee insturen"}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckMijnIdeePagina() {
  return (
    <Suspense fallback={null}>
      <BrengHetTotLevenForm />
    </Suspense>
  );
}
