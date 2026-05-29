# Notes

I experimented with a premeditated CSS architecture focused on strict token layering, component isolation, and long-term scalability. The architecture rules are documented inside the Claude `SKILLs` folder under `css-architecture`.

I added this primarily to align AI-assisted code generation with the conventions and constraints used in the project.

I also customized the Angular `ng generate component` workflow slightly so generated components automatically follow the CSS architecture conventions. Additionally, I added linting rules to help enforce component layer boundaries and styling consistency.

## Reusable Components / Design System Direction

During development I built several reusable UI pieces that would likely make sense to decouple into a standalone design system.

I think several internal parts of the date-picker could eventually become standalone design-system components as well.

## Date Picker

The date-picker currently exposes a relatively small API surface, including:

- `onRangeChange`
- `label`
- `presets`
- `allowCustomRangePreset`

The `presets` property allows passing a custom sidebar configuration for predefined ranges (Lifetime, Today). This was implemented to make the component more flexible and adaptable.
Custom range option slightly complicated this approach, because the custom range behavior depends on the internal state of the component itself.
To avoid coupling that logic directly to the configurable preset system, I introduced a dedicated flag `allowCustomRangePreset` for enabling custom range handling separately from the other presets, which are intended to remain fully configurable and externally driven.

## Tradeoffs & Improvements

The architecture itself was intentionally experimental, and in retrospect it may not be the ideal fit in every area. Some parts likely introduce additional complexity compared to the practical benefit they currently provide. Still, it was a useful exploration of stricter CSS layering and token-driven design systems.

If I had more time, the highest priorities would be:

- improving visual polish and pixel-perfect consistency across some UI areas
- revisiting overall sizing and spacing scale, as parts of the UI currently feel slightly oversized or inconsistent
- better test coverage
- improving the internal date-picker API
- simplifying selection logic and edge-case handling
- extracting additional reusable standalone components
- improving accessibility (keyboard navigation, screen readers, focus management)
- proper localization/internationalization support
- fix some hacky CSS workarounds
- overlay positioning: the current implementation uses simple absolute positioning relative to the trigger element, which breaks near viewport edges. A proper solution would detect available space and flip or reposition the overlay accordingly (similar to floating-ui or Popper.js). This is a known gap.

The date-picker implementation works, but the internal APIs and state management could definitely be cleaner and more maintainable. There are also several edge cases around date selection and range handling that would benefit from additional refinement and testing.
