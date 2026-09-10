import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Comment fonctionne une gourde à pods aromatiques",
  alternates: { canonical: "/comment-ca-marche" },
  description:
    "Le pod diffuse l'arôme par l'air, pas dans l'eau. Trois étapes pour transformer un verre d'eau en boisson que tu as envie de finir.",
};

export default function HowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le principe"
        title="Le goût passe par le nez, pas par l'eau."
        text="80 % de ce qu'on appelle « le goût » vient de l'odorat. Le pod exploite ça : l'air chargé d'arôme rejoint l'eau au moment où tu bois."
        tone="dark"
      />
      <HowItWorks />
      <BeforeAfter />
      <FlavorGrid />
      <FaqSection />
      <FinalCta />
    </>
  );
}
