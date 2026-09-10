import Link from "next/link";
import { site } from "@/data/site";
import { cx } from "@/lib/format";

/** Remplace simplement ce composant par ton vrai logo (SVG ou <Image />). */
export function Logo({
  className,
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
}) {
  const inner = (
    <span
      className={cx(
        "inline-flex items-center gap-2 font-display text-[21px] font-bold tracking-[-0.06em] md:text-[23px]",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" aria-hidden className="-mt-0.5">
        <path
          d="M10 1.5c4.6 5.2 8 8.9 8 12.7A8 8 0 1 1 2 14.2C2 10.4 5.4 6.7 10 1.5z"
          fill="currentColor"
        />
        <circle cx="10" cy="14.6" r="3" fill="var(--color-brand)" />
      </svg>
      {site.name}
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} aria-label={`${site.name} — accueil`} className="inline-flex">
      {inner}
    </Link>
  );
}
