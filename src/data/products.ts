import type { Product } from "@/lib/types";
import { asset } from "@/lib/asset";
import { flavors, litresPerPack } from "./flavors";

/**
 * CATALOGUE
 * Deux offres seulement pour le moment, calquées sur ce qui est réellement
 * approvisionnable : la gourde livrée avec 1 pod, ou avec 7 pods.
 *
 * ⚠️ Les goûts sont ALÉATOIRES : le client ne les choisit pas.
 * C'est pour ça qu'aucun produit n'a de `flavorPicks`.
 */

/** Les 4 coloris — chacun porte sa propre photo. */
const bottleColors = [
  {
    name: "Lilas",
    hex: "#a98ce0",
    accent: "#ece4fa",
    image: asset("/produits/bottle-lilas.png"),
  },
  {
    name: "Noir",
    hex: "#4a4a4e",
    accent: "#f0f0f2",
    image: asset("/produits/bottle-noir.png"),
  },
  {
    name: "Rose",
    hex: "#e8b9c0",
    accent: "#f8dfe2",
    image: asset("/produits/bottle-rose.png"),
  },
  {
    name: "Bleu ciel",
    hex: "#a9c6e0",
    accent: "#dfe9f5",
    image: asset("/produits/bottle-bleu.png"),
  },
].map((c) => {
  const base = c.image.replace(".png", "");
  // Chaque coloris a deux photos : gourde fermée de face, puis bouchon ouvert.
  return { ...c, gallery: [c.image, `${base}-ouverte.png`] };
});

const bottleSpecs = [
  { label: "Contenance", value: "650 ml" },
  { label: "Matière", value: "Tritan sans BPA" },
  { label: "Bouchon", value: "Clip anti-fuite + porte-pod" },
  { label: "Poids", value: "148 g à vide" },
  { label: "Hauteur", value: "26,4 cm" },
  { label: "Entretien", value: "Lave-vaisselle, panier du haut" },
];

const bottleFeatures = [
  { icon: "nose" as const, label: "Le goût par l'odorat" },
  { icon: "leak" as const, label: "Parfaitement étanche" },
  { icon: "light" as const, label: "Tritan léger, 148 g" },
  { icon: "clear" as const, label: "Corps translucide" },
  { icon: "sparkling" as const, label: "Eau plate & gazeuse" },
  { icon: "dishwasher" as const, label: "Compatible lave-vaisselle" },
];

const allFlavorsFaq = {
  q: "Puis-je choisir mes goûts ?",
  a: "Tu n'as pas à choisir : le pack contient les sept arômes de la gamme, un pod de chaque. Fruits rouges, Citron, Orange, Tropical, Cerise, Coco et Fruits des bois sont tous dans la boîte.",
};

const randomFlavorFaq = {
  q: "Puis-je choisir mon goût ?",
  a: "Pas sur cette offre : le pod livré avec la gourde est tiré au hasard dans la gamme. Si tu veux un arôme précis, prends le pack des sept goûts, ou achète tes pods à l'unité.",
};

const bottleFaq = (flavorFaq: { q: string; a: string }) => [
  flavorFaq,
  {
    q: "La gourde va-t-elle au lave-vaisselle ?",
    a: "Le corps et le bouchon passent au lave-vaisselle dans le panier du haut. Le porte-pod se rince simplement à l'eau tiède.",
  },
  {
    q: "Est-ce que je peux boire autre chose que de l'eau ?",
    a: "Oui, mais les pods sont conçus pour l'eau plate ou pétillante. Évite les boissons sucrées, qui laisseraient un dépôt et marqueraient le Tritan.",
  },
  {
    q: "La gourde fuit-elle dans un sac ?",
    a: "Le bouchon est équipé d'un joint silicone à double lèvre. Clipsé à fond, il est étanche même à l'horizontale.",
  },
];

