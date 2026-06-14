---
lang: en-US
title: "How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs"
description: "Article(s) > How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs"
icon: fas fa-language
category:
  - Node.js
  - TypeScript
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ts
  - typsecript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs"
    - property: og:description
      content: "How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-production-rag-system-with-cloudflare-workers-handbook.html
prev: /programming/ts/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc3556fb-abe6-4aea-b9bd-83404319c1b9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs"
  desc="Most RAG tutorials show you a working demo and call it done. You copy the code, it runs locally, and then you try to put it in production and everything falls apart. This tutorial is different. I run "
  url="https://freecodecamp.org/news/build-a-production-rag-system-with-cloudflare-workers-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc3556fb-abe6-4aea-b9bd-83404319c1b9.png"/>

Most RAG tutorials show you a working demo and call it done. You copy the code, it runs locally, and then you try to put it in production and everything falls apart.

This tutorial is different. I run a production RAG system ([<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`)](https://github.com/dannwaneri/vectorize-mcp-worker)) that handles real traffic at a total cost of \\(5/month. The alternatives I evaluated ranged from \\)100–$200/month. The difference isn't magic. It's architecture.

Here, you'll build `rag-tutorial-simple`: a clean, minimal RAG chatbot deployed on Cloudflare Workers. No external API keys. No paid vector database subscriptions. No servers to manage. Just Cloudflare's free tier – Workers, Vectorize, and Workers AI – doing the heavy lifting at the edge.

::: info What You Will Build

By the end of this tutorial, you'll have a globally deployed RAG API that:

- Accepts a natural language question via HTTP
- Converts it to a vector embedding using Workers AI
- Searches a knowledge base stored in Cloudflare Vectorize
- Passes the retrieved context to an LLM (also on Workers AI) to generate an answer
- Returns a grounded, accurate response (not a hallucination)

The complete source code is available at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/rag-tutorial-simple`](https://github.com/dannwaneri/rag-tutorial-simple).

<SiteInfo
  name="dannwaneri/rag-tutorial-simple"
  desc="Contribute to dannwaneri/rag-tutorial-simple development by creating an account on GitHub."
  url="https://github.com/dannwaneri/rag-tutorial-simple/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cadb9f9bdd099225685f4da97b277d0443c3f14ae27bc8c3d549f379e6874831/dannwaneri/rag-tutorial-simple"/>

:::

::: note Prerequisites

This is an intermediate-level tutorial. You should be comfortable with:

- **JavaScript/TypeScript**: async/await, promises, basic types
- **HTTP APIs**: REST, request/response, JSON
- **Command line basics**: running npm commands, navigating directories

You will need:

- **Node.js 18 or higher**: check with `node --version`
- **A Cloudflare account**: free tier is fine, sign up at [<VPIcon icon="fa-brands fa-cloudflare"/>cloudflare.com](https://dash.cloudflare.com/sign-up)
- **A code editor**: VS Code recommended for TypeScript support

That's it. No OpenAI key. No credit card for embeddings. Let's build.

:::

---

## How RAG Works

Before you write any code, you'll need a clear mental model of what you're building. This section explains the three core components of a RAG system, how data flows between them, and why this architecture works at scale.

### The Mental Model

Think of a traditional LLM like a doctor who studied medicine for years but has been in a remote cabin with no internet since their graduation day. They are brilliant, but they only know what they knew when they left. Ask them about a drug approved last year and they'll either say they don't know or – worse – confidently give you wrong information.

RAG gives that doctor access to an up-to-date medical library. Before answering your question, they can look up the relevant pages, read them, and use that information to give you an accurate answer. Their training still matters (that is, they know how to read and interpret the information), but they're no longer limited to what they memorized years ago.

In technical terms, RAG works in three steps on every request:

1. **Retrieve**: find the most relevant documents from your knowledge base
2. **Augment**: add those documents to the LLM prompt as context
3. **Generate**: let the LLM produce an answer using both its training and the retrieved context

### The Three Components

Every RAG system has three moving parts. Understanding each one will help you debug problems and make better architectural decisions as you build.

#### The Embedding Model

An embedding model converts text into a vector – an array of numbers that represents the meaning of that text. The model you will use in this tutorial, `@cf/baai/bge-base-en-v1.5`, outputs 768 numbers for any piece of text you give it.

The critical property of embeddings is that semantically similar text produces numerically similar vectors. "How do I install Node.js?" and "What's the process for setting up Node?" will produce vectors that are close together. "How do I install Node.js?" and "What is the capital of France?" will produce vectors that are far apart.

This is what makes semantic search possible. You aren't matching keywords, you're matching meaning.

One rule you must never break: your documents and your queries must be embedded with the same model. If you embed your documents with `bge-base-en-v1.5` and your queries with a different model, the vectors won't be comparable and your searches will return garbage.

#### The Vector Database

The vector database stores your embeddings and lets you search them by similarity. In this tutorial, you'll use Cloudflare Vectorize.

When you run a similarity search, you pass in a query vector and Vectorize returns the K most similar vectors it has stored, along with their metadata and similarity scores. This is called approximate nearest neighbor search, and Vectorize is optimized to do it fast even across millions of vectors.

The key advantage of using Vectorize over an external vector database like Pinecone is co-location. Vectorize runs in the same Cloudflare network as your Worker. There's no external API call, no authentication roundtrip, and no network latency between your application and your database.

#### The Language Model

The LLM is responsible for one thing: reading the retrieved context and generating a natural language answer. It doesn't search anything. It doesn't decide what's relevant. It just reads what you give it and writes a response.

This separation of concerns is intentional. The LLM is good at language: understanding questions, synthesizing information, writing clearly. The vector database is good at retrieval: finding relevant documents fast. RAG combines their strengths without asking either component to do something it is not designed for.

In this tutorial you'll use `@cf/meta/llama-3.3-70b-instruct-fp8-fast` through Workers AI. No API key required.

### A Note on Visual Embeddings

If you plan to extend this system to search images, you may be tempted to use a vision-language model like CLIP to generate visual embeddings (vectors that represent the image itself rather than a text description of it). This sounds clever but works worse for RAG in practice.

Visual embeddings match pixel similarity. They are good for "find images that look like this one." They are poor for "find the login screen" or "find dashboards showing error rates" because those queries are about meaning, not pixels.

The better approach – used in production – is to pass the image through a multimodal model like Llama 4 Scout, which generates a detailed text description and extracts visible text via OCR. You then embed that description using the same BGE model as your other documents.

The result lives in one unified index, works with your existing query pipeline, and produces better search results than visual embeddings for RAG use cases.

Cloudflare Workers AI does not support CLIP anyway. But even if it did, descriptions would outperform it for semantic search.

### How a Query Flows Through the System

Here is exactly what happens when a user sends the question "What is RAG?" to your finished Worker:

1. **Step 1 – Embed the question (20-30ms)**: Your Worker calls Workers AI with the question text. The embedding model returns a 768-dimensional vector representing the meaning of the question.
2. **Step 2 – Search Vectorize (30-50ms)**: Your Worker passes that vector to Vectorize, which searches your knowledge base and returns the 3 most similar documents with their similarity scores.
3. **Step 3 – Filter and build context (< 1ms)**: Documents with a similarity score below 0.5 are discarded. The remaining document texts are joined into a context string.
4. **Step 4 – Generate the answer (500-1500ms)**: Your Worker sends the context and the question to the LLM. The LLM reads the context and generates a grounded answer.
5. **Step 5 – Return to the user**: The answer and source metadata are returned as JSON.

Total time: typically 600-1600ms end to end. The LLM generation step dominates. Everything else is fast.

### Why This Works at Scale

A common objection to Cloudflare RAG is that it cannot meet sub-200ms retrieval requirements. That objection comes from a specific architectural mistake: trying to run the entire RAG pipeline, including heavy embedding generation and reranking, inside a single synchronous request. That's the wrong architecture.

The architecture you're building in this tutorial separates the loading step (which is slow and runs once) from the query step (which is fast and runs on every request). By the time a user asks a question, your documents are already embedded and stored. The query pipeline only needs to embed the question, run one vector search, and call the LLM. Those three steps are fast.

My production system ([<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`](https://github.com/dannwaneri/vectorize-mcp-worker)) runs this architecture and handles real traffic at $5/month. The [full performance breakdown is here (<VPIcon icon="fa-brands fa-dev"/>`dannwaneri`)](https://dev.to/dannwaneri/i-built-a-production-rag-system-for-5month-most-alternatives-cost-100-200-21hj). Cloudflare RAG works. You just have to build it correctly.

---

## How to Set Up Your Project

In this section, you'll scaffold a Cloudflare Worker, create a Vectorize index to store your embeddings, and configure the bindings that connect them together.

### How to Create the Project

Open your terminal and create a new directory for the project.

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
mkdir rag-tutorial-simple && cd rag-tutorial-simple
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
mkdir rag-tutorial-simple
cd rag-tutorial-simple
```

:::

Then run the Cloudflare scaffolding tool:

```sh
npm create cloudflare@latest
```

Answer the prompts like this:

- **Directory/app name**: `rag-tutorial-simple`
- **What would you like to start with?** Hello World example
- **TypeScript?** Yes
- **Deploy?** No

When it finishes, you'll have a working TypeScript Worker with Wrangler already configured.

### How to Create the Vectorize Index

Vectorize is Cloudflare's vector database. It lives in the same network as your Worker, which means no external API call and no added latency when you search it.

```sh
npx wrangler vectorize create rag-tutorial-index --dimensions=768 --metric=cosine
```

Two things to note here.

`--dimensions=768` tells Vectorize how many numbers make up each embedding. This must match the output of the embedding model you use. The model you will use (`@cf/baai/bge-base-en-v1.5`) outputs 768 dimensions. If this number doesn't match, your searches will fail.

`--metric=cosine` is how Vectorize measures similarity between vectors. Cosine similarity measures the angle between two vectors rather than the distance between them. For text embeddings, this captures semantic meaning more accurately than other metrics.

### How to Configure <VPIcon icon="iconfont icon-toml"/>`wrangler.toml`

Open <VPIcon icon="iconfont icon-toml"/>`wrangler.toml` and replace its contents with the following:

```toml title="wrangler.toml"
name = "rag-tutorial-simple"
main = "src/index.ts"
compatibility_date = "2026-02-25"

[[vectorize]]
binding = "VECTORIZE"
index_name = "rag-tutorial-index"

[ai]
binding = "AI"
```

The `[[vectorize]]` block connects your Worker to the index you just created. The `[ai]` block gives your Worker access to Workers AI – both for generating embeddings and for running the language model that produces answers.

Notice that there are no API keys anywhere. Cloudflare handles authentication internally because everything – your Worker, Vectorize, and Workers AI – runs under the same account.

### How to Update <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`

Open <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts` and replace the generated code with this:

```ts title="index.ts"
export interface Env {
  VECTORIZE: VectorizeIndex;
  AI: Ai;
  LOAD_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response("RAG tutorial worker is running", { status: 200 });
  },
};
```

The `Env` interface tells TypeScript what bindings are available inside your Worker. `VectorizeIndex` and `Ai` are types provided by Cloudflare's type definitions.

### How to Verify Your Setup

Start the local development server:

```sh
npx wrangler dev
```

Open your browser and visit `http://localhost:8787`. You should see:

```plaintext
RAG tutorial worker is running
```

You will see two warnings in your terminal. Both are expected.

The first warning says that Vectorize doesn't support local mode. This means Vectorize queries won't work during local development unless you run with the `--remote` flag. You'll do this later when testing the full pipeline.

The second warning says the AI binding always accesses remote resources. This means that embedding generation and LLM calls always hit Cloudflare's servers, even in local development. This is fine: usage within the free tier limits costs nothing.

Your project structure at this point:

```sh title="file structure"
rag-tutorial-simple/
├── scripts/
│   └── knowledge-base.ts
├── src/
│   └── index.ts
├── wrangler.toml
├── package.json
└── tsconfig.json
```

---

## How to Build the Data Pipeline

The data pipeline is responsible for two things: generating embeddings for each document in your knowledge base, and storing those embeddings in Vectorize. You'll handle both steps inside the Worker itself using a `/load` endpoint.

This approach has a key advantage: you don't need an API token, an Account ID, or any external tooling. Everything uses the bindings you already configured in <VPIcon icon="iconfont icon-toml"/>`wrangler.toml`.

### How to Create the Knowledge Base

Create a <VPIcon icon="fas fa-folder-open"/>`scripts/` folder in your project and add a file called <VPIcon icon="iconfont icon-typescript"/>`knowledge-base.ts`:

```sh
mkdir scripts
```

Add your documents to <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-typescript"/>`knowledge-base.ts`:

```ts :collapsed-lines title="scripts/knowledge-base.ts"
export const documents = [
  {
    id: "1",
    text: "Cloudflare Workers run JavaScript at the edge, in over 300 data centers worldwide. Requests are handled close to the user, reducing latency significantly compared to a single-region server.",
    metadata: { source: "cloudflare-docs", category: "workers" },
  },
  {
    id: "2",
    text: "Vectorize is Cloudflare's vector database. It stores embeddings and lets you search them by semantic similarity. It runs in the same network as your Worker, so there is no external API call needed.",
    metadata: { source: "cloudflare-docs", category: "vectorize" },
  },
  {
    id: "3",
    text: "Workers AI lets you run machine learning models directly on Cloudflare's infrastructure. You can generate embeddings and run LLM inference without leaving the Cloudflare network.",
    metadata: { source: "cloudflare-docs", category: "workers-ai" },
  },
  {
    id: "4",
    text: "RAG stands for Retrieval Augmented Generation. Instead of relying only on what the LLM was trained on, RAG retrieves relevant context from a knowledge base and adds it to the prompt before generating an answer.",
    metadata: { source: "ai-concepts", category: "rag" },
  },
  {
    id: "5",
    text: "An embedding is a numerical representation of text. Similar pieces of text produce similar embeddings. This is what makes semantic search possible — you search by meaning, not exact keywords.",
    metadata: { source: "ai-concepts", category: "embeddings" },
  },
  {
    id: "6",
    text: "The BGE model (bge-base-en-v1.5) is available through Workers AI. It generates 768-dimensional embeddings and works well for English semantic search tasks.",
    metadata: { source: "cloudflare-docs", category: "workers-ai" },
  },
  {
    id: "7",
    text: "Cosine similarity measures the angle between two vectors. For text embeddings, it captures semantic similarity regardless of text length, which makes it more reliable than Euclidean distance.",
    metadata: { source: "ai-concepts", category: "embeddings" },
  },
  {
    id: "8",
    text: "Cloudflare Workers have a free tier that includes 100,000 requests per day. Vectorize is available on both the Workers Free and Paid plans. The free tier lets you prototype and experiment. The Workers Paid plan starts at $5/month and includes higher usage allocations for production workloads.",
    metadata: { source: "cloudflare-docs", category: "pricing" },
  },
];
```

Each document has three fields. The `id` is a unique string that Vectorize uses to identify the vector. The `text` is what gets converted into an embedding. The `metadata` is stored alongside the vector and returned in search results. You'll use it later to display the source of each answer.

### Understanding Embeddings

Before writing the loading code, it helps to understand what you're actually generating.

An embedding is an array of 768 numbers that represents the meaning of a piece of text. The model reads a sentence and outputs those 768 numbers in a way where similar sentences produce similar arrays of numbers.

When a user asks a question, you convert that question into an embedding using the same model, then ask Vectorize to find the stored embeddings that are closest to it. The documents those embeddings came from are your most relevant context.

This is why the model choice matters: your documents and your queries must be embedded with the same model, or the similarity scores will be meaningless.

### How to Build the Load Endpoint

Open <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts` and update it with a `/load` route. Here is the complete file at this stage:

```ts :collapsed-lines title="index.ts"
import { documents } from "../scripts/knowledge-base";

export interface Env {
  VECTORIZE: VectorizeIndex;
  AI: Ai;
  LOAD_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/load" && request.method === "POST") {
      return handleLoad(env, request);
    }

    return new Response("RAG tutorial worker is running", { status: 200 });
  },
};

async function handleLoad(env: Env, request: Request): Promise<Response> {
  const authHeader = request.headers.get("X-Load-Secret");
  if (authHeader !== env.LOAD_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { id: string; status: string }[] = [];

  for (const doc of documents) {
    const response = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [doc.text],
    }) as { data: number[][] };

    await env.VECTORIZE.upsert([
      {
        id: doc.id,
        values: response.data[0],
        metadata: {
          ...doc.metadata,
          text: doc.text,
        },
      },
    ]);

    results.push({ id: doc.id, status: "loaded" });
  }

  return Response.json({ success: true, loaded: results });
}
```

Notice that `env.AI.run()` and `env.VECTORIZE.upsert()` require no credentials. The bindings handle authentication because the Worker runs inside your Cloudflare account. There are no secrets to manage for internal service communication.

The `text: doc.text` field inside `metadata` is important. Vectorize stores the vector values and whatever metadata you provide, but it doesn't store the original text separately. By including the text in metadata, you can retrieve and display it in search results later.

The `as { data: number[][] }` cast is necessary because the TypeScript type definitions for Workers AI do not yet reflect the exact return shape of every model. The actual response always contains a `data` array, and the cast tells TypeScript to trust that.

### How to Deploy and Load Your Knowledge Base

First, set the secret that will protect your load endpoint:

```sh
npx wrangler secret put LOAD_SECRET
```

Type a strong value when prompted. Then deploy:

```sh
npx wrangler deploy
```

Trigger the load endpoint. You only need to do this once, or any time you update your knowledge base:

```sh
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/load \
-H "X-Load-Secret: your-secret-value"
```

On Windows PowerShell:

::: note Note

PowerShell uses backtick (<code>`</code>) for line continuation, not backslash.

