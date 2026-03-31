---
name: vail-visual-rebuild
description: Rebuild existing website UI as clean presentational Next.js 16 components with Tailwind CSS 4 from screenshots, optional legacy HTML/CSS, and optional **written style notes** (colors, padding, container classes, typography from the old site).  Optional structured hints (e.g. eyebrow, heading, imagePosition left/right, theme light/dark). **Step-by-step conversational intake:** one main step per turn; **collect only** during Steps 1–6 (no deep screenshot analysis until pre-flight); ask for **all three** screenshots (mobile, tablet, desktop) in **one** Step 2 message; never dump Steps 1–6 together. Pre-flight summary + user confirmation before coding. **Before code:** read project `.agents/skills/*/SKILL.md` for accessibility, Next.js, Tailwind design system, Vercel React practices, and frontend-design; first implementation must use **CVA + cn object maps**, a11y, and `next/image` discipline per those skills. **When done:** closing message must include a **short copy-paste JSX usage example**; use `https://placehold.co/WxH` for placeholder images. No CMS wiring, fetch, or Sitecore logic migration. Use for Sitecore-to-Contentstack-style visual rebuilds, hero/banner/promo from captures, Next 16 App Router. Do not use for Contentstack SDK wiring, analytics, or server logic parity.
---

# Next.js 16 visual component rebuild (Sitecore → Contentstack prep)

## Purpose

Recreate **existing website components as presentational Next.js 16 code** using **Tailwind CSS 4**, driven primarily by **mobile, tablet, and desktop screenshots**, with **optional** legacy HTML/CSS and **optional written style notes** from the user (see Step 3) when useful.

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
5. **Always** run [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code) **before** the first line of implementation code—**not** from memory alone.
6. **Always** log assumptions with the format in `references/assumption-log.md`.
7. When inferring from screenshots, **state breakpoints and layout decisions explicitly**—but **only** in **pre-flight** and later (not during Steps 1–6 intake).
8. Prefer **one primary file** at the user destination unless a split is justified (see [Output architecture](#output-architecture)).

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
- For **optional** steps (3–6), offer **fast exits**, e.g. “Reply **none** / **skip** if you have no HTML/CSS **and no style notes**” or “**A)** no interaction **B)** needs interaction—describe.” (Plain text; no dependency on client UI affordances.)
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

**Recommended viewport widths (soft guidance, not blocking):** Ask the user to capture at **approximately** **375px** (mobile), **1024px** (tablet), and **1440px** (desktop) when they can—DevTools responsive mode or equivalent. This tends to improve **spacing and type scale inference** because evidence aligns with common Tailwind breakpoints (`md`/`lg`) and reduces run-to-run variance. If their design uses different canonical widths, they may state actual widths in the reply; note them in pre-flight for implementation.

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

