---
lang: en-US
title: "How to Build a Self-Learning RAG System with Knowledge Reflection"
description: "Article(s) > How to Build a Self-Learning RAG System with Knowledge Reflection"
icon: fa-brands fa-node
category:
  - Node.js
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
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
      content: "Article(s) > How to Build a Self-Learning RAG System with Knowledge Reflection"
    - property: og:description
      content: "How to Build a Self-Learning RAG System with Knowledge Reflection"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-self-learning-rag-system-with-knowledge-reflection.html
prev: /programming/js-node/articles/README.md
date: 2026-04-25
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d4567606-0d92-434c-8fd1-6137549350cf.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Build a Self-Learning RAG System with Knowledge Reflection"
  desc="Every RAG system I've seen — including the one I wrote a handbook about on this site — has the same fundamental problem. It doesn't learn. You ingest 500 documents. You ask a question. The system retr"
  url="https://freecodecamp.org/news/how-to-build-a-self-learning-rag-system-with-knowledge-reflection"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d4567606-0d92-434c-8fd1-6137549350cf.png"/>

Every RAG system I've seen — including the one I wrote a handbook about on this site — has the same fundamental problem.

It doesn't learn.

You ingest 500 documents. You ask a question. The system retrieves the three most similar chunks and hands them to the LLM. Repeat for the next query.

The system knows exactly as much as it did on day one. It's a library that never builds a card catalog, never cross-references its own shelves, never notices that three of its books are saying contradictory things.

That's what I set out to fix with a knowledge reflection layer. After every ingest, the system finds semantically related documents already in the index and asks an LLM to synthesise what's new, how it connects, and what gap remains. That synthesis gets embedded, stored, and boosted in search results.

The knowledge base gets smarter as you add more documents — not just bigger.

This tutorial shows you exactly how to build it.

::: info What You Will Build

In this tutorial, you'll build a post-ingest reflection pipeline that:

1. Fires automatically after every document ingest
2. Finds the most semantically related documents already in the index
3. Asks Kimi K2.5 to synthesise a three-sentence insight linking the new document to existing knowledge
4. Stores that reflection with `doc_type=reflection` and a 1.5× ranking boost in search results
5. Consolidates reflections into summaries every three ingests

By the end, searching your knowledge base will surface both raw document chunks and reflection artifacts the system wrote on ingest.

:::

::: note Prerequisites

You will need:

- A Cloudflare account — free tier works
- Node.js v18+ and Wrangler CLI installed (`npm i -g wrangler`)
- Basic TypeScript familiarity

No external API keys. Everything runs on Cloudflare's infrastructure.

:::

---

## How to Set Up the Base System

If you have already built the RAG system from my [**freeCodeCamp handbook**](/freecodecamp.org/build-a-production-rag-system-with-cloudflare-workers-handbook.md), skip this section — your system is ready for the reflection layer.

If you're starting fresh, this section gets you to a working base in about 15 minutes.

### Scaffold the Project

```sh
npm create cloudflare@latest rag-reflection-system
cd rag-reflection-system
```

Choose: Hello World example → TypeScript → No deploy yet.

### Create the Vectorize Index and D1 Database

```sh
npx wrangler vectorize create rag-index --dimensions=384 --metric=cosine
npx wrangler d1 create rag-db
```

### Configure <VPIcon icon="iconfont icon-toml"/>`wrangler.toml`

```toml title="wranger.toml"
name = "rag-reflection-system"
main = "src/index.ts"
compatibility_date = "2026-01-01"

[[vectorize]]
binding = "VECTORIZE"
index_name = "rag-index"

[[d1_databases]]
binding = "DB"
database_name = "rag-db"
database_id = "YOUR_DB_ID"

[ai]
binding = "AI"
```

### Create the `documents` Table

```sql
-- migrations/001_init.sql
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  source TEXT,
  date_created TEXT DEFAULT (datetime('now'))
);
```

```sh
npx wrangler d1 execute rag-db --remote --file=./migrations/001_init.sql
```

### Add the `ingest` and `search` endpoints

Replace `src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts` with this minimal working system:

