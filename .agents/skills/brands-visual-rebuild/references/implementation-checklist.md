# Implementation checklist

Use this after the user confirms the rebuild plan and before you ship code.

## Detailed implementation quality pass

1. Read the core supporting skills plus any conditional ones that clearly affect this component.
2. Read `apps/brands/src/app/globals.css` before styling for breakpoint mapping and wrappers.
3. Read `packages/ui/src/styles/globals.css` before styling for theme colors, shared tokens, and `@theme inline` aliases.
4. Confirm the component still honors the presentational boundary.
5. Check that DOM order matches visual reading order.
6. Check that breakpoint mapping comes from `apps/brands/src/app/globals.css`.
7. Ensure major typography, color, spacing, radius, and image decisions trace back to screenshot evidence or an explicit assumption.
8. For themed roles, use actual shared theme tokens from `packages/ui/src/styles/globals.css`. Do not use hardcoded hex values or generic Tailwind neutrals when a matching token exists.
9. If the image comes from CMS or variable upstream assets, do not force crop behavior unless the screenshots clearly show it.
10. Create a Storybook story under `apps/storybook/src/stories/brands` for the component.
11. Include meaningful variants/states in the story, not just a single default case, when the component exposes variants or optional slots.

## `cn` and conditional classes

- Use the shared `cn` helper from the project when available.
- Prefer one `cn()` call with base classes plus an object map for boolean flags.
- Avoid repeating the same theme or variant condition across many nodes when a shared variant map or CVA would make the component easier to maintain.

## CVA guidance

- Use `class-variance-authority` when a variant such as theme, emphasis, or layout affects multiple surfaces in the component.
- Prefer `as const` variant keys and a single resolved flag like `isDark` rather than repeated string comparisons.
- Keep CVA definitions close to the component unless the repo clearly prefers a separate variants file.

## Dependency policy

- Default to no new dependencies for static rebuilds.
- If the screenshots clearly imply interactivity, first check whether `apps/brands` already has the right package.
- If the required package is missing, add the default top-tier option for that pattern:
  - Radix UI for accordion / dialog / tabs / dropdown / tooltip / select / slider
  - shadcn/ui for broader UI-base primitives
  - Embla for carousel
  - React Hook Form + Zod for forms
  - TanStack Table for tables
  - React Day Picker for calendars
  - Sonner for toasts
  - Motion for animations
  - dnd-kit for drag and drop
  - TanStack Query for API fetching/cache
  - Zustand for simple global state
- If the component benefits from `class-variance-authority` and the target app cannot resolve it directly, add it as a direct dependency only when it matches the shared UI stack already in use.
- If no package in the workspace uses `class-variance-authority`, ask once before adding it.
- If the needed capability is not covered by the preferred list, choose another top-tier library and explain that choice in the final review.
- Do not add sanitization or CMS-specific helper packages from this skill.

## Final spot-checks

- `next/image` is used correctly, with `sizes` aligned to the app breakpoints.
- Shared colors and theme tokens come from `packages/ui/src/styles/globals.css`. Hardcoded hex values or generic Tailwind neutrals for themed roles are a failure when a matching token exists.
- Storybook story uses `@storybook/nextjs-vite` conventions already present in the repo.
- Story examples use `https://placehold.co/` for placeholder images when image props are needed. Per [Placehold docs](https://placehold.co/), use `https://placehold.co/{width}x{height}` and optionally `?text=...` when useful. If a placeholder is rendered with `next/image`, set `unoptimized` on that image usage by default.
- When screenshots clearly show carousel/accordion/tab-like behavior, the implementation includes that behavior instead of pushing the decision back to the user.
- If interactivity required a package that was not installed, the run adds the preferred top-tier library for that pattern or documents the justified top-tier alternative used instead.
- Client code exists only where interactivity truly requires it.
- Optional content props do not render empty wrappers.
- Section labeling and heading structure are coherent.
- The component remains reusable and does not encode one-off page assumptions unless the user explicitly asked for them.
- Whole-card link patterns are acceptable when they are intentional and accessible; do not flag them by default.
