---
title: API Reference
description: HPP Router Consumer API — OpenAI-compatible endpoints, schemas, and authentication.
---

# API Reference

HPP Router's request and response schemas are **OpenAI-compatible**, with HPP-specific extensions for smart routing headers and wallet payments (on-chain USDC.e). At a high level, you use the same patterns as the OpenAI Chat API — point your client at `https://router.hpp.io` and authenticate with your API key.

## OpenAPI Specification

The complete Consumer API is documented using **OpenAPI 3.1**. The spec is the single source of truth for request/response shapes and auth schemes:

| Format | Location |
| --- | --- |
| **OpenAPI YAML** | [`consumer-v1.yaml`](./consumer-v1.yaml) |

Import the spec into [Swagger UI](https://swagger.io/tools/swagger-ui/), [Postman](https://www.postman.com/), or an OpenAPI code generator to explore endpoints or produce client stubs.

For live requests, use the [Router Playground](https://router.hpp.io/playground/) or follow the [Quickstart](../quickstart) — streaming and image responses are easier to test there than in a static reference page.

## Base URL & auth

- **Base URL:** `https://router.hpp.io`
- **Auth:** `apikey` header **or** `Authorization: Bearer <key>` for billed endpoints. `GET /llm/v1/models` does not require a key.
  - For x402 wallet payments, keep the API key and also set `X-Payment-Rail: wallet`. Sign and retry with `PAYMENT-SIGNATURE` / `X-PAYMENT` after a `402`. See [Authentication](../authentication).
- **Version:** Consumer API `0.1.0`.

## Endpoints

| Method | Path | Summary |
| --- | --- | --- |
| `POST` | `/llm/v1/chat/completions` | [Create a chat completion](#post-llmv1chatcompletions) |
| `GET` | `/llm/v1/models` | [List available models](#get-llmv1models) |
| `POST` | `/v1/images/generations` | [Generate images](#post-v1imagesgenerations) |
| `GET` | `/api/usage` | [Get current consumer usage](#get-apiusage) |
| `GET` | `/api/quota-check` | [Check prepaid quota](#get-apiquota-check) |
| `GET` | `/api/audit` | [List usage logs](#get-apiaudit) |
| `GET` | `/api/logs/:logId/verify` | [Verify an on-chain audit anchor](#get-apilogslogidverify) |

---

## `POST /llm/v1/chat/completions`

OpenAI-compatible chat completion endpoint with HPP smart-routing headers.

**Request body** (`ChatCompletionRequest`):

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `model` | string | ✅ | e.g. `hpprouter/auto`, `openai/gpt-5`, `anthropic/claude-sonnet-4`, `moonshotai/kimi-k2.6`, `ollama/gpt-oss:120b`, `ollama/solidity-master:2`. |
| `messages` | `ChatMessage[]` | ✅ | Each has `role` (`system`/`user`/`assistant`/`tool`) and `content` (string or content parts). |
| `stream` | boolean | | Stream as SSE. |
| `max_tokens` | integer (≥1) | | |
| `max_completion_tokens` | integer (≥1) | | |
| `temperature` | number | | |
| `top_p` | number | | |
| `stream_options` | object | | Forwarded for Anthropic, Moonshot, Ollama, and `gpt-image-*`. Dropped for OpenAI text models. |
| `tools` | array | | |
| `tool_choice` | string or object | | |

Callers always use this path. OpenAI text models (`openai/*` except `gpt-image-*`) are translated inside the gateway to OpenAI `/v1/responses` and mapped back to a chat completion. On that path the forwarded fields are `messages` (text, `image_url`, and tool calls), `stream`, `max_tokens` / `max_completion_tokens` (sent as `max_output_tokens`), `temperature`, `top_p`, `tools`, and `tool_choice`. Fields such as `response_format` and `stream_options` are not sent upstream. `gpt-image-*`, Anthropic, Moonshot, and Ollama keep the chat body.

**Authentication:** Required for quota and keyed wallet. Use `apikey` or `Authorization: Bearer <key>`. The [Agent (keyless)](../guides/x402-agent) path omits the key.

For x402 wallet payments, append the `X-Payment-Rail: wallet` header and sign payments using the x402 protocol.

**Responses:**

- `200` — `ChatCompletionResponse` (`application/json`) or an SSE stream (`text/event-stream`). Response headers include `X-HPP-Router-Resolved-Model`, `X-HPP-Router-Basket`, `X-HPP-Router-Rule-Id`, `X-HPP-Router-Rules-Version`, and `X-HPP-Router-Tier`.
- `401` — Authentication required.
- `402` — Payment required (for wallet rail). Response includes `PAYMENT-REQUIRED` header with payment specifications.
- `429`, `500` — error envelope.

See [Chat Completions](../guides/chat-completions) and [Smart Routing](../smart-routing).

---

## `GET /llm/v1/models`

Lists available models (OpenAI-compatible). **Authentication is optional** — Kong serves this route without `key-auth`.

Each `Model` includes `id`, `object` (`"model"`), `owned_by`, optional catalog fields (`name`, `description`, `context`, `max_output`, `tool`, `structured`, `knowledge_cutoff`, `input_modalities`, `output_modalities`), and an optional `pricing` object.

`pricing.input` / `pricing.output` / `pricing.cache_write` / `pricing.cache_read` are **USD per token** (may be `null`). For `hpprouter/auto`, `pricing` is `null` — billing uses the resolved model.

**Responses:** `200` — `ModelListResponse`; `500` — error envelope.

See [Models & Pricing](../models-and-pricing).

---

## `POST /v1/images/generations`

OpenAI-compatible image generation. `model` defaults to `gpt-image-1`. Other enabled `gpt-image-*` ids from `GET /llm/v1/models` are accepted. `n` is 1–10.

**Request body** (`ImageGenerationRequest`):

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `prompt` | string | ✅ | — |
| `model` | string | | `gpt-image-1` |
| `n` | integer (1–10) | | `1` |
| `size` | `1024x1024` / `1024x1536` / `1536x1024` | | `1024x1024` |
| `quality` | `low` / `medium` / `high` / `auto` | | `auto` |
| `background` | string | | — |
| `output_format` | string | | — |

**Responses:** `200` — `ImageGenerationResponse` (`data[]` with `b64_json`/`url`, plus `usage`); `400`, `401`, `402` (wallet or Agent), `429`, `500` — error envelope.

See [Image Generation](../guides/image-generation).

---

## `GET /api/usage`

Usage summary for the authenticated consumer.

**Query params:**
- `rail` — optional filter: `wallet` or `quota`. When `rail=wallet`, response includes settlement fields and scopes request/token/cost stats to the wallet rail.

**Response `200`** (`UsageResponse`): always `consumer_id`, `username`, `custom_id`, `quota`, `used`, `remaining`, `requests`, `total_tokens`, `total_cost`. With `?rail=wallet`, also `rail`, `spent_usdc_micro`, `settle_success_count`, `settle_failed_count`.

**Errors:** `401`, `404`, `500`.

See [Usage & Settlement](../guides/usage-and-settlement).

---

## `GET /api/quota-check`

Prepaid quota availability for the authenticated consumer (credit/quota rail). This is separate from on-chain wallet settlement.

**Response `200`** (`QuotaCheckResponse`): `has_quota`, `quota`, `used`, `remaining`.

**Errors:** `401`, `503` (fail-closed when quota state cannot be verified), `500`.

See [Usage & Settlement](../guides/usage-and-settlement#check-quota).

---

## `GET /api/audit`

Usage log rows for the API key, newest first. This is the consumer audit list. The portal route `GET /api/user/audit/:logId` uses a Privy session and is not part of this API-key contract.

**Query params:**
- `limit` — 1–500, default 100
- `offset` — default 0
- `rail` — optional `wallet` or `quota`

**Response `200`:** a JSON array. Each row includes `id`, `consumer_id`, `provider`, `model`, `displayName`, token counts, `cost`, `status`, `blockchain_tx_hash`, `payment_rail`, `settle_status`, `settle_amount_micro`, and `created_at` (Unix milliseconds).

**Errors:** `401`, `500`.

## `GET /api/logs/:logId/verify`

Checks the Merkle anchor for a log id from `GET /api/audit`. Requires an API key. When blockchain audit is off, the response is **503**.

**Response `200`:** `{ "valid": true, "txHash": "0x...", "batchId": 1, "blockNumber": 1 }` or `{ "valid": false, "reason": "Log not yet recorded to blockchain" }`.

**Errors:** `401`, `503`, `500`.

See [Usage & Settlement](../guides/usage-and-settlement#request-logs).

---

## Error envelope

Errors use one of two shapes (`ErrorEnvelope`):

```json showLineNumbers
{ "error": "string", "message": "string" }
```

```json showLineNumbers
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

See [Errors](../guides/errors) for handling guidance.

## Security schemes

| Scheme | Type | Where |
| --- | --- | --- |
| `ApiKeyAuth` | apiKey | header `apikey` |
| `BearerAuth` | http bearer | header `Authorization: Bearer <key>` |
