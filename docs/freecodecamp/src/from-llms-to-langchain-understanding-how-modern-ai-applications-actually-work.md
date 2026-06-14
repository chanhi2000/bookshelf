---
lang: en-US
title: "From LLMs to LangChain: Understanding How Modern AI Applications Actually Work"
description: "Article(s) > From LLMs to LangChain: Understanding How Modern AI Applications Actually Work"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - AI
  - LLM
  - Groq
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - groq
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From LLMs to LangChain: Understanding How Modern AI Applications Actually Work"
    - property: og:description
      content: "From LLMs to LangChain: Understanding How Modern AI Applications Actually Work"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-llms-to-langchain-understanding-how-modern-ai-applications-actually-work.html
prev: /programming/js-express/articles/README.md
date: 2026-06-24
isOriginal: false
author:
  - name: Sudheesh Shetty
    url: https://freecodecamp.org/news/author/sudheeshshetty/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/38787e16-7e86-44da-9a6a-620cc1a99fce.png
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
  "title": "Groq > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/groq/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From LLMs to LangChain: Understanding How Modern AI Applications Actually Work"
  desc="Typically, when we start experimenting with AI, many of us begin similarly. We try a single LLM call as the core of an app, like this: const response = await llm.chat(”Explain Kubernetes”); For a lit"
  url="https://freecodecamp.org/news/from-llms-to-langchain-understanding-how-modern-ai-applications-actually-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/38787e16-7e86-44da-9a6a-620cc1a99fce.png"/>

Typically, when we start experimenting with AI, many of us begin similarly. We try a single LLM call as the core of an app, like this:

```plaintext
const response = await llm.chat("Explain Kubernetes");
```

For a little while it feels like the whole flow is: the user asks something, and the model returns an answer. That early success often creates a false impression that building AI is just about sending prompts and getting responses.

That simplicity is seductive, but it doesn't hold up. Over time, users want the assistant to find answers in their documents and knowledge bases, call APIs, fetch live data, or trigger services or schedule meetings.

Users also expect the agent to access internal systems and interact with ERPs, CRMs, or other tools holding critical business data. They'll want agents to combine multiple steps, as workflows often require chaining queries, computations, and side effects into reliable processes.

This is where concepts like MCP (the Model Context Protocol) and tools like LangChain come in. Initially, they may seem like buzzwords, but they address different aspects of LLM production.

After experimenting with AI tools, I found that these concepts help solve different problems related to interfaces, orchestration, and system integration.

This article is a practical guide to understanding how LLMs connect with tools, orchestrate workflows, and power real AI applications.

Throughout the article we'll discuss what LLMs are and how they work, what tool-calling looks like in practice, what MCP is and how it works, how LangChain fits into the whole process, and how to put all these tools together.

To follow along, you'll need a basic understanding of Node.js, API operations, and basic JavaScript concepts.

---

## What Is an LLM?

LLM stands for **Large Language Model**. It's a class of deep neural networks trained on massive amounts of text to model and generate human-like language. Popular examples you might have heard of include GPT, Claude, Gemini, and Llama.

### How to Call an LLM From a Node.js Application

Before writing code, let’s understand what it means to call an LLM from a Node.js application.

Calling an LLM means sending input from your application to an AI provider’s API and receiving generated output in return. It's similar to calling any other external service.

In most real-world applications, the model isn't hosted or trained by your application. Instead, providers such as OpenAI and Groq host and maintain the models, while your application communicates with them over HTTP APIs.

In this example, we’ll build a minimal API using Node.js and Express. We’ll create a simple `POST /chat` endpoint that accepts a user message, sends it to the OpenAI API, receives the generated response, and returns it to the client.

Here, our Node.js server acts as the bridge between the user and the LLM provider.

