---
lang: en-US
title: "How to Stop Letting AI Agents Guess Your Requirements"
description: "Article(s) > How to Stop Letting AI Agents Guess Your Requirements"
icon: iconfont icon-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Stop Letting AI Agents Guess Your Requirements"
    - property: og:description
      content: "How to Stop Letting AI Agents Guess Your Requirements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-letting-ai-agents-guess-your-requirements.html
prev: /ai/claude/articles/README.md
date: 2026-03-24
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/06a3ff85-4d60-4e05-b494-8d2f3e6024ac.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Stop Letting AI Agents Guess Your Requirements"
  desc="I spent 64% of my weekly Claude budget before Wednesday building a tool designed to reduce Claude usage. That's the kind of irony that deserves its own specification. The tool is spec-writer: a Claude"
  url="https://freecodecamp.org/news/how-to-stop-letting-ai-agents-guess-your-requirements"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/06a3ff85-4d60-4e05-b494-8d2f3e6024ac.png"/>

I spent 64% of my weekly Claude budget before Wednesday building a tool designed to reduce Claude usage. That's the kind of irony that deserves its own specification.

The tool is spec-writer: a Claude Code skill that takes a vague feature request and generates a structured spec, technical plan, and task breakdown before a single line of code gets written.

The problem it solves is one most developers hit within their first week of using AI coding agents seriously: the agent writes confidently in the wrong direction and you pay for it twice, once in tokens, once in rewrites.

This tutorial shows you how to install spec-writer, how to invoke it on a real feature, and how to read the output so you can catch the assumptions that would have wasted your time.

---

## The Problem with Prompting Agents Directly

Here is what happens when you skip the spec.

You have a feature in your head: "Add a way for users to export their data." You open Claude Code and describe it. The agent produces code. It looks right. You run it. It's mostly right – except it exports everything including soft-deleted records, it doesn't paginate, it times out on large accounts, and it has no authentication check on the export endpoint.

None of those things were in your prompt. The agent guessed, and it guessed plausibly – which is worse than guessing obviously wrong. You didn't notice until testing.

This is the fundamental problem with prompting agents directly on anything non-trivial: your prompt carries your conscious requirements, but every feature has a shadow of requirements you didn't think to state. And the agent fills that shadow with assumptions.

Most of the time, those assumptions are reasonable. Some of the time, they're wrong in ways that take hours to unravel.

The failure mode isn't hallucination. It's the agent being exactly as helpful as the prompt allowed, which wasn't helpful enough.

Spec-Driven Development addresses this directly. The methodology – documented extensively by practitioners like Julián Deangelis – argues that a written spec isn't documentation overhead. It's the mechanism that forces you to make decisions before the agent does.

---

## What Spec-Driven Development Is

Spec-Driven Development is the practice of writing a structured specification before you write code or prompt an agent. The spec defines what the feature must do, what assumptions are being made, and what tasks the implementation breaks into.

The key insight is what a spec is *for*. A spec is not trying to replace code. It's trying to surface the decisions that would otherwise be invisible. The agent will make those decisions either way: with a spec, you make them first. Without a spec, you discover them during testing.

The strongest counterargument to SDD comes from Gabriella Gonzalez: *a sufficiently detailed spec is just code*. She's right that some specs devolve into pseudocode so specific they might as well be implementations.

But that's a spec written at the wrong level of abstraction. The goal is to name the decisions, not to pre-implement them. "Only authenticated users can trigger this export" is a decision. "Call `verifyJWT(token)` and return 401 if it fails" is implementation. The spec needs the first. The agent handles the second.

SDD has three levels:

1. **Spec-First**: write a spec before every feature and hand it to the agent as context. This is the entry point and the workflow this tutorial focuses on.
2. **Spec-Anchored**: the spec lives in the repository and evolves alongside the code. When requirements change, you update the spec and re-prompt the agent to realign.
3. **Spec-as-Source**: the spec is the primary artifact. Code is generated from it and considered disposable. This is the most ambitious level and the direction many teams are moving toward.

spec-writer gets you to Spec-First immediately, with no ceremony.

---

## How spec-writer Works

spec-writer is a Claude Code skill – a markdown file that loads into the agent's context and changes how it responds when invoked.

The skill follows one rule: generate first, flag assumptions inline. Instead of asking you clarifying questions before producing output, it generates the full spec immediately and marks every decision it made without your explicit input using `[ASSUMPTION: ...]` tags. Then you correct what's wrong.

This is faster than Q&A because it makes the decisions visible in a form you can react to rather than anticipate.

The output has three sections in fixed order:

1. **SPEC**: the what. One-line purpose, user stories, requirements, edge cases, and acceptance criteria in Given/When/Then format.
2. **PLAN**: the how. Stack and architecture decisions, data model changes, API contracts, testing strategy, and security constraints.
3. **TASKS**: the breakdown. Ordered, self-contained tasks each completable in a single agent session, each with its own acceptance criteria.

