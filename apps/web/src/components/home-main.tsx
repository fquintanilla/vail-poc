import RenderComponents from "@/components/render-components";
import { getPage, getStack } from "@/lib/contentstack";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { SearchParams } from "@/lib/types/app";

export async function HomeMain({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
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
    pageData = await getPage("/", stack);
  } else {
    pageData = await getPageCached("/");
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