For this example, create an API key from the [<VPIcon icon="iconfont icon-groq"/>Groq](https://console.groq.com/keys) console. Since it offers a free tier, it’s a simple way to experiment and understand the concepts.

First, install the dependencies:

```sh
npm i express
```

```js :collapsed-lines
import express from "express";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: GROQ_API_KEY,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: data });
  }

  const reply = data.choices[0].message.content;

  res.json({ reply });
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Start the server and make a request. Use Postman and do a POST request to `/chat` using the below body:

```plaintext
POST /chat

{
  "message": "Explain Kubernetes"
}
```

Example response:

```plaintext
{
  "reply": "Kubernetes is a container orchestration platform..."
}
```

The backend receives the message, forwards it to the model provider, receives generated text, and returns it to the client.

LLMs are excellent at language-centric tasks: they understand phrasing and intent, generate coherent text, extract structured information from unstructured input, and perform basic reasoning over provided context. These capabilities make them powerful for things like summarization, drafting, and conversational QA.

But there’s an important limitation: LLMs don't automatically know about and can't access your private or live data. They don’t have implicit access to your company database, internal APIs, or the current state of your systems unless you provide that information at runtime.

Because of that limitation, you need secure mechanisms to connect models to live systems and data — which brings us to the idea of tools.

---

## Why LLMs Need Tools

Imagine asking:

> Check my order and raise support if delivery is delayed.

The model alone can't inspect your order database or create a support ticket in your system. To do that, it must call external functions — for example, a `getOrderStatus(orderId)` API and a `createSupportTicket(orderId, issue)` action.

Those callable functions are what we call tools: programmatic interfaces the AI can use to interact with systems and take concrete actions on behalf of users.

A tool is simply a function that an AI model can call to interact with external systems or perform actions.

For example, imagine we have a getOrderStatus(id) function that returns an order’s delivery status.

To expose this to the LLM, we define a tools array. Each tool includes:

- type – currently "function"
- function name – the function identifier
- function description – helps the LLM decide when to call the tool
- function parameters – a JSON Schema describing the arguments the tool expects

Here's an example:

```ts
function getOrderStatus(id) {
  const statuses = ["pending", "success", "cancelled"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return `Your order status is ${status}.`;
}

const tools = [
  {
    type: "function",
    function: {
      name: "getOrderStatus",
      description: "Get the status of an order by its ID",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "The order ID" },
        },
        required: ["id"],
      },
    },
  },
];
```

The above tool format is for Grok. Different LLM providers may use different formats for defining tools, but the overall idea remains the same.

When making the API call, we pass both the user messages and the list of available tools.

```ts
body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: message }],
    tools,
}),
```

After the API call, the LLM decides whether a tool is needed. If a tool call is requested, our application executes the corresponding function and sends the result back to the model.

For this example, we'll only handle the `getOrderStatus` tool. We can check whether the model requested a tool call like this:

```ts
const toolCall = data.choices[0].message.tool_calls[0];
const { id } = JSON.parse(toolCall.function.arguments);
const toolResult = getOrderStatus(id)
```

and later we can pass the message context with tool result

```ts
body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
        { role: "user", content: message },
        assistantMessage,
        { role: "tool", tool_call_id: toolCall.id, content: toolResult },
    ],
    tools,
}),
```

Finally, return the response:

```ts
return res.json({ reply: followUpData.choices[0].message.content });
```

Here's a diagram of the flow:

![User -> LLM -> Tool Execution -> Tool Result -> Final Response](https://cdn.hashnode.com/uploads/covers/6a1fa5fdc5c3ae375fb38ab2/22d6dc4d-ad5e-4fbb-84f6-71c367565282.png)

The LLM decides whether a tool is needed and generates the required inputs, while your application executes the function.

---

## Where MCP Comes In

Tools are simple. You define functions and tell the AI what it can use.

For example, `getOrderStatus()` works well when all tools are built inside your application. But as applications grow, tools may come from many places, like Slack, GitHub, databases, internal systems, or third-party services. Each one may expose tools differently.

This is where [**MCP (Model Context Protocol) helps**](/freecodecamp.org/how-does-an-mcp-work-under-the-hood.md). Think of MCP as a common language that lets AI systems connect to external tools in a consistent way.

Tools define what the AI can do. MCP standardizes how the AI connects to and uses those tools.

Now let’s extend the previous /chat API example so the LLM can use tools exposed through MCP. There are multiple ways to do this:

- build and host your own MCP server and expose your application functions
- connect to existing third-party MCP servers such as Slack

For this tutorial, we'll keep things simple and use a remote MCP server approach because it's easier to understand.

```sh
npm i express @modelcontextprotocol/sdk zod
```

Now let’s create our own MCP server and expose the same `getOrderStatus` function as an MCP tool:

```ts :collapsed-lines
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

