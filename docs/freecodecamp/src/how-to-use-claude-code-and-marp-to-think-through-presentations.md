---
lang: en-US
title: "Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations"
description: "Article(s) > Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations"
icon: iconfont icon-claude
category:
  - Node.js
  - Markdown
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - md
  - markdown
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations"
    - property: og:description
      content: "Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-claude-code-and-marp-to-think-through-presentations.html
prev: /ai/claude/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Omer Rosenbaum
    url: https://freecodecamp.org/news/author/omerros/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fcbd044d-0add-467c-a9b0-d068584a8197.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Markdown > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations"
  desc="The hard part of building a presentation is figuring out the story. What are you trying to say? What’s the structure? Which sections build on which? Where does the data go, table or bullets? Before th"
  url="https://freecodecamp.org/news/how-to-use-claude-code-and-marp-to-think-through-presentations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fcbd044d-0add-467c-a9b0-d068584a8197.png"/>

The hard part of building a presentation is figuring out the *story*. What are you trying to say? What’s the structure? Which sections build on which? Where does the data go, table or bullets? Before the comparison or after?

What *would* help is having something to **react to**. Starting from zero is hard. Reacting to a draft is fast. “Move this before that” is way easier than “what should I say?”

That’s the workflow I want to show you. I use Claude Code + Marp to think through presentations. Claude helps me brainstorm the story, gives me a first draft to react to, and then I iterate, either through “conversation” or by editing the Markdown directly. The whole thing is a text file. 🎉

::: info

