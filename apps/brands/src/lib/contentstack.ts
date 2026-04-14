import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import ContentstackLivePreview, {
  IStackSdk,
} from "@contentstack/live-preview-utils";
import {
  getContentstackEndpoints,
  getRegionForString,
} from "@timbenniks/contentstack-endpoints";
import type { Header, Page } from "@/lib/types/contentstack";

/** Safe to spread as React props for Live Preview editable tags. */
export function editableProps(value: any): object {
  return typeof value === "object" && value !== null ? value : {};
}

// Region and endpoint configuration - computed once at module load time
const region = getRegionForString(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string,
);
const endpoints = getContentstackEndpoints(region, true);

/**
 * Creates a new Contentstack SDK instance for each request.
 *
 * IMPORTANT: This function MUST be called for each server-side request to ensure isolation.
 *
 * Why isolated instances are critical:
 * - When Live Preview is enabled, the SDK modifies its configuration (API endpoints, etc.)
 *   for specific requests via livePreviewQuery()
 * - Sharing a single SDK instance across concurrent requests causes configuration changes
 *   from one user (User A) to affect others (User B), leading to incorrect content delivery
 * - Each request gets its own isolated stack instance, preventing cross-request interference
 *
 * Usage:
 * - Server-side: Always call getStack() at the start of each request handler
 * - Client-side: Can reuse instances as there's no concurrent request handling
 */
export function getStack() {
  // Create a fresh stack instance with base configuration
  return contentstack.stack({
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
    deliveryToken: process.env
      .NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    // Setting the region
    // if the region doesnt exist, fall back to a custom region given by the env vars
    // for internal testing purposes at Contentstack we look for a custom region in the env vars, you do not have to do this.
    region: region
      ? region
      : (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any),
    // Setting the host for content delivery based on the region or environment variables
    // This is done for internal testing purposes at Contentstack, you can omit this if you have set a region above.
    host:
      process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY ||
      (endpoints && endpoints.contentDelivery),

    live_preview: {
      enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true",
      preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
      // Setting the host for live preview based on the region
      // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
      host:
        process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST ||
        (endpoints && endpoints.preview),
    },
  });
}

/**
 * Initializes Contentstack Live Preview for client-side editing.
 *
 * This function is called once on the client-side (via ContentstackLivePreview component)
 * to enable the visual editing interface. It creates a stack instance to read configuration
 * but doesn't perform any server-side queries, so it's safe to call getStack() here.
 *
 * Note: This is client-side only and doesn't affect server-side request isolation.
 */
export function initLivePreview() {
  // Create a stack instance to read configuration for Live Preview initialization
  const stack = getStack();
  ContentstackLivePreview.init({
    ssr: true,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true",
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
    clientUrlParams: {
      // Setting the client URL parameters for live preview
      // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
      host:
        process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION ||
        (endpoints && endpoints.application),
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
    },
  });
}

/**
 * Fetches a page entry from Contentstack using the given stack instance.
 * Used by getPage and by getPageCached (in contentstack-cached.ts).
 */
export async function fetchPageByUrl(
  url: string,
  stack: ReturnType<typeof getStack>,
): Promise<Page | undefined> {
  const result = await stack
    .contentType("page")
    .entry()
    .query()
    .addParams({
      include_all: true,
      include_all_depth: 1,
    })
    .where("url", QueryOperation.EQUALS, url)
    .where(
      "taxonomies.resorts",
      QueryOperation.EQUALS,
      process.env.NEXT_PUBLIC_BRAND as string,
    )
    .limit(1)
    .find<Page>();

  if (result.entries) {
    const entry = result.entries[0]!;

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true") {
      contentstack.Utils.addEditableTags(entry as any, "page", true);
    }

    return entry;
  }
}

/**
 * Fetches a page entry from Contentstack by URL.
 *
 * This function is focused solely on fetching page data - it does not handle Live Preview
 * configuration. Live Preview setup should be done by the caller before passing the stack instance.
 *
 * @param url - The URL path to match against the page entry's url field
 * @param stackInstance - Optional pre-configured stack instance. If provided, uses this instance
 *                        (useful when Live Preview has been configured). If not provided, creates
 *                        a new isolated stack instance via getStack().
 *
 * Usage pattern for Live Preview:
 *   1. Create a stack: const stack = getStack()
 *   2. Configure Live Preview: stack.livePreviewQuery({ ... })
 *   3. Pass to getPage: const page = await getPage("/", stack)
 *
 * Usage pattern without Live Preview (cached):
 *   const page = await getPageCached("/")  // from @/lib/contentstack-cached
 */
export async function getPage(
  url: string,
  stackInstance?: ReturnType<typeof getStack>,
) {
  const stack = stackInstance ?? getStack();
  return fetchPageByUrl(url, stack);
}

/**
 * Header entry for the current brand (taxonomy filter).
 * Extend with `.includeReference(...)` when a consumer needs resolved references.
 */
export async function getHeader(stack: ReturnType<typeof getStack>) {
  const result = await stack
    .contentType("header")
    .entry()
    .query()
    .where(
      "taxonomies.brands",
      QueryOperation.EQUALS,
      process.env.NEXT_PUBLIC_BRAND as string,
    )
    .find<Header>();

  if (result.entries) {
    const entry = result.entries[0]!;

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true") {
      contentstack.Utils.addEditableTags(entry as any, "header", true);
    }

    return entry;
  }
}