function getOrderStatus(id) {
  const statuses = ["pending", "success", "cancelled"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return `Your order status is ${status}.`;
}

function createOrderServer() {
  const server = new McpServer({ name: "order-server", version: "1.0.0" });

  server.registerTool(
    "getOrderStatus",
    {
      description: "Get the status of an order by its ID",
      inputSchema: { id: z.string() },
    },
    async ({ id }) => ({
      content: [{ type: "text", text: getOrderStatus(id) }],
    })
  );

  return server;
}

const app = createMcpExpressApp({ host: "0.0.0.0" });

app.post("/mcp", async (req, res) => {
  const server = createOrderServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Order MCP server running on http://0.0.0.0:${PORT}/mcp`);
});
```

This is useful when you want to expose your own application functions through MCP. Typically, the MCP server runs separately and is accessed by MCP clients. Now any MCP client can connect to this server and discover the available tools automatically.

The same idea applies to third-party MCP servers.

For example, if a Slack MCP server is available, we can connect to it instead of writing Slack integration code ourselves.

In that case, our application isn't directly calling Slack APIs. It connects to the Slack MCP server, which exposes Slack-related tools using the MCP standard.

So the difference is:

- For our own features, we can build our own MCP server
- For external systems, we can use existing MCP servers when available

Now we can pass MCP servers to the LLM request:

```ts
body: JSON.stringify({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: message }],
  tools: [
    {
      type: "mcp",
      server_label: "OrderServer",
      server_url: `http://0.0.0.0:${PORT}/mcp`,
      server_description: "Get the status of an order by its ID",
    },
    {
      type: "mcp",
      server_label: "Slack",
      server_url: "https://mcp.slack.com/mcp",
      server_description: "Send and read Slack messages",
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    },
  ],
})
```

We can also use local MCP servers instead of remote URLs by connecting through transports such as `StdioClientTransport`. In that case, we connect locally, discover the available tools, and expose them to the LLM.

Now if the user sends:

```json
{
  "message": "What is status of order 123"
}
```

The LLM decides whether a tool is needed, MCP exposes and executes the tool, and the final response is returned to the user.

The flow becomes:

![User -> /chat api -> LLM -> MCP Tool -> Tool Result -> Tool Response](https://cdn.hashnode.com/uploads/covers/6a1fa5fdc5c3ae375fb38ab2/2db75d86-db9a-477e-b578-92221a490a2a.png)

This standardization makes integrations far more reusable: instead of rewriting glue logic for each new connector, teams can register MCP-compliant tools and let the orchestrator and model handle discovery and invocation.

---

## So What Does LangChain Actually Do?

I initially thought LangChain was simply another wrapper around LLM APIs, but it is better understood as an orchestration framework for AI workflows. Tools let an LLM perform actions. MCP standardizes how tools are exposed. LangChain helps coordinate models, tools, and application logic to build multi-step workflows.

For example:

> User: Find flights, compare prices, book hotel, send confirmation.

Now the system may need to:

- Check order status
- Decide whether support is needed
- Create a support ticket
- Generate the final response

Without orchestration, you would manually control each step. LangChain helps manage this flow.

To use LangChain, Install the required packages:

```sh
npm i express langchain @langchain/groq
```

We'll reuse the same tool functions from earlier:

```ts
import express from "express";
import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";

const app = express();
app.use(express.json());

const agent = createAgent({
  model: new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: GROQ_API_KEY,
  }),
  tools: [
    {
      name: "getOrderStatus",
      description:
        "Get order status",
      execute: ({ id }) =>
        getOrderStatus(id), // we have this function above
    },
    {
      name: "createSupportTicket",
      description:
        "Create support ticket",
      execute: ({ id }) =>
        createSupportTicket(id), //imagine a function that creates a support ticket
    },
  ],
});

