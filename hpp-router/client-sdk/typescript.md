---
title: TypeScript (@hpprouter/sdk)
description: The official TypeScript client SDK for the HPP Router Consumer API.
---

# TypeScript SDK — `@hpprouter/sdk`

`@hpprouter/sdk` is the official TypeScript client for the HPP Router Consumer API. It wraps every consumer endpoint with typed helpers and surfaces HPP Router-specific smart-routing metadata alongside each response.

## Installation

```bash
npm install @hpprouter/sdk
```

```bash
yarn add @hpprouter/sdk
```

```bash
pnpm add @hpprouter/sdk
```

## Creating a client

```ts
import { HppRouter } from '@hpprouter/sdk';

const client = new HppRouter({
  apiKey: process.env.HPPROUTER_API_KEY!,
  baseURL: 'https://router.hpp.io',
});
```

## Chat completions

```ts
const completion = await client.chat.send({
  model: 'hpprouter/auto',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(completion.data.choices);
console.log(completion.meta.resolvedModel); // smart-routing metadata
```

Responses expose two parts:

- `data` — the OpenAI-compatible response body (`choices`, `usage`, …).
- `meta` — HPP Router metadata derived from the `X-HPP-Router-*` headers (e.g. `resolvedModel`).

## Streaming

```ts
const { stream, meta } = await client.chat.stream({
  model: 'openai/gpt-5',
  messages: [{ role: 'user', content: 'Stream a short answer.' }],
});

for await (const event of stream) {
  console.log(event);
}

console.log(meta.resolvedModel);
```

See [Streaming](../guides/streaming.md) for the streaming-fallback behavior of `hpprouter/auto`.

## Models

```ts
const models = await client.models.list();
console.log(models.data.data);
```

## Usage and quota

```ts
const usage = await client.usage.get();
const quota = await client.quota.check();

console.log(usage.data.remaining);
console.log(quota.data.has_quota);
```

See [Quota & Usage](../guides/quota-and-usage.md).

## Image generation

```ts
const image = await client.images.generate({
  model: 'gpt-image-1',
  prompt: 'A serene mountain landscape at sunset',
  size: '1024x1024',
  quality: 'auto',
});

console.log(image.data.data);
```

See [Image Generation](../guides/image-generation.md).

## Choosing between the SDK and the OpenAI SDK

| Use case | Recommended |
| --- | --- |
| First-class smart-routing metadata, typed usage/quota/image helpers | `@hpprouter/sdk` |
| Minimal-change migration of existing OpenAI SDK code | [OpenAI SDK (drop-in)](../guides/openai-sdk.md) |

## Reference

The SDK is generated against the [Consumer API](../api-reference/consumer-api.md) OpenAPI contract.
