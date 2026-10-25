---
lang: en-US
title: "Build and Train a GLM-5.3-Flash Model From Scratch with Python"
description: "Article(s) > Build and Train a GLM-5.3-Flash Model From Scratch with Python"
icon: fas fa-language
category:
  - Python
  - PyTorch
  - NumPy
  - Matplotlib
  - AI
  - LLM
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pytorch
  - py-torch
  - numpy
  - py-numpy
  - matplotlib
  - py-matplotlib
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build and Train a GLM-5.3-Flash Model From Scratch with Python"
    - property: og:description
      content: "Build and Train a GLM-5.3-Flash Model From Scratch with Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-train-a-glm-53-flash-model-from-scratch-with-python.html
prev: /ai/llm/articles/README.md
date: 2026-11-15
isOriginal: false
author:
  - name: Vuk Rosić (@vukrosic)
    url: https://youtube.com/@vukrosic
cover: https://i.ytimg.com/vi/-gfgQfw2g_E/maxresdefault.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build and Train a GLM-5.3-Flash Model From Scratch with Python"
  desc="GLM-5.3-Flash combines linear and sparse attention, a mixture-of-experts design, and manifold constrained hyperconnections. A scaled-down version with 25 million parameters can be built in Python and "
  url="https://freecodecamp.org/news/build-and-train-a-glm-53-flash-model-from-scratch-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://i.ytimg.com/vi/-gfgQfw2g_E/maxresdefault.jpg"/>

GLM-5.3-Flash combines linear and sparse attention, a mixture-of-experts design, and manifold constrained hyperconnections. A scaled-down version with 25 million parameters can be built in Python and trained on a standard CPU.

We just published a course on the freeCodeCamp.org YouTube channel that will teach you how to build and train a multimodal language model from scratch, covering both pre-training and post-training. The course is from @vukrosic, and all of the code, slides, and experiments are in the GitHub repository linked in the video description.

The model uses a 260-token byte-level vocabulary, a 192-token context, and a small vision encoder that turns a 32 by 32 image into 16 tokens.

In this course, you will learn:

- **Tokenization & Embeddings**  
    Why a small model needs a small byte-level vocabulary and how weight tying shares one matrix between the embeddings and the output head.
- **Linear & Sparse Attention**  
    How linear attention keeps a fixed-size memory of recent tokens while every fourth layer uses sparse attention with an indexer to find distant details.
- **Mixture of Experts**  
    How tokens are routed to a few chosen experts plus a shared expert that learns information common to every token.
- **Adding Vision**  
    How images are split into patches with 2D RoPE and merged into image tokens so the model can recognize digits.
- **Pre-Training Experiments**  
    How data diversity, interleaving, and curriculums affect learning, including how interleaving helps prevent catastrophic forgetting.
- **Reinforcement Learning**  
    How to design reward functions, compute advantages as in GRPO, update only the final layers, and test group size, temperature, and seeds.

After reinforcement learning, the model goes from solving 0 of 24 Python tasks to 16 of 24. Watch the full course on the [<VPIcon icon="fa-brands fa-youtube"/>freeCodeCamp.org YouTube channel](https://youtu.be/-gfgQfw2g_E) (44-minute watch).

<VidStack src="youtube/-gfgQfw2g_E" />

::: info

<SiteInfo
  name="vukrosic/glm-5.3-flash-from-scratch"
  desc="A 25.7M-parameter GLM-5.3-Flash-inspired model trained from scratch and improved with executable-reward RL."
  url="https://github.com/vukrosic/glm-5.3-flash-from-scratch/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1/vukrosic/glm-5.3-flash-from-scratch"/>

<SiteInfo
  name="GLM-5.3-Flash: Frontier Intelligence, Flash Cost"
  desc="We introduce GLM-5.3-Flash, the first natively multimodal model in the GLM-5 series. With 320B total parameters and just 18B active parameters, it outperforms GLM-5.2 across benchmarks and real-world workloads at one-tenth the price, while approaching Claude Opus 4.8 on coding and agentic benchmarks."
  url="https://z.ai/blog/glm-5.3-flash"
  logo="https://z-cdn.chatglm.cn/z-blog/z-icon.svg"
  preview="https://z-cdn-media.chatglm.cn/prompts-rich-media-resources/5-blog/z-icon.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build and Train a GLM-5.3-Flash Model From Scratch with Python",
  "desc": "GLM-5.3-Flash combines linear and sparse attention, a mixture-of-experts design, and manifold constrained hyperconnections. A scaled-down version with 25 million parameters can be built in Python and ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-train-a-glm-53-flash-model-from-scratch-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
