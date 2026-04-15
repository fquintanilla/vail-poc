import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer";
import type { Page } from "@/lib/types/contentstack";

type YoutubeVideoPlayerBlock = NonNullable<
  NonNullable<Page["page_components"]>[number]["youtube_video_player"]
>;

const baseData: YoutubeVideoPlayerBlock = {
  title: "Mountain conditions preview",
  body: {
    type: "doc",
    uid: "youtube-body-1",
    _version: 1,
    attrs: {},
    children: [
      {
        type: "p",
        uid: "youtube-body-p1",
        _version: 1,
        attrs: {},
        children: [
          {
            type: "text",
            uid: "youtube-body-t1",
            _version: 1,
            attrs: {},
            text: "Watch the latest on-mountain preview before planning your next day on snow.",
          },
        ],
      },
    ],
  },
  youtube_link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  youtube_video_id: "dQw4w9WgXcQ",
  $: {
    title: { "data-cslp": "youtube_video_player.title" },
    body: { "data-cslp": "youtube_video_player.body" },
    youtube_link: { "data-cslp": "youtube_video_player.youtube_link" },
    youtube_video_id: {
      "data-cslp": "youtube_video_player.youtube_video_id",
    },
  },
};

const meta = {
  title: "Brands/Youtube Video Player",
  component: YoutubeVideoPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Legacy `_YoutubeVideoPlayer.cshtml` mapped to the typed `youtube_video_player` modular block. It preserves the title, rich text description, and responsive 16:9 iframe embed with `enablejsapi=1` appended to the source URL.",
      },
    },
  },
} satisfies Meta<typeof YoutubeVideoPlayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: baseData,
  },
};

export const WithoutDescription: Story = {
  args: {
    data: {
      ...baseData,
      body: undefined,
    },
  },
};
