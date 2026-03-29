---
lang: en-US
title: "How to Build Your Own Claude Code Skill"
description: "Article(s) > How to Build Your Own Claude Code Skill"
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
      content: "Article(s) > How to Build Your Own Claude Code Skill"
    - property: og:description
      content: "How to Build Your Own Claude Code Skill"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-claude-code-skill.html
prev: /ai/claude/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c0947834-4b11-46c6-ab61-994667e70a7e.png
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
  name="How to Build Your Own Claude Code Skill"
  desc="Every developer eventually has a workflow they repeat. A way they write commit messages. A checklist they run before opening a pull request. A structure they follow when reviewing code. They do it man"
  url="https://freecodecamp.org/news/how-to-build-your-own-claude-code-skill"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c0947834-4b11-46c6-ab61-994667e70a7e.png"/>

Every developer eventually has a workflow they repeat. A way they write commit messages. A checklist they run before opening a pull request. A structure they follow when reviewing code. They do it manually, explain it to their agents in every session, and watch the agent interpret it differently each time.

Agent skills fix this. A skill is a markdown file that loads into Claude Code's context automatically when you need it. You write the workflow once. The agent follows it every time. And because skills follow an open standard, the same file works in Claude Code, GitHub Copilot, Cursor, and Gemini CLI.

This tutorial shows you how to build a skill from scratch. You will build a commit-message-writer — a skill that reads your staged changes and generates a structured commit message following the Conventional Commits standard. By the end, you will have a working skill installed and ready to use, and you will understand the structure well enough to build any skill you need.

---

## What an Agent Skill Is

A skill is a folder containing a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file. That file has two parts: a YAML frontmatter block at the top, and a markdown body below it.

```sh title="file structure"
my-skill/
└── SKILL.md
```

The frontmatter tells the agent what the skill is called and when to use it. The body tells the agent what to do when it loads the skill. Here is the minimal structure:

```yaml
---
name: my-skill
description: What this skill does and when to use it.
---
 
# My Skill
 
Instructions for the agent go here.
```

When you invoke a skill — either explicitly with `/skill-name` or by describing what you want — the agent reads the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` body and follows the instructions inside it. The frontmatter never reaches the agent's instructions. It's metadata the skill system uses to decide whether to load the skill at all.

### How the Agent Decides to Load a Skill

This is the most important thing to understand before you write your first skill: **the agent decides whether to load your skill based entirely on the description field.**

Skills appear in Claude Code's context as a list of names and descriptions. When you make a request, the agent scans that list and loads any skill whose description matches what you're asking for. If the description is vague, the skill won't load when you need it. If the description is too narrow, it won't load for variations of the same request.

The instructions in the body only matter after the skill loads. Getting the description right is what determines whether the skill loads at all.

### What Skills Are Not

Skills are instruction files. They cannot run code on their own — but they can instruct the agent to run code using its existing tools. They are not plugins, extensions, or packages. They have no runtime. They are markdown files the agent reads, like a recipe a chef follows.

---

## How to Choose What to Build

The best skills share three properties.

1. **They encode a repeatable workflow.** If you do something differently every time, a skill won't help. If you follow the same steps every session — even if you explain them differently each time — that's a skill candidate.
2. **They have a clear trigger.** You should be able to finish the sentence "I need this skill when I want to...". If you can't finish that sentence in one clause, the workflow isn't scoped enough for a skill.
3. **They produce a consistent output format.** Skills that output in a fixed structure — a commit message, a code review, a spec — are easier to build and test than skills that produce open-ended prose.

Good candidates: commit messages, pull request descriptions, code reviews, changelog entries. Bad candidates: "help me think through this", "make this better" — too open-ended to encode in a skill.

For this tutorial, commit message generation is the right scope. The trigger is obvious (you want to commit), the workflow is defined (read staged changes, apply Conventional Commits format), and the output is structured (a commit message with a specific shape).

---

## How to Structure Your Skill

Every skill starts as a single folder with a single file:

```sh title="file structure"
commit-message-writer/
└── SKILL.md
```

As skills grow, they can include additional files the agent loads as needed:

```sh title="file structure"
commit-message-writer/
├── SKILL.md          ← always loaded when skill triggers
└── references/
    └── examples.md   ← loaded only when the agent needs examples
```

The <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` body should stay under 500 lines. If your instructions are growing beyond that, move supporting detail into a <VPIcon icon="fas fa-folder-open"/>`references/` subfolder and tell the agent when to read those files. This keeps the skill lean — the agent only loads what it needs.

