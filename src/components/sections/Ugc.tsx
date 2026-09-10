import Link from "next/link";
import { ugcPosts } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/Primitives";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { site } from "@/data/site";

/**
 * Cartes verticales façon TikTok / Reels.
 * Ajoute une URL dans `video` (data/reviews.ts) pour remplacer le placeholder.
 */
export function Ugc() {
  return (
    <section className="section overflow-hidden bg-white">
      <div className="shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Sur les réseaux"
            title={
              <>
                Vous l&apos;avez
                <br />
                adopté.
              </>
            }
            text="Des milliers de vidéos, une seule question en commentaire : « ça marche vraiment ? »"
          />
          <Link
            href={site.socials.tiktok}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden shrink-0 rounded-full bg-berry px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-berry-deep md:inline-flex"
          >
            Voir plus de vidéos
          </Link>
        </div>
      </div>

      <ul className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mt-12 md:gap-4 md:px-[max(32px,calc((100vw-1240px)/2+32px))]">
        {ugcPosts.map((post) => (
          <li
            key={post.id}
            className="group relative aspect-[9/16] w-[62vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-[22px] sm:w-[38vw] lg:w-[230px]"
            style={{ background: `linear-gradient(180deg, ${post.color}33, ${post.color} 92%)` }}
          >
            {post.video ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={post.video}
                poster={post.poster || undefined}
                muted
                loop
                playsInline
                preload="none"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[62%] w-[62%] transition-transform duration-500 group-hover:scale-105">
                  <ProductVisual kind="bottle" color={post.color} accent="#0a0d0c" />
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3.5 pt-10">
              <p className="text-[12.5px] font-semibold text-white">{post.handle}</p>
              <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-white/70">
                {post.caption}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-white">
                <span aria-hidden>♥</span>
                {post.likes}
              </p>
            </div>

            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden>
                <path d="M1 1l10 6-10 6z" fill="currentColor" />
              </svg>
            </span>
          </li>
        ))}
      </ul>

      <div className="shell mt-8 flex justify-center md:hidden">
        <Link
          href={site.socials.tiktok}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex w-full items-center justify-center rounded-full bg-berry px-6 py-4 text-[15px] font-semibold text-white"
        >
          Voir plus de vidéos
        </Link>
      </div>
    </section>
  );
}
