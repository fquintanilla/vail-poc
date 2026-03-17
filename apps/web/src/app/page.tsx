import RenderComponents from "@/components/render-components";
import { getPage, getStack } from "@/lib/contentstack";
import { getPageCached } from "@/lib/server/contentstack-cached";
import { Suspense } from "react";

async function HomeMain({
  searchParams,
}: {
  searchParams: Promise<{
    live_preview?: string;
    content_type_uid?: string;
    entry_uid?: string;
    preview_timestamp?: string;
  }>;
}) {
  const { live_preview, entry_uid, content_type_uid, preview_timestamp } =
    await searchParams;

  let pageData;
  if (live_preview) {
    const stack = getStack();
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid || "",
      entryUid: entry_uid || "",
      preview_timestamp: preview_timestamp || "",
    });
    pageData = await getPage("/", stack);
  } else {
    pageData = await getPageCached("/");
  }

  return (
    <section className="p-4">
      {pageData?.title ? (
        <h1
          className="text-4xl font-bold mb-4"
          {...(pageData?.$ && pageData?.$.title)}
        >
          {pageData?.title}
        </h1>
      ) : null}

      {pageData?.page_components ? (
        <RenderComponents
          pageComponents={pageData.page_components}
          contentTypeUid="page"
          entryUid={pageData.uid}
          locale={pageData.locale}
        />
      ) : null}
    </section>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    live_preview?: string;
    content_type_uid?: string;
    entry_uid?: string;
    preview_timestamp?: string;
  }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="max-w-(--breakpoint-md) mx-auto">
          <section className="p-4">
            <p className="text-muted-foreground">Loading…</p>
          </section>
        </main>
      }
    >
      <HomeMain searchParams={searchParams} />
    </Suspense>
  );
}
