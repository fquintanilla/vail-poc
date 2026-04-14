import { RenderPageComponents } from "@/components/RenderPageComponents";
import type { Page } from "@/lib/types/contentstack";

interface MainPageProps {
  page?: Page;
  livePreview?: boolean;
}

export function MainPage({ page, livePreview: _livePreview }: MainPageProps) {
  if (!page) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header> Header </header>
      <hr />
      <main className="grow">
        <RenderPageComponents page={page} />
      </main>
      <hr />
      <footer> Footer </footer>
    </div>
  );
}
