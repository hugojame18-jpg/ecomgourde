"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { cx } from "@/lib/format";

/**
 * Galerie produit.
 * - Si `product.images` contient des URLs, elles sont utilisées telles quelles.
 * - Sinon, 4 mises en scène sont générées à partir du visuel vectoriel.
 */
export function ProductGallery({
  product,
  color,
  images,
}: {
  product: Product;
  color?: string;
  /** remplace product.images (ex. photo du coloris sélectionné) */
  images?: string[];
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const tint = color ?? product.visual.color;
  const photos = images && images.length > 0 ? images : product.images;
  /** fond identique à celui de la photo pour un raccord invisible */
  const photoBg =
    product.category === "pod"
      ? "#ffffff"
      : (product.colors?.find((c) => c.image === photos[0])?.accent ??
        product.visual.accent ??
        "#f4f6f5");

  const scenes = [
    { bg: `linear-gradient(170deg, ${tint}22, ${tint}08 60%, #ffffff)`, scale: 0.82, label: "Vue principale" },
    { bg: `linear-gradient(200deg, #f4f6f5, #e9edec)`, scale: 0.7, label: "Vue détaillée" },
    { bg: `linear-gradient(160deg, ${tint}, ${tint}aa)`, scale: 0.9, label: "Ambiance" },
    { bg: `linear-gradient(180deg, #0a0d0c, #16211f)`, scale: 0.78, label: "Studio" },
  ];

  const slides = photos.length > 0 ? photos : scenes;
  const useRealImages = photos.length > 0;
  const current = index % slides.length;

  return (
    <div className="flex min-w-0 flex-col gap-3 md:flex-row-reverse md:gap-4">
      {/* Visuel principal */}
      <div
        className={cx(
          "relative aspect-square w-full overflow-hidden rounded-[26px] md:flex-1",
          zoom ? "cursor-zoom-out" : "cursor-zoom-in",
        )}
        style={{ background: useRealImages ? photoBg : (scenes[current]?.bg as string) }}
        onClick={() => setZoom((z) => !z)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: zoom ? 1.55 : 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {useRealImages ? (
              <Image
                src={photos[current]}
                alt={`${product.name} — vue ${current + 1}`}
                fill
                priority={current === 0}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain"
              />
            ) : (
              <div
                className="relative h-full w-full"
                style={{ padding: `${(1 - scenes[current].scale) * 50}%` }}
              >
                <ProductVisual
                  kind={product.visual.kind}
                  color={tint}
                  accent={product.visual.accent}
                  count={product.visual.count}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-ink backdrop-blur">
          {zoom ? "Cliquer pour dézoomer" : "Cliquer pour zoomer"}
        </span>

        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-berry px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
            {product.badge}
          </span>
        ) : null}
      </div>

      {/* Miniatures */}
      {slides.length > 1 ? (
      <ul className="no-scrollbar flex gap-2.5 overflow-x-auto md:w-[84px] md:flex-col md:overflow-visible">
        {slides.map((_, i) => (
          <li key={i} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setZoom(false);
              }}
              aria-label={`Voir l'image ${i + 1}`}
              aria-current={i === current}
              className={cx(
                "relative h-[72px] w-[72px] overflow-hidden rounded-2xl border-2 transition-colors md:h-[84px] md:w-[84px]",
                i === current ? "border-ink" : "border-transparent",
              )}
              style={{ background: useRealImages ? photoBg : (scenes[i]?.bg as string) }}
            >
              {useRealImages ? (
                <Image
                  src={photos[i]}
                  alt=""
                  fill
                  sizes="84px"
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-3">
                  <ProductVisual
                    kind={product.visual.kind}
                    color={tint}
                    accent={product.visual.accent}
                    count={product.visual.count}
                  />
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      ) : null}
    </div>
  );
}