app.post(
  "/chat",
  async (req, res) => {
    const { message } = req.body;

    const response =
      await agent.invoke({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    res.json({
      reply:
        response.messages
          ?.at(-1)
          ?.text,
    });
  }
);

app.listen(3000);
```

Now the flow becomes:

![Horizontal architecture diagram showing User → /chat API → LangChain Agent → OpenAI → Tool → Tool Result → Final Response.](https://cdn.hashnode.com/uploads/covers/6a1fa5fdc5c3ae375fb38ab2/bd2a266c-39eb-4f3e-9909-ad81360bccb7.png)

LangChain doesn't replace tools or MCP. It sits above them and coordinates how everything works together.

---

## Putting It Together

A modern AI application usually has multiple layers working together. The LLM handles reasoning and language generation. Tools perform real operations such as reading data, calling APIs, or executing actions. MCP helps standardize how those tools are exposed and accessed. LangChain helps orchestrate the interaction between models, tools, and workflows.

By separating these responsibilities, applications become easier to extend, maintain, and scale.

The goal is more than just generating text. You want to be able to build systems that can reason, retrieve information, take actions, and reliably solve real user problems.

![User ->LLM -> LangChain -> MCP -> Tools -> Systems & Data](https://cdn.hashnode.com/uploads/covers/6a1fa5fdc5c3ae375fb38ab2/bfc88660-3145-4b89-a626-158c4ec52bcc.png)

---

## What I Built While Learning This

After understanding the concepts above, I wanted to reduce some of this setup for my own projects. As I experimented, I noticed most applications recreate the same plumbing over and over: connecting an LLM, wiring up tools, managing execution, and exposing orchestration patterns.

So I built a small open-source toolkit to reduce that setup. The goal was simple: you should be able to focus on business logic instead of wiring AI infrastructure.

Current capabilities:

- LLM integration
- Tool registration
- Tool execution
- Chat orchestration
- LangChain support
- Extensible architecture

::: info Packages

- **[AI Chat Widget (<VPIcon icon="fa-brands fa-npm"/>`ai-chat-toolkit-widget`)](https://npmjs.com/package/ai-chat-toolkit-widget)**
- **[AI Chat Server (<VPIcon icon="fa-brands fa-npm"/>`ai-chat-toolkit-server`)](https://npmjs.com/package/ai-chat-toolkit-server)**

<SiteInfo
  name="sudheeshshetty/ai-chat-toolkit"
  desc="Add an AI assistant to any web application in minutes using an embeddable chat widget and MCP-powered backend tools."
  url="https://github.com/sudheeshshetty/ai-chat-toolkit/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c93eb626ed907aaae9754c1cae9ad49a0050ca4f823de7e9e04155a2ffa8fc64/sudheeshshetty/ai-chat-toolkit"/>

To build a server using the toolkit:

```sh
npm i express ai-chat-toolkit-server
```

Create the chat server:

```ts
const aiChat = new AiChatServer({
  path: "/my-chat",
  provider: "groq",
  apiKey: process.env.API_KEY,
  model: process.env.MODEL || "llama-3.3-70b-versatile",
  cors: {
    origin: "http://localhost:5174",
  },
  orchestration: "langchain",
  maxToolRounds: 6,
  systemPrompt:
    "You are a helpful operations assistant for a demo store. Keep answers concise.",
});
```

Add your tools:

```ts
aiChat.addTools([
  {
    name: "...",
    description: "...",
    inputSchema: { ... },
    handler: async (input) => { /* runs in Node */ },
  },
]);
```

Attach it to your Express app:

```ts
aiChat.attach(app);
```

Now `/my-chat` is exposed in your Express server and can be used directly.

You can also use `ai-chat-toolkit-widget` if you want to skip building the chat UI.

Examples are available in the repository, so you can try it out quickly.

A quick glance of one of the examples:

![](https://cdn.hashnode.com/uploads/covers/6a1fa5fdc5c3ae375fb38ab2/a9079710-be65-472b-881f-350daeeb0f3b.gif)

If you find it useful, I’d appreciate a star, feedback, or contributions on GitHub as I continue improving the developer experience and exploring new ideas.  
Thanks for reading — I hope this helped make LLMs, tools, MCP, and LangChain feel a little less magical and a lot more practical.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From LLMs to LangChain: Understanding How Modern AI Applications Actually Work",
  "desc": "Typically, when we start experimenting with AI, many of us begin similarly. We try a single LLM call as the core of an app, like this: const response = await llm.chat(”Explain Kubernetes”); For a lit",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-llms-to-langchain-understanding-how-modern-ai-applications-actually-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
