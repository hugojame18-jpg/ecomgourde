import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Charge une image de /public et la renvoie en data URI.
 * Nécessaire pour les images Open Graph : le moteur de rendu n'a pas accès au
 * serveur au moment où il génère la vignette de partage.
 */
export async function publicImageDataUri(publicPath: string) {
  const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const buffer = await readFile(file);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === "jpg" ? "jpeg" : ext;
  return `data:image/${mime};base64,${buffer.toString("base64")}`;
}

/** Palette partagée par toutes les vignettes de partage. */
export const ogTheme = {
  size: { width: 1200, height: 630 },
  berry: "#a8305c",
  berryDeep: "#7d1f42",
  brand: "#00c9b6",
  ink: "#0a0d0c",
  cream: "#f8f6f2",
  // même dégradé que le hero du site, pour que le partage ressemble à la page
  background: "linear-gradient(120deg, #ffe9a3 0%, #ffdd6b 26%, #ffd24a 52%, #ffe79a 78%, #fffaeb 100%)",
};
