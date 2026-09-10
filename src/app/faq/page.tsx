import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqList } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/Primitives";
import { faq } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Questions fréquentes sur la gourde et les pods",
  description:
    "Comment le goût passe par l'air, quels arômes existent, combien de litres par pod, livraison et retours : toutes les réponses.",
  alternates: { canonical: "/faq" },
};

const shipping = [
  {
    q: "Quels sont les délais de livraison ?",
    a: "Compte 7 à 14 jours entre ta commande et sa réception, suivi fourni dès l'expédition.",
  },
  {
    q: "Combien coûte la livraison ?",
    a: `Elle est offerte dès ${site.freeShippingThreshold} € d'achat. En dessous, elle est facturée ${site.shippingCost.toFixed(2).replace(".", ",")} €.`,
  },
  {
    q: "Comment retourner un produit ?",
    a: "Tu as 30 jours pour changer d'avis. Un e-mail au service client suffit : on te renvoie l'adresse de retour. Les frais de renvoi sont à ta charge ; dès que le colis nous revient complet, tu es remboursé sous 14 jours.",
  },
  {
    q: "Livrez-vous à l'international ?",
    a: "Nous livrons dans toute l'Union européenne, en Suisse et au Royaume-Uni. D'autres pays arrivent progressivement.",
  },
];

/**
 * Balisage FAQPage. Google réserve désormais l'affichage enrichi des FAQ aux
 * sites institutionnels et de santé : n'attends pas de gain d'affichage direct.
 * Ça reste utile pour Bing et pour les moteurs conversationnels, qui s'appuient
 * sur ce balisage pour citer une réponse.
 */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...faq, ...shipping].map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PageHeader
        eyebrow="Aide"
        title="Tout ce qu'il faut savoir."
        text="Et si la réponse n'est pas là, on répond en moins de 24 h."
      />
      <FaqSection />
      <section id="livraison" className="section bg-mist">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Livraison & retours" title="Le colis, le délai, le retour." />
          <FaqList items={shipping} defaultOpen={0} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
