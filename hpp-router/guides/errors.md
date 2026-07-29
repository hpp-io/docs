---
title: Errors
description: HTTP status codes and the error envelope returned by HPP Router.
---

# Errors

HPP Router returns standard HTTP status codes and a JSON error envelope. Handle these in your client to distinguish auth, wallet balance, and upstream failures.

## Status codes

| Code | Meaning | Typical cause |
| --- | --- | --- |
| `400` | Bad Request | Malformed body, or an unroutable/unsupported model. |
| `401` | Unauthorized | Missing or invalid API key. See [Authentication](../authentication). |
| `429` | Too Many Requests / Insufficient Funds | Rate limit hit, or insufficient wallet balance. See [Wallet Payments](../authentication#x402-wallet) for details. |
| `500` | Internal Server Error | Unexpected gateway or upstream error. |
| `503` | Service Unavailable | Wallet settlement could not be verified (fail-closed). |

## Error envelope

Errors are returned as JSON. Two shapes are possible.

### Simple form

```json showLineNumbers
{
  "error": "unauthorized",
  "message": "Invalid API key"
}
```

### Structured form (upstream/provider errors)

```json showLineNumbers
{
  "error": {
    "message": "The model is overloaded.",
    "type": "upstream_error",
    "code": "overloaded",
    "provider": "openai",
    "upstream_status": 503,
    "retryable": true
  }
}
```

| Field | Meaning |
| --- | --- |
| `error.message` | Human-readable description. |
| `error.type` | Error category. |
| `error.code` | Machine-readable code. |
| `error.provider` | Upstream provider, when the error originated there. |
| `error.upstream_status` | The provider's HTTP status, when applicable. |
| `error.retryable` | Whether the request can be safely retried. |

## Smart-routing errors

When using [`hpprouter/auto`](../smart-routing), you may encounter:

| Error | Cause |
| --- | --- |
| `400 smart_routing_failed` | Baskets/tiers/streaming-fallback not configured, or the provider is not allowed. |
| `400 unsupported_model` | The resolved model has no registered pricing. |

## Handling guidance

- **`401`** — fix your API key; do not retry blindly.
- **`429`** — back off and retry; if it's an insufficient funds issue, bridge or top up **USDC.e** on HPP (see [Networks & token](/x402/networks-and-token) and the [Bridge guide](/community/bridge)).
- **`5xx`** with `retryable: true` — retry with exponential backoff.
- **`5xx`** with `retryable: false` — surface the error; retrying will not help.
