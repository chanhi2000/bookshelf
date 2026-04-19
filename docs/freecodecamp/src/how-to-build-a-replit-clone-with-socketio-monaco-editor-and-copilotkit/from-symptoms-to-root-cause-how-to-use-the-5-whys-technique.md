---
lang: en-US
title: "From Symptoms to Root Cause: How to Use the 5 Whys Technique"
description: "Article(s) > From Symptoms to Root Cause: How to Use the 5 Whys Technique"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Symptoms to Root Cause: How to Use the 5 Whys Technique"
    - property: og:description
      content: "From Symptoms to Root Cause: How to Use the 5 Whys Technique"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-symptoms-to-root-cause-how-to-use-the-5-whys-technique.html
prev: /academics/coen/articles/README.md
date: 2026-04-24
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5dbd964-9a03-448d-92a5-92e3b4a47fef.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From Symptoms to Root Cause: How to Use the 5 Whys Technique"
  desc="Most teams don't struggle because they can't fix problems. They struggle because they fix the wrong thing. An API fails in production. You restart the service, errors go away, and it feels resolved. U"
  url="https://freecodecamp.org/news/from-symptoms-to-root-cause-how-to-use-the-5-whys-technique"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5dbd964-9a03-448d-92a5-92e3b4a47fef.png"/>

Most teams don't struggle because they can't fix problems. They struggle because they fix the wrong thing.

An API fails in production. You restart the service, errors go away, and it feels resolved. Until it happens again. And again. What's happening here is simple: you're treating symptoms, not the underlying cause.

The **5 Whys technique** is a straightforward way to deal with this. It comes from the Toyota Production System and was designed to help teams dig deeper into problems instead of settling for quick fixes.

The idea is simple. Ask "why" repeatedly until you reach the real cause.

But in practice, this is where things go wrong.

Teams often:

- Stop too early
- Assume answers without checking data
- Focus on people instead of systems
- Treat "five" as a rule instead of a guideline

So even though the process looks structured, the outcome is still shallow.

In this article, we'll focus on how to actually use the 5 Whys in real situations. Not just the theory, but what it looks like when you apply it to an engineering problem.

---

## What is the 5 Whys Technique?

The 5 Whys technique is a way to break down a problem by repeatedly asking why it happened, with the goal of reaching a cause that actually explains the issue and can be addressed.

At its core, it's not about the number five. The name can be misleading. What matters is the process of following a chain of cause and effect until the explanation stops being superficial and starts becoming useful.

Each answer you uncover should move you one level deeper. You start with what went wrong, then explore what led to it, and continue until you reach something that is both believable and actionable. In most real situations, that final answer is not a single event but a gap in a system, a missing check, or an assumption that was never validated.

The technique became widely known through the Toyota Production System, where it was used to improve processes by focusing on causes rather than quick fixes.

That context is important because it highlights the original intent. The goal was not just to explain problems, but to prevent them from happening again.

A simple example makes this clearer. Imagine a mobile app suddenly starts crashing after a release. Asking "Why?" might look like this:

1. Why is the app crashing? → Because a null value is being accessed in the code.
2. Why is there a null value? → Because the API response is missing a required field
3. Why is the field missing? → Because a recent backend change made the field optional.
4. Why was this change not handled in the app? → Because the app assumes the field is always present.
5. Why was this assumption not caught earlier? → Because there are no contract tests validating API responses.

At this point, the issue is no longer just "fix the null check". The deeper problem is the lack of validation between systems, which allows breaking changes to slip through.

A useful way to think about the 5 Whys is that it forces you to stay with the problem a little longer than you normally would. Most of the time, the first explanation feels sufficient, so it's easy to stop there. This method pushes you to go one step further, and then another, until the explanation holds up under scrutiny.

At the same time, it's not a rigid formula. You might reach a solid root cause in three steps, or it might take more than five. The quality of the reasoning matters more than the count.

---

## Origins of the 5 Whys Method

The 5 Whys method comes from the Toyota Production System, a manufacturing approach focused on continuous improvement and problem solving at the source.

It's often associated with Sakichi Toyoda, whose philosophy was simple: don’t just fix a problem. Understand why it happened so it doesn't happen again.

Inside Toyota, this wasn't treated as a formal tool or checklist. It was part of the day-to-day way of working. When something went wrong on the production line, the goal wasn't to get things running quickly and move on. The goal was to stop, investigate, and make sure the same issue wouldn't repeat.

