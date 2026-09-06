---
lang: en-US
title: "How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB"
description: "Article(s) > How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB"
icon: iconfont icon-mcp
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Data Science
  - MongoDB
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
  - express
  - expressjs
  - express-js
  - devops
  - docker
  - data-science
  - mongodb
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
      content: "Article(s) > How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB"
    - property: og:description
      content: "How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scholarship-research-mcp-server-with-node-js-express-and-mongodb.html
prev: /ai/mcp/articles/README.md
date: 2026-09-05
isOriginal: false
author:
  - name: Chinedu Otutu
    url: https://freecodecamp.org/news/author/tutumantutu/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bc3b99da-15f4-4366-aede-4a2b567724aa.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
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
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
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
  name="How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB"
  desc="Scholarship hunting is a research job, not a single search box. You filter awards by field, GPA, citizenship, and deadline. You keep a shortlist. You write notes about essays and recommenders. Then yo"
  url="https://freecodecamp.org/news/how-to-build-a-scholarship-research-mcp-server-with-node-js-express-and-mongodb"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bc3b99da-15f4-4366-aede-4a2b567724aa.png"/>

Scholarship hunting is a research job, not a single search box. You filter awards by field, GPA, citizenship, and deadline. You keep a shortlist. You write notes about essays and recommenders. Then you come back a week later and try to remember why you saved a particular program.

An AI assistant can help with that workflow, but only if it can query a real catalog and persist what you already decided. Chat history isn't a database. A hallucinated deadline is worse than no deadline at all.

The [<VPIcon icon="iconfont icon-mcp"/>Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/learn/architecture) is the standard way to give AI apps that kind of access. In this tutorial, you'll build a scholarship research MCP server with Node.js, Express, and MongoDB.

When you finish, Cursor, Claude Desktop, or any other MCP host will be able to search awards, match them to a student profile, bookmark a shortlist, and store research notes. The model stays the reasoning layer while your server owns the data.

You'll build:

- A MongoDB catalog of scholarships, plus saved-list and notes collections
- Nine MCP tools for search, matching, deadlines, comparison, and research tracking
- Resources so a client can read the catalog without calling a tool
- Prompts that turn a student profile into a research plan
- An Express app that serves MCP over Streamable HTTP

The sample catalog in this project is a teaching dataset. Amounts, dates, and eligibility rules are simplified. Always confirm details on the official application page before applying.

::: note What You Need

You should be comfortable with JavaScript and basic Express routing. You don't need prior MCP experience.

Install:

