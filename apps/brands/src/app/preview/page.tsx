import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";
import type { PreviewPageProps } from "@/lib/types/app";
import { Suspense } from "react";

export async function generateMetadata() {
  const page = await getPageCached("/");
  return customMetadata({ seo: page?.seo, isPreview: true });
}

export default function PreviewHomePage({ searchParams }: PreviewPageProps) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewHomePageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PreviewHomePageContent({ searchParams }: PreviewPageProps) {
  await searchParams;
  const page = await getPageCached("/");
  return <MainPage page={page} livePreview={true} />;
}
