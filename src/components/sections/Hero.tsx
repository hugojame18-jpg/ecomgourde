"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

const claims = [
  { label: "0 sucre", color: "#ff5c8a" },
  { label: "0 calorie", color: "#ffab3d" },
  { label: "0 édulcorant", color: "#b98cff" },
  { label: "Tritan sans BPA", color: "#00c9b6" },
  { label: "17 goûts", color: "#ff5c8a" },
  { label: "Sans engagement", color: "#ffab3d" },
  { label: "Fabriqué en Europe", color: "#b98cff" },
  { label: "Livraison en 48 h", color: "#00c9b6" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Au scroll, les gourdes remontent plus vite que la page et s'estompent.
  const bottlesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -260]);
  const bottlesScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const bottlesFade = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.25]);
  // Le titre remonte plus doucement : effet de parallaxe entre les deux plans.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-96px)] flex-col overflow-hidden text-ink md:block md:min-h-0"
      style={{ background: "linear-gradient(175deg, #efe7fb 0%, #fdeef3 52%, #f8f6f2 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14%] h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-55 blur-[120px]"
        style={{ background: "radial-gradient(circle, #d9c7f7 0%, transparent 68%)" }}
      />

      {/* ---------- Le titre ---------- */}
      <motion.h1
        style={{ y: titleY }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="shell relative z-20 pt-6 text-center font-display text-[62px] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-berry sm:text-[72px] md:pt-12 md:text-[92px] lg:text-[112px]"
      >
        Le goût
        <br />
        pour
        <br className="md:hidden" />{" "}
        l&apos;eau
      </motion.h1>

      {/* ---------- Les 3 gourdes, en grand ---------- */}
      <motion.div
        style={{ y: bottlesY, scale: bottlesScale, opacity: bottlesFade }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[15] mx-auto -mt-6 flex w-full max-w-[1180px] flex-1 flex-col pb-8 md:-mt-8 md:block md:flex-none md:px-2 md:pb-0"
      >
        <div className="relative w-full flex-1 md:aspect-[1433/1020] md:flex-none">
          <Image
            src="/produits/hero-trio.png"
            alt="Les Flow Bottle en lilas, noir et bleu ciel"
            fill
            priority
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-contain drop-shadow-[0_30px_45px_rgba(122,40,80,0.22)]"
          />
        </div>

        {/* Mobile : le CTA passe sous les gourdes. Desktop : il se pose dessus. */}
        <div className="mt-2 flex justify-center px-6 md:pointer-events-none md:absolute md:inset-x-0 md:top-[54%] md:mt-0 md:px-0">
          <ButtonLink
            href="/gourdes"
            variant="brand"
            size="lg"
            className="w-full max-w-[280px] shadow-[0_10px_30px_rgba(122,40,80,0.22)] md:pointer-events-auto md:w-auto md:max-w-none"
          >
            Choisis ta gourde
          </ButtonLink>
        </div>
      </motion.div>

      {/* ---------- Bandeau défilant ---------- */}
      <div className="relative z-20 border-y border-ink/10 bg-cream/70 py-3.5 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
            {[...Array(2)].map((_, k) => (
              <span key={k} className="flex items-center gap-10">
                {claims.map((c) => (
                  <span
                    key={c.label + k}
                    className="flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-400"
                  >
                    {c.label}
                    <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
