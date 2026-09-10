import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { publicImageDataUri, ogTheme } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogTheme.size;
export const contentType = "image/png";

/** Générée une fois à la compilation : indispensable en export statique. */
export const dynamic = "force-static";

/** Vignette affichée quand un lien vers l'accueil est partagé (TikTok, Insta, WhatsApp…). */
export default async function OpenGraphImage() {
  const bottles = await publicImageDataUri("/produits/hero-trio.png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: ogTheme.background,
          padding: "0 0 0 68px",
        }}
      >
        {/* Colonne texte */}
        <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
              color: ogTheme.berry,
            }}
          >
            {site.name.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: ogTheme.berryDeep,
              textTransform: "uppercase",
            }}
          >
            <span>Le goût</span>
            <span>pour l&apos;eau</span>
          </div>

          <div style={{ display: "flex", marginTop: 22, fontSize: 30, color: "#4b5350" }}>
            0 sucre · 0 calorie · 14 arômes
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              padding: "16px 34px",
              borderRadius: 999,
              background: ogTheme.brand,
              color: "#0a0d0c",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Choisis ta gourde
          </div>
        </div>

        {/* Colonne visuel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottles}
          alt=""
          width={572}
          height={560}
          style={{ objectFit: "contain", marginLeft: 8 }}
        />
      </div>
    ),
    size,
  );
}
