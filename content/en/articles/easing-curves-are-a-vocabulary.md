---
title: Easing curves are a vocabulary
date: 2026-01-28
tag: Motion
excerpt: A studio's motion language is a handful of curves used consistently. Here are ours, and how we name them.
---

## Four curves, four names

Most motion systems fail because they have too many options. Ours has four curves, and each one has a name the whole studio uses in conversation, in Figma, and in code.

- **Settle** is a soft ease-out for things that arrive: menus, tooltips, expanded rows.
- **Leave** is a quick ease-in for things that go away. Nothing should linger on its way out.
- **Swap** is a symmetric ease for state changes in place, like a theme toggle.
- **Drift** is a long, almost linear curve for ambient movement that should not draw the eye.

## The curves in code

Each name is a custom property, so a component never carries a raw cubic-bezier of its own.

```css
:root {
  --ease-settle: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-leave: cubic-bezier(0.4, 0, 1, 1);
  --ease-swap: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-drift: cubic-bezier(0.3, 0, 0.7, 1);
}
```

## Why names matter

A designer can say "that should settle, not swap" and an engineer knows exactly which property to reach for. The review conversation moves from numbers to intent, and intent is what we actually disagree about.
