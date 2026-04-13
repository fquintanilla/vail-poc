import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";
import { HomePageShell } from "@/components/HomePageShell";
import { getPage } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";
import type { PreviewPageProps } from "@/lib/types/app";
import { Suspense } from "react";

export async function generateMetadata() {
  const page = await getPage("/");
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
  return <HomePageShell livePreview />;
}
