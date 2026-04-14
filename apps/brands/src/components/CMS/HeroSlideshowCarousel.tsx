"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentstackLink, getContentstackHref } from "@/components/CMS/ContentstackLink";
import { ContentstackRichText } from "@/components/CMS/ContentstackRichText";
import type { HeroSlideshow } from "@/lib/types/contentstack";

type HeroSlideshowCarouselProps = {
  hero: HeroSlideshow;
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

export function HeroSlideshowCarousel({
  hero,
  variant = "default",
}: HeroSlideshowCarouselProps) {
  const slides = useMemo(
    () => hero.slides.filter((slide) => slide.image?.url || hero.layout?.overlay_image?.url),
    [hero.layout?.overlay_image?.url, hero.slides],
  );
  const autoplayDelay = (hero.auto_play_slideshow_interval ?? 3) * 1000;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(slides.length > 1);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isPlaying || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [autoplayDelay, emblaApi, isPlaying, slides.length]);

  if (!slides.length) {
    return null;
  }

  const showSlideOnly = hero.layout?.show_slide_only ?? false;
  const showTextOnImage = hero.layout?.apply_text_over_image ?? false;
  const textAlignmentClass = getTextAlignmentClass(hero.layout?.text_alignment);
  const overlayPositionClass = getOverlayPositionClass(
    hero.layout?.overlay_location ?? null,
  );
  const heroHeightClass = getHeroHeightClass(
    hero.layout?.use_original_aspect_ration_on_mobile ?? true,
  );

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--hero-border)] bg-[var(--hero-surface)]"
      data-hero-variant={variant}
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
    >
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => {
              const image = slide.image;
              const overlayImage = hero.layout?.overlay_image;
              const ctaHref = getContentstackHref(slide.link);

              return (
                <article
                  key={slide._metadata?.uid ?? `${slide.title ?? "hero-slide"}-${index}`}
                  className="relative min-w-0 flex-[0_0_100%]"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${slides.length}`}
                >
                  <div className={`relative ${heroHeightClass}`}>
                    {image ? (
                      <>
                        {ctaHref ? (
                          <ContentstackLink
                            link={slide.link}
                            fieldAttributes={slide.$?.link as Record<string, unknown>}
                            ariaLabel={slide.title || "Hero slide link"}
                            className="absolute inset-0 z-10 block"
                          >
                            <span className="sr-only">{slide.title || "Open hero slide"}</span>
                          </ContentstackLink>
                        ) : null}
                        <Image
                          src={image.url}
                          alt={image.title || image.filename || slide.title || "Hero image"}
                          fill
                          priority={index === 0}
                          sizes="100vw"
                          className="object-cover"
                          {...((slide.$?.image as Record<string, unknown>) ?? {})}
                        />
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_48%),linear-gradient(135deg,var(--hero-fallback-top),var(--hero-fallback-bottom))]"
                        {...((hero.layout?.$?.overlay_image as Record<string, unknown>) ?? {})}
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
                                {...((hero.$?.image_for_title as Record<string, unknown>) ?? {})}
                              />
                            ) : null}

                            {slide.subtitle ? (
                              <p
                                className="text-sm font-medium uppercase tracking-[0.26em] text-[var(--hero-kicker)]"
                                {...((slide.$?.subtitle as Record<string, unknown>) ?? {})}
                              >
                                {slide.subtitle}
                              </p>
                            ) : null}

                            {slide.title ? (
                              <h1
                                className="max-w-[18ch] text-balance text-4xl font-bold leading-none text-[var(--hero-heading)] sm:text-5xl lg:text-7xl"
                                {...((slide.$?.title as Record<string, unknown>) ?? {})}
                              >
                                {slide.title}
                              </h1>
                            ) : null}

                            <ContentstackRichText
                              field={slide.body}
                              fieldAttributes={slide.$?.body as Record<string, unknown>}
                              className="prose prose-lg max-w-[54ch] text-[var(--hero-copy)] prose-headings:text-[var(--hero-heading)] prose-p:my-0 prose-a:text-[var(--hero-link)] prose-strong:text-[var(--hero-heading)]"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="absolute inset-x-0 bottom-4 z-[3]">
            <div className="wrapper flex justify-end">
              <div className="flex items-center gap-2 rounded-full border border-[var(--hero-control-border)] bg-[var(--hero-control-surface)] px-2 py-2 shadow-lg backdrop-blur">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="flex size-10 items-center justify-center rounded-full text-[var(--hero-control-foreground)] transition hover:bg-white/35 focus-visible:bg-white/35"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex items-center gap-2 px-1">
                  {slides.map((slide, index) => (
                    <button
                      key={slide._metadata?.uid ?? `hero-dot-${index}`}
                      type="button"
                      onClick={() => emblaApi?.scrollTo(index)}
                      className="group flex size-6 items-center justify-center"
                      aria-label={`Go to slide ${index + 1}`}
                      aria-pressed={selectedIndex === index}
                    >
                      <span
                        className={`block size-2.5 rounded-full border border-[var(--hero-dot-border)] transition ${selectedIndex === index ? "bg-[var(--hero-dot-active)]" : "bg-[var(--hero-dot)] group-hover:bg-[var(--hero-dot-active)]/70"}`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="flex size-10 items-center justify-center rounded-full text-[var(--hero-control-foreground)] transition hover:bg-white/35 focus-visible:bg-white/35"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  aria-pressed={isPlaying}
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="flex size-10 items-center justify-center rounded-full text-[var(--hero-control-foreground)] transition hover:bg-white/35 focus-visible:bg-white/35"
                  aria-label="Next slide"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
