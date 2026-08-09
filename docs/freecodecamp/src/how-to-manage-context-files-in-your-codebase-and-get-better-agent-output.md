---
lang: en-US
title: "How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents"
description: "Article(s) > How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents"
icon: fa-brands fa-node
category:
  - Node.js
  - DevOps
  - Github
  - AI
  - LLM
  - Anthropic
  - Claude
  - Github Copilot
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - node
  - nodejs
  - node-js
  - devops
  - github
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
  - github-copilot
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents"
    - property: og:description
      content: "How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-context-files-in-your-codebase-and-get-better-agent-output.html
prev: /programming/js-node/articles/README.md
date: 2026-08-17
isOriginal: false
author:
  - name: Kayode Adeniyi
    url: https://freecodecamp.org/news/author/mkbadeniyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/84f1d4b5-5874-4325-965f-0a009e3b3290.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github Copilot > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/github-copilot/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents"
  desc="You ask a coding agent for a new endpoint, and ninety seconds later you have a working endpoint. Then you read the diff, and you find that it pulled in a validation library that's not in your package."
  url="https://freecodecamp.org/news/how-to-manage-context-files-in-your-codebase-and-get-better-agent-output"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/84f1d4b5-5874-4325-965f-0a009e3b3290.png"/>

You ask a coding agent for a new endpoint, and ninety seconds later you have a working endpoint.

Then you read the diff, and you find that it pulled in a validation library that's not in your <VPIcon icon="iconfont icon-json"/>`package.json`, it wrote the test in Jest even though your team moved to the Node test runner last spring, and it reached into the database from inside the route handler because it had no way of knowing that every other handler in the codebase delegates to a service.

The code runs, the tests it wrote pass, but you still have to rewrite most of it.

None of that is a reasoning failure on the model's part. It produced a sensible solution to the problem as it understood it, but it understood the problem badly because nobody told it how this particular codebase works.

Your conventions live in your team's heads, in code review comments, and in decisions made eighteen months ago that nobody wrote down. The agent can't see any of that, so it falls back on the average of every repository it has ever been trained on, which is exactly what you got.

The fix isn't a longer prompt, since you would have to retype it every session and your teammates would each write a different version of it. The fix is a set of files that live in the repository, load automatically, and are maintained the same way you maintain code.

This tutorial shows you how to structure those files, how to keep one source of truth across the four or five formats the different tools expect, and, most importantly, how to stop them from quietly going out of date. After all, a context file that describes a codebase you deleted six months ago is worse than no context file at all.

::: info

