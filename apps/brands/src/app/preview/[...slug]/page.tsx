import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { MainPage } from "@/components/MainPage";
import customMetadata from "@/lib/customMetadata";
import { getPreviewPage } from "@/lib/server/get-preview-page";
import type { SearchParams } from "@/lib/types/app";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PreviewSlugPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PreviewSlugPageProps) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const pathname = `/${slug.join("/")}`;
  const page = await getPreviewPage(pathname, sp);
  return customMetadata({ seo: page?.seo, isPreview: true });
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
  const pathname = `/${slug.join("/")}`;
  const page = await getPreviewPage(pathname, sp);
  if (!page) notFound();
  return <MainPage page={page} livePreview />;
}
