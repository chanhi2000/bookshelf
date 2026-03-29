---
lang: en-US
title: "How to Build AI Agents That Can Control Cloud Infrastructure"
description: "Article(s) > How to Build AI Agents That Can Control Cloud Infrastructure"
icon: iconfont icon-mcp
category:
  - DevOps
  - Sevalla
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sevalla
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocol
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build AI Agents That Can Control Cloud Infrastructure"
    - property: og:description
      content: "How to Build AI Agents That Can Control Cloud Infrastructure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agents-that-can-control-cloud-infrastructure.html
prev: /ai/mcp/articles/README.md
date: 2026-04-01
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69bdba8c-6915-4d8c-ab35-1f5d06824f50.png
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
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build AI Agents That Can Control Cloud Infrastructure"
  desc="Cloud infrastructure has become deeply programmable over the past decade. Nearly every platform exposes APIs that allow developers to create applications, provision databases, configure networking, an"
  url="https://freecodecamp.org/news/how-to-build-ai-agents-that-can-control-cloud-infrastructure"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69bdba8c-6915-4d8c-ab35-1f5d06824f50.png"/>

Cloud infrastructure has become deeply programmable over the past decade.

Nearly every platform exposes APIs that allow developers to create applications, provision databases, configure networking, and retrieve metrics.

This shift enabled automation via Infrastructure as Code and CI/CD pipelines, allowing teams to manage systems through scripts rather than dashboards.

Now another layer of automation is emerging. AI agents are starting to participate directly in development workflows. These agents can read codebases, generate implementations, run terminal commands, and help debug systems. The next logical step is to allow them to interact with the infrastructure itself.

Instead of manually inspecting dashboards or remembering complex command-line syntax, developers can ask an AI agent to check system state, deploy services, or retrieve metrics. The agent performs these tasks by interacting with cloud APIs on behalf of the user.

This capability opens the door to a new type of workflow where infrastructure becomes conversational, programmable, and deeply integrated into development environments.

In this article, we will explore how AI agents can interact with cloud infrastructure through APIs, the challenges of exposing large APIs to AI systems, and how architectures like MCP make it possible for agents to discover and execute infrastructure operations safely. We will also look at a practical example of connecting an AI agent to a cloud platform like Sevalla using the search-and-execute pattern.

Familiarity with cloud infrastructure concepts such as APIs, Infrastructure as Code, and CI/CD workflows is recommended to follow along effectively. You should also have a basic understanding of how AI agents or developer assistants interact with code and systems to fully understand the architectures discussed in this article.

---

## AI Agents Are Becoming Part of the Development Environment

Modern developer tools increasingly embed AI assistants directly inside coding environments. Editors such as Cursor, Windsurf, and Claude Code allow developers to ask questions about their projects, generate new code, and execute commands without leaving the editor.

Instead of manually navigating documentation or writing boilerplate code, developers can simply describe what they want. The AI interprets the request and produces the necessary actions.

This approach is already common for tasks like writing functions, refactoring code, or debugging errors. However, infrastructure management is still largely handled through dashboards, terminal commands, or external tooling.

If AI agents are going to assist developers effectively, they need access to the same systems developers interact with every day. That means accessing APIs that manage applications, databases, deployments, and other infrastructure resources.

The challenge is providing that access in a structured and scalable way.

---

## Connecting AI Agents to External Systems

AI agents do not inherently know how to interact with external services. They need a framework that allows them to call tools and access data safely.

[**Model Context Protocol**](/freecodecamp.org/how-the-model-context-protocol-works.md), or MCP, provides one such framework. MCP is designed to let AI assistants connect to external tools in a standardized way.

An MCP server exposes tools that an AI agent can call when it needs information or wants to act. These tools might retrieve data from a database, query logs, interact with APIs, or execute commands on a remote system.

When the AI agent receives a request from the user, it determines which tool to call and executes that tool through the MCP server. The results are returned to the agent, which can then continue reasoning about the problem.

This architecture allows AI assistants to interact with complex systems while maintaining a clear boundary between the agent and the external environment.

---

## The Challenge of Large Cloud APIs

While MCP enables connecting AI agents to infrastructure systems, cloud platforms introduce an additional challenge.

Most cloud platforms expose large APIs with many endpoints. A typical platform might include endpoints for managing applications, databases, storage, networking, domains, metrics, logs, and deployment pipelines.

If an MCP server exposes each endpoint as a separate tool, the number of tools can quickly grow into the hundreds.

This creates several problems. First, the AI agent must understand the purpose and parameters of every available tool before deciding which one to use. This increases the amount of context required for the agent to operate effectively.

Second, maintaining hundreds of tools becomes difficult for developers who build and maintain the MCP server.

Third, the system becomes rigid. Every time a new API endpoint is added, a new tool must also be created and documented.

For large APIs, this approach quickly becomes impractical.

---

## A Simpler Pattern for API Access

A different architecture solves this problem by dramatically reducing the number of tools exposed to the AI.

Instead of providing a separate tool for every API endpoint, the MCP server exposes only two capabilities.

The first capability allows the agent to search the API specification. This lets the agent discover available endpoints, understand parameters, and inspect request or response schemas.

The second capability allows the agent to execute code that calls the API.

