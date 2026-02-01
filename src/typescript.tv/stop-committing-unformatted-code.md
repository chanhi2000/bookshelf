---
lang: en-US
title: "Stop Committing Unformatted Code"
description: "Article(s) > Stop Committing Unformatted Code"
icon: iconfont icon-git
category:
  - Git
  - NPM
  - Node.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - git
  - npm
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stop Committing Unformatted Code"
    - property: og:description
      content: "Stop Committing Unformatted Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/stop-committing-unformatted-code.html
prev: /programming/git/articles/README.md
date: 2026-01-08
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NPM > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/npm/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Stop Committing Unformatted Code"
  desc="Git hooks can automatically catch formatting and linting errors before they reach your repository. Learn how Lefthook makes this effortless with parallel execution and automatic fixes."
  url="https://typescript.tv/best-practices/stop-committing-unformatted-code"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Git hooks can automatically catch formatting and linting errors before they reach your repository. Learn how Lefthook makes this effortless with parallel execution and automatic fixes.

Every developer has done it. You commit your TypeScript code, push it to the repository, and moments later your CI pipeline fails because of a missing semicolon or an extra space. Maybe it's an ESLint error you missed, or perhaps Prettier wasn't run on that one file you edited. These small issues waste time and clutter your commit history with "fix linting" commits that nobody wants to review.

---

## The Manual Approach Doesn't Scale

You could remember to run `prettier` and `eslint` before every commit. But manual processes fail, especially when you're working quickly or when new contributors join your project who aren't familiar with your workflows.

The better solution is to automate code quality checks at the commit level using [<VPIcon icon="iconfont icon-git"/>Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). This ensures that every single commit meets your standards without anyone having to remember anything. For TypeScript projects, this is especially valuable since it can catch type errors, enforce TypeScript-specific linting rules, and ensure consistent formatting across both `.ts` and `.tsx` files.

---

## What is Lefthook?

[Lefthook (<VPIcon icon="iconfont icon-github" />`evilmartians/lefthook`)](https://github.com/evilmartians/lefthook) is a fast Git hooks manager written in Go. It runs commands automatically when you perform Git operations like committing code. Unlike its predecessors like [Husky (<VPIcon icon="iconfont icon-github" />`typicode/husky`)](https://github.com/typicode/husky) which is written in JavaScript, Lefthook is significantly faster and uses a simple YAML configuration that's easy to understand and modify.

When you set up Lefthook with a pre-commit hook, it intercepts your `git commit` command and runs quality checks before allowing the commit to complete. If the checks pass (or can be auto-fixed), your commit proceeds. If they fail, the commit is blocked until you fix the issues.

---

## Setting Up Lefthook

First, install Lefthook in your project:

```sh
npm i lefthook --save-dev
```

Then create a <VPIcon icon="iconfont icon-yaml"/>`lefthook.yml` file in your project root:

```yaml title="lefthook.yml"
pre-commit:
  parallel: true
  commands:
    format:
      glob: '*.{css,html,json,less,md,scss,yml}'
      run: npx -c "cross-env NODE_OPTIONS=--max_old_space_size=4096 prettier --write --log-level error {staged_files}"
      stage_fixed: true
    lint:
      glob: '*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}'
      run: npx eslint {staged_files} --fix
      stage_fixed: true
```

Finally, install the hooks:

```sh
npx lefthook install
```

---

## Understanding the Configuration

The configuration sets up a `pre-commit` hook with two commands that run in parallel. Let's break down what each part does.

- The `parallel: true` setting allows both commands to run simultaneously instead of sequentially. This makes your commits faster since Prettier and ESLint can work at the same time.
- The `format` command targets style files (CSS, HTML, JSON, LESS, Markdown, SCSS, and YAML) using a glob pattern. It runs Prettier with the `--write` flag to automatically fix formatting issues. The `NODE_OPTIONS=--max_old_space_size=4096` setting increases Node's memory allocation to 4GB, which prevents out-of-memory errors when formatting large files or many files at once.
- The `lint` command focuses on JavaScript and TypeScript files (including `.ts`, `.tsx`, `.mts`, and `.cts` extensions). It runs ESLint (typically configured with [`@typescript-eslint`](https://typescript-eslint.io/) for TypeScript projects) with the `--fix` flag, which automatically corrects issues that can be fixed programmatically, like adding missing semicolons, removing unused imports, or fixing TypeScript-specific style violations.

Both commands use `stage_fixed: true`, which automatically stages those changes so they're included in your commit. You don't need to manually stage the fixed files or commit again.

---

## What Happens During a Commit

When you run `git commit`, Lefthook intercepts your commit and identifies which files you've staged. It then filters these files based on the glob patterns you defined. Style files go to Prettier, and TypeScript/JavaScript code files go to ESLint. Both tools run simultaneously thanks to parallel execution.

If the tools find issues they can fix (like formatting problems or auto-correctable linting errors), they fix them and Lefthook stages the corrected files automatically. Your commit then proceeds with both your original changes and the automatic fixes included.

If the tools find issues they cannot fix automatically (like TypeScript type errors, complex linting violations, or missing type annotations that require manual intervention), the commit is blocked. You'll see the error messages in your terminal, and you can fix the issues and try committing again. This is particularly useful in TypeScript projects where type safety is critical and should be enforced before code reaches your repository.

---

## Why This Improves Your Workflow

### Automatic Code Standards Enforcement

Automatic enforcement means your entire team follows the same code standards without thinking about it. New contributors don't need to learn your formatting preferences or remember to run linters because Lefthook handles it for them.

### Faster CI Pipelines

You catch issues immediately in your local environment rather than waiting for CI pipelines to fail. This saves time because local feedback is instant, while CI jobs can take minutes to run and report failures.

### Cleaner Commit History

Your commit history stays clean without "fix formatting" or "fix linting" commits that add noise. Every commit that makes it into your repository already meets your quality standards.

### Works Everywhere

While modern editors like VS Code offer "[**Format On Save**](/digitalocean.com/how-to-format-code-with-prettier-in-visual-studio-code.md)" options, these only work within the IDE. Git hooks provide a safety net that catches issues regardless of how files were edited. Whether someone uses a plain text editor, edits configuration files in a web browser, Lefthook ensures quality standards are enforced at commit time.

### Catches Cross-File Issues

IDE-based formatting only runs on files you have open and actively save. When you modify one file, it can cause linting errors in another file that isn't open in your editor. This is especially common in TypeScript projects where changing an interface in one file can affect type checking in multiple other files. Git hooks examine all staged files together, catching these cross-file issues that isolated editor actions might miss.

---

## Best Practices

Keep your hooks fast by only running checks on staged files rather than your entire codebase. Lefthook's `{staged_files}` variable makes this easy and ensures commits remain quick even in large projects.

Use `parallel: true` whenever your commands don't depend on each other. There's no reason to run Prettier and ESLint sequentially when they access different files.

Configure generous memory limits for Node processes when working with Prettier on large codebases. The 4GB setting shown in the configuration prevents out-of-memory errors without significant downsides.

Document your Lefthook setup in your project's README so contributors understand what happens when they commit code. This reduces confusion and helps people troubleshoot if issues arise.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Committing Unformatted Code",
  "desc": "Git hooks can automatically catch formatting and linting errors before they reach your repository. Learn how Lefthook makes this effortless with parallel execution and automatic fixes.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/stop-committing-unformatted-code.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
