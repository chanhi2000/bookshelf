---
lang: en-US
title: "How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development"
description: "Article(s) > How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development"
icon: 
category:
  - AI
  - LLM
  - Antrhopic
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
      content: "Article(s) > How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development"
    - property: og:description
      content: "How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-software-factory-with-claude-code.html
prev: /ai/claude/articles/README.md
date: 2026-05-22
isOriginal: false
author:
  - name: Qudrat Ullah
    url: https://freecodecamp.org/news/author/qudratullahdev/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/9dba291f-c5b1-4c0c-99a6-44941e60f014.png
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
  name="How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development"
  desc="AI coding tools now offer much more than autocomplete. They can analyze your codebase, edit multiple files, execute commands, explain errors, generate tests, write documentation, and prepare pull requ"
  url="https://freecodecamp.org/news/how-to-build-software-factory-with-claude-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/9dba291f-c5b1-4c0c-99a6-44941e60f014.png"/>

AI coding tools now offer much more than autocomplete. They can analyze your codebase, edit multiple files, execute commands, explain errors, generate tests, write documentation, and prepare pull request summaries. For small tasks, these capabilities are impressive. When you ask Claude Code, Cursor, or Copilot to explain a function, clean up a component, write a utility, or fix a clear bug, the process often feels seamless.

However, developing significant features presents different challenges.

A complete feature involves more than code. It requires product rules, architectural decisions, edge case handling, tests, security checks, review standards, and delivery constraints. As features grow, a single AI session must manage increasing complexity.

This is where the workflow begins to strain.

For example, you might ask your AI assistant to add invoice reminders to a SaaS billing application. Initially, it performs well: inspecting the invoice model, identifying the email service, recognizing the background worker, proposing a plan, and implementing changes. You approve permissions and edits, it runs tests, resolves errors, and updates the summary.

As the session progresses, complexity increases.

The AI must now track the original business rule, tenant boundaries, retry behavior, modified files, added tests, corrected constraints, and instructions on what not to change. While progress remains faster than before, the workflow becomes less organized.

You review the plan again, approve additional edits, identify missing constraints, reiterate rules, request file checks, rerun tests, and examine the diff. You begin to question whether the implementation still aligns with the original intent.

The AI is not failing due to lack of capability; it struggles because the workflow lacks sufficient structure.

A single extended conversation attempts to serve as product analyst, architect, backend engineer, frontend engineer, test engineer, reviewer, and release assistant simultaneously. While this may suffice for small tasks, it becomes unreliable when features involve complex business rules and production risks. Many developers overlook this transition.

Advancing AI-assisted development requires more than improved prompts; it involves designing a more effective system around the model.

If this scenario resonates with you, it does not reflect a lack of skill with AI. Instead, it indicates that your workflow may not be well-suited to the tool.

I am Qudrat Ullah, a tech lead based in London. I collaborate with engineering teams delivering production software and have observed how AI coding tools are transforming daily workflows. In this handbook, I will share practical insights to help you evolve your approach. By the end, you will move beyond repetitive setups and begin building your own software factory. Effective solutions start small and develop over time; avoid aiming for a comprehensive solution in a single day. Start small and continue to grow.

This handbook outlines the workflow I wish I had received when I started using AI for production code. By the end, you will be able to establish your own small software factory, a structured approach to using AI for planning, building, testing, and reviewing features while maintaining control of your codebase.

---

## What You'll learn

- How AI-assisted development actually evolved, and what the shape of that history tells you about where it is going.
- Why "just ask the AI" stops working as soon as a project gets real, and what to do instead.
- The five layers of an AI-assisted workflow: context, knowledge, agents, workflows, and delivery.
- How to use Claude Code's building blocks (<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, skills, subagents, hooks) and let Claude itself generate most of them for you. (You can use any tool. The concepts are the same. I picked one tool for simplicity.)
- How to build a working set of seven specialized agents and an orchestrator that chains them together.
- A hands-on setup you can copy into any Next.js or Node.js project this weekend. If you understand the concepts, you can apply them to any project.
- What I deliberately left out, and where to learn it next.

---

## Who this is For

This guide is accessible to developers new to Claude Code or any AI tool, yet comprehensive enough for senior engineers or tech leads to benefit from the workflow patterns, orchestrator design, review checklist, and delivery section.

Examples reference Next.js, Node.js, and a SaaS billing application, but the concepts are tool-agnostic. Whether you use Cursor, Claude, Aider, Windsurf, Kilo, Cline, or future tools, the same principles apply.

---

## What You'll Be Able to Build by the End

- A <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` that captures your project's facts and standards.
- Seven custom subagents that do focused work in their own context: researcher, story writer, spec writer, backend builder, frontend builder, test verifier, and validator.
- One orchestrator (first as a skill, then optionally as an agent) that delegates work across those seven sub agents.
- One reusable skill that encodes a workflow your team runs repeatedly.
- One pre-commit hook for safety.
- A short PR review checklist to ensure AI-generated pull requests are reviewed against the same standards every time.

This is what a "software factory" means in practice. A factory can be scaled to your needs. It is not a large autonomous system, but rather a small set of files in your repository that enables one developer and one AI to function as a coordinated team.

---

## Table of Contents

### Part 1: Foundations Before the Factory

### Part 2: Build the Agent Factory

### Part 3: Wrap Up

---

## Part 1: Foundations Before the Factory

Before building a factory, it is important to understand the current landscape, why existing workflows break down, and the foundational elements required. The first five sections establish this groundwork; construction begins in Section 6. ---

### 1. How AI-Assisted Development Evolved

Before building anything, it is helpful to understand the progression of AI in coding. This evolution occurred in few stages, with each stage addressing a specific problem and enabling the next.

![Figure 1: Five stages of AI in coding, leading to today's software factory shift.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/e48786a4-d3f3-42a6-a641-f823648ea905.png)

### Manual Coding

In the early workflow, you wrote everything by hand. The editor highlighted the text but did not understand it. You looked things up in books, in docs, on Stack Overflow, then slowly shaped the application line by line. This produced strong developers because every detail had to pass through their heads, but it placed a hard cap on what one person could ship in a week.

### Smart editors

Then the editors got useful. IntelliSense, language servers, ESLint, snippet engines, refactoring tools. None of these wrote code for you, but they removed friction inside the file you were already editing. This was the first stage at which developers began to expect the editor to help. It changed the baseline.

### Smart Autocomplete

Tabnine and early versions of GitHub Copilot looked at nearby code and predicted what would come next. If you started writing a function `calculateInvoiceTotal(items)`, the tool guessed you wanted to loop over items, multiply quantity by price, and return a total. The editor was no longer completing syntax. It was completing intent. But you still owned the design.

### Chat AI

Then chat-based AI arrived, and the workflow split in half. You opened ChatGPT or Claude in another tab and asked for a login page or a registration API. Useful for boilerplate. Bad for anything that depended on your real folder structure, your auth flow, your database schema, or your team's decisions. The generated code looked correct in isolation, but broke when you pasted it in. It helped you draft something initially without typing.

### AI in the IDE

Cursor, Claude Code, Copilot Chat, Windsurf, Aider. These closed that gap. The AI could now inspect files, suggest edits across the project, run commands, and help with multi-file work. Instead of "write me a React component," you could ask, "Look at our existing dashboard widgets and add a new metric card in the same style." Much more powerful, because the AI is no longer working from a blank page. This is also the start of vibe coding. You vibe with the AI, it makes changes, you keep going. A lot of people are doing that today and getting real leverage from it.

That power is changing how software is built, but the industry is already moving in another direction. Let's look at what breaks in the vibe coding model.

### 2. Why Vibe Coding Breaks Down

Vibe coding is the workflow most developers fall into in the first week they use an AI IDE. You ask for a feature. The AI writes code. Something breaks. You paste the error. The AI patches it. Something else breaks. You ask again. Round and round.

On day one, this feels fast. You can build a landing page in fifteen minutes. You can sketch a prototype in an afternoon. Real progress.

On day thirty, the loop turns painful. The same logic appears in three places. The AI has forgotten the convention you set up two weeks ago. New features step on old ones. Tests are missing or shallow. The app works today, then breaks tomorrow because one prompt removed a guard you forgot existed. You are now spending more time supervising the AI than you used to spend writing code yourself.

There are techniques that make this better. Writing better prompts. Maintaining good docs. Keeping the context tight. I covered some of those in [**my previous article on unblocking the AI PR review bottleneck**](/freecodecamp.org/how-to-unblock-ai-pr-review-bottleneck-handbook.md). Those techniques help, but a single session still drifts when too many jobs land in the same conversation, and that's the challenge we are going to solve.

#### The Deeper Problem: One Chat, Too Many Jobs

If you watch a real engineering team for a day, you notice that different people have different responsibilities. A product person clarifies the user problem. A senior engineer thinks about architecture. A backend developer designs the API. A frontend developer builds the interface. A test engineer thinks about edge cases. A reviewer decides whether the work fits the codebase.

When you point one AI session at "build the feature," you collapse all of those roles into one conversation. The AI plans, designs, codes, tests, and reviews its own work in the same messy context. That is risky because mistakes compound. A wrong assumption in the plan becomes a wrong database model. A wrong database model becomes a wrong API. A wrong API becomes a wrong UI. By the time you notice, the mistake has spread through the whole feature.

You may start thinking the next stage of AI-assisted development is better prompts. No, it is not, It is a better system.

Use AI to automate structured work, not chaotic work. If your team has no standards, AI will generate inconsistent code faster. If your tests are weak, AI will produce fragile features faster. If your review process is vague, AI will let important risks through faster.

That single idea drives everything that follows.

### 3. The Five Layers of an AI-Assisted Workflow

Before we get into specifics, here is the mental model this article uses. A working AI-assisted workflow has five layers that stack. Each one only works as well as the one below it.

![Figure 2: The five layers. Each one feeds the next; the whole stack is your software factory.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/752ad70c-8ef7-4b51-b9f8-9b719bf4fe85.png)

At the bottom is the Context Layer, which is what the AI can see in the current message. Above that sits the Knowledge Layer, which is the persistent project memory the AI inherits at the start of every session. Memory management itself is a huge topic we will cover in a future article (centralized memory, shared knowledge stores, and so on). For now, rely on Claude's session memory. The Agent Layer turns that knowledge into focused workers with their own tools and their own context windows. The Workflow Layer puts an orchestrator on top of those agents and chains them into a real pipeline with validation gates and human approval points. The Delivery Layer is how everything that comes out of the pipeline reaches production safely: pull requests, a review checklist, and CI gates.

If you invest in only one layer, the others remain weak. A team with great agents but no shared <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` ends up with inconsistent code. A team with great context discipline but no validation gates ships fragile features fast. The whole point of the model is that you build all five, even if you start small in each one. Also, one more important tip across the teams use same AI and tools for better and consistent results.

Before you build the factory, understand the foundations first.

This article is split into two halves on purpose.

Part 1 (Sections 4 and 5) covers the foundations. Context management. <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`. Skills. Hooks. These are not the factory. These are the things you have to understand before the factory can stand on top of them. If you skip them and jump straight to building agents, the factory looks impressive for a week and then falls over. The agents will inherit a messy context. The orchestrator will route work that lacks clear rules. The validator will have nothing to validate against.

Part 2 (Sections 6, 7, 8, and 9) is where you actually build the factory. Seven specialized agents. An orchestrator that runs the chain. A delivery layer that gets the output to production. A hands-on section that wires it all together in your own repo.

A note on Part 1. You might read Sections 4 and 5 and think, "This is still me typing prompts. This is still vibe coding with extra steps." That is fair on the surface, and I want to address it directly. The habits in Part 1 are not the factory. They are the discipline that makes the factory possible. The exploration workflow you do by hand in Section 4 is the same workflow your codebase-researcher agent will automate in Section 6. The <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` you write in Section 5 is what every agent will read at the start of every task. Part 1 teaches you the moves. Part 2 teaches the machine to make them for you.

