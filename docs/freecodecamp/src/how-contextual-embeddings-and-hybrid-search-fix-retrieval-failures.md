---
lang: en-US
title: "How Contextual Embeddings and Hybrid Search Fix Retrieval Failures"
description: "Article(s) > How Contextual Embeddings and Hybrid Search Fix Retrieval Failures"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - LangChain
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Contextual Embeddings and Hybrid Search Fix Retrieval Failures"
    - property: og:description
      content: "How Contextual Embeddings and Hybrid Search Fix Retrieval Failures"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-contextual-embeddings-and-hybrid-search-fix-retrieval-failures.html
prev: /ai/langchain/articles/README.md
date: 2026-05-30
isOriginal: false
author:
  - name: Rishi Raj Jain
    url: https://freecodecamp.org/news/author/rishi-raj-jain/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fffeb399-42d0-441b-8aef-9f12d4c134e7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Contextual Embeddings and Hybrid Search Fix Retrieval Failures"
  desc="If you’ve built a RAG (Retrieval-Augmented Generation) system in the past year, you’ve probably hit the wall where your LLM returns confidently wrong answers, cites information that doesn’t exist, or "
  url="https://freecodecamp.org/news/how-contextual-embeddings-and-hybrid-search-fix-retrieval-failures"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fffeb399-42d0-441b-8aef-9f12d4c134e7.png"/>

If you’ve built a RAG (Retrieval-Augmented Generation) system in the past year, you’ve probably hit the wall where your LLM returns confidently wrong answers, cites information that doesn’t exist, or completely misses relevant context sitting right there in your vector database.

The problem isn’t your embedding model or vector store. Most RAG implementations treat context like a keyword search problem when it’s actually a **meaning problem**.

Traditional RAG chunks documents, embeds them, retrieves the “closest” chunks, and feeds them to the LLM. In practice, this breaks down when chunks lose their surrounding context. A sentence like “It increased by 40%” is useless without knowing what “it” refers to or when this happened.

**Contextual retrieval** explicitly preserves and leverages the relationships between chunks, their document structure, and their semantic meaning rather than treating each chunk as an isolated island of text.

In this guide, we’ll break down what context means in RAG systems, why naïve chunking fails, and how modern contextual retrieval techniques solve these problems without over-engineering your infrastructure.

---

## What is Context in RAG Systems?

Before we talk about retrieval, let’s be precise about what “context” actually means in a RAG pipeline. Context isn’t one thing – it’s several layers that interact.

### 1. Chunk Context (Local)

This is the immediate surrounding text for any given chunk. Without this, references like “as mentioned above” or “this approach” become meaningless.

::: note Failure mode

Your chunk says “This reduced latency by 60%” but doesn’t mention that “this” refers to switching from EBS to local NVMe, which was explained two paragraphs earlier in a different chunk.

:::

### 2. Document Context (Structural)

This is metadata about where the chunk lives: which document, section, content type (API docs vs. blog), purpose, and audience.

::: note Failure mode

Your LLM retrieves a chunk from a 2023 deprecation notice when the user asked about current 2026 best practices. The content was relevant once, but temporal context makes it dangerously wrong now.

:::

### 3. Semantic Context (Global)

This is the web of relationships between concepts across your entire knowledge base. How does this chunk relate to others semantically, even across different documents?

::: note Failure mode

A user asks “How do I optimize cold starts?” and your system retrieves chunks about Lambda functions but misses critical chunks about VPC configuration, provisioned concurrency, and SnapStart because they live in different documents without shared keywords.

Most RAG implementations only handle the first type, if that. Contextual retrieval systems explicitly address all three.

:::

---

## The Problem with Naïve Chunking

Traditional RAG follows a simple recipe:

1. Split documents into chunks (fixed size, for example, 512 tokens with 50-token overlap)
2. Generate embeddings for each chunk
3. Store embeddings in a vector database
4. On query: embed the query, find nearest neighbors, return top-k chunks
5. Stuff those chunks into the LLM prompt

This worked well enough for early demos but in production, it falls apart quickly.

### Why Fixed-Size Chunking Breaks

Imagine you're chunking technical documentation about database configuration. A naïve fixed-size chunker might produce:

**Chunk 1:**

```sh
our benchmark results on the z3-highmem-14 instance.
MongoDB was configured with WiredTiger and 100GB cache.

Testing Methodology
We used YCSB 0.18.0 with 1 billion records and uniform
distribution. Each test ran 2 million operations across
varying thread counts.
```

**Chunk 2:**

```sh
varying thread counts. Read throughput peaked at 8,000 QPS
for MongoDB and 10,000 QPS for FerretDB. However, EloqDoc
reached 129,000 QPS at 512 threads due to its use of local
NVMe storage rather than network-attached disks.
```

