---
lang: en-US
title: "How to Build MCP Servers for Your Internal Data"
description: "Article(s) > How to Build MCP Servers for Your Internal Data"
icon: iconfont icon-mcp
category:
  - AI
  - LLM
  - MCP
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
  - mcp
  - model-context-protocol
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - ts
  - typescript
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build MCP Servers for Your Internal Data"
    - property: og:description
      content: "How to Build MCP Servers for Your Internal Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-mcp-servers-for-your-internal-data.html
prev: /ai/mcp/articles/README.md
date: 2026-03-05
isOriginal: false
author:
  - name: Mayur Vekariya
    url: https://freecodecamp.org/news/author/mayur9210/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/2e428238-cbc3-4892-97df-c1dd854c74c3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build MCP Servers for Your Internal Data"
  desc="The Model Context Protocol (MCP) is changing how AI applications connect to external tools and data. While some tutorials stop at ”connect to GitHub” or ”read a file,” the real power of MCP is unlocki"
  url="https://freecodecamp.org/news/how-to-build-mcp-servers-for-your-internal-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/2e428238-cbc3-4892-97df-c1dd854c74c3.png"/>

The Model Context Protocol (MCP) is changing how AI applications connect to external tools and data. While some tutorials stop at "connect to GitHub" or "read a file," the real power of MCP is unlocking your *internal* data—databases, internal APIs, knowledge bases, and proprietary systems—for AI assistants in a structured, secure way.

In this guide, I'll walk you through building production-grade MCP servers that expose your organization's internal data to AI models. We'll go beyond simple examples and cover authentication, multi-tenancy, streaming, and deployment patterns you'll actually need.

::: note Prerequisites

This is an advanced guide. You should be comfortable with:

- TypeScript / Node.js
- REST APIs and server-side development
- Basic understanding of LLMs and tool calling
- Familiarity with protocols like JSON-RPC

:::

---

## What is MCP, and Why Does It Matter for Internal Data?

MCP is an open protocol (created by Anthropic) that standardizes how AI assistants discover and invoke external tools. Think of it as a USB-C port for AI — one standard interface that lets any AI model connect to any data source.

Before MCP, connecting an AI assistant to your internal database meant:

- Writing custom tool definitions for each LLM provider
- Hardcoding data access logic into your AI application
- Rebuilding everything when you switched models or added new data sources

MCP separates the *data layer* from the *AI layer*. Your MCP server exposes tools and resources. Any MCP-compatible client—Claude, ChatGPT, your custom app—can use them without modification.

For internal data, this is significant because:

- **Your CRM, ERP, ticketing system, and wiki all become AI-accessible** through one protocol
- **Access control stays in your MCP server**, not scattered across AI application code
- **New AI models or clients automatically get access** without rewiring integrations
- **Tool definitions live close to the data**, making them easier to maintain and version

---

## Architecture Overview

Here's what we're building:

