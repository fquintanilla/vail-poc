# Final code review (copy this structure every run)

Use the same headings so repeated runs produce comparable reports.

## Files created

- `path/to/Component/index.tsx` (…)
- (optional) `path/to/Component/ComponentClient.tsx` (…)

## Structure decision

- Single file / split files — **why**

## Implementation quality pass

- **Skill files read (paths):** list each `.agents/skills/<slug>/SKILL.md` actually loaded, or note any missing file in this repo
- **Applied to code (not prose only):** (one line: e.g. a11y labels/focus, Next Image/sizes, tokens from globals)
- `cn` object-form conditionals for layout/boolean flags: (yes / N/A — why)
- CVA used for multi-node variants (e.g. theme): (yes — variants: … / no — justify per non-negotiable rules)
- Non-negotiables spot-check: section `aria-labelledby`+heading `id` if applicable; external `rel`; no `unoptimized` unless documented

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

- How mobile / tablet / desktop map to Tailwind breakpoints

## Before wiring to Contentstack

- What props to map to CMS fields
- What to validate in Live Preview

## Copy-paste usage example

**Mandatory:** one short JSX snippet the user can paste into a page (not the full component file). Use the **real** export name and prop names from this run. Prefer realistic placeholder strings.

**Images:** when `src` is needed, use `https://placehold.co/{width}x{height}` and choose dimensions that fit the layout (e.g. `600x400`, `1200x800`).

**`next/image`:** one line stating whether the target app’s `next.config` `images.remotePatterns` already includes `placehold.co` (or any other host in the snippet); say to add it if missing.

```tsx

```

Fill the fenced block with a single copy-paste-ready invocation when delivering the closing report to the user.
