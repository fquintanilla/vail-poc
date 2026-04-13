import type { Page } from "@/lib/types/contentstack";

interface MainPageProps {
  page?: Page;
  livePreview?: boolean;
}

export function MainPage({ page, livePreview }: MainPageProps) {
  if (!page) {
    return null;
  }

  console.log({ page, livePreview });

  return (
    <div>
      <h1>Home Page Shell</h1>
    </div>
  );
}
