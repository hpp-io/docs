---
title: Authentication
description: How to authenticate requests to HPP Router with an API key or Bearer token.
---

# Authentication

Every request to HPP Router must be authenticated. The gateway uses the API key to identify the **consumer**, enforce per-consumer rate limits, and check the prepaid [quota](./guides/quota-and-usage.md) before forwarding the request to a provider.

## Getting an API key

API keys are issued through **[HPP Hub](https://hub.hpp.io)**, the HPP developer portal. Treat the key like a password: keep it server-side and never commit it to source control.

## Supported schemes

HPP Router accepts two authentication schemes. Use whichever fits your client.

### 1. `apikey` header (recommended)

```bash
curl https://router.hpp.io/llm/v1/models \
  -H "apikey: $HPPROUTER_API_KEY"
```

### 2. Bearer token

```bash
curl https://router.hpp.io/llm/v1/models \
  -H "Authorization: Bearer $HPPROUTER_API_KEY"
```

The Bearer scheme is what most OpenAI-compatible SDKs send by default, which is why the [OpenAI SDK](./guides/openai-sdk.md) works as a drop-in: set the SDK's `apiKey` to your HPP Router key and it sends `Authorization: Bearer ...`.

## Which endpoints require auth

All consumer endpoints are authenticated:

| Endpoint | Purpose |
| --- | --- |
| `POST /llm/v1/chat/completions` | [Chat completions](./guides/chat-completions.md) |
| `GET /llm/v1/models` | [List models](./models-and-pricing.md) |
| `POST /v1/images/generations` | [Image generation](./guides/image-generation.md) |
| `GET /api/usage` | [Usage summary](./guides/quota-and-usage.md) |
| `GET /api/quota-check` | [Quota check](./guides/quota-and-usage.md) |

## Errors

A missing or invalid key returns **`401`**. See [Errors](./guides/errors.md) for the full list of status codes and the error envelope shape.

```json
{ "error": "unauthorized", "message": "Invalid API key" }
```

## Security tips

- Store the key in an environment variable or secret manager, never in client-side code.
- Rotate keys through HPP Hub if a key may have been exposed.
- Prefer calling HPP Router from your backend so the key is never shipped to browsers or mobile apps.
