---
lang: en-US
title: "How to Build an MCP Server with Python, Docker, and Claude Code"
description: "Article(s) > How to Build an MCP Server with Python, Docker, and Claude Code"
icon: iconfont icon-claude
category: 
  - Python
  - DevOps
  - Docker
  - AI
  - LLM
  - Anthropic
  - Claude
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - docker
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
  - mcp
  - model-context-protocol
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an MCP Server with Python, Docker, and Claude Code"
    - property: og:description
      content: "How to Build an MCP Server with Python, Docker, and Claude Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-mcp-server-with-python-docker-and-claude-code.html
prev: /devops/docker/articles/README.md
date: 2026-03-11
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/02826050-87fa-42cb-8167-73bca4b42616.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an MCP Server with Python, Docker, and Claude Code"
  desc="Every MCP tutorial I've found so far has followed the same basic script: build a server, point Claude Desktop at it, screenshot the chat window, done. This is fine if you want a demo. But it's not fin"
  url="https://freecodecamp.org/news/how-to-build-an-mcp-server-with-python-docker-and-claude-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/02826050-87fa-42cb-8167-73bca4b42616.png"/>

Every MCP tutorial I've found so far has followed the same basic script: build a server, point Claude Desktop at it, screenshot the chat window, done.

This is fine if you want a demo. But it's not fine if you want something you can ship, defend in an interview, or hand to another developer without a README that starts with "first, install this Electron app."

So I built an MCP server in Python, containerized it with Docker, and wired it into Claude Code – all from the terminal, no GUI required.

This article walks through the full loop in one afternoon: what MCP actually is, why it matters now that OpenAI and Google have adopted it, the real security problems nobody puts in their tutorial (complete with CVEs), and every command you need to go from an empty directory to a working tool.

If you're between jobs and need a portfolio project that shows you understand how AI tooling actually works under the hood, this is the one.

::: info What You Will Build

By the end of this tutorial, you will have:

- A Python MCP server that exposes custom tools to any MCP-compatible AI client
- A Docker container that packages the server for reproducible deployment
- A working connection between that container and Claude Code in your terminal
- An understanding of the security risks involved and how to mitigate the worst of them

The server we are building is a **project scaffolder**. You give it a project name and a language, and it generates a starter directory structure with the right files. It's simple enough to build in an afternoon, but useful enough to actually put on your résumé.

:::

::: note Prerequisites

You will need the following installed on your machine:

- **Python 3.10+** (check with `python3 --version`)
- **Docker** (check with `docker --version`)
- **Claude Code** with an active Claude Pro, Max, or API plan (check with `claude --version`)
- **Node.js 20+** (required by Claude Code – check with `node --version`)
- A terminal you are comfortable in

If you don't have Claude Code installed yet, follow the [<VPIcon icon="iconfont icon-vscode"/>official installation instructions](https://code.claude.com/docs/en/getting-started). The npm installation method is deprecated, so make sure you use the native binary installer instead.

:::

---

## What is MCP (and Why Should You Care)?

The Model Context Protocol (MCP) is an open standard that lets AI models connect to external tools and data sources. Anthropic released it in November 2024, and within a year it became the default way to extend what an LLM can do. OpenAI adopted it in March 2025. Google DeepMind followed in April. The protocol now has over 97 million monthly SDK downloads and more than 10,000 active servers.

The easiest way to think about MCP is as a USB-C port for AI. Before MCP, every AI provider had its own way of calling tools. OpenAI had function calling. Google had their own format. If you wanted your tool to work with multiple models, you had to implement it multiple times. MCP gives you one interface that works everywhere.

Here is how the pieces fit together:

- An **MCP server** exposes tools, resources, and prompts. It is your code.
- An **MCP client** (like Claude Code, Claude Desktop, or Cursor) discovers those tools and calls them on behalf of the LLM.
- The **transport** is how they communicate. For local servers, that's usually stdio (standard input/output). For remote servers, it's HTTP.

When you type a message in Claude Code and it decides to use one of your tools, here is what happens: Claude Code sends a JSON-RPC 2.0 message to your server over stdin, your server executes the tool and writes the result to stdout, and Claude Code reads it back. The LLM never talks to your server directly. The client is always in the middle.

