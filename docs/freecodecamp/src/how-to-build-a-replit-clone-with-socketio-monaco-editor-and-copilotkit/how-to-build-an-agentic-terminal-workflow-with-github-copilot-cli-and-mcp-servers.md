---
lang: en-US
title: "How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers"
description: "Article(s) > How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers"
icon: iconfont icon-copilot
category:
  - Node.js
  - DevOps
  - Github
  - Github Copilot
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
  - devops
  - github
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers"
    - property: og:description
      content: "How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-agentic-terminal-workflow-with-github-copilot-cli-and-mcp-servers.html
prev: /ai/github-copilot/articles/README.md
date: 2026-04-29
isOriginal: false
author:
  - name: Caleb Mintoumba
    url: https://freecodecamp.org/news/author/phoekerson/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3e4e3d7e-6cbf-4742-a63b-f9a2579f2318.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github Copilot > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/github-copilot/articles/README.md",
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
  name="How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers"
  desc="Most developers live in their terminal. You run commands, debug pipelines, manage infrastructure, and navigate codebases, all from a shell prompt. But despite how central the terminal is to developer "
  url="https://freecodecamp.org/news/how-to-build-an-agentic-terminal-workflow-with-github-copilot-cli-and-mcp-servers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3e4e3d7e-6cbf-4742-a63b-f9a2579f2318.png"/>

Most developers live in their terminal. You run commands, debug pipelines, manage infrastructure, and navigate codebases, all from a shell prompt.

But despite how central the terminal is to developer workflows, AI assistance there has remained shallow: autocomplete a command here, explain an error there.

That changes when you combine GitHub Copilot CLI with MCP (Model Context Protocol) servers. Instead of an AI that reacts to isolated prompts, you get a terminal that understands your project context, queries live data sources, and chains tool calls autonomously – what the industry is starting to call an agentic workflow.

In this tutorial, you'll learn exactly how to wire these two systems together, step by step. By the end, your terminal will be able to do things like understand your Git history before suggesting a fix, query your running Docker containers before writing a compose patch, or pull live API schemas before generating a request.

::: note Prerequisites

Before you start, make sure you have the following:

- **Node.js** v18 or later (`node --version`)
- **npm** v9 or later
- A GitHub account with Copilot enabled. The free tier (available to all GitHub users) is sufficient to follow this tutorial. Pro, Business, and Enterprise plans unlock higher usage limits but aren't required.
- **GitHub CLI** (`gh`) installed. We'll use it to authenticate.
- Basic familiarity with the terminal and JSON configuration files
- (Optional) **Docker** installed if you want to follow the Docker MCP example in Step 5

:::

You don't need prior experience with MCP or agentic AI systems, as this guide builds that understanding from the ground up.

---

## What is GitHub Copilot CLI?

GitHub Copilot CLI is the terminal-native interface to GitHub's Copilot AI. Unlike the IDE plugin (which assists with code completion), Copilot CLI is designed specifically for shell workflows. It exposes three main commands:

- `gh copilot suggest` proposes a shell command based on a natural language description
- `gh copilot explain` explains what a given command does
- `gh copilot alias` generates shell aliases for Copilot subcommands

Here's a quick example of `suggest` in action:

```sh
gh copilot suggest "find all files modified in the last 24 hours and larger than 1MB"
```

Copilot will return something like:

```sh
find . -mtime -1 -size +1M
```

It will also ask if you want to copy it, run it directly, or revise the request. This interactive loop is already useful – but by itself, Copilot CLI has no awareness of your project context. It doesn't know your repo structure, your running services, or your deployment environment. That's where MCP comes in.

---

## What is the Model Context Protocol?

The **Model Context Protocol (MCP)** is an open standard introduced by Anthropic in late 2024. Its goal is straightforward: give AI models a standardized way to connect to external tools, data sources, and services.

Think of MCP as a universal adapter layer between an AI model and the real world. Without MCP, each AI integration is custom-built: one plugin for GitHub, another for Postgres, another for Slack, all with incompatible interfaces. MCP defines a single protocol that any tool can implement, and any compatible AI client can consume.

