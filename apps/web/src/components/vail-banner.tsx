import Link from "next/link";
import type { VailBanner as VailBannerContent } from "@/lib/types";

type VailBannerProps = {
  banner: VailBannerContent;
};

const VailBanner = (props: VailBannerProps) => {
  const banner = props.banner;

  return (
    <section className="relative isolate min-h-[min(85vh,720px)] w-full overflow-hidden bg-banner-backdrop">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[center_30%] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${banner.banner_image.url})`,
        }}
      />

      {/* Top gradient (dark wash, theme-tinted) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-banner-scrim/70 via-banner-scrim/25 to-transparent"
      />

      {/* Diagonal cut at bottom — tweak last two Y% until it matches your eye */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-transparent [clip-path:polygon(0_0,100%_0,100%_78%,0_100%)]"
      />

      {/* Optional: slight bottom fade into page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      {/* Content card */}
      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-7xl items-end justify-end px-4 pt-24 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="relative w-full max-w-md rounded-sm border border-border/40 bg-card p-8 shadow-xl ring-1 ring-border/30 sm:p-10">
          {/* faint watermark corner — decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-4 bottom-3 select-none font-bold text-[10rem] text-muted-foreground/15 leading-none"
          >
            V
          </div>

          <div className="relative space-y-5">
            <p
              {...(banner.$?.banner_status as {})}
              className="font-sans font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.2em] sm:text-xs"
            >
              {banner.banner_status}
            </p>

            <h1
              {...(banner.$?.banner_title as {})}
              className="font-sans font-semibold text-3xl text-muted-foreground uppercase tracking-wide sm:text-4xl"
            >
              {banner.banner_title}
            </h1>

            <p
              {...(banner.$?.banner_description as {})}
              className="font-bold font-sans text-card-foreground text-sm leading-relaxed sm:text-base"
            >
              {banner.banner_description}
            </p>

            <Link
              className="inline-flex items-center justify-center bg-primary px-8 py-3 font-sans font-semibold text-primary-foreground text-xs uppercase tracking-[0.18em] transition hover:bg-primary/90"
              href={banner?.call_to_action.href}
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
