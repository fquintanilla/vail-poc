import { Action, Image } from "./action";

export type Component = {
  description: any;
  superheroes: any;
  hero_banner: Banner;
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

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_subtitle: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
};

export type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents: Component[];
};
