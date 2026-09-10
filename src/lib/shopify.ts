/**
 * PONT VERS SHOPIFY — sans jeton d'API
 *
 * Le site reste la vitrine : catalogue, design, panier, tout est local. Shopify
 * n'entre en jeu qu'au moment de payer.
 *
 * On utilise le « lien panier » de Shopify plutôt que l'API Storefront :
 *   https://boutique.myshopify.com/cart/<idVariante>:<qté>,<idVariante>:<qté>
 * Shopify construit le panier et affiche directement sa page de paiement.
 *
 * L'avantage : aucun jeton d'accès à créer, donc rien à renouveler ni à exposer.
 * La contrepartie : le client voit passer l'adresse .myshopify.com. Le jour où tu
 * branches un vrai domaine sur la boutique, il suffit de changer la variable
 * NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN.
 *
 * ⚠️ Un produit doit être ACTIF et publié sur le canal « Boutique en ligne »
 * pour qu'un lien panier fonctionne.
 */

import { variantIdFor } from "@/data/shopify-variants";
import type { CartLine } from "@/lib/types";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "jdwqx1-bw.myshopify.com";

/** Le paiement est-il utilisable ? Sert à adapter l'interface. */
export const shopifyReady = Boolean(DOMAIN);

export class CheckoutError extends Error {}

/** `gid://shopify/ProductVariant/123` → `123` (le lien panier veut l'id nu). */
function numericId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

/**
 * Construit l'URL de paiement Shopify à partir du panier local.
 * Lève une `CheckoutError` explicite plutôt que d'envoyer le client sur une
 * page cassée.
 */
export function buildCheckoutUrl(lines: CartLine[], discountCode?: string): string {
  if (lines.length === 0) throw new CheckoutError("Ton panier est vide.");

  const parts = lines.map((line) => {
    const gid = variantIdFor(line);
    if (!gid) {
      throw new CheckoutError(
        `« ${line.name} » n'est pas encore disponible à la commande. Retire-le du panier pour continuer.`,
      );
    }
    return `${numericId(gid)}:${Math.max(1, Math.round(line.quantity))}`;
  });

  // `locale=fr` garde la page de paiement en français ; `discount` applique le
  // code d'entrée sans que le client ait à le recopier. Shopify l'ignore
  // silencieusement si le code est expiré ou déjà utilisé par ce client.
  const params = new URLSearchParams({ locale: "fr" });
  if (discountCode) params.set("discount", discountCode);

  return `https://${DOMAIN}/cart/${parts.join(",")}?${params.toString()}`;
}
