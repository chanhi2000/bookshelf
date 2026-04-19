---
lang: en-US
title: "How to Keep Human Experts Visible in Your AI-Assisted Codebase"
description: "Article(s) > How to Keep Human Experts Visible in Your AI-Assisted Codebase"
icon: iconfont icon-claude
category:
  - Python
  - AI
  - LLM
  - Anthropic
  - Claude
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
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Keep Human Experts Visible in Your AI-Assisted Codebase"
    - property: og:description
      content: "How to Keep Human Experts Visible in Your AI-Assisted Codebase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-keep-human-experts-visible-in-your-ai-assisted-codebase.html
prev: /ai/claude/articles/README.md
date: 2026-04-14
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/21d160a8-af66-4048-9fda-1d83b2e26148.png
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
  name="How to Keep Human Experts Visible in Your AI-Assisted Codebase"
  desc="Six months ago, Stack Overflow processed 108,563 questions in a single month. By December 2025, that number had fallen to 3,862. A 78% collapse in two years. The explanation everyone reaches for is th"
  url="https://freecodecamp.org/news/how-to-keep-human-experts-visible-in-your-ai-assisted-codebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/21d160a8-af66-4048-9fda-1d83b2e26148.png"/>

Six months ago, Stack Overflow processed 108,563 questions in a single month. By December 2025, that number had fallen to 3,862. A 78% collapse in two years.

The explanation everyone reaches for is that AI replaced it. That's partly true. But it misses the structural problem underneath: every time a developer asks Claude or ChatGPT to write code, the knowledge that shaped the answer disappears.

The GitHub discussion where someone spent two hours documenting why cursor-based pagination beats offset for live-updating datasets. The Stack Overflow answer from 2019 where one engineer, after a week of debugging, documented exactly why that approach fails under concurrent writes.

The AI consumed all of it. The humans who produced it got nothing — no citation in the codebase, no signal that their work mattered.

Over time, those people stopped contributing. Stack Overflow isn't dying because it's bad. It's dying because AI extracted its value and the feedback loop that kept humans contributing broke down.

This tutorial builds a tool that puts that loop back together. **proof-of-contribution** is a Claude Code skill that links every AI-generated artifact back to the human knowledge that inspired it — and surfaces exactly where the AI made choices with no human source at all.

I'll show you how to install proof-of-contribution, how to record your first provenance entry, how to use the spec-writer integration that makes Knowledge Gaps deterministic, and how to run `poc.py verify` — a static analyser that detects gaps without a single API call.

::: info What You Will Build

proof-of-contribution is a Claude Code skill with a local CLI. Together they give you:

- **Provenance Blocks**: Claude appends a structured attribution block to every generated artifact, listing the human sources that inspired it and flagging what it synthesized without any traceable source.
- **Knowledge Gaps**: the parts of AI-generated code that have no human citation, surfaced before they become production incidents
- `poc.py trace`: a CLI command that shows the full human attribution chain for any file in thirty seconds
- `poc.py import-spec`: bridges proof-of-contribution with spec-writer, seeding knowledge gaps from your spec's assumptions list before the agent builds anything
- `poc.py verify`: a static analyser that cross-checks your file's structure against seeded claims using Python's AST. Zero API calls. Exit code 0 means clean, exit code 1 means gaps found — wires directly into CI
- **A GitHub Action**: optional PR enforcement that fails PRs missing attribution, for teams that want a standard

