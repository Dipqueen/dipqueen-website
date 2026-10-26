import Reveal from "@/components/ui/Reveal";

export default function Onderdompelen() {
  return (
    <section className="bg-pearl text-onyx px-6 md:px-16 py-24 md:py-28 flex flex-col items-center text-center gap-5">
      <Reveal>
        <span className="eyebrow text-bronze">01 — Onderdompelen</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display text-4xl md:text-5xl">
          Immerse in <span className="text-bronze italic">Identity.</span>
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="text-onyx/65 max-w-xl">
          We dompelen objecten onder in merkidentiteit. Zodat niet alleen het logo, maar het hele
          product het verhaal van een merk vertelt.
        </p>
      </Reveal>
    </section>
  );
}
