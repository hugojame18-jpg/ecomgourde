import type { Review } from "@/lib/types";
import { Rating } from "@/components/ui/Primitives";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-[24px] border border-ink/10 bg-white p-5 md:p-6">
      <Rating value={review.rating} size={15} />
      <blockquote className="mt-3 flex-1">
        <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">{review.title}</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">« {review.text} »</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white"
          style={{ background: review.color }}
          aria-hidden
        >
          {review.initial}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-[14px] font-semibold">
            {review.name}
            {review.verified ? (
              <span className="text-[11px] font-medium text-brand-dark">✓ vérifié</span>
            ) : null}
          </span>
          <span className="block truncate text-[12.5px] text-ink-400">{review.product}</span>
        </span>
      </figcaption>
    </figure>
  );
}