```powershell
Invoke-WebRequest `
-Uri "https://rag-tutorial-simple.<your-subdomain>.workers.dev/load" `
-Method POST `
-Headers @{"X-Load-Secret"="your-secret-value"} `
-UseBasicParsing
```

:::

You should see:

```json
{
  "success": true,
  "loaded": [
    { "id": "1", "status": "loaded" },
    { "id": "2", "status": "loaded" },
    { "id": "3", "status": "loaded" },
    { "id": "4", "status": "loaded" },
    { "id": "5", "status": "loaded" },
    { "id": "6", "status": "loaded" },
    { "id": "7", "status": "loaded" },
    { "id": "8", "status": "loaded" }
  ]
}
```

Your knowledge base is now stored in Vectorize as vectors. In the next section, you'll build the query pipeline that searches those vectors and generates answers.

---

## How to Build the Query Pipeline

The query pipeline is the core of your RAG system. When a user sends a question, the pipeline runs four steps in sequence: embed the question, search Vectorize, build context from the results, and generate an answer with the LLM.

Add a `/query` route to your fetch handler and the complete `handleQuery` function. Here is the full updated `src/`<VPIcon icon="iconfont icon-typsecript"/>`index.ts`:

```ts :collapsed-lines title="index.ts"
import { documents } from "../scripts/knowledge-base";

export interface Env {
  VECTORIZE: VectorizeIndex;
  AI: Ai;
  LOAD_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/load" && request.method === "POST") {
      return handleLoad(env, request);
    }

    if (url.pathname === "/query" && request.method === "POST") {
      return handleQuery(request, env);
    }

    return new Response("RAG tutorial worker is running", { status: 200 });
  },
};

async function handleLoad(env: Env, request: Request): Promise<Response> {
  const authHeader = request.headers.get("X-Load-Secret");
  if (authHeader !== env.LOAD_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { id: string; status: string }[] = [];

  for (const doc of documents) {
    const response = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [doc.text],
    }) as { data: number[][] };

    await env.VECTORIZE.upsert([
      {
        id: doc.id,
        values: response.data[0],
        metadata: {
          ...doc.metadata,
          text: doc.text,
        },
      },
    ]);

    results.push({ id: doc.id, status: "loaded" });
  }

  return Response.json({ success: true, loaded: results });
}

async function handleQuery(request: Request, env: Env): Promise<Response> {
  const body = await request.json() as { question: string };

  if (!body.question) {
    return Response.json({ error: "question is required" }, { status: 400 });
  }

  // Step 1: Embed the question using the same model as your documents
  const embeddingResponse = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: [body.question],
  }) as { data: number[][] };

  // Step 2: Search Vectorize for the 3 most similar documents
  const searchResults = await env.VECTORIZE.query(
    embeddingResponse.data[0],
    {
      topK: 3,
      returnMetadata: "all",
    }
  );

  // Step 3: Build context from results above the similarity threshold
  const context = searchResults.matches
    .filter((match) => match.score > 0.5)
    .map((match) => match.metadata?.text as string)
    .filter(Boolean)
    .join("\n\n");

  if (!context) {
    return Response.json({
      answer: "I could not find relevant information to answer that question.",
      sources: [],
    });
  }

  // Step 4: Generate an answer using the retrieved context
  const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Answer the question using only the context provided. If the context does not contain enough information, say so.",
      },
      {
        role: "user",
        content: `Context:\n\({context}\n\nQuestion: \){body.question}`,
      },
    ],
    max_tokens: 256,
  }) as { response: string };

  // Step 5: Return the answer with its sources
  const sources = searchResults.matches
    .filter((match) => match.score > 0.5)
    .map((match) => match.metadata?.source as string)
    .filter(Boolean);

  return Response.json({
    answer: aiResponse.response,
    sources: [...new Set(sources)],
  });
}
```

