"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { FeatureList } from "./FeatureIcons";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Rating } from "@/components/ui/Primitives";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, discountPercent, cx } from "@/lib/format";
import { packFlavors } from "@/data/flavors";
import { site } from "@/data/site";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  // Le coloris ouvert par défaut est celui de la photo de la vignette catalogue,
  // pour que la fiche montre bien la gourde sur laquelle on vient de cliquer.
  const defaultColor = Math.max(
    0,
    product.colors?.findIndex((c) => c.image === product.images[0]) ?? 0,
  );
  const [colorIndex, setColorIndex] = useState(defaultColor);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const color = product.colors?.[colorIndex];
  const accent = color?.hex ?? product.visual.color;
  const saving = (product.compareAtPrice ?? product.price) - product.price;
  const subtitle = [color?.name, ...(product.subtitleParts ?? [])].filter(Boolean).join(" · ");

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const addToCart = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: color?.image ?? product.images[0],
      visual: { ...product.visual, color: accent },
      freeShipping: product.freeShipping,
      variant: color?.name,
      flavors: product.category === "pod" ? product.flavorIds : undefined,
      quantity,
    });
  };

  const heroImage = color?.image ?? product.images[0];

  return (
    <>
      <div className="shell grid gap-8 pb-10 pt-6 md:pb-16 md:pt-8 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            product={product}
            color={color?.hex}
            images={color?.gallery ?? (color?.image ? [color.image] : undefined)}
          />
        </div>

        <div className="flex flex-col">
          {/* Bandeau de confiance */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {product.badge ? (
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
                style={{ background: accent }}
              >
                {product.badge}
              </span>
            ) : null}
            <span className="flex items-center gap-2">
              <Rating value={product.rating} size={14} showValue />
              <a
                href="#avis-produit"
                className="text-[13px] text-ink-400 underline underline-offset-4 hover:text-ink"
              >
                {product.reviewCount.toLocaleString("fr-FR")} avis
              </a>
            </span>
          </div>

          <h1
            className="mt-3 font-display text-[36px] font-bold uppercase leading-[0.92] tracking-[-0.035em] md:text-[50px]"
            style={{ color: accent }}
          >
            {product.name}
          </h1>
          {subtitle ? (
            <p className="mt-1.5 text-[14px] font-medium text-ink-600 md:text-[15px]">{subtitle}</p>
          ) : null}

          {/* Coloris en vignettes photo */}
          {product.colors && product.colors.length > 1 ? (
            <div className="mt-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
                Coloris
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColorIndex(i)}
                    aria-label={c.name}
                    aria-pressed={i === colorIndex}
                    className={cx(
                      "relative h-[62px] w-[62px] overflow-hidden rounded-2xl border-2 transition-all duration-200",
                      i === colorIndex
                        ? "scale-[1.03] border-ink"
                        : "border-transparent opacity-80 hover:opacity-100",
                    )}
                    style={{ background: c.accent ?? "#f4f6f5" }}
                  >
                    {c.image ? (
                      <Image src={c.image} alt="" fill sizes="62px" className="object-contain" />
                    ) : (
                      <span
                        className="absolute inset-3 rounded-full"
                        style={{ background: c.hex }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Les goûts livrés avec la gourde, juste sous les coloris : le client
              doit savoir ce qu'il reçoit avant d'ajouter au panier. */}
          {product.pods ? (
            <div className="mt-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
                  {product.pods.count === 1 ? "Le goût livré" : "Les goûts livrés"}
                </p>
                <span
                  className={cx(
                    "rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
                    product.pods.pick === "all"
                      ? "bg-brand-soft text-brand-dark"
                      : "bg-berry-soft text-berry",
                  )}
                >
                  {product.pods.pick === "all" ? "✓ Les 7 arômes inclus" : "🎲 Tirage au hasard"}
                </span>
              </div>
              <ul className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3 sm:grid-cols-7">
                {packFlavors.map((f) => (
                  <li key={f.id} className="flex flex-col items-center text-center">
                    <span className="relative block aspect-square w-full max-w-[56px]">
                      <Image
                        src={f.podImage ?? ""}
                        alt={f.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </span>
                    <span className="mt-1 text-[10.5px] font-medium leading-tight text-ink-600">
                      {f.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[13.5px] leading-snug text-ink-600">
                {product.pods.pick === "all" ? (
                  <>
                    Un pod de <span className="font-semibold text-ink">chaque arôme</span> : tu
                    reçois les sept, rien n&apos;est tiré au sort.
                  </>
                ) : (
                  <>
                    1 pod pris au hasard parmi ces 7 arômes.{" "}
                    <Link
                      href="/produit/flow-bottle-7-pods"
                      className="font-semibold text-berry underline underline-offset-2"
                    >
                      Les vouloir tous les sept
                    </Link>
                  </>
                )}
              </p>
            </div>
          ) : null}

          {/* Achat */}
          <div ref={ctaRef} className="mt-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantitySelector value={quantity} onChange={setQuantity} className="w-fit" />
              <button
                type="button"
                onClick={addToCart}
                className="flex h-14 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[16px] font-semibold text-white transition-transform duration-200 hover:brightness-110 active:scale-[0.98] sm:flex-1 md:h-[58px]"
                style={{ background: accent }}
              >
                <span>Ajouter au panier</span>
                <span className="opacity-60">·</span>
                <span className="flex items-baseline gap-2">
                  {formatPrice(product.price * quantity)}
                  {product.compareAtPrice ? (
                    <span className="text-[13px] font-normal line-through opacity-70">
                      {formatPrice(product.compareAtPrice * quantity)}
                    </span>
                  ) : null}
                </span>
              </button>
            </div>

            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-ink-600">
              <span aria-hidden>🚚</span>
              {product.freeShipping ? (
                <span className="font-semibold text-brand-dark">Livraison offerte</span>
              ) : (
                <span>
                  Livraison offerte dès{" "}
                  <span className="font-semibold">{site.freeShippingThreshold} €</span>
                </span>
              )}
              <span className="text-ink-400">· 5 à 10 jours</span>
              {saving > 0 ? (
                <span
                  className="rounded-full px-2.5 py-1 text-[11.5px] font-bold text-white"
                  style={{ background: "#e0234e" }}
                >
                  −{discountPercent(product.price, product.compareAtPrice)} % · tu économises{" "}
                  {formatPrice(saving)}
                </span>
              ) : null}
            </p>
          </div>

          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-600">
            {product.shortDescription}
          </p>

          {/* Atouts en icônes */}
          {product.features ? <FeatureList features={product.features} color={accent} /> : null}

          {/* Réassurance */}
          <ul className="mt-7 flex flex-col gap-2 border-t border-ink/10 pt-5 text-[13.5px] text-ink-600">
            <li>↩️ 30 jours pour changer d&apos;avis, retour gratuit</li>
            <li>🔒 Paiement sécurisé — CB, Apple Pay, PayPal</li>
          </ul>
        </div>
      </div>

      {/* Barre d'achat collante — mobile ET desktop */}
      <AnimatePresence>
        {showSticky ? (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl"
          >
            <div className="shell flex items-center gap-3 px-0 md:px-0">
              <div
                className="relative hidden h-14 w-12 shrink-0 overflow-hidden rounded-xl sm:block"
                style={{ background: color?.accent ?? "#f4f6f5" }}
              >
                {heroImage ? (
                  <Image src={heroImage} alt="" fill sizes="48px" className="object-contain" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold">{product.name}</p>
                <p className="truncate text-[12.5px] text-ink-400">{subtitle}</p>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-white transition-transform duration-200 active:scale-[0.97]"
                style={{ background: accent }}
              >
                <span className="hidden sm:inline">Ajouter au panier</span>
                <span className="sm:hidden">Ajouter</span>
                <span>· {formatPrice(product.price * quantity)}</span>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
