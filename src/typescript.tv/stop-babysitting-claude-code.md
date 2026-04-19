---
lang: en-US
title: "Stop Babysitting Claude Code"
description: "Article(s) > Stop Babysitting Claude Code"
icon: iconfont icon-typescript
category:
  - DevOps
  - Docker
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - docker
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stop Babysitting Claude Code"
    - property: og:description
      content: "Stop Babysitting Claude Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/stop-babysitting-claude-code.html
prev: /devops/docker/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
---

# {{ $frontmatter.title }} 관련

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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Stop Babysitting Claude Code"
  desc="Compare three ways to run Claude Code without manual confirmations: the --dangerously-skip-permissions flag, Docker sandboxes, and Claude's auto mode. Learn the trade-offs in safety, isolation, and flexibility for your TypeScript projects."
  url="https://typescript.tv/hands-on/stop-babysitting-claude-code"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

::: info

Compare three ways to run Claude Code without manual confirmations: the `--dangerously-skip-permissions` flag, Docker sandboxes, and Claude's auto mode. Learn the trade-offs in safety, isolation, and flexibility for your TypeScript projects.

:::

[<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) is Anthropic's agentic coding tool that lives in your terminal. By default, it asks for your confirmation before running shell commands, writing files, or making other potentially destructive changes. That's a good safety net, but it slows down fully autonomous workflows. If you want Claude Code to run `tsc`, fix type errors, and refactor your TypeScript project without you clicking "allow" every ten seconds, there are currently three ways to remove that friction: the `--dangerously-skip-permissions` flag (equivalent to `codex --yolo`), Docker-based sandboxes, and Claude's auto mode on the web.

---

## The Permission Problem

When you run Claude Code interactively, it prompts you before every file write, shell command, or system change. This is intentional. Running arbitrary AI-generated commands without review can delete files, install malicious packages, or modify system configurations. The confirmation step gives you a chance to catch mistakes before they happen.

However, if you're running Claude Code in CI pipelines, automated workflows, or long-running coding sessions where you trust the agent to operate independently, these prompts become blockers. Each of the three approaches below removes the confirmation requirement, but they differ significantly in how they handle the resulting security risk.

---

## Dangerously Skip Permissions

The most straightforward option is the `--dangerously-skip-permissions` flag. You pass it directly when launching Claude Code from the terminal:

```sh
claude --dangerously-skip-permissions
```

This flag disables all permission prompts. Claude Code will execute shell commands, write files, and make changes without asking. The name itself is a warning: this gives the AI agent unrestricted access to your system with your user's permissions.

::: info How It Works

Once the flag is set, every tool call (file writes, shell commands, web requests) runs immediately without confirmation. There is no safety classifier or isolation layer. The agent operates with the same permissions as your user account, so it can read, write, and delete anything you can.

To add some guardrails, you can use an `allowedTools` list in your [<VPIcon icon="iconfont icon-claude"/>Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings) to restrict which tools the agent can invoke. This gives you a middle ground: autonomous execution, but only for a defined set of operations.

:::

::: note When to Use It

The `--dangerously-skip-permissions` flag is designed primarily for CI/CD pipelines and automated scripts where no human is present to approve actions. Anthropic recommends running it inside a container or VM to limit the blast radius. If you run it directly on your development machine, a single hallucinated `rm -rf` command could wipe out your work.

:::

---

## Docker Sandbox

The [<VPIcon icon="fa-brands fa-docker"/>Docker sandbox approach](https://docs.docker.com/ai/sandboxes/agents/claude-code/) wraps Claude Code inside an isolated container. Instead of trusting the agent not to break anything, you make it impossible for it to break anything outside the container.

Docker Desktop provides a built-in `claude-code` sandbox that you can launch with:

```sh
docker ai sandbox create claude-code
```

This creates a container with Claude Code pre-installed, mounts your project directory, and forwards the necessary environment variables (like your `ANTHROPIC_API_KEY`). The agent runs with full autonomy inside the container, but it cannot touch your host system beyond the mounted directory.

::: info How It Works

The sandbox uses Docker's isolation features to contain all of Claude Code's actions. File system changes are limited to the mounted project directory. Network access, system calls, and other operations are constrained by the container's security profile. Even if the agent runs a destructive command, the damage stays inside the container.

:::

::: note When to Use It

Docker sandboxes are ideal when you want fully autonomous operation with strong isolation guarantees. They work well for CI/CD pipelines, code review automation, and any scenario where the agent needs to run commands freely but you don't want it to have access to your full system. The trade-off is additional setup complexity and the overhead of running inside a container. If you're on a personal machine with plenty of RAM, a Docker sandbox is a practical way to let the agent run freely without risking your personal data.

:::

---

## Claude Auto Mode

[<VPIcon icon="iconfont icon-claude"/>Auto mode](https://claude.com/blog/auto-mode) is a middle path built into Claude Code itself. It lets you run longer tasks with fewer interruptions while introducing less risk than skipping all permissions. You can enable it with:

```sh
claude --enable-auto-mode
```

When active, Claude Code chains tool calls together without prompting you for each one. However, before each tool call runs, a classifier reviews it to check for potentially destructive actions like mass deleting files, sensitive data exfiltration, or malicious code execution. If the classifier flags something as risky, Claude Code pauses and asks for your confirmation before proceeding.

::: info How It Works

Unlike `--dangerously-skip-permissions`, auto mode does not give the agent blanket permission to do anything. It applies a safety check on every action and only skips the prompt when the classifier considers the action safe. This means routine operations like reading files, running `tsc`, or writing code proceed without interruption, while a command like `rm -rf /` would still trigger a confirmation.

Compared to the Docker sandbox, auto mode runs directly on your local machine with no container isolation. The protection comes from the classifier, not from an execution boundary. This makes it lighter to set up but less airtight: the classifier is a heuristic, not a hard guarantee. Keep in mind that the classification step adds a small amount of extra token usage per tool call.

:::

::: note When to Use It

Auto mode works best for interactive coding sessions where you want to stay hands-off for routine operations but still want a safety net for destructive actions. It's a good fit when you're working on your own machine and don't want the overhead of setting up Docker, but also don't want to give the agent completely unrestricted access. Since it requires no additional infrastructure, it's also the natural choice on systems where Docker isn't available at all.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Babysitting Claude Code",
  "desc": "Compare three ways to run Claude Code without manual confirmations: the --dangerously-skip-permissions flag, Docker sandboxes, and Claude's auto mode. Learn the trade-offs in safety, isolation, and flexibility for your TypeScript projects.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/stop-babysitting-claude-code.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
