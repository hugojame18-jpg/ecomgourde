import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Shop } from "@/components/sections/Shop";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { Subscription } from "@/components/sections/Subscription";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { CostCompare } from "@/components/sections/CostCompare";
import { Reviews } from "@/components/sections/Reviews";
import { Ugc } from "@/components/sections/Ugc";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  // Titre travaillé pour la recherche : le mot-clé d'abord, la marque ensuite.
  title: {
    absolute: `Gourde à pods aromatiques — 0 sucre, 0 calorie | ${site.name}`,
  },
  description:
    "La gourde qui donne du goût à l'eau par l'odorat, sans sucre ni calorie. Gourde 650 ml en Tritan + 7 pods aromatiques à 33,45 €, livraison offerte.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  description: site.description,
  sameAs: [site.socials.instagram, site.socials.tiktok],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <HowItWorks />
      <Shop />
      <FlavorGrid />
      <CostCompare />
      <BeforeAfter />
      <Reviews />
      <Ugc />
      <FaqSection />
      <FinalCta />
    </>
  );
}
