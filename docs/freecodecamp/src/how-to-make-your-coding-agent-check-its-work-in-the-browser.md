---
lang: en-US
title: "How to Make Your Coding Agent Check Its Work in the Browser"
description: "Article(s) > How to Make Your Coding Agent Check Its Work in the Browser"
icon: fa-brands fa-node
category:
  - Node.js
  - AI
  - LLM
  - OpenAI
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Make Your Coding Agent Check Its Work in the Browser"
    - property: og:description
      content: "How to Make Your Coding Agent Check Its Work in the Browser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-your-coding-agent-check-its-work-in-the-browser.html
prev: /programming/js-node/articles/README.md
date: 2026-10-20
isOriginal: false
author:
  - name: timothy ogbemudia
    url: https://freecodecamp.org/news/author/glamboyosa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cbbc37b8-4405-4aa3-a691-0d7c7301baf2.png
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
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Make Your Coding Agent Check Its Work in the Browser"
  desc="I got tired of coding agents telling me the frontend work was done when nobody had opened the frontend. You've probably seen the routine. The agent changes some code, runs the formatter, the type chec"
  url="https://freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cbbc37b8-4405-4aa3-a691-0d7c7301baf2.png"/>

I got tired of coding agents telling me the frontend work was done when nobody had opened the frontend.

You've probably seen the routine. The agent changes some code, runs the formatter, the type checker, and the tests, everything comes back green, and you get some version of "Implemented and verified."

But verified how, exactly? A passing test suite is useful evidence, but it isn't the same as opening the app and using the thing that just changed.

I've had plenty of changes where the code made sense and the tests passed, and the UI still had the kind of problem a person spots in about three seconds. A control overlapping something else. A selected state that exists in the store but isn't highlighted on screen. Reset working for one path and not another. A filter that updates state but leaves the old data on the page. Save looking fine until you refresh. A map layer drawn in the wrong order. A modal that technically opens but doesn't fit on the screen.

The agent had tested its code, but nobody had tested the application. So I started making browser review part of the definition of done for anything user-facing, and a few weeks in, that habit turned into a tool. I'll get to that near the end.

In this article, you'll learn how to give a coding agent a real browser with Playwright MCP, and how to write the instructions that make it test the change it just made instead of confirming that a page loads.

You'll see how to have the agent start your app the way your project already starts it, how to split those instructions between <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` and a reusable skill, why a separate reviewer agent catches bugs the author misses, and how to make the agent clean up only what it started.

In the last part, I'll walk through katalepsis, the open source tool this turned into, including how it decides whether a check really passed.

::: note Prerequisites

This isn't a beginner tutorial, so it helps to have:

- Some experience with a coding agent that supports MCP (Model Context Protocol), such as Claude Code, Codex, or Cursor, and an idea of how you give it instructions.
- A web app you can run locally with a dev script, written in JavaScript or TypeScript. The examples use a Node project with `pnpm`, but nothing depends on a specific framework.
- Basic Playwright knowledge: what a test, a locator, and an assertion look like. You don't need an existing test suite to follow the first half.
- Node.js 20 or newer for Playwright MCP, and Node.js 22.12 or newer plus Git if you want to install katalepsis.
- Comfort with the terminal and Git, since the agent will be starting processes and checking `git status`.

:::

---

## The Loop Agents Are Missing

Coding agents got useful quickly in large part because they already have a decent feedback loop for code. They read, edit, and run the formatter and tests, read the failure, and try again. Nobody has to get it right in one heroic attempt.

For frontend work, the clear missing input is the frontend itself. The loop I want goes a bit further: edit the code, run the tests, start the app, use the changed feature, look at what happened, fix whatever's broken, and then use it again.

That last step matters more than you might think. Agents are very comfortable telling you a fix "should now work", and I'd rather they just open the page again and find out.

Playwright MCP is a good way to give them that. I already used Playwright for E2E tests, but the MCP server is useful for a different reason: it hands the agent a browser directly. It can open localhost, read the page, find controls, click and type, check what changed, and take screenshots.

That isn't the same as asking the agent to run `pnpm playwright test`. The test suite tells you whether the scenarios you already wrote down still pass. Browser review asks what this particular change could have affected and goes to look.

If an agent refactors some shared map-layer utilities, the tests might cover a few helpers. But from the diff, it can also work out that the code runs during initial render, selection, filtering, and reset, and try each of those. That's a lot closer to how I review my own frontend work.

Setup is small. You need Node 20 or newer and an MCP-capable client:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

