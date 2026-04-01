import Image from "next/image";
import Link from "next/link";
import type { MediaTextBlock } from "@/lib/types";
import sanitizeHtml from "sanitize-html";
import { jsonToHtml } from "@contentstack/json-rte-serializer";

type MediaTextBlockProps = {
  mediaTextBlock: MediaTextBlock;
};

export function MediaTextBlock(props: MediaTextBlockProps) {
  const mediaTextBlock = props.mediaTextBlock;
  const imageAlignment = mediaTextBlock.image_alignment;
  const isImageRight = imageAlignment?.toLowerCase() === "right";

  const textOrder = isImageRight ? "order-1 lg:order-1" : "order-2 lg:order-2";
  const mediaOrder = isImageRight ? "order-2 lg:order-2" : "order-1 lg:order-1";

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className={textOrder}>
            <h2
              {...(mediaTextBlock.$?.headline as {})}
              className="text-balance font-sans text-2xl font-semibold uppercase tracking-[0.2em] text-[#4B6373] sm:text-3xl lg:text-4xl"
            >
              {mediaTextBlock.headline}
            </h2>
            <div
              {...(mediaTextBlock.$?.body as {})}
              className="mt-4 max-w-xl text-pretty font-sans text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              {sanitizeHtml(jsonToHtml(mediaTextBlock.body))}
            </div>
            <Link
              href={mediaTextBlock.call_to_action.href}
              className="mt-8 inline-flex items-center justify-center bg-[#E29B27] px-8 py-3 font-sans text-sm font-bold uppercase tracking-wider text-neutral-900 transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6373]"
              {...(mediaTextBlock.call_to_action.$?.title as {})}
            >
              {mediaTextBlock.call_to_action.title}
            </Link>
          </div>

          <div className={mediaOrder}>
            <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-200">
              <Image
                {...(mediaTextBlock.image.$?.url as {})}
                src={mediaTextBlock.image.url}
                alt={mediaTextBlock.image.filename}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
