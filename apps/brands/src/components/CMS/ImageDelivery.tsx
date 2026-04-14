/** Renders Contentstack images with Image Delivery API transforms. Uses next/image. @see https://www.contentstack.com/docs/developers/apis/image-delivery-api/ */

import Image, { type ImageProps } from "next/image";
import {
  buildContentstackImageUrl,
  type ContentstackImageDeliveryOptions,
} from "@/lib/image-delivery";
import type { File } from "@/lib/types/contentstack";

const DEFAULT_ENVIRONMENT = process.env
  .NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string;

/** Contentstack asset URL or File object (with url and title). */
export type ImageDeliverySrc = string | File | null | undefined;

/**
 * Props for {@link ImageDelivery}. Extends all next/image props except `src` and `alt`.
 * @see {@link ContentstackImageDeliveryOptions} for transform options (width, quality, crop, format, etc.)
 * @see https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 */
export interface ImageDeliveryProps extends Omit<ImageProps, "src" | "alt"> {
  /** Contentstack asset (File) or full image URL. */
  src: ImageDeliverySrc;
  /** Alt text. Defaults to `src.title` when src is a File. */
  alt?: string;
  /** Image Delivery API params (width, height, quality, crop, format, fit, etc.). */
  imageDeliveryOptions?: ContentstackImageDeliveryOptions;
}

function getImageUrl(src: ImageDeliverySrc): string | null {
  if (src == null) return null;
  return typeof src === "string" ? src : src.url;
}

function getDefaultAlt(src: ImageDeliverySrc): string {
  if (src == null || typeof src === "string") return "";
  return src.title ?? "";
}

/**
 * Image component that applies Contentstack Image Delivery API transforms (resize, crop, quality, format)
 * and renders via next/image. The `environment` query param is added from
 * `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT`.
 *
 * @param props - {@link ImageDeliveryProps}
 * @example
 * // From CMS asset
 * <ImageDelivery src={entry.image} alt={entry.image.title} imageDeliveryOptions={{ width: 800, quality: 80, format: "webp" }} fill sizes="100vw" className="object-cover" />
 * @example
 * // From URL
 * <ImageDelivery src={url} alt="Photo" imageDeliveryOptions={{ width: 400, crop: "1:1" }} width={400} height={400} />
 * @see https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 */
export function ImageDelivery({
  src,
  alt,
  imageDeliveryOptions,
  ...imageProps
}: ImageDeliveryProps) {
  const baseUrl = getImageUrl(src);
  const resolvedAlt = alt || getDefaultAlt(src);

  if (!baseUrl) {
    return null;
  }

  const finalUrl =
    imageDeliveryOptions && Object.keys(imageDeliveryOptions).length > 0
      ? buildContentstackImageUrl(
          baseUrl,
          imageDeliveryOptions,
          DEFAULT_ENVIRONMENT,
        )
      : baseUrl;

  return <Image src={finalUrl} alt={resolvedAlt} {...imageProps} />;
}
