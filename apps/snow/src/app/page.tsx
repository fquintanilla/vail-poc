import { HomeMain } from "@/components/home-main";
import { Suspense } from "react";

export default function Home() {
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
      <HomeMain />
    </Suspense>
  );
}
