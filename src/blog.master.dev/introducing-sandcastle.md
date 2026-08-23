---
lang: en-US
title: "Introducing Sandcastle"
description: "Article(s) > Introducing Sandcastle"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
  - AI
  - LLM
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing Sandcastle"
    - property: og:description
      content: "Introducing Sandcastle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/introducing-sandcastle.html
prev: /programming/js-node/articles/README.md
date: 2026-08-24
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10787
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
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Introducing Sandcastle"
  desc=""
  url="https://blog.master.dev/blog.master.dev/introducing-sandcastle/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10787"/>

This is a post about [<VPIcon icon="iconfont icon-github"/>`mattpocock/sandcastle`](https://github.com/mattpocock/sandcastle), an AI Agent Orchestration tool. What is AI orchestration? The short answer is that it’s the process of getting multiple agents to work on things at the same time. If you’re wondering why you need a tool for that, well, read on.

---

## Why do I need a tool to run multiple agents?

Let’s say you have 4 issues that can be implemented simultaneously. You might wonder why you can’t just spin up 4 different terminals, start Claude in each, write your prompts, and hit enter. That would work, sort of. But think about your version control system. At the end of the day, git works off your file system. Any changes you make to files are immediately reflected as unstaged. Yes, any or all of those agents can create branches, but you can only have one branch checked out at any given time. Basically, those agents will all be stepping on each other.

That said, there’s a git feature that predates AI by a generation and is designed to solve this very problem: workstrees. Worktrees have existed in git for over 10 years, but I’ll be honest, I’d never even heard of them before AI. Back when we were writing our code manually, life was simple: check out a branch, do work, commit, and push. Then potentially switch to a different branch. Rinse and repeat. You have one working directory, which has one branch open at any given time.

### What are Git Worktrees?

Worktrees allow you to have multiple working directories of your repo checked out on disk at any given time. Each of these separate working directories can have its own branch checked out.

This is obviously a fantastic solution for orchestrating AI agents to work on things in parallel.

But if you think this is the part of the post where I get into the git commands necessary to use Worktrees, things have already evolved past that. There are tools that happily and elegantly manage these things for you, and this is a post about one of them:

<SiteInfo
  name="mattpocock/sandcastle"
  desc="Orchestrate sandboxed coding agents in TypeScript with sandcastle.run()"
  url="https://github.com/mattpocock/sandcastle/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1184397362/dbf1df0a-59d0-4ab1-91d4-3e7e0e7eba10"/>

---

## Setting Expectations

If you’re imagining a high-level tool that will magically do amazing things for you out of the box, please understand that this is a low-level primitive. It performs some low-level tasks extremely well, allowing you to put together your own workflow for your own project as needed.

And with that, let’s get started.

---

## Installation

::: info

Here are the Sandcastle docs.

<SiteInfo
  name="mattpocock/sandcastle"
  desc="Orchestrate sandboxed coding agents in TypeScript with sandcastle.run()"
  url="https://github.com/mattpocock/sandcastle/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1184397362/dbf1df0a-59d0-4ab1-91d4-3e7e0e7eba10"/>

:::

Install it into your project.

```sh
npm install --save-dev @ai-hero/sandcastle
```

Then run this to kick off the setup:

```sh
npx @ai-hero/sandcastle init
```

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-00-sandcastle-setup.jpg?resize=742%2C646&ssl=1)

If you let it, it’ll set up the default Docker image. This is the image Sandcastle will use to run your agents (if you select the Docker sandbox) to ensure isolation from each other.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-00-sandcastle-setup-done.jpg?resize=833%2C1024&ssl=1)

---

## Looking Around

Let’s see what was created for us. You should see a <VPIcon icon="fas fa-folder-open"/>`.sandcastle` folder, inside of which there should be a <VPIcon icon="iconfont icon-dotenv"/>`.env.example` file. Mine looks like this.

