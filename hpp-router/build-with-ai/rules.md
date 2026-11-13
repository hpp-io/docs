---
title: Rules for agents
description: Base URL, model ids, auth, image path, and x402 rules a coding agent must follow for HPP Router.
---

# Rules for agents

These rules are the ones coding agents miss when they treat HPP Router as the public OpenAI API. The human guides linked here are the source. If this page and a guide disagree, follow the guide.

## Base URL

| Client | base URL | Chat path |
| --- | --- | --- |
| OpenAI SDK (`openai` npm / PyPI) | `https://router.hpp.io/llm/v1` | SDK appends `/chat/completions` |
| `@hpprouter/sdk` | `https://router.hpp.io` | `client.chat.send` |
| curl and other HTTP clients | `https://router.hpp.io` | `POST /llm/v1/chat/completions` |

Do not send chat completions to `https://api.openai.com` or to `https://router.hpp.io/v1/chat/completions`.

See [Quickstart](../quickstart) and [OpenAI SDK](../guides/openai-sdk).

## Model id

Send `hpprouter/auto`, or a `provider/model` id returned by `GET /llm/v1/models` (for example `openai/gpt-5`). `hpprouter/auto` is resolved per request. The billed model is the `X-HPP-Router-Resolved-Model` response header. `@hpprouter/sdk` also exposes it as `meta.resolvedModel`.

See [Smart Routing](../smart-routing) and [Models & Pricing](../models-and-pricing).

## Authentication

Quota and keyed wallet calls need an API key from the [HPP Router portal](https://router.hpp.io) or [HPP Hub](https://hub.hpp.io). Examples use the `HPPROUTER_API_KEY` environment variable.

- `apikey: <key>`
- `Authorization: Bearer <key>` — this is what the OpenAI SDK sends

Keep the key on a server. `GET /llm/v1/models` does not require a key.

See [Authentication](../authentication).

## Images

Pictures are `POST https://router.hpp.io/v1/images/generations`, not a path under `/llm/v1`. `model` defaults to `gpt-image-1`. Other enabled `gpt-image-*` ids from the models list are accepted.

An OpenAI SDK client whose `baseURL` is `https://router.hpp.io/llm/v1` will post images to the wrong path. Use a client aimed at `https://router.hpp.io/v1`, or call the URL directly.

Chat requests that *read* an image stay on `/llm/v1/chat/completions`. See [Image Generation](../guides/image-generation) and [Vision](../guides/vision-multimodal).

## Payment rail

The default rail is prepaid **quota**: send the API key and omit `X-Payment-Rail`.

Keyed x402 **wallet** adds `X-Payment-Rail: wallet`. A paid model answers **402** with `PAYMENT-REQUIRED` until the client signs and retries once with `PAYMENT-SIGNATURE` (also accepted as `X-PAYMENT`). The OpenAI SDK throws on 402 and does not run that loop. Prefer `@hpprouter/sdk` with `paymentRail: 'wallet'` and `paymentSigner`.

**Agent (keyless)** is a different caller: no API key, documented in [x402 Agent](../guides/x402-agent). Do not drop the API key on a quota integration to "make it an agent."

**402** is the payment challenge. **429** is rate limit or quota exhaustion.

## OpenAI text models

Callers still post a chat completion. The gateway translates `openai/*` text models (everything except `gpt-image-*`) to the OpenAI Responses API and maps the result back. On that path `response_format` and `stream_options` are not forwarded. Anthropic, Moonshot, Ollama, and `gpt-image-*` on the chat endpoint keep the chat body.

See [Chat Completions](../guides/chat-completions#request-fields).
