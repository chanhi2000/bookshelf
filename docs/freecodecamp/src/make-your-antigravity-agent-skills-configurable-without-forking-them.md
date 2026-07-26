---
lang: en-US
title: "How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)"
description: "Article(s) > How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)"
icon: iconfont icon-antigravity
category:
  - Python
  - AI
  - LLM
  - Google
  - Google Antigravity
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - antigravity
  - google-antigravity
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)"
    - property: og:description
      content: "How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/make-your-antigravity-agent-skills-configurable-without-forking-them.html
prev: /ai/antigravity/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Obum
    url: https://freecodecamp.org/news/author/obumnwabude/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/7edaf407-ce56-4eff-8b1c-5e1c31e71067.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Antigravity > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/antigravity/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)"
  desc="Antigravity Agent Skills are a great way to teach your AI agent a workflow once and reuse it everywhere. You write a short SKILL.md file, drop it in a folder, and the agent picks it up whenever it's r"
  url="https://freecodecamp.org/news/make-your-antigravity-agent-skills-configurable-without-forking-them"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/7edaf407-ce56-4eff-8b1c-5e1c31e71067.png"/>

Antigravity Agent Skills are a great way to teach your AI agent a workflow once and reuse it everywhere. You write a short <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file, drop it in a folder, and the agent picks it up whenever it's relevant.

But these skills have a hidden limitation: they're static. If you download a skill someone else wrote and you want it to behave a little differently, you'll have to copy the whole thing and edit it by hand. And as you may have noticed lately, there are many "skills" forks floating around that are difficult to maintain.

In this tutorial, I'll show you I built a small convention that fixes this. It lets any Agent Skill read a per-project config file, so you can adopt any skill and customize how it behaves by editing a few lines of YAML (without ever touching the skill itself).

You'll build it step by step, test it, and see how to share it so other people can plug into it.

::: info What You Will Build

You will build a tiny, reusable layer called **Configurable Agent Skills**. It has three parts:

1. A small Python script, <VPIcon icon="fa-brands fa-python"/>`resolve_config.py`, that merges a skill's default settings with your project settings and prints the result.
2. A convention: each skill ships 2 files, a <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml` file with its "knobs" and a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file. They both guide the agent's behavior.
3. A per-project file, <VPIcon icon="fas fa-folder-open"/>`.agent/`<VPIcon icon="iconfont icon-yaml"/>`skills.config.yaml`, where anyone using your skill sets their own values.

By the end, you'll have a working `git-commit-formatter` skill that one team can run in Conventional Commits mode and another team can switch to gitmoji mode, all using the exact same skill files with no forking.

:::

::: note Prerequisites

To follow along, you'll need:

- Google Antigravity installed (the IDE, CLI, or SDK. Any of them work, since skills are just files.).
- Python 3 installed, with PyYAML. You can install PyYAML with `python -m pip install pyyaml`.
- Basic comfort with the terminal and YAML. You don't need to be an expert in either.

If you've never written an Agent Skill before, the next two sections will bring you up to speed.

:::

---

## What Are Antigravity Agent Skills?

A Skill in Antigravity is a folder that contains a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file and, optionally, some scripts, templates, or examples. The <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file has a short block of YAML "frontmatter" at the top (a `name` and a `description`), followed by a set of instructions written in plain Markdown.

Here's the important part: skills are loaded on demand. The agent reads only the short `description` of each skill at first. When your request matches that description, the agent pulls in the full instructions and follows them. This keeps the agent's context small and focused.

A minimal skill that enforces Conventional Commits looks like this:

```md title=".agent/SKILL.md"
---
name: git-commit-formatter
description: Formats git commit messages using the Conventional Commits specification. Use this when the user asks to commit changes or write a commit message.
---

# Git Commit Formatter

When writing a commit message, follow the Conventional Commits format:
`type(scope): description`

