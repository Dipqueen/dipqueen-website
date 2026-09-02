import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const STAPPEN = [
  {
    nr: "01",
    titel: "Prep",
    tekst:
      "Het product wordt gereinigd, ontvet en waar nodig licht geschuurd zodat de dip-film overal goed hecht.",
  },
  {
    nr: "02",
    titel: "Base",
    tekst:
      "Een dekkende basislaag wordt aangebracht — de ondergrond waarop het patroon straks zichtbaar wordt.",
  },
  {
    nr: "03",
    titel: "Film",
    tekst:
      "Een speciale hydrografische film met het gekozen patroon wordt op het wateroppervlak gelegd en geactiveerd.",
  },
  {
    nr: "04",
    titel: "Dip",
    tekst:
      "Het product wordt door de film heen het water in gedompeld. De film legt zich naadloos om elke vorm.",
  },
  {
    nr: "05",
    titel: "Finish",
    tekst:
      "Na het spoelen en drogen krijgt het product een beschermende, UV-bestendige lak — klaar voor gebruik.",
  },
];

export default function HoeWerktHet() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="eyebrow">Het proces</span>
          <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-3">
            Van kaal naar gedipt
          </h1>
          <p className="text-pearl/60 max-w-lg">
            Hydro dipping (ook wel watertransfer printing) brengt een patroon of print aan op
            vrijwel elk vormgegeven oppervlak — via water, niet via een spuitbus of sticker.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {STAPPEN.map((s) => (
            <div key={s.nr} className="flex gap-6 md:gap-10">
              <span className="font-display text-3xl text-bronze shrink-0 w-16">{s.nr}</span>
              <div>
                <h2 className="font-display text-2xl text-pearl mb-2">{s.titel}</h2>
                <p className="text-pearl/65 max-w-md">{s.tekst}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center text-center gap-5 mt-24">
          <h2 className="font-display text-3xl text-pearl">Benieuwd wat het bij jou doet?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/ontdek" className="btn-primary">
              Ontdek de mogelijkheden
            </a>
            <a href="/check-mijn-idee" className="btn-outline-dark">
              Breng het tot leven
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
