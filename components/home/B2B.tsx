export default function B2B() {
  return (
    <section className="bg-pearl text-onyx px-6 md:px-16 py-24 md:py-28 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 max-w-lg flex flex-col gap-5">
        <span className="eyebrow">Zakelijk</span>
        <h2 className="font-display text-4xl leading-tight">
          YOUR PRODUCT.
          <br />
          YOUR BRAND.
          <br />
          <span className="text-bronze">Anything but standard.</span>
        </h2>
        <p className="text-onyx/70 max-w-md">
          Wij helpen bedrijven om bestaande producten visueel onderdeel van hun merk te maken —
          met branded productseries, custom patterns, logo-integratie, limited editions en
          prototypes. Kleine en grotere series.
        </p>
        <a href="/zakelijk" className="btn-outline-light self-start mt-2">
          Bespreek jouw product
        </a>
      </div>
      <div className="flex-1 flex items-center justify-center gap-7">
        <div className="rounded-blob w-56 h-64 bg-onyx" />
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4v20M4 14h20" stroke="#8C6A4A" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="rounded-blob w-56 h-64 pat-abstract" />
      </div>
    </section>
  );
}
