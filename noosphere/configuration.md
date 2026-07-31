---
title: Configuration
sidebar_label: Configuration
description: The Noosphere agent's config.json, block by block — chain, containers, x402Seller, verifiers, scheduler, payload storage, and VRF.
---

# Configuration

The agent is configured by a single `config.json` (generate one interactively with
`npm run generate:config`; template in
[`config.example.json`](https://github.com/hpp-io/noosphere-agent-js/blob/main/config.example.json)).
Secrets are never written into the file — use `${ENV_VAR}` substitution and put values in `.env`.

## Core blocks

| Block | Purpose |
| --- | --- |
| `chain` | RPC endpoints, Router/Coordinator addresses, wallet (keystore path + receiving address) |
| `containers[]` | The Docker images this agent can run — see [Container contract](./container-contract.md#registering-the-container) |
| `x402Seller` | Per-call selling (below) |
| `verifiers[]` | On-chain verifier contracts to serve (+ optional proof-service container) |
| `scheduler` / `retry` | Compute-network interval scheduling and retry policy |
| `payload` | Large input/output storage (below) |
| `vrf` | Optional NoosphereVRF epoch serving |

## `x402Seller`

| Field | Meaning |
| --- | --- |
| `enabled` | Master switch — `false`/absent leaves the module fully inert |
| `payTo` | Receiving wallet (defaults to `chain.wallet.paymentAddress`) |
| `facilitators` | Facilitator URL per network — Sepolia `https://facilitator-sepolia.hpp.io`, Mainnet `https://facilitator.hpp.io` |
| `defaultAsset` | Payment token per network (USDC.e address + its EIP-712 domain) |
| `services[]` | What you sell (below) |
| `discovery` | Listing on the [x402 Explorer](https://x402-explorer.hpp.io) — `apiUrl`, `publicBaseUrl`, `register` |
| `demoTunnel` | **Test only** — ephemeral Quick Tunnel standing in for `publicBaseUrl` |

### `services[]` entry

| Field | Meaning |
| --- | --- |
| `name` | Route + tool name (`/paid/compute/<name>`, MCP `compute_<name>`) |
| `containerId` | Which `containers[]` entry runs the work |
| `settlement` | `"direct"` — run locally, settle per call |
| `network` / `schemes` | Payment network (CAIP-2) + schemes (`["exact"]`) |
| `x402Price` | Price per call in atomic USDC.e (6 decimals — `"5000"` = $0.005) |
| `inputSchema` | JSON Schema; invalid input is rejected `400` **before** payment |
| `receipt` | `true` → embed a verifiable execution receipt in each response |
| `discovery` | Listing enrichment: `input` example, `output.example`, `tags`, `iconUrl`, `serviceName` |

> Give every service a real `inputSchema` and a `discovery` block with genuine input/output
> examples — the explorer renders them on your service page, and buyers (human and AI) decide
> with them.

## `payload`

Large inputs/outputs stay off-chain; the agent resolves URI-based payloads:

| Scheme | Use case | Env |
| --- | --- | --- |
| `data:` | Inline base64 below `payload.uploadThreshold` | — |
| `ipfs://` | IPFS / Pinata | `PINATA_API_KEY`, `PINATA_API_SECRET`, `IPFS_GATEWAY` |
| `https://` | S3-compatible storage (R2/S3/MinIO) | `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL_BASE` |

```jsonc
"payload": { "uploadThreshold": 1024, "defaultStorage": "s3" }
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `KEYSTORE_PASSWORD` | Decrypts the agent keystore *(required)* |
| `PAYMENT_ADDRESS` | Receiving wallet shown by `npm run init` |
| `EXPRESS_PORT` | Agent API port (default `4000`) |
| `PROOF_SERVICE_PRIVATE_KEY` | Only for verifiers with a proof service |
| `R2_*` / `PINATA_*` / `IPFS_*` | Payload storage backends (above) |

## Networks

| Network | CAIP-2 | Facilitator |
| --- | --- | --- |
| HPP Mainnet | `eip155:190415` | `https://facilitator.hpp.io` |
| HPP Sepolia | `eip155:181228` | `https://facilitator-sepolia.hpp.io` |

USDC.e is `0x401eCb1D350407f13ba348573E5630B83638E30D` on both — full chain details in
[x402 Networks & Token](/x402/networks-and-token).
