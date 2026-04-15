import {
  PageViewTracker,
  ScrollTracker,
} from "@/components/analytics/page-analytics-tracker";
import { HomeMain } from "@/components/home-main";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { getRequestSiteConfig } from "@/lib/server/request-site";
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
  const site = await getRequestSiteConfig();

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker pageName="home" resort={site.brand} />
        <ScrollTracker pageName="home" resort={site.brand} />
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
  const site = await getRequestSiteConfig();
  const pageData = await getPageCached(getPageUrl(page), site.brand);

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
