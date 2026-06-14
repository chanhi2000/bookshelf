---
lang: en-US
title: "How I Used Harness Engineering to Make Our Company AI-Native"
description: "Article(s) > How I Used Harness Engineering to Make Our Company AI-Native"
icon: iconfont icon-mcp
category:
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Used Harness Engineering to Make Our Company AI-Native"
    - property: og:description
      content: "How I Used Harness Engineering to Make Our Company AI-Native"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/harness-engineering-ai-native-company.html
prev: /ai/mcp/articles/README.md
date: 2026-07-16
isOriginal: false
author:
  - name: Tech With RJ
    url: https://freecodecamp.org/news/author/LeeRenJie/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0438e6d7-d727-480d-8517-a87c12350326.png
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

[[toc]]

---

<SiteInfo
  name="How I Used Harness Engineering to Make Our Company AI-Native"
  desc="Most companies say they want to ”adopt AI”. In practice this usually means a chatbot bolted onto a website. Meanwhile, engineers using AI coding tools hit the opposite wall. The AI writes code fast, b"
  url="https://freecodecamp.org/news/harness-engineering-ai-native-company"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0438e6d7-d727-480d-8517-a87c12350326.png"/>

Most companies say they want to "adopt AI". In practice this usually means a chatbot bolted onto a website.

Meanwhile, engineers using AI coding tools hit the opposite wall. The AI writes code fast, but nobody fully trusts the output, so someone reviews every line and the speed evaporates.

Both problems have the same root. The AI has no structure around it. No checks it must pass, and no access to the data your company actually runs on. Building that structure is a discipline called harness engineering, and it's what this article teaches you.

I'm a full-stack engineer who builds lending systems. Our documentation kept drifting away from the code, so I set out to fix it with Claude Code. What made it work in the end wasn't a smarter model like Fable or Opus. It was structure and guardrails.

In 30 days, I built V1 of an internal documentation platform where most of the code was written by the agent, kept safe by a set of automatic checks. Then I gave the platform a Model Context Protocol (MCP) server, so AI agents could read and write company docs with the same permissions as the person running them.

After rounds of improvement and tweaks, by day 50, the company adopted it. Requirement gathering, development work, and documentation all flow through the platform as one source of truth, in production, for a new project.

This article acts as the playbook, not a product tour. I won't go through all the features I built. I'll walk through the mindset and how it led to this outcome.

::: info What you'll find below:

- What harness engineering means, in plain terms
- The four gates that let an AI agent write most of a production system
- What an MCP server is and why it matters more than the chatbot
- Why "you can only improve what you track" is the core idea behind an AI-native company
- How to start with one process in your own company

:::

---

## What Harness Engineering Means

Here's the usual way people use an AI coding agent. You ask for code, it writes some, you read every line because you don't trust it, you fix what's wrong, repeat. The AI is fast, but your review is the bottleneck, so nothing actually got faster.

Harness engineering flips the job. Instead of reviewing every line, you build the environment the agent works in.

