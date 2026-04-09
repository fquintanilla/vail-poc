import type {
  CanonicalEvent,
  EnrichedCanonicalEvent,
  PageViewedEvent,
  PageScrolledEvent,
} from "@/lib/analytics/events";

type AdobeDispatchResult =
  | { ok: true; status: number }
  | { ok: false; reason: string; status?: number };

type AdobePayload = {
  event: {
    xdm: {
      eventType: string;
      timestamp: string;
      web?: {
        webPageDetails?: {
          name?: string;
          URL?: string;
        };
        webReferrer?: {
          URL: string;
        };
        webInteraction?: {
          type: string;
          name?: string;
          URL?: string;
        };
      };
      _vail?: {
        canonicalEvent: CanonicalEvent["event"];
        resort: string;
        path?: string;
        scrollDepth?: number;
      };
    };
  };
};

function getAdobeEndpoint() {
  const datastreamId = process.env.ADOBE_EDGE_DATASTREAM_ID?.trim();
  if (!datastreamId) {
    return null;
  }

  const baseUrl =
    process.env.ADOBE_EDGE_BASE_URL?.trim() ??
    "https://edge.adobedc.net/ee/v2/interact";

  const endpoint = new URL(baseUrl);
  endpoint.searchParams.set("dataStreamId", datastreamId);

  return endpoint.toString();
}

function mapPageViewedEvent(event: EnrichedCanonicalEvent & PageViewedEvent): AdobePayload {
  return {
    event: {
      xdm: {
        eventType: "web.webpagedetails.pageViews",
        timestamp: event.context.receivedAt,
        web: {
          webPageDetails: {
            name: event.properties.pageName,
            URL: event.properties.url,
          },
          ...(event.properties.referrer
            ? {
                webReferrer: {
                  URL: event.properties.referrer,
                },
              }
            : {}),
        },
        _vail: {
          canonicalEvent: event.event,
          resort: event.properties.resort,
          path: event.properties.path,
        },
      },
    },
  };
}

function mapPageScrolledEvent(
  event: EnrichedCanonicalEvent & PageScrolledEvent,
): AdobePayload {
  return {
    event: {
      xdm: {
        eventType: "web.webinteraction.scroll",
        timestamp: event.context.receivedAt,
        web: {
          webInteraction: {
            type: "other",
            name: `Scroll ${event.properties.scrollDepth}%`,
            URL: event.properties.url,
          },
        },
        _vail: {
          canonicalEvent: event.event,
          resort: event.properties.resort,
          path: event.properties.path,
          scrollDepth: event.properties.scrollDepth,
        },
      },
    },
  };
}

function mapCanonicalEventToAdobe(event: EnrichedCanonicalEvent): AdobePayload | null {
  switch (event.event) {
    case "page_viewed":
      return mapPageViewedEvent(event);
    case "page_scrolled":
      return mapPageScrolledEvent(event);
    case "product_viewed":
      return null;
    default:
      return null;
  }
}

export async function sendEventToAdobe(
  event: EnrichedCanonicalEvent,
): Promise<AdobeDispatchResult> {
  const endpoint = getAdobeEndpoint();
  if (!endpoint) {
    return {
      ok: false,
      reason: "missing_datastream_id",
    };
  }

  const payload = mapCanonicalEventToAdobe(event);
  if (!payload) {
    return {
      ok: false,
      reason: "unsupported_event",
    };
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const bearerToken = process.env.ADOBE_EDGE_BEARER_TOKEN?.trim();
  const apiKey = process.env.ADOBE_EDGE_API_KEY?.trim();
  const orgId = process.env.ADOBE_EDGE_ORG_ID?.trim();

  if (bearerToken && apiKey && orgId) {
    headers.Authorization = `Bearer ${bearerToken}`;
    headers["x-api-key"] = apiKey;
    headers["x-gw-ims-org-id"] = orgId;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      reason: "adobe_request_failed",
      status: response.status,
    };
  }

  return {
    ok: true,
    status: response.status,
  };
}
