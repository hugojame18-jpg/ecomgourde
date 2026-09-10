"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const transition = (delay: number) => ({
  duration: 0.55,
  delay,
  ease: [0.22, 1, 0.36, 1] as const,
});

/** Apparition douce au scroll — volontairement discrète et rapide. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Même effet, mais rendu en <li> pour les grilles sémantiques. */
export function RevealItem({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition(delay)}
      className={className}
    >
      {children}
    </motion.li>
  );
}
