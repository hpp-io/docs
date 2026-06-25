---
title: Quickstart
description: Make your first HPP Router request three ways — REST, the TypeScript SDK, or the OpenAI SDK.
---

# Quickstart

This guide shows the same chat completion request three ways. Pick whichever fits your stack — all of them hit the same OpenAI-compatible gateway at `https://router.hpp.io`.

## Prerequisites

- An **HPP Router API key**. Issue one through [HPP Hub](https://hub.hpp.io).
- The base URL: `https://router.hpp.io`.

Store your key in an environment variable so it never lands in source control:

```bash
export HPPROUTER_API_KEY="your-api-key"
```

## 1. REST (curl)

```bash
curl -X POST https://router.hpp.io/llm/v1/chat/completions \
  -H "apikey: $HPPROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "hpprouter/auto",
    "messages": [
      { "role": "user", "content": "Hello!" }
    ],
    "max_completion_tokens": 100
  }'
```

A successful response includes `choices` and a `usage` block:

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "openai/gpt-4o-mini",
  "choices": [ { "message": { "role": "assistant", "content": "Hi there!" } } ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 12,
    "total_tokens": 20
  }
}
```

When you use `hpprouter/auto`, the model that was actually billed is returned in the `X-HPP-Router-Resolved-Model` response header. See [Smart Routing](./smart-routing.md).

## 2. TypeScript SDK (`@hpprouter/sdk`)

Install the SDK:

```bash
npm install @hpprouter/sdk
```

```ts
import { HppRouter } from '@hpprouter/sdk';

const client = new HppRouter({
  apiKey: process.env.HPPROUTER_API_KEY!,
  baseURL: 'https://router.hpp.io',
});

const completion = await client.chat.send({
  model: 'hpprouter/auto',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(completion.data.choices);
console.log(completion.meta.resolvedModel);
```

See the [Client SDK](./client-sdk/typescript.md) reference for streaming, models, usage, quota, and image generation helpers.

## 3. OpenAI SDK (drop-in)

HPP Router is OpenAI-compatible, so the official OpenAI SDK works by pointing `baseURL` at the gateway and sending your HPP Router key.

```ts
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.HPPROUTER_API_KEY!,
  baseURL: 'https://router.hpp.io/llm/v1',
});

const completion = await client.chat.completions.create({
  model: 'hpprouter/auto',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(completion.choices[0].message);
```

For details on authenticating the OpenAI SDK against HPP Router, see [OpenAI SDK (drop-in)](./guides/openai-sdk.md).

## Next steps

- [Authentication](./authentication.md) — API key vs. Bearer token.
- [Models & Pricing](./models-and-pricing.md) — discover available models.
- [Guides](./guides/chat-completions.md) — chat, streaming, vision, images, quota, and errors.
