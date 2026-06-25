---
title: HPP Router
slug: /
description: What HPP Router is, how requests flow through the gateway, and where to go next.
---

# HPP Router

**HPP Router** is an OpenAI-compatible LLM API gateway for the HPP ecosystem. It sends each request to the right model across providers, enforces a prepaid quota per consumer, and tracks usage — all behind a single API key and a single base URL.

```
https://router.hpp.io
```

## Why HPP Router

- **One API, many models.** Call OpenAI, Anthropic, Moonshot, or local Ollama models through one OpenAI-compatible endpoint. Switch models by changing a single `model` string.
- **Smart routing.** Use the virtual model [`hpprouter/auto`](./smart-routing.md) and let the gateway pick a cost-appropriate model per request based on configurable rules.
- **Prepaid quota & usage tracking.** Every request is checked against the consumer's remaining quota before it reaches a provider, and token usage is metered and billed against the [resolved model's pricing](./models-and-pricing.md).
- **Drop-in compatibility.** Existing OpenAI SDK code works by pointing the base URL at `https://router.hpp.io` and using your HPP Router API key.

## How a request flows

```
Client → Kong Gateway (key-auth, rate-limiting, quota check)
       → llm-router (resolves provider/model, incl. hpprouter/auto)
       → upstream provider (OpenAI / Anthropic / Ollama)
       → response captured for async usage logging
       → PostgreSQL (consumer quotas, usage logs)
```

1. A request arrives with your API key.
2. The gateway authenticates the consumer and applies rate limits.
3. The quota layer verifies the consumer still has available quota (fail-fast otherwise).
4. The router resolves the target `provider/model` — or, for `hpprouter/auto`, classifies the request and picks a model from rules.
5. The upstream provider is called and the response is returned to you.
6. Token usage is extracted asynchronously (no added latency) and deducted from the consumer's quota.

## Where HPP Router fits in the HPP ecosystem

HPP Router is the **model router** layer of the HPP stack — an AI-native L2 built for agents. It routes inference requests across the network (including HPP Coder), and API keys are issued through **[HPP Hub](https://hub.hpp.io)** (see also the [HPP Hub guide](/hub)).

## Next steps

- **[Quickstart](./quickstart.md)** — make your first request via REST, the TypeScript SDK, or the OpenAI SDK.
- **[Authentication](./authentication.md)** — how to send your API key.
- **[Models & Pricing](./models-and-pricing.md)** — list models and understand token-based billing.
- **[Smart Routing](./smart-routing.md)** — how `hpprouter/auto` chooses a model.
- **[API Reference](./api-reference/consumer-api.md)** — the full Consumer API contract.
