---
lang: en-US
title: "How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026"
description: "Article(s) > How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026"
    - property: og:description
      content: "How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-claude-code-to-build-flutter-apps-faster-best-practices.html
prev: /programming/dart/articles/README.md
date: 2026-06-29
isOriginal: false
author:
  - name: Jesutoni Aderibigbe
    url: https://freecodecamp.org/news/author/ToniAderibigbe/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/90650cde-75af-4ba0-af15-5d7c567d1583.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
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
  name="How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026"
  desc="In early 2023, I was interning at a US-based company, long before agentic AI became part of everyday development. We had tools like ChatGPT, Gemini, and Copilot, but they were mostly chat interfaces: "
  url="https://freecodecamp.org/news/how-to-use-claude-code-to-build-flutter-apps-faster-best-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/90650cde-75af-4ba0-af15-5d7c567d1583.png"/>

In early 2023, I was interning at a US-based company, long before agentic AI became part of everyday development.

We had tools like ChatGPT, Gemini, and Copilot, but they were mostly chat interfaces: you pasted code, got a response, and moved on.

During that time, my manager, who worked in AI/ML, told me that a day would come when developers would collaborate with AI agents and that learning how to write effective prompts would become a valuable skill.

I took that advice seriously. I spent countless nights experimenting with prompts, refining instructions, and learning how to communicate with AI systems effectively.

Today, while I still write code by hand and believe strongly in fundamentals, those early lessons have paid off. In an era where AI is embedded into the development workflow, I've been able to leverage it to significantly amplify my productivity as a software engineer.

You've probably seen all the excitement around AI coding assistants. But if you've tried using one on a real Flutter project, whether it's a fintech app, an e-commerce platform, or any application with a well-structured architecture, you've likely experienced the frustration, too.

The assistant generates a widget. You paste it in. It doesn't fit your architecture. It ignores your naming conventions. It recreates functionality that already exists somewhere else in your codebase. Before long, you've spent twenty minutes fixing code that was supposed to save you time.

The problem isn't the AI. The problem is that most developers still use AI as an advanced autocomplete tool when it can function as something much more powerful: a second engineer that understands your codebase, follows your conventions, and tackles parallel tasks while you focus on solving the hard problems.

In this article, I'll show you what has actually worked for me. We'll cover how to structure your Flutter projects so Claude Code can navigate them effectively and how to use skills, loops, and subagents to automate repetitive development tasks and dramatically increase your productivity.

::: note Prerequisites

Before following along, you should be comfortable with the basics of Flutter development; building widgets, managing state, and running the app from the terminal. You don't need to be an expert.

On the tooling side, you'll need:

- **Flutter SDK** (3.x or later): the framework we're building with. Install it from [<VPIcon icon="iconfont icon-flutter"/>flutter.dev](https://flutter.dev).
- **Claude Code**: Anthropic's agentic coding tool that runs in your terminal alongside your editor. Install it with `npm install -g @anthropic-ai/claude-code`, then run `claude` in your project directory to start a session. You'll need an Anthropic account and API key.
- **A code editor**: VS Code or Android Studio both work well. Claude Code operates in the terminal and reads/writes files directly, so it works alongside whatever editor you use.
- **Git**: version control is assumed throughout. Claude Code integrates with Git for commits, diffs, and branch awareness.

Here's a quick overview of the Claude Code concepts we'll use throughout the article:

- **CLAUDE.md**: a markdown file at your project root that Claude reads at the start of every session. Think of it as a briefing document: your architecture, your conventions, your commands.
- **Skills**: reusable instruction packs stored in <VPIcon icon="fas fa-folder-open"/>`.claude/skills/`. You define them once, and Claude invokes them automatically when the task matches, or you call them manually with `/skillname`.
- **Subagents**: isolated Claude instances that handle a focused task in their own context window, then return only a summary. Great for parallel work without polluting your main session.
- **Hooks**: shell commands or scripts that fire on lifecycle events (before a tool runs, after a turn completes, and so on). They bypass Claude's judgment entirely — useful for enforcing rules deterministically.
- **/loop**: a built-in skill that reruns a task repeatedly until a condition you define is met.

