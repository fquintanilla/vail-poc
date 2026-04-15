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

export interface FeaturedContentItem {
  _version?: number;
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  image?: File | null;
  youtube_link?: string;
  action_link?: Cta;
  pricing?: {
    show_pricing_information: boolean;
    price?: number | null;
    $?: {
      show_pricing_information?: CSLPFieldMapping;
      price?: CSLPFieldMapping;
    };
  };
  scheduling?: {
    start_date?: string | null;
    end_date?: string | null;
    $?: {
      start_date?: CSLPFieldMapping;
      end_date?: CSLPFieldMapping;
    };
  };
  layout?: {
    is_image_right: boolean;
    is_pass_detail_view: boolean;
    style?: ("default" | "image" | "3d" | "slopeUp" | "solid") | null;
    reverse_color: boolean;
    $?: {
      is_image_right?: CSLPFieldMapping;
      is_pass_detail_view?: CSLPFieldMapping;
      style?: CSLPFieldMapping;
      reverse_color?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    youtube_link?: CSLPFieldMapping;
    action_link?: CSLPFieldMapping;
    pricing?: CSLPFieldMapping;
    scheduling?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface HeroSlideshow {
  _version?: number;
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  slides: HeroSlide[];
  auto_play_slideshow_interval?: number | null;
  image_for_title?: File | null;
  layout?: {
    show_slide_only: boolean;
    apply_text_over_image: boolean;
    text_alignment?: ("left" | "center" | "right") | null;
    use_original_aspect_ration_on_mobile: boolean;
    overlay_image?: File | null;
    overlay_location?: ("ce" | "se" | "sw") | null;
    $?: {
      show_slide_only?: CSLPFieldMapping;
      apply_text_over_image?: CSLPFieldMapping;
      text_alignment?: CSLPFieldMapping;
      use_original_aspect_ration_on_mobile?: CSLPFieldMapping;
      overlay_image?: CSLPFieldMapping;
      overlay_location?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    slides?: CSLPFieldMapping;
    auto_play_slideshow_interval?: CSLPFieldMapping;
    image_for_title?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface HeroSlide {
  _version?: number;
  _metadata?: { uid?: string };
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  image?: File | null;
  image_for_title?: File | null;
  link?: Cta;
  promotion_content?: {
    promotion_link?: Cta;
    promotion_logo?: File | null;
    $?: {
      promotion_link?: CSLPFieldMapping;
      promotion_logo?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    image_for_title?: CSLPFieldMapping;
    link?: CSLPFieldMapping;
    promotion_content?: CSLPFieldMapping;
  };
}

export interface FeaturedStoriesElement {
  _version?: number;
  headline?: string;
  subtitle?: string;
  icon?: Icon[];
  featured_stories?: FeaturedContentElements[];
  layout?: {
    background_styles?: ("solid" | "white") | null;
    background_image?: File | null;
    $?: {
      background_styles?: CSLPFieldMapping;
      background_image?: CSLPFieldMapping;
    };
  };
  $?: {
    headline?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    icon?: CSLPFieldMapping;
    featured_stories?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface ProductsCardLanding {
  _version?: number;
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  icon?: Icon[];
  all_product_cards?: ProductCard[];
  product_card_groups?: ProductCardGroup[];
  product_card_groups_dropdown_title?: string;
  layout?: {
    hide_recommended_card_for_all_filter: boolean;
    hide_filters: boolean;
    hide_recommended_card_across_all_filters: boolean;
    $?: {
      hide_recommended_card_for_all_filter?: CSLPFieldMapping;
      hide_filters?: CSLPFieldMapping;
      hide_recommended_card_across_all_filters?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    icon?: CSLPFieldMapping;
    all_product_cards?: CSLPFieldMapping;
    product_card_groups?: CSLPFieldMapping;
    product_card_groups_dropdown_title?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface SlidingCardComponent {
  _version?: number;
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  action_link?: Cta;
  icon?: Icon[];
  sliding_cards?: {
    title: string;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    logo?: File | null;
    image?: File | null;
    action_link?: Cta;
    $?: {
      title?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      logo?: CSLPFieldMapping;
      image?: CSLPFieldMapping;
      action_link?: CSLPFieldMapping;
    };
  }[];
  layout?: {
    background_styles?: ("solid" | "white") | null;
    background_image?: File | null;
    height_styles?: "fixed" | null;
    $?: {
      background_styles?: CSLPFieldMapping;
      background_image?: CSLPFieldMapping;
      height_styles?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    action_link?: CSLPFieldMapping;
    icon?: CSLPFieldMapping;
    sliding_cards?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface Seo {
  _version?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  enable_search_indexing: boolean;
  $?: {
    meta_title?: CSLPFieldMapping;
    meta_description?: CSLPFieldMapping;
    meta_keywords?: CSLPFieldMapping;
    enable_search_indexing?: CSLPFieldMapping;
  };
}

export interface Cta {
  _version?: number;
  title?: string;
  open_in: "_blank" | "_self";
  page?: (Page | Article)[];
  external_link?: string;
  $?: {
    title?: CSLPFieldMapping;
    open_in?: CSLPFieldMapping;
    page?: CSLPFieldMapping;
    external_link?: CSLPFieldMapping;
  };
}

export interface HeroWithPromotion {
  _version?: number;
  title?: string;
  subtitle?: string;
  body?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  slide: HeroSlide[];
  promotion_content?: {
    link?: Cta;
    promotion_logo?: File | null;
    $?: {
      link?: CSLPFieldMapping;
      promotion_logo?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    subtitle?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    slide?: CSLPFieldMapping;
    promotion_content?: CSLPFieldMapping;
  };
}

export interface FeaturedContentElements extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  item?: FeaturedContentItem;
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    item?: CSLPFieldMapping;
  };
}

export interface ProductCardGroup extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  hide_recommended_card: boolean;
  product_cards?: ProductCard[];
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    hide_recommended_card?: CSLPFieldMapping;
    product_cards?: CSLPFieldMapping;
  };
}

export interface ProductCard extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  body?: string;
  image?: File | null;
  action_link?: Cta;
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    body?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    action_link?: CSLPFieldMapping;
  };
}

export interface FooterColumns extends SystemFields {
  resort_options: {
    title?: string;
    resorts?: Resorts[];
    $?: {
      title?: CSLPFieldMapping;
      resorts?: CSLPFieldMapping;
    };
  };
  navigation_links: {
    title?: string;
    link?: {
      link_name: string;
      url: string;
      icon?: File | null;
      $?: {
        link_name?: CSLPFieldMapping;
        url?: CSLPFieldMapping;
        icon?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      link?: CSLPFieldMapping;
    };
  };
  partners: {
    title: string;
    link?: {
      image?: File | null;
      link_name?: string;
      url: string;
      $?: {
        image?: CSLPFieldMapping;
        link_name?: CSLPFieldMapping;
        url?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      link?: CSLPFieldMapping;
    };
  };
}

export interface Footer extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  logo: File;
  copyright_text?: string;
  footer_columns?: ModularBlocksExtension<FooterColumns>[];
  alerts?: {
    heading: string;
    description?: string;
    alert_links?: {
      label: string;
      url: string;
      icon?: string;
      $?: {
        label?: CSLPFieldMapping;
        url?: CSLPFieldMapping;
        icon?: CSLPFieldMapping;
      };
    }[];
    $?: {
      heading?: CSLPFieldMapping;
      description?: CSLPFieldMapping;
      alert_links?: CSLPFieldMapping;
    };
  };
  utility_links?: {
    label: string;
    url: string;
    icon?: File | null;
    $?: {
      label?: CSLPFieldMapping;
      url?: CSLPFieldMapping;
      icon?: CSLPFieldMapping;
    };
  }[];
  social_links?: {
    platform: string;
    url: string;
    icon: File;
    $?: {
      platform?: CSLPFieldMapping;
      url?: CSLPFieldMapping;
      icon?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    logo?: CSLPFieldMapping;
    copyright_text?: CSLPFieldMapping;
    footer_columns?: CSLPFieldMapping;
    alerts?: CSLPFieldMapping;
    utility_links?: CSLPFieldMapping;
    social_links?: CSLPFieldMapping;
  };
}

export interface Resorts extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  resorts: {
    region: string;
    destinations?: {
      title: string;
      url: string;
      $?: {
        title?: CSLPFieldMapping;
        url?: CSLPFieldMapping;
      };
    }[];
    $?: {
      region?: CSLPFieldMapping;
      destinations?: CSLPFieldMapping;
    };
  }[];
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    resorts?: CSLPFieldMapping;
  };
}

export interface Header extends SystemFields {
  _version?: number;
  title: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  logo: File;
  resort_options: Resorts[];
  primary_navigation?: {
    title: string;
    section?: {
      title: string;
      url: string;
      link?: Cta[];
      $?: {
        title?: CSLPFieldMapping;
        url?: CSLPFieldMapping;
        link?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      section?: CSLPFieldMapping;
    };
  }[];
  utility_navigation?: Cta[];
  layout?: {
    show_weather: boolean;
    show_search: boolean;
    show_account: boolean;
    show_cart: boolean;
    $?: {
      show_weather?: CSLPFieldMapping;
      show_search?: CSLPFieldMapping;
      show_account?: CSLPFieldMapping;
      show_cart?: CSLPFieldMapping;
    };
  };
  $?: {
    title?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    logo?: CSLPFieldMapping;
    resort_options?: CSLPFieldMapping;
    primary_navigation?: CSLPFieldMapping;
    utility_navigation?: CSLPFieldMapping;
    layout?: CSLPFieldMapping;
  };
}

export interface Icon extends SystemFields {
  _version?: number;
  title: string;
  css_class?: string;
  $?: {
    title?: CSLPFieldMapping;
    css_class?: CSLPFieldMapping;
  };
}

export interface PageComponents extends SystemFields {
  hero_slideshow: HeroSlideshow;
  hero_with_promotion: HeroWithPromotion;
  basic_content: {
    title?: string;
    center_title: boolean;
    subtitle?: string;
    center_subtitle: boolean;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    action_link?: {
      link_name?: string;
      page?: (Page | Article)[];
      external_link?: string;
      $?: {
        link_name?: CSLPFieldMapping;
        page?: CSLPFieldMapping;
        external_link?: CSLPFieldMapping;
      };
    };
    $?: {
      title?: CSLPFieldMapping;
      center_title?: CSLPFieldMapping;
      subtitle?: CSLPFieldMapping;
      center_subtitle?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      action_link?: CSLPFieldMapping;
    };
  };
  article_image_video_component: {
    article?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    video?: string;
    image?: File | null;
    caption_title?: string;
    caption_body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    layout?: {
      is_image_right: boolean;
      $?: {
        is_image_right?: CSLPFieldMapping;
      };
    };
    $?: {
      article?: CSLPFieldMapping;
      video?: CSLPFieldMapping;
      image?: CSLPFieldMapping;
      caption_title?: CSLPFieldMapping;
      caption_body?: CSLPFieldMapping;
      layout?: CSLPFieldMapping;
    };
  };
  featured_content: {
    featured_item?: FeaturedContentElements[];
    item?: FeaturedContentItem;
    $?: {
      featured_item?: CSLPFieldMapping;
      item?: CSLPFieldMapping;
    };
  };
  flip_in_card: {
    title?: string;
    flip_in_cards?: {
      image?: File | null;
      action_link?: {
        link_name?: string;
        page?: (Page | Article)[];
        external_link?: string;
        $?: {
          link_name?: CSLPFieldMapping;
          page?: CSLPFieldMapping;
          external_link?: CSLPFieldMapping;
        };
      };
      $?: {
        image?: CSLPFieldMapping;
        action_link?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      flip_in_cards?: CSLPFieldMapping;
    };
  };
}

export interface Article extends SystemFields {
  _version?: number;
  title: string;
  url?: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  page_components?: ModularBlocksExtension<PageComponents>[];
  seo?: Seo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    page_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}

export interface PageComponents1 extends SystemFields {
  hero_slideshow: HeroSlideshow;
  hero_with_promotion: HeroWithPromotion;
  featured_stories: FeaturedStoriesElement;
  products_card_landing: ProductsCardLanding;
  sliding_card: SlidingCardComponent;
  faq_accordion: {
    title?: string;
    multiselect: boolean;
    faqs?: {
      question?: string;
      answer?: {
        type: string;
        uid: string;
        _version: number;
        attrs: Record<string, any>;
        children: JSONRTENode[];
      };
      $?: {
        question?: CSLPFieldMapping;
        answer?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      multiselect?: CSLPFieldMapping;
      faqs?: CSLPFieldMapping;
    };
  };
  flip_in_card: {
    title?: string;
    flip_in_cards?: {
      image?: File | null;
      action_link?: {
        link_name?: string;
        page?: (Page | Article)[];
        external_link?: string;
        $?: {
          link_name?: CSLPFieldMapping;
          page?: CSLPFieldMapping;
          external_link?: CSLPFieldMapping;
        };
      };
      $?: {
        image?: CSLPFieldMapping;
        action_link?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      flip_in_cards?: CSLPFieldMapping;
    };
  };
  basic_content: {
    title?: string;
    center_title: boolean;
    subtitle?: string;
    center_subtitle: boolean;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    action_link?: {
      link_name?: string;
      page?: (Page | Article)[];
      external_link?: string;
      $?: {
        link_name?: CSLPFieldMapping;
        page?: CSLPFieldMapping;
        external_link?: CSLPFieldMapping;
      };
    };
    $?: {
      title?: CSLPFieldMapping;
      center_title?: CSLPFieldMapping;
      subtitle?: CSLPFieldMapping;
      center_subtitle?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      action_link?: CSLPFieldMapping;
    };
  };
  youtube_video_player: {
    title?: string;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    youtube_link?: string;
    youtube_video_id?: string;
    $?: {
      title?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      youtube_link?: CSLPFieldMapping;
      youtube_video_id?: CSLPFieldMapping;
    };
  };
  contact_us_email: {
    title?: string;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    primary_number?: string;
    primary_number_descriptor?: string;
    secondary_number?: string;
    secondary_number_descriptor?: string;
    email_address?: string;
    $?: {
      title?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      primary_number?: CSLPFieldMapping;
      primary_number_descriptor?: CSLPFieldMapping;
      secondary_number?: CSLPFieldMapping;
      secondary_number_descriptor?: CSLPFieldMapping;
      email_address?: CSLPFieldMapping;
    };
  };
  slide_by_slide_featured_content: {
    title?: string;
    subtitle?: string;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    icon?: Icon[];
    featured_content_elements?: FeaturedContentElements[];
    $?: {
      title?: CSLPFieldMapping;
      subtitle?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      icon?: CSLPFieldMapping;
      featured_content_elements?: CSLPFieldMapping;
    };
  };
  categories: {
    title?: string;
    subtitle?: string;
    body?: {
      type: string;
      uid: string;
      _version: number;
      attrs: Record<string, any>;
      children: JSONRTENode[];
    };
    categories?: {
      title?: string;
      _metadata?: { uid?: string };
      icon?: Icon[];
      image?: File | null;
      link?: {
        link_name?: string;
        page?: (Page | Article)[];
        external_link?: string;
        $?: {
          link_name?: CSLPFieldMapping;
          page?: CSLPFieldMapping;
          external_link?: CSLPFieldMapping;
        };
      };
      $?: {
        title?: CSLPFieldMapping;
        icon?: CSLPFieldMapping;
        image?: CSLPFieldMapping;
        link?: CSLPFieldMapping;
      };
    }[];
    $?: {
      title?: CSLPFieldMapping;
      subtitle?: CSLPFieldMapping;
      body?: CSLPFieldMapping;
      categories?: CSLPFieldMapping;
    };
  };
  featured_content: {
    shared_featured_item?: FeaturedContentElements[];
    item?: FeaturedContentItem;
    $?: {
      shared_featured_item?: CSLPFieldMapping;
      item?: CSLPFieldMapping;
    };
  };
}

export interface Page extends SystemFields {
  _version?: number;
  title: string;
  url?: string;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  back_link?: (Page | Article)[];
  page_components?: ModularBlocksExtension<PageComponents1>[];
  seo?: Seo;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
    back_link?: CSLPFieldMapping;
    page_components?: CSLPFieldMapping;
    seo?: CSLPFieldMapping;
  };
}