A quick sanity check is to ask the agent to open the Playwright TodoMVC demo, add a todo called "Browser QA," and confirm it shows up. If it manages that, it has a browser. What it does with one is the harder part.

---

## Why a Browser on Its Own Falls Short

Giving an agent a browser only gives it the ability to look. It doesn't tell the agent what to look at, how far to go, or what counts as proof, and without that it falls back to the cheapest thing that technically involves a browser. An agent with Playwright can still do hilariously weak QA. I've had reports like this:

```md prompt
Opened /route.
Page loaded successfully.
Browser verification complete.
```

That's a report about opening a page, not about testing a change. Nothing in it would have caught any of the bugs from the start of this article.

So the browser needed instructions to go with it. What follows are the rules I wrote for how an agent should review its own frontend work: what to test, what to check, and what evidence to bring back. They started as a few lines I kept repeating in prompts, and they later became the browser-review skill you'll see in the next sections.

The first rule I settled on is that the review has to come from the change. If it changed a filter, use the filter. If it changed reset logic, change some state first and then reset it. If it touched persistence, refresh the page. If it changed a modal, open and close the modal, and if it changed responsive layout, resize the viewport.

That all sounds obvious when a person says it, but it isn't obvious at all if your agent instructions just say "verify that the app works".

In practice, this means the agent reads the diff and turns it into a short test plan before it touches the browser. For a change to a filter bar, the plan I'd expect looks something like this:

```md prompt
Changed: src/features/projects/FilterBar.tsx, src/features/projects/useFilters.ts

Plan:
1. Open /projects and note how many rows are showing.
2. Filter by Status: Active. Every row should say Active.
3. Add Owner: me on top. The list should narrow again.
4. Clear filters. The original row count should come back.
5. Apply a filter and refresh. The filter lives in the URL, so it should survive.
```

Then it carries out that plan through the browser tools Playwright MCP exposes. A trimmed version of the calls for the first few steps looks like this:

```md prompt
browser_navigate   { "url": "http://localhost:5173/projects" }
browser_snapshot   {}                      → table with 40 rows
browser_click      { "element": "Status filter", "ref": "e14" }
browser_click      { "element": "Active option", "ref": "e31" }
browser_snapshot   {}                      → table with 12 rows, all "Active"
browser_click      { "element": "Clear filters", "ref": "e15" }
browser_snapshot   {}                      → table with 40 rows
```

The `ref` values come from the accessibility snapshot, which is how the agent finds a control without guessing at CSS selectors.

This paid off on a PR that fixed a cursor getting stuck in its hover state on an interactive map. The PR's new unit tests passed against the old code too, so they didn't prove the fix did anything. What did prove it was the agent opening the app, moving on and off the interactive layers, and watching the cursor change and reset exactly when it should.

The second rule is to check the end result rather than the interaction. "I clicked Reset and nothing threw" doesn't tell you much. What you actually care about is that reset puts things back the way they were. Same with saving: the real claim is that you can change a setting, save, refresh, and it's still there.

Written as a Playwright test, that claim looks like this. The important line is the last one, which runs after the reload:

```ts
import { test, expect } from "@playwright/test";

test("weekly digest setting survives a reload", async ({ page }) => {
  await page.goto("/settings/notifications");
  await page.getByRole("switch", { name: "Weekly digest" }).click();
  await page.getByRole("button", { name: "Save" }).click();

  await page.reload();

  await expect(page.getByRole("switch", { name: "Weekly digest" })).toBeChecked();
});
```

The agent doesn't need to write this test to follow the rule. Through MCP it does the same thing by hand: click, save, `browser_navigate` to the same URL, and read the switch's state from a fresh snapshot.

I also ask for different evidence depending on the question. Whether the URL changed, a button is disabled, or a dialog opened is a question for the DOM and browser state, not a screenshot. Whether that dialog is clipped, two things overlap, or text wraps badly on a phone is a visual question, and that's where screenshots are useful. Sometimes you need both, since a modal can sit happily in the DOM while being unusable on screen.

For a layout change, that means resizing and capturing what a person would actually see:

```md prompt
browser_resize            { "width": 375, "height": 812 }
browser_click             { "element": "Export button", "ref": "e22" }
browser_take_screenshot   { "filename": "export-dialog-375.png" }
browser_resize            { "width": 1440, "height": 900 }
browser_take_screenshot   { "filename": "export-dialog-1440.png" }
```

While it's in there, the agent may as well look at the console and, when the feature depends on an API call, the network. I only care about errors the change introduced, though. A warning that's been on `main` for six months shouldn't derail every review, and a client-only transition doesn't need a network audit. If a save that "worked" actually got a `500`, I want to hear about it.

