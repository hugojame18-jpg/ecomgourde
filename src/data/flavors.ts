import type { Flavor, Nutrition } from "@/lib/types";

/**
 * LA GAMME — 7 arômes de base + 10 arômes vendus à l'unité seulement.
 *
 * Vendus à l'unité (1 pod) : le client CHOISIT son goût.
 * Livrés avec une gourde (offres 1 pod / 7 pods) : les goûts sont ALÉATOIRES.
 *
 * 📸 `image` = vraie photo du fruit, utilisée sur les cartes de goûts.
 * 📸 `podImage` = photo des pods, déjà en place.
 */
/**
 * PHOTOS DE FRUITS — fichiers locaux dans /public/produits/fruits/.
 * Tous les fruits sont détourés sur fond transparent : ils flottent sur la
 * couleur de la carte (mode "contain").
 */
const FRUIT_IMAGES: Record<string, { file: string; fit: "contain" | "cover" }> = {
  "fruits-rouges": { file: "fruits-rouges.png", fit: "contain" },
  citron: { file: "citron.png", fit: "contain" },
  orange: { file: "orange.png", fit: "contain" },
  tropical: { file: "tropical.png", fit: "contain" },
  cerise: { file: "cerise.png", fit: "contain" },
  coco: { file: "coco.png", fit: "contain" },
  "fruits-des-bois": { file: "fruits-des-bois.png", fit: "contain" },
  banane: { file: "banane.png", fit: "contain" },
  "fruit-du-dragon": { file: "fruit-du-dragon.png", fit: "contain" },
  "pasteque-menthe": { file: "pasteque-menthe.png", fit: "contain" },
  pomme: { file: "pomme.png", fit: "contain" },
  "fraise-pasteque": { file: "fraise-pasteque.png", fit: "contain" },
  cafe: { file: "cafe.png", fit: "contain" },
  punch: { file: "punch.png", fit: "contain" },
  ananas: { file: "ananas.png", fit: "contain" },
  raisin: { file: "raisin.png", fit: "contain" },
  peche: { file: "peche.png", fit: "contain" },
};

const fruitPhoto = (id: string) =>
  FRUIT_IMAGES[id] ? `/produits/fruits/${FRUIT_IMAGES[id].file}` : undefined;

export const fruitFit = (id: string) => FRUIT_IMAGES[id]?.fit ?? "contain";

const baseFlavors: Flavor[] = [
  {
    id: "fruits-rouges",
    name: "Fruits rouges",
    image: fruitPhoto("fruits-rouges"),
    podImage: "/produits/pod-fruits-rouges.png",
    color: "#e0234e",
    soft: "#ffe7ec",
    notes: ["Framboise", "Fraise", "Myrtille"],
    headline: "Le goût qui met tout le monde d'accord.",
    description:
      "Framboise mûre, fraise des bois et pointe de myrtille. Notre arôme le plus vendu, celui qu'on repasse en commande sans réfléchir.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Franc, gourmand, facile à aimer.",
    profile: { doux: 4, aigre: 2, fruite: 5 },
  },
  {
    id: "citron",
    name: "Citron",
    image: fruitPhoto("citron"),
    podImage: "/produits/pod-citron.png",
    color: "#e0a800",
    soft: "#fff6d9",
    notes: ["Citron jaune", "Citron vert", "Basilic"],
    headline: "Un réveil net, sans acidité.",
    description:
      "Citron jaune pressé, éclat de citron vert et souffle de basilic. L'arôme du matin et des grosses journées de travail.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Vif et net, jamais agressif.",
    profile: { doux: 2, aigre: 4, fruite: 3 },
  },
  {
    id: "orange",
    name: "Orange",
    image: fruitPhoto("orange"),
    podImage: "/produits/pod-orange.png",
    color: "#ff7a18",
    soft: "#ffeeda",
    notes: ["Orange sanguine", "Mangue", "Fleur d'oranger"],
    headline: "Solaire, du premier au dernier verre.",
    description:
      "Orange sanguine et mangue juteuse, adoucies par une touche de fleur d'oranger. Le plus gourmand sans jamais être sucré.",
    price: 7.9,
    intensity: 3,
    intensityLabel: "Rond et solaire, très accessible.",
    profile: { doux: 4, aigre: 2, fruite: 4 },
  },
  {
    id: "tropical",
    name: "Tropical",
    image: fruitPhoto("tropical"),
    podImage: "/produits/pod-tropical.png",
    color: "#f2a007",
    soft: "#fff3d6",
    notes: ["Fruit de la passion", "Mangue", "Pêche"],
    headline: "Des vacances dans une gorgée.",
    description:
      "Fruit de la passion, mangue et pêche blanche. L'arôme qui transforme un verre d'eau en cocktail sans alcool.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Exotique et généreux.",
    profile: { doux: 4, aigre: 3, fruite: 5 },
  },
  {
    id: "cerise",
    name: "Cerise",
    image: fruitPhoto("cerise"),
    podImage: "/produits/pod-cerise.png",
    color: "#c8102e",
    soft: "#ffe3e8",
    notes: ["Cerise noire", "Grenade", "Griotte"],
    headline: "Sucré-acidulé, riche et juteux.",
    description:
      "Un mélange sucré-acidulé de cerise noire et de grenade, riche et juteux, qui donne envie de reprendre une gorgée.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Lumineux, ludique, moins intense.",
    profile: { doux: 4, aigre: 2, fruite: 5 },
  },
  {
    id: "coco",
    name: "Coco",
    image: fruitPhoto("coco"),
    podImage: "/produits/pod-coco.png",
    color: "#2f9fd0",
    soft: "#dff0fa",
    notes: ["Noix de coco", "Eau de coco", "Vanille"],
    headline: "Doux, crémeux, étonnamment frais.",
    description:
      "Noix de coco fraîche et eau de coco sur un fond de vanille. Le plus doux de la gamme, celui qu'on ne voit pas venir.",
    price: 7.9,
    intensity: 2,
    intensityLabel: "Tout en douceur, très peu marqué.",
    profile: { doux: 5, aigre: 1, fruite: 3 },
  },
  {
    id: "fruits-des-bois",
    name: "Fruits des bois",
    image: fruitPhoto("fruits-des-bois"),
    podImage: "/produits/pod-fruits-des-bois.png",
    color: "#7c4dff",
    soft: "#eee7ff",
    notes: ["Mûre", "Myrtille", "Cassis"],
    headline: "Profond, presque sauvage.",
    description:
      "Mûre, myrtille et cassis. Plus sombre et plus profond que les Fruits rouges, pour ceux qui aiment les goûts marqués.",
    price: 7.9,
    intensity: 5,
    intensityLabel: "Le plus intense de la gamme.",
    profile: { doux: 3, aigre: 3, fruite: 5 },
  },
];


