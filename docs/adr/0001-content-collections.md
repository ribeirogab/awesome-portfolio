# ADR-0001: Content collections outside the home page composition

**Status:** Accepted
**Date:** 2026-09-02

## Context

All content lived in `portfolio.json`: site metadata, the hero, and an ordered `sections` array where projects were plain `entries`. Two pages were added: a full projects page and an articles page with one page per article. Article bodies are long-form Markdown and do not fit JSON strings. Projects are short structured records.

## Decision

- `portfolio.json` keeps the composition of the home page and every structured record. Projects move out of the sections array into a top-level `projects` Collection. A `projects` Section lists the ids it features. Page headings live under `pages`.
- Articles live as Markdown files under `content/articles/`. The frontmatter holds title, date, tag, and excerpt. The file name is the Slug. An `articles` Section shows the newest ones.
- Loaders under `src/content/` read both Collections at build time. Reading time, formatted dates, and the HTML body are computed there, not stored.
- The validation script checks both sources with the same Zod schemas and runs in CI and before every build.
- The site stays a static export. Article pages come from `generateStaticParams`; the RSS feed is a static route handler.

## Consequences

- Editing content still needs no code changes, but it now spans two places: the JSON file and the `content/` directory.
- `gray-matter` and `marked` are the only new runtime dependencies. MDX was rejected because it couples content to React components.
- If projects grow into illustrated case studies, they can move to `content/projects/*.md` using the same loader pattern without changing the pages.
