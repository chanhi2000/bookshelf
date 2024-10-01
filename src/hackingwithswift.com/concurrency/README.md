---
lang: ko-KR
title: Swift Concurrency by Example
description: Article(s) > Swift Concurrency by Example
icon: fa-brands fa-swift
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: Article(s) > Swift Concurrency by Example
    - property: og:description
      content: Swift Concurrency by Example
    - property: og:url
      content: https://chanhi2000.github.io/articles/hackingwithswift.com/concurrency/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "HACKING WITH SWIFT",
  "desc": "Swift Concurrency by Example",
  "link": "https://hackingwithswift.com/quick-start/concurrency",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[[toc]]

---

Swift Concurrency by Example is the largest free book teaching all aspects of Swift concurrency, walking you through the many and varied ways of running concurrent code in Swift such as async/await, tasks, actors, and more.

::: details Introduction

```component VPCard
{
  "title": "This stuff is hard | Swift Concurrency by Example",
  "desc": "This stuff is hard",
  "link": "/hackingwithswift.com/concurrency/this-stuff-is-hard.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to follow this guide | Swift Concurrency by Example",
  "desc": "How to follow this guide",
  "link": "/hackingwithswift.com/concurrency/how-to-follow-this-guide.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Concurrency vs parallelism | Swift Concurrency by Example",
  "desc": "Concurrency vs parallelism",
  "link": "/hackingwithswift.com/concurrency/concurrency-vs-parallelism.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Understanding threads and queues | Swift Concurrency by Example",
  "desc": "Understanding threads and queues",
  "link": "/hackingwithswift.com/concurrency/understanding-threads-and-queues.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Main thread and main queue: what’s the difference? | Swift Concurrency by Example",
  "desc": "Main thread and main queue: what’s the difference?",
  "link": "/hackingwithswift.com/concurrency/main-thread-and-main-queue-whats-the-difference.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Where is Swift concurrency supported? | Swift Concurrency by Example",
  "desc": "Where is Swift concurrency supported?",
  "link": "/hackingwithswift.com/concurrency/where-is-swift-concurrency-supported.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Dedication | Swift Concurrency by Example",
  "desc": "Dedication",
  "link": "/hackingwithswift.com/concurrency/dedication.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Async/await

```component VPCard
{
  "title": "What is a synchronous function? | Swift Concurrency by Example",
  "desc": "What is a synchronous function?",
  "link": "/hackingwithswift.com/concurrency/what-is-a-synchronous-function.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What is an asynchronous function? | Swift Concurrency by Example",
  "desc": "What is an asynchronous function?",
  "link": "/hackingwithswift.com/concurrency/what-is-an-asynchronous-function.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and call an async function | Swift Concurrency by Example",
  "desc": "How to create and call an async function",
  "link": "/hackingwithswift.com/concurrency/how-to-create-and-call-an-async-function.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to call async throwing functions | Swift Concurrency by Example",
  "desc": "How to call async throwing functions",
  "link": "/hackingwithswift.com/concurrency/how-to-call-async-throwing-functions.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What calls the first async function? | Swift Concurrency by Example",
  "desc": "What calls the first async function?",
  "link": "/hackingwithswift.com/concurrency/what-calls-the-first-async-function.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What’s the performance cost of calling an async function? | Swift Concurrency by Example",
  "desc": "What’s the performance cost of calling an async function?",
  "link": "/hackingwithswift.com/concurrency/whats-the-performance-cost-of-calling-an-async-function.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and use async properties | Swift Concurrency by Example",
  "desc": "How to create and use async properties",
  "link": "/hackingwithswift.com/concurrency/how-to-create-and-use-async-properties.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to call an async function using async let | Swift Concurrency by Example",
  "desc": "How to call an async function using async let",
  "link": "/hackingwithswift.com/concurrency/how-to-call-an-async-function-using-async-let.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What’s the difference between await and async let? | Swift Concurrency by Example",
  "desc": "What’s the difference between await and async let?",
  "link": "/hackingwithswift.com/concurrency/whats-the-difference-between-await-and-async-let.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Why can’t we call async functions using async var? | Swift Concurrency by Example",
  "desc": "Why can’t we call async functions using async var?",
  "link": "/hackingwithswift.com/concurrency/why-cant-we-call-async-functions-using-async-var.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to use continuations to convert completion handlers into async functions | Swift Concurrency by Example",
  "desc": "How to use continuations to convert completion handlers into async functions",
  "link": "/hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create continuations that can throw errors | Swift Concurrency by Example",
  "desc": "How to create continuations that can throw errors",
  "link": "/hackingwithswift.com/concurrency/how-to-create-continuations-that-can-throw-errors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to store continuations to be resumed later | Swift Concurrency by Example",
  "desc": "How to store continuations to be resumed later",
  "link": "/hackingwithswift.com/concurrency/how-to-store-continuations-to-be-resumed-later.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to fix the error “async call in a function that does not support concurrency” | Swift Concurrency by Example",
  "desc": "How to fix the error “async call in a function that does not support concurrency”",
  "link": "/hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Sequences and streams

```component VPCard
{
  "title": "What’s the difference between Sequence, AsyncSequence, and AsyncStream? | Swift Concurrency by Example",
  "desc": "What’s the difference between Sequence, AsyncSequence, and AsyncStream?",
  "link": "/hackingwithswift.com/concurrency/whats-the-difference-between-sequence-asyncsequence-and-asyncstream.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to loop over an AsyncSequence using for await | Swift Concurrency by Example",
  "desc": "How to loop over an AsyncSequence using for await",
  "link": "/hackingwithswift.com/concurrency/how-to-loop-over-an-asyncsequence-using-for-await.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to manipulate an AsyncSequence using map(), filter(), and more | Swift Concurrency by Example",
  "desc": "How to manipulate an AsyncSequence using map(), filter(), and more",
  "link": "/hackingwithswift.com/concurrency/how-to-manipulate-an-asyncsequence-using-map-filter-and-more.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create a custom AsyncSequence | Swift Concurrency by Example",
  "desc": "How to create a custom AsyncSequence",
  "link": "/hackingwithswift.com/concurrency/how-to-create-a-custom-asyncsequence.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to convert an AsyncSequence into a Sequence | Swift Concurrency by Example",
  "desc": "How to convert an AsyncSequence into a Sequence",
  "link": "/hackingwithswift.com/concurrency/how-to-convert-an-asyncsequence-into-a-sequence.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Tasks and task groups

```component VPCard
{
  "title": "What are tasks and task groups? | Swift Concurrency by Example",
  "desc": "What are tasks and task groups?",
  "link": "/hackingwithswift.com/concurrency/what-are-tasks-and-task-groups.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and run a task | Swift Concurrency by Example",
  "desc": "How to create and run a task",
  "link": "/hackingwithswift.com/concurrency/how-to-create-and-run-a-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What’s the difference between a task and a detached task? | Swift Concurrency by Example",
  "desc": "What’s the difference between a task and a detached task?",
  "link": "/hackingwithswift.com/concurrency/whats-the-difference-between-a-task-and-a-detached-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to get a Result from a task | Swift Concurrency by Example",
  "desc": "How to get a Result from a task",
  "link": "/hackingwithswift.com/concurrency/how-to-get-a-result-from-a-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to control the priority of a task | Swift Concurrency by Example",
  "desc": "How to control the priority of a task",
  "link": "/hackingwithswift.com/concurrency/how-to-control-the-priority-of-a-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Understanding how priority escalation works | Swift Concurrency by Example",
  "desc": "Understanding how priority escalation works",
  "link": "/hackingwithswift.com/concurrency/understanding-how-priority-escalation-works.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to cancel a Task | Swift Concurrency by Example",
  "desc": "How to cancel a Task",
  "link": "/hackingwithswift.com/concurrency/how-to-cancel-a-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make a task sleep | Swift Concurrency by Example",
  "desc": "How to make a task sleep",
  "link": "/hackingwithswift.com/concurrency/how-to-make-a-task-sleep.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to voluntarily suspend a task | Swift Concurrency by Example",
  "desc": "How to voluntarily suspend a task",
  "link": "/hackingwithswift.com/concurrency/how-to-voluntarily-suspend-a-task.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create a task group and add tasks to it | Swift Concurrency by Example",
  "desc": "How to create a task group and add tasks to it",
  "link": "/hackingwithswift.com/concurrency/how-to-create-a-task-group-and-add-tasks-to-it.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to cancel a task group | Swift Concurrency by Example",
  "desc": "How to cancel a task group",
  "link": "/hackingwithswift.com/concurrency/how-to-cancel-a-task-group.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to handle different result types in a task group | Swift Concurrency by Example",
  "desc": "How to handle different result types in a task group",
  "link": "/hackingwithswift.com/concurrency/how-to-handle-different-result-types-in-a-task-group.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What’s the difference between async let, tasks, and task groups? | Swift Concurrency by Example",
  "desc": "What’s the difference between async let, tasks, and task groups?",
  "link": "/hackingwithswift.com/concurrency/whats-the-difference-between-async-let-tasks-and-task-groups.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make async command-line tools and scripts | Swift Concurrency by Example",
  "desc": "How to make async command-line tools and scripts",
  "link": "/hackingwithswift.com/concurrency/how-to-make-async-command-line-tools-and-scripts.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and use task local values | Swift Concurrency by Example",
  "desc": "How to create and use task local values",
  "link": "/hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to run tasks using SwiftUI’s task() modifier | Swift Concurrency by Example",
  "desc": "How to run tasks using SwiftUI’s task() modifier",
  "link": "/hackingwithswift.com/concurrency/how-to-run-tasks-using-swiftuis-task-modifier.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Is it efficient to create many tasks? | Swift Concurrency by Example",
  "desc": "Is it efficient to create many tasks?",
  "link": "/hackingwithswift.com/concurrency/is-it-efficient-to-create-many-tasks.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Actors

```component VPCard
{
  "title": "What is an actor and why does Swift have them? | Swift Concurrency by Example",
  "desc": "What is an actor and why does Swift have them?",
  "link": "/hackingwithswift.com/concurrency/what-is-an-actor-and-why-does-swift-have-them.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and use an actor in Swift | Swift Concurrency by Example",
  "desc": "How to create and use an actor in Swift",
  "link": "/hackingwithswift.com/concurrency/how-to-create-and-use-an-actor-in-swift.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make function parameters isolated | Swift Concurrency by Example",
  "desc": "How to make function parameters isolated",
  "link": "/hackingwithswift.com/concurrency/how-to-make-function-parameters-isolated.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make parts of an actor nonisolated | Swift Concurrency by Example",
  "desc": "How to make parts of an actor nonisolated",
  "link": "/hackingwithswift.com/concurrency/how-to-make-parts-of-an-actor-nonisolated.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to use @MainActor to run code on the main queue | Swift Concurrency by Example",
  "desc": "How to use @MainActor to run code on the main queue",
  "link": "/hackingwithswift.com/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Understanding how global actor inference works | Swift Concurrency by Example",
  "desc": "Understanding how global actor inference works",
  "link": "/hackingwithswift.com/concurrency/understanding-how-global-actor-inference-works.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What is actor hopping and how can it cause problems? | Swift Concurrency by Example",
  "desc": "What is actor hopping and how can it cause problems?",
  "link": "/hackingwithswift.com/concurrency/what-is-actor-hopping-and-how-can-it-cause-problems.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "What’s the difference between actors, classes, and structs? | Swift Concurrency by Example",
  "desc": "What’s the difference between actors, classes, and structs?",
  "link": "/hackingwithswift.com/concurrency/whats-the-difference-between-actors-classes-and-structs.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Important: Do not use an actor for your SwiftUI data models | Swift Concurrency by Example",
  "desc": "Important: Do not use an actor for your SwiftUI data models",
  "link": "/hackingwithswift.com/concurrency/important-do-not-use-an-actor-for-your-swiftui-data-models.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Solutions

```component VPCard
{
  "title": "How to download JSON from the internet and decode it into any Codable type | Swift Concurrency by Example",
  "desc": "How to download JSON from the internet and decode it into any Codable type",
  "link": "/hackingwithswift.com/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::


