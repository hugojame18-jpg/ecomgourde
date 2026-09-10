import { bundles } from "@/data/products";
import { BundleCard } from "@/components/product/BundleCard";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Bundles({ compact }: { compact?: boolean }) {
  const list = bundles();
  return (
    <section id="bundles" className="section bg-mist">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Bundles"
              title={
                <>
                  Le bon pack,
                  <br />
                  au bon prix.
                </>
              }
              text={
                compact
                  ? undefined
                  : "Trois formules pensées pour couvrir tous les cas : démarrer, explorer, réapprovisionner."
              }
            />
            <p className="rounded-2xl bg-white px-5 py-4 text-[14px] leading-snug text-ink-600 shadow-[var(--shadow-card)] md:max-w-[280px]">
              <span className="font-semibold text-ink">Jusqu&apos;à 19 % d&apos;économie</span>{" "}
              par rapport aux mêmes produits achetés à l&apos;unité.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {list.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08} className="h-full">
              <BundleCard product={b} featured={b.slug === "flow-bottle-7-pods"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
