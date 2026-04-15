import Link from "next/link";
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { cva } from "class-variance-authority";
import { Play } from "lucide-react";
import sanitizeHtml from "sanitize-html";
import { cn } from "@repo/ui/lib/utils";
import { ImageDelivery } from "@/components/CMS/ImageDelivery";
import { editableProps } from "@/lib/contentstack";
import type {
  CSLPFieldMapping,
  Cta,
  FeaturedContentElements,
  FeaturedContentItem,
} from "@/lib/types/contentstack";

type FeaturedContentReferenceList = FeaturedContentElements[];

type FeaturedContentBlock = {
  item?: FeaturedContentItem;
  featured_item?: FeaturedContentReferenceList;
  shared_featured_item?: FeaturedContentReferenceList;
  $?: {
    item?: CSLPFieldMapping;
    featured_item?: CSLPFieldMapping;
    shared_featured_item?: CSLPFieldMapping;
  };
};

type FeaturedContentProps = {
  data: FeaturedContentBlock;
};

const sectionVariants = cva("my-[60px]", {
  variants: {
    style: {
      default: "",
      solid: "",
    },
    reverse: {
      true: "",
      false: "",
    },
  },
});

const wrapperVariants = cva("grid overflow-hidden md:grid-cols-2", {
  variants: {
    style: {
      default: "gap-8 md:gap-10 lg:gap-14",
      solid: "gap-0 bg-[var(--featured-content-muted-surface)]",
    },
    reverse: {
      true: "bg-[var(--featured-content-reverse-surface)] text-[var(--featured-content-reverse-title)]",
      false: "",
    },
    compact: {
      true: "items-start",
      false: "items-center",
    },
  },
  compoundVariants: [
    {
      style: "solid",
      reverse: true,
      className: "bg-[var(--featured-content-reverse-surface)]",
    },
  ],
});

const mediaVariants = cva("relative min-h-[260px] overflow-hidden", {
  variants: {
    style: {
      default: "aspect-[16/10] bg-slate-200 md:min-h-[340px] lg:min-h-[420px]",
      solid: "aspect-[16/10] bg-slate-200 md:min-h-full",
    },
  },
});

const copyVariants = cva(
  "flex flex-col justify-center px-5 py-6 sm:px-8 md:px-10",
  {
    variants: {
      style: {
        default: "px-0 py-0 md:px-0",
        solid: "px-5 py-8 sm:px-8 md:px-[5%] md:py-10",
      },
      reverse: {
        true: "",
        false: "",
      },
      compact: {
        true: "lg:px-[4%]",
        false: "",
      },
    },
  },
);

const eyebrowVariants = cva(
  "m-0 text-xs font-semibold uppercase tracking-[0.24em]",
  {
    variants: {
      reverse: {
        true: "text-[var(--featured-content-reverse-body)]",
        false: "text-[var(--featured-content-eyebrow)]",
      },
    },
  },
);

const titleVariants = cva(
  "relative mt-2 text-balance text-[2rem] font-semibold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[2.4rem] lg:text-[3.25rem]",
  {
    variants: {
      reverse: {
        true: "text-[var(--featured-content-reverse-title)]",
        false: "text-[var(--featured-content-title)]",
      },
      passDetail: {
        true: "mt-0 text-[2.35rem] sm:text-[2.8rem] lg:text-[3.75rem]",
        false: "",
      },
    },
  },
);

const bodyVariants = cva(
  "prose prose-p:my-0 prose-p:leading-7 prose-ul:my-4 prose-li:my-1 mt-5 max-w-none text-base",
  {
    variants: {
      reverse: {
        true: "text-[var(--featured-content-reverse-body)] prose-headings:text-[var(--featured-content-reverse-title)] prose-strong:text-[var(--featured-content-reverse-title)] prose-a:text-[var(--featured-content-reverse-title)] prose-a:decoration-white/70 hover:prose-a:text-white",
        false:
          "text-[var(--featured-content-body)] prose-headings:text-[var(--featured-content-title)] prose-strong:text-[var(--featured-content-title)] prose-a:text-[var(--featured-content-action-text)] prose-a:decoration-[var(--featured-content-action-text)]/60",
      },
    },
  },
);

const priceLabelVariants = cva(
  "text-xs font-semibold uppercase tracking-[0.2em]",
  {
    variants: {
      reverse: {
        true: "text-[var(--featured-content-reverse-body)]",
        false: "text-[var(--featured-content-title)]",
      },
    },
  },
);

const priceValueVariants = cva(
  "mt-2 text-4xl font-semibold leading-none sm:text-5xl",
  {
    variants: {
      reverse: {
        true: "text-[var(--featured-content-reverse-title)]",
        false: "text-[var(--featured-content-title)]",
      },
    },
  },
);

const ctaVariants = cva(
  "inline-flex min-h-11 items-center justify-center border px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      reverse: {
        true: "border-white/70 text-[var(--featured-content-reverse-title)] hover:bg-white hover:text-[var(--featured-content-reverse-surface)] focus-visible:outline-white",
        false:
          "border-[var(--featured-content-action-border)] text-[var(--featured-content-action-text)] hover:bg-[var(--featured-content-action-border)] hover:text-white focus-visible:outline-[var(--featured-content-action-border)]",
      },
    },
  },
);

const MEDIA_IMAGE_SIZES =
  "(min-width: 1200px) 570px, (min-width: 768px) 50vw, 100vw";

