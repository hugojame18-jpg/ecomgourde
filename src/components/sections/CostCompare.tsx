import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { flavors, litresPerPack } from "@/data/flavors";


/**
 * Bloc de réassurance économique : combien coûte une semaine de goût.
 * Chiffres calculés depuis les données réelles, jamais écrits en dur.
 */
export function CostCompare() {
  const packPrice = flavors[0]?.price ?? 0;
  // 2 L/jour → 14 L/semaine → ~3 pods par semaine (1 pod ≈ 5 L)
  const litresPerWeek = 14;
  const packsPerWeek = litresPerWeek / litresPerPack;
  const weekly = packPrice * packsPerWeek;
  // Fourchette arrondie : c'est une estimation, pas un prix exact.
  const weeklyRange = `${Math.floor(weekly)}–${Math.ceil(weekly)} €`;

  const rows = [
    { k: `≈ ${Math.round(litresPerWeek / litresPerPack)} pods`, v: "par semaine" },
    { k: "2 L", v: "d'eau par jour" },
    { k: "0 €", v: "d'abonnement" },
  ];

  return (
    <section className="section bg-berry text-white">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-white/70">Atteins tes 2 L par jour</p>
          <div className="mt-5 grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <h2 className="text-[34px] font-bold leading-[0.95] tracking-[-0.04em] md:text-[52px]">
              Zéro sucre. Zéro calorie.
              <br />
              <span className="text-white/55">Zéro abonnement.</span>
            </h2>

            <div>
              <p className="font-display text-[54px] font-bold leading-none tracking-[-0.045em] md:text-[68px]">
                {weeklyRange}
              </p>
              <p className="mt-2 text-[16px] text-white/60">
                pour une semaine de goût, à 2 litres par jour
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid gap-4 border-t border-white/12 pt-8 sm:grid-cols-3">
            {rows.map((r) => (
              <div key={r.k}>
                <dt className="font-display text-[30px] font-bold tracking-[-0.03em] md:text-[36px]">
                  {r.k}
                </dt>
                <dd className="mt-1 text-[14.5px] text-white/55">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/produit/flow-bottle-7-pods" variant="brand" size="lg">
              Commander avec 7 pods
            </ButtonLink>
            <p className="text-[13px] text-white/45">
              Un pod parfume environ 5 L. Aucun engagement, tu recommandes quand tu veux.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
