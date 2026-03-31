# Optional structured prompts (design hints)

Users may pass a **bulleted or key-value list** of hints. These are **optional** and **do not replace** screenshots. Use them to choose variants (theme, media position) and to name props consistently.

## Common keys (examples)

| Hint | Example values | Use in implementation |
| --- | --- | --- |
| `eyebrow` | short label text | Optional string prop; omit DOM if absent |
| `heading` | main title | Optional string prop |
| `description` | body copy | Optional string prop |
| `image` | illustration/photo | Optional `Image` props or `{ src, alt }` |
| `imagePosition` | `left` \| `right` | **DOM order** must match reading/focus order—use **JSX branch order** (image block vs copy block), **not** CSS `order-*` to swap columns. Confirm mobile stack vs screenshots. |
| `theme` | `light` \| `dark` | Apply distinct class sets or `data-theme` on a root wrapper; respect project tokens |

## Extensions

Users may add other keys (badge, caption, logos, `items[]`, etc.). Map to **optional props** and **conditional rendering**.

## Conflict rule

If a structured hint **contradicts** the screenshots (e.g. prompt says `imagePosition: right` but all captures show image left), **do not guess**. Note the conflict in the pre-flight summary and **ask** the user before generating code.
