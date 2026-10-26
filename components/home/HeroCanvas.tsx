"use client";

import { useEffect, useRef } from "react";

const KLEUREN = ["#8C6A4A", "#5E1F3A", "#6b4a33"];

type Blob = {
  kleur: string;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  t: number;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const beperkteBeweging = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let frame = 0;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const blobs: Blob[] = KLEUREN.map((kleur, i) => ({
      kleur,
      x: Math.random() * width,
      y: Math.random() * height,
      r: 200 + i * 70,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      t: Math.random() * 1000,
    }));

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        b.t += 0.004;
        b.x += b.vx + Math.sin(b.t) * 0.3;
        b.y += b.vy + Math.cos(b.t * 0.8) * 0.3;
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;

        const gradient = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, `${b.kleur}33`);
        gradient.addColorStop(1, `${b.kleur}00`);
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!beperkteBeweging) {
        frame = requestAnimationFrame(draw);
      }
    }
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
