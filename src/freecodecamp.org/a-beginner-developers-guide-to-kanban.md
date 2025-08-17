---
lang: en-US
title: "A Beginner Developer's Guide to Kanban"
description: "Article(s) > A Beginner Developer's Guide to Kanban"
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
      content: "Article(s) > A Beginner Developer's Guide to Kanban"
    - property: og:description
      content: "A Beginner Developer's Guide to Kanban"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginner-developers-guide-to-kanban.html
prev: /academics/coen/articles/README.md
date: 2025-07-24
isOriginal: false
author:
  - name: Aditya Vikram Kashyap
    url : https://freecodecamp.org/news/author/wittycircuitry/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753300952223/508231c9-f0bc-4aa8-9c97-5ad4157891b9.png
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
  name="A Beginner Developer's Guide to Kanban"
  desc="First, a confession: When I was learning to code, my “workflow” was a mess. Sticky notes. Google Docs. Random Trello boards I never checked again. And a to-do list that somehow never got any shorter. Then I joined a real team. Suddenly, I was introdu..."
  url="https://freecodecamp.org/news/a-beginner-developers-guide-to-kanban"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753300952223/508231c9-f0bc-4aa8-9c97-5ad4157891b9.png"/>

First, a confession**:** When I was learning to code, my “workflow” was a mess. Sticky notes. Google Docs. Random Trello boards I never checked again. And a to-do list that somehow never got any shorter.

Then I joined a real team.

Suddenly, I was introduced to this thing called **Kanban** - and I realized I’d been treating software like a solo art project, not a process.

If that sounds familiar, you’re in the right place.

This guide will walk you through **how Kanban actually works**, how developers use it to track and prioritize work, and how it can help you stay sane when juggling bugs, features, and real-world deadlines.

Without further delay, lets get into it.

---

## So… What Is Kanban?

At its core, Kanban is a **visual way to manage work**. It helps teams (or team members) see:

- What needs to get done
- What’s in progress
- What’s finished
- Where things are getting stuck

The concept comes from lean manufacturing, but in tech, it’s often used in Agile teams that need flexibility without the structure of Scrum sprints.

Think of Kanban like a whiteboard that tells a story. Not just what’s done, but how work flows.

---

## The Classic Kanban Board: Three Simple Columns

So what exactly is a Kanban board? At its core, it’s a visual representation of your workflow - a board that shows all the work your team (or you, solo warrior) are juggling, and where each task stands.

It can be physical, like an actual whiteboard with sticky notes that move from one column to the next. Or digital, using tools like Trello, Jira, GitHub Projects, or Notion. The key is that it’s visual and up-to-date. You can walk into a room or open a tab and instantly understand: What’s being worked on? What’s ready to go? Where are things stuck?

It’s like having your brain on a wall, but organized. And slightly less chaotic.

The beauty of Kanban is how dead simple it is to get started. At minimum, your board has three columns:

| To Do | In Progress | Done |
| :--- | :--- | :--- |
| Fix CSS Layout | Add blog search bar | Set up Netlify |
| Write README | | Deploy v1 |

Each task - or **card** - moves from left to right as it gets worked on.

Let’s say your team is building a blog platform. Your Kanban board might have cards like:

- “Create signup form”
- “Fix image upload bug”
- “Deploy staging build”

Now, while Kanban is flexible, it can absolutely be taken too far.

I’ve seen boards with more columns than a Greek temple: “Needs Review,” “Pending Client Feedback,” “QA Rework Round 2,” “Blocked but Still Hopeful,” “In Existential Limbo,” and so on. Every card had six tags, three owners, two checklists, and one migraine.

The lesson? Don’t turn your board into a bureaucratic jungle.

You don’t need to account for every edge case. Start simple: “To Do,” “In Progress,” “Review,” “Done.” These basic stages cover most workflows. If you discover a real need for something more - like a dedicated “QA” column or “Blocked” column - add it intentionally, not because you feel like your board needs to look fancy.

Remember: A Kanban board should be helpful, not overwhelming. If you spend more time managing the board than doing the work on it… it’s doing the opposite of what it’s meant to do.

---

## How Developers Use Kanban in Real Life

Here’s how you might interact with a Kanban board on a dev team:

