import { CmsMainFromCache } from "@/components/CmsMainFromCache";
import customMetadata from "@/lib/customMetadata";
import { loadPublishedPage } from "@/lib/server/load-published-page";
import { Suspense } from "react";

type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;
  const page = await loadPublishedPage(pathname);
  return customMetadata({ seo: page?.seo });
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
  const pathname = `/${slug.join("/")}`;
  return <CmsMainFromCache pathname={pathname} />;
}