`browser_console_messages` and `browser_network_requests` return what the page logged and requested, so a failed save shows up as a line like this even when the UI looked fine:

```md prompt
[PUT] http://localhost:5173/api/settings => [500] Internal Server Error
```

Put together, the rules turn the weak report from the start of this section into something I can actually check:

```md prompt
Route: /settings/notifications
Did: turned on "Weekly digest", clicked Save, reloaded the page.
Checked: switch still on after reload (aria-checked="true");
  PUT /api/settings returned 200; no new console errors.
Screenshots: settings-375.png, settings-1440.png (label wraps cleanly on mobile)
Tests: pnpm test settings (14 passed)
Found and fixed: Save stayed disabled after the first save. Fixed in
  SettingsForm.tsx, then went through the flow again.
```

---

## How to Start the Real App

The agent can't test anything until the app is running, and this is where it's most tempting for it to take shortcuts.

I didn't want to write "run `pnpm dev`" into every repository, so the procedure tells the agent to work out how the project starts. It checks the `dev` script in `package.json` first, then whatever the README documents, and only falls back to an existing Docker setup if the app can't reasonably run otherwise.

The procedure here is the "Start the application" section of the browser-review skill, which you'll see in full in the next section. In a typical Vite or Next.js project, following it looks something like this:

```sh
# 1. How does this project start?
jq .scripts package.json
#
# {
#   "dev": "vite",
#   "build": "vite build",
#   "test": "vitest run",
#   "e2e": "playwright test"
# }

# 2. Start the dev server in the background, in a temp folder the agent owns,
#    and record the PID so it can stop exactly this process later.
QA_DIR=$(mktemp -d)
pnpm dev --port 5173 > "$QA_DIR/dev.log" 2>&1 &
echo $! > "$QA_DIR/dev.pid"

# 3. Wait until the server answers before opening a browser.
until curl -sf http://localhost:5173 > /dev/null; do sleep 1; done
```

If there's no `dev` script, the README is next, and if the README says the app needs Postgres and Redis from `docker compose up`, the agent uses that compose file and records the containers it started. It doesn't write a new one.

What I really don't want is the agent changing the app to make it easier to test. No temporary auth bypass, no fake server, no edits to <VPIcon icon="iconfont icon-dotenv"/>`.env`, and no throwaway route that exists only because it couldn't work out the real setup. The point is to exercise the software I'm actually shipping.

This is the kind of change I mean, and agents really do reach for it when a login page is in the way:

```diff
- if (!session) redirect("/login");
+ if (!session && process.env.NODE_ENV !== "development") redirect("/login");
```

If the agent can't get past authentication with the project's documented test account or seed data, the right move is to stop and report that browser review is blocked and why. A blocked review is honest. A review of an app with its auth switched off isn't a review of my app.

---

## Where the Instructions Live

My first instinct was to keep adding to <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`. It already held the rules every agent in the repo should know: structure, conventions, testing philosophy, keep changes surgical, and no pointless comments.

I was about to add another hundred lines about starting the app, browser setup, what to click, screenshots, console errors and teardown...but at some point that file stops being instructions and turns into a small religious text.

It helps to know how each of these files is actually used. <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` is a plain Markdown file that coding agents such as Codex read automatically at the start of every session in that repository, and Claude Code does the same with `CLAUDE.md`. Everything in it lands in the agent's context for every task, whether the task is a CSS fix or a database migration. So it costs context on every run, and it applies everywhere.

A skill works differently. It's a folder with a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file that starts with a short `name` and `description`. At the start of a session the agent only sees that name and description, a line or two per skill. When a task matches the description, or another instruction points at the skill, the agent reads the rest of the file and follows it. So you can have a long, detailed procedure that costs almost nothing until it's needed.

What I landed on is treating <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` as the constitution and skills as the playbooks. A constitution is short, applies to everything, and says what must be true without explaining how to do it. A playbook is a step-by-step procedure for one kind of situation, and you only pull it out when you're in that situation.

In this setup, <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` says that user-visible work isn't done until it's been checked in a browser, and the browser-review skill says how to do the checking:

```sh title="file structure"
/
├── AGENTS.md
└── .agents/
    └── skills/
        ├── browser-review/
        │   └── SKILL.md
        ├── pr-review/
        │   └── SKILL.md
        └── grill-me/
            └── SKILL.md
```

The rule in <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` stays short and always visible:

```md title="AGENTS.md"
---

## Browser Verification

User-visible work is not complete until the affected behavior has been
verified in the running application.

