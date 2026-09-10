import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/data/site";
import { flavors } from "@/data/flavors";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

const columns = [
  {
    title: "Boutique",
    links: [
      { label: "Gourde + 7 pods", href: "/produit/flow-bottle-7-pods" },
      { label: "La gourde seule", href: "/produit/flow-bottle" },
      { label: "Les goûts", href: "/pods" },
    ],
  },
  {
    title: "La marque",
    links: [
      { label: "Comment ça marche", href: "/comment-ca-marche" },
      { label: "FAQ", href: "/faq" },
      { label: "Livraison & retours", href: "/faq#livraison" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-berry-deep text-white">
      <div className="shell relative z-10 pb-10 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr_1.25fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="light" />
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/55">
              {site.tagline} Une gourde premium, des pods aromatiques, et l&apos;eau qui devient
              enfin la boisson que tu choisis.
            </p>
            <div className="flex gap-2">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-brand hover:text-ink"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TikTok"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-brand hover:text-ink"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M13.5 3v11.4a3.1 3.1 0 1 1-2.6-3.05"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 3.2c.5 2.4 2.2 3.9 4.6 4.1"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-3">
              <p className="eyebrow text-white/40">{col.title}</p>
              {col.links.map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="text-[15px] text-white/70 transition-colors hover:text-brand"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-4">
            <p className="eyebrow text-white/40">Newsletter</p>
            <p className="text-[15px] leading-relaxed text-white/55">
              −{site.firstOrderDiscount} % sur ta première commande, les nouveaux goûts en
              avant-première.
            </p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {/* Les arômes n'ont pas de fiche propre : tous mènent à la page Goûts. */}
          {flavors.map((f) => (
            <Link
              key={f.id}
              href="/pods"
              className="rounded-full border border-white/12 px-3.5 py-1.5 text-[12.5px] text-white/60 transition-colors hover:border-transparent hover:text-ink"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: f.color }} />
                Pod {f.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/40 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName} — site de démonstration.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal/confidentialite" className="hover:text-white">
              Politique de confidentialité
            </Link>
            <Link href="/legal/cgv" className="hover:text-white">
              CGV
            </Link>
            <Link href="/legal/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>

      {/* Wordmark décoratif */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap px-4 pb-2 text-center font-display font-bold leading-none tracking-[-0.06em] text-white/[0.045]"
        style={{ fontSize: "clamp(72px, 20vw, 280px)" }}
      >
        {site.name}
      </p>
    </footer>
  );
}