Allowed types: feat, fix, docs, style, refactor, perf, test, chore.
```

Drop that in your skills folder, ask the agent to "commit these changes," and it will write a properly formatted message. Simple and useful, right?

---

## Why Static Skills Are a Problem

Now look closely at that skill. The allowed types (`feat`, `fix`, `docs`, and so on) are baked directly into the instructions.

That's fine until someone wants something slightly different. Maybe your team also uses a `ci` type. Maybe you prefer gitmoji, where each commit starts with an emoji. Maybe you want to require a scope on every commit.

With a static skill, there's only one way to get any of that: copy the whole skill and edit the Markdown. When you do this across a team, everyone ends up with their own private fork. When the original author ships an improvement, none of the forks get it. The skill stops being something you *share* and becomes something everyone *rewrites*.

The core issue is that there's no clean line between the skill's logic (which everyone should share) and its settings (which each project wants to control). How do we solve this?

---

## The Configurable Skills Solution

The idea is simple. Instead of hard-coding settings in the instructions, the skill will:

1. Ship its settings and their defaults in a separate <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml` file.
2. Read a merged config (defaults plus any project-level overrides) before it acts.

The project-level overrides live in a file called <VPIcon icon="fas fa-folder-open"/>`.agent/`<VPIcon icon="iconfont icon-yaml"/>`skills.config.yaml`, which sits at the root of the user's project:

```yaml title=".agent/skills.config.yaml"
# (edit this file in your project instead of the skill globally)
git-commit-formatter:
  style: gitmoji
  extra_types: [ci, build]
  scope_required: true
```

That's the easy flow. Drop the skill in, set a few keys, and you're done. The skill's own files never change.

To make this work, you need a script that reads both files, merges them, and hands the result to the agent. Let's build it.

---

## How to Build the Config Loader

Create a file called <VPIcon icon="fa-brands fa-python"/>`resolve_config.py`. Its job is to take a skill's name, load that skill's <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml`, find the user's <VPIcon icon="fas fa-folder-open"/>`.agent/`<VPIcon icon="iconfont icon-yaml"/>`skills.config.yaml`, and merge the two so that user values win.

Start with a deep-merge helper. This is the heart of the loader:

```py title="resolve_config.py"
def deep_merge(base, override):
    """Recursively merge override onto base.

    Dicts merge key by key. Anything else (scalars, lists) is replaced
    wholesale by the override value.
    """
    if isinstance(base, dict) and isinstance(override, dict):
        merged = dict(base)
        for key, value in override.items():
            merged[key] = deep_merge(merged[key], value) if key in merged else value
        return merged
    return override
```

Notice the deliberate choice here: dictionaries merge key by key, but lists are replaced, not appended. That keeps the behavior predictable. If you want to handle "defaults plus extras", use the explicit `extra_types` key in the skill as you'll see in the example below.

Next, you need to find your "per-project" config. The loader walks up from the current directory looking for an <VPIcon icon="fas fa-folder-open"/>`.agent/`<VPIcon icon="iconfont icon-yaml"/>`skills.config.yaml` file:

```py title="resolve_config.py"
from pathlib import Path

def find_project_config(start: Path):
    """Walk upward from start looking for .agent/skills.config.yaml."""
    start = start.resolve()
    for folder in [start, *start.parents]:
        candidate = folder / ".agent" / "skills.config.yaml"
        if candidate.is_file():
            return candidate
    return None
```

Now put it together. The loader locates the skill's defaults (which sit next to the script), loads your overrides for that skill's name, merges them, and prints the result:

```py title="resolve_config.py"
import sys, yaml
from pathlib import Path

def resolve(skill_name, skill_dir, project_root):
    defaults = yaml.safe_load((Path(skill_dir) / "config.default.yaml").read_text()) or {}

    user_path = find_project_config(Path(project_root))
    user_all = yaml.safe_load(user_path.read_text()) if user_path else {}
    user_cfg = (user_all or {}).get(skill_name, {}) or {}

    return deep_merge(defaults, user_cfg)
