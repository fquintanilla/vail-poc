import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import {
  pathFromSlugSegments,
  previewMetadataForSlugRoute,
  requirePreviewPage,
} from "@/lib/server/cms-route";
import type { SearchParams } from "@/lib/types/app";
import { Suspense } from "react";

type PreviewSlugPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PreviewSlugPageProps) {
  return previewMetadataForSlugRoute(params, searchParams);
}

export default function PreviewSlugPage({
  params,
  searchParams,
}: PreviewSlugPageProps) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewSlugBody params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function PreviewSlugBody({
  params,
  searchParams,
}: PreviewSlugPageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const page = await requirePreviewPage(pathFromSlugSegments(slug), sp);
  return <MainPage page={page} livePreview />;
}