Ask once for **mobile, tablet, and desktop** screenshots, **in that order**, in the **same** Step 2 message. See [Conversational intake](#conversational-intake-one-step-per-turn)—include the **recommended widths** (375 / 1024 / 1440) as optional guidance. **Do not** analyze them here—acknowledge receipt briefly and go to Step 3.

### Step 3 — Optional legacy markup, CSS, **or written style notes**

**Only after** all three screenshots are collected (or user supplied all at once). **One turn;** Step 3 only.

Ask whether the user can share **any** of the following (all optional; any combination is fine):

1. **HTML and/or CSS** from the current / Sitecore-rendered page (snippets or files).  
2. **Written style guidance**—clear, implementation-oriented notes that are **not** full source files, for example:
   - layout wrappers (`container`, `max-w-*`, centered column width)  
   - **colors** (hex/RGB, CSS variables, or “primary is …”)  
   - **spacing** (padding/margin scale, section vertical rhythm)  
   - **typography** (font family, sizes, weights, tracking for eyebrow/heading/body)  
   - **borders, radius, shadows**  
   - **breakpoint behavior** they remember from the old build (“sidebar drops below at 768px”)  
   - **Tailwind / utility class names** copied from DevTools if that is all they have  

**During intake:** store these notes verbatim (acknowledge briefly); **do not** deeply reconcile them with screenshots until pre-flight.

**When implementing:**

- Treat **user-authored style notes** as **high-signal** when they describe the legacy component: map them to Tailwind v4 classes or project tokens (`@repo/ui` / `globals.css`) where possible.
- For **HTML/CSS**: use only when **structurally meaningful**; strip CMS noise and Sitecore artifacts unless clearly useful.
- **Conflict resolution:** If written notes or markup **contradict** the screenshots on something visible (layout side, background color, spacing), **screenshots win** for composition—**flag the conflict** in pre-flight **Open questions** and ask unless the user already said “trust the notes over pixels.”

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

1. **Synthesize** everything received: destination path, breakpoint evidence, optional markup + **style notes** verdict, interactivity/dependency needs, content slots, structured prompts (if any).  
2. **Summarize in a short, fixed block** for the user (use the same headings every run):

   ```markdown
   ## Rebuild plan (confirm before implementation)

   - **Destination:** …
   - **Evidence:** mobile / tablet / desktop screenshots (+ legacy HTML/CSS: used / ignored / partial; **style notes:** summarized bullets or *none*)
   - **Structured prompts:** … or *none*
   - **Layout & responsiveness:** …
   - **Theme / variants:** … (e.g. light/dark, image left/right)
   - **Interactivity & dependencies:** …
   - **Props (optional slots):** …
   - **Implementation standards (after you confirm):** read `.agents/skills` supporting `SKILL.md` files, then first draft with CVA + `cn` object maps, a11y, Next `Image`, and design tokens per those skills
   - **Open questions:** … *(must be non-empty if anything is unclear)*
   ```

3. **Explicitly invite correction:** Ask if the user agrees or wants changes **before** you implement.  
4. **Minimal doubt rule:** If there is **any** ambiguity that would materially change markup, styles, or props (breakpoints, theme, image side, interaction, copy structure), **ask a targeted question** in **Open questions** and **wait**—do not improvise.  
5. Only after the user **confirms** (or resolves open questions) proceed to implementation.

If the user says “proceed” without answering an open question, **re-ask** or state your chosen assumption explicitly and ask for ack—prefer clarifications over silent guesses.

## Evidence priority

Apply in this **exact** order when resolving design decisions:

1. Mobile, tablet, and desktop screenshots (layout, spacing, composition, default visual theme)  
2. **User-provided style notes** from Step 3 (colors, padding, container rules, typography, DevTools class hints)—use to **inform** Tailwind and tokens; on **visible** conflict with screenshots, prefer screenshots and **surface** in Open questions unless the user prioritized notes  
3. **Structured prompts** (Step 6): `theme`, `imagePosition`, slot names—on conflict with screenshots, **ask**  
4. Coherent, useful legacy HTML/CSS (when provided)  
5. Project conventions and **loaded** supporting skill files (see [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)—not generic “best practices” from memory)  
6. Careful inference—**document every inference** as an assumption  

On conflict between screenshots and legacy markup: **screenshots win** for layout/composition. On conflict between screenshots and **written style notes**: default same; **ask** if the mismatch is large or ambiguous.

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

<a id="implementation-quality-pass-before-shipping-code"></a>

<a id="mandatory-skill-file-reads-blocking-before-code"></a>

## Mandatory skill file reads (blocking before code)

After the user confirms the **Rebuild plan**, you **must not** write or edit component TS/TSX/CSS until each applicable project skill file below has been **read into context** (e.g. editor Read tool on the file). **Paraphrasing this `vail-visual-rebuild` page from memory does not count** as having applied `accessibility-a11y`, `next-best-practices`, etc.

**Canonical paths** (relative to the workspace root; this monorepo keeps skills under `.agents/skills/`):

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

**If a path is missing** (skill not installed in the repo): state that in **Open questions** or the final review, apply the remaining loaded skills, and do **not** drop accessibility or Next.js discipline entirely.

**After reading:** apply what those skills require to **the actual JSX/CSS you are about to write** (semantics, labels, `next/image`, tokens, layout, performance, visual polish)—not only to the closing prose.

---

## Non-negotiable implementation standards (first draft must comply)

These apply from the **first** implementation pass, not as a later refactor:

1. **Variants** — If `theme`, `size`, `emphasis`, or similar changes **multiple nodes’** classes, use **`cva`** for those surfaces; use **`cn`** with **object maps** for boolean layout flags (e.g. `imagePosition`, `hasImage`). **Forbidden:** repeating `theme === "dark" ? "…" : "…"` on every child when a variant map or CVA would centralize it.
2. **`cn`** — Prefer one `cn()` with a base string plus `{ "class": condition }` for conditionals; reserve ternaries for simple one-offs only.
3. **Accessibility** — Follow the loaded `accessibility-a11y` skill: landmarks/sections, heading order, **accessible names** (`aria-labelledby` / `aria-label` as appropriate), visible **focus** styles on interactive elements, **alt** text strategy for images, contrast-sensitive choices when variants change background/text.
4. **Next.js** — Follow the loaded `next-best-practices` skill: default **Server Component** unless approved client behavior; **`next/image`** without `unoptimized` when hosts are covered by `remotePatterns` (or document why not); sound **`sizes`** for responsive images.
5. **Design system** — Follow loaded Tailwind / theme skills: prefer **`@repo/ui`** tokens, shared `globals.css` / `@theme` variables, and existing patterns over ad-hoc hex everywhere when the project already defines equivalents.
6. **External links** — For `http:` / `https:` CTAs, set `rel="noopener noreferrer"` (and only use `target="_blank"` if the user explicitly asked for a new tab).
7. **Labeled regions** — If a `<section>` is titled with a visible heading, ensure **`aria-labelledby`** matches a stable **`id`** on that heading (user-supplied id or a deterministic derived id if the skill allows and collisions are documented).

---

## Implementation quality pass (mandatory before shipping code)

**Order (strict):**

1. **Mandatory skill file reads** — complete the table in [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code).  
2. **Non-negotiable checklist** — satisfy [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) in the code you are about to write.  
3. **`cn` / CVA** — If the repo already uses **`@repo/ui`**, import **`cn`** from `@repo/ui/lib/utils` (or the project’s shared helper)—do not duplicate merge helpers. Ensure **`class-variance-authority`** resolves in the **target app package** (see [Dependency policy](#dependency-policy)).

Skipping this pass is a **process failure**; the deliverable is not complete until it is done.

## `cn` and conditional classes

- Use **`cn` from the project** (typically `clsx` + `tailwind-merge` via `@repo/ui/lib/utils`).
- Prefer **one `cn()` call** with **base strings** plus an **object map** for booleans / variant flags—easier to scan than long ternary chains.

**Example pattern (follow this style):**

```tsx
className={cn(
  "mb-4 grow",
  "text-[13px] leading-[20px] md:leading-[23px]",
  "text-black",
  { "text-red-600": isDark },
)}
```

- Avoid repeating the same condition many times (`theme === "light" ? "…" : "…"` on every node) when a shared variant map or CVA cleans it up (see below).

## Variants: `class-variance-authority` (CVA)

- When the component has **multiple visual variants** (e.g. `theme: light | dark`, `size`, `emphasis`, `imagePosition` driving shared surfaces), use **`cva`** (`class-variance-authority`) to **centralize** class strings and **`cn`** for one-off composition.
- **Compound variants** are appropriate when two props interact (e.g. `theme` + `layout`).
- **Goal:** duplicate fewer class fragments; change one variant definition instead of hunting ternaries.
- **Use `cva` whenever** [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) call for it. Resolution rules: [Dependency policy](#dependency-policy).

Keep `cva` definitions **next to** the component (same file) unless the team prefers `variants.ts` in the folder.

## Dependency policy

- Default: **no new** `package.json` dependencies.
- **`class-variance-authority`:** Use **`cva`** whenever [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) require it. If the target app cannot resolve `class-variance-authority` (e.g. only a transitive dep via `@repo/ui`), add it as a **direct** dependency on that app with the same major version as `@repo/ui`—**no separate approval** needed when it matches the shared UI stack. If **no** package in the workspace lists `class-variance-authority`, **ask once** for approval before adding it to the target app.
- Propose any **other** dependency only with user approval and a one-sentence justification.

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

These are **not optional decoration**—they are **required file reads** per [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code). Use them **without** exposing a multi-skill UX to the end user (no need to paste skill bodies into chat—**do** apply them in code and mention them briefly in the final review).

| Skill | Use for |
| --- | --- |
| `frontend-design` | Visual quality, composition, avoiding generic UI |
| `accessibility-a11y` | WCAG-minded markup, semantics, focus |
| `next-best-practices` | App Router, RSC defaults, `Image`, structure |
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
3. Ask for optional HTML/CSS **and/or written style notes** (collect only)  
4. Interactivity and dependencies  
5. Optional content structure  
6. Optional structured prompts — theme, `imagePosition`, slots  
7. **[Pre-flight](#pre-flight-analysis-and-user-confirmation-before-code)** — full analysis: screenshots per breakpoint, HTML/CSS + **style notes** usefulness, conflicts, open questions; **wait for go-ahead**  
8. After confirmation: detailed layout/Tailwind plan if not fully settled in pre-flight  
9. Resolve dependency approval if still open  
10. **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** — read **each** listed `SKILL.md` into context  
11. **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** — non-negotiable standards + `cn` / CVA + shared `cn` helper  
12. Generate code at the provided path  
13. Add extra files only if justified, same folder only  
14. [Self-audit](#self-audit)  
15. [Final code review](#final-code-review) — include [copy-paste usage example](#copy-paste-usage-example-mandatory-closing-deliverable)  

## Self-audit

Before finishing, verify:

- **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** completed—final review lists **paths** of `SKILL.md` files read (or documents any missing path).  
- **[Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply)** satisfied in the shipped code (not deferred to a “later cleanup”).  
- **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** was executed end-to-end.  
- Semantic HTML and heading logic  
- Accessibility per loaded `accessibility-a11y` (interactive controls, images alt strategy, visible focus, section/heading naming)  
- Mobile-first breakpoints match stated screenshot analysis  
- Visual alignment with evidence (honest about coverage gaps)  
- Tailwind clarity; **`cn`** object maps for boolean layout flags; **`cva`** when multi-node variants (e.g. `theme`) apply  
- `next/image`: avoid `unoptimized` unless documented; prefer configured `remotePatterns`  
- Server vs client correctness  
- Dependencies: CVA direct on target app when needed (see [Dependency policy](#dependency-policy)); no other unapproved packages  
- No unnecessary file splits  
- Optional props and conditional rendering consistent  
- Imports and naming clean  
- **[Copy-paste usage example](#copy-paste-usage-example-mandatory-closing-deliverable)** in the closing message (concise JSX; `https://placehold.co/{width}x{height}` for demo images when needed)  

## Copy-paste usage example (mandatory closing deliverable)

When implementation is **complete**, the closing turn **must** include **two** things:

1. A brief “done” message (as today).  
2. A **separate, short block** the user can **copy-paste** into a page or story: a **single usage example** of the component you built.

**Rules for the example:**

- **Keep it concise**—one component invocation (or one primary export); only props that help the user get started. Do **not** paste the whole implementation file here.  
- Use the **actual exported component name** and **prop names** from the delivered code.  
- **Placeholder images:** when the component needs an image URL, use **`https://placehold.co/{width}x{height}`** with dimensions that match the layout (e.g. `600x400`, `800x600`). Do not invent unrelated image CDNs.  
- Use **realistic placeholder copy** (eyebrow, heading, description, CTA label/href) aligned with the rebuild context when possible.  
- If the component supports **`headingId`** (or similar), include it in the example so paste-in usage is accessible-friendly.  
- If multiple named exports matter, add **at most one extra line** naming the secondary usage—still keep the block short.

**Next.js `next/image`:** If the example uses `placehold.co` (or any remote host), add **one short reminder** in the final review: ensure that host is allowed in the target app’s `images.remotePatterns` (add it if missing).

Place the example under the heading **`## Copy-paste usage example`** in the closing report (see `references/final-review-template.md`).

## Final code review

End every run with a **short, fixed-structure** summary. Follow `references/final-review-template.md` for the exact bullets.

Minimum content:

- Files created  
- Why this structure (single file vs split)  
- Assumptions and uncertainties  
- Dependencies proposed or used  
- Accessibility and responsive notes  
- Manual follow-up before Contentstack wiring  
- **[Copy-paste usage example](#copy-paste-usage-example-mandatory-closing-deliverable)** (mandatory JSX block + `placehold.co` / `remotePatterns` note when relevant)  

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

- 2026-03-31 — **Closing deliverable:** mandatory **copy-paste usage example** (concise JSX) plus brief completion message; placeholder images via `https://placehold.co/{width}x{height}`; remind about `images.remotePatterns` when using remote hosts. `references/final-review-template.md`, self-audit, workflow step 15, and [Final code review](#final-code-review) updated.
- 2026-03-31 — **Mandatory skill file reads:** blocking step to load each supporting `SKILL.md` under `.agents/skills/` before implementation (not from memory). **Non-negotiable implementation standards** (CVA, `cn` objects, a11y, Next Image, tokens, external `rel`, labeled sections). **Dependency policy:** CVA as direct dep on target app when needed. Workflow, self-audit, evidence priority, frontmatter, and `references/final-review-template.md` updated accordingly.
- 2026-03-31 — Step 2: **recommended** screenshot widths ~375 / 1024 / 1440 for more stable spacing inference (soft guidance).
- 2026-03-31 — Step 3 expanded: optional **written style notes** (colors, padding, container, typography, etc.) alongside HTML/CSS; evidence priority updated.
- 2026-03-31 — Mandatory **implementation quality pass** (read supporting skills); **`cn`** object-map pattern; **CVA** for multi-variant styling when appropriate; self-audit extended (`unoptimized` Image, CVA/cn checks).
- 2026-03-31 — Renamed skill and folder: `vail-visual-rebuild` (was `next-visual-rebuild`).
- 2026-03-31 — **Collect-then-analyze:** no deep screenshot work during Steps 1–6; analysis in pre-flight (after Step 6). Step 2 asks for **all three** screenshots in **one** message. Optional fast-reply hints (`none`, A/B). Frontmatter updated.
- 2026-03-31 — Conversational intake: one main step per turn; forbid dumping Steps 1–6 in one message.
- 2026-03-31 — Optional Step 6 structured prompts (`theme`, `imagePosition`, slots); mandatory pre-flight summary + user confirmation; evidence priority updated; `references/structured-prompts.md`.
- 2026-03-31 — Initial skill: intake flow, evidence priority, supporting skills, evals stub.
