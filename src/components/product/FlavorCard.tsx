"use client";

import Image from "next/image";
import type { Flavor } from "@/lib/types";
import { FruitVisual } from "@/components/visuals/FruitVisual";
import { fruitFit } from "@/data/flavors";
import { formatPrice, cx } from "@/lib/format";

/** Carte d'un goût : visuel fruit sur fond coloré + ajout direct au panier. */
export function FlavorCard({
  flavor,
  onOpen,
  onAdd,
  priority,
}: {
  flavor: Flavor;
  onOpen: () => void;
  onAdd: () => void;
  priority?: boolean;
}) {
  const fit = fruitFit(flavor.id);

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Voir le détail du goût ${flavor.name}`}
        className="relative block overflow-hidden rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        style={{ background: flavor.soft }}
      >
        <div className="relative aspect-square w-full">
          <div
            className={cx(
              "absolute transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]",
              fit === "contain" ? "inset-[13%]" : "inset-0",
            )}
          >
            {flavor.image ? (
              <Image
                src={flavor.image}
                alt={flavor.name}
                fill
                priority={priority}
                sizes="(max-width: 768px) 45vw, 20vw"
                className={fit === "contain" ? "object-contain" : "object-cover"}
              />
            ) : (
              <FruitVisual flavorId={flavor.id} color={flavor.color} />
            )}
          </div>
        </div>

        {flavor.soloOnly ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onAdd();
              }
            }}
            aria-label={`Ajouter ${flavor.name} au panier`}
            className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-xl text-white shadow-[0_6px_16px_-6px_rgba(0,0,0,.5)] transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ background: flavor.color }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6.5 8h11l1.1 11.2a1.6 1.6 0 0 1-1.6 1.8H7a1.6 1.6 0 0 1-1.6-1.8z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9.2 10V7.4a2.8 2.8 0 0 1 5.6 0V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        ) : (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/85 px-2.5 py-1.5 text-[11px] font-bold text-ink backdrop-blur">
            Avec la gourde
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
          {flavor.soloOnly ? "1 pod · ≈ 5 L" : "Livré avec la gourde"}
        </p>
        <h3
          className="mt-1 font-display text-[19px] font-bold leading-tight tracking-[-0.02em]"
          style={{ color: flavor.color }}
        >
          <button type="button" onClick={onOpen} className="text-left hover:opacity-75">
            {flavor.name}
          </button>
        </h3>
        <button
          type="button"
          onClick={onOpen}
          className="mt-1 self-start text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-600 underline underline-offset-2 hover:text-ink"
        >
          Profil aromatique
        </button>
        {flavor.soloOnly ? (
          <p className="mt-2 text-[15px] font-semibold">{formatPrice(flavor.price)}</p>
        ) : (
          <p className="mt-2 text-[13px] font-semibold leading-snug text-berry">
            Uniquement dans les packs gourde
          </p>
        )}
      </div>
    </article>
  );
}
