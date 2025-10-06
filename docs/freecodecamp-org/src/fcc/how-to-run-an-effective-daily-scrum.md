---
lang: en-US
title: "How to Run an Effective Daily Scrum - Tips for Team Members and Managers"
description: "Article(s) > How to Run an Effective Daily Scrum - Tips for Team Members and Managers"
icon: fas fa-user-tie
category:
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run an Effective Daily Scrum - Tips for Team Members and Managers"
    - property: og:description
      content: "How to Run an Effective Daily Scrum - Tips for Team Members and Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-run-an-effective-daily-scrum.html
prev: /projects/career/articles/README.md
date: 2025-01-18
isOriginal: false
author:
  - name: Ben
    url : https://freecodecamp.org/news/author/justanothertechlead/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737127993830/ea473796-6a68-48f2-8643-f533561e12cf.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run an Effective Daily Scrum - Tips for Team Members and Managers"
  desc="Let’s start with a simple question: Why do we get together for a short meeting each day?  If you work on a Scrum team, you’ve probably heard of a daily scrum, sometimes called a daily stand-up. It’s one of the key events in scrum. The “daily” usually..."
  url="https://freecodecamp.org/news/how-to-run-an-effective-daily-scrum"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737127993830/ea473796-6a68-48f2-8643-f533561e12cf.png"/>

Let’s start with a simple question: Why do we get together for a short meeting each day?

