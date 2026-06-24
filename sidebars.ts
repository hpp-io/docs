import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manually authored sidebar that preserves the GitBook SUMMARY.md ordering.
// Categories and external "Tools" links are added incrementally during migration.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Welcome',
      link: {type: 'doc', id: 'intro'},
      items: [
        'readme/how-hpp-works',
        'readme/noosphere',
        'readme/arenai',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/network-information',
        'getting-started/hpp-contracts',
        'getting-started/connect-to-hpp',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      items: ['ecosystem/overview'],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/official-links',
        'community/tokenomics',
        'community/hpp-dao',
        'community/migration-guide',
        'community/staking-guide',
        'community/bridge',
        'community/airdrop',
      ],
    },
    {
      type: 'category',
      label: 'Building on HPP',
      items: [
        'building-on-hpp/deploy-a-smart-contract',
        'building-on-hpp/run-a-hpp-node',
        'building-on-hpp/development-frameworks',
        'building-on-hpp/web3-libraries-and-tools',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsible: false,
      items: [
        {type: 'link', label: 'HPP Portal', href: 'https://portal.hpp.io/'},
        {type: 'link', label: 'Arbitrum Bridge', href: 'https://bridge.arbitrum.io/?destinationChain=hpp-mainnet&sourceChain=ethereum'},
        {type: 'link', label: 'Superbridge (HPP Sepolia)', href: 'https://hpp-sepolia-turdrv0107-c8a38bf8f82a8de2.testnets.rollbridge.app/'},
        {type: 'link', label: 'Block Explorer', href: 'https://explorer.hpp.io/'},
        {type: 'link', label: 'HPP Sepolia Faucet', href: 'https://faucet.hpp.io/'},
      ],
    },
  ],
};

export default sidebars;
