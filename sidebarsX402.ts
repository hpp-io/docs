import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "x402" product docs (the `x402` docs instance, served at /x402).
// Modeled on the CDP x402 docs: Overview -> concepts -> quickstarts -> facilitator -> reference.
// Add new pages here as you create them under `x402/` (the id is the file path without extension).
const sidebars: SidebarsConfig = {
  x402Sidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'how-it-works',
    'networks-and-token',
    {
      type: 'category',
      label: 'Quickstart',
      collapsed: false,
      items: ['quickstart-sellers', 'quickstart-buyers'],
    },
    'facilitator',
    'sdk',
  ],
};

export default sidebars;
