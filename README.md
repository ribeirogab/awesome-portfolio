# Awesome Portfolio

A developer portfolio with a home page, an articles page, and a projects page, in as many languages as you want. Structured content lives in [`content/<locale>/portfolio.json`](content/en/portfolio.json), interface strings in [`content/<locale>/messages.json`](content/en/messages.json), and articles as Markdown files under [`content/<locale>/articles/`](content/en/articles). To make it yours, edit those files. No code changes required.

**Demo:** https://ap.ribeiro.engineer (English) and https://ap.ribeiro.engineer/pt (Portuguese)

## Built with this template

- [ribeiro.engineer](https://ribeiro.engineer) by [@ribeirogab](https://github.com/ribeirogab)

Using it too? Open a PR and add yours to the list.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Editing content

### Locales

[`content/i18n.json`](content/i18n.json) lists the languages of the site and names the default one:

```json
{ "default": "en", "locales": ["en", "pt"] }
```

Each code is a folder under `content/` and the URL prefix of that language. The default language renders without a prefix (`/`, `/articles`, `/projects`); every other language renders under its code (`/pt`, `/pt/articles`, `/pt/projects`). A site with a single language works exactly like a site with none configured: keep one code in the list and skip the rest of this section.

To add a language, copy the default folder, translate the text, and add the code to the list:

```bash
cp -r content/en content/es
```

Every language is a full copy of the content. Text can differ freely, but the structure must match the default language: the same section ids and types in the same order, the same entry ids, the same project ids, the same featured projects, the same social link URLs and the same photo files. `pnpm check:content` enforces this so the languages never drift apart.

The dock shows a language menu when more than one language exists. Every page declares hreflang alternates and the sitemap lists every language, so search engines see the editions as one site.

### `content/<locale>/portfolio.json`

Site metadata (`site`), hero (`owner`), dock links (`socialLinks`), the headings of the articles and projects pages (`pages`), the projects collection (`projects`), and the ordered `sections` array of the home page. Reorder, remove, or duplicate sections freely. Sections with a `navLabel` appear in the dock menu.

`site.locale` is the BCP 47 language tag of that edition, such as `en-US` or `pt-BR`. It sets the HTML `lang` attribute, the date format, the Open Graph locale, the RSS language and the hreflang value.

The optional `owner.photos` list renders a photo mosaic in the hero, between the role line and the intro. Each photo has a `src` (a file under `public/` or an absolute URL) and an `alt`. Add as many as you like: every five photos form one mosaic block, where the first photo is the large one and the fifth is the wide one, and the last block closes its row whatever the count. Ship photos already resized (about 1200px on the long side), because the static export does not optimize images. Remove the list to hide the mosaic.

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

### `content/<locale>/messages.json`

The interface strings of the template for that language: "View more", "min read", "Previous", the dock labels, the 404 page and the contribution graph texts. Some strings carry `{placeholders}` that the template fills in, such as `"{minutes} min read"`. Keep the placeholders when you translate. Every key is required; the schema is in [`src/schema/messages.ts`](src/schema/messages.ts).

### `content/<locale>/articles/`

One Markdown file per article. The file name is the URL slug: `quiet-interfaces.md` renders at `/articles/quiet-interfaces`, and its Portuguese copy at `/pt/articles/quiet-interfaces`. The same file name in two language folders is the same article in two languages, and the page in one language links to the other through hreflang and the language menu. An article may exist in one language only. The frontmatter has four fields:

```md
---
title: Quiet interfaces
date: 2026-03-12
tag: Design
excerpt: One sentence shown in lists and as the lede of the article.
---

Body in Markdown. Use `##` for section headings.
```

Reading time and formatted dates are computed at build time in the language of the edition. Articles are sorted newest first everywhere, and each language has an RSS feed at `/feed.xml` or `/<locale>/feed.xml`. The schema is in [`src/schema/article.ts`](src/schema/article.ts).

### Validation

After editing, validate:

```bash
pnpm check:content
```

It checks the full shape plus invariants: unique ids, featured projects that exist, local logos and photos in `public/`, valid icons and URLs, complete messages, the frontmatter of every article, and structural parity between languages. The production build runs the same validation.

## SEO

Everything below is generated from the content at build time. No configuration is needed.

- Canonical URLs, hreflang alternates for every language (plus `x-default`), Open Graph and Twitter Card tags on every page, with `article:*` tags on article pages.
- A social preview image for every page in every language under `/social/<locale>/…png`, rendered from the page content and linked from the `og:image` and `twitter:image` tags.
- Favicon and Apple touch icon rendered from the first letter of the owner's name.
- `sitemap.xml` with every language and its alternates, `robots.txt`, and RSS autodiscovery for the feed of each language.
- JSON-LD structured data: `WebSite`, `Person` and `ProfilePage` on the home page, `CollectionPage` and `BreadcrumbList` on the collection pages, `BlogPosting` and `BreadcrumbList` on each article, all with `inLanguage`.
- A branded 404 page in [`src/app/global-not-found.tsx`](src/app/global-not-found.tsx), rendered in the default language and served with a real 404 status by Cloudflare.
- Security and caching headers in [`public/_headers`](public/_headers) and a `/favicon.ico` redirect in [`public/_redirects`](public/_redirects). Cloudflare Workers applies both files to static assets. The `next dev` server ignores them.

`site.url` in every `portfolio.json` must be the production origin. It is the base of every canonical URL, sitemap entry and social image.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build, validates content too |
| `pnpm check` | Lint (Biome) + content validation |
| `pnpm check:fix` | Lint with auto-fix |
| `pnpm check:content` | Content validation only |
| `pnpm knip` | Find unused files and exports |