The complete source is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/proof-of-contribution`](https://github.com/dannwaneri/proof-of-contribution).

:::

::: note Prerequisites

This is a beginner-to-intermediate tutorial. You should be comfortable with:

- **Command line basics**: navigating directories, running scripts
- **Git**: basic commits and PRs
- **Python 3.8 or higher**: the CLI is pure Python with no dependencies

You will need:

- **Python installed**: check with `python --version` or `python3 --version`
- **Git installed**: check with `git --version`
- **Claude Code** (or any agent that supports the Agent Skills standard — Cursor and Gemini CLI also work)

There's no database to install. No API keys. No paid services. The default storage is SQLite, which Python includes out of the box.

:::

---

## Quickstart in 5 Minutes

If you want to try the tool before reading the full tutorial, here are the five commands that take you from zero to your first gap detection:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
# 1. Install
mkdir -p ~/.claude/skills
git clone https://github.com/dannwaneri/proof-of-contribution.git \
  ~/.claude/skills/proof-of-contribution

# 2. Scaffold your project (run in your repo root)
python ~/.claude/skills/proof-of-contribution/assets/scripts/poc_init.py

# 3. Record attribution for an AI-generated file
python poc.py add src/utils/parser.py

# 4. Detect gaps via static analysis
python poc.py verify src/utils/parser.py

# 5. See the full provenance chain
python poc.py trace src/utils/parser.py
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
# 1. Install
New-Item -ItemType Directory -Force -Path "$HOME.claude\skills"
git clone https://github.com/dannwaneri/proof-of-contribution.git `
  "$HOME.claude\skills\proof-of-contribution"

# 2. Scaffold your project
python "$HOME.claude\skills\proof-of-contribution\assets\scripts\poc_init.py"

# 3. Record attribution
python poc.py add src\utils\parser.py

# 4. Detect gaps
python poc.py verify src\utils\parser.py

# 5. See the full provenance chain
python poc.py trace src\utils\parser.py
```

:::

That's the whole tool. The sections below walk through each step in detail with real terminal output at every stage.

---

## How the Tool Works

Before you install anything, you need a clear mental model of what proof-of-contribution actually does — because the most important part isn't obvious.

### The Archaeology Problem

Here's a scenario that happens on every team using AI-assisted development.

A developer joins. They go through six months of AI-generated codebase. They hit a bug in the pagination logic — cursor-based, unusual implementation, nobody remembers why it was built that way. The original developer has left.

Old answer: two days of archaeology. `git blame` points to a commit message that says "fix pagination." The commit before that says "implement pagination." Dead end.

With `poc.py trace src/utils/paginator.py`, that same developer sees this in thirty seconds:

```plaintext
Provenance trace: src/utils/paginator.py
────────────────────────────────────────────────────────────
  [HIGH]  @tannerlinsley on github
          Cursor pagination discussion
          https://github.com/TanStack/query/discussions/123
          Insight: cursor beats offset for live-updating datasets

Knowledge gaps (AI-synthesized, no human source):
  • Error retry strategy — no human source cited
  • Concurrent write handling — AI chose this arbitrarily
```

They now know where the pattern came from and — critically — which parts have no traceable human source. The concurrent write handling is where the bug lives. The AI made a choice nobody reviewed.

That's what this tool does. Not enforcement first. Archaeology first.

### How Knowledge Gaps Are Detected

The obvious assumption is that Claude introspects and reports what it doesn't know. That assumption is wrong. LLMs hallucinate confidently. An AI that could reliably detect its own knowledge gaps wouldn't produce them.

The detection mechanism is a comparison, not introspection.

When you use [<VPIcon icon="iconfont icon-github"/>`dannwaneri/spec-writer`](https://github.com/dannwaneri/spec-writer) before building, it generates a spec with an explicit `## Assumptions to review` section — every decision the AI is making that you didn't specify, each one impact-rated. That list is the contract.

When you run `poc.py import-spec spec.md --artifact src/utils/paginator.py`, those assumptions get seeded into the database as unresolved knowledge gaps. After the agent builds, `poc.py trace` shows which assumptions made it into code with no human source ever cited.

The AI isn't grading its own exam. The spec is the answer key.

`poc.py verify` takes this further. After the agent builds, it parses the file's actual structure using Python's built-in `ast` module — extracting every function definition, conditional branch, and return path. It cross-checks each one against the seeded claims. Any structural unit with no resolved claim surfaces as a deterministic Knowledge Gap, regardless of how confident the model was when it wrote the code.

---

