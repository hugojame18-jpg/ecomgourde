import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Générés une fois à la compilation : requis en export statique. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/panier", "/checkout"] }],
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
