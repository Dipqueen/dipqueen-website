"use client";

import { useEffect, useRef, useState } from "react";

const STAPPEN = ["01. PREP", "02. BASE", "03. FILM", "04. DIP", "05. FINISH"];

export default function ProcessTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-16 py-24 flex flex-col items-center">
      <span className="eyebrow">Hoe werkt het?</span>
      <h2 className="font-display text-3xl text-pearl mb-14 text-center">
        Van kaal naar gedipt in vijf stappen.
      </h2>
      <div className="flex items-center w-full mb-6">
        {STAPPEN.map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <span
              className={`w-3.5 h-3.5 rounded-full bg-bronze shrink-0 transition-all duration-500 ${
                visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            />
            {i < STAPPEN.length - 1 && (
              <span className="flex-1 h-px bg-pearl/25 mx-1 relative overflow-hidden">
                <span
                  className="absolute inset-0 bg-bronze origin-left transition-transform duration-700 ease-out"
                  style={{
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: `${i * 150 + 200}ms`,
                  }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 w-full text-center">
        {STAPPEN.map((s, i) => (
          <span
            key={s}
            className={`text-xs tracking-[0.1em] text-pearl/65 transition-all duration-500 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 150 + 100}ms` }}
          >
            {s}
          </span>
        ))}
      </div>
      <a
        href="/hoe-werkt-het"
        className="mt-10 text-sm tracking-[0.08em] uppercase text-bronze hover:text-pearl transition-colors"
      >
        Bekijk het hele proces &rarr;
      </a>
    </section>
  );
}
