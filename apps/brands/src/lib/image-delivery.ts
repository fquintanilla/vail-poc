/**
 * Contentstack Image Delivery API – URL builder.
 * See: https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 *
 * The `environment` query param is required so requests go through Contentstack CDN.
 */

/** Format for output image. Supports: auto, gif, png, jpg, pjpg, webp, webpll, webply, avif */
export type ImageDeliveryFormat =
  | "auto"
  | "gif"
  | "png"
  | "jpg"
  | "pjpg"
  | "webp"
  | "webpll"
  | "webply"
  | "avif";

/** Fit mode when both width and height are set: bounds | cover | crop */
export type ImageDeliveryFit = "bounds" | "cover" | "crop";

/** Resize filter: lanczos3 (default), lanczos2, bicubic, bilinear, nearest */
export type ImageDeliveryResizeFilter =
  | "lanczos3"
  | "lanczos2"
  | "bicubic"
  | "bilinear"
  | "nearest";

/** Auto optimization: webp or avif (serves modern format when browser supports it) */
export type ImageDeliveryAuto = "webp" | "avif";

/** Disable parameter; currently only "upscale" is supported */
export type ImageDeliveryDisable = "upscale";

/**
 * Query parameters for the Contentstack Image Delivery API. All fields optional.
 * @see https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 */
export interface ContentstackImageDeliveryOptions {
  /** Width in pixels (1–8192) or percentage (e.g. 0.5). Use "300p" for 300%. */
  width?: number | string;
  /** Height in pixels (1–8192) or percentage. Use "300p" for 300%. */
  height?: number | string;
  /** Compression for lossy formats (1–100). Ignored for GIF/PNG. */
  quality?: number;
  /** Output format. Use "auto" for format negotiation. */
  format?: ImageDeliveryFormat;
  /**
   * Crop: "width,height" in px or %, or "width:height" aspect ratio.
   * Optional: ",x{value},y{value}" or ",offset-x{value},offset-y{value}".
   * Suffix "safe" or "smart" for fail-safe / content-aware crop.
   */
  crop?: string;
  /** Fit mode; requires both width and height. */
  fit?: ImageDeliveryFit;
  /** Disable behavior, e.g. "upscale". */
  disable?: ImageDeliveryDisable;
  /** Auto optimization: "webp" or "avif". */
  auto?: ImageDeliveryAuto;
  /** Resize filter when resizing. */
  "resize-filter"?: ImageDeliveryResizeFilter;
  /** Device pixel ratio (1–10000 or decimal). Use with width or height. */
  dpr?: number;
  /** Trim edges: "top,right,bottom,left" in px or %, or shorthand e.g. "50". */
  trim?: string;
  /** Orientation: 1–8 (rotate/flip). 1=default, 6=rotate right, etc. */
  orient?: number;
  /** Blur amount (1–1000 float). */
  blur?: number;
  /** Background color: hex (e.g. "cccccc") or "r,g,b" or "r,g,b,a". */
  "bg-color"?: string;
  /** Sharpen: e.g. "r1,t2,a2" (radius, threshold, amount). */
  sharpen?: string;
  /** Saturation -100 to 100. */
  saturation?: number;
  /** Contrast -100 to 100. */
  contrast?: number;
  /** Brightness -100 to 100. */
  brightness?: number;
}

const OPTION_KEYS: (keyof ContentstackImageDeliveryOptions)[] = [
  "width",
  "height",
  "quality",
  "format",
  "crop",
  "fit",
  "disable",
  "auto",
  "resize-filter",
  "dpr",
  "trim",
  "orient",
  "blur",
  "bg-color",
  "sharpen",
  "saturation",
  "contrast",
  "brightness",
];

/**
 * Builds a Contentstack Image Delivery API URL by appending query parameters
 * to the given image URL. Always adds the required `environment` parameter.
 *
 * @param imageUrl - Full Contentstack asset URL (e.g. from entry.image.url)
 * @param options - Image Delivery API options (width, quality, crop, etc.)
 * @param environment - Contentstack environment name (e.g. from NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT)
 * @returns URL with query string ready for use in img src or next/image
 */
export function buildContentstackImageUrl(
  imageUrl: string,
  options: ContentstackImageDeliveryOptions,
  environment: string,
): string {
  const params = new URLSearchParams();

  params.set("environment", environment);

  for (const key of OPTION_KEYS) {
    const value = options[key];
    if (value === undefined || value === null) continue;
    const paramKey = key === "resize-filter" ? "resize-filter" : key;
    params.set(paramKey, String(value));
  }

  const separator = imageUrl.includes("?") ? "&" : "?";
  return `${imageUrl}${separator}${params.toString()}`;
}
