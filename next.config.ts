import type { NextConfig } from "next";

/**
 * `next dev` et `next build` écrivent dans deux dossiers différents.
 * Sans ça, lancer un build pendant que le serveur de dev tourne corrompt son
 * cache CSS (Windows verrouille les fichiers en cours d'écriture).
 */
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";

export default function config(phase: string): NextConfig {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    images: {
      // Optimisation active : les PNG de 1,5 Mo sont servis en WebP/AVIF
      // redimensionnés. Possible depuis que dev et build ont des distDir séparés.
      // Ajoute ici les domaines de ton CDN quand les visuels seront hébergés.
      remotePatterns: [{ protocol: "https", hostname: "**" }],
    },
  };
}
