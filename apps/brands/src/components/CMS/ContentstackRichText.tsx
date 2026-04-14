import { jsonToHtml } from "@contentstack/json-rte-serializer";
import sanitizeHtml from "sanitize-html";
import type { JSONRTENode } from "@/lib/types/contentstack";

type ContentstackRichTextProps = {
  field?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, unknown>;
    children: JSONRTENode[];
  } | null;
  className?: string;
  fieldAttributes?: Record<string, unknown>;
};

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "img",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading"],
  "*": ["class", "style"],
};

export function ContentstackRichText({
  field,
  className,
  fieldAttributes,
}: ContentstackRichTextProps) {
  if (!field?.children?.length) {
    return null;
  }

  const html = sanitizeHtml(jsonToHtml(field), {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });

  if (!html.trim()) {
    return null;
  }

  return (
    <div
      className={className}
      {...(fieldAttributes ?? {})}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