```ts :collapsed-liens title="index.ts"
export interface Env {
  VECTORIZE: VectorizeIndex;
  DB: D1Database;
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/ingest' && request.method === 'POST') {
      const { id, content, source } = await request.json() as any;

      const embResult = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
        text: [content.slice(0, 512)],
      }) as any;
      const vector = embResult.data[0];

      await env.VECTORIZE.upsert([{
        id,
        values: vector,
        metadata: { content: content.slice(0, 1000), source, doc_type: 'raw' },
      }]);

      await env.DB.prepare(
        'INSERT OR REPLACE INTO documents (id, content, source) VALUES (?, ?, ?)'
      ).bind(id, content, source ?? '').run();

      return Response.json({ success: true, id });
    }

    if (url.pathname === '/search' && request.method === 'POST') {
      const { query } = await request.json() as any;

      const embResult = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
        text: [query],
      }) as any;
      const vector = embResult.data[0];

      const results = await env.VECTORIZE.query(vector, {
        topK: 5,
        returnMetadata: 'all',
      });

      const context = results.matches
        .map(m => m.metadata?.content as string)
        .filter(Boolean)
        .join('\n\n');

      const answer = await env.AI.run('@cf/moonshotai/kimi-k2.5', {
        messages: [
          { role: 'system', content: 'Answer using only the context provided.' },
          { role: 'user', content: `Context:\n\({context}\n\nQuestion: \){query}` },
        ],
        max_tokens: 256,
      }) as any;

      return Response.json({ answer: answer.response, sources: results.matches.map(m => m.id) });
    }

    return new Response('RAG system running', { status: 200 });
  },
};
```

### Deploy and Verify

```sh
npx wrangler deploy
```

Test it:

```sh
# Ingest a document
curl -X POST https://your-worker.workers.dev/ingest \
-H "Content-Type: application/json" \
-d '{"id": "doc-001", "content": "Cursor pagination beats offset pagination for live-updating datasets because offset becomes unreliable when rows are inserted or deleted during pagination."}'

# Search
curl -X POST https://your-worker.workers.dev/search \
-H "Content-Type: application/json" \
-d '{"query": "what pagination approach should I use?"}'
```

If you get a grounded answer back, the base system is working. The next sections add the reflection layer on top of this foundation.

---

## Why Standard RAG Has a Memory Problem

Standard RAG retrieval is stateless. Every query goes in cold. The system has no memory of what it found before, no synthesis of what it learned across documents, and no growing understanding of what questions remain unanswered.

Imagine you've ingested 200 documents about your product. Twelve of them touch on a pricing decision made last year. No single one has the full picture — it's distributed across quarterly reports, meeting notes, an internal Slack export, a few Notion pages.

A user asks: "Why did we change our pricing structure?"

Standard RAG retrieves the three most similar chunks. If those three chunks collectively have the answer, great. If they don't — if the real answer requires synthesising across those twelve documents — the system has no mechanism for that. It returns fragments. The LLM makes its best guess.

The reflection layer addresses this directly. When the twelfth pricing document gets ingested, the system finds the eleven related documents, synthesises what connects them, and stores that synthesis as a retrievable artifact. The answer to "why did we change our pricing structure" exists in the index before anyone asks the question.

Not smarter retrieval — smarter indexing.

---

## Step 1: Schema Update

The reflection layer needs two new fields in your D1 documents table. Run this migration:

```sql title="migrations/003_add_reflection_fields.sql"
ALTER TABLE documents ADD COLUMN doc_type TEXT DEFAULT 'raw';
ALTER TABLE documents ADD COLUMN reflection_score REAL DEFAULT 0;
ALTER TABLE documents ADD COLUMN parent_reflection_id TEXT;
```

Apply it:

```sh
wrangler d1 execute mcp-knowledge-db --remote --file=./migrations/003_add_reflection_fields.sql
```

`doc_type` distinguishes raw documents (`raw`), single-document reflections (`reflection`), and consolidated multi-reflection summaries (`summary`). You'll use this field to filter — exposing only reflections to users who want the distilled view, or excluding them for users who want raw source chunks.

---

## Step 2: The Reflection Engine

Create <VPIcon icon="fas fa-folder-open"/>`src/engines/`<VPIcon icon="iconfont icon-typescript"/>`reflection.ts`. This is the core of the layer.

