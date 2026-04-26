---
lang: en-US
title: "How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer"
description: "Article(s) > How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer"
icon: iconfont icon-claude
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
      content: "Article(s) > How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer"
    - property: og:description
      content: "How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-unblock-ai-pr-review-bottleneck-handbook.html
prev: /ai/claude/articles/README.md
date: 2026-05-05
isOriginal: false
author:
  - name: Qudrat Ullah
    url: https://freecodecamp.org/news/author/qudratullahdev/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c94dff21-66d0-4256-bf3e-25c1978364d9.png
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
  name="How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer"
  desc="A few months ago, I was reviewing a pull request that added three new API endpoints. The diff was clean. Tests passed. The agent that generated it had even written sensible authorisation checks. By ev"
  url="https://freecodecamp.org/news/how-to-unblock-ai-pr-review-bottleneck-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c94dff21-66d0-4256-bf3e-25c1978364d9.png"/>

A few months ago, I was reviewing a pull request that added three new API endpoints. The diff was clean. Tests passed. The agent that generated it had even written sensible authorisation checks. By every signal I usually rely on, it was ready to merge.

The problem only showed up when I checked which authentication middleware the agent had imported.

Our codebase had two: a v1 middleware backed by MongoDB and a v2 middleware backed by MySQL, which we had spent the previous quarter migrating.

New endpoints were supposed to use v2. The agent had used v1 for all three. Tests passed because user records still existed in both databases (that was the point of the migration), and the v1 middleware happily authenticated them. The code worked. But every new endpoint we shipped was reinforcing the legacy auth path we had just spent a quarter trying to retire.

I caught it on the second read. Twenty minutes after the comments, the engineer fixed it and reopened the PR. The third reviewer probably wouldn't have caught it. The migration timeline lived in a Slack thread from six months earlier. The rule that "new endpoints use v2" lived in my head.

This kind of catch is the slow-burn version of why AI changed my job as a tech lead. Code generation got faster. My review queue got longer. The hardest reviews were the ones where everything looked right, and the only thing wrong was something that lived in the team's collective memory rather than in the diff.

This handbook is about what we did to fix that. It's the story of how we went from drowning in clean-looking PRs to running a custom AI PR reviewer that catches a meaningful share of these mistakes before any human is pulled in. The fix turned out to be less about buying a better tool and more about moving the team's memory into a place the AI could actually read.

The lessons should transfer whether your team uses Claude Code, Cursor, Cline, GitHub Copilot, or any combination. The structure matters more than the tool.

---

## The Old Bottleneck, and the One AI Created

To understand why this fix was needed, it helps to remember what reviewing code looked like a couple of years ago.

Back then, the slow part was upstream of the PR. A ticket would land, and before anyone could open a branch, there was a long preamble of context-gathering.

Junior engineers needed time to understand what the change was for. Senior engineers had to explain business rules and architectural decisions. Tickets sat in "ready" columns for days while someone with the right context made themselves available. Then the writing itself took time, because typing real code is slower than typing comments about it.

That bottleneck mostly dissolved when the team got serious about AI-assisted development. Engineers used the agent to read the codebase, ask clarifying questions, draft an implementation plan, and produce a working branch in hours instead of days. Tickets moved through the queue faster. Junior engineers shipped more without blocking on senior availability. From the outside, this looked like an unambiguous win.

But the bottleneck didn't disappear. It moved.

Within a few weeks of widespread AI adoption, my review queue had doubled. Then tripled. Engineers were opening PRs faster than I could read them.

The PRs themselves looked clean: well-formatted, with sensible variable names, passing tests, and AI-generated descriptions that read better than most human-written ones.

On the surface, this was great. In practice, it was creating a different kind of pain. I was the senior engineer who knew which patterns mattered and which paths through the codebase were the right ones, and I was the bottleneck. The team's velocity was now capped by my reading speed.

The CircleCI 2026 State of Software Delivery report confirmed I was not alone. Drawing on more than 28 million CI workflow runs across over 22,000 organisations, the report showed feature branch throughput had grown 59% year over year, the largest jump CircleCI had ever measured. Main branch throughput, where code actually gets promoted to production, fell by 7% for the median team in the same period. Build success rates dropped to 70.8%, the lowest in five years.

The pattern was consistent across the industry. AI accelerated writing. The rest of the system absorbed the cost.

So the question for me, as a tech lead, became concrete: how do I unblock myself without lowering the bar?

---

## What the New Review Work Actually Looks Like

Before I explain the fix, it helps to know what kinds of issues were actually piling up. They weren't the dramatic kind. None of them would crash production. They were small, recurring, and looked plausible at a glance.

Take the simplest case I kept catching. An engineer would ask the agent to add a delete button on a new screen. The button needed to call our existing backend delete endpoint. Instead of reusing the hook the team already had for that endpoint, the agent would write the fetch call inline.

The code worked. The tests passed. But a week later, when someone changed the backend response shape, only one of the two call sites got updated.

That kind of duplication doesn't show up in a code review unless the reviewer happens to remember that a hook exists.

Another example I saw constantly: the agent comparing a status field against the literal string `"completed"` instead of using the `Status.Completed` enum that the rest of the services used. The code ran. The tests ran. The next refactor of the enum quietly skipped the file. After a few days, someone would spend half a day debugging a state machine that was working fine until the agent's literal silently fell out of sync.

