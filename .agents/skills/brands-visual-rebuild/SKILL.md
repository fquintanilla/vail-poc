---
name: brands-visual-rebuild
description: Rebuild existing website UI as lean presentational Next.js 16 components with Tailwind CSS 4 for the `apps/brands` project from screenshots, optional legacy markup, and implementation notes. Use this whenever the user wants to recreate or migrate an existing brand marketing or content-driven component into a reusable presentational shell for `apps/brands`, especially from screenshots, legacy CMS output, or partial visual references. This skill is for visual rebuilds and reusable component scaffolds, not CMS wiring, business logic migration, or data integration.
---

# Next.js 16 visual component rebuild

## Purpose

Recreate **existing website components as presentational Next.js 16 code** for **`apps/brands`** using **Tailwind CSS 4**, driven primarily by **mobile, tablet, and desktop screenshots**, with **optional** legacy HTML/CSS and **optional written style notes** from the user (see Step 3) when useful.

This skill is for reusable **presentational rebuilds** across marketing-style components in **`apps/brands`**. It is **not** a logic or CMS migration skill. Output must stay easy to wire into the later Contentstack integration layer.

<a id="global-principles"></a>

## Global principles (canonical)

These apply **every** run. They are the **single anchor** for quality—**not** a growing list of one-off patches. When something new matters, **update this section** (or one downstream checklist) so the rule stays **global**, not a scattered MUST duplicated in five places.

1. **Rebuild vs integration boundary** — Generated files are a **lean presentational shell**: layout, tokens, semantics, framework-native primitives, and optional props. Prefer the appropriate **Next.js primitives** when they fit the job cleanly, such as **`next/image`**, **`next/link`**, and **`next/script`**. **Integration / final components** own: CMS wiring, rich-text handling, **HTML sanitization**, `dangerouslySetInnerHTML`, analytics, fetch, and other application-specific behavior. Keep the rebuild output focused on presentational structure that can be re-created or wired later in Contentstack or another CMS.

2. **Brands project context = source of truth** — This skill assumes the component belongs to **`apps/brands`**. Read **`apps/brands/src/app/globals.css`** first for `@theme`, breakpoint mapping, wrapper sizing, and app-level layout utilities. Read **`packages/ui/src/styles/globals.css`** for shared theme variables, color tokens, and `@theme inline` aliases used by the brands UI system. **When a matching theme token exists for a color, surface, border, ring, or similar themed value, use that token instead of a hardcoded hex or generic Tailwind neutral color.** Also treat **Storybook** as part of the deliverable: new rebuild components should ship with a story under **`apps/storybook/src/stories/brands`** using the repo’s Storybook conventions. Read the **supporting skill files that are relevant to this component and repo** and apply them by phase (see `references/supporting-skills.md`). **Do not** substitute memory or generic Tailwind defaults for repo facts.

