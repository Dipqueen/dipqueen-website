import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Zakelijk() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen flex flex-col items-center text-center">
        <span className="eyebrow">Zakelijk</span>
        <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-5 max-w-2xl">
          Jouw product. Jouw merk. Anything but standard.
        </h1>
        <p className="text-pearl/65 max-w-lg mb-10">
          Wij helpen bedrijven om bestaande producten visueel onderdeel van hun merk te maken —
          met branded productseries, custom patterns, logo-integratie, limited editions en
          prototypes. Van kleine oplages tot grotere series.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-14 text-left">
          <div className="border border-pearl/15 p-6">
            <h2 className="font-display text-lg text-pearl mb-2">Branded series</h2>
            <p className="text-pearl/60 text-sm">
              Eén patroon of huisstijl, consistent toegepast over een hele productlijn.
            </p>
          </div>
          <div className="border border-pearl/15 p-6">
            <h2 className="font-display text-lg text-pearl mb-2">Logo-integratie</h2>
            <p className="text-pearl/60 text-sm">
              Jouw logo of merknaam verwerkt in het patroon zelf, niet als sticker erbovenop.
            </p>
          </div>
          <div className="border border-pearl/15 p-6">
            <h2 className="font-display text-lg text-pearl mb-2">Limited editions</h2>
            <p className="text-pearl/60 text-sm">
              Kleine oplages voor events, campagnes of relatiegeschenken die opvallen.
            </p>
          </div>
        </div>

        <a href="/check-mijn-idee?categorie=Branded%20Product" className="btn-primary">
          Bespreek jouw product
        </a>
      </main>
      <Footer />
    </>
  );
}
