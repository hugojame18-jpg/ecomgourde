import type { NextConfig } from "next";

/**
 * `next dev` et `next build` écrivent dans deux dossiers différents.
 * Sans ça, lancer un build pendant que le serveur de dev tourne corrompt son
 * cache CSS (Windows verrouille les fichiers en cours d'écriture).
 */
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";

/**
 * Mode export : le site est compilé en pages HTML statiques, publiables sur
 * GitHub Pages. Activé par la variable EXPORT=1 (voir le workflow de
 * déploiement) ; en local, rien ne change.
 *
 * Deux conséquences à connaître :
 *  - l'optimisation d'images de Next a besoin d'un serveur, donc elle est
 *    désactivée : les fichiers de /public sont servis tels quels ;
 *  - le site est servi depuis /<dépôt>/ tant qu'aucun domaine n'est branché,
 *    d'où le préfixe d'URL réglable par BASE_PATH.
 */
const EXPORT = process.env.EXPORT === "1";
const BASE_PATH = process.env.BASE_PATH ?? "";

export default function config(phase: string): NextConfig {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    ...(EXPORT
      ? {
          output: "export" as const,
          basePath: BASE_PATH || undefined,
          // Sans slash final, GitHub Pages renvoie un 404 sur /pods.
          trailingSlash: true,
        }
      : {}),
    images: {
      // Optimisation active hors export : les PNG de 1,5 Mo sont servis en
      // WebP/AVIF redimensionnés. Ajoute ici les domaines de ton CDN quand les
      // visuels seront hébergés ailleurs.
      unoptimized: EXPORT,
      remotePatterns: [{ protocol: "https", hostname: "**" }],
    },
  };
}