```sh title=".env.example"
# Claude Code OAuth token — get one by running `claude setup-token` on your host.
# Lets the agent use your Claude subscription instead of an API key.
CLAUDE_CODE_OAUTH_TOKEN=
# Or use an Anthropic API key instead — uncomment and fill in:
# ANTHROPIC_API_KEY=
# GitHub personal access token — the agent uses it to read and manage GitHub Issues
# Create a fine-grained token: https://github.com/settings/personal-access-tokens/new
# Required repository permissions: Issues (Read and write) and Metadata (Read)
GH_TOKEN=
```

Rename it to <VPIcon icon="iconfont icon-dotenv"/>`.env`, and then let’s get it filled out. It needs a Claude Code token, and a GitHub token; the latter is needed for things like creating GitHub issues, and pull requests.

The instructions for the Claude token are self-explanatory and listed right there: just run `claude setup-token` in a terminal (*not* a Claude session).

For the GitHub token, head to the [new Personal Access Token (<VPIcon icon="iconfont icon-github"/>`settings/personal-access-tokens`)](https://github.com/settings/personal-access-tokens/new) page.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-01-gh-token.jpg?resize=1024%2C772&ssl=1)

Give your token a name, expiration, etc. And for permissions, make **sure** you select what’s below, at a minimum.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-02-gh-token-permissions.jpg?resize=1024%2C969&ssl=1)

Make sure contents, pull requests, and issues all have read/write permissions.

---

## Hello World

The simplest possible way to run Sandcastle is via the sample `main.ts` file that was scaffolded. It looks like this by default.

```ts
import { run, claudeCode } from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

// Blank template: customize this to build your own orchestration.
// Run this with: npx tsx .sandcastle/main.ts
// Or add to package.json scripts: "sandcastle": "npx tsx .sandcastle/main.ts"

await run({
  agent: claudeCode("claude-opus-4-6"),
  sandbox: docker(),
  promptFile: "./.sandcastle/prompt.md",
});
```

Here’s the <VPIcon icon="fa-brands fa-markdown"/>`prompt.md` file that was generated

```md title="prompt.md"
# Context

<!-- Use !`command` to pull in dynamic context. Commands run inside the sandbox. -->
<!-- Example: !`git log --oneline -10` or !`gh issue list --state open --label Sandcastle --limit 100 --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` -->

# Task

<!-- Describe what the agent should do. -->

# Done

<!-- When the task is complete, output <promise>COMPLETE</promise> to signal early termination. -->
```

To get things working, I’ll put this into the `Task` section

```md
Add a new `add.ts` file that exports a single function called `add` that takes two numbers, and returns their sum.
```

And now I can run this command:

```sh
npx tsx .sandcastle/main
```

Which will hopefully log something like this:

```plaintext
 ---->npx tsx .sandcastle/main
[Agent] Started on branch temp
  tail -f .sandcastle/logs/temp.log
```

Along with a new <VPIcon icon="iconfont icon-typescript"/>`add.ts` file, and something like this inside:

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

---

## Building Something Useful

Being able to type a prompt into a Markdown file and run it with a `tsx` command is useless on its own; you can just type the prompt directly into Claude Code (or whatever harness you like).

But being able to run a prompt with a single line of TypeScript is an incredibly valuable primitive we can build cool workflows on. If we can run a single prompt with a single function call, then we can easily run multiple prompts in parallel, and with Sandcastle handling worktree creation, we won’t have to worry about file conflicts. In fact, using the Docker Sandbox option will provide even further isolation, beyond just git working directories.

Let’s build a script that sniffs out all open GitHub issues, lets the user choose which ones to execute, and, for the chosen ones, spins off parallel agents.

---

## Grabbing Our GitHub Issues

Getting the GitHub issues is easy; there’s a CLI for that.

```sh
gh issue list \
--state open \
--limit 100 \
--json number,title,body,labels,blockedBy
```

The command above will produce something like this:

