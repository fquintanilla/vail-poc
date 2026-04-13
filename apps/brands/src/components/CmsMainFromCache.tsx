import { MainPage } from "@/components/MainPage";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { notFound } from "next/navigation";

type CmsMainFromCacheProps = {
  pathname: string;
};

/** Published traffic: cached Contentstack read. */
export async function CmsMainFromCache({ pathname }: CmsMainFromCacheProps) {
  const page = await getPageCached(pathname);
  if (!page) notFound();
  return <MainPage page={page} />;
}
