---
title: OpenAI SDK (drop-in)
description: Use the official OpenAI SDK against HPP Router by changing the base URL and key.
---

# OpenAI SDK (drop-in)

HPP Router is OpenAI-compatible, so you can keep using the official OpenAI SDKs. You only change two things:

1. Point the **base URL** at the HPP Router gateway.
2. Use your **HPP Router API key** instead of an OpenAI key.

The HPP Router chat endpoint lives under `/llm/v1`, so the OpenAI SDK base URL is:

```
https://router.hpp.io/llm/v1
```

## Node.js / TypeScript

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

## Python

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["HPPROUTER_API_KEY"],
    base_url="https://router.hpp.io/llm/v1",
)

completion = client.chat.completions.create(
    model="hpprouter/auto",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(completion.choices[0].message)
```

## How authentication maps

OpenAI SDKs send the key as `Authorization: Bearer <key>`, which HPP Router accepts as its Bearer scheme. See [Authentication](../authentication.md) for both supported schemes.

## What works as-is

- **Chat completions** — `client.chat.completions.create(...)`.
- **Streaming** — pass `stream: true`. See [Streaming](./streaming.md).
- **Model selection** — use any `provider/model` or `hpprouter/auto`.
- **Models list** — `client.models.list()`.

## What's different

- **Smart-routing metadata** (`X-HPP-Router-*`) is returned as response **headers**, which most OpenAI SDK helpers don't surface directly. Read the raw response headers, or use the [TypeScript SDK](../client-sdk/typescript.md), which exposes `meta.resolvedModel`.
- **Image generation** uses the HPP Router endpoint `POST /v1/images/generations` with `gpt-image-1`. See [Image Generation](./image-generation.md).

## When to prefer `@hpprouter/sdk`

The dedicated [TypeScript SDK](../client-sdk/typescript.md) returns smart-routing metadata (resolved model, basket, tier) alongside the response, and provides typed helpers for usage, quota, and images. Use it when you want first-class access to HPP Router-specific features; use the OpenAI SDK when you want a minimal-change drop-in.