```json :collapsed-lines
[
  {
    "blockedBy": {
      "nodes": [
        {
          "id": "I_kwDOTwhgQM8AAAABL7tDgA",
          "number": 7,
          "state": "OPEN",
          "title": "Two-column board UI for tickets",
          "url": "https://github.com/arackaf/render-atl-ai-sandbox/issues/7"
        }
      ],
      "totalCount": 1
    },
    "body": "## What to build\n\nWire up drag-and-drop on the ticket board so users can move cards between the \"To Do\" and \"Done\" columns to update a ticket's status.\n\n- Install `@dnd-kit/core` (no `@dnd-kit/sortable` — no within-column reordering)\n- Cards are draggable between columns\n- Dropping a card in a new column calls a new `updateTicketStatus` server function that accepts `{ id, status }` (narrow contract)\n- Optimistic update via TanStack Query mutation — card moves immediately on drop\n- On success: invalidate the tickets query (background refetch)\n- On failure: silent revert (no error UI for now)\n\n## Acceptance criteria\n\n- [ ] `@dnd-kit/core` is installed\n- [ ] Cards can be dragged between \"To Do\" and \"Done\" columns\n- [ ] Drop triggers `updateTicketStatus` server function with `{ id, status }`\n- [ ] `updateTicketStatus` updates the issue's status in the database\n- [ ] UI updates optimistically on drop\n- [ ] Tickets query is invalidated on successful mutation\n- [ ] Failed mutations silently revert the card to its original column\n\n## Blocked by\n\n- #7 — Two-column board UI for tickets",
    "labels": [
      {
        "id": "LA_kwDOTwhgQM8AAAACvX0ewQ",
        "name": "ready-for-agent",
        "description": "Fully specified, ready for an AFK agent",
        "color": "0E8A16"
      }
    ],
    "number": 8,
    "title": "Drag-and-drop status updates"
  },
  {
    "blockedBy": {
      "nodes": [
        {
          "id": "I_kwDOTwhgQM8AAAABL7tBhg",
          "number": 6,
          "state": "OPEN",
          "title": "Server functions and loader for tickets and epics",
          "url": "https://github.com/arackaf/render-atl-ai-sandbox/issues/6"
        }
      ],
      "totalCount": 1
    },
    "body": "## What to build\n\nThe index page renders a two-column Kanban-style board with columns for \"To Do\" and \"Done\". Ticket data comes from the route loader.\n\n- Two side-by-side columns, each with a header (\"To Do\" / \"Done\")\n- Tickets are split by their `status` field\n- Each card shows only the ticket title\n- No epic badges, no grouping, no special mobile layout\n- Styled with Tailwind CSS\n\n## Acceptance criteria\n\n- [ ] Index page displays two side-by-side columns labelled \"To Do\" and \"Done\"\n- [ ] Tickets are split into the correct column based on `status`\n- [ ] Each card displays only the ticket title\n- [ ] Styled with Tailwind utility classes\n\n## Blocked by\n\n- #6 — Server functions and loader for tickets and epics",
    "labels": [
      {
        "id": "LA_kwDOTwhgQM8AAAACvX0ewQ",
        "name": "ready-for-agent",
        "description": "Fully specified, ready for an AFK agent",
        "color": "0E8A16"
      }
    ],
    "number": 7,
    "title": "Two-column board UI for tickets"
  }
  // and so on
]
```

---

## Writing Our Script

AI wrote this script for me, but I’ll show you the highlights and then the full script at the end. This is just what I thought would be useful; you can put these primitives together however you’d like.

We can execute that GitHub CLI command from Node.

```js
const output = execFileSync("gh", ["issue", "list", "--state", "open", "--limit", "100", "--json", "number,title,body,blockedBy"], {
  encoding: "utf8",
});
```

We probably want to filter for issues that are *not* blocked by other open issues.

```js
const availableIssues = issues.filter(issue => !issue.blockedBy?.nodes?.some(blocker => blocker.state === "OPEN"));
```

