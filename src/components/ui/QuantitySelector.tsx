"use client";

import { cx } from "@/lib/format";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn =
    "grid place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] disabled:opacity-30 disabled:hover:bg-transparent";
  const dims = size === "sm" ? "h-8 w-8 text-[16px]" : "h-11 w-11 text-[18px]";

  return (
    <div
      className={cx(
        "inline-flex items-center justify-between rounded-full border border-ink/12 bg-white",
        size === "sm" ? "h-10 px-1" : "h-13 px-1.5",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Diminuer la quantité"
        className={cx(btn, dims)}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span
        aria-live="polite"
        className={cx("min-w-8 text-center font-semibold tabular-nums", size === "sm" ? "text-[14px]" : "text-[16px]")}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        className={cx(btn, dims)}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