## How to Install proof-of-contribution

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
mkdir -p ~/.claude/skills
git clone https://github.com/dannwaneri/proof-of-contribution.git \
  ~/.claude/skills/proof-of-contribution
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
New-Item -ItemType Directory -Force -Path "$HOME.claude\skills"
git clone https://github.com/dannwaneri/proof-of-contribution.git `
  "$HOME.claude\skills\proof-of-contribution"
```

:::

That's the entire installation. No package to install, no configuration file to edit. The skill is a markdown file the agent reads. The CLI is a Python script that runs locally.

### Verify the Install

```sh
ls ~/.claude/skills/proof-of-contribution/
```

You should see <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md`, <VPIcon icon="fa-brands fa-python"/>`poc.py`, <VPIcon icon="fas fa-folder-open"/>`assets/`, and <VPIcon icon="fas fa-folder-open"/>`references/`. If the directory is empty, the clone failed — check your internet connection and try again.

---

## How to Scaffold Your Project

The scaffold script creates the database, config, CLI, and GitHub integration in your project root. Run it once per project.

::: tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
cd /path/to/your/project
python ~/.claude/skills/proof-of-contribution/assets/scripts/poc_init.py
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
cd C:\path\to\your\project
python "$HOME.claude\skills\proof-of-contribution\assets\scripts\poc_init.py"
```

:::

You should see output like this:

```plaintext
🔗 Proof of Contribution — init

  →  Project root: /path/to/your/project
  ✔  Created .poc/config.json
  ✔  Created .poc/.gitignore  (db excluded from git, config tracked)
  ✔  Created .poc/provenance.db  (SQLite — no extra infra needed)
  ✔  Created .github/PULL_REQUEST_TEMPLATE.md
  ✔  Created .github/workflows/poc-check.yml
  ✔  Created poc.py  (local CLI — includes import-spec command)
  ✔  Created .gitignore

✔ Proof of Contribution initialised for 'your-project'
```

This creates four things in your project:

```sh title="file structure"
your-project/
├── .poc/
│   ├── config.json      # project settings (commit this)
│   ├── provenance.db    # SQLite database (local only, gitignored)
│   └── .gitignore
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── poc-check.yml
└── poc.py               # your local CLI
```

- `.poc/` — the tool's local data directory. `config.json` stores project settings and is committed to git. `provenance.db` is the SQLite database where attribution records and knowledge gaps are stored — local only, gitignored.
- `poc.py` — your local CLI, copied into the project root. Run `python poc.py trace`, `python poc.py verify`, and every other command directly without a global install.
- `.github/PULL_REQUEST_TEMPLATE.md` — a PR template with the `## 🤖 AI Provenance` section pre-filled. Developers fill it in when submitting PRs that contain AI-generated code.
- `.github/workflows/poc-check.yml` — the optional GitHub Action for PR enforcement. Installed but dormant until you push the workflow file and enable it in your repo settings.

::: note Windows note

if the scaffold fails with a `UnicodeEncodeError`, the emoji in the PR template is hitting a Windows encoding limit. Open `assets/scripts/poc_init.py` in a text editor and find every line ending with `.write_text(...)`. Change each one to `.write_text(..., encoding="utf-8")`. Save and re-run.

:::

### Verify the Scaffold Worked

```sh
python poc.py report
#
# Proof of Contribution Report
# ────────────────────────────────────────
#   Artifacts tracked    : 0
#   With provenance      : 0  (0%)
#   Unresolved gaps      : 0
#   Resolved claims      : 0
#   Human experts        : 0
```

Empty database, clean state. You're ready.

---

## How to Record Your First Provenance Entry

Before we dive in here, I just want to clear something up. Earlier, I described `poc.py verify` as detecting Knowledge Gaps automatically — and it does. But the static analyser can only tell you *that* a function has no human citation. It can't tell you *which* human source inspired it. That knowledge lives in your head, not in the code.

