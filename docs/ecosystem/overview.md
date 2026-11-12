
# Ecosystem

Most Layer 2s are built for transactions. House Party Protocol is built for **agents**.

HPP is an AI-native L2 where autonomous agents execute, reason, and pay onchain — and where developers have the tools to build them. HPP's products are not a list of separate services but one integrated stack: an agent pays through **x402**, infers through **HPP Router**, connects onchain logic to off-chain compute through **Noösphere**, and records its state through **HPPLite**.

| Layer | Product | Status |
| --- | --- | --- |
| Payment | [x402](#x402--the-payment-layer) | Live |
| Intelligence | [HPP Router](#hpp-router--the-model-router) / [HPP Coder](#hpp-coder--the-coding-llm) | Live |
| Compute | [Noösphere](#noösphere--the-compute-layer) | Live |
| State | [HPPLite](#hpplite--the-state-layer) | In development |
| Application | [HPP Hub](#hpp-hub--the-app-builder) | Live |

Alongside the stack, [Smart Accounts](#smart-accounts--wallets-for-people-and-agents) give people and agents a wallet that fits it, and [OpenHPP](#openhpp--the-agent-runtime) gives agents a place to run.

### x402 · The payment layer

**Live**

The open payment standard (HTTP 402) that lets AI agents pay onchain with a single signature — no accounts, no checkout. HPP is registered in the x402 asset registry as the default settlement chain for USDC (Chain ID 190415), so every agent and app in the ecosystem can transact natively. Sellers price in **USDC.e** by default, and can also price in **CHIP** or **HPP**; prepaid batch settlement is available on Mainnet.

→ [x402 docs](/x402)

→ [HPP and x402: Preparing for the Agentic Payment Era (Part 1)](https://blog.hpp.io/hpp-and-x402-preparing-for-the-agentic-payment-era-part-1/)

→ [HPP and x402: Preparing for the Agentic Payment Era (Part 2)](https://blog.hpp.io/hpp-and-x402-preparing-for-the-agentic-payment-era-part-2-2/)

### HPP Router · The model router

**Live**

An OpenAI-compatible LLM inference router that sends each request to the best-fit model across the network — including HPP Coder. The [Router portal](https://router.hpp.io) handles model discovery, API keys, and testing. Usage settles on a prepaid quota or onchain through an x402 wallet, and agents can call it keyless, paying per request with x402.

→ [HPP Router docs](/hpp-router)

### HPP Coder · The coding LLM

**Live**

A coding LLM purpose-built for smart contract developers, fine-tuned from an open-weight model on a Solidity corpus. Developers use it to generate, review, and audit smart contract code. Served through HPP Router and offered free via HPP Hub.

→ [HPP Coder docs](/hpp-coder)

### Noösphere · The compute layer

**Live**

HPP's onchain compute framework. A smart contract requests off-chain compute as a subscription; decentralized agent nodes execute it in containers, and delivery, billing, and verification all run through an onchain lifecycle. The same agent node can also sell per call through x402.

→ [Noösphere docs](/noosphere) · [Overview](/readme/noosphere)

### HPPLite · The state layer

**In development** — targeted for 2027

A SQLite extension that turns an application into a sovereign rollup without code changes. Every write is posted in encrypted batches and a state root of the whole database is anchored on HPP, so each application gets its own rollup contract and an ordered, verifiable history — without running a separate chain or node.

→ [HPPLite overview](/readme/hpplite)

### HPP Hub · The app builder

**Live**

An app-builder platform on the models HPP Router provides. Describe what you want and Hub builds web apps, 2D and 3D games, and Web3 apps; for smart contracts, HPP Coder handles code generation and review. HPP Coder is offered free in Hub.

→ [HPP Hub guide](/hub) · [hub.hpp.io](https://hub.hpp.io)

### Smart Accounts · Wallets for people and agents

**Live** on HPP Mainnet and Sepolia

ERC-4337 and EIP-7702 smart accounts run by HPP. Users sign in with an email, send their first transactions with sponsored gas, pay fees in USDC.e or HPP instead of ETH, and give an AI agent a spending limit it cannot exceed — enforced onchain and revocable at any time.

→ [Smart Accounts docs](/smart-accounts)

### OpenHPP · The agent runtime

**Closed beta** — public access coming soon

A secure operating space for AI agents in the HPP family. Autonomous agents run in fully isolated Linux containers, with session-key access control, one-click deployment, and real-time execution visibility.

* Fully isolated Linux containers
* Dynamic session-key access control
* One-click managed deployment
