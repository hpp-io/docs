import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "Smart Accounts" (account abstraction) docs, served at /smart-accounts.
// Users first (wallet, agent payments), then builders (SDK, sponsorship, agents), then reference.
const sidebars: SidebarsConfig = {
  smartAccountsSidebar: [
    {type: 'doc', id: 'overview', label: 'Overview'},
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
    'reference',
  ],
};

export default sidebars;
