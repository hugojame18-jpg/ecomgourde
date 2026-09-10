/**
 * Chemin d'un fichier de /public.
 *
 * En export statique, le site peut être servi depuis un sous-dossier
 * (github.io/ecomgourde/…). Next préfixe alors ses propres fichiers, mais pas
 * ceux de /public référencés en dur : c'est le rôle de cette fonction.
 *
 * Le jour où un vrai domaine est branché, NEXT_PUBLIC_BASE_PATH reste vide et
 * les chemins ne bougent pas.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