The term comes from OpenAI. In a post called [<VPIcon icon="iconfont icon-openai"/>Harness engineering](https://openai.com/index/harness-engineering/), their team describes a five-month experiment where Codex agents wrote roughly a million lines of a production product with no code written by hand.

They define the harness as "the full environment of scaffolding, constraints, and feedback loops" that surrounds an agent and lets it do stable work. In their setup that meant repository structure, CI configuration, formatting rules, project instructions, and tool integrations. The engineer's job shifts from writing the code to designing that environment.

Here's how that applied to us. OpenAI ran the idea with a team of engineers at a million-line scale. I ran it alone, on an internal tool, with four automatic checks, a rules file the agent reads at the start of every session, and a habit of proving each change by running the app and watching it. Same idea, budget version, and it held.

You stop trusting the AI. You start trusting the harness.

This changes what your job is. You spend your time designing checks, writing down rules, and reviewing the output at a higher level. The agent spends its time inside the fence you built.

And this is why one engineer suddenly matters a lot. An agent's speed is worthless when nobody trusts its output, and the harness is the thing that turns speed into output you can trust. Build a good harness and one person ships what used to take a team.

None of this needs permission from your company. My harness was made of things every engineer already knows. A type checker, a test runner, a coverage rule, and a text file with rules in it.

---

## Pointing It at a Real Problem

The problem I pointed all this at is one every company has. A spec or requirement gets written. Developers build from it. The code changes during review, again in testing, again in production support. Nobody goes back to update the spec, for whatever reason. Six months later the document describes a system that no longer exists.

Most places shrug at this. In regulated lending you don't get to. You need to know what's current, and you sometimes need to show what changed, on what date, and who changed it. A document that quietly stopped being true is a business risk.

So, the case study was an internal documentation platform with one design goal. Docs should tell you when they go stale, instead of waiting for a human to notice.

Every doc declares which code paths it describes. A small script in CI reports code changes to the platform, and any doc whose code moved after its last edit gets flagged as drifting. Add a sign-off workflow where the approval badge turns amber if the doc changes after approval, a health score per document, and a digest that tells owners what needs attention.

Fifty days, 300+ commits, and most of that code was written by Claude Code inside the harness. The plan was mine. We'd worked with a regular wiki for years, so I knew exactly what was missing and what to build. The agent wrote the code. The commits are not the point of the article. They're the evidence that the method works.

---

## The Four Gates

Every change the agent made had to pass four gates before it could land. None of them are exotic.

### Gate 1: The Type Checker

`tsc --noEmit` across the whole codebase. No change lands with a type error. This is the cheapest gate and it catches a surprising number of agent mistakes.

### Gate 2: 100% Test Coverage on the Logic

Every line, every branch, and every function of the core business logic must be covered by a test, or the build fails. That sounds extreme for a human team, and it is.

For an agent it's perfect, for two reasons. First, the rule is binary, so there's nothing to negotiate. An uncovered branch means a missing test, full stop. Second, the agent has no ego. It never argues that a test is unnecessary. It reads the coverage report like a to-do list and works through it.

### Gate 3: End-to-End Tests

A Playwright suite clicks through the real app the way a user would. Unit tests check the logic in isolation. This gate checks the parts users actually touch.

I've written before about [**testing with plain-English assertions**](/freecodecamp.org/how-i-tested-malaysia-s-open-data-portals-with-plain-english.md), and the same idea applies here. The e2e suite asserts what a user sees, not what the code intends.

### Gate 4: Verify by Running It

After every change, the agent starts the app and watches the behaviour it claims to have changed. This one sounds obvious and gets skipped everywhere. Green tests plus an unverified claim is how a broken change ships with full confidence. Tests confirm the logic. Running the app confirms the claim.

Two text files complete the harness. One is a rules file in the repo. It holds the architecture, the step-by-step recipe every feature follows, and a list of ideas I already rejected, with reasons. Every fresh agent session starts by reading it, so the agent stays consistent and stops re-proposing bad ideas.

The other is a habit. Every feature ships with a short usage page written by the agent, showing the feature working. Writing it forces the agent to actually use what it built. Cheapest integration test I know.

Notice what the harness doesn't include. There's no linter. Style is not what goes wrong in agent-written code. What goes wrong is a plausible-looking branch nobody exercised. Spend your gate budget on behaviour, not formatting.

---

## Where the Harness Failed

I want to be honest about the limits, because this is the part most AI articles skip.

The worst bug in the project passed every gate, and I found it by using the platform myself. I renamed a document, the slug got corrupted, and the page stopped loading.

Digging into the rename code showed something worse. The rename rebuilt the record from a partial payload, and any field missing from that payload quietly reset to its default. One of those fields controlled who could see the document. So a rename made a restricted document visible to everyone. Type-safe, fully covered, and wrong, because every test checked the fields the payload carried and no test checked the fields it left out.

Using my own product caught it, not a gate. That's the honest shape of harness engineering. Gates catch the failure types you thought to encode. Using the product and reviewing the output catch the rest. You need both. The harness doesn't remove your judgement from the loop. It spends your judgement where it matters instead of on every line.

---

## What an MCP Server Is and Why You Should Care

Everything up to here is about building software with AI. The second half of the story is about what your company does with AI, and this is where MCP comes in.

MCP (Model Context Protocol) is a standard way to give an AI agent access to a system. Think of it as a USB port for your company's tools. Any agent that speaks the protocol can plug into any system that exposes it to read data, take actions, and do work.

I gave the documentation platform an MCP server with 50+ tools. Search the docs, read a page, write a page, comment, check what's drifting, and so on. Any engineer at the company connects their AI agent to it and their agent now works with the company's knowledge base directly.

I got the security model wrong the first time, and the mistake is worth sharing because you might make it. Version one gave the agent direct, trusted access to the database. It was convenient, and broken in three ways: every agent action was anonymous, the agent could read documents its user had no right to see, and there was no way to revoke access.

The fix was to make the MCP server hold no credentials of its own. Each person mints a personal access token in their profile, and every agent action runs as that person, with their exact permissions. A junior's agent can read and comment. An editor's agent can write. Every action lands in the audit trail under the real person's name, and revoking the token cuts the agent off instantly.

The part I like most is how this plays with role-based access control. The token carries no permissions of its own, it only says who you are. Permissions are checked server-side against your current role on every call. So when a person's role changes, or a whole group's access gets tightened, nobody has to hunt down and revoke existing tokens. The agent might still show the same tools in its list, but the server blocks the call the moment the role behind the token no longer allows it.

Here's what that looks like in practice. This is a cut-down version of one tool from my server, using the official TypeScript SDK. The full server is the same pattern repeated 50 times.

```ts :collapsed-lines
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API = process.env.WIKI_API_URL;   // your existing HTTP API
const TOKEN = process.env.WIKI_TOKEN;   // the user's personal access token

const server = new McpServer({ name: "docs-wiki", version: "1.0.0" });

server.registerTool(
  "read_doc",
  {
    description: "Read one document by its slug",
    inputSchema: { slug: z.string() },
  },
  async ({ slug }) => {
    // The MCP server holds no credentials of its own.
    // It forwards the user's token, and the API checks
    // that user's current role on every single call.
    const res = await fetch(`${API}/docs/${slug}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (res.status === 403) {
      // Forbidden comes back as a clean tool error,
      // never a crash and never a silent success.
      return {
        content: [{ type: "text", text: "Error: Forbidden." }],
        isError: true,
      };
    }
    if (res.status === 404) {
      // A restricted doc the user can't see returns the same
      // response as a missing one, so its existence never leaks.
      return {
        content: [{ type: "text", text: `No document: ${slug}` }],
        isError: true,
      };
    }

    return { content: [{ type: "text", text: await res.text() }] };
  }
);

