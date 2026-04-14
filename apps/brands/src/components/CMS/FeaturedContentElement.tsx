import Image from "next/image";
import { connection } from "next/server";
import { ContentstackLink } from "@/components/CMS/ContentstackLink";
import { ContentstackRichText } from "@/components/CMS/ContentstackRichText";
import { FeaturedContentVideoButton } from "@/components/CMS/FeaturedContentVideoButton";
import type {
  FeaturedContentItem,
  PageComponents1,
} from "@/lib/types/contentstack";

type FeaturedContentElementProps = {
  content: NonNullable<PageComponents1["featured_content"]>;
};

function resolveFeaturedItem(
  content: NonNullable<PageComponents1["featured_content"]>,
): FeaturedContentItem | undefined {
  if (content.item) {
    return content.item;
  }

  return content.shared_featured_item?.[0]?.item;
}

async function isScheduledItemActive(item: FeaturedContentItem) {
  const start = item.scheduling?.start_date
    ? new Date(item.scheduling.start_date)
    : null;
  const end = item.scheduling?.end_date
    ? new Date(item.scheduling.end_date)
    : null;

  if (!start && !end) {
    return true;
  }

  await connection();
  const now = new Date();

  if (start && !Number.isNaN(start.getTime()) && now < start) {
    return false;
  }

  if (end && !Number.isNaN(end.getTime()) && now > end) {
    return false;
  }

  return true;
}

function getStyleVariant(style?: string | null) {
  switch (style) {
    case "image":
    case "3d":
    case "slopeUp":
    case "solid":
      return style;
    default:
      return "default";
  }
}

function formatPrice(price?: number | null) {
  if (typeof price !== "number") {
    return undefined;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function renderEpicWordmark(title: string) {
  const match = /epic/i.exec(title);
  if (!match) {
    return title;
  }

  const before = title.slice(0, match.index);
  const word = title.slice(match.index, match.index + match[0].length);
  const after = title.slice(match.index + match[0].length);

  return (
    <>
      {before}
      <span className="inline-flex items-center gap-1">
        <span
          aria-hidden="true"
          className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--featured-epic-badge)] text-[var(--featured-epic-badge-fg)]"
        >
          E
        </span>
        {word}
      </span>
      {after}
    </>
  );
}

