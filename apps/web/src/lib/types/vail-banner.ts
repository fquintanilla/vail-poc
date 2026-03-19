import type { Action, Image } from "./action";

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
  banner_status: string;
};

export type VailBanner = {
  banner_image: Image;
  banner_title: string;
  banner_description: string;
  call_to_action: Action;
  banner_status: string;
  $: AdditionalParam;
};
