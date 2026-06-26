---
title: API Keys
---

# API Keys

The **API Keys** page is where you create keys for **HPP Router** — HPP's AI model
gateway — and browse the models you can call from your own code.

> **Moved here:** API keys used to live on the Wallets page. They now have their own
> **API Keys** menu item, next to a full model and pricing list.

## Create an API key

1. Open **API Keys** from the left sidebar.
2. Select **Create Key** and give it a name.
3. Copy the key and store it somewhere safe.

You can create several keys and revoke any of them at any time. Treat a key like a
password — keep it server-side and never commit it to source control.

> **Note:** API usage and the Playground draw from the same **Credits**. Top up on the
> [Wallets](./wallets) page.

## Browse available models

The page lists every model HPP Router can route to, in two tables:

- **Text models** — chat and code models from providers such as Anthropic (Claude),
  OpenAI (GPT), and Moonshot AI (Kimi), plus free open models. Each shows its input and
  output price per million tokens (MTok).
- **Image models** — image-generation models, priced the same per-use way.

The list and prices shown in the Hub are always current, so check there for the
definitive catalog.

## Make a request

Your key works with any OpenAI-compatible client. Point the base URL at HPP Router and
send the key as a Bearer token:

```bash
curl https://router.hpp.io/llm/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "hpprouter/auto",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

The virtual `hpprouter/auto` model lets HPP Router pick a cost-appropriate model for each
request. To call a specific model, use its full id (for example `anthropic/claude-sonnet-4-6`).

## Full HPP Router guide

API keys are issued for **HPP Router**, HPP's OpenAI-compatible model gateway. For the
complete reference — authentication, streaming, the model catalog and pricing, smart
routing, and SDKs — see the dedicated guide:

- [HPP Router overview](/hpp-router)
- [Quickstart](/hpp-router/quickstart)
- [Authentication](/hpp-router/authentication)
- [Models & Pricing](/hpp-router/models-and-pricing)