If you already practice good context hygiene and have a <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` you trust, skim Part 1 and head straight to Section 6. If you do not, take the time. The factory is only as good as what it stands on.

### 4. The Context Layer: Explore Before You Build

Context is the AI's working memory. It is your prompt, the files you opened, the previous messages, your project rules, the documentation you injected, the terminal output, and the errors. Anything else the model can see while it is helping you.

Senior engineers carry a lot of project knowledge in their heads. They know why a decision was made, where the risky files live, which patterns the team follows, and what should not be touched. AI does not automatically know any of that. It only knows what is in its context.

Even with very large context windows, more is not better. Too much uncontrolled context makes the model worse. It mixes old decisions with new ones. It follows an outdated file pattern. It carries forward a wrong assumption that you corrected three messages ago. The goal is not to give the AI everything. The goal is to give it the right information at the right time which save computing time and cost both.

#### Habit 1: Explore before you build

The single biggest mistake developers make with AI in the IDE is asking for code as the first move. The AI accepts the prompt, makes guesses to fill the gaps in your description, and starts generating. That is when bad designs sneak in. Strongly recommend avoid that.

A better move is to treat the first phase as exploration, not implementation. You are not asking the AI to build anything yet. You are asking it to read the existing code and tell you what is there. During this process you will observe AI will discover things which it finalize wrong initially.

Concrete example. Imagine you run a SaaS billing platform built with Next.js (App Router) on the frontend and Node.js services on the backend. The app has customers, subscriptions, invoices, a webhook handler that updates payment status, and a Resend integration for transactional email. You want to add reminder emails for unpaid invoices.

If you tell Claude Code, "add invoice reminders," you are gambling. It might do something reasonable. It might also create a new scheduler when you already have one, send reminders to customers who already paid, ignore timezone handling, hardcode business rules into the API route, or skip audit logs entirely. None of that is the AI being bad. It is the AI guessing because you asked it to.

Here is the controlled version, step by step.

**Step 1.** Open Claude Code in plan mode and start with a read-only prompt. The goal is to make the AI describe the relevant parts of your codebase before any code is written.

```plaintext
I want to add reminder emails for invoices that have been unpaid
for more than 7 days. Before suggesting anything, please:

1. Read the invoice, payment, and email-sending code in this repo.
2. Tell me how invoices are created and where their status is stored.
3. Tell me how transactional emails are sent today.
4. Tell me whether we already have a background job system or scheduler.
5. List the files that would most likely change if we added reminders.

Do not write any code yet. I want a clear map first.
```

The prompt above can be written in many ways. Also can references docs folder if <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` does not have clear mapping or you want to give more context to the AI for better results. The purpose is to show the shape: ask for understanding before action.

**Step 2.** Read the response carefully. This is the moment to spot wrong assumptions while they are cheap to fix. If the AI says "I will use cron," but you actually have BullMQ workers running, correct that now. Because during codebase discovery it's possible it has not discovered BullMQ code and that information is in your head.

**Step 3.** Once the map is right, ask for options, not code. You want a small comparison, not a solution.

```md
Based on what you just found, suggest 3 ways we could implement
invoice reminders.

For each option, explain:

- how it would work end-to-end
- which existing parts of the system it reuses
- which new files or DB changes it needs
- the main risks (timezone, multi-tenant, retries, deduplication)
- Which option would you recommend and why

Do not edit any files yet.
```

**Step 4.** Pick one option, then ask Claude Code to write a one-page brief: goal, approach, business rules, data model changes, tests needed, edge cases, open risks. Read the brief in under a minute. If something is missing, ask for a revision before moving on.

**Step 5.** Open a fresh Claude Code session and paste only the brief into it. This is the move most people skip. During exploration, the AI discussed multiple options. Some were rejected. Some were partially correct. You do not want all that noise carried forward when implementation starts. A clean session means a clean context.

**Step 6.** Ask about the new session's implementation plan and read it slowly. Look for things like "we will store processed invoice IDs in memory." That is a red flag. Memory is lost on restart and is not shared across multiple servers, so the same reminder could be sent twice. Catching that in the plan costs five minutes. Catching it after Claude has changed ten files costs an afternoon.

**Step 7.** Build, then ask Claude to explain back. After the implementation, do not blindly commit. Ask the AI to walk you through the important decisions, list the tests it added, and update the docs with anything operators need to know. Trust but verify.

The shape of this workflow is:

```plaintext
inspect → compare options → pick approach → write brief → start clean → plan → review → build → explain back
```
<!-- TODO: mermaid화 -->

Compare that to the vibe-coding shape: `prompt → generate → run → paste error → repeat`. The first one is controlled progress. The second is accidental progress, which does not scale.

This whole workflow is what you do today, by hand. In Section 7, you will see how an orchestrator can run most of it for you while you only step in at the review points.

#### Habit 2: Watch for Context Drift

Even with a clean start, bad information can sneak into a long session. Once a wrong assumption enters the context, the model keeps building on top of it. I call this context drift, and it is the most common reason a working session quietly produces a broken codebase. One small wrong assumption can spread across many files before you notice.

![Figure 3: How a vague prompt drifts into spreading damage, and the only reliable way out.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/240b1d48-4181-43dc-8f68-378e562ce67f.png)

A real example. You give Claude this prompt:

> Add subscription management to our SaaS. Users should be able to create a subscription and cancel it later.

That prompt is too broad. The AI guesses ownership and creates something like:

```sh title="file structure"
User
└── Subscription
      ├── planName
      ├── status
      └── renewalDate
```

Looks fine on the surface. Then you remember your real business rule: a company account has many users, and the subscription belongs to the company, not the individual user. That difference is huge, and the AI has already designed around the wrong owner.

If you only say "no, subscriptions belong to companies," Claude tries to patch. You end up with both `user.subscriptionId` and `company.subscriptionId` floating around, defensive comments where they should not exist, and renamed code that still behaves like the old design.

::: important Rule of thumb

If the AI makes a small typo, correct it inline. If it makes a wrong architectural assumption, throw the conversation away and start a new session with a stronger prompt. Small mistakes can be patched. Deep design mistakes should not be patched inside a polluted conversation.

:::

The cleaner move is to discard the chat, edit your original prompt, and start over with the rule baked in:

```md
We need subscription management for our SaaS.

Important business rules:
- Subscriptions belong to a company account, not an individual user.
- A company can have many users.
- Only company admins can change the subscription.
- Billing history is visible to admins only.
- Cancelled subscriptions remain active until the end of the billing period.

Before writing code, inspect our existing account, user, and billing models.
Then suggest an implementation plan. Do not edit files yet.
```

Now the AI starts from the correct mental model. The first version is a guess. The second version is a design.

#### Habit 3: Pin the AI to your installed versions

Models know a lot, but they do not always know the exact version of your framework, your library, or your team standard. Sometimes they answer from older training data. Sometimes they give you a generic answer that worked in a tutorial three years ago and does not fit your project today.

A better prompt forces the AI to ground itself in your real installed versions:

```md
Before writing code, inspect this project's structure and package.json.

This project uses Next.js App Router. Use the authentication library
version that is actually installed. Look up the current docs for that
specific version. Then explain the recommended file structure before
editing anything.
```

Same idea for Tailwind versions, Stripe SDK versions, Prisma migrations, React 18 vs 19 differences. Anywhere there is a real version-to-pattern dependency, make the AI ground itself in your installed versions and the current docs, not its training memory. Without it, the model produces average internet code and keep fixing errors and after a while will reach to correct information. With it, the model produces code that fits your project.

A useful tool here is **Context7.** It is a plugin that fetches the current docs for the exact installed version of each library. You can install it in Claude Code and reference it in your prompts or knowledge files so the model always pulls current docs before writing code. I use it regularly.

### 5. The Knowledge Layer: CLAUDE.md, Skills, and Hooks

The Context Layer covers a single conversation. The Knowledge Layer covers everything that survives between conversations. This is where most teams' AI workflows quietly fail. They keep re-explaining the same project facts to the AI, every day, in every chat. Capturing that knowledge once, in the right place, is what turns a good AI workflow into a repeatable one.

Claude Code gives you four building blocks for this layer. Picking the right block for the right kind of knowledge is half the skill.

![Figure 4: Four building blocks. Each one feeds your Claude Code session in a different way.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/b640f3ea-e01d-4480-bec7-08ad586fd04b.png)

#### <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`: The Lasting Facts

<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` is a Markdown file at the root of your repo (or at `~/.claude/CLAUDE.md` for personal-level instructions). It is loaded automatically every time you open a Claude Code session in that project, and it is where lasting facts live. If you have multiple projects in a monorepo you can have one for each project.

A working <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` for a Next.js + Node.js SaaS billing app looks like this:

```md :collapsed-lines
# Project Instructions

This is a SaaS billing application.

---

## Stack

- Next.js 14 (App Router) with TypeScript
- Node.js services for billing and email
- Prisma + PostgreSQL
- Auth.js for authentication
- Resend for transactional email
- BullMQ for background jobs

---

## Commands

- npm run dev - start the dev server
- npm test - run unit tests
- npm run typecheck - type-check the project
- npm run lint - lint the project
- npx prisma migrate dev - run migrations locally

---

## Architecture

- Business logic lives in services or domain modules.
- API routes stay thin and call into services.
- Use the existing email template system; do not add a new one.
- The BullMQ worker handles all scheduled jobs. Do not add cron.
- Tenant isolation is enforced at the service layer, not the route.

---

## Documentation

For deeper context, consult these before guessing:

- `docs/architecture.md` — service boundaries, request flow, tenant isolation model
- `docs/billing.md` — Stripe webhook handling, invoice lifecycle, proration rules
- `docs/email.md` — template system, Resend setup, list of available templates
- `docs/jobs.md` — BullMQ queue names, job patterns, retry/backoff policy
- `docs/db.md` — schema conventions, tenant isolation patterns, soft-delete rules
- `docs/runbooks/` — production incident runbooks
- `prisma/schema.prisma` — source of truth for the data model
- ADRs in `docs/adr/` — past architecture decisions; read before contradicting one

For Next.js, Prisma, Auth.js, BullMQ, or Resend specifics, check the official docs rather than guessing.

---

## Testing

- Every feature has success, validation failure, and not-found tests.
- Use test data builders, not inline setup objects.
- Do not mock the database unless existing tests do.

---

## Don't do

- Do not log raw payment payloads.
- Do not return database errors directly to the client.
- Do not edit migrations after they have been merged.
```

::: note Keep <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` tight.

100 to 300 lines is healthy. If a section grows into a multi-step procedure, that procedure belongs in a skill, not in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`. <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` is for facts and rules. Workflows go in the next building block.

:::

::: tip A trick for growing your <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` naturally

Every time the AI makes a mistake that surprises you, ask yourself if a rule in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` would have prevented it. Add the rule. Over a few weeks, your <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` becomes a record of every assumption the AI got wrong, and your future sessions get noticeably better.

#### Skills: The Workflows You Keep Retyping

A skill is a small folder with a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file inside. Claude scans every skill's name and description on startup, but only loads the body when the skill is needed. That progressive loading is what makes it cheap to keep dozens of skills around without slowing the model down.

Use a skill when you keep pasting the same instructions into chat: a commit format, a deployment checklist, a build process, a PR review pattern. Use <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` for facts. Use skills for procedures.

The neat trick is that you do not have to write a skill by hand. Claude will write it for you. Open Claude Code in the project, then ask:

```md
I want to create a Claude Code skill that captures how I build a production feature on this project. The skill should cover:

1. How to read CLAUDE.md and the technical brief before writing code.

2. How to look at 2-3 existing similar features and match their
   patterns.

3. How to write unit tests alongside the production code as normal good engineering (not as a strict TDD red-green loop).

4. How to run typecheck, lint, and the test suite at the end.

5. The conventions our codebase already follows: naming, error handling, where business logic lives, how tests are structured.

Create the skill at .claude/skills/build-with-tests/SKILL.md.
Use the recommended Claude Code skill format with proper YAML
frontmatter (name, description). Make the description specific
enough that the skill triggers automatically when I ask to
build, implement, or extend a feature.

Show me the file before writing it.
```

Claude reads your existing code, infers the patterns, and proposes a skill file. You review it, edit anything that does not match your taste, then save. The skill is now part of the repo, and every future session can use it. You can also use Claude's skill-creator to bootstrap new skills with `/skill-creator create me a new skill...`.

Here is the kind of file Claude will produce:

```md :collapsed-lines
---
name: build-with-tests
description: Use this skill when implementing a feature or extending existing behaviour. Reads CLAUDE.md and the technical brief first, matches existing patterns, writes production code with unit tests alongside it, and runs the project's typecheck and test commands at the end. Triggers on: "build", "implement", "add", "extend", "ship the feature".
---

Process:

1. Read CLAUDE.md so you know the project rules and stack.
2. Read the technical brief so you stay inside its scope.
3. Look at 2-3 similar features in the codebase. Note their file layout, naming, error handling, and test structure.
4. Implement the feature in the smallest coherent steps you can.
For each step:
   - Write the production code.
   - Write a unit test that covers the new behaviour.
   - Run the test and confirm it passes.
5. When the feature is complete, run the full typecheck, lint,
   and test commands from CLAUDE.md.
6. Return a short summary: files changed, patterns reused, any
   rule you would suggest adding to CLAUDE.md.

Conventions used in this project:

- File names follow the existing folder structure.
- Tests live next to the code they cover (or in tests/ if that
  is the existing pattern).
- Use builders from test/builders/ for any entity setup.
- Cover success, validation failure, and one edge case per
  behaviour.

Rules:

- Do not refactor unrelated code.
- Do not change files outside the agreed scope.
- Do not add new dependencies without explicit instruction.
- If you cannot make the tests pass without violating a rule,
  stop and report the conflict.
