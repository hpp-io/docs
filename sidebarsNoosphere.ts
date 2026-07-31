import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Noosphere" product docs (served at /noosphere).
// Pure protocol docs: concepts -> consumer developers -> agent operators ->
// reference. x402 per-call selling is a separate product (/x402) and is only
// cross-referenced, never interleaved.
const sidebars: SidebarsConfig = {
  noosphereSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'how-it-works',
    'request-onchain-compute',
    'run-an-agent',
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['container-contract', 'registry-and-deployments', 'configuration'],
    },
  ],
};

export default sidebars;