/**
 * ARÔMES VENDUS À L'UNITÉ UNIQUEMENT.
 * Ils n'entrent jamais dans le pack « gourde + 7 pods » : celui-ci contient
 * toujours les sept arômes de base ci-dessus.
 */
const soloFlavors: Flavor[] = [
  {
    id: "banane",
    name: "Banane",
    podImage: "/produits/pod-banane.png",
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
    podImage: "/produits/pod-fruit-du-dragon.png",
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
    podImage: "/produits/pod-pasteque-menthe.png",
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
    podImage: "/produits/pod-pomme.png",
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
    podImage: "/produits/pod-fraise-pasteque.png",
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
    podImage: "/produits/pod-cafe.png",
    color: "#8a5a3b",
    soft: "#efe3d8",
    notes: ["Café torréfié", "Crème", "Noisette"],
    headline: "L'odeur du café, sans la caféine.",
    description:
      "Grains torréfiés et note crémeuse de noisette. Un arôme qui surprend au premier verre, et qu'on garde pour les après-midi de travail.",
    price: 7.9,
    intensity: 5,
    intensityLabel: "Le plus marqué de la gamme.",
    profile: { doux: 3, aigre: 1, fruite: 1 },
    soloOnly: true,
  },
  {
    id: "punch",
    name: "Punch fruité",
    podImage: "/produits/pod-punch.png",
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
  {
    id: "ananas",
    name: "Ananas",
    podImage: "/produits/pod-ananas.png",
    color: "#e2a417",
    soft: "#fdf0cf",
    notes: ["Ananas Victoria", "Citron vert", "Menthe"],
    headline: "Sucré-acidulé, franchement tropical.",
    description:
      "Ananas mûr relevé de citron vert. Plus acidulé que le Tropical, plus direct aussi.",
    price: 7.9,
    intensity: 4,
    intensityLabel: "Acidulé et solaire.",
    profile: { doux: 3, aigre: 4, fruite: 5 },
    soloOnly: true,
  },
  {
    id: "raisin",
    name: "Raisin blanc",
    podImage: "/produits/pod-raisin.png",
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
    soloOnly: true,
  },
  {
    id: "peche",
    name: "Pêche",
    podImage: "/produits/pod-peche.png",
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
    soloOnly: true,
  },
];

/** Les 7 arômes de base : ceux du pack « gourde + 7 pods ». */
export const packFlavors = baseFlavors;

/** Toute la gamme : base + arômes vendus à l'unité seulement. */
export const flavors: Flavor[] = [
  ...baseFlavors,
  // la carte montre la photo du fruit ; à défaut, le pod lui-même.
  ...soloFlavors.map((f) => ({ ...f, image: fruitPhoto(f.id) ?? f.podImage })),
];

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
