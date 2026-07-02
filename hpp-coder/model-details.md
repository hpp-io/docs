---
title: Model Details
sidebar_position: 3
---

# Model Details

## Architecture

Solidity-Master 2 inherits the architecture of **Qwen3-Coder-30B-A3B-Instruct** without modifying the underlying network structure. Domain adaptation is achieved through **Supervised Fine-Tuning (SFT)** using **Low-Rank Adaptation (LoRA)**.

### Base Model

| Item | Specification |
| :--- | :------------ |
| Base Model | Qwen3-Coder-30B-A3B-Instruct |
| Architecture | Sparse Mixture-of-Experts (MoE) Transformer |
| Total Parameters | 30.5B |
| Active Parameters | ~3.3B per forward pass |
| Number of Layers | 48 |
| Experts | 128 Experts (8 activated per token) |
| Attention | Grouped Query Attention (GQA) |
| Native Context Length | 256K tokens |
| Extended Context | Up to 1M tokens (YaRN) |

---

## Data Pipeline

The training pipeline consists of three stages:

1. Data Collection
2. Dataset Construction
3. Model Fine-Tuning

```text
Ethereum Mainnet
        │
        ├──────────────┐
        │              │
        ▼              ▼
 GitHub Repositories   Verified Contracts
        │              │
        └──────┬───────┘
               ▼
        Deduplication
               ▼
        Data Cleaning
               ▼
    Instruction Generation
               ▼
        LoRA Fine-Tuning
               ▼
      Solidity-Master 2
```

### 1. Data Collection

Training data is collected from two primary sources:

- Verified smart contracts deployed on the Ethereum Mainnet
- High-quality open-source Solidity repositories on GitHub

These complementary data sources provide both real-world deployed contracts and actively maintained development projects.

#### 1.1 Ethereum Mainnet

Verified smart contracts are collected from the Ethereum Mainnet through **Blockscout**.

Collected metadata includes:

- Solidity source code
- Compiler version
- Contract metadata

Only verified contracts with publicly available source code are included in the dataset.

##### Data Selection Criteria

- Verified source code
- Solidity compiler version ≥ **0.8.20**
- Complete source files
- Successfully retrievable metadata

#### 1.2 GitHub

Open-source Solidity repositories are continuously collected from GitHub.

The crawler prioritizes repositories satisfying the following criteria:

- Public repositories
- High GitHub star count
- Solidity version **0.8.20** or later
- Active development projects

The crawler extracts Solidity source files and stores them in the internal code repository for preprocessing.

#### 1.3 Deduplication

Source code collected from Ethereum Mainnet and GitHub often contains duplicated contracts or mirrored repositories.

Before dataset construction, all collected source code undergoes a deduplication process.

The deduplication pipeline:

- Removes identical contracts
- Eliminates duplicated repositories
- Improves dataset diversity
- Prevents repeated training samples
- Reduces potential overfitting

The resulting repository forms a high-quality Solidity code corpus for downstream instruction generation.

### 2. Dataset Construction

The collected Solidity source code is transformed into a high-quality instruction-tuning dataset through filtering, cleaning, and automatic instruction generation.

The objective of this stage is to maximize data quality while minimizing noisy or duplicated samples.

#### 2.1 Data Filtering

Only high-quality Solidity projects are retained for training.

Filtering criteria include:

- Solidity compiler version **0.8.20 or later**
- Successful compilation
- Complete project structure
- Valid source code

Projects that fail compilation are automatically excluded from the training dataset.

#### 2.2 Data Cleaning

Additional preprocessing is performed to improve dataset quality before instruction generation.

Typical cleaning steps include:

- Removing generated files
- Removing duplicated source code
- Normalizing project directory structures
- Cleaning unnecessary metadata
- Standardizing source formatting

These preprocessing steps improve the consistency of the instruction dataset and reduce training noise.

#### 2.3 Instruction Generation

After preprocessing, instruction-response pairs are automatically generated from the collected Solidity projects.

The generated tasks include:

- Smart contract generation
- Function implementation
- Interface generation
- ERC standard implementation
- Code completion
- Code explanation
- Bug fixing
- Code refactoring

The resulting instruction dataset is used for supervised fine-tuning.

### 3. Fine-Tuning

Solidity-Master 2 is trained using **Supervised Fine-Tuning (SFT)** with **Low-Rank Adaptation (LoRA)**.

Instead of updating all parameters of the base model, LoRA injects trainable low-rank matrices into the attention projection layers while keeping the original model weights frozen.