::: info What each step does:

1. **Step 1 – Embed the question**: You convert the user's question into a 768-dimensional vector using the same model you used when loading your documents. This is critical: the question and the documents must be embedded with the same model or the similarity scores will be meaningless.
2. **Step 2 – Search Vectorize**: You pass the question embedding to Vectorize, which returns the three most similar documents. `returnMetadata: "all"` tells Vectorize to include the metadata you stored alongside each vector — including the original text.
3. **Step 3 – Build context**: You filter out any results with a similarity score below 0.5 and join the remaining document texts into a single context string. The 0.5 threshold prevents the LLM from receiving irrelevant documents just because nothing better matched.
4. **Step 4 – Generate the answer**: You pass the context and the question to the LLM using the chat format with `messages`. The system prompt explicitly instructs the model to answer using only the provided context. This is what keeps the LLM grounded. Without this instruction, it will ignore your context and answer from its training data instead.
5. **Step 5 – Return sources**: You include the source metadata in the response so callers know which documents the answer came from. The `Set` deduplicates sources in case multiple chunks came from the same document.

:::

### How to Test the Query Pipeline

Deploy your Worker:

```sh
npx wrangler deploy
```

Send a question:

```sh
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/query \
-H "Content-Type: application/json" \
-d '{"question": "What is RAG?"}'
```

