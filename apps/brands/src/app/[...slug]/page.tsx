import { CmsMainFromCache } from "@/components/CmsMainFromCache";
import {
  pathFromSlugSegments,
  publishMetadataForPath,
} from "@/lib/server/cms-route";
import { Suspense } from "react";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  return publishMetadataForPath(pathFromSlugSegments(slug));
}

export default function CmsPathPage({ params }: SlugPageProps) {
  return (
    <Suspense>
      <CmsPathBody params={params} />
    </Suspense>
  );
}

async function CmsPathBody({ params }: SlugPageProps) {
  const { slug } = await params;
  return <CmsMainFromCache pathname={pathFromSlugSegments(slug)} />;
}