```

With this skill saved, you no longer paste the process every time. You can just write:

```md
Use the build-with-tests skill to implement the invoice reminder service.
```

::: warning The most common skill mistake.

Avoid the mega-skill. A single SKILL.md trying to handle commits, PRs, branch naming, and changelog updates all at once tends to fire less reliably and confuse the model when two parts conflict. Split them. A good skill fits on one screen.

:::

#### Hooks: Automatic Gates and Workflow Triggers

Some parts of an AI workflow should not depend on the model remembering them.

A prompt can say, "run the tests before finishing." <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` can say, "do not edit secret files." A skill can say, "validate the implementation before opening a PR." But those are still instructions. The model can forget. The model can choose to skip.

A hook is different.

A hook is an automatic action that runs at a specific point in the Claude Code session lifecycle. It can run a shell command, call an HTTP endpoint, or trigger a prompt or agent-based check depending on how you configure it.

That makes hooks useful for two things:

1. **Gates.** Stop or warn when something unsafe happens.
2. **Workflow triggers.** Notify another system when something important happens.

In a software factory, agents do the work, but hooks enforce the rules around them.

Claude Code hooks can run at lifecycle events such as:

- `UserPromptSubmit`: before Claude processes your prompt
- `PreToolUse`: before Claude runs a tool
- `PostToolUse`: after a tool succeeds
- `Stop`: when Claude finishes a response
- `SubagentStart`: when a subagent starts
- `SubagentStop`: when a subagent finishes

A simple, useful hook is a pre-commit gate that blocks credential files from ever being committed. Save this as <VPIcon icon="fas fa-folder-open"/>`.claude/hooks/`<VPIcon icon="iconfont icon-shell"/>`pre-commit.sh`:

```sh
#!/usr/bin/env bash
# Block commits that would include sensitive files.

if git diff --cached --name-only \
   | grep -qE '.(env|key|pem)$|secrets.json|creds.md'; then
  echo "BLOCKED: attempt to commit sensitive files"
  exit 1
fi
```

Wire it into your Claude Code hook configuration so it runs before commits. The configuration syntax lives in the official Claude Code hooks docs, but the shape is JSON and looks roughly like this:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/pre-commit.sh"
          }
        ]
      }
    ]
  }
}
```

That is deliberately minimal. In a real project you would also use `PostToolUse` to run formatters after edits, and `Stop` to run typecheck and tests before Claude finishes a response. Once it is wired, the hook runs every time, regardless of what the model thinks.

A few other hooks that pay off quickly:

- **PostToolUse on Edit**: run the formatter so every AI edit comes out formatted.
- **Stop**: run typecheck and tests, refuse to stop if either fails.
- **SubagentStop on validator**: post the validator's findings to your team Slack channel automatically.

Hooks matter because they cannot be argued with. The model can suggest, plan, and write. The lint, the type-check, and the test run on every change. That asymmetry is what keeps a software factory honest.

#### How the Four Blocks fit Together

A simple way to remember which block to reach for:

- <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` answers "what is true here?" Project facts and rules.
- **Skills** answer "how is this done?" Repeatable procedures.
- **Subagents** answer "who should do this?" Focused workers (next section).
- **Hooks** answer "what is enforced?" Deterministic gates.

You will use all four. <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` tells the AI the rules of your codebase. Skills give the AI repeatable playbooks. Subagents give it focused workers. Hooks make sure the rules are real and not optional.

The four blocks are the foundation. Section 6 is where we build the workers that actually do the factory's work.

---

## Part 2: Build the Agent Factory

You now have everything Part 1 promised. You know how to keep the AI's context clean. You have a <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` it can lean on. You understand skills and hooks. That is the ground floor.

The next four sections are the factory itself.

Section 6 builds the seven specialized agents. Section 7 puts an orchestrator on top of them so the chain runs itself. Section 8 covers how the factory's output reaches production safely. Section 9 is the hands-on walkthrough where you build the whole thing in your own repo.

By the end of Part 2, the workflow you have been doing by hand will be running on its own. You will type one prompt. The orchestrator will route the work. The agents will do their focused jobs. You will step in at three approval points where your judgement matters. That is the shift.

### 6. The Agent Layer: Seven Agents That Do Focused Work

Now we get to the part that makes a factory a factory.

So far we have been giving the AI better instructions and better memory. But the AI is still one worker doing every job in the same chat. That is fine for small tasks. It does not scale to real feature work.

The fix is to split the work across specialized agents. In Claude Code these are called subagents. A subagent is not just a longer chat message. It is a focused worker with its own job description, its own tool permissions, and its own context window. That last piece is the one that matters most.

When the main session delegates work to a subagent, the subagent does the heavy reading or processing in its own context. It returns only a short summary to the main thread. The verbose part (file searches, log dumps, multi-step exploration) never bloats your main conversation.

Picture it like this. Your main Claude Code session is the lead engineer. Subagents are specialists you call in for specific tasks. A researcher who maps the codebase. A story writer who turns ideas into user stories. A spec writer who turns stories into technical briefs. A backend builder who writes API routes, services, and database access. A frontend builder who writes components and pages. A test verifier who writes acceptance tests against the user story once the feature is built. A validator who compares everything against the brief.

Each one is good at one thing. None of them tries to do everything.

#### Why One Big AI Session is Not Enough

Imagine you ask your main session "build the invoice reminder feature." The session inspects files, designs the data model, writes API routes, builds UI, adds tests, and updates documentation. That sounds great until you realize one conversation is now carrying product thinking, architecture, database design, backend implementation, frontend implementation, testing, documentation, and self-review. The context is heavy, the model mixes responsibilities, and the same conversation that designed the feature is also reviewing it. That is a self-graded paper.

Splitting work into subagents fixes that. Each subagent has a narrow responsibility, a clean context window, and only sees what it needs. The validator does not see how the code was written. It sees what was supposed to be built and what is now on disk. That is exactly the gap a real reviewer looks for.

#### Let Claude Write the Agent File for You

You can write a subagent file by hand if you want (it is just Markdown with YAML frontmatter) but there is rarely a reason to. The cleaner workflow is to use the `/agents` slash command and let Claude itself draft the file from your description.

Here is the workflow, end to end. Open Claude Code in your project and type:

```sh
/agents
```

