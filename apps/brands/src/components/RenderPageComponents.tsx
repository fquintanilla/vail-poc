import type { Page } from "@/lib/types/contentstack";
import FeaturedContent from "@/components/FeaturedContent";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";

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
      {pageComponents.map((component: ModularBlock, index: number) => {
        if (component.featured_content) {
          const content = component.featured_content;
          const uid = content._metadata?.uid ?? `featured-content-${index}`;
          return <FeaturedContent key={uid} data={content} />;
        }

        if (component.youtube_video_player) {
          const content = component.youtube_video_player;
          const uid = content._metadata?.uid ?? `youtube-video-player-${index}`;
          return <YoutubeVideoPlayer key={uid} data={content} />;
        }

        return null;
      })}
    </>
  );
}
