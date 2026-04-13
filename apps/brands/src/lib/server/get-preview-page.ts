import { getPage, getStack } from "@/lib/contentstack";
import type { SearchParams } from "@/lib/types/app";

/** Preview / Live Preview: uncached. May run twice per request (metadata + body). */
export async function getPreviewPage(pathname: string, sp: SearchParams) {
  const stack = getStack();
  const { live_preview, content_type_uid, entry_uid, preview_timestamp } = sp;
  if (live_preview) {
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid ?? "",
      entryUid: entry_uid ?? "",
      preview_timestamp: preview_timestamp ?? "",
    });
  }
  return getPage(pathname, stack);
}
