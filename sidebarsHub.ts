import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "HPP Hub" guide (the `hub` docs instance, served at /hub).
// Pages appear in the left sidebar in this order; add new pages here as you create them
// under `hub/` (the id is the file path without the extension).
const sidebars: SidebarsConfig = {
  hubSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'quickstart',
    'playground',
    'wallets',
    'api-keys',
    'settings',
    'faq',
  ],
};

export default sidebars;
