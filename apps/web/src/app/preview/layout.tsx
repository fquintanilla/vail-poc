import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Applies to every route under /preview (present and future).
 * Complemented by X-Robots-Tag (proxy + next.config) and robots.txt disallow.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
