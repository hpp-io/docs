import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "HPP Hub" guide (the `hub` docs instance, served at /hub).
// Add new guide pages here as you create them under `hub/` — the id is the file path
// without the extension (e.g. `getting-started` for `hub/getting-started.md`).
const sidebars: SidebarsConfig = {
  hubSidebar: [
    'intro',
    // 'getting-started',
    // 'developer-tools',
    // 'hpp-coder',
    // 'faq',
  ],
};

export default sidebars;
