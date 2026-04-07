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

  const robots = isPreview
    ? {
        index: false as const,
        follow: false as const,
        nocache: true as const,
        googleBot: {
          index: false as const,
          follow: false as const,
          noimageindex: true as const,
          "max-image-preview": "none" as const,
          "max-snippet": -1 as const,
          "max-video-preview": -1 as const,
        },
      }
    : {
        index: searchIndexing,
        follow: searchIndexing,
      };

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(keywords ? { keywords } : {}),
    robots,
  };
}