```ts :collapsed-lines title="engines/reflection.ts"
import { Env } from '../types/env';
import { resolveEmbeddingModel, resolveReflectionModel } from '../config/models';

const REFLECTION_BOOST = 1.5;
const CONSOLIDATION_THRESHOLD = 3; // consolidate every N new reflections

export async function reflect(
  newDocId: string,
  newDocContent: string,
  env: Env
): Promise<void> {
  // 1. Find semantically related documents already in the index
  const embModel = resolveEmbeddingModel(env.EMBEDDING_MODEL);
  const embResult = await env.AI.run(embModel.id as any, {
    text: [newDocContent.slice(0, 512)],
  });
  const queryVector = (embResult as any).data?.[0];
  if (!queryVector) return;

  const related = await env.VECTORIZE.query(queryVector, {
    topK: 5,
    filter: { doc_type: { $eq: 'raw' } },
    returnMetadata: 'all',
  });

  const relatedDocs = (related.matches ?? []).filter(
    m => m.id !== newDocId && (m.score ?? 0) > 0.65
  );

  if (relatedDocs.length === 0) return; // nothing related yet — skip

  // 2. Build synthesis prompt
  const relatedSummaries = relatedDocs
    .slice(0, 3)
    .map((m, i) => `Document \({i + 1}: \){String(m.metadata?.content ?? '').slice(0, 300)}`)
    .join('\n\n');

  const prompt = `You are synthesising knowledge across documents in a knowledge base.

New document:
${newDocContent.slice(0, 600)}

Related existing documents:
${relatedSummaries}

Write exactly three sentences:
1. What the new document adds that the existing documents don't already cover
2. How the new document connects to or extends the existing documents
3. What gap or question remains unanswered across all these documents

Be specific. Reference actual content. Do not summarise — synthesise.`;

  // 3. Call the reflection model
  const reflModel = resolveReflectionModel(env.REFLECTION_MODEL);
  const llmResp = await env.AI.run(reflModel.id as any, {
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 180,
  });

  const reflectionText = (llmResp as any)?.response?.trim();
  if (!reflectionText || reflectionText.length < 40) return;

  // 4. Embed and store the reflection
  const reflEmbResult = await env.AI.run(embModel.id as any, {
    text: [reflectionText],
  });
  const reflVector = (reflEmbResult as any).data?.[0];
  if (!reflVector) return;

  const reflectionId = `refl_\({newDocId}_\){Date.now()}`;

  await env.VECTORIZE.upsert([
    {
      id: reflectionId,
      values: reflVector,
      metadata: {
        content: reflectionText,
        doc_type: 'reflection',
        parent_id: newDocId,
        reflection_score: REFLECTION_BOOST,
        source_doc_ids: relatedDocs.map(m => m.id).join(','),
        date_created: new Date().toISOString(),
      },
    },
  ]);

  await env.DB.prepare(
    `INSERT INTO documents
     (id, content, doc_type, reflection_score, parent_id, date_created)
     VALUES (?, ?, 'reflection', ?, ?, ?)`
  )
    .bind(reflectionId, reflectionText, REFLECTION_BOOST, newDocId, new Date().toISOString())
    .run();

  // 5. Check if consolidation is due
  const recentCount = await env.DB
    .prepare(`SELECT COUNT(*) as cnt FROM documents WHERE doc_type = 'reflection' AND date_created > datetime('now', '-1 hour')`)
    .first<{ cnt: number }>();

  if ((recentCount?.cnt ?? 0) >= CONSOLIDATION_THRESHOLD) {
    await consolidate(env);
  }
}
```

Two things worth noting here.

First, the semantic threshold (`score > 0.65`) matters. Too low and you're synthesising unrelated documents. Too high and you're rarely finding connections. 0.65 works well with `bge-small`. You can bump it to 0.72 with `qwen3-0.6b` (1024d) where scores cluster higher.

The prompt structure is deliberate. Three sentences, each doing a specific job: what's new, how it connects, what remains. This keeps reflections useful for retrieval. A freeform synthesis prompt produces beautiful prose that doesn't retrieve well. This structure produces retrievable artifacts.

---

## Step 3: Consolidation

As reflections accumulate, they need their own synthesis layer — otherwise you're adding noise at a higher abstraction level.