That mindset is important to understand. The 5 Whys was never meant to be a rigid exercise where you ask five questions and stop. It was a way to encourage deeper thinking and accountability in processes.

Another key idea in the Toyota system is that problems are usually caused by processes, not people. Instead of asking "who made the mistake", the focus is on "what allowed this mistake to happen". The 5 Whys fits naturally into this approach because it pushes you toward system level causes rather than individual blame.

Over time, the method spread beyond manufacturing and is now used in software engineering, product teams, operations, and many other fields. The context has changed, but the core idea remains the same: if you don't understand the cause, you're likely to see the same problem again.

This origin story is useful not just as background, but as a reminder of intent. The value of the 5 Whys doesn't come from the questions themselves. It comes from the discipline of not settling for the first answer.

---

## How to Conduct an Effective 5 Whys Analysis

A 5 Whys analysis works best when it is treated as a structured way of thinking, not a checklist to rush through. The quality of the outcome depends less on how many times you ask "why" and more on how carefully you reason through each step.

It helps to approach it in stages, each with a clear purpose.

### Step 1: Define the Problem Clearly

Start with a problem statement that is specific and observable. Avoid vague descriptions like "the system is slow" or "things are failing". Instead, describe what actually happened in a way that can be verified.

For example, "API response time exceeded 5 seconds for 30 percent of requests between 2 PM and 3 PM" is much more useful than "API is slow".

A clear problem statement keeps the analysis grounded. If the starting point is fuzzy, the entire chain of reasoning will drift.

### Step 2: Ask "Why" Iteratively

Once the problem is defined, begin asking why it happened. Each answer should directly address the question before it and naturally lead to the next one.

The key here is continuity. Every step should feel like a logical extension of the previous one. If you find yourself jumping topics or introducing unrelated explanations, it's a sign that the chain is breaking.

Keep going until the answers stop being immediate symptoms and start pointing toward underlying conditions or decisions.

Also, don't force the process to stop at five. Some problems may need fewer steps, while others may need more. What matters is reaching a point where the explanation is meaningful and actionable.

### Step 3: Validate Each Answer with Evidence

This is where many analyses go wrong. It's easy to come up with plausible answers, but plausibility is not enough.

Each "why" should be backed by some form of evidence. This could be logs, metrics, recent changes, or direct observation. If an answer can't be verified, treat it as a hypothesis and confirm it before moving forward.

Without validation, the entire analysis becomes a chain of assumptions. Even if the final answer sounds reasonable, it may not reflect reality.

### Step 4: Identify the Root Cause

A good root cause is one that explains the sequence of events and can be acted upon to prevent the issue in the future.

In many cases, this turns out to be a gap in a process rather than a single technical failure. It could be a missing validation step, an incomplete test, or an assumption that was never challenged.

If the final answer still feels like a symptom, you probably need to go one level deeper. On the other hand, if the answer points to something you can change in your system or workflow, you are likely in the right place.

### Step 5: Define Corrective Actions

The analysis is only useful if it leads to meaningful action.

Once you've identified the root cause, the next step is to define changes that prevent the problem from happening again. These should go beyond quick fixes and address the underlying issue.

For example, instead of just fixing a bug, you might introduce better testing, add monitoring, or improve review processes.

Good corrective actions share a few traits: they're specific, practical to implement, and they directly address the root cause identified in the analysis.

---

## Real-World Example: Applying 5 Whys in an Engineering Scenario

To see how this works in practice, let’s walk through a realistic backend issue. The goal here is not just to reach an answer, but to show how each step builds on evidence and leads to something actionable.

### The Problem:

Users report intermittent failures while fetching order details:

```plaintext{2}
GET /api/orders/{id}
→ HTTP 500 Internal Server Error
```

Application logs show:

```plaintext
// Java 21 example (Spring Boot style logging)
logger.error("Database connection timeout while fetching order", ex);
```

At this point, it's tempting to conclude that the database is the problem. But that's only what we can see on the surface.

### Applying the 5 Whys

#### 1. Why did the API return a 500 error?

Because the database query timed out.

This is directly supported by the error logs, so we can treat it as a confirmed fact.

#### 2. Why did the query time out?

Because the database connection pool was exhausted.

Metrics show that all available connections were in use during peak traffic.

#### 3. Why was the connection pool exhausted?