function resolveFeaturedItem(data: FeaturedContentBlock) {
  return (
    data.shared_featured_item?.[0]?.item ??
    data.featured_item?.[0]?.item ??
    data.item
  );
}

function resolveRootEditableProps(data: FeaturedContentBlock) {
  if (data.shared_featured_item?.length) {
    return editableProps(data.$?.shared_featured_item);
  }

  if (data.featured_item?.length) {
    return editableProps(data.$?.featured_item);
  }

  if (data.item) {
    return editableProps(data.$?.item);
  }

  return {};
}

function getCtaHref(cta?: Cta): string | undefined {
  const pageUrl = cta?.page?.[0]?.url;
  return pageUrl || cta?.external_link || undefined;
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function formatPrice(price?: number | null) {
  if (price == null || Number.isNaN(price)) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

function renderBodyHtml(body: FeaturedContentItem["body"]) {
  if (!body) {
    return null;
  }

  return sanitizeHtml(jsonToHtml(body));
}

function FeaturedMedia({
  item,
  href,
  isVideo,
}: {
  item: FeaturedContentItem;
  href?: string;
  isVideo: boolean;
}) {
  const media = (
    <div className="relative h-full w-full">
      <ImageDelivery
        src={item.image}
        alt={
          item.image?.description || item.image?.filename || item.title || ""
        }
        fill
        className="object-cover"
        sizes={MEDIA_IMAGE_SIZES}
        imageDeliveryOptions={{ width: 1200, quality: 80, format: "webp" }}
        {...editableProps(item.$?.image)}
      />
      {isVideo ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-18 w-18 items-center justify-center rounded-full bg-white/85 text-[var(--featured-content-play-accent)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-transform duration-200">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
          <span className="sr-only">Play video</span>
        </span>
      ) : null}
    </div>
  );

  if (!href) {
    return media;
  }

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target={isVideo ? "_blank" : undefined}
        rel={isVideo ? "noreferrer" : undefined}
        className="block h-full"
        aria-label={
          isVideo
            ? `Play video: ${item.title ?? "Featured content"}`
            : undefined
        }
        {...(isVideo
          ? editableProps(item.$?.youtube_link)
          : editableProps(item.$?.action_link))}
      >
        {media}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block h-full"
      {...editableProps(item.$?.action_link)}
    >
      {media}
    </Link>
  );
}

function FeaturedCta({ cta, reverse }: { cta?: Cta; reverse: boolean }) {
  const href = getCtaHref(cta);
  const title = cta?.title;

  if (!href || !title) {
    return null;
  }

  const className = ctaVariants({ reverse });
  const editable = editableProps(cta.$?.title);

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target={cta.open_in}
        rel={cta.open_in === "_blank" ? "noreferrer" : undefined}
        className={className}
        {...editable}
      >
        {title}
      </a>
    );
  }

  return (
    <Link href={href} target={cta.open_in} className={className} {...editable}>
      {title}
    </Link>
  );
}

export default function FeaturedContent({ data }: FeaturedContentProps) {
  const item = resolveFeaturedItem(data);

  if (!item) {
    return null;
  }

  const style = item.layout?.style === "solid" ? "solid" : "default";
  const reverse = item.layout?.reverse_color ?? false;
  const passDetail = item.layout?.is_pass_detail_view ?? false;
  const isImageRight = item.layout?.is_image_right ?? false;
  const hasMedia = Boolean(item.image || item.youtube_link);
  const isVideo = Boolean(item.youtube_link);
  const bodyHtml = renderBodyHtml(item.body);
  const ctaHref = getCtaHref(item.action_link);
  const price = item.pricing?.show_pricing_information
    ? formatPrice(item.pricing.price)
    : null;
  const mediaHref = isVideo ? item.youtube_link : ctaHref;

  const mediaNode = hasMedia ? (
    <div className={mediaVariants({ style })}>
      <FeaturedMedia item={item} href={mediaHref} isVideo={isVideo} />
    </div>
  ) : null;

  const copyNode = (
    <div className={copyVariants({ style, reverse, compact: passDetail })}>
      <div className="w-full">
        {item.subtitle ? (
          <p
            className={eyebrowVariants({ reverse })}
            {...editableProps(item.$?.subtitle)}
          >
            {item.subtitle}
          </p>
        ) : null}

        {item.title ? (
          <h2
            className={titleVariants({ reverse, passDetail })}
            {...editableProps(item.$?.title)}
          >
            {item.title}
          </h2>
        ) : null}

        {bodyHtml ? (
          <div
            className={bodyVariants({ reverse })}
            {...editableProps(item.$?.body)}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : null}

        {price ? (
          <div
            className="mt-6 text-right"
            {...editableProps(item.pricing?.$?.price)}
          >
            <p className={priceLabelVariants({ reverse })}>Starting at</p>
            <p className={priceValueVariants({ reverse })}>{price}</p>
          </div>
        ) : null}

        {item.action_link?.title ? (
          <div className={cn("mt-6", price ? "flex justify-end" : "")}>
            <FeaturedCta cta={item.action_link} reverse={reverse} />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <section
      className={sectionVariants({ style, reverse })}
      {...resolveRootEditableProps(data)}
    >
      <div
        className={wrapperVariants({
          style,
          reverse,
          compact: passDetail,
        })}
      >
        {isImageRight ? (
          <>
            {copyNode}
            {mediaNode}
          </>
        ) : (
          <>
            {mediaNode}
            {copyNode}
          </>
        )}
      </div>
    </section>
  );
}
