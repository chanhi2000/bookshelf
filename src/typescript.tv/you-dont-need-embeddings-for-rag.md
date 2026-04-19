---
lang: en-US
title: "You Don't Need Embeddings for RAG"
description: "Article(s) > You Don't Need Embeddings for RAG"
icon: iconfont icon-claude
category:
  - TypeScript
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - AI
  - LLM
  - Anthropic
  - Claude
  - MCP
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > You Don't Need Embeddings for RAG"
    - property: og:description
      content: "You Don't Need Embeddings for RAG"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/you-dont-need-embeddings-for-rag.html
prev: /programming/ts/articles/README.md
date: 2026-04-02
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
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
  name="You Don't Need Embeddings for RAG"
  desc="Build a RAG pipeline where Claude queries your PostgreSQL database directly via MCP. No vector store, no embeddings, no chunking. Just SQL and the Claude Agent SDK for TypeScript."
  url="https://typescript.tv/hands-on/you-dont-need-embeddings-for-rag"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Build a RAG pipeline where Claude queries your PostgreSQL database directly via MCP. No vector store, no embeddings, no chunking. Just SQL and the Claude Agent SDK for TypeScript.

Most RAG tutorials start with the same recipe: chunk your documents, generate embeddings, store them in a vector database, and run similarity searches at query time. It works, but it forces you to commit to a retrieval strategy before you know what questions your users will ask. There is a simpler approach. Give [<VPIcon icon="iconfont icon-mcp"/><VPIcon icon="iconfont icon-postgresql"/>Claude](https://anthropic.com/claude) direct access to your [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL](https://postgresql.org/) database through the [<VPIcon icon="iconfont icon-mcp"/>Model Context Protocol](https://modelcontextprotocol.io/) (MCP) and let it write its own SQL.

---

## What Changes Without Embeddings

In a traditional RAG setup, retrieval is a fixed pipeline. You embed the user's question into a vector, run cosine similarity against pre-embedded document chunks, and inject the top results into the prompt. This works well for simple lookups but falls apart when a question requires joining data from multiple tables, filtering by metadata, or reasoning over structured relationships.

When you replace the vector search with direct database access, the model becomes both retriever and generator. It discovers your schema, writes SQL queries, inspects the results, and runs follow-up queries if the first attempt doesn't return enough context. You write zero retrieval logic.

---

## Setting Up PostgreSQL with Docker Compose

You need a PostgreSQL database with some content to query against. Create a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` that spins up Postgres and seeds it with data on startup:

```yaml title="docker-compose.yml"
services:
  postgres:
    image: postgres:17
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: rag
      POSTGRES_PASSWORD: rag
      POSTGRES_DB: docs
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
```

The init script creates tables and populates them with sample documentation articles:

```sql :collapsed-lines title="init.sql"
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);
 
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);
 
INSERT INTO categories (name, description) VALUES
  ('Authentication', 'User identity and access control'),
  ('Database', 'Data storage and query patterns'),
  ('Deployment', 'Shipping to production');
 
INSERT INTO articles (title, content, category_id) VALUES
  (
    'Setting Up JWT Authentication',
    'JSON Web Tokens let you verify user identity without server-side sessions. Install jsonwebtoken and create a sign function that encodes user data with a secret. Verify tokens in middleware by decoding them and attaching the user to the request object. Always set an expiration time and rotate secrets periodically.',
    1
  ),
  (
    'OAuth2 with GitHub',
    'Register an OAuth app on GitHub to get a client ID and secret. Redirect users to GitHub''s authorization URL with your client ID. GitHub redirects back with a code that you exchange for an access token. Use the token to fetch the user''s profile from the GitHub API and create a local session.',
    1
  ),
  (
    'Connection Pooling with pg',
    'The pg library supports connection pooling out of the box. Create a Pool instance with your connection string and use pool.query() instead of creating individual clients. Set max to limit concurrent connections and idleTimeoutMillis to clean up stale ones. Always release clients back to the pool in a finally block.',
    2
  ),
  (
    'Running Migrations with node-pg-migrate',
    'Install node-pg-migrate and create a migrations directory. Each migration exports up and down functions that receive a pgm object. Use pgm.createTable, pgm.addColumn, and pgm.sql to define schema changes. Run migrations with npx node-pg-migrate up and roll back with npx node-pg-migrate down.',
    2
  ),
  (
    'Deploying to Fly.io',
    'Install the Fly CLI and run fly launch to generate a fly.toml. Set your Node.js version in the Dockerfile and configure health checks. Add secrets with fly secrets set DATABASE_URL=your_connection_string. Deploy with fly deploy and monitor logs with fly logs.',
    3
  );
