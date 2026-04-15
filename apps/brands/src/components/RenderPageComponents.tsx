import { BasicContentElement } from "@/components/CMS/BasicContentElement";
import { CategoriesSection } from "@/components/CMS/CategoriesSection";
import { FeaturedContentElement } from "@/components/CMS/FeaturedContentElement";
import { HeroSlideshow } from "@/components/CMS/HeroSlideshow";
import type { Page } from "@/lib/types/contentstack";

export type RenderPageComponentsProps = {
  page: Page;
};

type ModularBlock = NonNullable<Page["page_components"]>[number];

export function RenderPageComponents({ page }: RenderPageComponentsProps) {
  const pageComponents = page.page_components;
  if (!pageComponents?.length) {
    return null;
  }

  return (
    <>
      {pageComponents.map((component: ModularBlock) => {
        if (component.hero_slideshow) {
          const hero = component.hero_slideshow;
          const uid = hero._metadata?.uid;

          return (
            <HeroSlideshow
              key={`hero-slideshow-${uid}`}
              hero={hero}
              variant="default"
            />
          );
        }

        if (component.basic_content) {
          const basicContent = component.basic_content;
          const uid = basicContent._metadata?.uid;

          return (
            <BasicContentElement
              key={`basic-content-${uid}`}
              content={basicContent}
            />
          );
        }

        if (component.categories) {
          const categories = component.categories;
          const uid = categories._metadata?.uid;

          return (
            <CategoriesSection
              key={`categories-${uid}`}
              content={categories}
            />
          );
        }

        if (component.featured_content) {
          const content = component.featured_content;
          const uid = content._metadata?.uid;

          return (
            <FeaturedContentElement
              key={`featured-content-${uid}`}
              content={content}
            />
          );
        }

        return null;
      })}
    </>
  );
}
