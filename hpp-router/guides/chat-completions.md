---
title: Chat Completions
description: Send OpenAI-compatible chat completion requests through HPP Router.
---

# Chat Completions

The chat completions endpoint is the core of HPP Router. It is OpenAI-compatible, so request and response shapes match what you already know.

```
POST https://router.hpp.io/llm/v1/chat/completions
```

## Basic request

```bash
curl -X POST https://router.hpp.io/llm/v1/chat/completions \
  -H "apikey: $HPPROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5",
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "Hello!" }
    ],
    "max_completion_tokens": 100
  }'
```

## Request fields

| Field | Type | Notes |
| --- | --- | --- |
| `model` | string | **Required.** `provider/model` (e.g. `openai/gpt-5`) or `hpprouter/auto`. |
| `messages` | array | **Required.** Chat messages with `role` and `content`. |
| `stream` | boolean | Stream tokens as Server-Sent Events. See [Streaming](./streaming.md). |
| `max_tokens` | integer | Maximum tokens to generate. |
| `max_completion_tokens` | integer | Maximum completion tokens (newer OpenAI-style field). |
| `temperature` | number | Sampling temperature. |
| `stream_options` | object | Streaming options passed through to the provider. |

Additional provider-specific fields are passed through to the upstream model.

### Message roles

`role` is one of `system`, `user`, `assistant`, or `tool`. The `content` is either a string or an array of content parts (used for [vision/multimodal](./vision-multimodal.md)).

## Response

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1732700000,
  "model": "openai/gpt-5",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "Hi there!" },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 12,
    "total_tokens": 20
  }
}
```

The `usage` block drives [billing](../models-and-pricing.md). When you use `hpprouter/auto`, check the `X-HPP-Router-Resolved-Model` header to see which model was billed — see [Smart Routing](../smart-routing.md).

## Choosing a model

- Pass an explicit `provider/model` for deterministic routing.
- Pass `hpprouter/auto` to let the gateway pick a cost-appropriate model per request.

## Errors

Requests are checked against your quota before being forwarded. Insufficient quota returns **`429`**; auth failures return **`401`**. See [Errors](./errors.md).