That opens the agent management view. Choose to create a new project-level agent (which lives at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/`<VPIcon icon="fa-brands fa-markdown"/>`<name>.md` and gets committed to your repo so the whole team uses it) and ask Claude to generate it for you. Claude will ask what the agent should do, what tools it should have, and what model it should run on.

The key idea is this: you describe the role you want. Claude writes the file. You review, edit, save, commit. Repeat for every agent your team needs.

#### Tool Access and Model Selection are Part of the Design

Before we look at the seven agents, two design choices apply to every one of them.

**Tool access.** A common beginner mistake is giving every agent every tool. That is risky. If an agent's job is to inspect architecture, it should not have Edit. If its job is to review code, it should not have Write. Restricting tools is how you make a subagent's behaviour match its description. The researcher cannot accidentally write code. The validator cannot accidentally fix what it found. The backend builder cannot accidentally edit frontend files. That separation is the point.

**Model selection.** Inspection and review do not need a top-tier model. Routing them to a smaller, faster, cheaper model (Haiku) is one of the practical reasons subagents exist. Save the top-tier model (Sonnet, or Opus when reasoning quality really matters) for the work that needs it: the spec writer, the builders, the test verifier, and the validator.

#### The Anatomy of a Good Agent Definition

Before we look at the seven specific agents, here is the shape every good agent definition follows. You can use this as a template to design your own agents later. Anything the agents below have, you can copy. Anything they do not have but your team needs, you can add.

Two things beginners almost always miss when they design their first agent. The first is **boundaries**. They tell the agent what to do but not what it must not do, and the agent ends up doing both. The second is **output format**. They tell the agent what to think about but not how to return the result, so each invocation produces a slightly different shape and the next agent in the chain cannot rely on it. Both of those are in the template below.

Here is the template, written as if you were briefing a new agent on day one:

```md :collapsed-lines
Subagent name:
  <short-kebab-case-name>

Purpose:
  One sentence on why this agent exists and what it is for.

Main responsibility:
  One sentence on the single job this agent owns.

What it should investigate / do:
  - Specific thing one
  - Specific thing two
  - Specific thing three
  (Be concrete. "Find similar features already implemented" is
   better than "understand the codebase".)

What it should NOT do:
  - The action it must never take (for example, edit files)
  - The decision it must never make (for example, invent rules)
  - The tool it must never use
  - The scope it must never widen
  (Boundaries are what make an agent's behaviour predictable.)

Tool access:
  Only the tools this agent actually needs.

Model:
  haiku for cheap inspection, sonnet for reasoning,
  opus when reasoning quality is critical.

Output format:
  1. Section one of the result (for example, "Relevant files")
  2. Section two (for example, "Existing patterns to follow")
  3. Section three (for example, "Risks or conflicts")
  (This is the contract with the next agent in the chain.
   A consistent output shape is what makes chaining reliable.)

Behaviour rules:
  - Short, specific rules the agent must follow every time
  - Limits on length, scope, or assumptions
  - When to ask a clarifying question instead of guessing
```

That is the shape. You hand it to Claude using the `/agents` slash command and ask Claude to create the agent file from the template. Claude turns it into a complete <VPIcon icon="fas fa-folder-open"/>`.claude/agents/`<VPIcon icon="fa-brands fa-makrdown"/>`<name>.md` with the right YAML frontmatter, formatted system prompt, and tool restrictions.

The seven agents below all follow this shape. Once you understand the template, you can design your own. A design-system reviewer that checks new components against your tokens. An accessibility auditor that reads new UI code and flags issues. A migration writer that turns a schema change into a Prisma migration with the right naming. A release-note drafter that reads recent merges and writes a summary. Anything your team keeps doing by hand and would like to capture once.

### The Seven Agents at a Glance

Before drilling into each one, here is the whole chain on one screen.

| Agent | Purpose | Main output | Tools |
| --- | --- | --- | --- |
| `codebase-researcher` | Map the relevant code before anything is built | Relevant files, existing patterns, risks | Read, Grep, Glob |
| `story-writer` | Turn a rough feature idea into a user story | Story, acceptance criteria, edge cases | Read |
| `spec-writer` | Turn the approved story into a technical brief | Data model, flow, API, UI, tests, risks | Read, Grep, Glob |
| `backend-builder` | Build the backend half | Services, API, jobs, migrations, unit tests | Read, Edit, Write, Bash |
| `frontend-builder` | Build the frontend half | Components, pages, hooks, UI tests | Read, Edit, Write, Bash |
| `test-verifier` | Add acceptance tests against the user story | Acceptance tests and coverage report | Read, Edit, Write, Bash |
| `implementation-validator` | Compare implementation against the story and brief | Findings grouped by severity | Read, Grep, Glob |

These seven cover the path from feature idea to a vertical slice ready for PR. They are not the canonical set. They are an opinionated starting point. Section 6 ends with how to grow the library beyond these.

Now let's build the seven.

#### Agent 1: Codebase-Researcher

This is the explore-before-build habit from Section 4, captured as a reusable worker. It maps the relevant parts of the codebase and returns findings. It never writes code.

Type `/agents` and use this description:

```md :collapsed-lines
Create a project-level subagent named codebase-researcher.

Its job: inspect this codebase and explain how a specific area
works, without editing anything.

Inputs: a question about an area of the codebase (for example, "how does invoice creation work today?").

Outputs:
- a short list of the relevant files with paths
- a concise summary of the current architecture in that area
- the patterns and conventions in use
- risks or missing information the next agent should know about

Tool access: Read, Grep, Glob only. No Write. No Edit. No Bash.

Recommended model: haiku (this is cheap inspection work).
Recommended color: teal.

Behaviour rules:
- Never edit files.
- Never run commands that modify state.
- Keep the summary under 400 words.
- If a question is ambiguous, ask one clarifying question first.
```

Claude reads your description, picks reasonable defaults, and writes the file for you. In your terminal you will see something like:

::: note

I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/codebase-researcher.md` with the following content. The agent is restricted to read-only tools (Read, Grep, Glob) so it cannot accidentally modify your codebase. I have set the model to Haiku to keep inspection cheap. Restart your Claude Code session to load the new agent, then invoke it with `@codebase-researcher` followed by the area of code you want explained.

:::

You will get an agent file like this:

```md :collapsed-lines
---
name: codebase-researcher
description: Read-only investigator that maps the relevant parts of the codebase before any code is written. Returns the files involved, the patterns in use, similar features that already exist, and risks the next agent should know about. Use as the first step of any feature.
tools: Read, Grep, Glob
model: haiku
color: teal
---

You are a read-only investigator for this project. Your only
job is to inspect the codebase and explain how a specific area
works so the next agent has a clear, accurate map to build on.

When invoked, expect a question about an area of the codebase,
for example: "how does invoice creation work today?" or "where
is the email-sending code?".

Produce, every time, in this exact order:

1. **Relevant files**
   File paths grouped by role (services, API routes, models,
   workers, tests). Cite paths exactly.

2. **Existing patterns to follow**
   Naming conventions, folder structure, how business logic is
   organised, how errors are handled, how tests are structured.

3. **Similar feature examples**
   Two or three existing features in the codebase that solve
   a similar shape of problem. Cite paths.

4. **Risks or conflicts**
   Places where the proposed change could break old features,
   tenant boundaries that need to be preserved, timezone
   handling that already exists, anything that smells fragile.

5. **Recommended implementation plan (high level)**
   A short bullet list of how the change should fit into the
   existing system. Do not write code. Do not commit to one
   approach over another if more than one is reasonable.

6. **Tests that should be updated or added**
   Existing test files that probably need updates, plus the
   new test cases you would expect.

7. **Open questions** (only if you have any)
   Things that are genuinely unclear from the codebase. Never
   guess. Ask instead.

Behaviour rules:

- Never edit files.
- Never run commands that modify state.
- Keep the whole summary under 400 words.
- If the user's question is ambiguous, ask one clarifying
  question before investigating.
- Cite every file path exactly.
- If the answer requires running code or seeing live data,
  say so. Do not guess from filenames alone.
```

You will see this same flow for every agent below. The pattern is always: you describe the role using the `/agents` slash command, Claude generates the actual file, you review it, and you commit it to the repo. If you prefer to skip the `/agents` flow entirely, you can paste the generated files directly into <VPIcon icon="fas fa-folder-open"/>`.claude/agents/`<VPIcon icon="fa-brands fa-makrdown"/>`<name>.md` and they will work the same way.

#### Agent 2: Story-Writer

Turns a rough feature idea into a user story with acceptance criteria, edge cases, and out-of-scope items. This is the agent that catches things before any code is written.

```md
Create a project-level subagent named story-writer.

Its job: take a rough feature idea (from the user) plus
exploration findings (from codebase-researcher) and produce
a clear user story.

Inputs:
- a rough feature description
- exploration findings from codebase-researcher
- any product or business rules already known

Outputs:
1. One user story in the form:
   "As a <role>, I want <behaviour>, so that <outcome>."
2.- Acceptance criteria that a test can verify directly. Cover the happy path, the obvious failure paths, and the rules from the brief.
3. A list of edge cases worth thinking about.
4. A list of explicitly out-of-scope items.

Tool access: Read only.
Recommended model: sonnet.
Recommended color: purple.

Behaviour rules:
- Use plain language. Avoid jargon.
- Do not invent product rules. If something is unclear, list
  it as an open question instead of guessing.
- Keep the story under one page.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/story-writer.md` with the following content. Restart your session to pick it up. You can invoke it with `@story-writer` and a feature idea, ideally with the codebase researcher's findings attached.

```md :collapsed-lines
---
name: story-writer
description: Turns a rough feature idea plus codebase exploration findings into a clear user story with acceptance criteria, edge cases, and out-of-scope items. Read-only. Use this after the codebase researcher has produced findings, before any technical brief is written.
tools: Read
model: sonnet
color: purple
---

You are the user story author for this project. Your job is to
turn a rough feature idea into a clear, testable user story
that the rest of the chain can build against.

When invoked, expect to receive:

- A rough feature description from the user.
- Exploration findings from the codebase-researcher agent.
- Optionally, any product or business rules already known.

Produce, every time, in this exact order:

1. **User story**
   One sentence in the form:
   "As a <role>, I want <behaviour>, so that <outcome>."

2. **Acceptance criteria**
   Statements that a test can verify directly. Cover the happy
   path, the obvious failure paths, and the rules from the
   brief.

3. **Edge cases worth thinking about**
   Boundary conditions, retries, multi-tenant concerns,
   permission edges, anything that often goes wrong.

4. **Out of scope**
   Things this story explicitly does not cover, so the team
   knows what NOT to build.

5. **Open questions** (only if you have any)
   Things that are genuinely unclear from the input. Never
   invent answers. Always ask instead.

Behaviour rules:

- Use plain language. Avoid product or framework jargon.
- Never invent business rules. If a rule is missing, ask.
- Keep the whole story to one page or less.
- Do not write code or technical design. That is the spec
  writer's job.
```

:::

#### Agent 3: Spec-Writer

Turns the approved user story plus exploration findings into a technical brief. Data model changes, background flow, API changes, frontend changes, tests required, risks. This agent is read-only. It cannot edit code.

```md
Create a project-level subagent named spec-writer.

Its job: take an approved user story and exploration findings,
and produce a technical brief that the backend builder, frontend
builder, and test verifier can follow.

Inputs:
- an approved user story
- exploration findings from codebase-researcher
- CLAUDE.md and any relevant project rules

Outputs (one short Markdown document):
- Data model changes
- Background flow / process flow
- API changes (if any)
- Frontend changes (if any)
- Tests required (success, failure, edge cases)
- Risks and open questions
- Files that will change

Tool access: Read, Grep, Glob.
Recommended model: sonnet.
Recommended color: indigo.

Behaviour rules:
- Read CLAUDE.md before writing the brief.
- Prefer reusing existing infrastructure. Call out any new
  scheduler, new database, or new third-party dependency.
- Highlight tenant isolation and timezone concerns explicitly.
- Never edit files.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/spec-writer.md` with the following content. The agent is read-only and is configured to read <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` before producing each brief, so the brief stays consistent with your project's architecture rules.

```md :collapsed-lines
---
name: spec-writer
description: Turns an approved user story plus exploration findings into a short technical brief that the build and verification agents can follow. Read-only. Always reads CLAUDE.md before writing. Use after the user story has been approved.
tools: Read, Grep, Glob
model: sonnet
color: indigo
---

You are the technical brief writer for this project. Your job
is to turn an approved user story plus the codebase researcher's findings into a short, actionable brief that downstream agents can follow without ambiguity.

Before writing:

1. Read CLAUDE.md for the project's stack, architecture rules,
   and "don't do" list.
2. Read the user story and the researcher's findings.
3. If something material is missing or unclear, list it as an
   open question. Do not guess.

Output a short Markdown document with these sections, in order:

**Data model changes**

- Which models change. What fields. What types.
- Any migration considerations.

**Background flow / process flow**

- Step-by-step description of how the behaviour runs.
- Which existing infrastructure it reuses.

**API changes**

- New or changed endpoints, with request and response shape.
- Auth and authorization requirements.

**Frontend changes**

- New or changed components, hooks, or pages.
- How they call the API and handle loading / error states.

**Tests required**

- Success cases.
- Failure cases.
- Edge cases (boundaries, retries, deduplication).
- Acceptance tests at the user-story level.

**Risks and open questions**

- Tenant isolation concerns. State them explicitly.
- Timezone concerns. State them explicitly.
- Anything else the team should decide before code is written.

**Files that will change**

- Bullet list of file paths, grouped by backend / frontend / tests.

Behaviour rules:

- Prefer reusing existing infrastructure. Any new scheduler,
  new database, or new third-party dependency must be called
  out explicitly with a justification.
- Tenant isolation and timezone handling must always be
  addressed, even if only to say "no tenant boundary applies"
  or "timezone is irrelevant for this feature."
- Never edit files.
- Keep the whole brief under one page where possible.
```

#### Agent 4: Backend-Builder

This is the first of the build-side agents. Its job is the backend half of a feature: API routes, services, database access, background jobs, and the unit tests that cover its own code. It does not touch frontend files.

A note before the prompt. Writing "only edit backend files" inside an agent definition is guidance, not a hard security boundary. The agent will usually obey, but the strongest enforcement comes from Claude Code permissions, hooks that reject edits to specific paths, or CI checks that fail when a PR touches files outside its declared scope. Use prompt rules for direction. Use hooks and CI for enforcement.

```md :collapsed-lines
Create a project-level subagent named backend-builder.

Its job: implement the backend half of a feature described in
the technical brief. That means API routes, services, database
access, background jobs, and unit tests for the code it writes.

Inputs:
- the approved technical brief
- the codebase researcher's findings
- CLAUDE.md and any relevant project rules
- the build-with-tests skill (project skill)

Outputs:
- backend code that implements the brief
- unit tests that cover the new behaviour
- a short summary: files changed, patterns reused, any rule
  worth adding to CLAUDE.md

Tool access: Read, Edit, Write, Bash. Restricted to backend
folders (services, API routes, workers, migrations, server-side
helpers, and their tests).
Recommended model: sonnet.
Recommended color: green.

Behaviour rules:
- Use the build-with-tests skill for conventions.
- Read CLAUDE.md and the brief before editing anything.
- Only edit backend files. Do not touch React components, pages,
  or client-side hooks.
- Match existing patterns. Reuse existing helpers, services, and templates instead of writing new ones.
- Do not add new dependencies without explicit instruction.
- Run typecheck, lint, and the test suite at the end. Report
  pass/fail and any unexpected failures.
- If a project rule that would have helped is missing from
  CLAUDE.md, surface it as a suggested addition.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/backend-builder.md` with the following content. This agent has full edit and bash access, scoped to backend folders. I have added explicit rules so it does not stray into frontend files and so it always uses the build-with-tests skill for conventions.

```md :collapsed-lines
---
name: backend-builder
description: Implements the backend half of a feature: API routes, services, database access, background jobs, and unit tests. Reads CLAUDE.md, the technical brief, and matches existing patterns. Uses the build-with-tests skill. Restricted to backend folders.
tools: Read, Edit, Write, Bash
model: sonnet
color: green
---

You are the backend implementation worker for this project.
Your job is to implement the backend half of the feature
described in the approved technical brief.

Before you edit anything:

1. Read CLAUDE.md so you know the project rules and stack.
2. Read the technical brief so you stay inside its scope.
3. Load the build-with-tests skill for conventions.
4. Look at 2-3 similar backend features in the codebase and
   match their patterns.

Implementation rules:

- Only edit backend files: services, API routes, workers,
  migrations, server-side helpers, and their tests.
- Never edit React components, pages, or client-side hooks.
  That is the frontend-builder's job.
- Match existing patterns. If a helper, service, or template
  already does what you need, use it instead of writing a new
  one.
- Do not refactor unrelated code.
- Do not add new dependencies without explicit instruction.
- Write unit tests alongside the production code.

After you edit:

1. Run the project's typecheck, lint, and test commands (from
   CLAUDE.md).
2. Confirm all tests pass.
3. Return a short summary:
   - Files added / edited (backend only)
   - Patterns and helpers reused
   - Anything you noticed that would benefit from a CLAUDE.md
     rule

If you cannot complete the work without violating one of the
rules above, stop and report the conflict.
```

### Agent 5: Frontend-Builder

This is the second build-side agent. Its job is the frontend half of the same feature: components, pages, hooks, client-side state, and the unit/component tests that cover its own code. It does not touch backend files. It consumes the API contract the backend builder has already produced.

```md :collapsed-lines
Create a project-level subagent named frontend-builder.

Its job: implement the frontend half of a feature described in
the technical brief. That means React components, pages, hooks,
client-side state, and component tests for the code it writes.

Inputs:
- the approved technical brief
- the codebase researcher's findings
- the backend builder's summary (so it knows the API contract)
- CLAUDE.md and any relevant project rules
- the build-with-tests skill (project skill)

Outputs:
- frontend code that implements the brief
- component and unit tests that cover the new behaviour
- a short summary: files changed, patterns reused, any rule
  worth adding to CLAUDE.md

Tool access: Read, Edit, Write, Bash. Restricted to frontend
folders (components, pages, hooks, client-side helpers, and
their tests).
Recommended model: sonnet.
Recommended color: blue.

Behaviour rules:
- Use the build-with-tests skill for conventions.
- Read CLAUDE.md and the brief before editing anything.
- Only edit frontend files. Do not touch services, API routes,
  workers, or migrations.
- Consume the API exactly as the backend builder produced it.
  Do not invent endpoints or response shapes.
- Match existing component patterns: styling, accessibility,
  loading and error states.
- Do not add new dependencies without explicit instruction.
- Run typecheck, lint, and the test suite at the end. Report
  pass/fail and any unexpected failures.
- If a project rule that would have helped is missing from
  CLAUDE.md, surface it as a suggested addition.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/frontend-builder.md` with the following content. This agent has full edit and bash access, scoped to frontend folders. It consumes the API contract the backend builder produced, rather than inventing endpoints of its own.

```md :collapsed-lines
---
name: frontend-builder
description: Implements the frontend half of a feature: components, pages, hooks, client-side state, and component tests. Reads CLAUDE.md, the technical brief, the backend builder's summary, and matches existing component patterns. Uses the build-with-tests skill. Restricted to frontend folders.
tools: Read, Edit, Write, Bash
model: sonnet
color: blue
---

You are the frontend implementation worker for this project.
Your job is to implement the frontend half of the feature
described in the approved technical brief, consuming the API
that the backend builder has already produced.

Before you edit anything:

1. Read CLAUDE.md so you know the project rules and stack.
2. Read the technical brief so you stay inside its scope.
3. Read the backend builder's summary so you know exactly which
   endpoints exist and what they return.
4. Load the build-with-tests skill for conventions.
5. Look at 2-3 similar components or pages in the codebase and
   match their patterns.

Implementation rules:

- Only edit frontend files: components, pages, hooks, client-side helpers, and their tests.
- Never edit services, API routes, workers, or migrations. That
  is the backend-builder's job.
- Consume the API exactly as the backend builder produced it.
  If the shape is wrong for the UI, surface the mismatch as
  feedback instead of patching around it.
- Match existing component patterns. Styling, accessibility,
  loading states, and error handling should look like the rest
  of the codebase.
- Do not refactor unrelated code.
- Do not add new dependencies without explicit instruction.
- Write component or unit tests alongside the production code.

After you edit:

1. Run the project's typecheck, lint, and test commands (from
   CLAUDE.md).
