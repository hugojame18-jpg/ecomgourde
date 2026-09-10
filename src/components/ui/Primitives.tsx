import { cx, formatPrice, discountPercent } from "@/lib/format";

/* ---------------- Price ---------------- */
export function Price({
  value,
  compareAt,
  size = "md",
  className,
}: {
  value: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-[26px] md:text-[30px]",
  } as const;
  return (
    <span className={cx("flex items-baseline gap-2", className)}>
      <span className={cx("font-semibold tracking-tight", sizes[size])}>{formatPrice(value)}</span>
      {compareAt && compareAt > value ? (
        <span
          className={cx(
            "text-ink-400 line-through",
            size === "lg" ? "text-[17px]" : "text-[13px]",
          )}
        >
          {formatPrice(compareAt)}
        </span>
      ) : null}
    </span>
  );
}

/* ---------------- Rating ---------------- */
export function Rating({
  value,
  count,
  size = 14,
  className,
  showValue,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <span className={cx("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 20 20" className="block">
              <defs>
                <linearGradient id={`s${i}-${Math.round(value * 10)}`}>
                  <stop offset={`${fill * 100}%`} stopColor="#0a0d0c" />
                  <stop offset={`${fill * 100}%`} stopColor="#0a0d0c" stopOpacity="0.16" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.6l2.47 5.1 5.53.78-4 3.94.95 5.58L10 14.4l-4.95 2.6.95-5.58-4-3.94 5.53-.78z"
                fill={`url(#s${i}-${Math.round(value * 10)})`}
              />
            </svg>
          );
        })}
      </span>
      {showValue ? <span className="text-[13px] font-semibold">{value.toFixed(1)}</span> : null}
      {count !== undefined ? (
        <span className="text-[13px] text-ink-400">({count.toLocaleString("fr-FR")})</span>
      ) : null}
      <span className="sr-only">
        Note de {value} sur 5{count !== undefined ? `, ${count} avis` : ""}
      </span>
    </span>
  );
}

/* ---------------- Badge ---------------- */
export function ProductBadge({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "brand" | "sale" | "light";
  className?: string;
}) {
  const tones = {
    ink: "bg-berry text-white",
    brand: "bg-brand text-ink",
    sale: "bg-[#e0234e] text-white",
    light: "bg-white/85 text-ink backdrop-blur",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SavingBadge({ price, compareAt }: { price: number; compareAt?: number }) {
  const pct = discountPercent(price, compareAt);
  if (!pct) return null;
  return <ProductBadge tone="sale">-{pct} %</ProductBadge>;
}

/* ---------------- SectionHeading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cx("eyebrow", tone === "light" ? "text-brand" : "text-brand-dark")}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cx(
          "text-[34px] leading-[0.95] sm:text-[46px] md:text-[58px] font-bold",
          tone === "light" ? "text-white" : "text-ink",
          align === "center" && "max-w-[18ch]",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cx(
            "max-w-[54ch] text-[15px] leading-relaxed md:text-[17px]",
            tone === "light" ? "text-white/65" : "text-ink-600",
          )}
        >
          {text}
        </p>
      ) : null}
      {children}
    </div>
  );
}
