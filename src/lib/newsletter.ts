/**
 * REMISE PREMIÈRE COMMANDE
 *
 * Le client laisse son e-mail, il obtient −10 %. Le site étant statique, il n'y
 * a pas de serveur pour retenir qui a laissé quoi : on mémorise le droit à la
 * remise dans le navigateur, et il repart vers Shopify au moment de payer.
 *
 * Pourquoi ne pas se contenter d'afficher le code : un code à recopier à la
 * main, c'est plus de la moitié des remises jamais utilisées, et autant de
 * paniers abandonnés au moment de le chercher. Le code reste affiché pour qui
 * change d'appareil.
 *
 * ⚠️ L'adresse e-mail n'est récupérée nulle part, et on ne la garde donc pas.
 * Deux pistes ont été essayées et écartées :
 *   — POST vers /contact de la boutique : refusé depuis un autre domaine
 *     (403 sans référent, 400 avec) ;
 *   — `checkout[email]` sur le lien panier : Shopify supprime le paramètre, et
 *     le lien tombe en « Erreur panier » si les crochets ne sont pas encodés.
 *
 * Pour vraiment collecter ces adresses, il faut un relais côté serveur — que
 * GitHub Pages ne permet pas — ou un formulaire hébergé par un prestataire
 * d'e-mailing. Voir la note dans `NewsletterForm`.
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
