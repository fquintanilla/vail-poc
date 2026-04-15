import RenderComponents from "@/components/render-components";
import { getPage, getStack } from "@/lib/contentstack";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { getRequestSiteConfig } from "@/lib/server/request-site";
import { SearchParams } from "@/lib/types/app";
import { notFound } from "next/navigation";

export async function HomeMain({
  pageUrl,
  searchParams,
}: {
  pageUrl: string;
  searchParams?: Promise<SearchParams>;
}) {
  const site = await getRequestSiteConfig();
  const params = searchParams ? await searchParams : {};
  const { live_preview, entry_uid, content_type_uid, preview_timestamp } =
    params;

  let pageData;
  if (live_preview) {
    const stack = getStack();
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid ?? "",
      entryUid: entry_uid ?? "",
      preview_timestamp: preview_timestamp ?? "",
    });
    pageData = await getPage(pageUrl, site.brand, stack);
  } else {
    pageData = await getPageCached(pageUrl, site.brand);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <>
      {pageData?.page_components ? (
        <RenderComponents
          pageComponents={pageData.page_components}
          contentTypeUid="page"
          entryUid={pageData.uid}
          locale={pageData.locale}
        />
      ) : null}
    </>
  );
}
