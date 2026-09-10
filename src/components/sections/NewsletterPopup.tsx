"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NewsletterConsent, NewsletterForm } from "./NewsletterForm";
import Image from "next/image";
import { asset } from "@/lib/asset";
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

            {/* Les trois gourdes, comme sur l'accueil : on reconnaît le produit
                avant même de lire. */}
            <div
              className="relative h-[168px] overflow-hidden"
              style={{ background: "linear-gradient(170deg, #efe7fb 0%, #fdeef3 100%)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[-40%] h-[240px] w-[380px] -translate-x-1/2 rounded-full opacity-70 blur-[60px]"
                style={{ background: "radial-gradient(circle, #d9c7f7 0%, transparent 70%)" }}
              />
              <div className="absolute inset-x-6 bottom-[-14px] top-4">
                <Image
                  src={asset("/produits/hero-trio.png")}
                  alt="Les trois coloris de la SUGAR Bottle"
                  fill
                  sizes="440px"
                  className="object-contain object-bottom drop-shadow-[0_16px_24px_rgba(122,40,80,0.18)]"
                />
              </div>
            </div>

            <div className="px-6 pb-6 pt-5 text-center">
              <p className="eyebrow justify-center text-brand-dark">Première commande</p>
              <h2 className="mt-2 font-display text-[30px] font-bold leading-[0.95] tracking-[-0.04em]">
                −{site.firstOrderDiscount} % sur ta
                <br />
                première gorgée
              </h2>
              <p className="mx-auto mt-2 max-w-[32ch] text-[14px] leading-snug text-ink-600">
                Ton code apparaît tout de suite, à utiliser au moment de payer. Un e-mail par mois,
                pas plus.
              </p>
              <div className="mt-4">
                <NewsletterForm />
                <NewsletterConsent />
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
