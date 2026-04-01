# Final code review (copy this structure every run)

Use the same headings so repeated runs produce comparable reports.

## Files created

- `path/to/Component/index.tsx` (…)
- (optional) `path/to/Component/ComponentClient.tsx` (…)

## Structure decision

- Single file / split files — **why**

## Implementation quality pass

- **Global principles (`SKILL.md`):** confirm rebuild vs integration boundary, DOM=focus order, `@theme` prefix map, phased skills, **visual extraction** (screenshot-backed type/color/spacing in pre-flight + code)—yes / gaps noted
- **Skill files read (paths):** list each `.agents/skills/<slug>/SKILL.md` actually loaded (expect: `accessibility-a11y`, `next-best-practices`, `tailwind-design-system`, `tailwind-theme-builder`, `tailwindcss-advanced-layouts`, `tailwindcss-mobile-first`, `vercel-react-best-practices`, `frontend-design`), or note any missing file in this repo
- **Phased use (not load-and-forget):** one line per stage—e.g. mobile-first + layouts in plan/classes; Next/RSC + `next/*` first; a11y on markup; tokens/theme on utilities; Vercel React if client; frontend-design on polish
- **Applied to code (not prose only):** (one line tying the above to what shipped)
- `cn` object-form conditionals for layout/boolean flags: (yes / N/A — why)
- CVA used for multi-node variants (e.g. theme): (yes — variants: … / no — justify per non-negotiable rules)
- Non-negotiables spot-check: section `aria-labelledby`+heading `id` if applicable; **`next/image`**; **CTA `<a>`** (no URL parsers); **no** sanitize / `dangerouslySetInnerHTML` in rebuild file; **DOM order = focus order** (no `order-*` on main columns—see `SKILL.md` “Focus order and DOM”); **`<figure>`** when applicable; **`as const` + `isDark`/CVA**; no `unoptimized` unless documented; note **integration** follow-ups (`Link`, `rel`, rich HTML) if needed

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

## Accessibility

- Notable choices (landmarks, headings, focus, alt strategy)

## Responsive behavior

- How mobile / tablet / desktop map to Tailwind breakpoints **in this app** (read `@theme`: e.g. resort tablet ~1024px → **`md:`** when `md` = 992px and `lg` = 1200px—not `lg:` for tablet)

## Visual fidelity (screenshots)

- Pre-flight **visual tokens** summarized for each breakpoint (or “unchanged across widths”)
- Where code uses **arbitrary values** (`text-[…]`, `bg-[#…]`, etc.), one line tying each to **what was visible** in captures
- Assumptions when pixels were ambiguous (cross-link **Assumptions** above if needed)

## Before wiring to Contentstack

- What props to map to CMS fields
- What to validate in Live Preview
- **Final component layer:** swap **`<a>` → `Link`** where needed, add **`rel` / `target`**, **sanitize** rich HTML / wire **JSON RTE**—not done in the rebuild file

## Copy-paste usage example

**Mandatory:** one short JSX snippet the user can paste into a page (not the full component file). Use the **real** export name and prop names from this run. Prefer realistic placeholder strings.

**Images:** when `src` is needed, use `https://placehold.co/{width}x{height}` and choose dimensions that fit the layout (e.g. `600x400`, `1200x800`).

**`next/image`:** one line stating whether the target app’s `next.config` `images.remotePatterns` already includes `placehold.co` (or any other host in the snippet); say to add it if missing.

```tsx

```

Fill the fenced block with a single copy-paste-ready invocation when delivering the closing report to the user.
