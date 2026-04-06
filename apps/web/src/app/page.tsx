import { HomeMain } from "@/components/home-main";
import { getPage } from "@/lib/contentstack";
import customMetadata from "@/lib/customMetadata";

export async function generateMetadata() {
  const page = await getPage("/");
  return customMetadata({ seo: page?.seo });
}

export default async function Home() {
  return <HomeMain />;
}
