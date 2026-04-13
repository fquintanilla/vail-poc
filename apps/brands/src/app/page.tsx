import { HomePageShell } from "@/components/HomePageShell";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";

export async function generateMetadata() {
  const page = await getPageCached("/");
  return customMetadata({ seo: page?.seo });
}

export default function HomePage() {
  return <HomePageShell />;
}