Add this to <VPIcon icon="fas fa-folder-open"/>`src/engines/`<VPIcon icon="iconfont icon-typescript"/>`reflection.ts`:

```ts :collapsed-lines title="engines/reflection.ts"
export async function consolidate(env: Env): Promise<void> {
  // Fetch recent reflections not yet consolidated
  const recent = await env.DB
    .prepare(
      `SELECT id, content FROM documents
       WHERE doc_type = 'reflection'
       AND id NOT IN (
         SELECT DISTINCT parent_id FROM documents
         WHERE doc_type = 'summary' AND parent_id IS NOT NULL
       )
       ORDER BY date_created DESC
       LIMIT 6`
    )
    .all<{ id: string; content: string }>();

  if (!recent.results || recent.results.length < CONSOLIDATION_THRESHOLD) return;

  const reflectionTexts = recent.results.map((r, i) => `Reflection \({i + 1}: \){r.content}`).join('\n\n');

  const prompt = `You are consolidating multiple knowledge reflections into a single compressed insight.

${reflectionTexts}

Write two to three sentences that capture the most important cross-cutting pattern or tension across these reflections. What does the knowledge base now understand that it didn't before these documents were added? What's the most important open question?

Be precise. No preamble.`;

  const reflModel = resolveReflectionModel(env.REFLECTION_MODEL);
  const llmResp = await env.AI.run(reflModel.id as any, {
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 320,
  });

  const summaryText = (llmResp as any)?.response?.trim();
  if (!summaryText || summaryText.length < 40) return;

  const embModel = resolveEmbeddingModel(env.EMBEDDING_MODEL);
  const embResult = await env.AI.run(embModel.id as any, { text: [summaryText] });
  const summaryVector = (embResult as any).data?.[0];
  if (!summaryVector) return;

  const summaryId = `summary_${Date.now()}`;

  await env.VECTORIZE.upsert([
    {
      id: summaryId,
      values: summaryVector,
      metadata: {
        content: summaryText,
        doc_type: 'summary',
        reflection_score: REFLECTION_BOOST * 1.2,
        source_reflection_ids: recent.results.map(r => r.id).join(','),
        date_created: new Date().toISOString(),
      },
    },
  ]);

  await env.DB.prepare(
    `INSERT INTO documents (id, content, doc_type, reflection_score, date_created)
     VALUES (?, ?, 'summary', ?, ?)`
  )
    .bind(summaryId, summaryText, REFLECTION_BOOST * 1.2, new Date().toISOString())
    .run();
}
```

Summaries get a 1.2× multiplier on top of the base reflection boost. In search results, a summary synthesising twelve related documents should rank above any single document chunk on broad conceptual queries. On specific factual queries, the raw chunks will score higher. The ranking sorts itself.

---

## Step 4: Wire It Into Your Ingest Handler

The reflection runs as a background job. It doesn't block the ingest response — that would add 2–3 seconds to every ingest call.

In your <VPIcon icon="fas fa-folder-open"/>`src/handlers/`<VPIcon icon="iconfont icon-typescript"/>`ingest.ts`, after you've stored the document:

```ts title="handlers/ingest.ts"
import { reflect } from '../engines/reflection';

// ... existing ingest logic ...

// After VECTORIZE.upsert() and DB insert succeed:
ctx.waitUntil(
  reflect(documentId, content, env).catch(err => {
    console.warn('[reflection] failed for', documentId, err.message);
  })
);

return new Response(JSON.stringify({
  success: true,
  documentId,
  chunks: chunkCount,
  // ... rest of response
}), { headers: { 'Content-Type': 'application/json' } });
```

`ctx.waitUntil()` is the Cloudflare Workers primitive for background work. The response returns immediately. The reflection runs after. The ingest API stays fast.

The `.catch()` is important. A failed reflection should never fail an ingest. Raw documents are the source of truth. Reflections are derived value — useful, but not critical path.

---

## Step 5: Boost Reflections in Search

Add the reflection boost to your ranking logic in `src/engines/hybrid.ts`. After RRF fusion and before returning results:

```ts title="engines/hybrid.ts"
// Apply reflection boost
const boosted = results.map(r => ({
  ...r,
  score: r.doc_type === 'reflection' || r.doc_type === 'summary'
    ? r.score * (r.reflection_score ?? 1.5)
    : r.score,
}));

return boosted.sort((a, b) => b.score - a.score);
```