These were two-minute fixes once spotted, but spotting them took me a reasonable time per PR. The friction wasn't the difficulty. It was the repetition.

The pattern repeated across larger problems, too.

I once asked an agent to build an event creation wizard. The wizard needed several dropdowns and one new component.

We have a design system folder where shared UI components live, and the rule on the team is simple: check there first, and if you build something new, register it there.

The agent had no way to know that. It only loaded the wizard's own files, so it never opened the design system folder. It generated brand new dropdowns inline, with APIs that were almost identical to the ones we already had. The new component went straight into the wizard rather than into the design system. CI passed. The wizard worked. We caught the duplication in human review, but it was the kind of catch that depended entirely on a reviewer who happened to know the design system existed.

The same pattern hit in one of the repos I was looking at for backend architecture. Backend follows a strict four-layer pattern: route, controller, app, repo. Controllers must never call repository functions directly. That rule keeps authorisation centralised, business logic testable, and database concerns isolated.

One PR I reviewed had the agent calling repo functions straight from a controller, skipping the app layer entirely. The code worked. The tests passed because the agent had also written tests against the new shape. But it broke a discipline the team had spent years building. If that PR had landed, the next AI-assisted PR could have used it as a template, and the layering would have eroded one diff at a time.

The common thread is that all of these mistakes had something written down somewhere, in code, in a Slack thread, in a senior engineer's head, that would have prevented them. The information existed. The agent just couldn't see it.

---

## Why I Did Not Just Buy a Tool

The obvious next move was to install one of the AI PR reviewers that flooded the market in 2026. I evaluated several. Anthropic launched Claude Code Review in March 2026, billed on token usage and averaging \\(15 to \\)25 per review. CodeRabbit Pro charges \\(24 per developer per month on annual billing, or \\)30 per developer per month on monthly billing, with seats counted against developers who actually open PRs. Greptile in March 2026 moved to a base-plus-usage model at $30 per seat per month, including 50 reviews, after which each additional review costs a dollar. GitHub announced that all Copilot plans will transition to usage-based billing on June 1, 2026, with code reviews consuming both AI Credits and GitHub Actions minutes from that date.

For a small team with low PR volume, none of these is a dealbreaker. For a larger team running heavy AI-assisted development, the costs compound fast. A 10-person team running five PRs each per day blows through Greptile's included reviews in a single week. CodeRabbit Pro at \\(24 per seat scales linearly with developers. The premium Claude Code Review at \\)15 to $25 per PR is the most expensive option per review by an order of magnitude.

I looked at the cost numbers, but cost wasn't actually the deciding factor. The deciding factor was that none of these tools would have caught the problems I just listed.

A generic reviewer wouldn't have caught the v1/v2 middleware. It had no way to know v2 was the canonical path. A generic reviewer wouldn't have caught the duplicate dropdowns. It had no way to know our design system existed. A generic reviewer wouldn't have caught the bypassed architecture. It had no way to know that controllers must not call repositories.

The information that lets a reviewer flag any of these is exactly the information that lives in the team's head, not in any tool's default prompt.

The better-rated tools support custom rules, and that's where I started to see the real shape of the problem. Once you are configuring custom rules, you've already accepted that the value is in the rules. The tool is just whatever runs them.

This raised a different question: if the rules are the product, why pay per seat or per review for someone else's wrapper around them?

This is what made me change direction.

---

## The Realisation: Move the Rules Into the Codebase

Once I started thinking of the rules as the product, the path forward got clearer.

I asked myself a simple question: what was I actually doing in code review that the AI was not? The answer turned out to be the same thing, over and over. I was typing review comments that captured a piece of the team's memory.

"Use the Status enum, not a string literal." "There is already a hook for this in `/hooks/useDeleteItem`." "Controllers must not import from the repo layer; route this through the app layer." "Check the design system folder before creating new components."

Each of those comments was knowledge that lived in my head and arrived in the codebase one PR comment at a time. None of it was available to the agent the next time it generated a similar PR.

So the fix was not to buy a smarter reviewer. The fix was to write the rules down in a place every agent on the team would read before any review happened.

If I had typed "use the enum, not a literal" three times in three different PRs, that was a rule the agent should know about from now on. If I had pointed at the design system folder for the fourth time, that was a rule. If I had explained the four-layer architecture twice in PR comments, that was a rule.

I needed somewhere to put these rules. That turned out to be a less obvious decision than I expected.

---

## Two Files That Changed Everything: AGENTS.md and <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`

If you start looking into how to give an AI agent a persistent project context, you run into two competing conventions almost immediately.

The first is <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, an open standard that has gathered real momentum. According to InfoQ, by mid-2025, the format had already been adopted by more than 20,000 GitHub repositories and was being positioned as a complement to traditional documentation: machine-readable context that lives alongside human-facing files like README.md.

The standard's own site reports it is now used by more than 60,000 open-source projects and has moved to stewardship under the Agentic AI Foundation, which sits inside the Linux Foundation. The format is supported by OpenAI Codex, GitHub Copilot, Google Gemini, Cursor, and Windsurf, among others.

The second is <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, which is Anthropic's convention for Claude Code. The Claude Code documentation describes two complementary memory systems: <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, where you write the persistent context yourself, and an auto-memory mechanism that lets Claude save its own notes from corrections and observed patterns. By default, Claude Code reads <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, not AGENTS.md.

