import { ButtonLink } from "@/components/ui/Button";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-brand px-6 py-12 md:px-14 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-white/25 blur-3xl"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h2 className="text-[36px] font-bold leading-[0.94] tracking-[-0.045em] text-ink md:text-[54px]">
                  Ta prochaine gorgée
                  <br />
                  peut avoir le goût
                  <br />
                  que tu veux.
                </h2>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink/70">
                  Le pack complet : la gourde, les sept arômes et la livraison offerte. 30 jours
                  pour changer d&apos;avis, sans discussion.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/produit/flow-bottle-7-pods" variant="primary" size="lg">
                    Commander avec 7 pods
                  </ButtonLink>
                  <ButtonLink
                    href="/pods"
                    size="lg"
                    className="border border-ink/20 bg-transparent text-ink hover:bg-white/40"
                  >
                    Voir tous les goûts
                  </ButtonLink>
                </div>
                <p className="mt-4 text-[13px] text-ink/60">
                  🚚 Livraison offerte · 📦 5 à 10 jours
                </p>
              </div>
              <div className="relative mx-auto h-56 w-full max-w-[320px] md:h-80">
                <ProductVisual kind="bundle" color="#0a0d0c" count={4} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