```

That completes the whole idea. The full version in the sample repo adds a command-line interface, JSON output, and clear error messages, but the logic above is all you really need.

![Terminal output showing the resolved configuration for the git-commit-formatter skill.](https://cdn.hashnode.com/uploads/covers/5f92a5e56aa1ed54804bb866/ca8d7095-21f6-4433-8c82-b6b0ca34b9ef.png)

---

## How to Make a Skill Configurable

Now you'll convert the static commit skill into a configurable one. This takes two files.

First, create <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml` next to the skill. It lists every setting and a safe default, so the skill works even when the user has no config at all:

```yaml title="config.default.yaml"
# Default configuration for the git-commit-formatter skill.
style: conventional          # conventional | gitmoji
types:                       # base set of allowed commit types
  - feat
  - fix
  - docs
  - style
  - refactor
  - perf
  - test
  - chore
extra_types: []              # additional types, merged on top of `types`
scope_required: false        # if true, require a scope: type(scope): ...
max_subject_length: 72       # hard cap on the subject line
```

Second, update <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` so that its very first instruction is to resolve the config and apply it. This is the key move: you're telling the agent to read the settings before it does anything else:

````md :collapsed-lines title="SKILL.md"
---
name: git-commit-formatter
description: Formats git commit messages to a team's chosen convention (Conventional Commits or gitmoji). Use this when the user asks to commit changes or write a commit message. Reads per-project settings so teams customize commit style without editing this skill.
---

# Git Commit Formatter (Configurable)

---

## Step 1 - Resolve configuration (always do this first)

Run the loader and read its output:

```sh
python scripts/resolve_config.py git-commit-formatter --project-root .
```

Apply exactly those settings:

- `style`: `conventional` or `gitmoji`.
- `types` + `extra_types`: the full set of allowed commit types.
- `scope_required`: if true, a scope is mandatory.
- `max_subject_length`: hard cap on the subject line.

---

## Step 2 - Compose the message

Pick the primary type from `types` + `extra_types`, build the subject in the
chosen `style`, and enforce `scope_required` and `max_subject_length`.
````

This pattern ("make the agent run a script and obey its output") is the same one Antigravity's own validation skills use. It keeps the behavior deterministic instead of leaving it to the model's memory.

Notice how `extra_types` solves the additive-list question. The default list stays put, and the user's extras are simply added on top by the skill. No fork is required to add a `ci` type.

---

## How to Add Project Overrides

Let's say you want gitmoji commits with two extra types. Create a single file in your project:

```yaml title=".agent/skills.config.yaml"
git-commit-formatter:
  style: gitmoji
  extra_types: [ci, build]
  scope_required: true
```

You just changed three lines of config and didn't open the skill or fork any code. The next time the agent commits, it will use this project settings.

And a different project, with no config file at all, keeps getting the sensible Conventional Commits defaults. You have one skill with many behaviors.

![The agent proposing a commit message that starts with an emoji, driven by the project config."](https://cdn.hashnode.com/uploads/covers/5f92a5e56aa1ed54804bb866/c9cb7c61-4a6f-4963-94ed-321bb20bde30.png)

---

## How to Test Your Configurable Skill

You don't need the agent to check that the merge works. Run the loader directly and read the output.

With no overrides, you get the defaults:

```sh
python scripts/resolve_config.py git-commit-formatter --project-root .
#
# style: conventional
# scope_required: false
# ...
```

Now add the <VPIcon icon="fas fa-folder-open"/>`.agent/skills.config.yaml` override from the last section and run it again:

```sh
python scripts/resolve_config.py git-commit-formatter --project-root . --print-sources
#
# style: gitmoji
# scope_required: true
# extra_types:
# - ci
# - build
# types:
# - feat
# - fix
# - docs
# ...
```

The `style` flipped to `gitmoji`, `scope_required` became `true`, and your extra types appeared (while the base `types` list stayed intact). That confirms the merge does exactly what you want.

It's worth writing a small automated test too, so a future change to the loader can't silently break the merge. A test can create a fake skill and a fake project config in a temp folder, run the loader, and assert that user values override defaults while untouched defaults survive.

---

## Two More Example Skills

The same pattern works for any skill. Here are two more to show the range.

### A Changelog Generator

Its <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml` exposes the output `format` (like Keep a Changelog), which commit `types` to include, and whether to link commit hashes to a repo URL. One project can generate a formal changelog grouped by type, while another can generate a simple bulleted list. It's the same skill with a different config.

