---
lang: en-US
title: "The Codex Handbook: A Practical Guide to OpenAI's Coding Platform"
description: "Article(s) > The Codex Handbook: A Practical Guide to OpenAI's Coding Platform"
icon: iconfont icon-openai
category:
  - Node.js
  - Python
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Codex Handbook: A Practical Guide to OpenAI's Coding Platform"
    - property: og:description
      content: "The Codex Handbook: A Practical Guide to OpenAI's Coding Platform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-codex-handbook-a-practical-guide-to-openai-s-coding-platform/
prev: /ai/openai/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Tatev Aslanyan
    url: https://freecodecamp.org/news/author/tatevaslanyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e558d0da-b13d-4fce-90de-9ef1e818fcff.png
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="The Codex Handbook: A Practical Guide to OpenAI's Coding Platform"
  desc="This handbook is written for developers, team leads, and admins who want to understand what Codex is, how to set it up, how to use it well, how it differs from general-purpose models, and how pricing "
  url="https://freecodecamp.org/news/the-codex-handbook-a-practical-guide-to-openai-s-coding-platform"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e558d0da-b13d-4fce-90de-9ef1e818fcff.png"/>

This handbook is written for developers, team leads, and admins who want to understand what Codex is, how to set it up, how to use it well, how it differs from general-purpose models, and how pricing works today.

It's based on current OpenAI Codex documentation and Help Center articles. Pricing and plan availability change frequently, so treat the pricing section as a snapshot of the current docs and verify against the official links before making procurement decisions.

::: note What's new (April 2026)

