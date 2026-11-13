---
title: Connect your agent
description: Point Cursor, Claude Code, or Codex at the HPP Router llms.txt index before it writes integration code.
---

# Connect your agent

HPP Router does not ship a docs MCP server or an agent skill package yet. Connecting an agent means giving it the index and the rules, then letting it follow the existing guides.

The index is [https://docs.hpp.io/llms.txt](https://docs.hpp.io/llms.txt). On a local docs server the same file is served at `/llms.txt`.

## Cursor

1. Start from the [prompt](./start). The first lines tell the agent to read `llms.txt`.
2. If the agent can fetch URLs, leave that line as-is.
3. If it cannot fetch, paste the contents of `llms.txt` into the chat before the task. The rules section is what overrides a memorized OpenAI base URL.

`@docs` can also be pointed at `https://docs.hpp.io` when you want the agent to search the published site. Prefer `llms.txt` when you want the HPP Router rules first. This index covers the HPP Router guide only.

## Claude Code and Codex

Ask the agent to fetch `https://docs.hpp.io/llms.txt` and follow **Rules for agents** before editing. Then give it the task in the same words you would use with the [start prompt](./start).

There is no `claude plugin` or `npx skills add` install for HPP Router in this preview.

## Check that it took

The first snippet the agent writes for a quota chat call should match [Quickstart](../quickstart):

- OpenAI SDK `baseURL` is `https://router.hpp.io/llm/v1`.
- `@hpprouter/sdk` `baseURL` is `https://router.hpp.io`.
- `model` is `hpprouter/auto` or a `provider/model` id from [Models & Pricing](../models-and-pricing).

If it calls `https://api.openai.com/v1` or `https://router.hpp.io/v1/chat/completions`, it did not pick up the rules. Point it at [Rules for agents](./rules) and ask it to rewrite that call.