![MCP server architecture connecting an AI client to internal data sources — PostgreSQL, Internal API, and File Store — via JSON-RPC over HTTP/SSE/stdio.](https://cdn.hashnode.com/uploads/covers/6763484155ac493748dfb95b/3b8f4b25-aa15-4cf1-971d-94f2f7ee9e70.png)

The MCP server sits between your AI client and your internal systems. It handles:

- **Tool discovery**: Tells the AI what operations are available
- **Parameter validation**: Ensures the AI sends correct inputs
- **Data access**: Queries your internal systems
- **Response formatting**: Returns structured data the AI can reason about
- **Authentication**: Verifies who's making the request

---

## Setting Up the Project

Let's build an MCP server that exposes an internal employee directory and project management system.

```sh
mkdir internal-data-mcp && cd internal-data-mcp
npm init -y
npm i @modelcontextprotocol/sdk zod express pg
npm i -D typescript @types/node @types/express @types/pg tsx
```

These commands scaffold the project. `npm install` pulls in the runtime dependencies: the official MCP SDK, Zod for schema validation, Express for the HTTP server, and `pg` for PostgreSQL. The `-D` flag installs TypeScript and its type definitions as dev-only dependencies — they're needed to compile the code but don't ship to production. `tsx` lets you run TypeScript directly during development without a separate compile step.

Now, create your <VPIcon icon="iconfont icon-json"/>`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

This TypeScript config targets ES2022, which supports modern JavaScript features like top-level `await`. `"module": "Node16"` and `"moduleResolution": "Node16"` are required when using the MCP SDK's `.js` import extensions. `"strict": true` enables all of TypeScript's strictness checks, which helps catch bugs in tool handlers before they reach production. The `outDir`/`rootDir` pair tells the compiler to take source files from <VPIcon icon="fas fa-folder-open"/>`src/` and emit compiled JavaScript into `dist/`.

---

## Table of Contents

- [Building the MCP Server](#building-the-mcp-server)
- [Tool Design Principles](#tool-design-principles)
- [Adding Authentication](#adding-authentication)
- [Connecting to Internal APIs](#connecting-to-internal-apis)
- [Building a RAG Tool for Internal Documents](#building-a-rag-tool-for-internal-documents)
- [Production Deployment](#production-deployment)
- [Connecting Your MCP Server to AI Clients](#connecting-your-mcp-server-to-ai-clients)
- [Common Pitfalls](#common-pitfalls)

---

## Building the MCP Server

### Step 1: Server Skeleton

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`server.ts`:

```ts title="server.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer(
  { name: "internal-data", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);
```

The `McpServer` class from the official SDK handles the JSON-RPC protocol, transport negotiation, and lifecycle management. We declare support for both `tools` (actions the AI can take) and `resources` (data the AI can read).

### Step 2: Connecting to Internal Data

Let's say you have a PostgreSQL database with employee and project data. Create a data access layer:

```ts : collapsed-linestitle="db.ts"
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.INTERNAL_DB_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  manager_id: string | null;
  start_date: string;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "on_hold";
  lead_id: string;
  department: string;
  deadline: string | null;
}

export async function searchEmployees(
  query: string,
  department?: string
): Promise<Employee[]> {
  const conditions = ["(name ILIKE \(1 OR email ILIKE \)1 OR role ILIKE $1)"];
  const params: string[] = [`%${query}%`];

  if (department) {
    conditions.push(`department = $${params.length + 1}`);
    params.push(department);
  }

  const result = await pool.query<Employee>(
    `SELECT id, name, email, department, role, manager_id, start_date
     FROM employees
     WHERE ${conditions.join(" AND ")}
     ORDER BY name
     LIMIT 25`,
    params
  );

  return result.rows;
}

export async function getProjectsByStatus(
  status: string
): Promise<Project[]> {
  const result = await pool.query<Project>(
    `SELECT id, name, status, lead_id, department, deadline
     FROM projects
     WHERE status = $1
     ORDER BY deadline ASC NULLS LAST`,
    [status]
  );

  return result.rows;
}

export async function getProjectMembers(
  projectId: string
): Promise<Employee[]> {
  const result = await pool.query<Employee>(
    `SELECT e.id, e.name, e.email, e.department, e.role,
            e.manager_id, e.start_date
     FROM employees e
     JOIN project_members pm ON pm.employee_id = e.id
     WHERE pm.project_id = $1
     ORDER BY e.name`,
    [projectId]
  );

  return result.rows;
}
```

Notice this is plain SQL with parameterized queries. Your MCP server's data access layer should use whatever your team already uses — Prisma, Drizzle, Knex, raw SQL. MCP doesn't dictate your data access patterns.

### Step 3: Defining Tools

Now expose this data through MCP tools. This is where the design matters most. Good tool definitions directly impact how well the AI uses your data.

```ts :collapsed-lines title="tools.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  searchEmployees,
  getProjectsByStatus,
  getProjectMembers,
} from "./db.js";

