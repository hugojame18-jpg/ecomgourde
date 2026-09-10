import { cx } from "@/lib/format";

/**
 * Illustration de fruit générée — placeholder tant que la vraie photo
 * n'est pas fournie dans /public/produits/fruits/.
 * Style : fruit centré + gouttes d'eau en suspension, comme les visuels de
 * référence.
 */

function Droplets({ seed = 0 }: { seed?: number }) {
  const drops = [
    { x: 34, y: 44, r: 5.5 },
    { x: 168, y: 60, r: 4.5 },
    { x: 26, y: 128, r: 4 },
    { x: 176, y: 140, r: 6 },
    { x: 60, y: 24, r: 3.5 },
    { x: 140, y: 176, r: 4.5 },
    { x: 152, y: 22, r: 3 },
    { x: 48, y: 170, r: 3.5 },
  ];
  return (
    <g>
      {drops.map((d, i) => (
        <g key={i} opacity={0.5 + ((i + seed) % 3) * 0.15}>
          <circle cx={d.x} cy={d.y} r={d.r} fill="#fff" opacity="0.55" />
          <circle cx={d.x} cy={d.y} r={d.r} fill="none" stroke="#fff" strokeWidth="1" opacity="0.8" />
          <circle cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.35} r={d.r * 0.3} fill="#fff" opacity="0.9" />
        </g>
      ))}
    </g>
  );
}

function Berry({ cx: x, cy: y, r, color, dark }: { cx: number; cy: number; r: number; color: string; dark: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={dark} />
      <circle cx={x} cy={y - r * 0.08} r={r * 0.92} fill={color} />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.38} rx={r * 0.3} ry={r * 0.22} fill="#fff" opacity="0.45" />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, color = "#3fa14a" }: { x: number; y: number; rotate?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M0 0 C 14 -10, 30 -6, 34 4 C 24 14, 8 12, 0 0 Z" fill={color} />
      <path d="M0 0 C 12 -2, 24 0, 34 4" stroke="#2c7a35" strokeWidth="1.2" fill="none" opacity="0.6" />
    </g>
  );
}