OpenAI released **GPT-5.5** and **GPT-5.5 Pro** on April 23–24, 2026. GPT-5.5 is now the flagship general model and is rolling into Codex surfaces. See the new "GPT-5.5: The Newest Release" subsection in [Section 2](#section-2-where-codex-fits-in-the-openai-ecosystem), the full benchmark deep dive in [Section 11](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive), and the updated pricing snapshot in [Section 7](#section-7-pricing-and-plan-access).

:::

::: info Authors

Tatev Aslanyan, Vahe Aslanyan, Jim Amuto | **Version:** 1.3 — Last updated April 30, 2026

:::

---

## Executive Summary

Codex is OpenAI's coding agent — not a single model, but a product and workflow layer that wraps OpenAI's frontier models with file access, shell execution, sandboxes, approval flows, and code review.

It runs in four surfaces: the CLI, IDE extensions (VS Code, Cursor, Windsurf), the macOS/Windows app, and Codex Cloud for background tasks against GitHub repositories.

The product is included with most paid ChatGPT plans (Plus, Pro, Business, Enterprise/Edu) and, for now, Free and Go with stricter rate limits.

The model layer beneath Codex shifted in April 2026. GPT-5.5 is the new general flagship, with substantial gains on agentic and long-context benchmarks (MRCR v2 at 1M tokens jumped from 36.6% on GPT-5.4 to 74.0% on GPT-5.5. Terminal-Bench 2.0 reaches 82.7%, and hallucination rate dropped roughly 60% versus prior generations). It's also roughly 2× the per-token cost of GPT-5.4, so picking the right model per task now matters more for budget than it did a quarter ago.

For teams adopting Codex, the highest-leverage choices are:

1. Start in the CLI or IDE on small bounded tasks before enabling cloud
2. Use Codex as a pre-merge reviewer in addition to a code generator
3. Keep admin and user access separated through workspace RBAC, and
4. Treat token consumption — not prompt count — as the cost driver.

The 30-60-90 day adoption plan in the appendix gives a phased rollout that surfaces friction early.

This handbook covers what Codex is, how to set it up, how to use it well, how it compares to Claude Code, GitHub Copilot, and self-hosted alternatives. We'll also discuss what it costs, how to govern it in an enterprise, and where it does and does not fit. You'll find a glossary, security checklist, and worked cost example in the appendix.

---

## Table of Contents

### Here's What We'll Cover:

1. [Executive Summary](#executive-summary)
2. [Prerequisites](#prerequisites)
3. [Section 1: What Codex Is](#section-1-what-codex-is)
4. [Section 2: Where Codex Fits in the OpenAI Ecosystem](#section-2-where-codex-fits-in-the-openai-ecosystem)
5. [Section 3: The Core Surfaces](#section-3-the-core-surfaces)
6. [Section 4: Getting Started: Install, Set Up, and Your First Task](#section-4-getting-started-install-set-up-and-your-first-task)
7. [Section 5: How to Use Codex Effectively](#section-5-how-to-use-codex-effectively)
8. [Section 6: Difference Between Codex and Other Coding Tools](#section-6-difference-between-codex-and-other-coding-tools)
9. [Comparison Matrix](#comparison-matrix)
10. [Section 7: Pricing and Plan Access](#section-7-pricing-and-plan-access)
11. [Worked Cost Example](#worked-cost-example)
12. [Section 8: Security, Permissions, and Enterprise Setup](#section-8-security-permissions-and-enterprise-setup)
13. [Section 9: Best Practices for Teams](#section-9-best-practices-for-teams)
14. [Section 10: Common Workflows and Examples](#section-10-common-workflows-and-examples)
15. [Section 11: Model Specs and Benchmarks (GPT-5.5 Deep Dive)](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive)
16. [Section 12: Troubleshooting](#section-12-troubleshooting)
17. [Section 13: FAQ](#section-13-faq)
18. [Section 14: When NOT to Use Codex](#section-14-when-not-to-use-codex)
19. [Section 15: Final Recommendations](#section-15-final-recommendations)
20. [Section 16: Source References](#section-16-source-references)
21. [Appendix A: 30-60-90 Day Adoption Plan](#appendix-a-30-60-90-day-adoption-plan)
22. [Appendix B: Glossary](#appendix-b-glossary)
23. [Appendix C: Admin Security Checklist](#appendix-c-admin-security-checklist)
24. [Appendix D: Changelog](#appendix-d-changelog)
25. [Appendix E: Working with Codex in VS Code](#appendix-e-working-with-codex-in-vs-code)

::: note Prerequisites

This handbook is hands-on. To get the most out of it — especially [Section 4](#section-4-getting-started-install-set-up-and-your-first-task), [Section 5](#section-5-how-to-use-codex-effectively), and [Section 10](#section-10-common-workflows-and-examples) where you'll install Codex and run real tasks — you should have the following in place.

**Background Knowledge You Should Already Have**

You don't need to be a senior engineer, but the walkthroughs assume:

- **Comfort using the command line.** You can `cd` into a directory, list files, run `git` commands, and read shell error messages. If you have never opened a terminal, work through a one-hour shell tutorial first.
- **Basic Git literacy.** You understand commits, branches, pull requests, and the difference between staged and unstaged changes. The Codex workflow centers on producing reviewable diffs, so this is non-negotiable.
- **Experience reading code in at least one mainstream language.** Codex can work in any language, but the demo repo in [Section 4](#section-4-getting-started-install-set-up-and-your-first-task) is a small Python service. If you can read Python, JavaScript, Go, or similar, you'll be fine.
- **A mental model of "what an API call costs."** [Section 7](#section-7-pricing-and-plan-access)'s worked cost example assumes you understand that LLM usage is metered by tokens. If "tokens" is a brand-new concept, skim the OpenAI tokenizer page once before reading [Section 7](#section-7-pricing-and-plan-access).

If you're an engineering manager, procurement lead, or admin and you only need [Section 7](#section-7-pricing-and-plan-access), [Section 8](#section-8-security-permissions-and-enterprise-setup), and [Section 14](#section-14-when-not-to-use-codex), you can skip the technical prerequisites and jump straight to those sections.

**Tools and Accounts You Need to Install**

Before starting [Section 4](#section-4-getting-started-install-set-up-and-your-first-task), have the following ready. Approximate setup time: **15–25 minutes** if you're starting from scratch.

| Tool / Account | Why you need it | Where to get it |
| --- | --- | --- |
| A ChatGPT account on Plus, Pro, Business, or Enterprise/Edu | Codex is included with these plans. Free and Go work for now but with stricter rate limits | [<VPIcon icon="iconfont icon-openai"/>chatgpt.com](https://chatgpt.com) |
| **Node.js 18+ and npm** | The Codex CLI is installed via npm (`npm i -g @openai/codex`) | [nodejs.org](https://nodejs.org) |
| **Git 2.30+** | Required to clone the demo repo and produce diffs Codex can review | [git-scm.com](https://git-scm.com) |
| **A code editor** | VS Code is the recommended baseline. Cursor and Windsurf also work | [code.visualstudio.com](https://code.visualstudio.com) |
| **A GitHub account** | Required only for Codex Cloud tasks ([Section 8](#section-8-security-permissions-and-enterprise-setup) and [Appendix E](#appendix-e-working-with-codex-in-vs-code)) | [github.com](https://github.com) |
| **WSL2** (Windows users only) | The Codex CLI is experimental on native Windows; WSL is the supported path | [Microsoft WSL docs](https://learn.microsoft.com/en-us/windows/wsl/install) |

**Verify Your Environment**

Run these three commands before you start [Section 4](#section-4-getting-started-install-set-up-and-your-first-task). If any of them fails, fix it first.

```sh
node --version   # should print v18.x or higher
npm --version    # should print 9.x or higher
git --version    # should print 2.30 or higher
```

**What This Handbook Will Not Teach You**

To set expectations honestly, this handbook does **not** cover:

- How to write production-grade Python, JavaScript, or any specific language. We use small examples to demonstrate Codex behavior, not teach syntax.
- How to design a system architecture from scratch. [Section 14](#section-14-when-not-to-use-codex) explains why Codex is a poor fit for novel architecture decisions.
- How to administer GitHub at the organization level. [Section 8](#section-8-security-permissions-and-enterprise-setup) covers the Codex-specific GitHub Connector setup, but assumes your GitHub org already exists.
- LLM internals (attention, RLHF, and so on). We treat the model as a black box with measurable behavior.

:::

---

## Section 1: What Codex Is

Codex is OpenAI's coding agent. The most important thing to understand is that Codex is not just a single model name. It's a product and workflow layer designed to help people write, review, debug, and ship code faster. In OpenAI's own wording, it's an AI coding agent that can work with you locally or complete tasks in the cloud.

That distinction matters. Most people think of AI in one of two ways:

- A chat model that answers questions.
- A coding assistant that suggests snippets.

Codex is broader than both. It can inspect a repository, edit files, run commands, and execute tests. It can also handle larger chunks of work by taking a prompt or spec and turning it into a task plan, code changes, and reviewable output.

For teams, the cloud-based workflow is especially important because it lets Codex run in the background while engineers stay in flow.

OpenAI's current docs also place Codex alongside a wider set of developer tools: the API, the Responses API, the Agents SDK, MCP tools, and the Codex app. If you are onboarding a team, the easiest mental model is this:

- The models are the engine.
- Codex is the coding product that uses those engines.
- The CLI, IDE extension, web app, and cloud tasks are the ways you interact with it.

---

## Section 2: Where Codex Fits in the OpenAI Ecosystem

OpenAI now offers a layered stack:

- General-purpose frontier models such as **GPT-5.5**, **GPT-5.5 Pro**, GPT-5.4, GPT-5.4-mini, and GPT-5.4-nano.
- Codex-specific models such as GPT-5.3-Codex, GPT-5.2-Codex, GPT-5.1-Codex, and codex-mini-latest.
- Product surfaces that package those models into workflows, such as Codex CLI, the Codex app, IDE extensions, cloud tasks, and code review.

The practical difference is simple:

- If you need one-off reasoning, synthesis, or general chat, you may use a general model.
- If you need an agent that should navigate a repository, change files, run tests, and push toward a concrete code outcome, Codex is the purpose-built surface.

OpenAI's current model docs describe GPT-5.4 as the flagship model for complex reasoning and coding. At the same time, Codex-specific model pages describe GPT-5.3-Codex and GPT-5.2-Codex as optimized for agentic coding tasks in Codex or similar environments. That tells you how OpenAI is positioning the stack:

- GPT-5.4 is the general flagship.
- Codex-specific models are tuned for coding workflows.
- Codex the product can switch models depending on the surface and configuration.

If you remember nothing else from this section, remember this: Codex is the workflow. Models are the engine.

### GPT-5.5: The Newest Release

OpenAI launched **GPT-5.5** on April 23, 2026, with API availability following on April 24, 2026. A higher-tier **GPT-5.5 Pro** variant shipped alongside it. OpenAI describes GPT-5.5 as their "smartest and most intuitive to use model yet, and the next step toward a new way of getting work done on a computer."

For a Codex user, the practical upshot is short:

1. **GPT-5.5 is the new general flagship.** Anywhere older docs say "GPT-5.4 is the flagship," read GPT-5.5 going forward. GPT-5.4 remains available as a cheaper default.
2. **Codex surfaces will switch over.** Expect GPT-5.5 to become selectable (and often the default) inside the CLI, IDE, app, and cloud tasks shortly after launch. Verify the active model in your settings.
3. **Pricing has shifted.** GPT-5.5 sits well above GPT-5.4 on a per-token basis. See [Section 7](#section-7-pricing-and-plan-access) before approving budgets.

The full benchmark breakdown, performance highlights, and per-workload guidance for picking GPT-5.5 vs GPT-5.4 vs Codex-specific models are in [Section 11: Model Specs and Benchmarks](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive). Read that section once you have the foundational chapters under your belt.

---

## Section 3: The Core Surfaces

Codex currently shows up in a few places, and each one is optimized for a slightly different working style.

### Codex CLI

- [<VPIcon icon="iconfont icon-openai"/>Official docs: developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)
- [npm package: <VPIcon icon="fa-brands fa-npm"/>`@openai/codex`](https://npmjs.com/package/@openai/codex)
- [GitHub repo: <VPIcon icon="iconfont icon-github"/>`openai/codex`](https://github.com/openai/codex)

The CLI is the fastest way to put Codex directly into a terminal session. The docs describe it as OpenAI's coding agent that runs locally from your terminal, can read, change, and run code on your machine, and is open source and written in Rust.

Use the CLI when you want:

- A terminal-first workflow.
- Fast iteration inside an existing repo.
- Fine-grained control over approvals and execution.
- A lightweight path for local coding tasks.

### IDE Extension

- [<VPIcon icon="iconfont icon-openai"/>Official docs: developers.openai.com/codex/ide](https://developers.openai.com/codex/ide)
- [VS Code Marketplace listing (`openai.chatgpt`)](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)

The CLI docs and Help Center articles point to the IDE extension for VS Code, Cursor, Windsurf, and other VS Code forks. This is the natural fit when your team lives in an editor and wants Codex embedded in the normal coding flow.

Use the IDE extension when you want:

- Codex close to the files you are already editing.
- Prompting and editing without switching contexts.
- A bridge between human-driven and agent-driven editing.

### Codex App

- [<VPIcon icon="iconfont icon-openai"/>Help Center: Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-codex-in-chatgpt-faq)
- [Download from chatgpt.com/codex](https://chatgpt.com/codex)

OpenAI's Help Center says the Codex app is available on macOS and Windows. It is designed for parallel work across projects, with built-in worktree support, skills, automations, and git functionality.

Use the app when you want:

- Multiple Codex agents running in parallel.
- Cloud tasks without bouncing between terminal and editor.
- A project-centric place to assign and monitor tasks.

### Codex Cloud

- [<VPIcon icon="iconfont icon-openai"/>Official docs: developers.openai.com/codex/cloud](https://developers.openai.com/codex/cloud)
- [Web interface: chatgpt.com/codex](https://chatgpt.com/codex)

Codex cloud is the background execution mode. It runs each task in an isolated sandbox with the repository and environment, and it is intended for reviewable code output rather than direct interactive sessions.

Use Codex cloud when you want:

- Tasks to run while you do something else.
- Sandboxed execution with reviewable diffs.
- Automated code review or repository-level workflows.

### Code Review

- [<VPIcon icon="iconfont icon-openai"/>Help Center: Codex for code review](https://help.openai.com/en/articles/11369540-codex-in-chatgpt-faq)
- [<VPIcon icon="iconfont icon-openai"/>Codex use cases](https://developers.openai.com/codex/use-cases)

Codex can also review code inside GitHub. OpenAI describes this as a way to automatically review your personal pull requests or configure reviews at the team level.

Use code review when you want:

- A second set of eyes on pull requests.
- Automated regression or issue spotting before human review.
- Lightweight review coverage across a team.

---

## Section 4: Getting Started: Install, Set Up, and Your First Task

This section walks you end-to-end from "nothing installed" to "Codex just fixed a real bug for me."

We will use a tiny demo repository you build yourself in two minutes — a small Python price-calculator with one obvious bug and one missing test. That gives you a real, reproducible target you can throw away when you're done.

The same walkthrough works for the CLI, the IDE extension, and the app, with notes for each.

If you have existing code you would rather use, skip ahead to [Step 4](#step-4-launch-codex-and-run-your-first-task) and point Codex at your own repo. The demo is for readers who want a known-good starting point.

### Step 0: Confirm Access

Codex is included with ChatGPT Plus, Pro, Business, and Enterprise/Edu plans. For a limited time, it is also included with Free and Go, with stricter rate limits.

If you are in a team or enterprise workspace, access may also depend on workspace settings and role-based controls. Do not assume that a ChatGPT subscription alone guarantees access in a managed environment — confirm with your admin or look in Codex Cloud settings at [<VPIcon icon="iconfont icon-openai"/>chatgpt.com/codex](https://chatgpt.com/codex).

### Step 1: Install Codex

You have three install paths. Pick **one** to start; you can add the others later.

#### Option A: The CLI (recommended for first task)

The CLI is the most direct way to see how Codex behaves. The official docs note that **macOS and Linux are first-class, while Windows is experimental and you should use WSL2**.

```sh
npm i -g @openai/codex
codex --version
```

If `codex --version` prints a version number, you are done.

#### Option B: The VS Code Extension

In VS Code (or Cursor / Windsurf), open the Extensions panel, search for "Codex" by `openai`, and install it. Or from a terminal:

```sh
code --install-extension openai.chatgpt
```

The Codex panel will appear in the right sidebar after install.

#### Option C: The Codex App

Download the Codex app for macOS or Windows from [<VPIcon icon="iconfont icon-openai"/>chatgpt.com/codex](https://chatgpt.com/codex). The app shines when you want parallel tasks, built-in git worktrees, and a project-centric UI. For your very first task it is overkill — start with the CLI or extension.

**VS Code users:** For a step-by-step guide covering all three VS Code entry points (extension, CLI in the integrated terminal, and browser Codex), see **Appendix E: Working with Codex in VS Code**.

### Step 2: Authenticate

Run `codex` in a terminal (or open the extension panel). You will be prompted to:

- **Sign in with ChatGPT** — recommended. Usage is charged against your plan's included Codex credits.
- **Sign in with an API key** — used when you want metered API billing or your workspace policy requires it.

If you are unsure, pick ChatGPT sign-in.

### Step 3: Build the Demo Repo

This is the part most quick-starts skip. Instead of pointing Codex at "any repo," let's create a small, **self-contained demo repo with a known bug** so you can verify Codex actually fixes it.

In a terminal, run:

```sh
mkdir codex-demo && cd codex-demo
git init
```

Now create three files. First, <VPIcon icon="fa-brands fa-python"/>`pricing.py` — a small pricing calculator with one off-by-one bug and one missing edge case:

```py title="pricing.py"
def apply_discount(price: float, discount_percent: float) -> float:
    """Apply a percentage discount to a price.

    BUG: The discount is applied as a multiplier of (discount_percent / 10)
    instead of (discount_percent / 100). A 20% discount currently doubles
    the price instead of reducing it.
    """
    if discount_percent < 0:
        raise ValueError("discount_percent must be >= 0")
    return price * (1 - discount_percent / 10)


def cart_total(items: list[dict], discount_percent: float = 0) -> float:
    """Compute the total for a list of cart items after a discount."""
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    return apply_discount(subtotal, discount_percent)
```

Then <VPIcon icon="fa-brands fa-python"/>`test_pricing.py` — a single passing test plus one that will fail because of the bug:

```py title="test_pricing.py"
from pricing import apply_discount, cart_total


def test_no_discount_returns_original_price():
    assert apply_discount(100.0, 0) == 100.0


def test_twenty_percent_discount_on_100_is_80():
    # This will FAIL until the bug in apply_discount is fixed.
    assert apply_discount(100.0, 20) == 80.0


def test_cart_total_with_discount():
    items = [
        {"price": 10.0, "quantity": 2},
        {"price": 5.0, "quantity": 1},
    ]
    # Subtotal is 25.0. With 10% off, expected total is 22.5.    assert cart_total(items, discount_percent=10) == 22.5
```

And a tiny <VPIcon icon="fa-brands fa-markdown"/>`README.md`:

```md title="README.md"
# codex-demo

A tiny pricing module used to learn the Codex workflow.

Run tests with: `python -m pytest`
```

Commit the starting state so Codex's diffs are easy to review:

```sh
git add .
git commit -m "Initial demo: pricing module with a known bug"
```

Confirm the bug is real before you ask Codex to fix it:

```sh
python -m pytest
```

You should see two failing tests (`test_twenty_percent_discount_on_100_is_80` and `test_cart_total_with_discount`).

If `pytest` is not installed: `pip install pytest`. The full demo needs only Python 3.10+ and pytest.

### Step 4: Launch Codex and Run Your First Task

Now point Codex at the demo repo.

**From the CLI:**

```sh
cd codex-demo
codex
```

When Codex starts, give it a clear, bounded task. **Type this prompt exactly:**

```md title="prompt"
The test suite has two failing tests. Read pricing.py and test_pricing.py,
identify the root cause, fix the smallest possible thing, then run the tests
to confirm they pass. Explain what you changed and why.
```

Codex will:

1. Inspect <VPIcon icon="fa-brands fa-python"/>`pricing.py` and <VPIcon icon="fa-brands fa-python"/>`test_pricing.py`.
2. Recognize the off-by-one bug (`/ 10` should be `/ 100`).
3. Propose a one-line diff.
4. Ask for approval before modifying the file (in the default approval mode).
5. After you approve, run `python -m pytest` and report that all three tests now pass.

**From the VS Code extension:** Open the `codex-demo` folder in VS Code, open the Codex panel in the right sidebar, and paste the same prompt. The diff will appear inline in the editor for you to review and accept.

### Step 5: Review the Diff

This is the most important habit to build early. Even though the fix is one character (`10` → `100`), look at the diff before accepting:

```sh
git diff
```

Read the change. Confirm it matches what Codex described. Run the tests yourself:

```sh
python -m pytest
```

All three should pass. Commit the fix:

```sh
git commit -am "Fix off-by-one in apply_discount"
```

You have just completed the full Codex loop: **context → task → change → review → verify**. Every bigger task is a longer version of this loop.

### Step 6: Try Two More Bounded Tasks

Now that the loop works, try these against the same demo repo:

1. **Add an edge case test.** Prompt: *"Add a test that verifies* `apply_discount` *raises a ValueError when* `discount_percent` *is negative. Run the tests after."*
2. **Add a missing safety check.** Prompt: *"*`apply_discount` *does not currently reject* `discount_percent` *values greater than 100, which would produce a negative price. Add validation, update the existing tests if needed, and add a new test for the new behavior."*

Each task is small, has a clear acceptance criterion (the tests pass), and produces a reviewable diff. That is the shape of every good Codex task.

### Step 7 (Optional): Set Up Codex Cloud

Cloud tasks let Codex run in the background while you do other work. They require a **GitHub-hosted repository**.

To enable Codex Cloud against the demo repo:

1. Push `codex-demo` to a private GitHub repo: `gh repo create codex-demo --private --source=. --push` (requires the `gh` CLI).
2. Visit [<VPIcon icon="iconfont icon-openai"/>chatgpt.com/codex](https://chatgpt.com/codex) and connect the **ChatGPT GitHub Connector**.
3. Allow the `codex-demo` repository in the connector. **Do not grant org-wide access by default** — see [Appendix C](#appendix-c-admin-security-checklist).
4. From the web interface, pick the repo and prompt: *"Add type hints to every function in* <VPIcon icon="fa-brands fa-python"/>`pricing.py` *and add a CI-style summary of what changed."*
5. Wait for the sandbox to finish, review the diff in the browser, and either accept it or open a PR.

By default, **Codex Cloud sandboxes have no internet access**. That is deliberate — admins can allowlist dependency registries and trusted sites if a real workflow needs them.

### When to Use Which Surface

After completing the demo, the surface trade-offs become concrete:

- **CLI** — fastest for terminal-heavy local work, scriptable, best for multi-step agentic tasks with explicit approvals.
- **VS Code extension** — lowest friction for in-flow editing while you are already in the editor.
- **Codex app** — best when you want to run multiple parallel tasks across projects with worktree isolation.
- **Codex Cloud** — best for background work, long-running tasks, and PR-style review you can leave running.

Most experienced users have **all of them installed** and pick per task. A single workflow rarely fits every kind of work.

### What If Something Doesn't Work?

If you get stuck during this walkthrough:

- `codex` command not found → npm's global bin is not on your PATH. Restart your terminal, or use a Node version manager like nvm.
- Sign-in keeps failing → confirm the email matches your ChatGPT plan; in enterprise workspaces, your admin must enable Codex.
- Codex won't modify the file → you may be in a strict approval mode. Approve when prompted, or relax the mode after your first successful task.
- Windows misbehavior → switch to a WSL2 terminal. Native Windows for the CLI is experimental.

The full troubleshooting guide is in [Section 12](#section-12-troubleshooting).

---

## Section 5: How to Use Codex Effectively

Codex works best when you treat it like a developer you're onboarding rather than a magic prompt responder. The more concrete your task, the better the result.

Each tip below has a **bad example** (what people actually type) and a **good example** (what produces a useful result). Most use the `codex-demo` repo from [Section 4](#section-4-getting-started-install-set-up-and-your-first-task) so you can run them yourself.

### Give It a Real Objective

A "real objective" means a concrete goal with a verifiable outcome — not a feeling.

**Bad:**

```md title="prompt"
Improve this codebase.
```

Codex will pick something to do, but you have no way to know if the result is what you wanted, and the diff will probably touch more than you can review.

**Good:**

```md title="prompt"
Refactor cart_total in pricing.py so the iteration logic and the discount
application are in two separate helper functions. Keep the public signature
of cart_total unchanged. Add tests for each helper. Run pytest at the end.
```

This works because there is exactly one acceptance criterion (tests pass with the new structure) and exactly one boundary (public signature unchanged). You can review the diff in 30 seconds.

Other shapes that work:

- "Fix the failing test in <VPIcon icon="fa-brands fa-python"/>`test_pricing.py::test_twenty_percent_discount_on_100_is_80`."
- "Add a `currency: str = 'USD'` parameter to `cart_total` and update the tests."
- "Review the changes in my last commit for missing edge cases."

### Provide the Right Context

Codex can inspect the repo, but you still need to steer it to the right files and constraints. Without that, it wanders.

**Bad:**

```md title="prompt"
Add validation to the pricing module.
```

What kind of validation? On which inputs? What error class? Codex has to guess all of that.

**Good:**

```md title="prompt"
Context:
- File: pricing.py
- Function: apply_discount
- Current behavior: raises ValueError for negative discount_percent.
- Desired behavior: also raise ValueError when discount_percent > 100,
  with the message "discount_percent must be between 0 and 100".

Task:
- Add the validation.
- Add a matching test in test_pricing.py.
- Do not change apply_discount's public signature.
- Run pytest after.
```

Notice the structure: **what file**, **current behavior**, **desired behavior**, **task**, **constraints**, **how to verify**. That is the difference between a hopeful prompt and a usable spec.

For larger tasks, also include:

- A link to the issue or spec (Codex can fetch it if web access is enabled).
- The names of related files even if Codex could find them itself — naming them halves the time-to-first-edit.
- The name of any test command, build command, or lint that should pass.

### Ask for Intermediate Thinking When Needed

"Intermediate thinking" means asking Codex to **plan in writing before it edits files**. The default is for Codex to dive straight to code. For anything larger than a single function, that is the wrong default.

**Without intermediate thinking** (the alternative):

```md title="prompt"
Refactor pricing.py to support multiple currencies.
```

Codex starts editing immediately. You discover after the fact that it changed the database schema, the API contract, and three test files — and you have no idea whether the design choice it made was the right one.

**With intermediate thinking:**

```md title="prompt"
I want to add multi-currency support to pricing.py.

Before editing anything:
1. List the files you expect to touch and why.
2. Outline the approach in 5-10 bullets.
3. Call out any assumptions you are making and any open questions.
4. Identify the riskiest part of the change.

Wait for my approval before making any edits.
```

Now you get a plan you can review, push back on, or scrap entirely — at zero cost to the codebase. After you approve, Codex executes against the plan it just wrote, which makes the resulting diff predictable.

Use intermediate thinking whenever the task is:

- Multi-file or cross-cutting.
- Architecturally novel for this codebase.
- Hard to test (so the diff is your only signal).
- High blast-radius if wrong (auth, payments, data migrations).

### Prefer Bounded Changes

A **bounded change** is one with all four of these properties:

1. **Small surface area** — touches one file, one module, or one logical concept.
2. **Clear acceptance criterion** — there's a specific test, output, or behavior that proves it worked.
3. **Reviewable in a few minutes** — a human can read the diff and form an opinion without setting aside an hour.
4. **Easily revertible** — if it goes wrong, `git revert` undoes it cleanly without breaking anything else.

The opposite is an **unbounded change**: "make the codebase faster," "modernize the API," "add types everywhere." These have no clear endpoint, no easy verification, and no clean revert path.

#### Bounded examples (good)

- "Add a `serialize()` method to `CartItem` that returns a dict suitable for JSON encoding. Add a test."
- "In `apply_discount`, replace the magic number 100 with a module-level constant `MAX_DISCOUNT_PERCENT`."
- "The `cart_total` function takes a `discount_percent` keyword argument that defaults to 0. Make the default `None` and treat `None` as 'no discount.' Update the tests."

#### Unbounded examples (avoid)

- "Make pricing.py production-ready."
- "Add proper error handling everywhere."
- "Improve the architecture."

When you catch yourself writing an unbounded prompt, break it into a list of bounded ones before sending. The decomposition itself is most of the work; once you have it, Codex is good at executing each piece.

### Use Reviews as a Loop

Codex is not just for writing code — it is also a useful pre-merge reviewer. The loop is:

1. You (or Codex) write the change.
2. Ask Codex to review it.
3. Fix the issues it finds.
4. Re-run tests.

**What this looks like in practice:**

After completing a task in `codex-demo`, ask Codex to review your own commit:

```md title="prompt"
Review the change in my last commit (git show HEAD) for:
- correctness issues (off-by-one, type mismatches, wrong defaults)
- missing tests, especially edge cases
- security concerns (input validation, injection, unsafe defaults)
- maintainability risks (unclear naming, hidden coupling)

Prioritize findings by severity (critical / important / nit). For each
finding, point to the exact line and propose a concrete fix. Do not
modify any files in this turn — just produce the review.
```

You will typically get back a structured response like:

```md title="prompt"
CRITICAL: line 14 — apply_discount accepts NaN silently because the type
  check is `discount_percent < 0`, which is False for NaN. Fix: add an
  explicit math.isnan() check before the comparison.

IMPORTANT: test_pricing.py has no test for the boundary discount_percent=100.  Fix: add a test asserting apply_discount(100, 100) == 0. NIT: line 8 — the docstring mentions a "BUG" comment that should be removed
  now that the bug is fixed.
```

Then you triage: fix the critical and important findings (often by feeding them back to Codex with "apply the fixes you proposed"), defer or reject the nits, and re-run tests.

This converts Codex from a code generator into a **quality gate**, which is usually the higher-leverage use. A team that uses Codex only as a generator gets faster code; a team that also uses it as a reviewer gets better code.

---

## Section 6: Difference Between Codex and Other Coding Tools

This is the section that usually matters most to new users, because the category boundaries are easy to blur.

### Codex Is A Product Layer, Not Just A Model

Codex is the product experience and workflow layer. Models are the underlying engines. Put differently:

- A general model answers questions or writes text.
- A coding model is tuned more narrowly for software tasks.
- Codex packages the model inside an agentic coding workflow with files, commands, approvals, sandboxes, and reviews.

That matters because users often compare Codex to "another model" when the real comparison is "another coding system."

### Codex vs OpenAI General Models

OpenAI's current models page recommends GPT-5.4 as the flagship model for complex reasoning and coding. That is the general model-side recommendation.

Codex-specific pages, on the other hand, describe models like GPT-5.3-Codex and GPT-5.2-Codex as optimized for agentic coding tasks in Codex or similar environments.

The practical takeaway:

- Use GPT-5.4 when you want a top-tier general model.
- Use Codex-specific models when you want a model optimized for coding workflows inside Codex.
- Use the Codex surface when you want file edits, shell commands, reviews, and sandboxes, not just text output.

### Codex vs Claude Code

Claude Code is also a terminal-based agentic coding tool. Anthropic's docs describe it as a terminal tool that can make plans, edit files, run commands, create commits, and work with MCP-connected data sources. It is strong if your team already prefers a terminal-first workflow and wants a tightly scriptable developer tool.

Codex differs in a few practical ways:

- Codex spans more surfaces, including CLI, IDE extension, app, cloud tasks, and code review.
- Codex cloud is built around GitHub-connected task execution and review.
- Codex is more explicitly positioned as a family of coding workflows, not just a single terminal agent.

The practical takeaway:

- Choose Claude Code if you want a terminal-native workflow with strong composability and you are happy living mostly in the shell.
- Choose Codex if you want a broader product layer with local, cloud, and app-based workflows that can be shared across a team.

### Codex vs GitHub Copilot Coding Agent

GitHub Copilot coding agent is designed around GitHub's own workflow. GitHub docs describe it as an agent you can assign issues or pull requests to, and it works in the background to create or modify PRs. It lives very naturally inside GitHub-hosted development flows.

Codex is different in emphasis:

- Copilot coding agent is highly GitHub-centric.
- Codex is broader across terminal, IDE, app, and cloud.
- Copilot is a strong fit if your team already uses GitHub as the center of gravity for task assignment and review.
- Codex is a stronger fit if you want a more general coding agent surface that can work across local and cloud workflows.

The practical takeaway:

- Choose Copilot coding agent if your process is already deeply anchored in GitHub issues and pull requests.
- Choose Codex if you want a wider agent workflow that can run locally, in the IDE, or in Codex cloud.

### Codex vs Open-Weight and Self-Hosted Models

Open-weight or self-hosted models serve a different need. Teams usually reach for them when they want:

- Full infrastructure control.
- Custom hosting or air-gapped deployment.
- More direct control over retention and data boundaries.
- A lower-cost path at high scale if they already own the hardware and ops stack.

The tradeoff is that self-hosted models usually do not give you the same out-of-the-box agentic product experience that Codex does. You have to assemble the orchestration, repo access, sandboxing, approvals, and review loop yourself.

That means the real choice is not "Which model is smartest?" It is "How much engineering do I want to spend on the workflow around the model?"

The practical takeaway:

- Choose open-weight or self-hosted models when infrastructure control is the main requirement and you are willing to build the surrounding agent system.
- Choose Codex when you want the workflow already packaged, especially for day-to-day engineering teams.

### Codex vs General Chat Models

General chat models are best when the task is:

- A question and answer exchange.
- Conceptual reasoning.
- Drafting prose.
- Summarizing or rewriting text.

Codex is better when the task is:

- Reading and modifying a repository.
- Running tests.
- Fixing code.
- Reviewing pull requests.
- Coordinating multi-step implementation work.

### Codex vs API Usage of the Same Models

The same model family can behave differently depending on the surface.

- In the API, you may call a model directly and design your own orchestration.
- In Codex, the same or similar model may be wrapped in repo access, approval flows, and task execution.

That is why some model pages mention that a model is optimized for "Codex or similar environments." The model is tuned for agentic software work, but the workflow surface still matters.

### Comparison Matrix

The prose comparisons above collapse into a single matrix for fast reference:

| Dimension | Codex | Claude Code | GitHub Copilot Coding Agent | Self-hosted / Open-weight |
| --- | --- | --- | --- | --- |
| Primary surface | CLI, IDE, app, cloud | CLI (terminal-first) | GitHub web/PR/issues | Whatever you build |
| Background execution | Yes (Codex Cloud sandboxes) | Limited; runs locally | Yes (GitHub Actions runners) | DIY |
| Repository integration | GitHub via connector; local repos directly | Local; MCP-connected sources | Native GitHub | DIY |
| Model choice | OpenAI models, switchable per surface | Anthropic Claude models | GitHub-managed (mix of vendors) | Any model you can host |
| Approval and sandbox controls | Yes, per-surface | Yes, per-tool | GitHub permission model | DIY |
| Parallel agents | Yes (app + cloud) | Limited | Yes (per-PR) | DIY |
| Best fit | Cross-surface team workflows | Terminal-native power users | Teams already living in GitHub | Air-gapped, custom infra, or cost-sensitive at scale |
| Main tradeoff | OpenAI ecosystem lock-in; price tier | Less product surface area | Heavily GitHub-coupled | Significant engineering effort |

Use the matrix to pick the dominant tool, then layer the others where they fit. Many teams legitimately run two of these in parallel — for example, Codex for cross-surface work and Claude Code for power-user terminal workflows.

### Which Tool Should A New User Choose?

As a rule of thumb:

- For terminal-first coding and scripting, Claude Code is a strong alternative.
- For GitHub-native issue and PR automation, GitHub Copilot coding agent fits naturally.
- For local plus cloud plus app-based team workflows, Codex is the most flexible option.
- For maximum infrastructure control, self-hosted or open-weight stacks make sense.

OpenAI's docs currently list GPT-5.5 as the general flagship, with GPT-5.4, GPT-5.4-mini, and GPT-5.4-nano remaining available below it, while Codex docs and model pages expose Codex-specific variants and model switching inside the CLI.

---

## Section 7: Pricing and Plan Access

Pricing is the part of Codex most likely to change, so this section should be treated as a snapshot of the current official docs.

### Plan Access

OpenAI's current Help Center says Codex is included with:

- ChatGPT Plus
- ChatGPT Pro
- ChatGPT Business
- ChatGPT Enterprise/Edu

For a limited time, it is also included with Free and Go, though those plans are temporary exceptions and subject to rate limits.

### Flexible Pricing and Credits

The current rate card says Codex pricing changed on April 2, 2026 to align with API token usage instead of purely per-message pricing. The same article explains that:

- New and existing Plus and Pro customers use the token-based rate card.
- New and existing Business customers use the token-based rate card.
- New Enterprise customers use the token-based rate card.
- Existing Enterprise/Edu and several other legacy plan categories remain on the legacy rate card until migration.

This is important because two teams in the same company can be on different pricing logic depending on workspace status and plan vintage.

### Current Model Pricing Snapshot

The current model pages list pricing per 1M tokens in USD. The exact numbers depend on the model you choose:

- **GPT-5.5: \\(5 input, \\)30 output.** New flagship as of April 23, 2026.
- **GPT-5.5 Pro: \\(30 input, \\)180 output.** Higher-tier variant for the most demanding agentic and reasoning workloads.
- GPT-5.4: \\(2.50 input, \\)15 output.
- GPT-5.4-mini: \\(0.75 input, \\)4.50 output.
- GPT-5.4-nano: \\(0.20 input, \\)1.25 output.
- GPT-5-Codex: \\(1.25 input, \\)10 output.
- GPT-5.2-Codex: \\(1.75 input, \\)14 output.
- GPT-5.1-Codex-mini: \\(0.25 input, \\)2 output.
- codex-mini-latest: \\(1.50 input, \\)6 output.

These model pages also note context windows, output limits, and whether the model is intended for Codex-specific or general API use. For budget planning, remember that longer outputs can cost much more than the input prompt, so task framing matters as much as model choice.

Note that GPT-5.5 is roughly 2x the input price and 2x the output price of GPT-5.4, and GPT-5.5 Pro is an order of magnitude above that. OpenAI's framing is that GPT-5.5 is also more token-efficient than GPT-5.4, which can offset some of the headline price difference, but you should measure this on your own workloads before assuming it nets out. For the Codex-specific models, expect the lineup to shift as Codex variants based on GPT-5.5 ship; until then, the Codex-specific models above remain the right choice for purely coding-shaped tasks.

### What This Means in Practice

The real cost depends on:

- Input size.
- Cached input.
- Output length.
- Whether the task uses fast mode.
- Which model you select.

So if you are planning a team rollout, do not estimate usage from "number of prompts" alone. Estimate based on expected token consumption and task type.

### Legacy Pricing

The legacy rate card still matters for users and workspaces that have not been migrated. The big lesson is that pricing is now tied more closely to model usage than to a simple fixed message count. Anyone budgeting Codex should read the current rate card before setting internal chargeback rules or usage policies.

### Worked Cost Example

Pricing tables are easy to misread. A worked example makes the model selection question concrete.

**Scenario:** A 30-engineer team uses Codex Cloud for automated pull request review. Each engineer opens roughly 4 PRs per week. Each PR review pulls in approximately 30,000 input tokens (the diff plus relevant context files) and produces approximately 3,000 output tokens (the review comments and risk summary).

Weekly token volume:

- Reviews per week: 30 engineers × 4 PRs = 120 reviews
- Input tokens per week: 120 × 30,000 = 3.6M input tokens
- Output tokens per week: 120 × 3,000 = 360K output tokens

Cost per week by model:

| Model | Input cost | Output cost | Weekly total | Annualized (52 wk) |
| --- | --- | --- | --- | --- |
| GPT-5.5 (\\(5 / \\)30) | 3.6M × \\(5/1M = \\)18.00 | 0.36M × \\(30/1M = \\)10.80 | **$28.80** | $1,498 |
| GPT-5.5 Pro (\\(30 / \\)180) | $108.00 | $64.80 | **$172.80** | $8,986 |
| GPT-5.4 (\\(2.50 / \\)15) | $9.00 | $5.40 | **$14.40** | $749 |
| GPT-5-Codex (\\(1.25 / \\)10) | $4.50 | $3.60 | **$8.10** | $421 |
| GPT-5.1-Codex-mini (\\(0.25 / \\)2) | $0.90 | $0.72 | **$1.62** | $84 |

**Reading the table:** The headline GPT-5.5 sticker shock disappears at this volume — under $1,500/year for 30 engineers' worth of automated review is a rounding error against engineering payroll. GPT-5.5 Pro is 6× more expensive and generally not justified for routine review; reserve it for the small share of reviews where you need its extra capability. The Codex-specific models are dramatically cheaper and are the right default if your reviews are mostly mechanical (style, obvious bugs, missing tests).

**What this example does not capture:**

- **Cached input.** OpenAI prices repeated input tokens lower; if your review pulls the same context files repeatedly, real costs are lower than shown.
- **Long-task overhead.** Agentic workflows that re-read files or iterate burn many more tokens than a single-shot review. A coding task can easily be 5–10× the tokens of a review.
- **Failure retries.** A failed task that gets re-run costs roughly the same as the original. Agent flakiness is a real budget line item.
- **Mixed-model strategies.** Most mature teams route cheap tasks (test stubs, doc updates) to a Codex-mini model and reserve GPT-5.5 for repository-wide refactors and PRs that need long-context reasoning.

The practical pattern: build the cost model around your actual highest-volume workload (usually PR review or test generation), then size the GPT-5.5 budget separately for the smaller set of tasks that actually benefit from the new capabilities.

---

## Section 8: Security, Permissions, and Enterprise Setup

Teams care about Codex not just as a productivity tool, but as a controlled software-development system. OpenAI's docs reflect that reality.

### Local vs Cloud Access

Enterprise admins can separately enable:

- Codex Local
- Codex Cloud
- Both

Codex Local covers the app, CLI, and IDE extension. Codex Cloud covers hosted tasks, code review, and related integrations.

That separation is useful because some organizations want local tooling enabled broadly while keeping cloud tasks restricted to fewer users.

### Workspace Controls

The admin docs say workspace owners can use RBAC to manage access. They can:

- Set a default role.
- Create custom roles.
- Assign roles to groups.
- Sync groups with SCIM.
- Manage permissions centrally.

This is the right place to build a rollout with least privilege rather than giving every developer broad Codex access by default.

### GitHub Connector and Repository Access

Codex Cloud requires GitHub-hosted repositories. Admins connect the ChatGPT GitHub Connector, choose an installation target, and allow specific repositories. Codex uses short-lived, least-privilege GitHub App tokens and respects repository permissions and branch protection rules.

For security teams, that matters because it keeps Codex aligned with the repo access model you already use.

### Internet Access

By default, Codex cloud agents do not have internet access at runtime. That is deliberate. If your task truly needs access to dependency registries or trusted sites, admins can configure allowlists and HTTP method limits.

### Recommended Governance Pattern

The enterprise docs recommend using separate groups for users and admins:

- A smaller Codex Admin group for people who manage policy and governance.
- A broader Codex Users group for developers who just need to use the tool.

That keeps policy management tight and avoids accidental over-permissioning.

---

## Section 9: Best Practices for Teams

If you are onboarding a team, you will get much better outcomes if you set expectations up front.

### Start With Simple, Valuable Tasks

Good first-team use cases:

- Pull request review.
- Small bug fixes.
- Test generation.
- Documentation updates.
- Codebase navigation and understanding.

These are easy to compare against human work and easy to judge for quality.

### Standardize Task Prompts

Give people a shared prompt template. For example:

```md title="prompt"
Task: Fix the failing test in X.
Context: The regression started after Y.
Constraints: Do not change public API behavior.
Output: Explain root cause, apply fix, run tests, summarize risks.
```

This makes results easier to review and reduces the "prompt quality lottery" that often hurts team adoption.

### Use a Review Culture

Codex should not replace code review discipline. Treat it as:

- A first-pass implementer.
- A pre-review reviewer.
- A way to reduce repetitive work.

The human team should still own architecture, product tradeoffs, and final sign-off.

### Measure What Matters

The metrics that matter are the ones that tell you whether Codex is producing reviewable, mergeable, trustworthy work — not the ones that count activity. Below is each metric, **how to actually compute it from data you already have**, and the rule of thumb for what "healthy" looks like.

#### 1. Time to First Useful Diff

**Definition:** From the moment a Codex task is started, how long until it produces a diff that a human would actually consider applying (after possible small tweaks).

**How to measure:**

- For CLI/IDE tasks, log the wall-clock time from prompt submission to first diff. The Codex CLI emits structured logs you can parse; a simple wrapper script suffices:
    
    ```sh
    start=\((date +%s); codex "<prompt>"; echo "elapsed: \)(( $(date +%s) - start ))s"
    ```
- For Codex Cloud tasks, use the task duration shown in the chatgpt.com/codex dashboard, or pull it from the workspace usage export.
- Tag each task as "useful" or "discarded" in a shared spreadsheet for the first month. After that, you can sample.

::: note Healthy

under 2 minutes for bounded tasks; under 10 minutes for multi-file refactors. If the median is much higher, your prompts probably lack context (see [Section 5](#section-5-how-to-use-codex-effectively)).

#### 2. Test Pass Rate on Codex-Generated Changes

**Definition:** Of the diffs Codex produces, what percentage pass the existing test suite on the first try.

**How to measure:**

- In CI, tag PRs that originated from Codex (a label like `codex-authored` or a commit-message prefix works). Then run a simple weekly query:
    
    ```sql
    SELECT
      COUNT(*) FILTER (WHERE first_ci_run = 'pass') * 100.0 / COUNT(*) AS first_try_pass_rate
    FROM pull_requests
    WHERE labels @> '{"codex-authored"}'
      AND created_at > NOW() - INTERVAL '7 days';
    ```
- For local CLI usage, instrument with a wrapper that runs your test command immediately after Codex finishes and records the exit code.

::: note Healthy

above 75% for bounded tasks. Below 50% means Codex is making changes without verifying them — usually fixable by adding "run the tests after" to your prompt template (see [Section 9 → Standardize Task Prompts](#standardize-task-prompts)).

#### 3. Review Findings Caught by Codex

**Definition:** When Codex is used as a pre-merge reviewer, how many issues does it surface that a human reviewer or CI would have caught anyway, vs. issues only Codex caught, vs. false positives.

**How to measure:**

- Have human reviewers annotate Codex's review comments with one of three tags: `agree-found-it`, `agree-missed-it`, `disagree-noise`.
- Track the ratios over time:
  - **Useful-finding rate** = (`agree-found-it` + `agree-missed-it`) / total Codex comments.
  - **Unique-value rate** = `agree-missed-it` / total Codex comments.
- A simple GitHub Actions step that posts the Codex review and asks the human reviewer to react with emoji (✅ / ⚠️ / ❌) makes this nearly free to collect.

::: note Healthy

seful-finding rate above 70%; unique-value rate above 20%. Unique-value rate is the number that justifies keeping the workflow on — if it is near zero, Codex is duplicating CI and you can disable it without losing anything.

:::

#### 4. Tasks Completed Without Human Rewrite

**Definition:** Of all merged Codex-authored changes, what fraction shipped substantially as Codex wrote them (vs. being heavily rewritten by a human before merge).

**How to measure:**

- Compare the diff Codex initially produced to the diff that actually merged. The simplest proxy:

```sh
# in the Codex-authored branch:
git diff codex/initial-commit HEAD --shortstat
```

If the post-Codex diff changes more than ~30% of the lines Codex originally wrote, count the task as "rewritten."

- Track this monthly. The trend line matters more than the absolute number.

::: note Healthy

above 60% shipped without major rewrite. Lower than that, and either prompts are under-specified or Codex is being pushed into work it is bad at — re-read [Section 14](#section-14-when-not-to-use-codex).

:::

#### 5. Developer Satisfaction

**Definition:** Whether the people actually using the tool think it makes them faster and want to keep using it. Hard numbers do not capture this.

**How to measure:**

- Run a 5-question pulse survey monthly. Keep it short. Suggested questions, all on a 1–5 scale:
    1. "Codex saved me time this week."
    2. "I trust Codex's diffs enough to review them confidently."
    3. "Codex's review comments are usually worth reading."
    4. "I would be unhappy if Codex were taken away."
    5. "What is the single biggest friction point?" (free text)
- Track the **trend in question 4** specifically. That is the closest equivalent to a product-market-fit signal for an internal tool.

::: note Healthy

average score above 3.5/5 on questions 1–4 by month 3 of rollout. If question 4 trends down, the rollout is failing regardless of what the other metrics say.

:::

#### What NOT to Measure

These look useful but mislead:

- **Number of prompts sent.** Counts activity, not value. A team sending 10× more prompts may be 10× more productive — or 10× more confused.
- **Tokens consumed.** Useful for budget, useless for impact. Heavy users are not necessarily good users.
- **Lines of code generated.** Same problem as LOC has always had: you reward verbosity.
- **PRs opened by Codex.** A Codex-opened PR that nobody merges is a negative outcome dressed up as a positive one.

Use the cost data ([Section 7](#section-7-pricing-and-plan-access)) to manage budget. Use the metrics above to manage adoption.

### Use the Right Surface for the Job

- CLI for terminal-heavy local work.
- IDE extension for day-to-day coding.
- App for parallel project work.
- Cloud for background tasks and review.

That is usually the difference between "this is useful" and "this is annoying."

---

## Section 10: Common Workflows and Examples

Here are the workflows most teams will actually use. Each one includes a **worked example** against the `codex-demo` repo from [Section 4](#section-4-getting-started-install-set-up-and-your-first-task) so you can see the full prompt, the kind of output Codex produces, and what to do with it.

### Workflow 1: Fix a Bug Locally

**Use when:** A test is failing, a behavior is wrong, and the cause is contained to one file or function.

**Steps:**

1. Open the repo in your terminal or IDE.
2. Ask Codex to inspect the failing path.
3. Request a fix and a test.
4. Review the diff.
5. Run the test suite.

::: tip Worked example

In the `codex-demo` repo, suppose a teammate just reported: *"*`apply_discount` *is silently returning a negative price when discount_percent is greater than 100."* Verify the bug first:

```sh
python -c "from pricing import apply_discount; print(apply_discount(100, 150))"
# prints: -50.0    <-- silent negative price, no error raised
```

Now launch Codex and run:

```md title="prompt"
Bug: apply_discount(100, 150) returns -50.0 instead of raising an error.
Expected: discount_percent values above 100 should raise ValueError with
the message "discount_percent must be between 0 and 100".

Task:
- Add the validation in pricing.py.
- Add a test in test_pricing.py that asserts ValueError is raised for
  discount_percent=150.
- Keep the existing tests passing.
- Run pytest at the end and report the result.
```

:::

**What you get back:** a diff that adds `if discount_percent > 100: raise ValueError(...)` in `apply_discount`, a new `test_invalid_discount_percent_above_100` test, and the pytest output showing all four tests passing. Review with `git diff`, run `python -m pytest` yourself to confirm, then `git commit -am "Reject discount_percent > 100"`.

This works best when the bug is bounded and reproducible. If you cannot reproduce it from the command line, Codex usually cannot either.

### Workflow 2: Review a Pull Request

**Use when:** You (or a teammate) just made a change and want a fast pre-merge sanity check before opening it for human review.

**Steps:**

1. Point Codex at the PR or changed files.
2. Ask for correctness issues, missing tests, and security risks.
3. Compare the findings against human review.
4. Use Codex as a pre-filter before the broader team reviews.

::: tip Worked example

After completing Workflow 1 above, ask Codex to review your own change before opening a PR:

```md title="prompt"
Review the change in my last commit (HEAD) — it added validation to
apply_discount in pricing.py.

Look for:
- correctness issues (off-by-one on the boundary, wrong error type, etc.)
- missing tests (boundary cases like exactly 100, exactly 0, NaN, negative zero)
- security or robustness issues
- API consistency with the existing apply_discount validation style

Prioritize findings as CRITICAL / IMPORTANT / NIT and propose a concrete
fix for each. Do not modify any files in this turn.
```

:::

**What you might get back:**

```md title="prompt"
IMPORTANT: line 14 — the new validation rejects discount_percent > 100 but
  silently allows discount_percent == 100, which makes the price 0. That is
  technically valid but worth a test to lock the boundary. Add:
    test_apply_discount_at_boundary_100_returns_zero

NIT: the new error message says "between 0 and 100" but the existing check
  for negative values says "must be >= 0". Consider unifying the messages
  for consistency.
```

You apply the IMPORTANT fix (often by following up with: *"apply the IMPORTANT fix from your review"*), defer or accept the nit, and re-run tests.

This is one of the highest-leverage team workflows because it catches obvious problems before a human spends review time on them. See [Section 9 → Measure What Matters → Review Findings Caught by Codex](#3-review-findings-caught-by-codex) for how to track its actual value over time.

### Workflow 3: Understand a Large Codebase

**Use when:** You are new to a repo (or returning after months away) and need a map before you can safely make changes.

**Steps:**

1. Ask Codex to trace a request flow.
2. Ask for the key modules and entry points.
3. Request a map of the code path before editing anything.

::: tip Worked example

The `codex-demo` repo is too small to need this, so imagine a more realistic case: a teammate's repo with `app/`, `services/`, `models/`, `api/`, and 80 files you have never seen. Open the repo in Codex and run:

```md title="prompt"
I am new to this codebase. Without modifying anything, give me an
orientation:

1. What is the entry point for the HTTP API?
2. Trace what happens when a POST hits /users — list every file the
   request touches in order, with a one-line description of each.
3. Where is database access centralized? Is there a repository pattern?
4. What test command should I run to verify any change I make?
5. What are the three files I should read first to understand the
   project's conventions?

Output as a structured markdown report.
```

:::

**What you get back:** a markdown report you can paste into your notes. Read the recommended files, then start working with Codex on actual changes. The 10 minutes spent on this orientation typically saves an hour of confused refactoring later.

This workflow is particularly useful for new hires. A senior engineer can also use it the first time they touch an unfamiliar service to avoid breaking conventions they cannot see.

### Workflow 4: Generate a Feature in Parallel

**Use when:** A feature naturally splits into independent pieces (API + tests + docs, or UI + backend + migration) that do not block each other.

**Steps:**

1. Break the work into subtasks.
2. Run separate Codex tasks for UI, API, tests, or docs.
3. Merge the outputs after review.

::: tip Worked example:

Add a new "loyalty discount" capability to `codex-demo`. The work splits into three pieces that do not depend on each other:

| Subtask | Surface | Prompt |
| --- | --- | --- |
| **A. Implementation** | CLI in terminal 1 | "Add a `loyalty_discount(price, customer_tier)` function to <VPIcon icon="fa-brands fa-python"/>`pricing.py`. Tiers are 'bronze' (0%), 'silver' (5%), 'gold' (10%). Reject unknown tiers with ValueError. Do not change any other function." |
| **B. Tests** | Codex Cloud | "Generate exhaustive tests in <VPIcon icon="fa-brands fa-python"/>`test_pricing.py` for a function `loyalty_discount(price, customer_tier)` with tiers bronze/silver/gold. Cover: each tier, unknown tier, negative price, zero price, decimal prices. Do not modify pricing.py — assume the function will exist." |
| **C. Docs** | VS Code extension | "Add a section to README.md documenting the new loyalty_discount function: signature, tier table, and one usage example." |

Each runs in parallel. When all three finish, merge the diffs (typically the implementation goes first, then tests verify against it, then docs reference what shipped). Review each independently.

The Codex app and cloud surfaces are especially good for this because they let you launch and monitor multiple tasks without juggling terminal windows. The CLI also supports parallel work, but it benefits from `git worktree` so each run operates on its own branch checkout.

:::

### Workflow 5: Use Subagents for Decomposition

**Use when:** A single task is too large for one Codex run but can be naturally split into investigate / plan / implement phases.

The CLI explicitly supports subagents — one Codex task that spawns child tasks, each with a narrower scope and its own context window.

::: tip Worked example

A bug report says: *"Cart totals are sometimes off by a penny for European currencies."* You do not yet know if this is a rounding bug, a currency-conversion bug, or a data bug. Run a parent task that decomposes:

```md title="prompt"
A bug report says cart totals are occasionally off by a penny for
European currencies.

Decompose this into three subagent tasks:

1. INVESTIGATE: Read pricing.py and any currency-related code. Identify
   every place where floating-point arithmetic touches a money value.
   Report findings without proposing fixes.

2. REPRODUCE: Write a failing test in test_pricing.py that demonstrates
   a one-cent discrepancy with EUR amounts. Use the smallest possible
   reproduction.

3. PROPOSE: Based on (1) and (2), propose two possible fixes (e.g.,
   switching to Decimal vs. rounding at the boundary) with the trade-offs
   of each. Do not implement either yet.

Wait for me to pick a fix before writing any production code.
```

:::

**Why subagents help:** each child task has a clean context, so the investigation findings do not pollute the test-writing context, and the proposal task gets a clean view of both. You also get a natural human checkpoint between investigation and implementation.

That division is often faster than one giant all-purpose run, and dramatically more reviewable.

### Prompt Cookbook

New users often ask for examples because they know what they want outcome-wise but not how to phrase it. These templates are a good starting point.

#### Bug Fix Template

```md title="prompt"
Inspect the failing behavior in [file or module].
Identify the root cause.
Patch the smallest safe fix.
Add or update tests.
Summarize what changed and any edge cases I should watch.
```

Use this when the bug is narrow and you want a disciplined fix, not a redesign.

#### Refactor Template

```md title="prompt"
Refactor [module] to improve readability and maintain the current behavior.
Keep external APIs stable.
Explain the refactor plan before editing.
Make the smallest set of changes that achieves the goal.
```

Use this when the code works but is hard to maintain.

#### Review Template

```md title="prompt"
Review this change for correctness, missing tests, security issues, and maintainability risks.
Prioritize findings by severity.
Call out any behavior changes or ambiguous logic.
```

Use this when you want Codex to act like a pre-merge reviewer.

#### Feature Template

```md title="prompt"
Implement [feature] in [file or subsystem].
List the files you expect to touch before changing anything.
Add tests.
Keep the implementation aligned with the current architecture.
```

Use this when the task spans multiple files and you want visibility into the plan.

### Signs You Are Using Codex Well

You usually know the workflow is healthy when:

- Codex makes small, reviewable diffs instead of broad rewrites.
- The model asks for clarification only when the missing detail matters.
- Test coverage improves along with functionality.
- New developers can use the tool without needing a custom training session.
- The time from prompt to merged change is lower, but review quality does not drop.

You usually know the workflow is unhealthy when:

- Prompts are vague and every result needs heavy rework.
- The team treats the first output as final.
- Nobody is checking diffs or running tests.
- Users keep asking for "make it better" instead of defining a clear target.

Those signals matter more than raw usage counts.

---

## Section 11: Model Specs and Benchmarks (GPT-5.5 Deep Dive)

[Section 2](#section-2-where-codex-fits-in-the-openai-ecosystem) introduced GPT-5.5 as the new general flagship and gave the three-bullet practical takeaway. This section is the deep dive: the published benchmark numbers, what each one actually measures, why it matters for Codex workloads specifically, and how to use those numbers to pick the right model per task.

If you are setting budgets or choosing default models for a team, read this section in full. If you just want to use Codex, you can skim it.

### Why Benchmarks Matter for Model Selection

Codex lets you pick the model behind each surface. Picking well is mostly about matching the model's strengths to the task shape:

- A **bounded local edit** (one file, one function) does not benefit much from a frontier model. Codex-specific or Codex-mini variants are usually the right call.
- A **repository-wide refactor** that needs the model to keep many files in working memory benefits enormously from long-context performance.
- An **agentic cloud task** that runs unattended for ten minutes benefits from low hallucination rates and strong tool-use behavior.
- A **PR review** benefits from low hallucination rates above almost everything else — a confident-but-wrong review comment costs more than a missed real issue.

The benchmarks below tell you which model best matches each shape.

### GPT-5.5 Performance Highlights

The published benchmarks position GPT-5.5 as a meaningful jump over GPT-5.4, particularly on agentic and long-context work — the workloads most relevant to Codex users.

- **Knowledge work (GDPval)** — **84.9%**. GDPval evaluates whether a model can produce well-specified knowledge-work output across 44 occupations. This is the headline general-capability number.
- **Computer use (OSWorld-Verified)** — **78.7%**. Measures whether the model can drive a real computer environment end-to-end. Directly relevant to Codex Cloud sandboxes and agentic CLI runs.
- **Coding (Terminal-Bench 2.0)** — **82.7%**. A terminal-centric coding benchmark with long-context retrieval and computer-use components. The closest public proxy for Codex CLI workloads.
- **Customer-service workflows (Tau2-bench Telecom)** — **98.0%** without prompt tuning. Indicates strong tool-use and policy-adherence behavior straight out of the box.
- **Long-context retrieval (MRCR v2 at 1M tokens)** — **74.0%**, up from **36.6%** on GPT-5.4. This is the largest single jump in the report and the most important one for repository-scale Codex tasks where the model must keep many files in working memory.
- **Hallucination rate** — independent coverage reports a roughly **60% reduction in hallucinations** versus prior generations, which materially changes the trust calculus for review and PR-feedback workflows.

### What Each Benchmark Actually Measures

Benchmarks are easy to misread. Quick definitions of the ones cited above:

- **GDPval** — Asks the model to produce specified knowledge-work output across 44 occupations (legal memos, financial summaries, technical documentation, etc.). A high score means the model can produce structured, well-specified output reliably. Use as a general-capability signal, not a coding-specific one.
- **OSWorld-Verified** — Tasks the model with operating a real desktop environment to complete real workflows (open files, navigate UIs, run commands). High scores predict the model will behave well in agentic sandboxes that mimic a developer's desktop.
- **Terminal-Bench 2.0** — A terminal-driven coding benchmark with long-context retrieval and computer-use components. The closest public proxy for what Codex CLI actually does day to day.
- **Tau2-bench Telecom** — Evaluates complex customer-service-style workflows that require following policies and using tools correctly. A proxy for "does the model do what you told it without going off-script."
- **MRCR v2 at 1M tokens** — A long-context retrieval benchmark. Tests whether the model can find and use information across a full 1M-token context window. The single best predictor of behavior on repository-scale Codex tasks where many files must be kept in working memory.

### Practical Guidance for Codex Users

Translate the benchmarks into model choice:

- **Repository-wide tasks** (cross-file refactors, multi-module migrations): GPT-5.5. The MRCR v2 jump is the single best signal that it will behave better on large codebases than GPT-5.4 did.
- **Cheap, bounded local edits** (single function, single test, doc tweak): GPT-5.4 or a Codex-specific model. The cost/latency tradeoff is much better and the capability headroom is wasted on small tasks. Do not default everything to GPT-5.5 just because it is newest.
- **Agentic cloud tasks** (background sandbox runs, multi-step workflows): GPT-5.5. The OSWorld-Verified score and lower hallucination rate are the relevant signals — fewer broken sandbox runs and fewer confidently-wrong outputs.
- **PR review and code review workflows**: GPT-5.5. The 60% hallucination drop is the single most important number for review work; a noisy reviewer trains the team to ignore the reviewer.
- **Most expensive workloads** (anything that approaches GPT-5.5 Pro pricing): keep GPT-5.5 Pro reserved for the small set of tasks where its extra capability is justified — typically deeply novel reasoning or extreme long-context work.

### For Procurement: Treat GPT-5.5 as a Separate Budget Line

Token consumption on agentic tasks is dominated by output. GPT-5.5 outputs are substantially more expensive than GPT-5.4 outputs. Concretely:

- Mixed-model strategies are now the rule, not the exception. Most mature teams route routine work to a Codex-mini model and reserve GPT-5.5 for repository-wide and review-heavy work.
- The [worked cost example in Section 7](#worked-cost-example) shows the 30-engineer PR-review case across all five model tiers. Read it before approving a budget.
- Re-check pricing every quarter. The rate card has changed in the past and will change again.

### Verify Before Quoting

The numbers in this section come from OpenAI's launch documentation and contemporaneous press coverage. Before they go into a procurement deck or a public document, verify against the official OpenAI announcement and the model page — see [Section 16: Source References](#section-16-source-references). Benchmarks get re-run; numbers shift with eval methodology changes.

---

## Section 12: Troubleshooting

Even good tools fail if the setup is wrong. Here are the most common issues.

### "Codex is not installed"

Check:

- You ran `npm i -g @openai/codex`.
- You are using a supported shell and runtime.
- The binary is on your path.

### "I cannot sign in"

Check:

- Your ChatGPT account has the right plan.
- Your workspace allows Codex local or cloud use.
- You are signing in with the correct account.

### "Windows is behaving badly"

The CLI docs say Windows support is experimental. If you are on Windows, the best supported path is to use WSL for the CLI or use the Codex app where appropriate.

### "Cloud task cannot see my repo"

Check:

- The GitHub connector is installed.
- The repository is allowed in the connector.
- Your organization admin has enabled Codex cloud.
- You are using a GitHub-hosted repository.

### "Codex will not browse the internet"

That is expected by default in cloud mode. Ask your admin whether internet access has been intentionally restricted.

### "The result is technically correct but not what I wanted"

Usually this means the prompt was under-specified. Tighten:

- The target file or feature.
- The acceptance criteria.
- The constraints.
- The expected output format.

---

## Section 13: FAQ

### Is Codex a chat model?

Not exactly. It is a coding agent and product surface built to work on repositories, tests, code review, and multi-step software tasks.

### Can I use Codex without switching tools all the time?

Yes. That is one of its strengths. You can use the CLI, IDE extension, or Codex app depending on your workflow.

### Do I need the cloud features?

No. Many individual users will get value from the local CLI or IDE extension alone. Cloud tasks become more valuable as soon as you want background execution, parallelism, or automated review.

### Is Codex only for professional engineers?

No, but it is most useful when the user can evaluate code changes and understand a repository. It is a developer tool first.

### Is Codex the same as GPT-5.4?

No. GPT-5.4 is a model. Codex is the coding product/workflow. Codex may use different models depending on the surface and configuration.

### What is the safest way to start?

Use the CLI or IDE extension in a small repo change, keep the approval mode conservative, and review every diff before merging.

---

## Section 14: When NOT to Use Codex

Most of this handbook is affirmative — Codex is good at this, Codex fits here, here is how to set it up. That framing risks creating the impression that Codex is the right tool for any coding-adjacent task. It is not. The fastest way to lose team trust in an AI coding tool is to push it into work it is bad at. The following is an honest list of where Codex is a poor fit today.

### Tasks With No Reviewable Output

Codex's value depends on a human reviewing the diff, the test result, or the explanation. If the task produces something nobody will check — a one-off script that touches production data, an exploratory query whose result drives a decision before anyone reads the SQL — the AI's confidence becomes the only quality gate. That is a bad position to be in regardless of model quality. Either add a review step or do the task yourself.

### Highly Novel Architecture Decisions

Codex is good at applying patterns. It is much weaker at choosing which pattern fits a problem the team has not solved before. Expect it to confidently generate plausible-but-wrong architecture for genuinely new domains: a new pricing model, a new auth boundary, a new event-sourcing scheme. Use it to prototype options, not to decide between them.

### Work That Crosses Org Boundaries

Codex sees the repository it has access to. It does not see the cross-team contracts, the deprecation calendar in the platform team's roadmap, the half-finished migration in another repo, or the political reasons one approach is off-limits. For changes that span multiple teams or services, Codex can implement individual pieces, but a human still needs to own the cross-cutting plan.

### Anything Touching Live Production State

Codex Cloud sandboxes are good. They are not a substitute for human approval before a production change. Database migrations, infrastructure-as-code that mutates real resources, secret rotation, customer-data scripts — these need a human in the approval path even if Codex wrote the diff. The fact that Codex can run commands does not mean it should run those commands.

### Compliance- and Safety-Critical Code

Code that lives inside a regulated boundary (payments, medical, security primitives, model-evaluation harnesses for safety) has higher review and provenance requirements than typical product code. Codex output is fine as a starting draft, but the review burden is the same as for any third-party-authored code, which usually means the speed advantage shrinks substantially. Plan for that or keep these areas Codex-free.

### Tasks Where the Real Bottleneck Is Knowledge, Not Typing

If the team is stuck because nobody understands the legacy system, the failing test, or the weird customer report, generating more code rarely helps. Codex can accelerate the implementation once you know what to do. It cannot replace the discovery and design conversation that should happen first. Teams that skip the discovery step and go straight to "ask Codex" tend to ship the wrong thing fast.

### Anything Where Hallucinations Have High Cost

GPT-5.5 dropped hallucination rates by roughly 60% versus prior generations, which is a real improvement. It is not zero. Tasks where a confident-but-wrong output causes real damage — generating regulatory citations, copying API contract details from a doc the model hasn't actually read, asserting facts about an unfamiliar third-party library — still need the same skepticism you would apply to any AI output. Use search-grounded workflows or human verification for these.

### Quick Heuristic

If you can answer all four of these with "yes," Codex is likely a good fit:

1. Can the output be reviewed by someone who would catch a mistake?
2. Is the task a known pattern, not a novel architecture decision?
3. Is the blast radius local to one repository or service?
4. Is the cost of a bad output bounded (e.g., a failed test, a reverted commit) rather than unbounded (e.g., production data loss, regulatory exposure)?

If any of those are "no," either restructure the task to make them "yes" or keep the work outside Codex.

---

## Section 15: Final Recommendations

If you are rolling Codex out to new users, I would keep the guidance very simple:

1. Start with the CLI or IDE extension.
2. Use one small task to learn the tool.
3. Review every change before merging.
4. Move to cloud tasks only after users trust the local workflow.
5. For teams, separate user access from admin access.
6. Re-check pricing whenever your plan or workspace changes.

Codex is most valuable when it is treated as a disciplined engineering tool rather than a novelty. If you give it real code, clear constraints, and a review culture, it can accelerate the boring parts of software development and make bigger tasks easier to break down.

### The LUNARTECH Fellowship: Bridging Academia and Industry

Addressing the growing disconnect between academic theory and the practical demands of the tech industry, the LUNARTECH Fellowship was created to bridge this talent gap.

Far too often, aspiring engineers are caught in the “no experience, no job” loop, graduating with theoretical knowledge but unprepared for the messy reality of production systems.

To combat this systemic issue and halt the resulting brain drain, the Fellowship invests heavily in promising individuals, offering a transformative environment that prioritizes hands-on experience, mentorship, and real-world engineering over traditional degrees.

This 6-month, remote-first apprenticeship serves as an immersive odyssey from aspiring talent to AI trailblazer. Rather than paying to learn in isolation, Fellows work on live, high-stakes AI and data products alongside experienced senior engineers and founders. By tackling actual engineering challenges and building a concrete portfolio of production-ready work, participants acquire the job-ready skills needed to thrive in today’s competitive landscape.

If you are ready to break the loop and accelerate your career, you can explore these opportunities and start your journey here:

<SiteInfo
  name="Our Careers - LUNARTECH"
  desc="Build your career with LunarTech. Join a team that values innovation, collaboration, and impact, and be a part of the next wave of tech innovation."
  url="https://lunartech.ai/our-careers/"
  logo="https://cdn.prod.website-files.com/670b041cc58f983b09ee069a/670ede9d09e0aca173941bfb_lunartech-icon.png"
  preview="https://cdn.prod.website-files.com/670b041cc58f983b09ee069a/67373fc658ffe6cd94357eee_Black%20and%20White%20Simple%20Minimalist%20Futuristic%20Gaming%20YouTube%20Banner(1).png"/>

### Master Your Career: The AI Engineering Handbook

For those ready to transition from theory to practice, we have developed [<VPIcon icon="fas fa-globe"/>The AI Engineering Handbook: How to Start a Career and Excel as an AI Engineer](https://lunartech.ai/download/the-ai-engineering-handbook). This comprehensive guide provides a step-by-step roadmap for mastering the skills necessary to thrive in the transformative world of AI in 2026. Whether you are a developer looking to break into a competitive field or a professional seeking to future-proof your career, this handbook offers proven strategies and actionable insights that have already empowered countless individuals to secure high-impact roles.

Inside, you will explore real-world industry workflows, advanced architecting methods, and expert perspectives from leaders at companies like NVIDIA, Microsoft, and OpenAI. From discovering the technology behind ChatGPT to learning how to architect systems that transform research into world-changing products, this eBook is your ultimate companion for career acceleration. You can [<VPIcon icon="fas fa-globe"/>download your free copy](https://lunartech.ai/download/the-ai-engineering-handbook) and start mastering the future of AI.

---

## Section 16: Source References

Official OpenAI sources used for this handbook:

- [<VPIcon icon="iconfont icon-openai"/>Introducing GPT-5.5 (OpenAI)](https://openai.com/index/introducing-gpt-5-5/)
- [<VPIcon icon="iconfont icon-openai"/>Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-codex-in-chatgpt-faq)
- [<VPIcon icon="iconfont icon-openai"/>Flexible pricing for the Enterprise, Edu, and Business plans](https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-team-plans)
- [<VPIcon icon="iconfont icon-openai"/>All models](https://developers.openai.com/api/docs/models/all)
- [<VPIcon icon="iconfont icon-openai"/>OpenAI API models overview](https://developers.openai.com/api/docs/models)
- [<VPIcon icon="iconfont icon-openai"/>GPT-5-Codex model](https://developers.openai.com/api/docs/models/gpt-5-codex)
- [<VPIcon icon="iconfont icon-openai"/>GPT-5.2-Codex model](https://developers.openai.com/api/docs/models/gpt-5.2-codex)
- [<VPIcon icon="iconfont icon-openai"/>codex-mini-latest model](https://developers.openai.com/api/docs/models/codex-mini-latest)
- [<VPIcon icon="iconfont icon-openai"/>Codex use cases](https://developers.openai.com/codex/use-cases)
- [Claude overview](https://docs.anthropic.com/en/docs/overview)
- [GitHub Copilot documentation](https://docs.github.com/en/copilot/)
- [<VPIcon icon="iconfont icon-openai"/>Codex enterprise admin setup](https://developers.openai.com/codex/enterprise/admin-setup)
- [<VPIcon icon="iconfont icon-openai"/>Codex IDE extension docs](https://developers.openai.com/codex/ide)
- [Codex – OpenAI's coding agent (VS Code Marketplace listing)](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)
- [<VPIcon icon="iconfont icon-openai"/>Codex web (cloud) docs](https://developers.openai.com/codex/cloud)
- [<VPIcon icon="iconfont icon-openai"/>Codex CLI docs](https://developers.openai.com/codex/cli)
- [<VPIcon icon="iconfont icon-openai"/>Codex CLI command-line reference](https://developers.openai.com/codex/cli/reference)
- [<VPIcon icon="iconfont icon-openai"/>Codex CLI features](https://developers.openai.com/codex/cli/features)
- [<VPIcon icon="iconfont icon-openai"/>Codex quickstart](https://developers.openai.com/codex/quickstart)
- [<VPIcon icon="iconfont icon-openai"/>Using Codex with your ChatGPT plan (Help Center)](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)

Press coverage of the GPT-5.5 release referenced in [Section 2](#section-2-where-codex-fits-in-the-openai-ecosystem) and [Section 11](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive):

- [OpenAI releases GPT-5.5, bringing company one step closer to an AI 'super app' (TechCrunch)](https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/)
- [OpenAI launches GPT-5.5, calling it "a new class of intelligence" (The New Stack)](https://thenewstack.io/openai-launches-gpt-5-5-calling-it-a-new-class-of-intelligence/)
- [OpenAI's GPT-5.5 benchmarks show a 60% hallucination drop and coding skills that rival senior engineers (Startup Fortune)](https://startupfortune.com/openais-gpt-55-benchmarks-show-a-60-hallucination-drop-and-coding-skills-that-rival-senior-engineers/)

---

## Appendix A: 30-60-90 Day Adoption Plan

If you are introducing Codex to a team, the fastest way to create trust is to phase adoption instead of rolling it out as a big-bang change. A staged plan also helps you discover where the real friction lives: authentication, permissions, prompt quality, review habits, or budget assumptions.

### First 30 Days: Prove Value

In the first month, the goal is not maximum usage. The goal is repeatable wins.

Recommended actions:

1. Pick one or two engineers who are comfortable trying new tools.
2. Restrict usage to small, low-risk tasks such as bug fixes, test generation, and documentation updates.
3. Standardize a short prompt template so every request includes task, context, constraints, and expected output.
4. Require human review for every change.
5. Track the time it takes to go from prompt to merged diff.

What you should learn in this phase:

- Does Codex understand your codebase structure?
- Are the diffs reviewable?
- Does the approval flow slow people down in a useful way, or in a frustrating way?
- Which classes of tasks work well, and which ones need more guidance?

If the first month is noisy, do not blame the model first. Usually the issue is task scope, missing context, or unclear acceptance criteria.

### Days 31-60: Expand Carefully

Once the tool has proven itself on a handful of tasks, expand to a broader pilot group.

Recommended actions:

1. Add more developers from different parts of the stack.
2. Include at least one person who is skeptical, because their feedback will reveal weak spots.
3. Try the app, CLI, and IDE extension in parallel so people can choose the workflow that matches their habits.
4. Introduce Codex cloud for one or two background tasks or pull request reviews.
5. Start documenting prompts that worked well, including examples of high-quality follow-up instructions.

What you should learn in this phase:

- Which surfaces are actually sticky for the team?
- Where does Codex save the most time?
- Do people trust the output enough to delegate real work?
- Are you seeing the same mistakes repeatedly?

At this stage, your internal documentation matters. A short "how we use Codex here" page is often more useful than another technical deep dive.

### Days 61-90: Operationalize

After about three months, your objective should shift from experimentation to operating practice.

Recommended actions:

1. Assign ownership for workspace settings, GitHub connector setup, and model access.
2. Define which tasks should stay local and which can go to cloud sandboxes.
3. Document your review standards for Codex-generated diffs.
4. Set budget expectations with the team so no one is surprised by token-heavy tasks.
5. Add Codex to onboarding for new engineers, starting with one simple flow.

What good looks like at this stage:

- New hires can use Codex on day one.
- Team members know when to reach for Codex and when to use a different workflow.
- Admins can answer access and pricing questions quickly.
- The organization has a realistic picture of the tool's strengths and limits.

### A Practical Onboarding Script

If you need a ready-made orientation for a new user, use this:

1. "Install the CLI or extension."
2. "Open a repository you know well."
3. "Ask Codex to make one small, safe change."
4. "Review the diff line by line."
5. "Run the tests."
6. "Ask Codex to explain what it changed and why."
7. "Repeat with a slightly larger task."

That sequence teaches the core loop: context, task, change, review, verify. Once a user understands that loop, the rest of the product family becomes much easier to adopt.

---

## Appendix B: Glossary

Terms used in this handbook, in alphabetical order. The list is intentionally narrow — only terms that appear in the body and are likely to be unfamiliar to a non-engineering reader (procurement, security, leadership) are defined here.

- **Agent / agentic workflow.** Software that can take a goal, plan steps, take actions (read files, run commands, call APIs), observe the result, and iterate. Codex is an agentic coding workflow; a chatbot is not.
- **Approval mode.** A Codex setting that controls how much the agent can do without asking. Stricter modes prompt the human before running shell commands or modifying files; permissive modes let the agent work uninterrupted.
- **CLI.** Command-line interface. The Codex CLI is the terminal-based version of Codex, installed via `npm i -g @openai/codex`.
- **Codex Cloud.** The hosted, sandboxed execution mode for Codex. Tasks run in isolated environments with the repo and finish with a reviewable diff.
- **GDPval.** A benchmark that scores models on their ability to produce well-specified knowledge-work output across 44 occupations. Used in [Section 11](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive) as a general-capability signal.
- **GitHub Connector.** The integration that lets Codex Cloud access GitHub repositories. Required for cloud tasks; uses short-lived, least-privilege tokens.
- **MCP (Model Context Protocol).** An open protocol for connecting models to external data sources and tools. Codex CLI supports MCP, which lets it pull in data from systems beyond the repo.
- **MRCR v2.** A long-context retrieval benchmark that measures whether the model can find and use information across very large input windows. The 1M-token version is cited in the GPT-5.5 section because it predicts behavior on repository-scale tasks.
- **OSWorld-Verified.** A benchmark that measures whether a model can operate a real desktop computer environment to complete tasks. A direct proxy for agentic and computer-use workloads.
- **PR (pull request).** A proposed change to a code repository, hosted on GitHub or similar platforms, where reviewers approve before the change merges.
- **RBAC (role-based access control).** A permission model where users are assigned to roles, and roles have specific permissions. Used by Codex workspace admins to control who can do what.
- **SCIM (System for Cross-domain Identity Management).** A standard for syncing users and groups from an identity provider (Okta, Entra ID, etc.) into another system. Codex supports SCIM-based group sync for enterprise.
- **Subagent.** A Codex CLI feature that splits a task across multiple parallel agent runs, each handling a piece of the work.
- **Tau2-bench Telecom.** A benchmark for complex customer-service workflows with tool use. Cited as a signal for tool-use reliability and policy adherence.
- **Terminal-Bench 2.0.** A coding benchmark focused on terminal-driven workflows, including long-context retrieval and computer use. The closest public proxy for Codex CLI workloads.
- **Worktree.** A git feature that lets multiple branches be checked out simultaneously in different directories. The Codex app uses worktrees so multiple agents can work in parallel without stepping on each other.
- **WSL (Windows Subsystem for Linux).** A compatibility layer that runs Linux binaries natively on Windows. The recommended environment for Codex CLI on Windows, since direct Windows support is experimental.

---

## Appendix C: Admin Security Checklist

For workspace admins setting up Codex for an enterprise. This checklist condenses [Section 8](#section-8-security-permissions-and-enterprise-setup) into actionable items. Run through it before broad rollout, then revisit quarterly.

**Access**

- [ ] Decide whether Codex Local, Codex Cloud, or both are enabled at the workspace level.
- [ ] Create separate RBAC groups for Codex Admins (policy and governance) and Codex Users (day-to-day developers). Avoid mixing the two.
- [ ] Sync user and group membership from your identity provider via SCIM rather than managing users by hand.
- [ ] Set a sensible default role for new workspace members. Do not default to admin.

**GitHub integration**

- [ ] Install the ChatGPT GitHub Connector against the correct GitHub organization.
- [ ] Allowlist only the repositories Codex Cloud needs. Do not grant org-wide access by default.
- [ ] Verify Codex respects existing branch protection rules on protected branches before enabling cloud tasks against them.
- [ ] Confirm the GitHub App tokens Codex uses are short-lived and least-privilege.

**Network and runtime**

- [ ] Confirm Codex Cloud runs with no internet access by default. This is the secure default; verify it is on.
- [ ] If a workflow requires internet access, define an explicit allowlist (dependency registries, trusted sites) and limit allowed HTTP methods.
- [ ] Document which model surfaces are approved for sensitive code (often: local CLI yes, cloud no for the most sensitive repositories).

**Data and review**

- [ ] Document the team's review standard for Codex-generated diffs. At minimum: a human approves every merge.
- [ ] Confirm logging and audit trails are configured for Codex actions (model used, prompts, files changed) per your compliance requirements.
- [ ] Define which classes of data are off-limits to Codex (PII, customer data, secrets) and how those boundaries are enforced.
- [ ] Establish an incident playbook for the case where Codex generates or commits something it should not have.

**Budget and ongoing operations**

- [ ] Set a per-workspace token budget or alert threshold so unexpected spend is caught early.
- [ ] Pick a default model per task type (e.g., Codex-mini for routine review, GPT-5.5 for repository-wide refactors) and document the choice.
- [ ] Review the Codex pricing page quarterly. The rate card has changed in the past and will change again.
- [ ] Re-run this checklist when (a) a major model release lands, (b) the workspace expands to a new team, or (c) Codex adds a new surface or capability.

---

## Appendix D: Changelog

A short, append-only log of substantive revisions to this handbook. Each entry lists the version, date, and a one-line summary of what changed.

- **v1.3 — 2026-04-30.** Made the Table of Contents clickable. Added a new Prerequisites section after the TOC. Restructured the early sections: merged the old "Quick Start" and "How to Set Up Codex" into a single [Section 4](#section-4-getting-started-install-set-up-and-your-first-task) walkthrough using a self-contained `codex-demo` repo readers build themselves. Slimmed [Section 2](#section-2-where-codex-fits-in-the-openai-ecosystem) by moving the GPT-5.5 benchmark deep dive to a new [Section 11](#section-11-model-specs-and-benchmarks-gpt-55-deep-dive) (Model Specs and Benchmarks). Added per-surface hyperlinks to [Section 3](#section-3-the-core-surfaces). Rewrote [Section 5](#section-5-how-to-use-codex-effectively) (How to Use Codex Effectively) with bad/good examples for every tip and a definition of "bounded change." Rewrote the "Measure What Matters" subsection with concrete computation methods for each metric. Added worked, runnable examples to every workflow in [Section 10](#section-10-common-workflows-and-examples). Renumbered downstream sections accordingly.
- **v1.2 — 2026-04-25.** Added Appendix E (Working with Codex in VS Code), a detailed step-by-step guide covering the three VS Code entry points — the extension, the CLI in the integrated terminal, and browser Codex at chatgpt.com/codex — with setup instructions, a decision matrix, a combined-workflow pattern, and VS Code-specific troubleshooting. Added a forward-pointer in the setup section.
- **v1.1 — 2026-04-25.** Added GPT-5.5 / GPT-5.5 Pro coverage in [Section 2](#section-2-where-codex-fits-in-the-openai-ecosystem) and [Section 7](#section-7-pricing-and-plan-access). Added executive summary, comparison matrix in the model-comparison section, worked cost example, "When NOT to use Codex" in [Section 14](#section-14-when-not-to-use-codex). Added Appendix B (Glossary), Appendix C (Admin Security Checklist), Appendix D (Changelog). Added version stamp and author line. Press coverage sources for GPT-5.5 added in [Section 16](#section-16-source-references).
- **v1.0 — Initial release.** Original Codex onboarding handbook covering surfaces, setup, usage, model comparison, pricing, security, team practices, workflows, troubleshooting, FAQ, and the 30-60-90 day adoption plan.

---

## Appendix E: Working with Codex in VS Code

This appendix is a focused, step-by-step guide to using Codex inside Visual Studio Code (and its forks, Cursor and Windsurf).

VS Code is the most common starting surface for new Codex users, and the workflow has three distinct entry points that can be used independently or together. This guide covers each one, when to pick it, and how the three combine into a single fluid workflow.

### E.1 Why VS Code Is the Recommended Starting Surface

Most teams start with VS Code rather than the standalone Codex app or pure CLI for a few practical reasons:

- The editor is already where engineers spend their day. Adding Codex does not require a context switch.
- The extension surface area is small and reviewable. Engineers can try it on a single file before adopting it more broadly.
- VS Code's integrated terminal makes the CLI a one-keystroke experience, so the extension and CLI can be combined without leaving the editor.
- Cursor and Windsurf, the most popular VS Code forks, both run the same Codex extension. A team that standardizes on the VS Code workflow does not have to retrain people if some engineers prefer a fork.

The downside of starting in VS Code is that you do not get parallel-task management or worktree support out of the box — those are stronger in the Codex app. For most individual contributors, that is not a meaningful loss in the first month.

### E.2 The Three Entry Points

Codex shows up in VS Code in three distinct ways, and they are easy to confuse. Each is a separate piece of software with its own install and its own auth handshake, even though they all sign in with the same ChatGPT account.

1. **The Codex VS Code extension** — a sidebar UI inside VS Code itself. Installed from the VS Code Marketplace. Best for in-flow editing, quick questions about the open file, and short bounded tasks.
2. **The Codex CLI, run inside VS Code's integrated terminal** — the command-line agent (`codex`) running in the terminal pane that is already attached to your VS Code workspace. Best for multi-step agentic tasks, scripted runs, and anything where you want explicit approval gates.
3. **Browser Codex at chatgpt.com/codex** — the web interface to Codex Cloud, where tasks run in isolated sandboxes against your GitHub repository. Best for background work, parallel tasks, and PR-style review.

These are not alternatives to each other in the sense that you must pick one. They are three workflows that target different kinds of work, and most experienced Codex users have all three set up.

### E.3 Setting Up the Codex VS Code Extension

This is the entry point most new users meet first.

**Install**

There are two install paths:

1. Open the VS Code Marketplace, search for "Codex" or "ChatGPT", and install the extension published by `openai`. The marketplace identifier is `openai.chatgpt`.
2. From a terminal, run:

```sh
code --install-extension openai.chatgpt
```

The CLI install path is useful for scripted dev-environment provisioning, dotfiles repos, and onboarding scripts that bring a new machine up to a known baseline.

**Sign in**

After install, the Codex panel appears in the right sidebar. The first time you open it, you will be prompted to sign in. You have two options:

- **Sign in with ChatGPT.** Recommended for individuals on Plus, Pro, Business, or Enterprise/Edu plans. Usage is charged against your plan's included Codex credits.
- **Sign in with an API key.** Used when you want metered API billing instead of plan-based usage, or when your workspace policy requires it. Get the key from the OpenAI developer console, then paste it into the extension's auth prompt.

If both options are visible and you are unsure which to pick, default to ChatGPT sign-in. It is the path that exercises the same plan-included usage that the rest of your team is on, which makes cost behavior predictable.

**First-run sanity check**

Once signed in, do a five-minute sanity check before relying on the extension for real work:

1. Open a small repository you know well.
2. Open the Codex panel in the right sidebar.
3. Ask a question about the open file (e.g., "What does this function do?") and confirm the answer matches what you already know.
4. Ask for a small change (e.g., "Add a docstring to this function") and confirm a reviewable diff appears.
5. Apply the change, run your tests, and revert if needed.

If any of those steps fails, fix the auth or install before going further. Trying to debug the extension on a real task is much harder than debugging it on a known-good toy task.

**Platform notes**

- **macOS and Linux** are first-class. The extension and the underlying CLI both work natively.
- **Windows** is experimental for the CLI. The extension itself works, but if you also want to run the CLI inside VS Code's integrated terminal, OpenAI recommends using a WSL workspace. Open the folder via "Reopen in WSL" before installing the CLI.
- **Cursor and Windsurf** run the same extension. Watch for visual or shortcut conflicts with the fork's built-in AI features — see E.9 for specifics.

### E.4 Setting Up the Codex CLI Inside VS Code's Integrated Terminal

The CLI is the second entry point. It runs as a normal command-line tool, but inside VS Code's integrated terminal it picks up the active workspace folder automatically, which makes it feel like a native part of the editor.

**Install the CLI**

From any terminal, including VS Code's integrated terminal:

```sh
npm i -g @openai/codex
```

This installs the `codex` binary globally. Confirm by running:

```sh
codex --version
```

If the command is not found, the most common cause is that npm's global bin directory is not on your PATH. Either fix the PATH or use a Node version manager (nvm, fnm, volta) that handles it for you.

**Open the integrated terminal in VS Code**

Three ways to open it, pick whichever matches your habits:

- The View menu → Terminal.
- The keyboard shortcut <kbd>Ctrl</kbd>+<kbd>\`</kbd> (backtick) on Windows/Linux, <kbd>⌃</kbd> on macOS.
- The Command Palette: `Terminal: Create New Terminal`.

The integrated terminal inherits the active workspace folder as its working directory, which means `codex` launched from there immediately sees the right repo.

**Run Codex**

In the terminal, navigate to the repo (if you are not already there) and run:

```sh
codex
```

The first time you run it, you will go through the same auth flow as the extension — sign in with ChatGPT or paste an API key.

**Pick an approval mode**

The CLI supports several approval modes that govern how much Codex can do without explicit confirmation. For new users, start with the strictest mode (asks before every shell command and every file change), then loosen it once you trust the workflow on your repo. The relevant modes and how to toggle them are described in the CLI docs linked in [Section 16](#section-16-source-references).

**Where the CLI beats the extension**

- Multi-step agentic runs that need to read several files, run tests, iterate, and report.
- Anything you want to script or invoke from a <VPIcon icon="iconfont icon-json"/>`package.json` script, a Makefile, or a CI step.
- Subagent decomposition (the CLI explicitly supports splitting a task across multiple parallel agent runs).
- MCP-connected tools and custom data sources.
- Cloud task launching from the terminal, when you do not want to leave the keyboard.

### E.5 Setting Up Browser Codex (chatgpt.com/codex)

The third entry point lives outside VS Code but is essential for the full workflow because it is how you launch and monitor cloud tasks.

**Open browser Codex**

Navigate to **chatgpt.com/codex**. You will need to be signed into the same ChatGPT account you used for the extension and CLI. If you are part of an enterprise workspace, your admin must have enabled Codex Cloud at the workspace level — see [Section 8](#section-8-security-permissions-and-enterprise-setup).

You can also reach Codex through the sidebar in regular ChatGPT. The browser surface exposes two main verbs:

- **Code** — assign a coding task. Codex spins up a sandbox preloaded with your repository and produces a reviewable diff.
- **Ask** — ask a question about your codebase without changing any code.

**Connect a GitHub repository**

Cloud tasks need a GitHub-hosted repository. Connect it once:

1. Open environment settings at chatgpt.com/codex.
2. Connect your GitHub account through the ChatGPT GitHub Connector.
3. Grant access to the specific repositories you want Codex to be able to use. Do not grant org-wide access by default — see Appendix C for the security checklist.
4. Confirm the connector shows the repo as available.

**Launch a task**

From the Codex web interface:

1. Pick the repository and (optionally) the branch.
2. Type a prompt describing the task. Be specific — "Add input validation to the `/users` POST endpoint and update the matching tests" beats "Improve the API."
3. Click **Code** (or **Ask** for a non-mutating question).
4. Watch the live logs as Codex works, or close the tab and let it run in the background.
5. When it finishes, review the diff. From there you can request changes, accept the result, or open a pull request.

**Delegate from a GitHub PR comment**

A useful shortcut: in any PR on a connected repo, you can post a comment that tags `@codex` with an instruction (for example, "@codex review this PR for security issues and missing tests"). Codex will pick up the request and respond on the PR. This requires being signed into ChatGPT in the same browser.

**Why the browser surface matters even if you live in VS Code**

Cloud tasks decouple Codex from your local machine. You can launch a long-running task from the browser, close the laptop, and come back to the diff later. The extension and CLI cannot do this — they need an open VS Code instance to run.

### E.6 When to Pick Which Entry Point

The three entry points overlap, which causes confusion. This table makes the choice mechanical.

| Situation | Best entry point | Why |
| --- | --- | --- |
| Quick edit on the file you have open | Extension | Lowest friction, no context switch |
| "What does this function do?" | Extension | Right-sidebar Q&A is faster than typing it into a terminal |
| Multi-file refactor with tests | CLI in integrated terminal | Better at multi-step agentic work and approvals |
| Anything you want to script or wire into a Makefile | CLI | Only the CLI is invokable from other scripts |
| Long-running task you want to leave running | Browser (cloud) | Decoupled from your laptop |
| Parallel tasks (e.g., three independent fixes at once) | Browser (cloud) | Cloud sandboxes run in parallel without local resource contention |
| PR review on a teammate's pull request | Browser, via `@codex` mention in PR | Lives where the review actually happens |
| Anything touching production credentials or live infra | None of the above without explicit human approval | See [Section 14](#section-14-when-not-to-use-codex) |

The pattern that emerges: **extension for in-flow editing, CLI for serious local agentic work, browser for anything you want offloaded or shared with the team.**

### E.7 The Combined VS Code Workflow

The three entry points are most powerful when used together. A representative day looks like this.

**Morning, in VS Code:**

1. Open the repo. The Codex extension panel is in the right sidebar.
2. Use the extension to ask questions about an unfamiliar module before you touch it.
3. Make small in-line edits — single-function changes, docstrings, type fixes — using the extension's diff-apply flow.

**Mid-morning, in the integrated terminal:**

1. Open the integrated terminal (Ctrl+`).
2. Run `codex` and start a multi-file task with explicit approval mode: "Refactor the auth middleware to use the new session interface. List the files you intend to touch first, then make the changes in the smallest commits possible."
3. Approve each shell command and each diff as Codex requests them.
4. Run the test suite when Codex finishes.

**Afternoon, in the browser:**

1. While you are reviewing the morning's CLI changes, open chatgpt.com/codex in another tab.
2. Launch a cloud task: "Add OpenAPI annotations to every public endpoint in the `/api/v2` directory." This will take a while.
3. Switch back to VS Code and keep working. The cloud task runs in its own sandbox.
4. When the cloud task finishes, review the diff in the browser, request any tweaks, and open a PR.

**End of day, on GitHub:**

1. Tag `@codex` on a teammate's open PR with "review for correctness and missing tests." The result lands as a comment overnight.

The point of the combined workflow is that each entry point is doing what it is best at simultaneously. The extension keeps in-flow editing fast, the CLI handles local agentic work where you want approval control, and the cloud handles long-running and parallel tasks without consuming your local machine.

### E.8 VS Code-Specific Tips

These are small tips that compound over time once you use Codex daily inside VS Code.

- **Sidebar position.** The Codex panel defaults to the right sidebar. If you also have GitHub PR review or another panel there, drag Codex to the secondary side or to a panel-bottom dock — whichever keeps it visible without stealing space from the editor.
- **Keybindings.** Bind the most-used Codex commands (open panel, new task, accept diff) to keyboard shortcuts via VS Code's `Preferences: Open Keyboard Shortcuts`. Reach for the keyboard, not the mouse.
- **Settings sync.** If you use VS Code's Settings Sync, the Codex extension's settings travel with you to other machines. Auth state does not — you sign in again on each machine. This is the right behavior; do not work around it.
- **Multi-root workspaces.** The extension scopes to the active workspace folder. If you open a multi-root workspace, switch the active folder explicitly before asking Codex to make changes, otherwise it may operate against the wrong root.
- **Integrated terminal profiles.** If you use multiple terminal profiles (PowerShell, bash, WSL), set the WSL profile as default on Windows so `codex` from the integrated terminal always lands in the supported environment.
- **Source control panel.** After Codex applies a change, the VS Code Source Control panel shows the diff. Review there before committing — it gives you the same context as a `git diff` without leaving the editor.
- **Don't fight the approval mode.** New users often loosen approvals to "auto" too quickly because the prompts feel slow. Resist that for the first week. The approvals are how you build a mental model of what Codex actually does in your repo.
- **One Codex panel per VS Code window.** Avoid running the extension and the CLI in the same workspace simultaneously on the same task — they can both touch files and you will get confused about which one made which change.

### E.9 Cursor and Windsurf

The Codex extension explicitly supports Cursor and Windsurf, the two most popular VS Code forks. The install and sign-in flow is identical. The notes worth knowing:

- **Avoid double-AI confusion.** Cursor and Windsurf both ship their own AI features. Engineers using them with Codex sometimes accidentally invoke the fork's built-in AI when they meant to invoke Codex, or vice versa. Pick a primary tool for editing and use the other only when its specific strengths matter.
- **Auth is independent.** The Codex extension's ChatGPT sign-in is separate from Cursor's or Windsurf's own model accounts. Your Codex usage is billed against your ChatGPT plan; Cursor/Windsurf usage against theirs.
- **Keybinding conflicts.** Cursor in particular has heavily customized AI-related keybindings. Audit your bindings after installing the Codex extension to make sure both surfaces are reachable.
- **Settings sync caveat.** Cursor and Windsurf have their own settings sync that diverges from upstream VS Code. Codex extension settings may sync within Cursor or Windsurf separately from your VS Code installs.

For pure Codex-first teams, vanilla VS Code is the simplest baseline. For teams that already standardized on Cursor or Windsurf for other reasons, the Codex extension is a clean addition rather than a replacement.

### E.10 Troubleshooting VS Code Specifically

The general troubleshooting list is in [Section 12](#section-12-troubleshooting). The issues below are specific to running Codex inside VS Code.

**Extension installs but sidebar panel never appears**

Reload the window (Command Palette → "Developer: Reload Window"). If that does not fix it, check the Output panel, switch the dropdown to "Codex", and look for the actual error. The most common causes are a corporate proxy blocking the extension's auth handshake, or a conflicting older version of the extension still installed.

**"Sign in" keeps looping back to the sign-in prompt**

This usually means the redirect from the browser auth flow did not reach the extension. Try signing out completely, closing all VS Code windows, then reopening and signing in fresh. On Windows, verify your default browser is one VS Code can open via the OS handler.

`codex` **command not found in the integrated terminal**

The CLI's npm global bin directory is not on PATH. The fastest fix on macOS/Linux is to add `$(npm bin -g)` to your shell profile (`.zshrc`, `.bashrc`). On Windows, restart VS Code after the npm install so the integrated terminal picks up the updated PATH, or switch to a WSL terminal where the install is already on PATH.

**Cloud task says "no repository connected" even though you connected one**

Verify in chatgpt.com/codex environment settings that the specific repository is in the allowlist. The GitHub Connector grants per-repository access; granting access to the org alone is not enough. Also confirm your workspace admin has enabled Codex Cloud — individual users cannot enable it themselves.

**Extension and CLI both editing the same file at the same time**

Stop one of them. They do not coordinate, and you will get conflicting edits. The simplest discipline: pick one entry point per task, switch between tasks rather than trying to combine within a task.

**Extension feels slower than the CLI for the same prompt**

Often this is because the extension is using a different default model than your CLI configuration. Check both for the active model — the model picker in the extension panel, and `codex --help` or the relevant config file for the CLI.

**Windows behavior is generally bad**

Switch to a WSL workspace. OpenAI's own docs call out Windows as experimental for the CLI; the WSL path is the supported one and clears most issues at once.

### Ready to Excel as an AI Engineer?

As we conclude this exploration of intelligent healthcare, it’s clear that the future belongs to those who can bridge the gap between groundbreaking research and real-world utility. If you are inspired to lead this transformation, we invite you to download our flagship resource, **The AI Engineering Handbook**. Authored by Tatev Aslanyan, a pioneering AI engineer and co-founder of LUNARTECH, this guide is designed to help you navigate the highly competitive landscape of AI engineering, providing you with the step-by-step roadmap and industry workflows needed to build world-changing products.

Empower yourself with the same strategies used by AI trailblazers at the world's most innovative tech companies. By mastering these production-ready skills, you won't just keep pace with the hyper-connected world — you will help define it. Get started today by downloading your eBook here:

```component VPCard
{
  "title": "The AI Engineering Handbook",
  "desc": "Ignite your engineering career with a complete, AI Engineering Handbook",
  "link": "https://lunartech.ai/download/the-ai-engineering-handbook/",
  "logo": "https://cdn.prod.website-files.com/670b041cc58f983b09ee069a/670ede9d09e0aca173941bfb_lunartech-icon.png",
  "background": "rgba(255,214,0,0.2)"
}
```

---

::: details About LunarTech Lab

> *“Real AI. Real ROI. Delivered by Engineers — Not Slide Decks.”*

[<VPIcon icon="fas fa-globe"/>LunarTech Lab](https://technologies.lunartech.ai) is a deep-tech innovation partner specializing in AI, data science, and digital transformation – from healthcare to energy, telecom, and beyond.

We build real systems, not PowerPoint strategies. Our teams combine clinical, data, and engineering expertise to design AI that’s measurable, compliant, and production-ready. We’re vendor-neutral, globally distributed, and grounded in real AI and engineering, not hype. Our model blends Western European and North American leadership with high-performance technical teams offering world-class delivery at 70% of the Big Four’s cost.

**How We Work — From Scratch, in Four Phases**

**1. Discovery Sprint (2–4 Weeks):** We start with data and ROI – not assumptions to define what’s worth building and what’s not and how much it will cost you.

**2. Pilot / Proof of Concept (8–12 Weeks):** We prototype the core idea – fast, focused, and measurable.  
This phase tests models, integrations, and real-world ROI before scaling.

**3. Full Implementation (6–12 Months):** We industrialize the solution – secure data pipelines, production-grade models, full compliance (HIPAA, MDR, GDPR), and knowledge transfer.

**4. Managed Services (Ongoing):** We maintain, retrain, and evolve the AI models for lasting ROI. Quarterly reviews ensure that performance improves with time, not decays. As we own [<VPIcon icon="fas fa-globe"/>LunarTech Academy](https://academy.lunartech.ai/courses), we also build customised training to ensure clients tech team can continue working without us.

Every project is designed **from scratch**, integrating clinical knowledge, data engineering, and applied AI research.

:::

**Why LunarTech Lab?**

LunarTech Lab bridges the gap between strategy and real engineering, where most competitors fall short. Traditional consultancies, including the Big Four, sell frameworks, not systems – expensive slide decks with little execution.

We offer the same strategic clarity, but it’s delivered by engineers and data scientists who build what they design, at about 70% of the cost. Cloud vendors push their own stacks and lock clients in. LunarTech is vendor-neutral: we choose what’s best for your goals, ensuring freedom and long-term flexibility.

Outsourcing firms execute without innovation. LunarTech works like an R&D partner, building from first principles, co-creating IP, and delivering measurable ROI.

From discovery to deployment, we combine strategy, science, and engineering, with one promise: We don’t sell slides. We deliver intelligence that works.

::: info Stay Connected with LunarTech

Follow LunarTech Lab on [<VPIcon icon="fas fa-globe"/>LunarTech NewsLetter](https://substack.com/@lunartech) and [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tatev-karen-aslanyan`)](https://linkedin.com/in/tatev-karen-aslanyan/), where innovation meets real engineering. You’ll get insights, project stories, and industry breakthroughs from the front lines of applied AI and data science.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Codex Handbook: A Practical Guide to OpenAI's Coding Platform",
  "desc": "This handbook is written for developers, team leads, and admins who want to understand what Codex is, how to set it up, how to use it well, how it differs from general-purpose models, and how pricing ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-codex-handbook-a-practical-guide-to-openai-s-coding-platform/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
