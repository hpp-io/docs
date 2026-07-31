import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Noosphere" product docs (served at /noosphere).
// Pure protocol docs: concepts -> hands-on tutorial -> role guides (operator /
// contract developer) -> reference. x402 per-call selling is a separate product
// (/x402); it appears here only as the operator's second market, with detail
// owned by /x402/sell-from-an-agent.
const sidebars: SidebarsConfig = {
  noosphereSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'how-it-works',
    'first-request',
    {
      type: 'category',
      label: 'Run an agent',
      collapsed: false,
      items: ['run-an-agent', 'dashboard'],
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
