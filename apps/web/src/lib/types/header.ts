import { Image } from "./action";
import { OtherResorts } from "./other-resorts";

export type ResortHeaderNavLink = {
  nav_label: string;
  nav_href: string;
  open_in_new_tab?: boolean;
};

export type ResortHeaderData = {
  logo_emblem_url?: string;
  logo_emblem_alt: string;
  show_resort_dropdown: boolean;
  weather_temperature_text: string;
  sign_in_label: string;
  sign_in_url: string;
  cart_url: string;
  cart_aria_label: string;
  search_url?: string;
  search_aria_label: string;
};

export type Header = {
  [x: string]: any;
  uid: string;
  locale: string;
  title: string;
  logo: Image;
  notification_bar: {
    show_announcement: boolean;
    announcement_text: string;
  };
  other_resort_sites?: OtherResorts;
  navigation_menu: [
    {
      label: string;
      page_reference: [
        {
          title: string;
          url: string;
        },
      ];
    },
  ];
};
