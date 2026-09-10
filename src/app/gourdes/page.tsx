import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Gourde à pods aromatiques 650 ml en Tritan",
  alternates: { canonical: "/gourdes" },
  description:
    "La Flow Bottle : gourde 650 ml en Tritan translucide avec porte-pod intégré. Livrée avec 1 pod surprise, ou avec les 7 arômes de la gamme.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="La boutique"
        title="Une gourde faite pour être finie."
        text="Tritan translucide, 650 ml, bouchon clipsable anti-fuite et porte-pod intégré. Quatre coloris au choix. Le pack de 7 contient un pod de chaque arôme."
      />

      <section className="section bg-white">
        <div className="shell">
          <ProductGrid products={products} cols={3} />
        </div>
      </section>

      <FlavorGrid />
      <Reviews />
      <FinalCta />
    </>
  );
}
