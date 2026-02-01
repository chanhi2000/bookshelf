---
lang: en-US
title: "Never Miss a Switch Case Again"
description: "Article(s) > Never Miss a Switch Case Again"
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
      content: "Article(s) > Never Miss a Switch Case Again"
    - property: og:description
      content: "Never Miss a Switch Case Again"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/never-miss-a-switch-case-again.html
prev: /programming/ts/articles/README.md
date: 2026-01-07
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Never Miss a Switch Case Again"
  desc="Learn how to make TypeScript catch missing switch cases at compile time using the exhaustive switch pattern with the never type."
  url="https://typescript.tv/best-practices/never-miss-a-switch-case-again"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to make TypeScript catch missing switch cases at compile time using the exhaustive switch pattern with the never type.

Have you ever added a new value to an enum or union type, only to discover weeks later that you forgot to handle it in a critical switch statement? This oversight can lead to silent bugs that slip through testing and cause production issues.

TypeScript has a powerful feature that prevents this exact problem: exhaustive switch statements using the `never` type. This pattern forces the compiler to check that every possible case is handled, catching missing cases before your code ever runs.

---

## The Problem with Regular Switch Statements

Let's say you're building a task management app. You have an enum that defines different task statuses:

```ts title="status.ts"
enum Status {
  Todo,
  InProgress,
  Done,
}
```

You write a function to convert these enum values into display labels:

```ts title="status.ts"
const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.Todo:
      return 'To Do';
    case Status.InProgress:
      return 'In Progress';
    case Status.Done:
      return 'Done';
  }
};
```

This looks fine, but there's a hidden danger. What happens if you add a new status? Let's say you add `Cancelled`:

```ts title="status.ts"
enum Status {
  Todo,
  InProgress,
  Done,
  Cancelled,
}
```

Your switch statement is now broken, but TypeScript won't tell you. The function can return `undefined` for the new case, leading to unexpected behavior. You might not catch this until a user encounters the bug in production.

---

## Exhaustive Switch Pattern

The exhaustive switch pattern uses TypeScript's `never` type to force the compiler to verify that all cases are handled. Here's how it works:

```ts title="status.ts"
const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.Todo:
      return 'To Do';
    case Status.InProgress:
      return 'In Progress';
    case Status.Done:
      return 'Done';
    default:
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
  }
};
```

When all cases are handled, `status` in the `default` case will be assigned to the `never` type (because all possibilities were exhausted). TypeScript will then throw a compiler error because no other type can be assigned to `never`:

> Type is not assignable to type 'never'.

This compile-time guarantee is invaluable. Instead of discovering missing cases through runtime errors, user bug reports, or failed tests in production, TypeScript catches the issue immediately in your editor. The moment you add a new enum value, every switch statement that needs updating lights up with a red squiggle. You fix all occurrences before the code ever leaves your machine, eliminating entire categories of bugs.

---

## Using satisfies for Exhaustiveness

TypeScript 4.9 introduced the `satisfies` operator, which provides a more concise way to implement exhaustive switches. Instead of assigning to a `never` variable, you can use `satisfies` directly:

```ts title="status.ts"
const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.Todo:
      return 'To Do';
    case Status.InProgress:
      return 'In Progress';
    case Status.Done:
      return 'Done';
    default:
      throw status satisfies never;
  }
};
```

The `satisfies` operator validates that an expression matches a specific type without changing the expression's inferred type. In this exhaustiveness check, it verifies that `status` has type `never` at compile time.

TypeScript uses control flow analysis to narrow types based on the code path. When all enum cases are explicitly handled in the switch statement, TypeScript knows that the `default` case is unreachable. Therefore, TypeScript narrows `status` to type `never` in the `default` branch.

The `satisfies never` check confirms this narrowing. If all cases are handled, `status` is `never`, and the check passes silently. But if you add a new enum value (like `Status.Cancelled`) without adding a corresponding case, `status` in the `default` branch would have type `Status.Cancelled`, not satisfying `never`. TypeScript would then report this error:

::: note

Type `Status.Cancelled` does not satisfy the expected type `never`.

:::

This pattern is more concise than the variable assignment approach and explicitly signals the intent when being used in combination with `throw`.

---

## Best Practices

When implementing exhaustive switches, follow these guidelines to get the most benefit from this pattern.

Always use the `default` case for your exhaustiveness check, even if you think you've handled all cases. This is what makes the pattern work. Without the `default` case, TypeScript won't catch missing cases.

Return the exhaustiveness check variable at the end of the `default` case. While this code should never execute, returning it satisfies TypeScript's control flow analysis and maintains type safety. Some developers also prefer to throw an error instead (as shown in the `satisfies` example).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Never Miss a Switch Case Again",
  "desc": "Learn how to make TypeScript catch missing switch cases at compile time using the exhaustive switch pattern with the never type.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/never-miss-a-switch-case-again.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