2. Confirm all tests pass.
3. Return a short summary:
   - Files added / edited (frontend only)
   - Patterns and components reused
   - Anything you noticed that would benefit from a CLAUDE.md
     rule

If you cannot complete the work without violating one of the
rules above, stop and report the conflict.
```

### Agent 6: Test-Verifier

Once the feature is built end to end, the test verifier writes acceptance tests that exercise the user story directly. Unit tests live next to the code they cover (the build agents wrote them). Acceptance tests live here. They are how the chain proves the feature actually does what the story said it should.

```plaintext
Create a project-level subagent named test-verifier.

Its job: given the approved user story, the approved technical
brief, and a feature that has already been built end to end,
write acceptance tests that exercise the user story and confirm
each acceptance criterion holds.

Inputs:
- the approved user story (with acceptance criteria)
- the approved technical brief
- the backend builder's and frontend builder's summaries
- the build-with-tests skill (project skill)

Outputs:
- one acceptance test file (or one extension of an existing
  one) that covers every acceptance criterion in the story
- a short report of which criteria are covered and which are
  not (only if any are missing or untestable)

Tool access: Read, Edit, Write (test files only), Bash.
Recommended model: sonnet.
Recommended color: yellow.

Behaviour rules:
- Read the user story and the brief before writing.
- Use the build-with-tests skill for conventions.
- Cover every acceptance criterion, plus the edge cases listed
  in the story.
- Do not modify backend or frontend files outside the test
  folder.
- After writing, run the new tests once. Report pass/fail and
  any acceptance criterion that could not be covered cleanly.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/test-verifier.md` with the following content. The agent is scoped to test files only. It uses the build-with-tests skill for conventions and runs after both build agents have finished, so it has a working feature to test against.

```md :collapsed-lines
---
name: test-verifier
description: Writes acceptance tests against the user story after the build agents have finished. Confirms every acceptance criterion holds against the built feature. Uses the build-with-tests skill. Run after backend-builder and frontend-builder.
tools: Read, Edit, Write, Bash
model: sonnet
color: yellow
---

You are the acceptance test author for this project. Your job is to verify, with tests, that the feature now built end to end
actually satisfies every acceptance criterion in the user story.
 
Before writing:

1. Read the approved user story so you know every criterion.
2. Read the approved technical brief so you know how the
   feature is wired together.
3. Read the backend builder's and frontend builder's summaries
   so you know which endpoints, components, and behaviours exist.
4. Load the build-with-tests skill for conventions.
5. Look at 2-3 existing acceptance tests in the codebase and
   match their style.

Writing rules:

- Cover every acceptance criterion in the user story.
- Cover the edge cases the story lists.
- Use the project's test data builders, not inline setup.
- Follow the project's existing acceptance-test layout.
- Edit only test files. Do not edit any code.

After writing:

1. Run the new tests.
2. If any fail, the feature does not satisfy the story. Report
   exactly which criterion failed and why. Do not patch the
   code. That is for the build agents to fix on the
   next loop.
3. If any criterion cannot be covered cleanly (for example, the
   brief did not name a way to observe it), report it. Do not
   invent a workaround.
4. Return a short summary: criteria covered, criteria failed,
   criteria that need clarification.
```

### Agent 7: Implementation-Validator

Compares the current state of the implementation against the approved story and brief. Reports gaps. Never fixes them. The validator is the agent that catches everything the build agents and test verifier missed.

```md :collapsed-lines
Create a project-level subagent named implementation-validator.

Its job: compare the current implementation against the approved user story and technical brief, and report gaps. It does not fix anything.

Inputs:
- the approved user story
- the approved technical brief
- the current state of the implementation (files on disk)
- the test verifier's report

Outputs, grouped by severity:
- critical (must fix before merge)
- important (should fix before merge)
- minor (nice to have)
- recommended next agent

Always check for:
- missing acceptance criteria
- missing tests for failure paths
- security issues (auth checks, tenant isolation, raw error
  exposure, secrets in logs)
- changes to files outside the agreed scope
- inconsistent project patterns (compared to CLAUDE.md and
  existing code)
- duplicate logic that should be reused
- timezone or multi-tenant concerns from the brief that the
  implementation may have missed

Tool access: Read, Grep, Glob.
Recommended model: sonnet (this needs careful reasoning).
Recommended color: red.

Behaviour rules:
- Never edit files.
- Never run destructive commands.
- Always cite the file and line number for each finding.
- If a finding is opinion-based rather than a real risk,
  mark it as such.
```

Claude responds:

> I have created the agent at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/implementation-validator.md` with the following content. Restart your Claude Code session to load it. You can then invoke it as `@implementation-validator` once the chain has produced an implementation to review.

```md
---
name: implementation-validator
description: Strict reviewer that compares the current implementation against the approved user story and technical brief and reports gaps grouped by severity. Never edits files. Use after the build and verification agents have finished, before opening a PR.
tools: Read, Grep, Glob
model: sonnet
color: red
---

You are an implementation validator for this project. Your only
job is to compare the code on disk against the approved user
story and technical brief, and report what is missing or wrong.
You do not fix anything.

Inputs you should expect:

- The approved user story.
- The approved technical brief.
- The current state of the implementation (files on disk).
- The test verifier's report.

What to check, every time:

- Acceptance criteria from the story that are not implemented.
- Failure paths from the brief that have no test coverage.
- Security issues: missing auth checks, tenant isolation gaps,
  raw error exposure, secrets in logs, missing rate limits on
  sensitive endpoints.
- Changes to files outside the agreed scope.
- Inconsistencies with project patterns documented in CLAUDE.md
  or visible in the existing codebase.
- Duplicate logic that should reuse existing helpers.
- Timezone or multi-tenant concerns called out in the brief
  that the implementation may have missed.

Output format, every time:

**Critical** (must fix before merge)

- `<one finding, with file path and line number>`
- ...

**Important** (should fix before merge)

- `<finding>`
- ...

**Minor** (nice to have)

- `<finding, marked "(opinion)" if it is opinion-based>`
- ...

**Recommended next agent**

- `<e.g. "backend-builder to fix tenant isolation in X, then test-verifier to add the matching acceptance test">`

Behaviour rules:

- Never edit files.
- Never run destructive commands.
- Cite the file and line number for every finding.
- Mark opinion-based findings clearly so reviewers can ignore
  them safely.
- If you find no critical or important issues, say so plainly.
  Do not invent issues to look thorough.
```

#### These seven are examples, not the canonical set

Seven agents is enough to ship real features. It is not a ceiling. The whole point of the pattern is that your team builds the agents your team needs, using the anatomy template from earlier in this section. Sky is the limit. Build whatever you want.

A short list of agents you might add next, depending on where your team feels friction:

- **accessibility-reviewer**: reads new UI code and flags missing labels, contrast issues, keyboard traps, and other problems against your project's standards.
- **security-reviewer**: runs before the validator and checks for missing auth, tenant isolation gaps, unsafe deserialization, and dependency risks.
- **migration-writer**: turns a brief's schema change into a Prisma (or your ORM's) migration with the project's naming and rollback conventions.
- **design-system-reviewer**: checks new components against your design tokens, spacing scale, and existing component library before they ship.
- **docs-updater**: reads the final diff and updates the README, feature docs, or operator notes from it.
- **release-note-writer**: reads recent merges and drafts the user-facing change summary in your team's style.
- **payments-integration**: knows your Stripe webhook conventions inside out, so any engineer can ship a feature that touches billing without a payments specialist on the path.

Each one is the same shape: a focused role, restricted tools, a clear input/output contract, behaviour rules. Use the anatomy template, hand it to Claude with `/agents`, review the file, commit it. The factory grows the way your codebase grows. Add what you keep doing by hand. Remove what no longer pays for itself.

#### Start smaller if seven feels like a lot

If standing up seven agents in one weekend feels like too much, do not. The smallest useful version of this pattern is three:

```plaintext
codebase-researcher → build-with-tests skill → implementation-validator
```
<!-- TODO: mermaid화 -->

Researcher maps the code. The skill keeps the build agent honest. The validator catches what you missed. Run a few features through that three-piece setup, see where it hurts, then add the next agent that would have prevented the friction. Most teams do not need all seven on day one.

#### Built-in Subagents You Already Have

Before you build any of the seven above, Claude Code already ships with a few subagents you should know about and use where they fit:

- **Explore** is read-only and tuned for searching and understanding codebases. Cheap, fast. You can use it directly, or wrap it with your own codebase-researcher when you want a tighter output format.
- **Plan** gathers context inside plan mode and proposes an implementation plan before any file changes happen.
- **General-purpose** handles tasks that need both exploration and modification.

Reach for the built-in ones when they fit. Build custom ones when you want a tighter contract on inputs and outputs, or when you want to enforce a specific behaviour rule.

Seven agents is enough to run a real factory. The eighth piece, the one that makes them work together, is the orchestrator in the next section.

### 7. The Workflow Layer: The Orchestrator That Runs the Chain

You now have seven agents that each do one thing well. The next question is: who decides when to call which agent, and in what order?

In a vibe-coding workflow, the answer is "the human types prompts." That works, but it makes the human the orchestrator. You hold the chain in your head. You remember to call the researcher first. You remember to pause for review. You remember to invoke the validator at the end. Miss one step and the chain breaks.

The whole point of a factory is that the chain runs itself. The human stays in the loop where judgement matters (approving the story, approving the brief, approving the PR), but the routing between agents is automated.

That is what an orchestrator does.

#### What The Orchestrator Is

The orchestrator is another piece of the factory whose only job is to delegate to other agents in the right order, pass the right inputs forward, pause for human approval at the right points, and recover when an agent reports a problem.

There are a few ways to build it in Claude Code. I will show you two.

1. **As a skill or a slash command.** This is the starter version. Either a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file at <VPIcon icon="fas fa-folder-open"/>`.claude/skills/feature-factory/SKILL.md` (auto-triggers when its description matches what you ask) or a Markdown file at <VPIcon icon="fas fa-folder-open"/>`.claude/commands/feature-factory.md` (runs when you type `/feature-factory`). Same content in either, different way of firing it. Simple, no new concepts, easy to read and edit.
2. **As a subagent.** This is the advanced upgrade. It runs in its own context window and can delegate to the other seven agents using Claude Code's subagent invocation. Cleaner, more powerful, but it adds one more concept on top.

Build the skill/command version first. Live with it for a week. Then upgrade to the agent version when you understand the chain well enough to want stronger automation.

#### The Chain Itself

Here is the chain the orchestrator runs.

![](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/ef23d784-c2d0-4e39-99de-704152309023.png)

There are three human approval points:

1. **After the story.** Is this the right problem? Are the acceptance criteria correct?
2. **After the brief.** Is the design safe? Any red flags before code is written?
3. **After validation.** Is this PR ready to ship?

Everything else is the orchestrator routing work between agents.

#### Version 1: The Orchestrator as a Skill

Create a skill at <VPIcon icon="fas fa-folder-open"/>`.claude/skills/feature-factory/`<VPIcon icon="fa-brands fa-markdown"/>`SKILL.md`. Ask Claude to generate it for you:

```md :collapsed-lines title=".claude/skills/feature-factory/SKILL.md"
Create a Claude Code skill at .claude/skills/feature-factory/SKILL.md that orchestrates a feature build using seven existing subagents: codebase-researcher, story-writer, spec-writer, backend-builder, frontend-builder, test-verifier, implementation-validator.

The skill should:
- Trigger when the user asks to build, ship, or implement a
  feature with phrases like "build a feature", "ship a
  feature", "feature factory", "run the full chain".
- Run the chain in the order described below.
- Pause for human approval after the story and after the brief.
  At each approval point, handle three outcomes: approved,
  changes requested, or rejected.
- Run backend-builder first, then frontend-builder, then
  test-verifier.
- Invoke implementation-validator at the end and report
  critical, important, and minor findings.
- If the validator reports critical gaps, loop back to the
  appropriate builder (backend or frontend), then re-run
  test-verifier and the validator.

Order:
1. codebase-researcher: map the area of code involved.
2. story-writer: produce a user story.
3. ASK HUMAN: approve the story.
   - Approved: continue.
   - Changes requested: re-invoke story-writer with the human's
     feedback. Repeat this step until approved or rejected.
   - Rejected: stop the chain. Summarise what was explored so
     the human can decide what to do next.
4. spec-writer: produce a technical brief.
5. ASK HUMAN: approve the brief.
   - Approved: continue.
   - Changes requested: re-invoke spec-writer with the human's
     feedback. Repeat this step until approved or rejected.
   - Rejected: stop the chain. Keep the approved story so the
     human can resume later with a different technical
     approach.
6. backend-builder: implement backend + unit tests.
7. frontend-builder: implement frontend + component tests.
8. test-verifier: write acceptance tests against the story.
9. implementation-validator: report findings.
10. If critical findings: route back to backend-builder or
    frontend-builder, then re-run test-verifier and the
    validator.
11. ASK HUMAN: final review before opening PR.

Show me the skill file before saving it.
```

Claude will produce something like this:

```md :collapsed-lines
---
name: feature-factory
description: Use this skill when the user asks to build, ship,
  or implement a feature end to end. Runs the full chain of
  seven subagents with human approval points after the story
  and the brief, runs the build agents in order (backend,
  frontend, test-verifier), then validates. Triggers on:
  "build a feature", "ship a feature", "run the factory",
  "feature factory".
---

Process:

1. Invoke the codebase-researcher subagent. Pass the feature
   idea and the relevant area of code. Wait for findings.

2. Invoke the story-writer subagent. Pass the feature idea
   and the researcher's findings. Wait for the user story.

3. Show the story to the user. Ask: "Does this match what
   you want? Reply 'approved' to continue, describe what
   to change, or reply 'reject' to stop the chain."
   - If approved, continue.
   - If changes requested, invoke story-writer again with
     the user's feedback. Repeat this step until approved
     or rejected.
   - If rejected, stop the chain. Summarise what was
     explored so the user can decide what to do next.

4. Invoke the spec-writer subagent. Pass the approved story
   and the researcher's findings. Wait for the technical brief.

5. Show the brief to the user. Ask: "Any design red flags?
   Reply 'approved' to continue, describe what to change,
   or reply 'reject' to stop the chain."
   - If approved, continue.
   - If changes requested, invoke spec-writer again with
     the user's feedback. Repeat this step until approved
     or rejected.
   - If rejected, stop the chain. Keep the approved story
     so the user can resume later with a different
     technical approach.

6. Invoke the backend-builder subagent. Pass the brief and the
   researcher's findings. Wait for the backend implementation
   and its summary.

7. Invoke the frontend-builder subagent. Pass the brief, the
   researcher's findings, and the backend builder's summary
   (so it knows the API contract). Wait for the frontend
   implementation and its summary.

8. Invoke the test-verifier subagent. Pass the approved story,
   the brief, and both builder summaries. Wait for the
   acceptance tests and the verifier's report.

9. Invoke the implementation-validator subagent. Pass the
   approved story, the approved brief, the test verifier's
   report, and the current implementation. Wait for findings.

10. If the validator reports critical findings, route them to
    the right build agent (backend-builder or frontend-builder)
    along with the relevant test from test-verifier. Then
    re-run test-verifier and the validator.

11. Show the validator findings to the user. Ask:
    "Ready to open the PR?"

Rules:

- Never skip the human approval points.
- Never invoke frontend-builder before backend-builder.
- Never invoke test-verifier before both builders have
  finished.
- Never invoke the validator before the chain has produced
  some implementation and the verifier has run.
- Each agent runs in its own subagent context. Pass only
  the inputs that agent needs.
- If any agent reports it cannot complete its task, stop
  and surface the reason to the user.
```

That is the full orchestrator. It is a single Markdown file. It calls seven other Markdown files. Together they are a factory. Now you might thinking what if we have to create only backend endpoint not frontend or vice versa. So that totally depends on your needs. Create in that specific way. Above are just examples. You have to decide what you want to build.

#### Running the Chain: A Compact End-to-End Example

You open Claude Code and type:

```sh
/feature-factory

I want to add reminder emails for invoices that have been unpaid for more than 7 days.
```

What happens next, step by step:

**Step 1.** The orchestrator delegates to `codebase-researcher`. The researcher runs in its own context, reads the invoice, payment, and email files, and returns:

> Invoices are created in `services/invoices/create.ts`. Status is stored on the Invoice model. Transactional email goes through `services/email/send.ts` using Resend templates. BullMQ workers in `workers/` already handle scheduled jobs. No existing reminder logic. Admin UI lives under `app/(admin)/invoices/`. Likely files to change: Invoice model, a new reminder service, the email template registry, a new admin page for manual triggers.

**Step 2.** The orchestrator delegates to `story-writer`, passing the feature idea and the findings. It returns:

> *As an account admin, I want overdue invoice reminders to be sent automatically, so customers are reminded without manual follow-up.*
>
> Acceptance criteria:
>
> 1. A reminder is sent when an invoice is unpaid for more than 7 days.
>
> 2. No reminder is sent for paid invoices.
>
> 3. Duplicate reminders are not sent in the same window.
>
> 4. Failed email attempts do not mark the reminder as sent.
>
> 5. Admins can see when the last reminder was sent.
>
> 6. Admins can manually trigger a reminder for a specific invoice.
> 
> Edge cases: invoice exactly 7 days old, retries, tenant isolation, timezone. Out of scope: SMS reminders, customer-side preferences.

**Step 3.** The orchestrator pauses and offers three options: approve, request changes, or reject. You read the story. It matches what you want, so you approve.

**Step 4.** The orchestrator delegates to `spec-writer`, passing the approved story and the researcher's findings. It returns a brief: data model change (`lastReminderSentAt`), BullMQ flow, admin endpoint for manual trigger, admin UI tile showing last sent time, tests required, risks (multi-tenant, timezone).

**Step 5.** You read the brief. You notice it says "we will store processed invoice IDs in memory." Red flag. You reply:

```md
Change the deduplication approach. Do not use in-memory state.
Use the lastReminderSentAt column instead.
```

The orchestrator re-invokes `spec-writer`, the brief is updated, you approve.

**Step 6.** The orchestrator delegates to `backend-builder`, passing the brief and the researcher's findings. The builder adds `lastReminderSentAt` to the Invoice model, writes the new reminder service, plugs it into the existing BullMQ worker, adds an admin endpoint for manual triggers, and writes unit tests for each. Runs typecheck, lint, and the test suite. All green. Returns a summary:

> Backend implementation complete.
>
> Files added:
>
> - `services/reminders/send-overdue.ts`
> - `app/api/admin/invoices/[id]/remind/route.ts`
> - `workers/reminders.worker.ts`
> 
> Files edited:
> 
> - `prisma/schema.prisma` (added `lastReminderSentAt` column)
> 
> Reused: `prisma`, `sendEmail`, `daysAgo`, existing `invoice-reminder` email template, existing BullMQ `redisConnection`. Tenant isolation enforced in the manual-trigger endpoint via the existing `requireSameTenant` helper.
> 
> Unit tests added: 7. All passing. Suggested <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` rule: "Reminder columns follow the `last<Action>SentAt` pattern."

**Step 7.** The orchestrator delegates to `frontend-builder`, passing the brief, the researcher's findings, and the backend builder's summary. The frontend builder reads the API contract from the summary, adds a "Last reminder sent" column to the admin invoice table, adds a "Send reminder" button on each row that posts to the manual-trigger endpoint, handles loading and error states, and writes component tests. Runs typecheck, lint, and the test suite. All green. Returns a summary:

> Frontend implementation complete.
> 
> Files added:
>
> - `app/(admin)/invoices/_components/ReminderColumn.tsx`
> - `app/(admin)/invoices/_components/SendReminderButton.tsx`
>
> Files edited:
>
> - `app/(admin)/invoices/page.tsx` (added column and button)
>
> Reused: existing admin `DataTable`, existing `useMutation` hook for the API call, existing `Toast` for success/error states. API consumed exactly as the backend summary documented.
>
> Component tests added: 5. All passing.

**Step 8.** The orchestrator delegates to `test-verifier`, passing the approved story, the brief, and both builder summaries. The verifier writes one acceptance test file covering all six acceptance criteria plus the edge cases. Runs the new tests. Reports:

> Acceptance tests written: 8 (one per acceptance criterion plus two edge cases).
>
> 7 passing. 1 failing: "manual trigger is rejected across tenants" returns 200 instead of 403. Looks like the admin endpoint is not checking tenant before sending. Recommending the validator confirm.

**Step 9.** The orchestrator delegates to `implementation-validator`. The validator returns:

> **Critical:** the manual trigger endpoint does not check that the admin belongs to the same tenant as the invoice. A Company A admin can trigger a reminder for a Company B invoice. (<VPIcon icon="fas fa-folder-open"/>`app/api/admin/invoices/[id]/remind/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`, line 14.) The `requireSameTenant` helper is imported but never called.
>
> **Important:** no test covers the case where `lastReminderSentAt` is exactly 7 days ago. Clarify whether the rule is `>` or `>=`.
>
> **Minor:** the new `ReminderColumn` could reuse the existing `RelativeTime` component instead of inlining its own formatter.

**Step 10.** Critical finding detected. The orchestrator loops back. It delegates to `backend-builder` with the validator's finding and the failing acceptance test from the verifier. Backend builder fixes and calls `requireSameTenant` in the manual-trigger endpoint, re-runs unit tests. Then the orchestrator re-runs `test-verifier`. All eight acceptance tests pass. Then `implementation-validator` runs again. Clean.

**Step 11.** The orchestrator pauses for your final review and asks if you want it to open the PR.

That is a working factory. One prompt kicked it off. Seven agents did the focused work. The orchestrator routed the chain and paused at the three points where your judgement was needed.

#### Version 2: The Orchestrator as a Subagent (Advanced)

Once you have lived with the skill version for a while, you may want the orchestrator to run in its own context window. The skill version inherits your main session's context. That can be fine for short features, but for longer ones the main context fills up with the chain's intermediate state.

Promoting the orchestrator to a subagent gives it isolation. Type `/agents` and use this description:

```md :collapsed-lines
Create a project-level subagent named feature-orchestrator.

Its job: take a feature idea from the user and run the full
seven-agent chain (codebase-researcher, story-writer, spec-writer, backend-builder, frontend-builder, test-verifier,
implementation-validator), pausing for human approval after the
story and after the brief, running the build agents in order
(backend then frontend then verifier), then validating, then
looping back to the right build agent if the validator finds
critical gaps. Use the feature-factory skill for the exact step
order, including the approve, changes-requested, and rejected
paths at each human approval point.

Inputs:
- a rough feature idea from the user

Outputs:
- a finished implementation in the working directory
- a final summary of what was built, tests added, and any
  validator findings the human chose to waive at the final
  review

Tool access: Task (to invoke other subagents), Read, Bash.
Recommended model: sonnet (this needs reasoning for routing).
Recommended color: gray.

Behaviour rules:
- Use the feature-factory skill as the canonical step order.
- Always invoke other agents through subagent invocation, not
  by inlining their work.
- Always pause at the human approval points described in the
  skill. At each approval point, handle approved, changes
  requested, and rejected paths exactly as the skill defines.
- If any agent fails, surface the failure with the agent name
  and stop. Do not silently retry.
- Never edit code directly. Always go through the
  appropriate build agent.
