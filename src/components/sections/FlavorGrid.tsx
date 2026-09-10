"use client";

import { useState } from "react";
import type { Flavor } from "@/lib/types";
import { flavors } from "@/data/flavors";
import { podProducts } from "@/data/products";
import { FlavorCard } from "@/components/product/FlavorCard";
import { FlavorDetailModal } from "@/components/product/FlavorDetailModal";
import { SectionHeading } from "@/components/ui/Primitives";
import { RevealItem } from "@/components/ui/Reveal";
import { useCart } from "@/components/cart/CartProvider";

/**
 * Grille des goûts — ici le client CHOISIT son arôme (vente de pods à l'unité).
 * Clic sur une carte => fiche détaillée en modale.
 */
export function FlavorGrid({
  eyebrow = "Les goûts",
  title = "Choisis ton arôme.",
  text = "Sept arômes vendus au pod, un goût par pod. Les sept autres sont réservés aux packs gourde.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  // Les arômes achetables à l'unité en premier : ce sont les seuls qui peuvent
  // être mis au panier depuis cette grille.
  const ordered = [...flavors].sort((a, b) => Number(!!b.soloOnly) - Number(!!a.soloOnly));
  const [open, setOpen] = useState<Flavor | null>(null);
  const { add } = useCart();

  const addFlavor = (flavor: Flavor) => {
    const product = podProducts.find((p) => p.id === `pod-${flavor.id}`);
    if (!product) return;
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      visual: product.visual,
      flavors: [flavor.id],
    });
    setOpen(null);
  };

  return (
    <section id="gouts" className="section bg-white">
      <div className="shell">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} />

        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {ordered.map((f, i) => (
            <RevealItem key={f.id} delay={(i % 4) * 0.06} className="h-full">
              <FlavorCard
                flavor={f}
                priority={i < 4}
                onOpen={() => setOpen(f)}
                onAdd={() => addFlavor(f)}
              />
            </RevealItem>
          ))}
        </ul>

        <p className="mt-8 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-400">
          Les arômes marqués « Avec la gourde » ne sont pas vendus seuls : ce sont les sept pods livrés
          dans le pack gourde + 7 pods. Les sept autres s&apos;achètent au pod, à l&apos;unité.
        </p>
      </div>

      <FlavorDetailModal flavor={open} onClose={() => setOpen(null)} onAdd={addFlavor} />
    </section>
  );
}
