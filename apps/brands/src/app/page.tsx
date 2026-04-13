import { MainPage } from "@/components/MainPage";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";

export async function generateMetadata() {
  const page = await getPageCached("/");
  const { seo } = page ?? {};
  return customMetadata({ seo });
}

export default async function HomePage() {
  const page = await getPageCached("/");
  return <MainPage page={page} />;
}
