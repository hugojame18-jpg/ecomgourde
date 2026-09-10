import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/data/site";

/**
 * MENTIONS LÉGALES, CGV ET CONFIDENTIALITÉ
 *
 * Les textes ci-dessous sont rédigés pour une vente de biens à distance à des
 * consommateurs en France. Ils reprennent les obligations du Code de la
 * consommation et du RGPD.
 *
 * ⚠️ Deux choses restent à ta charge :
 *   1. remplir `site.legal` (raison sociale, SIREN, adresse, contact,
 *      médiateur) — tant que c'est vide, un avertissement s'affiche ;
 *   2. faire relire l'ensemble par un professionnel du droit avant de vendre.
 *      Ce sont des textes solides, pas un conseil juridique.
 */

const L = site.legal;

/** Nom sous lequel le site s'annonce, à défaut de raison sociale renseignée. */
const NOM_EDITEUR = L.company.trim() || site.legalName;

/** Mentions sans lesquelles le site ne doit pas encaisser de commande. */
const CHAMPS_REQUIS = [
  ["company", "le nom de l'entrepreneur (obligatoire pour une EI)"],
  ["siren", "le SIREN"],
  ["address", "l'adresse du siège"],
  ["email", "l'e-mail de contact"],
  ["mediator", "le médiateur de la consommation"],
] as const;

const manquants = CHAMPS_REQUIS.filter(([k]) => !L[k].trim()).map(([, label]) => label);

/**
 * Le rappel s'adresse au développeur, pas à l'acheteur : il ne s'affiche
 * qu'en local. En production, les phrases concernées restent lisibles sans
 * laisser traîner un « [à compléter] » sous les yeux d'un client.
 */
const alerteVisible = manquants.length > 0 && process.env.NODE_ENV !== "production";

/**
 * Article L616-1 : l'adhésion à un médiateur de la consommation est
 * obligatoire. Tant qu'elle n'est pas faite, on renvoie vers la plateforme
 * européenne, qui elle existe déjà, plutôt que d'afficher un trou.
 */
const mediation = L.mediator.trim()
  ? `En cas de litige non résolu, tu peux recourir gratuitement au médiateur de la consommation dont nous relevons : ${L.mediator}.`
  : "En cas de litige non résolu, tu peux recourir gratuitement à un médiateur de la consommation. Écris-nous d'abord : nous te communiquons les coordonnées du médiateur dont nous relevons sous 48 heures ouvrées.";

/**
 * Bloc « Éditeur » : chaque ligne dont l'information manque est retirée
 * plutôt qu'affichée à trou. Un champ vide reste signalé par le rappel
 * ci-dessus, visible en local uniquement.
 */
const editeur = [
  [NOM_EDITEUR, L.form].filter(Boolean).join(" — "),
  L.address && `Siège social : ${L.address}`,
  [L.siren && `SIREN : ${L.siren}`, L.vat].filter(Boolean).join(" — "),
  L.email && `Contact : ${L.email}${L.phone ? ` — ${L.phone}` : ""}`,
  L.publisher && `Responsable de la publication : ${L.publisher}`,
].filter((ligne): ligne is string => Boolean(ligne));

/** Hébergeur du site : GitHub Pages. À changer si tu déménages le site. */
const HEBERGEUR =
  "GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis — https://github.com";

type Bloc = { h: string; p: string[] };