- [<VPIcon icon="fa-brands fa-node"/>Node.js 20](https://nodejs.org/) or later
- [<VPIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/docs/manual/installation/) running locally, or a free [<VPIcon icon="iconfont icon-mongodb"/>MongoDB Atlas](https://mongodb.com/atlas) cluster
- An MCP client if you want to try the last section. [<VPIcon icon="iconfont icon-cursor"/>Cursor](https://cursor.com/) and [<VPIcon icon="iconfont icon-claude"/>Claude Desktop](https://claude.ai/download) both work.

Docker is enough for MongoDB:

```sh
docker run -d --name mongo -p 27017:27017 mongo:7
```

---

## What Is the Model Context Protocol?

MCP is an open protocol that lets an AI application talk to external tools and data sources through a shared contract. Anthropic introduced it in 2024, and it's now maintained as an open standard.

Anthropic described MCP as "a USB-C port for AI applications": one connector, many hosts. (Source: [<VPIcon icon="iconfont icon-claude"/>Introducing the Model Context Protocol](https://anthropic.com/news/model-context-protocol)) Instead of writing one integration for Cursor, another for Claude Desktop, and a third for a custom agent, you implement the protocol once.

The [<VPIcon icon="iconfont icon-mcp"/>official architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) splits MCP into two layers:

- The **data layer** is JSON-RPC 2.0. Clients and servers exchange requests such as `tools/list` and `tools/call`.
- The **transport layer** moves those messages. Local servers usually use stdio. Remote or long-running servers use Streamable HTTP.

This tutorial uses Streamable HTTP, because Express is already an HTTP server and you want the catalog available to any client on your machine.

### Hosts, Clients, and Servers

Three roles show up in every MCP setup:

- The **host** is the AI app. Cursor and Claude Desktop are hosts.
- The **client** lives inside the host. The host creates one client per connected server.
- The **server** is your program. It advertises tools, resources, and prompts, then handles calls.

Your scholarship app is the server. You never talk to the model SDK directly. The host does that.

### Tools, Resources, and Prompts

MCP servers expose three primitives. You'll use all three.

**Tools** are actions. The model decides to call them, the way it might call a function in a regular tool-calling API. Search, save, and compare belong here.

**Resources** are data the host can read and attach as context. A catalog URI and a per-scholarship URI belong here. The model doesn't have to "take an action" to see them.

**Prompts** are named templates. People usually invoke them from a slash command or a menu. A "research plan" prompt belongs here, because it's a workflow you want to start on purpose.

That split matters. If you put everything in tools, the model has to guess when to look things up. Resources and prompts give the host better knobs.

---

## Why a Scholarship Research Server?

A weather MCP demo is a single API call. Scholarship research is closer to a real product:

- The catalog must be queryable. Keyword search, GPA filters, and deadline windows all live in the database.
- The workflow must persist. A saved shortlist and research notes should survive a new chat.
- Eligibility is logic, not prose. A GPA minimum is a number. First-generation-only is a boolean. Put those checks in code so the model can't invent a match.
- The output must be inspectable. Students should be able to open the official URL and verify every claim.

MongoDB fits this well. Each scholarship is a document with nested arrays for fields of study, citizenship, and requirements. Saved items and notes are separate collections with references back to the catalog.

You could wrap a public API instead of storing documents. That's a good follow-up. Starting with your own catalog keeps the tutorial self-contained and makes the MCP contract obvious.

---

## How the Architecture Fits Together

The finished project looks like this:

```mermaid
flowchart TD
  A[MCP host (Cursor or Claude Desktop)] -- Streamable HTTP  POST /mcp --> B[Express app (createMcpExpressApp)]
  B -- createMcpHandler factory --> C[McpServer  tools / resources / prompts]
  C --> D[Scholarship service]
  D --> E[MongoDB  scholarships, savedScholarships, researchnotes]
```

A few design choices are worth calling out before you write code.

The MCP handler is **stateless**. The SDK runs your server factory once per HTTP request. That's the recommended v2 pattern for Streamable HTTP. Don't keep tool state on the `McpServer` instance. Keep it in MongoDB.

The database connection is **process-wide**. Connecting on every request would be slow and pointless. You connect once at startup and close over that pool from the tools.

The HTTP surface is small on purpose. `/health` is for you. `/mcp` is for the protocol. You don't need a REST API in front of the same data unless you want one later.

---

## How to Set Up the Project

Create a folder and initialize a Node.js project. ESM is required because the MCP SDK is ESM-first.

```sh
mkdir scholarship-research-mcp-server
cd scholarship-research-mcp-server
npm init -y
```

Open <VPIcon icon="iconfont icon-json"/>`package.json` and set `"type": "module"`. Then install the SDK, Express, Mongoose, Zod, and dotenv:

```sh
npm install @modelcontextprotocol/server @modelcontextprotocol/express @modelcontextprotocol/node express mongoose dotenv zod
```

The SDK split into packages in v2:

- `@modelcontextprotocol/server` is the `McpServer` class and `createMcpHandler`
- `@modelcontextprotocol/express` gives you `createMcpExpressApp`, including DNS rebinding protection
- `@modelcontextprotocol/node` adapts the web-standard handler to Node's `req`/`res`

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file:

```sh title=".env"
MONGODB_URI=mongodb://127.0.0.1:27017/scholarship_research
PORT=3000
HOST=127.0.0.1
```

Add a <VPIcon icon="iconfont icon-git"/>`.gitignore` that excludes `node_modules` and <VPIcon icon="iconfont icon-dotenv"/>`.env`.

Your source layout can stay small:

```sh title="file structure"
src/
  index.js
  config.js
  db.js
  models/
  services/
  mcp/
  utils/
data/
  scholarships.json
scripts/
  seed.js
  smoke-test.js
```

.<VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`config.js` reads environment variables with defaults:

```js title="config.js"
export const config = {
  mongodbUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/scholarship_research",
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? "127.0.0.1",
};
```

Keep configuration in one file. Tools shouldn't read `process.env` directly.

---

## How to Connect MongoDB

Mongoose 9 works cleanly with ESM. A short <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`db.js` is enough:

```js title="db.js"
import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongodbUri);
  return mongoose.connection;
}
```

Call this once in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`index.js` before `app.listen`. If the connection fails, the process should exit. A running Express server with a dead database is harder to debug than a failed startup.

---

## How to Model Scholarship Data

You need three collections.

### Scholarship

This is the catalog. Store the fields a matching engine actually uses, not a blob of markdown.

```js :collapsed-lines
import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    amountMin: { type: Number, default: 0 },
    amountMax: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    deadline: { type: Date, default: null },
    rolling: { type: Boolean, default: false },
    educationLevels: { type: [String], default: ["undergraduate"] },
    fieldsOfStudy: { type: [String], default: ["any"] },
    gpaMinimum: { type: Number, default: null },
    citizenship: { type: [String], default: ["any"] },
    countries: { type: [String], default: ["any"] },
    firstGenerationOnly: { type: Boolean, default: false },
    womenOnly: { type: Boolean, default: false },
    numberOfAwards: { type: Number, default: 1 },
    renewable: { type: Boolean, default: false },
    applicationUrl: { type: String, required: true },
    applicationRequirements: { type: [String], default: [] },
  },
  { timestamps: true },
);

scholarshipSchema.index({
  title: "text",
  provider: "text",
  description: "text",
  fieldsOfStudy: "text",
});
scholarshipSchema.index({ deadline: 1 });
scholarshipSchema.index({ amountMax: -1 });

export const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
```

A few field choices are doing real work:

- `fieldsOfStudy: ["any"]` means the award is field-open. The matcher treats `any` as a wildcard.
- `deadline: null` plus `rolling: true` covers programs that accept applications year-round.
- `applicationUrl` is mandatory. Every tool result should point back to a human-verifiable source.
- `gpaMinimum: null` means the provider didn't publish a cutoff. That's different from `0`.

### Saved Scholarship

A research list is a join between a person and a catalog row.

```js
const savedScholarshipSchema = new mongoose.Schema(
  {
    researcherId: { type: String, required: true, default: "default" },
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    status: {
      type: String,
      enum: ["saved", "applying", "submitted", "won", "rejected"],
      default: "saved",
    },
  },
  { timestamps: true },
);

savedScholarshipSchema.index({ researcherId: 1, scholarship: 1 }, { unique: true });
```

The unique index makes `save_scholarship` idempotent. Saving the same award twice updates the status instead of creating duplicates.

`researcherId` is a plain string. For a tutorial, that's enough. In production you would take it from an auth token.

### Research Note

Notes are a separate collection so one scholarship can have many of them.

```js
const researchNoteSchema = new mongoose.Schema(
  {
    researcherId: { type: String, required: true, default: "default" },
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    body: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);
```

You now have a catalog, a shortlist, and a notebook. That's the whole product surface the MCP tools will wrap.

---

## How to Write the Scholarship Service

Keep MongoDB queries out of the MCP layer. Tools should call a service, get plain objects back, and format text. That makes the same functions reusable from a seed script, a smoke test, or a future REST route.

### Search

Search is a filter builder. Each optional argument adds a clause. Open or rolling awards stay in the result set. Closed deadlines drop out.

```js :collapsed-lines
const OPEN_DEADLINE_FILTER = {
  $or: [{ rolling: true }, { deadline: null }, { deadline: { $gte: new Date() } }],
};

export async function searchScholarships(filters) {
  const query = { ...OPEN_DEADLINE_FILTER };
  const and = [query];

  if (filters.keyword) {
    and.push({
      $or: [
        { title: { $regex: escapeRegex(filters.keyword), $options: "i" } },
        { provider: { $regex: escapeRegex(filters.keyword), $options: "i" } },
        { description: { $regex: escapeRegex(filters.keyword), $options: "i" } },
        { fieldsOfStudy: { $regex: escapeRegex(filters.keyword), $options: "i" } },
      ],
    });
  }

  if (filters.fieldOfStudy) {
    and.push({
      $or: [
        { fieldsOfStudy: { $regex: `^any$`, $options: "i" } },
        { fieldsOfStudy: { $regex: escapeRegex(filters.fieldOfStudy), $options: "i" } },
      ],
    });
  }

  // educationLevel, citizenship, country, minAmount, gpa, flags...

  const results = await Scholarship.find({ $and: and })
    .sort({ deadline: 1, amountMax: -1 })
    .limit(100)
    .lean();

  return rankByFieldMatch(results, filters.fieldOfStudy).slice(0, filters.limit ?? 10);
}
```

Two details are easy to skip and worth keeping.

Escape user input before you drop it into `$regex`. A keyword of `(` shouldn't become a broken regular expression.

When a student searches for `computer science`, field-open awards (`any`) are eligible, but the specific CS scholarships should appear first. Rank in memory after the query. MongoDB already did the eligibility filter. You're only adjusting display order.

### Match

Matching is not the same as search. Search is "find documents that look like this." Matching is "here is a student, score every open award."

The service loads open scholarships, then applies hard filters and a score:

| Signal | Effect |
| --- | --- |
| Education level mismatch | Skip |
| GPA below the minimum | Skip |
| Citizenship mismatch | Skip |
| First-generation-only and student is not | Skip |
| Women-only and student is not | Skip |
| Education level match | +20 |
| GPA eligible | +15 |
| Citizenship eligible | +15 |
| Field of study match | +30 |
| Preferred country match | +10 |
| Amount meets the student's minimum | +10 |
| First-generation or women-only match | +10 |

Hard filters prevent false hope. Soft scores rank the rest. Each result also returns a `reasons` array, so the model can explain the match instead of inventing one.

That last point is the whole reason to put matching on the server. If you only return raw documents, the model will sometimes "helpfully" include an award the student can't apply for. Returning `score` and `reasons` keeps the explanation grounded in code.

### Save, Notes, Deadlines, Compare

The remaining functions are thin:

- `saveScholarship` upserts by `(researcherId, scholarshipId)`
- `addResearchNote` inserts a note after confirming the scholarship exists
- `getUpcomingDeadlines` queries `deadline` between now and `now + N days`
- `compareScholarships` loads two or three documents and returns the same fields for each

Validate MongoDB ids with `mongoose.Types.ObjectId.isValid` before you query. An LLM will occasionally pass a title where you asked for an id. Fail clearly. Don't throw a CastError into the MCP transport.

---

## How to Register MCP Tools

Create <VPIcon icon="fas fa-folder-open"/>`src/mcp/server.js` as a factory. The HTTP handler will call it on every request.

```js title="mcp/server.js'
import { McpServer } from "@modelcontextprotocol/server";
import { registerPrompts } from "./prompts.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";

export function createScholarshipServer() {
  const server = new McpServer({
    name: "scholarship-research",
    version: "1.0.0",
  });

  registerTools(server);
  registerResources(server);
  registerPrompts(server);

  return server;
}
```

Keep this factory cheap. No database connections, no file reads, and no caches that belong at module scope. The [<VPIcon icon="iconfont icon-mcp"/>HTTP serving guide](https://ts.sdk.modelcontextprotocol.io/v2/serving/http.html) is explicit about this: create connection pools once at startup, and close over them.

### One Tool, Fully

`registerTool` takes a name, a config object, and a handler. The `inputSchema` is a Zod object. The SDK turns that schema into JSON Schema for `tools/list`, validates arguments before your handler runs, and infers types if you're on TypeScript.

```js
import * as z from "zod/v4";

server.registerTool(
  "search_scholarships",
  {
    title: "Search scholarships",
    description:
      "Search the scholarship catalog by keyword, field of study, education level, citizenship, country, GPA, and award amount.",
    inputSchema: z.object({
      keyword: z.string().min(1).optional().describe("Free-text search across title, provider, description, and fields"),
      fieldOfStudy: z.string().optional().describe("For example computer science, public health, or engineering"),
      educationLevel: z.enum(["undergraduate", "graduate", "doctoral"]).optional(),
      citizenship: z.string().optional(),
      country: z.string().optional(),
      minAmount: z.number().nonnegative().optional(),
      gpa: z.number().min(0).max(4).optional(),
      firstGeneration: z.boolean().optional(),
      womenOnly: z.boolean().optional(),
      limit: z.number().int().min(1).max(25).optional(),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async (args) => {
    const results = await searchScholarships(args);
    return toolText(formatScholarshipList(results));
  },
);
```

Write descriptions as if the model is the only docs the tool will ever get. `.describe()` on a Zod field survives conversion to JSON Schema. That's how the host tells the model what `fieldOfStudy` means.

`title` is the human label. `description` is the model-facing contract. They're not the same string.

### Annotations

Annotations don't change how the SDK runs the tool. Hosts use them to decide how cautious to be.

- `readOnlyHint: true` for search, get, match, list, compare, and deadlines
- `readOnlyHint: false` for save and add-note
- `idempotentHint: true` on save, because of the unique index
- `openWorldHint: false` because this server talks to your database, not the open web

A host can auto-approve a read-only search and ask the user before a write. That's worth five extra keys in the config.

### Return Shape

Every tool returns MCP content blocks:

```js
export function toolText(text, isError = false) {
  return {
    content: [{ type: "text", text }],
    isError,
  };
}
```

Return `isError: true` for domain failures such as "scholarship not found." Throw only for unexpected failures. The spec treats those differently. A validation error from Zod never reaches your handler. The SDK already converts it into an `isError` result.

Format lists for a person who is skimming a chat transcript. Include the MongoDB id on every row. Later tools need that id, and the model can't invent a valid ObjectId.

### The Full Tool Set

The server registers nine tools:

| Tool | What it does |
| --- | --- |
| `search_scholarships` | Filter the catalog |
| `get_scholarship` | Return one full record |
| `match_scholarships` | Score awards against a student profile |
| `save_scholarship` | Bookmark an award |
| `list_saved_scholarships` | Show the shortlist |
| `add_research_note` | Attach a note |
| `list_research_notes` | Read notes back |
| `get_upcoming_deadlines` | Deadline window |
| `compare_scholarships` | Side-by-side of two or three ids |

That's enough for a research loop: find, inspect, match, save, annotate, and compare.

Resist the urge to add a `delete_everything` tool. Destructive tools need extra confirmation and aren't part of this workflow.

---

## How to Expose Resources and Prompts

Tools aren't the only way a host gets context.

### Resources

A static resource is a fixed URI. The catalog fits that:

```js
server.registerResource(
  "scholarship-catalog",
  "scholarship://catalog",
  {
    title: "Scholarship catalog",
    description: "Open scholarships currently stored in MongoDB",
    mimeType: "application/json",
  },
  async (uri) => {
    const catalog = await listCatalog();
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(catalog, null, 2),
        },
      ],
    };
  },
);
```

A resource template covers a family of URIs. Use `scholarship://item/{id}` rather than `scholarship://{id}`. If the pattern is `scholarship://{id}`, the URI `scholarship://catalog` becomes ambiguous.

```js
import { ResourceTemplate } from "@modelcontextprotocol/server";

server.registerResource(
  "scholarship-record",
  new ResourceTemplate("scholarship://item/{id}", {
    list: async () => {
      const catalog = await listCatalog(20);
      return {
        resources: catalog.map((scholarship) => ({
          uri: `scholarship://item/${scholarship._id}`,
          name: scholarship.title,
          mimeType: "text/plain",
        })),
      };
    },
  }),
  {
    title: "Scholarship record",
    description: "Full details for one scholarship",
    mimeType: "text/plain",
  },
  async (uri, { id }) => {
    const scholarship = await getScholarshipById(id);
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: scholarship
            ? formatScholarship(scholarship)
            : `No scholarship found with id ${id}.`,
        },
      ],
    };
  },
);
```

`list` is required on a template. Pass `undefined` if you can't enumerate instances. Here you can, so the host can show a picker.

### Prompts

Prompts are workflows you want a person to start. The research plan prompt doesn't query MongoDB itself. It tells the model to use the tools, then structure the answer.

```js
server.registerPrompt(
  "research-plan",
  {
    title: "Scholarship research plan",
    description: "Build a week-by-week research and application plan from a student profile.",
    argsSchema: z.object({
      fieldOfStudy: z.string(),
      educationLevel: z.string(),
      citizenship: z.string(),
      gpa: z.string(),
      weeks: z.string().optional(),
    }),
  },
  ({ fieldOfStudy, educationLevel, citizenship, gpa, weeks }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Create a ${weeks || "6"}-week scholarship research plan for this student.

Field of study: ${fieldOfStudy}
Education level: ${educationLevel}
Citizenship: ${citizenship}
GPA: ${gpa}

Use the scholarship research tools to find real awards first. Then produce a shortlist, a week-by-week plan, and risks. Name actual scholarships and dates from the tool results.`,
        },
      },
    ],
  }),
);
```

Notice the instruction "use the scholarship research tools." A prompt isn't a substitute for tools. It's a script that makes tool use more likely and the output shape more consistent.

A second prompt, `application-checklist`, takes a scholarship id and asks for a document list and a backward calendar. That's the kind of repetitive work MCP prompts are good at.

Prompt arguments are strings in many hosts, even when the value is a number. Typing `gpa` as a string avoids a frustrating `expected number, received string` error from a slash-command form.

---

## How to Serve MCP Over Express

This is the part that used to be a page of session-handling code. In SDK v2 it's a factory plus one route.

```js
import "dotenv/config";
import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { config } from "./config.js";
import { connectDatabase } from "./db.js";
import { createScholarshipServer } from "./mcp/server.js";

const mcpHandler = createMcpHandler(() => createScholarshipServer());
const nodeHandler = toNodeHandler(mcpHandler);

const app = createMcpExpressApp({
  host: config.host,
  allowedHosts: ["127.0.0.1", "localhost"],
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "scholarship-research-mcp",
    transport: "streamable-http",
  });
});

app.all("/mcp", (req, res) => {
  void nodeHandler(req, res, req.body);
});

async function start() {
  await connectDatabase();
  app.listen(config.port, config.host, () => {
    console.log(`Scholarship research MCP server listening on http://${config.host}:${config.port}/mcp`);
  });
}