Because some requests were holding database connections for too long.

Slow query logs confirm that a subset of queries had unusually high execution times.

#### 4. Why were some queries slow?

Because a recently introduced feature added a query on a non-indexed column.

Looking at recent deployments reveals a change that introduced filtering without proper indexing.

#### 5. Why was an unoptimized query deployed to production?

Because there is no performance validation step in the development or release process.

There are no checks in code review or CI/CD to catch inefficient database queries before deployment.

### Root Cause

The issue is not the timeout itself.

It's this:

> The system allows inefficient database queries to reach production without any safeguards.

![](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/f93fb121-d5ac-45bc-8b3b-cc4f915c48a3.png)

### What a Shallow Fix Would Look Like

If we stopped early, we might:

- Increase the database timeout
- Increase the connection pool size

These might reduce the frequency of failures, but they don't solve the underlying problem.

### What a Strong Fix Looks Like

A proper 5 Whys analysis leads to changes that improve the system:

- Add appropriate indexing for frequently queried fields
- Introduce query performance checks in CI/CD pipelines
- Add monitoring and alerts for slow queries
- Include database considerations in code reviews

### Why This Example Matters

The difference between a shallow fix and a real solution is depth.

The first explanation often feels sufficient, especially under pressure. But stopping there means the issue is likely to return in a different form.

The value of the 5 Whys comes from following the chain all the way to something you can change in your system.

---

## When to Use (and When Not to Use) 5 Whys

Like any problem-solving method, the 5 Whys is useful in the right context and less effective in others. Knowing when to apply it is just as important as knowing how to use it.

If used appropriately, it can uncover meaningful insights. If used in the wrong situation, it can lead to oversimplified or misleading conclusions

### When to Use 5 Whys

The 5 Whys is most useful when your goal is to understand **why something happened**, not just to fix it and move on.

It works well in situations where problems are recurring or not fully explained by the first answer. For example, production incidents, repeated bugs, or issues that reappear after a quick fix are strong signals that you need deeper analysis. In these cases, the technique helps uncover what is happening beneath the surface.

It's also effective during retrospectives and postmortems. When a release doesn't go as expected or a sprint runs into issues, the 5 Whys helps teams move beyond observations like "this failed" and get to "why did this fail in the first place".

In general, use it when:

- The problem is not obvious
- The issue has occurred more than once
- You want to prevent recurrence, not just resolve the current instance

### When Not to Use 5 Whys

The 5 Whys has its limits, and using it in the wrong context can lead to oversimplified conclusions.

If a problem involves multiple interacting factors, a single chain of "why" questions may not capture the full picture. Complex systems often have several contributing causes, and forcing them into one linear explanation can hide important details. In such cases, the 5 Whys should be combined with other approaches.

It's also less effective when there's not enough data. If each answer is based on assumptions rather than evidence, the analysis quickly becomes unreliable. The method depends on validation at every step.

Another limitation is in time-critical situations. During an active incident, the priority is to restore the system. The deeper analysis should happen later, once things are stable.

Finally, if your goal is quantitative analysis or optimization, the 5 Whys alone isn't enough. You'll need more data-driven methods to support decision making.

A simple rule of thumb is this. If you are trying to **learn from a problem**, use the 5 Whys. If you are trying to **fix something immediately or analyze complex data**, use it carefully or alongside other techniques.

---

## Benefits of the 5 Whys Technique

The 5 Whys technique is simple, but it offers several powerful benefits that can help you solve problems more effectively and make lasting improvements. Here are the key advantages:

### Simple and Easy to Apply

One of the biggest strengths of the 5 Whys is how easy it is to start using. You don't need special tools, training, or complex frameworks. It can be applied in a quick discussion, during debugging, or as part of a formal postmortem.

This low barrier makes it accessible across teams, regardless of experience level.

### Encourages Deeper Thinking

The method naturally pushes you to go beyond the first explanation. Instead of reacting to what's visible, it encourages you to question why the problem occurred in the first place.

This shift from surface-level fixes to deeper understanding often leads to better decisions.

### Promotes System-Level Improvements

When used correctly, the focus moves away from individual people and toward systems. Instead of asking who made a mistake, the analysis asks what allowed the mistake to happen.

This leads to improvements in processes, safeguards, and overall system design rather than one-off fixes.

### Works Well in Team Settings

