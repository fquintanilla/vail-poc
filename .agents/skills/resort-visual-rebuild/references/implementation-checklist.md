# Implementation checklist

Use this after the user confirms the rebuild plan and before you ship code.

## Detailed implementation quality pass

1. Read the core supporting skills plus any conditional ones that clearly affect this component.
2. Read `apps/resort/src/app/globals.css` before styling, then follow its relevant stylesheet imports.
3. Confirm the component still honors the presentational boundary.
4. Check that DOM order matches visual reading order.
5. Check that breakpoint mapping comes from `apps/resort/src/app/globals.css`.
6. Ensure major typography, color, spacing, radius, and image decisions trace back to screenshot evidence or an explicit assumption.
7. For themed roles, use actual resort tokens from `globals.css` and its imported stylesheets. Do not use hardcoded hex values or generic Tailwind neutrals when a resort token exists.
8. If the image comes from CMS or variable upstream assets, do not force crop behavior unless the screenshots clearly show it.

## `cn` and conditional classes

- Use the shared `cn` helper from the project when available.
- Prefer one `cn()` call with base classes plus an object map for boolean flags.
- Avoid repeating the same theme or variant condition across many nodes when a shared variant map or CVA would make the component easier to maintain.

## CVA guidance

- Use `class-variance-authority` when a variant such as theme, emphasis, or layout affects multiple surfaces in the component.
- Prefer `as const` variant keys and a single resolved flag like `isDark` rather than repeated string comparisons.
- Keep CVA definitions close to the component unless the repo clearly prefers a separate variants file.

## Dependency policy

- Default to no new dependencies.
- If the component benefits from `class-variance-authority` and the target app cannot resolve it directly, add it as a direct dependency only when it matches the shared UI stack already in use.
- If no package in the workspace uses `class-variance-authority`, ask once before adding it.
- Any other dependency needs user approval plus a short justification.
- Do not add sanitization or CMS-specific helper packages from this skill.

## Final spot-checks

- `next/image` is used correctly, with `sizes` aligned to the app breakpoints.
- Resort colors and shared tokens come from `globals.css` and its imported stylesheets. Hardcoded hex values or generic Tailwind neutrals for themed roles are a failure when a resort token exists.
- Client code exists only where interactivity truly requires it.
- Optional content props do not render empty wrappers.
- Section labeling and heading structure are coherent.
- The component remains reusable and does not encode one-off page assumptions unless the user explicitly asked for them.
- Whole-card link patterns are acceptable when they are intentional and accessible; do not flag them by default.