start();
```

Walk through what each helper is doing.

`createMcpHandler` takes a function that returns a fresh `McpServer`. It exposes a web-standard `fetch`. That's the same handler you would export from a Cloudflare Worker.

`toNodeHandler` adapts that `fetch` to Express `(req, res)`. You pass `req.body` as the third argument because `createMcpExpressApp` already ran `express.json()`. If you omit the body, the adapter tries to read a stream Express already consumed.

`createMcpExpressApp` is `express()` with two extras: JSON parsing, and Host/Origin checks. Those checks exist because of DNS rebinding. A malicious page can point its own domain at `127.0.0.1` and, without a Host check, your browser would treat the local MCP server as same-origin. The default bind is `127.0.0.1` for that reason. The [<VPIcon icon="iconfont icon-mcp"/>Express serving guide](https://ts.sdk.modelcontextprotocol.io/v2/serving/express.html) covers this in more detail.

`app.all("/mcp", ...)` is intentional. Streamable HTTP uses POST for JSON-RPC, and GET for SSE streams. Registering only POST will break some clients.

Shut the handler down on `SIGINT`:

```js
process.on("SIGINT", async () => {
  await mcpHandler.close();
  process.exit(0);
});
```

`close()` waits for in-flight requests. Then you can exit.

Add npm scripts:

```json title="package.json"
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "seed": "node scripts/seed.js",
    "smoke": "node scripts/smoke-test.js"
  }
}
```

`node --watch` is enough for local development. You don't need nodemon for this project.

---

## How to Seed the Catalog

MCP tools against an empty database will work and return "no scholarships matched." That's correct, and also a bad first impression.

Put 20 to 30 realistic records in <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="iconfont icon-json"/>`scholarships.json`. Mix:

- Undergraduate and graduate awards
- STEM and field-open awards
- Country-specific programs and global ones
- Rolling deadlines and hard dates
- First-generation and women-only flags

A seed script should replace the catalog, not append:

```js
import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDatabase } from "../src/db.js";
import { Scholarship } from "../src/models/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  await connectDatabase();
  const raw = await readFile(path.join(__dirname, "..", "data", "scholarships.json"), "utf8");
  await Scholarship.deleteMany({});
  const inserted = await Scholarship.insertMany(JSON.parse(raw));
  console.log(`Seeded ${inserted.length} scholarships.`);
  process.exit(0);
}