export function registerTools(server: McpServer) {
  // Tool 1: Search the employee directory
  server.tool(
    "search_employees",
    `Search the internal employee directory by name, email, or role.
     Returns matching employees with their department and reporting structure.
     Use this when the user asks about people, teams, or org structure.`,
    {
      query: z
        .string()
        .describe("Search term: employee name, email, or role title"),
      department: z
        .string()
        .optional()
        .describe(
          "Filter by department name (e.g., 'Engineering', 'Marketing')"
        ),
    },
    async ({ query, department }) => {
      const employees = await searchEmployees(query, department);

      if (employees.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No employees found matching "\({query}"\){department ? ` in ${department}` : ""}.`,
            },
          ],
        };
      }

      const formatted = employees
        .map(
          (e) =>
            `- **\({e.name}** (\){e.email})\n  Role: \({e.role} | Dept: \){e.department} | Since: ${e.start_date}`
        )
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Found \({employees.length} employee(s):\n\n\){formatted}`,
          },
        ],
      };
    }
  );

  // Tool 2: List projects by status
  server.tool(
    "list_projects",
    `List internal projects filtered by status.
     Returns project name, lead, department, and deadline.
     Use this when the user asks about ongoing work, project status, or deadlines.`,
    {
      status: z
        .enum(["active", "completed", "on_hold"])
        .describe("Project status to filter by"),
    },
    async ({ status }) => {
      const projects = await getProjectsByStatus(status);

      if (projects.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No ${status} projects found.`,
            },
          ],
        };
      }

      const formatted = projects
        .map(
          (p) =>
            `- **\({p.name}** [\){p.status}]\n  Lead: \({p.lead_id} | Dept: \){p.department} | Deadline: ${p.deadline ?? "None"}`
        )
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `\({projects.length} \){status} project(s):\n\n${formatted}`,
          },
        ],
      };
    }
  );

  // Tool 3: Get team members for a project
  server.tool(
    "get_project_team",
    `Get all team members assigned to a specific project.
     Returns employee details for each member.
     Use this when the user asks who is working on a project.`,
    {
      project_id: z
        .string()
        .uuid()
        .describe("The UUID of the project to look up"),
    },
    async ({ project_id }) => {
      const members = await getProjectMembers(project_id);

      if (members.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No team members found for this project.",
            },
          ],
        };
      }

      const formatted = members
        .map((m) => `- \({m.name} (\){m.role}, ${m.department})`)
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Project team (\({members.length} members):\n\n\){formatted}`,
          },
        ],
      };
    }
  );
}
```

`server.tool()` registers each tool with four arguments: the tool name, a plain-English description the AI reads to decide when to call it, a Zod schema defining the parameters, and the async handler that runs when the tool is invoked. The handler receives validated, typed parameters — Zod rejects malformed inputs before your handler ever runs. Each handler returns a `content` array; the `type: "text"` block is the most common format and tells the AI client to treat the response as readable text. Returning an empty result (zero matches) is handled explicitly so the AI gets a useful message rather than an empty array it might misinterpret.

### Tool Design Principles

Three things make the difference between tools an AI uses well and tools it struggles with:

#### 1. Descriptive names and descriptions

The AI decides which tool to call based entirely on the description. Be specific about *when* to use the tool, not just *what* it does. Compare:

::: tabs

@tab:active Vague

the AI won't know when to pick this

```md
"Search employees"
```

@tab Specific

the AI knows exactly when this tool is relevant

```md
"Search the internal employee directory by name, email, or role. Use this when the user asks about people, teams, or org structure."
```

:::

#### 2. Typed parameters with descriptions

Use Zod's `.describe()` on every parameter. The AI needs to understand what each field expects:

```ts
// The AI has to guess what format "query" expects
{ query: z.string() }

// The AI knows exactly what to pass
{ query: z.string().describe("Search term: employee name, email, or role title") }
```

#### 3. Structured return values

Return data in a format the AI can reason about. Use markdown tables or structured lists rather than raw JSON dumps. The AI processes structured text better than deeply nested objects.

### Step 4: Exposing Resources

Resources are read-only data the AI can pull into its context. Unlike tools (which the AI invokes during reasoning), resources are typically loaded upfront to provide background knowledge.

```ts :collapsed-lines title="resources.ts"
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerResources(server: McpServer) {
  // Static resource: org chart overview
  server.resource(
    "org-structure",
    "internal://org-structure",
    {
      description:
        "Overview of the organization structure including departments and leadership",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: await generateOrgOverview(),
        },
      ],
    })
  );

  // Dynamic resource template: department details
  server.resource(
    "department-info",
    new ResourceTemplate("internal://departments/{name}", {
      list: undefined,
    }),
    {
      description: "Detailed information about a specific department",
      mimeType: "text/markdown",
    },
    async (uri, variables) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: await getDepartmentDetails(
            variables.name as string
          ),
        },
      ],
    })
  );
}
```

`server.resource()` registers two kinds of resources here. The first uses a fixed URI (`internal://org-structure`) — this is a static resource the AI can request by name. The second uses a `ResourceTemplate`, which defines a URI pattern with a `{name}` placeholder; the AI can request `internal://departments/Engineering` and the `variables.name` parameter will be populated with `"Engineering"` at runtime. Both resources return a `contents` array with `mimeType: "text/markdown"` — this tells the client how to render the response. Resources differ from tools in that they're meant to be read as background context, not invoked as actions.

