import type { Flavor, Nutrition } from "@/lib/types";
import { asset } from "@/lib/asset";

/**
 * LA GAMME — 7 arômes livrés avec la gourde + 7 arômes vendus au pod.
 *
 * Les sept premiers (`baseFlavors`) composent le pack « gourde + 7 pods » :
 * un pod de chaque, jamais vendus seuls.
 * Les autres (`soloFlavors`) ne s'achètent qu'à l'unité.
 *
 * 📸 `image` = visuel de la carte (photo du fruit, ou le pod lui-même quand il
 * n'y a pas de fruit à montrer). `podImage` = photo du pod.
 */

/**
 * PHOTOS DE FRUITS — fichiers locaux dans /public/produits/fruits/.
 * Tous détourés sur fond transparent : ils flottent sur la couleur de la carte.
 * Cola et Énergie n'y figurent pas : leur carte montre le pod.
 */
const FRUIT_IMAGES: Record<string, { file: string; fit: "contain" | "cover" }> = {
  orange: { file: "orange.png", fit: "contain" },
  citron: { file: "citron.png", fit: "contain" },
  ananas: { file: "ananas.png", fit: "contain" },
  peche: { file: "peche.png", fit: "contain" },
  raisin: { file: "raisin.png", fit: "contain" },
  banane: { file: "banane.png", fit: "contain" },
  "fruit-du-dragon": { file: "fruit-du-dragon.png", fit: "contain" },
  "pasteque-menthe": { file: "pasteque-menthe.png", fit: "contain" },
  pomme: { file: "pomme.png", fit: "contain" },
  "fraise-pasteque": { file: "fraise-pasteque.png", fit: "contain" },
  cafe: { file: "cafe.png", fit: "contain" },
  punch: { file: "punch.png", fit: "contain" },
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
    // Pas de photo de fruit non plus : le pod fait le visuel.
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

/**
 * ARÔMES VENDUS À L'UNITÉ UNIQUEMENT.
 * Ils n'entrent jamais dans le pack « gourde + 7 pods ».
 */
const soloFlavors: Flavor[] = [
  {
    id: "banane",
    name: "Banane",
    image: fruitPhoto("banane"),
    podImage: asset("/produits/pod-banane.png"),
    color: "#e8b93a",
    soft: "#fdf3d6",
    notes: ["Banane mûre", "Lait d'amande", "Vanille"],
    headline: "Doux, rond, réconfortant.",
    description:
      "Banane bien mûre adoucie d'une note lactée. L'arôme le plus gourmand de la gamme, celui qui passe même le matin.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Enveloppant, jamais écœurant.",
    profile: { doux: 5, aigre: 1, fruite: 4 },
    soloOnly: true,
  },
  {
    id: "fruit-du-dragon",
    name: "Fruit du dragon",
    image: fruitPhoto("fruit-du-dragon"),
    podImage: asset("/produits/pod-fruit-du-dragon.png"),
    color: "#e8447c",
    soft: "#fde3ec",
    notes: ["Pitaya", "Fruit de la passion", "Litchi"],
    headline: "Exotique et légèrement acidulé.",
    description:
      "Pitaya rose et fruit de la passion, relevés d'une pointe de litchi. Le plus original de la gamme.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Vif, parfumé, un peu inattendu.",
    profile: { doux: 3, aigre: 3, fruite: 5 },
    soloOnly: true,
  },
  {
    id: "pasteque-menthe",
    name: "Pastèque menthe",
    image: fruitPhoto("pasteque-menthe"),
    podImage: asset("/produits/pod-pasteque-menthe.png"),
    color: "#4bb573",
    soft: "#e0f4e6",
    notes: ["Pastèque", "Menthe fraîche", "Citron vert"],
    headline: "La fraîcheur d'un mojito sans alcool.",
    description:
      "Pastèque juteuse et menthe fraîche, avec un trait de citron vert. L'arôme des grosses chaleurs et des fins de séance.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Très frais, presque mentholé.",
    profile: { doux: 3, aigre: 3, fruite: 4 },
    soloOnly: true,
  },
  {
    id: "pomme",
    name: "Pomme",
    image: fruitPhoto("pomme"),
    podImage: asset("/produits/pod-pomme.png"),
    color: "#d5566a",
    soft: "#fbe4e7",
    notes: ["Pomme rouge", "Pomme verte", "Fleur de sureau"],
    headline: "Simple, net, jamais lassant.",
    description:
      "Pomme rouge croquante et pointe de pomme verte, sur un fond de fleur de sureau. Le goût passe-partout de la gamme.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Franc et équilibré.",
    profile: { doux: 4, aigre: 3, fruite: 4 },
    soloOnly: true,
  },
  {
    id: "fraise-pasteque",
    name: "Fraise pastèque",
    image: fruitPhoto("fraise-pasteque"),
    podImage: asset("/produits/pod-fraise-pasteque.png"),
    color: "#f0526b",
    soft: "#fde2e6",
    notes: ["Fraise", "Pastèque", "Basilic"],
    headline: "L'été en deux fruits.",
    description:
      "Fraise sucrée et pastèque désaltérante, réveillées par une feuille de basilic. Le duo qui plaît à tout le monde.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Gourmand et très facile.",
    profile: { doux: 5, aigre: 2, fruite: 5 },
    soloOnly: true,
  },
  {
    id: "cafe",
    name: "Café",
    image: fruitPhoto("cafe"),
    podImage: asset("/produits/pod-cafe.png"),
    color: "#8a5a3b",
    soft: "#efe3d8",
    notes: ["Café torréfié", "Crème", "Noisette"],
    headline: "L'odeur du café, sans la caféine.",
    description:
      "Grains torréfiés et note crémeuse de noisette. Un arôme qui surprend au premier verre, et qu'on garde pour les après-midi de travail.",
    price: 7.9,
    intensity: 5,
    intensityLabel: "Le plus marqué des arômes à l'unité.",
    profile: { doux: 3, aigre: 1, fruite: 1 },
    soloOnly: true,
  },
  {
    id: "punch",
    name: "Punch fruité",
    image: fruitPhoto("punch"),
    podImage: asset("/produits/pod-punch.png"),
    color: "#f2762b",
    soft: "#fdeadb",
    notes: ["Multifruits", "Agrumes", "Fruits rouges"],
    headline: "Le cocktail complet, sans une goutte d'alcool.",
    description:
      "Un mélange d'agrumes, de fruits rouges et de fruits jaunes, comme un punch de fête servi bien frais.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Généreux, plein de fruits.",
    profile: { doux: 4, aigre: 3, fruite: 5 },
    soloOnly: true,
  },
];

/** Les 7 arômes du pack « gourde + 7 pods ». */
export const packFlavors = baseFlavors;

/** Toute la gamme. Sans photo de fruit, la carte montre le pod. */
export const flavors: Flavor[] = [...baseFlavors, ...soloFlavors].map((f) => ({
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