export const products: Product[] = [
  /* ---------- OFFRE DE BASE : gourde + 1 pod ---------- */
  {
    id: "flow-bottle-1-pod",
    slug: "flow-bottle-1-pod",
    name: "Flow Bottle + 1 pod",
    tagline: "Gourde 650 ml + 1 pod surprise",
    category: "bundle",
    freeShipping: true,
    price: 24.9,
    rating: 4.8,
    reviewCount: 1284,
    savingsLabel: "L'essentiel pour tester",
    subtitleParts: ["650 ml", "Tritan", "1 pod inclus"],
    pods: { count: 1, pick: "random" },
    features: bottleFeatures,
    shortDescription:
      "La gourde Tritan translucide livrée avec un pod aromatique surprise. Le goût est tiré au hasard dans la gamme — c'est la façon la plus simple de découvrir l'expérience.",
    description: [
      "La Flow Bottle a été dessinée autour d'une idée simple : rendre l'eau assez agréable pour qu'on la boive sans y penser.",
      "Le corps translucide en Tritan laisse voir exactement ce qu'il te reste à boire. Le bouchon accueille un pod aromatique : l'air passe par le pod avant d'arriver en bouche, et le cerveau perçoit le goût. Zéro sucre, zéro calorie, zéro arôme dans l'eau.",
      "Le pod inclus est envoyé au hasard parmi les arômes de la gamme. Tu ne choisis pas ton goût — tu le découvres.",
    ],
    images: bottleColors[1].gallery,
    visual: { kind: "bottle", color: "#a98ce0", accent: "#ece4fa" },
    colors: bottleColors,
    bullets: [
      {
        title: "1 pod surprise inclus",
        text: "Goût tiré au hasard dans la gamme, impossible à choisir.",
      },
      {
        title: "Tu vois ce qu'il te reste",
        text: "Le corps translucide transforme ta gourde en objectif visuel.",
      },
      {
        title: "Bouchon anti-fuite",
        text: "Fermeture à clip avec joint silicone, étanche même à l'horizontale.",
      },
      {
        title: "Léger, avec dragonne",
        text: "148 g à vide et une sangle pour l'emporter au doigt ou au sac.",
      },
    ],
    includes: [
      "1 Flow Bottle 650 ml (coloris au choix)",
      "1 pod aromatique — goût tiré au hasard parmi les 7 arômes de la gamme",
      "1 dragonne",
      "Livraison offerte",
    ],
    specs: [...bottleSpecs, { label: "Pods inclus", value: "1, goût aléatoire" }],
    faq: bottleFaq(randomFlavorFaq),
  },

  /* ---------- OFFRE PRINCIPALE : gourde + 7 pods ---------- */
  {
    id: "flow-bottle-7-pods",
    slug: "flow-bottle-7-pods",
    name: "Flow Bottle + 7 pods",
    tagline: "Gourde 650 ml + les 7 arômes",
    category: "bundle",
    freeShipping: true,
    price: 33.45,
    badge: "Le plus choisi",
    bestSeller: true,
    rating: 4.9,
    reviewCount: 1902,
    savingsLabel: "Toute la gamme pour 8,55 € de plus",
    subtitleParts: ["650 ml", "Tritan", "les 7 goûts inclus"],
    pods: { count: 7, pick: "all" },
    features: bottleFeatures,
    shortDescription:
      "La même gourde, mais avec la gamme complète : un pod de chacun des sept arômes. Sept semaines d'eau parfumée, et tu sais exactement ce que tu reçois.",
    description: [
      "C'est l'offre que prennent neuf clients sur dix, et pour une bonne raison : six pods de plus ne coûtent que 8,55 € — moins de 1,50 € le pod.",
      "Le corps translucide en Tritan laisse voir exactement ce qu'il te reste à boire. Le bouchon accueille un pod aromatique : l'air passe par le pod avant d'arriver en bouche, et le cerveau perçoit le goût. Zéro sucre, zéro calorie, zéro arôme dans l'eau.",
      "Les sept pods couvrent toute la gamme, un de chaque arôme : Fruits rouges, Citron, Orange, Tropical, Cerise, Coco et Fruits des bois. Tu n'as rien à choisir, et tu finiras par savoir lequel est ton préféré.",
    ],
    images: bottleColors[0].gallery,
    visual: { kind: "bundle", color: "#a98ce0", accent: "#ece4fa", count: 7 },
    colors: bottleColors,
    bullets: [
      {
        title: "Les 7 arômes inclus",
        text: "Un pod de chaque goût de la gamme, aucun tirage au sort.",
      },
      {
        title: "Moins de 1,50 € le pod",
        text: "Six pods de plus que l'offre de base, pour 8,55 € seulement.",
      },
      {
        title: "≈ 35 L d'eau parfumée",
        text: "Environ deux mois d'hydratation pour une personne.",
      },
      {
        title: "Livraison offerte",
        text: "Incluse avec toutes les gourdes, sans montant minimum.",
      },
    ],
    includes: [
      "1 Flow Bottle 650 ml (coloris au choix)",
      "7 pods aromatiques : Fruits rouges, Citron, Orange, Tropical, Cerise, Coco, Fruits des bois",
      "1 dragonne",
      "Livraison offerte",
    ],
    specs: [...bottleSpecs, { label: "Pods inclus", value: "7, un par arôme" }],
    faq: bottleFaq(allFlavorsFaq),
  },
];

