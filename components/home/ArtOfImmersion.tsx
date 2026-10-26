"use client";

import { useEffect, useRef } from "react";

export default function ArtOfImmersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      videoRef.current?.pause();
      return;
    }

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".immersion-line", {
          opacity: 0,
          yPercent: 45,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
        gsap.from(".immersion-video-wrap", {
          opacity: 0,
          y: 36,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".immersion-video-wrap",
            start: "top 80%",
          },
        });
        gsap.from(".immersion-copy", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".immersion-copy",
            start: "top 85%",
          },
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      id="immersion"
      ref={sectionRef}
      className="relative flex flex-col items-center gap-14 overflow-hidden bg-onyx px-6 py-28 text-center md:px-16 md:py-36"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="eyebrow immersion-line inline-block">Het proces</span>
        <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-pearl">
          <span className="immersion-line block">The Art of Immersion.</span>
          <span className="immersion-line block text-bronze italic">Not printed. Transformed.</span>
        </h2>
      </div>

      <div className="immersion-video-wrap relative w-full max-w-md">
        <div
          className="absolute inset-0 -z-10 scale-125 bg-cover bg-center opacity-40 blur-3xl"
          style={{ backgroundImage: "url('/dip-process-poster.jpg')" }}
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          className="relative w-full rounded-sm shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          src="/dip-hero-loop.mp4"
          poster="/dip-process-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-pearl/10" />
      </div>

      <div className="immersion-copy flex max-w-xl flex-col gap-4 text-pearl/70">
        <p>
          Wij gaan verder dan de oppervlakte. We dompelen producten onder in de identiteit van een
          merk en transformeren ze tot onderscheidende objecten die indruk maken.
        </p>
        <p>
          Van een verfijnde finish tot een onvergetelijk moment. Elk detail draagt bij aan een
          beleving die verder gaat dan alleen het product.
        </p>
        <p className="mt-2 font-display text-lg italic text-bronze">
          Niet zomaar gezien. Maar ervaren.
        </p>
      </div>
    </section>
  );
}
