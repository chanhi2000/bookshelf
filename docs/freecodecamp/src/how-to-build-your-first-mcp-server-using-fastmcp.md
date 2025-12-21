---
lang: en-US
title: "How to Build Your First MCP Server using FastMCP"
description: "Article(s) > How to Build Your First MCP Server using FastMCP"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
  - mcp
  - model-context-protocol
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your First MCP Server using FastMCP"
    - property: og:description
      content: "How to Build Your First MCP Server using FastMCP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-mcp-server-using-fastmcp.html
prev: /programming/py/articles/README.md
date: 2025-12-04
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764782216715/fc1f7b09-d71d-4917-a249-f95686d23520.png
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
  name="How to Build Your First MCP Server using FastMCP"
  desc="Model Context Protocol, or MCP, is changing how large language models connect with data and tools.  Instead of treating an AI model as a black box, MCP gives it structured access to information and actions.  It is like the USB-C port for AI, creating..."
  url="https://freecodecamp.org/news/how-to-build-your-first-mcp-server-using-fastmcp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764782216715/fc1f7b09-d71d-4917-a249-f95686d23520.png"/>

Model Context Protocol, or MCP, is changing how large language models connect with data and tools.

Instead of treating an AI model as a black box, MCP gives it structured access to information and actions.

It is like the USB-C port for AI, creating a standard way for models to interact with servers that hold real-world data or perform useful tasks.

