import {
  PageViewTracker,
  ScrollTracker,
} from "@/components/analytics/page-analytics-tracker";
import { HomeMain } from "@/components/home-main";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense
      fallback={
        <main className="max-w-(--breakpoint-md) mx-auto">
          <section className="p-4">
            <p className="text-muted-foreground">Loading the page…</p>
          </section>
        </main>
      }
    >
      <>
        <PageViewTracker
          pageName="home"
          resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
        />
        <ScrollTracker
          pageName="home"
          resort={process.env.NEXT_PUBLIC_BRAND ?? "unknown"}
        />
        <HomeMain />
      </>
    </Suspense>
  );
}