Resources are useful for data that provides context rather than answering a specific question — company policies, API documentation, database schemas, configuration references.

### Step 5: Transport and Startup

MCP supports multiple transports. For internal data servers, you'll typically use one of two:

**Streamable HTTP** — the recommended transport for remote servers (replaces the older SSE transport):

```ts :collapsed-lines title="index.ts"
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";

const app = express();
app.use(express.json());

const server = new McpServer(
  { name: "internal-data", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);

registerTools(server);
registerResources(server);

// Store transports by session ID
const transports = new Map<string, StreamableHTTPServerTransport>();

// Handle all MCP requests on a single endpoint
app.all("/mcp", async (req, res) => {
  // Check for existing session
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (sessionId && transports.has(sessionId)) {
    // Existing session — route to its transport
    const transport = transports.get(sessionId)!;
    await transport.handleRequest(req, res);
    return;
  }

  if (sessionId && !transports.has(sessionId)) {
    // Unknown session ID
    res.status(404).json({ error: "Session not found" });
    return;
  }

  // New session — create transport and connect
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (id) => {
      transports.set(id, transport);
    },
  });

  transport.onclose = () => {
    if (transport.sessionId) {
      transports.delete(transport.sessionId);
    }
  };

  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(3100, () => {
  console.log("MCP server running on http://localhost:3100/mcp");
});
```

This sets up a single `/mcp` endpoint that handles all MCP communication. When a new client connects (no `mcp-session-id` header), a `StreamableHTTPServerTransport` is created and stored in the `transports` Map keyed by a generated UUID. On subsequent requests, the session ID from the header is used to look up the existing transport and route the request to it — this is how the server maintains stateful sessions with multiple clients simultaneously. `transport.onclose` cleans up the Map entry when a session ends, preventing memory leaks. The `StdioServerTransport` alternative (shown below) skips all of this: it reads from stdin and writes to stdout, which is how Claude Desktop spawns local servers as child processes.

**Stdio** — for local development or when the MCP client spawns the server as a child process:

```ts title="stdio.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";

const server = new McpServer(
  { name: "internal-data", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);

registerTools(server);
registerResources(server);

const transport = new StdioServerTransport();
await server.connect(transport);
```

For internal data in a production setting, HTTP/SSE is almost always what you want. Stdio is convenient for development and when the client and server run on the same machine.

---

## Adding Authentication

Internal data servers need authentication. You don't want every AI client on the network querying your employee database unauthenticated.

### Bearer Token Authentication

The simplest approach is to validate a token on every request:

```ts title="auth-middleware.ts"
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
  orgId?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const token = authHeader.slice(7);

  try {
    // Validate against your internal auth system
    const claims = validateInternalToken(token);
    req.userId = claims.sub;
    req.orgId = claims.org;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
}

function validateInternalToken(token: string) {
  // Replace with your actual token validation:
  // - JWT verification against your auth service
  // - API key lookup in your database
  // - Session token validation against Redis
  // This is a placeholder
  return { sub: "user-123", org: "org-456" };
}
```

The middleware checks every request for an `Authorization: Bearer <token>` header before it reaches the MCP handler. `validateInternalToken` is a placeholder — replace it with your real validation logic: JWT verification using a library like `jsonwebtoken`, an API key lookup in your database, or a session token check against Redis. The validated claims are attached to the request object (`req.userId`, `req.orgId`) so downstream tool handlers can use them for access scoping. The `app.use("/mcp", authMiddleware)` line ensures no request reaches the MCP endpoint without passing this check first.

Add it to your Express app:

```ts
app.use("/mcp", authMiddleware);
```

### OAuth 2.0 for MCP

For clients that support MCP's built-in OAuth flow (like Claude Desktop), you can implement the full OAuth handshake. The MCP SDK provides the `OAuthServerProvider` interface with these required methods:

