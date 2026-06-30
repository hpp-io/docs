---
title: SDK & reference
sidebar_label: SDK & reference
description: The @x402 SDK packages, HPP network identifiers, and links to the x402 specification.
---

# SDK & reference

HPP works with the standard **`@x402`** SDK maintained by the
[x402 Foundation](https://github.com/x402-foundation/x402). There is no HPP-specific fork — HPP
Mainnet and Sepolia are recognized via their CAIP-2 network identifiers, the same way the SDK
recognizes Base, Polygon, and other EVM chains.

## Packages

| Package | Used by | Purpose |
| --- | --- | --- |
| `@x402/core` | both | `x402Client`, `HTTPFacilitatorClient`, `RoutesConfig` types. |
| `@x402/evm` | both | EVM scheme clients (`exact`, `upto`) and the `DEFAULT_STABLECOINS` asset map. |
| `@x402/express` | sellers | `paymentMiddleware` and `x402ResourceServer` for Express. |
| `@x402/extensions` | sellers | Route extensions, e.g. `declareEip2612GasSponsoringExtension()` for gasless `upto`. |
| `@x402/fetch` | buyers | `wrapFetchWithPayment` to make a paying `fetch`. |
| `viem` | buyers | Wallet account and chain utilities (`privateKeyToAccount`, `defineChain`). |

Scheme clients are imported per role and scheme:

```ts
// Seller (resource server)
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { UptoEvmScheme } from "@x402/evm/upto/server";

// Buyer (client)
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { UptoEvmScheme } from "@x402/evm/upto/client";
```

## HPP network identifiers

x402 uses [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) network identifiers. Use these values for
the `network` field everywhere in the SDK:

| Network | x402 `network` |
| --- | --- |
| HPP Mainnet | `eip155:190415` |
| HPP Sepolia | `eip155:181228` |

## Asset

| Field | Value |
| --- | --- |
| USDC.e address (both chains) | `0x401eCb1D350407f13ba348573E5630B83638E30D` |
| Decimals | `6` |
| EIP-712 domain | name `Bridged USDC`, version `2` |

Register it in the SDK's default-asset map so EIP-3009 domains are filled in automatically — see
[Quickstart: Sellers → Register USDC.e](./quickstart-sellers.mdx#2-register-usdce).

## Discovery

x402 includes an optional **discovery** mechanism (the "bazaar" extension) that lets sellers publish
their paid endpoints so buyers and agents can find them. A seller opts in by declaring the discovery
extension on its routes; HPP operates a discovery service that indexes published HPP x402 services.
Discovery is not required to accept or make payments — it is an add-on for marketplace-style use.

## Links

- **x402 specification & SDK** — https://github.com/x402-foundation/x402
- **HPP Facilitator** — [endpoints and schemes](./facilitator.mdx)
- **HPP Networks & Token** — [chain IDs and RPC](./networks-and-token.mdx)
- **HPP Network Information** — [WSS, Chainlist, explorer](/getting-started/network-information)
