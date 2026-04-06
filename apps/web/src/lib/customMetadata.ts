import { Seo } from "@/lib/contentstack/types";

export default function customMetadata({
  seo,
  isPreview = false,
}: {
  seo: Seo | undefined;
  isPreview?: boolean;
}) {
  const title = seo?.meta_title || undefined;
  const description = seo?.meta_description || undefined;
  const keywords = seo?.keywords || undefined;
  let searchIndexing = seo?.enable_search_indexing === true;
  if (isPreview) {
    searchIndexing = false;
  }

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(keywords ? { keywords } : {}),
    robots: {
      index: searchIndexing,
      follow: searchIndexing,
    },
  };
}
