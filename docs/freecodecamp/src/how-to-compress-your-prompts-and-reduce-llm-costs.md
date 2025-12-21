---
lang: en-US
title: "How to Compress Your Prompts and Reduce LLM Costs"
description: "Article(s) > How to Compress Your Prompts and Reduce LLM Costs"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Compress Your Prompts and Reduce LLM Costs"
    - property: og:description
      content: "How to Compress Your Prompts and Reduce LLM Costs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-compress-your-prompts-and-reduce-llm-costs.html
prev: /programming/py/articles/README.md
date: 2025-11-19
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763493041384/75c787b8-6e41-4733-bf8d-815170196b5b.png
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Compress Your Prompts and Reduce LLM Costs"
  desc="Every developer working with large language models eventually faces the same challenge: prompts keep getting longer, models keep getting slower, and API bills keep getting higher. Whether you’re building a retrieval-augmented generation (RAG) system ..."
  url="https://freecodecamp.org/news/how-to-compress-your-prompts-and-reduce-llm-costs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763493041384/75c787b8-6e41-4733-bf8d-815170196b5b.png"/>

Every developer working with large language models eventually faces the same challenge: prompts keep getting longer, models keep getting slower, and API bills keep getting higher.

Whether you’re building a [**retrieval-augmented generation**](/freecodecamp.org/mastering-rag-from-scratch.md) (RAG) system or a chatbot that remembers past conversations, every extra token adds cost and latency.

