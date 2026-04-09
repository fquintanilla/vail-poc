import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ContentstackLivePreview } from "@/components/ContentstackLivePreview";
import { env } from "process";
import { ResortHeader } from "@/components/header";
import { DUMMY_RESORT_HEADER_DATA } from "@/lib/dummy/header-data";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export const metadata: Metadata = {
  title: {
    default: "Vail Resort",
    template: "%s | Vail Resort",
  },
};

export const viewport: Viewport = {
  themeColor: "#317EFB",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={env.NEXT_PUBLIC_THEME}>
      <head></head>
      <body>
        {env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true" ? (
          <div
            role="alert"
            className="sticky top-0 z-50 w-full border-b border-amber-500/50 bg-amber-500/95 px-4 py-2 text-center text-sm font-medium text-amber-950 shadow-sm backdrop-blur-sm"
          >
            You are viewing the <strong>preview site</strong>. Content may be
            unpublished or in draft.
          </div>
        ) : null}

        <Suspense fallback={<Skeleton className="h-14 w-full" />}>
          <ResortHeader data={DUMMY_RESORT_HEADER_DATA} />
        </Suspense>

        <main className="mainClass">{children}</main>
        <ContentstackLivePreview />
      </body>
    </html>
  );
}
