---
description: Sovereign rollups for SQLite applications — the state layer of the HPP stack
---

# HPPLite

> **In development.** HPPLite is targeted for 2027 on the [HPP roadmap](https://paper.hpp.io/HPP_Whitepaper_v2_EN.pdf).
> This page describes the design from the HPP Whitepaper v2.0; there is no public release, SDK or
> connection string to use yet.

Most web services run on a database, and SQLite is the most widely deployed database engine of all.
**HPPLite** is an extension that turns a SQLite application into a **sovereign rollup** without code
changes. The application keeps using SQLite as it always has; HPPLite records every write, posts it in
encrypted batches, and anchors a state root of the whole database on the HPP network at a fixed
cadence.

In the HPP stack, HPPLite is the **state layer**: an agent pays through [x402](/x402), runs inference
through [HPP Router](/hpp-router), reaches off-chain compute through [Noösphere](/noosphere), and
records its state through HPPLite. It is also the public Layer 3 of HPP, settling to HPP Mainnet.

### An Agentic Chain per application

Each application gets **its own rollup contract** on HPP — without building an independent chain or
running a separate node. To users it looks like an ordinary web service; on the network it is an
independent entity with an ordered, verifiable state history. HPP calls this an **Agentic Chain**.

Connecting is designed to take one parameter on the database connection string, and to work as is
with the SQLite drivers and ORMs of major languages such as Python, Node.js and Ruby.

### Architecture

HPPLite applies the shape of an L2 rollup to a database: a single sequencer orders writes, data is
posted in batches, and state is committed periodically.

* **Sequencer** — the application process itself executes SQL, groups writes into batches and posts
  them. An on-chain lease guarantees that only one instance posts at a time.
* **Write capture** — every write is recorded as row-level changes inside the application's own
  transaction. If the transaction rolls back, its record rolls back with it, so no write is applied
  without being logged.
* **State commitment** — every set number of batches, a state root built from per-table Merkle trees is
  anchored on HPP. Only what changed is recomputed, so commitment cost tracks the volume of change,
  not the size of the database.
* **Rebuild and verify** — a key holder can rebuild the entire database from chain records alone,
  starting from an empty file, and compare it against the posted state roots.

### Data availability

Each application chooses where its batches live:

* **On-chain DA** — batches are written to transaction logs on HPP; the contract stores only the batch
  height and a rolling hash, at far lower cost than contract storage.
* **External store with on-chain commitments** — batches live in a store such as IPFS, and HPP keeps
  only the hash, the reference and the store's signed receipt. Store fees are paid per call over
  [x402](/x402); if the store does not respond, batches are posted to the chain directly.

Either way, batch hashes are checked against on-chain records during a rebuild. Batches are compressed
and encrypted with ChaCha20-Poly1305, so the public chain holds only ciphertext.

### Trust model

As a sovereign rollup, HPPLite uses the chain as a **witness** — it holds ordered data and state
commitments — rather than as a settlement layer that adjudicates state transitions. Verification is
performed by whoever rebuilds the database: tampering surfaces as a state root mismatch, and a lost
server disk can be recovered from the chain.

Today, verification is performed by holders of the encryption key. Viewing keys that allow rebuilding
and auditing without write authority, and separate operator and owner keys, are planned as the next
step.

### Relationship with the HPP network

An HPPLite application deploys its rollup contract on HPP and performs batch posting and state
commitments as ordinary HPP transactions, with gas paid in ETH. As more applications run on HPPLite,
real transactions and payments on the HPP network grow with them.

_For the full design, see Section 6 of the_ [_**HPP Whitepaper v2.0**_](https://paper.hpp.io/HPP_Whitepaper_v2_EN.pdf)_._