Everything here is built on a companion repository you can clone and run: [<VPIcon icon="iconfont icon-github"/>`Adeniyikayodee/MCF`)](https://github.com/Adeniyikayodee/MCF). It has no dependencies, so Node 20 or newer is all you need.

<SiteInfo
  name="Adeniyikayodee/MCF"
  desc="Managing Context Files."
  url="https://github.com/Adeniyikayodee/MCF/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4f2a1cc79e178b6fad6d61dd41c3a7391bb35430eca1e368d05e4152204ac625/Adeniyikayodee/MCF"/>

:::

::: note What You Need Before You Start

You should be comfortable with Git and a terminal, you should have Node 20 or newer installed, and you should have used at least one coding agent such as Claude Code, Cursor, GitHub Copilot, or Codex on a real project.

You don't need to know anything about how models work internally, since everything in this tutorial is about files on disk.

:::

---

## Why the Context Window is the Real Constraint

Everything an agent knows while it works on your task lives in one buffer called the context window. That buffer holds the system prompt, your conversation, every file the agent opened, every command it ran, and every stack trace those commands printed.

But it's important to know that it's finite, and it fills up faster than most people expect. A single debugging session, for example, can burn tens of thousands of tokens before the agent has written a line of code.

The part that matters for this tutorial is what happens as that buffer fills. Anthropic's engineering team describes an effect they call [<VPIcon icon="iconfont icon-claude"/>context rot](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents), where a model's ability to retrieve a specific instruction degrades as the token count climbs. The model isn't ignoring you out of stubbornness, it's working with an attention budget that gets thinner as more material competes for it.

That single fact overturns the intuition most people bring to context files. Writing more feels safer, because you've covered more cases and left less to chance. But every line you add competes with every other line for a finite amount of attention.

The Claude Code documentation puts the consequence plainly, noting that a bloated instructions file causes the agent to ignore the rules inside it. Also, it notes that the symptom of an over-long file is the agent repeatedly breaking a rule you've clearly written down.

Here's roughly how a session budget gets spent on a real task:

```text
system prompt and tool definitions        ~12,000 tokens
context files loaded at startup            ~4,800 tokens
three source files the agent opened        ~9,000 tokens
one test run with a stack trace            ~3,500 tokens
```

The 4,800 token context file in that list is competing with the stack trace the agent needs to read in order to fix the bug. A 600 token file that names the right paths would leave room for the agent to go and read the code itself, which it's very good at.

Context files are a budget allocation problem before they're a documentation problem, and almost every improvement in this tutorial comes from taking that seriously.

---

## The Three Layers

The structure that works treats context as three distinct layers with different costs.

The **always loaded layer** is a single file at the root of your repository that the agent reads at the start of every session, whether the task is a typo fix or a migration. You pay for this file on every single request, so it holds only what applies to every task in the repository. It also stays small enough that you could read it aloud in under a minute.

The **scoped layer** is made up of nested files that load only when the agent works inside a particular directory. Rules about your API layer sit in <VPIcon icon="fas fa-folder-open"/>`src/AGENTS.md`, so a task that only touches the frontend never pays for them.

The **on demand layer** is ordinary documentation that the root file points at by path rather than inlining. A path costs a handful of tokens while the document behind it might cost two thousand, so the agent spends that budget only when the task actually calls for it.

This mirrors how a new engineer works, since they don't memorise your architecture document on day one. They remember that it exists and go and read it when they need it.

The finished layout in the companion repository looks like this:

```sh title="file structure"
MCF/
├── AGENTS.md                          # always loaded, budgeted
├── CLAUDE.md                          # generated from AGENTS.md
├── .github/copilot-instructions.md    # generated from AGENTS.md
├── .cursor/rules/testing.mdc          # glob scoped, hand written
├── .claude/
│   ├── settings.json                  # shook that runs the context linter
│   └── skills/add-endpoint/SKILL.md   # workflow, loaded on demand
├── docs/
│   ├── architecture.md
│   ├── testing.md
│   └── decisions/0001-in-memory-store.md
├── scripts/
│   ├── context-lint.mjs
│   └── sync-context.mjs
├── src/
│   ├── AGENTS.md                      # scoped to the source tree
│   ├── api/tasks.js
│   ├── services/tasks.js
│   ├── lib/validate.js
│   ├── router.js
│   └── server.js
└── tests/
```

---

## Picking a Format Without Maintaining Four Copies

Every vendor picked a different filename for the same idea, which is annoying but manageable once you decide which one is the source of truth.

.<VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` is the closest thing to a shared convention. It's plain Markdown with no required schema, its governance sits with the Agentic AI Foundation under the Linux Foundation, and it's read natively by Claude Code, Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, Zed, and a long list of others.

Nested files are part of the spec, the file closest to the code being edited takes precedence, and anything you type directly into the chat overrides all of it.

The tool-specific formats still exist alongside it. Claude Code reads <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, walks up the directory tree concatenating every one it finds, and resolves `@path/to/file` imports. Cursor uses `.mdc` files inside <VPIcon icon="fas fa-folder-open"/>`.cursor/rules/` with YAML frontmatter that can scope a rule to a glob such as `tests/**/*.js`, which makes it the most expressive of the formats and also the least portable, since nothing outside Cursor reads it. GitHub Copilot, for its part, reads a single <VPIcon icon="fas fa-folder-open"/>`.github/`<VPIcon icon="fa-brands fa-markdown"/>`copilot-instructions.md` at the repository root.

The practical answer is to write <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` once, generate the rest from it, and hand write a separate file only when a tool offers something the shared format can't express. In practice, this means Cursor's glob scoping. You can do the generating with symlinks:

```sh
ln -s AGENTS.md CLAUDE.md
```

Symlinks are the shortest path, though they cause trouble for contributors on Windows and for some CI checkout configurations, so the companion repository uses a small script instead. The script writes a banner into every file it generates, which stops a well-meaning teammate from editing the copy and losing their work on the next sync:

```js title="scripts/sync-context.mjs"
const banner = `<!-- Generated from ${SOURCE} by `npm run sync:context`. Edit ${SOURCE} instead. -->`;

export const targets = [
  // Claude Code resolves @path imports, so its file stays a pointer plus what is specific to it.
  { path: 'CLAUDE.md', render: () => `${banner}\n\n@${SOURCE}\n\n${CLAUDE_EXTRAS}` },
  // Copilot has no import syntax, so the source is inlined.
  { path: '.github/copilot-instructions.md', render: (source) => `${banner}\n\n${source}` },
];
```

Because Claude Code resolves imports, its generated file stays a pointer plus the handful of instructions that only make sense for that tool, which keeps it at around 130 tokens rather than duplicating the whole thing:

```md
<!-- Generated from AGENTS.md by `npm run sync:context`. Edit AGENTS.md instead. -->

@AGENTS.md

---

## Claude Code specific

- Use plan mode for any change that touches more than three files, and skip it for a one line fix.
- Delegate codebase exploration to a subagent so the findings come back summarised rather than as
  a hundred file reads in the main context.
```

Running the script regenerates both files, and running it again does nothing. This is what you want from something a hook or a CI job will call repeatedly:

![Figure 1: Terminal showing npm run sync:context writing CLAUD.md and the Copilot instructions file, followed by git status listing both as modified](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/01a74800-b63a-41c9-a68a-0d3aa956d701.png)

---

## Writing the Root File

This is where most of the value is, and it's also where most people go wrong, because the instinct is to write everything down.

Use one editing test on every line you're tempted to add: **would removing this line cause the agent to make a mistake?** If the answer is no, the line is costing you attention budget and buying you nothing, so cut it. Applied honestly, that test removes most of what people put in these files.

Here's the kind of file the test is designed to catch:

```md title="AGENTS.md"
# AGENTS.md

---

## About this project
This project is a REST API for managing tasks. It was originally built in 2023 by the platform
team and has since been maintained by the core services group. The codebase is written in modern
JavaScript using ES modules.

---

## Code style
- Use meaningful variable names
- Write clean, maintainable code
- Follow the DRY principle
- Use const instead of var
- Add comments where the code is complex

---

## Structure
- .<VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`server.js` contains the server
- .<VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`router.js` contains the router
- .<VPIcon icon="fas fa-folder-open"/>`src/api/tasks.js` contains the task handlers
- .<VPIcon icon="fas fa-folder-open"/>`src/services/tasks.js` contains the task service
```

Every line there fails the test. The model already knows what `const` is for, it can see that the file called <VPIcon icon="fa-brands fa-js"/>`router.js` contains the router, and knowing which team owned the code in 2023 won't change a single decision it makes.

Meanwhile the one thing an agent genuinely can't work out on its own, which is that this project deliberately has no dependencies, is nowhere in the file.

This is the version that ships in the companion repository:

```md :collapsed-lines title="AGENTS.md"
# AGENTS.md

Task API used as the worked example for a tutorial on managing context files. This file is the
single source of truth for agent instructions, and `CLAUDE.md` plus
`.github/copilot-instructions.md` are generated from it by `npm run sync:context`, so edit this
file and never the generated ones.

---

## Commands

- Install: nothing to install, the project has zero dependencies
- Run the tests: `npm test`
- Start the server on port 3000: `npm start`
- Check the context files: `npm run lint:context`
- Regenerate the tool specific context files: `npm run sync:context`

---

## Conventions that are not obvious from the code

- The test runner is the Node built in runner invoked through `node --test`, so do not add Jest,
  Vitest, or any other test dependency to this repository.
- This project stays dependency-free on purpose, so solve problems with the Node standard library
  rather than by adding a package.
- Handlers in <VPIcon icon="fas fa-folder-open"/>`src/api/` return `{ data }` or `{ error: { code, message } }` and never choose an
  HTTP status, because <VPIcon icon="fas fa-folder-open"/>`src/router.js` owns the mapping from error code to status.
- Handlers never touch the store directly, so any logic that reads or writes tasks belongs in
  <VPIcon icon="fas fa-folder-open"/>`src/services/tasks.js`.
- The store is module level state that survives between test cases, so any test file that creates
  a task has to call `resetTasks()` in a `beforeEach` hook.

---

## Definition of done

Run `npm test` and `npm run lint:context` before you report a task as finished, and paste the
output rather than asserting that it passed.

---

## Where to look

- Architecture and request flow: <VPIcon icon="fas fa-folder-open"/>`docs/architecture.md`
- Testing conventions and how to add a case: <VPIcon icon="fas fa-folder-open"/>`docs/testing.md`
- Why the store is in memory: <VPIcon icon="fas fa-folder-open"/>`docs/decisions/0001-in-memory-store.md`
- Rules that apply only to the API layer: `src/AGENTS.md`
```

Notice what each section is doing. The commands are there because an agent can't reliably guess your script names, and guessing wrong costs a failed run. The conventions are all things that are either invisible from reading the code or actively contradicted by what the model would otherwise assume, and each one states the reason, since a rule with a reason attached survives situations the rule author didn't anticipate. The last section is nothing but paths, which is the on demand layer doing its job.

Rough guidance on what earns its place:

| Include | Leave out |
| --- | --- |
| Commands the agent can't guess | Anything visible from reading the code |
| Conventions that differ from the language default | Standard conventions the model already knows |
| The test runner and how to run one test | Detailed API documentation, which should be a link |
| Branch naming and pull request etiquette | Information that changes every sprint |
| Architectural decisions specific to your project | Long explanations and tutorials |
| Environment quirks and required variables | File by file descriptions of the tree |
| Non-obvious gotchas | Advice such as "write clean code" |

### Getting the Altitude Right

There's a second way to write a bad rule, which is to pitch it at the wrong level of specificity. Anthropic's guidance frames this as finding the right altitude, sitting between hardcoded logic that shatters on the first case it didn't anticipate, and vague encouragement that gives the model nothing to act on.

```md
Too rigid, and it breaks on the first handler that does not fit:
- Every route handler must be exactly 40 lines and call validate() on line 3. Too vague, and it changes nothing about what the agent does:
- Write clean, maintainable code.

Right altitude:
- Route handlers parse and validate input, then delegate to a function in <VPIcon icon="fas fa-folder-open"/>`src/services/`.
  Handlers do not touch the store directly. See <VPIcon icon="fas fa-folder-open"/>`src/api/`<VPIcon icon="fa-brands fa-js"/>`tasks.js` for the pattern to copy.
```

The third version tells the agent the shape of the rule, the boundary it must not cross, and where to find a worked example, which is roughly what you would tell a competent new hire on their first day.

---

## Scoping Rules to a Directory

Anything that only matters inside one part of the tree belongs in a nested file, and the test for whether a rule qualifies is simple: would a developer working in a different directory ever need to know this? If not, move it down.

```md title="src/AGENTS.md"
# Source layer

Rules below apply to everything under <VPIcon icon="fas fa-folder-open"/>`src/`, and they sit on top of the root <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` rather
than replacing it.

---

## Adding an endpoint

1. Add the handler to `src/api/tasks.js` following the shape the neighbouring handlers use.
2. Add one entry to the `routes` array in `src/router.js` with its success status.
3. Add a case to `tests/api.test.js` that covers the success path and the failure path.

---

## Validation

Validators live in `src/lib/validate.js`, they return an array of problem strings rather than
throwing, and they report every failing field instead of stopping at the first one, so a caller can
show the user all of their mistakes at once.
```

That validation rule is a good example of something worth writing down, because the code alone doesn't explain itself. An agent reading `src/lib/validate.js` sees a function returning an array and has no way to know whether that's a deliberate convention or an accident of one implementation, so it might reasonably throw an exception in the next validator it writes:

```js title="src/lib/validate.js"
export function validateTaskInput(input) {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return ['body must be a JSON object'];
  }

  const problems = [];

  if (typeof input.title !== 'string' || input.title.trim() === '') {
    problems.push('title is required and must be a non-empty string');
  } else if (input.title.length > TITLE_MAX) {
    problems.push(`title must be ${TITLE_MAX} characters or fewer`);
  }

  if (input.done !== undefined && typeof input.done !== 'boolean') {
    problems.push('done must be a boolean when present');
  }

  return problems;
}
```

---

## Pointing Instead of Inlining

The `Where to look` section of the root file is the cheapest thing in this whole setup. Four lines of paths cost almost nothing to load, and behind them sit several thousand tokens of architecture notes, testing conventions, and decision records that the agent pulls in only when a task needs them.

Architecture decision records are the natural home for the reasoning that would otherwise bloat your root file. The companion repository has one explaining why the task store is a plain `Map` rather than a database, and its most useful paragraph is the last one:

```md
An agent working here should not add a database, an ORM, or a persistence layer unless the task
explicitly asks for one, and should treat the missing persistence as a deliberate choice rather than
a gap to fill.
```

Without that, an agent asked to "make the API production ready" will helpfully add Postgres. With it, the agent knows the absence is intentional and asks before changing it. That sentence costs you nothing until the day it saves you an afternoon.

The same logic applies to workflows that only come up occasionally. A step by step procedure for adding an endpoint is genuinely useful, and it would be dead weight in a file loaded on every task, so it lives in a skill file that loads when someone actually asks for an endpoint:

```md
---
name: add-endpoint
description: Add a new endpoint to the task API following the layering this repository uses
---

