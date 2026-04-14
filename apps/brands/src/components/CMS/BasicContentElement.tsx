import Link from "next/link";
import { ContentstackRichText } from "@/components/CMS/ContentstackRichText";
import type { PageComponents1 } from "@/lib/types/contentstack";

type BasicContentElementProps = {
  content: NonNullable<PageComponents1["basic_content"]>;
};

function getBasicContentHref(
  link?: NonNullable<PageComponents1["basic_content"]>["action_link"],
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

export function BasicContentElement({ content }: BasicContentElementProps) {
  const href = getBasicContentHref(content.action_link);
  const linkLabel = content.action_link?.link_name?.trim();
  const titleAlignment = content.center_title ? "text-center" : "text-left";
  const subtitleAlignment = content.center_subtitle ? "text-center" : "text-left";
  const bodyAlignment =
    content.center_title && content.center_subtitle ? "mx-auto text-center" : "";

  return (
    <section className="wrapper py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        {content.subtitle ? (
          <p
            className={`m-0 text-sm font-medium uppercase tracking-[0.24em] text-[var(--secondary)] ${subtitleAlignment}`}
            {...((content.$?.subtitle as Record<string, unknown>) ?? {})}
          >
            {content.subtitle}
          </p>
        ) : null}

        {content.title ? (
          <h2
            className={`mt-0 text-balance text-4xl font-bold leading-none text-[var(--foreground)] sm:text-5xl ${titleAlignment}`}
            {...((content.$?.title as Record<string, unknown>) ?? {})}
          >
            {content.title}
          </h2>
        ) : null}

        <ContentstackRichText
          field={content.body}
          fieldAttributes={content.$?.body as Record<string, unknown>}
          className={`prose prose-lg mt-6 max-w-none text-[var(--muted-foreground)] prose-headings:text-[var(--foreground)] prose-p:my-0 prose-ul:list-outside prose-ul:pl-6 prose-li:marker:text-[var(--primary)] prose-a:text-[var(--link-cta,var(--primary))] prose-strong:text-[var(--foreground)] ${bodyAlignment}`}
        />

        {href && linkLabel ? (
          <div className={`mt-8 ${content.center_title ? "text-center" : ""}`}>
            {isExternalHref(href) ? (
              <a
                href={href}
                target="_self"
                className="inline-flex min-h-11 items-center justify-center text-sm font-semibold uppercase tracking-[0.22em] text-[var(--link-cta,var(--primary))] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                {...((content.action_link?.$?.link_name as Record<string, unknown>) ?? {})}
              >
                {linkLabel}
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex min-h-11 items-center justify-center text-sm font-semibold uppercase tracking-[0.22em] text-[var(--link-cta,var(--primary))] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                {...((content.action_link?.$?.link_name as Record<string, unknown>) ?? {})}
              >
                {linkLabel}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