```yaml title="config.default.yaml"
# changelog-generator config.default.yaml (excerpt)
format: keepachangelog       # keepachangelog | conventional | simple
include_types: [feat, fix, perf]
include_authors: false
repo_url: ""                 # if set, hashes link to commits
```

### A License-Header Adder

Its config exposes the `license` (Apache-2.0, MIT, or custom), the `holder`, and a map of file extensions to comment styles. A company sets the holder once in their project config, and every new file gets the right header in the right comment style, without editing the skill.

```yaml title="config.default.yaml"
# license-header-adder config.default.yaml (excerpt)
license: apache-2.0          # apache-2.0 | mit | custom
holder: "Your Name or Org"
year: auto                   # auto = current year
```

The lesson is that almost any skill has a few decisions baked into it. When you pull those decisions into a <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml`, you convert a one-off skill into a tool that anyone can reuse and tune.

---

## How to Share Your Agent Skills With Others

Once your agent skills follow the convention, they compose into something bigger. To make your agent skills easy for others to adopt, you have to:

- **Keep each skill self-contained:** Vendor a copy of <VPIcon icon="fa-brands fa-python"/>`resolve_config.py` inside each skill's <VPIcon icon="fas fa-folder-open"/>`scripts/` folder, so someone can copy a single skill folder anywhere and it just works.
- **Document every config key** in the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md`, so users know exactly what they can tune.
- **Publish a small index:** A simple <VPIcon icon="iconfont icon-json"/>`index.json` that lists each skill's name, path, and config keys makes it easy for others to discover what you've built and contribute their own.

Because the convention is just "read a config file first," anyone can publish a compatible skill. Each new configurable skill makes the whole ecosystem more useful. In addition to shipping a skill, you're shipping a small standard that other people can build on.

---

## Wrapping Up

You started with a static skill whose behavior was frozen in Markdown, and you turned it into a configurable one that anyone can tune from a single project file.

The entire setup is relatively small. It has the merge function, one convention, and a <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml` per skill.

It also changes how skills are shared. Instead of forking a skill to change one setting, you can keep the shared logic and adjust your own config. Improvements to the skill flow to everyone, and everyone still gets the behavior they want.

If you want to try it, build the `git-commit-formatter` skill from this tutorial, drop it into your Antigravity skills folder, and add an <VPIcon icon="fas fa-folder-open"/>`.agent/`<VPIcon icon="iconfont icon-yaml"/>`skills.config.yaml` to a project. Then flip `style` from `conventional` to `gitmoji` and watch the same skill behave differently.

From there, make one of your own skills configurable. Find the settings you baked into the instructions, move them into a <VPIcon icon="iconfont icon-yaml"/>`config.default.yaml`, and let your users take it from there.

::: info

The full sample code (the loader, its tests, and all three example skills) is on GitHub at [<VPIcon icon="iconfont icon-github"/>`keepdeploying/configurable-agent-skills`](https://github.com/keepdeploying/configurable-agent-skills).

:::

Thanks for reading. If you build a configurable skill of your own, share it. Let's keep the ecosystem growing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Make Your Antigravity Agent Skills Configurable (Without Forking Them)",
  "desc": "Antigravity Agent Skills are a great way to teach your AI agent a workflow once and reuse it everywhere. You write a short SKILL.md file, drop it in a folder, and the agent picks it up whenever it's r",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/make-your-antigravity-agent-skills-configurable-without-forking-them.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
