---
title: Container contract
sidebar_label: Container contract
description: The one-endpoint interface every Noosphere container implements — POST /computation in, { output } out.
---

# Container contract

Everything an agent runs for the compute network is an ordinary Docker image that implements
**one endpoint**:

```
POST /computation
Content-Type: application/json

{ "input": "<raw input>", ...extra fields }
```

→ responds

```json
{ "output": "<string result>" }
```

That's the whole interface. The agent starts your container, forwards the request inputs to
`localhost:<port>/computation`, and delivers `output` on-chain as the subscription result.

## Rules of thumb

- **`output` is a string.** Return structured results as a JSON-encoded string; consumers decode it.
- **Stateless requests.** Each call should be self-contained; keep model state (weights, caches)
  in the image or a mounted volume.
- **Fail loudly.** A non-200 response or a crash means no delivery is submitted — the consumer
  is never charged for failed work.
- **Size the port.** The `containers[]` entry declares the internal port the agent posts to.

## A complete example (~30 lines)

[`examples/hf-sentiment`](https://github.com/hpp-io/noosphere-agent-js/tree/main/examples/hf-sentiment)
wraps a free HuggingFace model with FastAPI:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()
clf = pipeline("sentiment-analysis",
               model="distilbert-base-uncased-finetuned-sst-2-english")

class Req(BaseModel):
    input: str = ""
    text: str | None = None

@app.post("/computation")
def compute(req: Req):
    result = clf(req.text or req.input)[0]
    return {"output": f"{result['label']} ({result['score']:.4f})"}
```

```dockerfile
FROM python:3.11-slim
RUN pip install --no-cache-dir fastapi uvicorn "transformers<5" torch \
      --extra-index-url https://download.pytorch.org/whl/cpu
COPY app.py .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8090"]
```

Swap the `pipeline(...)` task and the input/output mapping for any other model — text
generation, summarization, translation, embeddings, your own fine-tune.

> Pin `"transformers<5"` if you use seq2seq pipelines (summarization/translation) — v5 removed
> those tasks.

## Registering the container

```jsonc
"containers": [
  {
    "id": "hf-sentiment",          // referenced by services / subscriptions
    "name": "hf-sentiment",        // docker container name (agent prefixes it)
    "image": "hf-sentiment:latest",
    "port": "8090",                // where /computation listens inside
    "env": { "HF_TOKEN": "${HF_TOKEN}" }   // optional, ${VAR} comes from .env
  }
]
```

The agent pulls the image if needed and manages the container lifecycle (start on demand via
the Docker socket). To make the container requestable by other consumers, publish it to the
[community registry](./registry-and-deployments.md#contributing-to-the-registry) — subscriptions
reference containers by their registry ID
([Request compute on-chain](./request-onchain-compute.mdx)).

## Large inputs and outputs

For payloads too big for a request body or on-chain storage, the agent resolves URI-based
payloads (`data:`, `ipfs://`, `https://` S3-compatible) via the `payload` config block — see
[Configuration](./configuration.md#payload).
