---
lang: en-US
title: "Claude Code Settings That Scale With Your TypeScript Team"
description: "Article(s) > Claude Code Settings That Scale With Your TypeScript Team"
icon: iconfont icon-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Claude Code Settings That Scale With Your TypeScript Team"
    - property: og:description
      content: "Claude Code Settings That Scale With Your TypeScript Team"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/claude-code-has-5-setting-scopes.html
prev: /programming/ts/articles/README.md
date: 2026-04-03
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

[[toc]]

---

<SiteInfo
  name="Claude Code Settings That Scale With Your TypeScript Team"
  desc="Learn the configuration scopes in Claude Code, their precedence order, and how to use each one to streamline your TypeScript development workflow."
  url="https://typescript.tv/hands-on/claude-code-has-5-setting-scopes"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Learn the configuration scopes in Claude Code, their precedence order, and how to use each one to streamline your TypeScript development workflow.

[<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) reads configuration from multiple scopes. Each scope has a different file, a different audience, and a different level of authority. If you don't know which one wins when they conflict, you'll spend time debugging settings that silently get overridden. This guide walks through all scopes, explains the precedence order, and shows practical examples for TypeScript projects.

---

## The Scopes

Every Claude Code session merges settings from multiple layers. From highest to lowest priority:

1. **Managed**: organization-enforced policies that cannot be overridden
2. **CLI flags**: temporary session overrides passed on the command line
3. **Local Project**: personal overrides for a single project, gitignored
4. **Project**: shared team settings, checked into Git
5. **User**: your personal defaults across all projects

When the same setting appears at multiple layers, the higher-priority scope wins. User settings get overridden by project settings, which can get overridden by local project settings. CLI flags override all file-based settings, and managed policies override everything.

---

## Managed Scope

The managed scope is deployed by an organization's IT or DevOps team. It lives outside your home directory and your project, at <VPIcon icon="fas fa-folder-open"/>`/Library/Application Support/ClaudeCode/`<VPIcon icon="iconfont icon-json"/>`managed-settings.json` on macOS or <VPIcon icon="fas fa-folder-open"/>`/etc/claude-code/`<VPIcon icon="iconfont icon-json"/>`managed-settings.json` on Linux. Managed settings cannot be overridden by any other scope. Individual developers never edit this file directly.

---

## CLI Flags

CLI flags are temporary overrides that last for a single session. They take precedence over everything except managed settings. Examples include `claude --permission-mode auto` to enable [<VPIcon icon="iconfont icon-claude"/>auto mode](https://docs.anthropic.com/en/docs/claude-code/security#auto-accept-mode) or `claude --model claude-sonnet-4-5` to switch models. CLI flags are not persisted anywhere.

---

## Local Project Scope

The local project scope lives at <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.local.json` in your repository. It is gitignored, so it never gets committed. This is your personal escape hatch for project-specific tweaks that only make sense on your machine. It is also good for running hooks like automatic formatting when your team settings don't already have that. Local project scope overrides both project and user scope. You can also add personal project instructions in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.local.md` at the repo root.

---

## Project Scope

The project scope lives at <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json` in your repository root. It gets checked into git, so everyone on your team shares the same configuration. This is where you define team-wide permissions, hooks, and tool restrictions. Since project scope overrides user scope, a team-wide deny rule cannot be bypassed by a developer's personal allow rule.

Project-level instructions go in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` at your repo root. For larger projects, you can organize rules into <VPIcon icon="fas fa-folder-open"/>`.claude/rules/` as separate files that Claude Code loads on demand.

---

## User Scope

The user scope lives at <VPIcon icon="fas fa-folder-open"/>`~/.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json`. It applies to every project you open with Claude Code on your machine. This is the right place for personal preferences that you want everywhere, like your default permission rules or allowed tools. You can also place a <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` file at <VPIcon icon="fas fa-folder-open"/>`~/.claude/`<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` for instructions that apply globally.

---

## Adding MCP Servers to the Right Scope

When you register an MCP server through the CLI, the `--scope` flag controls which settings file it lands in. The default is `local`, which means the server only exists on your machine for the current project.

::: tip Example

```sh
claude mcp add --transport http Canva https://mcp.canva.com/mcp
```

This writes the server config to <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.local.json`. If you want a different scope, pass `--scope` explicitly:

```sh
# Personal, gitignored, current project only (default)
claude mcp add --scope local --transport http Canva https://mcp.canva.com/mcp
 
# Shared with the team, committed to git
claude mcp add --scope project --transport http Playwright https://mcp.playwright.dev/mcp
 
# Available in every project on your machine
claude mcp add --scope user --transport http Canva https://mcp.canva.com/mcp
```

Removing an MCP server works the same way. Pass `-s` (short for `--scope`) to target the right settings file:

```sh
claude mcp remove "Canva" -s local
claude mcp remove "Playwright" -s project
claude mcp remove "Canva" -s user
```

:::

---

## A Practical Setup for TypeScript Projects

Here is a setup that works well for TypeScript teams using Claude Code:

| File | Scope | What to put here |
| --- | --- | --- |
| <VPIcon icon="fas fa-folder-open"/>`~/.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json` | User | MCP servers you use everywhere, like a TypeScript language server |
| <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json` | Project | Framework-specific MCP servers, like a Playwright MCP for end-to-end testing |
| <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.local.json` | Local Project | MCP servers with individual credentials, like a Figma MCP connected to your personal account |

Instruction files follow the same scoping pattern:

| File | Scope | What to put here |
| --- | --- | --- |
| <VPIcon icon="fas fa-folder-open"/>`~/.claude/`<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` | User | Personal coding style preferences and naming conventions |
| <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` | Project | Shared coding conventions, e.g. arrow functions, explicit return types, vitest for testing |
| <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.local.md` | Local Project | Personal overrides for a specific repo, like your preferred commit message format |

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Claude Code Settings That Scale With Your TypeScript Team",
  "desc": "Learn the configuration scopes in Claude Code, their precedence order, and how to use each one to streamline your TypeScript development workflow.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/claude-code-has-5-setting-scopes.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
