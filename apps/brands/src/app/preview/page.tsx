import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import {
  CMS_HOME_PATH,
  previewMetadataForHomeRoute,
  requirePreviewPage,
} from "@/lib/server/cms-route";
import type { PreviewPageProps } from "@/lib/types/app";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: PreviewPageProps["searchParams"];
}) {
  return previewMetadataForHomeRoute(searchParams);
}

export default function PreviewHomePage({ searchParams }: PreviewPageProps) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewHomeBody searchParams={searchParams} />
    </Suspense>
  );
}

async function PreviewHomeBody({ searchParams }: PreviewPageProps) {
  const sp = await searchParams;
  const page = await requirePreviewPage(CMS_HOME_PATH, sp);
  return <MainPage page={page} livePreview />;
}