If you want the deeper architecture breakdown, freeCodeCamp already has a [**solid explainer on how MCP works under the hood**](/freecodecamp.org/how-does-an-mcp-work-under-the-hood.md#). Here, I will focus on building.

---

## Why Claude Code Instead of Claude Desktop?

Most MCP tutorials use Claude Desktop as the client. That works, but Claude Code has a few advantages for developers:

1. **It lives in your terminal.** No GUI to configure. No JSON files to hand-edit in hidden config directories. You add an MCP server with one command and you are done.
2. **It's already where you code.** If you're writing the server, testing it, and connecting it, doing all of that in the same terminal session cuts the context switching.
3. **It works on headless machines.** If you're SSHing into a dev box or running in CI, Claude Desktop isn't an option. Claude Code is.
4. **It's also an MCP server itself.** Claude Code can expose its own tools (file reading, writing, shell commands) to other MCP clients via `claude mcp serve`. That's a neat trick we won't use today, but it's worth knowing about.

The relevant commands:

```sh
# Add an MCP server
claude mcp add <name> -- <command>

# List configured servers
claude mcp list

# Remove a server
claude mcp remove <name>

# Check MCP status inside Claude Code
/mcp
```

---

## Step 1: Build the MCP Server

We're using [FastMCP (<VPIcon icon="iconfont icon-github"/>`jlowin/fastmcp`)](https://github.com/jlowin/fastmcp), a Python framework that handles all the protocol plumbing so you can focus on your tools. Create a new project directory and set it up:

```sh
mkdir mcp-scaffolder && cd mcp-scaffolder
python3 -m venv .venv
source .venv/bin/activate
pip install "mcp[cli]>=1.25,<2"
```

Why pin the version? The MCP Python SDK v2.0 is in development and will change the transport layer significantly. Pinning to >=1.25,<2 keeps your server working until you're ready to migrate.

Now create <VPIcon icon="fa-brands fa-python"/>`server.py`:

```py :collapsed-lines title="server.py"
from mcp.server.fastmcp import FastMCP
import os
import json

mcp = FastMCP("project-scaffolder")

# Templates for different languages
TEMPLATES = {
    "python": {
        "files": {
            "main.py": '"""Entry point."""\n\n\ndef main():\n    print("Hello, world!")\n\n\nif __name__ == "__main__":\n    main()\n',
            "requirements.txt": "",
            "README.md": "# {name}\n\nA Python project.\n\n## Setup\n\n```sh\npip install -r requirements.txt\npython main.py\n```\n",
            ".gitignore": "__pycache__/\n*.pyc\n.venv/\n",
        },
        "dirs": ["tests"],
    },
    "node": {
        "files": {
            "index.js": 'console.log("Hello, world!");\n',
            "package.json": '{{\n  "name": "{name}",\n  "version": "1.0.0",\n  "main": "index.js"\n}}\n',
            "README.md": "# {name}\n\nA Node.js project.\n\n## Setup\n\n```sh\nnpm install\nnode index.js\n```\n",
            ".gitignore": "node_modules/\n",
        },
        "dirs": [],
    },
    "go": {
        "files": {
            "main.go": 'package main\n\nimport "fmt"\n\nfunc main() {{\n\tfmt.Println("Hello, world!")\n}}\n',
            "go.mod": "module {name}\n\ngo 1.21\n",
            "README.md": "# {name}\n\nA Go project.\n\n## Setup\n\n```sh\ngo run main.go\n```\n",
            ".gitignore": "bin/\n",
        },
        "dirs": ["cmd", "internal"],
    },
}


@mcp.tool()
def scaffold_project(name: str, language: str) -> str:
    """Create a new project directory structure.

    Args:
        name: The project name (used as the directory name)
        language: The programming language - one of: python, node, go
    """
    language = language.lower().strip()

    if language not in TEMPLATES:
        return json.dumps({
            "error": f"Unsupported language: {language}",
            "supported": list(TEMPLATES.keys()),
        })

    template = TEMPLATES[language]
    base_path = os.path.join(os.getcwd(), name)

    if os.path.exists(base_path):
        return json.dumps({
            "error": f"Directory already exists: {name}",
        })

    # Create the project directory
    os.makedirs(base_path, exist_ok=True)

    # Create subdirectories
    for dir_name in template["dirs"]:
        os.makedirs(os.path.join(base_path, dir_name), exist_ok=True)

    # Create files
    created_files = []
    for filename, content in template["files"].items():
        filepath = os.path.join(base_path, filename)
        formatted_content = content.replace("{name}", name)
        with open(filepath, "w") as f:
            f.write(formatted_content)
        created_files.append(filename)

    return json.dumps({
        "status": "created",
        "path": base_path,
        "language": language,
        "files": created_files,
        "directories": template["dirs"],
    })


@mcp.tool()
def list_templates() -> str:
    """List all available project templates and their contents."""
    result = {}
    for lang, template in TEMPLATES.items():
        result[lang] = {
            "files": list(template["files"].keys()),
            "directories": template["dirs"],
        }
    return json.dumps(result, indent=2)


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

::: info A few things to notice about this code

Tools return strings. MCP tools communicate through text. I'm returning JSON strings so the LLM can parse the results reliably. You could return plain text, but structured data gives the model more to work with.

The `@mcp.tool()` decorator does the heavy lifting. FastMCP reads your function signature and docstring to generate the JSON schema that tells the LLM what this tool does, what arguments it takes, and what types they are. Good docstrings aren't optional here – they're how the LLM decides whether to call your tool.

`transport="stdio"` is the key line. This tells FastMCP to communicate over standard input/output, which is what Claude Code expects for local servers.

:::

---

## Step 2: Test It Locally

Before we Dockerize anything, make sure the server actually works:

```sh
# Quick smoke test - the server should start without errors
python server.py
```

You should see... nothing. That is correct. An MCP server over stdio just sits there waiting for JSON-RPC messages on stdin. Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop it.

For a proper test, use the MCP Inspector (Anthropic's debugging tool):

```sh
# Install and run the inspector
npx @modelcontextprotocol/inspector python server.py
```

This opens a web interface where you can see your tools, call them manually, and inspect the JSON-RPC messages going back and forth. Verify that both `scaffold_project` and `list_templates` show up and return sensible results.

**Here's a debugging tip that will save you time:** If your MCP server logs anything to stdout, it will corrupt the JSON-RPC stream and the client will disconnect. Use stderr for all logging: `print("debug info", file=sys.stderr)`. This is the single most common source of "my server connects but then immediately fails" bugs. The New Stack called stdio transport "incredibly fragile" for exactly this reason.

---

## Step 3: Dockerize It

Create a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` in your project root:

```dockerfile title="Dockerfile"
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .

# MCP servers over stdio need unbuffered output
ENV PYTHONUNBUFFERED=1

# The server reads from stdin and writes to stdout
CMD ["python", "server.py"]
```

Create <VPIcon icon="fas fa-file-lines"/>`requirements.txt`:

```plaintext title="requirements.txt"
mcp[cli]>=1.25,<2
```

Build and verify:

```sh
docker build -t mcp-scaffolder .

# Quick test - should start without errors
docker run -i mcp-scaffolder
```

Again, you'll see nothing because the server is waiting for input. <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop.

Two things matter in this Dockerfile:

1. `PYTHONUNBUFFERED=1` **is critical.** Without it, Python buffers stdout, and the MCP client may hang waiting for responses that are sitting in a buffer. This is one of those bugs that works fine in local testing and breaks in Docker.
2. `docker run -i` **(interactive mode) is required.** The `-i` flag keeps stdin open so the MCP client can send messages to the container. Without it, the server gets an immediate EOF and exits.

---

## Step 4: Wire It Into Claude Code

Now connect your Docker container to Claude Code:

```sh
claude mcp add scaffolder -- docker run -i --rm mcp-scaffolder
```

That's the whole command. Let me break it down:

- `claude mcp add` registers a new MCP server
- `scaffolder` is the name you will reference it by
- Everything after `--` is the command Claude Code runs to start the server
- `docker run -i --rm mcp-scaffolder` starts the container with interactive stdin and removes it when done

Verify that it registered:

```sh
claude mcp list
```

You should see `scaffolder` in the output with a `stdio` transport type.

Now launch Claude Code and check the connection:

```sh
claude
```

Once inside Claude Code, type `/mcp` to see the status of your MCP servers. You should see `scaffolder` listed as connected with two tools available.

---

## Step 5: Use It

Still inside Claude Code, try it out:

```md
Create a new Python project called "weather-api"
```

Claude Code should discover your `scaffold_project` tool, call it with `name="weather-api"` and `language="python"`, and report back what it created. Check your filesystem and you should see the full project structure.

Try a few more:

```md
What project templates are available?
```

```md
Scaffold a Go project called "url-shortener"
```

If Claude Code doesn't pick up your tools, run `/mcp` to check the connection status. If it shows as disconnected, the most common causes are that the Docker image failed to build, stdout is being polluted (check for stray print statements), or the Docker daemon is not running.

---

## Security: What the Other Tutorials Leave Out

This is the section most MCP tutorials skip. They should not. MCP has had real security incidents, not theoretical ones, and understanding them makes you a better developer.

### The Prompt Injection Problem

MCP servers execute code on your machine based on what an LLM decides to do. If an attacker can influence what the LLM sees, they can influence what your server does. This is called prompt injection, and it is the number one unsolved security problem in the MCP ecosystem.

In May 2025, researchers at Invariant Labs demonstrated this against the official GitHub MCP server. They created a malicious GitHub issue that, when read by an AI agent, hijacked the agent into leaking private repository data (including salary information) into a public pull request. The root cause was an overly broad Personal Access Token combined with untrusted content landing in the LLM's context window.

This was not a contrived lab demo. It used the official GitHub MCP server, the kind of thing people install from the MCP server directory without a second thought.

### Real CVEs, Not Theory

The ecosystem has accumulated real vulnerability reports:

- **CVE-2025-6514:** A critical command-injection bug in `mcp-remote`, a popular OAuth proxy that 437,000+ environments used. An attacker could execute arbitrary OS commands through crafted OAuth redirect URIs.
- **CVE-2025-6515:** Session hijacking in `oatpp-mcp` through predictable session IDs, letting attackers inject prompts into other users' sessions.
- **MCP Inspector RCE:** Anthropic's own debugging tool allowed unauthenticated remote code execution. Inspecting a malicious server meant giving the attacker a shell on your machine.

An Equixly security assessment found command injection in 43% of tested MCP server implementations. Nearly a third were vulnerable to server-side request forgery.

### What You Should Actually Do

For the server we built today, here is what matters:

#### Limit file system access

Our Docker container doesn't mount your home directory. That's intentional. If you need the server to write files to your host, mount only the specific directory you need: `docker run -i --rm -v $(pwd)/projects:/app/projects mcp-scaffolder`. Never mount `/` or `~`.

#### Validate all inputs

Our `scaffold_project` tool checks that the language is in a known list and that the directory does not already exist. But think about what happens if someone passes `name="../../etc/passwd"` as the project name. Path traversal is the kind of thing you need to catch. Add this to the tool:

```py
# Add this validation at the top of scaffold_project
if ".." in name or "/" in name or "\\" in name:
    return json.dumps({"error": "Invalid project name"})
```

#### Use least-privilege tokens

If your MCP server connects to an API, give it the minimum permissions it needs. The GitHub MCP incident happened because the PAT had access to every private repo. A read-only token scoped to one repo would have contained the blast radius.

#### Do not install MCP servers from untrusted sources

A malicious npm package posing as a "Postmark MCP Server" was caught silently BCC'ing all emails to an attacker's address. Treat MCP server packages with the same caution you would give any code that runs on your machine with your permissions.

---

## What to Do Next

You have a working MCP server in a Docker container, connected to Claude Code. Here is how to make it portfolio-ready:

1. **Add more tools:** The scaffolder is a starting point. Add a tool that reads a project's dependency file and lists outdated packages. Add one that generates a Dockerfile for an existing project. Each tool is a function with a decorator – the pattern is the same every time.
2. **Add tests:** Write pytest tests that call your tool functions directly and verify the output. MCP tools are just Python functions. Test them like Python functions.
3. **Push the Docker image:** Tag it and push to Docker Hub or GitHub Container Registry. Then your `claude mcp add` command becomes `claude mcp add scaffolder -- docker run -i --rm yourusername/mcp-scaffolder:latest` and anyone can use it.
4. **Write a README that explains the security model:** What permissions does your server need? What file system access? What happens if inputs are malicious? Answering these questions in your README signals that you think about security, which is exactly what hiring managers are looking for right now.

---

## Wrapping Up

We built a Python MCP server with FastMCP, containerized it with Docker, and connected it to Claude Code. The whole thing fits in about 100 lines of Python, a six-line Dockerfile, and one `claude mcp add` command.

The MCP ecosystem is real and growing fast. The protocol has the backing of Anthropic, OpenAI, and Google. It's now governed by the Linux Foundation. But it's also young, and the security story is still being written. Build with it, but build with your eyes open.

::: info

If you want to go deeper, here are the resources I found most useful:

<SiteInfo
  name="Specification - Model Context Protocol"
  desc="Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Whether you’re building an AI-powered IDE, enhancing a chat interface, or creating custom AI workflows, MCP provides a standardized way to connect LLMs with the context they need."
  url="https://modelcontextprotocol.io/specification/2025-11-25/"
  logo="https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon-dark/favicon.ico"
  preview="https://raw.githubusercontent.com/modelcontextprotocol/docs/2eb6171ddbfeefde349dc3b8d5e2b87414c26250/images/og-image.png"/>

<SiteInfo
  name="Connect Claude Code to tools via MCP - Claude Code Docs"
  desc="Learn how to connect Claude Code to your tools with the Model Context Protocol."
  url="https://code.claude.com/docs/en/mcp/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DBuild%2Bwith%2BClaude%2BCode%26appearance%3Dsystem%26title%3DConnect%2BClaude%2BCode%2Bto%2Btools%2Bvia%2BMCP%26description%3DLearn%2Bhow%2Bto%2Bconnect%2BClaude%2BCode%2Bto%2Byour%2Btools%2Bwith%2Bthe%2BModel%2BContext%2BProtocol.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252FTBPmHzr19mDCuhZi%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DTBPmHzr19mDCuhZi%2526q%253D85%2526s%253Dd535f2e20f53cd911acc59ad1b64b2e0%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252FTBPmHzr19mDCuhZi%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DTBPmHzr19mDCuhZi%2526q%253D85%2526s%253D28e49a2ffe69101f4aae9bfa70b393d0%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="PrefectHQ/fastmcp"
  desc="🚀 The fast, Pythonic way to build MCP servers and clients."
  url="https://github.com/PrefectHQ/fastmcp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2605c7b3d957f8a8580aa2e09b313d1e2f53126c12e61a0f1f689a0f7d663f50/PrefectHQ/fastmcp"/>

<SiteInfo
  name="A Timeline of Model Context Protocol (MCP) Security Breaches"
  desc="AI fundamentally changes the interface, but not the fundamentals of security. Here's a timeline of security breaches in MCP Servers from the recent past."
  url="https://authzed.com/blog/timeline-mcp-breaches/"
  logo="https://authzed.com/favicon-16x16.png"
  preview="https://authzed.com/images/blogs/blog-featured-image.png"/>

<SiteInfo
  name="Model Context Protocol has prompt injection security problems"
  desc="As more people start hacking around with implementations of MCP (the Model Context Protocol, a new standard for making tools available to LLM-powered systems) the security implications of tools built …"
  url="https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/"
  logo="https://simonwillison.net/favicon.ico"
  preview="https://static.simonwillison.net/static/2025/stolen-data-card.jpg"/>

The complete source code for this tutorial is on [GitHub (<VPIcon icon="iconfont icon-github"/>`balajeeasish/ai-workshop`)](https://github.com/balajeeasish/ai-workshop/tree/main/mcp-server).

<SiteInfo
  name="ai-workshop/mcp-server at main · balajeeasish/ai-workshop"
  desc="A collection of hands-on AI development tutorials and examples. Each tutorial includes complete working code, security considerations, and production-ready configurations. Covers MCP servers, React..."
  url="https://github.com/balajeeasish/ai-workshop/tree/main/mcp-server/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d36bfb8b8ef25569a175491f94fd6d3a3091e24a562161c1383e1517ceaefef1/balajeeasish/ai-workshop"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an MCP Server with Python, Docker, and Claude Code",
  "desc": "Every MCP tutorial I've found so far has followed the same basic script: build a server, point Claude Desktop at it, screenshot the chat window, done. This is fine if you want a demo. But it's not fin",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-mcp-server-with-python-docker-and-claude-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
