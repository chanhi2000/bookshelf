---
lang: en-US
title: "How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API"
description: "Article(s) > How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Antrhopic
  - Claude
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
  - large-language-models
  - anthropic
  - claude
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API"
    - property: og:description
      content: "How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-autonomous-agent-in-python-using-claude.html
prev: /programming/py/articles/README.md
date: 2026-05-15
isOriginal: false
author:
  - name: Tommaso Bertocchi
    url: https://freecodecamp.org/news/author/SonoTommy/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/5890d77b-0678-4c68-a9c3-2304fb2a02ad.png
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
  name="How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API"
  desc="When I started studying OSINT, I always felt I was just putting random values into software without deeply understanding what I was doing. After months in the field, I realized I wasn't really investi"
  url="https://freecodecamp.org/news/build-autonomous-agent-in-python-using-claude"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/5890d77b-0678-4c68-a9c3-2304fb2a02ad.png"/>

When I started studying OSINT, I always felt I was just putting random values into software without deeply understanding what I was doing. After months in the field, I realized I wasn't really investigating — I was just executing steps that follow a predictable pattern. That's exactly what an AI agent is good at. So I built one.

In this tutorial you'll learn how to set up OpenOSINT, an open-source Python OSINT framework with an AI agent at its core. You'll learn how Claude's native tool use API works, how to run autonomous investigations from the terminal using the interactive AI REPL, how to use the direct CLI for scripting, and how to expose all the tools to Claude Code or Claude Desktop via an MCP server.

---

## What Is OSINT and Why Manual Workflows Break Down

Open Source Intelligence (OSINT) is the practice of collecting and analyzing information from publicly available sources. Security researchers use it during penetration tests. Journalists use it to verify identities and trace connections. Threat analysts use it to profile infrastructure.

A typical OSINT workflow looks like this:

1. You have a target email address
2. You run `holehe` to find which platforms that email is registered on
3. You notice a username in the output
4. You manually copy that username and run `sherlock` to search 300+ platforms
5. You switch to a browser to check HaveIBeenPwned
6. You open another tab for a WHOIS lookup
7. You take notes and repeat

Every tool is a silo. Every pivot is manual. The investigation logic — what to run next, what to chain, what the findings mean — lives entirely in your head.

When you close the terminal, it's gone.

::: info

