import type { Action, Image } from "./action";

type AdditionalParam = {
  headline: string;
  body: string;
  call_to_action: Action;
  image: Image;
};

export type MediaTextBlock = {
  image_alignment: "left" | "right";
  headline: string;
  body: string;
  call_to_action: Action;
  image: Image;
  $: AdditionalParam;
};

type JSONRTE = {
  type: string;
  children?: JSONRTE[];
  text?: string;
  [key: string]: any;
};

export type MediaTextBlockJsonRtf = {
  image_alignment: "left" | "right";
  headline: string;
  body: JSONRTE;
  call_to_action: Action;
  image: Image;
  $: AdditionalParam;
};
