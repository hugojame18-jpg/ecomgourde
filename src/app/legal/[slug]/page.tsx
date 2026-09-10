import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/data/site";

/** Textes à remplacer par tes documents juridiques réels. */
const pages: Record<string, { title: string; intro: string; blocks: { h: string; p: string }[] }> = {
  "mentions-legales": {
    title: "Mentions légales",
    intro: "Informations légales relatives à l'éditeur et à l'hébergeur du site.",
    blocks: [
      {
        h: "Éditeur du site",
        p: `${site.legalName}, société fictive créée pour cette démonstration. Adresse, SIREN, capital social et directeur de la publication à compléter.`,
      },
      { h: "Hébergeur", p: "Nom, adresse et téléphone de l'hébergeur à compléter." },
      {
        h: "Propriété intellectuelle",
        p: "L'ensemble des contenus (textes, visuels, marques) est protégé. Toute reproduction sans autorisation est interdite.",
      },
    ],
  },
  cgv: {
    title: "Conditions générales de vente",
    intro: "Conditions applicables à toute commande passée sur le site.",
    blocks: [
      { h: "Prix", p: "Les prix sont indiqués en euros toutes taxes comprises, hors frais de livraison." },
      {
        h: "Commande et paiement",
        p: "La commande est validée après confirmation du paiement. Les moyens de paiement acceptés sont à préciser selon ton prestataire.",
      },
      {
        h: "Livraison",
        p: `Livraison en 5 à 10 jours en France, suivi communiqué dès l'expédition. Livraison offerte dès ${site.freeShippingThreshold} €.`,
      },
      {
        h: "Rétractation",
        p: "Conformément au droit de la consommation, tu disposes de 14 jours pour te rétracter. Nous étendons ce délai à 30 jours.",
      },
      { h: "Garanties", p: "Garantie légale de conformité et garantie des vices cachés applicables." },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    intro: "Comment les données personnelles sont collectées, utilisées et protégées.",
    blocks: [
      {
        h: "Données collectées",
        p: "Identité, coordonnées de livraison, e-mail et historique de commandes, uniquement pour traiter les commandes et le service client.",
      },
      {
        h: "Cookies",
        p: "Cookies de fonctionnement et, avec ton consentement, cookies de mesure d'audience et de publicité.",
      },
      {
        h: "Tes droits",
        p: "Accès, rectification, suppression, portabilité et opposition — par simple e-mail à l'adresse de contact.",
      },
      { h: "Conservation", p: "Les données de commande sont conservées le temps légal applicable." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow="Informations" title={page.title} text={page.intro} />
      <section className="section bg-white">
        <div className="shell max-w-[760px]">
          <div className="mb-8 rounded-2xl bg-mist px-5 py-4 text-[14px] text-ink-600">
            ⚠️ Contenu de démonstration. Fais rédiger ou valider ces documents avant toute mise en
            ligne commerciale.
          </div>
          <div className="flex flex-col gap-8">
            {page.blocks.map((b) => (
              <div key={b.h}>
                <h2 className="text-[22px] font-bold tracking-[-0.03em]">{b.h}</h2>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-600">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
