---
lang: en-US
title: "AI Engineer Is a New Role"
description: "Article(s) > AI Engineer Is a New Role"
icon: fas fa-barin
category:
  - AI
  - Career
  - Tips
  - Article(s)
tag:
  - blog
  - master.dev
  - ai
  - artificial-intelligence
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > AI Engineer Is a New Role"
    - property: og:description
      content: "AI Engineer Is a New Role"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/ai-engineer-is-a-new-role.html
prev: /programming/css/articles/README.md
date: 2026-05-14
isOriginal: false
author:
  - name: Scott Moss
    url: https://blog.master.dev/author/scottmoss/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9653
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="AI Engineer Is a New Role"
  desc="The job is creating dependable applications in production. Not just "
  url="https://blog.master.dev/ai-engineer-is-a-new-role/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9653"/>

Building the Agent Is Easy. The Loop Is the Job.

Most of this thinking came from my time at Netflix, where I ramped up engineers on AI work and got it shipped to production. The same questions keep coming up. What’s the difference between AI engineering and ML? Why is the agent I built falling over the second I put it in front of real users? What am I supposed to be measuring?

After answering enough variations of those, I got pretty clear on what I think AI engineering actually is. **AI engineer** is its own role. It’s not a rebrand of the ML engineer role. It’s not “the developer who calls an LLM API.” It’s a distinct discipline with its own skills, mindset, and loop. Here’s the case.

---

## Demos are easy. Dependability is the Job.

It’s so easy to make something that demos really well. Five minutes of vibe coding, a clean prompt, the happy path, and you’ve got a tweet-worthy clip. Then I throw three ants into your prompt and let me see what happens. It’s bad. Because it’s not really intelligent. It’s a predictor.

The whole craft sits in that gap. How do you take something that has potential, that’s really just a predictor, and make it dependable enough to ship to people solving real problems? Because if it’s not dependable, it’s not useful. Same as hiring someone who isn’t dependable. That person probably won’t keep their job for long.

That gap, between “demos great” and “dependable in production,” is the AI engineer’s full-time problem.

---

## AI Engineer vs ML Engineer

I get this question a lot, especially from engineers ramping into AI work from a traditional product or ML background. What’s the difference?

Machine learning engineers focus on training models, gathering and managing datasets, and optimizing model performance. They live in the model layer. The science, the architecture, the workflows around training. Research engineers and research scientists sit alongside them, writing the white papers and running the experiments on which the field is built.

AI engineers live at the application layer. We take those models and that research and turn them into products that work for real users. If you go deep enough into this, you’ll find yourself reading mathematical white papers, thinking, “Okay, this is a novel performant agentic architecture that’s reliable at selecting tools, I’m going to implement that.” That’s a real thing AI engineers do. But your output is a working product, not a trained model.

---

## The Four Skills That Keep Showing Up

I went and looked at AI engineer job postings on LinkedIn. And yes, LinkedIn is not where you go for great job statistics, but it’s there. Four skills came up over and over:

1. RAG
2. Evals
3. Agents
4. Production deployment

Three of those are teachable as a curriculum. Production deployment is so specific to where you work that the best thing to do is teach you the questions to ask.

Under those headline skills sits the day-to-day work. This is where the discipline actually lives.

**Context engineering.** Some term made up in Silicon Valley. Basically, how do I send the right tokens to the model at the right time? Tokens are currency. They correlate directly to energy cost. We’re all heading toward tokens per watt as the real unit of measure. Tokens really matter.

**Tool design.** How do we give agents the right abilities? Make sure they can do the right things and don’t do the wrong things.

**Evaluation.** How do we measure our agents so we can tell whether they’re actually improving, or we just feel like they are?

**Production reliability.** Self-healing, user experience, how a user knows when something is broken, handling errors and latency. The stuff that decides whether the system survives contact with reality.

It’s a completely different way of thinking about building applications. And it lives at the application layer, which is what makes it AI engineering and not ML engineering.

---

## The Build, Eval, Improve Loop

I want to get you in the right mindset because that’s what makes the whole thing work. I call it the build-eval-improve loop.

Build → Eval → Improve → Eval → Improve
<!-- TODO: mermaid화 -->

Building an agent is easy. You can vibe code an agent. There are SDKs that let you do it in five lines. It’s really not that hard. We’re not going to sit around talking about that part. The part that matters is everything that comes after. Evaluate where it’s bad. Figure out why it’s bad. Apply the right technique to fix that specific failure. Evaluate again.

This never stops. It’s not a job that’s ever going to be “done.” This is the role required for a non-deterministic system that must be dependable. There’s no “ship it and move on.” There’s only the loop.

---

## Why This Becomes a Whole Team

If you don’t believe me that AI engineering is its own discipline, go look at OpenAI’s job postings. They aren’t hiring AI engineers in the abstract. They’re hiring people for one specific slice of the system. One team for tool selection. One team for human in the loop. One team for safety. One team just trying to get the token counts down without losing accuracy.

ChatGPT is still bad at a lot of things. That’s with entire teams dedicated to specific subsystems. That’s the scale of effort it takes when your product is an agent. It is not a side responsibility for a full-stack engineer. It’s a discipline.

As more companies become AI-native, with the product itself being just an agent, we’re going to see massive teams of AI engineers, each working on a specific part. “Your job is to work on tool selection. Your job is to be a human in the loop. Your job is to bring these tokens down.” That’s the future, and it’s already here at the frontier labs.

---

## The Hardest Part Is Picking the Metrics

In my opinion, the hardest part of this job isn’t the code. It’s about figuring out which data to use for evals and which metrics to score against. What are the most appropriate metrics that give the best signal? How do we score them? How do we evolve that scoring as the system gets more dependable?

That’s a lot of science and art and hand-wavy stuff. But it’s the foundation on which everything else is built. Pick the wrong metrics and your loop gets you nowhere. Pick the right ones and the whole system compounds.

This is why the role is its own thing. A software engineer optimizes deterministic code paths. A machine learning engineer optimizes a model. An AI engineer optimizes a feedback loop on top of a non-deterministic system, and most of the leverage comes from choosing what to measure.

---

## The Practice Area, Not the Buzzword

Calling AI engineering a new discipline isn’t a marketing claim. It’s what the work looks like once you stop demoing and start shipping. Different layer than ML. Different mindset than traditional app development. Different loop. Different metrics. Increasingly its own career path.

If you’re a developer wondering whether to lean into this, here’s the simplest framing I’ve got.

The agent is the easy part. The loop is the job.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "AI Engineer Is a New Role",
  "desc": "The job is creating dependable applications in production. Not just ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/ai-engineer-is-a-new-role.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
