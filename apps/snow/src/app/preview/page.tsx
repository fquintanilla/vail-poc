import { HomeMain } from "@/components/home-main";
import { Suspense } from "react";

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
