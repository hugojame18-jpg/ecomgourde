import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { asset } from "@/lib/asset";

const before = [
  { title: "La bouteille en plastique", text: "Rachetée, oubliée, jetée. Encore et encore." },
  { title: "L'eau sans goût", text: "On sait qu'il faut en boire. On n'en boit pas." },
  { title: "Le soda de 16 h", text: "35 g de sucre pour tenir jusqu'au soir." },
];

const after = [
  { title: "Une gourde pour des années", text: "Tritan sans BPA, garantie 2 ans, elle te suit partout." },
  { title: "Le goût à la demande", text: "Un pod, un clic, une nouvelle envie de boire." },
  { title: "0 sucre, 0 calorie", text: "Le plaisir du goût, sans rien dans le verre." },
];

export function BeforeAfter() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Avant / Après"
            title="Le problème n'a jamais été l'eau."
            text="Il a toujours été l'ennui. Voilà ce qui change concrètement dans une journée."
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {/* AVANT */}
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-mist p-6 md:p-8">
              <span className="eyebrow text-ink-400">Avant</span>
              <div className="relative mx-auto my-6 h-40 w-full max-w-[220px] opacity-40 grayscale">
                <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden>
                  <ellipse cx="100" cy="204" rx="52" ry="9" fill="#0a0d0c" opacity="0.12" />
                  <path
                    d="M78 24h44v18l14 22v128a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12V64l14-22z"
                    fill="#c9cfcd"
                  />
                  <rect x="74" y="10" width="52" height="18" rx="5" fill="#9aa3a1" />
                  <rect x="64" y="112" width="72" height="34" fill="#b3bab8" />
                  <path d="M84 40h10v130H84z" fill="#fff" opacity="0.45" />
                </svg>
              </div>
              <ul className="mt-auto flex flex-col gap-4">
                {before.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/10 text-[11px] text-ink-400">
                      ✕
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold text-ink-600">{b.title}</span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-ink-400">
                        {b.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* APRÈS */}
          <Reveal delay={0.1}>
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 text-white md:p-8"
              style={{
                background:
                  "linear-gradient(160deg, #a8305c 0%, #8d2a5e 55%, #6d2a68 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{ background: "#ffd0e0" }}
              />
              <span className="eyebrow relative text-white/70">Après</span>
              <div className="relative mx-auto my-6 h-44 w-full max-w-[220px]">
                <Image
                  src={asset("/produits/bottle-bleu.png")}
                  alt="La Flow Bottle en Tritan bleu ciel"
                  fill
                  sizes="220px"
                  className="object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.25)]"
                />
              </div>
              <ul className="relative mt-auto flex flex-col gap-4">
                {after.map((a) => (
                  <li key={a.title} className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-berry">
                      ✓
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold">{a.title}</span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-white/55">
                        {a.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-4 rounded-[28px] bg-brand-soft p-6 text-center md:mt-14 md:grid-cols-3 md:p-8">
            {[
              { k: "+1,2 L", v: "d'eau bue par jour en moyenne*" },
              { k: "−340", v: "bouteilles plastique par an*" },
              { k: "4,8/5", v: "note moyenne sur 2 417 avis" },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-[38px] font-bold tracking-[-0.04em] text-brand-dark md:text-[46px]">
                  {s.k}
                </p>
                <p className="mt-1 text-[13.5px] text-ink-600">{s.v}</p>
              </div>
            ))}
            <p className="col-span-full text-[11px] text-ink-400">
              * Chiffres illustratifs présentés à titre de démonstration.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