On Windows PowerShell:

```powershell
Invoke-WebRequest `
-Uri "https://rag-tutorial-simple.<your-subdomain>.workers.dev/query" `
-Method POST `
-ContentType "application/json" `
-Body '{"question": "What is RAG?"}' `
-UseBasicParsing
```

You should receive a response like this:

```json
{
  "answer": "RAG stands for Retrieval Augmented Generation. It's a method that enhances generation by retrieving relevant context from a knowledge base and adding it to the prompt before generating an answer.",
  "sources": ["ai-concepts"]
}
```

The answer came from your knowledge base, not from the LLM's training data. That's the entire point of RAG: grounded, verifiable answers with traceable sources.

---

## How to Add Error Handling and Security

A tutorial that only shows the happy path is not production-ready. In this section, you'll add error handling to every step of the query pipeline and protect the `/load` endpoint from unauthorized access.

### How to Secure the Load Endpoint

The `/load` endpoint generates embeddings and writes to your Vectorize index. Without protection, anyone who discovers your Worker URL can trigger it repeatedly, consuming your Workers AI quota and overwriting your data.

The `LOAD_SECRET` binding you added to `Env` and the `wrangler secret put` command you ran earlier handle this. The check at the top of `handleLoad` rejects any request that doesn't include the correct secret header:

```ts
const authHeader = request.headers.get("X-Load-Secret");
if (authHeader !== env.LOAD_SECRET) {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
```

A request without the header returns `{"error":"Unauthorized"}` with a 401 status. The secret itself is stored as an encrypted environment variable in your Worker. It never appears in your code or <VPIcon icon="iconfont icon-toml"/>`wrangler.toml`.

To trigger the load endpoint, you must include the secret in the request header:

```sh
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/load \
-H "X-Load-Secret: your-secret-value"
```

### How to Handle Query Errors

Replace your `handleQuery` function with this hardened version:

```ts :collapsed-lines title="index.ts"
async function handleQuery(request: Request, env: Env): Promise<Response> {
  // Guard against malformed request body
  let body: { question: string };
  try {
    body = await request.json() as { question: string };
  } catch {
    return Response.json({ error: "Invalid JSON in request body" }, { status: 400 });
  }

  if (!body.question || typeof body.question !== "string" || body.question.trim() === "") {
    return Response.json({ error: "question must be a non-empty string" }, { status: 400 });
  }

  // Sanitize: trim whitespace and cap length
  const question = body.question.trim().slice(0, 500);

  // Step 1: Embed the question
  let embeddingResponse: { data: number[][] };
  try {
    embeddingResponse = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [question],
    }) as { data: number[][] };
  } catch (err) {
    console.error("Embedding generation failed:", err);
    return Response.json({ error: "Failed to process your question" }, { status: 503 });
  }

  // Step 2: Search Vectorize
  let searchResults: Awaited<ReturnType<typeof env.VECTORIZE.query>>;
  try {
    searchResults = await env.VECTORIZE.query(
      embeddingResponse.data[0],
      { topK: 3, returnMetadata: "all" }
    );
  } catch (err) {
    console.error("Vectorize query failed:", err);
    return Response.json({ error: "Failed to search knowledge base" }, { status: 503 });
  }

  // Step 3: Build context
  const context = searchResults.matches
    .filter((match) => match.score > 0.5)
    .map((match) => match.metadata?.text as string)
    .filter(Boolean)
    .join("\n\n");

  if (!context) {
    return Response.json({
      answer: "I could not find relevant information to answer that question. Try rephrasing or asking something else.",
      sources: [],
    });
  }

  // Step 4: Generate answer
  let aiResponse: { response: string };
  try {
    aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer the question using only the context provided. If the context does not contain enough information, say so.",
        },
        {
          role: "user",
          content: `Context:\n\({context}\n\nQuestion: \){question}`,
        },
      ],
      max_tokens: 256,
    }) as { response: string };
  } catch (err) {
    console.error("LLM generation failed:", err);
    return Response.json({ error: "Failed to generate an answer" }, { status: 503 });
  }

  // Step 5: Return answer with sources
  const sources = searchResults.matches
    .filter((match) => match.score > 0.5)
    .map((match) => match.metadata?.source as string)
    .filter(Boolean);

  return Response.json({
    answer: aiResponse.response,
    sources: [...new Set(sources)],
  });
}
```

::: info What each error handling decision means:

- **`try/catch` around `request.json()`**: `request.json()` throws if the body is not valid JSON. Without this catch, a malformed request crashes your Worker with an unhandled 500 error. With it, the caller gets a clear 400 explaining what went wrong.
- **Input validation before processing**: You check that `question` exists, is a string, and is not empty before calling any external service. This prevents wasted AI calls on invalid input.
- **`.slice(0, 500)` on the question**: This caps the input length before it reaches the embedding model. Without it, a malicious caller could send a very long string designed to inflate your AI usage or hit Workers CPU limits.
- **503 for AI and Vectorize failures**: HTTP 503 means "service temporarily unavailable." It signals to callers that the error is on the server side and the request can be retried.
- **`.filter(Boolean)` on context**: After mapping `match.metadata?.text`, some results may be `undefined` if metadata was stored without a `text` field. This filters them out before joining, preventing `"undefined"` from appearing in the context string you send to the LLM.

### How to Test Error Handling

Deploy your updated Worker:

```sh
npx wrangler deploy
```

Test each error case:

```sh
# Missing secret on load endpoint — should return 401
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/load

