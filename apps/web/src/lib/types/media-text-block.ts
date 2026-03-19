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