I used a deck to think through this post. You can find it [<VPIcon icon="fas fa-globe"/>here](https://omerr.github.io/claude-skills/presentations/claude-code-marp/).

:::

---

## The Workflow

The process has four stages: **Brainstorm**, **React**, **Iterate**, **Export**. Let me walk through each one.

### Brainstorm

You kick things off with a slash command (I will provide you with this command later):

```sh
/create-marp-deck API rate limiting
```

Claude starts by interviewing you, asks about the goal, audience, key points, any data you want to include. This partforces you to articulate the story before a single slide exists.

![Claude Code interviewing the user about their presentation — asking about the goal, audience, and key sections](https://cdn-images-1.medium.com/max/1200/0*HHy7-RCRF_oS8WeU.png)

```sh
claude
# 
# > /create-marp-deck API rate limiting
# ─────────────────────────────────────────────
# 
# Claude: What's this presentation about? What should the audience
#         walk away knowing?
# 
# User:   How our rate limiting works, which algorithm we chose and
#         why, and what they need to know to configure it for their
#         services.
# 
# Claude: Who's the audience?
# 
# User:   Platform engineering team — they know our stack but haven't
#         seen the rate limiting internals.
# 
# Claude: What are the key points or sections you want to cover?
# 
# User:   1. Why we need rate limiting (the incident last month)
#         2. Token bucket vs sliding window — our decision
#         3. How to configure it per-service
#         4. Monitoring dashboard walkthrough
```

Think of it as a lightweight brainstorm: you talk through what you’re trying to say, and Claude helps you structure it.

### React

Once you’ve aligned on the structure, Claude generates the full Marp Markdown file and exports it. You get a solid first draft you can *react to* and reshape.

![Title slide with dark gradient background showing “API Rate Limiting — A Technical Deep Dive”](https://cdn-images-1.medium.com/max/1200/0*pFj4D2py1ATg816C.png)

That title slide came from this Markdown:

```md
<!-- _class: lead title-slide -->
```

```md
# API Rate Limiting
---

## A Technical Deep Dive
```

```md
**Team**: Platform Engineering
**Date**: February 2026
```

Is it perfect? Probably not. But now you have something concrete, with sections, structure, and a story, that you can push around. That’s so much faster than starting from a blank canvas.

When you go through the slides, you *feel* if the story is coherent and clear.

### Iterate

While reviewing the draft, it'll inevitably spark ideas: “oh, I should add a comparison table here,” “this section is too dense, maybe split it into two,” “move this summary up to the top.”

One way to make such edits is to ask Claude Code to do that:

```md title="prompt"
"Slide 6 is too dense. Split the algorithm comparison into
two slides, one for token bucket, one for sliding window."
```

![Claude Code splitting a slide and adding a callout, with file diffs](https://cdn-images-1.medium.com/max/1200/0*dVWLJ1hecPviej4D.png)

```md title="prompt"
> Slide 6 is too dense. Split the algorithm comparison into two slides — one for token bucket, one for sliding window.
```

```plaintext title="output"
Claude: I'll split slide 6 into two separate slides, one per algorithm.

  Edit presentations/api-rate-limiting.md
  ───────────────────────────────────────
  - # Algorithm Comparison
  - | Feature | Token Bucket | Sliding Window |
  + # Token Bucket
  + Tokens refill at a steady rate...
  + ---
  + # Sliding Window
  + Track exact timestamp of every request...

> Add a "Why we chose token bucket" callout to that first slide

Claude: Added a blockquote callout explaining the decision.

  Edit presentations/api-rate-limiting.md
  ───────────────────────────────────────
  + > We chose token bucket because it handles bursty traffic
  + > from our mobile clients without penalizing steady callers
```

You can also edit in **VS Code** with the Marp extension for live preview. Open the `.md` file, hit <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>v</kbd>, and you get the source on the left with rendered slides on the right. Claude Code edits the file, VS Code detects the change, and the preview updates automatically. (I keep both open side by side and it just works.)

![Me editing the deck that I created to help me think through this article](https://cdn-images-1.medium.com/max/1200/0*88zY1J4xzeo1vUWS.png)

### Export

When you’re done, you get three files:

- `.md` – the source (version-controlled, diffable)
- `.html` – open in any browser, share via Slack
- `.pptx` – open in PowerPoint, present anywhere

```sh
marp --no-stdin deck.md -o deck.html
# 
# [  INFO ] Converting 1 markdown...
# [  INFO ] deck.md => deck.html

marp --no-stdin --pptx deck.md -o deck.pptx
#
# [  INFO ] Converting 1 markdown...
# [  INFO ] deck.md => deck.pptx

ls presentations/
# 
# api-rate-limiting.md
# api-rate-limiting.html   ✓ open in browser, share via Slack
# api-rate-limiting.pptx   ✓ open in PowerPoint, present anywhere
```

![marp CLI exporting to HTML and PPTX](https://cdn-images-1.medium.com/max/1200/0*XsnHZELJ9w3vovOz.png)

The skill runs the export commands automatically after generating the deck. A 15-slide deck converts in about 2 seconds.

#### Editable PPTX

The standard PPTX export renders each slide as an image  –  pixel-perfect, but you can’t edit the text in PowerPoint or Google Slides. If you need editable text, Marp has a `--pptx-editable` flag that uses LibreOffice under the hood to produce real text boxes.

The catch: LibreOffice creates text boxes that are too narrow, so text wraps and overlaps. The skill includes a python-pptx post-processing script that automatically widens the text boxes to fix this. Just ask for “editable PPTX” and the skill handles the rest  –  the LibreOffice conversion, the text box fix, everything.

---

## Get Started in 5 Minutes

OK, are you ready? Here’s everything you need:

### 1. Install Marp CLI:

```sh
npm i -g @marp-team/marp-cli
```

### 2. Install the skill (via [<VPIcon icon="fas fa-globe"/>skills.sh](https://skills.sh)):

```sh
npx skills add Omerr/claude-skills
```

This works with Claude Code, Cursor, GitHub Copilot, and other AI agents. You can also install manually  ( see the [<VPIcon icon="iconfont icon-github"/>`Omerr/claude-skills`](https://github.com/Omerr/claude-skills) for details).

### 3. Run it:

```sh
/create-marp-deck your topic here
```

### 4. Iterate:

React to the draft, refine through conversation or VS Code, and export.

That’s it. Four steps. Fork the repo and customize the conventions to match your style.

---

## Use Case: This Very Article

Want to see this workflow in practice? You’re looking at it.

I wrote this article by first creating a slide deck using exactly the process I described above. I ran `/create-marp-deck`, answered the interview questions, got a first draft, and iterated until the story felt right. You can [<VPIcon icon="fas fa-globe"/>see the deck here](https://omerr.github.io/claude-skills/presentations/claude-code-marp/).

Why start with slides? Because a deck forces you to be concise and to go through the *story*. If the story doesn’t flow across 15 slides, it won’t flow across 1,500 words either. The deck became my outline, and once I had a coherent structure there, writing the article was much easier.

So if you’re ever staring at a blank doc thinking “I should write a blog post about X,” try making a deck first. You might be surprised how much faster the writing goes when the story is already figured out. 😎

---

## Under the Hood

If you’re curious about what makes this work, read on. If not, you’re all set. 🙌🏻

### Marp: Markdown to Slides

[<VPIcon icon="fas fa-globe"/>Marp](https://marp.app/) (Markdown Presentation Ecosystem) converts `.md` files into slides. Your deck starts with frontmatter:

```md
---
marp: true
theme: default
paginate: true
size: 16:9
---
```

Four lines and you have widescreen, paginated slides. Slide breaks are just `---` in the Markdown. Your presentation is a text file: version-controlled, diffable, and AI-editable.

### The Skill File

You *could* just ask Claude Code to “make me a Marp presentation” every time. But you’d spend half the conversation explaining your preferred format, color palette, and slide structure.

Instead, I created a **Claude Code skill** (see it [here (<VPIcon icon="iconfont icon-github"/>`Omerr/claude-skills.git`)](https://github.com/Omerr/claude-skills.git)), a reusable set of instructions that Claude follows whenever you invoke it. It has two parts:

1. An **interview phase** that gathers context before generating anything (the 5 questions from the brainstorm step)
2. A **generation phase** with the full Marp conventions: CSS palette, slide structure, breadcrumb pattern, formatting rules, and export commands

The full skill is about 200 lines. That sounds like a lot, but you write it once and then every deck you create follows the same polished conventions automatically.

### Section Dividers

Each section of the deck gets its own gradient background. So when you’re presenting, the audience intuitively knows when you’ve moved to a new topic:

![Section divider slide with blue gradient showing “Part 1: The Problem”](https://cdn-images-1.medium.com/max/1200/0*SDRNCJnSw3BDwXUG.png)

Applied via CSS classes in the skill:

```md
<!-- _class: lead part-problem -->
# Part 1: The Problem
```

### Breadcrumb Navigation

This is my favorite part of the whole setup.

Every content slide has a breadcrumb header at the top that shows where you are in the deck:

![Content slide showing breadcrumb “The Problem > Algorithms > Implementation” with the current section highlighted in blue](https://cdn-images-1.medium.com/max/1200/0*PaPBdx60ZYJn9G3K.png)

See that header? “The Problem > **Algorithms** > Implementation”, with “Algorithms” highlighted in blue.

In Marp, this is done with a simple HTML comment:

```md
<!-- header: "The Problem > **Algorithms** > Implementation" -->
```

The `**bold**` text renders in blue (via CSS `header strong { color: #2563eb; }`), while the rest stays gray. You set it once per section and it persists until you change it.

How often have you sat through a presentation wondering “wait, where are we?” 🤔

---

## Wrapping Up

The hard part of presentations is telling a coherent story. Get yourself a first draft to react to, iterate until it flows, and export. That’s it.

If you want to try it: `npm i -g @marp-team/marp-cli`, run `npx skills add Omerr/claude-skills`, and then `/create-marp-deck`. You'll have a deck in minutes and a workflow you can reuse for every presentation after that.

::: info About the Author

[Omer Rosenbaum (<VPIcon icon="fa-brands fa-linkedin"/>`omer-rosenbaum-034a08b9`)](https://linkedin.com/in/omer-rosenbaum-034a08b9/) is the author of the [Brief YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`@BriefVid`)](https://youtube.com/@BriefVid). He’s also a cyber training expert and founder of Checkpoint Security Academy. He’s the author of [**Product-Led Research**](/freecodecamp.org/product-led-research-a-practical-guide-for-randd-leaders-full-book/README.md), [**Gitting Things Done**](/freecodecamp.org/gitting-things-done-book/README.md#) (in English) and [<VPIcon icon="fas fa-globe"/>Computer Networks](https://data.cyber.org.il/networks/networks.pdf) (in Hebrew). You can find him on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`Omer_Ros`)](https://twitter.com/Omer_Ros).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Staring at a Blank Deck: How I Use Claude Code + Marp to Think Through Presentations",
  "desc": "The hard part of building a presentation is figuring out the story. What are you trying to say? What’s the structure? Which sections build on which? Where does the data go, table or bullets? Before th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-claude-code-and-marp-to-think-through-presentations.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
