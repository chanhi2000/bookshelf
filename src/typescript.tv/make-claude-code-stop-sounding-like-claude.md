---
lang: en-US
title: "Make Claude Code Stop Sounding Claudish"
description: "Article(s) > Make Claude Code Stop Sounding Claudish"
icon: fa-brands fa-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Make Claude Code Stop Sounding Claudish"
    - property: og:description
      content: "Make Claude Code Stop Sounding Claudish"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/make-claude-code-stop-sounding-like-claude.html
prev: /ai/claude/articles/README.md
date: 2026-10-31
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
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
  name="Make Claude Code Stop Sounding Claudish"
  desc="Claude Code writes in a recognizable voice full of flourishes and filler. Here are four places to put your own writing rules so every session drops the AI tone, from a global CLAUDE.md to a SessionStart hook."
  url="https://typescript.tv/best-practices/make-claude-code-stop-sounding-like-claude"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Claude Code writes in a recognizable voice full of flourishes and filler. Here are four places to put your own writing rules so every session drops the AI tone, from a global CLAUDE.md to a SessionStart hook.

After a few weeks with [<VPIcon icon="fa-brands fa-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) I could spot its writing from across the room. Commit messages opened with "This change ensures...", pull request descriptions listed exactly three benefits, and every other sentence had an em dash in it. The code was fine. The prose around it sounded like a press release.

Stripping that house style out of a model's writing is often called **De-Flavoring**, and you can do it once instead of correcting it in every chat. Claude Code reads instructions from several places, and each one has a different reach. Here are the four I tried, ordered from the simplest to the most invasive.

---

## What "Claudish" Looks Like

Before writing rules, it helps to name the patterns you want gone. The usual suspects are em dashes used as general punctuation, openers like "Great question!", lists that always come in threes, and closing lines such as "I hope this helps". You will also see inflated wording where "use" becomes "leverage" and a small fix becomes "a robust solution".

Vague instructions like "write naturally" barely move the needle. Concrete bans work much better, so the snippets below name the exact habits to drop.

---

## Writing Density and Mannered Prose

Anthropic covers this problem in its prompting guide for Claude Fable 5.1 under the heading [<VPIcon icon="fa-brands fa-claude"/>writing density](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#writing-density). According to the guide, the model uses few stock phrases, but its prose can get dense, with longer sentences and fewer paragraph breaks. The recommended fix is to name the anti-pattern, which the guide calls **mannered prose**, and add a definition of it to a user message (preferred) or the system prompt:

> Mannered prose substitutes metaphor and flourish for direct statement. Instead of "a parameter worth varying," the mannered writer produces "a dial worth turning." Instead of "this point still matters," they write "this point earns its keep." The phrases exist to display the writer, not to convey the idea, and readers can tell. That is why mannered prose irritates: it makes the reader work harder so the writer can perform. It is also imprecise. Metaphors drag in connotations the writer did not choose and cannot control. The fix is to say what you mean. When a literal phrase is available, use it.

The guide also notes that a short version tends to work:

```md title="prompt"
Please remove all mannered prose.
```

That single line is a good starting point for De-Flavoring. The four options below are different places to put it, either on its own or next to your own rules.

---

## Option 1: A Global CLAUDE.md

Claude Code loads <VPIcon icon="fas fa-folder-open"/>`~/.claude/`<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` into every session in every project. It is a plain [<VPIcon icon="fa-brands fa-markdown"/>Markdown](https://commonmark.org/) file, which makes it the easiest place to start.

```md title="~/.claude/CLAUDE.md"
# Writing
 
- Write plainly, like a senior developer talking to a colleague.
- Do not use em dashes. Use commas, periods, or parentheses.
- No filler openers ("Great question", "Certainly") and no closers ("I hope this helps").
- Do not group things in threes by habit. Use as many items as the content needs.
- Prefer short, common words: "use" over "leverage", "fix" over "robust solution".
```

If a rule only matters for one codebase, put it in <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` at the repository root instead. That file is checked in, so your teammates get the same behavior.

The catch is that <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` arrives as context next to the conversation and does not replace the system prompt. Claude follows it well, but in long sessions the built-in defaults can slowly win back ground.

---

## Option 2: A Custom Output Style

[<VPIcon icon="fa-brands fa-claude"/>Output styles](https://docs.anthropic.com/en/docs/claude-code/output-styles) change the actual system prompt. Claude Code ships with a few built-in ones, and you can switch between them with the `/output-style` command:

```sh
/output-style concise
```

To write your own, drop a Markdown file with frontmatter into <VPIcon icon="fas fa-folder-open"/>`~/.claude/output-styles/`:

```md title="~/.claude/output-styles/plain.md"
---
name: Plain
description: Direct answers without AI-flavored prose
keep-coding-instructions: true
---
 
Write like a human maintainer. Lead with the result. No em dashes, no filler openers or closers, no reflexive lists of three.
```

The highlighted `keep-coding-instructions` line matters. Without it, your style replaces the software engineering parts of the default prompt as well, and Claude Code gets noticeably worse at coding.

When I ran `/output-style concise`, the choice ended up as `"outputStyle": "Concise"` in the project's <VPIcon icon="fas fa-folder-open"/>`.claude/settings.local.json`. To make a style apply everywhere, set it in your user settings instead:

```json title="~/.claude/settings.json"
{
  "outputStyle": "Plain"
}
```

---

## Option 3: A CLI Flag Behind a Shell Alias

The `claude` command accepts `--append-system-prompt`, which adds text to the end of the default system prompt. Keep your rules in a file and wrap the command in an alias so you never have to type the flag:

```sh title="~/.zshrc"
alias claude='claude --append-system-prompt "$(cat ~/.claude/system.md)"'
```

There is also `--system-prompt`, which replaces the default prompt completely. Avoid it unless that is really what you want, because it throws away the built-in instructions for tools, git, and safety along with the tone.

The alias only applies when you start Claude Code from your own shell. IDE integrations and scripts that call the binary directly will skip it.

---

## Option 4: A SessionStart Hook

[<VPIcon icon="fa-brands fa-claude"/>Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) run shell commands at fixed points in a session. For a `SessionStart` hook, whatever the command prints to stdout gets added to Claude's context when a session starts, resumes, or is cleared:

```json title="~/.claude/settings.json"
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Write plainly. No mannered prose: no flourishes, filler, em dashes, rule-of-three, or ornamental phrasing.\""
          }
        ]
      }
    ]
  }
}
```

I like this option because it also fires after `/clear`, so the rule comes back fresh in the middle of a long day. Because the hook is just a command, you could also `cat` a file or print different rules depending on the current directory.

---

## Which One Should You Use?

Start with <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md`. It is a plain file you can version, share with your team, and edit without restarting anything, and for most people it is enough.

If Claude keeps slipping back into its old voice, add a custom output style with `keep-coding-instructions: true`, since that changes the system prompt itself. The SessionStart hook is a good companion for short, high-priority rules that should come back after every `/clear`. I would keep the shell alias as a last resort because it does not reach IDE sessions.

I ended up combining the global <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` for detailed writing rules with a one-line SessionStart hook as a reminder. Together they took care of most of the em dashes in my commit messages.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Make Claude Code Stop Sounding Claudish",
  "desc": "Claude Code writes in a recognizable voice full of flourishes and filler. Here are four places to put your own writing rules so every session drops the AI tone, from a global CLAUDE.md to a SessionStart hook.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/make-claude-code-stop-sounding-like-claude.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
