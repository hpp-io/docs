---
title: Configuration
sidebar_label: Configuration
description: The Noosphere agent's config.json, block by block — chain, containers, verifiers, scheduler, payload storage, and VRF.
---

# Configuration

The agent is configured by a single `config.json` (generate one interactively with
`npm run generate:config`; template in
[`config.example.json`](https://github.com/hpp-io/noosphere-agent-js/blob/main/config.example.json)).
Secrets are never written into the file — use `${ENV_VAR}` substitution and put values in `.env`.

## Blocks

| Block | Purpose |
| --- | --- |
| `chain` | RPC/WS endpoints, Router & Coordinator addresses, wallet (keystore path + receiving address). Addresses per network: [Registry & deployments](./registry-and-deployments.md) |
| `containers[]` | The Docker images this agent can run — see [Container contract](./container-contract.md#registering-the-container) |
| `verifiers[]` | Verifier contracts this agent serves, each optionally paired with a proof-service container |
| `scheduler` / `retry` | Scheduled-subscription interval commitment and retry policy |
| `payload` | Large input/output storage (below) |
| `vrf` | Opt-in NoosphereVRF epoch serving (pair with the registry's `noosphere-vrng` container) |
| `x402Seller` | The separate per-call selling rail — configured here but documented with its own product: [x402 on HPP](/x402) |

## `chain`

```jsonc
"chain": {
  "rpcUrl": "https://sepolia.hpp.io",
  "wsRpcUrl": "wss://sepolia.hpp.io",
  "router": "0x480a4f7506548773040d47dd7b6372dbf71358d4",
  "wallet": {
    "keystorePath": ".noosphere",
    "paymentAddress": "${PAYMENT_ADDRESS}"
  }
}
```

`npm run generate:config` fills the addresses for the network you pick, sourced from the
[community registry](./registry-and-deployments.md).

## `containers[]`

```jsonc
"containers": [
  {
    "id": "hf-sentiment",            // referenced by subscriptions / registry ID
    "name": "hf-sentiment",          // docker name (agent prefixes it)
    "image": "hf-sentiment:latest",
    "port": "8090",                  // where /computation listens inside
    "env": { "HF_TOKEN": "${HF_TOKEN}" }
  }
]
```

## `verifiers[]`

Serve proof-checked subscriptions: each entry names the on-chain verifier contract and,
when the proof is produced off-chain, the companion proof-service container.
`PROOF_SERVICE_PRIVATE_KEY` in `.env` signs proof submissions.

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

| Network | Chain ID | RPC |
| --- | --- | --- |
| HPP Mainnet | `190415` | `https://mainnet.hpp.io` |
| HPP Sepolia | `181228` | `https://sepolia.hpp.io` |

Full contract addresses: [Registry & deployments](./registry-and-deployments.md).