```ts :collapsed-lines
import type { OAuthServerProvider } from "@modelcontextprotocol/sdk/server/auth/provider.js";
import type {
  AuthorizationParams,
  OAuthClientInformationFull,
  OAuthRegisteredClientsStore,
  OAuthTokens,
  AuthInfo,
} from "@modelcontextprotocol/sdk/server/auth/types.js";

class InternalOAuthProvider implements OAuthServerProvider {
  // Store for registered OAuth clients
  get clientsStore(): OAuthRegisteredClientsStore {
    return this._clientsStore;
  }

  private _clientsStore: OAuthRegisteredClientsStore = {
    async getClient(clientId: string) {
      // Look up the registered client in your database
      return db.getOAuthClient(clientId);
    },
    async registerClient(clientMetadata) {
      // Register a new dynamic client
      return db.createOAuthClient(clientMetadata);
    },
  };

  // Redirect the user to your internal SSO for authorization
  async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response
  ): Promise<void> {
    const authUrl = new URL(
      "https://sso.internal.company.com/authorize"
    );
    authUrl.searchParams.set("client_id", client.client_id);
    authUrl.searchParams.set("redirect_uri", params.redirectUri);
    authUrl.searchParams.set("state", params.state ?? "");
    authUrl.searchParams.set(
      "code_challenge",
      params.codeChallenge
    );
    // The method writes to the response directly
    res.redirect(authUrl.toString());
  }

  // Return the PKCE challenge for a given authorization code
  async challengeForAuthorizationCode(
    _client: OAuthClientInformationFull,
    authorizationCode: string
  ): Promise<string> {
    const session = await db.getSessionByCode(authorizationCode);
    return session.codeChallenge;
  }

  // Exchange authorization code for access + refresh tokens
  async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    _codeVerifier?: string,
    _redirectUri?: string
  ): Promise<OAuthTokens> {
    const response = await fetch(
      "https://sso.internal.company.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: authorizationCode,
          client_id: client.client_id,
        }),
      }
    );

    return response.json() as Promise<OAuthTokens>;
  }

  // Refresh expired tokens
  async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string
  ): Promise<OAuthTokens> {
    const response = await fetch(
      "https://sso.internal.company.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: client.client_id,
        }),
      }
    );

    return response.json() as Promise<OAuthTokens>;
  }

  // Validate an access token on every request
  async verifyAccessToken(token: string): Promise<AuthInfo> {
    const response = await fetch(
      "https://sso.internal.company.com/introspect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token }),
      }
    );

    const data = await response.json();
    if (!data.active) throw new Error("Token inactive");

    return {
      token,
      clientId: data.client_id,
      scopes: data.scope?.split(" ") ?? [],
      expiresAt: data.exp,
    };
  }
}
```

`InternalOAuthProvider` implements the `OAuthServerProvider` interface, which the MCP SDK calls at each stage of the OAuth flow. `clientsStore` handles dynamic client registration — MCP clients like Claude Desktop register themselves the first time they connect. `authorize()` redirects the user to your internal SSO; it writes directly to the Express response. `challengeForAuthorizationCode()` returns the PKCE code challenge stored when the authorization session began — this is how the token exchange is verified without transmitting secrets. `exchangeAuthorizationCode()` and `exchangeRefreshToken()` make server-to-server calls to your SSO's token endpoint, keeping credentials out of the browser. `verifyAccessToken()` is called on every incoming MCP request using the token introspection endpoint to confirm the token is still active and extract the user's scopes.

---

## Scoping Data Access Per User

This is the most important part of an internal data MCP server: **the AI should only access data the requesting user is authorized to see.**

Don't skip this. Without user-scoped access, you're building a data exfiltration tool with an AI wrapper.

```ts title="scoped-tools.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerScopedTools(
  server: McpServer,
  getUserContext: () => { userId: string; orgId: string; role: string }
) {
  server.tool(
    "search_employees",
    "Search the employee directory. Results are filtered based on your access level.",
    {
      query: z.string().describe("Name, email, or role to search for"),
    },
    async ({ query }) => {
      const ctx = getUserContext();

      // Enforce access boundaries
      let departmentFilter: string | undefined;

      if (ctx.role === "manager") {
        // Managers see their department only
        departmentFilter = await getUserDepartment(ctx.userId);
      } else if (ctx.role === "employee") {
        // Regular employees see limited fields
        departmentFilter = await getUserDepartment(ctx.userId);
      }
      // Admins and HR see everything — no filter

      const employees = await searchEmployees(query, departmentFilter);

      // Redact sensitive fields based on role
      const results = employees.map((e) => ({
        name: e.name,
        email: e.email,
        department: e.department,
        role: e.role,
        // Only HR and admins see start date and manager info
        ...(["admin", "hr"].includes(ctx.role)
          ? { start_date: e.start_date, manager_id: e.manager_id }
          : {}),
      }));

      return {
        content: [
          {
            type: "text",
            text: formatEmployeeList(results),
          },
        ],
      };
    }
  );
}
```

