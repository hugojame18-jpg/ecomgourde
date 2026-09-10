import type { Flavor, Nutrition } from "@/lib/types";
import { asset } from "@/lib/asset";

/**
 * LA GAMME — 7 arômes, livrés uniquement avec la gourde.
 *
 * Ils composent le pack « gourde + 7 pods » : un pod de chaque. Aucun pod
 * n'est vendu séparément tant que le fournisseur n'en propose pas à l'unité.
 *
 * 📸 `image` = visuel de la carte (photo du fruit, ou le pod lui-même quand il
 * n'y a pas de fruit à montrer). `podImage` = photo du pod.
 */

/**
 * PHOTOS DE FRUITS — fichiers locaux dans /public/produits/fruits/.
 * Tous détourés sur fond transparent : ils flottent sur la couleur de la carte.
 * Énergie n'y figure pas : sa seule photo était une canette de marque.
 */
const FRUIT_IMAGES: Record<string, { file: string; fit: "contain" | "cover" }> = {
  orange: { file: "orange.png", fit: "contain" },
  citron: { file: "citron.png", fit: "contain" },
  ananas: { file: "ananas.png", fit: "contain" },
  peche: { file: "peche.png", fit: "contain" },
  raisin: { file: "raisin.png", fit: "contain" },
  cola: { file: "cola.png", fit: "contain" },
};

const fruitPhoto = (id: string) =>
  FRUIT_IMAGES[id] ? asset(`/produits/fruits/${FRUIT_IMAGES[id].file}`) : undefined;

export const fruitFit = (id: string) => FRUIT_IMAGES[id]?.fit ?? "contain";

/* ---------- Les 7 arômes du pack gourde ---------- */
const baseFlavors: Flavor[] = [
  {
    id: "orange",
    name: "Orange",
    image: fruitPhoto("orange"),
    podImage: asset("/produits/pod-orange.png"),
    color: "#ff7a18",
    soft: "#ffeeda",
    notes: ["Orange pressée", "Zeste", "Fleur d'oranger"],
    headline: "Solaire, du premier au dernier verre.",
    description:
      "Orange fraîchement pressée et zeste, adoucis d'une touche de fleur d'oranger. Le plus consensuel de la gamme.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Rond et solaire, très accessible.",
    profile: { doux: 4, aigre: 2, fruite: 4 },
  },
  {
    id: "citron",
    name: "Citron",
    image: fruitPhoto("citron"),
    podImage: asset("/produits/pod-citron.png"),
    color: "#e0a800",
    soft: "#fff6d9",
    notes: ["Citron jaune", "Citron vert", "Basilic"],
    headline: "Un réveil net, sans acidité.",
    description:
      "Citron jaune pressé, éclat de citron vert et souffle de basilic. L'arôme du matin et des grosses journées.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Vif et net, jamais agressif.",
    profile: { doux: 2, aigre: 4, fruite: 3 },
  },
  {
    id: "energie",
    name: "Énergie",
    // Pas de photo de fruit : la carte montre le pod, avec ses deux teintes.
    podImage: asset("/produits/pod-energie.png"),
    color: "#f26b1d",
    soft: "#ffe8d6",
    notes: ["Agrumes", "Taurine-like", "Glace"],
    headline: "Le goût boisson énergisante, sans caféine.",
    description:
      "Le profil agrumes-caramel des boissons énergisantes, en version glacée. Aucune caféine, aucun sucre : seulement l'arôme.",
    price: 7.9,
    intensity: 5,
    intensityLabel: "Très marqué, reconnaissable au premier verre.",
    profile: { doux: 3, aigre: 3, fruite: 3 },
  },
  {
    id: "ananas",
    name: "Ananas",
    image: fruitPhoto("ananas"),
    podImage: asset("/produits/pod-ananas.png"),
    color: "#e2a417",
    soft: "#fdf0cf",
    notes: ["Ananas Victoria", "Citron vert", "Menthe"],
    headline: "Sucré-acidulé, franchement tropical.",
    description:
      "Ananas mûr relevé de citron vert. L'arôme qui transforme un verre d'eau en cocktail sans alcool.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Acidulé et solaire.",
    profile: { doux: 3, aigre: 4, fruite: 5 },
  },
  {
    id: "cola",
    name: "Cola",
    image: fruitPhoto("cola"),
    podImage: asset("/produits/pod-cola.png"),
    color: "#8a4b2a",
    soft: "#f0e0d6",
    notes: ["Cola", "Vanille", "Zeste de citron"],
    headline: "Le soda d'enfance, sans une calorie.",
    description:
      "Notes de cola, vanille et zeste d'agrume, servies glacées. Celui qui remplace vraiment la canette de 16 h.",
    price: 7.9,
    intensity: 5,
    intensityLabel: "Le plus caractéristique de la gamme.",
    profile: { doux: 4, aigre: 2, fruite: 2 },
  },
  {
    id: "peche",
    name: "Pêche",
    image: fruitPhoto("peche"),
    podImage: asset("/produits/pod-peche.png"),
    color: "#f09a6a",
    soft: "#fdeade",
    notes: ["Pêche de vigne", "Abricot", "Verveine"],
    headline: "Velouté, presque nectar.",
    description:
      "Pêche de vigne et abricot, adoucis d'une pointe de verveine. Le goût d'un jus de pêche, sans le sucre.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Rond et velouté.",
    profile: { doux: 5, aigre: 2, fruite: 4 },
  },
  {
    id: "raisin",
    name: "Raisin blanc",
    image: fruitPhoto("raisin"),
    podImage: asset("/produits/pod-raisin.png"),
    color: "#a9c23e",
    soft: "#eef4d6",
    notes: ["Raisin blanc", "Poire", "Fleur de vigne"],
    headline: "Discret, élégant, très désaltérant.",
    description:
      "Raisin blanc juteux et poire, sur une note florale légère. Le plus subtil de la gamme.",
    price: 7.9,
    intensity: 2,
    intensityLabel: "Léger, tout en retenue.",
    profile: { doux: 4, aigre: 2, fruite: 3 },
  },
];

/** Les 7 arômes du pack « gourde + 7 pods ». */
export const packFlavors = baseFlavors;

/** Toute la gamme. Sans photo de fruit, la carte montre le pod. */
export const flavors: Flavor[] = baseFlavors.map((f) => ({
  ...f,
  image: f.image ?? f.podImage,
}));

/** Identique pour tous les pods : rien n'est ajouté dans l'eau. */
export const podNutrition: Nutrition = [
  { label: "Énergie", value: "0 kJ / 0 kcal" },
  { label: "Lipides", value: "0 g" },
  { label: "dont acides gras saturés", value: "0 g" },
  { label: "Glucides", value: "0 g" },
  { label: "dont sucres", value: "0 g" },
  { label: "Protéines", value: "0 g" },
  { label: "Sel", value: "0 g" },
];

/** L'unité de vente = 1 pod, qui parfume ~5 L. */
export const PODS_PER_PACK = 1;
export const LITRES_PER_POD = 5;
export const litresPerPack = PODS_PER_PACK * LITRES_PER_POD;
export const pricePerLitre = (price: number) => price / litresPerPack;

export const flavorById = (id: string) => flavors.find((f) => f.id === id);
export const flavorName = (id: string) => flavorById(id)?.name ?? id;
export const flavorColor = (id: string) => flavorById(id)?.color ?? "#00c9b6";
