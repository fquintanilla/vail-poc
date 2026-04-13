import { MainPage } from "@/components/MainPage";
import { loadPublishedPage } from "@/lib/server/load-published-page";
import { notFound } from "next/navigation";

type CmsMainFromCacheProps = {
  pathname: string;
};

export async function CmsMainFromCache({ pathname }: CmsMainFromCacheProps) {
  const page = await loadPublishedPage(pathname);
  if (!page) notFound();
  return <MainPage page={page} />;
}
