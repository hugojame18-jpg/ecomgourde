import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { SectionHeading } from "@/components/ui/Primitives";
import { FaqSection } from "@/components/sections/FaqSection";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Pods aromatiques : 17 goûts sans sucre",
  alternates: { canonical: "/pods" },
  description:
    "Dix arômes vendus à l'unité — banane, café, pastèque menthe, ananas, pêche, raisin blanc, pomme, fraise pastèque, fruit du dragon, punch fruité — et sept arômes réservés aux packs gourde. 0 sucre, 0 calorie.",
};

export default function FlavorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Les goûts"
        title="Dix-sept arômes. Dix à l'unité."
        text="Des arômes naturels diffusés par l'air, jamais dilués dans l'eau. Dix sont vendus à l'unité : tu choisis exactement celui que tu veux. Les sept autres ne s'obtiennent qu'avec une gourde."
      />

      <FlavorGrid
        title="Choisis ton arôme."
        text="Les arômes à l'unité sont vendus au pod : un pod, un goût, environ 5 litres d'eau parfumée. Les sept arômes de base, eux, sont réservés aux packs gourde."
      />

      <section className="section bg-mist">
        <div className="shell">
          <SectionHeading
            eyebrow="Pas encore de gourde ?"
            title="Commence par un pack."
            text="Le pack gourde + 7 pods contient les sept arômes de base, un pod de chaque. Le pack gourde + 1 pod en tire un au hasard."
          />
          <div className="mt-8 md:mt-12">
            <ProductGrid products={products} cols={3} />
          </div>
        </div>
      </section>

      <FaqSection items={faq.slice(0, 5)} />
    </>
  );
}
