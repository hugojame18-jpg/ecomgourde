"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NewsletterForm } from "./NewsletterForm";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { site } from "@/data/site";

const KEY = "sugar.newsletter.seen";

/**
 * Popup discrète : apparaît après 18 s de navigation OU à l'intention de sortie
 * (desktop uniquement), une seule fois par visiteur.
 */
export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    const show = () => {
      setOpen(true);
      try {
        localStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      cleanup();
    };

    const timer = setTimeout(show, 18000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) document.addEventListener("mouseout", onLeave);

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    }
    return cleanup;
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-[3px]"
          />
          <motion.div
            role="dialog"
            aria-label="Offre première commande"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-[440px] overflow-hidden rounded-[26px] bg-white shadow-[0_30px_70px_-20px_rgba(10,13,12,.45)] md:inset-0 md:bottom-auto md:my-auto md:h-fit"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-ink backdrop-blur transition-colors hover:bg-mist"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>

            <div className="relative h-32 overflow-hidden bg-brand-soft">
              <div className="absolute -bottom-6 left-1/2 h-44 w-44 -translate-x-1/2">
                <ProductVisual kind="bundle" color="#00c9b6" count={3} />
              </div>
            </div>

            <div className="px-6 pb-6 pt-5 text-center">
              <p className="eyebrow justify-center text-brand-dark">Première commande</p>
              <h2 className="mt-2 font-display text-[30px] font-bold leading-[0.95] tracking-[-0.04em]">
                −{site.firstOrderDiscount} % sur ta
                <br />
                première gorgée
              </h2>
              <p className="mx-auto mt-2 max-w-[34ch] text-[14px] text-ink-600">
                Rejoins les {site.stats.customers} personnes qui boivent plus d&apos;eau depuis
                qu&apos;elles ont trouvé leur goût.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 text-[13px] text-ink-400 underline underline-offset-4 hover:text-ink"
              >
                Non merci, je paie plein tarif
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
