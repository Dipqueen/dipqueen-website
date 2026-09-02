export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-onyx/80 backdrop-blur-sm">
      <a href="/" className="flex items-center">
        <img src="/dipqueen-logo-mark.png" alt="DipQueen" className="h-9 w-auto" />
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-pearl/70">
        <a href="/inspiratie" className="hover:text-pearl">
          Inspiratie
        </a>
        <a href="/hoe-werkt-het" className="hover:text-pearl">
          Hoe werkt het
        </a>
        <a href="/zakelijk" className="hover:text-pearl">
          Zakelijk
        </a>
      </nav>
      <a
        href="/check-mijn-idee"
        className="text-xs tracking-[0.12em] uppercase font-semibold border border-pearl/40 px-5 py-2.5 text-pearl hover:border-pearl transition-colors"
      >
        Breng het tot leven
      </a>
    </header>
  );
}