This split mattered for us because half the team uses Claude Code and the other half uses Cursor. We had two practical options: maintain both files with the same content (and accept the duplication), or symlink one filename to the other so both ecosystems read the same source of truth. We went with the symlink. It's one less thing to drift.

The next question was what to actually put in the file. After a few iterations, here's the shape that worked. Think of it as a briefing document for a new engineer who has read no code and seen no Slack threads. The minimum content was:

- The tech stack (languages, frameworks, package manager)
- The project structure, especially important for our monorepo
- Where shared utilities, components, and helpers live, and the rule that new code should reuse them before creating new versions
- Architectural patterns the project follows, with file path examples
- Anti-patterns and what to do instead
- Test conventions and where good examples live
- Pointers to deeper documentation when more detail is needed

Two practical rules emerged from the first month of using these files.

**Keep them lean:** There is a counterintuitive failure mode with long instruction lists: the agent doesn't just skip the new ones at the bottom. The average compliance across all of them drops. A bloated memory file becomes a memory file that the agent skims. If a section runs more than a paragraph or two, move it to a separate document and link to it.

**Phrase rules as imperatives, not aspirations:** "Controllers must not call repositories. Route through the app layer." beats "Try to keep controllers thin." The first is testable. The second is decorative.

That was the entry point. But a single root-level file was not enough for a monorepo with multiple services and frontends, which led to the next decision.

---

## Where Per-Service Memory Files Earn Their Keep

A single <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` at the root of a monorepo collapses under its own weight pretty quickly. Each service in our codebase has its own architecture, conventions, and business rules. Trying to fit all of that into one file produced a long document that the agent treated as background noise, and we were back to the bloat problem from the previous section.

The pattern that worked: every service or app gets its own <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` at its root, and the project-level <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` becomes an index that points to them.

A per-service <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` covers things like:

- The architecture for this service (the four-layer pattern, the directory layout)
- Naming conventions specific to this service
- Test patterns and where good examples live
- Business rules that this service is responsible for
- Inter-service contracts and what other services consume from this one
- Pointers to deeper docs in <VPIcon icon="fas fa-folder-open"/>`docs/`
- A "Lessons learned" section, which I'll come back to in the section on the compounding loop

The same lean rule applies. Keep it short, point at examples, and phrase guidance as imperatives.

The reason this works mechanically is that the agent loads the right files for the work at hand. When an engineer asks the agent to change something in <VPIcon icon="fas fa-folder-open"/>`backend/`, the agent reads the project-level <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, sees that work in <VPIcon icon="fas fa-folder-open"/>`backend/` should be guided by <VPIcon icon="fas fa-folder-open"/>`backend/`<VPIcon icon="fa-brands fa-markdown"/>/`AGENTS.md`, and loads that file. It doesn't load the frontend's <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, because that work is somewhere else. The context window stays focused on what's relevant.

Without this split, you have two bad options. Either you put everything in the root file, where the agent ignores most of it, or you put nothing in the root file, where the agent has no team context at all. The per-service split gives you both depth and signal.

But these files only work if the deeper docs they point to actually exist, which is where the next piece of the system came in.

---

## What This Looks Like on Disk

Before going further, it helps to see the whole structure laid out. Here's the shape we settled on for our monorepo. The exact folder names follow Claude Code's conventions. If you use Cursor, it would be <VPIcon icon="fas fa-folder-open"/>`.cursor/`, and if you use Cline, it would be <VPIcon icon="fas fa-folder-open"/>`.clinerules` – but the shape transfers directly.

```sh :collapsed-lines title="file structure"
project-root/
├── AGENTS.md                       # symlink to CLAUDE.md
├── CLAUDE.md                       # root memory file
├── README.md                       # human-facing project readme
│
├── .claude/                        # tool-specific config folder
│   ├── README.md                   # explains the .claude/ layout
│   ├── settings.json               # permissions and guardrails
│   ├── agents/                     # specialised subagents (optional)
│   ├── commands/                   # slash commands engineers run
│   │   ├── review-pr.md            # the PR review command
│   │   └── plan-feature.md         # implementation plan command
│   ├── hooks/                      # lifecycle hooks (optional)
│   ├── pr-rules/                   # rule files for PR review
│   │   ├── common.md               # rules that apply to every PR
│   │   ├── frontend.md             # rules for frontend changes
│   │   ├── backend.md              # rules for backend changes
│   │   ├── service-a.md            # rules for service-a
│   │   └── service-b.md            # rules for service-b
│   └── skills/                     # reusable workflows
│
├── frontend/
│   ├── AGENTS.md                   # frontend conventions
│   ├── docs/
│   │   ├── overview.md
│   │   ├── architecture.md         # routing, state, data layer
│   │   ├── design-system.md        # design system reference
│   │   └── testing.md              # test conventions
│   └── src/
│
├── backend/
│   ├── AGENTS.md                   # the four-layer pattern
│   ├── docs/
│   │   ├── overview.md
│   │   ├── architecture.md         # route -> controller -> app -> repo
│   │   ├── auth.md                 # v1 vs v2 middleware
│   │   ├── business-rules.md
│   │   └── integrations.md
│   └── src/
│
├── service-a/
│   ├── AGENTS.md
│   ├── docs/
│   │   ├── overview.md
│   │   ├── business-rules.md
│   │   └── integrations.md
│   └── src/
│
└── service-b/
    ├── AGENTS.md
    ├── docs/
    │   ├── overview.md
    │   ├── business-rules.md
    │   └── integrations.md
    └── src/
```