1. You pick up a card from “To Do” - let’s say, “Add dark mode toggle.”
2. You move it to “In Progress.”
3. When it’s ready for review, you might move it to a temporary “Review” or “Testing” column.
4. Once it’s merged, tested, and deployed, you move it to “Done.”
5. You smile, drink some coffee, and grab the next card.

That’s it. But over time, this process helps the whole team:

- Spot bottlenecks
- Prevent duplicate work
- Reduce context switching
- Keep everyone aligned

### What’s a WIP Limit — And Why Should You Care?

WIP = **Work In Progress**. This is the most important concept to keep us in check.

One of Kanban’s key principles is **limiting how many things you’re working on at once**. Because guess what? Multitasking kills momentum.

A typical WIP limit might look like:

- No more than 2-3 cards per person in “In Progress” Again this is best practice, but folks do pick up a lot and then they end up being the bottleneck.
- No more than 5 tasks waiting on QA.

Why? Because when everything’s urgent, nothing gets done. WIP limits force you to finish one thing before you start more - and that’s how real velocity happens.

If there are more than 5 tasks in the “To Do” column, the team doesn’t take up new ones. Instead, everyone chips in to see how they can help unclog the bottleneck. A bottleneck is your worst enemy in Kanban, and you want to resolve it so items move smoothly on time and on target.

