import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import customMetadata from "@/lib/customMetadata";
import { getPreviewPage } from "@/lib/server/get-preview-page";
import type { PreviewPageProps } from "@/lib/types/app";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: PreviewPageProps["searchParams"];
}) {
  const sp = await searchParams;
  const page = await getPreviewPage("/", sp);
  return customMetadata({ seo: page?.seo, isPreview: true });
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
  const page = await getPreviewPage("/", sp);
  if (!page) notFound();
  return <MainPage page={page} livePreview />;
}
