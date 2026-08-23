---
lang: en-US
title: "From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved"
description: "Article(s) > From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved"
icon: fas fa-language
category:
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved"
    - property: og:description
      content: "From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-mixtral-to-kimi-k3-how-mixture-of-experts-models-evolved.html
prev: /ai/llm/articles/README.md
date: 2026-08-28
isOriginal: false
author:
  - name: Botao Deng
    url: https://freecodecamp.org/news/author/bdeng/
cover: https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/ee6f715e-b2cd-4c4a-aedf-6f4089ef7a8f.png
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
  name="From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved"
  desc="In this article, we'll discuss how Mixture-of-Experts models grew from a handful of experts to nearly 900 per layer, and the compression and stability mechanisms that keep such a sparse design trainab"
  url="https://freecodecamp.org/news/from-mixtral-to-kimi-k3-how-mixture-of-experts-models-evolved"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/ee6f715e-b2cd-4c4a-aedf-6f4089ef7a8f.png"/>

In this article, we'll discuss how Mixture-of-Experts models grew from a handful of experts to nearly 900 per layer, and the compression and stability mechanisms that keep such a sparse design trainable and affordable.

Open-weight Mixture-of-Experts models have expanded at a remarkable pace: Mixtral had about 47 billion total parameters, DeepSeek-V3 reached 671 billion, and Kimi K3 entered the trillions. The surprising part isn't simply how large these models became, but how little of each model processes any one token.

Kimi K3 has 2.8 trillion parameters, but it uses only about 104 billion of them for any single token. In almost every layer, a small router picks 16 of 896 specialized feed-forward networks, called **experts**, while two shared experts process every token.

This article focuses on that width-side design: how a model can offer a large pool of processing capacity without using all of it for every token. This differs from **sequence memory**, which concerns how the model stores and retrieves information from earlier tokens.

To see how K3 arrived at this design, we'll follow the evolution of Mixture of Experts (MoE) through four architectures.

Mixtral is a clear open-weight example of the basic pattern: route each token to a few full-size experts. DeepSeekMoE divided that work among finer-grained and shared experts. LatentMoE then compressed the routed path so those experts could work in a smaller space. Finally, K3 adopted it as Stable LatentMoE, adding mechanisms for numerical stability and balanced routing across 896 experts per layer.

Along the way, you'll learn how to interpret an MoE model's expert counts and active-parameter numbers, and what they imply for computation and data movement.

Activating only a small subset of experts is what makes MoE attractive, but it creates new bottlenecks. For example, the selected experts' weights still have to be read from GPU memory, and token representations may have to travel between GPUs. The architectures below are best understood as successive attempts to manage these costs.

::: note Prerequisites

This is a conceptual article, so there's nothing to install or run.

- **Helpful:** familiarity with neural networks and the general shape of a Transformer layer: attention followed by a feed-forward network.
- **Not required:** prior knowledge of Kimi K3, Mixture-of-Experts routing, or distributed training. Each is introduced here.
- **No code or tools needed.**

:::

---

## 1. From One Dense Layer to a Mixture of Experts

A Transformer layer performs two different kinds of work.

**Attention** lets tokens exchange information: the representation of one token (roughly, a word or piece of one) can incorporate information from other positions in the sequence.

The **feed-forward network**, or FFN, then transforms each token independently. By the time the token reaches the FFN, the relevant context has already been folded into its current numerical representation.

In a dense Transformer, every token goes through the same FFN. The FFN usually contains several large matrices and accounts for a substantial portion of the model's parameters and computation. Making it wider gives the model more capacity, but the added work falls on every token because each one passes through the whole FFN.

A Mixture of Experts, or MoE, changes that arrangement. Instead of one FFN, the layer contains several FFNs with different learned weights. A small **router** examines the token's current representation, scores the available experts, and selects the top few. Only those selected experts process the token, and their outputs are combined into the layer's result.

