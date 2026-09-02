import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BeforeAfter from "@/components/home/BeforeAfter";
import WhatCanWeDip from "@/components/home/WhatCanWeDip";
import B2B from "@/components/home/B2B";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import ClosingCta from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BeforeAfter />
        <WhatCanWeDip />
        <B2B />
        <ProcessTeaser />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
