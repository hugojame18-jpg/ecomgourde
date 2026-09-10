import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, products, getProduct } from "@/data/products";
import { reviews } from "@/data/reviews";
import { faq } from "@/data/faq";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ReviewCard } from "@/components/product/ReviewCard";
import { FaqList } from "@/components/ui/Faq";
import { SectionHeading, Rating } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CostCompare } from "@/components/sections/CostCompare";
import { FlavorGrid } from "@/components/sections/FlavorGrid";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.shortDescription,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: { title: `${product.name} — ${site.name}`, description: product.shortDescription },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category === "bundle"))
    .slice(0, 4);

  const productReviews = reviews.slice(0, 3);

  const url = `${site.domain}/produit/${product.slug}`;

  /**
   * Données structurées produit.
   *
   * ⚠️ `aggregateRating` est volontairement absent : les notes du site sont des
   * données de démonstration. Déclarer de fausses notes à Google est une fausse
   * information lisible par une machine — sanction de référencement d'un côté,
   * pratique commerciale trompeuse de l'autre. Réactive ce bloc le jour où les
   * avis sont réels (voir `site.hasRealReviews`).
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.id,
    image: product.images.map((i) => `${site.domain}${i}`),
    brand: { "@type": "Brand", name: site.name },
    ...(site.hasRealReviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "EUR",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  /** Fil d'Ariane balisé : Google l'affiche à la place de l'URL brute. */
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category === "pod" ? "Les goûts" : "La gourde",
        item: `${site.domain}${product.category === "pod" ? "/pods" : "/gourdes"}`,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="shell pt-5 text-[13px] text-ink-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={
                product.category === "pod"
                  ? "/pods"
                  : product.category === "bundle"
                    ? "/gourdes"
                    : "/gourdes"
              }
              className="hover:text-ink"
            >
              {product.category === "pod" ? "Les goûts" : "La gourde"}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {/* Description détaillée */}
      <section className="bg-mist py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <SectionHeading eyebrow="Le produit" title="Pensé pour être utilisé tous les jours." />
              <div className="mt-6 flex flex-col gap-4">
                {product.description.map((p) => (
                  <p key={p} className="max-w-[58ch] text-[16px] leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {product.includes ? (
                <div className="rounded-[24px] bg-white p-6">
                  <p className="eyebrow text-brand-dark">Contenu du pack</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {product.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-[15px]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-brand-dark">
                          ✓
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {product.specs ? (
                <div className="rounded-[24px] bg-white p-6">
                  <p className="eyebrow text-brand-dark">Caractéristiques</p>
                  <dl className="mt-4 divide-y divide-ink/8">
                    {product.specs.map((s) => (
                      <div key={s.label} className="flex justify-between gap-6 py-2.5 text-[14.5px]">
                        <dt className="text-ink-400">{s.label}</dt>
                        <dd className="text-right font-medium">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <CostCompare />

      {/* Sur une fiche pod, on propose les autres arômes ; sur une gourde, la
          gamme est déjà affichée sous les coloris, dans le bloc d'achat. */}
      {product.category === "pod" ? (
        <FlavorGrid
          eyebrow="Les 7 arômes"
          title="Les autres goûts."
          text="Les sept arômes livrés avec la gourde, un pod de chaque."
        />
      ) : null}

      {/* FAQ produit */}
      <section className="section bg-white">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Bon à savoir avant d'acheter." />
          <FaqList items={product.faq ?? faq.slice(0, 4)} defaultOpen={0} />
        </div>
      </section>

      {/* Avis */}
      <section id="avis-produit" className="section bg-mist">
        <div className="shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Avis vérifiés" title="Ce qu'en disent les clients." />
            <div className="flex items-center gap-3">
              <Rating value={product.rating} size={18} showValue />
              <span className="text-[14px] text-ink-600">
                {product.reviewCount.toLocaleString("fr-FR")} avis
              </span>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3">
            {productReviews.map((r) => (
              <li key={r.id}>
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11.5px] text-ink-400">
            Avis de démonstration — à remplacer par tes vrais avis clients.
          </p>
        </div>
      </section>

      {/* Produits similaires */}
      <section className="section bg-white">
        <div className="shell">
          <SectionHeading eyebrow="À compléter" title="Ça va bien ensemble." />
          <div className="mt-8 md:mt-12">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>
    </>
  );
}
