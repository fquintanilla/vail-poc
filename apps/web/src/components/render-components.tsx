import { RenderProps } from "@/lib/types";
import HeroBanner from "./hero-banner";

export default function RenderComponents(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents.map((component, key: number) => {
        if (component.hero_banner) {
          return (
            <HeroBanner
              key={`component-${key}`}
              banner={component.hero_banner}
            />
          );
        }
      })}
    </div>
  );
}
