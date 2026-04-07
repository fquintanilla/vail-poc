import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PreviewSkeleton } from "@/components/CMS/PreviewSkeleton";

const meta = {
  title: "CMS/Preview Skeleton",
  component: PreviewSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PreviewSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