```

The behaviour is almost identical to the skill version. The only difference is that the orchestrator now runs in its own context. You invoke it with `@feature-orchestrator` and a feature idea. The orchestrator's context is preserved across the chain. Your main session stays clean.

Pick one version. Run a few real features through it. The factory will reveal where it needs tuning according to your codebase.

#### Why This Works

Each step reduces a different kind of ambiguity. The story reduces business ambiguity. The brief reduces technical ambiguity. The backend builder reduces API ambiguity. The frontend builder reduces UI ambiguity. The test verifier proves the user story actually holds. The validator catches what everyone else missed. By the time the chain reaches the validator, the feature has been constrained by everything that came before it. The validator only has to check the gap between what the brief asked for and what the code does.

The orchestrator turns that chain from "a workflow you remember to run" into "a workflow that runs itself, with you in the loop only where it matters."

This is the move from vibe coding to factory thinking, and it is the single biggest mindset change in this whole article.

#### Extending the Chain

Seven agents and three human approval points are a starting point, not a ceiling. Once your basic chain is running, you can add more agents wherever you want extra rigour. A security reviewer that runs before the validator. A performance auditor that flags slow queries on the new code paths. A docs writer that updates the README from the diff. A migration reviewer that sanity-checks any Prisma changes before they merge. The pattern is the same every time: define the agent using the anatomy template, restrict its tools, plug it into the orchestrator's step order, decide whether the human needs to review its output.

You can also move some of the human approval points into agents if your team trusts them. The story approval is hard to remove because business intent is genuinely a human call. The brief approval can sometimes be replaced by a second spec-reviewer agent for low-risk features. The final PR approval should always stay human.

A factory grows the way a real codebase grows. Start small. Add what your team keeps doing by hand. Remove what no longer pays for itself.

#### Run Reads in Parallel, Run Writes in Sequence

One last design rule that saves a lot of pain.

Read-only agents can run in parallel. They do not touch the files on disk, so two or more of them running at the same time cannot conflict. Running them in parallel is one of the easiest speed-ups you will get from this whole setup. For example, say you maintain four services and you need to refresh the docs for each one before a quarterly review. You can fire four codebase-researcher subagents in parallel, one per service. Each one reads its own codebase, summarises what changed, and returns its findings independently. Then four docs-updater agents pick up the findings, one per service, and rewrite each README in parallel. Because each docs-updater works on a different repo, they cannot collide on the same files. Four parallel reads, four parallel writes, and a job that used to drag on now finishes quickly.

Write agents (backend-builder, frontend-builder, test-verifier) must run in sequence. They edit files. If two of them touch the same file at the same time, you get partial writes, lost edits, broken tests, and a confused git status. Worse, the failure is silent until you notice the diff is wrong, and tracing back to which agent wrote what becomes its own debugging job.

The orchestrator handles this for you when you set it up correctly. Inside the build phase, backend-builder always finishes before frontend-builder starts, and frontend-builder always finishes before test-verifier starts. Outside the build phase, parallel reads are fair game.

Rule of thumb: anything with `Read`, `Grep`, or `Glob` access only is safe to run in parallel. Anything with `Edit`, `Write`, or `Bash` access must run alone in its lane.

#### Failure Modes to Expect

Every team running a chain like this hits the same handful of issues in the first couple of weeks. None of them break the factory. Here is what to watch for, with a quick fix for each.

- **Orchestrator skips a human approval.** Make the approval step explicit in the skill or agent (`ASK HUMAN: approve the story`).
- **An agent silently summarises away part of its work.** Add a "what was covered / what was skipped" checklist to its output format.
- **Validator misses something a human reviewer caught later.** Add a new rule to the validator's behaviour rules. The validator gets sharper feature by feature.
- **Session runs out of context mid-chain.** Keep <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` tight and start a fresh main session for each major feature.
- **Chain runs perfectly but the spec misunderstood the business rule.** This is exactly why the story approval is a hard human checkpoint.
- **Frontend builder invents an endpoint the backend builder did not produce.** Strengthen the frontend builder's rule to consume the backend summary exactly. Surface mismatches as feedback, not as patches.

A good factory makes mistakes easier to catch, not harder to see.

### 8. The Delivery Layer: PRs, Reviews, and the New SDLC

So far this article has been close to the keyboard. Let's zoom out.

When AI absorbs much of the coding, testing, and documentation work, the cost of producing a software change drops. That does not mean software becomes free. It means the bottleneck moves. The slow part used to be typing, wiring, and searching. The slow part now is choosing the right feature, defining the right constraints, validating behaviour, and deciding what should ship.

That changes how teams are organized, how reviews are done, and how delivery pipelines work.

![Figure 6: How the SDLC reshapes when the orchestrator absorbs the coding work. Handoffs collapse. Review and judgement stay human.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/ef5e86ca-dea9-4106-a254-b3f2bbeb44fc.png)

#### One Engineer can now Finish a Complete Vertical Slice

The shape of the SDLC changes when the chain runs the heavy lifting.

Before, a feature moved through a queue of specialists. A frontend engineer who needed a new API endpoint waited for a backend engineer. A backend engineer who needed a UI waited for a frontend engineer. A new feature might pass through three or four people before it shipped, and most of that time the work was sitting still in someone's review queue.

Now, the same engineer kicks off `/feature-factory`, the chain runs end to end (backend, frontend, acceptance tests, validation), and a complete vertical slice lands as one PR. One person on the path. Zero handoffs. Section 11 returns to this and explores what it means for the team and for the wider industry. For now, what matters is that the unit of work has changed: features come out of the chain whole, not piecemeal.

#### Stack Your Features, not the Inside of one Feature

Once handoffs are gone, the next question is "what do I do while my last PR is in review?" The answer is the second feature. And the third.

The pattern that fits this is **stacked PRs**, but the unit of stacking is one PR per feature, not one PR per slice of a feature. Each PR is a complete vertical slice produced by one chain run.

It looks like this in practice. You finish Feature A. You open PR A from <VPIcon icon="fas fa-code-branch"/>`feature-a` against <VPIcon icon="fas fa-code-branch"/>`main`. While A is waiting for review, you do not stop. You branch `feature-b` on top of <VPIcon icon="fas fa-code-branch"/>`feature-a` (not on top of <VPIcon icon="fas fa-code-branch"/>`main`), kick off `/feature-factory` for the next feature, and ship PR B against <VPIcon icon="fas fa-code-branch"/>`feature-a`. While both A and B are in review, you branch <VPIcon icon="fas fa-code-branch"/>`feature-c` on top of <VPIcon icon="fas fa-code-branch"/>`feature-b` and start the third one.

The order matters. A has to merge first. Then B rebases onto <VPIcon icon="fas fa-code-branch"/>`main` and merges. Then C rebases onto <VPIcon icon="fas fa-code-branch"/>`main` and merges. Tools like Graphite, Sapling, or git's own `git rebase --onto` handle the rebasing automatically when an upstream PR merges. You do not need to think about it most of the time.

Two rules keep this safe.

First, **respect the chain.** If C depends on B, do not try to merge C before B. The branch graph already enforces this, but it is worth saying out loud because the temptation to skip ahead is real when an early PR is taking too long to review.

Second, **do not split one feature across the stack.** A single feature should be one PR. If you find yourself wanting to put the migration in PR 1, the backend in PR 2, and the UI in PR 3, that usually means the chain produced too much in one run. Go back, split at the story level (Section 7), and run two smaller chains instead. Each chain still produces one feature, and each feature still ships as one PR.

The factory's whole point is that one engineer can finish a feature without waiting for anyone. Stacked PRs are how you keep that going across multiple features without blocking yourself on your own review queue.

This is where the software industry is heading. Smaller teams, fewer handoffs, every engineer shipping complete features end to end. The teams that get there first will not be the ones with the best AI tools. They will be the ones who built the cleanest factories around the AI tools they already have.

#### Add a PR Reviewer Agent

A team using AI needs a PR review pattern that is consistent across both human and AI reviewers. The single most useful artifact for that consistency is a short, explicit checklist that every PR is reviewed against. Without it, review becomes subjective. With it, everyone checks for the same things every time.

I covered AI-assisted PR review in detail in [**my previous article on unblocking the AI PR review bottleneck**](/freecodecamp.org/how-to-unblock-ai-pr-review-bottleneck-handbook.md), including the full checklist I use, the rules that work, and the ones that quietly do not. If you have not read it, do that next. The factory you just built is the upstream half of that workflow. PR review is the downstream half.

For the factory specifically, the cleanest place to put the checklist is inside another agent. Use the `/agents` slash command and create a `pr-reviewer` agent the same way you created the seven in Section 6:

```md :collapsed-lines
Create a project-level subagent named pr-reviewer.

Its job: review a pull request against this project's review
checklist and report findings grouped by severity. It does
not edit files or merge PRs.

Inputs:
- a PR or a diff to review
- CLAUDE.md and any project-level rules

Outputs, grouped by severity:
- critical (must fix before merge)
- important (should fix before merge)
- minor (nice to have)

Always check for:
- Scope: one clear purpose, no unrelated refactoring,
  no unrelated files.
- Tests: unit tests cover the core behaviour, failure
  cases tested, existing tests still pass.
- Security and tenant safety: auth checks, tenant isolation
  preserved, no secrets in logs or error responses.
- Architecture: business logic out of UI and API route
  handlers, existing patterns from CLAUDE.md respected,
  no unjustified new dependencies.
- Documentation: README or feature docs updated for
  user-facing changes, technical debt acknowledged in
  the PR description.

Tool access: Read, Grep, Glob, Bash (for git commands only).
Recommended model: sonnet (this needs careful reasoning).
Recommended color: orange.

Behaviour rules:
- Never edit files.
- Never merge or close PRs.
- Cite file paths and line numbers for every finding.
- Mark opinion-based findings clearly so reviewers can
  ignore them safely.
```

Claude generates the file, you review and commit it, and now your project has a consistent reviewer that humans and AI invoke the same way: `@pr-reviewer review this PR`. You can also wire it into your CI pipeline so every developer handles their own PR feedback before a human reviewer ever sees it. The load on reviewers drops.

This pattern matters because the agent becomes the single source of truth. Humans read its findings before merging. The orchestrator from Section 7 can invoke it as the final step before opening a PR. CI can run it on every push. The checklist lives in one place and updates in one place. When your team learns a new failure mode, you add it to the agent's behaviour rules, and the next review picks it up automatically.

#### Cloud Reviewers are Functions, not Colleagues

AI is starting to live inside CI pipelines: PR review bots, security scanners, release-note generators, issue triagers. That is genuinely useful. But the language matters.

If you say "Claude approved this PR," you have already made a small mistake. Cloud-based AI is not a teammate. It is not a developer. It is not accountable for the decision. The right sentence is "Claude ran the review workflow against the project's review checklist and reported findings, and a human decided the PR was safe to merge." Accountability stays with the human.

There is a practical reason for this discipline. Cloud reviewers are good at the things they were prompted to look for: missing tests, naming inconsistencies, duplicate helpers. They miss things outside their checklist. If your checklist does not specifically tell the reviewer to verify tenant isolation in invoice download endpoints, the AI reviewer might still let through a bug where a user from Company A can download an invoice from Company B. That is why a project-specific review checklist is so much more valuable than a generic AI reviewer.

#### Where Humans Win

AI review is not approval. AI can help find issues. It can summarize complex changes. It can compare code against a checklist. It can suggest tests. But humans still own the decisions that matter: does this solve the right problem, is this an acceptable trade-off, should it ship now, should it ship behind a feature flag, do we need more user data first?

That judgement is still human work. The best AI-assisted teams are not the ones that remove humans. They are the ones that put humans where their judgement matters most.

### 9. Build Your First Claude-Powered Software Factory

Theory is done. Here is the checklist to stand up the factory in your own project. Each step points back to the section that explains the why.

