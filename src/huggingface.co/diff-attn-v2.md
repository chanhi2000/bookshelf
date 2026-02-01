---
lang: en-US
title: "Differential Transformer V2"
description: "Article(s) > Differential Transformer V2"
icon: fas fa-language
category:
  - AI
  - LLM
  - Microsoft
  - Mathematics
  - Science
  - Article(s)
tag:
  - blog
  - huggingface.co
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
  - science
  - mathematics
  - math
  - microsoft
  - youtube
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Differential Transformer V2"
    - property: og:description
      content: "Differential Transformer V2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/huggingface.co/diff-attn-v2.html
prev: /ai/llm/articles/README.md
date: 2026-01-20
isOriginal: false
author: 
  - name: Li Dong
    url: https://huggingface.co/unilm
  - name: Tianzhu Ye
  - name: Yutao Sun
  - name: Furu Wei
cover: https://cdn-uploads.huggingface.co/production/uploads/5df85abada6d0311fd3d5408/ULgU7-Z51YYJN4fl1FnWH.jpeg
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

```component VPCard
{
  "title": "Mathematics > Article(s)",
  "desc": "Article(s)",
  "link": "/academcis/math/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Differential Transformer V2"
  desc="A Blog post by Microsoft on Hugging Face"
  url="https://huggingface.co/blog/microsoft/diff-attn-v2"
  logo="https://huggingface.co/favicon.ico"
  preview="https://cdn-uploads.huggingface.co/production/uploads/5df85abada6d0311fd3d5408/ULgU7-Z51YYJN4fl1FnWH.jpeg"/>

::: info Github Link

<SiteInfo
  name="unilm/Diff-Transformer/Diff-Transformer-V2 at master · microsoft/unilm"
  desc="Large-scale Self-supervised Pre-training Across Tasks, Languages, and Modalities - microsoft/unilm"
  url="https://github.com/microsoft/unilm/tree/master/Diff-Transformer/Diff-Transformer-V2/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6936944b06147a3b61c4c39dc0e48ec900a67fd8de103f47a96a85c0ac963d19/microsoft/unilm"/>

:::

::: info Notion Link (for better readability)

<SiteInfo
  name="Differential Transformer V2"
  desc="A tool that connects everyday work into one space. It gives you and your teams AI tools—search, writing, note-taking—inside an all-in-one, flexible workspace."
  url="https://spiky-homegrown-4cb.notion.site/Differential-Transformer-V2-2e7baa052def80ecaa93d4d67d125417"
  logo="https://spiky-homegrown-4cb.notion.site/images/favicon.ico"
  preview="https://notion.so/images/meta/default.png"/>

:::

---

## Abstract

We introduce **Differential Transformer V2** (DIFF V2), an improved version of [<VPIcon icon="iconfont icon-arxiv"/>Differential Transformer](https://arxiv.org/abs/2410.05258) (DIFF V1). This revision focuses on inference efficiency, training stability for production-level LLMs, and architectural elegance.

Key improvements:

1. **Faster Inference & No Need of Custom Attention Kernels** Instead of forcing the attention parameter count to match the baseline [<VPIcon icon="iconfont icon-arxiv"/>Transformer](https://arxiv.org/abs/1706.03762) (as in DIFF V1), we introduce additional parameters (borrowed from other parts of the model) for $Q_2$​. This design allows DIFF V2 to match the baseline Transformer's decoding speed and directly use [FlashAttention (<VPIcon icon="iconfont icon-github" />`Dao-AILab/flash-attention`)](https://github.com/Dao-AILab/flash-attention) without custom kernels.
2. **Improved Training Stability** We remove the per-head RMSNorm after differential attention. We find the per-head RMSNorm can lead to instability in later stages of large-scale pretraining of LLM.
3. **Simpler Parameterization & Initialization** We replace the globally shared $\lambda$ with a token-specific, head-wise projected $\lambda$. This eliminates the exponential re-parameterization and initialization of $\lambda$.

We conduct pretraining experiments on production-scale LLMs, including dense models and a 30A3 MoE on trillions of tokens using large learning rate of $6e-4$ to $1e-3$. Experimental observations:

- **Notably lower language modeling loss** compared to Transformer.
- **Reduced loss and gradient spikes during training**, particularly under large learning rate settings where the Transformer baseline becomes unstable.
- **Reduced activation outliers magnitude.**

The experiments are still running. We expect to explore in later stages of training:

- If learning efficiency is improved in mid- and post-training.
- If performance on downstream long-context benchmarks improves (alleviating context rot).

After the experiments complete and we evaluate the results, we will prepare a more formal report.

---

## Code

We compare DIFF V2 with DIFF V1 below:

(For simplicity, we omit the batch dimension and assume that both the input and output of the following `flash_attn_func` are three-dimensional tensors `(tokens, heads, head dimension)`. Heads belonging to the same GQA group are arranged contiguously in the output)

**Note DIFF V2 subtracts two heads that are in the same GQA group, which means they share the same key and value. This is crucial to performance.** See design ablations section and Github code.

```py
def DiffAttnV1(
    layer_index, q1, q2, k1, k2, v,
    lam_q1, lam_k1, lam_q2, lam_k2,
):
    """
    q1, q2: (N, h/2, d)
    k1, k2: (N, h_kv/2, d)
    v:      (N, h_kv/2, 2d)
    lam_*: (d,)
    """
    attn1 = flash_attn_func(q1, k1, v)
    attn2 = flash_attn_func(q2, k2, v)
        
    lam_init = 0.8 - 0.6 * \
        exp(-0.3 * layer_index)
    lam1 = exp(sum(lam_q1 * lam_k1)
    lam2 = exp(sum(lam_q2 * lam_k2)
    lam = lam1 - lam2 + lam_init
    attn = attn1 - lam * attn2
    
    attn = rmsnorm(attn)
    attn = attn * (1 - lam_init)
    return attn
```

```py
def DiffAttnV2(
        q, k, v, lam
):
    """
    q:   (N, 2h, d)
    k:   (N, h_kv, d)
    v:   (N, h_kv, d)
    lam: (N, h, 1)
    """
        
    attn = flash_attn_func(q, k, v)
    attn1, attn2 = (attn[:, 0::2], 
                    attn[:, 1::2])
        
    lam_val = sigmoid(lam)
    attn = attn1 - lam_val * attn2
    return attn
```

Full code at: [unilm/Diff-Transformer/Diff-Transformer-V2 at master · microsoft/unilm (<VPIcon icon="iconfont icon-github" />`microsoft/unilm`)](https://github.com/microsoft/unilm/tree/master/Diff-Transformer/Diff-Transformer-V2) In the script, `h` represents number of query heads, `h_kv` represents number of key-value heads, and `d` means head dimension. The $\lambda$ in DIFF V2 is projected from $X$ for each token each head.

DIFF V2 doubles number of query heads while maintaining number of key value heads, and the extra dimension is reduced back to `h*d` after the differential operation so the $W_O$​ projection remains the same as baseline Transformer.

---

## Motivation

### Faster Decoding & No Custom Kernels

DIFF V2 introduces additional query heads compared to the baseline Transformer, **but does not increase the number of key-value (KV) heads**. Since LLM decoding is typically memory-bound, this design allows DIFF V2 to achieve decoding speeds on par with standard Transformer. **Besides, since head dimension is aligned between query, key and value, there is no need for custom attention kernels for DIFF V2**. In contrast, DIFF V1 can be slower during decoding because the value cache must be loaded twice, and a custom attention kernel is needed. DIFF V2 can also increase the arithmetic intensity of the attention module during decoding.

**During pretraining**, when using cutting-edge FlashAttention kernels on H-series and B-series GPUs, the throughput reduction introduced by DIFF V2 is negligible. **For long-sequence prefilling**, we recommend combining DIFF V2 with techniques such as [YOCO](https://arxiv.org/abs/2405.05254) (also used in [Gemma 3n (<VPIcon icon="iconfont icon-github" />`huggingface/transformers`)](https://github.com/huggingface/transformers/blob/main/src/transformers/models/gemma3n/modeling_gemma3n.py)), which already reduces prefilling complexity to linear time with respect to sequence length.

**An alternative perspective is to compare DIFF V2 with a Transformer that has the same query dimension** `2h*d`. Under this comparison, both models exhibit same attention kernel speed, while DIFF V2 has less parameters and flops in output projection.

### Softmax Magnitude Constraint

In the standard Scaled Dot-Product Attention (SDPA), let $Q,K,V\in\mathbb{R}^{n\times{d}}$ be the queries, keys, and values. The context vector $C$ is defined as:

$$
C=\text{Softmax}\left(\frac{QK^T}{\sqrt{d}}\right)V = AV
$$

Where $A\in\mathbb{R}^{n\times{n}}$ is the attention weight matrix. Let's focus on a single row of $C$, denoted as $\mathbf{c}_i$​, which is a weighted sum of value vectors $\mathbf{v}_j$​:

$$
\mathbf{c}_i = \sum_{j=1}^{n}a_{ij}\mathbf{v}_j
$$

We define the **Context RMS** (Root Mean Square) to represent the magnitude of this output:

$$
\text{RMS}(\mathbf{c}_i)=\sqrt{\frac{1}{d}\|\mathbf{c}_i\|^2}
$$

The weights hts $a_{ij}$ are non-negative and sum to 1 ($\sum_{j=1}^{n}a_{ij}=1$). Assume the value vectors $\mathbf{v}_j$ are uncorrelated and have an RMS of 1, **the Context RMS is strictly bounded in rangee $[\frac{1}{\sqrt{n}},1)$ however the attention distribution changes**:

- If the attention is focused entirely on one token, the Context RMS is $1$.
- If the attention is spread equally across all tokens ($a_{ij}=\frac{1}{n}$), the Context RMS drops to  $\frac{1}{\sqrt{n}}$.
- In other situations, the Context RMS is between $\frac{1}{\sqrt{n}}$ and $1$. In DIFF V1 we add a per-head RMSNorm on context vectors:

$$
\mathbf{\hat{c}}_i = \frac{\mathbf{c}_i}{\text{RMS}(\mathbf{c}_i)}
$$

If the model learns a uniform attention distribution in a head, the Context RMS is approximately $1/\sqrt{n}$. To normalize this back to $1$, RMSNorm must multiply the vector by a scale of $\sqrt{n}$​. For $n=8192$, $\sqrt{n}\approx90.5$. This means the RMSNorm layer applies a **100x** magnification to the output. In large-scale pretraining, we find this leads to massive gradients and numerical instability.

A typical phenomenon is that when DIFF V1 is pre-trained at a large learning rate, the gradient norm experiences a larger increase compared to Transformer in the later stages, along with higher variance. **In DIFF V2, after removing the per-head RMSNorm, the gradient norm scale becomes comparable to that of Transformer, and the gradient norm spike is reduced** (will be discussed further below).

We adopted the per-head RMSNorm design in DIFF V1 primarily because of the doubled value head dimension and the globally shared $\lambda$ across all tokens. Given the modifications made to these two aspects in DIFF V2, we found that removing RMSNorm is now safe.

### Beyond Softmax Constraint & Elimination of Attention Sinks

We demonstrate DIFF V2 can overcome the constraint of Softmax mentioned above. It can also help eliminate [<VPIcon icon="iconfont icon-arxiv"/>attention sinks](https://arxiv.org/abs/2309.17453).

- In original Softmax attention:

$$
\begin{align*}
a_{ij}&=\text{Softmax}(z_{ij})=\frac{\exp(z_{ij})}{\sum_{k=1}^{n} \exp(z_{ik})}\\
\mathbf{c}_i&=\sum_{j=1}^{n} a_{ij}\mathbf{v}_j=\sum_{j=1}^{n}\text{Softmax}(z_{ij})\mathbf{v}_j
\end{align*}
$$

$$
\text{RMS}(\mathbf{c}_i)\in\left[\frac{1}{\sqrt{n}},1\right)
$$

- In DIFF V2 we introduce a projected $\lambda$ for each token and each head:

$$
\begin{align*}
\mathbf{c}_i&=\sum_{j=1}^{n}\left(\text{Softmax}(z_{ij}^\text{1})-\text{sigmoid}(\lambda_i) \cdot\text{Softmax}(z_{ij}^\text{2})\right)\mathbf{v}_j
\end{align*}
$$

$$
\text{RMS}(\mathbf{c}_i)\in\left(0,\sqrt{2}\right)
$$

The projected $\lambda_i$​ helps to control the context RMS. We observe that **lowering the lower bound of the context RMS to zero is particularly important**. **It can help eliminate attention sinks and improve training stability**. The upper bound only needs to remain bounded.

Note that our analysis here consider RMS before output projection $W_O$​. Although the RMS can be recovered and adjusted after the output projection, the lack of freedom at Softmax still affects the learning performance.

Other recent works alleviate this constraint as well:

- In [<VPIcon icon="fas fa-globe"/>Attention Is Off By One](https://evanmiller.org/attention-is-off-by-one.html):

$$
\begin{align*}
a_{ij}^{\text{off}}&=\frac{\exp(z_{ij})}{1 + \sum_{k=1}^{n} \exp(z_{ik})} \\
\mathbf{c}_i&=\sum_{j=1}^{n} a_{ij}^{\text{off}}\mathbf{v}_j=\frac{\sum_{k=1}^{n}\exp(z_{ik})}{1+\sum_{k=1}^{n}\exp(z_{ik})}\sum_{j=1}^{n}\text{Softmax}(z_{ij})\mathbf{v}_j
\end{align*}
$$

$$
\text{RMS}(\mathbf{c}_i) \in \left(0, 1\right
$$

- In [<VPIcon icon="iconfont icon-openai"/>gpt-oss](https://openai.com/index/introducing-gpt-oss/), a learnable scalar sss is introduced for each head:

$$
\begin{align*}
a_{ij}^{\text{oss}}&=\frac{\exp(z_{ij})}{\exp(s)+\sum_{k=1}^{n}\exp(z_{ik})} \\
\mathbf{c}_i&=\sum_{j=1}^{n} a_{ij}^{\text{oss}}\mathbf{v}_j=\frac{\sum_{k=1}^{n} \exp(z_{ik})}{\exp(s)+\sum_{k=1}^{n}\exp(z_{ik})}\sum_{j=1}^{n}\text{Softmax}(z_{ij})\mathbf{v}_j
\end{align*}
$$

$$
\text{RMS}(\mathbf{c}_i) \in \left(0, 1\right)
$$

- In [<VPIcon icon="iconfont icon-arxiv"/>Gated Attention](https://arxiv.org/abs/2505.06708), a projected element-wise sigmoid gate is multiplied:

$$
\mathbf{c}_i=\text{sigmoid}(\mathbf{g}_i)\odot\sum_{j=1}^{n}\text{Softmax}(z_{ij})\mathbf{v}_j \\
\text{RMS}(\mathbf{c}_i) \in \left(0, 1\right)
$$

---

## Experimental Observations

We conduct pretraining experiments on production-scale LLMs, including dense models and a 30A3 MoE on trillions of tokens using large learning rate of 6e-4 to 1e-3. The experiments are still running. What we have observed now:

- **Notably lower language modeling loss** compared to Transformer (a gap of 0.02 to 0.03 at 1T training tokens).
- **Reduced loss and gradient spikes during training**, particularly under large learning rate settings where the Transformer baseline becomes unstable.
- **Reduced activation outliers magnitude.**

We expect to explore in later stages of training:

- Learning efficiency in mid- and post-training.
- Performance on downstream long-context benchmarks (alleviating context rot).

---

## Discussions

### Construction of Differential Operation

In theory, a standard Transformer with $2h$ attention heads can learn the differential operation by learning $W_O^{2i}=-W_O^{2i+1}, i=0,1,\ldots,h-1$, where $W_O^{i}$ denotes the output projection of head $i$, and head $2i$ and $2i+1$ belong to the same GQA group.

**Assumption 1.** In practice, such a solution is difficult to learn through optimization, as it requires two sets of parameters to converge to exact negatives of each other.

**Assumption 2.** The differential operation can be learned by the model and the model chooses to learn it in the training. **Then explicitly constructing it before the output projection as in DIFF V2 can save half of the $W_O$​ parameters**. The number of saved parameters is also non-trivial. Under the current GQA setting, the parameters in the attention module are dominated by $W_Q$​ and $W_O$​; Therefore, approximately **25% of the attention-module parameters can be saved.** The saved parameter budget can then be reallocated to other parts of the model.

Even if DIFF V2, after reallocating parameters, does not achieve a lower loss than the baseline but merely matches it, **the method is still worthwhile if it provides additional benefits** such as improved training stability, better control of outliers, or higher training efficiency. This is analogous to [<VPIcon icon="iconfont icon-arxiv"/>GQA](https://arxiv.org/abs/2305.13245), which matches the loss of MHA while reducing KV-cache as an additional benefit. So the key question becomes empirical performance.

### Design Ablations

1. Subtracting two heads that are **not** in the same GQA group, which means they **do not** share the same key and value.

(For simplicity, we omit the batch dimension and assume that both the input and output of the following `flash_attn_func` are three-dimensional tensors `(tokens, heads, head dimension)`. Heads belonging to the same GQA group are arranged contiguously in the output)

```py
# Ablation 1
# ❌ Wrong Implementation of DIFF V2!
...
attn = flash_attn_func(q, k, v)
nh = attn.size(1)
attn1, attn2 = (attn[:, :nh//2], 
                    attn[:, nh//2:])
...
```

```py
# DIFF V2
# ✅ Correct Implementation of DIFF V2
...
attn = flash_attn_func(q, k, v)

attn1, attn2 = (attn[:, 0::2], 
                    attn[:, 1::2])
...
```

In our large learning rate setting, the ablation 1 setting exhibits obvious training instability (much more loss and gradient spikes) and higher loss comparing to DIFF V2. The value should be shared in the two subtraction heads to construct differential operation, as discussed in DIFF V1 paper.

2. Subtracting two attention maps without $\lambda$ scaling factor, i.e., `attn1 - attn2` instead of `attn1 - lam_val * attn2`. This results in an excessively small context RMS at initialization.

3. Directly using projected $\lambda$ without applying `sigmoid` operation. The context RMS is unbounded from above.

Both ablation 2 and ablation 3 lead to higher language modeling loss than DIFF V2. Ablation 2 maintains training stability similar to DIFF V2, whereas ablation 3 is less stable (still more stable than ablation 1).

4. A Transformer with `1.5*h` heads which aligns parameter with DIFF V2. Ablation 4 also has higher training loss comparing to DIFF V2. ### Miscellaneous

- In DIFF, the outliers in qk logits can be smaller than those in the baseline. This was already analyzed in DIFF V1: DIFF can achieve attention sparsity comparable to the baseline while using smaller qk logits. We further propose that DIFF's differential mechanism, which cancels out small attention values, **may help mitigate the attention rounding error issue discussed in this [<VPIcon icon="fas fa-globe"/>blog](https://spaces.ac.cn/archives/11371) and [<VPIcon icon="iconfont icon-arxiv"/>paper](https://arxiv.org/abs/2510.04212)**.
- **DIFF V2 is compatible with sparse attention**. In many existing sparse attention frameworks, query heads within the same GQA group are required to attend to the same key-value blocks in order to maximize speedup. A common strategy is to select key-value blocks based on the average attention logits across heads. For DIFF V2, the problem shifts to designing an effective block-selection strategy for a larger GQA group that contains pairs of differential heads. This may require handling the two types of differential heads separately during selection, or maybe a simple average of attention logits might already be sufficient in practice. Conceptually, this does not introduce any fundamental differences compared to block sparse attention of standard Transformers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Differential Transformer V2",
  "desc": "A Blog post by Microsoft on Hugging Face",
  "link": "https://chanhi2000.github.io/bookshelf/huggingface.co/diff-attn-v2.html",
  "logo": "https://huggingface.co/favicon.ico",
  "background": "rgba(11,15,25,0.2)"
}
```
