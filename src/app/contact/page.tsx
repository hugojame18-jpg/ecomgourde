import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & service client",
  alternates: { canonical: "/contact" },
  description:
    "Une question sur ta commande, sur la gourde ou sur les arômes ? On répond sous 48 h ouvrées.",
};

const channels = [
  {
    icon: "✉️",
    title: "E-mail",
    text: site.legal.email,
    detail: "Réponse sous 48 h ouvrées, du lundi au vendredi.",
  },
  {
    icon: "💬",
    title: "Instagram / TikTok",
    text: "@sugar",
    detail: "En DM, souvent le plus rapide en journée.",
  },
  {
    icon: "📦",
    title: "Suivi de commande",
    text: "Le lien est dans ton e-mail de confirmation",
    detail: "Livraison en 5 à 10 jours, suivi fourni.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="On est joignables. Vraiment."
        text="Une adresse, une vraie personne derrière. Écris quand tu veux, on répond sous 48 h ouvrées."
      />

      <section className="section bg-white">
        <div className="shell grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <div key={c.title} className="rounded-[24px] border border-ink/10 p-6">
              <span className="text-[24px]" aria-hidden>
                {c.icon}
              </span>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                {c.title}
              </p>
              <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">{c.text}</p>
              <p className="mt-2 text-[14px] leading-snug text-ink-600">{c.detail}</p>
            </div>
          ))}
        </div>

        <div className="shell mt-10">
          <div className="rounded-[28px] bg-mist p-6 md:p-10">
            <h2 className="text-[26px] font-bold tracking-[-0.03em] md:text-[34px]">
              Reste au courant des nouveaux goûts
            </h2>
            <p className="mt-2 max-w-[52ch] text-[15px] text-ink-600">
              Deux à trois e-mails par mois maximum, et −{site.firstOrderDiscount} % sur ta première
              commande.
            </p>
            <div className="mt-5 max-w-[460px]">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
