import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// HPP Docs — migrated from GitBook. Hosted on GitHub Pages.
const config: Config = {
  title: 'HPP Docs',
  tagline: 'House Party Protocol Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Phase 1: GitHub Pages project site.
  // Phase 2 (docs.hpp.io): change `url` to 'https://docs.hpp.io' and `baseUrl` to '/',
  // then add static/CNAME. See README "Custom domain" section.
  url: 'https://hpp-io.github.io',
  baseUrl: '/docs/',

  organizationName: 'hpp-io',
  projectName: 'docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // .md => CommonMark (lenient, safe for migrated content),
  // .mdx => MDX (used for pages that need Tabs/JSX).
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hpp-io/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'HPP Docs',
      items: [
        {
          href: 'https://github.com/hpp-io/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // NOTE: Docs/Community footer groups (internal links) are restored in the
        // final integration step (Task 11) once all target pages exist.
        {
          title: 'Tools',
          items: [
            {label: 'HPP Portal', href: 'https://portal.hpp.io/'},
            {label: 'Block Explorer', href: 'https://explorer.hpp.io/'},
            {label: 'Faucet', href: 'https://faucet.hpp.io/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} House Party Protocol (HPP).`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
