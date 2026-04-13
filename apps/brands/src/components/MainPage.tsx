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
    <div>
      <h1>Home Page Shell</h1>
    </div>
  );
}
