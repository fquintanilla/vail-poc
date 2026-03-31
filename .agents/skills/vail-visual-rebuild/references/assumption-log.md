# Assumption log format

Use this format whenever the model infers beyond explicit evidence. Keep entries short.

```markdown
## Assumptions

1. **[Layout]** … (evidence: desktop screenshot shows two columns; tablet not fully visible—inferred single column until `md`).
2. **[Typography]** … (evidence: eyebrow uppercase in mobile only; applied `uppercase` from `sm:` per tablet capture).
3. **[Interaction]** … (no hover state in screenshots—link styles are static).
```

If there are **no** inferences beyond screenshots and optional markup, write:

```markdown
## Assumptions

None—all structure and breakpoints taken directly from the three screenshots (and legacy HTML where noted).
```