A few things worth pointing out:

The <VPIcon icon="fas fa-folder-open"/>`.claude/` folder uses standard subfolder names: <VPIcon icon="fas fa-folder-open"/>`commands`, <VPIcon icon="fas fa-folder-open"/>`agents`, <VPIcon icon="fas fa-folder-open"/>`hooks`, <VPIcon icon="fas fa-folder-open"/>`skills`. These follow Claude Code's plugin model, but most modern AI coding tools have similar slots. Following the conventions makes the structure recognisable to anyone on the team and lowers the cost of switching tools later.

The <VPIcon icon="fas fa-folder-open"/>`pr-rules/` folder isn't a standard convention. It's a folder we created to hold per-area review rules that the PR review command loads selectively. You don't have to call it `pr-rules` – the name matters less than having one place where review rules live.

Each service has its own <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` plus a `docs/` folder. The root <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` is short and acts as an index. It tells the agent things like "if you touch files in <VPIcon icon="fas fa-folder-open"/>`backend/`, also read <VPIcon icon="fas fa-folder-open"/>`backend`/<VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` first." The per-service file then points at the deeper docs as needed.

---

## Generated Documentation as a Side Effect

Setting up per-service <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` files surfaced a problem I had been quietly avoiding. Most of our services didn't have decent documentation. Not API reference material, which lives in code, but the higher-level "what does this service do, what business rules does it enforce, what does it consume and produce" information that lives in nobody's head except the original author's.

The honest reason was that writing this kind of documentation by hand had never paid back the time it took. By the time the doc was finished, half of it was already stale.

So I tried something I wouldn't have considered earlier. I used the AI itself to generate a first draft for each service. I pointed the agent at each service's code and asked it to produce a `docs/` folder with a specific structure: an overview, a list of business rules, an integrations document, a domain model, and any quirks worth knowing. The agent read the code, traced the call paths, and wrote a draft.

I then reviewed the output by hand, corrected the things it got wrong, and committed the result. The first drafts were 70-80% correct. The remaining 20-30% was where the agent had made plausible but wrong inferences, and those were exactly the cases where human review mattered.

The generated docs ended up serving two audiences. The agent uses them when reasoning about changes, which means it has real context for the service it's touching rather than guessing from local files. And new engineers use them on their first day, which has cut our onboarding time noticeably.

We used to write onboarding documents that drifted out of date within months. These docs stay closer to current because the agent reads them on every PR, and any drift gets surfaced when the agent gives wrong advice based on stale information.

The pattern that works is to keep the per-service <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` short and pointing at the docs, rather than duplicating their content. <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` is the always-loaded index. `docs/` holds the details. The agent loads the relevant doc on demand when the task calls for it.

With the rules in place and the docs in place, I had everything I needed to build the actual reviewer.

---

## Building the PR Review Command

This is the piece that most directly unblocked my queue.

This command didn't appear out of nowhere. It started as the checklist I was running through in my head every time I opened a PR. I was reviewing every change manually, leaving the same comments, flagging the same patterns. So I wrote that checklist down, expanded it with references to the per-service docs for the harder rules, and turned it into a command anyone on the team could run.

Then I handed it to the engineers and changed the rule: run this on your own branch before marking the PR ready for review. That single shift moved the work from after the PR was opened to before. Engineers now catch 90-95% of the blockers, improvements, and nice-to-haves on their own machine, fix them locally, and only then push the change.

The PR description includes the AI's summary, so when anyone opens the PR, they can see the reviewer's green signal at the top before even reading the diff.

GitHub stays clean. The conversation on the PR becomes about the things that actually need a human, not the recurring stuff the team already knows how to fix.

The command lives in <VPIcon icon="fas fa-folder-open"/>`.claude/commands/`<VPIcon icon="fa-brands fa-markdown"/>`review-pr.md`. Here's a generalised version. Your tool's command structure may differ, but the shape is what matters.

```md title=".claude/commands/review-pr.md"
# Review PR

Review the current branch's PR. Be direct. Cite `file:line`. Surface real issues,
no padding.

## 1. Scope the diff

Run, in order:

    gh pr view --json number,title,body,headRefName 2>/dev/null || true
    git fetch origin main
    git log --no-merges origin/main..HEAD --oneline
    git diff origin/main...HEAD --stat
    git diff origin/main...HEAD

Read the PR body. Note the stated intent. Every change should trace to it. Flag
anything that does not.

Use `...` (three dots) for the diff. It compares against the merge base and
excludes commits brought in by merging main.

## 2. Load rules

Always read `.claude/pr-rules/common.md`.

Then read the per-area file for each workspace touched in the diff:

| Workspace path | Rules file                      |
| -------------- | ------------------------------- |
| `frontend/**`  | `.claude/pr-rules/frontend.md`  |
| `backend/**`   | `.claude/pr-rules/backend.md`   |
| `service-a/**` | `.claude/pr-rules/service-a.md` |
| `service-b/**` | `.claude/pr-rules/service-b.md` |

For non-trivial changes, follow doc pointers inside the rules files (for
example, `backend/AGENTS.md`, `backend/docs/architecture.md`).

Apply every entry under each file's "Lessons learned" section as a check.

## 3. Output

