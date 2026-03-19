import React from "react";
import type { VailBanner } from "@/lib/types";
import Link from "next/link";

type VailBannerProps = {
  banner: VailBanner;
};

const VailBanner = (props: VailBannerProps) => {
  const banner = props.banner;

  return (
    <section className="relative isolate min-h-[min(85vh,720px)] w-full overflow-hidden bg-slate-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_30%] bg-no-repeat"
        style={{
          backgroundImage: `url(${banner.banner_image.url})`,
        }}
      />

      {/* Top gradient (dark blue wash) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-transparent"
        aria-hidden
      />

      {/* Diagonal cut at bottom — tweak last two Y% until it matches your eye */}
      <div
        className="pointer-events-none absolute inset-0 bg-transparent [clip-path:polygon(0_0,100%_0,100%_78%,0_100%)]"
        aria-hidden
      />

      {/* Optional: slight bottom fade into white page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />

      {/* Content card */}
      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-7xl items-end justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16 lg:px-8">
        <div className="relative w-full max-w-md rounded-sm bg-white p-8 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.35)] sm:p-10">
          {/* faint watermark corner — decorative */}
          <div
            className="pointer-events-none absolute bottom-3 right-4 text-[10rem] font-bold leading-none text-slate-100 select-none"
            aria-hidden
          >
            V
          </div>

          <div className="relative space-y-5">
            <p
              {...(banner.$?.banner_status as {})}
              className="font-sans text-[11px] font-semibold tracking-[0.2em] text-slate-600 uppercase sm:text-xs"
            >
              {banner.banner_status}
            </p>

            <h1
              {...(banner.$?.banner_title as {})}
              className="font-sans text-3xl font-semibold tracking-wide text-slate-400 uppercase sm:text-4xl"
            >
              {banner.banner_title}
            </h1>

            <p
              {...(banner.$?.banner_description as {})}
              className="font-sans text-sm font-bold leading-relaxed text-slate-800 sm:text-base"
            >
              {banner.banner_description}
            </p>

            <Link
              href={banner?.call_to_action.href}
              className="inline-flex items-center justify-center bg-slate-700 px-8 py-3 font-sans text-xs font-semibold tracking-[0.18em] text-white uppercase transition hover:bg-slate-800"
              {...banner.call_to_action.$?.title}
            >
              {banner?.call_to_action.title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VailBanner;
