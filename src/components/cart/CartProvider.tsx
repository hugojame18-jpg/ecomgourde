"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine } from "@/lib/types";
import { site } from "@/data/site";

// v2 : les paniers enregistrés avant le passage à Shopify portaient une
// promesse de livraison offerte qui n'a plus cours. On repart de zéro.
const STORAGE_KEY = "sugar.cart.v2";

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingLeft: number;
  hasFreeShipping: boolean;
  /** un produit du panier (bundle, abonnement) offre la livraison */
  shippingUnlockedByProduct: boolean;
  isOpen: boolean;
  lastAdded: CartLine | null;
  ready: boolean;
  add: (line: Omit<CartLine, "key" | "quantity"> & { quantity?: number }) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<CartContext | null>(null);

const makeKey = (l: Omit<CartLine, "key" | "quantity">) =>
  [l.productId, l.variant ?? "", (l.flavors ?? []).join("-"), l.subscription ? "sub" : ""].join("|");

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* stockage indisponible : on démarre avec un panier vide */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  // Bloque le scroll de la page quand le tiroir est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback<CartContext["add"]>((input) => {
    const quantity = input.quantity ?? 1;
    const key = makeKey(input);
    const line: CartLine = { ...input, key, quantity };
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) {
        return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, line];
    });
    setLastAdded(line);
    setIsOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 20) } : l)),
    );
  }, []);

  const value = useMemo<CartContext>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const unlockedByProduct = lines.some((l) => l.freeShipping);
    const hasFreeShipping = subtotal >= site.freeShippingThreshold || unlockedByProduct;
    const shipping = subtotal === 0 || hasFreeShipping ? 0 : site.shippingCost;
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingLeft: unlockedByProduct ? 0 : Math.max(0, site.freeShippingThreshold - subtotal),
      hasFreeShipping,
      shippingUnlockedByProduct: unlockedByProduct,
      isOpen,
      lastAdded,
      ready,
      add,
      remove,
      setQuantity,
      clear: () => setLines([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, lastAdded, ready, add, remove, setQuantity]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
