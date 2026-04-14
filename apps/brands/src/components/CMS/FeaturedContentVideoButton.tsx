"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import type { FeaturedContentItem } from "@/lib/types/contentstack";

type FeaturedContentVideoButtonProps = {
  item: FeaturedContentItem;
};

function getVideoEmbedUrl(rawUrl?: string) {
  if (!rawUrl) {
    return undefined;
  }

  if (rawUrl.includes("youtube.com/embed/")) {
    return rawUrl;
  }

  try {
    const url = new URL(rawUrl);
    const videoId =
      url.searchParams.get("v") ||
      url.pathname.split("/").filter(Boolean).at(-1) ||
      "";

    if (!videoId) {
      return rawUrl;
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return rawUrl;
  }
}

export function FeaturedContentVideoButton({
  item,
}: FeaturedContentVideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTitleId = useId();
  const embedUrl = useMemo(() => getVideoEmbedUrl(item.youtube_link), [item.youtube_link]);

  if (!item.image?.url || !embedUrl) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-[1.75rem] bg-[var(--featured-image-surface)] shadow-[0_28px_65px_rgba(0,0,0,0.18)]"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Play video${item.title ? `: ${item.title}` : ""}`}
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={item.image.url}
            alt={item.image.title || item.image.filename || item.title || "Video preview"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            {...((item.$?.image as Record<string, unknown>) ?? {})}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24))]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-18 items-center justify-center rounded-full bg-[var(--featured-video-button-bg)] text-[var(--featured-video-button-fg)] shadow-xl transition group-hover:scale-105">
              <Play className="ml-1 size-8 fill-current" />
            </span>
          </span>
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <h2 id={dialogTitleId} className="text-sm font-medium uppercase tracking-[0.22em]">
                {item.title || "Featured video"}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={item.title || "Featured video"}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
