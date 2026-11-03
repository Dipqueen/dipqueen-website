"use client";

import { useEffect, useRef, useState } from "react";

const SPRITE_SRC = "/dip-scrub-sprite.webp";
const SPRITE_COLS = 10;
const SPRITE_ROWS = 6;
const FRAME_COUNT = SPRITE_COLS * SPRITE_ROWS;
const FRAME_W = 700;
const FRAME_H = 768;

export default function ArtOfImmersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrubWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [spriteReady, setSpriteReady] = useState(false);
  const [progressPct, setProgressPct] = useState(0);

  // Tekent één frame uit de sprite-sheet op het canvas. Scherp op retina
  // schermen doordat de backing store met devicePixelRatio wordt geschaald.
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const sprite = spriteRef.current;
    if (!canvas || !sprite) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const col = index % SPRITE_COLS;
    const row = Math.floor(index / SPRITE_COLS);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      sprite,
      col * FRAME_W,
      row * FRAME_H,
      FRAME_W,
      FRAME_H,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const sprite = new Image();
    sprite.src = SPRITE_SRC;
    sprite.onload = () => {
      spriteRef.current = sprite;
      setSpriteReady(true);
      drawFrame(prefersReduced ? FRAME_COUNT - 1 : 0);
    };

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

        if (!prefersReduced && scrubWrapRef.current) {
          gsap.to(".immersion-hint", {
            opacity: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: scrubWrapRef.current,
              start: "top top",
              end: "+=15%",
              scrub: true,
            },
          });

          ScrollTrigger.create({
            trigger: scrubWrapRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            onUpdate: (self) => {
              const idx = Math.min(
                FRAME_COUNT - 1,
                Math.floor(self.progress * FRAME_COUNT)
              );
              frameRef.current = idx;
              setProgressPct(Math.round(self.progress * 100));
              if (spriteRef.current) drawFrame(idx);
            },
          });
        }
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Canvas-resolutie meegeven aan devicePixelRatio zodat het beeld scherp
  // blijft, en opnieuw tekenen als het canvas van grootte verandert.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      if (spriteRef.current) drawFrame(frameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spriteReady]);

  return (
    <section
      id="immersion"
      ref={sectionRef}
      className="relative overflow-hidden bg-onyx text-center"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.22] blur-2xl"
        style={{ backgroundImage: "url('/finish-bronze-drip.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-onyx via-onyx/70 to-onyx" />

      <div className="relative flex flex-col items-center gap-3 px-6 pt-28 md:px-16 md:pt-36">
        <span className="eyebrow immersion-line inline-block">Het proces</span>
        <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-pearl">
          <span className="immersion-line block">The Art of Immersion.</span>
          <span className="immersion-line block text-bronze italic">Not printed. Transformed.</span>
        </h2>
      </div>

      {reducedMotion ? (
        <div className="relative mx-auto mt-14 w-full max-w-lg px-6 md:max-w-xl lg:max-w-2xl">
          <div
            className="absolute -inset-6 -z-10 scale-110 bg-cover bg-center opacity-60 blur-3xl md:-inset-10"
            style={{ backgroundImage: "url('/dip-process-poster.jpg')" }}
            aria-hidden="true"
          />
          <div
            className="relative aspect-[700/768] w-full rounded-sm bg-cover bg-center shadow-[0_60px_160px_-20px_rgba(0,0,0,0.9)]"
            style={{ backgroundImage: "url('/dip-process-poster.jpg')" }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-pearl/10" />
        </div>
      ) : (
        <div ref={scrubWrapRef} className="relative mt-16 h-[280vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6">
            <div className="relative w-full max-w-sm px-6 sm:max-w-md md:max-w-lg">
              <div
                className="absolute -inset-6 -z-10 scale-110 bg-cover bg-center opacity-50 blur-3xl md:-inset-10"
                style={{ backgroundImage: "url('/dip-process-poster.jpg')" }}
                aria-hidden="true"
              />
              <canvas
                ref={canvasRef}
                className="relative aspect-[700/768] w-full rounded-sm bg-onyx shadow-[0_60px_160px_-20px_rgba(0,0,0,0.9)]"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-pearl/10" />

              <div className="immersion-hint pointer-events-none absolute -bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-pearl/50">
                <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll om te dippen</span>
                <span className="animate-float text-sm">↓</span>
              </div>
            </div>

            <div
              className="flex w-full max-w-sm items-center gap-3 px-6 text-pearl/40 sm:max-w-md md:max-w-lg"
              aria-hidden="true"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.25em]">Onderdompeling</span>
              <span className="h-px flex-1 bg-pearl/15">
                <span
                  className="block h-px bg-bronze transition-[width] duration-75 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right font-mono text-[0.65rem] tabular-nums">
                {progressPct}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="immersion-copy relative mx-auto flex max-w-xl flex-col gap-4 px-6 pb-28 pt-4 text-pearl/70 md:px-16 md:pb-36">
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