3. **Accessibility is structural** — Follow **`accessibility-a11y`** while writing markup: landmarks, headings, names, focus, contrast, alt. **Tab and reading order follow the DOM**—**no** flex/grid **`order`** to swap major regions (image vs copy); use **JSX child order** ([Focus order and DOM](#focus-order-and-dom-accessibility)). A11y is not a post-hoc checklist after bad structure.

4. **Interactivity is inferred from evidence** — Do **not** make the user declare obvious behavior such as carousel, accordion, tabs, or dismissible panels when the screenshots already show it. Detect likely interaction patterns from the visual evidence and implement them when the design clearly calls for them. Prefer the platform and the packages already installed in `apps/brands`; do not reach for new dependencies when React, Next.js, semantic HTML, and the current workspace stack are enough. If the screenshots are ambiguous about whether something actually interacts, surface that uncertainty in pre-flight instead of silently inventing behavior.

5. **One styling system per component** — **`as const`** theme/layout keys, **`isDark`** (or equivalent) + **boolean CVA**, **`cn`** object maps for safe flags; avoid repeated string theme compares across nodes.

6. **Screenshots = quantitative design spec, not only wireframes** — The **three attachments** are the main source for **concrete** styling: approximate **font size, weight, tracking, line-height, casing**, **text and background colors**, **padding/margin/gap**, **borders and radius**, **shadows**, **image aspect / treatment**. In **pre-flight** and **implementation**, derive **the closest defensible Tailwind/CSS values** per breakpoint (compare mobile vs tablet vs desktop when type or spacing **changes**). Prefer **project tokens** when they match pixels. Use arbitrary values only when the shared theme token system genuinely has no suitable equivalent and the screenshots clearly justify the deviation. **Do not** substitute generic defaults (`text-lg`, `p-4`, `rounded-md`) when screenshots clearly show something else. **Do not** invent UI, layout variants, interactions, or image-cropping behavior that are not supported by the visible evidence. **Log assumptions** when compression or blur blocks exact pixels ([Visual extraction from screenshots](#visual-extraction-from-screenshots)).

7. **Skill maintenance (meta)** — When editing `brands-visual-rebuild`, **fold** new requirements into **Global principles** or **one** linked subsection—**avoid** append-only reactive bullets that repeat the same idea under Strict non-goals, Code generation, Non-negotiables, and Self-audit without pointing here first.

## Strict non-goals

- Do not migrate business logic, hidden legacy application logic, or Sitecore server behavior.
- Do not add CMS integration, data fetching, analytics, or fake loading patterns.
- Do not add sanitization libraries, HTML-cleaning helpers, or rich-text rendering pipelines in the rebuild output. If legacy content needs sanitization or special rendering later, that belongs to the integrated Contentstack-backed component layer, not the presentational rebuild.
- Do not hardcode themed colors with hex values or generic Tailwind neutrals when an equivalent shared theme token exists in `packages/ui/src/styles/globals.css`.
- Do not claim pixel-perfect fidelity when evidence is incomplete.
- Do not invent behavior or visual detail not supported by evidence.
- Do not violate **[Global principles](#global-principles)** (especially the **rebuild vs integration** boundary and **structural a11y**).

## Determinism and repeatability

To keep runs **highly similar** across sessions:

1. Follow the intake steps in order, one step per turn.
2. Do pre-flight before code, and ask instead of guessing when ambiguity changes the structure.
3. Apply evidence priority in the listed order.
4. Read the relevant supporting skills before implementation, not from memory.
5. Log assumptions and keep the closing report shape consistent with `references/final-review-template.md`.
6. Prefer one primary file unless a split is clearly justified.

## Collect first, analyze later (latency and focus)

During **Steps 1–4**, behave as **intake only**:

- **Do not** deeply analyze screenshots, compare breakpoints, infer grid structure, or write long design commentary.
- **Do not** read image pixels beyond a **one-line acknowledgment** (e.g. “Got all three—continuing to Step 3.”).
- **Do** store mentally / rely on the thread for answers and move to the next step quickly.

**Full** visual analysis—including **quantitative** pass on typography, color, spacing, radii, likely interaction patterns, and inferred content structure from the images—layout decisions, Tailwind strategy, conflicts between screenshot vs markup vs prompts, and **Open questions** belong in the **pre-flight** block **after** Step 4—and in implementation **after** user confirmation.

This keeps each intake turn short and avoids “thinking” on every step like a final implementation pass. **After** pre-flight, screenshots are still the authority for **how big / how bold / which hex**—not only box structure.

## Conversational intake (one step per turn)

Intake must feel like a **guided chat**, not a form dumped in one message.

**Do:**

- Send **only one main intake step** per assistant turn. Label it: `Step X of 4 — <short title>`.
- **Wait for the user’s reply** before sending the next step.
- Keep each message **short** (few sentences + bullets if needed).
- For **optional** steps (3–4), offer **fast exits**, e.g. “Reply **none** / **skip** if you have no HTML/CSS **and no style notes**”. (Plain text; no dependency on client UI affordances.)
- After **Step 4**, send the **Rebuild plan** pre-flight block **alone**, **then** do consolidated analysis—still wait for confirmation before coding.

**Do not:**

- List **all** steps (1–4) in a single message.
- Ask for Step 3+ before Step 1 and Step 2 are satisfied.
- Combine the pre-flight block with Step 4 in the same turn unless the user already finished every prior step in earlier messages.
- Spend intake turns on analysis that belongs in pre-flight.

**Screenshots (Step 2) — single message:** In **one** Step 2 turn, request **all three** attachments in **this order** and state they are the primary evidence for **layout, concrete styling, likely interaction patterns, and content structure** (sizes, weights, colors, spacing, carousel/accordion/tab evidence, visible slots)—with full extraction in **pre-flight** after Step 4, not during intake:

1. Mobile  
2. Tablet  
3. Desktop  

**Recommended viewport widths (soft guidance, not blocking):** Ask the user to capture at **approximately** **375px** (mobile), **1024px** (tablet), and **1440px** (desktop) when they can. Derive prefix mapping from **`apps/brands/src/app/globals.css`**. In the current brands setup, **1024px** maps to **`md:`**, not `lg:`. If their design uses different canonical widths, note them in pre-flight.

User may attach three files in one reply or in follow-up messages in the same step—do not advance to Step 3 until all three are present (or user says one is unavailable—in which case note it for pre-flight **Open questions** and still proceed).

## Required intake flow

Collect inputs **in this order only**. Within each step, use the **same short prompts** each run (adjust wording minimally). Obey [Conversational intake](#conversational-intake-one-step-per-turn).

### Step 1 — Component name

Ask for the **component name only**, not a path. The user may reply with spaces, punctuation, symbols, mixed casing, or other messy input.

Derive the component folder yourself using the brands repo convention:

- Base location: **`apps/brands/src/components`**
- Create the component at **`apps/brands/src/components/<CleanComponentName>/index.tsx`**
- If the implementation needs extra files, create them in that **same folder**

Normalize the user-provided name into a clean **PascalCase** folder/component name:

- Trim whitespace
- Split on spaces, dashes, underscores, and punctuation
- Remove unsupported special characters
- Collapse the remaining words into **PascalCase**
- Keep letters and numbers only in the final name
- If normalization would produce an empty name or a leading digit, repair it into a valid component-style name before continuing

In pre-flight, show both the **raw user-provided name** and the **resolved component path** so the user can correct it before implementation.

**This turn must contain nothing except Step 1** (plus brief greeting if needed).

### Step 2 — Screenshots (required; all three in one request)

Ask once for **mobile, tablet, and desktop** screenshots, **in that order**, in the **same** Step 2 message. See [Conversational intake](#conversational-intake-one-step-per-turn)—include the **recommended widths** (375 / 1024 / 1440) as optional guidance. **Do not** analyze them here—acknowledge receipt briefly and go to Step 3.

### Step 3 — Optional legacy markup, CSS, **or written style notes**

**Only after** all three screenshots are collected (or user supplied all at once). **One turn;** Step 3 only.

Ask whether the user can share **any** optional legacy input, such as:

1. **HTML and/or CSS** from the current rendered page (snippets or files).  
2. **Written style guidance** like colors, spacing, typography, wrappers, breakpoints, or utility/class hints.  

**During intake:** store these notes verbatim (acknowledge briefly); **do not** deeply reconcile them with screenshots until pre-flight.

**When implementing:**

- Treat **user-authored style notes** as **high-signal** when they describe the legacy component: map them to Tailwind v4 classes or project tokens where possible.
- For **HTML/CSS**: use only when **structurally meaningful**; strip CMS noise and Sitecore artifacts unless clearly useful.
- **Conflict resolution:** If written notes or markup **contradict** the screenshots on something visible (layout side, background color, spacing), **screenshots win** for composition—**flag the conflict** in pre-flight **Open questions** and ask unless the user already said “trust the notes over pixels.”

### Step 4 — Optional naming and hints

**One turn;** Step 4 only. Tell the user which **content pieces and prompts** you expect to infer primarily from the screenshots, for example:

eyebrow, title, subtitle, description, image, CTA, secondary CTA, badge, caption, logo, items, links, `theme`, `mediaPosition`, `alignment`, `columns`, `density`, or likely interaction patterns.

Ask whether they want to:

- rename any inferred fields so the props match their vocabulary
- add extra hints for variants, styling, layout, or behavior that the screenshots do not fully reveal
- say **none** if the screenshot-derived defaults are good

**Use this step to:**

- confirm or rename prop labels inferred from the images  
- add reusable variants and optional slots when screenshots alone do not show every state  
- clarify intent only where the screenshots are ambiguous  

Map inferred fields to **optional props**. If a value is absent, **do not render** that UI (no empty wrappers unless layout absolutely requires a stable shell—prefer avoiding placeholder DOM).

**Conflict handling:** If user-provided renames or hints **contradict** visible evidence in the screenshots in a way that changes structure, order, styling, or behavior, **stop and ask**—do not silently pick one.

See `references/structured-prompts.md` for the canonical hint table and conflict rules.

<a id="pre-flight-analysis-and-user-confirmation-before-code"></a>

## Pre-flight analysis and user confirmation (before code)

**Mandatory gate.** After Steps 1–4 are complete (and optional steps skipped or answered “none”), **do not generate code yet**. This is the **first** place where you perform full cross-screenshot analysis and consolidation.

1. **Synthesize** everything received: raw component name, resolved component path, breakpoint evidence, optional markup + **style notes** verdict, inferred interaction needs, inferred content slots, and any user corrections or extra hints from Step 4.  
2. **Summarize in a short, fixed block** for the user (use the same headings every run):

   ```markdown
   ## Rebuild plan (confirm before implementation)

   - **Component name:** raw input `…` → resolved `…`
   - **Destination:** `apps/brands/src/components/<CleanComponentName>/index.tsx`
   - **Evidence:** mobile / tablet / desktop screenshots (+ legacy HTML/CSS: used / ignored / partial; **style notes:** summarized bullets or *none*)
   - **Field names & extra hints:** screenshot-inferred defaults `…`; user adjustments `…` or *none*
   - **Layout & responsiveness:** …  
   - **Interaction inferred from screenshots:** none / carousel / accordion / tabs / dismissible / uncertain … and whether the current `apps/brands` stack can support it without new dependencies
   - **Visual tokens from screenshots (per breakpoint where they differ):** typography, surfaces, borders, spacing, radius/shadow, media treatment, and the **specific shared theme tokens** chosen from **`packages/ui/src/styles/globals.css`** for each themed value—see [Visual extraction from screenshots](#visual-extraction-from-screenshots)  
   - **Tailwind prefix map (from `apps/brands/src/app/globals.css`):** which screenshot (mobile / tablet / desktop) maps to `sm:` / `md:` / `lg:` in `apps/brands`—see [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)  
   - **Theme / variants:** … (e.g. light/dark, image left/right)
   - **Interactivity & dependencies:** … (prefer built-ins and installed packages first; call out if anything truly needs approval)
   - **Props (optional slots):** … (from screenshots first, then renamed/extended only where the user asked)
   - **Implementation standards (after you confirm):** satisfy **[Global principles](#global-principles)**; read supporting `SKILL.md` files and draft with CVA + `cn`, structural a11y, `next/image`, tokens
   - **Open questions:** … *(must be non-empty if anything is unclear)*
   ```

3. **Explicitly invite correction:** Ask if the user agrees or wants changes **before** you implement.  
4. **Minimal doubt rule:** If there is **any** ambiguity that would materially change markup, styles, or props (breakpoints, theme, image side, interaction, copy structure), **ask a targeted question** in **Open questions** and **wait**—do not improvise.  
5. Only after the user **confirms** (or resolves open questions) proceed to implementation.

If the user says “proceed” without answering an open question, **re-ask** or state your chosen assumption explicitly and ask for ack—prefer clarifications over silent guesses.

## Evidence priority

Apply in this **exact** order when resolving design decisions:

1. Mobile, tablet, and desktop screenshots — **layout and composition** *and* **quantitative styling** (type scale, weight, color, spacing, borders, shadows, image treatment) per [Visual extraction from screenshots](#visual-extraction-from-screenshots). Screenshots **outrank** generic Tailwind presets when both are available.  
2. **`apps/brands/src/app/globals.css`** — use for breakpoints, wrappers, and app-level layout utilities  
3. **`packages/ui/src/styles/globals.css`** — use for shared color tokens, theme variables, and `@theme inline` aliases; these outrank generic Tailwind color choices  
3. **User-provided style notes** from Step 3 (colors, padding, container rules, typography, DevTools class hints)—use to **inform** Tailwind and tokens; on **visible** conflict with screenshots, prefer screenshots and **surface** in Open questions unless the user prioritized notes  
4. **User corrections or extra hints** (Step 4): `theme`, `imagePosition`, slot names, variants—on conflict with screenshots, **ask**  
5. Coherent, useful legacy HTML/CSS (when provided)  
6. Project conventions and **loaded** supporting skill files (see [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)—not generic “best practices” from memory)  
7. Careful inference—**document every inference** as an assumption  

On conflict between screenshots and legacy markup: **screenshots win** for layout/composition. On conflict between screenshots and **written style notes**: default same; **ask** if the mismatch is large or ambiguous.

<a id="visual-extraction-from-screenshots"></a>

## Visual extraction from screenshots

Treat each capture as a **frozen design spec** at that viewport. Goal: **match visible metrics as closely as evidence allows**, then encode with Tailwind v4 using the nearest valid shared theme tokens from **`packages/ui/src/styles/globals.css`** when they align.

**In pre-flight (mandatory narrative):** For **each** of mobile / tablet / desktop, summarize what you **see** for:

| Area | What to estimate / note |
| --- | --- |
| **Typography** | Relative scale between eyebrow, title, body, CTA; **bold / regular**; **uppercase / sentence case**; **letter-spacing** (tight / wide); **line length / line height** feel |
| **Color** | Dominant text, background, border, CTA fill/stroke; **light vs dark** surfaces; hex or neutral scale if you can approximate from pixels |
| **Spacing** | Section padding, gap between stacked blocks, inset of text column vs image |
| **Shape** | Border presence/weight, **radius** (sharp vs pill), **shadow** depth |
| **Media** | Image **aspect / treatment** (tall vs wide, contained vs full-bleed, cropped vs uncropped only when visible) |

**In implementation:**

- Map estimates to **`font-sans` / theme fonts** when the app sets them; otherwise use stack defaults.
- Prefer **`text-sm` / `text-base` / …** only when they **match** the capture; if not, use **`text-[13px]`**, **`leading-[1.35]`**, **`tracking-[0.12em]`**, **`uppercase`**, **`font-bold`** / **`font-normal`** as **justified** by the images.
- Prefer the semantic colors and variables exposed through **`packages/ui/src/styles/globals.css`**. If a matching theme token exists for the visible role, use it. Do **not** fall back to hex values or generic Tailwind neutrals just because they look close. Use arbitrary values only when the screenshots clearly require a value that the token set does not provide.
- Encode **responsive type** (e.g. title larger on desktop) by **different utilities at the correct prefix** (`md:text-…`, `lg:text-…`) **derived from comparing** the three screenshots—not one size for all widths unless all three look the same.
- **CTA and chips:** match border thickness, padding, and gradient/solid fill from pixels when visible.
- **Interactive patterns from screenshots:** if the screenshots clearly show repeated slides, accordion disclosures, tab sets, dismiss controls, or similar UI, implement that behavior instead of asking the user to declare it up front. Prefer semantic HTML, React state, and packages already installed in `apps/brands`. If the workspace lacks a dedicated library and the pattern is straightforward, implement it without adding a new dependency.
- **Images from CMS:** do **not** assume cropping by default. If screenshots do not clearly show a fixed-ratio or cropped treatment, keep the image responsive and preserve its natural aspect ratio.

**Honesty:** If the image is too small or compressed to justify a number, state an **assumption** (`references/assumption-log.md`) and pick the nearest step; **do not** claim pixel-perfect without evidence.

**`frontend-design`:** use it to **refine hierarchy and polish** after metrics are grounded in captures—**not** to replace screenshot-backed sizes/colors with a generic template.

## Responsive rules

- **Mobile-first** Tailwind CSS 4.
- Infer layout, spacing, alignment, visibility, and grouping from the **three** screenshots.
- Prefer maintainable class strings over copying legacy CSS verbatim.

<a id="screenshot-viewports-vs-tailwind-prefixes"></a>

### Screenshot viewports vs Tailwind prefixes (read `apps/brands/src/app/globals.css`)

**Wrong default:** assuming **tablet ~1024px** should always drive **`lg:`** utilities. Read `apps/brands/src/app/globals.css` before deciding. In the current brands setup, `globals.css` sets **`sm: 768px`**, **`md: 992px`**, and **`lg: 1200px`**, so 1024px belongs to **`md:`**.

**Process:**

1. Open **`apps/brands/src/app/globals.css`** and read the `@theme` breakpoints and wrapper utilities.  
2. Read **`packages/ui/src/styles/globals.css`** for theme variables, colors, radii, shadows, and shared style tokens relevant to the rebuild.  
3. Map each capture to prefixes by **numeric comparison**: the **tablet** screenshot shows layout at its capture width (often **~1024px**). Use the **smallest** `min-width` tier that viewport **reaches**. In the current `apps/brands` setup, **1024px** belongs to **`md:`**.  
4. State this mapping explicitly in **pre-flight** ([Rebuild plan](#pre-flight-analysis-and-user-confirmation-before-code)) and implement classes accordingly (`md:grid-cols-2`, `md:…`, not `lg:…` for behavior visible only up to desktop). **Do not** rely on **`order-*`** to swap major columns; see [Focus order and DOM](#focus-order-and-dom-accessibility).  
5. Align **`next/image` `sizes`** (and any raw `@media`) with the same pixel thresholds so art direction matches the prefixes.

**Failure mode to avoid:** tablet capture implemented with **`lg:`** when the app’s **`lg`** starts **above** 1024—tablet layout will be wrong until the viewport hits desktop width.

## Code generation rules

- **Satisfy [Global principles](#global-principles) first**—details below elaborate; do not contradict the boundary or DOM-order rules.
- Write presentational Next.js **App Router** components with semantic HTML and readable JSX.
- Keep generated files free of `fetch`, Server Actions for domain data, CMS SDK code, route handlers, or invented global state unless approved interactivity truly requires it.
- Use English for code, comments, file names, and prop names.
- Prefer appropriate **Next.js primitives** (`next/image`, `next/link`, `next/script`, etc.) instead of raw HTML when they fit cleanly.
- Use reusable variant patterns: shared `as const` keys, a resolved flag such as `isDark`, and CVA/`cn` instead of repeated per-node string comparisons.
- Keep major class decisions traceable to screenshot-backed pre-flight notes.
- Infer interaction from the screenshots when the pattern is visually clear; do not bounce that responsibility back to the user during intake.
- If a whole-card or whole-section link pattern is clearly intended by the design or interaction model, that is acceptable. Do not treat a single clickable wrapper as a bug by default; judge it against the visible pattern and accessibility requirements.
- Ship the first generated version in a usable state; do not rely on a later cleanup pass.

<a id="focus-order-and-dom-accessibility"></a>

### Focus order and DOM (accessibility)

Per **`accessibility-a11y`:** keyboard and screen-reader order follow the **DOM**, not the painted order when CSS **`order`** (flex/grid) **reorders** whole sections.

- **Do not** use **`order-*`** (or similar) to swap **major regions** (e.g. image column vs text column) if that makes **visual order ≠ tab/reading order**. Users tab through **source order**; mismatches are a **failure** against this skill.
- **Preferred pattern:** **`imagePosition` left vs right** → **render the image block and copy block in JSX in the same sequence as the design’s reading order** (e.g. **two branches**: `imagePosition === "left" ? <>image, copy</> : <>copy, image</>`), then use **`md:grid-cols-2`** on a parent without relying on `order` to fix layout. On **mobile**, stack in the order those branches already imply (match screenshots).
- Minor **cosmetic** `order` on **non-interactive** siblings inside one region is acceptable only if it does **not** cross important focusable content boundaries—when in doubt, match DOM to visual.

<a id="mandatory-skill-file-reads-blocking-before-code"></a>

## Mandatory skill file reads (blocking before code)

After the user confirms the **Rebuild plan**, you **must not** write or edit component TS/TSX/CSS until the **relevant** project skill files below have been **read into context** (e.g. editor Read tool on the file). You must also read **`apps/brands/src/app/globals.css`** for breakpoints and wrapper sizing, plus **`packages/ui/src/styles/globals.css`** for theme colors and shared style tokens. **Paraphrasing this `brands-visual-rebuild` page from memory does not count** as having applied `accessibility-a11y`, `next-best-practices`, etc.

Use this rule of thumb:

- **Always read if present:** `accessibility-a11y`, `next-best-practices`, **`apps/brands/src/app/globals.css`**, and **`packages/ui/src/styles/globals.css`**.
- **Read when relevant to the implementation:** Tailwind layout/theme/design-system skills when styling or layout decisions are non-trivial; `vercel-react-best-practices` when client boundaries, list rendering, or render-sensitive patterns matter; `frontend-design` when doing a polish pass after screenshot-grounded structure is in place.

Canonical skill paths and the recommended application order live in `references/supporting-skills.md`.

**If a path is missing** (skill not installed in the repo): state that in the final review, apply the remaining loaded skills, and do **not** drop accessibility or Next.js discipline entirely.

**After reading:** apply what those skills require to **the actual JSX/CSS you are about to write** (semantics, labels, `next/image`, tokens, layout, performance, visual polish)—not only to the closing prose.

**Do not “load and forget.”** Read the skills that bear on the component you are building, then apply them when that layer is actually in play. See `references/supporting-skills.md`.

---

## Non-negotiable implementation standards (first draft must comply)

This section stays short on purpose. Use it to protect the core behavior of the skill, not to collect reactive patches.

These apply from the **first** implementation pass:

1. **Keep it presentational** — no CMS wiring, sanitization, analytics, fetch, URL classification helpers, or other integration-only behavior in the rebuild output.
2. **Match DOM order to reading order** — do not use CSS `order-*` to swap major regions.
3. **Use modern Next.js primitives appropriately** — default to a Server Component, use `next/image` for images, and keep client boundaries narrow when needed.
4. **Use reusable styling patterns** — prefer project `cn`, centralize shared variants with CVA when a variant affects multiple surfaces, and avoid repetitive per-node string comparisons.
5. **Prefer shared theme tokens when they fit** — use theme tokens for themed colors and shared visual variables whenever they exist, so the component responds correctly to the active theme. Do **not** use hardcoded hex values or generic Tailwind neutral colors for themed roles when a matching token exists. Fall back to arbitrary values only when screenshots justify it and the token system does not provide an equivalent.
6. **Render optional content conditionally** — no empty shells or placeholder DOM unless layout stability truly requires it.
7. **Infer and implement clear interaction patterns** — if the screenshots clearly depict carousel, accordion, tabs, dismiss controls, or similar behavior, implement that behavior using semantic HTML, React/Next primitives, and the packages already installed in `apps/brands` before considering any new dependency.
8. **Ship a Storybook story** — create a story file for the rebuilt component with sensible variants/states so the component can be reviewed in isolation.

The detailed implementation checklist, `cn`/CVA guidance, and dependency rules live in `references/implementation-checklist.md`.

---

<a id="implementation-quality-pass-before-shipping-code"></a>

## Implementation quality pass (mandatory before shipping code)

Before you ship:

1. Read the core skill files plus any relevant supporting ones.
2. Check the rebuild against the non-negotiables above.
3. Run the detailed implementation checklist in `references/implementation-checklist.md`.

Skipping this pass is a **process failure**; the deliverable is not complete until it is done.

## Output defaults

- Default to one component file at **`apps/brands/src/components/<CleanComponentName>/index.tsx`** plus one Storybook story file for that component.
- Derive `<CleanComponentName>` from the Step 1 component name using the normalization rules above; do not ask the user for a manual path unless they are correcting the resolved result.
- Put stories under **`apps/storybook/src/stories/brands`**, mirroring the component domain/path as closely as practical for the existing Storybook setup.
- Split component files only when interactivity or structure clearly justifies it.
- Default to a Server Component and keep optional props truly optional.

Detailed file-shape and prop-shape checks live in `references/implementation-checklist.md`.

## Strict high-level workflow

Execute **in order**:

1. Collect component name and resolve it to `apps/brands/src/components/<CleanComponentName>/index.tsx` (intake: light)  
2. Collect **all three** screenshots in **one** Step 2 message—mobile, tablet, desktop order (intake: acknowledge only)  
3. Ask for optional HTML/CSS **and/or written style notes** (collect only)  
4. Optional naming and hints — confirm screenshot-inferred field names, rename props if needed, and add extra variant/style/behavior hints only where the screenshots are incomplete  
5. **[Pre-flight](#pre-flight-analysis-and-user-confirmation-before-code)** — full analysis: screenshots per breakpoint, inferred interaction needs, inferred content structure, HTML/CSS + **style notes** usefulness, conflicts, open questions; **wait for go-ahead**  
6. After confirmation: detailed layout/Tailwind plan if not fully settled in pre-flight—**include prefix map** from [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)  
7. Resolve whether the current installed stack is sufficient for any inferred interaction; only escalate if something truly needs approval  
8. **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** — read the core `SKILL.md` files and any additional supporting skills that are relevant to the component  
9. **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** — apply the relevant supporting skills, then run the checklist in `references/implementation-checklist.md`  
10. Generate code at the resolved component path  
11. Create the matching Storybook story with variants under `apps/storybook/src/stories/brands`  
12. Add extra files only if justified  
13. [Self-audit](#self-audit)  
14. [Final code review](#final-code-review) — include [copy-paste usage example](#copy-paste-usage-example)  

## Self-audit

Before finishing, verify **in order**:

1. **[Global principles](#global-principles)** — integration boundary (no sanitize / URL parsers / CMS in rebuild file), **DOM = focus order** (no column `order-*`), **`@theme`-aligned** prefixes, **phased** skills, **[Visual extraction from screenshots](#visual-extraction-from-screenshots)** (pre-flight tokens reflected in classes).  
2. **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** — final review lists the `SKILL.md` **paths actually read** (or missing); not “read once” only.  
3. **[Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply)** + **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** completed, including `references/implementation-checklist.md`.  
4. **Quality spot-checks** — semantic headings; `next/image` + `sizes`; **`cn`/CVA/enums**; server/client boundary; deps policy; no unnecessary file splits; story file created with variants; honest evidence gaps; **major type/color/spacing** in code **align** with screenshot-derived pre-flight notes (not generic-only defaults).  
5. **[Copy-paste usage example](#copy-paste-usage-example)** in the closing message (`placehold.co` / `remotePatterns` note when used; placeholder images rendered with `next/image` must set `unoptimized`).  

## Copy-paste usage example

The closing report must include one short usage snippet under `## Copy-paste usage example`. Follow the exact shape in `references/final-review-template.md`.

## Final code review

End every run with a **short, fixed-structure** summary. Follow `references/final-review-template.md` for the exact bullets.

Minimum content:

- Files created  
- Why this structure (single file vs split)  
- Assumptions and uncertainties  
- Dependencies proposed or used  
- Accessibility and responsive notes  
- Manual follow-up before Contentstack wiring  
- **[Copy-paste usage example](#copy-paste-usage-example)** (mandatory JSX block + `placehold.co` / `remotePatterns` note when relevant; placeholder images rendered with `next/image` must set `unoptimized`)  

## When stuck or evidence is thin

- List **Assumptions** explicitly (see `references/assumption-log.md`).  
- Prefer simpler layout over speculative detail.  
- Ask the user one **targeted** clarification rather than inventing—especially for interaction and copy.

## References

- `references/assumption-log.md` — assumption format  
- `references/final-review-template.md` — closing report template  
- `references/implementation-checklist.md` — detailed code-generation, dependency, and QA checklist  
- `references/iteration-guide.md` — how to improve this skill over time  
- `references/supporting-skills.md` — canonical supporting-skill paths and when to apply them  
- `references/structured-prompts.md` — optional hint keys (`theme`, `imagePosition`, etc.)  
- `references/trigger-eval-queries.json` — queries for future description optimization (skill-creator `run_loop`)
