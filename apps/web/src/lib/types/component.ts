import type { Banner } from "./banner";
import type { FeaturedBlogData } from "./featured-blog";
import type { SectionWithBucket } from "./section-with-bucket";
import type { SectionProps } from "./section";
import { VailBanner } from "./vail-banner";

export type Component = {
  vail_hero_banner: VailBanner;
  hero_banner: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
};

export type RenderProps = {
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents: Component[];
};