::: info The pattern here

1. **Extract user context** from the authenticated session
2. **Filter queries** at the database level (not after fetching everything)
3. **Redact fields** the user shouldn't see
4. **Log access** for audit trails

:::

---

## Connecting to Internal APIs

Not all internal data lives in databases. You often need to wrap existing internal APIs:

```ts :collapsed-lines
server.tool(
  "get_ticket_details",
  `Look up a support ticket from the internal ticketing system.
   Returns ticket status, assignee, priority, and recent updates.`,
  {
    ticket_id: z
      .string()
      .regex(/^TK-\d+$/)
      .describe("Ticket ID in format TK-12345"),
  },
  async ({ ticket_id }) => {
    const ctx = getUserContext();

    const response = await fetch(
      `\({process.env.TICKETING_API_URL}/api/v2/tickets/\){ticket_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TICKETING_SERVICE_TOKEN}`,
          "X-On-Behalf-Of": ctx.userId,
        },
      }
    );

    if (response.status === 404) {
      return {
        content: [
          { type: "text", text: `Ticket ${ticket_id} not found.` },
        ],
      };
    }

    if (response.status === 403) {
      return {
        content: [
          {
            type: "text",
            text: `You don't have access to ticket ${ticket_id}.`,
          },
        ],
      };
    }

    const ticket = await response.json();

    return {
      content: [
        {
          type: "text",
          text: [
            `**\({ticket.id}: \){ticket.title}**`,
            `Status: \({ticket.status} | Priority: \){ticket.priority}`,
            `Assignee: ${ticket.assignee?.name ?? "Unassigned"}`,
            `Created: ${ticket.created_at}`,
            "",
            `**Latest Update:**`,
            ticket.updates?.[0]?.body ?? "No updates yet.",
          ].join("\n"),
        },
      ],
    };
  }
);
```

Key points when wrapping internal APIs:

- **Use service tokens** for server-to-server auth, but pass user identity via headers like `X-On-Behalf-Of`
- **Handle HTTP errors explicitly** — return user-friendly messages, not raw error objects
- **Validate input formats** — the regex on `ticket_id` prevents injection and guides the AI on expected format
- **Don't leak internal implementation details** in error messages

---

## Building a RAG Tool for Internal Documents

One of the highest-value use cases: letting the AI search your internal knowledge base. Here's a tool that performs vector search against an internal document store:

```ts :collapsed-lines
server.tool(
  "search_internal_docs",
  `Search the internal knowledge base for relevant documents.
   Covers engineering docs, runbooks, architecture decisions, and policies.
   Use this when the user asks about internal processes, systems, or decisions.`,
  {
    query: z
      .string()
      .describe("Natural language search query"),
    category: z
      .enum(["engineering", "policy", "runbook", "architecture", "all"])
      .default("all")
      .describe("Document category to search within"),
    limit: z
      .number()
      .min(1)
      .max(10)
      .default(5)
      .describe("Maximum number of results"),
  },
  async ({ query, category, limit }) => {
    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Vector similarity search against your document store
    const results = await pool.query(
      `SELECT
         d.id,
         d.title,
         d.category,
         d.content_chunk,
         d.source_url,
         d.updated_at,
         1 - (d.embedding <=> $1::vector) AS similarity
       FROM document_chunks d
       WHERE (\(2 = 'all' OR d.category = \)2)
         AND 1 - (d.embedding <=> $1::vector) > 0.7
       ORDER BY d.embedding <=> $1::vector
       LIMIT $3`,
      [JSON.stringify(embedding), category, limit]
    );

    if (results.rows.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No relevant documents found for "${query}".`,
          },
        ],
      };
    }

    const formatted = results.rows
      .map(
        (doc, i) =>
          `### \({i + 1}. \){doc.title}\n` +
          `Category: \({doc.category} | Updated: \){doc.updated_at} | Relevance: ${(doc.similarity * 100).toFixed(0)}%\n\n` +
          `${doc.content_chunk}\n\n` +
          `Source: ${doc.source_url}`
      )
      .join("\n\n---\n\n");

    return {
      content: [
        {
          type: "text",
          text: `Found \({results.rows.length} relevant document(s):\n\n\){formatted}`,
        },
      ],
    };
  }
);
```

This tool combines two operations: embedding generation and vector similarity search. `generateEmbedding(query)` calls an embedding model (such as OpenAI's `text-embedding-3-small` or a self-hosted model) to convert the user's query into a numeric vector. The SQL query then uses pgvector's `<=>` operator to compute cosine distance between the query vector and stored document chunk embeddings — lower distance means higher similarity. The `1 - (embedding <=> $1) > 0.7` condition filters out results below 70% similarity, so the AI doesn't receive loosely related noise. Results are ordered by ascending distance (most similar first) and capped by the `limit` parameter. The formatted output includes a relevance percentage so the AI can communicate confidence levels to the user.

---

## Production Deployment

### Dockerizing the MCP Server

```dockerfile title="Dockerfile"
FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS runtime

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3100/health || exit 1