This is a post-fusion boost, not a pre-fusion rerank. The reasoning: apply RRF across all results first, so reflections earn their place on raw relevance before getting boosted. A reflection that would not rank in the top 20 on raw similarity shouldn't appear just because it has a boost multiplier.

---

## Step 6: Filtering by `doc_type`

Your search endpoint should accept a `doc_type` filter so callers can control what they see:

```ts
// In your search request handler:
const docTypeFilter = body.filters?.doc_type;

// Pass to Vectorize query:
const vectorFilter: Record<string, unknown> = {};
if (docTypeFilter) {
  vectorFilter.doc_type = docTypeFilter;
}
```

This gives callers three modes:

```sh
# Only reflections and summaries
POST /search
{ "query": "pricing decisions", "filters": { "doc_type": { "$in": ["reflection", "summary"] } } }

# Only source documents
POST /search
{ "query": "pricing decisions", "filters": { "doc_type": { "$eq": "raw" } } }

# Default: all types, reflections boosted
POST /search
{ "query": "pricing decisions" }
```

The default (no filter) is the most useful. Let the boost do its job. Restrict to raw when you need citations. Restrict to reflections when you want the synthesised view.

---

## What Changes After You Build This

At 200 documents, the difference becomes noticeable. Queries that previously returned five fragmented chunks now surface a reflection that already synthesised those chunks. Broad conceptual queries — "what do we know about X?" — start returning genuinely useful summaries instead of just the most-similar individual paragraph.

At 2,000 documents, the reflection layer is the most valuable part of the system. The raw chunks answer specific factual questions. The reflections and summaries answer conceptual questions that could not be answered from any single document. The system has learned something no individual document contains.

One failure mode worth knowing: if your embedding model has poor semantic clustering — old `bge-small` at 384d with mixed-domain documents — the related-documents retrieval step will surface weak connections and produce shallow reflections. The 0.65 threshold filters most of this out, but if you're seeing reflections that seem off-topic, your embeddings are the first thing to check.

---

## Deploying

```sh
wrangler d1 execute mcp-knowledge-db --remote --file=./migrations/003_add_reflection_fields.sql
wrangler deploy
```

Then ingest a few documents and watch what happens:

```sh
# Ingest document 1
curl -X POST https://your-worker.workers.dev/ingest \
-H "Authorization: Bearer YOUR_KEY" \
-H "Content-Type: application/json" \
-d '{"id": "doc-001", "content": "Your document text here..."}'

# After a few seconds, check if a reflection was created
curl "https://your-worker.workers.dev/search" \
-H "Authorization: Bearer YOUR_KEY" \
-H "Content-Type: application/json" \
-d '{"query": "your topic", "filters": {"doc_type": {"$eq": "reflection"}}}'
```

Reflections won't appear until there are related documents to synthesise. Ingest at least three documents on similar topics before expecting to see them.

---

## What to Build Next

The reflection layer as described here fires after every ingest. That's expensive at high ingest volume: if you're batch-importing 10,000 documents, you don't want 10,000 individual reflection calls.

For bulk ingestion, gate it: call `reflect()` only when a document's similarity search returns a match above 0.8, or batch-run reflection after the bulk import completes. The `POST /ingest/batch` endpoint in the [<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`](https://github.com/dannwaneri/vectorize-mcp-worker) does this.

The second thing worth building: surfacing reflections in your UI with a visual distinction. A search result that's a reflection should look different from a raw chunk. In the dashboard included in the repo, reflections render with a `💡` badge and a "synthesised from N documents" note.

Full source at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`](https://github.com/dannwaneri/vectorize-mcp-worker) — reflection engine, consolidation, batch ingest, dashboard, OpenAPI spec.

The codebase is TypeScript, deploys with a single `wrangler deploy`, runs for roughly $1–5/month at 10,000 queries/day.

Standard RAG retrieves. This learns.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Self-Learning RAG System with Knowledge Reflection",
  "desc": "Every RAG system I've seen — including the one I wrote a handbook about on this site — has the same fundamental problem. It doesn't learn. You ingest 500 documents. You ask a question. The system retr",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-self-learning-rag-system-with-knowledge-reflection.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
