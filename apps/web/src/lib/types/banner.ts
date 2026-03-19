import type { Action, Image } from './action';

type AdditionalParam = {
  banner_title: string;
  banner_subtitle: string;
  banner_description: string;
};

export type Banner = {
  banner_title: string;
  banner_subtitle: string;
  banner_description: string;
  bg_color: string;
  call_to_action: Action;
  banner_image: Image;
  text_color: string;
  $: AdditionalParam;
};
