import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/Primitives";
import { RevealItem } from "@/components/ui/Reveal";

/**
 * Catalogue à deux offres : pas d'onglets de catégories, on montre tout.
 */
export function Shop() {
  return (
    <section id="boutique" className="section bg-[linear-gradient(180deg,#f8f2ff_0%,#ffeef6_100%)]">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="La boutique"
            title={
              <>
                Deux offres.
                <br />
                Aucune prise de tête.
              </>
            }
            text="La même gourde, seule ou accompagnée des sept arômes de la gamme."
          />
          <Link
            href="/gourdes"
            className="hidden shrink-0 text-[15px] font-semibold underline underline-offset-4 hover:text-brand-dark md:block"
          >
            Voir le détail →
          </Link>
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 md:mt-12 md:gap-x-6 md:gap-y-12">
          {products.map((p, i) => (
            <RevealItem key={p.id} delay={i * 0.08} className="h-full">
              <ProductCard product={p} priority={i < 2} />
            </RevealItem>
          ))}
        </ul>

        <div className="mt-9 flex justify-center md:hidden">
          <Link href="/gourdes" className="text-[15px] font-semibold underline underline-offset-4">
            Voir le détail →
          </Link>
        </div>
      </div>
    </section>
  );
}
