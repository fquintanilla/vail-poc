# Supporting skills

Use this file as the canonical map for which supporting skills to read and when to apply them.

## Resort app files to read first

- `apps/resort/src/app/globals.css` as the entry point for `@theme` breakpoints, wrapper sizing, and shared layout utilities
- every stylesheet imported by `globals.css` that defines theme variables, colors, spacing, radii, shadows, or shared utilities relevant to the rebuild

This skill assumes the output belongs to `apps/resort`, so `globals.css` and its relevant imports are part of the core read.

## Canonical paths

These paths are relative to the workspace root:

| Skill slug | Read this file |
| --- | --- |
| `accessibility-a11y` | `.agents/skills/accessibility-a11y/SKILL.md` |
| `next-best-practices` | `.agents/skills/next-best-practices/SKILL.md` |
| `tailwind-design-system` | `.agents/skills/tailwind-design-system/SKILL.md` |
| `tailwind-theme-builder` | `.agents/skills/tailwind-theme-builder/SKILL.md` |
| `tailwindcss-advanced-layouts` | `.agents/skills/tailwindcss-advanced-layouts/SKILL.md` |
| `tailwindcss-mobile-first` | `.agents/skills/tailwindcss-mobile-first/SKILL.md` |
| `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` |

## Core vs conditional reads

- **Core reads when present:** `accessibility-a11y`, `next-best-practices`, and `apps/resort/src/app/globals.css`.
- **Core style follow-up:** after reading `globals.css`, read the imported stylesheets that materially define the active design system.
- **Read when the component needs it:** Tailwind layout/theme/design-system skills when layout or styling is non-trivial; `vercel-react-best-practices` for client boundaries or render-sensitive patterns; `frontend-design` for a polish pass after screenshot-grounded structure is in place.

## When to apply each skill

| Skill | Primary moment | What to apply |
| --- | --- | --- |
| `tailwindcss-mobile-first` | Pre-flight and while writing class lists | Mobile-first ordering and breakpoint mapping from the app's actual `@theme`. |
| `tailwindcss-advanced-layouts` | Pre-flight and DOM structure work | Grid/flex patterns, alignment, and layout composition without using `order-*` to swap major regions. |
| `tailwind-design-system` | Utility and token selection | Prefer shared tokens and established package patterns over ad-hoc values when they fit the evidence. |
| `tailwind-theme-builder` | Color, radii, and CSS variable wiring | Align with `@theme`, `globals.css`, and variable conventions already present in the app. |
| `next-best-practices` | File shape and primitive choice | App Router defaults, Server Components, `next/image`, and other relevant `next/*` primitives. |
| `accessibility-a11y` | Semantic markup throughout | Landmarks, heading order, accessible names, focus treatment, alt strategy, and DOM-aligned reading order. |
| `vercel-react-best-practices` | Client/perf-sensitive implementation | Client boundaries, list rendering, children composition, and bundle hygiene. |
| `frontend-design` | Final polish pass | Refine hierarchy and rhythm without replacing screenshot-derived visual decisions with generic aesthetics. |

## Recommended order of operations

1. `next-best-practices` for shell and `next/*` choices
2. `accessibility-a11y` for semantic structure
3. `tailwindcss-advanced-layouts` + `tailwindcss-mobile-first` for layout and breakpoint behavior
4. `tailwind-design-system` + `tailwind-theme-builder` for tokens and theme alignment
5. `vercel-react-best-practices` when client or render-sensitive patterns appear
6. `frontend-design` for final polish

If the workspace adds new skills later, treat them the same way: read when relevant, and apply them only when their topic appears in the deliverable.
