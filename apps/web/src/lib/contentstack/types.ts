type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: PublishDetails;
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export type TaxonomyEntry = Taxonomy & { term_uid: string };

export interface JSONRTENode {
  type: string;
  uid: string;
  _version: number;
  attrs: Record<string, any>;
  children?: JSONRTENode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  embed?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
  };
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute | string;

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

export type ModularBlocksExtension<T> = {
  [P in keyof T]?: T[P] & { _metadata?: { uid?: string } };
};

export interface PromoCardGrid {
  _version?: number;
  promo_cards: MaxTuple<
    {
      card_image?: File | null;
      card_title?: string;
      card_body?: {
        type: string;
        uid: string;
        _version: number;
        attrs: Record<string, any>;
        children: JSONRTENode[];
      };
      call_to_action?: Link;
      $?: {
        card_image?: CSLPFieldMapping;
        card_title?: CSLPFieldMapping;
        card_body?: CSLPFieldMapping;
        call_to_action?: CSLPFieldMapping;
      };
    },
    4
  >;
  $?: {
    promo_cards?: CSLPFieldMapping;
  };
}

export interface PackageCategoryBanner {
  _version?: number;
  title?: string;
  image?: File | null;
  categories?: {
    title?: string;
    description?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    $?: {
      title?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    categories?: CSLPFieldMapping;
  };
}

export interface Cta {
  _version?: number;
  link_name: string;
  link_title?: string;
  open_in?: ("_blank" | "_self") | null;
  page?: Page[];
  external_link?: string;
  $?: {
    link_name?: CSLPFieldMapping;
    link_title?: CSLPFieldMapping;
    open_in?: CSLPFieldMapping;
    page?: CSLPFieldMapping;
    external_link?: CSLPFieldMapping;
  };
}

export interface PromoCard {
  _version?: number;
  headline?: string;
  description?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  call_to_action?: Link;
  background_image?: File | null;
  icon?: File | null;
  $?: {
    headline?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
    background_image?: CSLPFieldMapping;
    icon?: CSLPFieldMapping;
  };
}

export interface AddToCartModal {
  _version?: number;
  title?: string;
  confirmation_message?: string;
  $?: {
    title?: CSLPFieldMapping;
    confirmation_message?: CSLPFieldMapping;
  };
}

export interface MediaTextBlockJsonRtf {
  _version?: number;
  image_alignment?: ("Left" | "Right") | null;
  image?: File | null;
  headline?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  call_to_action?: Link;
  $?: {
    image_alignment?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    headline?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
  };
}

export interface MediaTextBlock {
  _version?: number;
  image_alignment?: ("Left" | "Right") | null;
  image?: File | null;
  headline?: string;
  body?: string;
  call_to_action?: Link;
  $?: {
    image_alignment?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    headline?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
  };
}

export interface VailHeroBanner {
  _version?: number;
  banner_image?: File | null;
  banner_title?: string;
  banner_description?: string;
  call_to_action?: Link;
  banner_status?: string;
  $?: {
    banner_image?: CSLPFieldMapping;
    banner_title?: CSLPFieldMapping;
    banner_description?: CSLPFieldMapping;
    call_to_action?: CSLPFieldMapping;
    banner_status?: CSLPFieldMapping;
  };
}

export interface Seo {
  _version?: number;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  enable_search_indexing: boolean;
  $?: {
    meta_title?: CSLPFieldMapping;
    meta_description?: CSLPFieldMapping;
    keywords?: CSLPFieldMapping;
    enable_search_indexing?: CSLPFieldMapping;
  };
}

export interface ModularBlocks extends SystemFields {
  booking_preferences: {
    location_label?: string;
    season_label?: string;
    rental_dates_label?: string;
    pickup_option_label?: string;
    pickup_helper_text?: string;
    delivery_option_label?: string;
    call_to_action_label?: string;
    $?: {
      location_label?: CSLPFieldMapping;
      season_label?: CSLPFieldMapping;
      rental_dates_label?: CSLPFieldMapping;
      pickup_option_label?: CSLPFieldMapping;
      pickup_helper_text?: CSLPFieldMapping;
      delivery_option_label?: CSLPFieldMapping;
      call_to_action_label?: CSLPFieldMapping;
    };
  };
  pickup_location: {
    toggle_label?: string;
    nearest_label?: string;
    slopeside_label?: string;
    closest_label?: string;
    primary_cta_label?: string;
    view_map_label?: string;
    search_section_label?: string;
    search_placeholder?: string;
    search_cta_label?: string;
    $?: {
      toggle_label?: CSLPFieldMapping;
      nearest_label?: CSLPFieldMapping;
      slopeside_label?: CSLPFieldMapping;
      closest_label?: CSLPFieldMapping;
      primary_cta_label?: CSLPFieldMapping;
      view_map_label?: CSLPFieldMapping;
      search_section_label?: CSLPFieldMapping;
      search_placeholder?: CSLPFieldMapping;
      search_cta_label?: CSLPFieldMapping;
    };
  };
  product_listing: {
    no_results_message?: string;
    pricing_disclaimer?: string;
    filter_summary_label?: string;
    add_helmet_label?: string;
    bring_own_boots_label?: string;
    quantity_label?: string;
    add_to_cart_label?: string;
    cart_modal_pickup_date_label?: string;
    cart_modal_pickup_time_label?: string;
    cart_modal_return_date_label?: string;
    cart_modal_duration_unit_label?: string;
    cart_modal_primary_cta_label?: string;
    cart_modal_secondary_cta_label?: string;
    cart_modal_added_to_cart_label?: string;
    cart_modal_confirmation_message?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    $?: {
      no_results_message?: CSLPFieldMapping;
      pricing_disclaimer?: CSLPFieldMapping;
      filter_summary_label?: CSLPFieldMapping;
      add_helmet_label?: CSLPFieldMapping;
      bring_own_boots_label?: CSLPFieldMapping;
      quantity_label?: CSLPFieldMapping;
      add_to_cart_label?: CSLPFieldMapping;
      cart_modal_pickup_date_label?: CSLPFieldMapping;
      cart_modal_pickup_time_label?: CSLPFieldMapping;
      cart_modal_return_date_label?: CSLPFieldMapping;
      cart_modal_duration_unit_label?: CSLPFieldMapping;
      cart_modal_primary_cta_label?: CSLPFieldMapping;
      cart_modal_secondary_cta_label?: CSLPFieldMapping;
      cart_modal_added_to_cart_label?: CSLPFieldMapping;
      cart_modal_confirmation_message?: CSLPFieldMapping;
    };
  };
  checkout: {
    reservation_summary_labels?: {
      location_label?: string;
      $?: {
        location_label?: CSLPFieldMapping;
      };
    };
    damage_waiver_section?: {
      damage_waiver_label?: string;
      damage_waiver_description?: string;
      $?: {
        damage_waiver_label?: CSLPFieldMapping;
        damage_waiver_description?: CSLPFieldMapping;
      };
    };
    pricing_section?: {
      pricing_section_title?: string;
      subtotal_label?: string;
      taxes_label?: string;
      total_label?: string;
      $?: {
        pricing_section_title?: CSLPFieldMapping;
        subtotal_label?: CSLPFieldMapping;
        taxes_label?: CSLPFieldMapping;
        total_label?: CSLPFieldMapping;
      };
    };
    promo_code_section?: {
      promo_code_label?: string;
      promo_code_cta_label?: string;
      $?: {
        promo_code_label?: CSLPFieldMapping;
        promo_code_cta_label?: CSLPFieldMapping;
      };
    };
    $?: {
      reservation_summary_labels?: CSLPFieldMapping;
      damage_waiver_section?: CSLPFieldMapping;
      pricing_section?: CSLPFieldMapping;
      promo_code_section?: CSLPFieldMapping;
    };
  };
  renter_information: {
    first_name_label?: string;
    last_name_label?: string;
    date_of_birth_label?: string;
    height_label?: string;
    weight_label?: string;
    shoe_size_type_label?: string;
    shoe_size_label?: string;
    preferred_ski_length_label?: string;
    preferred_mondo_label?: string;
    gear_type_label?: string;
    skier_type_label?: string;
    special_requests_label?: string;
    checkout_label?: string;
    $?: {
      first_name_label?: CSLPFieldMapping;
      last_name_label?: CSLPFieldMapping;
      date_of_birth_label?: CSLPFieldMapping;
      height_label?: CSLPFieldMapping;
      weight_label?: CSLPFieldMapping;
      shoe_size_type_label?: CSLPFieldMapping;
      shoe_size_label?: CSLPFieldMapping;
      preferred_ski_length_label?: CSLPFieldMapping;
      preferred_mondo_label?: CSLPFieldMapping;
      gear_type_label?: CSLPFieldMapping;
      skier_type_label?: CSLPFieldMapping;
      special_requests_label?: CSLPFieldMapping;
      checkout_label?: CSLPFieldMapping;
    };
  };
  sign_in_card: {
    email_label?: string;
    password_label?: string;
    sign_in_cta_label?: string;
    forgot_username_label?: string;
    forgot_password_label?: string;
    show_password_label?: string;
    $?: {
      email_label?: CSLPFieldMapping;
      password_label?: CSLPFieldMapping;
      sign_in_cta_label?: CSLPFieldMapping;
      forgot_username_label?: CSLPFieldMapping;
      forgot_password_label?: CSLPFieldMapping;
      show_password_label?: CSLPFieldMapping;
    };
  };
}

export interface RentalLabels extends SystemFields {
  _version?: number;
  title: string;
  modular_blocks?: ModularBlocksExtension<ModularBlocks>[];
  $?: {
    title?: CSLPFieldMapping;
    modular_blocks?: CSLPFieldMapping;
  };
}

export interface Banner extends SystemFields {
  categories: PackageCategoryBanner;
}

export interface PromoCardCollection extends SystemFields {
  promo_cards: PromoCard;
}

export interface ModularBlocks1 extends SystemFields {
  booking_preferences: {
    headline?: string;
    description?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    image?: File | null;
    bottom_helper_text?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    reference?: GearRentalItem[];
    $?: {
      headline?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
      image?: CSLPFieldMapping;
      bottom_helper_text?: CSLPFieldMapping;
      reference?: CSLPFieldMapping;
    };
  };
  pickup_location: {
    title?: string;
    $?: {
      title?: CSLPFieldMapping;
    };
  };
  product_listing: {
    title?: string;
    banner?: ModularBlocksExtension<Banner>[];
    $?: {
      title?: CSLPFieldMapping;
      banner?: CSLPFieldMapping;
    };
  };
  checkout: {
    title?: string;
    guest_checkout_card?: {
      title?: string;
      guest_checkout_description?: string;
      guest_checkout_cta?: string;
      guest_checkout_image?: File | null;
      $?: {
        title?: CSLPFieldMapping;
        guest_checkout_description?: CSLPFieldMapping;
        guest_checkout_cta?: CSLPFieldMapping;
        guest_checkout_image?: CSLPFieldMapping;
      };
    };
    sign_in_card?: {
      title?: string;
      sign_in_description?: string;
      sign_in_cta?: string;
      $?: {
        title?: CSLPFieldMapping;
        sign_in_description?: CSLPFieldMapping;
        sign_in_cta?: CSLPFieldMapping;
      };
    };
    promo_card_collection?: ModularBlocksExtension<PromoCardCollection>[];
    $?: {
      title?: CSLPFieldMapping;
      guest_checkout_card?: CSLPFieldMapping;
      sign_in_card?: CSLPFieldMapping;
      promo_card_collection?: CSLPFieldMapping;
    };
  };
  renter_information: {
    title?: string;
    description?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    image?: File | null;
    $?: {
      title?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
      image?: CSLPFieldMapping;
    };
  };
}

export interface RentalPage extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  modular_blocks: ModularBlocksExtension<ModularBlocks1>[];
  labels?: RentalLabels[];
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    modular_blocks?: CSLPFieldMapping;
    labels?: CSLPFieldMapping;
  };
}