seed();
```

Run it:

```sh
npm run seed
```

Treat the JSON as sample data. Names of well-known programs help the tutorial feel real. They also create a duty to say, clearly, that students must verify every number and date on the official site. The `applicationUrl` field exists so that reminder has somewhere to point.

If you later replace the JSON with a live source, keep the same schema. The MCP tools shouldn't care where the documents came from.

---

## How to Test the Server

Start MongoDB, seed, then start the process:

```sh
npm run seed
npm start
```

You should see:

```text
Scholarship research MCP server listening on http://127.0.0.1:3000/mcp
```

### Health Check

```sh
curl -s http://127.0.0.1:3000/health
```

A JSON `status: ok` means Express is up. It doesn't mean MCP is wired correctly. For that, send a JSON-RPC request.

### List Tools

```sh
curl -s -X POST http://127.0.0.1:3000/mcp \
-H 'Content-Type: application/json' \
-H 'Accept: application/json, text/event-stream' \
-d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

The response is an SSE event whose `data:` line contains the JSON-RPC result. You should see all nine tools, each with a JSON Schema derived from Zod.

The `Accept` header matters. MCP Streamable HTTP can return JSON or an event stream. Asking for both is the compatible choice.

### Call a Tool

```sh
curl -s -X POST http://127.0.0.1:3000/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{
    "jsonrpc":"2.0",
    "id":2,
    "method":"tools/call",
    "params": {
      "name": "search_scholarships",
      "arguments": {
        "fieldOfStudy": "computer science",
        "limit": 3
      }
    }
  }'
```