# Invalid JSON — should return 400
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/query \
-H "Content-Type: application/json" \
-d 'not json'

# Empty question — should return 400
curl -X POST https://rag-tutorial-simple.<your-subdomain>.workers.dev/query \
-H "Content-Type: application/json" \
-d '{"question": ""}'
```

---

## Performance and Cost Analysis

This section uses real production data from my [<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`](https://github.com/dannwaneri/vectorize-mcp-worker) deployment. It uses the same architecture you just built, measured from Port Harcourt, Nigeria to Cloudflare's edge.

### Real Performance Numbers

Here is what the pipeline actually costs in time on every request:

| Operation | Time |
| --- | --- |
| Embedding generation | 142ms |
| Vector search | 223ms |
| Response formatting | <5ms |
| **Total** | **~365ms** |

This covers embedding generation and vector search only – the retrieval layer. LLM generation adds 500-1500ms on top, which is why end-to-end response time typically runs 600-1600ms.

The embedding step and vector search dominate. Everything else is negligible. For context, a comparable setup using OpenAI embeddings and Pinecone would add two external API roundtrips on top of this, easily pushing total latency past 1 second.

These numbers come from a single-region measurement. Your actual latency will vary based on your location and Cloudflare's load at the time of the request. The architectural point holds regardless: co-locating everything on the edge eliminates inter-service network hops, which is where most latency in traditional RAG stacks comes from.

### Real Cost Breakdown

For 10,000 searches per day (300,000 per month) with 10,000 stored vectors:

#### This stack

| Service | Monthly Cost |
| --- | --- |
| Workers | ~$3 |
| Workers AI | ~$3-5 |
| Vectorize | ~$2 |
| **Total** | **$8-10** |

#### Traditional alternatives for the same volume

| Solution | Monthly Cost |
| --- | --- |
| Pinecone Standard | $50-70 |
| Weaviate Serverless | $25-40 |
| Self-hosted pgvector | $40-60 |

That is an 85-95% cost reduction depending on which alternative you compare against. For a bootstrapped startup adding semantic search, that difference is $1,500-2,000 per year.

### Why the Cost Difference Is So Large

Traditional RAG stacks have three cost problems that compound each other.

The first is idle compute. A dedicated server or container running your embedding service costs money even when no searches are happening. Cloudflare Workers charge only for actual execution time.

The second is inter-service data transfer. Every time your application calls an external service for an embedding, then calls a separate service for a search, you're paying for two external API calls with metered pricing. In this stack, both operations happen inside Cloudflare's network at no additional transfer cost.

The third is minimum plan pricing. Pinecone's Standard plan costs \\(50/month as a floor, regardless of how little you use it. Cloudflare's pricing scales from the \\)5/month Workers Paid plan base.

