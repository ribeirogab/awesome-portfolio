---
title: Performance as a design material
date: 2025-06-09
tag: Engineering
excerpt: Load time is a layout decision. What changed when we treated it like whitespace instead of a chore.
---

## A layout decision

When a page takes three seconds to paint, the first thing the reader sees is not the layout. It is the wait. However good the type and the rhythm are, the reader meets them already annoyed.

We started treating the budget for a first paint the same way we treat whitespace: as a material with a cost, planned from the first sketch instead of trimmed at the end.

## Three rules that stuck

1. Ship the text first. Fonts are subset and preloaded, and the layout holds without them.
2. No layout shift, ever. Every image and embed reserves its space before it loads.
3. One script for the page, not one per widget. If a feature needs its own bundle, it needs its own justification.

## What the reader notices

Nothing. That is the point. The page is simply there, the way a well-set paragraph is simply readable. Performance done well is invisible, which is why it belongs to design as much as to engineering.
