import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Onderdompelen from "@/components/home/Onderdompelen";
import WhatCanWeDip from "@/components/home/WhatCanWeDip";
import B2B from "@/components/home/B2B";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import ClosingCta from "@/components/home/ClosingCta";
import Offerte from "@/components/home/Offerte";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Onderdompelen />
        <WhatCanWeDip />
        <B2B />
        <ProcessTeaser />
        <ClosingCta />
        <Offerte />
      </main>
      <Footer />
    </>
  );
}
