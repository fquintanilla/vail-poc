import { PreviewSkeleton } from "@/components/cms/PreviewSkeleton";
import { HomeMain } from "@/components/home-main";
import { getPage } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";
import { SearchParams } from "@/lib/types/app";
import { Suspense } from "react";

function getPageUrl(page: string[]) {
  return `/${page.join("/")}`;
}

async function PreviewPageContent({
  params,
  searchParams,
}: {
  params: Promise<{ page: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await params;

  return <HomeMain pageUrl={getPageUrl(page)} searchParams={searchParams} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page } = await params;
  const pageData = await getPage(getPageUrl(page));

  return customMetadata({ seo: pageData?.seo, isPreview: true });
}

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
