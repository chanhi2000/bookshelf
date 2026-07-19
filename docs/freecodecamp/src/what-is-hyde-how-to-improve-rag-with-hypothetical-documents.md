---
lang: en-US
title: "What Is HyDE? How to Improve RAG with Hypothetical Documents"
description: "Article(s) > What Is HyDE? How to Improve RAG with Hypothetical Documents"
icon: iconfont icon-numpy
category:
  - Python
  - NumPy
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - numpy
  - py-numpy
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Is HyDE? How to Improve RAG with Hypothetical Documents"
    - property: og:description
      content: "What Is HyDE? How to Improve RAG with Hypothetical Documents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-hyde-how-to-improve-rag-with-hypothetical-documents.html
prev: /programming/py-numpy/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Sameer Shukla
    url: https://freecodecamp.org/news/author/sshukla/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/71e96334-b1b2-42db-9f0d-d0d9552acb44.png
---

# {{ $frontmatter.title }} 관련

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
  name="What Is HyDE? How to Improve RAG with Hypothetical Documents"
  desc="Retrieval-Augmented Generation, commonly known as RAG, has become one of the most widely used approaches for building applications with large language models. Instead of asking an LLM to answer entire"
  url="https://freecodecamp.org/news/what-is-hyde-how-to-improve-rag-with-hypothetical-documents"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/71e96334-b1b2-42db-9f0d-d0d9552acb44.png"/>

Retrieval-Augmented Generation, commonly known as RAG, has become one of the most widely used approaches for building applications with large language models.

Instead of asking an LLM to answer entirely from its training data, a RAG system retrieves relevant information from an external knowledge base and provides that information to the model as context.

The basic idea is straightforward:

- Convert the user’s question into an embedding.
- Search a vector database for semantically similar document chunks.
- Pass the retrieved chunks to an LLM.
- Generate an answer grounded in those chunks.