`poc.py add` is where you supply that context. After the agent builds a file, you record the human sources you actually drew on: the GitHub discussion you read before prompting, the Stack Overflow answer that shaped the approach. Those records become the attribution chain `poc.py trace` surfaces — and what closes the gaps `poc.py verify` flags.

`verify` finds the gaps. `add` fills them.

`poc.py add` records attribution for a file interactively. You can run it on any AI-generated file in your project.

You'll see a prompt:

```sh
python poc.py add src/utils/parser.py
#
# Recording provenance for: src/utils/parser.py
# (Press Ctrl+C to cancel)
# 
#   Human source URL (or Enter to finish):
```

Enter the URL of the human-authored source that inspired the code. This could be a GitHub discussion, a Stack Overflow answer, a documentation page, a blog post, or an RFC.

```plaintext
  Human source URL (or Enter to finish): https://github.com/TanStack/query/discussions/123
  Author handle: tannerlinsley
  Platform (github/stackoverflow/docs/other): github
  Source title: Cursor pagination discussion
  What specific insight came from this? cursor beats offset for live-updating datasets
  Confidence HIGH/MEDIUM/LOW [MEDIUM]: HIGH
  ✔ Recorded.
```

Add as many sources as apply. Press Enter on a blank URL when you're done.

```plaintext
  Human source URL (or Enter to finish): 
✔ Provenance saved. Run: python poc.py trace src/utils/parser.py
```

### Check What You Recorded

```sh
python poc.py trace src/utils/parser.py
#
# Provenance trace: src/utils/parser.py
# ────────────────────────────────────────────────────────────
#   [HIGH]  @tannerlinsley on github
#           Cursor pagination discussion
#           https://github.com/TanStack/query/discussions/123
#           Insight: cursor beats offset for live-updating datasets
```

No knowledge gaps — because you recorded a source. If the file had parts with no human source, they would appear below as gaps.

### See All Experts in Your Graph

Every `poc.py add` call stores not just the URL but the author — their handle, platform, and the specific insight they contributed. Run it across enough files, and those authors accumulate into a **knowledge graph**: a local record of which human experts your codebase drew from, which files their knowledge shaped, and how many artifacts trace back to their work.

`poc.py experts` surfaces the top contributors. On a new project, it'll be one or two entries. On a mature codebase, it becomes a map of whose knowledge is load-bearing — the people you'd want to consult if that part of the code ever needed to change.

```sh
python poc.py experts
#
# Top Human Experts in Knowledge Graph
# ──────────────────────────────────────────────────────
#   @tannerlinsley            github          1 artifact(s)
```

---

## How to Use import-spec to Seed Knowledge Gaps

This is the most important command in the tool. It connects proof-of-contribution with spec-writer and makes Knowledge Gaps deterministic.

When you use spec-writer before building a feature, it generates an `## Assumptions to review` section — every implicit decision is impact-rated HIGH, MEDIUM, or LOW. The `import-spec` command reads that section and seeds those assumptions into the database as unresolved gaps before the agent writes a line of code.

After the agent builds, any assumption that made it into the implementation without a cited human source surfaces automatically in `poc.py trace`. You don't need to know which parts of the code are uncertain. The spec already told you.

### Step 1 — Create a Test Spec

If you don't have a spec-writer output yet, create one manually to see how the import works.

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
cat > test-spec.md << 'EOF'
---

## Assumptions to review

1. SQLite is sufficient for single-developer use — Impact: HIGH
   Correct this if: you need team-shared provenance

2. Filepath is the artifact identifier — Impact: MEDIUM
   Correct this if: you use content hashing instead

3. REST pattern for any future API — Impact: LOW
   Correct this if: you prefer GraphQL
EOF
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
python -c "
content = '''## Assumptions to review

1. SQLite is sufficient for single-developer use - Impact: HIGH
   Correct this if: you need team-shared provenance

2. Filepath is the artifact identifier - Impact: MEDIUM
   Correct this if: you use content hashing instead

3. REST pattern for any future API - Impact: LOW
   Correct this if: you prefer GraphQL'''
