"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { FreeShippingBar } from "./FreeShippingBar";
import { CheckoutButton } from "./CheckoutButton";
import { ProductMedia } from "@/components/visuals/ProductVisual";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";
import { flavorName } from "@/data/flavors";
import { getProduct, products } from "@/data/products";

const recoSlugs = ["sugar-bottle-7-pods", "sugar-bottle"];

export function CartPageContent() {
  const {
    lines,
    subtotal,
    shipping,
    total,
    freeShippingLeft,
    shippingUnlockedByProduct,
    setQuantity,
    remove,
    ready,
  } = useCart();

  const inCart = new Set(lines.map((l) => l.productId));
  const recos = recoSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && !inCart.has(p!.id))
    .slice(0, 4);
  const fallback = products.filter((p) => !inCart.has(p.id)).slice(0, 4);
  const suggestions = recos.length >= 2 ? recos : fallback;

  if (!ready) {
    return <div className="shell py-24 text-center text-ink-400">Chargement du panier…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="shell flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-mist text-[34px]">🫙</div>
        <div>
          <h1 className="text-[34px] font-bold tracking-[-0.04em] md:text-[46px]">
            Ton panier est vide
          </h1>
          <p className="mx-auto mt-2 max-w-[42ch] text-[15px] text-ink-600">
            La gourde livrée avec les 7 arômes de la gamme, livraison offerte. C&apos;est l&apos;offre que
            prennent neuf clients sur dix.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/produit/sugar-bottle-7-pods" variant="brand" size="lg">
            Voir l'offre 7 pods
          </ButtonLink>
          <ButtonLink href="/pods" variant="outline" size="lg">
            Découvrir les goûts
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="shell grid gap-8 py-8 md:py-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
        <div>
          <h1 className="text-[32px] font-bold tracking-[-0.04em] md:text-[42px]">
            Ton panier{" "}
            <span className="text-ink-400">({lines.reduce((s, l) => s + l.quantity, 0)})</span>
          </h1>

          <div className="mt-6 rounded-2xl bg-mist p-4">
            <FreeShippingBar
              subtotal={subtotal}
              left={freeShippingLeft}
              unlocked={shippingUnlockedByProduct}
            />
          </div>

          <ul className="mt-6 divide-y divide-ink/8 border-y border-ink/8">
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
                  <div className="flex gap-4 py-5">
                    <Link
                      href={`/produit/${line.slug}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-28"
                      style={{ background: line.visual.kind === "pod" ? "#ffffff" : `${line.visual.color}16` }}
                    >
                      <div className="absolute inset-2.5">
                        <ProductMedia
                          image={line.image}
                          alt={line.name}
                          visual={line.visual}
                          sizes="112px"
                        />
                      </div>
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/produit/${line.slug}`}
                            className="text-[17px] font-semibold leading-tight hover:opacity-70"
                          >
                            {line.name}
                          </Link>
                          <p className="mt-1 text-[13px] leading-snug text-ink-400">
                            {[
                              line.variant,
                              line.subscription ? "Abonnement" : null,
                              line.flavors?.length
                                ? line.flavors.map(flavorName).join(", ")
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        <span className="shrink-0 text-[17px] font-semibold">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                        <QuantitySelector
                          size="sm"
                          value={line.quantity}
                          onChange={(v) => setQuantity(line.key, v)}
                        />
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          className="text-[13px] text-ink-400 underline underline-offset-4 transition-colors hover:text-ink"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <Link
            href="/gourdes"
            className="mt-6 inline-flex text-[14px] font-semibold underline underline-offset-4 hover:text-brand-dark"
          >
            ← Continuer mes achats
          </Link>
        </div>

        {/* Récapitulatif */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[26px] border border-ink/10 p-6">
            <h2 className="text-[20px] font-bold tracking-[-0.03em]">Récapitulatif</h2>
            <dl className="mt-5 flex flex-col gap-2.5 text-[15px]">
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
              <div className="mt-2 flex justify-between border-t border-ink/8 pt-3 text-[20px] font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
              <p className="text-[12px] text-ink-400">TVA incluse</p>
            </dl>

            <CheckoutButton className="mt-5" />

            <ul className="mt-5 flex flex-col gap-2 text-[13px] text-ink-600">
              <li>🔒 Paiement sécurisé — CB, Apple Pay, PayPal</li>
              <li>↩️ 30 jours pour changer d&apos;avis</li>
              <li>📦 Livraison en 5 à 10 jours</li>
            </ul>
          </div>
        </aside>
      </div>

      {suggestions.length > 0 ? (
        <section className="section bg-mist">
          <div className="shell">
            <h2 className="text-[28px] font-bold tracking-[-0.035em] md:text-[38px]">
              Complète ton panier
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-6 lg:grid-cols-4">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
