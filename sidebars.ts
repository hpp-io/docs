import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manually authored sidebar that preserves the GitBook SUMMARY.md ordering.
// Categories and external "Tools" links are added incrementally during migration.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Welcome',
      link: {type: 'doc', id: 'intro'},
      items: [
        'readme/how-hpp-works',
        'readme/noosphere',
        'readme/arenai',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/network-information',
        'getting-started/hpp-contracts',
        'getting-started/connect-to-hpp',
      ],
    },
  ],
};

export default sidebars;