open('test-spec.md', 'w', encoding='utf-8').write(content)
print('test-spec.md created')
"
```

:::

::: note Windows note

don't use PowerShell's `echo` to create spec files. PowerShell saves files as UTF-16, which causes a `UnicodeDecodeError` when `import-spec` reads them. The `python -c` approach above writes UTF-8 correctly.

:::

### Step 2 — Import the Assumptions

```sh
python poc.py import-spec test-spec.md --artifact src/utils/parser.py
#
# Spec assumptions imported — 3 Knowledge Gap(s) seeded
# ───────────────────────────────────────────────────────
#   1. [HIGH] SQLite is sufficient for single-developer use
#        Correct if: you need team-shared provenance
#   2. [MEDIUM] Filepath is the artifact identifier
#        Correct if: you use content hashing instead
#   3. [LOW] REST pattern for any future API
#        Correct if: you prefer GraphQL
# 
#   →  Bound to: src/utils/parser.py
#   After the agent builds, run:
#   python poc.py trace src/utils/parser.py
#   python poc.py add src/utils/parser.py
```

### Step 3 — Trace the Gaps

```sh
python poc.py trace src/utils/parser.py
#
# Knowledge gaps (AI-synthesized, no human source):
#   • REST pattern for any future API [Correct if: you prefer GraphQL]
#   • SQLite is sufficient for single-developer use [Correct if: you need team-shared provenance]
#   • Filepath is the artifact identifier [Correct if: you use content hashing instead]
# 
#   Resolve gaps: python poc.py add src/utils/parser.py
```

Three gaps, colour-coded by urgency. The HIGH-impact assumption — SQLite for single-developer use — appears in red. The LOW-impact one appears in green. When you run `poc.py add` and record a human source with an insight that overlaps the gap text, the gap auto-closes.

### Preview Without Writing

```sh
python poc.py import-spec test-spec.md --dry-run
```

This parses the spec and prints what would be seeded without touching the database. This is useful before committing to an import.

### Check the Overall Health

```sh
python poc.py report
#
# Proof of Contribution Report
# ────────────────────────────────────────
#   Artifacts tracked    : 1
#   With provenance      : 0  (0%)
#   Unresolved gaps      : 3
#   Resolved claims      : 0
#   Human experts        : 1
#   ⚠ Less than 50% of artifacts have provenance records.
#   ⚠ 3 unresolved Knowledge Gap(s).
#     Run `poc.py trace <filepath>` to locate them.
```

---

## How to Trace Human Attribution

`poc.py trace` is the command you'll use most. It shows the full human attribution chain for any file and lists any knowledge gaps — parts of the code with no traceable human source.

A file with both attribution and gaps looks like this:

```sh
python poc.py trace src/utils/parser.py
#
# Provenance trace: src/utils/parser.py
# ────────────────────────────────────────────────────────────
#   [HIGH]  @juliandeangelis on github
#           Spec Driven Development methodology
#           https://github.com/dannwaneri/spec-writer
#           Insight: separate functional from technical spec
# 
#   [MEDIUM] @tannerlinsley on github
#            Cursor pagination discussion
#            https://github.com/TanStack/query/discussions/123
#            Insight: cursor beats offset for live-updating datasets
# 
# Knowledge gaps (AI-synthesized, no human source):
#   • Error retry strategy — no human source cited
#   • CSV column ordering — AI chose this arbitrarily
# 
#   Resolve gaps: python poc.py add src/utils/parser.py
```

The human attribution section shows every cited source, colour-coded by confidence. The knowledge gaps section shows every assumption that shipped without a human citation — either seeded from a spec via `import-spec`, or flagged by Claude in the Provenance Block.

### Resolving Gaps

Run `poc.py add` on any file with open gaps:

```sh
python poc.py add src/utils/parser.py
```

When you enter an insight that shares words with an open gap claim, the gap auto-closes. Run `poc.py trace` again to confirm it's resolved.

---

## How to Verify with Static Analysis

`poc.py verify` is the command that closes the epistemic trust gap completely. It detects Knowledge Gaps by analysing the file's actual code structure — not by asking the AI what it doesn't know.

Run it after the agent builds, once you've seeded gaps with `import-spec`:

```sh
python poc.py verify src/utils/parser.py
#
# Verify: src/utils/parser.py
# ────────────────────────────────────────────────────────────
#   Structural units detected : 11
#   Seeded claims             : 3
#   Covered by cited source   : 2
#   Deterministic gaps        : 1
# 
# Deterministic Knowledge Gaps (no human source):
#   • function: handle_concurrent_writes (lines 47–61)
#       Seeded assumption: concurrent write handling — AI chose this arbitrarily
# 
#   Resolve: python poc.py add src/utils/parser.py
```

The gap shown is not something Claude admitted. It's something the analyser found by comparing the file's function list against your seeded claims. The function `handle_concurrent_writes` exists in the code but has no resolved human citation in the database. That's the gap.

### What the Exit Codes Mean

```sh
python poc.py verify src/utils/parser.py
echo $?   # Mac/Linux