For user-visible changes, follow `.agents/skills/browser-review/SKILL.md`.

A successful build, type check, unit test suite, or E2E test suite does
not replace browser verification.

Do not commit browser-verification artifacts. Stop anything you started
for verification and clean up before hand-off.
```

The skill holds the procedure and only gets loaded when it's needed. I use Codex and Claude Code, so there's one global <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` that Claude's <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` imports, and one shared skills folder both of them read. Whichever agent I'm in that day, it follows the same playbook.

The import is a single line, because Claude Code lets <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` pull in another file with `@`:

```md
@~/.codex/AGENTS.md
```

Here's a shortened version of the one I first wrote:

```md :collapsed-lines title="~/.codex/AGENTS.md"
---
name: browser-review
description: Verify user-visible changes in the running application with Playwright MCP.
---

# Browser Review

---

## Before verification

Run `git status --short` and remember what was already there. Don't touch
pre-existing work.

Read the task and the diff. Work out the affected routes, the changed flow,
the loading, empty, error, selected and disabled states that matter,
whether anything needs to survive a refresh, and what nearby behavior
could regress.

---

## Start the application

Use the repository's dev script, then its documented local setup, then its
existing Docker setup. Don't invent a new startup config and don't change
app behavior to make QA easier. Record every process and container you start.

---

## Exercise the change

Don't stop once the page loads. Go through the whole changed flow and check
the final result. Use browser or DOM state for functional claims and
screenshots for visual ones. Report new relevant console errors and failed
requests, not old warnings.

If something is broken, fix the smallest cause, rerun the affected tests
and go through the flow again. Don't assume the fix works.

---

## Cleanup

Teardown is required even when verification fails. Close browsers, stop
servers and containers, and delete screenshots, traces and other artifacts,
but only the ones you created. Run `git status --short` again before
hand-off. Never run `git add`, `git commit` or `git push`.

---

## Report

Say which routes you tested, what you did, which states you checked, what
tests you ran and what you found and fixed. If you couldn't finish, say why.
```

None of that is clever. The value is that it's the default expectation, so I'm not relying on the agent to decide by itself that it should open a browser.

---

## Why the Reviewer Should Work Independently

The clear weakness is that the agent deciding whether the work is done is the same one that wrote it. That's still worth something, since I test my own code too, but it starts with a theory of how its implementation works.

By theory I mean the author's mental model of its own change: which code it touched, what it believes that code affects, and, just as important, what it believes it didn't affect. Its test plan comes straight from that model. So it tests the paths it meant to change, they work, and it never looks at the path it didn't realize was involved. That's the same blind spot people have when they test their own code, and it's exactly where the bugs that survive review tend to live.

So when a second agent reviews a branch, I tell it to work out the test scope for itself. My global rules now require a fresh reviewer with no conversation history: it gets the original request, the diff, and the review skill, and nothing about why the author thinks it works. It decides what the code could affect and tests that, without leaning on the author's screenshots, QA notes, or green test run.

The prompt for that reviewer is short on purpose:

```md prompt
You are reviewing a branch you did not write.

Original request:
  Make the E2E app URL configurable through E2E_BASE_URL so the
  tests can run against any port.

Run `git diff main...HEAD` to see the change. Follow the browser-review
skill. Work out for yourself what this change could affect, test that,
and report what you checked with evidence.
```

The best catch so far came from a PR that made an end-to-end test setup's app URL configurable. The reviewer noticed the seeded test data still hardcoded image URLs to the old port, and running the app on a different port confirmed it. Three image requests went to the wrong port and failed, and the page quietly rendered fallback cards where the images should have been. Nothing threw.

Simplified, the global setup looked like this after the change:

```ts title="e2e/global-setup.ts"
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:8080";

await seedDatabase({
  media: [
    { id: "m1", url: "http://localhost:8080/test-media/cover-1.jpg" },
    { id: "m2", url: "http://localhost:8080/test-media/cover-2.jpg" },
    { id: "m3", url: "http://localhost:8080/test-media/cover-3.jpg" },
  ],
});
```

The author's theory was "the app URL now comes from `E2E_BASE_URL`", and every test it ran used the default port, where the hardcoded URLs happened to be right. The reviewer had no such theory. It read the whole setup file the diff touched, ran the app on port 8081, and came back with this:

```md prompt
Found: seeded media URLs in e2e/global-setup.ts still point at :8080.
Ran the app with E2E_BASE_URL=http://localhost:8081.
Network: 3 requests to http://localhost:8080/test-media/... failed
  (net::ERR_CONNECTION_REFUSED).