An MCP server exposes **tools** (functions the AI can call), **resources** (data the AI can read), and **prompts** (reusable instruction templates). The AI client in our case, a Copilot-powered terminal discovers these capabilities at runtime and uses them autonomously to complete a task.

A few notable MCP servers that are already production-ready:

| MCP Server | What it exposes |
| --- | --- |
| `@modelcontextprotocol/server-filesystem` | Read/write access to local files |
| `@modelcontextprotocol/server-git` | Git log, diff, blame, branch operations |
| `@modelcontextprotocol/server-github` | GitHub Issues, PRs, repos via API |
| `@modelcontextprotocol/server-postgres` | Live query execution on a Postgres DB |
| `@modelcontextprotocol/server-docker` | Container inspection, logs, stats |

The full registry lives at `github.com/modelcontextprotocol/servers`.

---

## How MCP Servers Work in a Terminal Context

Before we get hands-on, it's worth understanding the communication model.

MCP servers run as local processes. They communicate with the AI client over **stdio** (standard input/output) or over an **HTTP/SSE transport**. The client sends JSON-RPC messages to the server, and the server responds with structured data.

Here's the simplified flow:

![An architectural flowchart illustrating the Model Context Protocol (MCP) workflow. The process starts with a user typing a natural language prompt, passes through the Copilot CLI (the MCP client), communicates via JSON-RPC over stdio with an MCP Server (e.g., server-git), executes real tools like git log, returns a structured result to Copilot, which finally synthesizes a context-aware response for the user.](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/e1844dc5-a869-4201-ad8a-fd1cb305f646.png)

The key word here is **grounded**. Without MCP, Copilot responds based purely on its training data and your prompt. With MCP, it can call `git log --oneline -20` before answering your question about recent regressions and its answer is based on *your actual code history*, not a generalized assumption.

### Step 1 – Install and Configure GitHub Copilot CLI

