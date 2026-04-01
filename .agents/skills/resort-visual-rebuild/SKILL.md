---
name: resort-visual-rebuild
description: Rebuild existing website UI as **lean** presentational Next.js 16 components (Tailwind CSS 4) from screenshots + optional legacy notes—**resort app**, marketing migrations, or any Next target. **Global principles:** rebuild vs integration boundary; structural a11y; **screenshots drive quantitative styling** (type scale, weight, color, spacing, radii—not only layout); read **@theme** + **eight** skills **by phase**; **as const** + **isDark**/CVA, **next/image**, **md/lg** map (e.g. resort tablet ~1024 → **md:**). Pre-flight must list **visual tokens from images**. Closing copy-paste JSX. Next 16 App Router. Sitecore→Contentstack-style rebuilds; not CMS SDK wiring alone. **Trigger:** resort visual rebuild, `apps/resort` components from screenshots, presentational migration shells.
---

# Next.js 16 visual component rebuild (Sitecore → Contentstack prep)

## Purpose

Recreate **existing website components as presentational Next.js 16 code** using **Tailwind CSS 4**, driven primarily by **mobile, tablet, and desktop screenshots**, with **optional** legacy HTML/CSS and **optional written style notes** from the user (see Step 3) when useful.

This skill is **not** a logic or CMS migration skill. Output must stay easy to **manually wire to Contentstack later**.

<a id="global-principles"></a>

## Global principles (canonical)

These apply **every** run. They are the **single anchor** for quality—**not** a growing list of one-off patches. When something new matters, **update this section** (or one downstream checklist) so the rule stays **global**, not a scattered MUST duplicated in five places.

1. **Rebuild vs integration boundary** — Generated files are a **lean presentational shell**: layout, tokens, semantics, `next/image`, default **`<a href>`** CTAs, optional props. **Integration / final components** own: CMS wiring, **HTML sanitization**, **`dangerouslySetInnerHTML`**, **`Link` vs `<a>`**, **`rel` / `target`**, URL parsing, analytics, fetch. **Do not** add `sanitize-html`, DOMPurify, `isExternalHref`, `hrefUsesNextLink`, or similar in rebuild output.