Screen: the gallery rendered 3 fallback cards instead of images
  (gallery-8081.png).
Suggested fix: build the seeded URLs from E2E_BASE_URL, or make them
  relative.
```

The fix was one line per URL:

```ts
{ id: "m1", url: new URL("/test-media/cover-1.jpg", baseURL).href },
```

A test that checks the cards exist passes either way, because a fallback card is still a card. You only see it by looking at the page and the network tab, which is the whole argument of this article in one bug.

---

## Clean Up After Yourself and Only Yourself

Once agents can start servers and browsers, cleanup is part of the design. Otherwise every session leaves a layer behind: a stray node process, a Chromium window, screenshots, a Playwright trace, a temporary auth file, or a Docker container.

"Clean everything" is the wrong fix, though. `pkill node` isn't cleanup, it's an agent going on a small rampage, and it'll happily kill the dev server you started in another terminal. `git clean -fd` will delete an untracked file that has nothing to do with the agent.

The rule is to clean up what you created and leave everything else alone, and the `git status` before and after is there so browser QA doesn't quietly end up in my next commit.

This is why the startup step records a PID in a temp folder. Cleanup can then be precise:

```sh
# Not cleanup
pkill node
git clean -fd

# Cleanup
kill "$(cat "$QA_DIR/dev.pid")"
rm -rf "$QA_DIR"
```

And this is roughly what I expect to see at the end of a review:

```md prompt
Cleanup
- Stopped the dev server I started (pid 48213, pnpm dev --port 5173).
- Closed the Playwright MCP browser.
- Deleted export-dialog-375.png and export-dialog-1440.png.
- Left running: pid 39102 (pnpm dev on :3000). It was already running
  before I started, so it isn't mine.

git status --short before review:
 M src/features/export/ExportDialog.tsx
?? notes/todo.md

git status --short after cleanup:
 M src/features/export/ExportDialog.tsx
?? notes/todo.md
```

The two `git status` blocks match, so nothing from the review leaked into the working tree, and the untracked notes file that was already there is still there.

I didn't make this rule up in the abstract, either. While building the tool I'm about to describe, the agent testing it ran a cleanup command that closed every Playwright browser on my machine, not just its own. To be fair, it owned up to it in its summary.

---

## When a Skill Stopped Being Enough

The skill worked, in the sense that agents started actually opening the app. But what I got back was still prose. The agent would tell me it opened the page, clicked through the flow and everything looked right, and I had to take its word for it.

It's the same problem I started with, just one level up. I didn't want a nicer sentence about the browser. I wanted the evidence: what was checked, what passed, what failed, and the screenshots and traces to back it up, in a form I could drop into a PR for whoever reviews it.

So I wrote a build plan and spent a Saturday building it, pairing with Claude Code through milestones and independent review rounds. It's called [katalepsis](https://katalepsis.glamboyosa.xyz), the Stoic word for grasping something so clearly you can't be wrong about it, which felt like a fair bar for a pull request.

You point it at a preview URL and it writes a report: HTML, Markdown you can paste into the PR, and a JSON manifest.

It does two things. `katalepsis run` runs your existing Playwright tests against the preview, and Playwright's result is final. katalepsis sorts, redacts and bundles it, and never reinterprets an assertion.

`katalepsis verify` takes plain-English checks for behavior nobody has written a test for, and a model drives a real browser with your own Anthropic, OpenAI, or OpenRouter key. There's also an MCP server, so the agent that just made a change can run either one itself and read the report back.

---

## How to Try katalepsis

katalepsis isn't on npm yet, so the installer clones the repository and builds it. It needs Node 22.12 or newer, Git, and pnpm 10 (or corepack, which ships with Node):

```sh
curl -fsSL https://www.katalepsis.glamboyosa.xyz/install.sh | sh
```

That puts two launchers, `katalepsis` and `katalepsis-mcp`, in `~/.local/bin`.

To run your existing tests against a preview, your Playwright config has to use the URL katalepsis passes in. It's also worth turning on failure evidence so the report has something to show:

```ts title="playwright.config.ts"
use: {
  baseURL: process.env.KATALEPSIS_BASE_URL ?? "http://localhost:3000",
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "retain-on-failure",
},
```

The repository includes a small demo app, a signup form with a deliberate bug: submitting the empty form does nothing instead of showing an error. It has three Playwright tests. Here's a real run against it:

```sh prompt
katalepsis run --cwd apps/demo-form --url http://127.0.0.1:4173
#
# katalepsis: FAILED
#   2 passed, 1 failed, 0 blocked, 0 not tested
#   Preview commit: not reported, so unconfirmed
#   Report: artifacts/katalepsis/2026-10-19T08-21-25-288Z-3dba5a/report.html
#   Markdown: artifacts/katalepsis/2026-10-19T08-21-25-288Z-3dba5a/report.md
```

The Markdown report is meant to be pasted into a PR. The top of it looks like this:

```md :collapsed-lines
# katalepsis report: Failed

