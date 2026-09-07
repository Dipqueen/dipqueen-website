import Reveal from "@/components/ui/Reveal";

export default function ClosingCta() {
  return (
    <section className="bg-bordeaux px-6 py-24 flex flex-col items-center text-center gap-4">
      <Reveal>
        <h2 className="font-display text-4xl md:text-5xl text-pearl">Klaar om te dippen?</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="text-pearl/80 max-w-md">Niet alles kan gedipt worden. Maar veel meer dan je denkt.</p>
      </Reveal>
      <Reveal delay={200}>
        <a href="/check-mijn-idee" className="btn-primary mt-4">
          Breng het tot leven
        </a>
      </Reveal>
    </section>
  );
}
