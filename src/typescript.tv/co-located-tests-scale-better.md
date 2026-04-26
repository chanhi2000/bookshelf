---
lang: en-US
title: "Co-located Tests Scale Better"
description: "Article(s) > Co-located Tests Scale Better"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Co-located Tests Scale Better"
    - property: og:description
      content: "Co-located Tests Scale Better"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/co-located-tests-scale-better.html
prev: /programming/ts/articles/README.md
date: 2026-04-08
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

[[toc]]

---

<SiteInfo
  name="Co-located Tests Scale Better"
  desc="Co-locating test files next to TypeScript source code beats a centralized ”tests” folder every time. Learn why co-location scales better in large TypeScript codebases and how it keeps your project navigable."
  url="https://typescript.tv/best-practices/co-located-tests-scale-better"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Co-locating test files next to TypeScript source code beats a centralized "tests" folder every time. Learn why co-location scales better in large TypeScript codebases and how it keeps your project navigable.

You open a TypeScript project with 200 source files. You need to find the test for <VPIcon icon="iconfont icon-typescript"/>`UserService.ts`. You navigate to the <VPIcon icon="fas fa-folder-open"/>`tests/` folder, and you're greeted by a flat ocean of files, or worse, a mirrored directory tree that's three clicks deep. Sound familiar? There's a better way: put the test right next to the TypeScript source code it tests.

---

## The Problem with a Centralized Tests Folder

The classic TypeScript project structure looks something like this:

```sh title="Classic structure"
src/
  auth/
    UserService.ts
    TokenValidator.ts
  billing/
    InvoiceGenerator.ts
    PaymentProcessor.ts
tests/
  auth/
    UserService.test.ts
    TokenValidator.test.ts
  billing/
    InvoiceGenerator.test.ts
    PaymentProcessor.test.ts
```

At first glance, this seems organized. Tests live in one place, source code in another. But as your codebase grows, this separation creates real friction.

When you open the <VPIcon icon="fas fa-folder-open"/>`tests/` folder in a large project, you're staring at dozens or even hundreds of files. You have to mentally map from the source file you're working on to the corresponding test file, navigating a parallel directory structure that mirrors <VPIcon icon="fas fa-folder-open"/>`src/` but lives somewhere else entirely. In a file explorer or sidebar, this means constant jumping between two distant parts of the tree.

---

## Co-location: Tests Right Next to the Code

Co-location means placing each test file directly beside the TypeScript source file it covers:

```sh title="Co-located structure"
src/
  auth/
    UserService.ts
    UserService.test.ts
    TokenValidator.ts
    TokenValidator.test.ts
  billing/
    InvoiceGenerator.ts
    InvoiceGenerator.test.ts
    PaymentProcessor.ts
    PaymentProcessor.test.ts
```

---

## Benefits

Co-location makes a dramatic difference in your daily workflow.

### Instant Discovery

When you open a folder in your file explorer, the test file is right there. You don't need to search, you don't need to navigate to a separate directory, and you don't need to guess the path. Working on <VPIcon icon="iconfont icon-typescript"/>`UserService.ts`? The test is the next file in the list. This is especially powerful in IDEs like [<VPIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/) where the sidebar groups files alphabetically within a folder.

### Surviving Refactors

When you move or rename a TypeScript module, the test moves with it. If you drag the <VPIcon icon="fas fa-folder-open"/>`auth/` folder into a new <VPIcon icon="fas fa-folder-open"/>`identity/` directory, everything stays together. With a centralized <VPIcon icon="fas fa-folder-open"/>`tests/` folder, you'd have to make the same structural change in two places and update all the import paths in your test files manually. Co-location eliminates this entire class of maintenance work.

### Visibility of Test Coverage

A folder without a <VPIcon icon="iconfont icon-typescript"/>`.test.ts` file next to a source file is an immediate visual signal that something is untested. You don't need to run a coverage tool to spot the gap. In a <VPIcon icon="fas fa-folder-open"/>`tests/` folder setup, you'd have to cross-reference two directory trees to notice a missing test. Co-location makes coverage gaps obvious at a glance.

### Shorter Import Paths

Co-located tests import their subject with a simple relative path:

```ts title="UserService.test.ts"
import { UserService } from './UserService';
```

With a centralized `tests/` folder, you end up with fragile paths that reach back up the directory tree:

```ts title="tests/auth/UserService.test.ts"
import { UserService } from '../../src/auth/UserService';
```

These deep relative imports break easily during refactors and make the test files harder to read. Some teams work around this with path aliases, but that's adding complexity to solve a problem that co-location avoids entirely.

### Better Code Ownership

In large teams, different people or squads own different parts of the codebase. When tests live next to the source code, ownership is clear. The person who owns <VPIcon icon="fas fa-folder-open"/>`billing/` owns its tests too. With a centralized <VPIcon icon="fas fa-folder-open"/>`tests/` folder, ownership boundaries get blurry because the test code is physically separated from the module it belongs to.

---

## What About Integration and E2E Tests?

Co-location works best for unit tests and module-level integration tests, which are tests that exercise a single file or a small cluster of closely related files. For broader integration tests or end-to-end tests that span multiple modules, a dedicated top-level directory still makes sense:

```sh title="Hybrid structure"
src/
  auth/
    UserService.ts
    UserService.test.ts
  billing/
    InvoiceGenerator.ts
    InvoiceGenerator.test.ts
e2e/
  checkout.spec.ts
  login.spec.ts
```

This hybrid approach gives you the best of both worlds. Unit tests stay co-located for fast discovery and tight coupling with source code, while cross-cutting tests that don't belong to any single module get their own space.

---

## Setting Up Co-location

Most modern test runners support co-located tests out of the box. Here's how [<VPIcon icon="fas fa-globe"/>Vitest](https://vitest.dev/) discovers test files by default:

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';
 
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
```

[<VPIcon icon="iconfont icon-jest"/>Jest](https://jestjs.io/) works the same way with its `testMatch` configuration:

```ts title="jest.config.ts"
export default {
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
```

Both runners will recursively find every <VPIcon icon="iconfont icon-typescript"/>`.test.ts` file inside <VPIcon icon="fas fa-folder-open"/>`src/`, regardless of how deeply nested it is. No extra configuration needed.

If you want to exclude test files from your production build, your <VPIcon icon="iconfont icon-json"/>`tsconfig.build.json` can simply exclude the pattern:

```json title="tsconfig.build.json"
{
  "extends": "./tsconfig.json",
  "exclude": ["src/**/*.test.ts"]
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Co-located Tests Scale Better",
  "desc": "Co-locating test files next to TypeScript source code beats a centralized ”tests” folder every time. Learn why co-location scales better in large TypeScript codebases and how it keeps your project navigable.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/co-located-tests-scale-better.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
