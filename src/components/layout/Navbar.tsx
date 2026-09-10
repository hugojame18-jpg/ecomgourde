"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { mainNav, site } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { cx } from "@/lib/format";
import { flavors } from "@/data/flavors";

function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/[0.06]">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6.5 8h11l1.1 11.2a1.6 1.6 0 0 1-1.6 1.8H7a1.6 1.6 0 0 1-1.6-1.8z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 10V7.4a2.8 2.8 0 0 1 5.6 0V10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <AnimatePresence>
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
            className="absolute -right-0.5 -top-0.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-ink"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

export function PromoBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % site.promoBar.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative z-50 h-9 overflow-hidden bg-berry text-white">
      <div className="shell flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] font-medium tracking-[0.01em] text-white/90"
          >
            {site.promoBar[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 px-3 pt-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 lg:px-0 lg:pt-0",
        scrolled || menu
          ? "lg:bg-white/85 lg:shadow-[0_1px_0_rgba(10,13,12,.08)] lg:backdrop-blur-xl"
          : "bg-white/0",
      )}
    >
      <nav className="relative mx-auto flex h-[58px] w-full max-w-[1240px] items-center justify-between gap-6 rounded-[22px] bg-berry px-4 text-white lg:h-[68px] lg:rounded-none lg:bg-transparent lg:px-8 lg:text-ink">
        <button
          type="button"
          aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menu}
          onClick={() => setMenu((m) => !m)}
          className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={cx(
                "absolute left-0 h-[2px] w-5 rounded bg-white transition-all duration-300",
                menu ? "top-1.5 rotate-45" : "top-0.5",
              )}
            />
            <span
              className={cx(
                "absolute left-0 h-[2px] w-5 rounded bg-white transition-all duration-300",
                menu ? "top-1.5 -rotate-45" : "top-[11px]",
              )}
            />
          </span>
        </button>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-9 lg:static lg:translate-x-0">
          <Logo tone="light" className="lg:text-ink" />
          <ul className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(
                    "relative py-2 text-[14px] font-medium transition-colors hover:text-ink",
                    pathname === item.href ? "text-ink" : "text-ink-600",
                  )}
                >
                  {item.label}
                  <span
                    className={cx(
                      "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded bg-brand transition-transform duration-300",
                      pathname === item.href ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/produit/sugar-bottle-7-pods"
            className="hidden rounded-full bg-brand-soft px-4 py-2 text-[13px] font-semibold text-brand-dark transition-colors hover:bg-brand hover:text-ink lg:inline-flex"
          >
            Gourde + 7 pods · 33,45 €
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label="Ouvrir le panier"
            className="text-white lg:text-ink"
          >
            <CartIcon count={count} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[76px] z-40 h-[calc(100dvh-76px)] overflow-y-auto border-t border-ink/8 bg-white lg:hidden"
          >
            <div className="shell flex flex-col gap-8 py-8">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                    className="border-b border-ink/8"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 font-display text-[26px] font-bold tracking-[-0.04em]"
                    >
                      {item.label}
                      <span className="text-ink-400">→</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div>
                <p className="eyebrow mb-3 text-ink-400">Les goûts</p>
                <div className="flex flex-wrap gap-2">
                  {/* Les arômes n'ont pas de fiche propre : tous mènent à la page Goûts. */}
                  {flavors.map((f) => (
                    <Link
                      key={f.id}
                      href="/pods"
                      className="rounded-full px-3.5 py-2 text-[13px] font-semibold"
                      style={{ background: f.soft, color: f.color }}
                    >
                      {f.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/produit/sugar-bottle-7-pods"
                className="flex items-center justify-between rounded-2xl bg-berry px-5 py-4 text-white"
              >
                <span>
                  <span className="block font-semibold">Gourde + 7 pods</span>
                  <span className="text-[13px] text-white/70">33,45 € · livraison offerte</span>
                </span>
                <span className="text-white">→</span>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
