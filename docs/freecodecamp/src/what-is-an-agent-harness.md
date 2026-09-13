---
lang: en-US
title: "What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent"
description: "Article(s) > What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent"
icon: iconfont icon-claude
category:
  - Python
  - AI
  - LLM
  - Anthropic
  - Claude
  - DeepSeek
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
  - deepseek
  - deep-seek
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent"
    - property: og:description
      content: "What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-an-agent-harness.html
prev: /ai/claude/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c85a5e6e-104a-49a0-984d-e7c2dd141d22.png
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
  "title": "DeepSeek > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/deepseek/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent"
  desc="On August 13, 2026, DeepSeek published a GitHub repository called deepseek-harness. Within two days, it had passed 95,386 stars and 8,826 forks (a vanity metric on its own, but a spike this fast signa"
  url="https://freecodecamp.org/news/what-is-an-agent-harness"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c85a5e6e-104a-49a0-984d-e7c2dd141d22.png"/>

On August 13, 2026, DeepSeek published a GitHub repository called `deepseek-harness`. Within two days, it had passed 95,386 stars and 8,826 forks (a vanity metric on its own, but a spike this fast signals something more than luck). This is among the fastest growth curves a developer tool has posted on GitHub in 2026 ([<VPIcon icon="fas fa-globe"/>Flowtivity](https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/), [<VPIcon icon="iconfont icon-github"/>`deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness)).

Nine months earlier, a solo Austrian engineer named Mario Zechner shipped something close to the opposite: a coding agent called Pi with four built-in tools and almost nothing else. Pi took roughly a year of organic growth to cross 91,600 stars, without the launch spike. Just a slow, compounding climb from engineers who tried it and stayed ([<VPIcon icon="iconfont icon-github"/>`earendil-works/pi`](https://github.com/earendil-works/pi)).

So here we have two wildly different growth curves, with two wildly different design philosophies. And underneath both of them, we have the same word: harness.

If you build with AI agents in any capacity, that word is now unavoidable, and most explanations of it are either marketing copy or a diagram with too many arrows.

This article defines what an agent harness is, then compares ten of the most popular agent harnesses to date, from Claude Code to DeepSeek Harness to Pi, against the same five-part architecture.

By the end, you'll understand why the term replaced "framework" in developer conversation this year and how the loudest 2026 harnesses differ underneath their branding. You'll also have a 60-line Python harness to run yourself along with a breakdown of the stack layers around it (MCP, orchestration, observability), plus a decision guide for picking one for your team.

---

## What is an Agent Harness?

A harness is the runtime shell wrapped around an LLM model. The model itself only does one thing: given a stream of text and a list of available tools, it predicts what to say or which tool to call next. The harness handles everything else.

This unglamorous, boring plumbing includes the loop that calls the model, the code that executes tools, the memory that manages context over 40 turns, and the sandbox that protects your filesystem. It's the infrastructure that decides if an agent recovers from a failed tool call or just hangs.

![Figure 1: The five parts every agent harness has to implement, drawn as a loop around a model core. The model sits at the center and predicts only the next message or tool call. Around it: a tool router that dispatches calls to the filesystem, shell, or external APIs, a memory layer that decides what context survives into the next turn, a planning layer that breaks a large task into steps before execution starts, and a sandbox boundary that constrains what the tools are allowed to touch.<br/><br/>The loop arrow shows the model's output feeding back in as the next turn's input, which is what turns a single prediction into an agent that keeps working until the task is done.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/e67563c3-ed78-4856-a233-ab419d033438.png)

One practitioner definition captures the same shape from a different angle. A harness supplies everything a model doesn't do on its own: the loop that carries a goal from plan into action, access to tools like the terminal or file system, a memory layer that survives across turns, coordination for any subagents it spins up, and the permission rules that bound what it's allowed to touch ([<VPIcon icon="fas fa-globe"/>CellCog](https://cellcog.ai/blog/best-ai-agent-harnesses/)).

Concretely, when you type a request into Claude Code, Cursor, or Aider, here's what happens, in order:

1. The harness assembles a prompt: your request, the system instructions, and a list of tool schemas the model can call.
2. The model responds, usually with a mix of reasoning text and one or more tool calls (`read_file`, `run_bash`, `edit`, or whatever the harness exposes).
3. The harness executes each tool call, ideally inside a sandbox, and captures the output.
4. The harness appends the tool output back into the conversation and calls the model again.
5. The loop repeats, sometimes for dozens of turns, until the model produces a final answer, or until the harness hits a turn limit, a cost limit, or a human interrupts it.

That five-step loop, sometimes called the agent loop or the ReAct loop (after the 2022 paper that first described reasoning and acting as one interleaved process: [<VPIcon icon="iconfont icon-arxiv"/>Yao et al.](https://arxiv.org/html/2210.03629)), is the part every harness on the market shares.

What varies, and what determines whether a given harness is good at its job, is everything wrapped around step 3 and step 4: how good the planning is before execution starts, how the memory decides what to keep and what to drop as the context fills up, how isolated the sandbox is, and whether the harness can spin up a second, smaller version of itself to handle a sub-task without polluting the main conversation.

When any one of those four goes wrong, the symptoms look identical from the outside: the agent stalls, forgets what it was doing, or burns through your context window on a task that should take five turns.

---

## From Agent Frameworks to Agent Harnesses: What Changed

The word "framework" dominated agent conversation from 2023 through 2025: tools like LangChain, AutoGen, and CrewAI. Frameworks in that era were libraries. You imported components, chose your own model calls, and wrote the orchestration logic yourself. They gave you building blocks.

A harness is a different kind of product. It ships the loop already built, and that loop is opinionated about memory, planning, and safety. You then interact with it by running a command.

Anthropic's Claude Code made this shift undeniable through 2025: a terminal-native agent that plans, edits files, runs tests, and commits code without you writing any orchestration logic.

By 2026, the ship-the-loop pattern showed up across the ten harnesses profiled in the table below, from Claude Code to DeepSeek Harness to Cline, and "harness" became the word everyone started using to describe that shape, distinct from a framework you assemble yourself.

You can see it in the naming: DeepSeek's own repository is called `deepseek-harness`, echoing the same framework-to-harness shift that Claude Code introduced.

LangChain's [<VPIcon icon="iconfont icon-langchain"/>Deep Agents](https://langchain.com/blog/deep-agents) shows that the industry now treats "harness" as its own architectural layer, released as an attempt to reverse-engineer what made Claude Code's harness effective and rebuild it as an open, model-agnostic library.

LangChain's own account of the project traces it back to one question, in Harrison Chase's words: "What about Claude Code made it general purpose, and could we abstract out and generalize those characteristics?"

LangChain has an obvious incentive here too: it's pitching an alternative to the tool it's studying, and the four mechanisms it names still hold up regardless of who names them.

Deep Agents packages four specific mechanisms that Claude Code's harness relies on:

- **A planning tool** that forces the model to write out its steps before touching any files. This cuts down on the model quietly drifting off task over a long session.
- **A virtual filesystem and sandbox** that gives the agent structured, isolated read and write access to a repository.
- **Subagent delegation**, where the main agent spins up a smaller agent with its own clean context window to handle an isolated piece of work, then reports back a summary.
- **Context and memory management**, including middleware that compresses conversation history and offloads large tool outputs so a long session doesn't blow through the model's context window ([LangChain](https://docs.langchain.com/oss/python/deepagents/context-engineering)).

That list is worth memorizing because those four mechanisms (planning, sandboxing, delegation, and context management) are the engineering problems every serious harness has to solve, whether or not Deep Agents remains the harness people point to. Everything else is branding.

---

## The Agent Harness Solutions at a Glance

The table below covers the harnesses pulling the most developer attention as of August 2026 and what each one bets its architecture on.

| Harness | Built by | Optimized for | Notable fact |
| --- | --- | --- | --- |
| Claude Code | Anthropic | End-to-end coding sessions: plan, edit, test, commit | Popularized the planning-tool-plus-subagent pattern that competitors now copy |
| DeepSeek Harness (`dsh`) | DeepSeek AI | Total runtime modularity | Passed 95,000 GitHub stars in 2 days. Every component, models, tools, sandboxes, UI, is a swappable plugin ([GitHub (<VPIcon icon="iconfont icon-github"/>`deepseek-ai/deepseek-harness`)](https://github.com/deepseek-ai/deepseek-harness)). |
| Deep Agents | LangChain | Model-agnostic reproduction of Claude Code's harness patterns | Ships as an open-source library plus a CLI, and works with any tool-calling model ([<VPIcon icon="iconfont icon-langchain"/>LangChain](https://langchain.com/deep-agents)) |
| Hermes Agent | Nous Research | A persistent, self-improving assistant that lives across channels | Reaches platforms including Telegram, Slack, Discord, WhatsApp, and email from one process, with a growing public hub of shareable skills ([Nous <VPIcon icon="fas fa-globe"/>Research](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills), [GitHub (<VPIcon icon="iconfont icon-github"/>`nousresearch/hermes-agent`)](https://github.com/nousresearch/hermes-agent)) |
| Pi | Mario Zechner / Earendil Inc. | Radical minimalism: four built-in tools, everything else is an opt-in TypeScript extension | Over 91,600 GitHub stars from organic, non-launch growth ([GitHub (<VPIcon icon="iconfont icon-github"/>`earendil-works/pi`)](https://github.com/earendil-works/pi)) |
| Oh-My-Pi (`omp`) | Can Bölük | A maximalist fork of Pi that bakes in an IDE: LSP diagnostics, a debugger via DAP, persistent execution kernels | Rewrote Pi's engine in Rust. Ships 60-plus model providers and 31 built-in tools ([GitHub (<VPIcon icon="iconfont icon-github"/>`can1357/oh-my-pi`)](https://github.com/can1357/oh-my-pi)). |
| CellCog | CellCog | A general-purpose super-agent harness pointed at knowledge work broadly | Ranked #1 on DeepResearch Bench as of August 2026 (score 55.78), with native video, image, and document output built into the same engine ([<VPIcon icon="fas fa-globe"/>CellCog](https://cellcog.ai/benchmarks)) |
| OpenHands | All Hands AI | An open, dockerized autonomous software engineer with bash, browser, and test execution built in | Formerly named OpenDevin. Docker is the default sandbox, isolating each session's shell commands and file writes from the host ([<VPIcon icon="fas fa-globe"/>OpenHands Docs](https://docs.openhands.dev/openhands/usage/sandboxes/docker)). |
| Aider | Paul Gauthier and contributors | Git-native pair programming, where every agent step is a clean, reviewable commit | Long-running favorite for engineers who want a tight diff-review loop |
| Cline | Cline Bot Inc. and contributors | A model-agnostic, approval-gated VS Code extension | Every file edit and command pauses for your sign-off before it runs, by default |

A few of these are coding-specific, and a few (such as CellCog and Hermes Agent especially) are trying to generalize the harness pattern past code and into broader knowledge work.

A harness built for coding can assume a repository, a test suite, and a diff as its unit of work. A harness built for general knowledge work has to invent an equivalent structure for research, writing, and multi-step business tasks, which is a harder, less standardized problem.

If you're evaluating a harness for anything beyond code, ask first: what's its unit of work, and did anyone build the equivalent of a diff for it, or just assume one exists?

---

## Three Competing Philosophies for How a Harness Should Work

Strip away the marketing, and three different engineering bets sit underneath the 2026 agent harness boom.

![Figure 2: Three bets on how to build a harness, shown as three parallel columns. Column one, DeepSeek Harness, centers on a plugin kernel where models, sandboxes, memory, and the UI are all interchangeable modules.<br/><br/>Column two, Claude Code and Deep Agents, centers on four fixed mechanisms: planning, virtual filesystem, subagents, and context compression.<br/><br/>Column three, Hermes Agent, centers on a compounding skill library that grows every time the agent solves something new. The three columns share only the base loop from Figure 1. Everything above that loop is a different bet on what makes an agent reliable over long sessions.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/a76d962c-a6e6-48bc-baf5-9901ffbf24ff.png)

### Bet One: Everything is a Plugin.

DeepSeek Harness is built on a meta-framework called Cordis, whose design is described in DeepSeek's own paper "A Programming Paradigm for Spatiotemporal Composability," which boils down to one idea: everything can be swapped at runtime ([<VPIcon icon="iconfont icon-github"/>`deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness)).

