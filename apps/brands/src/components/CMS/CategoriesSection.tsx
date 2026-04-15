import Image from "next/image";
import Link from "next/link";
import { ContentstackRichText } from "@/components/CMS/ContentstackRichText";
import type { PageComponents1 } from "@/lib/types/contentstack";

type CategoriesSectionProps = {
  content: NonNullable<PageComponents1["categories"]>;
};

function getCategoryHref(
  link?: {
    link_name?: string;
    page?: { url?: string }[];
    external_link?: string;
  },
) {
  const externalLink = link?.external_link?.trim();
  if (externalLink) {
    return externalLink;
  }

  const referencedPageUrl = link?.page?.[0]?.url?.trim();
  if (referencedPageUrl) {
    return referencedPageUrl;
  }

  return undefined;
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function getCardAccent(index: number) {
  const accents = [
    "from-[var(--categories-accent-1)] to-[var(--categories-accent-1-dark)]",
    "from-[var(--categories-accent-2)] to-[var(--categories-accent-2-dark)]",
    "from-[var(--categories-accent-3)] to-[var(--categories-accent-3-dark)]",
    "from-[var(--categories-accent-4)] to-[var(--categories-accent-4-dark)]",
    "from-[var(--categories-accent-5)] to-[var(--categories-accent-5-dark)]",
  ];

  return accents[index] ?? accents[accents.length - 1];
}

export function CategoriesSection({ content }: CategoriesSectionProps) {
  const categories = content.categories?.filter(
    (category) => category.title || category.image?.url || category.link,
  );

  if (!categories || categories.length !== 5) {
    return null;
  }

  return (
    <section className="wrapper py-12 md:py-16 lg:py-20">
      <div className="overflow-hidden rounded-[2.25rem] border border-[var(--categories-border)] bg-[var(--categories-surface)] shadow-[0_24px_70px_rgba(19,33,46,0.12)]">
        <div className="relative bg-[linear-gradient(160deg,var(--categories-panel-top),var(--categories-panel-bottom))] px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_70%)]" />
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <article className="flex h-full flex-col justify-center rounded-[1.75rem] border border-[var(--categories-intro-border)] bg-[var(--categories-intro-surface)] p-6 text-[var(--categories-intro-foreground)] shadow-sm md:p-7">
              {content.subtitle ? (
                <p
                  className="m-0 text-sm font-medium uppercase tracking-[0.26em] text-[var(--categories-kicker)]"
                  {...((content.$?.subtitle as Record<string, unknown>) ?? {})}
                >
                  {content.subtitle}
                </p>
              ) : null}

              {content.title ? (
                <h2
                  className="mt-3 text-balance text-4xl font-bold leading-none md:text-5xl"
                  {...((content.$?.title as Record<string, unknown>) ?? {})}
                >
                  {content.title}
                </h2>
              ) : null}

              <div className="my-5 h-px w-16 bg-[var(--categories-divider)]" />

              <ContentstackRichText
                field={content.body}
                fieldAttributes={content.$?.body as Record<string, unknown>}
                className="prose prose-lg max-w-none text-[var(--categories-copy)] prose-headings:text-[var(--categories-intro-foreground)] prose-p:my-0 prose-a:text-[var(--categories-link)] prose-strong:text-[var(--categories-intro-foreground)]"
              />
            </article>

            {categories.map((category, index) => {
              const href = getCategoryHref(category.link);
              const image = category.image;
              const card = (
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] bg-[var(--categories-card-surface)] shadow-[0_20px_55px_rgba(19,33,46,0.14)] transition duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.title || image.filename || category.title || "Category image"}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 46vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        {...((category.$?.image as Record<string, unknown>) ?? {})}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--categories-fallback-top),var(--categories-fallback-bottom))]" />
                    )}

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(12,19,28,0.72)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                      <div className="flex items-end gap-3 rounded-[1.2rem] bg-[color-mix(in_oklch,var(--categories-badge-surface),transparent_14%)] px-4 py-3 text-[var(--categories-badge-foreground)] shadow-lg backdrop-blur-sm">
                        <span
                          aria-hidden="true"
                          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getCardAccent(index)} text-lg font-bold text-white`}
                        >
                          {category.icon?.[0]?.css_class ? (
                            <span className={category.icon[0].css_class} />
                          ) : (
                            <span>{(category.title?.trim().charAt(0) || "?").toUpperCase()}</span>
                          )}
                        </span>
                        <h3
                          className="text-balance text-xl font-bold leading-tight"
                          {...((category.$?.title as Record<string, unknown>) ?? {})}
                        >
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              );

              if (!href) {
                return (
                  <div
                    key={category._metadata?.uid ?? `category-${index}`}
                    className="h-full"
                  >
                    {card}
                  </div>
                );
              }

              if (isExternalHref(href)) {
                return (
                  <a
                    key={category._metadata?.uid ?? `category-${index}`}
                    href={href}
                    className="block h-full"
                    aria-label={category.title || "Category"}
                    {...((category.$?.link as Record<string, unknown>) ?? {})}
                  >
                    {card}
                  </a>
                );
              }

              return (
                <Link
                  key={category._metadata?.uid ?? `category-${index}`}
                  href={href}
                  className="block h-full"
                  aria-label={category.title || "Category"}
                  {...((category.$?.link as Record<string, unknown>) ?? {})}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
