import { Component } from "@repo/ui/lib/types/component";

type Seo = {
  enable_search_indexing: boolean;
};

export type Page = {
  [x: string]: any;
  page_components: Component[];
  uid: string;
  locale: string;
  url: string;
  seo: Seo;
  title: string;
};
