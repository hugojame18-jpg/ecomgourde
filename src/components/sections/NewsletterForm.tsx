"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { cx } from "@/lib/format";
import { grantFirstOrderDiscount } from "@/lib/newsletter";

/**
 * −10 % contre une adresse e-mail.
 *
 * La remise est acquise immédiatement : elle est mémorisée dans le navigateur
 * et s'applique toute seule au paiement (voir `lib/newsletter`). Le code reste
 * affiché pour qui commande depuis un autre appareil.
 *
 * ⚠️ L'adresse n'est encore envoyée nulle part, et le site étant statique elle
 * ne peut pas l'être depuis ici : Shopify refuse les envois vers /contact
 * depuis un autre domaine, et l'API Admin exige un jeton qu'on ne peut pas
 * exposer dans un navigateur — il donnerait à n'importe qui les pleins droits
 * sur la boutique.
 *
 * Deux façons de brancher un vrai envoi dans `onSubmit` :
 *   1. un formulaire hébergé par un prestataire d'e-mailing (Brevo, Klaviyo,
 *      Mailchimp), qui accepte les envois inter-domaines ;
 *   2. une petite fonction serveur (Cloudflare Workers, gratuit) qui reçoit
 *      l'adresse et appelle l'API Admin de Shopify avec le jeton côté serveur.
 *
 * Tant que ce n'est pas fait, la remise de 10 % est offerte sans récupérer le
 * contact. La ligne de consentement ci-dessous devra nommer le prestataire.
 */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        className={cx(
          "rounded-2xl px-4 py-3 text-[14px]",
          tone === "dark" ? "bg-brand/15 text-brand" : "bg-brand-soft text-brand-dark",
        )}
      >
        C&apos;est fait, tes −{site.firstOrderDiscount} % sont enregistrés : ils s&apos;appliquent
        tout seuls au moment de payer.
        <br />
        <span className="opacity-80">
          Sur un autre appareil, utilise le code{" "}
          <span className="font-bold tracking-[0.06em]">{site.newsletterCode}</span>.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) return;
        grantFirstOrderDiscount();
        setSent(true);
      }}
      className={cx(
        "flex items-center gap-1 rounded-full p-1.5",
        tone === "dark" ? "bg-white/8" : "border border-ink/12 bg-white",
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.com"
        aria-label="Adresse e-mail"
        className={cx(
          "min-w-0 flex-1 bg-transparent px-4 text-[14px] outline-none",
          tone === "dark" ? "text-white placeholder:text-white/35" : "placeholder:text-ink-400",
        )}
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-brand-glow"
      >
        Recevoir −{site.firstOrderDiscount} %
      </button>
    </form>
  );
}

/**
 * Mention de consentement, à placer sous le formulaire. Obligatoire dès qu'une
 * adresse est collectée à des fins commerciales (RGPD, art. 6.1.a).
 */
export function NewsletterConsent({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <p className={cx("mt-2 text-[11.5px]", tone === "dark" ? "text-white/45" : "text-ink-400")}>
      Une remise valable sur ta première commande. Deux à trois e-mails par mois, désinscription en
      un clic.
    </p>
  );
}
