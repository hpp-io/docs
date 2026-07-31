---
title: Errors
description: HTTP status codes and the error envelope returned by HPP Router.
---

# Errors

HPP Router returns standard HTTP status codes and a JSON error envelope. Handle these in your client to distinguish auth, payment, quota, and upstream failures.

## Status codes

| Code | Meaning | Typical cause |
| --- | --- | --- |
| `400` | Bad Request | Malformed body, or an unroutable/unsupported model. |
| `401` | Unauthorized | Missing or invalid API key. See [Authentication](../authentication). |
| `402` | Payment Required | Wallet rail (`X-Payment-Rail: wallet`) needs an x402 signature. Response includes a `PAYMENT-REQUIRED` header (and usually a JSON body with `accepts`). Sign and retry with `PAYMENT-SIGNATURE` (or `X-PAYMENT`). See [Authentication — x402 Wallet](../authentication#x402-wallet). |
| `429` | Too Many Requests / Quota exhausted | Rate limit hit, or prepaid **quota** insufficient. This is not the normal wallet-rail payment challenge (that is `402`). |
| `500` | Internal Server Error | Unexpected gateway or upstream error. |
| `503` | Service Unavailable | Wallet rail / facilitator not configured, or settlement could not proceed (fail-closed). |

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

### Wallet `402` challenge

On the wallet rail, a missing or unsigned payment typically returns **`402`** with:

- Header `PAYMENT-REQUIRED`: base64-encoded JSON challenge
- Body: `{ "x402Version": 2, "accepts": [ { "scheme": "upto", "asset", "amount", "payTo", "network", ... } ], ... }`

Retry the **same** request once with:

- `X-Payment-Rail: wallet`
- `PAYMENT-SIGNATURE: <base64 payload>` (the gateway also accepts `X-PAYMENT`)

[`@hpprouter/sdk`](../client-sdk/typescript#wallet-x402-payment-rail) runs this loop automatically when you pass `paymentRail: 'wallet'` and a `paymentSigner`.

## Smart-routing errors

When using [`hpprouter/auto`](../smart-routing), you may encounter:

| Error | Cause |
| --- | --- |
| `400 smart_routing_failed` | Baskets/tiers/streaming-fallback not configured, or the provider is not allowed. |
| `400 unsupported_model` | The resolved model has no registered pricing. |

## Handling guidance

- **`401`** — fix your API key; do not retry blindly.
- **`402`** — sign the x402 challenge and retry once; ensure the paying wallet holds the payment asset on the challenged network (commonly USDC.e on HPP — see [Networks & token](/x402/networks-and-token)). Prefer `@hpprouter/sdk` over hand-rolling the loop in the OpenAI SDK.
- **`429`** — back off and retry for rate limits; for quota exhaustion, top up prepaid credit or switch to the wallet rail.
- **`5xx`** with `retryable: true` — retry with exponential backoff.
- **`5xx`** with `retryable: false` — surface the error; retrying will not help.
