# HPP Router documentation

Developer documentation for **HPP Router**, served at [docs.hpp.io/hpp-router](https://docs.hpp.io/hpp-router).

This is a standalone Docusaurus docs plugin (same pattern as [HPP Hub](/hub)). Content lives in this folder; the sidebar is defined in [`sidebarsRouter.ts`](../sidebarsRouter.ts) at the repo root.

## Structure

```
hpp-router/
├── intro.md                    # Landing page (slug: /) → /hpp-router
├── quickstart.mdx
├── authentication.md
├── models-and-pricing.md
├── smart-routing.md
├── guides/                     # Task-focused guides
├── api-reference/
│   ├── consumer-api.md
│   └── consumer-v1.yaml        # OpenAPI spec (sync with hpp-router repo)
└── client-sdk/
    └── typescript.md
```

## Source of truth

Content is grounded in the [`hpp-router`](https://github.com/hpp-io/hpp-router) repository. When the gateway changes, update the corresponding page here and re-copy `consumer-v1.yaml` from `hpp-router/openapi/consumer-v1.yaml`.

## Follow-ups

- **Portal sign-up & API keys:** docs mention both the [HPP Router portal](https://router.hpp.io) and [HPP Hub](https://hub.hpp.io) for key issuance.
- **`audit` page:** not included yet; add when canonical audit/on-chain content is ready (see [hpp-router issue #93](https://github.com/hpp-io/hpp-router/issues/93)).
