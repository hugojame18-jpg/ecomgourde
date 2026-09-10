/**
 * CORRESPONDANCE CATALOGUE LOCAL → SHOPIFY
 *
 * Le site garde son propre catalogue (textes, photos, mise en page) ; Shopify ne
 * sert qu'au panier, au paiement et aux commandes. Ce fichier est le seul point
 * de contact entre les deux : il associe chaque article vendable à l'identifiant
 * de sa variante Shopify.
 *
 * ⚠️ Si tu recrées un produit dans Shopify, son identifiant change : reviens ici.
 * Tu les retrouves dans l'admin, dans l'URL de la variante
 * (…/products/123/variants/456 → gid://shopify/ProductVariant/456).
 */

/** Coloris de gourde → identifiant de variante Shopify. */
type ColorMap = Record<string, string>;

const BOTTLE_7_PODS: ColorMap = {
  Lilas: "gid://shopify/ProductVariant/54909256335699",
  Noir: "gid://shopify/ProductVariant/54909256368467",
  Rose: "gid://shopify/ProductVariant/54909256401235",
  "Bleu ciel": "gid://shopify/ProductVariant/54909256434003",
};

const BOTTLE_SEULE: ColorMap = {
  Lilas: "gid://shopify/ProductVariant/54909258694995",
  Noir: "gid://shopify/ProductVariant/54909258727763",
  Rose: "gid://shopify/ProductVariant/54909258760531",
  "Bleu ciel": "gid://shopify/ProductVariant/54909258793299",
};

/** Arôme vendu à l'unité → identifiant de variante Shopify.
 *  Les arômes du pack (Orange, Citron, Énergie, Ananas, Cola, Pêche, Raisin)
 *  n'y figurent pas : ils ne s'achètent pas seuls. */
const PODS: Record<string, string> = {
  // Vide : aucun pod n'est vendu séparément aujourd'hui. Le jour où le
  // fournisseur en propose, ajoute ici l'identifiant de sa variante Shopify.
};

const BOTTLES: Record<string, ColorMap> = {
  "sugar-bottle-7-pods": BOTTLE_7_PODS,
  "sugar-bottle": BOTTLE_SEULE,
};

/**
 * Retrouve la variante Shopify d'une ligne de panier.
 * Renvoie `undefined` si l'article n'a pas d'équivalent : la commande est alors
 * bloquée côté interface plutôt que d'envoyer un panier incomplet au paiement.
 */
export function variantIdFor(line: { productId: string; variant?: string }): string | undefined {
  const colors = BOTTLES[line.productId];
  if (colors) {
    // Sans coloris choisi, on retombe sur le premier de la liste.
    return line.variant ? colors[line.variant] : Object.values(colors)[0];
  }
  if (line.productId.startsWith("pod-")) {
    return PODS[line.productId.slice("pod-".length)];
  }
  return undefined;
}