### When the Included Allocation Is Enough

For smaller usage levels, you may not pay beyond the $5/month Workers Paid base price:

- Workers: 10 million requests per month included
- Workers AI: generous daily neuron allocation included
- Vectorize: available on both Free and Paid plans, with a free allocation included

A side project, internal tool, or small business with under 3,000 searches per day will likely stay within the included allocations entirely.

### The Trade-off to Know About

This cost advantage comes with one operational constraint worth understanding before you build: Vectorize does not work in local development mode.

When you run `wrangler dev`, your Worker runs locally but Vectorize calls fail. You have to deploy to Cloudflare to test your vector search. For most development workflows this means testing your query logic locally with mocked responses, then deploying to a staging environment for full integration tests.

This is a real friction point. It's the honest trade-off for having a managed vector database with no infrastructure to operate.

---

## Conclusion

In this tutorial, you have built and deployed a production-ready RAG system on Cloudflare's edge network. Let's look at what you actually built and what it costs to run.

### What You Built

Your completed system has three endpoints:

- `GET /`: health check confirming the Worker is running
- `POST /load`: loads your knowledge base into Vectorize, protected by a secret header
- `POST /query`: accepts a question, retrieves relevant context, and returns a grounded answer with sources

The full query pipeline runs in four steps on every request:

