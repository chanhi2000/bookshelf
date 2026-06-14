---
lang: en-US
title: "How to Build an MCP Server with FastMCP for Your Local AI Agent"
description: "Article(s) > How to Build an MCP Server with FastMCP for Your Local AI Agent"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - LangChain
  - Ollama
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an MCP Server with FastMCP for Your Local AI Agent"
    - property: og:description
      content: "How to Build an MCP Server with FastMCP for Your Local AI Agent"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-mcp-server-with-fastmcp-for-local-ai-agent.html
prev: /ai/langchain/articles/README.md
date: 2026-07-09
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0e20e6a5-386d-4fba-8871-40e02554aeaf.png
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
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an MCP Server with FastMCP for Your Local AI Agent"
  desc="In this tutorial, I'll show you how to build an MCP server with FastMCP, connect your local AI agent to use tools from the local MCP server that you built, and add support for remote MCP servers. We'l"
  url="https://freecodecamp.org/news/build-an-mcp-server-with-fastmcp-for-local-ai-agent"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0e20e6a5-386d-4fba-8871-40e02554aeaf.png"/>

In this tutorial, I'll show you how to build an MCP server with FastMCP, connect your local AI agent to use tools from the local MCP server that you built, and add support for remote MCP servers. We'll wire the whole thing together with LangChain v1, Ollama, Qwen, and Python.

Model Context Protocol (MCP) is the common language between AI agents and tools. It's the standard way to expose tools to AI agents.

More companies are starting to expose MCP servers alongside their existing APIs, because MCP gives LLMs and AI agents a standard way to discover and use those capabilities directly.

---

## Background

A lot of simple local AI agents define their tools directly inside the same Python script as the agent. These are specific to the agent and every new agent has to re-implement the same tools from scratch.

MCP improves this by giving tools a standard interface that any MCP-compatible client can use. Write the tool once as an MCP server, and any compatible client can reuse it. And because MCP is a network protocol, those tools don't even have to run on your machine. Someone else can host an MCP server, and your agent can use its tools the same way it uses your local ones.

To follow this tutorial, you'll need Ollama installed on your machine. The tutorial works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model from Ollama.

---

## What is MCP?