![Figure 1: Retrieval-Augmented Generation (RAG) workflow](https://cdn.hashnode.com/uploads/covers/64b2c122c21d916a1b725c11/8cda4575-53dc-4531-8f7b-6c930bd743e4.png)
<!-- TODO: mermaid화 -->

But this apparently simple process has a major weakness: the user’s question and the document containing the answer may be written very differently.

A user might ask:

> Why does my AWS Glue job become significantly slower after processing several million records?

The relevant document in the knowledge base might say:

> Performance degradation can occur when Spark executors experience excessive shuffle operations, skewed partitions, memory pressure, or repeated spilling to disk.

The query and the document discuss the same problem, but they use different vocabulary, structure, and levels of detail. A direct query embedding may therefore fail to place them close enough in the embedding space.

This is the problem that Hypothetical Document Embeddings, or HyDE, was designed to solve.

::: note Prerequisites

To get the most out of this article, there are a few things you should know and have.

What you need to know:

- Basic familiarity with [**RAG and why it's used**](/freecodecamp.org/rag-explained-simply-with-a-real-project.md).
- How vector embeddings work, at a conceptual level.
- Working knowledge of Python.

What you need to have:

- A local Python environment with numpy, sentence-transformers, and Anthropic installed
- An Anthropic API key if you want to run the HyDE code sample (available at [<VPIcon icon="iconfont icon-claude"/>console.anthropic.com](http://console.anthropic.com))

:::

---

## What is HyDE?

HyDE stands for Hypothetical Document Embeddings. The technique is simple. At query time, you prompt an LLM to generate a hypothetical document that would answer the user's question, embed that document instead of the query, and use its vector to search your index. That's the whole idea. Everything else is engineering.

![Figure 2: The HyDE process](https://cdn.hashnode.com/uploads/covers/64b2c122c21d916a1b725c11/50c5909c-c7fa-4c92-bf11-c7a1b3411142.png)

The hypothetical document isn't treated as the final answer. It's used only as a bridge between the user’s query and the real documents stored in the knowledge base.

This distinction is critical.

The generated document may contain incorrect details. That's not necessarily a failure, because the system doesn't present it directly to the user. Its purpose is to produce a richer semantic representation of the information being sought.

The original HyDE approach used a language model to generate hypothetical documents and an unsupervised dense retriever to map those documents into an embedding space. The embedding acts as a search instruction for retrieving real documents from the corpus.

### Why HyDE Works

The intuition is geometric. A dense retriever projects text into a semantic space, and similarity between two pieces of text is the cosine of the angle between their vectors.

When you embed a question and compare it to a passage, you're measuring an angle between two shapes of text that were never meant to be close. Your embedding model was trained to place semantically similar text near each other, but it wasn't trained to place a question near its answer. Those are different geometries.

HyDE closes that gap by making both sides of the comparison the same shape. The hypothetical passage sits in the same neighborhood of the vector space as real documentation, because it was written in the same register, with the same vocabulary, at the same level of detail. The vector search is now comparing answers to answers rather than questions to answers, and the similarity signal is cleaner.

That's the entire mechanism. Everything else – the prompt engineering, model selection, and caching – is downstream of this one geometric fact.

---

## The Mechanics of HyDE

First, let's say that the user asks: why does my Lambda function take longer to respond when it hasn't been called in a while?

Then you ask the LLM that question in a short prompt: "Write a passage from technical documentation that answers this question."

The LLM responds with something like:

> "AWS Lambda will reclaim execution environments that have been idle for some time. When the function is invoked again, a cold start occurs, which involves setting up the runtime and loading dependencies. This adds additional latency for the first invocation following an idle period."

Now you embed that generated passage. Not the original question – the passage.

You use that embedding to search your vector store. The hypothetical passage was formatted like a real doc, so now the real AWS docs on cold starts are near each other in the vector space.

Next, you take the top k retrieved documents and pass them to the generator, along with the original user question. The generator answers using the real docs it retrieved. The hypothetical is discarded.

The LLM was used twice, but for different jobs: once to rewrite the query as a document, and again to answer the question using retrieved documents. The first call is cheap and low stakes. The second is the one that matters.

![Figure 3: Comparison of Naive RAG and HyDE pipelines.](https://cdn.hashnode.com/uploads/covers/64b2c122c21d916a1b725c11/b8fb1260-392c-4248-bcea-1328813dfe7d.png)

---

## Minimal Implementation

The naïve RAG may look like this:

```py
import numpy as np
from sentence_transformers import SentenceTransformer

collection = [
    "AWS Lambda reclaims idle execution environments after a period of inactivity, causing a cold start on the next invocation that includes runtime bootstrap and dependency loading.",
    "Apache Airflow schedules tasks using a directed acyclic graph, where each node represents a unit of work.",
    "AWS Glue crawlers infer schemas from source data and populate the Glue Data Catalog automatically.",
    "Amazon Bedrock exposes foundation models behind a single API and handles provisioning transparently.",
    "DynamoDB partitions data across nodes using the partition key, which determines physical placement.",
]

embedder = SentenceTransformer("all-MiniLM-L6-v2")
collection_embeddings = embedder.encode(collection, normalize_embeddings=True)

def retrieve(query: str, k: int = 2) -> list[str]:
    query_embedding = embedder.encode(query, normalize_embeddings=True)
    scores = collection_embeddings @ query_embedding
    top_k = np.argsort(scores)[::-1][:k]
    return [collection[i] for i in top_k]

query = "Why does my Lambda function take longer to respond when it hasn't been called in a while?"
for passage in retrieve(query):
    print(passage)
```

On this sample collection, it will likely return the right passage at rank 1. Scale to fifty thousand documents with real query variance, and the correct passage starts sliding down the ranking.

The line to notice, for what comes next, is the one inside retrieve where `embedder.encode(query, ...)` runs. That's where the raw question becomes a vector, and this is the line HyDE changes.

In the HyDE variant, the delta is one function:

```py :collapsed-lines
import numpy as np
from anthropic import Anthropic
from sentence_transformers import SentenceTransformer

# collection. In production this is your vector store.

collection = [
    "AWS Lambda reclaims idle execution environments after a period of inactivity, causing a cold start on the next invocation that includes runtime bootstrap and dependency loading.",
    "Apache Airflow schedules tasks using a directed acyclic graph, where each node represents a unit of work.",
    "AWS Glue crawlers infer schemas from source data and populate the Glue Data Catalog automatically.",
    "Amazon Bedrock exposes foundation models behind a single API and handles provisioning transparently.",
    "DynamoDB partitions data across nodes using the partition key, which determines physical placement.",
]

embedder = SentenceTransformer("all-MiniLM-L6-v2")
corpus_embeddings = embedder.encode(collection, normalize_embeddings=True)

client = Anthropic()

# HyDE: generate a hypothetical answer, embed that, then search.

HYDE_PROMPT = (
    "Write a short passage from technical documentation that would answer "
    "the following question. Write in the register of official docs: "
    "declarative, precise, no hedging. Do not include the question itself. "
    "Passage only, two to four sentences.\n\n"
    "Question: {query}"
)

def generate_hypothetical(query: str) -> str:
    """Ask an LLM to write a fake documentation passage answering the query."""
    message = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=200,
        messages=[
            {"role": "user", "content": HYDE_PROMPT.format(query=query)}
        ],
    )
    return message.content[0].text

def retrieve_hyde(query: str, k: int = 2) -> list[str]:
    """Generate a hypothetical passage, embed it, and search with that vector."""
    hypothetical = generate_hypothetical(query)
    hyde_embedding = embedder.encode(hypothetical, normalize_embeddings=True)
    scores = corpus_embeddings @ hyde_embedding
    top_k_indices = np.argsort(scores)[::-1][:k]
    return [collection[i] for i in top_k_indices]

if __name__ == "__main__":
    query = (
        "Why does my Lambda function take longer to respond "
        "when it hasn't been called in a while?"
    )
    for passage in retrieve_hyde(query):
        print(passage)
```

That's the whole technique. There's one extra LLM call, one extra function, and everything else is identical to the baseline. The hypothetical text is thrown away after embedding and never reaches the generator.

The naïve baseline vectorizes the question directly and performs the cosine similarity search on the collection vectors. It's precisely this one-line code, which invokes `embedder.encode(query, ...)`, where the question is vectorized into a vector of question shape rather than an answer vector shape, and it's the sole cause of the retrieval quality issue discussed in this article.

The difference in the HyDE approach is made in one thing only. Before the embedding takes place, an LLM is asked to generate a small piece of text in the register of technical documentation answering the question, and the vector is computed for this text rather than for the original question. Everything else remains exactly the same – the same embedding model, cosine similarity search, and top-k selections are used.

This hypothetical passage is never used for anything other than for generating the search vector. The difference isn't made by any difference in the retrieval method but only by changing the shape of the text to compare.

---

## Why Hallucination Doesn't Automatically Break HyDE

At first, HyDE appears contradictory. Why would a system improve factual retrieval by asking a language model to generate information before retrieving the facts?

The answer is that HyDE uses the generated document as a retrieval representation, not as trusted knowledge.

Suppose the user asks: What caused the database outage on July 18? The LLM can't know the actual cause from a private incident report. It has to make something up.

So it might say something like,

> "The July 18 database outage was caused by a misconfiguration of the failover on the primary replica, which caused cascading connection timeouts in the dependent services. Engineers restored service by rerouting traffic to the secondary region and rebuilding the connection pool."

That passage is a complete fabrication. The real cause might have been a disk failure, a bad deploy, a certificate expiry, anything. But look at what the passage contains: words like outage, failover, replica, cascading timeout, connection pool, secondary region. Those are the exact words that will appear in your real incident postmortem, whatever the actual cause was.

Postmortems for database outages sound like postmortems for database outages. They share vocabulary, register, and structure regardless of the specific root cause.

The LLM's generated passage might also touch on connection saturation, lock contention, storage latency, failed deployment, or resource exhaustion. Some of those details may be wrong, but it doesn't matter. Each of those terms still pulls the embedding toward the same neighborhood as real outage analyses, root cause reports, database metrics, and postmortem documents.

When you embed that fabricated passage, the vector lands in the neighborhood where your real postmortem lives. The vector search retrieves the correct postmortem. Only then does the generator read the actual document and produce the true answer.

The hypothetical was wrong about the facts, but it was right about the shape. Shape is what the embedding sees. Facts are what the retrieved document provides.

The real risk here isn't the hallucination itself but what you do with it. If the system mistakenly passes the hypothetical document to the final answer generator as though it were retrieved evidence, the fabrication reaches the user.

The mitigation is architectural, not statistical: keep the hypothetical strictly inside the retrieval step and never let it leak into the generation context. The next section covers this in detail.

---

## Production Guardrails

HyDE adds an LLM to the retrieval path, which introduces new engineering concerns. Here are some production guardrails you can add that'll make things safer and more reliable:

### Apply Timeouts and Fallbacks

If hypothetical generation is slow or fails, degrade to naïve retrieval instead of blocking the user.

```py
def retrieve_with_fallback(query: str, k: int = 2) -> list[str]:
    try:
        hypothetical = generate_hypothetical(query)
        search_vector = embedder.encode(hypothetical, normalize_embeddings=True)
    except Exception:
        logger.exception(
            "HyDE generation failed; falling back to the original query."
        ) 
        # Fall back to embedding the raw query
        search_vector = embedder.encode(query, normalize_embeddings=True)

    scores = corpus_embeddings @ search_vector
    top_k = np.argsort(scores)[::-1][:k]
    return [collection[i] for i in top_k]
```

Set an explicit timeout on the client itself [Anthropic(timeout=3.0)]

### Limit Generation Length

Long hypothetical documents introduce unrelated concepts and dilute the embedding. Cap the output at the LLM call.

```py
message = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,   # keep the hypothetical dense
    messages=[{"role": "user", "content": HYDE_PROMPT.format(query=query)}],
)
```

200 tokens should be sufficient for a targeted piece of text in the domain of technical documentation. Anything beyond that typically makes retrieval harder.

### Protect Sensitive Data Before Sending to an External Model Provider

Strip personal identification data from the input before running the hypothesis generation, and enforce it at the interface level instead of relying on downstream callers.

```py
PII_PATTERNS = {
    "email": r'\b[\w.-]+@[\w.-]+.\w+\b',
    "ssn":   r'\b\d{3}-\d{2}-\d{4}\b',
    "card":  r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b',
}

def scrub_pii(text: str) -> str:
    for label, pattern in PII_PATTERNS.items():
        text = re.sub(pattern, f"[REDACTED_{label.upper()}]", text)
    return text

def safe_generate_hypothetical(query: str) -> str:
    return generate_hypothetical(scrub_pii(query))
```

This will be the lowest requirement for regulated data. Add more controls above it.

### Trace Every Stage

Without visibility at every stage, there's no way to debug retrieval problems. Collect the query, prompt, hypothetical response, delays, IDs retrieved, and similarity scores for all queries.

```py :collapsed-lines
import time
import logging

logger = logging.getLogger(__name__)

def traced_retrieve_hyde(query: str, k: int = 2) -> HyDEContext:
    t0 = time.time()
    hypothetical = generate_hypothetical(query)
    gen_ms = int((time.time() - t0) * 1000)

    t1 = time.time()
    search_vector = embedder.encode(hypothetical, normalize_embeddings=True)
    embed_ms = int((time.time() - t1) * 1000)

    scores = corpus_embeddings @ search_vector
    top_k = np.argsort(scores)[::-1][:k]

    logger.info(
        "hyde_retrieval",
        extra={
            "query": query,
            "prompt_version": "v1",
            "hypothetical": hypothetical,
            "gen_latency_ms": gen_ms,
            "embed_latency_ms": embed_ms,
            "retrieved_ids": top_k.tolist(),
            "similarity_scores": [float(scores[i]) for i in top_k],
        },
    )
    return HyDEContext(
        original_query=query,
        hypothetical=hypothetical,
        retrieved_documents=[collection[i] for i in top_k],
    )
```

The structured log forms the basis for latency dashboards, drift alerts, and offline retrieval evaluations.

### When to Use HyDE, and When Not to

Use HyDE when:

- Your embedding model fails to fully grasp your domain.
- You don’t have labeled query-document pairs to fine-tune a retriever.
- Users ask conversational questions, but your documents are formal or technical.
- You can afford an extra LLM call before retrieval.

Avoid HyDE if:

- Your application has strict latency requirements.
- A general-purpose LLM may generate the wrong domain terminology.
- Your queries already contain strong keywords, identifiers, or error codes.
- BM25 or hybrid search already retrieves relevant results.
- You have enough labeled data to fine-tune the retriever directly.

---

## Summary

HyDE is a small idea with a large effect. You're not changing your index, embedding model, or generator. You're changing one line: what gets embedded when a query arrives. That single change reshapes the geometry of the search from question against answer to answer against answer, and retrieval quality follows.

The technique isn't magic. It trades latency and cost for recall, and it earns its keep only when the query document asymmetry is the actual bottleneck in your pipeline. When it is, HyDE is one of the cheapest wins in the RAG toolbox.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Is HyDE? How to Improve RAG with Hypothetical Documents",
  "desc": "Retrieval-Augmented Generation, commonly known as RAG, has become one of the most widely used approaches for building applications with large language models. Instead of asking an LLM to answer entire",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-hyde-how-to-improve-rag-with-hypothetical-documents.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
