import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// HPP Docs — migrated from GitBook. Hosted on GitHub Pages.
const config: Config = {
  title: 'HPP Builders',
  tagline: 'House Party Protocol Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Served at the docs.hpp.io custom domain via GitHub Pages.
  // The domain is pinned with static/CNAME; the github.io URL redirects here.
  url: 'https://docs.hpp.io',
  baseUrl: '/',

  organizationName: 'hpp-io',
  projectName: 'docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // .md => CommonMark (lenient, safe for migrated content),
  // .mdx => MDX (used for pages that need Tabs/JSX).
  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

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

  // Standalone product guides (Hub at /hub, Router at /hpp-router).
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'hub',
        path: 'hub',
        routeBasePath: 'hub',
        sidebarPath: './sidebarsHub.ts',
        editUrl: 'https://github.com/hpp-io/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'router',
        path: 'hpp-router',
        routeBasePath: 'hpp-router',
        sidebarPath: './sidebarsRouter.ts',
        editUrl: 'https://github.com/hpp-io/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'coder',
        path: 'hpp-coder',
        routeBasePath: 'hpp-coder',
        sidebarPath: './sidebarsCoder.ts',
      },
    ],
    // x402 payment-protocol docs — a standalone product section served at /x402
    // (modeled on docs.cdp.coinbase.com/x402), independent of the main HPP docs.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'x402',
        path: 'x402',
        routeBasePath: 'x402',
        sidebarPath: './sidebarsX402.ts',
        editUrl: 'https://github.com/hpp-io/docs/tree/main/',
      },
    ],
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        docsRouteBasePath: ['/', 'hub', 'hpp-router', 'x402', 'hpp-coder'],
        highlightSearchTermsOnTargetPage: true,
        language: ['en'],
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'HPP Builders',
      logo: {
        alt: 'HPP',
        src: 'img/hpp-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          label: 'Docs',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hubSidebar',
          docsPluginId: 'hub',
          label: 'HPP Hub',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'routerSidebar',
          docsPluginId: 'router',
          label: 'HPP Router',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'x402Sidebar',
          docsPluginId: 'x402',
          label: 'x402',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'coderSidebar',
          docsPluginId: 'coder',
          label: 'HPP Coder',
          position: 'right',
        },
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
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/getting-started/network-information'},
            {label: 'Building on HPP', to: '/building-on-hpp/deploy-a-smart-contract'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Official Links', to: '/community/official-links'},
            {label: 'Tokenomics', to: '/community/tokenomics'},
          ],
        },
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
