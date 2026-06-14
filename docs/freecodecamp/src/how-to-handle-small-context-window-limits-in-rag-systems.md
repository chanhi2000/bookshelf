---
lang: en-US
title: "How to Handle Small Context Window Limits in RAG Systems"
description: "Article(s) > How to Handle Small Context Window Limits in RAG Systems"
icon: fa-brands fa-python
category:
  - Python
  - Node.js
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - node
  - nodejs
  - node-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle Small Context Window Limits in RAG Systems"
    - property: og:description
      content: "How to Handle Small Context Window Limits in RAG Systems"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-small-context-window-limits-in-rag-systems.html
prev: /programming/py/articles/README.md
date: 2026-06-18
isOriginal: false
author:
  - name: Sviatoslav Barbutsa
    url: https://freecodecamp.org/news/author/sviat-barbutsa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5ee25d45-2056-4e32-b780-c92e828e7964.png
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
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="How to Handle Small Context Window Limits in RAG Systems"
  desc="Retrieval-augmented generation, or RAG, is a pattern where an application retrieves relevant source material and adds it to a model prompt so the model can answer from that context. A larger context w"
  url="https://freecodecamp.org/news/how-to-handle-small-context-window-limits-in-rag-systems"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5ee25d45-2056-4e32-b780-c92e828e7964.png"/>

Retrieval-augmented generation, or RAG, is a pattern where an application retrieves relevant source material and adds it to a model prompt so the model can answer from that context.

A larger context window in a RAG system shouldn't be treated as a substitute for good context management, although it can make the experience more forgiving for the end user. It's like running unoptimized graphics on a powerful GPU: the extra capacity can hide inefficiency for a while, but it doesn't eliminate the underlying optimization problem.

But even a very large context window still has a hard limit. If you keep adding tokens, you can eventually exceed it. This problem becomes more visible on consumer hardware, where limited memory and compute usually mean smaller usable context windows.

I ran into this problem while experimenting with local models on a consumer laptop with 12 GB of VRAM. RAG worked well for small tests but as soon as the documents got larger, the system would retrieve useful chunks and still fail to answer well.

The issue wasn't always retrieval. Sometimes the right chunk had been found, but the final prompt didn't have room for it.

This article walks through the solution I implemented for this problem:

Document summary → chunk summary → raw chunk → final answer

The pattern is based on three rules:

- Use summaries for retrieval.
- Use raw chunks for answering.
- Use a context budget to decide what reaches the model.

