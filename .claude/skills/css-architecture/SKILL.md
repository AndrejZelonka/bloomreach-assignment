---
name: css-architecture
description: Use when any .css file is added or modified, when adding design tokens, CSS files, or when reviewing CSS diffs for correctness.
---

# CSS Architecture

**Layers**

- [ ] 1. Component styles are inside `@layer components { }`
- [ ] 2. Component token definitions are inside `@layer tokens { :host { } }`
- [ ] 3. No `!important` — fix specificity via layer order instead

**Token chain**

- [ ] 4. No hardcoded color, spacing, radius, or font values in component styles
- [ ] 5. Component styles reference only component tokens (`--{component}-*`), not semantic or primitive tokens directly
- [ ] 6. Component tokens (`{component}.css`) reference only semantic tokens, not primitives — **exception: spacing scale (`--space-*`) may be referenced directly** because the scale steps are themselves a semantic abstraction, not raw values
- [ ] 7. New primitives were not added when an existing semantic token covers the intent

**File structure**

- [ ] 8. Each component has a paired token file at `src/styles/tokens/components/{component}.css`
- [ ] 9. `{component}.css` begins with `@import '../../../styles/tokens/components/{component}.css';`

**Naming**

- [ ] 10. Class names follow BEM: `{component-name}__{element}`
- [ ] 11. State modifiers use `is-{state}` (not `.active`, `[aria-selected]` as a style hook)
- [ ] 12. Component tokens follow `--{component-name}-{part}-{property}`

**CSS nesting**

- [ ] 13. Pseudo-classes and pseudo-elements are nested with `&`: `&:hover`, `&:disabled`, `&::placeholder`, `&::after`
- [ ] 14. State class modifiers use the dot-class form with `&`: `&.is-start`, `&.is-end`. BEM element modifiers (`.block--modifier`) are written as root-level selectors inside the layer.
- [ ] 17. No nesting of unrelated sibling selectors — keep those at the layer root

## Token hierarchy (quick reference)

```
primitive  →  semantic  →  component token  →  component style
--color-navy-900  →  --color-text-primary  →  --calendar-month-heading-color  →  color: var(--calendar-month-heading-color)
```

Files: `src/styles/tokens/primitive.css` → `src/styles/tokens/semantic.css` → `src/styles/tokens/components/{component}.css`

**Primitive layer** — raw scale values only: color palette, spacing scale (`--space-*`), size scale (`--size-*`), radius scale (`--radius-*`), type scale (`--font-size-*`, `--line-height-*`), shadow scale (`--shadow-*`), z-index scale (`--z-10`, `--z-20`), border widths (`--border-width`, `--outline-width`, `--outline-offset`). No semantic meaning in the name.

**Semantic layer** — role/intent tokens that reference primitives: text colors, background colors, interactive colors, typography roles (`--font-size-label`, `--font-size-body`), radius roles (`--radius-control`, `--radius-overlay`), size roles (`--size-icon`, `--size-control`), border/outline roles (`--border-width-default`, `--outline-width-focus`), z-index roles (`--z-dropdown`, `--z-overlay`). Never holds raw values.
