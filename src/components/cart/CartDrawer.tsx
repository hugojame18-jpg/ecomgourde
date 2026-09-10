"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { FreeShippingBar } from "./FreeShippingBar";
import { CheckoutButton } from "./CheckoutButton";
import { ProductMedia } from "@/components/visuals/ProductVisual";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { flavorName } from "@/data/flavors";
import { getProduct } from "@/data/products";

/** Aucun produit d'appoint pour le moment (catalogue à 2 offres). */
const upsellSlugs: string[] = [];

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, shipping, total, freeShippingLeft, shippingUnlockedByProduct, add } =
    useCart();

  const inCart = new Set(lines.map((l) => l.productId));
  const upsells = upsellSlugs
    .map((s) => getProduct(s))
    .filter((p) => p && !inCart.has(p.id))
    .slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-label="Panier"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[440px] flex-col bg-white shadow-[0_24px_60px_-18px_rgba(10,13,12,.35)]"
          >
            <header className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <h2 className="font-display text-[20px] font-bold tracking-[-0.03em]">
                Ton panier{" "}
                <span className="text-ink-400">
                  ({lines.reduce((s, l) => s + l.quantity, 0)})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
            </header>

            {lines.length > 0 ? (
              <div className="border-b border-ink/8 px-5 py-4">
                <FreeShippingBar
                  subtotal={subtotal}
                  left={freeShippingLeft}
                  unlocked={shippingUnlockedByProduct}
                />
              </div>
            ) : null}

            <div className="flex-1 overflow-y-auto px-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-mist text-[28px]">
                    🫙
                  </div>
                  <div>
                    <p className="font-display text-[22px] font-bold tracking-[-0.03em]">
                      Ton panier est vide
                    </p>
                    <p className="mt-1 text-[14px] text-ink-400">
                      Commence par le Starter Pack, c&apos;est le plus choisi.
                    </p>
                  </div>
                  <ButtonLink href="/produit/flow-bottle-7-pods" variant="brand" onClick={closeCart}>
                    Voir l'offre 7 pods
                  </ButtonLink>
                </div>
              ) : (
                <ul className="divide-y divide-ink/8">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <CartLineRow lineKey={line.key} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              {lines.length > 0 && upsells.length > 0 ? (
                <div className="border-t border-ink/8 py-5">
                  <p className="eyebrow mb-3 text-ink-400">Complète ton panier</p>
                  <div className="flex flex-col gap-2">
                    {upsells.map((p) => (
                      <div
                        key={p!.id}
                        className="flex items-center gap-3 rounded-2xl border border-ink/8 p-2.5"
                      >
                        <div
                          className="relative h-14 w-14 shrink-0 rounded-xl"
                          style={{ background: p!.visual.kind === "pod" ? "#ffffff" : `${p!.visual.color}16` }}
                        >
                          <div className="absolute inset-1.5">
                            <ProductMedia
                              image={p!.images[0]}
                              alt={p!.name}
                              visual={p!.visual}
                              sizes="56px"
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-semibold">{p!.name}</p>
                          <p className="text-[13px] text-ink-400">{formatPrice(p!.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            add({
                              productId: p!.id,
                              slug: p!.slug,
                              name: p!.name,
                              price: p!.price,
                              image: p!.images[0],
                              visual: p!.visual,
                            })
                          }
                          className="rounded-full border border-ink/15 px-3.5 py-2 text-[13px] font-semibold transition-colors hover:border-ink/40"
                        >
                          Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {lines.length > 0 ? (
              <footer className="border-t border-ink/8 bg-white px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
                <dl className="mb-3 flex flex-col gap-1.5 text-[14px]">
                  <div className="flex justify-between text-ink-600">
                    <dt>Sous-total</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <dt>Livraison</dt>
                    <dd className={shipping === 0 ? "font-semibold text-brand-dark" : ""}>
                      {shipping === 0 ? "Offerte" : formatPrice(shipping)}
                    </dd>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-ink/8 pt-2.5 text-[17px] font-semibold">
                    <dt>Total</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                </dl>
                <div className="flex flex-col gap-2">
                  <CheckoutButton onNavigate={closeCart} />
                  <ButtonLink href="/panier" variant="ghost" size="sm" full onClick={closeCart}>
                    Voir le panier
                  </ButtonLink>
                </div>
                <p className="mt-3 text-center text-[12px] text-ink-400">
                  Retours gratuits sous 30 jours
                </p>
              </footer>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function CartLineRow({ lineKey }: { lineKey: string }) {
  const { lines, setQuantity, remove } = useCart();
  const line = lines.find((l) => l.key === lineKey);
  if (!line) return null;

  return (
    <div className="flex gap-3 py-4">
      <Link
        href={`/produit/${line.slug}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl"
        style={{ background: line.visual.kind === "pod" ? "#ffffff" : `${line.visual.color}16` }}
      >
        <div className="absolute inset-2">
          <ProductMedia image={line.image} alt={line.name} visual={line.visual} sizes="80px" />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-tight">{line.name}</p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-ink-400">
              {[
                line.variant,
                line.subscription ? "Abonnement" : null,
                line.flavors?.length ? line.flavors.map(flavorName).join(", ") : null,
              ]
                .filter(Boolean)
                .join(" · ") || " "}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(line.key)}
            aria-label={`Retirer ${line.name}`}
            className="shrink-0 text-ink-400 transition-colors hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            onChange={(v) => setQuantity(line.key, v)}
          />
          <span className="text-[15px] font-semibold">{formatPrice(line.price * line.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
