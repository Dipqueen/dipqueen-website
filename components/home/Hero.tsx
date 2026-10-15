export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center gap-6 px-6 md:px-16 pt-40 pb-24 md:pt-48 md:pb-28">
      <span className="eyebrow animate-fade-up [animation-delay:0ms]">Hydro Dipping Studio</span>
      <h1 className="font-display text-6xl md:text-7xl leading-[1.02] text-pearl animate-fade-up [animation-delay:120ms]">
        MAKE IT
        <br />
        <span className="text-bronze italic">YOURS.</span>
      </h1>
      <p className="text-lg text-pearl/70 max-w-md animate-fade-up [animation-delay:240ms]">
        Van standaard naar allesbehalve standaard. DipQueen verandert bestaande producten via
        hydro dipping, met patronen, prints en designs.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-2 animate-fade-up [animation-delay:360ms]">
        <a href="/ontdek" className="btn-primary">
          Ontdek de mogelijkheden
        </a>
        <a href="/check-mijn-idee" className="btn-outline-dark">
          Breng het tot leven
        </a>
      </div>
    </section>
  );
}
