import { MainPage } from "@/components/MainPage";
import customMetadata from "@/lib/customMetadata";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function cmsPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = await getPageCached(cmsPathFromSlug(slug));
  return customMetadata({ seo: page?.seo });
}

export default function CmsPathPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <Suspense>
      <CmsPathPageContent params={params} />
    </Suspense>
  );
}

async function CmsPathPageContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathname = cmsPathFromSlug(slug);
  const page = await getPageCached(pathname);
  if (!page) {
    notFound();
  }

  return <MainPage page={page} />;
}