export interface OtherResorts extends SystemFields {
  _version?: number;
  title: string;
  resort?: Link[];
  $?: {
    title?: CSLPFieldMapping;
    resort?: CSLPFieldMapping;
  };
}

export interface GearRentalItem extends SystemFields {
  _version?: number;
  title: string;
  image?: File | null;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  $?: {
    title?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
  };
}

export interface Footer extends SystemFields {
  _version?: number;
  title: string;
  logo: File;
  navigation?: {
    link?: Link[];
    $?: {
      link?: CSLPFieldMapping;
    };
  };
  social?: {
    social_share?: {
      link?: Link;
      icon: File;
      $?: {
        link?: CSLPFieldMapping;
        icon?: CSLPFieldMapping;
      };
    }[];
    $?: {
      social_share?: CSLPFieldMapping;
    };
  };
  copyright?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  $?: {
    title?: CSLPFieldMapping;
    logo?: CSLPFieldMapping;
    navigation?: CSLPFieldMapping;
    social?: CSLPFieldMapping;
    copyright?: CSLPFieldMapping;
  };
}

export interface PageComponents extends SystemFields {
  vail_hero_banner: VailHeroBanner;
  media_text_block: MediaTextBlock;
  promo_card_grid: PromoCardGrid;
  media_text_block_json_rtf: MediaTextBlockJsonRtf;
}

export interface Page extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  url?: string;
  subtitle?: string;
  page_components?: ModularBlocksExtension<PageComponents>[];
  seo?: Seo;
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    page_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface Header extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  logo: File;
  navigation_menu?: MaxTuple<
    {
      label?: string;
      page_reference: Page[];
      $?: {
        label?: CSLPFieldMapping;
        page_reference?: CSLPFieldMapping;
      };
    },
    10
  >;
  notification_bar?: {
    announcement_text?: string;
    show_announcement: boolean;
    $?: {
      announcement_text?: CSLPFieldMapping;
      show_announcement?: CSLPFieldMapping;
    };
  };
  other_resort_sites?: OtherResorts[];
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    logo?: CSLPFieldMapping;
    navigation_menu?: CSLPFieldMapping;
    notification_bar?: CSLPFieldMapping;
    other_resort_sites?: CSLPFieldMapping;
  };
}
