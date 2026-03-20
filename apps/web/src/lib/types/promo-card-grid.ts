import type { Action, Image } from "./action";

type AdditionalParam = {
  card_title: string;
  card_body: string;
};

export type PromoCard = {
  card_title: string;
  card_body: string;
  call_to_action: Action;
  card_image: Image;
  $: AdditionalParam;
};

export type PromoCardGrid = {
  promo_cards: PromoCard[];
};
