export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-12 py-14 border-t border-pearl/10">
      <div className="flex flex-col gap-1.5 items-center md:items-start">
        <span className="font-display text-xl tracking-[0.14em] text-pearl">DIPQUEEN</span>
        <span className="text-[11px] tracking-[0.1em] text-pearl/45">PREMIUM FINISHES. MULTI DIPPED.</span>
      </div>
      <nav className="flex gap-8 text-sm text-pearl/70">
        <a href="/inspiratie" className="hover:text-pearl">
          Inspiratie
        </a>
        <a href="/hoe-werkt-het" className="hover:text-pearl">
          Hoe werkt het
        </a>
        <a href="/zakelijk" className="hover:text-pearl">
          Zakelijk
        </a>
        <a href="/contact" className="hover:text-pearl">
          Contact
        </a>
      </nav>
      <div className="flex gap-5 text-xs text-pearl/40">
        <a href="/privacy" className="hover:text-pearl/70">
          Privacy
        </a>
        <a href="/voorwaarden" className="hover:text-pearl/70">
          Voorwaarden
        </a>
      </div>
    </footer>
  );
}
