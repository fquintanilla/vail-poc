# Iterating on `brands-visual-rebuild`

## Goals when changing the skill

- **Repeatability:** same intake order, same evidence priority, same closing report shape.
- **Honesty:** fewer unjustified “pixel-perfect” claims; more explicit assumptions.
- **Lean prompts:** remove rules that agents ignore or that duplicate supporting skills.
- **Global-first edits:** new requirements belong in **Global principles (canonical)** or one linked subsection—**avoid** stacking the same rule under non-goals, code generation, non-negotiables, and self-audit without that anchor (prevents patch-by-patch sprawl).

## What to measure

1. **Process adherence** — Does the run use **one intake step per turn** (no wall of Steps 1–6), **Step 2 asks for all three screenshots in one message**, intake stays **light** (no deep image analysis until pre-flight), then **pre-flight + confirmation** before coding? **After confirmation**, did the agent read the **core supporting skills** plus the **relevant conditional ones** and apply them at the right phase (see `references/supporting-skills.md`) rather than doing a single undifferentiated read? Does the **first** code pass reflect reusable styling, appropriate Next built-ins, a11y, and screenshot-grounded decisions without depending on a cleanup pass?
2. **Non-goals** — No fetch, no CMS hooks, no analytics in output?
3. **Tailwind prefixes vs captures** — Did the agent read the app’s `@theme` (e.g. brands `md` 992 / `lg` 1200) so **tablet ~1024** uses **`md:`**, not **`lg:`**, for layout seen on the tablet screenshot?
4. **Conditional rendering** — Missing props omit UI (spot-check generated JSX)?
5. **Single-file default** — Unjustified splits = regression.
6. **Closing report** — Present every time with consistent sections, including **## Copy-paste usage example** with a short JSX snippet (`placehold.co` for demo images when needed)?

## Qualitative review (recommended)

- Side-by-side: output vs screenshots at three breakpoints; **tab order** matches **DOM order** (no `order-*` inverting image vs copy columns).
- **Visual metrics:** do title/body/CTA **sizes, weights, colors, and spacing** match what pre-flight extracted from the images (arbitrary Tailwind values justified when tokens don’t fit)?
- Is Tailwind readable and maintainable?
- Any new dependency without approval?

## Quantitative checks (optional)

- Assert output file path matches the resolved destination under `apps/brands/src/components/<CleanComponentName>/index.tsx`.
- Assert no forbidden substrings in new component files: `getEntry`, `fetch(`, `@contentstack`, `analytics`, `useEffect` unless client component justified.
- Count `"use client"` occurrences (expect 0 or 1 with justification).

## Versioning habit

After substantive edits to `SKILL.md`, add a one-line note under `## Changelog` at the bottom of `SKILL.md` (date + change). Remove this section if the team prefers Git history only.

## Determinism tips

- Keep intake step wording **stable** in `SKILL.md` so the model repeats the same user-facing questions.
- Avoid long alternative workflows; one golden path reduces variance.
- If the model overfits one project layout, move repo-specific examples to a **reference** file and link it instead of bloating the main skill.

## Changelog

- 2026-03-31 — **Global principles** anchor in `SKILL.md`; iteration goals add **global-first edits**; `skill-creator` gains **Global principles before reactive patches**.
- 2026-03-31 — Qualitative review adds **tab order vs DOM**; rebuild output should omit **sanitize** / URL parsers; **`<a>`** CTAs by default.
- 2026-04-01 — Process checks now expect **core + relevant conditional** supporting-skill reads, aligned with `references/supporting-skills.md`, rather than a mandatory read of all eight every time.
- 2026-03-31 — Process checks include first-pass **Next built-ins by default**, **enum + `isDark`/CVA**, **`<figure>`** for informative images, and no refactor-dependent handoff.
- 2026-03-31 — Process checks now include mandatory `.agents/skills/.../SKILL.md` reads and first-pass CVA / `cn` / a11y / Image compliance.
