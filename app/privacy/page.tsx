import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 text-pearl/75 text-sm leading-relaxed">
          <div>
            <span className="eyebrow">Privacy</span>
            <h1 className="font-display text-4xl text-pearl mt-2 mb-2">Privacyverklaring</h1>
            <p className="text-pearl/40 text-xs">
              Concept-tekst — laat deze pagina nog juridisch checken voordat de site publiek gaat.
            </p>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Wie we zijn</h2>
            <p>
              Deze website wordt beheerd door DipQueen BV. Via deze site verzamelen we gegevens
              die je zelf invult bij "Breng het tot leven" (het idee-aanvraagformulier).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Welke gegevens we verzamelen</h2>
            <p>
              Naam, e-mailadres, telefoonnummer en bedrijfsnaam (indien opgegeven), een
              omschrijving van je idee, en eventueel geüploade foto's van je product of
              inspiratie.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Waar we het voor gebruiken</h2>
            <p>
              Uitsluitend om jouw aanvraag te beoordelen en contact met je op te nemen over de
              mogelijkheden. Het insturen van een idee is geen bestelling en leidt niet
              automatisch tot een order.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Waar het wordt opgeslagen</h2>
            <p>
              Gegevens worden opgeslagen bij Supabase, in een datacenter binnen de EU
              (Frankfurt). Alleen het DipQueen-team heeft toegang.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-xl text-pearl">Jouw rechten</h2>
            <p>
              Je kunt op elk moment vragen om inzage, correctie of verwijdering van jouw gegevens.
              Neem hiervoor contact met ons op.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
