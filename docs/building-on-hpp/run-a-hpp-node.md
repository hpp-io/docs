---
description: Instructions about how to run a HPP Node.
---

# Run a HPP Node

### Minimum hardware configuration

The following is the minimum hardware configuration required to set up a Nitro full node (not archival):

| Resource     | Recommended                                   |
| ------------ | --------------------------------------------- |
| RAM          | 16 GB                                         |
| CPU          | 4 core CPU (for AWS, a t3 xLarge instance)    |
| Storage Type | NVMe SSD drives are recommended               |
| Storage size | Depends on the chain and its traffic overtime |

Please note that:

* These minimum requirements for RAM and CPU are recommended for nodes that process a small amount of RPC requests. For nodes that require processing multiple simultaneous requests, both RAM and number of CPU cores will need to be scaled with the amount of traffic being served.
* Single core performance is important. If the node is falling behind and a single core is 100% busy, it is recommended to update to a faster processor
* The minimum storage requirements will change over time as the chain grows. Using more than the minimum requirements to run a robust full node is recommended.

### Prerequisites

1. Download and install [Docker](https://www.docker.com/), ensure it is running.
2. Unlimited rate limit Ethereum RPC endpoint and beacon chain RPC endpoint

### Run the node

Specify a local path to store data for running the node, determine the Nitro version, and then execute it.

The node should now be running and looking for peers to sync.

For a more detailed node run instruction, please refer to this link.\
[https://github.com/hpp-io/node](https://github.com/hpp-io/node)

HPP generates blocks only when there are transactions to process. So if you don't see new blocks coming in, it just means there's no transaction activity - your node is still syncing correctly.
