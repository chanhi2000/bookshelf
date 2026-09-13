---
lang: en-US
title: "Four Years of Writing Every Week"
description: "Article(s) > Four Years of Writing Every Week"
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
      content: "Article(s) > Four Years of Writing Every Week"
    - property: og:description
      content: "Four Years of Writing Every Week"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogfour-years-of-writing-every-week.html
prev: /academics/system-design/articles/README.md
date: 2026-09-05
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_210.png
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
  name="Four Years of Writing Every Week"
  desc="Four years ago this week, the first issue of this newsletter landed in a few hundred inboxes."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techblogfour-years-of-writing-every-week"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_210.png"/>

Four years and 210 weekly issues taught me more than the topics did. The four lessons I keep coming back to are the ones this issue walks through: consistency beats brilliance, teaching is the fastest way to learn, the fundamentals outlast the frameworks, and your audience is smarter than you think. I also want to talk about AI, because the next four years of this job will not look like the last four.

Four years ago this week, the first issue of this newsletter went out.

Two hundred and ten Saturdays later, something has landed in your inbox almost every single week. Whether I was traveling, sick, buried in work, or completely out of ideas.

I want to do something different this week. Instead of an EF Core trick or an architecture deep dive, I want to step back and talk about what writing four years of these actually taught me. The lessons turned out to be bigger than the topics.