function Shapes({ id, color }: { id: string; color: string }) {
  switch (id) {
    /* ---------- Cerise ---------- */
    case "cerise":
      return (
        <g>
          <path
            d="M100 34 C 86 58, 74 84, 72 118 M100 34 C 116 58, 128 86, 132 116"
            stroke="#4a7c2f"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <Leaf x={100} y={30} rotate={-18} />
          <Berry cx={72} cy={140} r={30} color="#d81b34" dark="#9c0f22" />
          <Berry cx={134} cy={138} r={32} color="#e02440" dark="#a01126" />
        </g>
      );

    /* ---------- Fruits rouges ---------- */
    case "fruits-rouges":
      return (
        <g>
          <Berry cx={68} cy={118} r={26} color="#e0234e" dark="#a3122f" />
          <Berry cx={132} cy={112} r={24} color="#c81d6a" dark="#8e0f47" />
          <Berry cx={100} cy={148} r={28} color="#e63950" dark="#a81532" />
          <Berry cx={122} cy={70} r={20} color="#4f6bd8" dark="#2f45a0" />
          <Berry cx={72} cy={72} r={18} color="#2f3fa0" dark="#1d2870" />
          <Leaf x={94} y={52} rotate={-24} />
        </g>
      );

    /* ---------- Fruits des bois ---------- */
    case "fruits-des-bois":
      return (
        <g>
          <Berry cx={70} cy={120} r={27} color="#3b2357" dark="#241236" />
          <Berry cx={132} cy={116} r={25} color="#5b2d7a" dark="#37174d" />
          <Berry cx={100} cy={150} r={26} color="#7c4dff" dark="#4d2bb0" />
          <Berry cx={100} cy={82} r={22} color="#4a3aa8" dark="#2b2070" />
          <Leaf x={96} y={58} rotate={-20} color="#4e8c3f" />
        </g>
      );

    /* ---------- Citron ---------- */
    case "citron":
      return (
        <g>
          <ellipse cx="100" cy="112" rx="62" ry="52" fill="#e8c21c" />
          <ellipse cx="100" cy="112" rx="54" ry="44" fill="#f7de55" />
          <ellipse cx="100" cy="112" rx="46" ry="37" fill="#fff3ad" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M100 112 L ${100 + Math.cos(a) * 44} ${112 + Math.sin(a) * 35}`}
                stroke="#e8c21c"
                strokeWidth="2.5"
                opacity="0.7"
              />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
            return (
              <ellipse
                key={i}
                cx={100 + Math.cos(a) * 26}
                cy={112 + Math.sin(a) * 21}
                rx="12"
                ry="9"
                fill="#ffe97a"
                transform={`rotate(${(a * 180) / Math.PI} ${100 + Math.cos(a) * 26} ${112 + Math.sin(a) * 21})`}
              />
            );
          })}
          <Leaf x={112} y={58} rotate={-30} />
        </g>
      );

    /* ---------- Orange ---------- */
    case "orange":
      return (
        <g>
          <circle cx="100" cy="114" r="58" fill="#e86a0a" />
          <circle cx="100" cy="114" r="50" fill="#ff8c1a" />
          <circle cx="100" cy="114" r="42" fill="#ffb347" />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M100 114 L ${100 + Math.cos(a) * 41} ${114 + Math.sin(a) * 41}`}
                stroke="#ff8c1a"
                strokeWidth="3"
                opacity="0.75"
              />
            );
          })}
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2 + Math.PI / 9;
            return (
              <ellipse
                key={i}
                cx={100 + Math.cos(a) * 25}
                cy={114 + Math.sin(a) * 25}
                rx="12"
                ry="8"
                fill="#ffca7a"
                transform={`rotate(${(a * 180) / Math.PI} ${100 + Math.cos(a) * 25} ${114 + Math.sin(a) * 25})`}
              />
            );
          })}
          <Leaf x={110} y={54} rotate={-28} />
        </g>
      );

    /* ---------- Coco ---------- */
    case "coco":
      return (
        <g>
          <circle cx="100" cy="118" r="58" fill="#6b4327" />
          <circle cx="100" cy="118" r="52" fill="#8a5a34" />
          <path d="M48 118 a52 52 0 0 1 104 0 z" fill="#7a4d2c" opacity="0.5" />
          <ellipse cx="100" cy="112" rx="44" ry="40" fill="#fdf6ec" />
          <ellipse cx="100" cy="112" rx="34" ry="30" fill="#fffdf8" />
          <ellipse cx="86" cy="100" rx="12" ry="9" fill="#fff" opacity="0.9" />
          <path
            d="M62 96 q14 -10 28 -4 M138 96 q-14 -10 -28 -4"
            stroke="#c8ad91"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </g>
      );

    /* ---------- Tropical ---------- */
    case "tropical":
    default:
      return (
        <g>
          {/* mangue */}
          <path
            d="M56 150 C 34 128, 44 88, 78 74 C 104 63, 126 78, 122 104 C 118 132, 86 166, 56 150 Z"
            fill="#f5a623"
          />
          <path
            d="M62 142 C 46 124, 56 94, 82 84 C 100 77, 114 88, 111 106"
            fill="#ffc65c"
            opacity="0.8"
          />
          {/* fruit de la passion */}
          <circle cx="140" cy="126" r="34" fill="#6b3b8f" />
          <circle cx="140" cy="126" r="28" fill="#8e5bb0" />
          <ellipse cx="140" cy="124" rx="22" ry="20" fill="#f2b705" />
          {[
            [132, 116],
            [148, 118],
            [138, 130],
            [151, 131],
            [141, 140],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.4" fill="#3a2a12" opacity="0.85" />
          ))}
          <Leaf x={104} y={58} rotate={-22} />
        </g>
      );
  }
}

export function FruitVisual({
  flavorId,
  color,
  className,
}: {
  flavorId: string;
  color: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={cx("h-full w-full", className)} aria-hidden>
      <ellipse cx="100" cy="182" rx="52" ry="9" fill="#0a0d0c" opacity="0.1" />
      <Shapes id={flavorId} color={color} />
      <Droplets seed={flavorId.length} />
    </svg>
  );
}
