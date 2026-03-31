---
name: next-visual-rebuild
description: Rebuild existing website UI as clean presentational Next.js 16 components with Tailwind CSS 4 from screenshots (and optional legacy HTML/CSS). Strict workflow—no CMS wiring, no data fetching, no business-logic migration. Use this skill whenever the user is migrating from Sitecore (or similar) to Contentstack and needs pixel-informed but maintainable presentational components, visual reconstruction from mobile/tablet/desktop captures, hero/banner/promo/card sections rebuilt for App Router, or explicitly says they want presentation-only components before CMS hookup. Also use for repeatable component-from-screenshots work in Next 16 monorepos even if migration is not named. Do not use for API routes, Contentstack SDK integration, analytics, or replicating server-side Sitecore logic.
---

# Next.js 16 visual component rebuild (Sitecore → Contentstack prep)

## Purpose

Recreate **existing website components as presentational Next.js 16 code** using **Tailwind CSS 4**, driven primarily by **mobile, tablet, and desktop screenshots**, with **optional** legacy HTML/CSS only when useful.

This skill is **not** a logic or CMS migration skill. Output must stay easy to **manually wire to Contentstack later**.

## Strict non-goals

- Do not migrate business logic, hidden legacy application logic, or Sitecore server behavior.
- Do not add CMS integration, data fetching, analytics, or fake loading patterns.
- Do not claim pixel-perfect fidelity when evidence is incomplete.
- Do not invent behavior or visual detail not supported by evidence.

## Determinism and repeatability

To keep runs **highly similar** across sessions:

1. **Always** execute the intake steps in the **exact order** in [Required intake flow](#required-intake-flow). Do not skip or reorder.
2. **Always** apply [Evidence priority](#evidence-priority) in the listed order when deciding structure and styles.
3. **Always** complete [Self-audit](#self-audit) and [Final code review](#final-code-review) using the same section headings and the report shape in `references/final-review-template.md`.
4. **Always** log assumptions with the format in `references/assumption-log.md`.
5. When inferring from screenshots, **state breakpoints and layout decisions explicitly** (e.g. “From desktop screenshot: two-column grid from `lg`; tablet stacks with `md:` adjustments.”).
6. Prefer **one primary file** at the user destination unless a split is justified (see [Output architecture](#output-architecture)).

If information is missing for any intake step, **stop and ask**—do not guess critical paths or interaction requirements.

## Required intake flow

Collect inputs **in this order only**. Use the same short prompts each run (adjust wording minimally).

### Step 1 — Destination path

Ask for the **exact** path where the component must live, including the entry file, for example:

- `components/Hero/index.tsx`
- `src/components/PromoBanner/index.tsx`

Confirm whether the project uses `src/` and align with repo conventions.

### Step 2 — Screenshots (required, fixed order)

Request **exactly three** screenshots, **in this order**:

1. Mobile  
2. Tablet  
3. Desktop  

State clearly that these are the **primary visual evidence**.

### Step 3 — Optional legacy HTML / CSS

Ask if the user can provide relevant HTML and/or CSS from the current site.

If provided:

- Use only when **structurally meaningful** and relevant to the **visible** component.
- Do **not** trust it automatically; strip CMS noise, wrapper junk, and Sitecore artifacts unless clearly useful.
- If markup **conflicts** with screenshots, **screenshots win**.

### Step 4 — Interactivity and dependencies

Ask whether the component needs **interaction** (hover menus, carousel, tabs, dialogs, etc.) or behavior that might need a **library**.

- **Default:** implement without new dependencies.
- If a dependency would clearly help: **propose it**, explain why, and **wait for approval** before adding. If rejected, implement a **no-dependency** version when reasonable.

### Step 5 — Optional content structure

Ask which **content pieces** the component may contain (optional list), for example:

eyebrow, title, subtitle, description, image, CTA, secondary CTA, badge, caption, logo, items, links, etc.

Map these to **optional props**. If a value is absent, **do not render** that UI (no empty wrappers unless layout absolutely requires a stable shell—prefer avoiding placeholder DOM).

## Evidence priority

Apply in this **exact** order:

1. Mobile, tablet, and desktop screenshots  
2. Coherent, useful legacy HTML/CSS (when provided)  
3. Project conventions and installed skills (see [Supporting skills](#supporting-skills-internal))  
4. Careful inference—**document every inference** as an assumption  

On conflict: **screenshots override markup**. On ambiguity: state the assumption; do not invent complex detail without support.

## Responsive rules

- **Mobile-first** Tailwind CSS 4.
- Infer layout, spacing, alignment, visibility, and grouping from the **three** screenshots.
- Prefer maintainable class strings over copying legacy CSS verbatim.

## Code generation rules

- Presentational Next.js **App Router** components; **semantic HTML**; **accessibility-conscious** structure (headings order, labels for interactive controls, focus where applicable).
- **No** `fetch`, Server Actions for domain data, Contentstack SDK, or CMS-specific code in generated files.
- **No** invented global state unless required for **approved** interactivity.
- Prefer **readable JSX** over cloning legacy DOM.
- English for **all code, comments in code, file names, and prop names**.

## Dependency policy

- Default: **no new** `package.json` dependencies.
- Propose a dependency only with user approval and a one-sentence justification.

## Output architecture

- **Default:** one file at the user-provided path (usually `index.tsx`), all output under that **component folder** only.
- Additional files only when justified, e.g.:

  - `ComponentNameClient.tsx` for approved client-only behavior  
  - Small local subcomponents, image wrapper, or `types.ts` if truly needed  

- Do not split files for style-only preference. Name files predictably: `index.tsx`, `ComponentNameClient.tsx`, `types.ts`, etc.

## Server / client boundary

- **Default:** Server Component (`"use client"` only when needed for approved interactivity or hooks).
- Keep the boundary **obvious** (thin client leaf if split).

## Prop design and conditional rendering

- Content props **optional** by default.
- Render fragments only when props are meaningful:

```tsx
{title ? <h2 className="...">{title}</h2> : null}
{description ? <p className="...">{description}</p> : null}
{image ? <Image ... /> : null}
{cta?.href && cta?.label ? <a href={cta.href}>...</a> : null}
```

- Avoid placeholder text unless the user explicitly wants it.

## Supporting skills (internal)

Strengthen output using these installed skills **without** exposing a multi-skill UX to the user—read them when relevant:

| Skill | Use for |
| --- | --- |
| `frontend-design` | Visual quality, composition, avoiding generic UI |
| `accessibility-a11y` | WCAG-minded markup, semantics, focus |
| `next-best-practices` | App Router, RSC defaults, structure |
| `tailwind-design-system` | Tokens, consistency with shared UI packages |
| `tailwind-theme-builder` | `@theme`, CSS variables if project uses them |
| `tailwindcss-advanced-layouts` | Grid/flex patterns |
| `tailwindcss-mobile-first` | Breakpoint discipline |
| `vercel-react-best-practices` | Performance-minded React patterns |

If the repo uses `@repo/ui` or shared Tailwind tokens, **prefer** matching existing patterns over ad-hoc values.

## Strict high-level workflow

Execute **in order**:

1. Collect destination path  
2. Collect mobile → tablet → desktop screenshots  
3. Ask for optional HTML/CSS  
4. Evaluate whether HTML/CSS is useful (discard noise)  
5. Identify content pieces → optional props  
6. Analyze screenshots per breakpoint  
7. Infer semantic structure and responsive behavior  
8. Decide whether to propose a dependency (get approval if yes)  
9. Generate code at the provided path  
10. Add extra files only if justified, same folder only  
11. [Self-audit](#self-audit)  
12. [Final code review](#final-code-review)  

## Self-audit

Before finishing, verify:

- Semantic HTML and heading logic  
- Basic accessibility (interactive controls, images alt strategy, visible focus where needed)  
- Mobile-first breakpoints match stated screenshot analysis  
- Visual alignment with evidence (honest about coverage gaps)  
- Tailwind clarity (no unmotivated magic numbers when tokens exist)  
- Server vs client correctness  
- No unapproved dependencies  
- No unnecessary file splits  
- Optional props and conditional rendering consistent  
- Imports and naming clean  

## Final code review

End every run with a **short, fixed-structure** summary. Follow `references/final-review-template.md` for the exact bullets.

Minimum content:

- Files created  
- Why this structure (single file vs split)  
- Assumptions and uncertainties  
- Dependencies proposed or used  
- Accessibility and responsive notes  
- Manual follow-up before Contentstack wiring  

## When stuck or evidence is thin

- List **Assumptions** explicitly (see `references/assumption-log.md`).  
- Prefer simpler layout over speculative detail.  
- Ask the user one **targeted** clarification rather than inventing—especially for interaction and copy.

## References

- `references/assumption-log.md` — assumption format  
- `references/final-review-template.md` — closing report template  
- `references/iteration-guide.md` — how to improve this skill over time  
- `references/trigger-eval-queries.json` — queries for future description optimization (skill-creator `run_loop`)

## Changelog

- 2026-03-31 — Initial skill: intake flow, evidence priority, supporting skills, evals stub.
