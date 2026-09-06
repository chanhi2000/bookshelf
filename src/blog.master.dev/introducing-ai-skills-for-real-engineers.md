---
lang: en-US
title: "Introducing AI Skills for Real Engineers"
description: "Article(s) > Introducing AI Skills for Real Engineers"
icon: iconfont icon-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing AI Skills for Real Engineers"
    - property: og:description
      content: "Introducing AI Skills for Real Engineers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/introducing-ai-skills-for-real-engineers.html
prev: /ai/claude/articles/README.md
date: 2026-08-18
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10700
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Introducing AI Skills for Real Engineers"
  desc="Matt Pocock's skills offers a suite of impactful skills to streamline AI integration in software development. These skills facilitate prompt refinement, project setup, and task management."
  url="https://blog.master.dev/introducing-ai-skills-for-real-engineers/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10700"/>

AI is an undeniable force in software engineering right now. These tools are trivial to use: tell it what to do, and it does it. But as easy as these tools are to start using, they can be tricky to use *well*.

This is a post about [“AI Skills for Real Engineers” (<VPIcon icon="iconfont icon-github"/>`mattpocock/skills`)](https://github.com/mattpocock/skills) which is a suite of AI “skills” (the kind you install into your AI harness) created by Matt Pocock. These skills exist to help you make AI tooling more effective. I’ve found them to be straightforward to use and very impactful.

We’ll take a brief tour through a few of these skills, which I think most clearly shows the kind of value they can add to almost any software dev’s workflow, no matter what you’re working on.

---

## Installation

I’ll assume you’re using Claude Code ([<VPIcon icon="fas fa-globe"/>see the docs](https://arc.net/l/quote/vfjtdpmn) for other harnesses). To install:

```sh
claude plugins install mattpocock-skills
```

If that fails with something like…

```plaintext
"mattpocock-skills" not found in any marketplace
```

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-00-marketplace-error-1024x147.jpg?resize=1024%2C147&ssl=1)

Then try clearing your Claude Code Marketplace cache (yes, really). This command will do just that:

```sh
claude plugins marketplace update
```

---

## A Skill to Help You Use the Skills

The docs for these skills are pretty clear, but you might still have some questions. Believe it or not, there’s a skill that helps you understand what the other skills do.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-00-xzibit.jpg?resize=500%2C323&ssl=1)

Let’s check it out. Imagine you read the docs and you’re not quite sure what the difference between the `/grilling` and `/grill-me` skills is. You can just fire up the `/ask-matt` skill, and ask it.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-02-ask-matt.jpg?resize=1024%2C553&ssl=1)

Let’s actually put these skills to work in an actual project.

---

## Project Setup

Many of these skills will do things like create tickets, or even documentation like ADRs. To get those, and other things set up, the first thing you should do in a new project is run `/setup-matt-pocock-skills`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-01-setup.jpg?resize=586%2C1024&ssl=1)

This is where we configure these skills: where to create issues, where to create ADRs, and so on. It’s a simple thing, but it’s a nice touch to help the other skills run more smoothly.

---

## Producing Clear Requirements with `/grill-me`

Anyone who’s used LLMs for coding knows that clear, detailed prompts are essential. Missing details are anathema to effective AI use. If you leave AI to assume things you’ve left out of your prompt, you might be disappointed in the result. Tools like Claude Code do have a plan mode, and LLMs in general will happily accept things like “Did I miss anything?” at the end of your prompt, but there’s a better way.

The `/grill-me` spec formalizes all that and takes it to the next level.

To get started, just do /`grill-me` and describe your feature.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-03-grill-start.jpg?resize=637%2C1024&ssl=1)

It’ll analyze your prompt and come up with some surprisingly detailed questions. As you answer those, you’ll likely be greeted with some follow-ups.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-03-grill-continue.jpg?resize=646%2C1024&ssl=1)

It’ll keep going like that until it has what it needs.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-03-grill-conclude.jpg?resize=918%2C1024&ssl=1)

---

## Implementing (Now, or Later)

At this point, your session and context should have everything needed to implement your feature. You can absolutely feel free to tell Claude something like “looks good, build it.”

Or if, for whatever reason, you’re not ready for this feature to be implemented right this second—perhaps you have 2 or 3 other AI-generated PRs to test and review, perhaps you have two other agents building things right this second, and were just using that waiting time to spec the next thing—then read on.

### Saving Work for Later with `/to-spec`

If you’d like to take the entirety of the current conversation and context and turn it into a single issue for later, you can use the `/to-spec` skill. Just call it up, and let the skill do the rest. It’ll even try to add some tests and check with you about the appropriate testing boundaries.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-05-to-spec.jpg?resize=1024%2C812&ssl=1)

### Saving Work for Later with `/to-tickets`

What if the feature you just designed is *big*? Humans work best with small, well-defined tasks, and AI agents are no different. You’ll likely get better results if you avoid letting your context window get flooded with content you wouldn’t otherwise need.

Inside that same conversation you just had, via the `/grill-me` skill, you can call up the `/to-tickets` skill, which will break that feature into multiple issues for you.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-04-to-tickets-proposed.jpg?resize=1024%2C895&ssl=1)

It’ll even be smart enough to block tickets as needed, based on dependencies. Naturally, you can make any tweaks to the proposed result you’d like.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-04-to-tickets-adjust.jpg?resize=1024%2C990&ssl=1)

Once you’re happy, tell it so, and it’ll do its thing.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-04-to-tickets-final.jpg?resize=957%2C1024&ssl=1)

You’ll wind up with a nicely filled-out board.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-04-to-tickets-result.jpg?resize=1024%2C530&ssl=1)

---

## Learning with `/teach`

We’ve all used LLMs to help us learn or understand something. This skill suite actually has a skill that takes it to the next level. Fire up the `/teach` skill, tell it what you’d like to learn about, and it’ll actually put an entire lesson together for you.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-07-teach-me.jpg?resize=1024%2C832&ssl=1)

When it’s ready, the lesson will pop up in your browser.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/img-07-teach-me-result.jpg?resize=779%2C1024&ssl=1)

When you’re done with that, it can keep churning on the next lesson in this topic.

---

## Parting Thoughts

I hope you find these AI skills as useful as I do. They can really help refine and clarify your ideas into clear, actionable specs that your LLM can execute most effectively. This post has barely scratched the surface of everything they can do. Check the docs for a fuller picture!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing AI Skills for Real Engineers",
  "desc": "Matt Pocock's skills offers a suite of impactful skills to streamline AI integration in software development. These skills facilitate prompt refinement, project setup, and task management.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/introducing-ai-skills-for-real-engineers.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
