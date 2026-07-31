import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Noosphere" product docs (served at /noosphere).
// Overview -> concepts -> role-based guides (operator / seller / buyer /
// contract developer) -> reference. Same shape as the x402 section.
const sidebars: SidebarsConfig = {
  noosphereSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'how-it-works',
    {
      type: 'category',
      label: 'Run an agent',
      collapsed: false,
      items: ['run-an-agent', 'sell-compute'],
    },
    {
      type: 'category',
      label: 'Use compute',
      collapsed: false,
      items: ['buy-compute', 'request-onchain-compute'],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['container-contract', 'configuration'],
    },
  ],
};

export default sidebars;