```

Start the database:

```sh
docker compose up -d
```

---

## Installing Dependencies

The [Claude Agent SDK (<VPIcon icon="fa-brands fa-npm"/>`@anthropic-ai/claude-agent-sdk`)](https://npmjs.com/package/@anthropic-ai/claude-agent-sdk) connects to MCP servers as child processes and manages their lifecycle. [<VPIcon icon="fa-brands fa-npm"/>`@bytebase/dbhub`](https://npmjs.com/package/@bytebase/dbhub) is an MCP server from [<VPIcon icon="fas fa-globe"/>Bytebase](https://bytebase.com/) that gives Claude read-only SQL access to your database:

```sh
npm i @anthropic-ai/claude-agent-sdk@0.1.1 @bytebase/dbhub@0.11.6
```

You also need an `ANTHROPIC_API_KEY` environment variable. The Claude Agent SDK reads it automatically.

---

## Building the Query Function

Here is the complete implementation. The `ask` function sends a question to Claude, which uses the DBHub MCP server to query PostgreSQL and return a grounded answer:

```ts :collapsed-lines title="src/ask.ts"
import { query } from '@anthropic-ai/claude-agent-sdk';
 
const TIMEOUT_MS = 120_000;
 
const systemPrompt = `You are a technical assistant with access to a PostgreSQL database
containing documentation articles. When a user asks a question:
1. Use the database tools to search for relevant information
2. Make multiple queries if needed to gather comprehensive data
3. If the database lacks relevant information, say so clearly
Always provide accurate answers with references to the articles you found.`;
 
export async function ask(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
 
  try {
    for await (const event of query({
      prompt,
      options: {
        systemPrompt,
        model: 'claude-sonnet-4-5',
        canUseTool: async (_toolName, input) => ({
          behavior: 'allow' as const,
          updatedInput: input,
        }),
        mcpServers: {
          'dbhub-postgres': {
            type: 'stdio',
            command: 'npx',
            args: [
              '@bytebase/dbhub@0.11.6',
              '--transport',
              'stdio',
              '--readonly',
              '--dsn',
              'postgresql://rag:rag@localhost:5432/docs',
            ],
            env: {},
          },
        },
      },
    })) {
      if (event.type === 'result') {
        if (event.subtype === 'success') {
          return event.result;
        }
        throw new Error(`Query failed: ${event.subtype}`);
      }
    }
 
    throw new Error('No result received');
  } finally {
    clearTimeout(timeout);
  }
}
```

A few things to note about this code. The `mcpServers` config launches DBHub as a child process using `npx`. The `--readonly` flag ensures Claude can only run `SELECT` queries, so it cannot modify your data. The `canUseTool` callback controls which tool calls Claude is allowed to make. Here we allow everything, but in production you might want to inspect the SQL before it runs.

The `query` function returns an async iterable of events. You listen for the `result` event, which contains Claude's final answer after it has finished all its tool calls.

---

## Running a Query

Call the `ask` function from your entry point:

```ts title="src/index.ts"
import { ask } from './ask.js';
 
const question = process.argv[2] || 'How do I set up authentication?';
console.log(`Question: ${question}\n`);
 
const answer = await ask(question);
console.log(answer);
```

Run it with [<VPIcon icon="fa-brands fa-npm"/>`tsx`](https://npmjs.com/package/tsx):

```sh
npx tsx src/index.ts "How do I set up authentication?"
```

Behind the scenes, Claude will discover the database schema through the MCP handshake, write and execute SQL queries like `SELECT title, content FROM articles WHERE content ILIKE '%authentication%'`, read the results, and synthesize everything into a coherent answer.

Try a question that requires joining tables:

```sh
npx tsx src/index.ts "What database articles do you have?"
```

Claude will figure out that it needs to join `articles` with `categories` to give you a useful answer. It might run `SELECT a.title, c.name AS category FROM articles a JOIN categories c ON a.category_id = c.id WHERE c.name = 'Database'` without you writing any retrieval logic.

---

## Guarding Tool Calls

The `canUseTool` callback runs before every tool invocation. In the example above it allows everything, but you can inspect and reject queries:

```ts title="src/ask-guarded.ts"
canUseTool: async (toolName, input) => {
  const sql = (input as Record<string, unknown>).query;
  if (typeof sql === 'string') {
    const normalized = sql.toUpperCase();
    if (normalized.includes('DROP') || normalized.includes('DELETE')) {
      return {behavior: 'deny' as const, message: 'Destructive queries are not allowed'};
    }
  }
  return {behavior: 'allow' as const, updatedInput: input};
},
```

This is a basic safeguard. The `--readonly` flag on DBHub already prevents writes at the database level, but checking in `canUseTool` lets you block suspicious queries before they even reach the server.

---

## Trade-offs

Agentic RAG is not a replacement for traditional RAG. Each fits different situations.

Letting the model query your database directly works well when your data is relational and normalized across multiple tables, when the range of possible questions is too broad to anticipate at build time, or when answers require filtering, joining, and aggregating data in ways that a similarity search cannot express.

Traditional RAG with embeddings is the better choice when you need sub-second response times (vector search is a single hop), when you want lower cost per query (no multi-turn LLM calls), or when your data is unstructured text that benefits from semantic similarity matching.

The agentic approach trades latency and cost for flexibility. Each question may trigger multiple LLM turns with tool calls, which is slower and more expensive than a single vector lookup. For a developer support bot that handles complex, varied questions across structured data, the flexibility is worth it. For a search bar that needs instant results, embeddings are still the right call.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "You Don't Need Embeddings for RAG",
  "desc": "Build a RAG pipeline where Claude queries your PostgreSQL database directly via MCP. No vector store, no embeddings, no chunking. Just SQL and the Claude Agent SDK for TypeScript.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/you-dont-need-embeddings-for-rag.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
