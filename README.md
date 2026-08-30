# Awesome Portfolio

A single-page developer portfolio where all content lives in [`portfolio.json`](portfolio.json). To make it yours, edit the JSON. No code changes required.

**Demo:** https://awesome-portfolio.57vjct26wg.workers.dev

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Editing content

Everything comes from [`portfolio.json`](portfolio.json): site metadata (`site`), hero (`owner`), dock links (`socialLinks`), and the ordered `sections` array. Reorder, remove, or duplicate sections freely. Sections with a `navLabel` appear in the dock menu.

Section types:

| Type | Renders |
| --- | --- |
| `entries` | Expandable list (experience, education, projects, anything) |
| `stack` | Technology groups with icons |
| `github-contributions` | Live GitHub contribution graph |
| `statement` | Personal statement, with `*asterisks*` for emphasis |
| `contact` | Call-to-action button (`http(s)` or `mailto:` URL) |

The schema in [`src/schema/portfolio.ts`](src/schema/portfolio.ts) is the single source of truth for all fields and the supported icon names.

After editing, validate:

```bash
pnpm check:portfolio
```

It checks the full shape plus invariants: unique ids, local logos exist in `public/`, valid icons and URLs. The production build runs the same validation.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build, validates content too |
| `pnpm check` | Lint (Biome) + content validation |
| `pnpm check:fix` | Lint with auto-fix |
| `pnpm check:portfolio` | Content validation only |
| `pnpm knip` | Find unused files and exports |
