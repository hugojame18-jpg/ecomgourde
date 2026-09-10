"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { buildCheckoutUrl, CheckoutError } from "@/lib/shopify";
import { hasFirstOrderDiscount } from "@/lib/newsletter";
import { site } from "@/data/site";

/**
 * Passe la main à Shopify : construit le lien panier puis redirige vers la page
 * de paiement. Le panier local ne bouge pas — si le client revient en arrière,
 * il retrouve ses articles.
 */
export function CheckoutButton({
  className,
  onNavigate,
}: {
  className?: string;
  /** appelé juste avant la redirection (ex. fermer le tiroir) */
  onNavigate?: () => void;
}) {
  const { lines } = useCart();
  const [error, setError] = useState<string | null>(null);

  // Le stockage du navigateur n'existe pas au rendu serveur : on le lit après
  // affichage, sinon le HTML généré et la page affichée divergent.
  const [discount, setDiscount] = useState<string | null>(null);
  useEffect(() => {
    if (hasFirstOrderDiscount()) setDiscount(site.newsletterCode);
  }, []);

  const go = () => {
    setError(null);
    try {
      const url = buildCheckoutUrl(lines, discount ?? undefined);
      onNavigate?.();
      window.location.href = url;
    } catch (e) {
      setError(
        e instanceof CheckoutError
          ? e.message
          : "La commande n'a pas pu démarrer. Réessaie dans un instant.",
      );
    }
  };

  return (
    <div className={className}>
      <Button variant="brand" size="lg" full onClick={go} disabled={lines.length === 0}>
        Commander
      </Button>

      {error ? (
        <p role="alert" className="mt-2 text-[13px] leading-snug text-berry">
          {error}
        </p>
      ) : null}

      {discount ? (
        <p className="mt-2 text-center text-[12.5px] font-medium text-berry">
          −{site.firstOrderDiscount} % appliqués automatiquement au paiement
        </p>
      ) : null}

      <p className="mt-2 text-center text-[12px] leading-snug text-ink-400">
        Paiement sécurisé sur Shopify · CB, PayPal, Klarna
      </p>
    </div>
  );
}
