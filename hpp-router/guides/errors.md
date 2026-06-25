---
title: Errors
description: HTTP status codes and the error envelope returned by HPP Router.
---

# Errors

HPP Router returns standard HTTP status codes and a JSON error envelope. Handle these in your client to distinguish auth, quota, and upstream failures.

## Status codes

| Code | Meaning | Typical cause |
| --- | --- | --- |
| `400` | Bad Request | Malformed body, or an unroutable/unsupported model. |
| `401` | Unauthorized | Missing or invalid API key. See [Authentication](../authentication.md). |
| `429` | Too Many Requests / Quota Exceeded | Rate limit hit, or insufficient [quota](./quota-and-usage.md). |
| `500` | Internal Server Error | Unexpected gateway or upstream error. |
| `503` | Service Unavailable | Quota state could not be verified (fail-closed). |

## Error envelope

Errors are returned as JSON. Two shapes are possible.

### Simple form

```json
{
  "error": "unauthorized",
  "message": "Invalid API key"
}
```

### Structured form (upstream/provider errors)

```json
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

When using [`hpprouter/auto`](../smart-routing.md), you may encounter:

| Error | Cause |
| --- | --- |
| `400 smart_routing_failed` | Baskets/tiers/streaming-fallback not configured, or the provider is not allowed. |
| `400 unsupported_model` | The resolved model has no registered pricing. |

## Handling guidance

- **`401`** — fix your API key; do not retry blindly.
- **`429`** — back off and retry; if it's a quota issue, top up via [HPP Hub](https://hub.hpp.io).
- **`5xx`** with `retryable: true` — retry with exponential backoff.
- **`5xx`** with `retryable: false` — surface the error; retrying will not help.
