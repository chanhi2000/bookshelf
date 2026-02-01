---
lang: en-US
title: "Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model"
description: "Article(s) > Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model"
icon: fas fa-language
category:
  - AI
  - LLM
  - Nvidia
  - Article(s)
tag:
  - blog
  - huggingface.co
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
  - nvidia
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model"
    - property: og:description
      content: "Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/huggingface.co/nvidia/nemotron-colembed-v2.html
prev: /ai/llm/articles/README.md
date: 2026-02-04
isOriginal: false
author: 
  - name: Ronay Ak
    url: https://huggingface.co/ronay-nv
  - name: Gabriel de Souza Pereira Moreira
    url: https://huggingface.co/gmoreira-nv
cover: https://cdn-thumbnails.huggingface.co/social-thumbnails/blog/nvidia/nemotron-colembed-v2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model"
  desc="A Blog post by NVIDIA on Hugging Face"
  url="https://huggingface.co/blog/nvidia/nemotron-colembed-v2"
  logo="https://huggingface.co/favicon.ico"
  preview="https://cdn-thumbnails.huggingface.co/social-thumbnails/blog/nvidia/nemotron-colembed-v2.png"/>

Modern search systems are increasingly designed to process heterogeneous document images that may contain text, tables, charts, figures, and other visual components. In this context, accurately retrieving relevant information across these diverse modalities is a central challenge. Multimodal embedding models built on top of foundational vision–language models (VLMs) map diverse content types into a shared representation space, enabling unified retrieval over text, images, and structured visual elements. Although encoding an entire query and candidate document into a single vector is a common practice—exemplified by our recently released commercial-ready [<VPIcon icon="iconfont icon-huggingface"/>Llama-Nemotron-Embed-VL-1B](https://huggingface.co/blog/nvidia/llama-nemotron-vl-1b) which prioritizes efficiency and low storage—there is an increasing research direction on multi-vector, late-interaction style embedding architectures which provide fine-grained multi-vector interaction between queries and documents. By enabling richer token representations, these models better capture more detailed semantic relationships, and they have shown higher accuracy performance on various (multimodal) benchmarks.

NVIDIA introduces the Nemotron ColEmbed V2 family, a set of late-interaction embedding models available in three sizes—3B, 4B, and 8B—designed for highly accurate multimodal retrieval. These models adopt a unified approach to text–image retrieval and achieve state-of-the-art performance on the ViDoRe V1, V2, and V3 [<VPIcon icon="iconfont icon-huggingface"/>benchmarks](https://huggingface.co/vidore).

---

## Nemotron ColEmbed V2 Highlights (TL;DR)

The [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2), [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-4b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-4b-v2) and [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/llama-nemotron-colembed-vl-3b-v2`](https://huggingface.co/nvidia/llama-nemotron-colembed-vl-3b-v2) are state-of-the-art late interaction embedding models that rank 1st, 3rd and 6th—the highest ranked models in each weight class, as of Feb 3, 2026, on the ViDoRe V3 benchmark: a comprehensive evaluation of visual document retrieval for enterprise use-case benchmark.

![<VPIcon icon="iconfont icon-huggingface"/>late_interaction](https://cdn-uploads.huggingface.co/production/uploads/6814af6d59c3d8d6f9b09f2b/A4KY3NSZrrxGEcO6mihU8.png)

The late interaction mechanism introduced by [<VPIcon icon="iconfont icon-arxiv"/>ColBERT](https://arxiv.org/pdf/2004.12832) for multi-vector embedding matching has been extended in our work to a multimodal setting, enabling fine-grained interactions between query and document tokens, whether textual or visual. As illustrated in the figure, each query token embedding interacts with all document token embeddings via the `MaxSim` operator, which selects the maximum similarity for each query token and then sums these maxima to produce the final relevance score. This approach requires storing the token embeddings for the entire document corpus, whether textual or visual, thereby increasing storage requirements. During inference, query token embeddings are computed and matched against the stored document embeddings using the same MaxSim operation.

Nemotron ColEmbed V2 family of models is intended for researchers exploring visual document retrieval applications where accuracy is paramount. This distinguishes it from our [<VPIcon icon="iconfont icon-huggingface"/>1B single-vector model](https://huggingface.co/blog/nvidia/llama-nemotron-vl-1b) released last month, which was designed for commercial environments requiring minimal storage and high throughput. It is instrumental in multimodal RAG systems, where textual queries can be used to retrieve document images, such as pages, text, charts, tables, or infographics. The models output multi-vector embeddings for input queries and documents. Potential applications include multimedia search engines, cross-modal retrieval systems, and conversational AI with rich input understanding.

As a new benchmark, [<VPIcon icon="iconfont icon-huggingface"/>ViDoRe V3](https://huggingface.co/blog/QuentinJG/introducing-vidore-v3) is designed to set an industry standard for multi-modal enterprise document retrieval. It tackles a key challenge in production RAG systems: accurately extracting information from complex, visually-rich documents. With its strong multi-modal document retrieval capability, the [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2) model ranks **#1** on the ViDoRe V3 leaderboard, setting a new standard for accuracy.

::: info Visual Document Retrieval benchmark (page retrieval) – Avg NDCG@10 on ViDoRe V3 public and private tasks.

| Model | Emb_dim | # of parameters | ViDoRe V3 Accuracy (NDCG@10) |
| --- | --- | --- | --- |
| [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2) | 4096 | 8.8B | 63.42 |
| [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-4b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-4b-v2) | 2560 | 4.8B | 61.54 |
| [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/llama-nemotron-colembed-vl-3b-v2`](https://huggingface.co/nvidia/llama-nemotron-colembed-vl-3b-v2) | 3072 | 4.4B | 59.79 |
| [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/lama-nemoretriever-colembed-3b-v1`](https://huggingface.co/nvidia/llama-nemoretriever-colembed-3b-v1) | 3072 | 4.4B | 57.26 |

:::

---

## Models’ Architecture

The llama-nemotron-colembed-vl-3b-v2 is a transformer-based multimodal embedding model built on top of a VLM based on google/siglip2-giant-opt-patch16-384 and meta-llama/Llama-3.2-3B. The nemotron-colembed-vl-8b-v2 and nemotron-colembed-vl-4b-v2 multimodal encoder models were built from [<VPIcon icon="iconfont icon-huggingface"/>`Qwen/Qwen3-VL-8B-Instruct`](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct) and [<VPIcon icon="iconfont icon-huggingface"/>`Qwen/Qwen3-VL-4B-Instruct`](https://huggingface.co/Qwen/Qwen3-VL-4B-Instruct), respectively.

### Architecture modifications:

- Our models use bi-directional self-attention instead of the original uni-directional causal self-attention from the LLM decoder models. This allows the model to learn rich representations from the whole input sequence.
- ColBERT-style late interaction mechanism- for each input token, each model outputs an n-dimensional embedding vector of floating-point values, where n is determined by the model’s hidden size.

### Training Methodology

The [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2), [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-4b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-4b-v2) and [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/llama-nemotron-colembed-vl-3b-v2`](https://huggingface.co/nvidia/llama-nemotron-colembed-vl-3b-v2) models were trained using a bi-encoder architecture, independently. This involves encoding a pair of sentences (for example, a query and a document) independently using the embedding model. Using contrastive learning, it is used to maximize the late interaction similarity between the query and the document that contains the answer, while minimizing the similarity between the query and sampled negative documents not useful to answer the question.

The llama-nemotron-colembed-vl-3b-v2 model was trained in a two-stage pipeline: it was first fine-tuned with 12.5M textQA pairs, and subsequently fine-tuned with text–image pairs. The nemotron-colembed-vl-8b-v2, nemotron-colembed-vl-4b-v2 models were fine-tuned using only text-image pairs (2nd stage).

Our training datasets contain both text-only and text-image pairs, and we apply hard negative mining following the positive-aware hard negative mining methods presented in the NV-Retriever [<VPIcon icon="iconfont icon-arxiv"/>paper](https://arxiv.org/pdf/2407.15831) to improve retrieval performance.

::: important ✨ Key Improvements over V1:

⚗️ Advanced Model Merging: Utilizes post-training model merging to combine the strengths of multiple fine-tuned checkpoints. This delivers the accuracy stability of an ensemble without any additional inference latency.  

🌍 Enhanced Synthetic Data: We significantly enriched our training mixture with diverse multilingual synthetic data, improving semantic alignment across languages and complex document types.

![<VPIcon icon="iconfont icon-huggingface"/>modelperfs_vidorev3](https://cdn-uploads.huggingface.co/production/uploads/6814af6d59c3d8d6f9b09f2b/J7JIKCDriMjztO1ULw0k3.png)

---

## Start Building with Nemotron ColEmbed V2

Nemotron ColEmbed V2 models mark a major step forward in high-accuracy text–image retrieval, delivering state-of-the-art results on the ViDoRe V1, V2, and V3 benchmarks. The availability of 3B, 4B and 8B model variants further establishes a solid foundation for future research and advanced experimentation in multimodal retrieval applications.

Get started with Nemotron ColEmbed V2 models by downloading the models: [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2), [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-4b-v2`](https://huggingface.co/nvidia/nemotron-colembed-vl-4b-v2) and [<VPIcon icon="iconfont icon-huggingface"/>`nvidia/llama-nemotron-colembed-vl-3b-v2`](https://huggingface.co/nvidia/llama-nemotron-colembed-vl-3b-v2), available on Hugging Face. Check out our [example notebook (<VPIcon icon="iconfont icon-huggingface"/>`nvidia/nemotron-colembed-vl-8b-v2`)](https://huggingface.co/nvidia/nemotron-colembed-vl-8b-v2/blob/main/nemotron_colembed_4b_8b_v2_example_vidore_v3.ipynb) which demonstrates a simple indexing and retrieval pipeline using the nemotron-colembed-vl-4b-v2 and nemotron-colembed-vl-8b-v2 models. For a deep dive into the architectures, training methodology, and benchmarks, see our [<VPIcon icon="iconfont icon-arxiv"/>Nemotron ColEmbed V2 paper](https://arxiv.org/abs/2602.03992).

Learn more about the NVIDIA NeMo Retriever family of Nemotron RAG models on the [<VPIcon icon="iconfont icon-nvidia"/>product page](https://developer.nvidia.com/nemo-retriever), or access the microservice container from [<VPIcon icon="fas fa-globe"/>NVIDIA NGC](https://catalog.ngc.nvidia.com/orgs/nim/collections/nemo-retriever). This is an excellent opportunity to explore state-of-the-art retrieval in your own applications and workflows. Try [<VPIcon icon="iconfont icon-nvidia"/>NVIDIA Enterprise RAG Blueprint](https://build.nvidia.com/nvidia/build-an-enterprise-rag-pipeline), using the Nemotron RAG models that are powered by the same tech behind our ViDoRe V3 winning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Nemotron ColEmbed V2: Raising the Bar for Multimodal Retrieval with ViDoRe V3’s Top Model",
  "desc": "A Blog post by NVIDIA on Hugging Face",
  "link": "https://chanhi2000.github.io/bookshelf/huggingface.co/nvidia/nemotron-colembed-v2.html",
  "logo": "https://huggingface.co/favicon.ico",
  "background": "rgba(11,15,25,0.2)"
}
```
