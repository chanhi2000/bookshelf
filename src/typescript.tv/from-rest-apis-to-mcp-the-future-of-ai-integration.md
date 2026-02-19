---
lang: en-US
title: "From REST APIs to MCP: The Future of AI Integration"
description: "Article(s) > From REST APIs to MCP: The Future of AI Integration"
icon: iconfont icon-typescript
category:
  - TypeScript
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
      content: "Article(s) > From REST APIs to MCP: The Future of AI Integration"
    - property: og:description
      content: "From REST APIs to MCP: The Future of AI Integration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/from-rest-apis-to-mcp-the-future-of-ai-integration.html
prev: /programming/ts/articles/README.md
date: 2025-11-13
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="From REST APIs to MCP: The Future of AI Integration"
  desc="REST APIs changed how applications talk to each other. Now MCP (Model Context Protocol) is changing how AI talks to your data. Learn why this matters for TypeScript developers."
  url="https://typescript.tv/hands-on/from-rest-apis-to-mcp-the-future-of-ai-integration"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

REST APIs changed how applications talk to each other. Now MCP (Model Context Protocol) is changing how AI talks to your data. Learn why this matters for TypeScript developers.

REST APIs revolutionized how applications communicate. You make an HTTP request, get JSON back, and build features on top of that data. Simple, standard, universal. But AI assistants need something different. They don't just fetch data, they need to understand what's available, execute actions, and maintain context across conversations. That's where [<VPIcon icon="iconfont icon-mcp"/>Model Context Protocol (MCP)](https://modelcontextprotocol.io/) comes in.

