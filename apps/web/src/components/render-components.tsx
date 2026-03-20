import { RenderProps } from "@/lib/types";
import HeroBanner from "./hero-banner";
import Section from "./section";
import AboutSectionBucket from "./about-section-bucket";
import SectionBucket from "./section-bucket";
import BlogSection from "./blog-section";
import VailBanner from "./vail-banner";
import { MediaTextBlock } from "./media-text-block";
import { PromoCardGrid } from "./promo-card-grid";

export default function RenderComponents(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents.map((component, key: number) => {
        if (component.promo_card_grid) {
          return (
            <PromoCardGrid
              key={`component-${key}`}
              promoCardGrid={component.promo_card_grid}
            />
          );
        }
        if (component.media_text_block) {
          return (
            <MediaTextBlock
              key={`component-${key}`}
              mediaTextBlock={component.media_text_block}
            />
          );
        }
        if (component.vail_hero_banner) {
          return (
            <VailBanner
              key={`component-${key}`}
              banner={component.vail_hero_banner}
            />
          );
        }
        if (component.hero_banner) {
          return (
            <HeroBanner
              key={`component-${key}`}
              banner={component.hero_banner}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={`component-${key}`}
            />
          ) : (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection
              fromBlog={component.from_blog}
              key={`component-${key}`}
            />
          );
        }
      })}
    </div>
  );
}
