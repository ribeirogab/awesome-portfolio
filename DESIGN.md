# Design System: Awesome Portfolio

**Project ID:** N/A (synthesized from this repository's `src/app/globals.css`, not from a Stitch project)

## 1. Visual Theme & Atmosphere

Warm, paper-like, and editorial. The page reads like a well-set printed resume: a single narrow column of quiet typography on a cream ground, with content separated by hairlines instead of boxes. The density is low and the whitespace generous; nothing competes for attention. Both themes stay warm: the light mode is aged paper rather than white, and the dark mode is warm charcoal rather than black. The one playful gesture is the hand-sketched display name in the hero; everything else is restrained and utilitarian. Motion is minimal and quick (130 to 220ms eases), and the system fully respects reduced-motion preferences.

## 2. Color Palette & Roles

Light theme:

- **Warm Paper Cream (#faf8f3)**: Page background. Sets the printed-paper mood.
- **Warm Near-Black Ink (#211e19)**: Primary text, headings, focus rings, and tooltip background. The "ink" of the system.
- **Olive-Brown Soft Ink (#55503f)**: Secondary text: greetings, statement body, dock icons, "view more" actions.
- **Warm Stone Gray (#7d776b)**: Muted body text: descriptions, intros, subtitles, secondary links.
- **Pale Taupe (#a29b8d)**: Faintest text tier: uppercase labels, metadata, dates, tags, stack icons.
- **Parchment Hairline (#e5e0d3)** and **Deeper Parchment (#d8d2c2)**: 1px separators and borders. The strong variant outlines interactive surfaces and logos.
- **Warm Off-White Card (#fffdf9)**: Elevated surface color for cards and logo tiles.
- **Charcoal Gradient (#35322b to #17150f)** with **Warm Ivory text (#f5f2ea)**: The single high-contrast primary action (contact button).
- **Olive Heat Scale (#ede8da, #d5c9ab, #b0a077, #7d6f4e, #423a28)**: Contribution heatmap, from empty to most active. Khaki tones instead of the usual green.

Dark theme mirrors every role with warm values: background #131210, ink #ece8dd, soft ink #c9c3b4, muted #97917f, faint #6e6858, hairlines #29261f / #383428, card #191712, and the primary button flips to a light ivory gradient (#efeadd to #cfc8b6) with dark text (#17150f). The heat scale inverts toward golden (#24211b up to #e3d5a8).

## 3. Typography Rules

- **Body face:** Manrope (variable, weights 200 to 800), 15px base with a relaxed 1.65 line height, antialiased.
- **Display face:** Cabin Sketch 700, used exclusively for the hero name (52px, tight 1.05 line height). This is the personality moment of the page.
- **Micro-labels:** 11px, weight 700, uppercase, wide letter-spacing (0.12 to 0.14em), in the faintest text color. Used for section labels, stack group headings, and tags.
- **Hierarchy by weight, not size:** Titles are 15px/700, subtitles 13px/500, metadata 12px/600. Sizes stay within a narrow 10 to 18px band outside the hero.
- **Numerals:** Dates, indexes, and counters use tabular figures for clean alignment.
- **Emphasis:** Italic inline emphasis in the statement, tinted up to full ink strength.

## 4. Component Stylings

- **Buttons:** The primary action is pill-shaped (fully rounded) with a subtle vertical charcoal gradient, ivory text, a whisper-soft shadow, and a 1px lift on hover. Icon buttons in the dock are perfect circles that gain a hairline-tinted background on hover.
- **Cards/Containers:** Rarely boxed. Content rows are separated by 1px hairlines with 20px vertical padding. When a container exists (contribution graph), it has subtly rounded corners (10px), a hairline border, and the warm card surface. Placeholder blocks use a dashed border over a diagonal-striped background with a pill-shaped label.
- **Tags:** Tiny uppercase pills with a hairline border and no fill.
- **Logos:** 40px tiles with gently rounded corners (11px), hairline border, and soft shadow. In dark mode they are inverted and hue-rotated to stay legible.
- **Expandable entries:** Collapsed descriptions are clipped to about three lines with a fade-out gradient at the bottom; expanding animates max-height (220ms) and dissolves the fade.
- **Dock:** A floating pill (fully rounded, 68px tall) fixed at the bottom center, with a translucent frosted-glass background (14px blur), hairline border, and the deepest shadow in the system. Its popover menus share the frosted treatment with 16px rounded corners and 10px rounded items.
- **Links:** Small, semibold, underlined by a 1px hairline border that darkens on hover along with the text. External links carry a small arrow glyph.

## 5. Layout Principles

- **Single column:** Max width 640px, centered, with 96px top padding and a very deep bottom padding (200px) to clear the floating dock.
- **Vertical rhythm:** Sections are separated by 68px; section headings sit 26px above their content.
- **Separation by line, not by box:** Hairlines carry almost all structural separation, keeping the page flat and airy.
- **Stack grid:** Three equal columns with roomy gaps (30x28px), collapsing to a single column under 700px.
- **Mobile:** Reduced paddings, hero scales down to 42px, contact stacks vertically, dock shrinks slightly. Anchored sections keep a 48px scroll margin so the fixed elements never cover headings.
- **Depth strategy:** Two elevation tiers only: near-flat content (hairlines, whisper-soft warm-tinted shadows) and the floating frosted dock layer above everything.