If you haven't already, install the GitHub CLI:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install gh
```

@tab <VPIcon icon="fa-brands fa-windows"/>

via winget

```sh
# Windows ()
winget install --id GitHub.cli
```

@tab <VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="fa-brands fa-debian"/>

```sh
sudo apt install gh
```

:::

Then authenticate:

```sh
gh auth login
```

Follow the interactive prompts. Select **GitHub.com**, then **HTTPS**, and authenticate via browser when prompted.

Now install the Copilot CLI extension:

```sh
gh extension install github/gh-copilot
```

Verify the installation:

```sh
gh copilot --version
```

You should see output like `gh-copilot version 1.x.x`.

:::: note

**Optional but recommended: set up shell aliases.** This makes the workflow much faster. For `bash` or `zsh`:

```sh
# Add to your ~/.bashrc or ~/.zshrc
eval "$(gh copilot alias -- bash)"   # for bash
eval "$(gh copilot alias -- zsh)"    # for zsh
```

:::

After reloading your shell (`source ~/.bashrc`), you can use `ghcs` as shorthand for `gh copilot suggest` and `ghce` for `gh copilot explain`.

### Step 2 – Set Up Your First MCP Server

We'll start with `server-git`. It's the most immediately useful for a development workflow and has zero external dependencies.

Install it globally via npm:

```sh
npm i -g @modelcontextprotocol/server-git
```

Test that it runs:

```sh
mcp-server-git --version
```

This server exposes the following tools to any compatible MCP client:

- `git_log` retrieve commit history with filters
- `git_diff` diff between branches or commits
- `git_status` current working tree status
- `git_show` inspect a specific commit
- `git_blame` annotate file lines with commit info
- `git_branch` list or switch branches

Now create a configuration file. MCP clients look for a file called <VPIcon icon="iconfont icon-json"/>`mcp.json` to discover available servers. Create it in your project root or in a global config directory:

```sh
mkdir -p ~/.config/mcp
touch ~/.config/mcp/mcp.json
```

Add the following content:

```json title=".config/mcp/mcp.json"
{
  "mcpServers": {
    "git": {
      "command": "mcp-server-git",
      "args": ["--repository", "."],
      "transport": "stdio"
    }
  }
}
```

A few notes on this config:

- `command` is the binary to run. Make sure it's on your `$PATH`.
- `args` passes `--repository .` so the server scopes itself to the current working directory.
- `transport: "stdio"` means communication happens over standard input/output the simplest and most stable option for local servers.

### Step 3 – Wire Copilot CLI to Your MCP Server

This is where the two systems connect. GitHub Copilot CLI supports MCP via its `--mcp-config` flag (available from version 1.3+). You point it at your <VPIcon icon="iconfont icon-json"/>`mcp.json`, and Copilot will automatically initialize the declared servers before processing your prompt.

Here's the basic invocation:

```sh
gh copilot suggest --mcp-config ~/.config/mcp/mcp.json "why did the build break in the last commit?"
```

When you run this inside a Git repository, Copilot CLI will:

1. Start the `mcp-server-git` process
2. Call `git_log` to retrieve recent commits
3. Call `git_diff` on the most recent commit
4. Synthesize an answer based on the actual diff output

Try it yourself on a repo with a recent failing commit. The difference in response quality compared to a plain `gh copilot suggest` is immediately obvious.

**Tip: avoid retyping the flag every time.** Add a shell function to your <VPIcon icon="iconfont icon-shell"/>`.bashrc`/<VPIcon icon="iconfont icon-shell"/>`.zshrc`:

```sh
function aterm() {
  gh copilot suggest --mcp-config ~/.config/mcp/mcp.json "$@"
}
```

Now you just type:

```sh
aterm "what changed between main and feature/auth?"
```

And you're running a fully context-aware, MCP-powered query from a single short command. This function name `aterm` for *agentic terminal* is what we'll use throughout the rest of this tutorial.

### Step 4 – Build a Real Agentic Workflow

Let's move beyond individual queries and build a workflow that chains multiple tool calls to complete a real developer task: **diagnosing a regression**.

Imagine you pushed a feature branch and your CI pipeline failed. You don't know exactly which change caused it. Here's how your agentic terminal handles it:

#### Query 1: understand what changed

```sh
aterm "summarize all commits on feature/auth that aren't on main yet"
```

Copilot calls `git_log` with branch filters, then returns a structured summary of commits unique to your branch. No copy-pasting SHAs manually.

#### Query 2: isolate the diff

```sh
aterm "show me everything that changed in the auth middleware between main and feature/auth"
```

This triggers `git_diff` scoped to the path containing your middleware. Copilot returns the diff with an explanation of what each change does.

#### Query 3: find the likely culprit

```sh
aterm "which of those changes could cause a JWT validation failure?"
```

At this point, Copilot has the diff in its context window from the previous tool calls. It reasons over the actual code changes not generic knowledge about JWT and pinpoints the likely issue.

#### Query 4: generate the fix

```sh
aterm "write the corrected version of that validation function"
```

Copilot generates a targeted fix based on the specific code it retrieved via MCP. You get a patch you can directly apply, not a generic code template.

This four-step sequence – understand, isolate, reason, fix – is a complete agentic loop. Each step is grounded in live repository data retrieved through MCP tools. The AI is not hallucinating context. Instead, it's reading your actual codebase.

### Step 5 – Extend with Multiple MCP Servers

One MCP server is useful. Multiple MCP servers working together is where the workflow becomes genuinely powerful. Let's add two more: `server-filesystem` and `server-docker`.

Install the additional servers:

```sh
npm i -g @modelcontextprotocol/server-filesystem
npm i -g @modelcontextprotocol/server-docker
```

Update your <VPIcon icon="iconfont icon-json"/>`mcp.json`:

```json title=".config/mcp/mcp.json"
{
  "mcpServers": {
    "git": {
      "command": "mcp-server-git",
      "args": ["--repository", "."],
      "transport": "stdio"
    },
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["--root", "."],
      "transport": "stdio"
    },
    "docker": {
      "command": "mcp-server-docker",
      "transport": "stdio"
    }
  }
}
```

With all three servers active, your terminal can now answer cross-domain questions:

```sh
aterm "my Express app container keeps restarting, check the logs and compare with what the healthcheck in my Dockerfile expects"
```

To answer this, Copilot will:

1. Call `docker_logs` (server-docker) to pull the container's recent stderr output
2. Call `read_file` (server-filesystem) to read your `Dockerfile`
3. Parse the `HEALTHCHECK` instruction
4. Cross-reference the log errors with the health endpoint path
5. Return a diagnosis explaining the mismatch and suggest the fix

This is an **agentic workflow**: the model autonomously decides which tools to call, in what order, and synthesizes the results into a coherent answer. You didn't tell it to read the Dockerfile. It inferred that was necessary based on your question.

::: note A note on security

When running `server-filesystem`, always scope it to a specific directory using `--root`. Never point it at `/` or your home directory. Similarly, `server-docker` has access to your Docker socket run it only in trusted environments.

:::

---

## Debugging Common Issues

```plaintext
mcp-server-git: command not found
```

The npm global bin directory isn't on your `$PATH`. Fix:

```sh
export PATH="\(PATH:\)(npm bin -g)"
# or for newer npm versions:
export PATH="\(PATH:\)(npm prefix -g)/bin"
```

Add this line to your <VPIcon icon="iconfont icon-shell"/>`.bashrc`/<VPIcon icon="iconfont icon-shell"/>`.zshrc` to persist it.

#### Copilot CLI doesn't seem to be using MCP tools

Check your Copilot CLI version:

```sh
gh copilot --version
```

MCP support requires version 1.3 or later. Update with:

```sh
gh extension upgrade copilot
```

Also verify your <VPIcon icon="iconfont icon-json"/>`mcp.json` is valid JSON a trailing comma or missing bracket will silently prevent server initialization.

#### MCP server starts but returns no data

Run the server manually to check for errors:

```sh
mcp-server-git --repository .
```

If it exits immediately, check that you're running the command inside a valid Git repository. For `server-docker`, make sure the Docker daemon is running and your user has access to the Docker socket:

```sh
sudo usermod -aG docker $USER
# Then log out and back in
```

#### Responses are slow with multiple servers

Each MCP server is a separate subprocess. Spawning several at once adds startup latency, especially on slower machines. Two optimizations:

1. Only declare the servers you actually need for a given project in your <VPIcon icon="iconfont icon-json"/>`mcp.json`
2. Use project-specific config files instead of one global config:

```sh
# project A (backend)
aterm --mcp-config ./mcp-backend.json "..."

