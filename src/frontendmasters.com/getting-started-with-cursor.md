---
lang: en-US
title: "Getting Started with Cursor"
description: "Article(s) > Getting Started with Cursor"
icon: iconfont icon-cursor
category:
  - Tool
  - Cursor
  - IDE
  - Productivity
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - tool
  - cursor
  - ide
  - productivity
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started with Cursor"
    - property: og:description
      content: "Getting Started with Cursor"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/getting-started-with-cursor.html
prev: /tool/cursor/articles/README.md
date: 2025-09-08
isOriginal: false
author:
  - name: Steve Kinney
    url : https://frontendmasters.com/blog/author/stevekinney/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7062
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Cursor > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/cursor/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started with Cursor"
  desc="Cursor is an AI-focused VS Code fork. Here's Steve Kinney with a nice overview of what it offers and how to start getting help out of it right away."
  url="https://frontendmasters.com/blog/getting-started-with-cursor/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7062"/>

I don’t love the term “vibe coding,” but I also don’t like doing tedious things.

Over the last few months, we’ve seen a number of AI-driven development tools. [**Cursor**](https://cursor.com) is probably the most well-known at this point. But big players are starting to come out with their own like [<VPIcon icon="iconfont icon-openai"/>OpenAI’s Codex](https://openai.com/codex/), [<VPIcon icon="iconfont icon-anthropic"/>Anthropic’s Claude Code](https://anthropic.com/claude-code), [<VPIcon icon="iconfont icon-gemini"/>Google Gemini CLI](https://cloud.google.com/gemini/docs/codeassist/gemini-cli), and [<VPIcon icon="fa-brands fa-aws"/>Amazon’s Kiro](https://kiro.dev).

Think of Cursor as Visual Studio Code’s ambitious younger cousin—the one who not only borrows your syntax highlighting but also brings a full brain along for the ride—and is also a fork of its bigger cousin. In fact, if you weren’t looking closely, you could be forgiven for confusing it with Visual Studio Code.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/09/image.png?resize=1024%2C617&ssl=1)

I should note that Microsoft has also been racing to add Cursor-like features to Visual Studio Code and a lot of what we’re going to talk about here can also apply to Copilot in Visual Studio Code as well.

::: note Editors note

If you *really* want to level up with your AI coding skills, you should go from here right to Steve’s course [<VPIcon icon="fas fa-globe"/>Cursor & Claude Code: Professional AI Setup](https://frontendmasters.com/courses/pro-ai/).

:::

---

## Getting Set Up: The Familiar On-Ramp

If you’ve ever installed Visual Studio Code, you already know the drill. Download, install, run. Cursor smooths the landing with a one-click migration from VS Code—your extensions, themes, settings, and keybindings slide right over. Suddenly, you’re in a new editor that looks a lot like home but has some wild new tricks up its sleeve.

Once you’re settled, Cursor gives you a few ways to work with it:

- **Inline Edit (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>)** – Highlight some code, and then tell Cursor what you want to happen (e.g. “Refactor this function to use async/await”), and watch Cursor suggest a tidy diff right in front of your eyes. Nothing sneaky—just a controlled, color-coded change you can approve or toss if it’s not what you had in mind.
- **AI Chat (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>L</kbd>)** – This is like ChatGPT, but it knows your codebase. It hands out along-side your editor panes. Ask why a component is behaving weirdly, brainstorm ideas, or generate new code blocks. By default, it sees the current file, but you can widen its gaze to the whole repo with @codebase.
- **The Agent (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>I</kbd>)** – For the big jobs. Describe a goal (“Add authentication with GitHub and Google”), and Cursor will plan the steps, touch multiple files, and even run commands—always asking before it does anything dangerous. This is where you go from “pair programmer” to “project collaborator.”

### Some Inspiration for the Quick Editor

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/09/image-1.png?resize=902%2C510&ssl=1)

The inline editor is Cursor’s scalpel—it’s sharp, precise, and surprisingly versatile once you start leaning on it. A few of my favorite quick tricks:

