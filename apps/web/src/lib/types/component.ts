import { VailBanner } from "./vail-banner";
import { MediaTextBlock } from "./media-text-block";
import { PromoCardGrid } from "./promo-card-grid";

export type Component = {
  vail_hero_banner: VailBanner;
  media_text_block: MediaTextBlock;
  promo_card_grid: PromoCardGrid;
};

export type RenderProps = {
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents: Component[];
};
