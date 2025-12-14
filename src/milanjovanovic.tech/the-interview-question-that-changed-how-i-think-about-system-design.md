---
lang: en-US
title: "The Interview Question That Changed How I Think About System Design"
description: "Article(s) > The Interview Question That Changed How I Think About System Design"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Interview Question That Changed How I Think About System Design"
    - property: og:description
      content: "The Interview Question That Changed How I Think About System Design"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-interview-question-that-changed-how-i-think-about-system-design.html
prev: /academics/system-design/articles/README.md
date: 2025-10-25
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_165.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Interview Question That Changed How I Think About System Design"
  desc="Discover how a simple interview question about report generation reveals the difference between optimizing code and designing scalable systems, and why the best solution isn't making it faster, but making it asynchronous."
  url="https://milanjovanovic.tech/blog/the-interview-question-that-changed-how-i-think-about-system-design"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_165.png"/>

About six or seven years ago, I went through an interview for a mid-level .NET role.

One of the questions has stayed with me ever since:

> A user clicks a button on the UI to generate an Excel or PDF report. The report generation takes around five minutes (time can be arbitrary). The user has to wait for it to finish. How would you optimize this flow?

At the time, I focused on what I knew best: **performance**. I started thinking about how to make the report generation faster. Maybe I could optimize the SQL queries, reduce data transformations, or [**cache**](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md) parts of the result. If I could get the process down from five minutes to one, that felt like a big win.

But even if I made it five times faster, the user still had to wait. If the browser crashed, they lost everything. If the network dropped, the process stopped. If they closed the tab, all progress was gone.

It wasn't really a performance issue at all, it was a **design issue**.

---

## What I Missed Back Then

Looking back, I realize I was **stuck** in the mindset of "make the code faster". Not that there's anything wrong with that, **performance optimization is a valuable skill**. What I didn't see immediately was the **bigger problem**. The app was doing all this work **synchronously**, holding the user hostage until it finished. I did eventually figure it out, with a few nudges from the interviewer.

![](https://milanjovanovic.tech/blogs/mnw_165/sync_reporting_flow.png?imwidth=3840)

The better question wasn't *"How can I make this faster?"*

It was *"Why is the user waiting in the first place?"*

If something takes minutes (or hours, days) to complete, it shouldn't block the user. It should happen in the **background**, out of the **main request flow**, while the user moves on with their work.

Still, don't forget to optimize the code itself. Database queries, data processing, and file generation all matter. Maybe there's a missing index, an inefficient loop, or a better library for creating Excel files. But those optimizations are just part of the solution, not the whole picture.

---

## How I'd Solve It Today

Today, I'd still start with the same UI button. The user clicks "Generate Report," but instead of waiting, the **backend accepts the request**, saves it somewhere (maybe as a job record in a database), and **returns right away**. This is the essence of building [**asynchronous APIs**](/milanjovanovic.tech/building-async-apis-in-aspnetcore-the-right-way.md). The job is then picked up by a background worker.

The worker can be a [**hosted service**](/milanjovanovic.tech/running-background-tasks-in-asp-net-core.md), a [**Quartz job**](/milanjovanovic.tech/scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts.md), or even an [**AWS Lambda Function**](/milanjovanovic.tech/building-fast-serverless-apis-with-minimal-apis-on-aws-lambda.md) triggered by a queue message. It handles the heavy lifting: pulling the data, building the file, and uploading it to storage like S3 or Azure Blob.

Once the report is ready, the worker updates the job status to "completed" and notifies the user. That could be an email with a download link or a real-time SignalR message that shows up in the app. The link points to the stored report, served securely from the backend.

![](https://milanjovanovic.tech/blogs/mnw_165/async_reporting_flow.png?imwidth=3840)

Now, the user isn't waiting on a long-running HTTP request. The server isn't holding open connections for minutes. **If something fails, it can be retried automatically**. You also have the option to **track progress** or **cancel** the job if needed. And if a hundred users request reports at once, the system can scale without locking up.

The experience feels faster, even if the actual report generation time hasn't changed. Because in the end, users don't care about performance metrics, they care about responsiveness.

---

## Why I Still Use This Question

A few years later, I started using this exact question when interviewing other developers. Not to trick anyone, but because it reveals how people think.

Some candidates go straight to optimizing code and queries, just like I did back then. This is a good sign that they know their way around performance tuning. I can proceed with further technical questions around **algorithms**, **data structures**, or **database optimization**.

Others pause for a moment and start thinking about user experience, **background processing**, and **fault tolerance**. That's when the real conversation begins: queues, retries, notifications, secure file sharing, etc. There are so many ways you can spin off this one scenario into a broader system design discussion.

There's **no single right answer**. But there's a big difference between someone who focuses only on *code* and someone who can design a *scalable system*.

---

## The Lesson

When I first heard this question, I thought about making the code faster. Now I think about making the experience better.

Optimizing a query or loop can help, but it doesn't fix waiting, failures, or scalability. If many users start the same report at once, a synchronous design breaks down fast. An asynchronous flow keeps the system responsive and resilient, no matter the load.

That shift from optimizing functions to designing scalable systems is the difference between a good developer and a great one.

If you want to go deeper into building systems that scale, my [**Clean Architecture course**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) walks you through exactly that. You'll learn how to structure applications, separate concerns, and design systems that grow without breaking.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Interview Question That Changed How I Think About System Design",
  "desc": "Discover how a simple interview question about report generation reveals the difference between optimizing code and designing scalable systems, and why the best solution isn't making it faster, but making it asynchronous.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-interview-question-that-changed-how-i-think-about-system-design.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
