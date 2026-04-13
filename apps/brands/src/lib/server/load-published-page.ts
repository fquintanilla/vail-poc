import { cache } from "react";
import { getPageCached } from "@/lib/server/contentstack-cached";

/**
 * Dedupes `generateMetadata` + page for the same pathname in one request.
 * Independent of Cache Components (still fine if you keep `"use cache"`).
 */
export const loadPublishedPage = cache(async (pathname: string) =>
  getPageCached(pathname),
);
