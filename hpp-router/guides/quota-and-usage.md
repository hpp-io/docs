---
title: Quota & Usage
description: Check remaining quota and review usage with HPP Router's prepaid quota model.
---

# Quota & Usage

HPP Router uses a **prepaid quota** model: each consumer has a dollar-denominated quota, and every request is checked against the remaining balance *before* it reaches a provider. Token usage is then metered and deducted.

## Quota model

| Term | Meaning |
| --- | --- |
| `quota` | Total dollar allowance for the consumer. |
| `used` | Dollars already accrued from usage. |
| `remaining` | `quota − used` — headroom before the cap. |
| `has_quota` | `true` when `remaining > 0`. |

When a request arrives, the gateway verifies the consumer has quota. If not, the request is rejected with **`429`** before any provider is called (fail-fast). See [Errors](./errors.md).

## Check quota

A lightweight pre-flight check for the authenticated consumer:

```bash
curl https://router.hpp.io/api/quota-check \
  -H "apikey: $HPPROUTER_API_KEY"
```

```json
{
  "has_quota": true,
  "quota": 100,
  "used": 12.5,
  "remaining": 87.5
}
```

If the quota state cannot be verified (e.g. a backend datastore is unavailable), the endpoint may return **`503`**. The quota policy is **fail-closed**: when state cannot be trusted, requests are denied rather than allowed, to protect billing correctness.

## Usage summary

A fuller summary of consumption for the authenticated consumer:

```bash
curl https://router.hpp.io/api/usage \
  -H "apikey: $HPPROUTER_API_KEY"
```

```json
{
  "consumer_id": "....",
  "username": "alice",
  "custom_id": "user-001",
  "quota": 100,
  "used": 12.5,
  "remaining": 87.5,
  "requests": 42,
  "total_tokens": 18500,
  "total_cost": 12.5
}
```

| Field | Meaning |
| --- | --- |
| `consumer_id` | The authenticated consumer's id. |
| `username` / `custom_id` | Optional identifiers (may be `null`). |
| `quota` / `used` / `remaining` | The quota balance (see above). |
| `requests` | Number of requests recorded. |
| `total_tokens` | Total tokens consumed. |
| `total_cost` | Total dollar cost accrued. |

## How usage is metered

1. The response from the provider is captured asynchronously (no added latency).
2. Token usage is extracted from the response `usage` block.
3. Cost is computed from the [resolved model's pricing](../models-and-pricing.md).
4. The consumer's `used` value is updated and the request is logged.

For `hpprouter/auto`, cost uses the **resolved** model's pricing, not a price for `auto`. See [Smart Routing](../smart-routing.md).

## Performance note

The quota-check path is backed by a short-lived in-memory cache to reduce database load under bursts of traffic, with concurrent lookups for the same consumer collapsed into a single read. Cached values are kept fresh for a few seconds and invalidated immediately when an admin changes a consumer's quota, so the figures you read stay accurate.

## Local models

Requests to local models (e.g. `ollama/*`) are tracked at **$0 cost**, but token usage is still recorded in your usage logs.