1. The question is converted to a 768-dimensional embedding using `@cf/baai/bge-base-en-v1.5`
2. Vectorize finds the three most semantically similar documents
3. Documents above the 0.5 similarity threshold are assembled into context
4. Llama 3.3 generates an answer using only that context

Everything runs on Cloudflare's infrastructure. No external API keys. No separate vector database subscription. No servers to manage.

### What to Build Next

This tutorial covered the core RAG pattern. Here are four directions to take it further.

#### Add more documents

The knowledge base in this tutorial has 8 documents. A real system might have thousands. The loading pattern is identical: add documents to `knowledge-base.ts`, hit `/load` with your secret, and Vectorize handles the rest.

For very large knowledge bases, update `handleLoad` to batch documents in groups of 20-50 rather than upserting one at a time.

#### Improve chunking

Each document in this tutorial is a single short paragraph. Real-world documents like PDFs, articles, documentation pages need to be split into chunks before embedding. Chunk at natural boundaries like paragraphs and sentences, aim for 200-400 tokens per chunk, and include 50-token overlaps between chunks to preserve context across boundaries.

#### Add conversation history

The current system treats every query as independent. To support follow-up questions, store previous messages in a Cloudflare KV namespace and include the last 2-3 exchanges in the LLM `messages` array alongside the retrieved context.

