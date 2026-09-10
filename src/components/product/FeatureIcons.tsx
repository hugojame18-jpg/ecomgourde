import type { FeatureIcon } from "@/lib/types";

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Petites icônes de ligne affichées sous le bloc d'achat. */
export function FeatureGlyph({ name }: { name: FeatureIcon }) {
  switch (name) {
    case "nose":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M13 4c0 3-3 4.5-3 7.5 0 1.4.6 2 1.8 2h.7" {...s} />
          <path d="M9 17.5c0 1.4 1.4 2.5 3.2 2.5 1.7 0 3.1-.9 3.1-2.3" {...s} />
          <path d="M17.5 7.5c1.6 1.2 2.5 3 2.5 5" {...s} />
        </svg>
      );
    case "leak":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3.5c3.2 3.7 5.5 6.3 5.5 9a5.5 5.5 0 0 1-11 0c0-2.7 2.3-5.3 5.5-9z" {...s} />
          <path d="M4.5 4.5l15 15" {...s} />
        </svg>
      );
    case "light":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4h-7A1.5 1.5 0 0 1 7 19.5z" {...s} />
          <path d="M9.5 8V4.5h5V8" {...s} />
          <path d="M10 12.5l1.5 2.5-1.5 2.5" {...s} />
        </svg>
      );
    case "clear":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <rect x="7" y="6.5" width="10" height="14" rx="3" {...s} />
          <path d="M9.5 6.5V4h5v2.5" {...s} />
          <path d="M7 14h10" {...s} />
        </svg>
      );
    case "sparkling":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 14c2-1.5 4-1.5 6 0s4 1.5 6 0" {...s} />
          <path d="M5 18c2-1.5 4-1.5 6 0s4 1.5 6 0" {...s} />
          <circle cx="9" cy="7" r="1.6" {...s} />
          <circle cx="14.5" cy="5" r="1.2" {...s} />
        </svg>
      );
    case "dishwasher":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="3.5" width="16" height="17" rx="2.5" {...s} />
          <path d="M4 8h16" {...s} />
          <circle cx="12" cy="14.5" r="3.5" {...s} />
        </svg>
      );
    case "no-sugar":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8.5" {...s} />
          <path d="M6 6l12 12" {...s} />
        </svg>
      );
    case "natural":
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M20 4c0 8-5 12-11 12H5c0-8 5-12 11-12z" {...s} />
          <path d="M5 20c1.5-4 4-6.5 8-8.5" {...s} />
        </svg>
      );
  }
}

export function FeatureList({
  features,
  color,
}: {
  features: { icon: FeatureIcon; label: string }[];
  color?: string;
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {features.map((f) => (
        <li key={f.label} className="flex items-center gap-2.5 text-[14px] text-ink-600">
          <span className="shrink-0" style={{ color: color ?? "var(--color-ink)" }}>
            <FeatureGlyph name={f.icon} />
          </span>
          {f.label}
        </li>
      ))}
    </ul>
  );
}