# Add an endpoint

This workflow loads only when someone asks for a new endpoint, which is why it lives here instead
of in `AGENTS.md` where every session would pay for it.

Read `docs/architecture.md` first if you have not already, then work through these steps in order.

1. Decide which layer owns the new behaviour. Anything that reads or writes tasks belongs in
   `src/services/tasks.js`, and anything about request shape belongs in `src/api/tasks.js`.
2. Add or extend a validator in `src/lib/validate.js` if the endpoint accepts input, returning an
   array of problem strings so the handler can report every failure at once.
3. Add the handler to `src/api/tasks.js`, returning `{ data }` on success and
   `{ error: { code, message } }` on failure, and using an existing error code where one fits.
4. Register the route in the `routes` array in `src/router.js` with the success status it should
   return, and add the error code to `STATUS_BY_ERROR_CODE` if you introduced a new one.
5. Add at least one success case and one failure case to `tests/api.test.js`.
6. Run `npm test` and `npm run lint:context`, then paste both outputs into your summary.

Do not add a dependency, do not introduce a persistence layer, and do not set a status code inside
a handler.
```

---

## Making Context Files Verifiable

Everything so far is fairly standard advice, and on its own it has a short shelf life. Context files rot for exactly the same reason documentation rots, which is that nothing breaks when they're wrong. You rename <VPIcon icon="fas fa-folder-open"/>`src/services/`<VPIcon icon="fa-brands fa-js"/>`task.js` to <VPIcon icon="fas fa-folder-open"/>`src/services/`<VPIcon icon="fa-brands fa-js"/>`tasks.js`, and your context file keeps confidently pointing at a path that no longer exists. You delete the `typecheck` script, and six months later an agent burns two turns trying to run it. Nobody notices either of those, because nothing in your pipeline is checking.

So put a check in the pipeline and let it fail. The companion repository has a linter in <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="fa-brands fa-js"/>`context-lint.mjs` that runs four checks, and it's about 150 lines of dependency-free JavaScript that you can adapt to your own repository in an afternoon.

The first check is a token budget on every file that loads at startup:

```js
// Loaded at the start of every session whether the task needs them or not. When one of these keeps
// pushing against its ceiling, move the detail into docs/ and leave a path behind.
const ALWAYS_LOADED = [
  { path: 'AGENTS.md', budget: 800 },
  { path: 'CLAUDE.md', budget: 300 },
  { path: '.github/copilot-instructions.md', budget: 900 },
  { path: 'src/AGENTS.md', budget: 400 },
];

