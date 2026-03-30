# Next.js Foundations Starter

This is the starter repository for the Next.js Foundations certification course.

## Project Overview

A Turborepo monorepo with two Next.js applications and shared packages:

```
nextjs-foundations-starter/
├── apps/
│   ├── web/          # Primary Next.js app (port 3000)
│   └── snow/         # Snow / Vail experience (port 3001)
├── packages/
│   ├── tsconfig/     # Shared TypeScript bases (@repo/tsconfig)
│   ├── ui/           # Shared design system: Tailwind tokens, globals.css (@repo/ui)
│   └── api/          # Shared data helpers (@repo/api); extend as needed
├── turbo.json        # Turborepo task configuration
├── eslint.config.mjs # ESLint flat config (Next.js + TypeScript)
└── package.json      # Root workspace configuration
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first styling
- **Turborepo** - Monorepo build orchestration
- **ESLint** - Linting (`eslint-config-next`, flat config)
- **Prettier** - Code formatting
- **pnpm** - Fast, disk-efficient package manager
- **Vercel CLI** - Deploy, link projects, manage env vars

## Node.js version

The root `package.json` declares `"engines": { "node": "24.x" }`. Use **Node 24** locally, in CI, and in deployment (for example `nvm install 24` or the matching runtime on your host). Other Node majors are not supported for this workspace.

## Workflows

### Initial Setup

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Authenticate with Vercel
vercel login

# Clone and install
git clone https://github.com/YOUR_USERNAME/nextjs-foundations
cd nextjs-foundations
pnpm install

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull
```

### Development

```bash
# Start both apps in dev mode
pnpm dev
# web: http://localhost:3000
# snow: http://localhost:3001

# Start a specific app
pnpm dev --filter @repo/web
pnpm dev --filter @repo/snow
```

### Vercel CLI

```bash
# Check deployment status
vercel list

# View deployment logs
vercel logs <deployment-url>

# Pull latest env vars
vercel env pull

# Open project in dashboard
vercel open
```

### Quality Checks

```bash
# Type check all packages
pnpm check-types

# Lint (ESLint)
pnpm lint

# Lint with fixes where safe
pnpm lint:fix

# Format (Prettier)
pnpm format

# ESLint + typecheck (all packages via Turbo)
pnpm check
```

### Building

```bash
# Build all packages
pnpm build

# Build specific app
pnpm build --filter @repo/web
pnpm build --filter @repo/snow
```

Only the Next.js apps define a `build` script. Shared packages (`@repo/ui`, `@repo/api`) ship TypeScript source and are typechecked via `check-types`; they do not emit a separate `dist` for the apps (Next transpiles `@repo/ui` via `transpilePackages`).

## Package Dependencies

### Using Shared Packages

Shared styles and design tokens (Tailwind v4) come from `@repo/ui` in each app’s `globals.css`:

```css
@import "@repo/ui/globals.css";
```

TypeScript path `@repo/ui/*` maps to `packages/ui/src/*`. When you add components (e.g. via shadcn in `packages/ui`), keep `package.json` `exports` in sync so subpath imports resolve in all tools.

Import from `@repo/api` for mock data:

```tsx
import { getPosts } from "@repo/api/posts";
import { getGalleryItems } from "@repo/api/gallery";
```

### Adding Dependencies

```bash
# Add to specific app
pnpm add <package> --filter @repo/web

# Add to shared package
pnpm add <package> --filter @repo/ui

# Add dev dependency to root
pnpm add -D <package> -w

# Shared TS config for a new workspace package
pnpm add -D @repo/tsconfig@workspace:* --filter <your-package>
```

## TypeScript Configuration

Shared compiler defaults live in **`@repo/tsconfig`** (`packages/tsconfig/`):

| Preset            | File                 | Used by                          |
| ----------------- | -------------------- | -------------------------------- |
| Base              | `base.json`          | Extended by the presets below    |
| Next.js apps      | `next-app.json`      | `apps/web`, `apps/snow`          |
| React library     | `react-library.json` | `packages/ui`                    |
| Non-React library | `node-library.json`  | `packages/api`                    |

Each app or package keeps its own `tsconfig.json` with `"extends"` pointing at the shared presets (relative paths like `../../packages/tsconfig/next-app.json` so the editor and `tsc` resolve them reliably) plus local `paths`, `include`, and `exclude`.

Strict options enabled in the base include:

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`

`noPropertyAccessFromIndexSignature` is intentionally **not** enabled: it forces bracket notation everywhere `ProcessEnv` (and similar index signatures) is used, which touches many files for little gain. You can enable it in `packages/tsconfig/base.json` if the team prefers that style.

Path aliases (defined per app/package, not in the shared base):

- `@/*` — local app imports (`apps/web`, `apps/snow`)
- `@repo/ui/*` — shared UI (`packages/ui/src`)
- `@repo/api/*` — shared API helpers

### Root `pnpm.overrides`

The root `package.json` pins `@types/react`, `@types/react-dom`, and `typescript` so every workspace package resolves the same versions and avoids duplicate or conflicting type definitions. Keep these aligned when upgrading TypeScript or React types.

## ESLint & Prettier

Linting uses **ESLint 9** with `eslint-config-next` (Core Web Vitals + TypeScript) and a flat config in `eslint.config.mjs`. Formatting uses **Prettier** (`pnpm format`).

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm check
```

## Turborepo Tasks

Defined in `turbo.json`:

| Task          | Cached | Description               |
| ------------- | ------ | ------------------------- |
| `dev`         | No     | Start development servers |
| `build`       | Yes    | Production build          |
| `check-types` | Yes    | TypeScript type checking  |
| `lint`        | Yes    | ESLint (per package)      |
| `start`       | No     | Start production servers  |

## Common Patterns

### Server Components (Default)

All components in the App Router are Server Components by default:

```tsx
// app/page.tsx - This is a Server Component
import { getPosts } from "@repo/api/posts";

export default async function Page() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
```

### Client Components

Add `"use client"` directive for interactivity:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### Shared Components

Components in `@repo/ui` can be used in both apps:

```tsx
// packages/ui/src/button.tsx
export function Button({ children, ...props }) {
  return (
    <button className="..." {...props}>
      {children}
    </button>
  );
}

// apps/web/src/app/page.tsx (after adding a component under packages/ui/src)
import { Button } from "@repo/ui/components/button";
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports
PORT=3002 pnpm dev --filter @repo/web
```

### Type Errors After Package Changes

```bash
# Clear Turborepo cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Editor integration

Use the ESLint and Prettier editor extensions; the repo root config is `eslint.config.mjs`.

## Course Integration

This starter is designed for the Next.js Foundations certification. As you progress through lessons:

1. **Don't modify shared packages** unless instructed
2. **Focus on `apps/web` and `apps/snow`** for exercises
3. **Use `@repo/api` functions** for mock data
4. **Follow the lesson structure** - each builds on previous work

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
