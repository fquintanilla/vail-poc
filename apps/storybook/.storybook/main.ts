import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const resortRoot = path.resolve(configDir, "../../resort");

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      nextConfigPath: path.join(resortRoot, "next.config.ts"),
    },
  },
  staticDirs: ["../../resort/public"],
};

export default config;
