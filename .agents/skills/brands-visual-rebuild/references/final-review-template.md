# Final code review (copy this structure every run)

Use the same headings so repeated runs produce comparable reports. Keep every section brief. Prefer one short line over a mini-checklist unless the run genuinely needs more detail.

## Files created

- `apps/brands/src/components/ComponentName/index.tsx` (…)
- `apps/storybook/src/stories/brands/.../Component.stories.tsx` (…)
- (optional) extra file(s) in the same component folder

## Summary

- Resolved component name/path — raw user input → cleaned folder/component name
- Structure — single file / split files and why
- Storybook — path/title and covered states

## Notes

- Pre-flight alignment — confirmed / adjustments noted
- Inputs used — screenshots + HTML/CSS (**none / used / partial**) + style notes (**none / summary**)
- Interaction / variants — inferred from screenshots, plus any user adjustments
- Key checks — a11y, `next/image`, breakpoint mapping, tokens, no integration logic
- Assumptions / follow-ups — short list or `None`
- Dependencies — `None` or short note

## Before wiring to Contentstack

- Short mapping/follow-up note

## Copy-paste usage example

**Mandatory:** one short JSX snippet the user can paste into a page (not the full component file). Use the **real** export name and prop names from this run. Prefer realistic placeholder strings.

**Images:** when `src` is needed, use `https://placehold.co/{width}x{height}` with fitting dimensions. You may append `?text=...` if it helps distinguish story variants. If that placeholder is rendered with `next/image`, set `unoptimized`.

**`next/image`:** one line stating whether the target app’s `next.config` `images.remotePatterns` already includes `placehold.co` (or any other host in the snippet); say to add it if missing. Even if the host is allowed, placeholder images from `placehold.co` should still be rendered with `unoptimized` in examples/stories.

```tsx

```

Fill the fenced block with a single copy-paste-ready invocation when delivering the closing report to the user.
