import type { Image } from './action';

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
  title: string;
  title_h2: string;
  body: string;
  date: string;
};

export type FeaturedBlogData = {
  title_h2: string;
  view_articles: Article;
  featured_blogs: FeaturedBlog;
  $: AdditionalParam;
};

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
};

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  },
];