python poc.py verify src/utils/parser.py
echo $LASTEXITCODE   # Windows PowerShell
```

- **Exit code 0** — no gaps, all detected units have cited sources
- **Exit code 1** — gaps found, resolve with `poc.py add`
- **Exit code 2** — file not found or unsupported language

Exit code 1 integrates directly into CI pipelines. Add `poc.py verify` to your GitHub Action or pre-commit hook and gaps block the build before they reach production.

### Run it Without a Seeded Spec

If you haven't run `import-spec` first, `verify` still works — it falls back to structural analysis and surfaces every uncited function and branch as a gap:

```sh
python poc.py verify src/utils/parser.py
#
# ⚠ No spec imported — showing all uncited structural units.
#   Run: python poc.py import-spec spec.md --artifact src/utils/parser.py
#   for deterministic gap detection.
# 
# Deterministic Knowledge Gaps (no human source):
#   • function: parse_query (lines 1–7)
#   • branch: if not text (lines 2–3)
#   • function: fetch_results (lines 9–12)
#   ...
```

It's less precise than the spec-writer path — every structural unit shows rather than only the ones tied to named assumptions — but it's useful as a baseline on any file, new or old.

### The `--strict` Flag

```sh
python poc.py verify src/utils/parser.py --strict
```

Strict mode flags every uncited structural unit as a gap even when claims are seeded. You can use it when you want zero tolerance: any function or branch without a resolved human source fails the check.

---

## How to Enable PR Enforcement

Once `poc.py trace` has saved you real hours — not before — enable the GitHub Action. The distinction matters. Turning it on day one frames the tool as overhead. Turning it on after the team already finds value frames it as a standard.

```sh
git add .github/ .poc/config.json poc.py
git commit -m "chore: add proof-of-contribution"
git push
```

After that, every PR is checked for an `## 🤖 AI Provenance` section. The scaffold already created the PR template with that section included. Developers fill it in naturally once they're already running `poc.py trace` locally — the template just asks them to record what they already know.

Developers who write fully human code opt out by adding `100% human-written` anywhere in the PR body. The action skips the check automatically.

### What the Action Checks

The action reads the PR description and looks for:

1. The `## 🤖 AI Provenance` heading
2. At least one populated row in the attribution table

If the section is missing or the table is empty, the action fails and posts a comment explaining what to add. The comment includes a link to `poc.py trace <filepath>` so the developer knows exactly where to look.

---

## Where to Go Next

### Use it with spec-writer on a Real Feature

