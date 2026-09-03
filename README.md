# Awesome Portfolio

A developer portfolio with a home page, an articles page, and a projects page. Structured content lives in [`portfolio.json`](portfolio.json) and articles live as Markdown files under [`content/articles/`](content/articles). To make it yours, edit those files. No code changes required.

**Demo:** https://ap.ribas.sh

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Editing content

### `portfolio.json`

Site metadata (`site`), hero (`owner`), dock links (`socialLinks`), the headings of the articles and projects pages (`pages`), the projects collection (`projects`), and the ordered `sections` array of the home page. Reorder, remove, or duplicate sections freely. Sections with a `navLabel` appear in the dock menu.

Section types:

| Type | Renders |
| --- | --- |
| `entries` | Expandable list (experience, education, anything) |
| `projects` | The projects listed in `featured`, with a link to `/projects` |
| `articles` | The latest `limit` articles, with a link to `/articles` |
| `stack` | Technology groups with icons |
| `github-contributions` | Live GitHub contribution graph |
| `statement` | Personal statement, with `*asterisks*` for emphasis |
| `contact` | Call-to-action button (`http(s)` or `mailto:` URL) |

Every project in `projects` appears on `/projects` in order. Each one has a `year`, a `tag`, a `description`, a `stack` list with icon names, and optional `links`.

The schema in [`src/schema/portfolio.ts`](src/schema/portfolio.ts) is the single source of truth for all fields and the supported icon names.

### `content/articles/`

One Markdown file per article. The file name is the URL slug: `quiet-interfaces.md` renders at `/articles/quiet-interfaces`. The frontmatter has four fields:

```md
---
title: Quiet interfaces
date: 2026-03-12
tag: Design
excerpt: One sentence shown in lists and as the lede of the article.
---

Body in Markdown. Use `##` for section headings.
```

Reading time and formatted dates are computed at build time. Articles are sorted newest first everywhere, and `/feed.xml` lists them as RSS. The schema is in [`src/schema/article.ts`](src/schema/article.ts).

### Validation

After editing, validate:

```bash
pnpm check:content
```

It checks the full shape plus invariants: unique ids, featured projects that exist, local logos in `public/`, valid icons and URLs, and the frontmatter of every article. The production build runs the same validation.

## SEO

Everything below is generated from `portfolio.json` and the articles at build time. No configuration is needed.

- Canonical URLs, Open Graph and Twitter Card tags on every page, with `article:*` tags on article pages.
- Social preview images at `/opengraph-image`, `/articles/opengraph-image`, `/projects/opengraph-image` and `/articles/<slug>/opengraph-image`, rendered from the page content.
- Favicon and Apple touch icon rendered from the first letter of the owner's name.
- `sitemap.xml`, `robots.txt` and RSS autodiscovery for `/feed.xml`.
- JSON-LD structured data: `WebSite`, `Person` and `ProfilePage` on the home page, `CollectionPage` and `BreadcrumbList` on the collection pages, `BlogPosting` and `BreadcrumbList` on each article.
- A branded 404 page in [`src/app/not-found.tsx`](src/app/not-found.tsx), served with a real 404 status by Cloudflare.
- Security and caching headers in [`public/_headers`](public/_headers) and a `/favicon.ico` redirect in [`public/_redirects`](public/_redirects). Cloudflare Workers applies both files to static assets. The `next dev` server ignores them.

`site.url` in `portfolio.json` must be the production origin. It is the base of every canonical URL, sitemap entry and social image.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build, validates content too |
| `pnpm check` | Lint (Biome) + content validation |
| `pnpm check:fix` | Lint with auto-fix |
| `pnpm check:content` | Content validation only |
| `pnpm knip` | Find unused files and exports |