See the problem?

- Chunk 1 contains critical setup information but gets cut off mid-context
- Chunk 2 starts with “varying thread counts” (meaningless without Chunk 1) and references “its use of local NVMe” without explaining what “it” is
- The most important finding (EloqDoc’s 16x performance advantage) is explained using a pronoun that references content in a completely different chunk.

When someone searches for “database performance comparison,” they might retrieve Chunk 2, which confidently states “129,000 QPS” without any context about what system that refers to, what workload was tested, or how it compares to alternatives.

### Why Partial Overlap Alone Fails to Solve the Problem

Many developers add 10-20% overlap between chunks assuming it fixes the problem. It doesn’t. Overlap helps with **boundary splits** (not cutting sentences in half), but does nothing for **semantic coherence**. If relevant context is 200 or 500 tokens away, overlap won’t help.

### Common Failure Patterns

Common failure modes from production RAG systems that can occur in your system too, are:

1. **Pronoun hell**: “It supports both modes” – what is “it”?
2. **Orphaned comparisons**: “This is 3x faster” – faster than what?
3. **Broken procedures**: Step 3 of a tutorial in a different chunk than steps 1-2
4. **Lost temporal markers**: “As of last quarter” – which quarter?
5. **Missing prerequisites**: Code assumes imported libraries mentioned in a different chunk

The core issue is that fixed-size chunking treats documents as strings to split, not as structured information with semantic boundaries.

---

## How Contextual Retrieval Works

Contextual retrieval solves these problems by explicitly preserving and leveraging context at chunk creation time, not retrieval time. The key insight is that you can’t recover lost context later – you must embed the context into the chunk itself before embedding and indexing.

Think of it like this: naïve chunking is like ripping pages out of a book at random. Contextual retrieval is like carefully extracting sections while writing a summary of the book on each page so that each page makes sense in isolation.

### Anthropic’s Contextual Embeddings Approach

