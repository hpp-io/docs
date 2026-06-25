---
title: Image Generation
description: Generate images with gpt-image-1 through HPP Router's OpenAI-compatible endpoint.
---

# Image Generation

HPP Router supports image generation via OpenAI's `gpt-image-1` model through an OpenAI-compatible endpoint.

```
POST https://router.hpp.io/v1/images/generations
```

## Request

```bash
curl -X POST https://router.hpp.io/v1/images/generations \
  -H "apikey: $HPPROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "A serene mountain landscape at sunset",
    "size": "1024x1024",
    "quality": "auto",
    "n": 1
  }'
```

## Parameters

| Parameter | Values | Default |
| --- | --- | --- |
| `model` | `gpt-image-1` | required |
| `prompt` | string | required |
| `size` | `1024x1024`, `1024x1536`, `1536x1024` | `1024x1024` |
| `quality` | `low`, `medium`, `high`, `auto` | `auto` |
| `n` | 1–4 | 1 |
| `background` | string | — |
| `output_format` | string | — |

## Response

```json
{
  "created": 1732700000,
  "data": [
    { "b64_json": "..." }
  ],
  "usage": {
    "input_tokens": 14,
    "output_tokens": 4160,
    "total_tokens": 4174
  }
}
```

The image is returned as base64 (`b64_json`). The `usage` block reports the token counts used for billing.

## Pricing (token-based)

Image generation is billed per token, like chat:

- **Input:** $10 per 1M tokens ($0.00001 / token)
- **Output:** $40 per 1M tokens ($0.00004 / token)

Higher `quality` settings consume more **output tokens** — for example, `auto` can use roughly 15× the output tokens of `low`. Choose the lowest quality that meets your needs to control cost.

## Quota management

- Requests are checked against your [quota](./quota-and-usage.md) before being forwarded.
- If quota is insufficient, the endpoint returns **`429`** (quota exceeded). See [Errors](./errors.md).
- Usage is tracked automatically and deducted from your quota.
