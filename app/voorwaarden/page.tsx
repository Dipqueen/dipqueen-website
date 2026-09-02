import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Voorwaarden() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 text-pearl/75 text-sm leading-relaxed">
          <div>
            <span className="eyebrow">Voorwaarden</span>
            <h1 className="font-display text-4xl text-pearl mt-2 mb-2">Gebruiksvoorwaarden</h1>
            <p className="text-pearl/40 text-xs">
              Concept-tekst — laat deze pagina nog juridisch checken voordat de site publiek gaat.
            </p>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Wat deze website wel doet</h2>
            <p>
              Deze website laat zien wat er mogelijk is met hydro dipping en biedt een manier om
              een idee of aanvraag bij ons in te dienen via "Breng het tot leven".
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Wat deze website niet doet</h2>
            <p>
              Er is geen webshop: het insturen van een idee is een aanvraag, geen bestelling. Er
              wordt niets automatisch geproduceerd of in rekening gebracht. Elke aanvraag wordt
              persoonlijk beoordeeld; pas na akkoord van beide kanten volgt een offerte en
              eventuele order.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Voorbeelden en mockups</h2>
            <p>
              Afbeeldingen in de Inspiration Studio zijn impressies op basis van goedgekeurde
              patronen en geven geen exacte weergave van jouw eigen product.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Intellectueel eigendom</h2>
            <p>
              Alle content op deze website — teksten, beelden en patronen — is eigendom van
              DipQueen BV, tenzij anders vermeld.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Contact</h2>
            <p>Vragen over deze voorwaarden? Neem contact met ons op.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