- **Refactor without the tedium**: Highlight a callback hell nightmare, hit <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>, and ask Cursor to rewrite it with async/await. Boom—cleaner code in seconds.
- **Generate boilerplate**: Tired of writing the same prop-type interfaces or test scaffolding? Select a stub, tell Cursor what you need, and let it flesh things out.
- **Convert styles on the fly**: Need to move from plain CSS to Tailwind or from Tailwind to inline styles? Cursor can handle the translation with a single instruction.
- **Explain before you change**: Select a gnarly function and just ask Cursor “explain this.” You’ll get a quick natural-language breakdown before deciding what to tweak.
- **Add guardrails**: Highlight a function and say, “Add input validation with Zod,” or “Throw if the input is null.” Cursor will patch in the safety nets.

These tricks work best when you’re hyper-specific with what you want. Think of it less like a magic wand and more like a super helpful, pair-programming buddy who thrives on clear, concrete instructions. That’s the scalpel. But Cursor also gives you bigger hammers when you need them.

### Getting the Most Out of the Chat and Agent

As I alluded too above, **Chat (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>L</kbd>)** is for conversation and exploration. It’s best for asking “why” or “what if” questions, brainstorming, or generating code you’ll shape yourself. I use this all of the time to think through various approaches *before* I write any code. I treat it like a co-worker that I’m bouncing ideas off of—except I don’t have to interrupt them.

- Keep prompts specific (“Explain how this hook manages state across renders” beats “Explain this”).
- Pull in the right context with @files or @codebase so answers stay grounded in *your* project.
- Use it as a sounding board before you start refactoring—it’ll surface tradeoffs you might miss.

**The Agent (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>I</kbd>)** is for execution. Think of it as delegating work to a teammate who follows your plan:

- Start with a high-level description, then ask the agent to generate a step-by-step plan before running anything.
- Approve changes incrementally—don’t green-light a sweeping set of edits unless you’ve reviewed the plan.
- Pair it with tests and Git. Strong test coverage makes it easy to validate the agent’s work, and frequent commits let you roll back if things get messy.
- Use it for repetitive or cross-file tasks—things that would normally take you 20 minutes of hunt-and-peck are often solved in one go.

Here are some examples of things you might choose to toss at an agent:

- “Add authentication with GitHub and Google using Supabase. Show me the plan first.”
- “Migrate all class-based components in @components to functional components with hooks.”
- “Convert this component to use Tailwind classes instead of inline styles.”

In short: chat is your whiteboard, agent is your task runner. Bounce ideas in chat, then graduate to the agent when you’re ready to automate.

---

## Why Context Is Everything

In a large enough code base, you’re not going to be able to keep the entire thing in your head at any given time—and Cursor can’t either. In fact, this is probably one of the few places where you have an edge over an LLM—for now.

If you’re looking to get the most out of Cursor and other tools, then managing context is the name of the game. Sure, Cursor can index your code base, but sometimes that can be too much of a good thing. If you want to get the most out of a tool like Cursor, then you’re going to want to pull in the specific parts of your code base that you want it to know about. Otherwise, it’s hard to blame it if it starts heading off in a direction that you didn’t expect. If you didn’t explain what you wanted or give the necessary context to a human, it’s unlikely that they’re going to have what they need in order to be successful and Cursor is no different. Without context is like a smart intern working blindfolded. It might guess, it might improvise, and sometimes it invents nonsense (“hallucinations” is the fancy term). Feed it the right context, though, and Cursor becomes sharp, fast, and eerily helpful.

Context does a few magical things:

- Cuts down on guesswork.
- Keeps answers specific to *your* code instead of generic boilerplate.
- Helps the AI reason about structure and dependencies instead of flailing.
- Saves tokens, which means you save money.

Your job is to do the Big Brain Thinking™ about the overall big picture and then give Cursor the context it needs in order to do the tedious grunt work.

---

## How Cursor Handles Context

Cursor is not leaving you high-and-dry in this regard. It has some built-in smarts: it grabs the current file, recently viewed files, edit history, compiler errors, and even semantic search results. It will follow your dependency graph and get read the first little bit of every file in order to get a sense of what it does.

But the real control comes from explicit context management.

