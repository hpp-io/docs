---
title: Consumer API
description: The HPP Router Consumer API contract — endpoints, request/response schemas, and authentication.
---

# Consumer API

The **single source of truth** for the HPP Router Consumer API is the OpenAPI specification:

- [`consumer-v1.yaml`](./consumer-v1.yaml)

:::info OpenAPI rendering
This page summarizes the contract in Markdown. The bundled [`consumer-v1.yaml`](./consumer-v1.yaml) can later be wired into an interactive "try-it" reference (e.g. OpenAPI/Scalar plugin) if needed.
:::

- **Base URL:** `https://router.hpp.io`
- **Auth:** `apikey` header **or** `Authorization: Bearer <key>`. See [Authentication](../authentication.md).
- **Version:** Consumer API `0.1.0`.

## Endpoints

| Method | Path | Summary |
| --- | --- | --- |
| `POST` | `/llm/v1/chat/completions` | [Create a chat completion](#post-llmv1chatcompletions) |
| `GET` | `/llm/v1/models` | [List available models](#get-llmv1models) |
| `POST` | `/v1/images/generations` | [Generate images](#post-v1imagesgenerations) |
| `GET` | `/api/usage` | [Get current consumer usage](#get-apiusage) |
| `GET` | `/api/quota-check` | [Check current consumer quota](#get-apiquota-check) |

---

## `POST /llm/v1/chat/completions`

OpenAI-compatible chat completion endpoint with HPP smart-routing headers.

**Request body** (`ChatCompletionRequest`):

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `model` | string | ✅ | e.g. `hpprouter/auto`, `openai/gpt-5`, `anthropic/claude-sonnet-4`, `moonshotai/kimi-k2.6`, `ollama/gpt-oss:120b`. |
| `messages` | `ChatMessage[]` | ✅ | Each has `role` (`system`/`user`/`assistant`/`tool`) and `content` (string or content parts). |
| `stream` | boolean | | Stream as SSE. |
| `max_tokens` | integer (≥1) | | |
| `max_completion_tokens` | integer (≥1) | | |
| `temperature` | number | | |
| `stream_options` | object | | |

Additional properties are allowed and passed through.

**Responses:**

- `200` — `ChatCompletionResponse` (`application/json`) or an SSE stream (`text/event-stream`). Response headers include `X-HPP-Router-Resolved-Model`, `X-HPP-Router-Basket`, `X-HPP-Router-Rule-Id`, `X-HPP-Router-Rules-Version`, and `X-HPP-Router-Tier`.
- `400`, `401`, `429`, `500` — error envelope.

See [Chat Completions](../guides/chat-completions.md) and [Smart Routing](../smart-routing.md).

---

## `GET /llm/v1/models`

Lists available models (OpenAI-compatible). Each `Model` has `id`, `object` (`"model"`), `owned_by`, and an optional `pricing` object (`input`, `output`, `cache_write`, `cache_read`).

**Responses:** `200` — `ModelListResponse`; `401`, `500` — error envelope.

See [Models & Pricing](../models-and-pricing.md).

---

## `POST /v1/images/generations`

OpenAI-compatible image generation for `gpt-image-1`.

**Request body** (`ImageGenerationRequest`):

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `prompt` | string | ✅ | — |
| `model` | string | | `gpt-image-1` |
| `n` | integer (1–4) | | `1` |
| `size` | `1024x1024` / `1024x1536` / `1536x1024` | | `1024x1024` |
| `quality` | `low` / `medium` / `high` / `auto` | | `auto` |
| `background` | string | | — |
| `output_format` | string | | — |

**Responses:** `200` — `ImageGenerationResponse` (`data[]` with `b64_json`/`url`, plus `usage`); `400`, `401`, `429`, `500` — error envelope.

See [Image Generation](../guides/image-generation.md).

---

## `GET /api/usage`

Usage and quota summary for the authenticated consumer.

**Response `200`** (`UsageResponse`): `consumer_id`, `username`, `custom_id`, `quota`, `used`, `remaining`, `requests`, `total_tokens`, `total_cost`.

**Errors:** `401`, `404`, `500`.

---

## `GET /api/quota-check`

Quota availability for the authenticated consumer.

**Response `200`** (`QuotaCheckResponse`): `has_quota`, `quota`, `used`, `remaining`.

**Errors:** `401`, `503`, `500`.

See [Quota & Usage](../guides/quota-and-usage.md).

---

## Error envelope

Errors use one of two shapes (`ErrorEnvelope`):

```json
{ "error": "string", "message": "string" }
```

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "code": "string",
    "provider": "string",
    "upstream_status": 0,
    "retryable": true
  }
}
```

See [Errors](../guides/errors.md) for handling guidance.

## Security schemes

| Scheme | Type | Where |
| --- | --- | --- |
| `ApiKeyAuth` | apiKey | header `apikey` |
| `BearerAuth` | http bearer | header `Authorization: Bearer <key>` |
