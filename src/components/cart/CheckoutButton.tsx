"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { buildCheckoutUrl, CheckoutError } from "@/lib/shopify";

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

  const go = () => {
    setError(null);
    try {
      const url = buildCheckoutUrl(lines);
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

      <p className="mt-2 text-center text-[12px] leading-snug text-ink-400">
        Paiement sécurisé sur Shopify · CB, Apple Pay, PayPal
      </p>
    </div>
  );
}
