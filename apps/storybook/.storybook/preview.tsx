import type { Preview } from "@storybook/nextjs-vite";

import "../src/styles/storybook.css";

/** Extend this list as new resort brands are added; toolbar and `data-theme` stay in sync. */
export const BRAND_THEME_OPTIONS = [
  { value: "ocean", title: "Ocean" },
  { value: "sunset", title: "Sunset" },
] as const;

const DEFAULT_BRAND = BRAND_THEME_OPTIONS[0].value;

const preview: Preview = {
  globalTypes: {
    brand: {
      name: "Brand",
      description: "Resort brand theme (sets data-theme on the document root)",
      defaultValue: DEFAULT_BRAND,
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [...BRAND_THEME_OPTIONS],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = String(context.globals.brand ?? DEFAULT_BRAND);
      document.documentElement.setAttribute("data-theme", theme);
      return <Story />;
    },
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