2. **Project + installed skills = source of truth** — Read the destination app’s **`@theme` / breakpoints** before choosing `sm:` / `md:` / `lg:` ([Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)). Read **all eight** supporting `SKILL.md` files and **apply by phase** ([When to apply each supporting skill](#when-to-apply-each-supporting-skill)). **Do not** substitute memory or generic Tailwind defaults for repo facts.

3. **Accessibility is structural** — Follow **`accessibility-a11y`** while writing markup: landmarks, headings, names, focus, contrast, alt. **Tab and reading order follow the DOM**—**no** flex/grid **`order`** to swap major regions (image vs copy); use **JSX child order** ([Focus order and DOM](#focus-order-and-dom-accessibility)). A11y is not a post-hoc checklist after bad structure.

4. **One styling system per component** — **`as const`** theme/layout keys, **`isDark`** (or equivalent) + **boolean CVA**, **`cn`** object maps for safe flags; avoid repeated string theme compares across nodes.

5. **Screenshots = quantitative design spec, not only wireframes** — The **three attachments** are the main source for **concrete** styling: approximate **font size, weight, tracking, line-height, casing**, **text and background colors**, **padding/margin/gap**, **borders and radius**, **shadows**, **image aspect / crop**. In **pre-flight** and **implementation**, derive **the closest defensible Tailwind/CSS values** per breakpoint (compare mobile vs tablet vs desktop when type or spacing **changes**). Prefer **project tokens** when they match pixels; otherwise use **`text-[length]`**, **`leading-[…]`**, **`tracking-[…]`**, arbitrary **`text-[#…]` / `bg-[…]` / `border-[…]`** when captures justify it. **Do not** substitute generic defaults (`text-lg`, `p-4`, `rounded-md`) when screenshots clearly show something else. **Do not** invent UI that is not visible—**do** push fidelity on everything that **is** visible; **log assumptions** when compression or blur blocks exact pixels ([Visual extraction from screenshots](#visual-extraction-from-screenshots)).

6. **Skill maintenance (meta)** — When editing `resort-visual-rebuild`, **fold** new requirements into **Global principles** or **one** linked subsection—**avoid** append-only reactive bullets that repeat the same idea under Strict non-goals, Code generation, Non-negotiables, and Self-audit without pointing here first.

## Strict non-goals

- Do not migrate business logic, hidden legacy application logic, or Sitecore server behavior.
- Do not add CMS integration, data fetching, analytics, or fake loading patterns.
- Do not claim pixel-perfect fidelity when evidence is incomplete.
- Do not invent behavior or visual detail not supported by evidence.
- Do not violate **[Global principles](#global-principles)** (especially the **rebuild vs integration** boundary and **structural a11y**).

## Determinism and repeatability

To keep runs **highly similar** across sessions:

1. **Always** execute the intake steps in the **exact order** in [Required intake flow](#required-intake-flow), **one step per assistant turn** (see [Conversational intake](#conversational-intake-one-step-per-turn)). Do not skip or reorder.
2. **Always** run [Pre-flight analysis and user confirmation](#pre-flight-analysis-and-user-confirmation-before-code) **after** intake and **before** writing code. Never start implementation on a silent assumption when any doubt exists—**ask first**.
3. **Always** apply [Evidence priority](#evidence-priority) in the listed order when deciding structure and styles.
4. **Always** complete [Self-audit](#self-audit) and [Final code review](#final-code-review) using the same section headings and the report shape in `references/final-review-template.md`.
5. **Always** run [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code) **before** the first line of implementation code—**not** from memory alone.
6. **Always** log assumptions with the format in `references/assumption-log.md`.
7. When inferring from screenshots, **state breakpoints, layout, and key visual tokens** (type scale, colors, spacing) **explicitly**—but **only** in **pre-flight** and later (not during Steps 1–6 intake).
8. Prefer **one primary file** at the user destination unless a split is justified (see [Output architecture](#output-architecture)).

If information is missing for any intake step, **stop and ask**—do not guess critical paths or interaction requirements.

## Collect first, analyze later (latency and focus)

During **Steps 1–6**, behave as **intake only**:

- **Do not** deeply analyze screenshots, compare breakpoints, infer grid structure, or write long design commentary.
- **Do not** read image pixels beyond a **one-line acknowledgment** (e.g. “Got all three—continuing to Step 3.”).
- **Do** store mentally / rely on the thread for answers and move to the next step quickly.

**Full** visual analysis—including **quantitative** pass on typography, color, spacing, and radii from the images—layout decisions, Tailwind strategy, conflicts between screenshot vs markup vs prompts, and **Open questions** belong in the **pre-flight** block **after** Step 6—and in implementation **after** user confirmation.

This keeps each intake turn short and avoids “thinking” on every step like a final implementation pass. **After** pre-flight, screenshots are still the authority for **how big / how bold / which hex**—not only box structure.

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

**Screenshots (Step 2) — single message:** In **one** Step 2 turn, request **all three** attachments in **this order** and state they are the primary evidence for **layout and for concrete styling** (sizes, weights, colors, spacing)—with full **measurement-style** extraction in **pre-flight** after Step 6, not during intake:

1. Mobile  
2. Tablet  
3. Desktop  

**Recommended viewport widths (soft guidance, not blocking):** Ask the user to capture at **approximately** **375px** (mobile), **1024px** (tablet), and **1440px** (desktop) when they can—DevTools responsive mode or equivalent. **Important:** which Tailwind prefix (`sm:` / `md:` / `lg:`) matches each capture depends on the **destination app’s** `@theme` breakpoints—see [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes). For example, **tablet at 1024px** is often **`md:`**, not `lg:`, when `md` ≥ 992 and `lg` is 1200px (as in `apps/resort`). If their design uses different canonical widths, they may state actual widths in the reply; note them in pre-flight for implementation.

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
- `imagePosition`: `left` | `right` (implement via **JSX child order** + grid, **not** flex/grid **`order`** that inverts tab order—see [Focus order and DOM](#focus-order-and-dom-accessibility); stack on mobile must align with screenshots)  
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
   - **Visual tokens from screenshots (per breakpoint where they differ):** eyebrow / heading / body / CTA — **approx. sizes, weights, tracking, casing**; **primary text, surface, border, CTA colors**; **key padding/gap**; **radii/shadows**; image **aspect**—see [Visual extraction from screenshots](#visual-extraction-from-screenshots)  
   - **Tailwind prefix map (from app `@theme`):** which screenshot (mobile / tablet / desktop) maps to `sm:` / `md:` / `lg:` (e.g. resort: tablet 1024 → **`md:`**, desktop 1440 → **`lg:`**)—see [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)  
   - **Theme / variants:** … (e.g. light/dark, image left/right)
   - **Interactivity & dependencies:** …
   - **Props (optional slots):** …
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
2. **User-provided style notes** from Step 3 (colors, padding, container rules, typography, DevTools class hints)—use to **inform** Tailwind and tokens; on **visible** conflict with screenshots, prefer screenshots and **surface** in Open questions unless the user prioritized notes  
3. **Structured prompts** (Step 6): `theme`, `imagePosition`, slot names—on conflict with screenshots, **ask**  
4. Coherent, useful legacy HTML/CSS (when provided)  
5. Project conventions and **loaded** supporting skill files (see [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)—not generic “best practices” from memory)  
6. Careful inference—**document every inference** as an assumption  

On conflict between screenshots and legacy markup: **screenshots win** for layout/composition. On conflict between screenshots and **written style notes**: default same; **ask** if the mismatch is large or ambiguous.

<a id="visual-extraction-from-screenshots"></a>

## Visual extraction from screenshots

Treat each capture as a **frozen design spec** at that viewport. Goal: **match visible metrics as closely as evidence allows**, then encode with Tailwind v4 (and project tokens when they align).

**In pre-flight (mandatory narrative):** For **each** of mobile / tablet / desktop, summarize what you **see** for:

| Area | What to estimate / note |
| --- | --- |
| **Typography** | Relative scale between eyebrow, title, body, CTA; **bold / regular**; **uppercase / sentence case**; **letter-spacing** (tight / wide); **line length / line height** feel |
| **Color** | Dominant text, background, border, CTA fill/stroke; **light vs dark** surfaces; hex or neutral scale if you can approximate from pixels |
| **Spacing** | Section padding, gap between stacked blocks, inset of text column vs image |
| **Shape** | Border presence/weight, **radius** (sharp vs pill), **shadow** depth |
| **Media** | Image **cropping**, **aspect** (tall vs wide), full-bleed vs contained |

**In implementation:**

- Map estimates to **`font-sans` / theme fonts** when the app sets them; otherwise use stack defaults.
- Prefer **`text-sm` / `text-base` / …** only when they **match** the capture; if not, use **`text-[13px]`**, **`leading-[1.35]`**, **`tracking-[0.12em]`**, **`uppercase`**, **`font-bold`** / **`font-normal`** as **justified** by the images.
- Prefer **`bg-neutral-*` / `text-*` from `@theme`** when close; use **`bg-[#…]` / `text-[#…]`** when captures show specific brand grays or off-blacks and tokens don’t fit.
- Encode **responsive type** (e.g. title larger on desktop) by **different utilities at the correct prefix** (`md:text-…`, `lg:text-…`) **derived from comparing** the three screenshots—not one size for all widths unless all three look the same.
- **CTA and chips:** match border thickness, padding, and gradient/solid fill from pixels when visible.

**Honesty:** If the image is too small or compressed to justify a number, state an **assumption** (`references/assumption-log.md`) and pick the nearest step; **do not** claim pixel-perfect without evidence.

**`frontend-design`:** use it to **refine hierarchy and polish** after metrics are grounded in captures—**not** to replace screenshot-backed sizes/colors with a generic template.

## Responsive rules

- **Mobile-first** Tailwind CSS 4.
- Infer layout, spacing, alignment, visibility, and grouping from the **three** screenshots.
- Prefer maintainable class strings over copying legacy CSS verbatim.

<a id="screenshot-viewports-vs-tailwind-prefixes"></a>

### Screenshot viewports vs Tailwind prefixes (read the target app’s `@theme`)

**Wrong default:** assuming **tablet ~1024px** should always drive **`lg:`** utilities. Tailwind’s **default** docs often cite `lg` at 1024px, but many apps **override** breakpoints in `@theme`—**you must read the destination app** (`globals.css`, `tailwind.config`, etc.) **before** choosing prefixes.

**Process:**

1. Open the **target app’s** theme: e.g. `apps/<app>/src/app/globals.css` with `@theme { --breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg`, … }`.  
2. Map each capture to prefixes by **numeric comparison**: the **tablet** screenshot shows layout at its capture width (often **~1024px**). Use the **smallest** `min-width` tier that viewport **reaches**:  
   - If **`md` = 992px** and **`lg` = 1200px** (resort): **1024 ≥ 992** and **1024 < 1200** → tablet evidence belongs in the **`md:`** layer. **`lg:`** is for **desktop** (≥ 1200), e.g. the **1440px** capture—not for tablet.  
3. State this mapping explicitly in **pre-flight** ([Rebuild plan](#pre-flight-analysis-and-user-confirmation-before-code)) and implement classes accordingly (`md:grid-cols-2`, `md:…`, not `lg:…` for behavior visible only up to desktop). **Do not** rely on **`order-*`** to swap major columns—see [Focus order and DOM](#focus-order-and-dom-accessibility).  
4. Align **`next/image` `sizes`** (and any raw `@media`) with the same pixel thresholds so art direction matches the prefixes.

**Failure mode to avoid:** tablet capture implemented with **`lg:`** when the app’s **`lg`** starts **above** 1024—tablet layout will be wrong until the viewport hits desktop width.

## Code generation rules

- **Satisfy [Global principles](#global-principles) first**—details below elaborate; do not contradict the boundary or DOM-order rules.
- Presentational Next.js **App Router** components; **semantic HTML**; **accessibility-conscious** structure (headings order, labels for interactive controls, focus where applicable).
- **No** `fetch`, Server Actions for domain data, Contentstack SDK, or CMS-specific code in generated files.
- **No** invented global state unless required for **approved** interactivity.
- Prefer **readable JSX** over cloning legacy DOM.
- English for **all code, comments in code, file names, and prop names**.
- **Prefer Next.js built-ins where they stay simple:** follow the loaded `next-best-practices` skill. Use **`next/image`** for images (not raw `<img>`); **`next/script`** when a third-party script is in scope; other **`next/*`** when obvious. **CTAs in rebuild output:** default to a plain **`<a href={cta.href}>`** (classes from `cva`/`cn`)—**no** `isExternalHref`, no auto **`Link`** vs `<a>` branching. The **integration layer** swaps to **`Link`** and adds **`rel` / `target`** when wiring to CMS or routes. Only use **`Link`** in the generated file if the user **explicitly** states all CTA hrefs are internal app paths **and** you still **avoid** URL-parsing helpers (props are trusted paths only).
- Stay within **presentational** scope: no metadata APIs, route handlers, sanitization, or link classification logic unless the user explicitly expands the task.
- **Theme / layout enums (first draft):** define shared variant keys as **`as const` objects** exported next to the component (e.g. `Theme = { light: "light", dark: "dark" }`, `ImagePosition = { left: "left", right: "right" }`) and derive prop types from them. Resolve once, e.g. `const isDark = resolvedTheme === Theme.dark`, then pass **boolean or a single resolved variant into every `cva` call** (e.g. `cva` variant `dark: { true, false }` with `{ dark: isDark }`)—**do not** repeat `theme === "dark"` (or string compares) on many nodes.
- **Illustrative image blocks:** when the design is a **primary informative image** (non-decorative `alt`), wrap the **`next/image`** region in **`<figure>`** (reset margins, e.g. `m-0`, keep positioning classes on the figure or an inner wrapper as needed). Add **`<figcaption>`** only if the design includes caption copy; otherwise omit it. For **decorative** images, use `alt=""` per the loaded a11y skill.
- **Screenshot-backed values in code:** classes in `cva` / `cn` should **trace** to pre-flight **visual token** notes for major elements (title, eyebrow, body, CTA, surfaces)—not anonymous defaults.
- **Do not rely on a follow-up refactor:** the file(s) this skill creates must already satisfy [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) and the rules above. **Do not** edit the user’s codebase for “cleanup” unless they explicitly ask—**but** when this skill **generates** a component, that **generated** output must be correct on first landing (no deliberate “we’ll fix Next primitives / CVA / enums later”).

<a id="focus-order-and-dom-accessibility"></a>

### Focus order and DOM (accessibility)

Per **`accessibility-a11y`:** keyboard and screen-reader order follow the **DOM**, not the painted order when CSS **`order`** (flex/grid) **reorders** whole sections.

- **Do not** use **`order-*`** (or similar) to swap **major regions** (e.g. image column vs text column) if that makes **visual order ≠ tab/reading order**. Users tab through **source order**; mismatches are a **failure** against this skill.
- **Preferred pattern:** **`imagePosition` left vs right** → **render the image block and copy block in JSX in the same sequence as the design’s reading order** (e.g. **two branches**: `imagePosition === "left" ? <>image, copy</> : <>copy, image</>`), then use **`md:grid-cols-2`** on a parent without relying on `order` to fix layout. On **mobile**, stack in the order those branches already imply (match screenshots).
- Minor **cosmetic** `order` on **non-interactive** siblings inside one region is acceptable only if it does **not** cross important focusable content boundaries—when in doubt, match DOM to visual.

<a id="implementation-quality-pass-before-shipping-code"></a>

<a id="mandatory-skill-file-reads-blocking-before-code"></a>

## Mandatory skill file reads (blocking before code)

After the user confirms the **Rebuild plan**, you **must not** write or edit component TS/TSX/CSS until each applicable project skill file below has been **read into context** (e.g. editor Read tool on the file). **Paraphrasing this `resort-visual-rebuild` page from memory does not count** as having applied `accessibility-a11y`, `next-best-practices`, etc.

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

**Do not “load and forget.”** Each skill has a **primary moment** in this workflow—see [When to apply each supporting skill](#when-to-apply-each-supporting-skill). You still **read every listed file before coding**; you **apply** each skill when its layer is in play (layout plan → Tailwind → React perf → polish), not only in the closing prose.

---

<a id="when-to-apply-each-supporting-skill"></a>

## When to apply each supporting skill

These are the **installed skills** this monorepo expects under `.agents/skills/`. **Read all** after the user confirms the rebuild plan ([Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)); **apply** each at the **stage** below so guidance lands on the right decisions.

| Skill | Primary moment in `resort-visual-rebuild` | What to apply there |
| --- | --- | --- |
| `tailwindcss-mobile-first` | **Pre-flight + step 8** (layout / breakpoint plan) **and** while writing class lists | Mobile-first ordering; **read the app’s `@theme` breakpoints** and map mobile / tablet / desktop screenshots to **`sm:` / `md:` / `lg:`** per [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)—**tablet ~1024 often maps to `md:`**, not `lg:`, when `md` ≥ 992 and `lg` is 1200px. |
| `tailwindcss-advanced-layouts` | **Pre-flight + step 8** **and** while structuring the component DOM | Grid/flex patterns, alignment, full-bleed vs contained rows—match screenshots **without** flex/grid **`order`** to swap primary columns ([Focus order and DOM](#focus-order-and-dom-accessibility)). |
| `tailwind-design-system` | **While choosing utilities and tokens** (implementation) | Prefer `@repo/ui` / shared tokens and package patterns over one-off hex when equivalents exist. |
| `tailwind-theme-builder` | **While wiring colors, radii, or CSS variables** (implementation) | Align with `@theme`, `globals.css`, and variable conventions the repo already uses. |
| `next-best-practices` | **While deciding file shape, RSC vs client, and any `next/*` API** (start of implementation) | App Router defaults, Server Components, **`next/image`** (required), **`next/script`** when in scope; **rebuild CTAs stay `<a>`** unless user explicitly constrains internal paths—see [Code generation rules](#code-generation-rules). |
| `accessibility-a11y` | **While writing semantic markup, headings, labels, focus, and media** (throughout JSX) | Landmarks, heading order, `aria-*` only when needed, focus rings, alt text, contrast; **[focus order vs DOM](#focus-order-and-dom-accessibility)**—no `order-*` to swap major columns; DOM matches reading/tab order. |
| `vercel-react-best-practices` | **When setting client boundaries, lists, children, or anything that affects renders/bundle** (implementation) | Rerenders, composition, bundle hygiene; especially relevant if the user approved a **client** subcomponent. |
| `frontend-design` | **After structure works, before you freeze classes** (implementation pass + final polish) | Polish **on top of** [Visual extraction from screenshots](#visual-extraction-from-screenshots)—refine hierarchy and rhythm **without** discarding screenshot-derived sizes/colors for generic aesthetics. |

**Order of operations (recommended while coding):** (1) `next-best-practices` for shell and `next/*` choices → (2) semantic skeleton with `accessibility-a11y` → (3) layout utilities with `tailwindcss-advanced-layouts` + `tailwindcss-mobile-first` → (4) tokens/theme with `tailwind-design-system` + `tailwind-theme-builder` → (5) `vercel-react-best-practices` if client or perf-sensitive patterns appear → (6) `frontend-design` pass on composition and polish. **Skipping a row’s application** when that layer exists in the component is a **process failure** (e.g. no a11y check on interactive nodes, or ignoring mobile-first after promising three breakpoints).

If the workspace **adds** more skills later (e.g. `next-cache-components`), treat them like the table: **read when present**, **apply when their topic appears** in the deliverable.

---

## Non-negotiable implementation standards (first draft must comply)

**Concrete checklist** for [Global principles](#global-principles)—keep this list **short**; extend **principles** when adding policy, not an ever-growing checklist of one-offs.

These apply from the **first** implementation pass, not as a later refactor:

1. **Variants** — If `theme`, `size`, `emphasis`, or similar changes **multiple nodes’** classes, use **`cva`** for those surfaces; use **`cn`** with **object maps** for boolean layout flags that **do not** swap major focus order (e.g. `hasImage`). For **left/right column layout**, use **JSX child order** per [Focus order and DOM](#focus-order-and-dom-accessibility)—**not** `md:order-*` on whole columns. **Forbidden:** repeating `theme === "dark" ? "…" : "…"` on every child when CVA would centralize it. **Required pattern:** `as const` **enum-style objects** + **`isDark`** (or equivalent) into **all** `cva()` calls—see [Code generation rules](#code-generation-rules).
2. **`cn`** — Prefer one `cn()` with a base string plus `{ "class": condition }` for conditionals; reserve ternaries for simple one-offs only.
3. **Accessibility** — Follow the loaded `accessibility-a11y` skill: landmarks/sections, heading order, **accessible names** (`aria-labelledby` / `aria-label` as appropriate), visible **focus** styles on interactive elements, **alt** text strategy for images, contrast-sensitive choices when variants change background/text. **Focus / reading order:** [Focus order and DOM](#focus-order-and-dom-accessibility)—**no** flex/grid **`order`** to swap image vs copy columns when that inverts tab order vs layout. **Informative image callouts:** prefer **`<figure>`** around `next/image` when appropriate; **`figcaption`** only when the design has caption text.
4. **Next.js** — Follow the loaded `next-best-practices` skill: default **Server Component** unless approved client behavior; **`next/image`** (not `<img>`), **`sizes`** aligned with app breakpoints; **`unoptimized`** only when documented. **CTAs:** plain **`<a>`** in rebuild output per [Code generation rules](#code-generation-rules)—**`Link` / `rel` / `target`** are integration concerns unless user explicitly constrains hrefs to internal paths.
5. **Design system** — Follow loaded Tailwind / theme skills: prefer **`@repo/ui`** tokens, shared `globals.css` / `@theme` variables, and existing patterns over ad-hoc hex everywhere when the project already defines equivalents.
6. **Labeled regions** — If a `<section>` is titled with a visible heading, ensure **`aria-labelledby`** matches a stable **`id`** on that heading (user-supplied id or a deterministic derived id if the skill allows and collisions are documented).

---

## Implementation quality pass (mandatory before shipping code)

**Order (strict):**

1. **Mandatory skill file reads** — complete the table in [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code) (all eight: `accessibility-a11y`, `next-best-practices`, `tailwind-design-system`, `tailwind-theme-builder`, `tailwindcss-advanced-layouts`, `tailwindcss-mobile-first`, `vercel-react-best-practices`, `frontend-design`).  
2. **Phased application** — follow [When to apply each supporting skill](#when-to-apply-each-supporting-skill) while implementing; do not treat the skills as a single undifferentiated blob.  
3. **Non-negotiable checklist** — satisfy [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) in the code you are about to write.  
4. **`cn` / CVA** — If the repo already uses **`@repo/ui`**, import **`cn`** from `@repo/ui/lib/utils` (or the project’s shared helper)—do not duplicate merge helpers. Ensure **`class-variance-authority`** resolves in the **target app package** (see [Dependency policy](#dependency-policy)).

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
- **Theme wiring:** prefer a **boolean CVA variant** (e.g. `dark: { true, false }`) fed by **`isDark`** derived from [enum-style theme constants](#code-generation-rules), so call sites read `shellVariants({ dark: isDark })` instead of string compares repeated across the tree.

Keep `cva` definitions **next to** the component (same file) unless the team prefers `variants.ts` in the folder.

## Dependency policy

- Default: **no new** `package.json` dependencies.
- **`class-variance-authority`:** Use **`cva`** whenever [Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply) require it. If the target app cannot resolve `class-variance-authority` (e.g. only a transitive dep via `@repo/ui`), add it as a **direct** dependency on that app with the same major version as `@repo/ui`—**no separate approval** needed when it matches the shared UI stack. If **no** package in the workspace lists `class-variance-authority`, **ask once** for approval before adding it to the target app.
- Propose any **other** dependency only with user approval and a one-sentence justification. **Do not** add **`sanitize-html`** (or similar) from this skill’s output—sanitization is **not** part of the rebuild deliverable.

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

These are **not optional decoration**—they are **required file reads** per [Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code), and each has a **when to apply** row in [When to apply each supporting skill](#when-to-apply-each-supporting-skill). Use them **without** exposing a multi-skill UX to the end user (no need to paste skill bodies into chat—**do** apply them in code and mention them briefly in the final review).

| Skill | Use for |
| --- | --- |
| `accessibility-a11y` | WCAG-minded markup, semantics, focus, media |
| `next-best-practices` | App Router, RSC defaults, `next/*` built-ins, structure |
| `tailwind-design-system` | Tokens, consistency with shared UI packages |
| `tailwind-theme-builder` | `@theme`, CSS variables if project uses them |
| `tailwindcss-advanced-layouts` | Grid/flex and layout primitives |
| `tailwindcss-mobile-first` | Breakpoint discipline, mobile-first class order |
| `vercel-react-best-practices` | Performance-minded React patterns, client boundaries |
| `frontend-design` | Visual hierarchy, composition, non-generic polish |

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
8. After confirmation: detailed layout/Tailwind plan if not fully settled in pre-flight—**include prefix map** from [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)  
9. Resolve dependency approval if still open  
10. **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** — read **each** listed `SKILL.md` into context (all eight supporting skills)  
11. **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** — apply skills **per** [When to apply each supporting skill](#when-to-apply-each-supporting-skill); non-negotiable standards + `cn` / CVA + shared `cn` helper  
12. Generate code at the provided path  
13. Add extra files only if justified, same folder only  
14. [Self-audit](#self-audit)  
15. [Final code review](#final-code-review) — include [copy-paste usage example](#copy-paste-usage-example-mandatory-closing-deliverable)  

## Self-audit

Before finishing, verify **in order**:

1. **[Global principles](#global-principles)** — integration boundary (no sanitize / URL parsers / CMS in rebuild file), **DOM = focus order** (no column `order-*`), **`@theme`-aligned** prefixes, **phased** skills, **[Visual extraction from screenshots](#visual-extraction-from-screenshots)** (pre-flight tokens reflected in classes).  
2. **[Mandatory skill file reads](#mandatory-skill-file-reads-blocking-before-code)** + **[When to apply each supporting skill](#when-to-apply-each-supporting-skill)** — final review lists `SKILL.md` **paths** (or missing); not “read once” only.  
3. **[Non-negotiable implementation standards](#non-negotiable-implementation-standards-first-draft-must-comply)** + **[Implementation quality pass](#implementation-quality-pass-before-shipping-code)** completed.  
4. **Quality spot-checks** — semantic headings; `next/image` + `sizes`; **`cn`/CVA/enums**; server/client boundary; deps policy; no unnecessary file splits; honest evidence gaps; **major type/color/spacing** in code **align** with screenshot-derived pre-flight notes (not generic-only defaults).  
5. **[Copy-paste usage example](#copy-paste-usage-example-mandatory-closing-deliverable)** in the closing message (`placehold.co` / `remotePatterns` note when used).  

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

- 2026-03-31 — **Renamed skill and folder:** `resort-visual-rebuild` (was `vail-visual-rebuild`).
- 2026-03-31 — **Screenshots as quantitative spec:** new Global principle **#5** (type, color, spacing, radii, shadows, media—closest defensible Tailwind; arbitrary values when tokens don’t match; no generic defaults when captures differ). New section [Visual extraction from screenshots](#visual-extraction-from-screenshots). Evidence priority #1 expanded; pre-flight **Rebuild plan** gains **Visual tokens** bullet; collect-first clarifies quantitative pass after Step 6; code generation + `frontend-design` row + self-audit + frontmatter; `references/final-review-template.md` **Visual fidelity** subsection.
- 2026-03-31 — **Global principles (canonical):** single anchor section after Purpose—rebuild vs integration, project/skills truth, structural a11y, styling discipline, **meta rule** (fold changes into principles, not reactive patch bullets). Strict non-goals shortened; pre-flight, code generation, non-negotiables, self-audit point here; self-audit deduplicated. Frontmatter points at Global principles.
- 2026-03-31 — **Simplify rebuild scope:** **no** sanitization / `dangerouslySetInnerHTML` in generated files; **no** `isExternalHref`-style helpers—**default CTA `<a>`**, **`Link`/`rel`/sanitization** at **integration**. **[Focus order and DOM](#focus-order-and-dom-accessibility):** forbid flex/grid **`order`** to swap main columns; prefer **JSX branch order**. Strict non-goals, code generation, non-negotiables (dropped mandatory external-`rel` rule for rebuild layer), screenshot prefix note, supporting-skills rows, self-audit, frontmatter, `references/final-review-template.md`, `references/structured-prompts.md`, dependency policy updated.
- 2026-03-31 — **Breakpoints vs screenshots:** new subsection [Screenshot viewports vs Tailwind prefixes](#screenshot-viewports-vs-tailwind-prefixes)—read destination `@theme`; **tablet ~1024px maps to `md:`** (not `lg:`) when `md` ≥ 992 and `lg` = 1200px (e.g. `apps/resort`). Pre-flight rebuild plan gains **Tailwind prefix map**; Step 2 guidance, responsive rules, mobile-first skill row, workflow step 8, self-audit, `references/final-review-template.md` updated.
- 2026-03-31 — **Supporting skills: when to apply:** new section [When to apply each supporting skill](#when-to-apply-each-supporting-skill)—explicit **eight** installed skills (`accessibility-a11y`, `next-best-practices`, `tailwind-design-system`, `tailwind-theme-builder`, `tailwindcss-advanced-layouts`, `tailwindcss-mobile-first`, `vercel-react-best-practices`, `frontend-design`) with **primary workflow moment** + recommended **order of operations** while coding; “load and forget” called out as failure. Implementation quality pass, self-audit, supporting-skills table, workflow steps 10–11, frontmatter, `references/final-review-template.md` updated.
- 2026-03-31 — **First-pass output + Next by default:** [Code generation rules](#code-generation-rules) require **preferring applicable `next/*` built-ins** (`Image`, `Link`, `Script`, …) over raw HTML, with exceptions (e.g. external / `mailto` / `tel` on `<a>`); **`as const` enums + `isDark`/boolean CVA**; **`<figure>`** for informative images when designed; **no refactor-dependent handoff**. Non-negotiables, CVA section, self-audit, frontmatter, `references/final-review-template.md`, and `references/iteration-guide.md` updated.
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
