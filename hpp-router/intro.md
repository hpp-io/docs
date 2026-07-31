---
title: HPP Router
slug: /
description: What HPP Router is, how requests flow through the gateway, and where to go next.
---

# HPP Router

**HPP Router** is an OpenAI-compatible LLM API gateway for the HPP ecosystem. It sends each request to the right model across providers, meters usage, and supports prepaid quota or optional on-chain x402 wallet settlement — all behind a single API key and a single base URL.

```
https://router.hpp.io
```

## Why HPP Router

- **One API, many models.** Call OpenAI, Anthropic, Moonshot, or local Ollama models through one OpenAI-compatible endpoint. Switch models by changing a single `model` string.
- **Smart routing.** Use the virtual model [`hpprouter/auto`](/hpp-router/smart-routing) and let the gateway pick a cost-appropriate model per request based on configurable rules.
- **Flexible billing** — Track usage on the default prepaid **quota** rail, or settle paid models on-chain with the x402 **wallet** rail (`X-Payment-Rail: wallet`). The default payment asset is USDC.e (deployment-specific assets may differ).
- **Drop-in compatibility.** Existing OpenAI SDK code works by pointing the base URL at `https://router.hpp.io` and using your HPP Router API key.

## How a request flows

```
Client → Kong Gateway (key-auth, rate-limiting)
       → llm-router (resolves provider/model, incl. hpprouter/auto)
       → upstream provider (OpenAI / Anthropic / Ollama)
       → response captured for async usage logging
       → PostgreSQL (usage logs, blockchain settlement)
```

1. A request arrives with your API key.
2. The gateway authenticates the consumer and applies rate limits.
3. The router resolves the target `provider/model` — or, for `hpprouter/auto`, classifies the request and picks a model from rules.
4. The upstream provider is called and the response is returned to you. On the wallet rail (`X-Payment-Rail: wallet`), paid models may return **402** until the client signs and retries with a payment signature.
5. Token usage is extracted asynchronously (no added latency) and recorded for billing — prepaid quota updates on the quota rail, or on-chain settlement on the wallet rail.

## Where HPP Router fits in the HPP ecosystem

HPP Router is the **model router** layer of the HPP stack — an AI-native L2 built for agents. It routes inference requests across the network (including HPP Coder). API keys can be issued from the **[HPP Router portal](https://router.hpp.io)** and also through **[HPP Hub](https://hub.hpp.io)** (see also the [HPP Hub guide](/hub)).

## Next steps

- **[Quickstart](/hpp-router/quickstart)** — make your first request via REST, the TypeScript SDK, or the OpenAI SDK.
- **[Authentication](/hpp-router/authentication)** — how to send your API key.
- **[Models & Pricing](/hpp-router/models-and-pricing)** — list models and understand token-based billing.
- **[Smart Routing](/hpp-router/smart-routing)** — how `hpprouter/auto` chooses a model.
- **[API Reference](/hpp-router/api-reference/consumer-api)** — the full Consumer API contract.
