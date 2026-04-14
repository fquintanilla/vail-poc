---
name: cshtml-less-to-brands
description: "Migrates legacy cshtml+Less into apps/brands: apps/brands/src/lib/types/contentstack.ts is the contract (read-only); task-named cshtml+Less is visual/CSS reference. Do not pause when Razor exceeds types. cva, Storybook, themes.css, single data prop, editableProps, sanitize-html for rich fields, ImageDelivery, next/link. No C#, no exec. Triggers: cshtml, Razor, Less, themes.css, brands migration, Contentstack modular block."
---

# cshtml-less-to-brands

**Two inputs for one component:**

- **`apps/brands/src/lib/types/contentstack.ts`** — **Contract** for `data` (read-only for the agent). Field names, nesting, enums, and `$` keys come only from here.
- **Legacy `.cshtml` + traced Less** — Path named in the **task** (or unambiguous search under `legacy/`). **Reference** for DOM structure, class names, conditionals, and compiled CSS. Mirror it only where typed `data` provides values.

## Authority order (non-negotiable)

1. **`apps/brands/src/lib/types/contentstack.ts`** — Single source of truth for the block entry. **Never** hand-edit this file in this workflow.

2. **Legacy `.cshtml` + traced Less** — Use the path the user gives; do not substitute another partial without correction. Map Razor to React using **only** fields that exist on the imported type.

3. **When Razor shows behavior or fields that types do not include:** **Do not stop.** Ship what **types + cva** allow; omit or simplify unreachable branches without extra top-level props or type edits. Note gaps briefly (component comment, Storybook docs, or PR text).

## `editableProps` (Live Preview)

**Implementation:** `apps/brands/src/lib/contentstack.ts` — `editableProps(value)` returns `value` if it is a non-null object, else `{}`, so `{...editableProps(x)}` is always safe on JSX.

**Data source:** Fetched entries include **`$`** siblings typed in `contentstack.ts` (`CSLPFieldMapping`, `data-cslp`, etc.). The stack attaches them (e.g. `addEditableTags`). **Pass those objects through** — do not construct CSLP strings manually.

**Usage:**

1. `import { editableProps } from "@/lib/contentstack"`.
2. **Root:** On the block’s outer wrapper, spread `{...editableProps(…)}` only if the block type’s `$` shape supports a whole-entry mapping; otherwise follow **only** what that interface defines. When unsure, compare other modular components in `apps/brands` that use the same content type.
3. **Per field:** `{...editableProps(data?.$?.<key>)}` on the element that wraps the rendered value. **`<key>` must match the `$` object on the block interface** (and nested paths for groups, e.g. `data?.pricing?.$?.price`).
4. **Lists:** Per row, use each item’s `$` paths from the type.
5. If `$` is absent (published / no preview), spread is a no-op.

## Non-negotiable

1. **CSS:** Exact match to compiled Less for **variants reachable from typed `data`**. If a legacy branch has no typed field, deliver typed branches only; compile Less and diff when mapping slices.

2. **Folder + entry:** `apps/brands/src/components/<PascalName>/index.tsx` — Server Component default; `*.client.tsx` in the same folder only if required. No lone `Foo.tsx` at `components/` root.

3. **Variants:** **`cva`** from `@repo/brands` — one primary `cva` (or a small related set) per component, not long `cn()` chains as the main system.

4. **Props:** **`{ data: YourType }` only** — `YourType` from **`@/lib/types/contentstack`**.

5. **`editableProps`:** Apply per rules above on root (when applicable) and every builder-targeted node. If `editableProps` is missing from brands `contentstack.ts`, add the same helper as `apps/web/src/lib/contentstack.ts` and export it.

6. **Rich HTML:** `dangerouslySetInnerHTML` + **`sanitize-html`** with a **minimal, field-specific** allowlist. Plain text as children.

7. **Images / links:** **`@/components/CMS/ImageDelivery`** + **`@/lib/image-delivery`**. Links: **`next/link`** or **`<a>`** from typed URLs. No `exec` / shell in components.

8. **Storybook:** `apps/storybook/src/stories/brands/...` — one story per variant **expressible** from `data` + types; typed fixtures; optional minimal `$` stubs. Brand theme via toolbar only (`preview.tsx`); extend `@repo/ui` `BRAND_THEME_OPTIONS` if a slug is missing.

9. **Colors:** Only in **`packages/ui/src/styles/themes.css`** (global + `legacy/.../sites/<slug>/` parity). No orphan `--*`. Bridge to Tailwind via `@theme inline` only for colors you use as utilities.

10. **Non-colors:** Tailwind literals / arbitrary values, not `themes.css`, unless the user asks for shared tokens.

11. **Assets:** `cp` / `mkdir -p`; copy only referenced files. Public URLs: same path as under `legacy/` but **without** the `legacy/` prefix (e.g. `/Assets/...`). **`/legacy/...` forbidden** in public paths. Alternate `/assets/...` bucket → document once in `ASSETS.md`. Never read/write binaries via editor tools.

12. **Less (non-color):** global → default `sites/snow` unless imports pull another `sites/<slug>/`; site overrides global.

13. **Order of work:** `themes.css` if needed → `apps/brands/src/lib/contentstack.ts` (helpers only, never types) → component → stories → `RenderPageComponents` / renderer **if wiring is in scope** → `pnpm check-types` + `pnpm lint` (or `bun x` with a one-line note).

14. **Scope:** Full legacy slice **within the type contract** — no subset menus for the user.

15. **Reads before coding:** `accessibility-a11y`, `next-best-practices`, block type in **`types/contentstack.ts`**, **`apps/brands/src/lib/contentstack.ts`**, `ImageDelivery` when needed, `apps/brands/src/app/globals.css`, `packages/ui/src/styles/globals.css`, `themes.css` when touching tokens.

16. **Breakpoints:** Use tiers from `apps/brands/src/app/globals.css`. Avoid `order-*` that breaks focus vs reading order for large interactive regions.

## Out of scope

.NET / Razor **runtime**, **C#** porting, **Contentstack Management API** / migration scripts unless requested. **Editing `apps/brands/src/lib/types/contentstack.ts` by hand** is forbidden. **Delivery + Live Preview** for the block is in scope and must not be blocked waiting for full Sitecore render-parameter parity.