export async function FeaturedContentElement({
  content,
}: FeaturedContentElementProps) {
  const item = resolveFeaturedItem(content);
  if (!item || !(await isScheduledItemActive(item))) {
    return null;
  }

  const styleVariant = getStyleVariant(item.layout?.style);
  const isImageRight = item.layout?.is_image_right ?? false;
  const isReverse = item.layout?.reverse_color ?? false;
  const isPassDetailView = item.layout?.is_pass_detail_view ?? false;
  const showPricing = item.pricing?.show_pricing_information ?? false;
  const formattedPrice = formatPrice(item.pricing?.price);
  const hasVideo = Boolean(item.youtube_link?.trim());
  const image = item.image;

  return (
    <section
      className="wrapper py-10 md:py-14"
      data-featured-style={styleVariant}
      data-featured-reverse={isReverse || undefined}
    >
      <article
        className={`relative overflow-hidden rounded-[2rem] border border-[var(--featured-border)] ${isReverse ? "bg-[var(--featured-surface-reverse)] text-[var(--featured-on-surface-reverse)]" : "bg-[var(--featured-surface)] text-[var(--featured-on-surface)]"} shadow-[0_22px_55px_rgba(19,33,46,0.12)]`}
      >
        <div
          className={`grid grid-cols-1 ${isImageRight ? "lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]" : "lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]"}`}
        >
          <div
            className={`${isImageRight ? "lg:order-2" : "lg:order-1"} relative p-5 md:p-8 ${styleVariant === "slopeUp" ? "lg:p-10" : ""}`}
          >
            <div
              className={`absolute inset-0 ${styleVariant === "default" ? "hidden" : "block"} ${
                styleVariant === "solid"
                  ? "bg-[var(--featured-solid-panel)]"
                  : styleVariant === "image"
                    ? "bg-[radial-gradient(circle_at_top,var(--featured-bg-accent),transparent_52%),linear-gradient(135deg,var(--featured-bg-top),var(--featured-bg-bottom))]"
                    : styleVariant === "slopeUp"
                      ? "bg-[linear-gradient(160deg,var(--featured-bg-top),var(--featured-bg-bottom))]"
                      : "bg-[radial-gradient(circle_at_top,var(--featured-bg-accent),transparent_52%),linear-gradient(140deg,var(--featured-bg-top),var(--featured-bg-bottom))]"
              }`}
            />
            <div
              className={`relative z-[1] flex h-full flex-col justify-center gap-5 ${isPassDetailView ? "lg:min-h-[28rem]" : "lg:min-h-[24rem]"}`}
            >
              {item.subtitle ? (
                <p
                  className={`text-sm font-medium uppercase tracking-[0.26em] ${
                    isReverse
                      ? "text-[var(--featured-kicker-reverse)]"
                      : "text-[var(--featured-kicker)]"
                  }`}
                  {...((item.$?.subtitle as Record<string, unknown>) ?? {})}
                >
                  {item.subtitle}
                </p>
              ) : null}

              {item.title ? (
                <h2
                  className={`max-w-[18ch] text-balance font-bold leading-none ${
                    isPassDetailView
                      ? "text-4xl sm:text-5xl lg:text-6xl"
                      : "text-3xl sm:text-4xl lg:text-5xl"
                  }`}
                  {...((item.$?.title as Record<string, unknown>) ?? {})}
                >
                  {isPassDetailView
                    ? renderEpicWordmark(item.title)
                    : item.title}
                </h2>
              ) : null}

              <ContentstackRichText
                field={item.body}
                fieldAttributes={item.$?.body as Record<string, unknown>}
                className={`prose prose-lg max-w-[60ch] ${
                  isReverse
                    ? "text-[var(--featured-copy-reverse)] prose-headings:text-[var(--featured-on-surface-reverse)] prose-a:text-[var(--featured-link-reverse)] prose-strong:text-[var(--featured-on-surface-reverse)]"
                    : "text-[var(--featured-copy)] prose-headings:text-[var(--featured-on-surface)] prose-a:text-[var(--featured-link)] prose-strong:text-[var(--featured-on-surface)]"
                } prose-p:my-0`}
              />

              {showPricing && formattedPrice ? (
                <div className="flex flex-col items-start gap-1 pt-2 lg:items-end">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                      isReverse
                        ? "text-[var(--featured-kicker-reverse)]"
                        : "text-[var(--featured-kicker)]"
                    }`}
                  >
                    Starting at
                  </p>
                  <p className="text-3xl font-bold leading-none sm:text-4xl">
                    {formattedPrice}
                  </p>
                </div>
              ) : null}

              {item.action_link?.title ? (
                <div
                  className={`pt-2 ${showPricing ? "lg:flex lg:justify-end" : ""}`}
                >
                  <ContentstackLink
                    link={item.action_link}
                    fieldAttributes={
                      item.$?.action_link as Record<string, unknown>
                    }
                    className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition ${
                      isReverse
                        ? "border-[var(--featured-button-border-reverse)] text-[var(--featured-button-fg-reverse)] hover:bg-white/10"
                        : "border-[var(--featured-button-border)] text-[var(--featured-button-fg)] hover:bg-black/5"
                    }`}
                  >
                    {item.action_link.title}
                  </ContentstackLink>
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={`${isImageRight ? "lg:order-1" : "lg:order-2"} relative min-h-[18rem] bg-[var(--featured-image-surface)]`}
          >
            <div
              className={`absolute inset-0 ${
                styleVariant === "slopeUp"
                  ? isImageRight
                    ? "lg:[clip-path:polygon(0_0,100%_4.5%,100%_100%,0_100%)]"
                    : "lg:[clip-path:polygon(0_4.5%,100%_0,100%_100%,0_100%)]"
                  : isImageRight
                    ? "lg:[clip-path:polygon(0_0,100%_4.5%,100%_100%,0_100%)]"
                    : "lg:[clip-path:polygon(0_4.5%,100%_0,100%_100%,0_100%)]"
              }`}
            >
              {hasVideo ? (
                <div className="h-full w-full p-5 md:p-8">
                  <FeaturedContentVideoButton item={item} />
                </div>
              ) : image ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src={image.url}
                      alt={
                        image.title ||
                        image.filename ||
                        item.title ||
                        "Featured image"
                      }
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      {...((item.$?.image as Record<string, unknown>) ?? {})}
                    />
                  </div>
                  {item.action_link?.title ? (
                    <ContentstackLink
                      link={item.action_link}
                      fieldAttributes={
                        item.$?.action_link as Record<string, unknown>
                      }
                      className="absolute inset-0 z-[1] block"
                      ariaLabel={item.action_link.title}
                    >
                      <span className="sr-only">{item.action_link.title}</span>
                    </ContentstackLink>
                  ) : null}
                </>
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(140deg,var(--featured-bg-top),var(--featured-bg-bottom))]" />
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