MCP is [<VPIcon icon="iconfont icon-anthropic"/>Anthropic's new open protocol](https://anthropic.com/news/model-context-protocol) for connecting AI assistants to data sources and tools. Think of it as REST for the AI era, designed specifically for how AI models work. Here's why TypeScript developers should pay attention.

---

## The Problem with REST APIs for AI

REST APIs work great when you know exactly what endpoint to call and what parameters to send. Your frontend makes a GET request to `/api/users/123`, gets back user data, and renders it. Straightforward.

But AI assistants operate differently. When a user asks "What were my sales last quarter?", the AI needs to discover what data sources are available, understand what each source can do, execute the right queries or actions, interpret the results in context, and remember this for follow-up questions.

With REST APIs, you'd need to hardcode every possible endpoint into the AI's knowledge and update the AI every time your API changes. You'd build complex parsing logic for different response formats, handle authentication separately for each service, and maintain context across multiple API calls manually.

This doesn't scale. Every new data source means updating your AI integration, and the AI can't discover capabilities on its own.

---

## Enter Model Context Protocol

MCP solves this by creating a standard way for AI to discover and interact with resources. Instead of teaching the AI about your specific REST endpoints, you expose an MCP server that describes what it can do.

Here's the key difference. With a REST API approach:

```ts
// AI needs to know this exists
const response = await fetch('https://api.company.com/v1/sales?quarter=Q4&year=2024');
const data = await response.json();
```

With MCP:

```ts
// AI discovers this automatically
const server = new MCPServer({
  tools: [
    {
      name: 'get_sales_data',
      description: 'Retrieve sales data for a specific time period',
      inputSchema: {
        type: 'object',
        properties: {
          quarter: { type: 'string' },
          year: { type: 'number' },
        },
      },
    },
  ],
});
```

The AI sees `get_sales_data`, understands what it does from the description, knows what parameters it needs from the schema, and can call it when relevant.

---

## How MCP Works

MCP server define [<VPIcon icon="iconfont icon-mcp"/>three core primitives](https://modelcontextprotocol.io/specification/2025-06-18/server) that AI models can interact with (Resources, Prompts, Tools).

### Resources

**Resources** are data sources the AI can read, similar to GET endpoints but self-describing:

```ts
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'file:///logs/app.log',
      name: 'Application Logs',
      description: 'Recent application error logs',
      mimeType: 'text/plain',
    },
  ],
}));
```

The AI can discover these resources, understand what they contain, and read them when needed.

### Tools

**Tools** are actions the AI can execute, similar to POST/PUT/DELETE endpoints but with explicit schemas:

```ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'send_email') {
    const { to, subject, body } = request.params.arguments;
    await sendEmail(to, subject, body);
    return { content: [{ type: 'text', text: 'Email sent successfully' }] };
  }
});
```

### Prompts

**Prompts** are pre-packaged instructions or templates the AI can use:

```ts
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: 'code_review',
      description: 'Perform a thorough code review',
      arguments: [{ name: 'file_path', required: true }],
    },
  ],
}));
```

---

## Why TypeScript is Perfect for MCP

The [official MCP SDK (<VPIcon icon="iconfont icon-github"/>`modelcontextprotocol/typescript-sdk`)](https://github.com/modelcontextprotocol/typescript-sdk) is written in TypeScript, and for good reason. MCP relies heavily on schemas to describe what's available and what inputs are valid. TypeScript's type system maps perfectly to this:

```ts
import { z } from 'zod';
 
const GetUserSchema = z.object({
  userId: z.string().uuid(),
  includeOrders: z.boolean().optional(),
});
 
type GetUserInput = z.infer<typeof GetUserSchema>;
 
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_user') {
    // TypeScript knows the exact shape of this
    const input = GetUserSchema.parse(request.params.arguments);
    const user = await fetchUser(input.userId, input.includeOrders);
    return { content: [{ type: 'text', text: JSON.stringify(user) }] };
  }
});
```

You get compile-time safety, runtime validation, and clear contracts between your server and the AI, all in one language.

---

## Real-World Example: Database Access

Here's how you'd expose a PostgreSQL database to AI using MCP:

```ts :collapsed-lines
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Client } from 'pg';
 
const server = new Server({
  name: 'postgres-mcp',
  version: '1.0.0',
});
 
const db = new Client({
  connectionString: process.env.DATABASE_URL,
});
 
await db.connect();
 
// Expose tables as resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const tables = await db.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
  `);
 
  return {
    resources: tables.rows.map((row) => ({
      uri: `postgres://table/${row.table_name}`,
      name: row.table_name,
      description: `Database table: ${row.table_name}`,
      mimeType: 'application/json',
    })),
  };
});
 
// Expose query execution as a tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'execute_query') {
    const { query } = request.params.arguments as { query: string };
 
    // Add safety checks here!
    if (!query.toLowerCase().startsWith('select')) {
      throw new Error('Only SELECT queries allowed');
    }
 
    const result = await db.query(query);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result.rows, null, 2),
        },
      ],
    };
  }
});
 
const transport = new StdioServerTransport();
await server.connect(transport);
```

Now when you connect this to [<VPIcon icon="iconfont icon-claude"/>Claude Desktop](https://claude.com/download) or another MCP client, the AI can:

The AI can see what tables exist in your database, understand the schema, run queries when you ask questions, and remember previous query results.

All without you teaching it SQL or your specific database structure.

---

## Wait, Isn't This Just Swagger/OpenAPI?

If you're familiar with OpenAPI (Swagger), you might be thinking MCP sounds similar. Both describe what's available and what inputs are expected. But there are key differences.

OpenAPI documents existing REST endpoints. You build your API first, then generate documentation that describes the HTTP routes, request/response shapes, and parameters. It's great for human developers who need to understand how to call your API.

MCP defines capabilities for AI consumption. The schema isn't documentation, it's the contract. The AI doesn't make HTTP requests to specific URLs, it asks "what tools are available?" and gets back a dynamic list. The MCP server decides what to expose based on context, permissions, or state.

Here's the practical difference. With OpenAPI:

```yaml
# Static OpenAPI spec
paths:
  /users/{userId}:
    get:
      parameters:
        - name: userId
          in: path
          required: true
