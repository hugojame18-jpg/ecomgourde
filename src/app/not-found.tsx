import { ButtonLink } from "@/components/ui/Button";
import { ProductVisual } from "@/components/visuals/ProductVisual";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center gap-6 py-24 text-center md:py-32">
      <div className="h-40 w-24 opacity-80">
        <ProductVisual kind="bottle" color="#00c9b6" accent="#0a0d0c" />
      </div>
      <h1 className="text-[40px] font-bold tracking-[-0.045em] md:text-[64px]">Page introuvable</h1>
      <p className="max-w-[44ch] text-[15px] text-ink-600">
        Cette page a dû être bue jusqu&apos;à la dernière goutte. Reprenons depuis le début.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="brand" size="lg">
          Retour à l&apos;accueil
        </ButtonLink>
        <ButtonLink href="/gourdes" variant="outline" size="lg">
          Voir la boutique
        </ButtonLink>
      </div>
    </div>
  );
}
