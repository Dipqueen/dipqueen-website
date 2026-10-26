import Reveal from "@/components/ui/Reveal";

const ROUTES = [
  {
    nummer: "01",
    titel: "Zakelijke productseries",
    omschrijving: "Een vaste afwerkingslijn voor je volledige assortiment, consistent en schaalbaar.",
  },
  {
    nummer: "02",
    titel: "Branded objects",
    omschrijving: "Logo, kleur en patroon geïntegreerd in het product zelf — niet erop, maar erin.",
  },
  {
    nummer: "03",
    titel: "Exclusieve finishes",
    omschrijving: "Limited editions en bijzondere oppervlaktes voor premium of seizoensgebonden releases.",
  },
  {
    nummer: "04",
    titel: "Bijzondere merkconcepten",
    omschrijving: "Een idee, een samenwerking of een concept dat nog niet bestaat — wij denken mee.",
  },
];

export default function B2B() {
  return (
    <section className="bg-pearl px-6 py-24 text-onyx md:px-16 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div className="flex max-w-lg flex-col gap-4">
            <span className="eyebrow">Zakelijk</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              YOUR PRODUCT. YOUR BRAND.
              <br />
              <span className="text-bronze">Anything but standard.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-sm text-onyx/65">
            Wij helpen bedrijven om bestaande producten visueel onderdeel van hun merk te maken —
            van kleine oplages tot grotere series.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-onyx/10 md:mt-20 md:grid-cols-2">
        {ROUTES.map((r, i) => (
          <Reveal key={r.titel} delay={i * 80}>
            <a
              href="#offerte"
              className="group flex flex-col gap-3 bg-pearl p-8 transition-colors duration-300 hover:bg-onyx md:p-10"
            >
              <span className="font-display text-sm text-bronze">{r.nummer}</span>
              <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-pearl md:text-3xl">
                {r.titel}
              </h3>
              <p className="max-w-sm text-onyx/60 transition-colors duration-300 group-hover:text-pearl/65">
                {r.omschrijving}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-bronze">
                Bespreek dit
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
