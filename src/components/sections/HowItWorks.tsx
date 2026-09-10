import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductVisual } from "@/components/visuals/ProductVisual";

const steps = [
  {
    n: "01",
    title: "Remplis ta gourde",
    text: "Eau du robinet, eau plate ou pétillante. 650 ml, et le corps translucide te montre ce qu'il te reste.",
    color: "#00c9b6",
  },
  {
    n: "02",
    title: "Choisis ton pod",
    text: "Clipse l'arôme du moment sur le bouchon. Deux secondes, un clic, c'est en place.",
    color: "#e0234e",
  },
  {
    n: "03",
    title: "Bois et profite",
    text: "L'air passe par le pod avant d'arriver en bouche : tu perçois le goût, l'eau reste pure.",
    color: "#7c4dff",
  },
];

function StepVisual({ index, color }: { index: number; color: string }) {
  if (index === 0) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 top-2 mx-auto h-[86%] w-[38%]">
          <ProductVisual kind="bottle" color={color} accent="#0a0d0c" />
        </div>
        <svg
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-0 h-[42%] w-[42%] -translate-x-1/2"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              cx="100"
              cy={40 + i * 46}
              rx={9 - i * 1.6}
              ry={16 - i * 2.4}
              fill="#7fd8ee"
              opacity={0.55 - i * 0.12}
            />
          ))}
        </svg>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2">
          <ProductVisual kind="pod" color={color} />
        </div>
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.4"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="aroma" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="100%" stopColor={color} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${72 + i * 28} 168 C ${52 + i * 28} 128, ${94 + i * 28} 110, ${72 + i * 28} 66 S ${
              56 + i * 28
            } 34, ${74 + i * 28} 18`}
            stroke="url(#aroma)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity={1 - i * 0.25}
          />
        ))}
        <ellipse cx="100" cy="176" rx="56" ry="12" fill={color} opacity="0.16" />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="section relative bg-[linear-gradient(180deg,#fffaeb_0%,#fff3d9_100%)]">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Comment ça marche"
            title={
              <>
                Trois gestes.
                <br />
                Une nouvelle façon de boire.
              </>
            }
            text="Pas de poudre, pas de sirop, rien à diluer. Le goût arrive par l'odorat, l'eau reste de l'eau."
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>

        <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <li className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-mist p-6 transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(10,13,12,.25)] md:p-7">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                  style={{ background: s.color }}
                />
                <div className="relative mb-6 h-40 w-full md:h-48">
                  <StepVisual index={i} color={s.color} />
                </div>
                <span
                  className="font-display text-[13px] font-bold tracking-[0.2em]"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em] md:text-[27px]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-3 md:mt-14">
            <ButtonLink href="/produit/flow-bottle-7-pods" variant="primary" size="lg">
              Commander avec 7 pods
            </ButtonLink>
            <p className="text-[13px] text-ink-400">
              1 gourde + les 7 arômes · livraison offerte · 30 jours pour changer d&apos;avis
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
