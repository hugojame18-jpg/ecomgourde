import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductMedia } from "@/components/visuals/ProductVisual";
import { Price, Rating, ProductBadge } from "@/components/ui/Primitives";
import { formatPrice, cx } from "@/lib/format";

export function BundleCard({ product, featured }: { product: Product; featured?: boolean }) {
  const saving = (product.compareAtPrice ?? product.price) - product.price;
  const ratio = product.compareAtPrice ? product.price / product.compareAtPrice : 1;

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-[28px] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1",
        featured ? "bg-berry text-white" : "border border-ink/10 bg-white",
      )}
    >
      {product.badge ? (
        <span className="absolute left-5 top-5 z-10">
          <ProductBadge tone={featured ? "brand" : "ink"}>{product.badge}</ProductBadge>
        </span>
      ) : null}

      <Link href={`/produit/${product.slug}`} className="relative block">
        <div
          className="relative flex aspect-[5/4] items-center justify-center"
          style={{
            background: featured
              ? `radial-gradient(circle at 50% 40%, ${product.visual.color}33, transparent 65%)`
              : `linear-gradient(170deg, ${product.visual.color}17, transparent 65%)`,
          }}
        >
          <div className="relative h-[86%] w-[86%] transition-transform duration-500 group-hover:scale-[1.04]">
            <ProductMedia
              image={product.images[0]}
              alt={product.name}
              visual={product.visual}
              sizes="(max-width: 768px) 90vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Rating value={product.rating} count={product.reviewCount} size={13} />
        <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em] md:text-[27px]">
          <Link href={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={cx("mt-1 text-[14px]", featured ? "text-white/60" : "text-ink-600")}>
          {product.tagline}
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {(product.includes ?? []).slice(0, 4).map((inc) => (
            <li key={inc} className="flex items-start gap-2.5 text-[14px]">
              <span
                className={cx(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-bold",
                  featured ? "bg-brand text-ink" : "bg-brand-soft text-brand-dark",
                )}
              >
                ✓
              </span>
              <span className={featured ? "text-white/75" : "text-ink-600"}>{inc}</span>
            </li>
          ))}
        </ul>

        {/* Visualisation de l'économie */}
        {product.compareAtPrice ? (
          <div className="mt-5">
            <div className="flex items-center justify-between text-[12px]">
              <span className={featured ? "text-white/45" : "text-ink-400"}>À l&apos;unité</span>
              <span className={cx("line-through", featured ? "text-white/45" : "text-ink-400")}>
                {formatPrice(product.compareAtPrice)}
              </span>
            </div>
            <div
              className={cx(
                "mt-1.5 h-2 w-full overflow-hidden rounded-full",
                featured ? "bg-white/12" : "bg-ink/8",
              )}
            >
              <div className="h-full rounded-full bg-brand" style={{ width: `${ratio * 100}%` }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[12px]">
              <span className={cx("font-semibold", featured ? "text-brand" : "text-brand-dark")}>
                En pack — tu économises {formatPrice(saving)}
              </span>
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Price value={product.price} compareAt={product.compareAtPrice} size="lg" />
          <Link
            href={`/produit/${product.slug}`}
            className={cx(
              "inline-flex h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors",
              featured ? "bg-white text-berry hover:bg-white/90" : "bg-berry text-white hover:bg-berry-deep",
            )}
          >
            Composer
          </Link>
        </div>
      </div>
    </article>
  );
}
