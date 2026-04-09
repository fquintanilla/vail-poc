"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { fetchPageByUrl, getStack } from "@/lib/contentstack";

/**
 * Fetches a page from Contentstack with caching. Use this when Live Preview is not active.
 * Only accepts a URL (serializable) so it can be safely used with "use cache".
 * This file is server-only; do not import it from Client Components.
 *
 * @param url - The URL path to match against the page entry's url field
 */
export async function getPageCached(url: string) {
  cacheLife("contentstack");
  cacheTag("contentstack", `page-${url}`);

  const stack = getStack();
  return fetchPageByUrl(url, stack);
}

