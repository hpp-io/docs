# HPP Docs

House Party Protocol official documentation — built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages.

- **Live site:** https://hpp-io.github.io/docs/ (custom domain `docs.hpp.io` planned)
- **Migrated from:** the previous GitBook site (`hpp-io/hpp-docs`)

## Prerequisites

- Node.js `>= 20` (CI uses 22)
- npm

## Local development

```bash
npm install        # install dependencies (first time only)

npm start          # dev server with hot reload -> http://localhost:3000/docs/
npm run build      # production build (validates links + generates search index)
npm run serve      # serve the production build -> http://localhost:3000/docs/
npm run typecheck  # TypeScript type check
npm run clear      # clear the Docusaurus cache
```

> **Note**
> - Local search only works after `npm run build && npm run serve`. The search
>   index is generated at build time, so it is **not** available under `npm start`.
> - The site is served under the `/docs/` base path until the custom domain is live.

## Content structure

Documentation lives in `docs/`. The sidebar is defined manually in `sidebars.ts`
to preserve the original ordering. Pages that use tabs (Getting Started) are
`.mdx`; all other pages are plain `.md` (`markdown.format: 'detect'`).

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and deploys it to GitHub Pages. Pull requests are validated by
[`.github/workflows/test.yml`](.github/workflows/test.yml) (build + security audit).

GitHub Pages must use **GitHub Actions** as its source (Settings → Pages → Build and
deployment → Source). This can also be set via the API:

```bash
gh api repos/hpp-io/docs/pages -X POST -f build_type=workflow
```

## Custom domain (docs.hpp.io)

To switch from the GitHub Pages URL to `docs.hpp.io`:

1. In `docusaurus.config.ts`, set `url: 'https://docs.hpp.io'` and `baseUrl: '/'`.
2. Create `static/CNAME` containing a single line: `docs.hpp.io`.
3. Add a DNS `CNAME` record: `docs` → `hpp-io.github.io`.
4. Confirm the custom domain under Settings → Pages.

## Security

`npm audit` reports one **moderate** advisory in `js-yaml`, pulled in transitively
through Docusaurus' own dependency (`gray-matter`). It is **build-time only**
(front-matter parsing of trusted, first-party content) and is **not present in the
deployed static site**. It cannot be overridden without breaking `gray-matter`, so it
is accepted until Docusaurus bumps the dependency upstream. The high-severity
`serialize-javascript` and `uuid` advisories are pinned to patched versions via npm
`overrides` in `package.json`. CI fails only on **high/critical** advisories
(`npm audit --audit-level=high`).