await server.connect(new StdioServerTransport());
```

Three things in this small file carry all the security weight. The server has no database access, so there's nothing to steal from it. The token travels with every request, so the API applies the real user's permissions and the audit trail gets a real name. And the two error branches make failure boring, a forbidden action reads as a plain error message, and a document the user can't see is indistinguishable from one that doesn't exist.

The rule underneath is simple: **give AI your permission model, not a back door.** That single design decision is why the company trusts agent-written documentation. Nothing the agent does is anonymous or outside what its human could do anyway.

And once agents could write docs safely, something changed. Documentation stopped being a chore after development and became part of it. An agent finishes a feature, writes the doc through the same MCP tools, and flags anything it isn't sure about with an inline `[!VERIFY]` marker. Anything touching rates or compliance gets an `[!SME]` marker that blocks approval until an expert signs off. The agent brings speed. The human keeps authority.

---

## You Can Only Improve What You Track

Here's the belief driving all of this. You can only improve what you track.

Our documentation didn't go stale because people were careless. It went stale because nothing measured staleness. The moment drift became a tracked number, like "this doc's code changed 3 times since its last edit", keeping docs current became a finite, visible job instead of a vague wish.

The same pattern showed up everywhere once I looked for it:

- Every question the AI assistant had no answer for gets logged. An assistant that [**knows when not to answer**](/freecodecamp.org/how-to-build-an-ai-support-agent-that-knows-when-not-to-answer-tickets.md) turns its own gaps into data. That list is literally a ranked backlog of what to write next, sorted by real demand.
- Health scores per document show which owner is overloaded and which corner of the knowledge base needs attention.
- The audit log keeps a tamper-evident history of every action. When we need proof of what changed, on what date, by who, it's one query instead of an archaeology dig, and the MCP can read it to compare versions.

None of this needed advanced AI. It needed the data to exist somewhere structured, instead of evaporating in chat messages and inboxes.

That's my working definition of an AI-native company. Not a company with a chatbot. A company whose processes leave trackable data behind, and whose tools are reachable by agents through something like MCP.

Once both are true, the AI does what AI is genuinely good at. It reads more data than any human has patience for, and it points at the patterns. Where work piles up. Which step everyone waits on. What keeps going stale. You stop guessing at bottlenecks and start reading them.

Your company already produces all of this data every day. The question is whether it lands somewhere an agent can read.

---

## How to Start in Your Own Company

You don't need a mandate. I didn't have one. Here's the sequence I'd repeat:

1. **Pick one process that annoys everyone.** Docs going stale, tickets triaged by hand, release notes nobody writes. Small and real beats big and strategic.
2. **Make its data trackable.** Structured, timestamped, with an owner. This step is boring and it's the one that matters. A spreadsheet is a fine start.
3. **Build the harness before the features.** Decide the checks a change must pass. Write the rules file. Then let the agent build fast inside it.
4. **Expose it over MCP with real permissions.** Personal tokens, actions attributed to real people, revocable. Never a shared back door.
5. **Ask the agent what it sees.** Once the data accumulates, ask where the bottleneck is, what's going stale, what gets asked but never answered. This is the payoff step.

Start low-risk. An internal tool is the perfect first target because your colleagues are forgiving users and the data stays in-house.

In a larger company, you won't get to skip the approval layers, so design for them instead of around them. Reuse the permission model your security team already trusts, keep every agent action attributed to a real person and revocable, and run the pilot inside one team's boundary. Those three properties answer most of the questions a review board will ask before it asks them.

Then let the tracked data make your case. A pilot that shows exactly what it caught, in numbers, is a stronger argument for the next approval than any slide deck.

---

## The Real Shift

Fifty days and one engineer changed how a whole company handles its knowledge. But the model didn't do that, and honestly, neither did I in the way it sounds. The harness did the trusting, the MCP did the connecting, and the tracked data did the convincing.

The shift worth copying isn't "use AI to write code faster." It's three habits:

- Build checks so you can mostly trust code you didn't write yourself.
- Give agents the same permissions as the person running them, never full access.
- Record what your processes do, because you can only improve what you track.

Pick the process that annoys everyone and build the first gate.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Used Harness Engineering to Make Our Company AI-Native",
  "desc": "Most companies say they want to ”adopt AI”. In practice this usually means a chatbot bolted onto a website. Meanwhile, engineers using AI coding tools hit the opposite wall. The AI writes code fast, b",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/harness-engineering-ai-native-company.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
