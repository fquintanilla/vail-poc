# Final code review (copy this structure every run)

Use the same headings so repeated runs produce comparable reports.

## Files created

- `path/to/Component/index.tsx` (…)
- `apps/storybook/src/stories/resort/.../Component.stories.tsx` (…)
- (optional) `path/to/Component/ComponentClient.tsx` (…)

## Structure decision

- Single file / split files — **why**
- Story path — why this Storybook location/title fits the repo convention

## Implementation quality pass

- **Global principles (`SKILL.md`):** confirm rebuild vs integration boundary, DOM=focus order, `@theme` prefix map, phased skills, **visual extraction** (screenshot-backed type/color/spacing in pre-flight + code)—yes / gaps noted
- **Skill files read (paths):** list each `.agents/skills/<slug>/SKILL.md` actually loaded (expect: `accessibility-a11y`, `next-best-practices`, `tailwind-design-system`, `tailwindcss-advanced-layouts`, `tailwindcss-mobile-first`, `vercel-react-best-practices`, `frontend-design`), or note any missing file in this repo
- **Phased use (not load-and-forget):** one line per stage—mobile-first/layouts, Next/RSC + `next/*`, a11y, tokens/theme, Vercel React if client, frontend-design on polish
- **Applied to code (not prose only):** (one line tying the above to what shipped)
- **Storybook coverage:** list the created story and which variants/states it covers
- `cn` object-form conditionals for layout/boolean flags: (yes / N/A — why)
- CVA used for multi-node variants (e.g. theme): (yes — variants: … / no — justify per non-negotiable rules)
- Non-negotiables spot-check: section `aria-labelledby`+heading `id` if applicable; **`next/image`**; no URL-parsing helpers; **no** sanitize / `dangerouslySetInnerHTML` in rebuild file; **DOM order = focus order** (no `order-*` on main columns—see `SKILL.md` “Focus order and DOM”); **themed colors come from resort tokens in `packages/ui/src/styles/globals.css`, not hardcoded hex/neutrals, when tokens exist**; **`as const` + `isDark`/CVA**; no `unoptimized` unless documented, except placeholder images from `placehold.co`; note **integration** follow-ups (`Link`, `rel`, rich HTML) if needed

## Pre-flight alignment

- User confirmed the rebuild plan (yes / adjustments noted)

## Legacy style inputs (Step 3)

- HTML/CSS: (none / used / partial)  
- Written style notes: (none / summarized — e.g. container, palette, spacing)

## Structured prompts applied

- None / list keys used (`theme`, `imagePosition`, …)

## Assumptions

- (bullets; or "None")

## Uncertainties / follow-ups

- Items that need designer or stakeholder confirmation

## Dependencies

- None / **Proposed:** `package` — reason (approved: yes/no)

## Storybook

- Story title and path
- Variants/states covered
- Any limits or assumptions in the story setup

## Accessibility

- Notable choices (landmarks, headings, focus, alt strategy)

## Responsive behavior

- How mobile / tablet / desktop map to Tailwind breakpoints **in this app** (read `@theme`: e.g. resort tablet ~1024px → **`md:`** when `md` = 992px and `lg` = 1200px—not `lg:` for tablet)

## Visual fidelity (screenshots)

- Pre-flight **visual tokens** summarized for each breakpoint (or “unchanged across widths”)
- Where code uses **arbitrary values** (`text-[…]`, `bg-[#…]`, etc.), one line tying each to **what was visible** in captures and why no resort token was suitable
- Assumptions when pixels were ambiguous (cross-link **Assumptions** above if needed)

## Before wiring to Contentstack

- What props to map to CMS fields
- What to validate in Live Preview
- **Final component layer:** swap **`<a>` → `Link`** where needed, add **`rel` / `target`**, **sanitize** rich HTML / wire **JSON RTE**—not done in the rebuild file

## Copy-paste usage example

**Mandatory:** one short JSX snippet the user can paste into a page (not the full component file). Use the **real** export name and prop names from this run. Prefer realistic placeholder strings.

**Images:** when `src` is needed, use `https://placehold.co/{width}x{height}` with fitting dimensions. You may append `?text=...` if it helps distinguish story variants. If that placeholder is rendered with `next/image`, set `unoptimized`.

**`next/image`:** one line stating whether the target app’s `next.config` `images.remotePatterns` already includes `placehold.co` (or any other host in the snippet); say to add it if missing. Even if the host is allowed, placeholder images from `placehold.co` should still be rendered with `unoptimized` in examples/stories.

```tsx

```

Fill the fenced block with a single copy-paste-ready invocation when delivering the closing report to the user.
