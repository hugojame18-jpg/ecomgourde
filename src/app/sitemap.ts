import type { MetadataRoute } from "next";
import { allProducts } from "@/data/products";
import { site } from "@/data/site";

/** Générés une fois à la compilation : requis en export statique. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gourdes",
    "/pods",
    "/comment-ca-marche",
    "/faq",
    "/contact",
    "/legal/cgv",
    "/legal/confidentialite",
    "/legal/mentions-legales",
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.domain}${r}`,
      lastModified: new Date(),
      priority: r === "" ? 1 : 0.7,
    })),
    ...allProducts.map((p) => ({
      url: `${site.domain}/produit/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