After the three sections, the skill produces an **Assumptions summary**: every `[ASSUMPTION: ...]` from the output, ranked by impact. This is the part you review before handing anything to the agent.

The skill is compatible with [GitHub Spec Kit (<VPIcon icon="iconfont icon-github"/>`github/spec-kit`)](https://github.com/github/spec-kit) and [OpenSpec (<VPIcon icon="iconfont icon-github"/>`Fission-AI/OpenSpec`)](https://github.com/Fission-AI/OpenSpec). If you use either framework, save the spec output to your <VPIcon icon="fas fa-folder-open"/>`.specify/` or <VPIcon icon="fas fa-folder-open"/>`openspec/changes/` directory and continue from there.

---

## How to Install spec-writer

spec-writer uses the Agent Skills standard, which means the same <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file works across Claude Code, Cursor, GitHub Copilot, Gemini CLI, and any other agent that supports the standard. You install it once and it works everywhere.

### Installation

Create the skills directory if it doesn't exist and clone the repo:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
mkdir -p ~/.claude/skills
git clone https://github.com/dannwaneri/spec-writer.git ~/.claude/skills/spec-writer
```

@tab <VPIcon icon="fa-brands fa-windows"/>

**Note:** PowerShell uses backtick (`` ` ``) for line continuation, not backslash.

```powershell
New-Item -ItemType Directory -Force -Path "$HOME.claude\skills"
git clone https://github.com/dannwaneri/spec-writer.git "$HOME.claude\skills\spec-writer"
```

:::

That's the entire installation. No package to install, no configuration file to edit, no API key. The skill is a markdown file. The agent reads it.

### Verification

Open Claude Code and type:

```plaintext
/spec-writer test
```

If the skill is installed correctly, the agent will read the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` and produce a spec structure – even for "test" as input. You'll see the three sections and the Assumptions summary. If nothing happens, confirm that the `~/.claude/skills/spec-writer/`<VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file exists.

---

## How to Write Your First Spec

The invocation pattern is:

```plaintext
/spec-writer [your feature description]
```

The description can be as rough as you'd write in a Slack message. The skill's job is to structure it. You don't need to be precise. Being precise is what the spec is for.

### A Real Example

Here is a real invocation from the Foundation project, a federated knowledge base built on Cloudflare Workers:

```plaintext
/spec-writer Add CLI capture for Claude Code sessions stored in ~/.claude/projects/
```

That's twelve words. No mention of the tech stack, no data model details, no authentication requirements, no error handling spec. All of that comes out in the spec.

Here is the abbreviated output:

**SPEC**

**One-line purpose:** Developers can capture Claude Code session logs from their local filesystem into Foundation before they are deleted after 30 days.

**Users and use cases:**

- As a developer using Claude Code daily, I want my coding sessions captured automatically so that architectural decisions and debugging patterns don't disappear after 30 days.
- As a Foundation user, I want CLI sessions and browser extension captures in the same knowledge base so that I have one place to query across all my AI interactions.

**Acceptance criteria:**

```plaintext
Given a developer with Claude Code sessions in ~/.claude/projects/
When they run the Foundation CLI capture command
Then a list of uncaptured sessions is displayed, sorted by most recent first
 
Given a session already in Foundation
When the developer runs capture again
Then that session does not appear in the review list
 
Given a malformed .jsonl file
When the capture command processes it
Then an error is logged for that file and processing continues on remaining sessions
```

**PLAN**

**Stack and architecture:**

```plaintext
CLI capture runs locally — it needs to read the local filesystem, which
Cloudflare Workers cannot do. [ASSUMPTION: CLI capture is a local Node.js
or Bun script that calls the Foundation API to insert sessions, rather
than a Worker itself]
```

**API contracts:**

- `POST /api/sessions/import` – accepts parsed session JSON, returns session ID
- Returns 409 if session already exists
- Triggers evaluator pipeline after successful insert

**TASKS**

```plaintext
---

## Task 1: .jsonl parser
 
**What to build:** A parser that reads a Claude Code .jsonl session file
and outputs Foundation's internal message format.
**Files likely affected:** cli/src/parsers/claudeCode.js (create)
**Acceptance criteria:**
1. Parses a valid .jsonl file into the correct message format
2. Handles malformed lines without crashing — logs and skips
3. Returns empty array for empty file
**Dependencies:** none
```

**Assumptions to review:**

```plaintext
1. CLI capture is a local script calling the Foundation API, not a Worker
   Impact: HIGH
   Correct this if: you want a purely serverless approach
 
2. Manual curation before capture, not automatic bulk import
   Impact: HIGH
   Correct this if: you want automatic background capture
 
3. Session ID from .jsonl filename is the deduplication key
   Impact: MEDIUM
   Correct this if: session IDs are stored differently in your schema
 
4. No sensitive data scrubbing in v1
   Impact: MEDIUM
   Correct this if: your sessions contain credentials or keys
