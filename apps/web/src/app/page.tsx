import {
  PageViewTracker,
  ScrollTracker,
} from "@/components/analytics/page-analytics-tracker";
import { HomeMain } from "@/components/home-main";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";

export async function generateMetadata() {
  const page = await getPageCached("/");
  return customMetadata({ seo: page?.seo });
}

export default async function Home() {
  return (
    <>
      <PageViewTracker
        pageName="home"
        resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
      />
      <ScrollTracker
        pageName="home"
        resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
      />
      <HomeMain />
    </>
  );
}
