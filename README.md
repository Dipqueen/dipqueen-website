# DipQueen Website

Publieke marketingwebsite voor DipQueen BV — dipqueen.nl. Los van de interne Portal-app
(`dipqueen-app`), met een eigen GitHub-repo, Vercel-project en Supabase-project.

**Fase 1:** inspireren + offerteaanvragen verzamelen ("Check mijn idee"). Nog geen webshop.

## Techniek

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Supabase voor database en storage (project `dipqueen-website`, eu-central-1)
- Vercel voor hosting — deployt automatisch bij elke push naar `main`

De publiceerbare Supabase-sleutel in `lib/supabase/client.ts` is bewust openbaar. De
beveiliging zit in Row Level Security op de database.

## Structuur

    app/
      page.tsx              homepage
      layout.tsx             fonts, metadata
      globals.css             Tailwind + patroon-CSS (marble, camo, carbon, wood, ...)
    components/
      layout/                 Header, Footer
      home/                    Hero, BeforeAfter, WhatCanWeDip, B2B, ProcessTeaser, ClosingCta
    lib/supabase/
      client.ts                browser-client

## Wat er nog komt

Inspiration Studio (4 stappen), Check Mijn Idee-wizard, Inspiration Wall, hoe-werkt-het
pagina, admin. Zie het projectdocument "DipQueen Website — concept en architectuur voorstel"
voor het volledige plan.

## Lokaal draaien

    npm install
    npm run dev

## Deployen

Wijzigingen gaan live met `bash push.sh` (zelfde patroon als bij de Portal). Vercel bouwt
automatisch bij elke push naar `main`.
