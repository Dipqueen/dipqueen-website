const VOORBEELDEN = [
  { label: "Branded Product — Logo", pattern: "pat-abstract" },
  { label: "Toolcover — Carbon", pattern: "pat-carbon" },
  { label: "Lifestyle — Marble", pattern: "pat-marble" },
];

function SliderHandle() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-pearl flex items-center justify-center shadow-lg">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path d="M7 1 L1 7 L7 13" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 1 L17 7 L11 13" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-pearl text-onyx px-6 md:px-16 py-24 md:py-28 flex flex-col items-center">
      <span className="eyebrow">Het resultaat</span>
      <h2 className="font-display text-4xl md:text-5xl mb-14 text-center">
        STANDARD <span className="text-bronze">&rarr;</span> DIPQUEEN
      </h2>
      <div className="grid md:grid-cols-3 gap-10 w-full">
        {VOORBEELDEN.map((v) => (
          <div key={v.label} className="flex flex-col gap-4">
            <div className="relative h-64 rounded overflow-hidden flex">
              <div className="flex-1 bg-onyx" />
              <div className={`flex-1 ${v.pattern}`} />
              <SliderHandle />
            </div>
            <span className="text-sm tracking-[0.1em] uppercase font-semibold">{v.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
