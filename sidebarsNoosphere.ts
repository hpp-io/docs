import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Noosphere" product docs (served at /noosphere).
// Concepts -> hands-on tutorial -> operator (common setup, then a rail each —
// the x402 rail's detail lives in /x402, linked in place) -> contract
// developers -> reference.
const sidebars: SidebarsConfig = {
  noosphereSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'how-it-works',
    'first-request',
    {
      type: 'category',
      label: 'Run an agent',
      collapsed: false,
      items: [
        'node-setup',
        'serve-compute-network',
        {
          type: 'link',
          label: 'Sell per-call (x402) ↗',
          href: '/x402/sell-from-an-agent',
        },
        'dashboard',
      ],
    },
    'request-onchain-compute',
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['container-contract', 'registry-and-deployments', 'configuration'],
    },
  ],
};

export default sidebars;
