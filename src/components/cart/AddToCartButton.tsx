"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/format";

export function AddToCartButton({
  product,
  variant = "primary",
  size = "md",
  quantity = 1,
  variantLabel,
  flavors,
  subscription,
  full,
  label = "Ajouter au panier",
  className,
}: {
  product: Product;
  variant?: "primary" | "brand" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  quantity?: number;
  variantLabel?: string;
  flavors?: string[];
  subscription?: boolean;
  full?: boolean;
  label?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  return (
    <Button
      variant={variant}
      size={size}
      full={full}
      className={cx("overflow-hidden", className)}
      onClick={() => {
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0],
          visual: product.visual,
          freeShipping: product.freeShipping,
          variant: variantLabel,
          flavors,
          subscription,
          quantity,
        });
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
    >
      <span className={cx("transition-transform duration-300", done && "-translate-y-8 opacity-0")}>
        {label}
      </span>
      <span
        className={cx(
          "absolute inset-0 grid place-items-center transition-transform duration-300",
          done ? "translate-y-0" : "translate-y-8 opacity-0",
        )}
      >
        Ajouté ✓
      </span>
    </Button>
  );
}
