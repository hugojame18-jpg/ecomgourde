import Image from "next/image";
import type { VisualKind } from "@/lib/types";
import { cx } from "@/lib/format";

/**
 * Visuel produit vectoriel — utilisé tant qu'aucune vraie photo n'est fournie.
 * Dès qu'un produit possède une entrée dans `images`, <ProductMedia /> affiche
 * la photo à la place. Rien d'autre à modifier dans le code.
 */

function shade(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((num >> 16) & 255) + amount);
  const g = clamp(((num >> 8) & 255) + amount);
  const b = clamp((num & 255) + amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function Bottle({ color, accent = "#0a0d0c", id }: { color: string; accent?: string; id: string }) {
  const light = shade(color, 46);
  const dark = shade(color, -46);
  return (
    <>
      <defs>
        <linearGradient id={`b-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={dark} />
          <stop offset="26%" stopColor={color} />
          <stop offset="58%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`c-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={shade(accent, -14)} />
          <stop offset="50%" stopColor={shade(accent, 34)} />
          <stop offset="100%" stopColor={shade(accent, -14)} />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="386" rx="66" ry="12" fill="#0a0d0c" opacity="0.13" />

      {/* bouchon + porte-pod */}
      <rect x="70" y="14" width="60" height="40" rx="16" fill={`url(#c-${id})`} />
      <rect x="78" y="22" width="44" height="9" rx="4.5" fill="#fff" opacity="0.22" />
      <rect x="76" y="52" width="48" height="16" rx="7" fill={shade(accent, 18)} />

      {/* corps */}
      <path
        d="M46 106c0-24 14-40 54-40s54 16 54 40v212c0 30-18 48-54 48s-54-18-54-48z"
        fill={`url(#b-${id})`}
      />
      {/* reflets */}
      <rect x="62" y="118" width="15" height="212" rx="7.5" fill="#fff" opacity="0.3" />
      <rect x="132" y="140" width="7" height="150" rx="3.5" fill="#fff" opacity="0.14" />
      {/* bande de marque */}
      <rect x="46" y="196" width="108" height="34" fill="#0a0d0c" opacity="0.07" />
      <circle cx="100" cy="213" r="9" fill="#fff" opacity="0.55" />
      <circle cx="100" cy="213" r="3.4" fill={dark} opacity="0.7" />
    </>
  );
}

function Pod({ color, id, cx: px = 100, cy = 116, scale = 1 }: { color: string; id: string; cx?: number; cy?: number; scale?: number }) {
  const light = shade(color, 52);
  const dark = shade(color, -40);
  return (
    <g transform={`translate(${px} ${cy}) scale(${scale}) translate(${-px} ${-cy})`}>
      <defs>
        <linearGradient id={`p-${id}`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={dark} />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
      </defs>
      <ellipse cx={px} cy={cy + 62} rx="58" ry="10" fill="#0a0d0c" opacity="0.12" />
      <path
        d={`M${px - 62} ${cy} v34 a62 26 0 0 0 124 0 v-34z`}
        fill={`url(#p-${id})`}
      />
      <ellipse cx={px} cy={cy} rx="62" ry="26" fill={light} />
      <ellipse cx={px} cy={cy} rx="44" ry="17" fill={dark} opacity="0.35" />
      <ellipse cx={px} cy={cy - 2} rx="30" ry="11" fill="#fff" opacity="0.35" />
      <ellipse cx={px - 22} cy={cy - 8} rx="12" ry="4" fill="#fff" opacity="0.5" />
    </g>
  );
}

export function ProductVisual({
  kind,
  color,
  accent,
  count = 3,
  className,
}: {
  kind: VisualKind;
  color: string;
  accent?: string;
  count?: number;
  className?: string;
}) {
  const id = `${kind}-${color.replace("#", "")}-${count}`;

  if (kind === "pod") {
    return (
      <svg viewBox="0 0 200 220" className={cx("h-full w-full", className)} aria-hidden>
        <Pod color={color} id={id} cy={92} />
      </svg>
    );
  }

  if (kind === "accessory") {
    const light = shade(color, 48);
    return (
      <svg viewBox="0 0 200 220" className={cx("h-full w-full", className)} aria-hidden>
        <ellipse cx="100" cy="182" rx="62" ry="11" fill="#0a0d0c" opacity="0.12" />
        <circle cx="100" cy="108" r="62" fill="none" stroke={color} strokeWidth="26" />
        <circle cx="100" cy="108" r="62" fill="none" stroke={light} strokeWidth="10" opacity="0.8" />
        <rect x="86" y="30" width="28" height="30" rx="12" fill={shade(color, -30)} />
      </svg>
    );
  }

  if (kind === "bundle") {
    const podColors = ["#e0234e", "#f2c230", "#2ed3a0", "#7c4dff", "#ff7a18", "#ff8f6b"];
    return (
      <svg viewBox="0 0 380 420" className={cx("h-full w-full", className)} aria-hidden>
        <g transform="translate(90 8) scale(0.92)">
          <Bottle color={color} accent="#0a0d0c" id={id} />
        </g>
        {Array.from({ length: Math.min(count, 6) }).map((_, i) => {
          const positions = [
            { x: 46, y: 300, s: 0.42 },
            { x: 330, y: 292, s: 0.44 },
            { x: 74, y: 372, s: 0.38 },
            { x: 306, y: 372, s: 0.36 },
            { x: 190, y: 398, s: 0.4 },
            { x: 24, y: 218, s: 0.32 },
          ][i];
          return (
            <Pod
              key={i}
              id={`${id}-${i}`}
              color={podColors[i % podColors.length]}
              cx={positions.x}
              cy={positions.y}
              scale={positions.s}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 400" className={cx("h-full w-full", className)} aria-hidden>
      <Bottle color={color} accent={accent} id={id} />
    </svg>
  );
}

/** Photo si disponible, visuel vectoriel sinon. */
export function ProductMedia({
  image,
  alt,
  visual,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
}: {
  image?: string;
  alt: string;
  visual: { kind: VisualKind; color: string; accent?: string; count?: number };
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx("object-contain", className)}
      />
    );
  }
  return (
    <ProductVisual
      kind={visual.kind}
      color={visual.color}
      accent={visual.accent}
      count={visual.count}
      className={className}
    />
  );
}