CMD ["node", "dist/index.js"]
```

The Dockerfile uses a two-stage build. The `builder` stage installs all dependencies (including devDependencies) and compiles TypeScript to JavaScript in `dist/`. The `runtime` stage starts fresh from a clean Node image and copies only the compiled output and `node_modules` — devDependencies like TypeScript are excluded, keeping the final image small. The `HEALTHCHECK` instruction tells Docker (and orchestrators like Kubernetes) to poll `/health` every 30 seconds; if the endpoint fails, the container is marked unhealthy and can be automatically restarted or removed from the load balancer rotation.

### Health Checks and Monitoring

Add a health endpoint that verifies your dependencies:

```ts
app.get("/health", async (_req, res) => {
  const checks = {
    database: false,
    ticketingApi: false,
  };

  try {
    await pool.query("SELECT 1");
    checks.database = true;
  } catch {}

  try {
    const resp = await fetch(
      `${process.env.TICKETING_API_URL}/health`
    );
    checks.ticketingApi = resp.ok;
  } catch {}

  const healthy = Object.values(checks).every(Boolean);
  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "degraded",
    checks,
    uptime: process.uptime(),
  });
});
```

The `/health` endpoint runs two dependency checks in parallel: a lightweight `SELECT 1` query to confirm the database connection is live, and an HTTP ping to the ticketing API. Both results are collected into a `checks` object. If any check fails, the endpoint returns HTTP 503 (Service Unavailable) — this is the signal load balancers and container orchestrators use to stop routing traffic to an unhealthy instance. `process.uptime()` is included as a diagnostic field so you can quickly tell whether a degraded instance just started or has been running for hours.

### Logging and Audit Trail

Every tool invocation against internal data should be logged:

```ts
function createAuditLogger() {
  return {
    logToolCall(params: {
      userId: string;
      tool: string;
      input: Record<string, unknown>;
      resultSize: number;
      durationMs: number;
    }) {
      // Ship to your logging infrastructure
      // (Datadog, ELK, CloudWatch, etc.)
      console.log(
        JSON.stringify({
          event: "mcp_tool_call",
          timestamp: new Date().toISOString(),
          ...params,
        })
      );
    },
  };
}
```

`createAuditLogger` returns a logger object rather than a class instance, which makes it easy to swap the underlying transport (stdout, a logging SDK, etc.) without changing the call sites. The `audited` wrapper function is a higher-order function: it takes a tool handler and returns a new function with the same signature, but with timing and logging added around the original call. The `try/catch` ensures a log entry is written even when the handler throws — you want failed calls in your audit trail, not just successful ones. Shipping these logs to a centralized store (Datadog, CloudWatch, ELK) lets you answer questions like "what data did this user's AI session access last Tuesday?" — which is often required for compliance in organizations handling sensitive internal data.

Wrap your tool handlers to automatically log every call:

```ts :collapsed-lines
function audited<T extends Record<string, unknown>>(
  handler: (params: T) => Promise<ToolResult>,
  toolName: string,
  audit: ReturnType<typeof createAuditLogger>
) {
  return async (params: T): Promise<ToolResult> => {
    const start = Date.now();
    const ctx = getUserContext();

    try {
      const result = await handler(params);
      audit.logToolCall({
        userId: ctx.userId,
        tool: toolName,
        input: params,
        resultSize: JSON.stringify(result).length,
        durationMs: Date.now() - start,
      });
      return result;
    } catch (error) {
      audit.logToolCall({
        userId: ctx.userId,
        tool: toolName,
        input: params,
        resultSize: 0,
        durationMs: Date.now() - start,
      });
      throw error;
    }
  };
}
```

---

## Connecting Your MCP Server to AI Clients

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "internal-data": {
      "url": "http://localhost:3100/mcp",
      "headers": {
        "Authorization": "Bearer your-internal-token"
      }
    }
  }
}
```