If you work on a Scrum team, you’ve probably heard of a daily scrum, sometimes called a daily stand-up. It’s one of the key [<VPIcon icon="fas fa-globe"/>events in scrum](https://justanothertechlead.com/agile/scrum-events-a-tech-leads-guide-to-effective-scrum/).

The “daily” usually takes place around the same time every day, and it should last around 15 minutes.

At first glance, it seems straightforward. When it’s your turn, you answer three basic questions. Job’s done, right?

Well, without a structure and someone to enforce that structure, a 15 minute daily meeting can turn in to a 45 minute chat.

---

## What Is the Daily Scrum?

Scrum teams use the daily scrum to align and share their efforts.

Each person usually answers three questions:

1. **What did I do yesterday to help the team meet its goal?**
2. **What do I plan to do today to help the team meet its goal?**
3. **Are there any obstacles in my way?**

I call these the “classic three.” Yesterday, Today, Blockers.

From this explanation, if you’ve never attended a daily scrum, you might assume it’s just a trivial and pretty pointless meeting. But it can highlight important issues in real time.

For instance, if someone says, “I’m stuck waiting for a database script to finish,” the rest of the team can suggest a workaround.

Or if the product owner says, “We need to shift a feature’s priority,” everyone learns about it immediately.

---

## Why Keep the Scrum Short?

In theory, the daily scrum lasts 15 minutes, give or take. Yet, many teams allow it to stretch to half an hour or more.

That’s risky.

When these meetings grow too long, people lose interest. Also, they might skip the next one, feeling like it’s a waste of time.

Beyond this, brevity encourages people to share only what matters most.

If someone dives into intricate details, it might derail the conversation.

This is not the space for describing every table in your database schema. It’s a moment to share your progress, highlight your plan, and let your teammates know if you’re blocked.

---

## The Three Essential Questions

The daily scrum usually follows the same pattern. It’s predictable, and that’s a good thing.

Let’s expand on each question:

1. **Yesterday’s Tasks**: This is an update on what you finished. For instance, I might say, “I set up the new testing environment for our user login feature.” That helps the rest of the team see how tasks are progressing and whether I’m finishing my part of the sprint goal.
2. **Today’s Plans**: Next, we share what we’re about to tackle. For example, “Today, I’m going to fix a bug in the payment service.” That piece of information helps everyone see how the day’s work lines up with the sprint backlog.
3. **Blockers**: This is a crucial point. If something is stopping me from completing my tasks, I mention it here. Let’s say, “I need access to the staging environment, but I’m waiting on a permissions update to give me access.” This means if anyone on the team can fix that, we speed up progress.

In my teams, we usually have the Jira board open and associate each person’s update with the related story. This gives people a little more context. You don’t have to do this though - my teams just find it helpful.

---

## How to Prevent the Scrum from Turning into a Status Meeting

A daily scrum is not just a status report. It’s a chance for the team to realign quickly.

But some managers treat it as a time to see who is on track. That can shift the focus away from cooperation. On the other hand, a team might treat it like a casual hangout without any structure. These extremes usually lead to frustration.

### What’s the sweet spot?

It’s where the team focuses on tasks that lead to the sprint goal while also offering quick help when people get stuck.

The meeting should be about collaboration and the scrum team’s needs, not about pleasing a manager.

Also, if something requires a deeper talk, schedule a follow-up. For instance, you might say, “Let’s finish the stand-up, then we can chat about the modeling question after”.

If you find that your stand ups are getting too long, you as a team need to discuss why this is happening in the [<VPIcon icon="fas fa-globe"/>sprint retro](https://justanothertechlead.com/agile/sprint-review-vs-retrospective-a-real-world-guide-to-the-difference/) and adjust.

---

## A Typical Example of a Smooth Daily Scrum

Let’s paint a quick picture.

The team is working on a feature that handles user registration and payment processing. Each day, the daily scrum goes like this:

1. **Developer A:**
    - Yesterday, I cleaned up the user registration form.
    - Today, I’ll add form validation for email.
    - I’m blocked by a missing API key, so if someone can share that, I can move forward.
2. **Developer B:**
    - Yesterday, I tested the payment integration.
    - Today, I’ll fix a bug I found during testing.
    - No blockers.
3. **QA Engineer:**
    - Yesterday, I automated tests for the cart service.
    - Today, I’ll check the new user registration form.
    - No blockers, but I want to set up a quick chat about test coverage soon.

The entire process finishes in around 10 minutes. After the scrum, Developer A and Developer B might stay behind to swap that missing API key. Everyone else dives into their day. That’s it—short, sweet, and useful.

---

## Common Problems That Disrupt the Daily Scrum

Let’s discuss a few pitfalls I’ve seen crop up over the years:

1. **Going off on tangents**: For instance, a developer might begin describing the entire architecture of a new microservice. The rest of the team is left wondering how that affects them.
2. **Trying to solve every issue in real time**: The daily scrum is not the place to debug code or solve other issues as a group. If something complex needs discussion, note it and talk after the stand-up with the interested parties.
3. **Waiting for latecomers**: Starting late can quickly become a habit. If people learn that the meeting really begins at 9:05, they start arriving at 9:10. The easiest fix is to start on time. People usually adapt once they see you’re serious.
4. **No one mentions blockers**: Sometimes, folks feel uncomfortable admitting a problem in front of the team. If that happens, the daily scrum loses its value. This meeting is precisely where you should feel safe to say, “I’m stuck here.”
5. **Too many people in the meeting**: In certain organizations, multiple teams join one daily scrum. That can lead to confusion. It’s better to keep each daily scrum small and focused. If you have a big project, you might break out into smaller Scrum teams.

---

## Tips for Keeping the Meeting on Track

There are various ways you can help keep a daily scrum from devolving into a long, drawn-out meeting.

First, make sure you stick to 15 minutes (or shorter). A timer can really help. Some teams use an actual countdown on a screen, which can be fun. If you find that it’s consistently longer, it may be a sign that you have too many people, your team members need reminding about the format, and so on.

Second, make sure you have a capable leader who understands how to manage the scrum. Often, the scrum master or team lead can step in if the conversation strays. They might say, “Good point. Let’s park that for later.” This ensures the scrum doesn’t balloon into a brainstorming session.

You should also make sure the team is focusing on its sprint goals during the meeting. In addition to sharing tasks, remember why you’re doing them. For instance, if you know the sprint goal is to launch a new checkout flow, keep that in mind. This will help streamline everyone’s three questions.

Next, make sure you promote a culture of help. If someone mentions a blocker, invite the group to see who can help. This is a practical approach that fosters teamwork.

And finally, it can be helpful to use the scrum board. This board—whether physical or digital—helps people visualize progress. If your tasks are on sticky notes or in a tool like Jira, you can quickly show which tasks are done, in progress, or awaiting review.

---

## Practical Ways Managers Can Support the Daily Scrum

Some folks ask if managers should attend the scrum every day. There’s no strict rule, but if you do join, here are some things to keep in mind to help your team stay on track.

First, make sure you let the team speak. The daily scrum is for the development team to share their plan and blockers. You as a manager should avoid turning it into a performance check.

Next, try to observe any ongoing or developing patterns. The manager can spot trends. For instance, if a certain issue keeps popping up, they might escalate it or allocate more resources toward solving it.

And try to offer help without dominating the meeting. The moment you sense a roadblock your position can solve—like a missing budget approval—step in. Otherwise, let the team own the meeting.

---

## Frequently Asked Questions

::: details 1. How strict is the 15-minute rule?

Pretty strict if you can help it. If your team is small, you may finish in even less time.

:::

::: details 2. Do we need to stand physically?

Some say it keeps the meeting short. Others aren’t able to stand, or prefer to sit. In my teams, the goal is brevity, so sitting or standing doesn’t matter as much. We also usually have a hybrid stand up where some people are in the office and some aren’t. For this, we all attend virtually.

:::

::: details 3. What if we have nothing new to say?

That’s fine. A quick “No updates, no blockers” is perfectly acceptable. The meeting might take only five minutes. Great—everyone can get back to work sooner.

:::

::: details 4. Do we ever skip the daily scrum?

Some teams do skip if everything is stable. I never do though, because it confirms that no new blockers have emerged. It’s like a brief pulse check. If there’s nothing to share, the meeting won’t last long anyway.

:::

::: details 5. Who speaks first?

Some teams pass a “talking stick” around in a circle. Others follow the order of tasks on the board. I’ve even seen teams do it alphabetically. I also like to mix it up by playing the “nomination game” where the person speaking nominates the next person. The method doesn’t matter, as long as everyone gets a turn. I do like to mix the ordering up though as it keeps the meeting a little “fresh”.

:::

---

## Conclusion

The daily scrum can be one of the most helpful parts of Scrum if it’s done right. It helps with open communication, early detection of blockers, and a sense of shared ownership.

Also, it reminds us what we’re aiming to achieve as a team (the sprint goal), which is easy to forget when everyone’s heads are down coding or testing.

Above all, keep it simple. Focus on yesterday’s progress, today’s plan, and any obstacles in your path.

If you need deeper conversations, schedule them right after the scrum with the people who care most about the topic. That way, you respect everyone else’s time.

::: info Ben

Follow me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`jatechlead`)](https://x.com/jatechlead), [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`justanothertechlead`)](https://youtube.com/@justanothertechlead) and [<VPIcon icon="fas fa-globe"/>JustAnotherTechead](https://justanothertechlead.com/).

```component VPCard
{
  "title": "Just Another Tech Lead - Software Engineering Leadership %",
  "desc": "Documenting and exploring the world of leadership in tech",
  "link": "https://justanothertechlead.com/",
  "logo": "https://justanothertechlead.com/wp-content/uploads/2024/10/Logo-300x300.webp",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run an Effective Daily Scrum - Tips for Team Members and Managers",
  "desc": "Let’s start with a simple question: Why do we get together for a short meeting each day?  If you work on a Scrum team, you’ve probably heard of a daily scrum, sometimes called a daily stand-up. It’s one of the key events in scrum. The “daily” usually...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-run-an-effective-daily-scrum.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
