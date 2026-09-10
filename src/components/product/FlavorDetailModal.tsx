"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Flavor } from "@/lib/types";
import { FruitVisual } from "@/components/visuals/FruitVisual";
import { Button, ButtonLink } from "@/components/ui/Button";
import { podNutrition, pricePerLitre } from "@/data/flavors";
import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";

/** Barre de notation en pastilles (Doux / Aigre / Fruité). */
function Scale({ value, color }: { value: number; color: string }) {
  return (
    <span className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-[11px] w-[11px] rounded-full"
          style={{ background: i <= value ? color : "#d9d2d4" }}
        />
      ))}
    </span>
  );
}

export function FlavorDetailModal({
  flavor,
  onClose,
  onAdd,
}: {
  flavor: Flavor | null;
  onClose: () => void;
  onAdd: (flavor: Flavor) => void;
}) {
  useEffect(() => {
    if (!flavor) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [flavor, onClose]);

  return (
    <AnimatePresence>
      {flavor ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[85] bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Détail du goût ${flavor.name}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 bottom-0 top-[6vh] z-[95] mx-auto flex max-w-[900px] flex-col overflow-hidden rounded-t-[26px] shadow-[0_30px_80px_-20px_rgba(10,13,12,.5)] md:inset-6 md:top-[8vh] md:mb-6 md:rounded-[26px]"
            style={{ background: flavor.soft }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-white/60"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.9" />
              </svg>
            </button>

            <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
              {/* ---------- Colonne gauche : produit ---------- */}
              <div className="flex flex-col items-center px-6 pb-8 pt-16 text-center md:px-8">
                <div className="relative h-44 w-full max-w-[260px] md:h-56">
                  {flavor.image ? (
                    <Image
                      src={flavor.image}
                      alt={flavor.name}
                      fill
                      sizes="260px"
                      className="object-contain"
                    />
                  ) : (
                    <FruitVisual flavorId={flavor.id} color={flavor.color} />
                  )}
                </div>

                <h2
                  className="mt-5 font-display text-[34px] font-bold leading-none tracking-[-0.03em] md:text-[40px]"
                  style={{ color: flavor.color }}
                >
                  {flavor.name}
                </h2>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-600">
                  {flavor.description}
                </p>

                {flavor.soloOnly ? (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      className="mt-6 w-full max-w-[320px] text-white"
                      style={{ background: flavor.color }}
                      onClick={() => onAdd(flavor)}
                    >
                      Ajouter au panier — {formatPrice(flavor.price)}
                    </Button>

                    <p className="mt-2 text-[12.5px] text-ink-400">
                      {formatPrice(pricePerLitre(flavor.price))} par litre
                    </p>
                  </>
                ) : (
                  <>
                    <ButtonLink
                      href="/produit/sugar-bottle-7-pods"
                      size="lg"
                      className="mt-6 w-full max-w-[320px] text-white"
                      style={{ background: flavor.color }}
                    >
                      Voir le pack qui le contient
                    </ButtonLink>

                    <p className="mt-2 max-w-[34ch] text-[12.5px] leading-snug text-ink-400">
                      Cet arôme n&apos;est pas vendu seul aujourd&apos;hui : il fait partie des sept
                      pods livrés avec la gourde. Les recharges à l&apos;unité arrivent
                      prochainement.
                    </p>
                  </>
                )}
                <p className="mt-3 flex items-center gap-2 text-[12.5px] text-ink-600">
                  <span aria-hidden>🚚</span>
                  Livraison offerte à partir de {site.freeShippingThreshold} €
                </p>
              </div>

              {/* ---------- Colonne droite : caractéristiques ---------- */}
              <div className="flex flex-col gap-3 px-4 pb-8 md:px-6 md:pt-16">
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Dans la boîte */}
                  <div className="rounded-[18px] bg-white/70 p-4 backdrop-blur">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                      Dans la boîte
                    </p>
                    <div className="relative mx-auto my-3 h-20 w-full max-w-[130px]">
                      {flavor.podImage ? (
                        <Image
                          src={flavor.podImage}
                          alt={`Pods ${flavor.name}`}
                          fill
                          sizes="130px"
                          className="object-contain"
                        />
                      ) : null}
                    </div>
                    <p className="text-[12.5px] text-ink-600">
                      {flavor.soloOnly
                        ? `1 pod ${flavor.name}`
                        : `1 pod ${flavor.name}, dans le pack de 7`}
                    </p>
                  </div>

                  {/* Intensité */}
                  <div className="rounded-[18px] bg-white/70 p-4 backdrop-blur">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                      Intensité
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-ink-600">
                      {flavor.intensityLabel}
                    </p>
                    <p
                      className="mt-3 font-display text-[30px] font-bold leading-none tracking-[-0.03em]"
                      style={{ color: flavor.color }}
                    >
                      {flavor.intensity}/5
                    </p>
                  </div>
                </div>

                {/* Profil aromatique */}
                <div className="rounded-[18px] bg-white/70 p-4 backdrop-blur">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                    Profil aromatique
                  </p>
                  <dl className="mt-3 flex flex-col gap-2.5">
                    {(
                      [
                        ["Doux", flavor.profile.doux],
                        ["Aigre", flavor.profile.aigre],
                        ["Fruité", flavor.profile.fruite],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <dt
                          className="font-display text-[17px] font-bold tracking-[-0.02em]"
                          style={{ color: flavor.color }}
                        >
                          {label}
                        </dt>
                        <dd className="flex items-center gap-3">
                          <Scale value={value} color={flavor.color} />
                          <span className="w-8 text-right text-[14px] font-semibold">
                            {value}/5
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Nutrition */}
                <div className="rounded-[18px] bg-white/70 p-4 backdrop-blur">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                      Informations nutritionnelles
                    </p>
                    <p className="text-[11.5px] text-ink-400">pour 100 mL</p>
                  </div>
                  <dl className="mt-2.5 flex flex-col">
                    {podNutrition.map((n) => (
                      <div
                        key={n.label}
                        className="flex items-center justify-between gap-4 border-b border-ink/8 py-1.5 text-[13px] last:border-0"
                      >
                        <dt className="text-ink-600">{n.label}</dt>
                        <dd className="font-medium">{n.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-[12px] text-ink-400">
                    À conserver dans un endroit frais et sec.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
