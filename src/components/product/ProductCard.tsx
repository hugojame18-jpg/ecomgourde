"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductMedia } from "@/components/visuals/ProductVisual";
import { Price, Rating, ProductBadge } from "@/components/ui/Primitives";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { cx } from "@/lib/format";
import { site } from "@/data/site";

export function ProductCard({
  product,
  priority,
  compact,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const tint = product.visual.color;
  const photo = product.images[0];
  // Les pods sont détourés : on les laisse flotter sur du blanc plutôt que sur
  // un aplat de couleur, qui donnait l'impression d'une image non détourée.
  const cardBg =
    product.category === "pod"
      ? "#ffffff"
      : photo
        ? (product.visual.accent ?? "#f4f6f5")
        : `linear-gradient(165deg, ${tint}1f, ${tint}08 62%, #ffffff)`;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/produit/${product.slug}`}
        className="relative block overflow-hidden rounded-[26px]"
        style={{ background: cardBg }}
      >
        <div
          className={cx(
            "relative flex items-center justify-center",
            photo || compact ? "aspect-[4/5]" : "aspect-[4/5] sm:aspect-square",
          )}
        >
          <div
            className={cx(
              "relative transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]",
              photo ? "h-full w-full" : "h-[78%] w-[78%]",
            )}
          >
            <ProductMedia
              image={product.images[0]}
              alt={product.name}
              visual={product.visual}
              priority={priority}
            />
          </div>
        </div>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <ProductBadge tone={product.bestSeller ? "ink" : "light"}>{product.badge}</ProductBadge>
          ) : null}
        </div>

        {product.colors ? (
          <div className="absolute bottom-3 left-3 flex gap-1.5 rounded-full bg-white/70 px-2 py-1.5 backdrop-blur-sm">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                style={{ background: c.hex }}
              />
            ))}
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        {site.hasRealReviews ? (
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        ) : null}
        <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
          <Link href={`/produit/${product.slug}`} className="hover:opacity-70">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[13px] leading-snug text-ink-400">{product.tagline}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <Price value={product.price} compareAt={product.compareAtPrice} />
        </div>
        <div className="mt-3">
          {product.flavorPicks ? (
            <Link
              href={`/produit/${product.slug}`}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-berry text-[14px] font-semibold text-white transition-colors hover:bg-berry-deep"
            >
              Composer mon pack
            </Link>
          ) : (
            <AddToCartButton
              product={product}
              variant="outline"
              size="sm"
              full
              className="h-11 text-[14px] group-hover:border-ink/40"
              variantLabel={product.colors?.[0]?.name}
            />
          )}
        </div>
      </div>
    </article>
  );
}