You should get a numbered list with ids, deadlines, and GPA minimums. Copy one id and pass it to `get_scholarship`.

A small Node smoke test is nicer than raw curl once you're calling several methods. Parse the `data:` line, then print `result.content[0].text`. The repo includes `scripts/smoke-test.js` for that.

### Inspector

The [<VPIcon icon="iconfont icon-mcp"/>MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is the official GUI for servers. Point it at `http://127.0.0.1:3000/mcp` and you can list tools, fill in arguments, and read resources without a host app in the way.

Use Inspector when a host "can't see" your server. If Inspector works and the host doesn't, the bug is in the host config. If Inspector fails, the bug is in your process.

---

## How to Connect Cursor and Claude Desktop

Keep `npm start` running. MCP over HTTP is a live server, not a one-shot CLI.

### Cursor

Add a server entry in Cursor's MCP settings. A Streamable HTTP server looks like this:

```json
{
  "mcpServers": {
    "scholarship-research": {
      "url": "http://127.0.0.1:3000/mcp"
    }
  }
}
```

Restart the MCP session if Cursor had a previous failed connection cached. Then ask:

> I am a first-generation undergraduate studying computer science in the United States, GPA 3.6. Use the scholarship research tools to build a shortlist and a six-week plan.

You should see the host call `match_scholarships` or `search_scholarships`, then `get_scholarship` for the interesting rows, then maybe `save_scholarship`. If it never calls a tool, the server isn't actually connected. Check the MCP logs in Cursor before you change code.

You can also invoke the `research-plan` prompt from the host's prompt menu if it surfaces prompts.

### Claude Desktop

Claude Desktop's config file lives at:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
~/Library/Application Support/Claude/claude_desktop_config.json
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
%APPDATA%\Claude\claude_desktop_config.json
```

:::

Claude Desktop prefers stdio. Bridge your HTTP server with [<VPIcon icon="fa-brands fa-npm"/>`mcp-remote`](https://npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "scholarship-research": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:3000/mcp"]
    }
  }
}
```

Restart Claude Desktop after you save the file. The scholarship tools should appear in the tool list.

Don't put MongoDB credentials in the Claude config. The Node process already loaded <VPIcon icon="iconfont icon-dotenv"/>`.env`. The host only needs the URL.

---

## How a Research Session Runs

Here's a realistic session against the seed catalog. The student is a first-generation undergraduate in computer science, a US citizen, GPA 3.6. The host calls `match_scholarships` with that profile. The server returns ranked rows. A women-in-technology award and a first-generation program both score well, for different reasons. A graduate-only award never appears.

The host then calls `get_scholarship` on the top two ids. Each result includes the official URL, the requirement list, and the deadline. That's the moment to tell the student to open the URL. The model shouldn't be the last word on eligibility.

If an award is worth pursuing, the host calls `save_scholarship` with a `researcherId` such as `ada` and status `saved`. Later it can set `applying`. `list_saved_scholarships` is how a new chat picks up the shortlist. Persistence is the whole point of MongoDB here. Without it, every conversation starts from zero.

`add_research_note` is for the messy human details: "Ask Dr. Chen for a recommendation by October 1." `get_upcoming_deadlines` is the weekly sweep. `compare_scholarships` is for the moment the student has two finalists and needs amount, GPA, and requirements in one view.

The `research-plan` prompt packages that loop. It injects the profile into a user message that tells the model to call tools first and then produce a week-by-week plan. If you invoke the prompt without a connected server, you get a generic essay. If you invoke it with this server running, you get named awards and real dates.

That's the product: a catalog the model can query, a shortlist it can't forget, and prompts that make the workflow repeatable.

---

## How the Matching Logic Works

It's worth slowing down on matching, because this is the part people are tempted to hand to the model.

Suppose the student is:

- GPA 3.6
- Computer science
- Undergraduate
- United States citizen
- First-generation
- A woman

The matcher walks every open award.

A women-in-technology scholarship with a 3.3 GPA minimum, CS as a listed field, and US eligibility scores high: education, GPA, citizenship, women-only flag, and field all hit. A first-generation program that is field-open also scores high, because `any` counts as a field match. A graduate-only award is skipped, even if the title looks relevant. A 3.8 GPA cutoff is skipped, even if everything else fits.

The tool then returns ranked rows with reasons:

```text
1. Palantir Women in Technology Scholarship — score 90
   Why: education level matches; GPA 3.6 meets the 3.3 minimum; citizenship is eligible; women-only award matches; field of study matches
```

The model can still write a warm paragraph around that. It shouldn't be the component that decided eligibility.

If you extend this later, keep the same split. New eligibility rules belong in the service. New prose belongs in the prompt.

---

## What You Can Build Next

The server you have is complete enough to use. It's also a base for a more serious research tool.

First, you could replace the seed file with a live source. Official feeds such as [<VPIcon icon="fas fa-globe"/>Grants.gov](https://grants.gov/) and college-maintained lists are safer than scraping commercial aggregators. Keep your schema. Write an importer that upserts by a stable external id.

You could also add authentication. `createMcpExpressApp` works with `requireBearerAuth`. Map `researcherId` from the verified token instead of a tool argument. The [Express adapter (<VPIcon icon="fa-brands fa-npm"/>`@modelcontextprotocol`)](https://npmjs.com/package/@modelcontextprotocol/express) documents that middleware.

Try adding full-text search. The schema already has a text index. For a large catalog, Atlas Search or a dedicated search engine will beat a pile of regex filters.

You can track documents, not just notes. A `documents` collection for transcripts, recommendation status, and essay drafts turns the shortlist into an application tracker.

You could also write tests around the matcher. Eligibility code is where silent bugs hurt people. A table of profiles and expected include/exclude lists will pay for itself.

And you could deploy it. Bind to `127.0.0.1` on your laptop. If you put this on a network, set `allowedHosts`, terminate TLS, and require a bearer token. An open MCP server is an open database with a helpful English interface.

---

## Conclusion

In this guide, you built a scholarship research MCP server that's more than a toy tool list.

You stored awards, shortlists, and notes in MongoDB. You exposed search, matching, and research-tracking as MCP tools, with Zod schemas the host can advertise to a model. You added resources for the catalog and prompts for repeatable workflows. You served the whole thing over Streamable HTTP with Express, including the Host header checks the SDK enables for localhost.

The pattern transfers. Any research workflow with a catalog and a personal working set can use the same three layers: a service that owns the rules, an `McpServer` factory that registers primitives, and a small Express app that speaks the protocol.

If you take one idea from this tutorial, take this one: let the model write the plan, and let your server decide what's true.

The sample catalog is for learning. Confirm every scholarship on its official application page before you apply, and before you tell someone else to apply.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Scholarship Research MCP Server with Node.js, Express, and MongoDB",
  "desc": "Scholarship hunting is a research job, not a single search box. You filter awards by field, GPA, citizenship, and deadline. You keep a shortlist. You write notes about essays and recommenders. Then yo",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scholarship-research-mcp-server-with-node-js-express-and-mongodb.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
