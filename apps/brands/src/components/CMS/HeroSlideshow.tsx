import Image from "next/image";
import { HeroSlideshowCarousel } from "@/components/CMS/HeroSlideshowCarousel";
import { ContentstackRichText } from "@/components/CMS/ContentstackRichText";
import type { HeroSlideshow as HeroSlideshowType } from "@/lib/types/contentstack";

type HeroSlideshowProps = {
  hero: HeroSlideshowType;
  variant?: "default" | "secondary" | "tertiary";
};

function getTextAlignmentClass(alignment?: "left" | "center" | "right" | null) {
  switch (alignment) {
    case "center":
      return "items-center text-center";
    case "right":
      return "items-end text-right";
    default:
      return "items-start text-left";
  }
}

function getOverlayPositionClass(location?: "ce" | "se" | "sw" | null) {
  switch (location) {
    case "ce":
      return "right-[8%] top-1/2 -translate-y-1/2";
    case "se":
      return "bottom-[12%] right-[8%]";
    case "sw":
      return "bottom-[12%] left-[8%]";
    default:
      return "right-[8%] top-1/2 -translate-y-1/2";
  }
}

function getHeroHeightClass(useOriginalAspectRatioOnMobile: boolean) {
  return useOriginalAspectRatioOnMobile
    ? "min-h-[23rem] sm:min-h-[28rem] lg:min-h-[39rem]"
    : "aspect-[4/3] min-h-[22rem] sm:min-h-[24rem] md:aspect-auto md:min-h-[34rem] lg:min-h-[39rem]";
}

export function HeroSlideshow({
  hero,
  variant = "default",
}: HeroSlideshowProps) {
  const slides = hero.slides.filter(
    (slide) => slide.image?.url || hero.layout?.overlay_image?.url,
  );

  if (slides.length > 1) {
    return <HeroSlideshowCarousel hero={hero} variant={variant} />;
  }

  const slide = slides[0];
  const showSlideOnly = hero.layout?.show_slide_only ?? false;
  const showTextOnImage = hero.layout?.apply_text_over_image ?? false;
  const textAlignmentClass = getTextAlignmentClass(hero.layout?.text_alignment);
  const overlayPositionClass = getOverlayPositionClass(
    hero.layout?.overlay_location ?? null,
  );
  const heroHeightClass = getHeroHeightClass(
    hero.layout?.use_original_aspect_ration_on_mobile ?? true,
  );
  const backgroundImage = slide?.image;
  const overlayImage = hero.layout?.overlay_image;

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--hero-border)] bg-[var(--hero-surface)]"
      data-hero-variant={variant}
    >
      <div className={`relative ${heroHeightClass}`}>
        {backgroundImage ? (
          <Image
            src={backgroundImage.url}
            alt={
              backgroundImage.title ||
              backgroundImage.filename ||
              slide?.title ||
              "Hero image"
            }
            fill
            priority
            sizes="100vw"
            className="object-cover"
            {...((slide?.$?.image as Record<string, unknown>) ?? {})}
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_48%),linear-gradient(135deg,var(--hero-fallback-top),var(--hero-fallback-bottom))]"
            {...((hero.layout?.$?.overlay_image as Record<string, unknown>) ??
              {})}
          />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--hero-gradient-top),var(--hero-gradient-bottom))]" />

        {overlayImage ? (
          <div
            className={`pointer-events-none absolute z-[1] hidden w-[18vw] min-w-[8rem] max-w-[14rem] opacity-95 md:block ${overlayPositionClass}`}
          >
            <Image
              src={overlayImage.url}
              alt=""
              width={overlayImage.dimension?.width ?? 240}
              height={overlayImage.dimension?.height ?? 240}
              className="h-auto w-full drop-shadow-[0_16px_36px_var(--hero-overlay-shadow)]"
            />
          </div>
        ) : null}

        {!showSlideOnly ? (
          <div
            className={`absolute inset-x-0 z-[2] flex ${showTextOnImage ? "bottom-0 top-0 items-end md:items-center" : "bottom-0 items-end"}`}
          >
            <div className="wrapper w-full pb-8 pt-24 md:py-12">
              <div
                className={`flex max-w-3xl flex-col gap-4 ${textAlignmentClass} ${showTextOnImage ? "rounded-[2rem] bg-[color-mix(in_oklch,var(--hero-panel),transparent_28%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-8" : "rounded-t-[2rem] bg-[color-mix(in_oklch,var(--hero-panel),transparent_12%)] p-6 shadow-[0_-12px_40px_rgba(0,0,0,0.08)] md:max-w-[42rem] md:p-8"}`}
              >
                {hero.image_for_title?.url ? (
                  <Image
                    src={hero.image_for_title.url}
                    alt={
                      hero.image_for_title.title ||
                      hero.image_for_title.filename ||
                      "Hero title logo"
                    }
                    width={hero.image_for_title.dimension?.width ?? 240}
                    height={hero.image_for_title.dimension?.height ?? 96}
                    className="h-auto max-h-24 w-auto max-w-[12rem] md:max-w-[14rem]"
                    {...((hero.$?.image_for_title as Record<string, unknown>) ??
                      {})}
                  />
                ) : null}

                {slide?.subtitle ? (
                  <p
                    className="text-sm font-medium uppercase tracking-[0.26em] text-[var(--hero-kicker)]"
                    {...((slide.$?.subtitle as Record<string, unknown>) ?? {})}
                  >
                    {slide.subtitle}
                  </p>
                ) : null}

                {slide?.title ? (
                  <h1
                    className="max-w-[18ch] text-balance text-4xl font-bold leading-none text-[var(--hero-heading)] sm:text-5xl lg:text-7xl"
                    {...((slide.$?.title as Record<string, unknown>) ?? {})}
                  >
                    {slide.title}
                  </h1>
                ) : null}

                <ContentstackRichText
                  field={slide?.body}
                  fieldAttributes={slide?.$?.body as Record<string, unknown>}
                  className="prose prose-lg max-w-[54ch] text-[var(--hero-copy)] prose-headings:text-[var(--hero-heading)] prose-p:my-0 prose-a:text-[var(--hero-link)] prose-strong:text-[var(--hero-heading)]"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
