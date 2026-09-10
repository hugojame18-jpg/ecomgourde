"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Primitives";
import { formatPrice, cx } from "@/lib/format";

const perks = [
  { icon: "📦", title: "Livraison régulière", text: "Tes pods arrivent avant la fin des précédents." },
  { icon: "🏷️", title: "Jusqu'à −27 %", text: "Le meilleur prix au pod, à vie." },
  { icon: "🔄", title: "Goûts modifiables", text: "Change ta sélection avant chaque envoi." },
  { icon: "⏸️", title: "Pause ou annulation", text: "En deux clics, sans frais, sans justification." },
];

export function Subscription() {
  const [selected, setSelected] = useState(subscriptionPlans[0]?.id ?? "");
  const { add } = useCart();
  const plan = subscriptionPlans.find((p) => p.id === selected);

  // Aucune formule sourcée pour le moment : la section ne s'affiche pas.
  if (!plan) return null;

  return (
    <section id="abonnement" className="section relative overflow-hidden bg-berry text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #00c9b6, transparent 70%)" }}
      />
      <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Abonnement"
            tone="light"
            title={
              <>
                Ne tombe jamais
                <br />à court de ton
                <br />
                goût préféré.
              </>
            }
            text="Tu choisis la fréquence et les arômes, on s'occupe du reste. Sans engagement, modifiable à tout moment."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-3 rounded-2xl border border-white/10 p-4">
                <span className="text-[20px]" aria-hidden>
                  {p.icon}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-white/55">
                    {p.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[30px] bg-white/[0.05] p-5 backdrop-blur-xl md:p-7">
          <p className="eyebrow text-brand">Choisis ta formule</p>
          <div className="mt-4 flex flex-col gap-3">
            {subscriptionPlans.map((p) => {
              const active = p.id === selected;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p.id)}
                  className={cx(
                    "relative flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                    active
                      ? "border-brand bg-brand/10"
                      : "border-white/10 hover:border-white/25",
                  )}
                >
                  <span
                    className={cx(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                      active ? "border-brand" : "border-white/25",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="sub-dot"
                        className="h-2.5 w-2.5 rounded-full bg-brand"
                      />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[16px] font-semibold">{p.name}</span>
                      {p.highlight ? (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
                          Le plus choisi
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-white/55">
                      {p.packs} pods · {p.frequency}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[17px] font-semibold">{formatPrice(p.price)}</span>
                    <span className="block text-[12px] text-white/45 line-through">
                      {formatPrice(p.compareAtPrice)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.04] px-4 py-3 text-[13.5px] text-white/60">
            Soit <span className="font-semibold text-brand">{formatPrice(plan.perPack)}</span> le pod
            au lieu de 2,97 € — {plan.description}
          </div>

          <Button
            variant="brand"
            size="lg"
            full
            className="mt-5"
            onClick={() =>
              add({
                productId: `subscription-${plan.id}`,
                slug: "abonnement",
                name: `Abonnement ${plan.name}`,
                price: plan.price,
                compareAtPrice: plan.compareAtPrice,
                visual: { kind: "bundle", color: "#00c9b6" },
                freeShipping: true,
                variant: `${plan.packs} packs · ${plan.frequency}`,
                subscription: true,
              })
            }
          >
            Choisir mon abonnement
          </Button>
          <p className="mt-3 text-center text-[12px] text-white/40">
            Sans engagement · Modifiable ou annulable en 2 clics
          </p>
        </div>
      </div>
    </section>
  );
}
