"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { verstuurAanvraag } from "@/lib/supabase/ideeAanvraag";

export default function Offerte() {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bedrijf, setBedrijf] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [productFoto, setProductFoto] = useState<File | null>(null);

  const [verzenden, setVerzenden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [aanvraagnummer, setAanvraagnummer] = useState<string | null>(null);

  const geldig = naam.trim().length > 0 && email.trim().length > 0 && omschrijving.trim().length > 0;

  async function versturen() {
    if (!geldig || verzenden) return;
    setVerzenden(true);
    setFout(null);
    try {
      const nummer = await verstuurAanvraag({
        naam,
        email,
        telefoon,
        bedrijf,
        categorySlug: null,
        omschrijving,
        aantalRange: "1",
        opmerkingen: "",
        productFoto,
        inspiratieFoto: null,
      });
      setAanvraagnummer(nummer);
    } catch {
      setFout("Er ging iets mis bij het versturen. Probeer het nog eens, of mail ons direct.");
    } finally {
      setVerzenden(false);
    }
  }

  return (
    <section id="offerte" className="scroll-mt-24 bg-bordeaux px-6 md:px-16 py-24 md:py-28 flex flex-col items-center">
      <Reveal>
        <span className="eyebrow text-pearl/70">Klaar om te dippen?</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display text-4xl md:text-5xl text-pearl mb-3 text-center">
          Vraag een offerte aan
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="text-pearl/75 max-w-md text-center mb-10">
          Niet alles kan gedipt worden. Maar veel meer dan je denkt. Vertel ons kort over je idee,
          we nemen binnen enkele werkdagen contact op.
        </p>
      </Reveal>

      {aanvraagnummer ? (
        <Reveal>
          <div className="max-w-md text-center flex flex-col items-center gap-3">
            <p className="text-pearl">Bedankt, {naam.split(" ")[0]}.</p>
            <p className="text-pearl/80">
              Jouw aanvraag is binnen onder nummer <span className="font-display text-xl">{aanvraagnummer}</span>.
            </p>
            <p className="text-pearl/60 text-sm">
              Dit is nog geen bestelling — we bekijken je idee persoonlijk en laten weten wat
              mogelijk is.
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              versturen();
            }}
            className="w-full max-w-md flex flex-col gap-4"
          >
            <div>
              <label className="field-label" htmlFor="naam">
                Naam
              </label>
              <input
                id="naam"
                className="field-input"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                required
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
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label" htmlFor="telefoon">
                  Telefoon (optioneel)
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
                  Bedrijf (optioneel)
                </label>
                <input
                  id="bedrijf"
                  className="field-input"
                  value={bedrijf}
                  onChange={(e) => setBedrijf(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="omschrijving">
                Wat wil je laten dippen?
              </label>
              <textarea
                id="omschrijving"
                className="field-input min-h-[120px]"
                placeholder="Bijv. een set gereedschap in carbon, of een helm met eigen logo…"
                value={omschrijving}
                onChange={(e) => setOmschrijving(e.target.value)}
                required
              />
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

            {fout && <p className="text-pearl text-sm">{fout}</p>}

            <button type="submit" className="btn-primary mt-2" disabled={!geldig || verzenden}>
              {verzenden ? "Versturen…" : "Offerte aanvragen"}
            </button>
          </form>
        </Reveal>
      )}
    </section>
  );
}
