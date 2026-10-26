/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Tijdelijk offline tot er echte product/before-after foto's zijn: de site
    // is voor nu een one-pager. De pagina's zelf blijven gewoon in de code
    // staan, dus dit is zo weer aan te zetten door deze lijst leeg te maken.
    return [
      { source: "/ontdek", destination: "/", permanent: false },
      { source: "/ontdek/:categorie*", destination: "/", permanent: false },
      { source: "/check-mijn-idee", destination: "/#offerte", permanent: false },
      { source: "/inspiratie", destination: "/", permanent: false },
      { source: "/hoe-werkt-het", destination: "/", permanent: false },
      { source: "/zakelijk", destination: "/#offerte", permanent: false },
      { source: "/contact", destination: "/#offerte", permanent: false },
    ];
  },
};

module.exports = nextConfig;
