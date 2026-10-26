import HeroCanvas from "@/components/home/HeroCanvas";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center px-6 md:px-16 pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      <HeroCanvas />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
        <span className="eyebrow tracking-[0.3em] animate-fade-up [animation-delay:0ms]">DipQueen</span>
        <h1 className="font-display text-7xl md:text-8xl leading-[0.98] tracking-tight text-pearl">
          <span className="inline-block animate-fade-up [animation-delay:80ms]">Beyond</span>{" "}
          <span className="inline-block animate-fade-up [animation-delay:160ms]">the</span>
          <br />
          <span className="inline-block text-bronze italic animate-fade-up [animation-delay:260ms]">
            Surface.
          </span>
        </h1>
        <p className="text-lg text-pearl/70 max-w-md animate-fade-up [animation-delay:360ms]">
          Waar afwerking overgaat in merkbeleving.
        </p>

        <div className="w-16 h-px bg-bronze/40 my-2 animate-fade-up [animation-delay:420ms]" />

        <div className="flex flex-col gap-4 text-pearl/70 max-w-lg animate-fade-up [animation-delay:480ms]">
          <p>
            Wij gaan verder dan de oppervlakte. We dompelen producten onder in de identiteit van
            een merk en transformeren ze tot onderscheidende objecten die indruk maken.
          </p>
          <p>
            Van een verfijnde finish tot een onvergetelijk moment. Elk detail draagt bij aan een
            beleving die verder gaat dan alleen het product.
          </p>
        </div>

        <p className="font-display italic text-bronze text-xl animate-fade-up [animation-delay:540ms]">
          Niet zomaar gezien. Maar ervaren.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-4 animate-fade-up [animation-delay:600ms]">
          <a href="#offerte" className="btn-primary">
            Vraag een offerte aan
          </a>
        </div>
      </div>
    </section>
  );
}
