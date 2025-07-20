---
lang: en-US
title: "A Beginner Developer's Guide to Scrum"
description: "Article(s) > A Beginner Developer's Guide to Scrum"
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
      content: "Article(s) > A Beginner Developer's Guide to Scrum"
    - property: og:description
      content: "A Beginner Developer's Guide to Scrum"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginner-developers-guide-to-scrum.html
prev: /academics/coen/articles/README.md
date: 2025-07-24
isOriginal: false
author:
  - name: Aditya Vikram Kashyap
    url : https://freecodecamp.org/news/author/wittycircuitry/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753300058064/7046dd6c-1d9e-4f06-9ca1-65b3bb7eec83.png
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
  name="A Beginner Developer's Guide to Scrum"
  desc="Let me guess: you’re learning to code…alone. You’ve been grinding through tutorials. You've built a portfolio site, maybe deployed a few projects on GitHub. And now you're trying to land a job or join a team. Then the interviews start. Suddenly, peop..."
  url="https://freecodecamp.org/news/a-beginner-developers-guide-to-scrum"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753300058064/7046dd6c-1d9e-4f06-9ca1-65b3bb7eec83.png"/>

Let me guess: you’re learning to code…alone.

You’ve been grinding through tutorials. You've built a portfolio site, maybe deployed a few projects on GitHub. And now you're trying to land a job or join a team.

Then the interviews start.

Suddenly, people ask:

- "Are you familiar with Agile?"
- "Have you worked in a Scrum environment?"
- "What’s your experience with sprints?"

Cue the imposter syndrome. Because no one teaches this stuff in JavaScript 101. This guide is for you.

I’ll help make the Scrum process – a very common way developers work together – *make actual sense*. I’ll walk you through the basics, but also tell you what developers actually *do*, how standups feel when you're new, and what’s expected of you when you’re no longer coding in a vacuum.

Let’s break it down.

---

## What Even Is Scrum?

Scrum is not a tool. It’s not a software. It’s not some elite thing only PMs care about.

It’s a lightweight framework that helps software teams build things incrementally, together, in short focused cycles called sprints.

Scrum is used by everyone from FAANG teams to indie dev shops because it helps:

- Keep teams aligned
- Deliver working software fast
- Course-correct often
- Spot problems early (before they go nuclear)

It’s the opposite of the old-school “build for a year and pray it works” model.

---

## The Three Roles in Scrum (and Who Does What)

Scrum officially defines three roles. Here's what that means in practice:

### 1. Product Owner (PO)

Think: Vision-holder. They decide *what* the team builds and *why*. A product owner:

- Writes user stories (think of these as feature requests written from a user’s point of view)
- Prioritizes the work
- Clarifies what success looks like
- Says “yes” or “not yet” to features

### 2. Scrum Master (SM)

Think: Air-traffic controller meets therapist. They make sure the process works. The are master Facilitators, like between Dev and PO’s. A Scrum Master:

- Facilitates meetings
- Removes blockers (“Your AWS access is stuck? I’ll escalate it.”)
- Coaches the team on Scrum practices
- Doesn’t manage people – manages *flow*

### 3. Developers (YOU!)

Think: Builders. You write code, test it, ship it, fix it, and improve it. You also:

- Break down stories into tasks
- Pick up work from the team board (like Jira or Trello)
- Communicate progress
- Demo what you’ve built at the end of the sprint

You might also work with designers, testers, or DevOps folks – but within Scrum, you’re all “developers” building a product together.

---

## The Scrum Rhythm: What a Sprint Actually Looks Like

