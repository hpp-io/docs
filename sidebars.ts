import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manually authored sidebar that preserves the GitBook SUMMARY.md ordering.
// Categories and external "Tools" links are added incrementally during migration.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'intro', label: 'Welcome'},
  ],
};

export default sidebars;
