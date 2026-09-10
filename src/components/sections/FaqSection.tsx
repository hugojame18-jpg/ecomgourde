import Link from "next/link";
import { faq } from "@/data/faq";
import { FaqList } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function FaqSection({ items = faq }: { items?: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="section bg-[linear-gradient(180deg,#ffffff_0%,#fdf3f7_100%)]">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Les questions
                  <br />
                  qu&apos;on nous pose
                  <br />
                  tout le temps.
                </>
              }
            />
            <div className="mt-6 rounded-[24px] bg-mist p-5">
              <p className="text-[15px] font-semibold">Une autre question ?</p>
              <p className="mt-1 text-[14px] text-ink-600">
                On répond en moins de 24 h, du lundi au vendredi.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex text-[14px] font-semibold underline underline-offset-4 hover:text-brand-dark"
              >
                Nous écrire →
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}
