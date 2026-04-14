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
        if (component.featured_content) {
          const content = component.featured_content;
          const uid = content._metadata?.uid;

          return (
            <div key={`featured-content-${uid}`}>
              <h2>featured_content</h2>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}