# project B (infra)
aterm --mcp-config ./mcp-infra.json "..."
```

---

## Conclusion

You've just built an agentic terminal workflow from scratch. Here's a quick recap of what you did:

- Installed and configured GitHub Copilot CLI with shell aliases for fast access
- Set up MCP servers (`server-git`, `server-filesystem`, `server-docker`) and wired them through a <VPIcon icon="iconfont icon-json"/>`mcp.json` config
- Created a shell function (`aterm`) that transparently passes your MCP config to every Copilot query
- Built a multi-step agentic loop for diagnosing regressions using live Git data
- Extended the setup with cross-domain tool orchestration across Git, filesystem, and Docker

The architecture you've built here is not a demo – it's a production-ready pattern. You can extend it with any MCP-compatible server: `server-postgres` for database-aware queries, `server-github` for issue and PR context, or custom MCP servers you write yourself for your internal APIs.

The terminal has always been the most powerful surface in a developer's environment. With Copilot CLI and MCP, it's finally becoming an intelligent one.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Agentic Terminal Workflow with GitHub Copilot CLI and MCP Servers",
  "desc": "Most developers live in their terminal. You run commands, debug pipelines, manage infrastructure, and navigate codebases, all from a shell prompt. But despite how central the terminal is to developer ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-agentic-terminal-workflow-with-github-copilot-cli-and-mcp-servers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
