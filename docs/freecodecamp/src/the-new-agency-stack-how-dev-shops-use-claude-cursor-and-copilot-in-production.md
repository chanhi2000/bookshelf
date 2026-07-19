---
lang: en-US
title: "The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production"
description: "Article(s) > The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production"
icon: iconfont icon-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production"
    - property: og:description
      content: "The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-new-agency-stack-how-dev-shops-use-claude-cursor-and-copilot-in-production.html
prev: /ai/claude/articles/README.md
date: 2026-07-25
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a02d2c69-a2af-476c-b594-4bf03671ad48.png
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
  name="The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production"
  desc="Two years ago, AI coding tools were a curiosity. Agencies let junior devs experiment with them on internal tools and side projects, the kind of work where nothing broke if the code was bad. Client wor"
  url="https://freecodecamp.org/news/the-new-agency-stack-how-dev-shops-use-claude-cursor-and-copilot-in-production"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a02d2c69-a2af-476c-b594-4bf03671ad48.png"/>

Two years ago, AI coding tools were a curiosity. Agencies let junior devs experiment with them on internal tools and side projects, the kind of work where nothing broke if the code was bad.

Client work stayed handwritten. Nobody was betting a deadline on autocomplete.

That era is over. The same tools now sit at the centre of how software gets built. Dev shops that once quoted six months for an MVP now quote six weeks, and clients have started asking why anyone would quote more.

The tools changed fast. The workflow around them changed just as much: new review habits, new pricing models, and new roles for senior engineers who spend less time typing and more time judging what the machine produced.

This article examines how modern agencies use these tools in production. Not the marketing version, where AI writes flawless code while everyone sips coffee. The real one, with code review, guardrails, failed experiments, and humans still in charge of every line that ships.

---

## Why Agencies Moved First

Product teams inside big companies move slowly. They have legacy code, compliance rules, and long approval chains. Agencies have none of that. They start fresh projects every month. That makes them the perfect test bed for AI-assisted work.

There's also a business reason. Agencies bill for outcomes. If a tool cuts build time by 40 percent, that's a margin. Or it's a lower price that wins the deal. Either way, the incentive to adopt is strong.

The shift shows up in how agencies now describe themselves. "AI-accelerated development" has become a core service line across the industry. The pitch is simple: senior engineers use AI to move fast, and every line still gets human review. That framing is now the standard playbook.

---

## The Three Layers of the Stack

Most agency stacks now have three layers. Each tool plays a different role.

