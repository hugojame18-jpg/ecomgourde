"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

export function FreeShippingBar({
  subtotal,
  left,
  unlocked,
  tone = "light",
}: {
  subtotal: number;
  left: number;
  unlocked?: boolean;
  tone?: "light" | "dark";
}) {
  const done = unlocked || left <= 0;
  const pct = done ? 100 : Math.min(100, (subtotal / site.freeShippingThreshold) * 100);
  return (
    <div className="w-full">
      <p className={tone === "dark" ? "text-[13px] text-white/80" : "text-[13px] text-ink-600"}>
        {done ? (
          <span className="font-semibold text-brand-dark">
            🎉 Livraison offerte {unlocked ? "incluse dans ton pack" : "débloquée"} !
          </span>
        ) : (
          <>
            Plus que{" "}
            <span className="font-semibold text-ink">{formatPrice(left)}</span> pour la livraison
            offerte
          </>
        )}
      </p>
      <div
        className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${
          tone === "dark" ? "bg-white/15" : "bg-ink/8"
        }`}
      >
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
