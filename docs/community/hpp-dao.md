---
description: HPP DAO Governance Framework
---

# HPP DAO

### What is HPP DAO?

HPP DAO is the decentralized governance body of House Party Protocol, an AI-first blockchain and data infrastructure. It makes collective decisions on protocol operations, ecosystem direction, and resource allocation, strictly through predefined rules rather than the discretion of any single entity.

As the protocol matures, HPP DAO ensures that decision-making remains decentralized, stakeholder interests remain aligned, and governance outcomes remain predictable for everyone involved.

_Please refer to the_ [_**HPP DAO Governance Framework**_](https://paper.hpp.io/docs/HPP_DAO_Governance_Framework_260417.pdf) _for more information._

#### Five Core Principles

<table data-header-hidden><thead><tr><th width="186.2664794921875"></th><th></th></tr></thead><tbody><tr><td><strong>Principle</strong></td><td><strong>What it means</strong></td></tr><tr><td>Explicitness</td><td>All procedures and authorities are defined in advance. Nothing is implied.</td></tr><tr><td>Predictability</td><td>Outcomes are anticipatable before participation.</td></tr><tr><td>Gradual Evolution</td><td>Governance evolves progressively alongside the protocol.</td></tr><tr><td>Accountability</td><td>Every approved decision is executable and traceable.</td></tr><tr><td>Least Authority</td><td>Each layer holds only the minimum power it needs to function.</td></tr></tbody></table>

#### Scope of Authority

HPP DAO governs matters that affect the protocol at a systemic level.

✓ Governance rules and procedures \
✓ Core protocol parameters \
✓ Treasury allocation and usage \
✓ Protocol upgrades and structural changes

✘ Individual user behavior or assets \
✘ Management of individual applications \
✘ Operations of external projects

_\* Any authority not explicitly defined here is not implicitly granted. Ambiguous or non-executable proposals are not valid governance actions._

HPP DAO is a strategic and policy-level body. Operational execution and technical implementation are handled by operational entities, not the DAO.

#### Four-Layer Architecture

```
Forum -> Voting -> Execution -> Integration
```

Forum: Entry point of governance. All proposals are discussed here before voting. Non-binding but required.

Voting: Formal approval or rejection based on quorum and threshold rules. Results are final and immutable.

Execution: Implements approved proposals only, within the approved scope. Timelock mechanisms apply as a safety buffer.

Integration: Records participation, converts activity into XP, and feeds results into staking rewards. Does not alter governance decisions.

#### Proposal Types

<table data-header-hidden><thead><tr><th width="141.5999755859375"></th><th width="368.066650390625"></th><th></th></tr></thead><tbody><tr><td>Type</td><td>Purpose</td><td>Binding?</td></tr><tr><td>Protocol</td><td>Core parameter or feature changes</td><td>✓ Yes</td></tr><tr><td>Treasury</td><td>Fund allocation and usage</td><td>✓ Yes</td></tr><tr><td>Governance</td><td>Rules and structure changes</td><td>✓ Yes</td></tr><tr><td>Meta</td><td>Signaling and sentiment gathering</td><td>✘ No</td></tr></tbody></table>

When a proposal spans multiple categories, it is classified by the highest level of risk or impact.

### Proposal Lifecycle

No phase can be skipped.

```
Draft -> Discussion -> Formalized -> Voting -> Approved -> Executed -> Integrated
                                            -> Rejected (resubmittable with revisions)
```

### Voting Rules

* Voting Power = staked HPP tokens, fixed at snapshot before voting opens
* Token movement during voting has no effect
* Quorum must be met, or the proposal is automatically rejected
* Approval Threshold (simple or supermajority) must be met after the Quorum is confirmed
* One vote per address. Results are public and immutable.

### Execution & Timelock

* No execution without prior approval
* Timelock creates a mandatory delay between approval and execution
* High-impact proposals carry a longer timelock; lower-risk proposals a shorter one
* Execution strictly follows the approved scope and cannot be reinterpreted
* Execution failure does not invalidate the original vote

#### XP & Rewards

Participating in governance earns XP. XP feeds into staking rewards alongside staking amount and duration.

XP-eligible activities: proposal discussion, proposal submission, voting, and execution contribution. \
\* _XP does not grant voting power. It is a participation signal only._

The reward system balances capital contribution (staking) with activity contribution (XP), so governance is not purely dominated by the largest token holders.

#### Forum & Communication

The Forum is the only official record of governance. Discord and Telegram are supplementary. No official decision can be made outside the Forum.

Posts must be clear and structured. Moderation is minimal and applied only to spam or policy violations. Forum content is a permanent governance history and cannot be deleted.

#### Transparency & Accountability

All of the following must be publicly verifiable:

* Proposal content, discussions, and voting results
* Execution outcomes, including status, target, and timestamp
* XP and reward calculation criteria
* All document changes with full version history

Governance decisions are collectively owned by the DAO. No individual bears sole responsibility. Disputes are resolved through governance processes.

### Universal Rules

* All governance changes require a Governance Proposal with a review period and non-retroactive application
* Decisions made outside defined processes are not recognized as official DAO decisions
* All documents must maintain a public change log