![Image Source: [<FontIcon icon="fas fa-globe"/>https://invensislearning.com/blog/what-are-scrum-ceremonies/](https://invensislearning.com/blog/what-are-scrum-ceremonies/)](https://cdn.hashnode.com/res/hashnode/image/upload/v1752809790048/253fd92b-1ebe-4f3e-bfbc-48719676dc82.png)

### Understanding the Scrum Cycle

So, what does it *actually* look like when a team uses Scrum to build software?

Let’s walk through a full sprint – not just the buzzwords, but what really happens when a group of humans tries to plan, build, review, and improve together. Think of this as your backstage pass to the rhythm of modern teamwork.

### 📦 Step 1: Build and Refine the Product Backlog

Before any coding starts, the team needs to agree on *what* they might build – not just this week, but in the near future too.

That’s where the **Product Backlog** comes in. This is a big, running list of everything the product might need – features, bug fixes, improvements, ideas, and maybe a few wild dreams. It’s like the wishlist for the product, but more organized (ideally).

The Product Owner is responsible for maintaining and prioritizing this list. They decide what’s most important to work on based on customer needs, business goals, and feedback.

But the PO doesn’t do this in isolation. Enter the **Backlog Refinement meeting**.

In these sessions, the Scrum Team – that’s the PO, the Scrum Master (SM), and the Developers – come together to:

- **Review** the most important upcoming items
- **Clarify** any vague or confusing parts of each task
- **Break big items** down into smaller, buildable pieces called **user stories**
- **Estimate effort** (how much time or complexity is involved for each story)

This meeting makes sure the team isn’t caught off guard in the sprint – that they understand the work ahead and can actually start sprinting when the time comes.

### 🧭 Step 2: Sprint Planning – What Are We Building This Time?

Now that we’ve got a solid backlog, it’s time to pick what to build *right now*.

At the start of each sprint (which typically lasts 1 to 4 weeks), the team holds a **Sprint Planning meeting**. This meeting sets the stage for the entire sprint – it’s like the huddle before the big game.

In Sprint Planning, the team:

- Reviews the top items from the backlog
- Discusses what can realistically be completed based on their availability and capacity
- Chooses a handful of these stories to commit to
- **Defines a Sprint Goal** – a simple statement that captures the purpose of this sprint

::: tip Example

For example, the Sprint Goal might be:

🎯 *“Allow users to reset their passwords.”*

:::

Every user story chosen should contribute to that goal. The collection of these stories becomes the **Sprint Backlog** – basically, the to-do list for the sprint.

So when we say:

“The team selects an ordered list of user stories to comprise the Sprint Backlog for the next sprint, which will be achievable to satisfy the Sprint Goal...”

We’re really just saying:

👉 *“Pick a realistic number of important tasks that, if completed, will help us hit our target for the sprint.”*

Not too vague. Not too ambitious. Just achievable and focused.

### ☀️ Step 3: Daily Standups – Stay in Sync

Now the sprint is underway! But how does everyone stay aligned and avoid working in silos?

That’s where the **Daily Standup** comes in. Every day – usually in the morning – the team has a quick check-in (about 15 minutes) where each person answers three questions:

1. **What did I do yesterday?**
2. **What am I working on today?**
3. **Is anything blocking me?** (that is, am I stuck?)

::: tip Example

“Yesterday I set up the login API integration. Today I’ll work on the UI validation. I’m blocked on getting access to the staging database — may need help.”

:::

These standups keep the team in sync and surface blockers early so they can be addressed quickly. They’re not about micromanaging or showing off. They’re about visibility and support.

### 📉 What’s a Sprint Burndown Chart?

You might hear your team mention a “burndown chart.” No, this isn’t about things going down in flames (hopefully).

A **Sprint Burndown Chart** is a graph that shows how much work is left in the sprint – day by day.

- The **y-axis** is the amount of work remaining (often measured in story points or tasks)
- The **x-axis** is the number of days left in the sprint

The line should ideally trend downward as work gets completed – hence “burning down.” If it flattens out or slopes up, that’s a red flag that the team might be stuck, behind schedule, or not updating the board.

Think of it as a visual heartbeat of the sprint. You can learn more via a practical example [in this video](https://youtu.be/2K84aZn9AY8?si=tS8oMGxVD0CYtnlw).

### 🖥️ Step 4: Sprint Review – Show What You’ve Built

At the end of the sprint, the team holds a **Sprint Review** (also called a “demo”). This is where you show what was actually built during the sprint.

- The **Developers** demo working features – live, not just screenshots
- The **Product Owner** reviews whether the Sprint Goal was achieved
- Stakeholders may ask questions, give feedback, or suggest tweaks

This meeting isn’t just for show – it’s a feedback loop. It helps the team validate that what they built is useful, usable, and meets expectations. If changes are needed, those get added to the backlog for future sprints.

### 🔍 Step 5: Sprint Retrospective – Look Back to Move Forward

Once the review is done, the team shifts focus from *what* they built to *how* they worked together.

Enter the **Sprint Retrospective** – a meeting to reflect on the process, not the product.

The team discusses:

- ✅ What went well
- ❌ What didn’t go so well
- 🔁 What could be improved next time

This isn’t about pointing fingers. It’s about learning, adapting, and continuously improving how the team collaborates.

The **Scrum Master** often facilitates this meeting and helps turn feedback into action items for the next sprint. For example:

“We underestimated testing time. Next sprint, let’s budget for QA earlier.”

The best teams take retros seriously. Why? Because even if your code is perfect, your *process* needs tuning too – and small process changes often lead to big gains.

### ♻️ Scrum Is a Loop

Here’s the rhythm:

1. Plan the sprint
2. Check in daily
3. Build and demo the product
4. Reflect and improve

Then do it all over again – with slightly better coordination and slightly more trust each time.

It’s not about being fast. It’s about being intentional, consistent, and collaborative.

### Example Sprint

Let’s say, for example, that your team does 4-week sprints. (Keep in mind that Sprints can differ by team, nature of product, release cycles, and so on.)

Here’s the rough beat:

| **Week** | **What Happens (Sprint Ceremonies)** | **Your Role** |
| --- | --- | --- |
| 1 | **Sprint Planning** | Help estimate effort, pick what to build |
| 1-4 | **Daily Stand ups** (15 mins) | Share what you’re doing & any blockers |
| 1-3 | **Development Time** | Code, test, commit, fix, push, repeat |
| 3.5-4 | **Sprint Review** | Demo what you built |
| 4 | **Sprint Retrospective** | Reflect on how the sprint went as a team |

Scrum works in **loops**. Every 2-4 weeks (depending on your cadence and sprint cycle), your team should have working, demo-able software to show for it – even if it’s small.

And no, it’s not about “speed.” It’s about consistency, communication, and collaboration.

---

## Who attends the Ceremonies

| **Ceremony** | **Who Attends** | **Why They’re There** |
| --- | --- | --- |
| **Sprint Planning** | Product Owner (PO), Scrum Master (SM), Development Team | To define what will be delivered and how the work will be accomplished |
| **Daily Standup** | Development Team, Scrum Master (optional), PO (optional) | To sync on progress, share blockers, and coordinate efforts |
| **Sprint Review** | Development Team, Scrum Master, Product Owner, Stakeholders | To demo the work, get feedback, and assess if goals were met |
| **Sprint Retrospective** | Development Team, Scrum Master, Product Owner (optional) | To reflect on the process, identify what worked/what didn’t, and improve the next sprint |
| **Backlog Refinement** | Product Owner, Development Team, Scrum Master (optional) | To clarify upcoming stories, estimate work, and prepare for future sprint planning |

Now lets dive deeper and understand practically how each of these ceremonies work:

---

## Standups: Where You Talk Like a Human, Not a Robot

So how does the team actually stay connected day to day? That’s where standups come in.

Every morning, your team meets briefly – usually on Zoom or in a circle – and you answer 3 questions:

1. What did I work on yesterday?
2. What will I work on today?
3. What’s blocking me? Any impediments?

::: tip Example:

"Yesterday I cleaned up the signup validation logic. Today I’m working on the email verification flow. I’m stuck on SendGrid config – might need help setting up credentials."

:::

It’s not about impressing anyone. It’s about keeping everyone in sync. Some days you’ll say, “I spent the whole day debugging a CSS bug that turned out to be a semicolon.” That’s okay.

How does it work?

The Scrum Master gathers everyone in a huddle room, the PO and Dev Team included, and opens the the Standup. They are the facilitator of the ceremony. Everyone gets a chance to answer the 3 questions above (usually about 2-5 minutes each). It’s not a full report – it’s quick. When one person is done, they pass it on to someone else.

This ensures there is team cohesion and transparency.

[<FontIcon icon="fa-brands fa-youtube"/>Here is a video example of a standup](https://youtu.be/q_R9wQY4G5I?si=W1AcvcLXB-mnUM1f).

<VidStack src="youtube/q_R9wQY4G5I" />

---

## Sprint Planning

The goal of the planning meeting is to answer the questions “What are we going to work on, and how are we going to do it?” It is critical for the team to have a shared goal and a shared commitment to this goal before beginning this ceremony.

Participants should:

- Measure growth
- Sync with the Scrum Master
- Sync with the Product Owner

Sprint planning happens just before the sprint starts, and usually lasts for an hour or two. In this meeting, the team goes over a collection of **user stories** and discuss, plan, measure, and prioritize. This is where they decide what is going to be in scope for their upcoming sprint cycle.

The Product Owner will have a prioritized view of things in the backlog. They work with the team on each object or customer experience. Together, as a group they go through and make calculations, deciding to what they can commit.

---

## What’s a User Story and Why Does It Sound Like a Children’s Book?

So you might be wondering: how do you know what to work on? What to build? So much work, so little time? Thats where **user stories** come in.

In Scrum, teams don’t just write vague tasks like “code the login.” Instead, they write user stories – short, human-centered feature descriptions that describe what the user needs, why they need it, and what success looks like.

Here’s an example:

*As a user, I want to be able to reset my password, so I can access my account if I forget it.*

User stories are the scaffolding of teamwork. They’re written with empathy, not just efficiency. And each one comes with **acceptance criteria** – a checklist that clarifies what “done” actually means:

- A “Forgot Password” link is visible
- Clicking it shows a form
- An email gets sent with a reset link

Once a story is agreed upon, developers break it down into tasks, like “build form,” “hook into backend,” or “handle email validation.” It’s collaborative, not prescriptive. And user stories have priority so you know what’s the most important and what’s the least.

A helpful rule of thumb many teams use is the [Gherkin-style "Given–When–Then" (<FontIcon icon="fa-brands fa-medium"/>`nic`)](https://medium.com/@nic/writing-user-stories-with-gherkin-dda63461b1d2) format:

- **Given** some initial context
- **When** an event occurs
- **Then** a specific outcome should happen

This ensures that everyone – devs, testers, and product owners – shares the same understanding of behavior and expectations.

[<FontIcon icon="fa-brands fa-youtube"/>Here is a great video example](https://youtu.be/7hoGqhb6qAs) thats outlines how to draft effective and powerful user stories.

<VidStack src="youtube/7hoGqhb6qAs" />

---

## What Counts as “Done”? Definition of Done and Why It’s Important

Now you might be wondering – how do I know when a task is done and can be closed out?

The **Definition of Done** is a type of documentation in the form of a **team agreement**. The Definition of Done identifies the conditions that need to be achieved in order for the product to be considered done (as in **potentially shippable**).

This is how we know that we "did the thing right". Meaning, we built the correct level of quality into the product. The Definition of Done is not the same as the acceptance criteria, which are written by the product owner to help us know we did the "right thing".

Every team has a Definition of Done – it’s not just “I pushed code.” It could mean:

- Code is written
- Reviewed by a peer
- Merged into main
- Tested on staging
- Possibly deployed

This clarity keeps teams honest and accountable. No “it works on my machine” energy here. The DoD sets a quality bar. It prevents ambiguity, rework, and “it works on my machine” moments. When every card on the board passes the same finish line, teams move faster – and trust each other more.

Everyone should know what done is in a team. Either its Done as per DoD standards or its not.

[<FontIcon icon="fa-brands fa-youtube"/>Here is a beautiful video](https://youtu.be/pYOJyQoBT3U?si=nVygkQQx79NaAOo4) highlighting the impotence of DoD.

<VidStack src="youtube/pYOJyQoBT3U" />

---

## Demos, Retros, and Saying the Hard Things

Once you’ve built the product, then comes demos (showcasing your work) and retros (analysis as a team on what when well and what areas to improve on).

In the retro, everyone’s encouraged to speak up:

- What went well?
- What didn’t?
- What should we try next time?

::: tip Example:

“We missed a lot of stories because we didn’t account for testing time. Maybe we buffer next sprint with fewer tasks.”

:::

The goal is not to blame – it’s to *improve*. Over time, this feedback loop becomes gold. The Scrum Master usually facilitates, collects feedback (via tools like Parabol, Miro, or sticky notes), and helps turn insights into actionable experiments for the next sprint.

Over time, retros become the heartbeat of team evolution.

[<FontIcon icon="fa-brands fa-youtube"/>Here is a video](https://youtu.be/5eu1HotNmWs?si=1DZaSmztB6rHyawj) highlighting the importance of a Retro and Sprint Review.

<VidStack src="youtube/5eu1HotNmWs" />

### 🧠 Why Retrospection Matters More Than You Think

The Sprint Retrospective is more than just another meeting. It’s a mirror for your team – a safe, structured space to pause, reflect, and improve together.

You discuss:

- ✅ what went well
- ❌ what did not go well
- 🔁 what could we do better next time

Great teams don't just deliver great software, they continually deliver better ways of working.

This is why many experienced Scrum practitioners consider the retro to be the most important event in Scrum. Code is deployed once, but process improvements grow exponentially, sprint after sprint.

---

## Tools You Might Encounter

Scrum doesn’t require software, but real-world teams use a variety of tools:

- **Jira** – Tracks sprints, issues, velocity
- **Trello** – Simple board, good for small teams
- **Slack** – Where standups often happen if async
- **Notion / Confluence** – Docs, retros, notes
- **GitHub Projects** – Lightweight planning for devs

Don’t worry if you’re not fluent in these yet. They’re tools – you’ll learn them on the job.

---

## If You’re Preparing for a Job, Here’s What You Can Do

- ✍️ Practice writing user stories from your side projects
- 🧪 Run a mini-sprint: Plan your weekend project, set goals, and “review” it at the end
- 🤝 Contribute to an open-source project that uses Scrum or Agile workflows
- 🧾 Write about what you learned – maybe as a tutorial (*hint hint*)

---

## Final Thoughts

So to recap, Scrum is a simple yet powerful way for teams to work together, stay organized, and deliver results quickly. It runs in short cycles called **sprints**, where the team plans what to do, checks in daily, shows their progress at the end, and reflects on how to improve.

The four key ceremonies – **Sprint Planning**, **Daily Scrum**, **Sprint Review**, and **Sprint Retrospective** – help keep everyone aligned and focused. With clear roles and regular feedback, Scrum makes it easier to handle changes, solve problems early, and continuously get better as a team.

But scrum isn’t a magic spell. It’s just a way for humans to build complex things – together – without falling apart.

You don’t need to be a Scrum Master. You don’t need a certification. But if you understand how sprints work, what’s expected of you, and how to show up to meetings with clarity and candor, you’re 10 steps ahead of most.

Scrum helps teams talk, plan, build, and learn. And now? You can too.

If you liked this, please do share. You never know who it might help out.

Until then…keep learning, unlearning, and relearning!!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Beginner Developer's Guide to Scrum",
  "desc": "Let me guess: you’re learning to code…alone. You’ve been grinding through tutorials. You've built a portfolio site, maybe deployed a few projects on GitHub. And now you're trying to land a job or join a team. Then the interviews start. Suddenly, peop...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginner-developers-guide-to-scrum.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