[<VPIcon icon="iconfont icon-mcp"/>MCP (Model Context Protocol)](https://modelcontextprotocol.io/docs/getting-started/intro) is an open protocol that exposes tools, resources, and prompts to LLM clients.

Just as REST standardized many web APIs, MCP is the standardizing protocol for AI tools. Instead of every framework inventing its own tool interface, MCP defines a shared one, and anything that understands the protocol can use tools exposed by any MCP-compatible server.

The below image from [modelcontextprotocol.io](http://modelcontextprotocol.io) captures the idea well.

![image from modelcontextprotocol.io that shows how MCP protocol connects AI applications to data sources and tools](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/11ce39d8-4e87-49a5-a525-26caadde1bfd.png)

An MCP server is a small program that exposes a list of tools. An MCP client is anything that connects to that server (for example, an AI agent) and lets an LLM call those tools.

MCP servers are commonly exposed over transports like:

- **stdio**: the server runs as a subprocess of the client, communicating over stdin/stdout. Best for local tools that only your agent needs.
- **http**: the server runs as an HTTP service and clients connect over the network. Best for shared or remote tools.

The protocol standardizes how tools are exposed so different AI agents and clients can use them consistently.

---

## What is FastMCP?

FastMCP is a Python library that makes writing an MCP server feel like writing a FastAPI app. You decorate functions with `@mcp.tool`, and FastMCP handles the protocol details: JSON-RPC messages, tool schema generation from your type hints and docstrings, and the transport layer.

On the LangChain side, `langchain-mcp-adapters` is a library that connects to one or more MCP servers and loads their tools into a format LangChain v1's `create_agent` can use directly. The agent code doesn't know if a tool lives in a subprocess on your machine or on a remote server. It just sees a list of tools with names and descriptions.

---

## Motivation and Architecture

The motivation behind this project is to create sharable tools and to reuse tools others have already built. I wanted to create tools like current_time and word_count and share them across every agent I build. I also wanted to use tools from public MCP servers for capabilities I don't want to write myself, like browsing GitHub repos.

Using a local LLM means my conversations never leave my machine. The only thing that touches the network is whatever the model decides to send to remote tools, and only when it decides to call them.

For this project, I'll use FastMCP to build a local MCP server with two tools, connect to DeepWiki's free public MCP server for GitHub repo lookups, use langchain-mcp-adapters to load both into a LangChain v1 agent, and Ollama to run the local Qwen model.

The flow has three processes.

1. The local MCP server is a standalone Python script that exposes current_time and word_count. It runs as a subprocess of the agent, over stdio.
2. The remote MCP server is DeepWiki's public service that exposes three tools (read_wiki_structure, read_wiki_contents, ask_question) for asking questions about any GitHub repo, over HTTP.
3. The agent is the coordinating script that connects to both, merges their tools into a single list, and runs the interactive loop.

When the user asks a question, the model sees all tools from both servers as one list and picks whichever ones it needs.

---

## Step 1: Install Ollama and Pull the Model

To get started, install the Ollama application for your platform.

We'll use Qwen as the chat model. Qwen has native tool-calling support, which is what makes it work well with MCP tools. I'm using qwen3.5:4b. If your machine has less RAM, you can use qwen3.5:0.8b.

```sh
ollama pull qwen3.5:4b
```

---

## Step 2: Install Python Dependencies

```sh
python3 -m venv venv
source venv/bin/activate
pip install fastmcp langchain langchain-core langchain-ollama langchain-mcp-adapters
```

This tutorial requires `langchain>=1.0.0`.

---

## Step 3: Build the Local MCP Server with FastMCP

The local MCP server exposes two small utility tools: current_time for checking the current date and time, and word_count for counting words in a piece of text. Any MCP client can use them, not just this agent.

FastMCP generates each tool's schema automatically from the type hints and docstrings, so the docstring wording matters. That's what the LLM sees when deciding whether to call each tool.

Save the code in your <VPIcon icon="fa-brands fa-python"/>`mcp_server.py` file.

```py title="mcp_server.py"
from datetime import datetime
from fastmcp import FastMCP

mcp = FastMCP("local-tools")


@mcp.tool
def current_time() -> str:
    """Return the current local date and time.
    Use this when the user asks what time or date it is.
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


@mcp.tool
def word_count(text: str) -> int:
    """Count the number of words in a piece of text.
    Use this when the user asks how long a piece of writing is
    or asks you to count the words in something they've shared.
    Returns the word count as an integer.
    """
    return len(text.split())


if __name__ == "__main__":
    # Run the MCP server over stdio.
    mcp.run()
```

Since this <VPIcon icon="fa-brands fa-python"/>`tools_server.py` will be run in stdio mode as a subprocess, we don't need to start it separately. The agent will run it automatically.

---

## Step 4: Agent Python Code

The agent code does three things. First, the configuration at the top defines the model, the system prompt, and the URL of the remote MCP server. The `build_agent()` function connects to both MCP servers, loads their tools into a single list, and creates a LangChain v1 agent. The `main()` function runs the interactive loop.

The [tool call] log line lets us see exactly which tool (local or remote) the agent picked on each turn.

Finally, `await` is used because `build_agent(client)` is asynchronous. It needs to wait for async MCP operations like `client.get_tools()` before it can return the finished agent. Without `await`, we would just get a coroutine object instead of the actual agent.

Save the code in your <VPIcon icon="fa-brands fa-python"/>`agent_with_mcp.py` file:

```py :collapsed-lines title="agent_with_mcp.py"
import asyncio

from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain_mcp_adapters.client import MultiServerMCPClient

# Local Ollama model to use for the chat agent.
CHAT_MODEL = "qwen3.5:4b"

# Hosted remote MCP server we'll connect to over HTTP.
DEEPWIKI_MCP_URL = "https://mcp.deepwiki.com/mcp"

# System prompt that tells the model what tools it has and how to behave.
SYSTEM_PROMPT = (
    "You are a helpful assistant with access to tools for checking the current time, "
    "counting words, and looking up information about GitHub repositories. "
    "Use tools when the user's request needs information you don't already have. "
    "If a tool returns an error, tell the user plainly and do not retry with made-up arguments. "
    "If the question doesn't need a tool, just answer directly."
)


async def build_agent(client: MultiServerMCPClient):
    # Load tools from all connected MCP servers.
    # This is async because MCP communication happens over I/O.
    tools = await client.get_tools()
    print(f"Loaded {len(tools)} tools: {[t.name for t in tools]}")

    # Create the local Ollama chat model.
    model = ChatOllama(model=CHAT_MODEL, temperature=0)

    # Build a LangChain agent with the local model and all MCP tools.
    return create_agent(
        model=model,
        tools=tools,
        system_prompt=SYSTEM_PROMPT,
    )


async def main():
    # Create one MCP client that connects to two servers:
    #
    # 1. "tools" is a local MCP server started as a subprocess over stdio.LangChain will launch `python mcp_server.py` for us.
    # 2. "deepwiki" is a hosted MCP server we connect to over HTTP.
    client = MultiServerMCPClient({
        "tools": {
            "command": "python",
            "args": ["mcp_server.py"],
            "transport": "stdio",
        },
        "deepwiki": {
            "url": DEEPWIKI_MCP_URL,
            "transport": "streamable_http",
        },
    })

    # Build the agent after the MCP client is ready and tools are loaded.
    agent = await build_agent(client)

    print("\nReady! Ask the agent something.")
    print("Type 'exit' to quit.\n")

    while True:
        question = input("You: ").strip()
        if not question or question.lower() in {"exit", "quit"}:
            break

        # Send the user's message to the agent.
        # We use `ainvoke()` because the agent may call async MCP tools.
        result = await agent.ainvoke({
            "messages": [{"role": "user", "content": question}],
        })

        # Walk through the returned messages and print any tool calls
        # the agent made during this turn.
        for msg in result["messages"]:
            tool_calls = getattr(msg, "tool_calls", None)
            if tool_calls:
                for call in tool_calls:
                    print(f"[tool call] {call['name']}({call['args']})")

        # The final message in the list is the agent's final answer.
        print(f"\nAnswer: {result['messages'][-1].content}\n")


if __name__ == "__main__":
    # Run the async program.
    asyncio.run(main())
```

---

## Step 5: Run the Agent

```sh
python agent_with_mcp.py
```

You don't need to start the local MCP server yourself. `MultiServerMCPClient` launches <VPIcon icon="fa-brands fa-python"/>`mcp_server.py` as a subprocess over `stdio`, and also opens an HTTP connection to DeepWiki. If either server is unreachable, you'll see an error during startup rather than a silent fallback.

Once the agent is running, you can ask it questions in plain English. Before trusting the answers, watch the tool calls to make sure the agent picked the right tool with the right arguments. Local models are smaller than hosted frontier models and tend to hallucinate more. Spot-checking helps.

As a test run, I asked the agent a mix of questions:

```sh
python agent_with_tools.py
#
# Starting MCP server 'local-tools' with transport 'stdio'                                                      transport.py:210
# Loaded 5 tools: ['current_time', 'word_count', 'read_wiki_structure', 'read_wiki_contents', 'ask_question']
# 
# Ready! Ask the agent something.
# Type 'exit' to quit.
# 
# You: what is the current time
# [tool call] current_time({})
# 
# Answer: The current time is 2026-07-01 16:41:42
# 
# You: Give me one line summary of karpathy/nanochat 
# [tool call] ask_question({'repoName': 'karpathy/nanochat', 'question': 'Give me a one-line summary of this repository'})
# 
# Answer: This repository, `karpathy/nanochat`, is a minimal, full-stack experimental system for training large language models (LLMs) from scratch, designed to be accessible and cost-effective, with a primary development focus on optimizing the "Time-to-GPT-2" benchmark.
# 
# You: what's the capital of France?
# 
# Answer: Paris
```

The agent behaved reasonably well for a 4B local model. It called `current_time` tool for the time question and reached out to DeepWiki's remote `ask_question` tool to answer a question about the nanochat repo. It also skipped tool calls entirely for the France question.

::: info

You can explore more MCP servers in the MCP server registry

<SiteInfo
  name="modelcontextprotocol/servers"
  desc="Model Context Protocol Servers."
  url="https://github.com/modelcontextprotocol/servers/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e769ea8aabea349b3c6aebc6d3b650499ef50e6d74afddf4fc6421bb2fb3d3db/modelcontextprotocol/servers"/>

:::

---

## Conclusion

In this tutorial, we built an MCP server with FastMCP, connected to a free public remote MCP server, and wired both into a local AI agent using LangChain v1's `create_agent` and `langchain-mcp-adapters`.

From here, try adding your own tools to the local server, like a note reader or a wrapper around another local capability. Point the agent at other remote MCP servers. Or turn your local server into a remote one by switching its transport to HTTP and running it on a small server, so you can use it from any device you own or even publish it for others to use. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](https://darshshah.org/blog/) (recent posts include system design paper series), my work on my [<VPIcon icon="fas fa-globe"/>personal website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an MCP Server with FastMCP for Your Local AI Agent",
  "desc": "In this tutorial, I'll show you how to build an MCP server with FastMCP, connect your local AI agent to use tools from the local MCP server that you built, and add support for remote MCP servers. We'l",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-mcp-server-with-fastmcp-for-local-ai-agent.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
