---
title: Noosphere on HPP
sidebar_label: Overview
slug: /
description: Noosphere is HPP's verifiable off-chain compute network — smart contracts request AI inference and heavy computation from agents, and anyone can sell compute per-call with x402.
---

# Noosphere on HPP

**Noosphere** is HPP's verifiable off-chain compute network. Smart contracts can't run an LLM,
crunch a dataset, or call a model — Noosphere gives them a way to **delegate that work to
off-chain agents** and receive the result back on-chain, with payment, redundancy, and optional
proof verification built into the protocol.

The network is powered by **agents**: nodes that run ordinary Docker containers and get paid for
the compute they serve. One agent, two independent revenue rails — enable either or both:

| | ⛓ Compute network | 💰 x402 per-call selling |
| --- | --- | --- |
| Who asks for work | **Smart contracts** (subscriptions via the protocol) | **Anyone over HTTP or MCP** — apps, scripts, AI agents |
| How it pays | On-chain billing per delivery (fee token + node fee) | USDC.e per call via [x402](/x402) — settled instantly, gas sponsored |
| Verification | On-chain verifier contracts, redundancy | Optional signed execution receipt |
| Setup cost | Agent wallet needs ETH for delivery gas | **Zero** — an empty wallet works |
| Best for | Trust-minimized compute for dApps | Monetizing a model you already have |

Both rails run the **same containers**. Wrap your model once, and it can serve on-chain
subscriptions and per-call HTTP buyers at the same time.

## Choose your path

### 🖥 I want to earn by running compute (operator)

| Goal | Start here |
| --- | --- |
| Stand up an agent node | **[Run an agent](./run-an-agent.mdx)** |
| Sell my own model per-call, no funds needed | **[Sell compute with x402](./sell-compute.mdx)** |

### 🧑‍💻 I want to use compute

| From… | Start here |
| --- | --- |
| my app, script, or AI agent (pay per call) | **[Buy compute](./buy-compute.mdx)** |
| a **smart contract** (on-chain request → callback) | **[Request compute on-chain](./request-onchain-compute.mdx)** |

### 📖 Learn the concepts

- **[How it works](./how-it-works.md)** — the roles, the request lifecycle, subscriptions,
  billing, and verification.
- **[Container contract](./container-contract.md)** — the one-endpoint interface every
  Noosphere container implements.
- **[Configuration](./configuration.md)** — the agent's `config.json`, block by block.

## What Noosphere enables

- **AI-powered dApps** — request LLM inference, risk scoring, or simulations directly from a
  contract and act on the result on-chain.
- **A permissionless compute marketplace** — any machine that can run Docker can join, serve
  work, and earn; consumers pick redundancy and verification levels per subscription.
- **Instant compute monetization** — turn a HuggingFace model into a paid API in minutes with
  [x402](/x402): buyers pay USDC.e per call, settlement is on-chain, and the
  [x402 Explorer](https://x402-explorer.hpp.io) lists your service for agents to discover.
- **Verifiable randomness** — agents can serve **NoosphereVRF** epochs, giving contracts an
  on-chain source of randomness.