To keep the demo simple and convenient, the [companion repository (<VPIcon icon="iconfont icon-github"/>`sviat-barbutsa/small-context-rag-solution`)](https://github.com/sviat-barbutsa/small-context-rag-solution) uses small Python and TypeScript examples with a simplified in-memory retrieval store and a simplified answer extractor. This lets you see the article’s core ideas in practice without installing a full stack of dependencies, downloading models, running a Large Language Model (LLM) server, setting up an embedding service, or configuring a vector database.

That setup process could easily become its own dedicated article, so this tutorial keeps the runnable examples focused on the small-context RAG pattern: summaries for retrieval, raw chunks for answers, and a visible context budget.

The repo demonstrates the data flow and debugging pattern rather than production-grade model quality. In production, you'd want to replace the simplified summarizer, in-memory similarity search, and token estimator with your own model, embedding store, reranker, and tokenizer.

---

## What You Will Implement

In this tutorial, you'll implement a small educational RAG pipeline that manages context window limitations by processing documents across three levels:

- **Document records** contain a short summary used to choose likely documents.
- **Chunk records** contain a short summary used to choose likely chunks inside those documents, plus the raw source text.
- **Raw context** contains selected raw chunks packed into a fixed token budget.

The important distinction is that summaries are only used to decide where to look. They're not used as final evidence.

That matters because summaries are lossy. They compress information, and they may leave out the detail needed to answer the user's question. Raw chunks, by contrast, are larger, but they preserve the original wording.

The demo prints a trace for every question:

- Document summary hits
- Chunk summary hits
- Raw chunks included
- Raw chunks skipped
- Answer

That trace is the debugging interface. It shows whether retrieval failed, or whether prompt assembly skipped useful evidence because the context budget was too small.

::: note Prerequisites

To follow along, you need one of these:

- **Python 3.10 or newer**

or:

- **Node.js 22 or newer**
- **npm**

You'll get the most out of this article if you're already comfortable with:

- basic Python or TypeScript syntax
- running commands in a terminal
- reading small data classes, functions, and lists or maps
- the general idea of an LLM prompt and context window
- the basic RAG idea: retrieve relevant source text, add it to a prompt, and answer from that context

You don't need prior experience with vector databases, embedding APIs, LangChain, LlamaIndex, or local LLM setup.

The examples don't require an LLM provider, an embedding API, or a vector database. They use:

- sentence extraction as a stand-in for LLM summarization
- bag-of-words cosine similarity as a stand-in for embedding search
- fixed character-based token estimates as a stand-in for a tokenizer

I made these implementation choices to save you time and make the examples easier to try, while preserving the original purpose. They also make the retrieval path visible.

:::

---

## Why Basic RAG Can Fail with a Small Context Window

The basic RAG loop usually looks like this:

Load documents → split documents into chunks → embed chunks → retrieve the top chunks → put retrieved chunks into the prompt → ask the model to answer.

This is a good starting point. But it hides two different problems inside one phrase: "retrieve the top chunks."

First, you need to find relevant material. That's retrieval quality.

Second, you need to decide which retrieved material actually fits in the final prompt. That's context budgeting.

On a large hosted model, you may not notice this problem right away. On a local model or a smaller context window, you'll notice it quickly.

The failure mode looks like this:

- The retriever finds useful chunks.
- The prompt builder tries to add them.
- The context budget fills up.
- Some chunks are skipped.
- The final model never sees those skipped chunks.
- The answer is incomplete or says "I do not know."

This can feel confusing when you inspect retrieval and see that the relevant chunk was returned. But retrieval returning a chunk isn't the same thing as the model seeing that chunk.

If you develop RAG systems on constrained hardware, this distinction becomes important.

---

## How Summary Routing Works

Instead of searching all raw chunks directly, you can create a routing layer out of summaries.

At indexing time:

1. Load documents.
2. Split each document into chunks.
3. Summarize each chunk.
4. Reduce chunk summaries into one document summary.
5. Store document summaries in a document-summary store.
6. Store chunk summaries in per-document chunk-summary stores.
7. Keep raw chunks in a lookup table.

Here's what the indexing pipeline looks like:

![Diagram showing documents split into chunks, chunk summaries, recursive reduction, document summary stores, chunk summary stores, and raw chunk lookup](https://cdn.hashnode.com/uploads/covers/6a2161a1d326f39f24ff91db/4356d7cb-13a7-4cda-855f-9c4056b43157.png)

At question time:

1. Search document summaries to choose likely documents.
2. Search chunk summaries only inside those documents.
3. Convert chunk-summary hits back to raw chunk IDs.
4. Optionally add neighboring chunks.
5. Pack raw chunks into the final context budget.
6. Answer from raw chunks only.

The query path uses the summaries for routing, then switches back to raw chunks before answering:

![Diagram showing a question flowing through document summaries, chunk summaries, raw chunk lookup, and a final answer](https://cdn.hashnode.com/uploads/covers/6a2161a1d326f39f24ff91db/905681c7-1807-439a-b3ec-514ea7b9c221.png)

This gives you two useful properties:

- Summaries make retrieval cheaper.
- Raw chunks keep answers grounded.

It also gives you a place to debug. If the system gives a weak answer, inspect the trace. Did the right document summary match? Did the right chunk summary match? Did the raw chunk fit in the final context? Did it get skipped because of the budget?

---

## How to Represent Documents and Chunks

The data structures are intentionally small because they contain only the essential information needed for this pipeline. In a real system, you would probably add more metadata.

Here's the Python version:

```py
from dataclasses import dataclass

@dataclass(frozen=True)
class SearchDocument:
    page_content: str
    metadata: dict[str, str | int]

@dataclass(frozen=True)
class DocumentRecord:
    doc_id: str
    source: str
    text: str
    summary: str

@dataclass(frozen=True)
class ChunkRecord:
    chunk_id: str
    doc_id: str
    source: str
    index: int
    text: str
    summary: str
    previous_chunk_id: str | None
    next_chunk_id: str | None
```

The `DocumentRecord` stores the full document and a summary. The `ChunkRecord` stores the raw chunk, its summary, and links to the previous and next chunks.

Those neighbor links are useful because chunk boundaries are artificial. If retrieval finds chunk 4, the answer may start in chunk 3 or continue into chunk 5. The index keeps both searchable stores and lookup maps:

```py
@dataclass(frozen=True)
class HierarchicalIndex:
    documents_by_id: dict[str, DocumentRecord]
    chunks_by_id: dict[str, ChunkRecord]
    chunks_by_doc_id: dict[str, list[ChunkRecord]]
    document_summary_store: SimpleVectorStore
    chunk_summary_stores_by_doc_id: dict[str, SimpleVectorStore]
```

The most important lookup is this:

```py
chunk = index.chunks_by_id[chunk_hit.metadata["chunk_id"]]
```

That line converts a retrieved summary hit back into the raw source text used for the final answer.

---

## How to Split Documents into Raw Chunks

The demo splits Markdown files by paragraph and groups paragraphs until a target character size is reached:

```py
CHUNK_SIZE = 420

def split_text(text: str) -> list[str]:
    chunks = []
    current_paragraphs = []
    current_size = 0

    for paragraph in re.split(r"\n\s*\n", text.strip()):
        paragraph = paragraph.strip()

        if not paragraph:
            continue

        if current_paragraphs and current_size + len(paragraph) > CHUNK_SIZE:
            chunks.append("\n\n".join(current_paragraphs))
            current_paragraphs = []
            current_size = 0

        current_paragraphs.append(paragraph)
        current_size += len(paragraph)

    if current_paragraphs:
        chunks.append("\n\n".join(current_paragraphs))

    return chunks
```

One important thing: this isn't the perfect splitter for every use case. It's intentionally readable.

In a production system, you might use a tokenizer-aware splitter, Markdown-aware sections, semantic chunking, or parent-child chunking. But regardless of the option you pick, the idea stays the same: keep raw chunks as the final evidence.

---

## How to Summarize Chunks and Documents

To keep the demo easy to run, this article uses sentence extraction as a stand-in for LLM summarization. It scores sentences that include important RAG terms and keeps the top sentences.

```py
def summarize_text(text: str, max_sentences: int = 2) -> str:
    sentences = [
        sentence.strip()
        for sentence in re.split(r"(?<=[.!?])\s+", " ".join(text.split()))
        if sentence.strip()
    ]

    if len(sentences) <= max_sentences:
        return " ".join(sentences)

    scored_sentences = []

    for position, sentence in enumerate(sentences):
        sentence_words = words(sentence)
        term_score = sum(3 for word in sentence_words if word in IMPORTANT_TERMS)
        first_sentence_bonus = 1 if position == 0 else 0
        scored_sentences.append((term_score + first_sentence_bonus, position, sentence))

    selected = sorted(scored_sentences, key=lambda item: (-item[0],item[1]))[:max_sentences]
    selected.sort(key=lambda item: item[1])

    return " ".join(sentence for _score, _position, sentence in selected)
```

In a real system, this function would call a small local model or a hosted model. The prompt instructions would be something like:

- Summarize this chunk for retrieval.
- Preserve names, constraints, decisions, errors, numbers, and domain-specific terms.
- Don't answer a user question.

Note that the chunk summary isn't supposed to replace the raw chunk. Its only goal is to make retrieval easier.

---

## How to Recursively Reduce Summaries

A common mistake is to create a document summary by putting every chunk summary into one prompt:

```py
combined = "\n\n".join(chunk_summaries)
document_summary = summarize(combined)
```

That works for a few chunks, but it doesn't work for hundreds of chunks. You have only moved the context-window problem from answer time into indexing time.

A better approach is to reduce summaries in batches:

Chunk summaries → budgeted batches → batch summaries → higher-level summaries → final document summary.

The reduction process looks like this:

![Diagram showing chunk summaries being grouped into budgeted batches, reduced into higher-level summaries, and then reduced into one final document summary](https://cdn.hashnode.com/uploads/covers/6a2161a1d326f39f24ff91db/5cac6432-5cdd-4940-8318-08ffa2ec0622.png)

Here is the budgeted packing function:

```py
def pack_summaries_by_token_budget(
    summaries: list[str],
    token_budget: int,
) -> list[list[str]]:
    batches = []
    current_batch = []
    current_tokens = 0

    for summary in summaries:
        summary_tokens = approximate_tokens(summary)

        if current_batch and current_tokens + summary_tokens > token_budget:
            batches.append(current_batch)
            current_batch = []
            current_tokens = 0

        current_batch.append(summary)
        current_tokens += summary_tokens

    if current_batch:
        batches.append(current_batch)

    return batches
```

And here is the recursive reduction loop:

```py
def recursively_reduce_summaries(summaries: list[str]) -> str:
    if not summaries:
        return "No summary available."

    current_summaries = summaries
    level = 1

    while len(current_summaries) > 1:
        batches = pack_summaries_by_token_budget(
            current_summaries,
            SUMMARY_REDUCTION_INPUT_TOKEN_BUDGET,
        )

        if len(batches) == len(current_summaries):
            batches = force_summary_reduction_progress(current_summaries)

        print(
            f"Reducing {len(current_summaries)} summaries into "
            f"{len(batches)} batch summaries at level {level}"
        )

        current_summaries = [reduce_summary_batch(batch) for batch in batches]
        level += 1

    return summarize_text(current_summaries[0], max_sentences=3)
```

The fallback matters:

```py
if len(batches) == len(current_summaries):
    batches = force_summary_reduction_progress(current_summaries)
```

If each summary is too large to fit with another summary, simple budget packing makes no progress, so pairing summaries forces the reduction to continue.

---

## How to Implement the Hierarchical Index

Once you have document records and chunk records, create two kinds of stores:

- one store for document summaries
- one store for chunk summaries, grouped by document

Here's the document-summary store:

```py
document_summary_store = SimpleVectorStore(
    [
        SearchDocument(
            page_content=record.summary,
            metadata={"doc_id": record.doc_id, "source": record.source},
        )
        for record in document_records
    ]
)
```

Then group chunks by document:

```py
chunks_by_doc_id: dict[str, list[ChunkRecord]] = {}

for chunk in chunk_records:
    chunks_by_doc_id.setdefault(chunk.doc_id, []).append(chunk)
```

Then create one chunk-summary store per document:

```py
chunk_summary_stores_by_doc_id = {}

for doc_id, doc_chunks in chunks_by_doc_id.items():
    chunk_summary_stores_by_doc_id[doc_id] = SimpleVectorStore(
        [
            SearchDocument(
                page_content=chunk.summary,
                metadata={
                    "chunk_id": chunk.chunk_id,
                    "doc_id": chunk.doc_id,
                    "source": chunk.source,
                    "chunk_index": chunk.index,
                },
            )
            for chunk in doc_chunks
        ]
    )
```

This is what makes retrieval hierarchical: the first search chooses documents, while the second search only looks inside the chosen documents.

---

## How to Retrieve Through Summaries

At question time, search document summaries first:

```py
document_hits = index.document_summary_store.similarity_search(
    question,
    k=min(DOC_RETRIEVAL_K, len(index.documents_by_id)),
)
```

In these searches, `k` controls how many top-ranked results the store should return.

Then search chunk summaries inside each selected document:

```py
chunk_hits = []
seen_chunk_ids = set()

for document_hit in document_hits:
    doc_id = str(document_hit.metadata["doc_id"])
    chunk_store = index.chunk_summary_stores_by_doc_id[doc_id]
    doc_chunk_count = len(index.chunks_by_doc_id[doc_id])
    per_doc_hits = chunk_store.similarity_search(
        question,
        k=min(CHUNK_RETRIEVAL_K_PER_DOC, doc_chunk_count),
    )

    for chunk_hit in per_doc_hits:
        chunk_id = str(chunk_hit.metadata["chunk_id"])

        if chunk_id in seen_chunk_ids:
            continue

        chunk_hits.append(chunk_hit)
        seen_chunk_ids.add(chunk_id)
```

Notice what is being retrieved here: summaries.

The summary hit contains the `chunk_id`, but the final answer still uses the raw chunk text associated with that ID because the raw chunk preserves the original wording and details that the summary might have removed.

---

## How to Implement a Budgeted Raw Context

After chunk-summary retrieval, convert the hits back to raw chunks.

The demo also adds neighbor chunks:

```py
def candidate_raw_chunks(
    chunk_hits: list[SearchDocument],
    index: HierarchicalIndex,
) -> list[ChunkRecord]:
    candidates = []
    seen_chunk_ids = set()

    for chunk_hit in chunk_hits:
        chunk = index.chunks_by_id[str(chunk_hit.metadata["chunk_id"])]
        related_chunk_ids = [chunk.chunk_id]

        if EXPAND_NEIGHBOR_CHUNKS:
            related_chunk_ids.extend([chunk.next_chunk_id, chunk.previous_chunk_id])

        for chunk_id in related_chunk_ids:
            if chunk_id is None or chunk_id in seen_chunk_ids:
                continue

            candidates.append(index.chunks_by_id[chunk_id])
            seen_chunk_ids.add(chunk_id)

    return candidates
```

Then apply the final context budget:

```py
def build_raw_context(
    chunk_hits: list[SearchDocument],
    index: HierarchicalIndex,
) -> tuple[str, list[tuple[ChunkRecord, int]], list[tuple[ChunkRecord, int]]]:
    included_chunks = []
    skipped_chunks = []
    used_tokens = 0

    for chunk in candidate_raw_chunks(chunk_hits, index):
        raw_context_part = format_raw_chunk(chunk)
        raw_context_tokens = approximate_tokens(raw_context_part)

        if used_tokens + raw_context_tokens > RAW_CONTEXT_TOKEN_BUDGET:
            skipped_chunks.append((chunk, raw_context_tokens))
            continue

        included_chunks.append((chunk, raw_context_tokens))
        used_tokens += raw_context_tokens

    included_chunks.sort(key=lambda item: (item[0].source, item[0].index))

    context = "\n\n---\n\n".join(
        format_raw_chunk(chunk)
        for chunk, _tokens in included_chunks
    )

    return context, included_chunks, skipped_chunks
```

This step is where many RAG bugs become visible.

If the system retrieves a useful chunk but skips it because the prompt is full, the problem isn't document search. It's context budgeting.

---

## How to Run the Demo

The companion repository contains two versions of the same example.

From the companion repository root, run the Python version:

```sh
cd python
python3 -m small_context_rag_solution --question "Why can RAG fail when the context budget is too small?"
```

Run the TypeScript version:

```sh
cd typescript
npm install
npm run demo
```

You can also run either example interactively by leaving off the question flag. Type `q`, `quit`, or `exit` to leave interactive mode.

Python:

```sh
python3 -m small_context_rag_solution
```

TypeScript:

```sh
npm run build
npm start
```

The default raw context budget is small on purpose: `RAW_CONTEXT_TOKEN_BUDGET=250`. That makes skipped chunks visible.

---

## How to Interpret the 250 vs 1200 Token Test

Run the same question with two budgets.

Python:

```sh
RAW_CONTEXT_TOKEN_BUDGET=250 python3 -m small_context_rag_solution --question "Why can RAG fail when the context budget is too small?"
RAW_CONTEXT_TOKEN_BUDGET=1200 python3 -m small_context_rag_solution --question "Why can RAG fail when the context budget is too small?"
```

TypeScript:

```sh
RAW_CONTEXT_TOKEN_BUDGET=250 npm run demo
RAW_CONTEXT_TOKEN_BUDGET=1200 npm run demo
```

With the 250-token budget, the raw context builder includes only two chunks:

- `doc-003-large_rag_notes-chunk-004` (110 approx tokens)
- `doc-003-large_rag_notes-chunk-005` (121 approx tokens)

It skips five other selected chunks:

- `doc-003-large_rag_notes-chunk-003` (117 approx tokens)
- `doc-003-large_rag_notes-chunk-001` (116 approx tokens)
- `doc-003-large_rag_notes-chunk-002` (120 approx tokens)
- `doc-001-context_window_notes-chunk-001` (131 approx tokens)
- `doc-001-context_window_notes-chunk-002` (73 approx tokens)

With the 1200-token budget, every selected raw chunk fits:

- `doc-001-context_window_notes-chunk-001` (131 approx tokens)
- `doc-001-context_window_notes-chunk-002` (73 approx tokens)
- `doc-003-large_rag_notes-chunk-001` (116 approx tokens)
- `doc-003-large_rag_notes-chunk-002` (120 approx tokens)
- `doc-003-large_rag_notes-chunk-003` (117 approx tokens)
- `doc-003-large_rag_notes-chunk-004` (110 approx tokens)
- `doc-003-large_rag_notes-chunk-005` (121 approx tokens)

No selected raw chunks are skipped.

This diagram shows the difference between the two context budgets:

![Diagram comparing a 250-token raw context budget that includes two chunks and skips five with a 1200-token budget that includes seven chunks and skips none](https://cdn.hashnode.com/uploads/covers/6a2161a1d326f39f24ff91db/266bcd79-cd50-4e84-ade7-2d6bbaddd662.png)

A 1,200-token limit is still a very small context window for a real system, but it's much larger than 250. In this example, you can clearly see that the same retrieval route behaves differently when the prompt builder has more room.

This is why I like printing both included and skipped chunks. It helps answer a practical debugging question:

*Did retrieval miss the evidence, or did prompt assembly drop it?*

The demo uses a simplified answer step, so don't focus too much on the exact wording of the final answer. In a real LLM prompt, you would include instructions like:

- Answer only from the raw chunks below.
- If the raw chunks contain multiple relevant reasons, include all of them.
- Prefer a concise bullet list for multi-part answers.
- If the raw chunks don't contain enough evidence, say so.

More context doesn't automatically make the answer better. The prompt still has to tell the model how to use the extra evidence.

---

## How This Relates to Existing RAG Techniques

This pattern isn't brand new research. It's a practical combination of several ideas that already exist in the RAG ecosystem.

LangChain uses a related technique in its [ParentDocumentRetriever (<VPIcon icon="iconfont icon-github"/>`langchain-ai/langchain`)](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain_classic/retrievers/parent_document_retriever.py), which searches smaller child chunks and then returns their larger parent documents.

It is also related to the [<VPIcon icon="fas fa-globe"/>LlamaIndex Document Summary Index](https://developers.llamaindex.ai/python/examples/index_structs/doc_summary/docsummary/), which uses document summaries to select relevant documents and then retrieves the nodes for those documents.

And it's conceptually adjacent to [<VPIcon icon="iconfont icon-arxiv"/>RAPTOR](https://arxiv.org/abs/2401.18059), a retrieval method that builds a tree by recursively clustering and summarizing text.

The version in this article is intentionally simpler:

- No clustering.
- No framework requirement.
- No vector database required for the demo.
- No claim that summaries are enough for final answers.

The goal is to show a transparent pattern that's easy to understand under the hood and adapt to your own needs without relying on heavy frameworks. For my local-model work, the useful part was the separation:

- Summaries for retrieval
- Raw chunks for grounding
- Budget trace for debugging

---

## When to Use This Pattern

This pattern is useful when:

- you run local models with limited VRAM
- your context window is small or expensive
- you have many documents but only a few are relevant to each question
- you want inspectable retrieval traces
- you want summaries for search but raw text for answers
- you need to avoid unbounded prompts during both indexing and answering

It's less useful when:

- your source documents are already small
- your whole corpus fits comfortably in the prompt
- exact keyword search is enough
- you don't need multi-document routing
- you can afford to retrieve and rerank many raw chunks directly

There is also a tradeoff. This pattern adds indexing work:

- chunk summaries
- recursive summary reduction
- document summaries
- extra lookup maps

That's usually acceptable for document assistants, research tools, internal knowledge bases, and local-model projects where indexing can happen once and queries happen many times.

---

## Conclusion

Don't treat RAG as only "retrieve chunks and paste them into a prompt."

For small-context systems, retrieval needs routing and budgeting. Even on high-end hardware with very large context windows, good system design becomes fundamental as the project scales.

The pattern comes down to three practical rules:

- **Summaries help find relevant source material.**
- **Raw chunks ground the answer.**
- **Context budgeting decides what reaches the model.**

This solution helped me develop more reliable local RAG systems on constrained hardware. It also made failures easier to debug, because I could see exactly which summaries matched, which raw chunks were selected, and which raw chunks were skipped.

Whether you're running RAG locally or using a hosted model, if you're working with a small model, a limited context window, or a strict prompt budget, this pattern is worth trying before you spend money on a larger context window.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Small Context Window Limits in RAG Systems",
  "desc": "Retrieval-augmented generation, or RAG, is a pattern where an application retrieves relevant source material and adds it to a model prompt so the model can answer from that context. A larger context w",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-small-context-window-limits-in-rag-systems.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
