---
name: vail-visual-rebuild
description: Rebuild existing website UI as clean presentational Next.js 16 components with Tailwind CSS 4 from screenshots (and optional legacy HTML/CSS). Optional structured hints (e.g. eyebrow, heading, imagePosition left/right, theme light/dark). **Step-by-step conversational intake:** one main step per turn; **collect only** during Steps 1–6 (no deep screenshot analysis until pre-flight); ask for **all three** screenshots (mobile, tablet, desktop) in **one** Step 2 message; never dump Steps 1–6 together. Pre-flight summary + user confirmation before coding. No CMS wiring, fetch, or Sitecore logic migration. Use for Sitecore-to-Contentstack-style visual rebuilds, hero/banner/promo from captures, Next 16 App Router. Do not use for Contentstack SDK wiring, analytics, or server logic parity.
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

1. **Always** execute the intake steps in the **exact order** in [Required intake flow](#required-intake-flow), **one step per assistant turn** (see [Conversational intake](#conversational-intake-one-step-per-turn)). Do not skip or reorder.
2. **Always** run [Pre-flight analysis and user confirmation](#pre-flight-analysis-and-user-confirmation-before-code) **after** intake and **before** writing code. Never start implementation on a silent assumption when any doubt exists—**ask first**.
3. **Always** apply [Evidence priority](#evidence-priority) in the listed order when deciding structure and styles.
4. **Always** complete [Self-audit](#self-audit) and [Final code review](#final-code-review) using the same section headings and the report shape in `references/final-review-template.md`.
5. **Always** log assumptions with the format in `references/assumption-log.md`.
6. When inferring from screenshots, **state breakpoints and layout decisions explicitly**—but **only** in **pre-flight** and later (not during Steps 1–6 intake).
7. Prefer **one primary file** at the user destination unless a split is justified (see [Output architecture](#output-architecture)).

If information is missing for any intake step, **stop and ask**—do not guess critical paths or interaction requirements.

## Collect first, analyze later (latency and focus)

During **Steps 1–6**, behave as **intake only**:

- **Do not** deeply analyze screenshots, compare breakpoints, infer grid structure, or write long design commentary.
- **Do not** read image pixels beyond a **one-line acknowledgment** (e.g. “Got all three—continuing to Step 3.”).
- **Do** store mentally / rely on the thread for answers and move to the next step quickly.

**Full** visual analysis, layout decisions, Tailwind strategy, conflicts between screenshot vs markup vs prompts, and **Open questions** belong in the **pre-flight** block **after** Step 6—and in implementation **after** user confirmation.

This keeps each intake turn short and avoids “thinking” on every step like a final implementation pass.

## Conversational intake (one step per turn)

Intake must feel like a **guided chat**, not a form dumped in one message.

**Do:**

- Send **only one main intake step** per assistant turn. Label it: `Step X of 6 — <short title>`.
- **Wait for the user’s reply** before sending the next step.
- Keep each message **short** (few sentences + bullets if needed).
- For **optional** steps (3–6), offer **fast exits**, e.g. “Reply **none** / **skip** if you don’t have HTML” or “**A)** no interaction **B)** needs interaction—describe.” (Plain text; no dependency on client UI affordances.)
- After **Step 6**, send the **Rebuild plan** pre-flight block **alone**, **then** do consolidated analysis—still wait for confirmation before coding.

**Do not:**

- List **all** steps (1–6) in a single message.
- Ask for Step 3+ before Step 1 and Step 2 are satisfied.
- Combine the pre-flight block with Step 6 in the same turn unless the user already finished every prior step in earlier messages.
- Spend intake turns on analysis that belongs in pre-flight.

**Screenshots (Step 2) — single message:** In **one** Step 2 turn, request **all three** attachments in **this order** and state they are the primary evidence:

1. Mobile  
2. Tablet  
3. Desktop  

User may attach three files in one reply or in follow-up messages in the same step—do not advance to Step 3 until all three are present (or user says one is unavailable—in which case note it for pre-flight **Open questions** and still proceed).

## Required intake flow

Collect inputs **in this order only**. Within each step, use the **same short prompts** each run (adjust wording minimally). Obey [Conversational intake](#conversational-intake-one-step-per-turn).

### Step 1 — Destination path

Ask for the **exact** path where the component must live, including the entry file, for example:

- `components/Hero/index.tsx`
- `src/components/PromoBanner/index.tsx`

Confirm whether the project uses `src/` and align with repo conventions.

**This turn must contain nothing except Step 1** (plus brief greeting if needed).

### Step 2 — Screenshots (required; all three in one request)

Ask once for **mobile, tablet, and desktop** screenshots, **in that order**, in the **same** Step 2 message. See [Conversational intake](#conversational-intake-one-step-per-turn). **Do not** analyze them here—acknowledge receipt briefly and go to Step 3.

### Step 3 — Optional legacy HTML / CSS

**Only after** all three screenshots are collected (or user supplied all at once). Ask if the user can provide relevant HTML and/or CSS from the current site. **One turn;** Step 3 only.

If provided:

- Use only when **structurally meaningful** and relevant to the **visible** component.
- Do **not** trust it automatically; strip CMS noise, wrapper junk, and Sitecore artifacts unless clearly useful.
- If markup **conflicts** with screenshots, **screenshots win**.

### Step 4 — Interactivity and dependencies

**One turn;** Step 4 only. Ask whether the component needs **interaction** (hover menus, carousel, tabs, dialogs, etc.) or behavior that might need a **library**.

- **Default:** implement without new dependencies.
- If a dependency would clearly help: **propose it**, explain why, and **wait for approval** before adding. If rejected, implement a **no-dependency** version when reasonable.

### Step 5 — Optional content structure

**One turn;** Step 5 only. Ask which **content pieces** the component may contain (optional list), for example:

eyebrow, title, subtitle, description, image, CTA, secondary CTA, badge, caption, logo, items, links, etc.

Map these to **optional props**. If a value is absent, **do not render** that UI (no empty wrappers unless layout absolutely requires a stable shell—prefer avoiding placeholder DOM).

### Step 6 — Optional structured prompts (design hints)

**One turn;** Step 6 only. Ask whether the user wants to supply **structured hints** (freeform bullets or key-value lines) about the component—**this step is optional**.

Examples of what users may pass:

- `eyebrow`, `heading`, `description`, `image`  
- `imagePosition`: `left` | `right` (drives column order / flex direction on wide layouts; stack behavior must still align with screenshots)  
- `theme`: `light` | `dark` (drives background, text, and border token choices; must not invent a second design system—use project Tailwind tokens)  
- Any additional slots (badge, caption, CTA labels, etc.)

**Use structured prompts to:**

- Name props consistently with user vocabulary  
- Apply **theme** and **image-position variants** when screenshots alone do not show both states  
- Clarify intent when screenshots are ambiguous  

**Conflict handling:** If structured prompts **contradict** visible evidence in the screenshots (e.g. prompt says image right, all screenshots show image left), **stop and ask**—do not silently pick one.

See `references/structured-prompts.md` for the canonical hint table and conflict rules.

<a id="pre-flight-analysis-and-user-confirmation-before-code"></a>

## Pre-flight analysis and user confirmation (before code)

**Mandatory gate.** After Steps 1–6 are complete (and optional steps skipped or answered “none”), **do not generate code yet**. This is the **first** place where you perform full cross-screenshot analysis and consolidation.

1. **Synthesize** everything received: destination path, breakpoint evidence, optional markup verdict, interactivity/dependency needs, content slots, structured prompts (if any).  
2. **Summarize in a short, fixed block** for the user (use the same headings every run):

   ```markdown
   ## Rebuild plan (confirm before implementation)

   - **Destination:** …
   - **Evidence:** mobile / tablet / desktop screenshots (+ legacy HTML: used / ignored / partial)
   - **Structured prompts:** … or *none*
   - **Layout & responsiveness:** …
   - **Theme / variants:** … (e.g. light/dark, image left/right)
   - **Interactivity & dependencies:** …
   - **Props (optional slots):** …
   - **Open questions:** … *(must be non-empty if anything is unclear)*
   ```

3. **Explicitly invite correction:** Ask if the user agrees or wants changes **before** you implement.  
4. **Minimal doubt rule:** If there is **any** ambiguity that would materially change markup, styles, or props (breakpoints, theme, image side, interaction, copy structure), **ask a targeted question** in **Open questions** and **wait**—do not improvise.  
5. Only after the user **confirms** (or resolves open questions) proceed to implementation.

If the user says “proceed” without answering an open question, **re-ask** or state your chosen assumption explicitly and ask for ack—prefer clarifications over silent guesses.

## Evidence priority

Apply in this **exact** order when resolving design decisions:

1. Mobile, tablet, and desktop screenshots (layout, spacing, composition, default visual theme)  
2. **Structured prompts** (when provided): `theme`, `imagePosition`, and explicit slot names—**unless they visibly conflict with screenshots**; on conflict, **stop and ask**  
3. Coherent, useful legacy HTML/CSS (when provided)  
4. Project conventions and installed skills (see [Supporting skills](#supporting-skills-internal))  
5. Careful inference—**document every inference** as an assumption  

On conflict between screenshots and legacy markup: **screenshots win**. On conflict between screenshots and structured prompts: **ask the user** before coding.

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

1. Collect destination path (intake: light)  
2. Collect **all three** screenshots in **one** Step 2 message—mobile, tablet, desktop order (intake: acknowledge only)  
3. Ask for optional HTML/CSS (collect only)  
4. Interactivity and dependencies  
5. Optional content structure  
6. Optional structured prompts — theme, `imagePosition`, slots  
7. **[Pre-flight](#pre-flight-analysis-and-user-confirmation-before-code)** — full analysis: screenshots per breakpoint, whether HTML/CSS is useful, conflicts, open questions; **wait for go-ahead**  
8. After confirmation: detailed layout/Tailwind plan if not fully settled in pre-flight  
9. Resolve dependency approval if still open  
10. Generate code at the provided path  
11. Add extra files only if justified, same folder only  
12. [Self-audit](#self-audit)  
13. [Final code review](#final-code-review)  

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
- `references/structured-prompts.md` — optional hint keys (`theme`, `imagePosition`, etc.)  
- `references/trigger-eval-queries.json` — queries for future description optimization (skill-creator `run_loop`)

## Changelog

- 2026-03-31 — Renamed skill and folder: `vail-visual-rebuild` (was `next-visual-rebuild`).
- 2026-03-31 — **Collect-then-analyze:** no deep screenshot work during Steps 1–6; analysis in pre-flight (after Step 6). Step 2 asks for **all three** screenshots in **one** message. Optional fast-reply hints (`none`, A/B). Frontmatter updated.
- 2026-03-31 — Conversational intake: one main step per turn; forbid dumping Steps 1–6 in one message.
- 2026-03-31 — Optional Step 6 structured prompts (`theme`, `imagePosition`, slots); mandatory pre-flight summary + user confirmation; evidence priority updated; `references/structured-prompts.md`.
- 2026-03-31 — Initial skill: intake flow, evidence priority, supporting skills, evals stub.
