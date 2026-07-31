---
title: How it works
sidebar_label: How it works
description: The Noosphere protocol — subscriptions, the commitment lifecycle through Router and Coordinator, compute wallets and billing, redundancy and verification, and NoosphereVRF.
---

# How it works

Noosphere connects three parties through the chain: **consumers** (contracts that want
computation), **agents** (nodes that run it), and the **protocol contracts** that coordinate
requests, escrow, and delivery between them.

## The roles

- **Consumer.** A smart contract that extends one of the client base contracts and creates a
  **compute subscription**. It funds a **compute wallet** and receives results in a callback.
- **Protocol contracts.**
  - **Router** — the single address consumers talk to. It registers protocol components and
    routes each subscription to the right Coordinator version (`routeId`).
  - **Coordinator** — runs the request lifecycle: opens requests as **commitments**, validates
    agent deliveries, and triggers the consumer callback.
  - **Billing** — meters fees per delivery and settles them from the consumer's compute wallet.
  - **WalletFactory / Wallet** — creates and manages the escrow wallets that fund subscriptions.
- **Agent.** A node running [`noosphere-agent-js`](https://github.com/hpp-io/noosphere-agent-js)
  (built on the [`@noosphere/sdk`](https://github.com/hpp-io/noosphere-sdk) packages). It watches
  chain events, runs the requested **container**, and submits the delivery transaction.
- **Containers.** Ordinary Docker images exposing one endpoint —
  [`POST /computation`](./container-contract.md). Subscriptions reference containers by ID from
  the [community registry](./registry-and-deployments.md), so *any* agent running that container
  can serve the request.

## The request lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant C as 📜 Consumer contract
    participant R as 🧭 Router
    participant K as 🎛 Coordinator
    participant A as 🤖 Agent
    participant D as 🐳 Container
    C->>R: createComputeSubscription(containerId, fee, redundancy, …)
    C->>R: sendRequest(subscriptionId, inputs)
    R->>K: open request (commitment)
    K-->>A: request event
    A->>C: getComputeInputs(subscriptionId, interval)
    A->>D: POST /computation { input }
    D-->>A: { output }
    A->>K: deliver(output [, proof])
    K->>C: _receiveCompute(output, node, …)
    Note over K: Billing pays the agent's fee<br/>from the consumer's compute wallet
```

1. **Subscribe.** The consumer creates a subscription: which container to run, the fee per
   delivery (`feeToken` + `feeAmount`), how many independent agents must answer (`redundancy`),
   which compute wallet funds it, and optionally a **verifier**.
2. **Request.** `sendRequest` (or the interval schedule) opens a request. The Coordinator records
   a **commitment** — the on-chain fingerprint of what was asked, for which fee, in which interval.
3. **Execute.** Agents see the request, fetch the inputs, run the container, and submit the
   output on-chain (the delivery transaction is the agent's gas cost).
4. **Deliver & settle.** The Coordinator validates the delivery against the commitment, invokes
   the consumer's callback, and Billing pays the agent from the compute wallet. With
   `useDeliveryInbox`, results are stored in a **DeliveryInbox** for the consumer to pull instead.

## Transient vs scheduled subscriptions

| | Transient | Scheduled |
| --- | --- | --- |
| Shape | One-shot: create → request → one delivery | Recurring: every `intervalSeconds`, up to `maxExecutions` |
| Inputs | Stored on-chain per request | Produced by the consumer per interval |
| Typical use | "Ask the model, act on the answer" | Price feeds, periodic scoring, batch jobs |
| Base contract | `TransientComputeClient` | `ScheduledComputeClient` |

Subscriptions activate lazily and can be cancelled by their owner at any time.

## Payment: compute wallets and billing

Consumers pre-fund a **compute wallet** (created via the WalletFactory) and point their
subscriptions at it. On every valid delivery, **Billing** transfers the subscription's
`feeAmount` in `feeToken` from that wallet to the delivering agent. Redundancy `N` means `N`
agents each deliver and each get paid — you are buying independent answers.

Budget rule of thumb: `feeAmount × redundancy × executions`, plus any protocol fee.

## Verification: trust is a dial

- **Baseline** — a single agent's answer (`redundancy = 1`, no verifier): cheapest and fastest.
- **Redundancy** — several independent agents deliver the same interval; compare answers
  in your callback.
- **Verifier contracts** — a subscription can name an on-chain verifier (the `IVerifier`
  interface). Deliveries then carry a proof and only count once the verifier accepts it.
  Available verifiers are listed per network in the
  [community registry](./registry-and-deployments.md).

## NoosphereVRF

The same agent network serves **NoosphereVRF** — epoch-based verifiable randomness that
contracts can consume on both networks (addresses in
[Registry & deployments](./registry-and-deployments.md)). Agent operators opt in by running the
registry's `noosphere-vrng` container and enabling the `vrf` config block.