// Rough average for English prose. Precision is not the point, catching a file that doubled is.
const CHARS_PER_TOKEN = 4;

const estimateTokens = (text) => Math.ceil(text.length / CHARS_PER_TOKEN);
```

Four characters per token is an approximation rather than a real tokenizer count, and it runs a little optimistic on code heavy files. This is fine because the number you care about is the ceiling. A file creeping from 400 tokens to 800 is the signal, and being off by 8% on the absolute figure changes nothing about how you respond to it.

The second and third checks read your context files as prose and verify that the things they mention are real. Anything in single backticks that looks like a path has to exist on disk, and any npm script has to exist in <VPIcon icon="iconfont icon-json"/>`package.json`:

```js
// Fenced blocks are stripped first so an example inside a snippet is never read as a real reference.
function inlineCodeSpans(text) {
  const prose = text.replace(/```[\s\S]*?```/g, '');
  return [...prose.matchAll(/`([^`\n]+)`/g)].map((match) => match[1].trim());
}

for (const span of spans) {
  if (looksLikePath(span)) {
    if (!existsSync(join(ROOT, span))) {
      problems.push(`${file} points at a path that does not exist: ${span}`);
    }
    continue;
  }

  const script = span.match(/^npm run ([\w:-]+)$/) ?? span.match(/^npm (test|start)$/);

  if (script && !scripts.includes(script[1])) {
    problems.push(`${file} mentions an npm script that is not in package.json: ${span}`);
  }
}
```

Stripping fenced code blocks before scanning matters more than it looks, since your documentation is full of illustrative examples that were never meant to be real references, and a linter that fails on those gets switched off within a week.

The fourth check reruns the sync script in a dry run mode and fails if any generated file no longer matches <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, which catches the teammate who edited <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` directly despite the banner.

On a healthy repository the whole thing takes well under a second:

![Figure 2: Terminal output from npm run lint:context showing four context files under their token budgets, 47 references checked across 9 files, generated files in sync, and no problems found.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/53a2990f-0664-4946-b782-1ec0e02855d1.png)

The interesting output is what happens when something rots. Adding one plausible looking line to <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` that mentions a script that was deleted and a file that was renamed produces this:

![Figure 3: Terminal output from npm run lint:context reporting three agent problems: an npm script not in package.json, a path that doesn't exist, and a generated file out of sync with AGENTS.md.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/4fa2e8ea-d09f-495d-ae4c-207ebabcaad4.png)

The script exits with a non-zero status, so wiring it into CI takes four lines and means the files can't drift quietly:

```yaml title=".github/workflows/ci.yml"
      - name: Run the test suite
        run: npm test

      # The context files are checked on every pull request, which is what stops them from
      # drifting away from the code they describe.
      - name: Check the context files
        run: npm run lint:context
```

![Figure 4: GitHub Actions run for the MCF repo showing the verify job succeeding, with the test suite and the context linter both green.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/73bde67f-c80a-48fa-a5c3-6fae2c2826ee.png)

This is the part I would keep if I had to throw away everything else in this tutorial. A mediocre context file that's verifiably true beats a beautifully written one that describes last year's architecture, because the agent has no way to tell the difference and will act on both with equal confidence.

---

## Give the Agent Something to Verify Against

There's one more line in that root file worth dwelling on, and it's the definition of done.

An agent stops when the work looks finished, and without a check it can run for itself, "looks finished" is the only signal available to it, which quietly makes you the verification loop. Every mistake then waits for you to notice it.

Naming a command that returns a pass or a fail converts that into something the agent can act on by itself, so it writes the code, runs the check, reads the result, and keeps going until the check passes.

That's why `Run npm test and npm run lint:context before you report a task as finished` does more for output quality than any amount of style guidance you could write. Asking the agent to paste the output rather than assert success matters too, since reviewing evidence takes you a few seconds and re-running the verification yourself takes minutes.

Instructions in a context file are advice, though, and advice gets lost as the context fills. When something must happen every single time without exception, use a hook, which runs a script at a fixed point in the agent's loop and can't be talked out of it:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint:context --silent"
          }
        ]
      }
    ]
  }
}
```

The rule of thumb is that anything advisory belongs in prose, and anything mandatory belongs in a hook or in CI.

---

## Checking Whether it Actually Worked

You shouldn't take any of this on faith, and there's a cheap way to test it on your own repository.

Pick a task with an obviously correct shape, write the prompt down so it stays identical across runs, and run it twice: once on your current branch, and once on a branch where you have deleted the context files. In the companion repository a good candidate is "add a `GET /tasks/count` endpoint that returns the number of open tasks, with tests".

Then compare the two runs on four points. Did the tests pass without you intervening? How many corrections did you have to make? Did the code follow the existing layering, or did it reach into the store from the handler? Did any new dependency appear?

This is a sample of one rather than a benchmark, and you should treat it as such. But it's enough to tell you whether your files are pulling their weight, and it makes it very obvious which specific rule was missing when something goes wrong.

![Figure 5: Terminal output from npm test showing fourteen passing tests across the routes and the validators](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/2dfe8cce-6039-49ad-9cfc-ca333e55731a.png)

---

## Keeping the Files Healthy

Treat these files the way you treat code, which means reviewing them when something breaks rather than on a schedule.

Two diagnostics will cover most of the situations you run into. If the agent keeps violating a rule that's written down, the file is almost certainly too long and the rule is getting lost in the noise. Prune aggressively rather than adding emphasis.

If the agent asks you a question that the file already answers, the wording is ambiguous, so rewrite that line rather than adding a second one next to it.

Beyond that, delete any rule the agent already follows without being told, since the model's defaults improve with every release and a rule that was necessary last year may be dead weight now.

Watch the token budget in the linter output as a rough health metric, because a file that keeps creeping toward its ceiling is telling you that detail needs to move into <VPIcon icon="fas fa-folder-open"/>`docs/`.

---

## Mistakes Worth Avoiding

The most common failure is the kitchen sink file, where every convention anyone ever mentioned gets appended until the file is three thousand tokens and the agent follows roughly half of it. The fix is the removal test applied without sentiment.

The second is duplicating your README into your context file, which doubles the cost of every session while adding nothing, since the two documents have different audiences and the agent can read the README when it needs to.

The third is documenting things the model can see for itself. The giveaway is any line that describes what a file contains rather than what you expect an agent to do about it.

The fourth is writing rules that can't be verified, such as asking for readable code or good performance, which sound reasonable and give the agent no way to tell whether it has complied.

The fifth, and the one that gets teams eventually, is letting each tool keep its own hand-maintained copy. They start out identical, they diverge within a month, and then Cursor and Claude Code are working from contradictory instructions in the same repository. Generate the copies, and check the generation in CI.

---

## Where to Start

If you only do one thing after reading this, run a token estimate on the context file you already have, and then read it line by line asking whether removing each line would cause a mistake. Most people cut somewhere between a third and a half of the file on the first pass, and notice the agent following the remainder more reliably.

After that, add the pointers so your documentation becomes reachable without being expensive, and put the linter in CI so the whole thing stays honest as the codebase moves underneath it.

::: info

The full setup, including the linter, the sync script, the hook, and the CI workflow, is at [<VPIcon icon="iconfont icon-github"/>`Adeniyikayodee/MCF`](https://github.com/Adeniyikayodee/MCF). Clone it, run `npm run lint:context` to watch it pass, then break something in <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` and watch it fail.

