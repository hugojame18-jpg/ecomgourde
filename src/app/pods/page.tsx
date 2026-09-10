import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { SectionHeading } from "@/components/ui/Primitives";
import { FaqSection } from "@/components/sections/FaqSection";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Les 7 arômes : pods sans sucre ni calorie",
  alternates: { canonical: "/pods" },
  description:
    "Les sept arômes livrés avec la gourde : orange, citron, énergie, ananas, cola, pêche, raisin blanc. 0 sucre, 0 calorie.",
};

export default function FlavorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Les goûts"
        title="Sept arômes. Un dans chaque pack."
        text="Des arômes naturels diffusés par l'air, jamais dilués dans l'eau. Les sept sont livrés ensemble avec la gourde : un pod de chaque, rien à choisir."
      />

      <FlavorGrid
        title="Les sept arômes du pack."
        text="Un pod, un goût, environ 5 litres d'eau parfumée. Les sept arrivent ensemble dans le pack gourde."
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
