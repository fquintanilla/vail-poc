import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { cva } from "class-variance-authority";
import sanitizeHtml from "sanitize-html";
import { editableProps } from "@/lib/contentstack";
import ReactPlayer from "react-player";
import type { CSLPFieldMapping, Page } from "@/lib/types/contentstack";

type YoutubeVideoPlayerBlock = NonNullable<
  NonNullable<Page["page_components"]>[number]["youtube_video_player"]
>;

type YoutubeVideoPlayerProps = {
  data: YoutubeVideoPlayerBlock;
};

const sectionVariants = cva("my-[60px]");

const titleVariants = cva(
  "mb-2.5 text-[1.375rem] font-semibold uppercase tracking-[-0.02em] text-[var(--featured-content-title)]",
);

const bodyVariants = cva(
  "prose prose-p:my-0 prose-p:leading-7 mb-10 max-w-none text-base text-[var(--featured-content-body)] prose-headings:text-[var(--featured-content-title)] prose-strong:text-[var(--featured-content-title)] prose-a:text-[var(--featured-content-action-text)] prose-a:decoration-[var(--featured-content-action-text)]/60",
);

type EditableFieldMap = {
  title?: CSLPFieldMapping;
  body?: CSLPFieldMapping;
  youtube_link?: CSLPFieldMapping;
  youtube_video_id?: CSLPFieldMapping;
};

function renderBodyHtml(body: YoutubeVideoPlayerBlock["body"]) {
  if (!body) {
    return null;
  }

  return sanitizeHtml(jsonToHtml(body));
}

export default function YoutubeVideoPlayer({ data }: YoutubeVideoPlayerProps) {
  const bodyHtml = renderBodyHtml(data.body);
  const editableFields = (data.$ ?? {}) as EditableFieldMap;

  if (!data.title && !bodyHtml && !data.youtube_link) {
    return null;
  }

  return (
    <section className={sectionVariants()}>
      <div className="wrapper text-center">
        {data.title ? (
          <h2
            className={titleVariants()}
            {...editableProps(editableFields.title)}
          >
            {data.title}
          </h2>
        ) : null}

        {bodyHtml ? (
          <div
            className={bodyVariants()}
            {...editableProps(editableFields.body)}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : null}

        {data.youtube_link ? (
          <div
            className="relative aspect-video overflow-hidden"
            {...editableProps(editableFields.youtube_link)}
          >
            <ReactPlayer
              src={data.youtube_link}
              controls
              width="100%"
              height="100%"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
