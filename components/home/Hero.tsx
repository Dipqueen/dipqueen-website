export default function Hero() {
  return (
    <section className="relative flex items-center gap-16 px-6 md:px-16 pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      <div className="flex-1 max-w-xl flex flex-col gap-6 z-10">
        <span className="eyebrow">Hydro Dipping Studio</span>
        <h1 className="font-display text-6xl md:text-7xl leading-[1.02] text-pearl">
          MAKE IT
          <br />
          <span className="text-bronze italic">YOURS.</span>
        </h1>
        <p className="text-lg text-pearl/70 max-w-md">
          Van standaard naar allesbehalve standaard. DipQueen verandert bestaande producten met
          patronen, prints en designs — via hydro dipping.
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          <a href="/ontdek" className="btn-primary">
            Ontdek de mogelijkheden
          </a>
          <a href="/check-mijn-idee" className="btn-outline-dark">
            Breng het tot leven
          </a>
        </div>
      </div>

      <div className="hidden md:block relative flex-1 h-[560px]">
        <div className="pat-marble rounded-blob absolute w-[380px] h-[440px] right-12 top-4" />
        <div className="pat-carbon rounded-blob absolute w-[190px] h-[190px] right-[300px] top-[290px] opacity-90" />
      </div>
    </section>
  );
}