The real value of `import-spec` is on actual features, not test specs. If you use [<VPIcon icon="iconfont icon-github"/>`dannwaneri/spec-writer`](https://github.com/dannwaneri/spec-writer), the workflow is:

```plaintext
/spec-writer "your feature description"
```

Save the output to <VPIcon icon="fa-brands fa-markdown"/>`spec.md`. Then:

```sh
python poc.py import-spec spec.md --artifact src/path/to/output.py
```

Build the feature with your agent. Then run `poc.py trace` to see which assumptions made it into code with no human source. Resolve the HIGH-impact gaps first — those are the ones that will cause production incidents.

### Activate the Claude Code Skill

The SKILL.md file makes Claude automatically append a Provenance Block to every generated artifact when the skill is active. The block lists human sources Claude drew from and flags what it synthesized without any traceable source.

To activate it in Claude Code, the skill is already installed at <VPIcon icon="fas fa-folder-open"/>`~/.claude/skills/proof-of-contribution/`. Claude Code loads it automatically when you are in a project that has `.poc/`<VPIcon icon="iconfont icon-json"/>`config.json`.

A generated Provenance Block looks like this:

```md
---

## PROOF OF CONTRIBUTION
Generated artifact: fetch_github_discussions()
Confidence: MEDIUM

---

## HUMAN SOURCES THAT INSPIRED THIS

[1] GitHub GraphQL API Documentation Team
    Source type: Official Docs
    URL: docs.github.com/en/graphql
    Contribution: cursor-based pagination pattern

[2] GitHub Community (multiple contributors)
    Source type: GitHub Discussions
    URL: github.com/community/community
    Contribution: "ghost" fallback for deleted accounts
                  surfaced in bug reports

---

## KNOWLEDGE GAPS (AI synthesized, no human cited)
- Error handling / retry logic
- Rate limit strategy

---

## RECOMMENDED HUMAN EXPERTS TO CONSULT
- github.com/octokit community for pagination
```

The Knowledge Gaps section is the part no other tool produces. It's where AI admits what it synthesized without a traceable human source — before that gap becomes a production incident.

### Upgrade When You Outgrow SQLite

The default database is SQLite — local only, no infra required. When you need team sharing or graph queries, the <VPIcon icon="fas fa-folder-open"/>`references/` directory in the repo has migration guides:

| Need | File |
| --- | --- |
| Team sharing a provenance DB | <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`relational-schema.md` |
| Graph traversal queries | <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`neo4j-implementation.md` |
| Semantic web / interoperability | <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`jsonld-schema.md` |

---

## Manual Tracking vs. proof-of-contribution

|  | Manual tracking | proof-of-contribution |
| --- | --- | --- |
| **Finding who wrote the code** | Search Slack, ask the team, dig through commits | `poc.py trace <file>` — thirty seconds |
| **Knowing which parts the AI guessed** | You don't, until it breaks in production | Knowledge Gaps section — surfaced before the code ships |
| **Detecting gaps after the build** | Code review, if someone notices | `poc.py verify` — static analysis, zero API calls |
| **Enforcing attribution on PRs** | Honor system | GitHub Action fails the PR if attribution is missing |
| **Connecting to your spec** | Copy-paste assumptions into comments manually | `poc.py import-spec` seeds them as tracked claims automatically |
| **Infrastructure required** | None (usually a spreadsheet or nothing) | None — SQLite, pure Python, no paid services |

The tool doesn't replace code review. It gives code review the context it needs to catch the right things.

The archaeology scenario — two days tracing a bug through dead-end commit messages — takes thirty seconds with `poc.py trace`. The code still has gaps, and it always will. But now you know where they are.

::: info About me

Built by [Daniel Nwaneri (<VPIcon icon="fa-brands fa-dev"/>`dannwaneri`)](https://dev.to/dannwaneri). The spec-writer skill that feeds `import-spec` is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/spec-writer`](https://github.com/dannwaneri/spec-writer). The full proof-of-contribution repo is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/proof-of-contribution`](https://github.com/dannwaneri/proof-of-contribution).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Keep Human Experts Visible in Your AI-Assisted Codebase",
  "desc": "Six months ago, Stack Overflow processed 108,563 questions in a single month. By December 2025, that number had fallen to 3,862. A 78% collapse in two years. The explanation everyone reaches for is th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-keep-human-experts-visible-in-your-ai-assisted-codebase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
