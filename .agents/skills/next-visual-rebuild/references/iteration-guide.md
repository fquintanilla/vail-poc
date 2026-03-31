# Iterating on `next-visual-rebuild`

## Goals when changing the skill

- **Repeatability:** same intake order, same evidence priority, same closing report shape.
- **Honesty:** fewer unjustified “pixel-perfect” claims; more explicit assumptions.
- **Lean prompts:** remove rules that agents ignore or that duplicate supporting skills.

## What to measure

1. **Process adherence** — Does the run use **one intake step per turn** (no wall of Steps 1–6), **Step 2 asks for all three screenshots in one message**, intake stays **light** (no deep image analysis until pre-flight), then **pre-flight + confirmation** before coding?
2. **Non-goals** — No fetch, no CMS hooks, no analytics in output?
3. **Conditional rendering** — Missing props omit UI (spot-check generated JSX)?
4. **Single-file default** — Unjustified splits = regression.
5. **Closing report** — Present every time with consistent sections?

## Qualitative review (recommended)

- Side-by-side: output vs screenshots at three breakpoints.
- Is Tailwind readable and maintainable?
- Any new dependency without approval?

## Quantitative checks (optional)

- Assert output file path matches user destination.
- Assert no forbidden substrings in new component files: `getEntry`, `fetch(`, `@contentstack`, `analytics`, `useEffect` unless client component justified.
- Count `"use client"` occurrences (expect 0 or 1 with justification).

## Versioning habit

After substantive edits to `SKILL.md`, add a one-line note under `## Changelog` at the bottom of `SKILL.md` (date + change). Remove this section if the team prefers Git history only.

## Determinism tips

- Keep intake step wording **stable** in `SKILL.md` so the model repeats the same user-facing questions.
- Avoid long alternative workflows; one golden path reduces variance.
- If the model overfits one project layout, move repo-specific examples to a **reference** file and link it instead of bloating the main skill.

## Changelog

- (Add entries here when you iterate.)
