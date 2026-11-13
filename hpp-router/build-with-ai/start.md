---
title: Start here
description: Copy one prompt so a coding agent calls HPP Router with the current base URL, model id, and payment rail.
---

# Start here

Use this when Cursor, Claude Code, Codex, or another coding agent is writing the integration. The prompt points the agent at [llms.txt](https://docs.hpp.io/llms.txt) and the [rules](./rules) already published in these docs.

Paste it as the first message, then describe the app you want. For a quota-rail chat call, that is enough. Say so in the same message if you need images or x402 wallet settlement.

```text
Help me call HPP Router.

Read https://docs.hpp.io/llms.txt and follow Rules for agents
before writing code.

Default to the prepaid quota rail:
- OpenAI SDK: baseURL https://router.hpp.io/llm/v1,
  apiKey from HPPROUTER_API_KEY, model hpprouter/auto
- @hpprouter/sdk: baseURL https://router.hpp.io,
  same key and model
- Chat: POST https://router.hpp.io/llm/v1/chat/completions
- Auth: Authorization: Bearer, or the apikey header

Images: POST https://router.hpp.io/v1/images/generations
with a gpt-image-* model (default gpt-image-1).
Do not send image generation to the chat base URL.

x402 wallet settlement: @hpprouter/sdk with
paymentRail "wallet" and paymentSigner.
The OpenAI SDK does not complete the HTTP 402 loop.

Keep the API key on the server.
Do not put it in browser or mobile code.
```

## What the agent should open next

- [Connect your agent](./connect) — where to point the tool if it can fetch a URL.
- [Rules for agents](./rules) — the short list behind the prompt.
- [Quickstart](../quickstart) — the same first call, written for a person.