```

Twelve words in, four decisions surfaced immediately – three of which had real architectural implications.

The third assumption ("Session ID from .jsonl filename is the deduplication key") is the one that would have caused the most subtle bug. The agent would have implemented deduplication based on the filename and it would have worked until a session was renamed. The spec caught it before a line of code was written.

---

## How to Read the Output

The output is designed to be scanned for `[ASSUMPTION: ...]` tags first, read for the tasks second.

### Reading the Assumptions

Every `[ASSUMPTION: ...]` tag marks a place where the agent filled in something you didn't specify. Your job is to go through the Assumptions summary and decide for each one:

- **Correct**: the assumption is right, leave it
- **Override**: the assumption is wrong, restate it and re-run the spec
- **Defer**: the assumption doesn't matter for this iteration, mark it and move on

The impact rating tells you which assumptions to fix before you start coding. HIGH-impact assumptions affect architecture or data model. If they're wrong, fixing them requires rework. LOW-impact assumptions affect behavior details that are easy to change later.

### Reading the Acceptance Criteria

The acceptance criteria in Given/When/Then format are the most useful part of the spec for catching scope errors. Read each one and ask: is this actually what I want?

Criteria are binary by design. "Returns 401 when unauthenticated" is a criterion. "Works correctly" is not. If you find yourself reading a criterion and thinking "well, it depends", then that's a signal that the criterion is hiding an assumption. Restate it.

### Reading the Tasks

The tasks are ordered and self-contained. Each task produces a verifiable change. Before you hand any task to an agent, check two things:

1. Does the task have all the context it needs? If a task says "follow the existing auth pattern" and you haven't pointed the agent at your auth code, it will guess.
2. Does the acceptance criteria match what you'd actually test? If the criteria are vague, tighten them before the agent sees the task.

---

## How to Hand the Spec to Your Agent

The spec is context, not a prompt. When you start an agent session for a task, include the relevant spec sections alongside the task description.

For Task 1 from the example above, your agent session might open like this:

```plaintext
Context:
- This is a federated knowledge base built on Cloudflare Workers, D1, and Vectorize
- Sessions are stored in ~/.claude/projects/ as .jsonl files
- The API runs at https://<your-worker>.workers.dev
 
Spec:
[paste the SPEC and PLAN sections]
 
Task:
[paste Task 1]
```

The context block is just an example. Replace it with your own project's tech stack, file locations, and API URL. The point is to give the agent the same context a new team member would need on day one.

The agent now has requirements, architecture context, and a single scoped task with binary acceptance criteria. It cannot guess the deduplication key incorrectly because the spec already resolved that assumption. It cannot skip error handling because the acceptance criteria explicitly require it.

This is the workflow the spec is designed for. The spec doesn't replace the agent. Rather, it removes the decisions from the agent's hands and puts them in yours, before the work starts.

### Saving the Spec for Later

If you want to move toward Spec-Anchored development – where the spec lives in the repository – save the output to a <VPIcon icon="fas fa-folder-open"/>`specs/` directory in your project:

```sh
# Create specs directory
mkdir -p specs
 
# Save your spec
# Paste the output into specs/cli-capture.md
```

When requirements change, update the spec and re-prompt the agent to realign the implementation. The spec becomes the source of truth, not the code comments.

---

## Where to Go Next

Try it on your next feature before you write a line of code. The assumptions it flags will tell you something about your feature you hadn't consciously decided yet – and correcting the HIGH-impact ones before you hand anything to an agent is the whole point. Skipping that step is the same as prompting directly.

If your project is growing, move toward Spec-Anchored. Save specs in your repository under <VPIcon icon="fas fa-folder-open"/>`specs/`. When a new contributor joins or an agent starts a session cold, the specs give them the decisions that got made without requiring them to reverse-engineer the code.

The strongest ongoing challenge to this workflow is Gabriella Gonzalez's argument that detailed specs become code. If your specs are getting implementation-specific, you've crossed a line. Pull back to decisions – "only authenticated users can trigger this" – and leave implementation to the agent. The spec's job is to name what the agent would have guessed wrong, not to write the feature in prose.

The Agent Skills standard now works across Claude Code, GitHub Copilot, Cursor, and Gemini CLI. The spec-writer repo is at [github.com/dannwaneri/spec-writer (<VPIcon icon="iconfont icon-github"/>`dannwaneri/spec-writer`)](https://github.com/dannwaneri/spec-writer).

The irony of spending 64% of a Claude budget building a token-efficiency tool is real. But the spec surfaced four decisions on a twelve-word prompt. The fourth one – the deduplication key assumption – would have produced a bug that worked perfectly until a session got renamed.

That's not a hallucination. That's the agent being exactly as helpful as the prompt allowed.

The spec is how you raise the ceiling on what "helpful" means.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Stop Letting AI Agents Guess Your Requirements",
  "desc": "I spent 64% of my weekly Claude budget before Wednesday building a tool designed to reduce Claude usage. That's the kind of irony that deserves its own specification. The tool is spec-writer: a Claude",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-letting-ai-agents-guess-your-requirements.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
 