```

The AI needs to know that this path exists, construct the URL with the right parameter, make an HTTP GET request, and parse the response. It's hardcoded knowledge.

With MCP:

```ts
// Dynamic MCP server
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Can change based on user permissions, time of day, etc.
  const tools = [];
 
  if (userHasPermission('read_users')) {
    tools.push({
      name: 'get_user',
      description: 'Fetch user information',
      inputSchema: {
        /* ... */
      },
    });
  }
 
  return { tools };
});
```

The AI discovers this at runtime. If permissions change, the tool disappears from the list automatically. No updated documentation, no hardcoded endpoints. OpenAPI is for developers reading docs, while MCP is for AI discovering capabilities.

You could theoretically use OpenAPI specs to generate MCP servers, and some tools might do that. But MCP's design allows for dynamic behavior, contextual responses, and stateful interactions that static API documentation can't provide.

---

## MCP vs REST: Key Differences

| Aspect | REST API | MCP |
| --- | --- | --- |
| Discovery | Static documentation | Dynamic, self-describing |
| Purpose | Application-to-application | AI-to-data |
| Schemas | Optional (OpenAPI) | Required and enforced |
| State | Stateless | Contextual across requests |
| Transport | HTTP | stdio, SSE, or HTTP |
| Updates | Manual integration | Automatic discovery |
| Use Case | General data exchange | AI context and tool execution |

---

## Getting Started with MCP

The fastest way to try MCP is with [<VPIcon icon="iconfont icon-claude"/>Claude Desktop](https://claude.ai/download):

1. Install the [MCP SDK (<VPIcon icon="fa-brands fa-npm"/>`@modelcontextprotocol/sdk`)](https://npmjs.com/package/@modelcontextprotocol/sdk):

```sh
npm install @modelcontextprotocol/sdk
```

2. Create a simple server (save as `server.ts`):

```ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
 
const server = new Server({
  name: 'hello-mcp',
  version: '1.0.0',
});
 
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_time',
      description: 'Get the current time',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));
 
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_time') {
    return {
      content: [{ type: 'text', text: new Date().toISOString() }],
    };
  }
});
 
const transport = new StdioServerTransport();
await server.connect(transport);
```

3. Register it in Claude Desktop's config (on macOS: <VPIcon icon="fas fa-folder-open"/>`~/Library/Application Support/Claude/`<VPIcon icon="iconfont icon-json"/>`claude_desktop_config.json`):

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "hello-mcp": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

4. Restart Claude Desktop and ask "What time is it?" - it will use your MCP tool!

---

## The Future is Contextual

REST APIs aren't going anywhere. They're still perfect for traditional application integrations. But as AI becomes more central to how we build software, we need protocols designed for how AI works.

MCP provides that foundation. It lets AI discover capabilities, execute tools safely, and maintain context, all through a standard protocol. And because it's built with TypeScript, we get type safety and excellent developer experience.

The momentum behind MCP is significant. While Anthropic created the protocol, OpenAI has also adopted it as the foundation for their [<VPIcon icon="iconfont icon-openai"/>ChatGPT Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/), making MCP a cross-platform standard rather than a vendor-specific solution. When both major AI platforms standardize on the same protocol, it's a strong signal that this is the direction the industry is heading.

::: info

As more tools adopt MCP, AI assistants will be able to seamlessly interact with databases, APIs, file systems, and custom business logic without hardcoded integrations. You can explore existing MCP servers in the [official servers repository (<VPIcon icon="iconfont icon-github"/>`modelcontextprotocol/servers`)](https://github.com/modelcontextprotocol/servers) to see what's already available.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From REST APIs to MCP: The Future of AI Integration",
  "desc": "REST APIs changed how applications talk to each other. Now MCP (Model Context Protocol) is changing how AI talks to your data. Learn why this matters for TypeScript developers.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/from-rest-apis-to-mcp-the-future-of-ai-integration.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