This approach enables efficient domain adaptation with significantly lower computational cost and GPU memory requirements.

#### LoRA Configuration

| Parameter | Value |
| :--- | :--- |
| Fine-tuning Method | Supervised Fine-Tuning (SFT) |
| Adapter | LoRA |
| Task Type | Causal Language Modeling |
| Rank (`r`) | 32 |
| LoRA Alpha | 64 |
| LoRA Dropout | 0.05 |
| Bias | None |
| Target Modules | `q_proj`, `k_proj`, `v_proj`, `o_proj` |

The LoRA adapters are applied to the Query, Key, Value, and Output projection layers of the self-attention blocks.

This configuration provides an effective balance between adaptation capability and computational efficiency while preserving the strong coding ability of the Qwen3-Coder base model.

During deployment, the trained LoRA adapters may either:

- Be merged into the base model weights, or
- Be loaded dynamically during inference.

### Continual Learning

The Solidity ecosystem evolves rapidly as new language features, libraries, and smart contract patterns emerge.

To keep Solidity-Master 2 up to date, the entire training pipeline is executed on a monthly basis.

Each update cycle consists of:

1. Collecting newly verified Ethereum Mainnet smart contracts
2. Crawling newly published GitHub repositories
3. Deduplicating and cleaning the collected source code
4. Generating updated instruction datasets
5. Performing incremental LoRA fine-tuning

This continual learning strategy enables Solidity-Master 2 to remain aligned with:

- The latest Solidity language features
- Emerging smart contract development patterns
- Newly adopted ERC standards
- Best practices observed in production smart contracts

As the training corpus continues to grow, future versions of Solidity-Master are expected to deliver improved code quality, broader language coverage, and stronger generalization across diverse Solidity development tasks.

---

## Evaluation

Solidity-Master 2 was evaluated using **SolContractEval**, a benchmark designed to assess Solidity code generation capabilities.

The evaluation was performed on a **subset of 40 SolContractEval tasks compatible with Solidity v0.8.0 or later**. All experiments were conducted using the **4-bit quantized model**.

Two evaluation metrics are reported:

- **Compile@K**: The percentage of generated solutions that successfully compile within the top-*K* generated candidates.
- **Pass@K**: The percentage of generated solutions that both compile successfully and pass all functional test cases within the top-*K* generated candidates.

### Benchmark Results

| Metric | Score |
| :------ | ----: |
| Compile@1 | **70.00%** |
| Compile@3 | **81.25%** |
| Compile@5 | **85.00%** |
| Pass@1 | **15.00%** |
| Pass@3 | **23.75%** |
| Pass@5 | **27.50%** |

The benchmark results demonstrate that Solidity-Master 2 consistently generates syntactically valid Solidity code. The compile success rate improves significantly when multiple candidate generations are considered, while functional correctness also benefits from multi-sample generation.

> **Note**
>
> The reported results are based on a subset of **40 SolContractEval benchmark tasks** requiring **Solidity v0.8.0 or later**. All evaluations were performed using the **4-bit quantized** version of Solidity-Master 2. Performance may vary depending on the inference configuration and model precision.

---

## Target Capabilities

Solidity-Master 2 is optimized for a broad range of Solidity development tasks, including:

- Smart contract generation
- Smart contract completion
- Function implementation
- Interface generation
- ERC standard implementation
- Code explanation
- Code refactoring
- Bug fixing
- Repository-level code understanding

The model is intended to assist developers throughout the smart contract development lifecycle, from code generation to maintenance.

## Limitations

Although Solidity-Master 2 is specialized for Solidity programming, it is **not** intended to replace professional smart contract auditing.

Users should always review, test, and audit generated code before deploying contracts to production environments.

Current limitations include:

- Optimized primarily for Solidity **v0.8.20** and later
- Generated code may contain logical or security vulnerabilities
- Human review is required before production deployment
- Benchmark results are based on a subset of 40 SolContractEval tasks

## Future Work

Future releases of Solidity-Master will focus on:

- Expanding the training corpus with newly verified Ethereum smart contracts
- Increasing GitHub repository coverage
- Improving functional correctness (Pass@K)
- Supporting newer Solidity compiler versions
- Expanding benchmark coverage using larger public evaluation datasets
- Improving instruction diversity for advanced smart contract development tasks

The model will continue to be updated on a monthly basis through the continual learning pipeline, ensuring alignment with the latest Solidity language features and development practices.
