import { getPage, getStack } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";
import type { SearchParams } from "@/lib/types/app";
import type { Page } from "@/lib/types/contentstack";
import { notFound } from "next/navigation";
import { getPageCached } from "@/lib/server/contentstack-cached";

/** CMS `url` value for the site home entry. */
export const CMS_HOME_PATH = "/" as const;

/** Build Contentstack `url` from App Router `[...slug]` segments. */
export function pathFromSlugSegments(slug: string[]): string {
  return `/${slug.join("/")}`;
}

export function applyLivePreviewSearchParams(
  stack: ReturnType<typeof getStack>,
  sp: SearchParams,
): void {
  const { live_preview, content_type_uid, entry_uid, preview_timestamp } = sp;
  if (!live_preview) return;
  stack.livePreviewQuery({
    live_preview,
    contentTypeUid: content_type_uid ?? "",
    entryUid: entry_uid ?? "",
    preview_timestamp: preview_timestamp ?? "",
  });
}

/** Preview only: always hits the delivery API (no `"use cache"`). */
export async function fetchCmsPageUncached(
  pathname: string,
  sp: SearchParams,
): Promise<Page | undefined> {
  const stack = getStack();
  applyLivePreviewSearchParams(stack, sp);
  return getPage(pathname, stack);
}

export async function requirePreviewPage(
  pathname: string,
  sp: SearchParams,
): Promise<Page> {
  const page = await fetchCmsPageUncached(pathname, sp);
  if (!page) notFound();
  return page;
}

export async function publishMetadataForPath(pathname: string) {
  const page = await getPageCached(pathname);
  return customMetadata({ seo: page?.seo });
}

export async function previewMetadataForPath(
  pathname: string,
  sp: SearchParams,
) {
  const page = await fetchCmsPageUncached(pathname, sp);
  return customMetadata({ seo: page?.seo, isPreview: true });
}

export async function previewMetadataForHomeRoute(
  searchParams: Promise<SearchParams>,
) {
  const sp = await searchParams;
  return previewMetadataForPath(CMS_HOME_PATH, sp);
}

export async function previewMetadataForSlugRoute(
  params: Promise<{ slug: string[] }>,
  searchParams: Promise<SearchParams>,
) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return previewMetadataForPath(pathFromSlugSegments(slug), sp);
}
