"use client";

import { OtherResort, OtherResorts } from "@/lib/types/other-resorts";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type ResortDropdownProps = {
  items?: OtherResort[];
  menuLabel?: string;
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ResortDropdown({
  items,
  menuLabel = "Other resorts",
}: ResortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!items) return null;

  return (
    <div className="relative hidden sm:block" ref={containerRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={menuLabel}
        className="flex items-center gap-1 rounded text-white/80 hover:text-white"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <ChevronDownIcon
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          aria-label={menuLabel}
          className="absolute top-full left-0 z-50 mt-1 min-w-48 rounded-md border border-white/15 bg-slate-900/98 py-1 shadow-lg backdrop-blur-md"
          id={listId}
        >
          {items.map((item) => (
            <li key={`${item.title}-${item.href}`}>
              <a
                className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                href={item.href}
                onClick={close}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
