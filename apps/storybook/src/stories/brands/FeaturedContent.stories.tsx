import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FeaturedContent from "@/components/FeaturedContent";
import type { Page } from "@/lib/types/contentstack";

type FeaturedContentBlock = NonNullable<Page["page_components"]>[number]["featured_content"];

const baseItem = {
  title: "Plan a sharper alpine weekend",
  subtitle: "Featured itinerary",
  body: {
    type: "doc",
    uid: "body-1",
    _version: 1,
    attrs: {},
    children: [
      {
        type: "p",
        uid: "p-1",
        _version: 1,
        attrs: {},
        children: [
          {
            type: "text",
            uid: "t-1",
            _version: 1,
            attrs: {},
            text: "Build a two-day plan around sunrise laps, mountain dining, and a late-afternoon unwind with room to breathe between each stop.",
          },
        ],
      },
      {
        type: "p",
        uid: "p-2",
        _version: 1,
        attrs: {},
        children: [
          {
            type: "text",
            uid: "t-2",
            _version: 1,
            attrs: {},
            text: "Reserve your pass product early for the cleanest start.",
          },
        ],
      },
    ],
  },
  image: {
    uid: "featured-image",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    created_by: "storybook",
    updated_by: "storybook",
    content_type: "image/jpeg",
    file_size: "1000",
    tags: [],
    filename: "vail-alpine.jpg",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
    ACL: {},
    is_dir: false,
    parent_uid: "root",
    _version: 1,
    title: "Vail alpine scene",
    description: "Snow-covered mountain resort at golden hour",
    publish_details: {
      environment: "development",
      locale: "en-us",
      time: "2026-01-01T00:00:00.000Z",
      user: "storybook",
    },
    dimension: {
      width: 1600,
      height: 1067,
    },
  },
  action_link: {
    title: "Explore passes",
    open_in: "_self" as const,
    external_link: "/passes",
  },
  pricing: {
    show_pricing_information: true,
    price: 1049,
  },
  layout: {
    is_image_right: false,
    is_pass_detail_view: false,
    style: null,
    reverse_color: false,
  },
  $: {
    title: { "data-cslp": "featured.title" },
    subtitle: { "data-cslp": "featured.subtitle" },
    body: { "data-cslp": "featured.body" },
    image: { "data-cslp": "featured.image" },
    action_link: { "data-cslp": "featured.action_link" },
  },
};

const meta = {
  title: "Brands/Featured Content",
  component: FeaturedContent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Legacy `_FeaturedContentElement.cshtml` mapped into the brands block contract. The typed implementation covers inline and shared Contentstack items, `solid` styling, image-right layouts, reverse color mode, pricing, and video CTA treatment. Legacy Sitecore-only 3D/image/slope variants and currency conversion branches are intentionally omitted because they are not represented in the current type contract.",
      },
    },
  },
} satisfies Meta<typeof FeaturedContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      item: baseItem,
      $: {
        item: { "data-cslp": "block.item" },
      },
    } satisfies FeaturedContentBlock,
  },
};

export const SolidReverse: Story = {
  args: {
    data: {
      item: {
        ...baseItem,
        subtitle: "Epic Pass detail",
        title: "Epic Day Pass",
        layout: {
          is_image_right: true,
          is_pass_detail_view: true,
          style: "solid",
          reverse_color: true,
        },
      },
      $: {
        item: { "data-cslp": "block.item" },
      },
    } satisfies FeaturedContentBlock,
  },
};

export const SharedVideoItem: Story = {
  args: {
    data: {
      shared_featured_item: [
        {
          title: "Shared featured item",
          item: {
            ...baseItem,
            title: "Watch the mountain preview",
            subtitle: "Shared reference",
            pricing: {
              show_pricing_information: false,
            },
            youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            action_link: undefined,
            layout: {
              is_image_right: false,
              is_pass_detail_view: false,
              style: "solid",
              reverse_color: false,
            },
          },
          $: {
            item: { "data-cslp": "shared.item" },
          },
        },
      ],
      $: {
        shared_featured_item: { "data-cslp": "block.shared_featured_item" },
      },
    } satisfies FeaturedContentBlock,
  },
};
