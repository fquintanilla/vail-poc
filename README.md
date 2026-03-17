# Vail

A Turborepo monorepo powering the Vail project, with Next.js apps and shared packages. Contentstack is used as the headless CMS for content delivery.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-foundations-starter)

## Project Structure

```
Vail/
├── apps/
│   └── web/                    # Main Next.js app (localhost:3000)
│       ├── src/
│       │   └── app/            # App Router pages & layouts
│       ├── next.config.ts
│       └── package.json
├── packages/
│   ├── ui/                     # Shared React components (@repo/ui)
│   └── api/                    # Data layer (@repo/api)
├── turbo.json                  # Turborepo task configuration
├── biome.jsonc                 # Linting & formatting (Biome)
├── AGENTS.md                   # Agent/course rules & patterns
└── package.json                # Root workspace
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the web app in dev mode
pnpm dev

# Type check all packages
pnpm check-types

# Build all packages
pnpm build

# Format and lint
pnpm format
pnpm lint
```

## Apps

| App     | Path       | Port | Description                  |
| ------- | ---------- | ---- | ---------------------------- |
| **web** | `apps/web` | 3000 | Main site (marketing, pages) |

## Packages

| Package       | Import        | Description                   |
| ------------- | ------------- | ----------------------------- |
| **@repo/ui**  | `@repo/ui/*`  | Shared React components       |
| **@repo/api** | `@repo/api/*` | Data helpers & mock/API layer |

## Tech Stack

- [Next.js 16](https://nextjs.org/) – React framework, App Router
- [React 19](https://react.dev/) – Server Components
- [Contentstack](https://www.contentstack.com/) – Headless CMS
- [Turborepo](https://turbo.build/repo) – Monorepo builds
- [pnpm](https://pnpm.io/) – Package manager
- [Biome](https://biomejs.dev/) – Lint & format
- [TypeScript](https://www.typescriptlang.org/) – Strict mode
- [Tailwind CSS 4](https://tailwindcss.com/) – Styling

## Contentstack (Headless CMS)

This project uses **Contentstack** for content. Important points for developers:

- **Environment variables**  
  Contentstack credentials must be set per app (e.g. in `apps/web`). Use `.env.local` for local development and never commit secrets. Typical variables:
  - `NEXT_PUBLIC_CONTENTSTACK_API_KEY` – Delivery API key
  - `CONTENTSTACK_DELIVERY_TOKEN` – Delivery token (server-only)
  - `CONTENTSTACK_ENVIRONMENT` – Environment (e.g. `production`, `development`)
  - `CONTENTSTACK_REGION` – Optional; e.g. `US` or `EU`

- **Content types & entries**  
  Content structure (content types, fields, and entries) is defined in the Contentstack stack. Sync with the team on content models before building new features.

- **Preview & live**  
  Use delivery tokens and environments correctly: preview/draft content may use a different token or environment than published content.

- **Docs**  
  [Contentstack Docs](https://www.contentstack.com/docs) and [Content Delivery API](https://www.contentstack.com/docs/developers/content-delivery-api) are the source of truth for APIs and SDKs.

## Notes for Developers

1. **Monorepo commands**
   - Run a single app: `pnpm dev --filter @repo/web`
   - Add a dependency to an app: `pnpm add <pkg> --filter @repo/web`
   - Add to a package: `pnpm add <pkg> --filter @repo/ui` (or `@repo/api`).

2. **Shared code**
   - Use `@repo/ui` for components shared across apps.
   - Use `@repo/api` for data fetching, Contentstack client helpers, or mock data.
   - Avoid duplicating CMS client setup; centralize in a package or in `apps/web` and document in AGENTS.md if needed.

3. **Quality checks**
   - `pnpm check` – runs Biome (lint + format).
   - `pnpm check-types` – TypeScript for all packages.
   - Fix lint/format with `pnpm format` before committing.

4. **TypeScript**
   - Strict mode and `noUncheckedIndexedAccess` are enabled.
   - Prefer typing Contentstack responses (entries, assets) in a shared types file or `@repo/api`.

5. **AGENTS.md**
   - Contains project conventions, Turborepo tasks, and patterns (e.g. Server vs Client components). Keep it in sync when adding new apps or shared patterns.

6. **Secrets**
   - No API keys, delivery tokens, or other secrets in repo or in client-side code. Use server-only env vars for delivery tokens when possible.