/* ---------- Pods vendus à l'unité ----------
 * Seuls les arômes marqués `soloOnly` sont vendus seuls. Les sept arômes de
 * base ne s'obtiennent qu'avec une gourde : ils n'ont donc pas de fiche produit.
 */
export const podProducts: Product[] = flavors
  .filter((f) => f.soloOnly)
  .map((f) => ({
    id: `pod-${f.id}`,
    slug: `pod-${f.id}`,
    name: `Pods ${f.name}`,
    tagline: `1 pod · ≈ ${litresPerPack} L d'eau parfumée`,
    category: "pod",
    price: f.price,
    rating: 4.8,
    reviewCount: 184,
    shortDescription: f.description,
    description: [
      f.description,
      `Un pod parfume environ 5 litres, soit une dizaine de remplissages. Ici tu choisis ton goût : celui-ci, c'est du ${f.name.toLowerCase()}.`,
    ],
    images: f.podImage ? [f.podImage] : [],
    visual: { kind: "pod", color: f.color },
    flavorIds: [f.id],
    bullets: [
      {
        title: "0 sucre · 0 calorie",
        text: "Rien n'est ajouté dans l'eau, uniquement de l'arôme dans l'air.",
      },
      {
        title: `≈ ${litresPerPack} L par pod`,
        text: "Environ quatre à cinq jours d'hydratation.",
      },
      {
        title: "Goût garanti",
        text: "Contrairement aux packs gourde, ici tu choisis précisément ton arôme.",
      },
    ],
    subtitleParts: ["1 pod", `≈ ${litresPerPack} L`, "Goût choisi"],
    features: [
      { icon: "nose", label: "Le goût par l'odorat" },
      { icon: "no-sugar", label: "0 sucre · 0 calorie" },
      { icon: "natural", label: "Arômes naturels" },
      { icon: "sparkling", label: "Eau plate & gazeuse" },
    ],
    includes: [`1 pod ${f.name}`],
    specs: [
      { label: "Contenu", value: "1 pod" },
      { label: "Autonomie", value: `≈ ${litresPerPack} L` },
      { label: "Compatibilité", value: "Toutes les Flow Bottle" },
    ],
  }));

/** Catalogue complet : gourdes + pods à l'unité. */
export const allProducts: Product[] = [...products, ...podProducts];

/* ---------- Helpers ---------- */
export const getProduct = (slug: string) => allProducts.find((p) => p.slug === slug);
export const byCategory = (c: Product["category"]) => allProducts.filter((p) => p.category === c);
export const bottles = () => byCategory("bundle");
export const pods = () => byCategory("pod");
export const bundles = () => byCategory("bundle");
export const accessories = () => byCategory("accessory");
export const featured = () => products;

/** Produit mis en avant partout comme offre principale. */
export const heroProduct = () => getProduct("flow-bottle-7-pods")!;

/**
 * Abonnement — désactivé tant que les recharges de pods seules ne sont pas
 * sourcées. Remets des entrées ici pour réactiver la section.
 */
export const subscriptionPlans: {
  id: string;
  name: string;
  frequency: string;
  packs: number;
  price: number;
  compareAtPrice: number;
  perPack: number;
  highlight: boolean;
  description: string;
}[] = [];
