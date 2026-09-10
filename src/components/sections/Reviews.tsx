"use client";

import { useRef } from "react";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/product/ReviewCard";
import { SectionHeading, Rating } from "@/components/ui/Primitives";
import { site } from "@/data/site";

export function Reviews({ items = reviews }: { items?: typeof reviews }) {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="avis" className="section overflow-hidden bg-[linear-gradient(180deg,#fff1f6_0%,#fff7ef_100%)]">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Avis clients"
            title={
              <>
                Ils boivent plus.
                <br />
                Ils le disent mieux.
              </>
            }
          />
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Rating value={site.stats.rating} size={17} showValue />
              <span className="text-[13.5px] text-ink-600">
                sur {site.stats.reviews.toLocaleString("fr-FR")} avis
              </span>
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Avis précédents"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white transition-colors hover:border-ink/40"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Avis suivants"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white transition-colors hover:border-ink/40"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mt-12 md:px-[max(32px,calc((100vw-1240px)/2+32px))]"
      >
        {items.map((r) => (
          <li
            key={r.id}
            className="w-[82vw] max-w-[380px] shrink-0 snap-start sm:w-[52vw] lg:w-[calc((1240px-64px-48px)/4)]"
          >
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <div className="shell mt-6">
        <p className="text-[11.5px] text-ink-400">
          Avis de démonstration créés pour cette maquette — à remplacer par tes vrais avis vérifiés.
        </p>
      </div>
    </section>
  );
}
