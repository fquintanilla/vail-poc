import Link from "next/link";
import type { Cta } from "@/lib/types/contentstack";

type ContentstackLinkProps = {
  link?: Cta | null;
  className?: string;
  children: React.ReactNode;
  fieldAttributes?: Record<string, unknown>;
  ariaLabel?: string;
};

function getReferencedPageUrl(link?: Cta | null) {
  const referencedPage = link?.page?.[0];
  return referencedPage?.url;
}

export function getContentstackHref(link?: Cta | null) {
  const externalLink = link?.external_link?.trim();
  if (externalLink) {
    return externalLink;
  }

  const referencedPageUrl = getReferencedPageUrl(link)?.trim();
  if (referencedPageUrl) {
    return referencedPageUrl;
  }

  return undefined;
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function ContentstackLink({
  link,
  className,
  children,
  fieldAttributes,
  ariaLabel,
}: ContentstackLinkProps) {
  const href = getContentstackHref(link);
  if (!href) {
    return null;
  }

  const target = link?.open_in === "_blank" ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;
  const sharedProps = {
    className,
    "aria-label": ariaLabel,
    ...(fieldAttributes ?? {}),
  };

  if (isExternalHref(href)) {
    return (
      <a href={href} target={target} rel={rel} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} target={target} rel={rel} {...sharedProps}>
      {children}
    </Link>
  );
}