[<FontIcon icon="fa-brands fa-youtube"/>Here’s a video](https://youtu.be/R8dYLbJiTUE?si=Hh00XXI4_1urv4Mp) recapping key concepts.

<VidStack src="youtube/R8dYLbJiTUE" />

---

## Kanban vs Scrum: What’s the Difference?

You’ve probably heard Scrum and Kanban mentioned in the same breath - and both are popular Agile frameworks. But they’re not interchangeable.

Scrum is structured, with roles like Product Owner and Scrum Master, and work gets organized into time-boxed sprints. It’s perfect for teams that benefit from rhythm and rituals - like sprint planning, daily standups, and retrospectives.

Kanban, on the other hand, is a little looser. No official roles, no set sprint timelines. Work flows continuously, and change can happen anytime. It’s perfect for teams who need more flexibility and fewer ceremonies.

So how do they compare in practice? Let’s break it down:

| **Key Differentiating Factors** | **Scrum** | **Kanban** |
| --- | --- | --- |
| Time-based | Yes - 1-2 week sprints | No - continuous flow |
| Roles | PO, SM, Developers | No specific roles required |
| Planning | Sprint planning, retros, and so on | On-demand, just-in-time |
| Cadence | Fixed sprint cycle | Flexible, ongoing |
| Use case | Complex, structured teams | Continuous delivery teams |

::: important Bottom line

- Scrum is a scheduled loop. Kanban is a living flow.
- One’s a playbook. The other’s a status window.

:::

[<FontIcon icon="fa-brands fa-youtube"/>Here’s a video](https://youtu.be/F5QIqFEDv2k?si=jvNoAiHmrv_iq-Lx) on the main differences between Scrum and Kanban you can watch if you want more detail.

<VidStack src="youtube/F5QIqFEDv2k" />

---

## So which one should you use Scrum or Kanban?

So… which one should you use?

It really depends on your team, your product, and your pain points.

✔️ If you’re working on a brand-new product where requirements shift a lot, and your team thrives with structure and routines - Scrum is likely the better fit. Sprints give you a sense of pacing, and ceremonies help ensure alignment.

✔️ If you’re managing ongoing work like bug triage, tech debt, infrastructure tasks, or anything that’s more “whenever it comes in” than “we need to ship this in two weeks” - Kanban gives you flexibility and visibility without the overhead.

And yes, there’s such a thing as **Scrumban** - a hybrid approach where teams use visual boards and WIP limits from Kanban, but keep some of Scrum’s structure like standups and retros. It’s like Agile tapas: you get the flavors that work best for your appetite.

[<FontIcon icon="fa-brands fa-youtube"/>Here is a detailed video](https://youtu.be/kiI3IweyAeQ?si=M1mtS5HCCcGcT78J) that’'ll teach you more about how Scrumban works in practice.

<VidStack src="youtube/kiI3IweyAeQ" />

Watch the Scrumban video only when you are familiar and comfortable with both Scrum and Kanban - otherwise, you might get confused from the cross-pollination of ideas and frameworks.

I personally have never seen a Scrumban implementation thats scaled well - too many folks trying too many things and none of them work. But thats just based on my experience - it may work for you and your team. I’ll let you be the judge.

---

## What Tools Do Teams Use for Kanban?

You’ve probably seen (or used) one already:

- **Trello** - Simple and great for solo or small teams
- **Jira** - Enterprise-level, customizable workflows
- **GitHub Projects** - Lightweight but powerful for devs
- **ClickUp / Asana / Notion** - Integrated with docs/tasks

Kanban isn’t tied to any one tool - you can use an app, a browser tab, or a whiteboard and a pack of sticky notes from the office supply closet. What matters is how you use it. But let’s walk through some of the most common tools and what they offer in a Kanban context:

### 🟩 Trello

Trello is probably the easiest way to start with Kanban. It gives you a simple digital board with columns and cards you can drag and drop. It’s great for devs or small teams who don’t need tons of automation - just a clean place to track work visually.

### 🟨 Jira

Jira is a heavyweight - and while it’s built for Scrum, it also supports robust Kanban boards. You can define custom workflows, use built-in reports like cumulative flow diagrams, enforce WIP limits, and manage team velocity. Ideal for large teams that need traceability, integrations, and permissions.

### 🟦 GitHub Projects

If your code lives in GitHub, GitHub Projects is a clean way to stay close to your codebase. It lets you create Kanban-style boards with issues and pull requests as cards, so you’re never toggling between tools just to track what’s in progress.

### 🟧 ClickUp / Asana / Notion

These are all-in-one productivity platforms. They combine Kanban boards with documentation, team chat, calendars, and reporting. If your team needs more than just “move card left to right,” these tools let you manage projects, meetings, notes, and workflows in one place.

### 🟪 Whiteboard + Sticky Notes

Don’t underestimate the analog approach. It’s fast. It’s visible. It’s tactile. Physically moving a task from “Doing” to “Done” gives you a sense of progress no digital tool can match. And when something’s blocked? Slap a red sticky on it and call it a day.

Bottom line: The best tool is the one your team will *actually* use. Fancy doesn’t beat consistent. And the actual tool doesn’t matter as much as the **discipline** your team has to actually use it.

---

## How to Use Kanban to Manage Your Own Coding Projects

Even if you're not on a team yet, Kanban is great for your own workflow. Here’s how you can use it to help yourself out:

1. Create a basic 3-column board (To Do, In Progress, Done)
2. Write out every task, big or small
3. Set a WIP limit (for example, no more than 2 tasks at once)
4. Update it daily. Make it a ritual.
5. Review your flow weekly - What got stuck? What moved fast?

::: tip Example:

| **To-Do** | **In Progress** | **Done** |
| --- | --- | --- |
| Fix CSS Layout | Add blog search bar | Set up Netlify |
| Write README |  | Deploy v1 |

:::

You’ll be shocked how much clearer your thinking gets when you can *see* your work. It’s simple but super powerful to visualize your work it in this way.

---

## Final Thoughts: Why Kanban Isn’t Just a Board

Kanban isn’t just a tool - it’s a mindset.

It helps you focus. It helps your team collaborate. And it gives everyone - even non-technical folks - visibility into what’s going on.

If you’re learning to code and want to feel more confident working with others, **learning Kanban is low-effort, high-impact**.

So don’t wait until your first job. Start using it now - and show up to that standup with confidence.

I hope this small 101 Guide to Kanban was helpful to you all. My sole purpose to write this was to help beginner developers understand Kanban as a practical workflow system - especially for those transitioning from solo coding to collaborative, real-world development environments. It aims to demystify the methodology in a casual, beginner-friendly tone while still offering actionable guidance.

I hope you enjoyed my beginners guide to Kanban.

Until next time, keep Learning, Unlearning and Relearning, folks….

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Beginner Developer's Guide to Kanban",
  "desc": "First, a confession: When I was learning to code, my “workflow” was a mess. Sticky notes. Google Docs. Random Trello boards I never checked again. And a to-do list that somehow never got any shorter. Then I joined a real team. Suddenly, I was introdu...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginner-developers-guide-to-kanban.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