You can adapt the linter to your own conventions rather than copying it verbatim, since the checks worth running are the ones that match the ways your particular repository tends to drift.

Fork the repository if you want your own copy to experiment in, since a fork gives you a branch point you can modify freely without losing the ability to pull later changes back in. If you would rather be told when those changes land, use the Watch button next to Fork and choose releases or all activity, because that's the control that actually sends you notifications while a fork only captures the code as it stands on the day you take it.

::: info Further Reading

<SiteInfo
  name="Effective context engineering for AI agents"
  desc="Anthropic is an AI safety and research company that's working to build reliable, interpretable, and steerable AI systems."
  url="https://anthropic.com/engineering/effective-context-engineering-for-ai-agents/"
  logo="https://anthropic.com/images/icons/favicon-32x32.png"
  preview="https://cdn.sanity.io/images/4zrzovbb/website/ea2bf01aa874d7ab776453e97dfeed5d2bf5a116-2400x1260.png"/>

<SiteInfo
  name="Best practices for Claude Code - Claude Code Docs"
  desc="Tips and patterns for getting the most out of Claude Code, from configuring your environment to scaling across parallel sessions."
  url="https://code.claude.com/docs/en/best-practices/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DUse%2BClaude%2BCode%26appearance%3Dsystem%26title%3DBest%2Bpractices%2Bfor%2BClaude%2BCode%26description%3DTips%2Band%2Bpatterns%2Bfor%2Bgetting%2Bthe%2Bmost%2Bout%2Bof%2BClaude%2BCode%252C%2Bfrom%2Bconfiguring%2Byour%2Benvironment%2Bto%2Bscaling%2Bacross%2Bparallel%2Bsessions.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="AGENTS.md"
  desc="AGENTS.md is a simple, open format for guiding coding agents. Think of it as a README for agents."
  url="https://agents.md"
  logo="https://agents.md/favicon-dark.png"
  preview="https://agents.md/og.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manage Context Files in Your Codebase and Get Better Output From AI Coding Agents",
  "desc": "You ask a coding agent for a new endpoint, and ninety seconds later you have a working endpoint. Then you read the diff, and you find that it pulled in a validation library that's not in your package.",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-context-files-in-your-codebase-and-get-better-agent-output.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