| # | Step | Where |
| --- | --- | --- |
| 1 | Install Claude Code from the official docs | [<VPIcon icon="iconfont icon-vscode"/>code.claude.com/docs/en/desktop](https://code.claude.com/docs/en/desktop) |
| 2 | Create the folder structure (<VPIcon icon="fas fa-folder-open"/>`.claude/agents`, <VPIcon icon="fas fa-folder-open"/>`.claude/skills/feature-factory`, <VPIcon icon="fas fa-folder-open"/>`.claude/skills/build-with-tests`, <VPIcon icon="fas fa-folder-open"/>`.claude/hooks`, <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`) | Section 5 |
| 3 | Write <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` (100-300 lines, project facts and rules) | Section 5 |
| 4 | Create the seven subagents via `/agents` | Section 6 |
| 5 | Create the `feature-factory` orchestrator skill | Section 7 |
| 6 | Create the `build-with-tests` skill | Section 5 |
| 7 | Add the pre-commit hook and make it executable | Section 5 |
| 8 | Create the `pr-reviewer` agent | Section 8 |
| 9 | Run one real feature through the chain | below |

Total time: two to three hours for the first version.

#### When You Run the First Real Feature

Pick something small. An admin tool, a new API endpoint with a tiny UI tile. Open Claude Code:

```sh
/feature-factory

I want to <describe the feature in one sentence>.
```

The chain will run. Approve the story. Approve the brief. Read the validator report. Open the PR.

The first time will not be perfect. Things to note as you go:

- Researcher's output too shallow? Strengthen its description.
- Story writer missed an edge case? Add a rule to its description.
- Spec missed a risk? Add the rule to <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`.
- Backend builder touched a frontend file? Tighten its scope rule.
- Frontend builder invented an endpoint? Tighten the API-consumption rule.
- Validator missed something a human caught later? Add a check to its rules.
- Hook should have caught something earlier? Add to it.

After three or four features, the factory tunes itself. You will spend less time supervising and more time deciding what to build next.

---

## Part 3: Wrap Up

### 10. What I Did Not Cover (and Where to Go Next)

AI-assisted development is a huge surface area, and one article cannot cover it all. Here are the topics I deliberately left out, in the order I would explore them next.

#### Centralized Memory Management Across Sessions

Once you start running multiple sessions in parallel (one per feature, one per branch, one per teammate) you start wishing the AI shared memory across them. Things like Claude's project-level memory, MCP-based shared knowledge stores, and team-wide vector stores fit here. This is a fast-moving area and worth a dedicated read.

#### Running Agents in Parallel

Claude Code subagents can run in parallel inside a single session. So can multiple sessions across worktrees with tools that wrap Claude Code (Nimbalyst is one example). Once your factory is stable, parallelism gives you the next big speed-up. Be careful with merge conflicts and CI cost.

#### Cloud-Based Unattended Agents

Running Claude Code or similar agents on a server, triggered by events (a webhook, a cron, a new GitHub issue) lets your factory work while you sleep. The honest state of this in 2026 is that it works for narrow tasks like PR review and triage. It is not yet trustworthy for unattended feature work without strong validation gates.

#### Custom MCP Servers for Your Business

MCP (Model Context Protocol) lets you expose internal systems like your billing data, your customer support tickets, and your design system to Claude as tools. A well-built MCP server turns Claude from a coding assistant into something closer to a junior teammate who knows your business. Worth a deep look once your basic factory is in place.

#### Cost Optimization at Scale

Once a team uses this workflow daily, token cost becomes a real budget line. Routing inspection and review to Haiku, reasoning work to Sonnet, and only the heaviest planning to Opus is the simplest lever. Caching, batching, and trimming context are the next ones.

#### Extending into Product, Design, and Support

This article is developer-focused, but the same shape applies to product owners, designers, and support engineers. They benefit from skills, subagents, and hooks too. The biggest team-level wins come when those roles also build their own corner of the factory and the dev team can call into theirs.

If you want to go deeper, the official Claude Code documentation is the most up-to-date source for subagents, skills, hooks, and MCP. Anthropic also publishes a free introduction-to-subagents course that pairs well with this article.

### 11. Closing Thoughts

This article opened with a single idea: use AI to automate structured work, not chaotic work. The eleven sections in between are what that looks like in practice.

So before you automate anything, define the system. Write the rules in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`. Generate the skills your team keeps retyping. Create the agents that do focused work. Wire up the orchestrator. Add the gates. And keep humans in the loop where judgement matters, not where typing matters.

A software factory is not a giant autonomous machine that builds your product overnight. It is a small set of files in your repository that turn one developer plus one AI into a controlled team. The agents are the asset. The factory is how you put them to work.

#### The New Way of Working

Section 8 introduced the idea that one engineer can ship a full vertical slice. Step back from the keyboard for a moment and look at what that means for the team, not just for one developer.

Software has always moved through handoffs. A product owner writes a story, a lead developer turns it into a specification, a backend engineer builds the API, a frontend engineer builds the UI, a payments specialist handles the integration. By the time the feature ships, four or five people have touched it, each waiting for the previous one to finish. Every handoff was time the work spent sitting still.

![Figure 7: The old shape. Every arrow is a handoff. Every handoff is a wait.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/2aa870cf-17f7-4fc1-8b7c-14095bb61980.png)

The factory dissolves most of those handoffs because the expertise is no longer trapped inside the people. It is shared, in the form of agents.

A frontend engineer who has never written a Stripe webhook can still ship a feature that needs one, because the team's payments specialist has already built and tuned a `payments-integration` agent. A backend engineer who has never built a Recharts dashboard can ship a feature that needs one, because the frontend lead has built a `dashboard-component-builder` agent. The QA engineer's `regression-suite-writer` agent is available to everyone. The DevOps engineer's `ci-pipeline-updater` agent is available to everyone. The security engineer's `auth-checker` agent runs as part of every chain.

The result is that one engineer can finish a complete vertical slice on their own.

![Figure 8: The new shape. Every engineer pulls from the same agent library. Specialists still exist, but their expertise lives in the agents they maintain, not in their availability for handoffs.](https://cdn.hashnode.com/uploads/covers/69cae64c9fffa7474087a0d4/64d37829-30cc-46bc-9047-72f34081ab12.png)

Look at what changed. The specialists are still there. The frontend lead still owns the design system. The payments specialist still owns the Stripe integration. The DevOps engineer still owns the CI pipeline. They still bring the taste and judgement that nobody else on the team has. What changed is that their expertise is now portable. It rides inside agents that anyone on the team can invoke.

This shift compounds in three ways:

**Cycle time drops.** A feature that used to wait for three engineers' time now waits for none. The chain runs end to end for one engineer. The PR opens the same day instead of the same week.

**Specialists do their best work.** Before, a senior payments engineer spent half their week unblocking other engineers' Stripe integrations. Now they spend that week improving the `payments-integration` agent itself. The leverage is much higher. One improvement to the agent benefits every feature the team ships from that point on.

**Team scaling looks different.** Before, hiring a tenth engineer added a tenth set of handoffs. Now, hiring a tenth engineer adds a tenth full-stack contributor who immediately benefits from every agent the existing nine have built. Onboarding speed increases. Coordination cost drops.

This is the broader shift the article is pointing at. The factory is not just a productivity trick for one developer. It is how an engineering team starts to look more like a community of full-stack contributors who share their expertise as code, and less like a relay race where every baton pass costs a day.

The teams that figure this out first will not be the ones with the largest headcount or the biggest AI budget. They will be the ones whose agent libraries reflect their team's collective taste, kept current, kept small, kept tight. The agents are the asset. The factory is how you put them to work.

::: note A Short Note

The shape of this workflow will keep evolving as the tools evolve, and every team has its own way of working. What I have shared here is the smallest version that has actually held up under deadline pressure on real production work. It is not the final word. It is a starting point you can adapt to your team, your stack, and your taste.

If you build a version of this in your own team, I would love to hear what worked and what did not. The fastest way to improve a workflow is to read about other people's failure modes. Good luck building your factory.

:::

::: info Resources

**Claude Code**

<SiteInfo
  name="Overview - Claude Code Docs"
  desc="Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."
  url="https://code.claude.com/docs/en/overview/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DGetting%2Bstarted%26appearance%3Dsystem%26title%3DOverview%26description%3DClaude%2BCode%2Bis%2Ban%2Bagentic%2Bcoding%2Btool%2Bthat%2Breads%2Byour%2Bcodebase%252C%2Bedits%2Bfiles%252C%2Bruns%2Bcommands%252C%2Band%2Bintegrates%2Bwith%2Byour%2Bdevelopment%2Btools.%2BAvailable%2Bin%2Byour%2Btermin%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="Create custom subagents - Claude Code Docs"
  desc="Create and use specialized AI subagents in Claude Code for task-specific workflows and improved context management."
  url="https://code.claude.com/docs/en/sub-agents/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DAgents%2Band%2Bparallel%2Bwork%26appearance%3Dsystem%26title%3DCreate%2Bcustom%2Bsubagents%26description%3DCreate%2Band%2Buse%2Bspecialized%2BAI%2Bsubagents%2Bin%2BClaude%2BCode%2Bfor%2Btask-specific%2Bworkflows%2Band%2Bimproved%2Bcontext%2Bmanagement.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="Extend Claude with skills - Claude Code Docs"
  desc="Create, manage, and share skills to extend Claude's capabilities in Claude Code. Includes custom commands and bundled skills."
  url="https://code.claude.com/docs/en/skills/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DTools%2Band%2Bplugins%26appearance%3Dsystem%26title%3DExtend%2BClaude%2Bwith%2Bskills%26description%3DCreate%252C%2Bmanage%252C%2Band%2Bshare%2Bskills%2Bto%2Bextend%2BClaude%2527s%2Bcapabilities%2Bin%2BClaude%2BCode.%2BIncludes%2Bcustom%2Bcommands%2Band%2Bbundled%2Bskills.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="How Claude remembers your project - Claude Code Docs"
  desc="Give Claude persistent instructions with CLAUDE.md files, and let Claude accumulate learnings automatically with auto memory."
  url="https://code.claude.com/docs/en/memory/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DUse%2BClaude%2BCode%26appearance%3Dsystem%26title%3DHow%2BClaude%2Bremembers%2Byour%2Bproject%26description%3DGive%2BClaude%2Bpersistent%2Binstructions%2Bwith%2BCLAUDE.md%2Bfiles%252C%2Band%2Blet%2BClaude%2Baccumulate%2Blearnings%2Bautomatically%2Bwith%2Bauto%2Bmemory.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="Hooks reference - Claude Code Docs"
  desc="Reference for Claude Code hook events, configuration schema, JSON input/output formats, exit codes, async hooks, HTTP hooks, prompt hooks, and MCP tool hooks."
  url="https://code.claude.com/docs/en/hooks/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DReference%26appearance%3Dsystem%26title%3DHooks%2Breference%26description%3DReference%2Bfor%2BClaude%2BCode%2Bhook%2Bevents%252C%2Bconfiguration%2Bschema%252C%2BJSON%2Binput%252Foutput%2Bformats%252C%2Bexit%2Bcodes%252C%2Basync%2Bhooks%252C%2BHTTP%2Bhooks%252C%2Bprompt%2Bhooks%252C%2Band%2BMCP%2Btool%2Bhooks.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="Automate workflows with hooks - Claude Code Docs"
  desc="Run shell commands automatically when Claude Code edits files, finishes tasks, or needs input. Format code, send notifications, validate commands, and enforce project rules."
  url="https://code.claude.com/docs/en/hooks-guide/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DAutomation%26appearance%3Dsystem%26title%3DAutomate%2Bworkflows%2Bwith%2Bhooks%26description%3DRun%2Bshell%2Bcommands%2Bautomatically%2Bwhen%2BClaude%2BCode%2Bedits%2Bfiles%252C%2Bfinishes%2Btasks%252C%2Bor%2Bneeds%2Binput.%2BFormat%2Bcode%252C%2Bsend%2Bnotifications%252C%2Bvalidate%2Bcommands%252C%2Band%2Benforce%2Bp%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

**Other AI IDEs (the same patterns apply)**

<SiteInfo
  name="The best coding agent"
  desc="Built to make you extraordinarily productive, Cursor is the best coding agent."
  url="https://cursor.com/"
  logo="https://cursor.com/marketing-static/favicon.svg"
  preview="https://cursor.com/public/opengraph-image.png"/>

```component VPCard
{
  "title": "Aider - AI Pair Programming in Your Terminal",
  "desc": "Aider lets you pair program with LLMs to start a new project or build on your existing codebase.",
  "link": "https://aider.chat",
  "logo": "https://aider.chat/favicon.ico",
  "background": "rgba(76,110,245,0.2)"
}
```

<SiteInfo
  name="Cline - AI Coding, Open Source and Uncompromised"
  desc="Open-source AI coding agent with Plan/Act modes, MCP integration, and terminal-first workflows. Trusted by 8M+ developers worldwide."
  url="https://cline.bot/"
  logo="ttps://cline.bot/assets/branding/favicons/favicon-256x256.png"
  preview="https://cline.bot/cline_og_img.png"/>

**Tools mentioned in the article**

<SiteInfo
  name="What is the Model Context Protocol (MCP)? - Model Context Protocol"
  desc=""
  url="https://modelcontextprotocol.io/docs/getting-started/intro/"
  logo="https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon-dark/favicon.ico"
  preview="https://raw.githubusercontent.com/modelcontextprotocol/docs/2eb6171ddbfeefde349dc3b8d5e2b87414c26250/images/og-image.png"/>

<SiteInfo
  name="Context7 - Up-to-date documentation for LLMs and AI code editors"
  desc="Pull up-to-date, version-specific documentation and code examples for any library directly into Cursor, Claude Code, Windsurf, and other AI coding tools."
  url="https://context7.com/"
  logo="https://context7.com/favicon.ico"
  preview="https://context7.com/opengraph-image.png?913a90853d344a57"/>

<SiteInfo
  name="Nimbalyst: Visual Editor for Claude Code & Codex (Open Source)"
  desc="Nimbalyst is the visual editor for Claude Code and Codex. Run parallel sessions, review AI diffs, edit markdown, mockups, diagrams, and code. Free, open source."
  url="https://nimbalyst.com/"
  logo="https://nimbalyst.com/favicon.ico"
  preview="https://nimbalyst.com/og-image.png"/>

<SiteInfo
  name="Graphite - Code review for the age of AI"
  desc="Graphite helps teams on GitHub deliver higher quality software, faster."
  url="https://staging-graphite-splash.vercel.app/"
  logo="s://staging-graphite-splash.vercel.app/favicon/favicon-16x16.png"
  preview="https://staging-graphite-splash.vercel.app/og.png"/>

```component VPCard
{
  "title": "Sapling from Meta | Sapling",
  "desc": "A Scalable, User-Friendly SCM",
  "link": "https://sapling-scm.com/",
  "logo": "https://sapling-scm.com/img/Sapling_favicon-light-green-transparent-big.svg",
  "background": "rgba(46,113,85,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development",
  "desc": "AI coding tools now offer much more than autocomplete. They can analyze your codebase, edit multiple files, execute commands, explain errors, generate tests, write documentation, and prepare pull requ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-software-factory-with-claude-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