:::

None of these require special configuration to unlock. They’re all available once you have Claude Code installed.

---

## 1. Why Architecture Comes First

Before you write a single skill or configure a single hook, your folder structure needs to make sense to an AI reading it cold.

Claude Code reads your files to understand your project. If your code is scattered across a layer-first structure (<VPIcon icon="fas fa-folder-open"/>`lib/models/`, <VPIcon icon="fas fa-folder-open"/>`lib/services/`, <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`), Claude has to piece together what each feature does by jumping between folders. It makes mistakes. It creates files in the wrong place. It generates code that doesn't conform to the pattern used in the rest of the app.

The fix is a feature-first structure. Each feature is a self-contained module. Everything Claude needs to understand the transfer flow, for example, lives inside <VPIcon icon="fas fa-folder-open"/>`lib/features/transfer/`.

```sh title="file structure"
lib/
├── core/
│   ├── constants/
│   ├── errors/
│   ├── router/
│   └── theme/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/         # Freezed models
│   │   │   └── repositories/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   ├── widgets/
│   │   │   └── providers/      # Riverpod providers
│   │   └── auth.dart           # barrel export
│   ├── transfer/
│   │   ├── data/
│   │   ├── presentation/
│   │   └── transfer.dart
│   └── wallet/
│       ├── data/
│       ├── presentation/
│       └── wallet.dart
└── main.dart
```

This structure tells Claude immediately: "Everything for the transfer feature is in <VPIcon icon="fas fa-folder-open"/>`lib/features/transfer/`"When you ask it to '*add a beneficiary validation to the transfer flow,*' it knows exactly where to look and where to create new files.

It also maps cleanly to Riverpod with code generation. Each feature's providers live close to the screens that use them, which means `build_runner` output lands in the right place, too.

---

## 2. Setting Up Your CLAUDE.md

<VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` is arguably the most important file in your Claude Code setup. It's loaded at the beginning of every session. It remains in context throughout the conversation, helping Claude stay aligned with your project's architecture, conventions, and development practices no matter how long the session becomes.

Create it at the root of your project:

```sh
touch CLAUDE.md
```

Here's a template shaped for a Flutter/Riverpod project:

```md
# My Flutter App

---

## Commands
- `flutter pub get` — install dependencies
- `dart run build_runner build --delete-conflicting-outputs` — generate code
- `flutter analyze` — run linter
- `flutter test` — run tests
- `flutter run` — start dev build

---

## Architecture
Feature-first folder structure. Each feature lives in lib/features/<name>/.
State management: Riverpod with @riverpod code generation (AsyncNotifier pattern).
HTTP: Dio with interceptors in lib/core/network/.
Navigation: GoRouter with named routes defined in lib/core/router/.
Models: Freezed + JsonSerializable. Run build_runner after any model change.

---

## Conventions
- All monetary amounts in the smallest unit (e.g. kobo for NGN), stored as int — never use doubles for money
- Use ref.invalidate() not ref.refresh()
- No business logic in widgets — all logic goes in notifiers or repositories
- Widget files contain only one public widget per file
- Barrel exports via feature.dart in each feature root
- Prefix private widgets with an underscore

---

## What NOT to do
- Do not add new packages without asking first
- Do not modify *.g.dart or *.freezed.dart files directly — regenerate with build_runner
- Do not put API calls directly in notifiers — always go through the repository layer
```

A few things to note about this file:

**Keep it honest:** If your conventions don't match what's actually in the codebase, Claude will get confused. The CLAUDE.md should reflect how the code actually works today, not aspirationally.

**The "What NOT to do" section matters:** AI assistants are optimistic. They'll solve the problem in front of them without thinking about side effects. Explicitly telling Claude what to avoid saves a lot of cleanup.

**Don't make it too long:** Every line in CLAUDE.md costs tokens on every single turn of every session. Put team-wide, always-relevant rules here. Everything else should be a skill (covered next).

---

## 3. Feature-First Folder Structure — The Details

Let's look inside a feature in more detail, using a wallet feature as an example:

```sh title="file structure"
lib/features/wallet/
├── data/
│   ├── models/
│   │   ├── wallet.dart             # Freezed model
│   │   ├── wallet.freezed.dart     # Generated
│   │   ├── wallet.g.dart           # Generated
│   │   └── transaction.dart
│   └── repositories/
│       ├── wallet_repository.dart  # Abstract class
│       └── wallet_repository_impl.dart
├── presentation/
│   ├── screens/
│   │   ├── wallet_screen.dart
│   │   └── transaction_history_screen.dart
│   ├── widgets/
│   │   ├── balance_card.dart
│   │   └── transaction_tile.dart
│   └── providers/
│       ├── wallet_provider.dart
│       └── wallet_provider.g.dart  # Generated
└── wallet.dart                     # Barrel export
```

And here's what a clean Riverpod provider looks like in this structure:

```dart title="lib/features/wallet/presentation/providers/wallet_provider.dart"
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/models/wallet.dart';
import '../../data/repositories/wallet_repository.dart';

part 'wallet_provider.g.dart';

@riverpod
class WalletNotifier extends _$WalletNotifier {
  @override
  Future<Wallet> build() async {
    return ref.watch(walletRepositoryProvider).getWallet();
  }

  Future<void> refreshBalance() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => ref.read(walletRepositoryProvider).getWallet(),
    );
  }
}
```

When Claude Code sees this pattern repeated across multiple features, it learns to replicate it. The more consistent your structure, the better Claude's output matches what you'd write yourself.

---

## 4. Writing Skills for Your Most Repeated Tasks

Skills are reusable instruction packs that Claude Code loads when they're relevant. They live in <VPIcon icon="fas fa-folder-open"/>`.claude/skills/<name>/SKILL.md` and can be invoked manually with `/skillname` or triggered automatically when Claude recognises the right context.

A simple way to think about a Skill is as a specialist on your team. Imagine working with a designer, a QA engineer, and a security expert. You don't explain their entire job every time you need their help. Each person already knows their responsibilities and follows a defined process.

Skills work the same way. Instead of repeatedly telling Claude how to generate Riverpod providers, write tests, or review security concerns, you package those instructions into a Skill and let Claude load them whenever they're needed.

Think of a Skill as a saved recipe. Instead of writing out the ingredients and cooking steps every time you want to make a meal, you keep the recipe in one place and reuse it whenever needed.

Skills do the same thing for development workflows. They allow you to save a set of instructions once and have Claude follow them consistently every time a similar task comes up.

The key thing to understand is that the description field is what triggers a skill. Claude evaluates it on every turn and decides whether the current task matches. Because of this, you should describe it using the same verbs that developers actually type in real workflows, like `build`, `commit`, `release`, or `fix lint`, instead of documentation-style language.

### Creating Your First Skill

Before you write a skill, think about the tasks you perform over and over again. A good skill captures a workflow you already know by heart. If you find yourself giving Claude the same instructions every session, such as "run `flutter analyze`, then run `build_runner`, then execute the tests," that's a good candidate for a skill.

Start with one task. Keep the steps in the exact order you expect Claude to follow, and clearly define what a successful outcome looks like. Don't try to cover every possible edge case. The goal is to automate your normal workflow so Claude can handle the repetitive work consistently, while you step in only when something unexpected happens.

```sh
mkdir -p .claude/skills/flutter-release
touch .claude/skills/flutter-release/SKILL.md
```

```md
---
name: flutter-release
description: |
  Use this skill when building a release APK or preparing the app for deployment.
  Triggers on: "build release", "generate apk", "prepare release", "release build".
allowed-tools: Bash Read
---

# Flutter release checklist

Run these steps in order. Do not skip any step.

1. Run `flutter pub get`
2. Run `dart run build_runner build --delete-conflicting-outputs`
3. Run `flutter analyze` — fix every error before proceeding. Do not continue with warnings treated as errors.
4. Run `flutter test` — if any test fails, fix it before continuing
5. Run `flutter build apk --release`
6. Confirm build output at `build/app/outputs/flutter-apk/app-release.apk`
7. Create a git commit: `chore: release build vX.X.X`

If any step fails, stop and report the error clearly. Do not skip ahead.
```

Now, whenever you type `"prepare a release"` or `"build the apk"`Claude follows this checklist without you having to remind it of the steps.

### A Skill For Conventional Commits

```sh
mkdir -p .claude/skills/commit
touch .claude/skills/commit/SKILL.md
```

```md
---
name: commit
description: |
  Use when committing changes or writing a commit message.
  Triggers on: "commit", "git commit", "commit changes", "write a commit message".
---

Follow Conventional Commits format:

Types: feat | fix | chore | refactor | docs | test | perf

Format: `type(scope): short imperative summary`

Rules:
- Subject line max 72 characters
- Imperative mood — "add" not "added", "fix" not "fixed"
- Scope = the feature name (auth, transfer, wallet, cards)

Examples:
- `feat(transfer): add beneficiary validation on amount input`
- `fix(wallet): correct kobo-to-naira display conversion`
- `chore(deps): upgrade riverpod to 2.6.1`

Always run `flutter analyze` before committing. Never commit with lint errors.
```

### Dynamic Context Injection

Skills support a powerful trick: you can inject live shell output directly into the skill body using ``!`command` `` syntax. Claude receives the output as part of the skill, not as a separate step.

For example, you could embed something like !`git status` inside a skill, so Claude always sees the current state of your repository when applying that skill. In a Flutter workflow, you could also use something like !`flutter test` so the skill dynamically includes the latest test results before Claude suggests fixes or improvements.

```md
---
name: sprint-status
description: |
  Use when asked about current status, what's left to do, or what changed.
---

---

## Current git status
!`git status --short`

---

## Uncommitted changes
!`git diff --stat HEAD`

---

## Recent commits
!`git log --oneline -10`

---

## Lint status
!`flutter analyze 2>&1 | tail -20`

Review the above and give a concise summary of: what's done, what's broken, and what needs attention before the next commit.
```

Type `/sprint-status` and Claude gets a live snapshot of your project state before responding.

---

## 5. Using /loop for Self-Correcting Workflows

`/loop` is a built-in Claude Code skill that reruns a task repeatedly until a condition is met. It's the difference between "fix this lint error" (one shot) and "fix all lint errors" (autonomous loop).

For example, instead of running a one-time prompt like “fix this lint error,” you would use `/loop fix lint errors in this Flutter project until there are no warnings left`. Claude will then repeatedly check the output, apply fixes, and recheck until the condition is satisfied.

A more realistic Flutter workflow could look like `/loop run flutter analyze and fix all reported issues until analysis passes clean`. In this case, Claude keeps running analyses, fixing issues, and revalidating until the project reaches a clean state.

It's worthy of note here that a`/loop` and a `Skill` solve two different problems, and it helps to think of them like this:

- A Skill is *knowledge*.
- A Loop is *behavior over time*.

The pattern is always the same: tell Claude what to run, what to check, and when to stop.

### Fix Until Clean

```plaintext
/loop
Run flutter analyze.
If there are any errors or warnings, read each one carefully and fix it.
Run flutter analyze again.
Continue until flutter analyze reports zero issues.
Do not move on while there are errors remaining.
```

### TDD Loop

```plaintext
/loop
Run: flutter test --name "WalletNotifier"
If the test fails, read the failure output carefully.
Make the minimal code change required to fix the failure.
Do not change the test itself.
Run the test again.
Stop when the test passes with no errors.
```

### Build a Screen, Check it, Iterate

```plaintext
/loop
Look at the Figma spec notes in CLAUDE.md under "Remaining screens".
Pick the next incomplete screen.
Build the screen following the architecture pattern in lib/features/wallet/presentation/.
After building, run flutter analyze and fix any issues.
Add a comment `// DONE` at the top of the completed screen file.
Move to the next screen.
Stop after completing 3 screens.
```

A word of caution: `/loop` is powerful, but give Claude a clear stop condition. "*Keep going until it's perfect*" is **not** **a stop condition**. "*Stop when flutter analyze and flutter test both pass with zero issues.*" is.

---

## 6. Subagents for Parallel Screen Development

Subagents are isolated Claude instances that run a task in their own context window and then return only a summary to the main session. This changes how you think about working with Claude Code on a multi-screen project.

A simple way to understand it is to imagine building a full Flutter app with multiple screens. Without subagents, you would design the home screen, then the profile screen, then settings, all in one long conversation. Over time, the context gets heavier, and Claude starts losing focus on earlier decisions.

With subagents, it's like giving each screen to a different engineer. One works on the home screen, another builds the profile screen, and another handles settings. Each one works independently, follows the same project rules, and reports back only when the screen is ready. You then combine their output into the main project without losing clarity or consistency.

### Setting Up a Screen-Builder Subagent

Create a file at <VPIcon icon="fas fa-folder-open"/>`.claude/agents/screen-builder.md`:

```md title=".claude/agents/screen-builder.md"
---
name: screen-builder
description: Builds a single Flutter screen following the app's feature-first Riverpod architecture
model: claude-sonnet-4-6
tools: [Read, Write, Bash, Glob]
---

You are a Flutter engineer building a screen for a fintech app.

Before building anything:
1. Read lib/features/wallet/presentation/screens/wallet_screen.dart to understand the existing screen pattern
2. Read CLAUDE.md for conventions and architecture rules
3. Read the feature's existing providers in the presentation/providers/ folder

When building the screen:
- Follow the exact same structure as the existing screens
- Use AsyncValue pattern for loading/error/data states
- No business logic in the widget — all state goes through the provider
- Every monetary amount displayed in naira but stored in kobo (divide by 100 for display)
- Use GoRouter for navigation, not Navigator.push

After building:
- Run flutter analyze on the file
- Fix any errors
- Return a summary: file path created, provider used, any decisions made
```

### Using it

In your main session, you can now say:

```plaintext
Use the screen-builder subagent to build the Transaction History screen.
The screen should show a list of transactions from the WalletNotifier provider.
Each item should display: amount (formatted), description, date, and status badge.
```

Claude dispatches the subagent, which reads your existing code for context, builds the screen following your patterns, fixes any lint errors, and returns a clean summary, without cluttering your main thread with every intermediate step.

You can also run multiple subagents simultaneously for truly parallel work:

```plaintext
Dispatch three screen-builder subagents in parallel:
1. Transaction History screen (list of transactions)
2. Send Money screen (amount input + recipient selection)
3. Wallet Top-Up screen (amount input + payment method)

Each should follow the existing wallet feature patterns.
Report back when all three are complete.
```

---

## 7. Hooks — Enforcing Rules Deterministically

Skills and subagents influence how Claude thinks and plans, but hooks are different. Hooks are deterministic. They run automatically at specific lifecycle events, no matter what Claude decides to do. This makes them useful for enforcing hard rules in your workflow.

A simple way to understand it is to think of hooks as guards in a real engineering pipeline. For example, before any code is committed, a `PreToolUse hook` can run to check formatting or block unsafe changes. After a tool runs, a `PostToolUse hook` can validate the output. When a session ends, a `Stop hook` can trigger cleanup tasks or logging. Other events, like `SessionStart`, `PreCompact` help you initialize context or manage memory before Claude continues working.

In practice, hooks are how you enforce consistency. While Skills and subagents guide Claude’s behavior, hooks ensure certain actions always happen at the right moment, without relying on Claude to “remember” or “decide.”

### Block Edits to Generated Files

Generated files like `*.g.dart` and `*.freezed.dart` should never be edited manually — they get overwritten by `build_runner`. This hook blocks Claude from writing to them:

Create <VPIcon icon="fas fa-folder-open"/>`.claude/hooks.json`:

```json title=".claude/hooks.json"
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "command": "bash -c 'if [[ \"\(CLAUDE_TOOL_INPUT_PATH\" == *.g.dart ]] || [[ \"\)CLAUDE_TOOL_INPUT_PATH\" == *.freezed.dart ]]; then echo \"Blocked: Do not edit generated files. Run build_runner instead.\"; exit 1; fi'"
    }
  ]
}
```

### Run Analyze Before Every Stop

This hook runs `flutter analyze` before Claude considers its turn complete, catching lint errors before they accumulate:

```json
{
  "Stop": [
    {
      "command": "bash -c 'result=\((flutter analyze 2>&1); if echo \"\)result\" | grep -q \"error •\"; then echo \"Flutter analyze found errors. Fix before stopping:\"; echo \"$result\"; exit 1; fi'"
    }
  ]
}
```

Now Claude can't finish a turn if there are lint errors. It gets blocked and has to fix them first.

---

## 8. Putting It All Together: A Real Sprint Workflow

Here's what a typical feature development session looks like when all of this is configured:

### Morning: Check Project State

```plaintext
/sprint-status
```

Claude reads live Git status, recent commits, and current lint output, then summarises what needs attention.

### Start a New Feature

```plaintext
I need to build the beneficiary management feature. 
Users should be able to save, view, and delete beneficiaries for the transfer flow.
Start with the data layer — Freezed model and repository interface.
```

Claude reads your CLAUDE.md and existing feature patterns, then builds the model and repository in the right place, following your conventions.

### Generate All the Screens in Parallel

```plaintext
Use the screen-builder subagent to build:
1. BeneficiaryListScreen — shows saved beneficiaries with search
2. AddBeneficiaryScreen — form with account number and bank selection
3. BeneficiaryDetailScreen — shows details with delete option
```

### Fix Everything Until it's Clean

```plaintext
/loop
Run flutter analyze.
Fix all errors.
Run flutter test.
Fix any test failures.
Stop when both pass with zero issues.
```

### Commit Cleanly

```plaintext
Commit the beneficiary feature
```

The commit skill triggers, runs analyze one more time, and creates a correctly-formatted conventional commit message.

---

## Key Takeaways

If there's one key takeaway from all of this, it's that Claude Code isn't just about prompting. It's about setup. The quality of its output is shaped far more by what you define about your project upfront than by what you type in the moment.

This is also what separates vibe coding from real AI-assisted engineering. Without structure, you end up guessing and reacting, which feels fast but breaks down quickly.

With the right setup, Claude becomes a pair programming partner that follows your conventions and handles execution while you focus on decisions that actually require engineering judgment. **That shift is what lets you spend less time fixing generated code and more time solving the problems that matter.**

The payoff compounds. A <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` takes 20 minutes to write. A `skill` for your release flow takes 10 minutes. But both of those pay for themselves the first time Claude correctly follows your process without you having to walk it through every step.

Start small: write your <VPIcon icon="fa-brands fa-markdown"/>`CLAUDE.md` this week. Add one skill for the task you repeat most — committing, releasing, or running lint. Then, when you're comfortable, try a `/loop` on your next test-fixing session. The rest follows naturally.

The goal isn't to let AI write all your code. It's to stop spending your limited engineering time on the parts that don't require your judgment, and to spend more of it on the parts that do.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Claude Code to Build Flutter Apps Faster — Best Practices for 2026",
  "desc": "In early 2023, I was interning at a US-based company, long before agentic AI became part of everyday development. We had tools like ChatGPT, Gemini, and Copilot, but they were mostly chat interfaces: ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-claude-code-to-build-flutter-apps-faster-best-practices.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
