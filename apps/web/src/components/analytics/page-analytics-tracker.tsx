"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { PageScrolledEvent, PageViewedEvent } from "@/lib/analytics/events";

type PageViewTrackerProps = {
  pageName: string;
  resort: string;
};

async function postAnalyticsEvent(event: PageViewedEvent | PageScrolledEvent) {
  await fetch("/api/collect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
    keepalive: true,
  });
}

export function PageViewTracker({
  pageName,
  resort,
}: PageViewTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams.toString();
    const relativeUrl = search ? `${pathname}?${search}` : pathname;
    const absoluteUrl = window.location.href;
    const trackingKey = `${pageName}:${absoluteUrl}`;

    if (lastTrackedKeyRef.current === trackingKey) {
      return;
    }

    lastTrackedKeyRef.current = trackingKey;

    const event: PageViewedEvent = {
      event: "page_viewed",
      properties: {
        pageName,
        path: relativeUrl,
        url: absoluteUrl,
        resort,
        referrer: document.referrer || null,
      },
    };

    void postAnalyticsEvent(event).catch(() => {
      // Tracking should never block the user journey.
    });
  }, [pageName, pathname, resort, searchParams]);

  return null;
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

type ScrollTrackerProps = {
  pageName: string;
  resort: string;
};

export function ScrollTracker({ pageName, resort }: ScrollTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firedThresholdsRef = useRef<Set<number>>(new Set());
  const trackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams.toString();
    const relativeUrl = search ? `${pathname}?${search}` : pathname;
    const absoluteUrl = window.location.href;

    if (trackedUrlRef.current !== absoluteUrl) {
      trackedUrlRef.current = absoluteUrl;
      firedThresholdsRef.current = new Set();
    }

    const trackScrollDepth = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = Math.max(documentHeight - viewportHeight, 0);

      const scrollDepth =
        scrollableHeight === 0
          ? 100
          : Math.min(
              100,
              Math.round(((scrollTop + viewportHeight) / documentHeight) * 100),
            );

      for (const threshold of SCROLL_THRESHOLDS) {
        if (
          scrollDepth >= threshold &&
          !firedThresholdsRef.current.has(threshold)
        ) {
          firedThresholdsRef.current.add(threshold);

          const event: PageScrolledEvent = {
            event: "page_scrolled",
            properties: {
              pageName,
              path: relativeUrl,
              url: absoluteUrl,
              resort,
              scrollDepth: threshold,
            },
          };

          void postAnalyticsEvent(event).catch(() => {
            // Tracking should never block the user journey.
          });
        }
      }
    };

    trackScrollDepth();
    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    window.addEventListener("resize", trackScrollDepth);

    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      window.removeEventListener("resize", trackScrollDepth);
    };
  }, [pageName, pathname, resort, searchParams]);

  return null;
}
