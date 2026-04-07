import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  {
    settings: {
      next: {
        rootDir: ["apps/web/", "apps/resort/", "apps/storybook/"],
      },
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/public/**",
    "**/storybook-static/**",
    ".turbo/**",
    ".agents/**",
    "pnpm-lock.yaml",
    "apps/web/src/lib/contentstack/types.ts",
  ]),
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["apps/resort/src/app/layout.tsx"],
    rules: {
      "@next/next/no-css-tags": "off",
    },
  },
  {
    files: ["apps/storybook/**/*.{ts,tsx,mts,cts,js,mjs,cjs}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
