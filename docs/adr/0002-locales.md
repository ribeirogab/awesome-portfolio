# ADR-0002: One content folder per Locale, default Locale without URL prefix

**Status:** Accepted
**Date:** 2026-09-05

## Context

The portfolio ships in one language. Every text lives in `portfolio.json` and in the Article files, but about thirty interface strings ("View more", "min read", "Previous", the dock labels) are hard-coded in English, dates are formatted with `en-US`, and the HTML declares `lang="en"`.

The site is a static export served by Cloudflare Workers as plain assets. There is no middleware and no request-time code, so the Locale cannot come from a header or a cookie. It has to be part of the URL and every Locale has to be generated at build time.

Two sites already run on the template with unprefixed URLs. Those URLs must keep working.

## Decision

### URLs

- The default Locale keeps its URLs unchanged: `/`, `/articles`, `/articles/<slug>`, `/projects`, `/feed.xml`.
- Every other Locale is prefixed by its code: `/pt`, `/pt/articles`, `/pt/articles/<slug>`, `/pt/projects`, `/pt/feed.xml`.
- A site with a single Locale renders exactly as before.

### Content layout

```
content/
  i18n.json          { "default": "en", "locales": ["en", "pt"] }
  en/portfolio.json
  en/messages.json
  en/articles/*.md
  pt/portfolio.json
  pt/messages.json
  pt/articles/*.md
```

- `content/i18n.json` lists the Locales and names the default one. A Locale code is the URL prefix and the folder name.
- Each Locale is a full copy of the content. `portfolio.json` gains `site.locale`, a BCP 47 language tag such as `pt-BR`, used for the HTML `lang` attribute, the Open Graph locale, the RSS language, the JSON-LD `inLanguage`, hreflang, and date formatting.
- `messages.json` holds the interface strings for that Locale. Templates use `{name}` placeholders. The strings live in content, not in code, so a new Locale needs no code change.
- An Article is identified by its Slug across Locales: `content/en/articles/quiet-interfaces.md` and `content/pt/articles/quiet-interfaces.md` are the same Article in two languages. A Slug may exist in one Locale only.

### Parity

The validation script checks that every Locale has the same structure as the default one: the same `site.url`, the same Project ids in the same order, the same Section ids and types in the same order, the same Entry ids, the same featured Project ids, the same social link URLs, and the same Photo files. Text may differ. Structure may not. Missing `messages.json` keys fail validation.

### Routing

- Two root layouts share one document component: a route group for the default Locale and a `[locale]` segment for the others. Each route file is a thin wrapper that loads the Locale content and renders a view from `src/views/`. Metadata, the RSS feed and JSON-LD are built from the same Locale content.
- `generateStaticParams` on `[locale]` returns the non-default Locales, and Article routes return the Slugs each Locale has. `dynamicParams` is off.
- The static export refuses a dynamic segment with no params, so a single-Locale site cannot build the `[locale]` tree. Its route files carry the `.i18n.tsx` extension, and `next.config.ts` adds that extension to `pageExtensions` only when `content/i18n.json` lists more than one Locale. With one Locale the tree is plain modules and no route exists.
- Social images come from one route handler, `/social/<locale>/home.png`, `/social/<locale>/articles.png`, `/social/<locale>/projects.png` and `/social/<locale>/article/<slug>.png`, listed in `openGraph.images` and `twitter.images`. The file-convention `opengraph-image.tsx` was dropped: inside a route group Next.js appends a hash to its URL, and with the `.i18n` extension it fails to resolve.
- The 404 page is `global-not-found.tsx`, enabled by `experimental.globalNotFound`, rendered in the default Locale. Next.js requires it when there is more than one root layout.

### Discovery

- Every page declares `alternates.languages` with one hreflang entry per Locale where the page exists, plus `x-default` pointing at the default Locale.
- The sitemap lists every Locale with the same alternates. Each Locale has its own RSS feed.
- The dock shows a language menu when more than one Locale exists. It links to the same page in the other Locale, or to the Articles page when the Article has no translation there. No automatic detection by `Accept-Language`: crawlers do not see it and a static site cannot do it consistently.

## Alternatives rejected

- **Prefix every Locale, redirect `/` to the default.** Breaks every published URL and makes the default Locale a redirect hop.
- **Overlay files with only the translated strings, merged onto a base.** Needs one merge rule per list type and hides missing translations inside mixed-language pages.
- **Interface strings as a TypeScript dictionary.** Adding a Locale would need a code change, against the template's promise that content edits need none.
- **One root layout with `lang` set on the client.** The server-rendered HTML would declare the wrong language.
- **An i18n library with middleware.** The static export has no request-time code, and the site has about thirty strings.

## Consequences

- Content moves from the repository root into `content/<locale>/`. Single-Locale sites move their files once; nothing else changes for them.
- Every translated Locale doubles the content to maintain. The parity check catches structural drift; it cannot catch stale translations.
- `experimental.globalNotFound` is the one experimental Next.js flag in the project. It exists because the 404 page must render with the shared document outside any root layout, and it is the path Next.js documents for multiple root layouts.
- Locale-specific pages navigate across root layouts, so switching language is a full page load.
