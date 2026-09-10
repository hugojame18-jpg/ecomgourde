export type ProductCategory = "bottle" | "pod" | "bundle" | "accessory";

export type ColorOption = {
  name: string;
  hex: string;
  /** couleur secondaire (fond du visuel / bouchon) */
  accent?: string;
  /** photo du produit dans ce coloris */
  image?: string;
  /** galerie complète du coloris : face, bouchon, contenu de la boîte */
  gallery?: string[];
};

export type VisualKind = "bottle" | "pod" | "bundle" | "accessory";

/** Icônes de la grille d'atouts affichée sous le bloc d'achat. */
export type FeatureIcon =
  | "nose"
  | "leak"
  | "light"
  | "clear"
  | "sparkling"
  | "dishwasher"
  | "no-sugar"
  | "natural";

/**
 * `images` est vide par défaut : le site génère alors un visuel produit vectoriel.
 * Dès que tu ajoutes une URL (ou un fichier dans /public), c'est elle qui s'affiche.
 */
export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string[];
  images: string[];
  visual: { kind: VisualKind; color: string; accent?: string; count?: number };
  colors?: ColorOption[];
  /** ids de goûts sélectionnables (voir data/flavors.ts) */
  flavorIds?: string[];
  /** pods livrés avec la gourde : combien, et comment les goûts sont attribués.
   *  `all` = un pod de chaque arôme de la gamme ; `random` = tirage au sort. */
  pods?: { count: number; pick: "all" | "random" };
  /** nombre de pods à choisir lors de l'ajout au panier */
  flavorPicks?: number;
  /** ligne sous le titre : « Lilas · 650 ml · Tritan » */
  subtitleParts?: string[];
  /** grille d'icônes façon fiche produit premium */
  features?: { icon: FeatureIcon; label: string }[];
  bullets: { title: string; text: string }[];
  includes?: string[];
  specs?: { label: string; value: string }[];
  faq?: { q: string; a: string }[];
  subscription?: boolean;
  /** le produit débloque la livraison offerte quel que soit le montant du panier */
  freeShipping?: boolean;
  savingsLabel?: string;
};

export type Flavor = {
  id: string;
  name: string;
  /** photo du FRUIT (carte + fiche détaillée). Vide => illustration générée. */
  image?: string;
  /** photo des pods, affichée dans « Dans la boîte » */
  podImage?: string;
  color: string;
  soft: string;
  notes: string[];
  headline: string;
  description: string;
  /** prix d'un pod vendu à l'unité */
  price: number;
  intensity: number; // 1 - 5
  /** phrase courte affichée sous la note d'intensité */
  intensityLabel: string;
  /** profil aromatique, chaque axe noté sur 5 */
  profile: { doux: number; aigre: number; fruite: number };
  /** vendu à l'unité seulement : jamais livré dans le pack gourde + 7 pods */
  soloOnly?: boolean;
};

/** Valeurs nutritionnelles — identiques pour tous les pods (rien n'entre dans l'eau). */
export type Nutrition = { label: string; value: string }[];

export type Review = {
  id: string;
  name: string;
  initial: string;
  rating: number;
  title: string;
  text: string;
  product: string;
  verified: boolean;
  color: string;
};

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image?: string;
  visual: { kind: VisualKind; color: string; accent?: string };
  variant?: string;
  flavors?: string[];
  subscription?: boolean;
  freeShipping?: boolean;
};
