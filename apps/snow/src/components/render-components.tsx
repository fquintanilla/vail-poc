import { RenderProps } from "@/lib/types";
import { SnowBanner } from "./snow-banner";
import SnowRtf from "./snow-rtf";

export default function RenderComponents(props: RenderProps) {
  const { entryUid, contentTypeUid, locale } = props;

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      <SnowBanner />
      <div className="row">
        <SnowRtf />
      </div>
    </div>
  );
}