[<VPIcon icon="fas fa-globe"/>FastMCP](https://gofastmcp.com/getting-started/welcome) is the easiest and fastest framework for building MCP servers with Python. It hides all the complex protocol details and lets you focus on your logic.

In this guide, you will learn what MCP is, how FastMCP works, and how to build and run your first MCP server from scratch.

---

## What is MCP?

MCP is a standard protocol that allows language models to talk to external systems in a secure and consistent way. [<VPIcon icon="fas fa-globe"/>MCP is similar to an API](https://turingtalks.ai/p/difference-between-mcp-and-api), but built for large language models instead of humans.

An MCP server can do three main things:

- It can expose data as resources (similar to GET endpoints)
- It can provide actions through tools (similar to POST requests)
- And it can define prompts that guide how the model interacts with data or users.

For example, a resource might return a list of articles, a tool might analyze those articles, and a prompt might define how the model summarizes them. By connecting an LLM to such an MCP server, you give it the power to use your own data and logic in real time.

---

## Why Use FastMCP?

While you could build an MCP server using the [<VPIcon icon="fas fa-globe"/>official SDK](https://modelcontextprotocol.io/), FastMCP takes things much further. It’s a production-ready framework with enterprise authentication, client libraries, testing tools, and automatic API generation.

You can use FastMCP to build secure, scalable MCP applications that integrate with providers like Google, GitHub, and Azure. It also supports deployment to the cloud or your own infrastructure.

Most importantly, the framework is extremely developer-friendly. You can create a working MCP server in just a few lines of Python code.

---

## Creating Your First MCP Server

Before you start building, install FastMCP in your Python environment. You can use pip or uv. The uv tool is recommended because it handles environments and dependencies efficiently.

```sh
uv pip install fastmcp
```

Once installed, you are ready to write your first server.

Every MCP server starts with the `FastMCP` class. This class represents your application and manages your tools, resources, and prompts. Let’s start by creating a simple server that adds two numbers together.

Create a file named <VPIcon icon="fa-brands fa-python"/>`server.py` and add the following code:

```py title="server.py"
from fastmcp import FastMCP

mcp = FastMCP("Demo Server 🚀")

@mcp.tool
def add(a: int, b: int) -> int:
    """Add two numbers and return the result"""
    return a + b
if __name__ == "__main__":
    mcp.run()
```

That’s all you need. You have just created a fully working MCP server with one tool called `add`. When a client calls this tool, the server adds two numbers and returns the result.

---

## Running the Server

To run your server locally, open your terminal and type:

```sh
fastmcp run server.py
```

This command starts the MCP server. You can also use [<VPIcon icon="fas fa-globe"/>HTTP or SSE](https://pubnub.com/guides/server-sent-events/) transports for web-based deployments. For example, to run your server over HTTP, use:

```py
mcp.run(transport="http", host="127.0.0.1", port=8000, path="/mcp")
```

Once the server is running, clients can connect and call the `add` tool remotely.

---

## Adding More Tools

FastMCP tools are simple Python functions that you decorate with `@mcp.tool`. You can add as many as you like. Let’s add a multiplication tool next:

```py
@mcp.tool
def multiply(a: float, b: float) -> float:
    """Multiply two numbers"""
    return a * b
```

You can now run the server again, and clients will have access to both the `add` and `multiply` tools.

FastMCP automatically generates schemas based on your function signatures and docstrings, making it easy for clients to understand your API.

---

## Adding Resources

Resources in MCP represent read-only data that clients can access. You can create static resources or dynamic templates that take parameters. For example, you might expose a version number or a user profile.

```py
@mcp.resource("config://version")
def get_version():
    return "1.0.0"

@mcp.resource("user://{user_id}/profile")
def get_profile(user_id: int):
    return {"name": f"User {user_id}", "status": "active"}
```

In this example, the first resource always returns the version number, while the second resource dynamically fetches a user profile based on the ID provided.

---

## Using Context in Tools

FastMCP allows you to access the session context within any tool, resource, or prompt by including a `ctx: Context` parameter. The context gives you powerful capabilities like logging, [<VPIcon icon="fas fa-globe"/>LLM sampling](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling), progress tracking, and resource access.

Here is an example that shows how to use context:

```py
from fastmcp import Context

@mcp.tool
async def summarize(uri: str, ctx: Context):
    await ctx.info(f"Reading resource from {uri}")
    data = await ctx.read_resource(uri)
    summary = await ctx.sample(f"Summarize this: {data.content[:500]}")
    return summary.text
```

This tool logs a message, reads a resource, and then asks the client’s language model to summarise it. Context makes your MCP tools smarter and more interactive.

---

## Connecting with an MCP Client

Once your server is running, you can connect to it using the `fastmcp.Client` class. The client can communicate via STDIO, HTTP, or SSE, and can even run in-memory for testing.

Here is a simple example of connecting to your local server and calling the `add` tool:

```py
from fastmcp import Client
import asyncio

async def main():
    async with Client("server.py") as client:
        tools = await client.list_tools()
        print("Available tools:", tools)
        result = await client.call_tool("add", {"a": 5, "b": 7})
        print("Result:", result.content[0].text)
asyncio.run(main())
```

You can also connect to multiple servers using a standard MCP configuration file, making it easy to build complex systems that interact with several services simultaneously.

---

## Authentication and Security

When you move from development to production, authentication becomes important.

FastMCP has built-in support for enterprise-grade authentication providers such as Google, GitHub, Microsoft Azure, Auth0, and WorkOS. You can enable secure OAuth-based access with just a few lines of code:

```py
from fastmcp.server.auth.providers.google import GoogleProvider
from fastmcp import FastMCP

auth = GoogleProvider(client_id="...", client_secret="...", base_url="https://myserver.com")
mcp = FastMCP("Secure Server", auth=auth)
```

Now only authenticated users can access your server. On the client side, you can connect using an OAuth flow like this:

```py
async with Client("https://secure-server.com/mcp", auth="oauth") as client:
    result = await client.call_tool("protected_tool")
```

FastMCP handles tokens, refreshes, and error handling automatically.

---

## Deploying Your MCP Server

You can deploy FastMCP servers anywhere.

For testing, the `fastmcp run` command is enough. For production, you can deploy to [<VPIcon icon="fas fa-globe"/>FastMCP Cloud](https://fastmcp.cloud/), which provides instant HTTPS endpoints and built-in authentication.

If you prefer to self-host, use the HTTP or SSE transport to serve your MCP endpoints from your own infrastructure. A simple deployment command might look like this:

```py
mcp.run(transport="http", host="0.0.0.0", port=8080)
```

Once deployed, your MCP server is ready to connect with language models, web clients, or automation workflows.

---

## Using the MCP Server with an LLM Application

Once your MCP server is running, the next step is to connect it to a large language model. This allows an LLM to securely call your server’s functions, read resources, and perform actions as part of a conversation.

To connect an LLM application, you first define your MCP configuration file. This file lists the available servers, their connection methods, and any authentication requirements.

Once configured, the LLM can automatically discover your MCP tools and call them when needed.

For example, if your server exposes an `add` or `summarize` tool, the model can directly use them as if they were built-in capabilities. In a chat-based environment, when a user asks the model to perform a task such as “Summarize the latest article,” the LLM will call your `summarize` tool, process the result, and respond with the output.

If you are building a custom LLM application with frameworks like OpenAI’s Assistants API or LangChain, you can register your MCP server as an external tool. The LLM then interacts with it through the MCP client library.

Here is a simple example:

```py
from fastmcp import Client
from openai import OpenAI
import asyncio

async def main():
    # Connect to your MCP server
    async with Client("http://localhost:8000/mcp") as client:
        # Call an MCP tool directly
        result = await client.call_tool("add", {"a": 10, "b": 5})
        print("MCP Result:", result.content[0].text)
        # Use the result inside an LLM prompt
        llm = OpenAI(api_key="YOUR_KEY")
        response = llm.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant using MCP tools."},
                {"role": "user", "content": f"The sum of 10 and 5 is {result.content[0].text}. Explain how MCP helps with this integration."}
            ]
        )
        print(response.choices[0].message.content)

asyncio.run(main())
```

In this setup, the LLM can seamlessly combine its reasoning with your server’s logic. It uses the MCP client to fetch data or perform computations and then incorporates the output into its conversation or workflow.

This approach lets you build intelligent systems that go beyond static prompts. You can connect your LLM to real databases, APIs, or automation tools, turning it into an active agent that can read, write, and execute with real-world context.

---

## Conclusion

FastMCP makes it simple to bring your data, APIs, and tools into the world of AI through the Model Context Protocol. With just a few lines of Python, you can create powerful MCP servers that connect to language models, automate workflows, and handle real-world logic securely.

Whether you are building a quick demo or an enterprise-grade system, FastMCP gives you the shortest path from idea to production. Install it today, start your first server, and explore how MCP can unlock the next level of AI integration.

If you want to learn more about general MCP concepts and how to build an MCP server with Python, I wrote another article about that [**which you can check out here**](/freecodecamp.org/how-to-build-your-own-mcp-server-with-python.md).
::: info

Hope you enjoyed this article. Sign up for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your First MCP Server using FastMCP",
  "desc": "Model Context Protocol, or MCP, is changing how large language models connect with data and tools.  Instead of treating an AI model as a black box, MCP gives it structured access to information and actions.  It is like the USB-C port for AI, creating...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-mcp-server-using-fastmcp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