For this tutorial, a single <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` is enough.

---

## How to Write the Description

The description field is the trigger condition. It determines when your skill loads and when it doesn't. Most skills fail not because the instructions are wrong, but because the description doesn't match how people actually ask for help.

Here is a weak description:

```yaml
description: Generates commit messages.
```

This will undertrigger. "Generate a commit message" will load it. "Write a commit for my changes" probably won't. "Summarize my staged diff" definitely won't — even though all three are asking for the same thing.

Here is a stronger description:

```yaml
description: Generates structured commit messages following the Conventional Commits standard. Use when you want to commit your changes and need a well-formatted message. Triggers on "write a commit message", "commit my changes", "summarize my staged diff", "what should my commit say", or any request to describe or document code changes for version control.
```

The pattern is: **what the skill does + when to use it + specific trigger phrases**. The trigger phrases cover the different ways a developer might ask for the same thing.

Two rules for descriptions:

**Be specific about the output.** "Generates commit messages" is vague. "Generates structured commit messages following the Conventional Commits standard" tells the agent and the user exactly what they'll get.

**Be slightly pushy.** The agent has a natural tendency to undertrigger skills — to handle requests itself rather than loading a skill. A description that explicitly lists trigger phrases counteracts this. You are not being redundant. You are training the trigger.

---

## How to Write the Instructions

The body of <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` is where you define what the agent does when the skill loads. Good instructions follow two principles.

**Generate first, clarify second.** The agent should produce output immediately rather than asking clarifying questions. If it needs to make assumptions, it should make them and flag them — not ask. Asking questions before producing output adds friction and loses the benefit of having a skill at all.

**Define the output format explicitly.** Don't say "write a good commit message." Say exactly what the structure is, what fields are required, what the character limits are. The more specific the output format, the more consistent the results.

Here is what weak instructions look like:

```md
# Commit Message Writer
 
Look at the staged changes and write a commit message that describes what changed.
```

That will produce different results every time — different formats, different lengths, different conventions. It's not a skill. It's a prompt.

Here is what strong instructions look like:

```md
# Commit Message Writer
 
Read the staged diff using `git diff --staged`. Generate a commit message
following the Conventional Commits standard.
 
Output format:
type(scope): short description under 72 characters
 
Body (if changes are non-trivial):
- What changed and why, not how
- One bullet per logical change
 
Footer (if applicable):
BREAKING CHANGE: description
Closes #issue-number
```

The agent knows exactly what to produce. The output will be consistent across sessions, across projects, and across agents that support the standard.

---

## How to Build the `commit-message-writer` Skill

::: tabs

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

Now build it. Create the skill directory:

```sh
mkdir -p ~/.claude/skills/commit-message-writer
```

@tab <VPIcon icon="fa-brands fa-windows"/>

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME.claude\skills\commit-message-writer"
```

**Note:** PowerShell uses backtick (`` ` ``) for line continuation, not backslash.

:::

Create the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file inside that directory. Here is the complete content:

```md
---
name: commit-message-writer
description: Generates structured commit messages following the Conventional Commits
  standard. Use when you want to commit your changes and need a well-formatted message.
  Triggers on "write a commit message", "commit my changes", "summarize my staged
  diff", "what should my commit say", or any request to describe or document staged
  changes for version control.
---
 
# commit-message-writer
 
You generate structured commit messages from staged git changes.
 
---

## How to invoke
 
Run `git diff --staged` to read the staged changes. If nothing is staged, tell the
user and suggest they run `git add` first.
 
Generate first. Do not ask clarifying questions before producing the commit message.
If you need to make assumptions about scope or type, make them and note them after
the output.
 
---

## Output format
 
~~~
type(scope): short description
 
[body — optional, include if changes are non-trivial]
 
[footer — optional]
~~~
 
**Type** — choose one:
- `feat` — a new feature
- `fix` — a bug fix
- `docs` — documentation changes only
- `refactor` — code change that neither fixes a bug nor adds a feature
- `test` — adding or updating tests
- `chore` — build process, tooling, or dependency updates
 
**Scope** — the module, file, or area affected. Use the directory name or component
name. Omit if the change spans the entire codebase.
 
**Short description** — imperative mood, under 72 characters, no period at the end.
"Add user authentication" not "Added user authentication" or "Adds user authentication."
 
**Body** — what changed and why, not how. One bullet per logical change. Skip if the
short description is self-explanatory.
 
**Footer** — include `BREAKING CHANGE:` if the commit breaks backward compatibility.
Include `Closes #N` if it resolves a GitHub issue.
 
---

## Quality rules
 
- Never use "updated", "changed", or "modified" in the short description — be specific
- Never write "various improvements" or "misc fixes" — name what improved
- If more than three files changed across unrelated concerns, flag it:
  "These changes may be better split into separate commits: [list concerns]"
