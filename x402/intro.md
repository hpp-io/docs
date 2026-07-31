---
title: x402 on HPP
sidebar_label: Overview
slug: /
description: Accept and pay for HTTP resources with onchain stablecoins on HPP using the x402 payment protocol.
---

# x402 on HPP

**x402** is an open payment protocol that revives the long-dormant HTTP `402 Payment Required`
status code. It lets any HTTP endpoint charge for access with onchain stablecoins — no API keys,
no accounts, no manual invoicing. A client requests a resource, receives a `402` with machine-readable
payment terms, pays by signing a stablecoin authorization, and retries. Settlement happens onchain.

HPP runs **production x402 facilitators on both its Mainnet and Sepolia networks**, so you can
monetize an API — or pay for one — using **USDC.e** with a few lines of code.

It's built for **agentic payments**: an AI agent can discover a price and pay it autonomously —
keyless, wallet-less, and non-custodial. The fastest way to see that is
[**Pay from an AI agent**](pay-from-an-ai-agent.mdx), which gives Claude, Cursor, or any MCP host a capped
wallet with no code.

## Why x402

- **Built for agents and machines.** Payment is a single signed message on a standard HTTP
  response. No human-in-the-loop, no dashboard signup. AI agents can discover a price and pay it autonomously.
- **No accounts, no custody.** Payment moves from the buyer's wallet to the seller's `payTo` address;
  HPP's facilitator never custodies funds — it only verifies the signature and submits the settlement
  transaction (a direct transfer for `exact`, or a Permit2 transfer for `upto`).
- **Stablecoin-native.** Prices are quoted in USDC.e. What the buyer signs is what the seller receives.
- **Open standard.** x402 is maintained by the [x402 Foundation](https://github.com/x402-foundation/x402),
  and HPP uses the same `@x402` SDK that works on Base, Polygon, and others — pointed at HPP's networks
  and facilitator. One small setup step registers USDC.e as HPP's default asset (shown in the quickstarts).

## What HPP provides

| Piece | What it is |
| --- | --- |
| **Facilitators** | Hosted `verify` / `settle` services for HPP Mainnet (`facilitator.hpp.io`) and HPP Sepolia (`facilitator-sepolia.hpp.io`). See [Facilitator](./facilitator.mdx). |
| **Networks** | HPP Mainnet (`eip155:190415`) and HPP Sepolia (`eip155:181228`), recognized natively by the `@x402` SDK. See [Networks & Token](./networks-and-token.mdx). |
| **Token** | USDC.e (Bridged USDC) at `0x401eCb1D350407f13ba348573E5630B83638E30D` on both chains. |
| **Schemes** | `exact` (EIP-3009) and `upto` (Permit2 with optional gasless settlement). See [How it works](./how-it-works.md). |

## Choose your path

Pick your side of the payment.

### 💸 I want to pay for services (buyer)

| From… | Start here |
| --- | --- |
| an **AI agent** — Claude, Cursor, … (no code) | **[Pay from an AI agent](pay-from-an-ai-agent.mdx)** |
| my **own code** | **[Quickstart: Buyers](./quickstart-buyers.mdx)** |

### 🏷️ I want to charge for my service (seller)

| How | Start here |
| --- | --- |
| Put a price on an HTTP endpoint (SDK) | **[Quickstart: Sellers](./quickstart-sellers.mdx)** |
| One command, no server code | `hpp-x402 serve` — see the [agent guide](pay-from-an-ai-agent.mdx#sell-from-the-cli) |

### 📖 Learn the concepts

- **[How it works](./how-it-works.md)** — the `402` flow, the three roles, and the payment schemes.
- **[Service directory](service-directory.mdx)** — the curated catalog buyers and agents discover.
- **[Networks & Token](./networks-and-token.mdx)** — chain IDs, RPC endpoints, and the USDC.e asset.
- **[Facilitator](./facilitator.mdx)** — endpoints, supported schemes, gasless settlement, and self-hosting.
