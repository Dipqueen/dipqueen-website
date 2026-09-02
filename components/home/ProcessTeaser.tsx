const STAPPEN = ["01 — PREP", "02 — BASE", "03 — FILM", "04 — DIP", "05 — FINISH"];

export default function ProcessTeaser() {
  return (
    <section className="px-6 md:px-16 py-24 flex flex-col items-center">
      <span className="eyebrow">Hoe werkt het?</span>
      <h2 className="font-display text-3xl text-pearl mb-14 text-center">
        Van kaal naar gedipt in vijf stappen.
      </h2>
      <div className="flex items-center w-full mb-6">
        {STAPPEN.map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <span className="w-3.5 h-3.5 rounded-full bg-bronze shrink-0" />
            {i < STAPPEN.length - 1 && <span className="flex-1 h-px bg-pearl/25 mx-1" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 w-full text-center">
        {STAPPEN.map((s) => (
          <span key={s} className="text-xs tracking-[0.1em] text-pearl/65">
            {s}
          </span>
        ))}
      </div>
      <a href="/hoe-werkt-het" className="mt-10 text-sm tracking-[0.08em] uppercase text-bronze hover:text-pearl">
        Bekijk het hele proces &rarr;
      </a>
    </section>
  );
}
