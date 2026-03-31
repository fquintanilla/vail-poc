import { PreviewSkeleton } from "@/components/cns/PreviewSkeleton";
import { HomePageShell } from "@/components/HomePageShell";
import { PreviewPageProps } from "@/lib/types/app";
import { Suspense } from "react";

export default function PreviewHomePage({ searchParams }: PreviewPageProps) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <PreviewHomePageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PreviewHomePageContent({ searchParams }: PreviewPageProps) {
  const sp = await searchParams;
  console.log("sp", sp);

  return <HomePageShell livePreview />;
}
