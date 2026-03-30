import type { Viewport } from "next";
import { ContentstackLivePreview } from "@/components/ContentstackLivePreview";
import { env } from "process";
import { fontPrompt } from "@/lib/fonts";
import "@/app/globals.css";

export const viewport: Viewport = {
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
    <html
      lang="en"
      data-theme={env.NEXT_PUBLIC_THEME}
      className={fontPrompt.variable}
    >
      <body className="font-sans antialiased">
        <main>
          <span>Homepage</span>
          {children}
        </main>
        <ContentstackLivePreview />
      </body>
    </html>
  );
}
