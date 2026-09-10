import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { RevealItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/format";

export function ProductGrid({
  products,
  className,
  cols = 4,
}: {
  products: Product[];
  className?: string;
  cols?: 3 | 4;
}) {
  return (
    <ul
      className={cx(
        "grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-6 md:gap-y-12",
        cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((p, i) => (
        <RevealItem key={p.id} delay={(i % 4) * 0.06} className="h-full">
          <ProductCard product={p} priority={i < 2} />
        </RevealItem>
      ))}
    </ul>
  );
}
