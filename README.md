# Portfolio

A single-page developer portfolio where every piece of content lives in one file: [`portfolio.json`](portfolio.json). To make it yours, edit the JSON — no code changes required.

Built with Next.js 16, React 19, and TypeScript. Content is validated with a Zod schema, so mistakes fail fast with a clear message instead of rendering a broken page.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Make it yours

All content — name, bio, site metadata, social links, and every section of the page — comes from [`portfolio.json`](portfolio.json) at the repository root.

```bash
pnpm check:portfolio
```

Run this after editing to confirm everything is valid. It checks the full shape of the file plus a few invariants:

- ids are unique across sections and entries
- local logos (paths starting with `/`) exist in `public/`
- stack icons belong to the supported icon set
- links are well-formed URLs

The production build runs the same validation, so an invalid file never ships.

### Top-level fields

| Field | Purpose |
| --- | --- |
| `site` | Browser tab title and meta description |
| `owner` | Hero block: greeting, name, role, availability, intro |
| `socialLinks` | Links shown in the dock's social menu |
| `sections` | Ordered list of page sections |

### Sections

The page renders `sections` in order. Reorder, remove, or duplicate them freely. Each section has an `id` (used as the anchor target) and an optional `navLabel` — sections with a `navLabel` appear in the dock's navigation menu, numbered by order.

| Type | Renders | Own fields |
| --- | --- | --- |
| `entries` | A titled list of expandable entries | `title`, `entries`, `footnote?` |
| `stack` | A grid of technology groups with icons | `title`, `groups` |
| `github-contributions` | Live GitHub contribution graph | `title`, `username`, `errorNotice` |
| `statement` | A large personal statement | `text` (wrap words in `*asterisks*` for emphasis) |
| `contact` | Closing call-to-action with a button | `heading`, `invitation`, `action`, `url` |

An entry (used by `entries` sections for experience, education, projects, or anything else) supports:

| Field | Purpose |
| --- | --- |
| `title` | Main line (role, degree, project name) |
| `subtitle?` | Organization, institution, or context |
| `logo?` | Local path under `public/` or an `http(s)` URL |
| `period?` | Free-form date range |
| `tag?` | Small tag on the right (e.g. main technology) |
| `description?` | Expandable body text |
| `links?` | External links shown when expanded |

The schema lives in [`src/schema/portfolio.ts`](src/schema/portfolio.ts) — it is the single source of truth for validation and for the TypeScript types the components consume. Supported stack icon names are listed there.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (validates content too) |
| `pnpm check` | Lint (Biome) + content validation |
| `pnpm check:fix` | Lint with auto-fix |
| `pnpm check:portfolio` | Content validation only |
| `pnpm knip` | Find unused files and exports |
