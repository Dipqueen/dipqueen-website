import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 pt-40 pb-28 min-h-screen flex flex-col items-center text-center">
        <span className="eyebrow">Contact</span>
        <h1 className="font-display text-4xl md:text-5xl text-pearl mt-2 mb-5">
          Liever direct contact?
        </h1>
        <p className="text-pearl/65 max-w-md mb-3">
          Voor een specifiek idee of aanvraag komt "Breng het tot leven" het snelst bij het juiste
          team terecht.
        </p>
        <p className="text-pearl/40 text-xs max-w-md mb-10">
          [Plaats hier het gewenste contact-e-mailadres en/of telefoonnummer — nog in te vullen.]
        </p>
        <a href="/check-mijn-idee" className="btn-primary">
          Breng het tot leven
        </a>
      </main>
      <Footer />
    </>
  );
}