Because the approach is simple, it's easy for multiple people to contribute. Different perspectives help uncover gaps that might otherwise be missed.

It also creates a shared understanding of the problem, which is valuable during retrospectives and incident reviews.

### Helps Prevent Recurring Issues

Quick fixes often solve the immediate problem but don't stop it from happening again. The 5 Whys helps identify underlying causes, which makes it easier to prevent similar issues in the future.

Over time, this leads to more stable systems and fewer repeated incidents.

---

## Common Pitfalls and Limitations

While the 5 Whys technique is useful, it’s not always perfect. There are some limitations to keep in mind, so you can use it effectively and know when it might not be enough.

### Stopping Too Early

One of the most common mistakes is ending the analysis after the first or second answer. These early answers usually describe symptoms, not causes.

Stopping too soon leads to fixes that address the surface but leave the underlying issue unresolved.

### Treating Assumptions as Facts

It's easy to come up with explanations that sound reasonable. But without evidence, they're just assumptions.

If each step isn't validated with logs, metrics, or observations, the entire analysis can drift away from reality.

### Focusing on Individuals Instead of Systems

Answers like "someone made a mistake" don't add much value. While they may be true, they don't explain why the system allowed that mistake to have an impact.

Focusing on processes and safeguards leads to more meaningful improvements.

### Oversimplifying Complex Problems

The 5 Whys follows a linear chain of reasoning, but real-world systems often have multiple contributing factors.

Relying on a single chain can hide important interactions. In such cases, the method should be combined with other approaches.

### Treating It as a Rigid Formula

The name suggests asking "why" five times, but this shouldn't be taken literally. Some problems require fewer steps, while others need more.

Forcing the structure can lead to artificial or weak conclusions.

### Not a Replacement for Deeper Analysis

The 5 Whys isn't designed for every type of problem. For complex system failures, performance optimization, or data-heavy investigations, additional tools and methods are often required.

It works best as a starting point or a complement to other techniques, not a complete solution on its own.

---

## Tips for Using 5 Whys Effectively

To get the most out of the 5 Whys technique, there are a few tips that can help you use it effectively. These will guide you to ask the right questions and reach useful, actionable insights.

### Start with a Clear, Specific Problem

A vague problem leads to vague answers. Spend a little extra time making sure the problem statement is precise and based on observable facts. This keeps the analysis grounded and avoids unnecessary detours.

### Base Every Step on Evidence

Treat each answer as something that needs to be verified. Use logs, metrics, recent changes, or direct observations to support your reasoning. If something can't be validated, call it out as a hypothesis and confirm it before moving forward.

### Keep the Chain Logical and Connected

Each "why" should naturally follow from the previous answer. If the reasoning starts to jump between unrelated ideas, pause and re-evaluate. A clean, logical chain is a strong indicator that you're on the right track.

### Focus on Systems, Not Individuals

Avoid stopping at explanations that point to human error. Instead, ask what allowed that error to have an impact. This shift in thinking leads to improvements that actually reduce the chances of similar issues in the future.

### Do Not Force Exactly Five Steps

The number five is a guideline, not a rule. Some problems become clear in three steps, while others need more exploration. Stop when you reach a cause that's both convincing and actionable.

### Involve the Right People

If possible, do the analysis as a group. People from different parts of the system bring different perspectives, which helps uncover details that might otherwise be missed. It also creates shared ownership of both the problem and the solution.

### Turn Insights into Actions

The analysis only matters if it leads to change. Make sure the final outcome includes clear, practical steps that address the root cause. Without this, even a well-done analysis has limited impact.

---

## Summary

The 5 Whys is a simple technique, but using it well takes some discipline.

At its core, it's about resisting the urge to stop at the first explanation. By following the chain of cause and effect, you move from symptoms to something you can actually fix. In many cases, that turns out to be a gap in a process rather than a one-off failure.

When applied thoughtfully, it helps teams learn from problems instead of just reacting to them. Over time, this leads to better systems, fewer recurring issues, and more confidence in how problems are handled.

The key is to treat it as a way of thinking, not just a set of steps.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Symptoms to Root Cause: How to Use the 5 Whys Technique",
  "desc": "Most teams don't struggle because they can't fix problems. They struggle because they fix the wrong thing. An API fails in production. You restart the service, errors go away, and it feels resolved. U",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/from-symptoms-to-root-cause-how-to-use-the-5-whys-technique.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