Anthropic published a technique called [<VPIcon icon="iconfont icon-claude"/>**Contextual Retrieval** in late 2024](https://platform.claude.com/cookbook/capabilities-contextual-embeddings-guide) that aims at improving RAG accuracy. The approach is that before embedding a chunk, you prepend it with a brief context summary that explains what this chunk is about and where it sits in the document.

Here’s how it works in practice:

#### Original Chunk (Naïve RAG)

```plaintext
varying thread counts. Read throughput peaked at 8,000 QPS
for MongoDB and 10,000 QPS for FerretDB. However, EloqDoc
reached 129,000 QPS at 512 threads due to its use of local
NVMe storage rather than network-attached disks.
```

#### Contextualized Chunk (Contextual RAG)

```plaintext
This chunk is from a database performance benchmark comparing
MongoDB, FerretDB, and EloqDoc on a 1TB dataset with 1 billion
records, conducted in January 2026. The section discusses read
throughput results under high concurrency.

varying thread counts. Read throughput peaked at 8,000 QPS
for MongoDB and 10,000 QPS for FerretDB. However, EloqDoc
reached 129,000 QPS at 512 threads due to its use of local
NVMe storage rather than network-attached disks.
```

Now when this chunk is embedded, the vector representation includes the context. When a user searches for “database read performance 2026” this chunk will match more accurately because the embedding captures both the content AND its context.

### Generating Contextual Summaries with LLMs

The trick is generating these contextual summaries efficiently. Anthropic’s approach uses an LLM (like Claude) with a prompt like this:

```plaintext
Here is the document:
<document>
{{FULL_DOCUMENT}}
</document>

Here is the chunk we want to situate within the document:
<chunk>
{{CHUNK_CONTENT}}
</chunk>

Please provide a concise context (2-3 sentences) that explains
what this chunk is about and where it fits in the document.
This context will be prepended to the chunk to improve retrieval.
```

The LLM reads the full document and the specific chunk, then generates a summary that situates the chunk in its broader context. This summary is prepended to the chunk before embedding.

### Hybrid Retrieval: BM25 + Contextual Embeddings

Anthropic’s research also found that [<VPIcon icon="iconfont icon-claude"/>combining contextual embeddings with traditional BM25 (keyword search)](https://platform.claude.com/cookbook/capabilities-contextual-embeddings-guide#contextual-bm-25-hybrid-search) dramatically outperforms either method (as above) alone. The reason is that embeddings capture semantic meaning, while BM25 captures exact keyword matches.

Here’s a realistic scenario where hybrid search would work efficiently:

**User query**: “What is the pricing for Claude Sonnet API in 2026?”

- **BM25 result**: Finds chunks with exact matches for “pricing”, “Claude Sonnet”, “API”, “2026”
- **Semantic result**: Finds chunks about billing, costs, API plans, even if they don’t use those exact words
- **Hybrid result**: Combines both, heavily weighting chunks that match both semantically AND contain the key terms

### Implementation Pattern

The practical workflow is straightforward – that is, to split documents along meaningful and semantic boundaries. For each chunk, you'll use an LLM to generate a brief context summary and prepend it to the chunk before embedding. You store both the contextualized embedding and the original chunk in your vector store.

When retrieving, you can use a hybrid approach that combines BM25 with vector similarity, then rerank the results with a dedicated model for relevance. Finally, you'll pass only the original chunks (without the generated context) to the LLM, minimizing prompt size. The context summary boosts retrieval accuracy but isn’t needed by the LLM itself during answer generation.

---

## Smarter Chunking Strategies

Contextual retrieval is most effective when chunking is based on document structure instead of fixed token counts.

### Three Approaches to Better Chunking

#### 1. Semantic Chunking

splits based on meaning by embedding sentences and creating boundaries when similarity drops. Libraries like LangChain provide this out of the box ([<VPIcon icon="iconfont icon-langchain"/>source](https://docs.langchain.com/oss/python/integrations/splitters/split_html#using-htmlsemanticpreservingsplitter)):

```py
from bs4 import Tag
from langchain_text_splitters import HTMLSemanticPreservingSplitter

headers_to_split_on = [
    ("h1", "Header 1"),
    ("h2", "Header 2"),
]

def code_handler(element: Tag) -> str:
    data_lang = element.get("data-lang")
    code_format = f"<code:{data_lang}>{element.get_text()}</code>"

    return code_format

splitter = HTMLSemanticPreservingSplitter(
    headers_to_split_on=headers_to_split_on,
    separators=["\n\n", "\n", ". ", "! ", "? "],
    max_chunk_size=50,
    preserve_images=True,
    preserve_videos=True,
    elements_to_preserve=["table", "ul", "ol", "code"],
    denylist_tags=["script", "style", "head"],
    custom_handlers={"code": code_handler},
)

documents = splitter.split_text(html_string)
```

#### 2. Structural Chunking

uses document structure (headers, sections, code functions) as natural boundaries ([<VPIcon icon="iconfont icon-langchain"/>source](https://docs.langchain.com/oss/python/integrations/splitters/markdown_header_metadata_splitter)):

```py
from langchain_text_splitters import MarkdownHeaderTextSplitter

markdown_document = "# Foo\n\n    ## Bar\n\nHi this is Jim\n\nHi this is Joe\n\n ### Boo\n\n Hi this is Lance\n\n ## Baz\n\n Hi this is Molly"

headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
]

markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
md_header_splits = markdown_splitter.split_text(markdown_document)
```

#### 3. Agentic Chunking

uses an LLM to identify logical breakpoints. This is expensive but produces the highest quality chunks for high-stakes applications (medical, legal, financial) ([<VPIcon icon="iconfont icon-ibm"/>source](https://ibm.com/think/tutorials/use-agentic-chunking-to-optimize-llm-inputs-with-langchain-watsonx-ai)).

---

## Reranking, a Two-Stage Retrieval

Even with contextual embeddings and smart chunking, vector similarity alone isn’t enough. This is where [<VPIcon icon="fas fa-globe"/>reranking](https://pinecone.io/learn/series/rag/rerankers/) comes in.

Reranking is a two-stage retrieval process: first retrieve a large candidate set (for example, top 100 chunks), then use another model to rerank those candidates and return the true top-k.

The reason this works is that the first-stage retriever (vector search) is fast but imprecise. It casts a wide net. The reranker is slow but accurate. It carefully evaluates each candidate against the query and scores them properly.

### Why Reranking Matters

Vector embeddings capture **semantic similarity**, but they don’t capture **relevance**. A chunk can be semantically similar to a query without actually answering it.

Suppose you ask “How do I reduce cold starts in Lambda?” A broad vector search might return many chunks where some would define cold starts, others mention Lambda naming conventions, unrelated benchmarks, provisioned concurrency steps, or briefly reference SnapStart.

Raw vector similarity ranks results by shared words, often treating them equally. A reranker instead evaluates each query–document pair, pushing actionable content up and vague mentions down. Using the top reranked results gives the LLM more precise inputs, turning a generic answer into specific guidance on things like provisioned concurrency and SnapStart.

Here's an example of how the reranking process looks like in code:

```py
from cohere import Client

co = Client(api_key="...")
query = "How do I reduce cold starts in Lambda?"

# Stage 1: cast a wide net
candidates = vector_store.similarity_search(query, k=100)

# Stage 2: rerank for relevance, not just similarity
documents = [chunk.page_content for chunk in candidates]
reranked = co.rerank(
    model="rerank-english-v3.0",
    query=query,
    documents=documents,
    top_n=5,
)

top_chunks = [candidates[result.index] for result in reranked.results]
```

Rerankers are trained specifically to predict relevance given a query and a document together. They're much better at this task than general-purpose embedding models, which only ever saw each chunk in isolation during indexing.

---

## Graph-Based Contextual Retrieval

An emerging alternative to chunk-based RAG is [<VPIcon icon="fas fa-globe"/>graph-based retrieval](https://datastax.github.io/graph-rag/), where you model your knowledge base as a graph of entities and relationships.

### Why Graphs Work

Chunks are isolated units, even with contextual embeddings. Graphs explicitly model relationships between information.

::: tip Example

For a company’s internal docs with chunks about “Project Phoenix”, “Sarah Chen” (project lead), and “Q4 2025 roadmap”, a vector database has no connection between them unless they mention each other explicitly.

:::

With a graph, you create nodes (entities) and edges (relationships): Sarah Chen → `leads` → Project Phoenix → `part_of` → Q4 2025 Roadmap. When someone asks “What projects is Sarah working on?”, you traverse the graph to gather all related context in one query.

You can combine this with vector search so the graph supplies structural context and embeddings supply semantic matching. A hybrid query might look like the following:

```py
def retrieve_with_graph(query: str, top_k: int = 5):
    # Stage 1: vector search finds entry-point entities
    seed_chunks = vector_store.similarity_search(query, k=20)
    seed_entities = extract_entities(seed_chunks)

    # Stage 2: expand through the graph
    related = graph.traverse(
        start_nodes=seed_entities,
        max_hops=2,
        edge_types=["leads", "part_of", "uses"],
    )

    # Stage 3: merge graph context with original chunks
    context_bundle = merge_chunks_and_relationships(seed_chunks, related)
    return context_bundle[:top_k]
```

In this scenario, vector search retrieves the "Sarah Chen" entity, while graph traversal expands to related nodes such as Project Phoenix, the Q4 roadmap, and the Kubernetes stack. This delivers a structured, connected context to the LLM, rather than unstructured, unrelated text fragments.

---

## Common Pitfalls and How to Avoid Them

From building production RAG systems, here are the mistakes that may happen:

- **Over-optimizing embeddings, under-optimizing chunking**: Obsessing over embedding models while using terrible fixed-size chunking. Chunking quality matters **more** than embedding quality. The fix is to invest efforts in semantic/structural chunking first.
- **Ignoring metadata**: Not using metadata filters even though your vector database can. Simple info like `{document_type: "api_docs", last_updated: "2026-03"}` can make search much better. The fix is to collect detailed metadata when you add documents and use it to filter results first.
- **Single-shot retrieval**: More effective systems use iterative retrieval, where they retrieve some information, generate a partial answer, then perform another retrieval if needed before producing the final response. To enable this approach, you can use agentic frameworks like [AutoGPT (<VPIcon icon="iconfont icon-github"/>`significant-gravitas/autogpt`)](https://github.com/significant-gravitas/autogpt).
- **No fallback strategy**: When retrieval finds zero relevant chunks, most systems pass empty context to the LLM, which then hallucinates. The fix is to implement a threshold logic, that is if score < threshold, respond “I don’t have enough information.”

---

## Context is Everything

If there’s one takeaway from this guide, it’s that context is not a nice-to-have in RAG systems, **it’s the foundation for ensuring high quality output**.

Naïve chunking and pure vector similarity search worked well enough when RAG was new and expectations were low. In 2026, users expect answers that are accurate, complete, and grounded in your actual data. You can’t deliver that with fixed-size chunks and a simple nearest-neighbor search.

Contextual retrieval whether through contextual embeddings, graph-based approaches, or hybrid methods explicitly preserves and leverages the relationships between chunks, their document structure, and their semantic meaning.

You can start simply by adding contextual embeddings to your existing chunks, layer in a reranker, and switch from fixed-size to semantic chunking. These three changes alone will help optimize your retrieval failures.

Retrieval fixes what your agent knows. If that agent also ships ad creatives or social assets from that output, those facts still need a stable template to render into. [<VPIcon icon="fas fa-globe"/>Template-based content creation platforms](https://orshot.com/solutions/content-creation-at-scale) cover that step with parameterized templates over REST or [<VPIcon icon="fas fa-globe"/>MCP](https://orshot.com/agents).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Contextual Embeddings and Hybrid Search Fix Retrieval Failures",
  "desc": "If you’ve built a RAG (Retrieval-Augmented Generation) system in the past year, you’ve probably hit the wall where your LLM returns confidently wrong answers, cites information that doesn’t exist, or ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-contextual-embeddings-and-hybrid-search-fix-retrieval-failures.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
