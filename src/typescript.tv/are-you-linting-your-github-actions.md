---
lang: en-US
title: "Are You Linting Your GitHub Actions?"
description: "Article(s) > Are You Linting Your GitHub Actions?"
icon: iconfont icon-typescript
category:
  - TypeScript
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - devops
  - github
  - cicd
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Are You Linting Your GitHub Actions?"
    - property: og:description
      content: "Are You Linting Your GitHub Actions?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/are-you-linting-your-github-actions.html
prev: /programming/ts/articles/README.md
date: 2026-07-27
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Are You Linting Your GitHub Actions?"
  desc="One invalid line in a workflow file disabled my GitHub Action and failed every single push. Learn how to catch broken workflow files at commit time with JSON Schema validation straight from npm."
  url="https://typescript.tv/hands-on/are-you-linting-your-github-actions"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

One invalid line in a workflow file disabled my GitHub Action and failed every single push. Learn how to catch broken workflow files at commit time with JSON Schema validation straight from npm.

I woke up to a failed [<VPIcon icon="iconfont icon-github"/>GitHub Actions](https://github.com/features/actions) run in my [trading-signals (<VPIcon icon="iconfont icon-github"/>`bennycode/trading-signals`)](https://github.com/bennycode/trading-signals) repository that made no sense at first glance. There was no red test and no failing job. In fact, there were no jobs at all. The run carried the name of the workflow file itself and a single hint. "This run likely failed because of a workflow file issue."

Here is what happened and how one npm package stops it from ever being committed.

---

## A Failed Run with Zero Jobs

When a test breaks, you click into the failing step and read the stack trace. This run had nothing to click into, because GitHub had refused to parse the workflow file and no job ever started. The only concrete detail was this error message.

```text
Invalid workflow file: .github/workflows/claude.yml#L1
(Line: 27, Col: 7): Unexpected value 'workflows'
```

The workflow in question triggers [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://claude.com/claude-code) whenever someone mentions `@claude` in an issue or pull request. Line 27 sits in its `permissions` block, which looked perfectly reasonable.

```yaml title=".github/workflows/claude.yml"
permissions:
  contents: write
  pull-requests: write
  issues: read
  id-token: write
  actions: read
  workflows: write
```

Line 27 is the bug. The action pushes commits that may modify workflow files, so surely it needs `workflows: write`. That reasoning is intuitive and wrong. There is no permission scope called `workflows`.

---

## Linting GitHub Actions

GitHub Actions workflow files are described by a JSON Schema that is maintained on [<VPIcon icon="fas fa-globe"/>SchemaStore](https://schemastore.org/github-workflow.json). It is the same spec file that powers autocompletion in VS Code's YAML extension. The schema knows exactly which permission keys exist.

```json title="github-workflow.json"
"permissions-event": {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "actions": {"$ref": "#/definitions/permissions-level"},
    "contents": {"$ref": "#/definitions/permissions-level"},
    "issues": {"$ref": "#/definitions/permissions-level"}
  }
}
```

The `additionalProperties: false` line does the heavy lifting. Any key outside the allowed set becomes a validation error. This is the same excess property check you already rely on in TypeScript object literals, applied to YAML.

Two tools can catch this class of mistake before GitHub does.

### actionlint

[<VPIcon icon="iconfont icon-github"/>`rhysd/actionlint`](https://github.com/rhysd/actionlint) goes deeper than schema validation. It also type-checks `${{ }}` expressions and runs [<VPIcon icon="fas fa-globe"/>ShellCheck](https://shellcheck.net/) on `run:` blocks. I decided against it because it is a Go binary installed via Homebrew or Docker, so it lives outside <VPIcon icon="iconfont icon-json"/>`package.json` and every machine has to install it separately.

### action-validator

The [<VPIcon icon="fa-brands fa-npm"/>`@action-validator/cli`](https://npmjs.com/package/@action-validator/cli) package wraps the SchemaStore schema in a command-line tool. It is a Rust validator compiled to WebAssembly and shipped via npm, so it becomes a regular `devDependency` that is versioned in <VPIcon icon="iconfont icon-json"/>`package.json` and locked in `package-lock.json`. There is no `brew install` step that every contributor and CI machine has to remember, and WebAssembly means there are no platform-specific binaries to worry about across macOS, Linux, and CI. In a Node.js project, a tool that arrives with `npm install` beats a more thorough one that needs its own setup.

```sh
npm i -D @action-validator/cli @action-validator/core
```

The CLI declares `@action-validator/core` as a peer dependency, so install both explicitly to pin the pairing in your own manifest. Running the validator against my broken file names the exact bug, including the path to it.

```sh
npx action-validator .github/workflows/claude.yml
```

```json
{
  "code": "properties",
  "detail": "Additional property 'workflows' is not allowed",
  "path": "/jobs/claude/permissions"
}
```

---

## Validate at Commit Time with Lefthook

Knowing the tool exists is not enough, because nobody remembers to run a validator by hand. I use [<VPIcon icon="fas fa-globe"/>lefthook](https://lefthook.dev) for Git hooks, and the whole integration is three lines.

```yaml title="lefthook.yml"
pre-commit:
  commands:
    oxc:
      run: npx oxlint --fix {staged_files}
    action-validator:
      glob: '.github/workflows/*.{yml,yaml}'
      run: npx action-validator {staged_files}
```

The `glob` filter means the hook only fires when a workflow file is actually staged, so the vast majority of commits pay zero overhead. When a workflow file is staged, `npx` resolves the binary from local <VPIcon icon="fas fa-folder-open"/>`node_modules`, which keeps the check fast and working offline. With this in place, the original bug dies at commit time instead of disabling a workflow in production.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Are You Linting Your GitHub Actions?",
  "desc": "One invalid line in a workflow file disabled my GitHub Action and failed every single push. Learn how to catch broken workflow files at commit time with JSON Schema validation straight from npm.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/are-you-linting-your-github-actions.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
