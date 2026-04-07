import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PreviewSkeleton } from "../../../../../brands/src/components/CMS/PreviewSkeleton";

const meta = {
  title: "Brands/CMS/Preview Skeleton",
  component: PreviewSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PreviewSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