The final output is the weighted sum of only the selected experts' outputs, where each selected expert contributes in proportion to a router weight. Experts that aren't selected do no FFN computation for that token.

This routing happens independently in every MoE layer. Experts can and often do specialize, and the router learns which combination best fits a token in its current context. But those roles emerge during training: they may overlap and aren't guaranteed to match clean labels such as "Python" or "history." The same word can therefore take different routes in different contexts, and the same token may select different experts at different depths. Each layer also has its own expert pool, so expert 7 in one layer is unrelated to expert 7 in another.

A widely recognized open-weight example was [<VPIcon icon="iconfont icon-arxiv"/>Mixtral 8x7B](https://arxiv.org/html/2401.04088). Each Mixtral layer contains eight FFN experts, and its router selects two for every token. The selected pair can change from token to token and layer to layer.

The name *8x7B* is easy to misread. Mixtral is one Transformer, not eight complete 7-billion-parameter models. Its attention, embeddings, normalization layers, and other shared components exist only once.

What's repeated eight times inside each layer is the FFN: each expert has its own weights and the same `4,096 -> 14,336 -> 4,096` dimensions as the ordinary FFN in Mistral 7B. The router runs only two of those eight FFNs for each token. Mixtral therefore has about 47 billion parameters in total, not 56 billion, while about 13 billion parameters are active for one token. That active count includes both the two selected experts per layer and the model's shared parameters.

It's worth being precise about what this saves. A token still passes through two full-size FFNs in each layer, so Mixtral performs roughly twice the FFN computation of Mistral 7B's single FFN, but only one quarter of what running all eight experts would require. Its advantage isn't a smaller expert or necessarily less computation than the original dense model. It's access to a much larger pool of parameters without running that entire pool for every token.

![Figure 1 (above): A dense layer sends every token through one FFN (left). A Mixture-of-Experts layer keeps many expert FFNs but activates only a few per token (right). Mixtral uses 2 of 8. Total parameters grow while the work per token stays much smaller.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/113f5ea8-5a9b-4777-be7f-09d256a0d790.png)

---

## 2. How MoE Evolved Beyond Mixtral

Mixtral's eight experts are therefore eight **standard-width FFNs**, not eight smaller slices of one FFN. Selecting more of them would let a token combine more learned transformations, but each additional Mixtral-sized expert would add substantial computation. [<VPIcon icon="iconfont icon-arxiv"/>DeepSeekMoE](https://arxiv.org/html/2401.06066) asked whether the same compute budget could instead be divided among more, smaller experts.

An FFN usually expands the token vector into a wider internal layer, transforms it there, and then reduces it back to the token vector's original size.

For example, a 2,000-dimensional token vector might be expanded into an 8,000-dimensional internal representation, then projected back to 2,000 dimensions. It must return to 2,000 so its result can continue through the rest of the model.

DeepSeek makes an expert smaller by narrowing that **internal** layer. If the capacity of one large expert is replaced by four narrower experts, the router can select roughly four times as many while keeping the amount of expert computation similar. The token therefore receives contributions from several smaller FFNs instead of one or two large ones. This doesn't guarantee that every expert learns a clean specialty, but it gives training a finer set of building blocks to work with.

DeepSeekMoE adds a second idea: **shared experts**. Routed experts process only the tokens that select them, but a shared expert processes every token.

Think of the shared expert as common library code. If several routed experts all need the same general transformation, having each learn its own copy wastes parameters. The shared expert can learn that reusable work once and contribute it to every token, leaving the routed experts more room for transformations that differ across contexts.

DeepSeek calls this capturing **common knowledge**. The designers don't assign it a skill such as grammar or programming. Training decides what reusable work it learns.

![Figure 2 (above): A conceptual illustration of DeepSeekMoE's two changes: replace a few large routed FFNs with more, smaller routed FFNs, and add an always-on shared FFN. The boxes are illustrative rather than DeepSeek-V3's literal expert count. DeepSeek-V3 uses one shared expert and 256 routed experts in each MoE layer, selecting eight routed experts per token.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/6d264319-26a8-4b9a-97d1-44eccc1d8ffe.png)

DeepSeek-V3 scales this pattern up: most of its layers use one shared expert and 256 routed experts, with eight routed experts selected for each token. More experts create more available capacity, but they also make the physical execution of the model harder.

Two costs matter for the next step of our story.

The first cost appears **inside a GPU**. An expert's learned weights are matrices stored in the GPU's high-bandwidth memory, or HBM. Before the GPU can apply an expert, those matrices must be read by the hardware that performs the multiplications.

When many tokens use the same expert together, the GPU can reuse chunks of the expert's weights across many token calculations. When only a few tokens reach an expert, it must move a large amount of weight data for relatively little arithmetic, so its computing units may spend much of their time waiting for those bytes.

The bottleneck is then not how quickly the GPU can multiply numbers, but how quickly it can deliver the weights to its computing units. That delivery rate is called **memory bandwidth**, and it can determine the speed of low-latency MoE serving.

The second cost appears **between GPUs**. A model with hundreds of experts can't usually keep every expert on every GPU, so the expert pool is distributed across them.

Suppose a token is represented by a vector of 7,168 numbers, as in DeepSeek-V3. If its router selects experts stored on other GPUs, the system sends the entire 7,168-number vector to each selected expert's GPU. Each expert returns another vector of the same length, and those results are combined. This exchange of token vectors among many GPUs is called **all-to-all communication**.

This reveals what fine-graining does and does not solve. Narrowing the internal layer makes each individual expert smaller, but DeepSeek activates proportionally more of them to keep total expert computation roughly unchanged.

The token vector sent to each selected expert also stays the same length. Selecting more experts can therefore mean sending more complete copies between GPUs, even though each expert is smaller inside. Fine-graining creates a more flexible set of building blocks. It doesn't compress the route into and out of them.

That distinction motivates [<VPIcon icon="iconfont icon-arxiv"/>LatentMoE](https://arxiv.org/html/2601.18089): what if the model compressed the token vector **before** sending it to the routed experts, performed the expert work in that smaller space, and expanded it again only after the results returned?

---

## 3. LatentMoE: Compress the Expert Path

[<VPIcon icon="iconfont icon-arxiv"/>LatentMoE](https://arxiv.org/html/2601.18089) was introduced by an NVIDIA research team and adopted in the Nemotron 3 model family. Kimi K3 didn't invent the underlying architecture. Rather, it adopts LatentMoE and adds the stability changes discussed in the next section.

The central move is straightforward. Before a token is dispatched to the routed experts, LatentMoE projects its full representation into a smaller **latent space**. The routed experts operate entirely in that smaller space. Their outputs are combined there and projected back to the model's full width afterward. Here, *latent* means the routed experts' compressed workspace.

The router still examines the original full-width token representation. The shared experts also remain full width. Only the path through the routed experts is compressed.

![Figure 3 (above): LatentMoE compresses only the routed path. In Kimi K3, one shared down-projection changes the routed representation from 7,168 dimensions to 3,584 before it reaches the selected experts. Their weighted outputs are combined and normalized once, then one shared up-projection restores 7,168 dimensions. The router and two shared experts continue to use the original 7,168-dimensional representation.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/17b2ef73-83de-4bac-bc53-21461fce6ce5.png)

This shorter routed interface cuts two costs at once. First, each routed expert's input and output matrices connect to 3,584 dimensions rather than 7,168, so they contain fewer weights and require less weight data to be read when the expert runs.

Second, when experts are spread across GPUs, the system sends a 3,584-dimensional vector to each selected expert instead of the original 7,168-dimensional one. The selected experts return vectors of the same shorter length, and those results are combined and projected back to 7,168 dimensions. In K3's half-width design, each routed message therefore carries half as many values.

LatentMoE can spend those savings in two ways: keep the same number of active experts and lower inference cost, or increase both the available experts and the number selected per token without letting weight movement and cross-GPU communication grow as they would at the original width.

This differs from DeepSeek's fine-graining, which narrows the middle of each FFN but leaves its entrance and exit unchanged. The two ideas are compatible because they shrink different dimensions.

Compression still has a limit. If the latent representation becomes too short, its down-projection may discard information the experts need, and the shared down- and up-projections add computation of their own.

The latent width is therefore a balance to strike, not a number to minimize: Kimi K3 settles on 3,584 dimensions, half its 7,168-dimensional model width. That makes the routed path cheap enough to widen the expert pool dramatically, which raises the next problem: keeping so many experts stable during training.

---

## 4. How Kimi K3 Makes LatentMoE Stable

Kimi K3 has 93 backbone layers. The first uses a dense FFN, while the remaining 92 use **Stable LatentMoE**. Each of those 92 layers has its own router and its own pool of 896 routed experts. The phrase "16 of 896" therefore describes a separate routing decision at every MoE layer, not one global pool shared across the whole model.

For a token arriving at one of those layers:

1. The router scores all 896 routed experts and selects 16.
2. Two full-width shared experts process the token regardless of that selection.
3. The routed path projects the token from 7,168 dimensions to 3,584.
4. The 16 selected latent experts process that smaller representation.
5. Their weighted outputs are combined, normalized, and projected back to full width.
6. The routed and shared results are added together.

This arrangement helps K3 place 2.8 trillion parameters in the model while activating about 104 billion for one token.

But the scale also magnifies three training problems. Stable LatentMoE adds one targeted mechanism for each.

![Figure 4 (above): Stable LatentMoE addresses three separate problems: RMSNorm steadies the routed branch's scale, SiTU-GLU caps unusually large activations, and Quantile Balancing sets selection biases toward an even global load without changing the contribution weights of selected experts.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/ad080ec3-822c-4fff-aa1e-2df126850e30.png)

### Problem 1: the combined expert output can vary in scale.

Different tokens select different expert combinations with different routing weights, so the overall magnitude of the combined routed representation can vary before it reaches the up-projection.

K3 inserts **RMSNorm** after the selected expert outputs are combined and before they're projected from 3,584 dimensions back to 7,168. RMSNorm doesn't make the experts identical or erase what they computed. It rescales their combined result so the up-projection receives an input with a more consistent overall magnitude.

### Problem 2: two large internal values can multiply into an activation spike.

LatentMoE first uses a shared projection to compress the token from 7,168 to 3,584 dimensions. Inside each selected expert, two bias-free learned linear projections produce 3,072-dimensional pre-activations `g` (gate) and `v` (value). SiTU-GLU transforms the gate into `4 tanh(g/4) sigmoid(g)` and the value into `25 tanh(v/25)`, then multiplies them element-wise. The 3,072-dimensional product passes through a third bias-free linear projection, which returns a 3,584-dimensional expert result for aggregation.

These three projections, the nonlinear transformations, and the multiplication together form one gated expert FFN.

![Figure 5 (above): Orange projections belong to the shared LatentMoE wrapper, and blue projections belong to one selected expert. The expert performs its gated calculation in a temporary 3,072-dimensional workspace and returns a 3,584-dimensional result, the common shape required for expert aggregation.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/ec7610a8-618c-493a-a409-86bf981e7a6e.png)

Following either the gate branch or the value branch, a signal passes through exactly **four learned matrix multiplications**: the shared LatentMoE down-projection, that branch's expert input projection, the expert output projection, and the shared LatentMoE up-projection.

The K3 paper calls this "nearly four consecutive matrix multiplications" because the computation isn't one uninterrupted linear chain: the gate and value projections run in parallel and meet through SiTU and element-wise multiplication, then selected expert outputs are aggregated and normalized before the final projection. So the four matrix operations can't be collapsed into one matrix multiplication.

The K3 authors describe the combined structure as ill-conditioned and report exploding internal activations at their model's scale. In low precision, a large outlier can overflow or force a shared quantization scale to sacrifice accuracy for ordinary values.

The multiplication inside **SwiGLU** is one source of that unbounded growth. Its value branch produces candidate values, while its gate branch uses Swish to modulate how strongly each value passes through. The linear factor inside the Swish gate and the value branch can both grow without bound, so two large elements can produce a much larger product.

So K3 replaces SwiGLU with **SiTU-GLU** (Sigmoid Tanh Unit GLU). SiTU smoothly caps the gate's linear factor at magnitude 4 and the value branch at magnitude 25, while retaining the sigmoid gate and matching SwiGLU near zero. Their element-wise product is consequently bounded in magnitude by `4 x 25 = 100` before the expert output projection. That later projection can still change the scale, but the multiplication inside the expert is no longer unbounded.

![Figure 6 (above): An illustrative one-dimensional slice in which both branch inputs equal the same scalar x. SiTU-GLU follows SwiGLU near the origin but approaches a magnitude limit of 100, while SwiGLU continues growing. In the real expert, separate learned projections produce the two branch vectors and combine them element by element.](https://cdn.hashnode.com/uploads/covers/6a886cdef885c594c22bbde2/86da1d0b-a0a2-4c3b-a157-2b3eeb935a4f.png)

### Problem 3: routing can become uneven.

The router gives every expert an affinity score for each token, then selects the 16 highest-scoring experts. Because the router is learned, some experts can attract far more tokens than others. Those experts become hardware bottlenecks, while rarely selected experts receive too little training to become useful.

A common response is to add a balancing loss to the model's training objective, but that makes the optimizer trade prediction quality against even expert use.

DeepSeek-V3 instead made its primary global balancing method **auxiliary-loss-free**. It maintains a separate selection bias for each expert: after a training step, an underused expert's bias rises by a fixed amount, while an overloaded expert's bias falls by that amount.

The method works, but the update size must be chosen carefully. Too small reacts slowly, while too large can make the load oscillate. (DeepSeek-V3 also retained a small sequence-level balancing loss as a safeguard against extreme imbalance within one sequence.)

K3 keeps the expert-specific selection biases but replaces the fixed adjustment with **Quantile Balancing**. It examines how an expert's scores are distributed across the global training step and calculates a different adjustment for each expert: a larger correction when the scores indicate that more movement is needed, and a smaller one when the expert is already near its target load. It's called *quantile* balancing because the update is chosen from a target percentile of that expert's score margins, rather than moving every bias by the same preset amount.

The bias changes **which experts are selected**, not how strongly their outputs contribute. K3 ranks experts using the biased scores, but derives the selected experts' contribution weights from their original scores without the bias. The newly calculated biases take effect on the next training step, and the final biases are frozen during inference.

Quantile Balancing targets an even aggregate load across the global training step, not equal expert use within every sentence or sequence. Its purpose is narrower: keep training opportunities and distributed computation from concentrating on too small a part of the 896-expert pool.

---

## Conclusion: Making Sparse Capacity Usable

A dense Transformer sends every token through the same FFN. Mixtral showed the basic MoE alternative: keep several full FFNs and route each token to only a few. DeepSeekMoE then divided that work into more, smaller routed experts and added shared experts for transformations used across many contexts.

LatentMoE changes a different dimension. Instead of sending the model's full token representation to every selected expert, it compresses the routed interface, performs the expert computation in that smaller space, and restores the original width afterward. This reduces both routed-expert weight traffic and the amount of token data exchanged between GPUs.

Kimi K3 pushes that design to 896 routed experts per MoE layer, with 16 selected for each token. At that scale, compression alone isn't enough. RMSNorm controls the scale of the combined routed result, SiTU-GLU bounds the multiplicative activation inside each expert, and Quantile Balancing distributes training assignments without adding the balancing bias to the experts' contribution weights.

The central lesson isn't simply that MoE activates fewer parameters. Increasing sparse capacity creates new numerical, routing, and communication constraints, and the architecture must address them together. Stable LatentMoE is K3's answer at the model level.

::: info Extended reading

For a deeper look at the sequence-memory side of Kimi K3, see [<VPIcon icon="fas fa-globe"/>From GPT-2 to Kimi K3: How Language Models Learned to Manage Memory](https://ai.gopubby.com/from-gpt-2-to-kimi-k3-how-language-models-learned-to-manage-memory-e0e08ac195be).

:::

::: info References

```component VPCard
{
  "title": "Mixtral of Experts",
  "desc": "We introduce Mixtral 8x7B, a Sparse Mixture of Experts (SMoE) language model. Mixtral has the same architecture as Mistral 7B, with the difference that each layer is composed of 8 feedforward blocks (i.e. experts). For every token, at each layer, a router network selects two experts to process the current state and combine their outputs. Even though each token only sees two experts, the selected...",
  "link": "https://arxiv.org/html/2401.04088",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

```component VPCard
{
  "title": "DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models",
  "desc": "In the era of large language models, Mixture-of-Experts (MoE) is a promising architecture for managing computational costs when scaling up model parameters. However, conventional MoE architectures like GShard, which activate the top-K out of N experts, face challenges in ensuring expert specialization, i.e. each expert acquires non-overlapping and focused knowledge. In response, we prop ...",
  "link": "https://arxiv.org/html/2401.06066",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

```component VPCard
{
  "title": "DeepSeek-V3 Technical Report",
  "desc": "We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. To achieve efficient inference and cost-effective training, DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architectures, which were thoroughly validated in DeepSeek-V2. Furthermore, DeepSeek-V3 pioneers an auxiliary-loss-free strategy for loa...",
  "link": "https://arxiv.org/html/2412.19437",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

```component VPCard
{
  "title": "LatentMoE: Toward Optimal Accuracy per FLOP and Parameter in Mixture of Experts",
  "desc": "Abstract. Mixture of Experts (MoEs) have become a central component of many state-of-the-art open-source and proprietary large language models. Despite their widespread adoption, it remains unclear how close existing MoE architectures are to optimal with respect to inference cost, as measured by accuracy...",
  "link": "https://arxiv.org/html/2601.18089",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

```component VPCard
{
  "title": "Kimi K3: Open Frontier Intelligence",
  "desc": "We introduce Kimi K3, a 2.8T parameter Mixture-of-Experts model with 104 billion activated parameters, native vision capabilities, and a 1-million-token context window. Kimi K3 is built on Kimi Delta Attention  and Attention Residuals [60], which improve information flow across sequence length and model depth. Together with Stable LatentMoE, which ef...",
  "link": "https://arxiv.org/html/2607.24653/",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

```component VPCard
{
  "title": "Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts",
  "desc": "For Mixture-of-Experts (MoE) models, an unbalanced expert load will lead to routing collapse or increased computational overhead. Existing methods commonly employ an auxiliary loss to encourage load balance, but a large auxiliary loss will introduce non-negligible interference gradients into training and thus impair the model performance. In order to control load balance while not producing undesired gradients during training, we propose Loss-Free Balancing, featured by an auxiliary-loss-free load balancing strategy. To be specific, before the top-K routing decision, Loss-Free Balancing will first apply an expert...",
  "link": "https://arxiv.org/html/2408.15664",
  "logo": "https://arxiv.org/static/browse/0.3.4/images/icons/favicon-16x16.png",
  "background": "rgba(40,38,35,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Mixtral to Kimi K3: How Mixture-of-Experts Models Evolved",
  "desc": "In this article, we'll discuss how Mixture-of-Experts models grew from a handful of experts to nearly 900 per layer, and the compression and stability mechanisms that keep such a sparse design trainab",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-mixtral-to-kimi-k3-how-mixture-of-experts-models-evolved.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
