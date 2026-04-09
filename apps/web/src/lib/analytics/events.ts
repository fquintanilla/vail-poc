export type CanonicalEventName =
  | "page_viewed"
  | "page_scrolled"
  | "product_viewed";

type CanonicalEventBase<TEvent extends CanonicalEventName, TProperties> = {
  event: TEvent;
  properties: TProperties;
};

export type PageViewedEvent = CanonicalEventBase<
  "page_viewed",
  {
    pageName: string;
    path: string;
    url: string;
    resort: string;
    referrer?: string | null;
  }
>;

export type ProductViewedEvent = CanonicalEventBase<
  "product_viewed",
  {
    productId: string;
    category: string;
    resort: string;
    price?: number;
  }
>;

export type PageScrolledEvent = CanonicalEventBase<
  "page_scrolled",
  {
    pageName: string;
    path: string;
    url: string;
    resort: string;
    scrollDepth: number;
  }
>;

export type CanonicalEvent =
  | PageViewedEvent
  | PageScrolledEvent
  | ProductViewedEvent;

export type EnrichedCanonicalEvent = CanonicalEvent & {
  context: {
    requestId: string;
    receivedAt: string;
    userAgent: string | null;
    ip: string | null;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === "string";
}

export function isCanonicalEvent(value: unknown): value is CanonicalEvent {
  if (!isRecord(value) || !isRecord(value.properties) || !isNonEmptyString(value.event)) {
    return false;
  }

  if (value.event === "page_viewed") {
    return (
      isNonEmptyString(value.properties.pageName) &&
      isNonEmptyString(value.properties.path) &&
      isNonEmptyString(value.properties.url) &&
      isNonEmptyString(value.properties.resort) &&
      isOptionalString(value.properties.referrer)
    );
  }

  if (value.event === "product_viewed") {
    return (
      isNonEmptyString(value.properties.productId) &&
      isNonEmptyString(value.properties.category) &&
      isNonEmptyString(value.properties.resort) &&
      (value.properties.price === undefined ||
        typeof value.properties.price === "number")
    );
  }

  if (value.event === "page_scrolled") {
    return (
      isNonEmptyString(value.properties.pageName) &&
      isNonEmptyString(value.properties.path) &&
      isNonEmptyString(value.properties.url) &&
      isNonEmptyString(value.properties.resort) &&
      typeof value.properties.scrollDepth === "number"
    );
  }

  return false;
}