**2 passed, 1 failed, 0 blocked** out of 3 checks run.

- Preview: http://127.0.0.1:4173/
- Preview commit: not reported, so unconfirmed
- Runner: katalepsis 0.1.0, Playwright 1.63.0, Node 22.22.0

---

## Checks

| Status | Check | Project | Location | Duration |
| --- | --- | --- | --- | --- |
| Failed | signup form › empty submission shows a required-field error | chromium | signup.spec.ts:8 | 3.2 s |
| Passed | signup form › valid submission shows a confirmation | chromium | signup.spec.ts:13 | 418 ms |
| Passed | signup form › malformed email shows an email error and does not submit | chromium | signup.spec.ts:20 | 449 ms |

### Failed: signup form › empty submission shows a required-field error

- Failure type: assertion
- Evidence: screenshot, video, log, trace
```

Below that, it includes Playwright's own failure message (`getByRole('alert')` never appeared) and a list of limitations, such as the preview not reporting which commit it was built from.

For behavior without a test, you write checks in plain English. Each one has an intent, which is what to do, and a pass condition, which is what must be true at the end:

```json
{
  "checks": [
    {
      "id": "empty-form",
      "name": "Empty form validation",
      "intent": "Submit the signup form without filling it",
      "passCondition": "A required-field error is visible"
    },
    {
      "id": "invalid-email",
      "name": "Invalid email",
      "intent": "Fill the name, enter an invalid email address and submit",
      "passCondition": "An email validation error is visible and the success confirmation is not shown"
    }
  ]
}
```

Then you give katalepsis a key and run them. The key is stored in your OS keychain or read from an environment variable, and it's never passed on the command line:

```sh
katalepsis auth set openrouter
katalepsis verify --cwd apps/demo-form --url http://127.0.0.1:4173 --checks checks.json \
--provider openrouter --model anthropic/claude-haiku-5.5
#
# katalepsis: FAILED (openrouter/anthropic/claude-haiku-5.5)
#   2 passed, 1 failed, 0 blocked
#   Preview commit: not reported, so unconfirmed
#   Report: artifacts/katalepsis/2026-10-10T12-45-05-343Z-b51a0a/report.html
```

The demo's full <VPIcon icon="iconfont icon-json"/>`checks.json` has three checks, and the agent checks find the same empty-form bug the Playwright test did, without anyone having written that test.

Finally, so the coding agent can do all of this itself, you register the MCP server. With Codex, that's:

```sh
codex mcp add katalepsis -- katalepsis-mcp --root /path/to/your-app
```

The server exposes three tools, `verification_run_tests`, `verification_check_browser`, and `verification_get_report`, and only works inside the folder you give it. In practice the agent's instruction becomes something like "after changing the signup form, run `verification_check_browser` with a check for the change and paste the Markdown report into your summary."

---

## How katalepsis Works Under the Hood

A few of the decisions came straight out of the problems in this article. Here's how they work in the code.

katalepsis is a TypeScript monorepo with five packages:

- `core` (the result schema, the Playwright runner, and the report renderers)
- `agent` (the browser tools and evidence rules for `verify`)
- `credentials` (keys and preferences)
- `mcp` (the MCP server)
- `cli`

It uses Effect for the parts where errors, cancellation, and dependencies matter, such as running Playwright and probing the preview, and Effect Schema for the report format. The model loop in `verify` uses the Vercel AI SDK, so the same code works with Anthropic, OpenAI, and OpenRouter.

### The Report is a Schema, Not a Log

Every run, whether it came from Playwright or from a model, decodes into the same `VerificationRun` structure before anything is written. A trimmed version of a single check looks like this:

```ts
export const CheckStatus = Schema.Literals(["passed", "failed", "blocked"]);

