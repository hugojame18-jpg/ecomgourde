import { redirect } from "next/navigation";

/**
 * Le paiement se fait désormais chez Shopify : le bouton « Commander » crée un
 * panier via l'API Storefront et redirige vers leur page sécurisée.
 * Cette route ne sert plus qu'à récupérer les anciens liens et les favoris.
 */
export default function CheckoutPage() {
  redirect("/panier");
}
