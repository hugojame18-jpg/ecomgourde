/**
 * Configuration de marque — change ces valeurs pour rebrander le site en 2 minutes.
 */
export const site = {
  name: "SUGAR",
  legalName: "SUGAR",

  /**
   * IDENTITÉ LÉGALE — à compléter avant toute vente.
   * Tant qu'un champ reste vide, les pages légales affichent un avertissement
   * et le site ne doit pas encaisser de commande : ces mentions sont
   * obligatoires en vente à distance.
   */
  legal: {
    /** raison sociale exacte, telle qu'immatriculée */
    company: "",
    /** ex. « Entreprise individuelle (micro-entreprise) » */
    form: "",
    /** 9 chiffres */
    siren: "",
    /** adresse du siège, telle que déclarée */
    address: "",
    /** personne responsable de la publication */
    publisher: "",
    /** adresse e-mail du service client, publiée sur le site */
    email: "",
    /** facultatif */
    phone: "",
    /** organisme de médiation de la consommation (adhésion obligatoire) */
    mediator: "",
    /** TVA : laisse tel quel en franchise en base, sinon indique ton numéro */
    vat: "TVA non applicable, article 293 B du CGI",
  },
  tagline: "Boire plus. Sans compromis.",
  /**
   * URL publique du site. Renseigne NEXT_PUBLIC_SITE_URL dans .env.local (et chez
   * ton hébergeur) le jour où tu branches le vrai domaine : les URL canoniques,
   * le sitemap et les images de partage suivent automatiquement.
   */
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sugar.example",
  description:
    "Une gourde premium et des pods aromatiques qui parfument chaque gorgée. Zéro sucre, zéro calorie, juste de l'eau et l'arôme que tu choisis.",
  promoBar: [
    "🚚 Livraison offerte sur toutes les gourdes",
    "↩️ 30 jours pour changer d'avis",
    "📦 Livraison en 5 à 10 jours",
  ],
  /** au-dessus, le port est offert — toute gourde dépasse ce montant */
  freeShippingThreshold: 24.9,
  /** pods achetés seuls */
  shippingCost: 1.5,
  firstOrderDiscount: 10, // %
  newsletterCode: "PREMIERE10",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
  /**
   * Passe à true le jour où les avis affichés sont de vrais avis clients.
   * Tant que c'est false, les notes ne sont pas déclarées à Google.
   */
  hasRealReviews: false,
  stats: {
    customers: "38 000",
    rating: 4.8,
    reviews: 2417,
  },
};

export const mainNav = [
  { label: "La gourde", href: "/gourdes" },
  { label: "Les goûts", href: "/pods" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "FAQ", href: "/faq" },
];