![Timeline of four years of the newsletter, from issue 1 in September 2022 with a few hundred readers to issue 210 in September 2026 with over 66,000 readers, with the releases of .NET 7 through .NET 10 marked along the way and .NET 11 just past the end](https://milanjovanovic.tech/blogs/mnw_210/four_year_timeline.png)

---

## I Almost Didn't Make It Past Issue 10

The first issues were rough.

I wasn't sure anyone wanted to read what I had to say. I'd write something, second-guess it, rewrite it, and hit send with my stomach in a knot. A few people replied, most didn't, and there were weeks I was convinced I'd run out of things to write about by issue 20. What kept me going was a decision I'd already made: **one issue, every week, no exceptions.** Motivation alone would never have done it, because motivation shows up when you don't need it and vanishes when you do.

That decision did more for my career than any single piece of code I've ever written. I wrote about that same itch to build in [**The Urge to Build Something**](/milanjovanovic.tech/the-urge-to-build-something.md), and this newsletter became the longest-running thing I've ever built.

---

## Lesson 1: Consistency Beats Brilliance

Not one of these 210 issues was perfect. Some I'm proud of, some I'd rewrite completely, and a few I'd quietly delete.

But **the brilliant issue you never publish helps no one.** The decent issue you ship every single week, for four years, compounds into something neither of us could have predicted at the start.

It's the same lesson I keep relearning in software. The clever architecture that ships to production in eighteen months loses to the boring one that ships to production every two weeks.

If you're sitting on a blog post, a side project, or a talk you haven't given, this is the only advice that matters: start, and then don't stop. Quality grows out of quantity.

---

## Lesson 2: Teaching Is the Fastest Way to Learn

I thought I understood things, until I tried to explain them to thousands of developers who would absolutely email me when I got it wrong.

You can hold a fuzzy, half-correct model of a concept in your head for years and never notice the gaps. The moment you sit down to write 1,500 clear words about it, every gap suddenly becomes obvious. Why does this pattern exist? What problem does it actually solve? When would I *not* use it?

A huge amount of what I know about .NET, architecture, and system design, I learned *because* I had to explain it on a deadline. Writing the newsletter forced me, week after week, to actually know the things I thought I already understood.

If you want to understand something deeply, teach it. Write the post, record the video, or **explain it to a junior on your team**. Writing the explanation is where the learning happens.

---

## Lesson 3: The Fundamentals Outlast the Frameworks

Look back across four years and you'll see the surface change constantly. .NET 6 became 7, then 8, then 9, then 10, and .NET 11 is right around the corner. Libraries came, [**went commercial**](/milanjovanovic.tech/mediatr-and-masstransit-going-commercial-what-this-means-for-you.md), and got replaced. Patterns I championed, I later qualified.

But the advice I keep giving hasn't changed since issue 1:

- **Start with a modular monolith.** You can extract a service later, but you can't easily un-distribute a system. Split when something concrete forces you to (a team blocked on every deploy, a module with its own scaling needs), not because the monolith feels messy. I believe this enough that I built [**an entire course**](/milanjovanovic.tech/modular-monolith-architecture/README.md) around it.
- **Keep business rules inside the domain model.** A rule that lives in a controller or a request handler gets duplicated the day a second caller needs it, and the copies drift apart. The model enforces it once.
- **Treat your API as a long-term contract.** Consistent error responses, pagination, and versioning cost you an afternoon on day one. Retrofitting them after clients depend on the API costs you months. That thinking became [**Pragmatic REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md).
- **Assume every network call will fail.** Which means retries, and retries mean [**idempotency**](/milanjovanovic.tech/implementing-idempotent-rest-apis-in-aspnetcore.md) and the [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md) for anything that publishes messages.

That list was true in issue 1, and it'll be true in issue 420. Spend most of your learning budget on the things that don't expire. The new syntax is the easy part once the underlying ideas are solid.

---

## Lesson 4: Your Audience Is Smarter Than You Think

Some of the best thinking in these four years didn't come from me. It came from your replies: the corrections, the "have you considered…" emails, the pushback when I oversimplified, the war stories from production systems far bigger than anything I've run. Every time I wrote something a little too confidently, someone wrote back with the nuance I'd missed, and the next issue was better for it.

Writing in public is the best feedback loop I've ever found. It's terrifying to be wrong in front of an audience, and it's the fastest way to get less wrong.

Thank you for being demanding readers. You made me a better engineer.

---

## What This Newsletter Actually Became

I started writing to share a few .NET tips. Somewhere along the way it became the spine of everything else: the videos, the courses, the community, this whole second career I never planned. The YouTube channel turned four this year too, and I told that side of the story in [<VPIcon icon="fa-brands fa-youtube"/>What 4 Years on Tech YouTube Taught Me](https://youtu.be/Acm-49EbSzI).

But strip all that away and the core is still just this: every week, I try to explain one thing clearly to people who want to get better at their craft. That's it. That's the whole job, and it's the most rewarding work I've ever done.

When someone emails to say a piece helped them pass an interview, ship a system, or finally understand something they'd struggled with for years, that never gets old. That's the reason there's a 210th issue at all.

---

## What About AI?

I can't write a four-year retrospective in 2026 and not talk about AI.

When issue 1 went out, AI meant a slightly smarter autocomplete. Today, coding agents write a growing share of new code, and the argument has moved on to whether a human should even read the output. [<VPIcon icon="fa-brands fa-youtube"/>Uncle Bob](https://youtu.be/sClTAvkQDOU), the author of Clean Code, says he stopped reading the code his agents write. I recorded my reaction to that one, because I think it's the most interesting question in software right now.

I'm very bullish on AI. I've spent a good part of this year going deep on agentic coding, and I shared my whole setup in a video I called **Tokenmaxxing: My Claude Code Workflow**.

Notice what AI didn't change on the list of lessons above.

The fundamentals became the review checklist. Whether a human or an agent wrote the code, I ask the same questions: does this rule belong in the domain model, will this change break an existing API client, what happens when this call fails. The agent changes how fast the code appears, not what makes it correct.

And teaching turned out to be the perfect preparation. Directing an agent well is mostly the skill this newsletter forced me to practice for four years: explaining a problem clearly enough that someone else can act on it.

Expect more AI in these issues going forward.

---

## Thank You

I don't say this enough, so let me say it plainly.

Thank you for reading. Thank you for the four years. Thank you for forwarding issues to teammates, for replying with your own hard-won lessons, for trusting me with a few minutes of your Saturday. Some of you have been here since the early, rough issues. Some of you joined last Tuesday. Either way, you're the reason this exists.

I have no plans to stop. There are at least 200 more issues of ideas rattling around, and the urge to build, to explain, and to share hasn't faded one bit.

So here's to the next four years. Same deal as always: one issue, every week, no exceptions.

If you've gotten value from these over the years and want to go deeper into the way I actually build software, that's exactly what I put into [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md).

---

## Frequently Asked Questions

::: details How do you write a newsletter consistently every week?

Make the decision once instead of relying on motivation: one issue, every week, no exceptions. Motivation is unreliable; it shows up when you do not need it and vanishes when you do. A commitment made in advance carries you through the weeks when nothing else does.

:::

::: details Why is teaching the fastest way to learn something?

You can hold a fuzzy, half-correct model of a concept for years and never notice the gaps. Sitting down to explain it clearly, in writing or to a junior, lights up every gap: why the pattern exists, what problem it solves, when not to use it.

:::

::: details Is consistency more important than quality when publishing content?

The brilliant piece you never publish helps no one, while a decent one shipped every week for years compounds. The same holds in software: the clever architecture that ships in eighteen months loses to the boring one that ships every two weeks. Quality grows out of quantity.

:::

::: details Should developers focus on frameworks or fundamentals?

Frameworks change constantly while the durable advice barely moves: start with a modular monolith and split only when something concrete forces you to, keep business rules inside the domain model, treat your API as a long-term contract, and assume every network call will fail. Spend most of your learning budget on the things that do not expire; new syntax is easy once the ideas are solid.

:::

::: details What are the benefits of writing in public as a developer?

It is the best feedback loop available. Readers send corrections, nuance, and war stories from production systems bigger than your own, and every overconfident claim gets pushback that improves the next piece. Being wrong in front of an audience is the fastest way to get less wrong.

:::

::: details Do software fundamentals still matter in the age of AI coding agents?

More than before. When an agent writes the code, your job shifts toward judging the output with the same questions as always: does this rule belong in the domain model, will this change break an existing API client, what happens when this call fails. Explaining a problem clearly is also the core skill for directing an agent well.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Four Years of Writing Every Week",
  "desc": "Four years ago this week, the first issue of this newsletter landed in a few hundred inboxes.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogfour-years-of-writing-every-week.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