This tutorial walks you through [OpenOSINT (<VPIcon icon="iconfont icon-github"/>`OpenOSINT/OpenOSINT`)](https://github.com/OpenOSINT/OpenOSINT), an open-source Python framework that replaces that fragmented workflow with an AI agent that chains tools autonomously, executes them against real binaries, and saves a structured Markdown report.

<SiteInfo
  name="OpenOSINT/OpenOSINT"
  desc="AI-powered OSINT agent with interactive REPL, MCP server, and CLI. 9 tools. Works with Claude, GPT-4, or local models. For authorized security research only."
  url="https://github.com/OpenOSINT/OpenOSINT/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1230831838/21d0fe19-974a-4d20-96ab-451d9dfbec85"/>

:::

More importantly, you'll learn the core design principle that makes it trustworthy for security research: **hallucination in tool results is structurally impossible**.

---

## What You'll Build

By the end of this tutorial, you'll have a working OSINT agent that you can use in three ways:

- **Interactive AI REPL** — type a target in natural language and the agent decides what to run
- **Direct CLI** — run individual tools without AI, useful for scripting
- **MCP Server** — expose all tools to Claude Code or Claude Desktop

Here's what a real session looks like:

```sh
openosint
# 
# openosint ❯ investigate target@example.com
# 
#   → generate_dorks('target@example.com')
#   → search_email('target@example.com')
#   ✓ Found: Spotify, WordPress, Gravatar, Office365
# 
#   → search_breach('target@example.com')
#   ✓ Found in 2 breaches: LinkedIn (2016), Adobe (2013)
# 
#   → search_username('target_handle')
#   ✓ Found on: GitHub, Reddit, HackerNews, Twitter
# 
#   ╭──────────────── Report ────────────────╮
#   │ ## Online Presence                     │
#   │ Spotify · WordPress · Gravatar         │
#   │                                        │
#   │ ## Data Breaches                       │
#   │ LinkedIn (2016) · Adobe (2013)         │
#   ╰────────────────────────────────────────╯
# 
#   ✓ Report saved → reports/2026-05-11_report.md
```

The agent went from email → linked accounts → username pivot → cross-platform search with no human orchestration at any step.

::: note Prerequisites

To follow this tutorial, you'll need:

- Python 3.10 or later installed on your machine
- Basic familiarity with the command line
- An [<VPIcon icon="iconfont icon-claude"/>Anthropic API key](https://console.anthropic.com/) — only required for the AI REPL, not for the CLI or MCP server
- Git installed

You don't need prior experience with OSINT tools or the Anthropic SDK.

:::

---

## How Claude's Tool Use API Works

Before you dive into installation, it's worth understanding the mechanism that makes this framework trustworthy for security research.

Most AI applications that wrap external tools work by generating text that describes what a tool *would* return. That's a problem when accuracy matters — the model can hallucinate plausible-looking usernames, fake subdomains, or data breaches that never happened.

Claude's tool use API works differently. When the model decides it needs to call a tool, it does **not** generate the output. It stops and emits a structured `tool_use` block containing the tool name and the arguments it wants to pass.

Your code then runs the actual binary — `holehe`, `sherlock`, or whatever else — and sends the real output back as a `tool_result`. The model reads that real output and decides its next step.

Here's the flow:

```plaintext
User prompt
    ↓
Model decides to call search_email()
    ↓
Hard stop — model emits tool_use block
    ↓
Your code runs holehe against the real target
    ↓
Real output sent back as tool_result
    ↓
Model reads actual results, decides next step
    ↓
Repeat until investigation is complete
```
<!-- TODO: mermaid화-->

The model never generates tool output. It only ever reads it. If `sherlock` finds 12 profiles, those 12 URLs go back into the context verbatim. The model cannot add a 13th that doesn't exist.

This is not a prompting trick or a system prompt instruction. It is how the API is architected. Keep this in mind as you read through the agent loop code later in this tutorial.

---

## How to Install OpenOSINT

Start by cloning the repository and installing the package:

```sh
git clone https://github.com/OpenOSINT/OpenOSINT.git
cd OpenOSINT
pip install -e .
```

Alternatively, if you just want to use the tool without modifying the source, install it directly from PyPI:

```sh
pip install openosint
```

Next, set your Anthropic API key. This is only required for the interactive AI REPL — the direct CLI and MCP server work without it:

```sh title=".env"
export ANTHROPIC_API_KEY=sk-ant-...
```

### How to Install the External Tool Dependencies

OpenOSINT wraps several standalone OSINT tools. Install the ones you plan to use:

```sh
pip install holehe            # email account enumeration
pip install sherlock-project  # username search across 300+ platforms
pip install sublist3r         # subdomain enumeration
```

For phone intelligence, `phoneinfoga` is a standalone binary. Download the release for your platform from its [GitHub releases page (<VPIcon icon="iconfont icon-github"/>`sundowndev/phoneinfoga`)](https://github.com/sundowndev/phoneinfoga/releases) and place it somewhere in your `PATH`.

### How to Configure Optional API Keys

Two tools work at higher rate limits with optional API keys:

```sh
export HIBP_API_KEY=your_key    # required for breach checks via HaveIBeenPwned v3
export IPINFO_TOKEN=your_token  # optional — raises ipinfo.io rate limits
```

If a binary is missing or an API key is not configured, that specific tool returns a descriptive error string. All other tools continue to work normally.

---

## How to Use the Interactive AI REPL

Run `openosint` with no arguments to start the AI-powered REPL. You can also use `openosint shell` — it's equivalent:

```sh
openosint
# or
openosint shell
```

If you prefer to pass the API key inline rather than via environment variable, use the `--api-key` flag:

```sh
openosint --api-key sk-ant-...
```

You'll get a prompt where you can type targets or questions in natural language:

```plaintext
openosint ❯ investigate target@example.com
openosint ❯ find all accounts for johndoe99
openosint ❯ what subdomains does example.com have?
openosint ❯ check if +14155552671 is a mobile number
```

The agent decides which tools to run based on your input. You don't need to specify which tools to use or in what order. If you type an email address, the agent will run email enumeration. If it finds a linked username, it may pivot and search that username across platforms.

Reports are saved automatically to the `reports/` directory after every investigation that produces structured findings.

Here are the commands available inside the REPL:

| Command | Description |
| --- | --- |
| `clear` | Reset the conversation memory |
| `save` | Manually save the last report |
| `tools` | Show available tools and their status |
| `config` | Show current configuration |
| `help` | List all commands |
| `exit` or Ctrl-D | Quit |

---

## How to Run Individual Tools from the CLI

If you want to run a single tool without the AI layer — for scripting, automation, or quick lookups — use the direct CLI:

```sh
# Email account enumeration (default timeout: 120s)
openosint email target@example.com

# With a custom timeout in seconds
openosint email target@example.com -t 60

# Username search across 300+ platforms (default timeout: 180s)
openosint username johndoe99

# Enable verbose output for debugging
openosint -v email target@example.com
```

The direct CLI doesn't require an Anthropic API key. It runs the underlying binary and prints the output to the terminal.

This mode is useful when you need predictable, scriptable behavior — for example, piping output into another tool or running automated checks.

---

## How to Set Up the MCP Server

OpenOSINT also ships as a Model Context Protocol (MCP) server. This exposes all 9 tools to any MCP-compatible AI client.

### How to Register with Claude Code

```sh
claude mcp add openosint python /absolute/path/to/OpenOSINT/openosint/mcp_server.py
```

Verify the registration worked:

```sh
claude mcp list
```

Once registered, you can drive investigations from the Claude Code prompt:

```plaintext
> Investigate target@example.com. If you find a linked username,
  trace it across other platforms and compile a full report.
```

### How to Configure Claude Desktop

Add the following to your Claude Desktop config at <VPIcon icon="fas fa-folder-open"/>`~/Library/Application Support/Claude/`<VPIcon icon="iconfont icon-json"/>`claude_desktop_config.json`:

```json title="~/Library/Application Support/Claude/claude_desktop_config.json"
{
  "mcpServers": {
    "openosint": {
      "command": "python",
      "args": ["/absolute/path/to/OpenOSINT/openosint/mcp_server.py"]
    }
  }
}
```

Restart Claude Desktop after saving the file. The tools will appear in Claude's tool list.

The MCP server uses stdio transport and does not need a persistent background process. Claude Code or Claude Desktop starts it on demand.

---

## How the Agent Loop Works Under the Hood

Here is a simplified version of the agent loop from <VPIcon icon="fas fa-folder-open"/>`openosint/`<VPIcon icon="fa-brands fa-python"/>`agent.py`:

```py title="openosint/agent.py"
import anthropic
import asyncio

client = anthropic.Anthropic()

async def run_investigation(user_prompt: str) -> str:
    messages = [{"role": "user", "content": user_prompt}]

    while True:
        response = client.messages.create(
            model="claude-...",   # model configured via --api-key / env var
            max_tokens=4096,
            tools=TOOL_SCHEMAS,   # JSON schemas for all 9 tools
            messages=messages
        )

        # Agent is done — extract and return the final report
        if response.stop_reason == "end_turn":
            return extract_text(response)

        # Agent needs a tool — run the real binary
        if response.stop_reason == "tool_use":
            tool_results = []

            for block in response.content:
                if block.type == "tool_use":
                    # Runs holehe, sherlock, etc. as real subprocesses
                    real_output = await execute_tool(block.name, block.input)

                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": real_output  # real output, never generated
                    })

            # Append assistant turn and real tool results to conversation
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})
```

There are a few important things to understand in this code.

1. **The loop runs until** `stop_reason == "end_turn"`: The agent decides when it has gathered enough information to write the final report. It may call one tool or ten, depending on what it finds.
2. `execute_tool()` **runs real subprocesses**: It's a thin async wrapper around Python's `asyncio.create_subprocess_exec()` with a configurable timeout. There's no simulation and no mocked data at any point.
3. **Conversation history is maintained across the entire loop**: Each tool result goes back into `messages`, so the model always has full context of what it found when deciding what to run next.
4. **Tool schemas are defined as JSON**: Each tool has a name, description, and parameter schema. The model uses these to know what tools exist and what arguments they accept. Here's a simplified example for `search_email`:

```json
{
  "name": "search_email",
  "description": [
    "Enumerates online services and social accounts "
    "associated with an email address using holehe."
  ],
  "input_schema": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "description": "Target email address"
      }
    },
    "required": ["email"]
  }
}
```

The same pattern applies to all 9 tools. The model reads these schemas at the start of every request and uses them to decide what's available and how to call it.

---

## Project Architecture

The codebase is organized in five layers. The hard rule across the codebase is that no layer imports from a layer above it:

```plaintext
openosint/tools/        Core tools
                        Async wrappers around external binaries and APIs.
                        Stateless. No AI. No CLI. Pure functions.

openosint/agent.py      AI agent
                        Anthropic tool use loop.
                        Per-session conversation history.
                        Imports from tools/. Nothing imports from agent.py.

openosint/repl.py       Interactive REPL (prompt_toolkit + Rich)
openosint/mcp_server.py MCP server (stdio transport)
openosint/cli.py        CLI entry point
```

This separation makes each layer independently testable. The core tools are pure async functions that take a string and return a string — you can unit test them without touching the agent or the CLI.

It also means the AI layer is entirely optional. If you don't have an Anthropic API key, you use the CLI and bypass the agent. The MCP server also operates independently of the agent.

### The 9 Available Tools

| Tool | Backend | What it returns |
| --- | --- | --- |
| `search_email` | holehe | Social accounts linked to an email |
| `search_username` | sherlock | Accounts across 300+ platforms |
| `search_breach` | HaveIBeenPwned v3 | Breach names, dates, leaked data types |
| `search_whois` | python-whois | Registrant, registrar, creation/expiry |
| `search_ip` | ipinfo.io | Geolocation, ASN, hostname, org |
| `search_domain` | sublist3r | Subdomain enumeration |
| `generate_dorks` | built-in | 12 targeted Google dork URLs, no network calls |
| `search_paste` | psbdmp.ws | Pastebin dump mentions |
| `search_phone` | phoneinfoga | Carrier, country, line type |

---

## Conclusion

In this tutorial, you learned how to set up and use OpenOSINT — a Python OSINT framework built on Claude's tool use API.

The key takeaway is the design principle: by using native tool use, the agent never generates tool output. It only reads real output from real binaries. This makes it suitable for security research where accuracy matters and hallucination isn't an acceptable failure mode.

To recap the three interfaces:

- Run `openosint` for the interactive AI REPL — best for full investigations with automatic chaining
- Run `openosint email` or `openosint username` for direct CLI access — best for scripting and automation
- Register the MCP server in Claude Code or Claude Desktop to run investigations inside your existing AI environment

::: info

The full source code is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`OpenOSINT/OpenOSINT`)](https://github.com/OpenOSINT/OpenOSINT) under the MIT license. Contributions and issues are welcome.

<SiteInfo
  name="OpenOSINT/OpenOSINT"
  desc="AI-powered OSINT agent with interactive REPL, MCP server, and CLI. 9 tools. Works with Claude, GPT-4, or local models. For authorized security research only."
  url="https://github.com/OpenOSINT/OpenOSINT/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1230831838/21d0fe19-974a-4d20-96ab-451d9dfbec85"/>

:::

::: note Legal note

OpenOSINT is for authorized security research, penetration testing, and investigative journalism only. Users are solely responsible for compliance with applicable law, including GDPR, CCPA, and the CFAA. See the [DISCLAIMER.md (<VPIcon icon="iconfont icon-github"/>`OpenOSINT/OpenOSINT`)](https://github.com/OpenOSINT/OpenOSINT/blob/main/DISCLAIMER.md) for the full notice.

<SiteInfo
  name="OpenOSINT/OpenOSINT"
  desc="AI-powered OSINT agent with interactive REPL, MCP server, and CLI. 9 tools. Works with Claude, GPT-4, or local models. For authorized security research only."
  url="https://github.com/OpenOSINT/OpenOSINT/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1230831838/21d0fe19-974a-4d20-96ab-451d9dfbec85"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Autonomous OSINT Agent in Python Using Claude's Tool Use API",
  "desc": "When I started studying OSINT, I always felt I was just putting random values into software without deeply understanding what I was doing. After months in the field, I realized I wasn't really investi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-autonomous-agent-in-python-using-claude.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