export const VerificationCheck = Schema.Struct({
  id: Schema.String,
  source: Schema.Literals(["playwright-test", "agent"]),
  title: Schema.String,
  status: CheckStatus,
  flaky: Schema.Boolean,
  failure: Schema.NullOr(Schema.Struct({ code: FailureCode, message: Schema.String })),
  attempts: Schema.Array(Attempt),
  evidence: Schema.Array(BundlePath),
});
```

Tests that never ran go into a separate `notTested` list with a reason, which is how you end up with four outcomes: passed, failed, blocked, or not tested. Every evidence file is stored with its SHA-256 hash, and `BundlePath` rejects absolute paths and `..`, so a report can't point outside its own folder.

### Blocked isn't Failed

If the preview is down, you get one blocked run, not three failed tests that send you hunting for bugs that don't exist. Before starting Playwright, katalepsis requests the preview URL once. This is the core of that probe:

```ts
const UNAVAILABLE_STATUSES = new Set([502, 503, 504]);

const response = await fetch(url, {
  redirect: "manual",
  signal: AbortSignal.any([signal, AbortSignal.timeout(30_000)]),
});
if (UNAVAILABLE_STATUSES.has(response.status)) {
  return { reachable: false, reason: `the preview answered with HTTP ${response.status}` };
}
```

A network error or a gateway status blocks every selected test, and Playwright never starts. Pointing the demo at a port with nothing on it gives you this:

```sh
katalepsis run --cwd apps/demo-form --url http://127.0.0.1:4999
#
# katalepsis: BLOCKED
#   0 passed, 0 failed, 3 blocked, 0 not tested
#   preview-unavailable: http://127.0.0.1:4999/ did not respond (connect ECONNREFUSED 127.0.0.1:4999). Playwright was not run.
```

### Playwright's Verdict is Final

`run` starts the project's own Playwright with `--reporter=json` and reads the result file, rather than reimplementing anything. Playwright already marks a test that passed on retry as `flaky`, so katalepsis keeps that flag and lists every attempt.

What it does add is classification. A failure whose message names the preview's own origin as unreachable becomes blocked, but a dead third-party API stays failed, because that's a real problem with your app. A browser that couldn't launch is blocked too, which is exactly what I got the first time I ran the demo for this article on a machine with the wrong browser build installed.

### The Model Doesn't Get to Call Something a Pass

The model in `verify` can click and type and read the page, but it doesn't get to call something a pass. A check only passes if the model points to a browser assertion that katalepsis ran, that passed, and that shows something that wasn't on the page before the model acted. Otherwise it comes back blocked.

Here's how that works. The model only gets a small set of tools: `navigate`, `snapshot`, `click`, `fill`, `press`, `assert`, and `finish`. `assert` doesn't return the model's opinion. katalepsis runs the check in the browser itself, takes a screenshot, and records the result with an ID like `a3`. When the model calls `finish`, it has to cite those IDs:

```ts
finish: tool({
  description: "Report the verdict once, citing assertion IDs such as a1.",
  inputSchema: schema(
    Schema.Struct({
      verdict: Schema.Literals(["passed", "failed", "blocked"]),
      summary: Schema.String,
      assertionIds: Schema.Array(Schema.String),
    }),
  ),
  execute: (verdict) => {
    onFinish(verdict);
    return "Recorded.";
  },
}),
```

Then a plain function, `decideOutcome`, compares the claim with the evidence. A trimmed version of the pass rule:

```ts
if (!cited.every((assertion) => assertion.passed)) {
  return "The agent reported a pass, but a cited assertion failed.";
}
const shown = cited.filter((assertion) => assertion.expectation === "visible");
if (shown.length === 0) {
  return "The agent reported a pass citing only hidden or URL assertions.";
}
if (!observeOnly && shown.every((assertion) => assertion.trueAtStart === true)) {
  return "The agent reported a pass, but everything it cited was already on the page before it acted.";
}
```

Any of those messages turns the check into blocked with the code `no-evidence`. Citing an assertion ID that never ran is blocked too. The function also blocks a pass if an uncited assertion failed after the last cited one, because the latest evidence disagrees with the verdict.

That `trueAtStart` condition exists because one of the models I tested tried to prove a form worked by citing the label of the email field, which had been there all along. T

o catch it, each check opens two copies of the start page in separate browser contexts. The model works in one, and the other stays untouched. When the model asserts that something is visible, katalepsis looks for the same element on the untouched copy, and if it's there too, the assertion gets `trueAtStart: true` and can't carry a pass on its own.

### One Action at a Time

The first live runs also caught parallel tool calls stepping on each other, and a name ending up typed into the email field. Models like to send several tool calls at once, and two `fill` calls racing each other type into whichever field has focus. The fix is a promise queue that every browser action goes through:

```ts
private exclusive<A>(action: () => Promise<A>): Promise<A> {
  const next = this.queue.then(action, action);
  this.queue = next.catch(() => undefined);
  return next;
}
```

Each action waits for the previous one to settle, whether it succeeded or failed, and a failure doesn't poison the queue for the next action.

### Budgets and Boundaries

Each agent check runs in its own browser context with tracing on, so the report always has a trace to replay. Navigation is limited to the preview's origin plus anything you allow with `--allow-origin`. The model has a step limit (`--max-steps`, 15 by default), a token limit (`--max-tokens`, 200,000), and a time limit (`--check-timeout`, 120 seconds), and running out of any of them is reported as blocked with the reason, not as a failure. Query strings are redacted from URLs in the report.

### How it Was Built

Before writing code, I wrote a build plan split into milestones. M0 was a review of how two of my earlier projects handled credentials and providers, plus the first architecture decision record and the monorepo tooling. M1 was the Playwright runner and the report, M2 was agent checks with your own key, and M3 was the MCP server. Each milestone ended with a fresh agent with no history reviewing the work against the plan, the same independent-reviewer rule from earlier in this article.

Those reviews shaped the tool more than the plan did. The first one came back with 15 findings, including the rule that only an unreachable preview counts as blocked while other hosts stay failed. The M2 review found that a model could get a pass by citing an assertion that proved nothing, which is where the stricter pass rule and the untouched copy of the page came from. The M3 review found that a client quitting mid-run left Playwright and its browsers running, and that a crafted symlink could let the report tool read files outside the project. All of those are fixed and covered by tests now.

---

## What Happened When I Used It

Before telling anyone about it, I ran it against two of my own projects. Conclave's suite came back with 95 passed. A larger app came back with 137 passed and one failure, an assertion on a zoom level that was slightly off.

That was a test I already had and hadn't noticed was failing, so katalepsis didn't find the bug so much as make it impossible to miss. Both projects also hardcoded their `baseURL`, which meant their tests never touched the URL I passed in. katalepsis now warns about that, because a green run against the wrong server is worse than no run.

After I posted it on LinkedIn, someone in the comments pointed out that the commit you have checked out isn't necessarily the commit the preview was built from. They were right, so the report now records both and marks them confirmed, mismatched, or unknown, and a mismatch blocks a run that would otherwise pass, since a green run against a stale preview tells you nothing about your diff.

The preview reports its commit with an `x-commit-sha` response header or a `<meta name="commit-sha">` tag, which the same probe that checks availability reads. If your host can't do either, you can pass `--preview-commit` yourself.

I'm dogfooding it in the same instructions this article describes. The browser-review skill now tells my agents to run katalepsis first, and to fall back to plain browser automation for what it can't check yet: field values, persistence, console and network, and layout across viewports.

The first Codex session to pick that up went looking for a "katalepsis skill" because of how I'd worded the line in <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, didn't find one, and fell back to its old browser review. Wrong for a silly reason, but the fallback did exactly what it was supposed to, and the fix was saying plainly that katalepsis is a CLI and browser-review is the skill.

A few days later I used it on a real work branch, a change that made GeoJSON the main download button and moved CSV and KML into a dropdown. The agent stopped before running anything, because `verify` sends page content to the model provider and my rules say it needs my OK before doing that for an app. That's the behavior I want

With seeded synthetic data and an explicit OK, the check passed: one visible primary button, and the other formats showing up once the dropdown opened, with the screenshots and trace in the report. The skill still keeps pages with real data on the fallback path.

---

## Where I Landed

Not every task needs any of this. I don't need Playwright to confirm a Markdown typo got fixed, and a backend refactor that can't change what renders doesn't need Chromium. I do want it for components, forms, navigation, dialogs, client state, maps, filtering, responsive layout, persistence, and any user-visible bug fix.

My rule of thumb is that if you're making a claim about how the UI behaves at runtime, the runtime UI should be part of the evidence.

None of this replaces good tests, code review, or me looking at changes that matter. It just adds the feedback loop that was missing. The agent already has the repository and the shell, and it knows what it changed. With a browser it can start answering whether the thing it built actually works, and with a report it can show me instead of telling me. If it can write the button, it can click it and show me what happened before it says it's done.

::: info About Author

katalepsis is MIT licensed and on [GitHub (<VPIcon icon="iconfont icon-github"/>`glamboyosa/katalepsis`)](https://github.com/glamboyosa/katalepsis). If an agent check ever gives you a result you don't believe, I'd like to hear about it.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Make Your Coding Agent Check Its Work in the Browser",
  "desc": "I got tired of coding agents telling me the frontend work was done when nobody had opened the frontend. You've probably seen the routine. The agent changes some code, runs the formatter, the type chec",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-your-coding-agent-check-its-work-in-the-browser.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
