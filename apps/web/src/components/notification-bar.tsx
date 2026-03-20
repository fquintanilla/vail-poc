"use client";

import { useEffect, useId, useState } from "react";

type NotificationBarProps = {
  show?: boolean;
  announcement_text?: string;
};

export function NotificationBar({
  show,
  announcement_text,
}: NotificationBarProps) {
  const labelId = useId();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!show) {
      setReady(true);
      return;
    }
    setReady(true);
  }, [show]);

  if (!show) return null;
  if (!ready || dismissed) return null;

  return (
    <div
      aria-labelledby={labelId}
      className="sticky top-0 z-[60] w-full border-b border-black/20"
      role="region"
      style={{ backgroundColor: "#f2a93b" }}
    >
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <p
          className="text-center text-xs font-normal tracking-wide text-black uppercase sm:text-sm"
          id={labelId}
        >
          <span>{announcement_text?.trim() ?? ""}</span>
        </p>

        {false ? (
          <button
            aria-label="Close announcement"
            className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded text-black hover:bg-black/10 sm:right-4"
            onClick={() => {}}
            type="button"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
