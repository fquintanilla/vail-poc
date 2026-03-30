import { RenderProps } from "@/lib/types";

export default function RenderComponents(props: RenderProps) {
  const { entryUid, contentTypeUid, locale } = props;

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    ></div>
  );
}
