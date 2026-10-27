"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.to(".hero-parallax", {
          yPercent: 16,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-copy", {
          opacity: 0,
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "65% top",
            scrub: true,
          },
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-onyx px-6 text-center md:px-16"
    >
      <div className="hero-parallax absolute inset-0">
        <div
          className="hero-kenburns h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/finish-bordeaux-wave.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/80 via-onyx/55 to-onyx" />
      </div>

      <div className="hero-copy relative z-10 flex flex-col items-center gap-6">
        <span className="eyebrow tracking-[0.35em] animate-fade-up [animation-delay:0ms]">
          DipQueen
        </span>
        <h1 className="font-display text-[clamp(3.2rem,11vw,9.5rem)] leading-[0.92] tracking-tight text-pearl animate-fade-up [animation-delay:120ms]">
          Beyond the
          <br />
          <span className="text-bronze italic">Surface.</span>
        </h1>
        <p className="max-w-md text-lg text-pearl/75 animate-fade-up [animation-delay:260ms]">
          Wij dompelen producten onder in merkidentiteit.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 animate-fade-up [animation-delay:380ms]">
          <a href="#offerte" className="btn-primary">
            Vraag een offerte aan
          </a>
          <a href="#immersion" className="btn-outline-dark">
            Bekijk het proces
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-fade-up text-pearl/50 [animation-delay:600ms]">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
