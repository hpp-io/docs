---
title: Registry & deployments
sidebar_label: Registry & deployments
description: Deployed Noosphere contract addresses on HPP Mainnet and Sepolia, and the community registry of containers and verifiers.
---

# Registry & deployments

The [**community registry**](https://github.com/hpp-io/noosphere-registry) is the network's
source of truth: one JSON file per chain listing the **deployed protocol contracts**, the
**containers** agents can serve, and the **verifiers** subscriptions can require. The agent SDK
auto-syncs from it.

## Deployed contracts

### HPP Mainnet — chain ID `190415`

| Contract | Address |
| --- | --- |
| Router | `0x043F992d67dE8c86141EA5e0897b5244cD97dac4` |
| Coordinator | `0x8b4951d0C2B15Ef4DE1f355e132A40Ac6c84E728` |
| WalletFactory | `0xD57d57F93266555302abD8EB3A1A349249453C16` |
| NoosphereVRF | `0x6d179D718C7B772CA0d6f694308fb22A516a6eFf` |

RPC `https://mainnet.hpp.io` · Explorer [explorer.hpp.io](https://explorer.hpp.io)

### HPP Sepolia (testnet) — chain ID `181228`

| Contract | Address |
| --- | --- |
| Router | `0x480a4f7506548773040d47dd7b6372dbf71358d4` |
| Coordinator | `0xeda4a7957e8f5de6cd6bd747c3ccd5e1c295302c` |
| WalletFactory | `0xe1ccab0b5deeca0b240f9bbaeccdbcb252934fa7` |
| NoosphereVRF | `0xb49Cf5e93A225638cD7fa8e4479149f453AE2e39` |

RPC `https://sepolia.hpp.io` (`wss://sepolia.hpp.io`) · Explorer
[sepolia-explorer.hpp.io](https://sepolia-explorer.hpp.io)

Both networks route subscriptions with
`routeId = "Coordinator_v1.0.0"` (bytes32:
`0x436f6f7264696e61746f725f76312e302e30…`). Consumers normally pass `bytes32(0)` and let the
Router use the default route.

> Always confirm against the registry files —
> [`networks/190415.json`](https://github.com/hpp-io/noosphere-registry/blob/main/networks/190415.json) ·
> [`networks/181228.json`](https://github.com/hpp-io/noosphere-registry/blob/main/networks/181228.json) —
> they are updated with every deployment.

## Containers

Community-verified images any agent can serve and any subscription can reference by ID:

| Container | What it does |
| --- | --- |
| `noosphere-hello-world` | Echo test — the "is everything wired" container |
| `noosphere-llm` | LLM inference |
| `noosphere-freqtrade` | Crypto price prediction (15-minute candles) |
| `noosphere-vrng` | Serves NoosphereVRF randomness epochs |

Each registry entry carries the image, port, input schema, base price, and verification status —
everything an agent needs to serve it and a consumer needs to request it.

## Verifiers

Verifier contracts that subscriptions can require (per network). Sepolia currently lists the
**Immediate Finalize Verifier** — deliveries finalize as soon as the proof-carrying delivery is
accepted.

## Using the registry from code

```ts
import { RegistryManager } from '@noosphere/registry';

const registry = new RegistryManager({
  remotePath: 'https://raw.githubusercontent.com/hpp-io/noosphere-registry/main/networks/190415.json',
  autoSync: true,
});
await registry.load();

const containers = registry.searchContainers('llm');
const router = registry.getDeployment('190415').contracts.router;
```

## Contributing to the registry

Publish your own container (or verifier) by PR to
[`hpp-io/noosphere-registry`](https://github.com/hpp-io/noosphere-registry): add an entry to the
network file with your image, port, input schema, and pricing. CI validates the schema; once
merged, every agent's registry sync can discover and serve it.