const pages: Record<string, { title: string; intro: string; blocks: Bloc[] }> = {
  "mentions-legales": {
    title: "Mentions légales",
    intro: "Informations relatives à l'éditeur, à l'hébergeur et aux contenus du site.",
    blocks: [
      {
        h: "Éditeur du site",
        p: editeur,
      },
      {
        h: "Hébergeur",
        p: [
          `Le site est hébergé par ${HEBERGEUR}.`,
          "Le paiement et la gestion des commandes sont assurés par Shopify International Limited, 2nd Floor, 1-2 Victoria Buildings, Haddington Road, Dublin 4, Irlande.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          `L'ensemble des contenus de ce site — textes, photographies, mise en page, marque ${site.name} — est protégé par le droit de la propriété intellectuelle. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.`,
          "Les marques citées à titre de comparaison restent la propriété de leurs titulaires respectifs.",
        ],
      },
      {
        h: "Signaler un contenu",
        p: [
          `Pour toute remarque sur un contenu de ce site, écris à ${L.email}. Nous répondons sous 48 heures ouvrées.`,
        ],
      },
    ],
  },

  cgv: {
    title: "Conditions générales de vente",
    intro: "Conditions applicables à toute commande passée sur ce site.",
    blocks: [
      {
        h: "1. Objet et champ d'application",
        p: [
          `Les présentes conditions régissent les ventes conclues sur ce site entre ${NOM_EDITEUR} et tout acheteur consommateur. Passer commande implique leur acceptation sans réserve.`,
          "Elles peuvent être modifiées à tout moment ; la version applicable est celle en ligne au jour de la commande.",
        ],
      },
      {
        h: "2. Produits",
        p: [
          "Les produits proposés sont des gourdes réutilisables et des pods aromatiques. Les photographies et descriptifs sont les plus fidèles possibles, sans que les différences mineures de teinte ou d'aspect puissent engager notre responsabilité.",
          "Les pods diffusent un arôme par voie olfactive : rien n'est ajouté dans l'eau. Ils ne sont pas des compléments alimentaires et ne se substituent pas à une alimentation variée.",
        ],
      },
      {
        h: "3. Prix",
        p: [
          `Les prix sont indiqués en euros, toutes taxes comprises. ${L.vat}.`,
          "Les frais de livraison éventuels sont affichés avant la validation finale de la commande. Les prix peuvent évoluer à tout moment ; le prix applicable est celui affiché au moment de la commande.",
        ],
      },
      {
        h: "4. Commande et paiement",
        p: [
          "La commande est ferme dès la validation du paiement. Un e-mail de confirmation récapitulant la commande est envoyé à l'adresse indiquée.",
          "Le paiement s'effectue sur une page sécurisée opérée par Shopify Payments : carte bancaire, Apple Pay, Shop Pay. Aucune donnée bancaire ne transite ni n'est conservée par nos soins.",
          "Nous nous réservons le droit d'annuler toute commande présentant un motif sérieux de suspicion de fraude, avec remboursement intégral.",
        ],
      },
      {
        h: "5. Livraison",
        p: [
          "Les produits sont expédiés en France métropolitaine. Le délai de livraison est de 7 à 14 jours à compter de la validation de la commande. Un numéro de suivi est communiqué dès l'expédition.",
          "La livraison est offerte sur toutes les commandes contenant une gourde.",
          "En cas de dépassement de la date de livraison indiquée, tu peux nous demander de livrer dans un délai supplémentaire raisonnable ; à défaut, tu peux annuler la commande et être remboursé sous 14 jours (articles L216-2 et L216-6 du Code de la consommation).",
        ],
      },
      {
        h: "6. Droit de rétractation",
        p: [
          "Tu disposes d'un délai de 14 jours à compter de la réception pour te rétracter, sans avoir à te justifier. Nous étendons ce délai à 30 jours à titre commercial.",
          `Pour l'exercer, il suffit de nous écrire à ${L.email} avant l'expiration du délai. Le produit doit être renvoyé complet, dans un état permettant sa remise en vente. Les frais de retour sont à ta charge.`,
          "Le remboursement intervient au plus tard 14 jours après réception du retour, par le même moyen de paiement que celui utilisé lors de l'achat.",
          "Pour des raisons d'hygiène, les pods descellés ou utilisés ne peuvent être repris.",
        ],
      },
      {
        h: "7. Garanties légales",
        p: [
          "Le consommateur dispose d'un délai de deux ans à compter de la délivrance du bien pour obtenir la mise en œuvre de la garantie légale de conformité en cas d'apparition d'un défaut de conformité. Durant ce délai, il n'est tenu d'établir que l'existence du défaut, non sa date d'apparition (articles L217-3 et suivants du Code de la consommation).",
          "La garantie légale de conformité ouvre droit à la réparation ou au remplacement du bien, et à défaut à la réduction du prix ou à la résolution de la vente. Elle s'applique indépendamment de toute garantie commerciale.",
          "Le consommateur peut également mettre en œuvre la garantie des vices cachés au sens de l'article 1641 du Code civil, pendant deux ans à compter de la découverte du vice.",
        ],
      },
      {
        h: "8. Réclamations et médiation",
        p: [
          `Toute réclamation doit être adressée à ${L.email}. Nous répondons sous 48 heures ouvrées.`,
          mediation,
          "La plateforme européenne de règlement en ligne des litiges est également accessible à l'adresse https://ec.europa.eu/consumers/odr.",
        ],
      },
      {
        h: "9. Droit applicable",
        p: [
          "Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, les tribunaux français sont compétents.",
        ],
      },
    ],
  },

  confidentialite: {
    title: "Politique de confidentialité",
    intro: "Quelles données sont collectées, pourquoi, et quels sont tes droits.",
    blocks: [
      {
        h: "Responsable du traitement",
        p: [`${NOM_EDITEUR}, ${L.address}. Contact : ${L.email}.`],
      },
      {
        h: "Données collectées et finalités",
        p: [
          "Commande : nom, adresse de livraison et de facturation, e-mail, téléphone si fourni, détail et historique des achats. Ces données servent à traiter la commande, l'expédier et assurer le service après-vente. Base légale : l'exécution du contrat.",
          "Newsletter : adresse e-mail, si tu la communiques. Base légale : ton consentement, retirable à tout moment par le lien de désinscription.",
          "Mesure d'audience : données de navigation anonymisées, uniquement si tu y consens.",
        ],
      },
      {
        h: "Destinataires",
        p: [
          "Shopify (traitement du paiement et gestion des commandes), le transporteur en charge de la livraison, et notre outil d'envoi d'e-mails le cas échéant. Aucune donnée n'est vendue ni cédée à des tiers à des fins publicitaires.",
          "Certains prestataires peuvent traiter des données hors Union européenne, sous les garanties prévues par le RGPD (clauses contractuelles types).",
        ],
      },
      {
        h: "Durée de conservation",
        p: [
          "Données de commande : 3 ans à compter du dernier contact pour la relation client, et 10 ans pour les pièces comptables, conformément aux obligations légales.",
          "Adresse e-mail collectée pour la newsletter : jusqu'au retrait du consentement, et au plus 3 ans sans interaction.",
        ],
      },
      {
        h: "Tes droits",
        p: [
          `Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Pour l'exercer, écris à ${L.email} ; nous répondons sous un mois.`,
          "Tu peux également introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, 75007 Paris — www.cnil.fr.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Les cookies strictement nécessaires au fonctionnement du site (panier, sécurité) sont déposés sans consentement, comme la loi le permet.",
          "Les cookies de mesure d'audience ou de publicité ne sont déposés qu'après ton accord, et tu peux revenir sur ce choix à tout moment.",
        ],
      },
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
  return page
    ? { title: page.title, description: page.intro, alternates: { canonical: `/legal/${slug}` } }
    : {};
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
          {alerteVisible ? (
            <div className="mb-8 rounded-2xl border border-berry/25 bg-berry-soft px-5 py-4 text-[14px] leading-relaxed text-berry-deep">
              ⚠️ <strong>Mentions obligatoires incomplètes.</strong> Il manque encore{" "}
              {manquants.join(", ")}. Complète <code>src/data/site.ts</code> : ces informations sont
              exigées en vente à distance, et cet encadré disparaîtra une fois les champs remplis.
            </div>
          ) : null}

          <div className="flex flex-col gap-9">
            {page.blocks.map((b) => (
              <div key={b.h}>
                <h2 className="text-[21px] font-bold tracking-[-0.03em]">{b.h}</h2>
                {b.p.map((paragraphe) => (
                  <p key={paragraphe} className="mt-2.5 text-[15.5px] leading-relaxed text-ink-600">
                    {paragraphe}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-12 text-[13px] text-ink-400">Dernière mise à jour : septembre 2026.</p>
        </div>
      </section>
    </>
  );
}