Use exactly this format.

    ## Summary
    <one paragraph: what the PR does, whether it matches the stated intent>

    ## Blocking
    - [file:line] issue, why it blocks

    ## Should fix
    - [file:line] issue

    ## Nice to have
    - issue

    ## Verified
    - what was checked and looks good

If nothing blocks, say so. Do not manufacture concerns.

If you find an issue worth remembering for future PRs, suggest the bullet to
add to the relevant rules file's "Lessons learned" section. Do not edit the
rules file yourself, leave that to the human.
```

A few of the design choices in this command turned out to matter more than I expected.

The structured output format (Summary, Blocking, Should fix, Nice to have, Verified) keeps the review easy to scan and easy to paste into a PR description. The "Verified" section is the most underrated of the five: it tells the human reviewer what the AI already checked, so they can spend their attention elsewhere. Without it, the human reviewer ends up doing the same checks twice.

The instruction to be direct and stop padding does real work. Without it, AI reviewers tend to manufacture concerns to look thorough, which trains engineers to skim past the bot. Telling it explicitly to say "nothing blocks" when nothing blocks made the signal-to-noise ratio of the output much better.

The "suggest a bullet for the rules file" instruction at the end is the heart of the whole system, and I'll explain why in the section on the compounding loop. The key constraint here is that the agent suggests the bullet but doesn't commit to it. A human evaluates whether it's general enough to be a rule, and only then adds it to the file. That manual step is what keeps the rules sharp instead of bloated.

With each PR, if humans fix something or the AI suggests something, you keep adding those to your MD files and keep improving your agents for the future. The result compounds quickly.

One more thing here: the diff-scoping commands are all read-only. The command shouldn't be able to push, edit PRs, or close anything. Which is the next piece of the system.

---

## Guardrails: Read-Only by Default

Giving an AI agent broad permissions on your codebase is a security incident waiting to happen. Even if you trust the model to behave, an LLM occasionally does unexpected things, and a fast-moving agent on an unrestricted shell can cause damage in seconds.

The fix is a <VPIcon icon="iconfont icon-json"/>`settings.json` (in Claude Code – other tools have their own equivalents) at the root of <VPIcon icon="fas fa-folder-open"/>`.claude/` that explicitly declares what the agent can and can't do. The deny list matters more than the allow list, and a good one is organised around four categories of risk.

The first is **secrets and configuration**. Any read against anything that appears to be a credential is blocked. That covers `.env` files of every variant (`.env`, `.env.local`, `.env.production`, `.env.test`, and so on), `.npmrc`, `.netrc`, `.pgpass`, `id_rsa`, `id_ed25519`, `*.pem`, `*.key`, `*.p12`, `**/credentials.json`, `**/secrets.json`, `**/.aws/**`, `**/.ssh/**`, `**/.gcloud/**`, and `**/.kube/**`. Environment dumps are blocked too: `env`, `printenv`, `set`, `export`. The agent has no legitimate reason to read or echo any of these, ever.

The second is **destructive Git operations**. The agent can read Git history but can't rewrite or push it. Blocked: `git push`, `git commit`, `git revert`, `git cherry-pick`, `git merge`, `git rebase`, `git reset --hard`, `git tag`. Allowed: `git fetch`, `git status`, `git log`, `git diff`, `git show`, `git branch`, `git rev-parse`, `git merge-base`, `git config --get`.

The third is **write operations on PRs and issues**. The agent can read your GitHub state but can't act on it. Blocked: `gh pr create`, `gh pr edit`, `gh pr merge`, `gh pr close`, `gh pr comment`, `gh pr review`, `gh issue create`, `gh issue edit`, `gh issue close`, `gh issue comment`, `gh release create`, `gh repo create`, `gh repo edit`, `gh repo delete`. Allowed: `gh pr view`, `gh pr list`, `gh pr diff`, `gh pr checks`, `gh issue view`, `gh issue list`, `gh release view`.

The fourth is **workflow and automation control**. These are the surfaces where a compromised or misled agent could do the most damage. Blocked: `gh workflow run`, `gh run rerun`, `gh run cancel`, `gh secret`, `gh variable`, `gh auth`, `gh ssh-key`, `gh gpg-key`, and the unrestricted `gh api`.

For shell commands the agent legitimately needs to run, like build and test commands, allowlist specific patterns: `pnpm test`, `pnpm lint`, `pnpm format:check`, `pnpm build`, `pnpm vitest`. Anything outside the allowed list requires human confirmation. These are your own settings – I've just mentioned what I prefer.

The pattern is simple: read-only by default, write-allowed only for the specific commands you have explicitly approved. The agent can investigate, plan, and recommend. It can't ship.

With the structure in place and the guardrails set, the system started doing its job. What I didn't expect was how much better it would get over the months that followed.

---

## The Compounding Loop That Made the Real Difference

When we started, the AI reviewer was useful but not transformative. It caught some obvious issues, missed plenty of subtle ones, and produced a fair amount of noise.

The first month, my review burden dropped by 35%. The time I was spending on PR checking was reduced to 1/3, almost. Decent, not life-changing.

What changed over time wasn't the tool. It was the rules.

Every time a PR creator and reviewer caught something the AI had missed, we were adding bullets to the relevant rules file. Every time the AI flagged something useful that turned out to be a recurring pattern, the agent's own suggestion at the end of the review went into the file.

After a few days, the rules files had grown into something that captured a meaningful fraction of the team's collective review knowledge, written down in a place every agent on the team would read.

The catch rate went up. The noise went down because the rules also said what was acceptable and what we already considered solved. New engineers stopped getting the same comments on their first three PRs because the AI caught the comments first. Engineers joining the team didn't have to absorb the conventions through six months of review feedback. They installed the project, opened it in their editor, and the agent already knew.

This is the part most teams miss when they evaluate AI PR review tools. They look at the catch rate today and decide whether the tool is worth the price. The catch rate today isn't the right number. The right number is what the catch rate looks like in six months, after the rules file has absorbed every recurring mistake your team has made.

A single rule written down today saves a small amount of review time. Over a hundred PRs, it saves more. After a year, the rules file is a written-down version of a tech lead's accumulated taste. We've switched between Claude Code, the GitHub Copilot CLI, and Cursor for various tasks during this period. The AI tool changes, but the rules file in the repo stays the same.

The discipline that makes this work is treating the rules file as living documentation. Every recurring review comment is a candidate for promotion into the file. If you catch yourself typing the same feedback in two different PRs, that's a rule that belongs in <VPIcon icon="fas fa-folder-open"/>`pr-rules/`. The "suggest a bullet" instruction in the review command is what makes this practical: the AI does the typing, the human does the deciding.

This is also what made me realise the system was worth the time it took to set up. The PR review command, on its own, is useful but unremarkable. The compounding loop is what turns it into infrastructure.

---

## Starting From Zero on an Existing Project

If you've read this far and feel like the gap between your project and what I just described is a sprint of work, that's the most common reaction. It's also not correct.

The blank <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` is intimidating, especially on an existing codebase. You know your team has a thousand conventions, and writing a thousand rules sounds like a project that takes weeks before it produces any value.

The honest answer is that you can't write all the rules up front, and you shouldn't try. The first version of any of these files should take an afternoon, not a sprint.

Here's how I would actually start.

Run `/init` (or your tool's equivalent). In Claude Code, `/init` scans the project, infers the obvious shape (language, framework, entry points, build commands), and writes an initial `<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md``. The output is a starting point, not a finished file. Read it, delete most of what it generates, and keep the bones.

Then add three things, each one bullet long.

First, an architecture rule. Pick the single most important convention your team enforces. For us, that was the four-layer pattern. The bullet was: "Controllers must not call repository functions directly. They must go through the app layer."

Second, a discoverability rule. Pick the single most important shared resource the team has, the one new code is most likely to duplicate. For us, that was the design system. The bullet was: "Before creating a new UI component, check `/src/design-system/` first."

Third, a "do not touch" rule. Pick the single most dangerous file or area in the codebase. Auth, billing, or migrations whichever has the most production risk. The bullet was: "Do not modify files in `/auth/` without human approval."

That's enough to start. Three rules, ten minutes of writing, and most of your team's recurring AI mistakes start to drop.

If even three rules feels like too much, start with one. Pick a single line that matters in your codebase and write it down.

"No `any` types in TypeScript." "Always use the enum, never compare against the string literal." "Run the linter before opening a PR." It doesn't have to be sophisticated. It doesn't have to cover edge cases. It just has to capture one piece of judgement that lives in your head today and would otherwise stay there.

Tomorrow, add another. The first week, you might catch 5% of the recurring mistakes. By 20 or 30 PRs in, you might catch 20-30%. The rules file doesn't need to be impressive on day one. It needs to exist and keep growing.

This is the compounding effect I'll come back to soon, and it's the reason this approach works on real projects rather than just in theory.

From there, the file grows the same way it would grow for any team. Every review catch becomes a candidate rule. After a few weeks, you have ten or fifteen rules. After a few months, you have a real review system.

The mistake is trying to write the perfect file on day one. The right file is the one you start with and keep editing.

---

## What Still Needs Human Review

This system doesn't replace human review, and it shouldn't be allowed to.

The AI reviewer catches what the rules describe, plus a fair number of obvious things it would have spotted anyway. It doesn't catch problems that depend on context the rules don't capture. It doesn't catch product judgement. It doesn't catch the question of whether the change should have been built at all.

It also has an important blind spot when reviewing AI-authored code. The reviewer shares the same training data and reasoning patterns as the agent that wrote the code. If the original agent missed the v1/v2 distinction because it had no way to see the migration timeline, an AI reviewer reading the same diff has the same problem. Two AIs in a review loop are not two independent reviewers. They share blind spots.

That is why the AI reviewer in this setup never approves a PR. It produces a structured review that goes into the PR description. A human still reads the change and approves it. The AI is the first pass, not the gate.

Accountability also has to live with a human. When something the AI approved breaks production, someone has to own the post-mortem and decide what changes are needed for next time. The AI can't be that person. What it can do, well, is reduce the stack of small mistakes a human reviewer has to find before they get to the harder questions.

---

## A Two-Week Setup Plan

If you want to set this up for your own team, here's a concrete plan that fits in a couple of weeks. None of this needs to happen in a single push.

### Day 1: Bootstrap the memory file.

Run `/init` (or your tool's equivalent) at the root of the project. Read the generated <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` (or <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`). Delete most of it. Keep the tech stack and project structure sections.

Add the three rules from the previous section: one architecture rule, one discoverability rule, and one "do not touch" rule. Decide whether you want both files or a symlink.

### Day 2: Add per-service files for your highest-risk areas

Pick the two or three areas of the codebase that change most often or carry the most risk. Add an <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md` to each, following the same lean pattern. Include the architectural pattern for that area, the naming conventions, where to find good test examples, and pointers to any existing docs. Skip anything that doesn't need to be there yet.

### Day 3: Set up the directory structure and guardrails

Create a <VPIcon icon="fas fa-folder-open"/>`.claude/` folder (or your tool's equivalent) at the root, with `commands/` and `pr-rules/` subfolders. Add a `settings.json` with the deny list categories from the guardrails section. Test that the agent can't read a `.env` file, run `git push`, or create a PR. If any of those work, fix the settings before doing anything else.

### Day 4: Write the PR review command

Adapt the command in this article to your structure. Include the diff scoping, the rule loading, the output format, and the "suggest a new rule" instruction at the end. Run it on a branch you've already merged, and tune the output until it's useful.

### Day 5: Run it on real PRs

Have one or two engineers run the command on their next PRs before opening them. Read the output. Note what it caught, what it missed, and what was noise. Add the missing catches to the rules files. The first week is mostly tuning.

### Week 2: Roll out and document

Once the command produces useful output reliably, ask the whole team to run it before opening PRs and paste the output into the PR description. Add a short section to your contributing guide explaining the workflow. Set a recurring item in your team's rituals to review the rules files monthly and trim anything that has gone stale.

That gets you to a working system. From there, the maintenance is incremental. Every recurring review comment becomes a candidate rule. Every architectural decision becomes a candidate update to the relevant <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`. The system improves as a side effect of the work the team is already doing.

---

## What Is Working, What I Am Still Improving

Here's my honest assessment after a few months of running this:

### What's Working

My review burden is meaningfully smaller. Engineers fix most of the easy mistakes before I see the PR. The "Verified" section of the AI's output tells me what to skip past. New engineers ramp faster because the conventions live in a place their tooling reads. The rules files have grown into something I would actually use to onboard someone new.

### What Isn't Finished

The AI still misses problems that depend on context, and the rules don't capture them. The rules files grow, but they also need pruning, and we haven't been disciplined about that.

We're still figuring out how to handle rules that apply only conditionally. Docs are helping in that case, but we need to keep those up to date. And no system survives a determined engineer who skips the workflow or docs when they're in a rush.

There's no shortcut here. The work is real, ongoing, and mostly about discipline. The discipline is treating your codebase as something the AI needs to learn, and treating every recurring review comment as something that should be written down once instead of typed thirty times. If you're willing to do that, the tools take care of the rest.

If you take three things from this article, take these.

1. First, don't pay for a generic reviewer to do a job your codebase needs to inform. Generic reviewers catch generic problems. Most of your real review work is specific to your team.
2. Second, put the rules in a file the AI reads, not in your head. <VPIcon icon="fa-brands fa-markdown"/>`AGENTS.md`, <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`, per-service files, per-area rules files. Pick a structure and stick to it.
3. Third, treat every human review catch as a chance to update the rules. The compounding effect over months is the entire point. A review system that improves itself is worth more than any single tool.

That's the system. It took a couple of weeks to build the foundation and a few months for the rules to mature. It costs very little to run, and it has done more for our PR throughput than any tool I evaluated.

::: info Sources

<SiteInfo
  name="The 2026 State of Software Delivery - CircleCI"
  desc="AI increased development activity by 59% in 2025, but delivery is slowing. Learn why pipelines break under AI scale and how top teams adapt."
  url="https://circleci.com/resources/2026-state-of-software-delivery//"
  logo="https://d2qm0z2kzhiwa.cloudfront.net/assets/favicon-a4b5df34fe849ecd8018a252dbf89a6c.ico"
  preview="https://images.ctfassets.net/il1yandlcjgk/3NJSDelkFaAtnyFOJNghjQ/df5d4218a3ca83233e471c7eab072b90/circleci-og-morph.png"/>

<SiteInfo
  name="5 key takeaways from the 2026 State of Software Delivery: Why AI isn’t shipping faster - CircleCI"
  desc="Teams are writing more code than ever, but fewer are shipping it. See the 5 key findings from 28M+ workflows in the 2026 State of Software Delivery."
  url="https://circleci.com/blog/five-takeaways-2026-software-delivery-report//"
  logo="https://d2qm0z2kzhiwa.cloudfront.net/blog/assets/blog/meta/favicon-a4b5df34fe849ecd8018a252dbf89a6c.ico"
  preview="https://images.ctfassets.net/il1yandlcjgk/2Ge07sETWgSxpm8P4C7AGW/0cf02edbc63342b67c144a1271939460/SoSDR-2026-Book-Mock-v1.jpg?w=1200&fm=jpg"/>

<SiteInfo
  name="GitHub Copilot is moving to usage-based billing"
  desc="Starting June 1, your Copilot usage will consume GitHub AI Credits."
  url="https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing//"
  logo="https://github.blog/wp-content/uploads/2019/01/cropped-github-favicon-512.png?fit=192%2C192"
  preview="https://github.blog/wp-content/uploads/2026/01/generic-invertocat-logo.png"/>

<SiteInfo
  name="GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026 - GitHub Changelog"
  desc="Developers and engineering teams worldwide use GitHub Copilot for high-quality, agent-powered code reviews on every pull request. We understand that any change is significant to our customers, especially when it…"
  url="https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026//"
  logo="https://github.blog/wp-content/uploads/2019/01/cropped-github-favicon-512.png?fit=192%2C192"
  preview="https://github.blog/wp-content/uploads/2026/04/ConsumesActionsMinutes_NewRelease_Unfurl_TextOnly.jpg"/>

<SiteInfo
  name="AGENTS.md"
  desc="AGENTS.md is a simple, open format for guiding coding agents. Think of it as a README for agents."
  url="https://agents.md/"
  logo="https://agents.md/favicon-dark.png"
  preview="https://agents.md/og.png"/>

<SiteInfo
  name="How Claude remembers your project - Claude Code Docs"
  desc="Give Claude persistent instructions with CLAUDE.md files, and let Claude accumulate learnings automatically with auto memory."
  url="https://code.claude.com/docs/en/memory/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DUse%2BClaude%2BCode%26appearance%3Dsystem%26title%3DHow%2BClaude%2Bremembers%2Byour%2Bproject%26description%3DGive%2BClaude%2Bpersistent%2Binstructions%2Bwith%2BCLAUDE.md%2Bfiles%252C%2Band%2Blet%2BClaude%2Baccumulate%2Blearnings%2Bautomatically%2Bwith%2Bauto%2Bmemory.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="Claude Code GitHub Actions - Claude Code Docs"
  desc="Learn about integrating Claude Code into your development workflow with Claude Code GitHub Actions"
  url="https://code.claude.com/docs/en/github-actions/"
  logo="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon-dark/favicon.ico"
  preview="https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DCode%2Breview%2B%2526%2BCI%252FCD%26appearance%3Dsystem%26title%3DClaude%2BCode%2BGitHub%2BActions%26description%3DLearn%2Babout%2Bintegrating%2BClaude%2BCode%2Binto%2Byour%2Bdevelopment%2Bworkflow%2Bwith%2BClaude%2BCode%2BGitHub%2BActions%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Flight.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D78fd01ff4f4340295a4f66e2ea54903c%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fclaude-code%252Fc5r9_6tjPMzFdDDT%252Flogo%252Fdark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dc5r9_6tjPMzFdDDT%2526q%253D85%2526s%253D1298a0c3b3a1da603b190d0de0e31712%26primaryColor%3D%25230E0E0E%26lightColor%3D%2523D4A27F%26darkColor%3D%25230E0E0E%26backgroundLight%3D%2523FDFDF7%26backgroundDark%3D%252309090B&w=1200&q=100"/>

<SiteInfo
  name="CodeRabbit Documentation - AI code reviews on pull requests, IDE, and CLI"
  desc="Complete documentation for CodeRabbit. AI code reviews, on pull requests, on the IDE, and on the CLI. With deep integrations to Codex, Claude Code, Cursor, and Gemini and more."
  url="https://docs.coderabbit.ai/management/plans/"
  logo="https://docs.coderabbit.ai/mintlify-assets/_mintlify/favicons/coderabbit/KAUlytuNnmw4YdTT/_generated/favicon-dark/favicon.ico"
  preview="https://coderabbit.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DSubscription%2B%2526%2Bbilling%26title%3DPlans%2Band%2Bpricing%26description%3DCompare%2BCodeRabbit%2Bplans%2Band%2Bunderstand%2Bper-developer%2Breview%2Brate%2Blimits%2Band%2Bfeature%2Blimits.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fcoderabbit%252F8RnjEPbKrF2YZ_KZ%252Fcoderabbit-logo-light.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253D8RnjEPbKrF2YZ_KZ%2526q%253D85%2526s%253Dc40e013627fc045a1b93c713c37b2353%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fcoderabbit%252F8RnjEPbKrF2YZ_KZ%252Fcoderabbit-logo-dark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253D8RnjEPbKrF2YZ_KZ%2526q%253D85%2526s%253Da48d7cdfd9bcb216ab70bba0f1a7879c%26primaryColor%3D%2523FF570A%26lightColor%3D%2523FF570A%26darkColor%3D%2523FF570A%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%25230e0b0b&w=1200&q=100"/>

<SiteInfo
  name="Greptile v4 + New Pricing | Greptile Blog"
  desc="Announcing Greptile Agent v4, our best code review agent yet. 74% more addressed comments and 43% comment acceptance rate."
  url="https://greptile.com/blog/greptile-v4/"
  logo="https://greptile.com/favicon.ico"
  preview="https://greptile.com/opengraph/greptile-blog.png"/>

<SiteInfo
  name="Writing a good CLAUDE.md"
  desc="`CLAUDE.md` is a high-leverage configuration point for Claude Code. Learning how to write a good `CLAUDE.md` (or `AGENTS.md`) is a key skill for agent-enabled software engineering."
  url="https://humanlayer.dev/blog/writing-a-good-claude-md/"
  logo="https://humanlayer.dev/favicon.ico?favicon.b590251f.ico"
  preview="https://humanlayer.dev/api/writing-a-good-claude-md/og"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Unblock Your AI PR Review Bottleneck: A Tech Lead’s Guide to Building a Codebase-Aware Reviewer",
  "desc": "A few months ago, I was reviewing a pull request that added three new API endpoints. The diff was clean. Tests passed. The agent that generated it had even written sensible authorisation checks. By ev",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-unblock-ai-pr-review-bottleneck-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