### Custom Application (using the MCP Client SDK)

```ts :collapsed-lines
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3100/mcp"),
  {
    requestInit: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  }
);

const client = new Client(
  { name: "my-ai-app", version: "1.0.0" }
);

await client.connect(transport);

// Discover available tools
const { tools } = await client.listTools();
console.log("Available tools:", tools.map((t) => t.name));

// Call a tool
const result = await client.callTool({
  name: "search_employees",
  arguments: { query: "engineering manager" },
});

console.log(result.content);
```

`StreamableHTTPClientTransport` manages the HTTP connection to your MCP server, including attaching the `Authorization` header to every request. `client.connect(transport)` performs the MCP initialization handshake — the client announces its capabilities and the server responds with the list of available tools and resources. `client.listTools()` returns the full tool catalog, which you can use to dynamically build a UI or pass directly to an LLM's tool-calling API. `client.callTool()` sends a JSON-RPC request to invoke a specific tool by name and returns the `content` array from the handler — the same format the AI model receives. In a production application, you'd pass this `content` back to the model as a tool result in the conversation history.

---

## Common Pitfalls

### 1. Returning too much data

LLMs have context limits. If your database query returns 500 rows, don't send them all. Paginate, summarize, or limit results. 25 items is a reasonable default.

### 2. Tool descriptions that are too generic

If you have `search_employees` and `search_contractors`, the AI needs to know the difference. Don't rely on the tool name alone — the description is what the model reads.

### 3. Missing error handling

When a database query fails, return a structured error message, not a stack trace. The AI needs to tell the user something useful, and raw errors leak implementation details.

### 4. No rate limiting

AI tool calls can happen in loops. If the model calls your tool 50 times in one conversation, you need circuit breakers:

```ts
const rateLimiter = new Map<string, number[]>();

function checkRateLimit(userId: string, limit = 30, windowMs = 60000) {
  const now = Date.now();
  const calls = rateLimiter.get(userId) ?? [];
  const recent = calls.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    throw new Error(
      `Rate limit exceeded. Max ${limit} calls per minute.`
    );
  }

  recent.push(now);
  rateLimiter.set(userId, recent);
}
```

### 5. Not testing with actual AI models

Your tools might look correct in unit tests but confuse the model. Test the full loop: AI model receives tool definitions, decides to call a tool, gets the result, and reasons about it. Adjust descriptions based on how the model actually behaves.

---

## Wrapping Up

Building MCP servers for internal data is about three things:

1. **Good tool design** — clear descriptions, typed parameters, structured responses
2. **Proper access control** — authenticate users, scope data access, log everything
3. **Production readiness** — health checks, rate limiting, error handling, monitoring

The protocol itself is straightforward. The hard work is designing the right abstractions over your internal systems so the AI can use them effectively without leaking data or overwhelming the context window.

Start with one or two high-value tools (employee lookup, document search), test them with real users, and expand from there. The best internal MCP servers grow organically based on what people actually ask the AI.

::: info

The full source code from this guide is available on [GitHub (<VPIcon icon="iconfont icon-github" />`mayur9210/build-mcp-server-template`)](https://github.com/mayur9210/build-mcp-server-template).

<SiteInfo
  name="mayur9210/build-mcp-server-template"
  desc="Contribute to mayur9210/build-mcp-server-template development by creating an account on GitHub."
  url="https://github.com/mayur9210/build-mcp-server-template/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ec98b5a50adf5e64c227231f6beab54c57ace708de0f12d4c9bf60867963d7ba/mayur9210/build-mcp-server-template"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build MCP Servers for Your Internal Data",
  "desc": "The Model Context Protocol (MCP) is changing how AI applications connect to external tools and data. While some tutorials stop at ”connect to GitHub” or ”read a file,” the real power of MCP is unlocki",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-mcp-servers-for-your-internal-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
