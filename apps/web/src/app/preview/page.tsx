import { PreviewSkeleton } from "@/components/cms/PreviewSkeleton";
import { HomeMain } from "@/components/home-main";
import { getPage } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";
import { SearchParams } from "@/lib/types/app";
import { Suspense } from "react";

export async function generateMetadata() {
  const page = await getPage("/");
  return customMetadata({ seo: page?.seo, isPreview: true });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <HomeMain pageUrl="/" searchParams={searchParams} />
    </Suspense>
  );
}