To build a decent UI in our terminal, we can use [the <VPIcon icon="fa-brands fa-npm"/>`@inquirer/prompts` library](https://npmjs.com/package/@inquirer/prompts).

```js
import { checkbox } from "@inquirer/prompts";
```

The library has a nice CLI prompt UI, so we can write something like this:

```js
const selectedIssueIds = await checkbox({
  message: "Select issues to implement:",
  choices: availableIssues.map(issue => ({
    name: issue.title,
    value: issue.number,
  })),
});
```

Then we can fire off our agents using the same `run` method we saw before.

```js
Promise.all(
  selectedIssueIds.map(async issueId => {
    run({
      agent: claudeCode("claude-opus-4-6"),
      sandbox: docker(),
      prompt: `Implement gh issue ${issueId}. Commit your changes and push to origin. Open a PR.`,
      branchStrategy: {
        type: "branch",
        branch: `agent/gh-issue-${issueId}`,
        baseBranch: "main",
      },
      logging: {
        type: "stdout",
        verbose: false,
      },
    })
      .then(resp => `${sep}\n\nIssue ${issueId} completed:\n\n${resp}\n\n${sep}\n\n`)
      .catch(error => `${sep}\n\nIssue ${issueId} failed: ${error}\n\n${sep}\n\n`);
  }),
).then(() => {
  console.log("All issues completed");
});
```

But with some additional instructions on branching and creating pull requests.

When we run this script, it looks like this.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-03-ticket-select.jpg?resize=756%2C186&ssl=1)

We can select tickets.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-03-ticket-select-2.jpg?resize=764%2C182&ssl=1)

Then fire it off.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-04-running.jpg?resize=1024%2C856&ssl=1)

When it’s done, we should see pull requests created.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/img-05-prs.jpg?resize=1018%2C426&ssl=1)

---

## The Whole Script

Here’s the entire script. Remember, this should be (at most) your starting point, for crafting a workflow tailored to your own needs.

```ts :collapsed-lines
import { run, claudeCode } from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

import { execFileSync } from "node:child_process";
import { checkbox } from "@inquirer/prompts";

type Issue = {
  number: number;
  title: string;
  body: string;
  blockedBy: {
    nodes: {
      number: number;
      title: string;
      state: string;
    }[];
  };
};

const output = execFileSync("gh", ["issue", "list", "--state", "open", "--limit", "100", "--json", "number,title,body,blockedBy"], {
  encoding: "utf8",
});

const issues: Issue[] = JSON.parse(output);

const availableIssues = issues.filter(issue => !issue.blockedBy?.nodes?.some(blocker => blocker.state === "OPEN"));

const selectedIssueIds = await checkbox({
  message: "Select issues to implement:",
  choices: availableIssues.map(issue => ({
    name: issue.title,
    value: issue.number,
  })),
});

const sep = "------------------------------------";

Promise.all(
  selectedIssueIds.map(async issueId => {
    run({
      agent: claudeCode("claude-opus-4-6"),
      sandbox: docker(),
      prompt: `Implement gh issue ${issueId}. Commit your changes and push to origin. Open a PR.`,
      branchStrategy: {
        type: "branch",
        branch: `agent/gh-issue-${issueId}`,
        baseBranch: "main",
      },
      logging: {
        type: "stdout",
        verbose: false,
      },
    })
      .then(resp => `${sep}\n\nIssue ${issueId} completed:\n\n${resp}\n\n${sep}\n\n`)
      .catch(error => `${sep}\n\nIssue ${issueId} failed: ${error}\n\n${sep}\n\n`);
  }),
).then(() => {
  console.log("All issues completed");
});
```

---

## Wrapping Up

Sandcastle is a wonderful library for crafting agentic workflows. It provides you with incredibly useful primitives you can combine however you need, based on your own workflow.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Sandcastle",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/introducing-sandcastle.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
