# HPP Docs

House Party Protocol official documentation — built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages at [docs.hpp.io](https://docs.hpp.io).

- **Live site:** https://docs.hpp.io (the `hpp-io.github.io/docs` URL redirects here)
- **Migrated from:** the previous GitBook site (`hpp-io/hpp-docs`)

## Prerequisites

- Node.js `>= 20` (CI uses 22)
- npm

## Local development

```bash
npm install        # install dependencies (first time only)

npm start          # dev server with hot reload -> http://localhost:3000/
npm run build      # production build (validates links + generates search index)
npm run serve      # serve the production build -> http://localhost:3000/
npm run typecheck  # TypeScript type check
npm run clear      # clear the Docusaurus cache
```

> **Note**
> - Local search only works after `npm run build && npm run serve`. The search
>   index is generated at build time, so it is **not** available under `npm start`.
> - The production site is served at the `docs.hpp.io` custom domain (`baseUrl: '/'`).

## Content structure

Documentation lives in `docs/`. The sidebar is defined manually in `sidebars.ts`
to preserve the original ordering. Pages that use tabs (Getting Started) are
`.mdx`; all other pages are plain `.md` (`markdown.format: 'detect'`).

## Contributing

To add or update a documentation page:

1. Branch from `main`: `git checkout -b docs/<topic>`.
2. Add the page under the relevant `docs/<section>/` folder (e.g. `docs/community/my-page.md`).
   Use `.md` for normal content; use `.mdx` **only** when the page needs tabs or other JSX.
3. Register it in `sidebars.ts`: add the page id — its path under `docs/` without the extension
   (e.g. `community/my-page`) — to the right category. Ordering is manual, so position it where
   you want it to appear.
4. Link to other docs by their source path (`[Token Address](../getting-started/hpp-contracts.mdx)`),
   and put images in `static/img/`, referenced as `/img/<file>`.
5. Preview with `npm start`; run `npm run build` before pushing — the build **fails on broken
   links** (`onBrokenLinks: 'throw'`), so this catches mistakes early.
6. Open a pull request to `main`. CI builds and audits it; once merged, it **auto-deploys** to
   https://docs.hpp.io.

A minimal page looks like this:

```md
---
title: My Page
description: One-line summary (used for SEO and search).
---

# My Page

Your content here.
```

For a tabbed page, name the file `.mdx` and use the theme's Tabs components:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="a" label="Tab A">Content A</TabItem>
  <TabItem value="b" label="Tab B">Content B</TabItem>
</Tabs>
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and deploys it to GitHub Pages. Pull requests are validated by
[`.github/workflows/test.yml`](.github/workflows/test.yml) (build + security audit).

GitHub Pages must use **GitHub Actions** as its source (Settings → Pages → Build and
deployment → Source). This can also be set via the API:

```bash
gh api repos/hpp-io/docs/pages -X POST -f build_type=workflow
```

## Custom domain

The site is served at **https://docs.hpp.io** over HTTPS; `hpp-io.github.io/docs`
redirects here.

- Pinned by `static/CNAME` (`docs.hpp.io`) and `url` / `baseUrl: '/'` in
  `docusaurus.config.ts`, and set as the GitHub Pages custom domain.
- DNS: a `CNAME` record points `docs.hpp.io` → `hpp-io.github.io` (Cloudflare, proxy
  **off / DNS-only** so GitHub can issue the TLS certificate).

## Security

`npm audit` reports one **moderate** advisory in `js-yaml`, pulled in transitively
through Docusaurus' own dependency (`gray-matter`). It is **build-time only**
(front-matter parsing of trusted, first-party content) and is **not present in the
deployed static site**. It cannot be overridden without breaking `gray-matter`, so it
is accepted until Docusaurus bumps the dependency upstream. The high-severity
`serialize-javascript` and `uuid` advisories are pinned to patched versions via npm
`overrides` in `package.json`. CI fails only on **high/critical** advisories
(`npm audit --audit-level=high`).
