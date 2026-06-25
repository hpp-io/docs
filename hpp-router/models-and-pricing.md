---
title: Models & Pricing
description: Discover available models and understand HPP Router's token-based, prepaid billing.
---

# Models & Pricing

HPP Router exposes models from multiple providers behind one OpenAI-compatible API. Billing is **token-based** and deducted from your prepaid [quota](./guides/quota-and-usage.md).

## Listing models

Use the OpenAI-compatible models endpoint to discover what's available, including the virtual `hpprouter/auto` model:

```bash
curl https://router.hpp.io/llm/v1/models \
  -H "apikey: $HPPROUTER_API_KEY"
```

The response is an OpenAI-style list. Each model may include a `pricing` object:

```json
{
  "object": "list",
  "data": [
    {
      "id": "openai/gpt-5",
      "object": "model",
      "owned_by": "openai",
      "pricing": {
        "input": 1.25,
        "output": 10,
        "cache_write": null,
        "cache_read": null
      }
    }
  ]
}
```

| Field | Meaning |
| --- | --- |
| `id` | Model identifier — use this as the request `model`. |
| `owned_by` | Provider that owns the model. |
| `pricing.input` | Price per 1M input tokens (USD). |
| `pricing.output` | Price per 1M output tokens (USD). |
| `pricing.cache_write` / `cache_read` | Cache pricing per 1M tokens, when applicable (may be `null`). |

:::note
The models list is the source of truth for what is currently enabled. The examples below are illustrative pricing taken from the gateway documentation and may change.
:::

## Model identifiers

Specify a model as **`provider/model`**, or use the virtual smart-routing model:

| Example `model` | Description |
| --- | --- |
| `hpprouter/auto` | [Smart routing](./smart-routing.md) — the gateway resolves an actual model per request. |
| `openai/gpt-5` | OpenAI GPT-5. |
| `openai/gpt-4o` | OpenAI GPT-4o (vision-capable). |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4. |
| `moonshotai/kimi-k2.6` | Moonshot Kimi. |
| `ollama/gpt-oss:120b` | Local Ollama model (billed at $0). |

## How billing works

- Pricing is **per million tokens**, split into **input** (prompt) and **output** (completion) rates.
- Cost for a request ≈ `(prompt_tokens × input_rate + completion_tokens × output_rate) / 1,000,000`.
- The `usage` block in each response reports the token counts used for billing.
- Local models (e.g. `ollama/*`) are tracked at **$0 cost**, but token usage is still logged.

### Example rates

| Model | Input (per 1M) | Output (per 1M) |
| --- | --- | --- |
| `openai/gpt-5` | $1.25 | $10 |
| `gpt-image-1` (image generation) | $10 | $40 |

See [Image Generation](./guides/image-generation.md) for how image quality affects output-token usage.

## Billing with smart routing

When you request `hpprouter/auto`, billing uses the **resolved** model's pricing — not a price for `auto` itself. The resolved model is returned in the `X-HPP-Router-Resolved-Model` response header and recorded in your usage logs. See [Smart Routing](./smart-routing.md) for details.

## Checking your quota and usage

- `GET /api/quota-check` — remaining quota for the authenticated consumer.
- `GET /api/usage` — usage summary (requests, total tokens, total cost, remaining quota).

See [Quota & Usage](./guides/quota-and-usage.md).
