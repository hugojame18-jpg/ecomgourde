/**
 * REMISE PREMIÈRE COMMANDE
 *
 * Le client laisse son e-mail, il obtient −10 %. Le site étant statique, il n'y
 * a pas de serveur pour retenir qui a laissé quoi : on mémorise le geste dans
 * le navigateur, et la remise part toute seule vers la page de paiement.
 *
 * Pourquoi ne pas se contenter d'afficher le code : un code à recopier à la
 * main, c'est plus de la moitié des remises jamais utilisées, et autant de
 * paniers abandonnés au moment de le chercher. Le code reste affiché pour qui
 * change d'appareil.
 *
 * ⚠️ L'adresse e-mail elle-même n'est envoyée nulle part tant qu'aucun outil
 * d'envoi (Shopify Email, Brevo...) n'est branché dans `NewsletterForm`.
 */

const KEY = "sugar:remise-premiere-commande";

/** Mémorise que ce visiteur a droit à la remise. */
export function grantFirstOrderDiscount(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // Navigation privée ou stockage refusé : le code affiché prend le relais.
  }
}

/** Ce visiteur a-t-il déjà laissé son e-mail ? */
export function hasFirstOrderDiscount(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