- The short description must be under 72 characters — count before outputting
 
---

## Example output
 
Input: staged changes adding a rate limiter to an API endpoint
 
~~~
feat(api): add rate limiting to /query endpoint
 
- Limits requests to 100 per minute per IP using Cloudflare's rate limit binding
- Returns 429 with Retry-After header when limit is exceeded
- Adds rate limit configuration to wrangler.toml
 
Closes #47
~~~
```

Save that file. The skill is built.

---

## How to Install and Test Your Skill

### Verify the File Exists

```sh
cat ~/.claude/skills/commit-message-writer/SKILL.md
```

You should see the full <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` content. If you get an error, check the directory path.

### Test the Skill

Open Claude Code in any git repository that has staged changes. Type:

```plaintext
/commit-message-writer
```

The agent will read your staged diff and produce a commit message following the format you defined.

You can also trigger it naturally:

```plaintext
write a commit message for my staged changes
```

```plaintext
what should my commit say
```

```plaintext
summarize my diff for git
```

All three should load the skill and produce a structured commit message. If the skill doesn't trigger on natural language requests, the description needs more trigger phrases — see the improvement section below.

### Test Edge Cases

Test these cases before relying on the skill in production:

```sh
# Stage nothing, then ask for a commit message
git add -p  # stage nothing
# In Claude Code: "write a commit message"
# Expected: skill tells you nothing is staged and suggests git add
```

```sh
# Stage changes across unrelated files
git add src/api.ts src/styles.css README.md
# In Claude Code: "write a commit message"  
# Expected: skill flags that commits may be better split
```

---

## How to Improve Your Skill Over Time

The first version of any skill is a draft. You improve it by observing where it produces inconsistent or wrong output, then updating the instructions.

### When the Skill Undertriggers

If you type "summarize my changes for git" and the skill doesn't load, add that phrase to the description's trigger list:

```yaml
description: ... Triggers on "write a commit message", "commit my changes",
  "summarize my staged diff", "summarize my changes for git", ...
```

The description is your primary lever for fixing triggering problems.

### When the Output Format Drifts

If the agent starts producing commit messages that don't match your format — wrong type, missing scope, body in the wrong style — the instructions need to be more explicit. Add a concrete example that shows the failure and the correct output:

```md
---

## Common mistakes to avoid
 
Wrong: "Updated the authentication flow"
Right: "refactor(auth): simplify token validation logic"
 
Wrong: "Fixed bugs"
Right: "fix(api): handle null response from upstream service"
```

Concrete counterexamples are more effective than abstract rules.

### When the Scope Grows

If you find yourself wanting the skill to handle related tasks — reviewing commit messages, generating changelogs, writing PR descriptions — resist the urge to add everything to one skill. Build separate skills. Each skill should do one thing well. The Agent Skills standard is designed for composition, not for monolithic instructions.

---

## Where to Go Next

The commit-message-writer covers the core pattern. The same structure works for any repeatable workflow.

**Pull request descriptions** follow the same shape — read the diff, apply a structure, produce consistent output. The trigger phrases are different ("write a PR description", "summarize my branch for review") and the output format adds sections for motivation and testing, but the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` structure is identical.

**Code review checklists** work well as skills when your team has a standard review process. The trigger is "review this code" or "check this PR", and the instructions encode whatever your team actually checks — security concerns, test coverage, naming conventions.

The commit-message-writer is the simplest skill architecture — instructions only. As your skills grow more specialized, two other patterns become useful.

The first adds a `references/` directory: the voice-humanizer skill loads a CORPUS.md file containing the author's published writing, which the agent reads when it needs to check output against a specific style. The second adds quality rules and structured output formats that make results stricter and more consistent — that's the pattern spec-writer uses to surface assumptions inline. Each is the same <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` structure at a different level of complexity.

Start with instructions only. Add references when the agent needs external context. Add output format rules when consistency matters more than flexibility.

The Agent Skills standard is supported in Claude Code, GitHub Copilot in VS Code, Cursor, and Gemini CLI. A skill you build once installs across all of them. The install path differs by agent:

| Agent | Skills directory |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` or `.github/skills/` |
| Cursor | `~/.cursor/skills/` |
| Gemini CLI | `~/.gemini/skills/` |

The <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` format is the same across all of them.

The commit-message-writer you just built is a working skill. The next one will take less time. By the third, you will start seeing workflows you repeat and immediately think: that should be a skill.

That's the point.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Claude Code Skill",
  "desc": "Every developer eventually has a workflow they repeat. A way they write commit messages. A checklist they run before opening a pull request. A structure they follow when reviewing code. They do it man",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-claude-code-skill.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
