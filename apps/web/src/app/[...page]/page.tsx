import {
  PageViewTracker,
  ScrollTracker,
} from "@/components/analytics/page-analytics-tracker";
import { HomeMain } from "@/components/home-main";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { Suspense } from "react";

function getPageUrl(page: string[]) {
  return `/${page.join("/")}`;
}

async function DynamicPageContent({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page } = await params;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PageViewTracker
          pageName="home"
          resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
        />
        <ScrollTracker
          pageName="home"
          resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
        />
      </Suspense>
      <HomeMain pageUrl={getPageUrl(page)} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page } = await params;
  const pageData = await getPageCached(getPageUrl(page));

  return customMetadata({ seo: pageData?.seo });
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicPageContent params={params} />
    </Suspense>
  );
}