- @Files / @Folders – Point Cursor to exact code.
- @Symbols – Zero in on a function, class, or hook.
- @Docs – Pull in external documentation (yours or the framework’s).
- @Web – Do a live web search mid-chat.
- @Git – Bring in commit history or diffs.
- @Linter Errors – Hand Cursor your error messages so it can fix them.
- @Past Chats – Keep long conversations coherent.

That’s just the tactical layer. For strategy, Cursor gives you **rules** and **Notepads**.

- <VPIcon icon="fas fa-folder-open"/>`.cursor/rules` live in your repo, version-controlled, shaping Cursor’s behavior: “Always use React Query,” “Prefer async/await,” “Don’t leave TODO comments.” Think of them as your project’s constitution.
- **Notepads** are like sticky notes on steroids—bundles of prompts, docs, and references you can inject whenever needed. They’re local, but great for organizing reusable prompts or team knowledge.

Notepads allow you to keep little snippets of information that you can reference at any time and pull into context—without having to type the same things over and over.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/09/image-1.png?resize=902%2C510&ssl=1)

Here is an example of some rules to guide Cursor towards writing TypeScript and/or JavaScript in a way that aligns with your—or *my*, in this case—preferences:

```md
You are an expert TypeScript developer who writes clean, maintainable code that I am not going to regret later and follows strict linting rules.  
  
- Use nullish coalescing (`??`) and optional chaining (`?.`) operators appropriately  
  
- Prefix unused variables with underscore (e.g., `\_unusedParam`)
  
# JavaScript Best Practices  
  
- Use `const` for all variables that aren't reassigned, `let` otherwise  
- Don't use `await` in return statements (return the Promise directly)  
- Always use curly braces for control structures, even for single-line blocks  
- Prefer object spread (e.g. `{ ...args }`) over `Object.assign`  
- Use rest parameters instead of `arguments` object  
- Use template literals instead of string concatenation  
  
# Import Organization  
  
- Keep imports at the top of the file  
- Group imports in this order: `built-in → external → internal → parent → sibling → index → object → type`  
- Add blank lines between import groups  
- Sort imports alphabetically within each group  
- Avoid duplicate imports  
- Avoid circular dependencies  
- Ensure member imports are sorted (e.g., `import { A, B, C } from 'module'`)
  
# Console Usage  
  
- Console statements are allowed but should be used judiciously
```

---

## Best Practices for Keeping Cursor Sharp

The one thing that I’ve learned from using Cursor every day for a few months now is that all of those Best Practices® that you know you’re supposed to do but you might’ve gotten sloppy with in the past? They’re extra important these days. For example, the better your tests are, the easier it is for Cursor to validate whether or not it successfully accomplished a task—and didn’t cause a regression in the process. It’s one thing to manually test your own code over and over, but it’s extra sobering to have to manually test code that you didn’t write. The better your Git etiquette is, the easier it will be to roll back to a known good state in the event that something goes off the rails.

- **Review before you merge.** Always. The AI is good, but it’s not omniscient.
- **Commit early and often.** Git is still your real safety net.
- **Be precise in prompts.** “Make this more efficient” is vague. “Replace recursion with iteration to avoid stack overflow” is crisp.
- **Break it down.** Ask Cursor to outline a plan before making changes.
- **Iterate.** Think of it like a dialogue, not a vending machine.
- **Mind your open files.** The fewer distractions, the better Cursor performs.
- **Keep files lean.** Under 500 lines helps Agent mode stay accurate.
- **Stay private when you need to.** Ghost Mode ensures nothing leaves your machine.

---

## Wrapping Up

Cursor isn’t just an editor with AI bolted on. With proper context management, it becomes a thoughtful coding partner that amplifies your strengths, fills in gaps, and accelerates the mundane parts of software development. Used well, it’s less about “asking AI to code for me” and more about orchestrating an intelligent partner in your workflow.

::: note TL;DR

The more precisely you guide Cursor, the more it feels like it *really* understands your project—and that’s when the magic happens.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started with Cursor",
  "desc": "Cursor is an AI-focused VS Code fork. Here's Steve Kinney with a nice overview of what it offers and how to start getting help out of it right away.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/getting-started-with-cursor.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
