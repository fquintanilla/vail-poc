import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import { getPage, getStack } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";
import type { SearchParams } from "@/lib/types/app";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function cmsPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

function applyLivePreviewFromSearchParams(
  stack: ReturnType<typeof getStack>,
  sp: SearchParams,
) {
  const { live_preview, entry_uid, content_type_uid, preview_timestamp } = sp;
  if (live_preview) {
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid ?? "",
      entryUid: entry_uid ?? "",
      preview_timestamp: preview_timestamp ?? "",
    });
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const pathname = cmsPathFromSlug(slug);
  const stack = getStack();
  applyLivePreviewFromSearchParams(stack, sp);
  const page = await getPage(pathname, stack);
  return customMetadata({ seo: page?.seo, isPreview: true });
}

export default function PreviewSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewSlugPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function PreviewSlugPageContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const pathname = cmsPathFromSlug(slug);
  const stack = getStack();
  applyLivePreviewFromSearchParams(stack, sp);
  const page = await getPage(pathname, stack);

  if (!page) {
    notFound();
  }

  return <MainPage page={page} livePreview={true} />;
}
