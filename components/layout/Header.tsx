export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-onyx/80 backdrop-blur-sm">
      <a href="/" className="flex items-center">
        <img src="/dipqueen-logo-mark.png" alt="DipQueen" className="h-9 w-auto" />
      </a>
      <a
        href="#offerte"
        className="text-xs tracking-[0.12em] uppercase font-semibold border border-pearl/40 px-5 py-2.5 text-pearl hover:border-pearl transition-colors"
      >
        Vraag offerte aan
      </a>
    </header>
  );
}