Microsoft quietly introduced a fix that few people outside research circles noticed, with a project called [<VPIcon icon="iconfont icon-github"/>`microsoft/LLMLingua`](https://github.com/microsoft/LLMLingua). It compresses prompts before sending them to a model, keeping only the most important information. The result is faster responses, smaller bills, and an easier path to scaling LLMs.

In this tutorial, we’ll look at how to use LLMLingua to optimze your prompts and make them more efficient while saving costs.

---

## The Problem Hidden in Plain Sight

When an LLM processes a prompt, every token counts toward your cost and the model’s attention limit.

For [<VPIcon icon="fas fa-globe"/>context-heavy applications](https://turingtalks.ai/p/how-ai-agents-remember-things-the-role-of-vector-stores-in-llm-memory), it’s common to hit the maximum token window long before you reach the useful part of your data.

Adding more context may help the model reason better, but it also slows down inference. Long prompts not only take more time to generate responses but also eat into your budget when using APIs like GPT-4 or Claude.

LLMLingua targets this problem directly by compressing prompts intelligently without retraining or modifying the underlying model.

---

## What LLMLingua Does Differently

LLMLingua uses a smaller, compact language model, like GPT-2 Small or LLaMA-7B. This smaller model helps identify and remove non-essential tokens in a given prompt.

Instead of feeding thousands of tokens into your main model, you send a compact version that retains meaning.

This approach achieves up to 20x compression with negligible accuracy loss. In simple terms, LLMLingua lets your LLM read the same content in fewer words.

---

## Working with LLMLingua

Getting started is simple. The library is available on PyPI and works out of the box.

```sh
pip install llmlingua
```

Once installed, you can import it into Python to begin compressing prompts.

Here’s how you can compress a large text prompt using LLMLingua:

```py
from llmlingua import PromptCompressor

# Initialize the compressor
llm_lingua = PromptCompressor()

# Compress the prompt
prompt = "Sam bought a dozen boxes, each with 30 highlighter pens inside, for $10 each box..."

compressed_prompt = llm_lingua.compress_prompt(prompt, instruction="", question="", target_token=200)

print(compressed_prompt)
```

When you run this, you’ll get a dictionary like this:

```py
{
  'compressed_prompt': 'Question: Sam bought a dozen boxes each with 30 highlighter pens...',
  'origin_tokens': 2365,
  'compressed_tokens': 211,
  'ratio': '11.2x',
  'saving': 'Saving $0.1 in GPT-4.'
}
```

You can also load different models depending on your resources.

```py
# Use a more powerful compression model
llm_lingua = PromptCompressor("microsoft/phi-2")

# Or use a quantized model for GPUs with limited memory
# Requires: pip install optimum auto-gptq
llm_lingua = PromptCompressor("TheBloke/Llama-2-7b-Chat-GPTQ", model_config={"revision": "main"})
```

This simple setup can save hundreds of dollars in production if you’re processing long documents or chat histories.

---

## Handling Long Contexts with LongLLMLingua

[<VPIcon icon="fas fa-globe"/>LongLLMLingua](https://llmlingua.com/longllmlingua.html) extends this concept to massive inputs like PDFs, transcripts, or multi-document retrievals. It reorders and filters context dynamically to ensure that the model sees only the most relevant sections.

Here’s how you might use it:

```py
from llmlingua import PromptCompressor

llm_lingua = PromptCompressor()

compressed_prompt = llm_lingua.compress_prompt(
    prompt_list,
    question="What are the main regulatory changes in the last quarter?",
    rate=0.55,
    condition_in_question="after_condition",
    reorder_context="sort",
    dynamic_context_compression_ratio=0.3,
    condition_compare=True,
    context_budget="+100",
    rank_method="longllmlingua",
)
```

This works especially well in RAG systems where documents vary in length and relevance. By combining retrieval with compression, you can fit more context into your LLM without hitting token limits.

---

## LLMLingua-2: Faster and Smarter

Microsoft’s team didn’t stop there. They introduced [<VPIcon icon="fas fa-globe"/>LLMLingua-2](https://llmlingua.com/llmlingua2.html), which is faster and more general-purpose.

It uses data distillation from GPT-4 and a BERT-level encoder to improve compression fidelity.

This version handles out-of-domain data better and performs 3–6 times faster than the original.

```py
from llmlingua import PromptCompressor

# Initialize LLMLingua-2
llm_lingua = PromptCompressor(
    model_name="microsoft/llmlingua-2-xlm-roberta-large-meetingbank",
    use_llmlingua2=True,
)

compressed_prompt = llm_lingua.compress_prompt(prompt, rate=0.33, force_tokens=['\n', '?'])

# Or use a smaller multilingual model
llm_lingua = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    use_llmlingua2=True,
)
```

For multilingual and enterprise scenarios, LLMLingua-2 offers the right balance between cost, accuracy, and speed.

---

## Structured Prompt Compression

Sometimes, you want control over which sections of a prompt should be compressed.

LLMLingua supports structured compression using special tags. You can mark segments of text to compress at different rates or skip entirely.

```py
structured_prompt = """<llmlingua, compress=False>Speaker 4:</llmlingua>
<llmlingua, rate=0.4> Thank you. And can we do the functions for content? Items I believe are 11, three, 14, 16 and 28, I believe.</llmlingua>
<llmlingua, compress=False>Speaker 0:</llmlingua>
<llmlingua, rate=0.4> Item 11 is a communication from Council on Price recommendation...</llmlingua>"""

compressed_prompt = llm_lingua.structured_compress_prompt(
    structured_prompt,
    instruction="",
    question="Summarize the meeting notes",
    rate=0.5,
)
print(compressed_prompt['compressed_prompt'])
```

This feature is especially useful in meeting summarization or note-taking systems where speaker tags or section headers must remain intact.

---

## SecurityLingua: Compression as a Defense

A newer addition, SecurityLingua, uses security-aware compression to detect malicious jailbreak attempts.

It reveals harmful intent hidden within complex prompts and defends against attacks with 100x less token cost compared to traditional guardrails.

```py
from llmlingua import PromptCompressor

securitylingua = PromptCompressor(
    model_name="SecurityLingua/securitylingua-xlm-s2s",
    use_slingua=True
)
intention = securitylingua.compress_prompt(malicious_prompt)
```

This model offers a unique approach: instead of filtering after generation, it prevents malicious instructions from reaching the model in the first place.

---

## Integration with the Ecosystem

One of the reasons LLMLingua stands out is how seamlessly it fits into the modern AI ecosystem.

Instead of being a standalone research prototype, it’s already integrated into popular frameworks like [LangChain](https://turingtalks.ai/p/langchain-vs-langgraph), LlamaIndex, and Microsoft Prompt Flow.

This means you can plug it directly into your existing RAG or document-processing pipelines without rewriting code or changing your models.

For example, in LangChain, LLMLingua acts as a smart middle layer that compresses retrieved context before it reaches the LLM.

Imagine you’re using a retriever to pull documents from a knowledge base. Instead of sending those long texts straight to your model, LLMLingua filters out unnecessary tokens so your prompt stays concise and efficient.

Here’s how you can integrate it:

```py
from langchain_classic.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain_community.document_compressors import LLMLinguaCompressor
from langchain_openai import ChatOpenAI

# Initialize your base model
llm = ChatOpenAI(temperature=0)

# Create an LLMLingua-based compressor
compressor = LLMLinguaCompressor(model_name="openai-community/gpt2", device_map="cpu")

# Wrap your existing retriever with LLMLingua compression
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=retriever  # your existing document retriever
)
# Use it like a normal retriever, but now with smart compression
compressed_docs = compression_retriever.invoke(
    "What did the president say about Ketanji Jackson Brown"
)
pretty_print_docs(compressed_docs)
```

In this setup, the retriever first gathers relevant documents, and LLMLingua compresses them before passing them to the LLM. The model receives a condensed but information-rich prompt, which keeps token usage low while maintaining accuracy.

This integration works out of the box with any supported model on LangChain. It can be customized to use your preferred compression rate or model variant (like LLMLingua-2).

The result is a more efficient pipeline: your LLM reads less but understands more.

---

## Why LLMLingua Matters

LLMLingua may not make headlines like GPT-5 or Gemini, but its impact is fundamental. It addresses the most expensive part of LLM workflows: context handling.

By removing redundant tokens and preserving intent, it transforms how developers build scalable AI applications.

Whether you’re summarizing regulatory data, processing long legal documents, or powering multilingual chatbots, LLMLingua gives you a new lever for optimization.

The takeaway is simple: the future of AI efficiency won’t just come from larger models, but from smarter ones, and smarter prompts.

---

## Conclusion

Microsoft’s LLMLingua is more than a research project. It’s a quiet revolution in how we deliver information to LLMs. It lets developers stretch context limits, cut costs, and speed up inference,  all without retraining a single model.

By learning to compress prompts intelligently, LLMLingua helps you talk to machines more efficiently. And in the world of large language models, saying more with less is exactly the kind of progress that matters most.

::: info

Hope you enjoyed this article. Signup for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Compress Your Prompts and Reduce LLM Costs",
  "desc": "Every developer working with large language models eventually faces the same challenge: prompts keep getting longer, models keep getting slower, and API bills keep getting higher. Whether you’re building a retrieval-augmented generation (RAG) system ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-compress-your-prompts-and-reduce-llm-costs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
