import { CmsMainFromCache } from "@/components/CmsMainFromCache";
import customMetadata from "@/lib/customMetadata";
import { loadPublishedPage } from "@/lib/server/load-published-page";

export async function generateMetadata() {
  const page = await loadPublishedPage("/");
  return customMetadata({ seo: page?.seo });
}

export default function HomePage() {
  return <CmsMainFromCache pathname="/" />;
}