In practice, that means the model, sandbox, session storage, scheduling loop, and even the UI theme are all swappable modules. The harness also ships a "creator mode" for inspecting the running system, testing Cordis plugins in memory, and combining them into new configurations ([<VPIcon icon="iconfont icon-deepseek"/>DeepSeek](https://deepseek.com/harness/en/)).

The bet here: no single architecture wins forever, so the winning move is to make architecture itself a configuration file.

### Bet Two: a Small, Fixed Set of Mechanisms, Executed Well.

Claude Code and, following it, LangChain's Deep Agents bet the opposite way: pick four mechanisms (planning, sandboxed filesystem access, subagent delegation, and context compression) and invest in making each one reliable.

Every mechanism on this list is familiar enough that rivals borrow it wholesale: the table above credits Claude Code with popularizing the planning-plus-subagent pattern other harnesses now copy. The bet works because all four run together on every task. Skip one, and the others cover for it, for a while, until a long session finds the gap.

### Bet Three: Memory That Compounds.

Hermes Agent bets that the biggest unsolved problem is what happens between sessions. Most harnesses reset to a blank context on every new conversation. Hermes instead offers to save the approach as a reusable skill when it solves something non-trivial. It then checks that skill library before reasoning from scratch on a similar future request so it can get faster at recurring tasks the longer you use it ([<VPIcon icon="fas fa-globe"/>Nous Research](https://hermes-agent.nousresearch.com/docs/guides/work-with-skills)).

That's an advantage, as well as a risk: a skill library that grows unchecked can turn into debt that outlives the reason it was written. Paired with native scheduling and channel integrations across platforms like Telegram, Slack, and Discord, the design goal is closer to a standing assistant that lives on a server than a tool you open for one session and close.

A fourth bet sits underneath all three: Pi and Oh-My-Pi argue that most of what the other harnesses build in is unnecessary weight, and that four tools plus an extension system beat a feature-complete platform for engineers who know what they want.

Pi's climb past 91,600 GitHub stars, driven by organic word of mouth rather than a launch campaign, suggests that bet has staying power.

All four bets are defensible. They optimize against different failure modes: DeepSeek Harness optimizes against architectural lock-in, Claude Code and Deep Agents optimize against unreliable long-session behavior, Hermes optimizes against repeated work across sessions, and Pi optimizes against bloat.

So before you pick one, ask which failure mode costs you time today. The answer will help you choose the correct agent harness.

---

## Build a Minimal Harness in Under 60 Lines of Python

The example below builds the five-step loop from Figure 1 with Anthropic's Messages API: a model, three tools, and a loop that keeps calling the model until it stops asking for tool calls. You'll see every failure mode this section talks about waiting inside these 60 lines.

```py :collapsed-lines
import subprocess
from anthropic import Anthropic

client = Anthropic()

TOOLS = [
    {
        "name": "read_file",
        "description": "Read a UTF-8 text file from the working directory.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string"}},
            "required": ["path"],
        },
    },
    {
        "name": "write_file",
        "description": "Write content to a file, overwriting it if it exists.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "content": {"type": "string"},
            },
            "required": ["path", "content"],
        },
    },
    {
        "name": "run_bash",
        "description": "Run a shell command inside the sandbox directory and return its output.",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string"}},
            "required": ["command"],
        },
    },
]

def execute_tool(name, tool_input):
    if name == "read_file":
        return open(tool_input["path"]).read()
    if name == "write_file":
        with open(tool_input["path"], "w") as f:
            f.write(tool_input["content"])
        return f"wrote {len(tool_input['content'])} bytes to {tool_input['path']}"
    if name == "run_bash":
        result = subprocess.run(
            tool_input["command"],
            shell=True,
            cwd="./sandbox",
            capture_output=True,
            text=True,
            timeout=30,
        )
        return result.stdout + result.stderr
    raise ValueError(f"unknown tool: {name}")

def run_harness(task, max_turns=15):
    messages = [{"role": "user", "content": task}]

    for _ in range(max_turns):
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            tools=TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason != "tool_use":
            return response.content[0].text

        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                output = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                })
        messages.append({"role": "user", "content": tool_results})

    return "stopped: hit max_turns without a final answer"
```

Run `run_harness("Write a Python script in sandbox/hello.py that prints the first 10 Fibonacci numbers, then run it and show me the output.")` and watch the turns unfold: the model writes the file, calls `run_bash` to execute it, reads the output, and only then produces a final text answer. Every production harness in the tables above is a more engineered version of this same shape.

Claude Code adds a planning step before turn one and a permission gate before every `run_bash` equivalent. Deep Agents adds a virtual filesystem, plus a middleware layer that compresses `messages` before it grows past the model's context window. DeepSeek Harness makes the `TOOLS` list and the model client themselves swappable at runtime.

The gap between this toy loop and a serious one sits entirely in reliability engineering: what happens when a tool call fails, what happens at turn 50, and what stops the sandbox from touching anything outside `./sandbox`.

Nothing in `execute_tool` catches a malformed response or a tool that errors out, so a single bad tool call can loop the model back onto the same broken result turn after turn. Add a retry path yourself, or the harness keeps doing this by default.

Two things in this example deserve a closer look. First, `cwd="./sandbox"` is a load-bearing safety boundary: without it, `run_bash` can execute anything the host user can, which is why every serious harness runs tool execution inside a container or a restricted directory. It's an easy line to delete by accident during a refactor, and a dangerous one to lose.

Second, `max_turns=15` exists because nothing here tells the model to stop on its own. If you skip it, a harness with no turn limit and no cost limit will keep looping and keep spending tokens for as long as the model keeps asking for tools. If you forget that line during a refactor, the failure looks identical from the outside: a job that never returns, and a token bill that keeps climbing until someone kills the process by hand.

---

## The Agent Harness Solution Stack

A harness doesn't run alone. Three adjacent layers show up in almost every production agent deployment, and knowing where each one starts and stops keeps you from asking a harness to solve a problem that belongs one layer over. Skip that mapping, and you'll spend a week debugging the harness for a bug that lives in the sandbox instead.

![Figure 3: Four horizontal layers, stacked bottom to top. The bottom layer, the protocol layer, is the Model Context Protocol (MCP). This is the shared standard that lets any harness talk to any external tool or data source the same way. The second layer up is the harness itself, the loop from Figure 1.<br/><br/>The third layer, orchestration frameworks, sits above single-agent harnesses and coordinates multiple agents or long-running stateful workflows: LangGraph, CrewAI, AG2, Mastra, and DSPy live here.<br/><br/>The top layer, drawn as two side panels rather than a fourth horizontal band, is observability and sandboxing: tools like Langfuse and LangSmith watch all the layers below them, and E2B and Modal provide the isolated execution environment the harness's sandbox runs inside.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/479cef87-0b7f-41d4-99ee-61dd22250a07.png)

### The Protocol Layer: MCP

The Model Context Protocol is an open standard, originally introduced by Anthropic in November 2024, for connecting a model to external tools, files, and data sources in one consistent way ([<VPIcon icon="iconfont icon-claude"/>Anthropic](https://anthropic.com/news/model-context-protocol)). By late 2025, it had moved to the Agentic AI Foundation under the Linux Foundation, backed by Anthropic, OpenAI, and Block ([<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/Model_Context_Protocol)).

A harness typically loads its tool list from an MCP config, not from code you write by hand:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/project"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
```

Every MCP server you add here becomes available as tools inside `TOOLS`, without you writing a single new `execute_tool` branch. Write the integration once, and any MCP-compatible harness like Claude Code, Deep Agents, DeepSeek Harness, or one you build yourself can use it. That's the entire argument for the protocol layer in one sentence.

### The Orchestration Layer

A harness runs one agent through a single loop. The moment you need multiple agents cooperating on a stateful, long-running workflow with dedicated roles like a planner, researcher, and reviewer, you enter orchestration framework territory. Choosing the wrong framework here will cost you months instead of a few lines of code.

1. LangGraph, which models a multi-agent workflow as a graph with checkpointing and time-travel debugging, and is widely used for stateful production workflows at regulated companies ([GitHub (<VPIcon icon="iconfont icon-github"/>`langchain-ai/langgraph`)](https://github.com/langchain-ai/langgraph))
2. CrewAI, built around defining agents by role and letting them collaborate on a shared task
3. AG2, the community-maintained successor to Microsoft's original AutoGen project, which moved in 2026 to an async, event-driven runtime built around composable middleware ([GitHub (<VPIcon icon="iconfont icon-github"/>`ag2ai/ag2`)](https://github.com/ag2ai/ag2), [<VPIcon icon="fas fa-globe"/>pickaxe.co](https://pickaxe.co/post/top-ai-agent-frameworks))
4. Mastra, a TypeScript-first agent framework that crossed 22,000 GitHub stars and 300,000 weekly npm downloads after reaching version 1.0 in January 2026 ([<VPIcon icon="fas fa-globe"/>pickaxe.co](https://pickaxe.co/post/top-ai-agent-frameworks), [GitHub (<VPIcon icon="iconfont icon-github"/>`mastra-ai/mastra`)](https://github.com/mastra-ai/mastra))
5. DSPy from Stanford NLP, which treats prompt engineering as something closer to compilation than hand-authorship, optimizing prompts against a metric ([GitHub (<VPIcon icon="iconfont icon-github"/>`stanfordnlp/dspy`)](https://github.com/stanfordnlp/dspy))

### Observability and Sandboxing

Once an agent makes tool calls on its own, you need to see what it did and where it did it, to avoid debugging blindly. Langfuse and LangSmith trace every model call, tool call, and token cost across a session, which is how you debug a harness that failed on turn 34 ([GitHub (<VPIcon icon="iconfont icon-github"/>`langfuse/langfuse`)](https://github.com/langfuse/langfuse), [LangChain](https://langchain.com/langsmith)).

Braintrust and Arize Phoenix add rigorous evaluation on top of that tracing, so you can regression-test a harness's behavior the same way you'd test a codebase ([<VPIcon icon="fas fa-globe"/>Braintrust](https://braintrust.dev/), [<VPIcon icon="iconfont icon-github"/>`Arize-ai/phoenix`](https://github.com/Arize-ai/phoenix)). And for the sandbox itself, the isolated environment where `run_bash`-style tool calls execute, E2B and Modal provide disposable micro-VMs that let a harness run untrusted code without touching the host machine ([GitHub (<VPIcon icon="iconfont icon-github"/>`e2b-dev/E2B`)](https://github.com/e2b-dev/E2B), [<VPIcon icon="fas fa-globe"/>Modal](https://modal.com/docs/guide/sandboxes)).

---

## Why the Hype Curve and the Adoption Curve Diverge

![Figure 4: Two GitHub star growth curves plotted on the same axes over roughly 400 days. The DeepSeek Harness curve is nearly vertical: flat at zero, then a near-instant spike to 95,000-plus stars within the first two days after its August 13, 2026 launch, then flattening out.<br/><br/>The Pi curve is the opposite shape: a shallow, steady, almost straight-line climb from its August 2025 release to over 91,600 stars a year later, with no single spike anywhere on the line. Both curves end up in roughly the same place.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/20e7acef-93e5-4548-aafc-84d7d34e3f36.png)

The point of putting these two curves on one chart is that the shape getting there is different for each: one curve reflects a coordinated launch and a well-timed announcement. The other reflects a year of engineers individually deciding, one at a time, that the tool was worth keeping installed.

A launch spike tells you a project generated attention. Sustained use tells you whether the tool is still open in a terminal six months later, and those are different questions with different causes.

DeepSeek Harness's 95,000 stars in two days is a verifiable number ([<VPIcon icon="fas fa-globe"/>Flowtivity](https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/)), but it's also driven largely by timing, distribution, and a well-known model lab's existing audience.

Pi's climb to a similar star count carries a different kind of signal: nobody coordinated a launch for it a year in. It accumulated through word of mouth among engineers who tried a four-tool coding agent, kept using it, and told other engineers.

A tool picked off a launch-week spike can look just as capable on day one and still leave a team stranded three months later if the maintainers move on to the next announcement. Neither number outweighs the other, but if you're choosing a harness to bet a team's workflow on, research the curve's shape, not just its current height.

A steep spike with a flattening tail tells you a project has an active community forming, worth watching before you commit production workflows to it. A long, shallow, unbroken climb tells you engineers kept it installed after the excitement wore off, which is a stronger, if slower, signal.

---

## How to Choose a Harness for Your Team

Match the harness to the failure mode in front of you, not whatever's trending this week. Picking based on stars instead of your bottleneck is the mistake that costs a team weeks of migration work later.

- You need one agent finishing one coding task reliably, end to end: Start with Claude Code, Deep Agents, or Aider if you want the tightest, most reviewable diff-per-commit loop you can get. All three implement the planning-plus-sandbox pattern from Figure 1 well.
- You're worried about vendor or architecture lock-in and expect to swap models frequently: DeepSeek Harness's plugin-everything design and Deep Agents' model-agnosticism both directly target this concern. A harness that hardcodes one provider's SDK into its core is the wrong choice here, regardless of how capable that provider's model is today.
- The same categories of tasks keep recurring across weeks or months, and you want the agent to get faster at them over time by building on what it knows: Hermes Agent's compounding skill library is built specifically for this pattern, especially if you also want it reachable from the chat platforms your team lives in.
- You want the smallest possible audit surface area, and you are comfortable writing your own extensions for anything missing: Pi's four-tool core, or Oh-My-Pi if you specifically want IDE-grade tooling, LSP diagnostics, and a debugger, layered on top of that same minimal foundation.
- You need several agents coordinating on a long-running, stateful process: That question sits a layer above the harness. Move up to LangGraph, CrewAI, AG2, or Mastra.

Whichever you pick, treat the observability layer as non-optional from day one. A harness that fails on turn 30 of an unattended run is a debugging nightmare without a trace. The same failure with Langfuse or LangSmith attached turns into a five-minute fix. Skip this step to save an afternoon of setup, and you'll pay for it the first time an agent fails mid-run, and nobody can say why.

---

## What Transfers No Matter Which Harness Wins

The specific tool names in this article will likely look dated within a year, because the category is moving this fast. What will stay useful is the five-step loop in Figure 1, the four mechanisms LangChain identified inside Claude Code's architecture, and the layered stack in Figure 3. Read any new harness that shows up next month against those three references, and you'll know within an hour whether it's doing something structurally new or repackaging the same loop under a different plugin system and a louder launch post.

That's the skill worth keeping: reading architecture instead of reading marketing, the one thing this category can't make obsolete no matter how fast the tool names turn over.

---

## Conclusion

An agent harness isn't a mysterious new category of software. It's the runtime shell that turns a model's next-token prediction into an agent that plans, acts, checks its own work, and keeps going until a task is finished.

Harnesses are built from five parts that show up in every implementation: a loop, a tool router, memory, planning, and a sandbox boundary. What changed in 2026 is scale.

Enough teams shipped competing implementations that the architectural differences between them became worth studying. The landscape now ranges from DeepSeek's plugin-everything kernel and Pi's radical minimalism to Hermes Agent's compounding skills and the four fixed mechanisms of Claude Code and Deep Agents.

The numbers from the last section back this up: 95,000 stars in two days and 91,600 stars in a year prove two different routes reach the same conclusion.

Build the 60-line version yourself. Watch it loop. After you do, every harness on the market stops looking like magic and starts looking like an engineering decision you can evaluate on its merits.

::: info What to Explore Next

<SiteInfo
  name="deepseek-ai/deepseek-harness"
  desc="DeepSeek Harness: Everything is a Plugin."
  url="https://github.com/deepseek-ai/deepseek-harness/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1333065091/05ca062c-0277-415c-90b5-f43277f73436"/>

> read the README for the Cordis plugin architecture in the project's own words.

<SiteInfo
  name="Context engineering in Deep Agents - Docs by LangChain"
  desc="Control what context your deep agent has access to and how it is managed across long-running tasks"
  url="https://docs.langchain.com/oss/python/deepagents/context-engineering/"
  logo="https://docs.langchain.com/mintlify-assets/_mintlify/favicons/langchain-5e9cc07a/YSQua9Gt91yRswvJ/_generated/favicon-dark/favicon.ico"
  preview="https://langchain-5e9cc07a.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DContext%2Bmanagement%26title%3DContext%2Bengineering%2Bin%2BDeep%2BAgents%26description%3DControl%2Bwhat%2Bcontext%2Byour%2Bdeep%2Bagent%2Bhas%2Baccess%2Bto%2Band%2Bhow%2Bit%2Bis%2Bmanaged%2Bacross%2Blong-running%2Btasks%26theme%3Dbf3bf8de8061f170aa09f116&w=1200&q=100"/>

> how the automatic compression and offloading middleware referenced above works under the hood.

<SiteInfo
  name="modelcontextprotocol/modelcontextprotocol"
  desc="Specification and documentation for the Model Context Protocol"
  url="https://github.com/modelcontextprotocol/modelcontextprotocol/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9d24784f0a3b81378744d0fb944e0dbcf65ca33ff1421e80569c127d306e15d6/modelcontextprotocol/modelcontextprotocol"/>

> the protocol layer every harness in this piece can plug into.

<SiteInfo
  name="Skills System | Hermes Agent"
  desc="On-demand knowledge documents — progressive disclosure, agent-managed skills, and the Skills Hub"
  url="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/"
  logo="https://hermes-agent.nousresearch.com/docs/img/favicon.ico"
  preview="https://hermes-agent.nousresearch.com/docs/img/hermes-agent-banner.png"/>

> how a compounding skill library gets written and reused.

<SiteInfo
  name="langchain-ai/langgraph"
  desc="Build resilient agents."
  url="https://github.com/langchain-ai/langgraph/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/676672661/b8343a50-7115-4759-ac4b-9466e1c64b85"/>

> the next layer up once one agent stops being enough.

<SiteInfo
  name="e2b-dev/E2B"
  desc="Open-source, secure environment with real-world tools for enterprise-grade agents."
  url="https://github.com/e2b-dev/E2B/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/609539715/8ee2285e-5f8b-42ff-8347-43338e175a77"/>

> a concrete starting point for sandboxing tool execution off your host machine.

::: info About Author

Visit my [GitHub (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul`)](https://github.com/RudrenduPaul) to explore the 30+ open-source software solutions and developer tools I built and shared using this agentic AI-native engineering process.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Is an Agent Harness? The Architecture Behind Claude Code, DeepSeek Harness, and Hermes Agent",
  "desc": "On August 13, 2026, DeepSeek published a GitHub repository called deepseek-harness. Within two days, it had passed 95,386 stars and 8,826 forks (a vanity metric on its own, but a spike this fast signa",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-an-agent-harness.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
