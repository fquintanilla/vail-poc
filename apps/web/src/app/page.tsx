import {
  PageViewTracker,
  ScrollTracker,
} from "@/components/analytics/page-analytics-tracker";
import { HomeMain } from "@/components/home-main";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { getRequestSiteConfig } from "@/lib/server/request-site";
import { Suspense } from "react";

export async function generateMetadata() {
  const site = await getRequestSiteConfig();
  const page = await getPageCached("/", site.brand);
  return customMetadata({ seo: page?.seo });
}

async function HomeTrackers() {
  const site = await getRequestSiteConfig();

  return (
    <>
      <PageViewTracker pageName="home" resort={site.brand} />
      <ScrollTracker pageName="home" resort={site.brand} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <HomeTrackers />
      </Suspense>
      <Suspense fallback={null}>
        <HomeMain pageUrl="/" />
      </Suspense>
    </>
  );
}