The first layer is the chat assistant. This is where [<VPIcon icon="iconfont icon-claude"/>Claude](https://anthropic.com/claude) and ChatGPT live. Engineers use them for planning, architecture questions, and debugging. A senior dev might paste in an error log and get three likely causes in seconds. Or they might describe a feature and ask for edge cases they haven't thought of. This layer is about thinking, not typing.

The second layer is the AI-native editor. [<VPIcon icon="iconfont icon-cursor"/>Cursor](https://cursor.com/) leads here. It wraps a full code editor around a language model. The model sees your whole codebase, not just one file. Engineers use it to write new features, refactor old code, and generate tests. Agentic modes can now take a task and work through it across many files while the engineer reviews each step.

The third layer is the inline assistant. [<VPIcon icon="iconfont icon-github"/>GitHub Copilot](https://github.com/features/copilot) is the best-known. It lives inside the editor and completes code as you type. It handles the boring parts: boilerplate, repeated patterns, or standard functions. It's the least dramatic tool of the three, but it runs all day, every day, and the small savings add up.

Most shops use all three layers at once. The chat assistant plans, the AI editor builds, and the inline assistant fills the gaps.

---

## What Production Use Actually Looks Like

Here's where the hype meets reality. AI writes a lot of code now, but agencies that ship to real clients don't let it ship alone.

The common pattern is a tight loop. An engineer breaks a feature into small tasks. The AI drafts the code for each task. The engineer reads every line, fixes what's wrong, and runs the tests. Then the code goes through normal pull request review, just like human-written code always has.

The teams that get burned are the ones that skip the review step. AI code often looks right and runs fine in a demo. The problems hide deeper. Weak error handling. Security holes. Database queries that fall over at scale. A demo doesn't catch these, but a senior engineer does.

Product companies that build in the open show the same pattern. [<VPIcon icon="fas fa-globe"/>PostHog](https://posthog.com/), the open-source product analytics platform, has written publicly about how its engineers use AI tools in their daily workflow. The takeaway from teams like this is consistent: AI speeds up the draft, but a human owns the merge. Every change still lands through the same pull request process, with a named engineer accountable for it.

This has created a new line of work: fixing AI-built apps. [<VPIcon icon="fas fa-globe"/>Empat](https://empat.tech/), a dev shop with offices in San Francisco, London, and Kyiv, calls its version "vibecode rescue," a service for founders who built an app with AI tools and hit a wall.

The app works until it doesn't. Then someone has to untangle the code, add tests, and make it stable. The rise of this service says a lot. AI makes building easy. It doesn't make building well easy.

---

## The Numbers Behind the Shift

The cost picture explains why clients care. An agency MVP used to take four to six months. Now, agencies quote six to twelve weeks for the same scope, often starting around $30,000. Fixed-scope, fixed-price offers are back in fashion because AI makes timelines more predictable for well-defined work.

Speed isn't the only gain. AI tools are strong at the tasks engineers avoid: writing tests, documenting code, and updating old dependencies. Codebases built this way often ship with better test coverage than the hand-built ones from five years ago, simply because tests cost so little to produce now.

But the numbers cut both ways. Token costs for heavy agentic use are real. A team running AI agents all day can spend hundreds of dollars per engineer per month on model usage. For agencies, that is still a bargain against salary costs. It is, however, a new line item that didn't exist in 2023. ---

## How to Vet an "AI-Powered" Agency

Almost every agency now claims to use AI. The claim alone tells you nothing. If you're hiring one, a few questions cut through the noise.

Ask who reviews the AI's output. The right answer names specific senior engineers and a real pull request process. A vague answer about "quality checks" is a warning sign.

Ask about testing. AI-generated code needs automated tests more than human code does, because it fails in less predictable ways. A good shop will talk about test coverage without being prompted.

Ask what happens when the AI gets it wrong. Every experienced team has stories here. A team with no stories has not shipped much.

Finally, check the track record the old-fashioned way. Review platforms like [<VPIcon icon="fas fa-globe"/>Clutch](https://clutch.co/) collect verified client feedback on agencies, including project budgets and outcomes. AI has changed how code gets written. It hasn't changed the fact that past client results are the best predictor of future ones.

---

## Where This Goes Next

The current stack is already shifting. Agentic tools that plan and execute full tasks are replacing simple autocomplete. Some agencies now run AI agents overnight on well-scoped tickets and review the results in the morning. The engineer's job keeps moving up the stack: less typing, more judgment.

The agencies that win won't be the ones with the best tools. Everyone has the same tools. They'll be the ones with the best judgment about when to trust the tools and when to override them. That judgment lives in senior engineers, and it's why the "AI replaces developers" story keeps missing the mark. In production, AI hasn't replaced the engineer. It has made the good ones faster and the careless ones more dangerous.

For clients, the takeaway is simple. The new agency stack is real, and the speed gains are real. But the stack is only as good as the people running it. Ask hard questions, check the reviews, and make sure a human is reading every line before it ships.

::: info About Author

Hope you enjoyed this article. You can [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The New Agency Stack: How Dev Shops Use Claude, Cursor, and Copilot in Production",
  "desc": "Two years ago, AI coding tools were a curiosity. Agencies let junior devs experiment with them on internal tools and side projects, the kind of work where nothing broke if the code was bad. Client wor",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-new-agency-stack-how-dev-shops-use-claude-cursor-and-copilot-in-production.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
