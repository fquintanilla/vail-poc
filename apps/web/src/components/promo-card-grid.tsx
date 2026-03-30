import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import type { PromoCardGrid } from "@/lib/types";

type PromoCardGridProps = {
  promoCardGrid: PromoCardGrid;
};

export function PromoCardGrid(props: PromoCardGridProps) {
  const promoCardGrid = props.promoCardGrid;

  return (
    <section className="bg-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          role="list"
        >
          {promoCardGrid.promo_cards.map((card) => (
            <li
              key={card.card_title}
              className="flex flex-col overflow-hidden rounded-sm bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-300">
                <Image
                  {...(card.card_image.$?.url as {})}
                  src={card.card_image.url}
                  alt={card.card_image.filename}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={false}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <h2
                  {...(card.$?.card_title as {})}
                  className="text-left font-sans text-sm font-semibold uppercase tracking-wide text-[#4B6373]"
                >
                  {card.card_title}
                </h2>
                <div
                  {...(card.$?.card_body as {})}
                  className="text-left font-sans text-base leading-relaxed text-neutral-600"
                >
                  {sanitizeHtml(card.card_body)}
                </div>
                <Link
                  href={card.call_to_action.href}
                  className="mt-auto inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#4B6373] transition hover:text-[#3a4d5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6373]"
                  {...(card.call_to_action.$?.title as {})}
                >
                  {card.call_to_action.title}
                  <span aria-hidden className="text-base leading-none">
                    ›
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
