import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the standalone "HPP Router" guide (the `router` docs instance, served at /hpp-router).
// Pages appear in the left sidebar in this order; add new pages here as you create them
// under `hpp-router/` (the id is the file path without the extension).
const sidebars: SidebarsConfig = {
  routerSidebar: [
    {type: 'doc', id: 'intro', label: 'Overview'},
    'quickstart',
    'authentication',
    'models-and-pricing',
    'smart-routing',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/chat-completions',
        'guides/streaming',
        'guides/vision-multimodal',
        'guides/image-generation',
        'guides/x402-agent',
        'guides/usage-and-settlement',
        'guides/errors',
        'guides/openai-sdk',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [{type: 'doc', id: 'api-reference/consumer-api', label: 'Overview'}],
    },
    {
      type: 'category',
      label: 'Client SDK',
      collapsed: false,
      items: ['client-sdk/typescript'],
    },
  ],
};

export default sidebars;
