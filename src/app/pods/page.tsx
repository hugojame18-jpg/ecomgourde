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

      {/* Annonce volontairement sans date ni précommande : on annonce une
          intention, on ne prend pas d'engagement qu'on ne pourrait pas tenir. */}
      <section className="section bg-white pt-0">
        <div className="shell">
          <div className="rounded-[26px] border border-berry/20 bg-berry-soft px-6 py-8 text-center md:px-10 md:py-10">
            <p className="eyebrow justify-center text-berry">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
              Bientôt
            </p>
            <h2 className="mx-auto mt-3 max-w-[22ch] text-[26px] font-bold leading-[1.05] tracking-[-0.035em] md:text-[34px]">
              D&apos;autres goûts arrivent.
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-600">
              La gamme ne s&apos;arrête pas à sept. De nouveaux arômes et des recharges vendues à
              l&apos;unité seront mis en vente prochainement, pour racheter uniquement les goûts que
              tu préfères.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="shell">
          <SectionHeading
            eyebrow="Pas encore de gourde ?"
            title="Commence par un pack."
            text="Le pack gourde + 7 pods contient les sept arômes, un pod de chaque."
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
