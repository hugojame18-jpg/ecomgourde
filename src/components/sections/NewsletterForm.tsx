"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { cx } from "@/lib/format";

/** Branche ici ton provider (Klaviyo, Brevo, Shopify...) dans `onSubmit`. */
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
        Merci ! Ton code <span className="font-bold">{site.newsletterCode}</span> t&apos;attend dans
        ta boîte mail.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setSent(true);
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
