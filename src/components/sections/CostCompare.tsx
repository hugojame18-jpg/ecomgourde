import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LITRES_PER_POD } from "@/data/flavors";
import { heroProduct } from "@/data/products";

/**
 * Bloc de réassurance économique : ce que couvre le pack.
 * Tout est calculé depuis le produit réellement vendu — le jour où un pod se
 * vend seul, c'est ici qu'il faudra revenir, pas dans un chiffre écrit en dur.
 */
export function CostCompare() {
  const pack = heroProduct();
  const podCount = pack.pods?.count ?? 0;
  const litres = podCount * LITRES_PER_POD;

  const rows = [
    { k: `${podCount} pods`, v: "livrés avec la gourde, un par goût" },
    { k: `${LITRES_PER_POD} L`, v: "d'eau parfumée par pod" },
    { k: "0 €", v: "d'abonnement, jamais" },
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
                ≈ {litres} L
              </p>
              <p className="mt-2 text-[16px] text-white/60">
                d&apos;eau parfumée dans le pack, puis la gourde se garde à vie
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
            <ButtonLink href="/produit/sugar-bottle-7-pods" variant="brand" size="lg">
              Commander avec 7 pods
            </ButtonLink>
            <p className="text-[13px] text-white/45">
              Un pod parfume environ {LITRES_PER_POD} L. Aucun engagement, aucun prélèvement
              automatique.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
