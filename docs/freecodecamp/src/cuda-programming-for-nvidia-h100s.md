---
lang: en-US
title: "CUDA Programming for NVIDIA H100s"
description: "Article(s) > CUDA Programming for NVIDIA H100s"
icon: iconfont icon-nvidia
category:
  - C++
  - Nvidia
  - CUDA
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cpp
  - c++
  - c-plus-plus
  - nvidia
  - cuda
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CUDA Programming for NVIDIA H100s"
    - property: og:description
      content: "CUDA Programming for NVIDIA H100s"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/cuda-programming-for-nvidia-h100s.html
prev: /programming/cpp-cuda/articles/README.md
date: 2026-04-10
isOriginal: false
author:
  - name: Prateek Shukla
    url: https://github.com/prateekshukla1108
cover: https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/ea6ca08d-00f6-43c6-88b1-536d7319982f.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CUDA > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp-cuda/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CUDA Programming for NVIDIA H100s"
  desc="Learn CUDA programming for NVIDIA Hopper GPUs. We just posted a course on the freeCodeCamp.org YouTube channel that will teach you to build efficient WGMMA pipelines and leverage Cutlass optimizations"
  url="https://freecodecamp.org/news/cuda-programming-for-nvidia-h100s"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/ea6ca08d-00f6-43c6-88b1-536d7319982f.jpg"/>

Learn CUDA programming for NVIDIA Hopper GPUs.

We just posted a course on the [<FontIcon icon="fa-brands fa-free-code-camp"/>freeCodeCamp.org](http://freeCodeCamp.org) YouTube channel that will teach you to build efficient WGMMA pipelines and leverage Cutlass optimizations to perform the massive matrix multiplications that power modern AI.

Beyond single-chip performance, the curriculum covers multi-GPU scaling and NCCL primitives necessary for training trillion-parameter models. To get the most out of these lessons, you should have a foundational grasp of C++ syntax and linear algebra, particularly how matrices are tiled and multiplied.

Here are all the sections in this massive course:

- Course Introduction
- Table of Contents & Course Overview
- LESSON 1 — H100 Hopper GPU Architecture
- H100 Specifications: HBM3, Bandwidth & Power
- Tensor Cores Overview
- Tensor Memory Accelerator (TMA)
- Transformer Engine
- L2 Cache Architecture
- GPCs, TPCs & SM Layout
- Thread Block Clusters
- Distributed Shared Memory
- SM Sub-Partitions (SMSPs)
- Warp Schedulers & Dispatch Units
- Shared Memory & Data Movement
- Occupancy
- LESSON 2 — Clusters, Data Types, Inline PTX & Pointers
- Thread Block Clusters Programming
- Configuring Cluster Dimensions
- Inline PTX Assembly
- State Spaces
- Data Types in PTX
- Generic Pointers
- Address Space Conversion
- LESSON 3 — Asynchronicity & Barriers
- Introduction to Async Operations
- Proxies
- Fences & Memory Ordering
- Fence Ordering & Visibility
- Fence Scopes
- Acquire & Release Fences
- Expected Count & Thread Arrival
- M-Barrier Arrive Operations
- M-Barrier PTX Instructions
- Barrier Wait Operations
- Phase & Parity
- Commit Operations
- LESSON 4 — CuTensorMap Descriptors
- Tensor Shape, Stride & Data Type
- Element Stride & Dimensions
- Box Dimensions (Tile Size)
- Bank Conflicts
- Swizzling
- Swizzle Formula Deep Dive
- Interleave Layouts
- Out-of-Bounds Fill (OOB)
- LESSON 5 — cp.async.bulk (Async Bulk Copies via TMA)
- Bulk Tensor Operations (1D–5D)
- Multicast Operations
- Prefetch
- LESSON 6 — WGMMA Part 1 (Warp Group Matrix Multiply Accumulate)
- Warp Groups & Matrix Multiplication
- WGMMA Descriptors
- Accumulators & Register Reuse
- Scale Factors (Scale D, Scale A, Scale B)
- Core Matrices & 16×16 Tiles
- LESSON 7 — WGMMA Part 2
- Commit Groups & Wait Groups
- WGMMA with FP8 Data Types
- LESSON 8 — Kernel Design
- Compute-Bound vs. Memory-Bound Kernels
- Warp Specialization
- Cooperative vs. Ping-Pong Pipelines
- Pipelining Fundamentals
- Circular Buffering
- Ping-Pong Pipeline Deep Dive
- Epilogue Handling in Pipelines
- Persistent Scheduling
- Split-K & Stream-K Strategies
- Data-Parallel Tile Scheduling
- Epilogue Fusion (Bias, Activation, Scaling)
- Epilogue Operations Overview
- CUTLASS SOURCE CODE WALKTHROUGH
- Main Loop & Scheduling Policies
- Dispatch Policy
- SM90 Tile Scheduler
- SM90 Epilogue (TMA Warp Specialized)
- SM90 Builder
- Collective Builder
- FAST.CU KERNEL WALKTHROUGH
- Main Loop Implementation
- Producer Warp Group (Dependence Wall)
- Consumer Warp Group
- Prologue
- MULTI-GPU PROGRAMMING — Part 1
- NVSwitch
- Topology & System Architecture
- NVSwitch, BlueField DPUs & Storage Fabrics
- CUDA Peer-to-Peer Communication
- MPI (Message Passing Interface)
- P2P Limitations & Trade-offs
- MULTI-GPU PROGRAMMING — Part 2
- SLURM Resource Allocation
- PMIx Process Management
- NCCL (NVIDIA Collective Communications Library)
- NCCL Internals & Ring Algorithm
- AllReduce Operations
- NCCL Collectives: Broadcast, AllGather, ReduceScatter
- Parallelism Strategies: Data, Tensor, Pipeline & Expert Parallelism
- Course Conclusion & Next Steps

Watch the course on [<VPIcon icon="fa-brands fa-youtube"/>the freeCodeCamp.org YouTube channel](https://youtu.be/SqQUQHdYWyc) (24-hour watch).

<VidStack src="youtube/SqQUQHdYWyc" />

::: info Course Material(s)

<SiteInfo
  name="CUDA Programming for NVIDIA H100s"
  desc="Advanced CUDA course on NVIDIA Hopper and H100 by Prateek Shukla, covering TMA, cuTensorMap, cp.async.bulk, mbarrier, WGMMA, kernel design, and multi-GPU orchestration."
  url="https://cudacourseh100.github.io/"
  logo="https://cudacourseh100.github.io/favicon.svg"
  preview="https://cudacourseh100.github.io/social-card.png"/>

<SiteInfo
  name="cudacourseh100/H100-Course: Repository for the CUDA H100 Course"
  desc="Repository for the CUDA H100 Course. Contribute to cudacourseh100/H100-Course development by creating an account on GitHub."
  url="https://github.com/cudacourseh100/H100-Course/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7df76b17efdadf7d45825b6dbd49c8484c7ff6bad4d4241333a3e1a03445bc75/cudacourseh100/H100-Course"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CUDA Programming for NVIDIA H100s",
  "desc": "Learn CUDA programming for NVIDIA Hopper GPUs. We just posted a course on the freeCodeCamp.org YouTube channel that will teach you to build efficient WGMMA pipelines and leverage Cutlass optimizations",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/cuda-programming-for-nvidia-h100s.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
