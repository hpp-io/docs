import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Smart Accounts" (account abstraction) docs, served at /smart-accounts.
// Concepts, then users (wallet, agent payments), then builders, then reference & help.
const sidebars: SidebarsConfig = {
  smartAccountsSidebar: [
    {type: 'doc', id: 'overview', label: 'Overview'},
    'how-it-works',
    {
      type: 'category',
      label: 'Use the wallet',
      collapsed: false,
      items: ['wallet', 'pay-from-an-agent'],
    },
    {
      type: 'category',
      label: 'Build with Smart Accounts',
      collapsed: false,
      items: ['quickstart', 'gas-sponsorship', 'agent-permissions'],
    },
    {
      type: 'category',
      label: 'Reference & help',
      collapsed: false,
      items: ['reference', 'errors', 'faq'],
    },
  ],
};

export default sidebars;