In this model, the AI agent dynamically generates the code required to call the API. Because the agent can search the specification and write its own API calls, the MCP server does not need to define individual tools for every endpoint.

This pattern drastically reduces the complexity of the integration while still giving the agent full access to the underlying platform.

---

## Why Sandboxed Code Execution Is Important

Allowing AI agents to generate and execute code raises important security considerations.

If the generated code runs unrestricted, it could potentially access sensitive parts of the system or perform unintended operations. To prevent this, the execution environment must be carefully controlled.

A common solution is running the generated code inside a sandboxed environment. In this setup, the code runs in an isolated runtime with limited permissions. The environment exposes only specific functions that allow interaction with the platform’s API.

Because the code cannot access the host system directly, the risk of unintended behavior is greatly reduced. At the same time, the AI agent retains the flexibility to generate custom API calls as needed.

This combination of dynamic code generation and sandboxed execution makes it possible for AI agents to interact with complex APIs safely.

---

## Practical Example with Sevalla

A practical implementation of this architecture can be seen in the [Sevalla MCP server (<VPIcon icon="iconfont icon-github"/>`sevalla-hosting/mcp`)](https://github.com/sevalla-hosting/mcp), which exposes a cloud platform’s API to AI agents through the search-and-execute pattern.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a PaaS provider designed for developers shipping production applications. It offers app hosting, database, object storage, and static site hosting for your projects. We also have other options, such as AWS and Azure, that come with their own MCP tools.

Instead of registering hundreds of tools for every API endpoint, the server provides only two tools that allow the AI agent to explore and interact with the entire platform. Find the [<VPIcon icon="iconfont icon-sevalla"/>full documentation](https://docs.sevalla.com/quick-starts/coding-agents/overview) for Sevalla’s MCP server here.

The first tool, `search`, allows the agent to query the platform’s OpenAPI specification. Through this interface the agent can discover available endpoints, understand parameters, and inspect response schemas.

![MCP client](https://cdn.hashnode.com/uploads/covers/66c6d8f04fa7fe6a6e337edd/b1030c9d-b944-41f4-b0a0-4cf1f1bc3039.png)

Because the API specification is searchable, the agent does not need to know the structure of the platform’s API in advance. It can explore the API dynamically based on the task it needs to perform.

For example, if the user asks the agent to list all applications running in their account, the agent can begin by searching the API specification.

```js
const endpoints = await sevalla.search("list all applications")
```

The result returns the relevant API definitions, including the correct path and parameters required for the request. Once the agent understands which endpoint to use, it can generate the necessary API call.

The second tool, `execute`, runs JavaScript inside a sandboxed V8 environment. Within this environment the agent can call the API using a helper function provided by the platform.

```js
const apps = await sevalla.request({
  method: "GET",
  path: "/applications"
})
```

Because the code runs inside an isolated V8 sandbox, the generated script cannot access the host system. The only permitted interaction is through the API helper function. This ensures that the AI agent can perform infrastructure operations safely while still retaining the flexibility to generate dynamic API calls.

This approach allows an agent to discover and interact with many parts of the platform without requiring predefined tools for each capability. After discovering endpoints through the API specification, the agent can retrieve application data, inspect deployments, query metrics, or manage infrastructure resources through generated API calls.

The design also significantly reduces context usage. Traditional MCP integrations might require hundreds of tools to represent every endpoint of a large API. In contrast, the search-and-execute pattern allows the entire API surface to be accessed through just two tools.

For developers connecting AI assistants to infrastructure platforms, this architecture provides a practical way to expose large APIs while keeping the integration simple and efficient.

---

## What This Means for Developers

Allowing AI agents to interact with infrastructure APIs changes how developers manage systems.

Instead of manually navigating dashboards or writing long sequences of commands, developers can describe what they want in natural language. The AI agent can interpret the request, discover the relevant API endpoints, and execute the required operations.

This approach also improves observability and debugging. When something goes wrong, the agent can query logs, inspect metrics, and retrieve system state without requiring the developer to manually gather information.

Over time, this type of integration could significantly reduce the friction involved in managing complex cloud systems.

---

## The Next Evolution of Infrastructure Automation

Infrastructure automation has evolved through several stages. Early cloud systems relied heavily on manual configuration through web interfaces. Infrastructure as Code later allowed teams to define infrastructure using scripts and configuration files.

CI/CD pipelines then automated the process of deploying and updating systems.

AI agents represent the next step in this progression. By combining APIs, MCP integrations, and sandboxed execution environments, developers can allow intelligent systems to reason about infrastructure and interact with it safely.

Instead of static integrations, agents can dynamically discover and call APIs as needed. This makes infrastructure management more flexible and accessible while maintaining the reliability of programmable systems.

As AI tools become more deeply embedded in development environments, the ability for agents to understand and control infrastructure will likely become a standard capability for modern platforms.

::: info

Hope you enjoyed this article. [<VPIcon icon="fas fa-globe"/>Visit my blog](https://manishmshiva.me/) for more practical tutorials.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI Agents That Can Control Cloud Infrastructure",
  "desc": "Cloud infrastructure has become deeply programmable over the past decade. Nearly every platform exposes APIs that allow developers to create applications, provision databases, configure networking, an",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agents-that-can-control-cloud-infrastructure.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
