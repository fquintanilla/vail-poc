import { RenderProps } from "@/lib/types";
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
      })}
    </div>
  );
}