#### Stream the response

For long answers, users stare at a blank screen until generation completes. Cloudflare Workers support streaming responses via `TransformStream`. Switching to streaming means the first tokens appear in under 100ms while the rest generates.

#### Consider dimensions vs reranking trade-offs

This tutorial uses `bge-base-en-v1.5` at 768 dimensions. My production system uses `bge-small-en-v1.5` at 384 dimensions. Testing showed upgrading from 384 to 768 dims only improved accuracy by about 2%, but doubled cost and latency.

Adding a reranker (`@cf/baai/bge-reranker-base`) gave a larger accuracy improvement than the dimension upgrade for a fraction of the cost. The exact improvement will vary by domain and query distribution — test both on your actual data before deciding. If you're optimizing for production, add a reranker before you increase dimensions.

### The Complete Project

Clone and deploy in five commands:

```sh
git clone https://github.com/dannwaneri/rag-tutorial-simple
cd rag-tutorial-simple
npm install
npx wrangler vectorize create rag-tutorial-index --dimensions=768 --metric=cosine
npx wrangler secret put LOAD_SECRET
npx wrangler deploy
```

Then load your knowledge base:

```sh
curl -X POST https://<your-worker>.workers.dev/load \
-H "X-Load-Secret: your-secret"
```

If you found this useful, the production system this tutorial is based on is open source at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/vectorize-mcp-worker`](https://github.com/dannwaneri/vectorize-mcp-worker). It extends this foundation with hybrid search combining vector and BM25, multimodal support for searching images with AI vision, a reranker for more accurate results, and a live dashboard. It runs on the same Cloudflare stack you just built – Workers, Vectorize, Workers AI – plus D1 for document storage.

One difference you'll notice: the production system uses `bge-small-en-v1.5` at 384 dimensions rather than the 768 dimensions in this tutorial. That is an intentional trade-off: the reranker adds more accuracy than the extra dimensions at lower cost. The jump from what you built today to that system is smaller than it looks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production RAG System with Cloudflare Workers – a Handbook for Devs",
  "desc": "Most RAG tutorials show you a working demo and call it done. You copy the code, it runs locally, and then you try to put it in production and everything falls apart. This tutorial is different. I run ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-production-rag-system-with-cloudflare-workers-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
