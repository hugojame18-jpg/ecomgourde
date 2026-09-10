"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/format";

export function FAQItem({
  question,
  answer,
  open,
  onToggle,
  tone = "dark",
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cx(
        "border-b",
        tone === "light" ? "border-white/12" : "border-ink/10",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
      >
        <span
          className={cx(
            "text-[16px] font-semibold leading-snug md:text-[19px]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {question}
        </span>
        <span
          className={cx(
            "relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
            tone === "light" ? "bg-white/10 text-white" : "bg-mist text-ink",
            open && "bg-brand text-ink",
          )}
        >
          <span className="absolute h-[1.6px] w-3.5 rounded bg-current" />
          <span
            className={cx(
              "absolute h-3.5 w-[1.6px] rounded bg-current transition-transform duration-300",
              open && "rotate-90 scale-y-0",
            )}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className={cx(
                "max-w-[62ch] pb-6 pr-12 text-[15px] leading-relaxed",
                tone === "light" ? "text-white/60" : "text-ink-600",
              )}
            >
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqList({
  items,
  tone = "dark",
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  tone?: "dark" | "light";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <FAQItem
          key={item.q}
          question={item.q}
          answer={item.a}
          tone={tone}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}
