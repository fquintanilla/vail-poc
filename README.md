# Vail

A Turborepo monorepo powering the Vail project, with Next.js apps and shared packages. Contentstack is used as the headless CMS for content delivery.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-foundations-starter)

## Project Structure

```
Vail/
├── apps/
│   ├── web/                    # Main Next.js app (localhost:3000)
│   └── snow/                   # Snow site app (localhost:3001)
│       ├── src/
│       │   └── app/            # App Router pages & layouts
│       │       └── preview/    # Preview routes (draft/live content from Contentstack)
│       ├── next.config.ts
│       └── package.json
├── packages/
│   ├── ui/                     # Shared React components (@repo/ui)
│   └── api/                    # Data layer (@repo/api)
├── turbo.json                  # Turborepo task configuration
├── eslint.config.mjs           # ESLint (Next.js + TypeScript)
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

| App      | Path        | Port | Description                    |
| -------- | ----------- | ---- | ------------------------------ |
| **web**  | `apps/web`  | 3000 | Main site (marketing, pages)   |
| **snow** | `apps/snow` | 3001 | Snow site (lift-and-shift app) |

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
- [ESLint](https://eslint.org/) – Lint (`eslint-config-next`)
- [Prettier](https://prettier.io/) – Format
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

## Preview mode

The app supports **Contentstack Live Preview** so editors can see draft and unpublished content. Preview is driven by the **`/preview`** route and optional proxy.

### The `/preview` folder

- **`apps/web/src/app/preview/`** – Preview-specific routes. These pages use **live/draft** Contentstack data instead of cached published content.
- **`apps/web/src/app/preview/page.tsx`** – Renders the home page with Live Preview query params. When Contentstack opens the site for preview, it can pass `live_preview`, `content_type_uid`, `entry_uid`, and `preview_timestamp`; the preview page forwards these to the stack and fetches draft content via `stack.livePreviewQuery()`.
- **Non-preview routes** (e.g. `app/page.tsx`) use **cached** data via `getPageCached()` for fast SSG/ISR. Preview routes bypass cache and call `getPage(url, stack)` after configuring the stack with `livePreviewQuery()`.

### Enabling preview

1. In `apps/web/.env.local` set:
   - `NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true`
   - `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN` – preview token from your Contentstack stack
2. Restart the dev server. The layout shows a “You are viewing the preview site” banner when preview is on.
3. Open the site from Contentstack’s preview URL (or go directly to `/preview` with the same query params Contentstack uses).

### Preview query parameters

Preview pages accept these search params (from Contentstack’s preview iframe or manual URLs):

| Param               | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `live_preview`      | Enables live preview for the request         |
| `content_type_uid`  | Content type (e.g. `page`)                   |
| `entry_uid`         | Entry UID being previewed                    |
| `preview_timestamp` | Optional; used for draft versioning          |

### Supporting future pages (SSG + preview)

When adding new pages that should be **statically generated** but also **previewable**:

1. **SSG / normal requests**  
   Use `getPageCached(url)` (or equivalent cached fetcher) so the page is cacheable and fast.

2. **Preview requests**  
   In the **preview** route for that page (e.g. `app/preview/[...slug]/page.tsx` or a dedicated route under `app/preview/`):
   - Read `live_preview`, `content_type_uid`, `entry_uid`, `preview_timestamp` from `searchParams`.
   - If `live_preview` is set: call `getStack()`, then `stack.livePreviewQuery({ live_preview, contentTypeUid, entryUid, preview_timestamp })`, then fetch with `getPage(url, stack)` (or the appropriate getter). Do **not** use the cached getter in this branch.
   - Reuse the same component that renders the page so layout and components stay in sync.

3. **Optional: proxy for editors**  
   `apps/web/src/proxy.ts` can rewrite requests to `/preview` when `NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true`. Right now its `config.matcher` only includes `"/"`. To support more paths (e.g. `/about`, `/blog/[slug]`), add a middleware that calls this proxy and extend the matcher to those pathnames so Contentstack’s preview loads the correct `/preview/...` route.

4. **Caching**  
   Keep all “live” preview logic out of `getPageCached` and any `"use cache"` code paths. Use the cached path only for non-preview requests.

## Notes for Developers

1. **Monorepo commands**
  - Run a single app: `pnpm dev --filter @repo/web` or `pnpm dev --filter @repo/snow`
  - Add a dependency to an app: `pnpm add <pkg> --filter @repo/web` (or `@repo/snow`)
   - Add to a package: `pnpm add <pkg> --filter @repo/ui` (or `@repo/api`).

2. **Shared code**
   - Use `@repo/ui` for components shared across apps.
   - Use `@repo/api` for data fetching, Contentstack client helpers, or mock data.
   - Avoid duplicating CMS client setup; centralize in a package or in `apps/web` and document in AGENTS.md if needed.

3. **Quality checks**
   - `pnpm check` – ESLint at repo root plus `turbo run check-types`.
   - `pnpm check-types` – TypeScript for all packages.
   - `pnpm format` – Prettier; `pnpm lint:fix` – ESLint auto-fix where applicable.

4. **TypeScript**
   - Strict mode and `noUncheckedIndexedAccess` are enabled.
   - Prefer typing Contentstack responses (entries, assets) in a shared types file or `@repo/api`.

5. **AGENTS.md**
   - Contains project conventions, Turborepo tasks, and patterns (e.g. Server vs Client components). Keep it in sync when adding new apps or shared patterns.

6. **Secrets**
   - No API keys, delivery tokens, or other secrets in repo or in client-side code. Use server-only env vars for delivery tokens when possible.
