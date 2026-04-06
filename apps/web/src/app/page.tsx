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
      <HomeMain />
    </Suspense>
  );
}
