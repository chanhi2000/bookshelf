---
lang: en-US
title: "How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment"
description: "Article(s) > How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - devops
  - github
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment"
    - property: og:description
      content: "How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-flutter-ci-cd-pipeline-with-github-actions-quality-gates-environments-and-store-deployment/
prev: /programming/dart/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8c9d9384-ff02-47d7-aa69-42db2ebae247.png
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
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment"
  desc="Mobile application development has evolved over the years. The processes, structure, and syntax we use has changed, as well as the quality and flexibility of the apps we build. One of the major improv"
  url="https://freecodecamp.org/news/how-to-build-a-production-ready-flutter-ci-cd-pipeline-with-github-actions-quality-gates-environments-and-store-deployment"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8c9d9384-ff02-47d7-aa69-42db2ebae247.png"/>

Mobile application development has evolved over the years. The processes, structure, and syntax we use has changed, as well as the quality and flexibility of the apps we build.

One of the major improvements has been a properly automated CI/CD pipeline flow that gives us seamless automation, continuous integration, and continuous deployment.

In this article, I'll break down how you can automate and build a production ready CI/CD pipeline for your Flutter application using GitHub Actions.

Note that there are other ways to do this, like with Codemagic (built specifically for Flutter apps – which I'll cover in a subsequent tutorial), but in this article we'll focus on GitHub Actions instead.

---

## The Typical Workflow

First, let's define the common approach to deploying production-ready Flutter apps.

The development team does their work on local, pushes to the repository for merge or review, and eventually runs `flutter build apk` or `flutter build appbundle` to generate the apk file. This then gets shared with the QA team manually, or deployed to Firebase app distribution for testing. If it's a production move, the app bundle is submitted to the Google Play store for review and then deployed.

This process is often fully manual with no automated checks, validation, or control over quality, speed, and seamlessness. Manually shipping a Flutter app starts out relatively simply, but can quickly and quietly turn into a liability. You run `flutter build`, switch configs, sign the build, upload it somewhere, and hope you didn’t mix up staging keys with production ones.

As teams grow and release updates more and more quickly, these manual steps become real risks. A skipped quality check, a missing keystore, or an incorrect base URL deployed to production can cost hours of debugging or worse – it can affect your users.

Automating this process fully involves some high level configuration and predefined scripting. It completely takes control of the deployment process from the moment the developer raised a PR into the common or base branch (for example, the <VPIcon icon="fas fa-code-branch"/>`develop` branch).

This automated process takes care of everything that needs to be done – provided it has been predefined, properly scripted, and aligns with the use case of the team.

::: info What we'll do here

In this tutorial, we'll build a production-grade CI/CD pipeline for a Flutter app using GitHub Actions. The pipeline automates the entire lifecycle: pull-request quality checks, environment-specific configuration injection, Android and iOS builds, Firebase App Distribution for testers, Sentry symbol uploads, and final deployment to the Play Store and App Store.

By the end, every release – from a developer opening a PR to the final build landing in users' hands – will be fully automated, with no one touching a terminal.

:::

::: note Prerequisites

Before starting, you should have:

1. A Flutter app with working Android and iOS builds
2. Basic familiarity with [**GitHub Actions**](/freecodecamp.org/automate-cicd-with-github-actions-streamline-workflow.md) (workflows and jobs)
3. A Firebase project with App Distribution enabled
4. A Sentry project for error tracking
5. A Google Play Console app already created
6. An Apple Developer account with App Store Connect access
7. Fastlane configured for your iOS project
8. Basic Bash knowledge (I’ll explain the important parts)

:::

---

## Pipeline Architecture

In this guide, we'll be building a CI/CD pipeline with very precise instructions and use cases. These use cases determine the way your pipeline is built.

For this tutorial, we'll use this use case:

I want to automate the workflow on my development team based on the following criteria:

1. When a developer on the team raises a PR into the common working branch (<VPIcon icon="fas fa-code-branch"/>`develop` in most cases), a workflow is triggered to run quality checks on the code. It only allows the merge to happen if all checks (like tests coverage, quality checks, and static analysis) pass.
2. Code that's moving from the develop branch to the staging branch goes through another workflow that injects staging configurations/secret keys, does all the necessary checks, and distributes the application for testing on Firebase App Distribution for android as well as Testflight for iOS.
3. Code that's moving from the staging to the production branch goes through the production level workflow which involves apk secured signing, production configuration injection, running tests to ensure nothing breaks, Sentry analysis for monitoring, and submission to App Store Connect as well as Google Play Console.

These are our predefined conditions which help with the construction of our workflows.

---

## Writing the Workflow

We'll split this pipeline into three GitHub Actions workflows.

We'll also be taking it a notch higher by creating three helper .sh scripts for a cleaner and more maintainable workflow.

In your project root, create two folders:

1. <VPIcon icon="fas fa-folder-open"/>`.github/`
2. <VPIcon icon="fas fa-folder-open"/>`scripts`

The <VPIcon icon="fas fa-folder-open"/>`.github/` folder will hold the workflows we'll be creating for each use case, while the <VPIcon icon="fas fa-folder-open"/>`scripts` folder will hold the helper scripts that we can easily call in our CLI or in the workflows directly.

After this, we'll create three workflow .yaml files:

1. <VPIcon icon="iconfont icon-yaml"/>`pr_checks.yaml`
2. <VPIcon icon="iconfont icon-yaml"/>`android.yaml`
3. <VPIcon icon="iconfont icon-yaml"/>`ios.yaml`

Also in the scripts folder, let's create three .sh files:

1. <VPIcon icon="iconfont icon-shell"/>`generate_config.sh`
2. <VPIcon icon="iconfont icon-shell"/>`quality_checks.sh`
3. <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh`

```sh title="file structure"
.github/
  workflows/
    pr_checks.yml
    android.yml
    ios.yml

scripts/
  generate_config.sh
  quality_checks.sh
  upload_symbols.sh
```

This workflow architecture ensures that a push to <VPIcon icon="fas fa-code-branch"/>`develop` automatically produces a tester build. Also, merging to <VPIcon icon="fas fa-code-branch"/>`production` ships directly to the stores without manual commands or config changes.

The scripts live outside the YAML on purpose. This lets you run the same logic locally.

### The Helper Scripts

The scripts form the backbone of the pipeline. Each one has a single responsibility and is reused across workflows.

Instead of cramming logic into YAML, we'll move it into **reusable scripts**. This keeps workflows clean and lets you run the same logic locally. Let's go through each one now.

### Script #1: <VPIcon icon="iconfont icon-shell"/>`generate_config.sh`

Injecting secrets safely is one of the hardest CI/CD problems in mobile apps.

The strategy:

- Commit a Dart template file with placeholders
- Replace placeholders at build time using secrets from GitHub Actions
- Never commit real credentials

```sh title="generate_config.sh"
#!/usr/bin/env bash
set -euo pipefail

ENV_NAME=${1:-}
BASE_URL=${2:-}
ENCRYPTION_KEY=${3:-}

TEMPLATE="lib/core/env/env_ci.dart"
OUT="lib/core/env/env_ci.g.dart"

if [ -z "\(ENV_NAME" ] || [ -z "\)BASE_URL" ] || [ -z "$ENCRYPTION_KEY" ]; then
  echo "Usage: $0 <env-name> <base-url> <encryption-key>"
  exit 2
fi

sed -e "s|<<BASE_URL>>|$BASE_URL|g" \
-e "s|<<ENCRYPTION_KEY>>|$ENCRYPTION_KEY|g" \
-e "s|<<ENV_NAME>>|$ENV_NAME|g" \
"\(TEMPLATE" > "\)OUT"

echo "Generated config for $ENV_NAME"
```

This script is responsible for injecting environment-specific configuration into the Flutter app at build time, without ever committing secrets to source control.

Let’s walk through it carefully.

#### 1. Shebang: Choosing the Shell

```sh
#!/usr/bin/env bash
```

This line tells the system to execute the script using **Bash**, regardless of where Bash is installed on the machine.

Using `/usr/bin/env bash` instead of `/bin/bash` makes the script more portable across local machines, GitHub Actions runners, and Docker containers.

#### 2. Fail Fast, Fail Loud

```sh
set -euo pipefail
```

This is one of the most important lines in the script.

It enables three strict Bash modes:

- `-e`: Exit immediately if any command fails
- `-u`: Exit if an undefined variable is used
- `-o pipefail`: Fail if any command in a pipeline fails, not just the last one

This matters in CI because silent failures are dangerous, partial config generation can break production builds, and CI should stop immediately when something is wrong.

This line ensures that no broken config ever makes it into a build.

#### 3. Reading Input Arguments

```sh
ENV_NAME=${1:-}
BASE_URL=${2:-}
ENCRYPTION_KEY=${3:-}
```

These lines read **positional arguments** passed to the script:

- `$1`: Environment name (`dev`, `staging`, `production`)
- `$2`: API base URL
- `$3`: Encryption or API key

::: note

The `${1:-}` syntax means:

*“If the argument is missing, default to an empty string instead of crashing.”*

:::

This works hand-in-hand with `set -u` , we control the failure explicitly instead of letting Bash explode unexpectedly.

#### 4. Defining Input and Output Files

```sh
TEMPLATE="lib/core/env/env_ci.dart"
OUT="lib/core/env/env_ci.g.dart"
```

Here we define two files:

- **Template file (<VPIcon icon="fa-brands fa-dart-lang"/>`env_ci.dart`)**
  - Contains placeholder values like `<<BASE_URL>>`
  - Safe to commit to Git
- **Generated file (<VPIcon icon="fa-brands fa-dart-lang"/>`env_ci.g.dart`)**
  - Contains real environment values
  - Must be ignored by Git (<VPIcon icon="iconfont icon-git"/>`.gitignore`)

At the heart of this approach are two Dart files with very different responsibilities. They may look similar, but they play completely different roles in the system.

```dart title="lib/core/env/env_ci.dart"
class EnvConfig {
  static const String baseUrl = '<<BASE_URL>>';
  static const String encryptionKey = '<<ENCRYPTION_KEY>>';
  static const String environment = '<<ENV_NAME>>';
}
```

This file is **safe**, **static**, and **version-controlled**. It contains placeholders, not real values.

Some of its key characteristics are:

- Contains no real secrets
- Uses obvious placeholders (`<<BASE_URL>>`, etc.)
- Safe to commit to Git
- Reviewed like normal source code
- Serves as the single source of truth for required config fields

::: note Think of this file as a contract:

*“These are the configuration values the app expects at runtime.”*

:::

This file is created at **build time** by <VPIcon icon="iconfont icon-shell"/>`generate_config.sh`. After substitution, it looks like this:

```dart title="lib/core/env/env_ci.g.dart"
// GENERATED FILE — DO NOT COMMIT

class EnvConfig {
  static const String baseUrl = 'https://staging.api.example.com';
  static const String encryptionKey = 'sk_live_xxxxx';
  static const String environment = 'staging';
}
```

::: info Key characteristics:

- Contains real environment values
- Generated dynamically in CI
- Differs per environment (dev / staging / production)
- Must **never** be committed to source control

:::

This file exists only on a developer’s machine (if generated locally), inside the CI runner during a build. Once the job finishes, it disappears.

#### <VPIcon icon="iconfont icon-git"/>`.gitignore`:

To guarantee the generated file never leaks, it must be ignored:

#### Why This Separation Is Critical

This design solves several hard problems at once.

**Security:**

- Secrets live **only** in GitHub Actions secrets
- They never appear in the repository
- They never appear in PRs
- They never appear in Git history

**Environment Isolation:**

Each environment gets its own generated config:

- `develop`: dev API
- `staging`: staging API
- `production`: production API

The same codebase behaves differently **without branching logic in Dart**.

**Deterministic Builds:**

Every build is fully reproducible, fully automated, and explicit about which environment it targets.

There are no “it worked locally” scenarios.

#### 5. Validating Required Arguments

```sh
if [ -z "\(ENV_NAME" ] || [ -z "\)BASE_URL" ] || [ -z "$ENCRYPTION_KEY" ]; then
  echo "Usage: $0 <env-name> <base-url> <encryption-key>"
  exit 2
fi
```

This block enforces correct usage.

- `-z` checks whether a variable is empty
- If any required argument is missing:
  - A helpful usage message is printed
  - The script exits with a non-zero status code
- `0`: success
- `1+`: failure
- `2` conventionally means incorrect usage

In CI, this immediately fails the job and prevents an invalid build.

#### 6. Injecting Environment Values

```sh
sed -e "s|<<BASE_URL>>|$BASE_URL|g" \
-e "s|<<ENCRYPTION_KEY>>|$ENCRYPTION_KEY|g" \
-e "s|<<ENV_NAME>>|$ENV_NAME|g" \
"\(TEMPLATE" > "\)OUT"
```

This is the heart of the script.

What’s happening here:

1. `sed` performs **stream editing**: it reads text, transforms it, and outputs the result
2. Each `-e` flag defines a replacement rule:
  - Replace `<<BASE_URL>>` with the actual API URL
  - Replace `<<ENCRYPTION_KEY>>` with the real key
  - Replace `<<ENV_NAME>>` with the environment label
3. The transformed output is written to `env_ci.g.dart`

This entire operation happens **at build time**:

- No secrets are committed
- No secrets are logged
- No secrets persist beyond the CI run

#### 7. Success Feedback

```sh
echo "Generated config for $ENV_NAME"
```

This line provides a clear success signal in CI logs.

It answers three important questions instantly:

- Did the script run?
- Did it finish successfully?
- Which environment was generated?

In long CI logs, these small confirmations matter.

Alright, now let's move on to the second script.

### Script #2: <VPIcon icon="iconfont icon-shell"/>`quality_gate.sh`

This script defines what *“good code”* means for your team.

```sh title="quality_gate.sh"
#!/usr/bin/env bash
set -euo pipefail

echo "Running quality checks"

dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test --no-pub --coverage

if command -v dart_code_metrics >/dev/null 2>&1; then
  dart_code_metrics analyze lib --reporter=console || true
fi

echo "Quality checks passed"
```

Lets break down this script bit by bit.

#### 1. Start & End Log Markers

```sh 
echo "Running quality checks"
...
echo "Quality checks passed"
```

These two lines act as **visual boundaries** in CI logs.

In large pipelines (especially when Android and iOS jobs run in parallel), logs can be very noisy. Clear markers:

- Help developers quickly find the quality phase
- Make debugging faster
- Confirm that the script completed successfully

The final success message only prints if **everything above it passed**, because `set -e` would have terminated the script earlier on failure.

So this line effectively means: All quality gates passed. Safe to proceed.

#### 2. Running the Test Suite

```sh
flutter test --no-pub --coverage
```

This line executes your entire Flutter test suite.

Let’s break it down carefully.

##### 1. `flutter test`

This runs unit tests, widget tests, and any test under the <VPIcon icon="fas fa-folder-open"/>`test/` directory. If **any test fails**, the command exits with a non-zero status code.

Because we enabled `set -e` earlier, that immediately stops the script and fails the CI job.

##### 2. `--coverage`

This flag generates a coverage report at:

```sh
coverage/lcov.info
```

This file can later be uploaded to Codecov, used to enforce minimum coverage thresholds, and tracked over time for quality improvement.

Even if you’re not enforcing coverage yet, generating it now future-proofs your pipeline.

#### 3. Optional Code Metrics

```sh
if command -v dart_code_metrics >/dev/null 2>&1; then
  dart_code_metrics analyze lib --reporter=console || true
fi
```

This block is intentionally designed to be optional and non-blocking.

##### Step 1 – Check If the Tool Exists:

```sh
command -v dart_code_metrics >/dev/null 2>&1
```

This checks whether `dart_code_metrics` is installed.

- If installed, proceed
- If not installed, skip silently

The redirection:

- `>/dev/null` hides normal output
- `2>&1` hides errors

This makes the script portable:

- Developers without the tool can still run the script
- CI can enforce it if configured

##### Step 2 – Run Metrics (Soft Enforcement):

```sh
dart_code_metrics analyze lib --reporter=console || true
```

This analyzes the <VPIcon icon="fas fa-folder-open"/>`lib/` directory and prints results in the console.

The important part is:

```sh
|| true
```

Because we enabled `set -e`, any failing command would normally stop the script.

Adding `|| true` overrides that behavior:

- If metrics report issues,
- The script continues,
- CI does not fail.

Why design it this way? Because metrics are often gradual improvements, technical debt indicators, or advisory rather than blocking.

You can later remove `|| true` to make metrics mandatory.

#### 4. Final Success Message

```sh
echo "✅ Quality checks passed"
```

This line only executes if formatting passed, static analysis passed, and tests passed.

If you see this in CI logs, it means the branch has successfully cleared the quality gate. It’s your automated approval before deployment steps begin.

#### What This Script Guarantees

With this in place, every branch must satisfy:

- Clean formatting
- No analyzer errors
- Passing tests
- (Optional) Healthy metrics

That’s how you move from **“We try to maintain quality”** to **“Quality is enforced automatically.”**

Alright, on to the third script.

### Script #3: <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh` (Sentry)

This script is responsible for uploading **obfuscation debug symbols** to Sentry so production crashes remain readable.

```sh tile="upload_symbols.sh"
#!/usr/bin/env bash
set -euo pipefail

RELEASE=${1:-}

[ -z "$RELEASE" ] && exit 2

if ! command -v sentry-cli >/dev/null 2>&1; then
  exit 0
fi

sentry-cli releases new "$RELEASE" || true

sentry-cli upload-dif build/symbols || true

sentry-cli releases finalize "$RELEASE" || true

echo "✅ Symbols uploaded for release $RELEASE"
```

Let's go through it step by step.

#### 1. Reading the Release Identifier

```sh
RELEASE=${1:-}
```

This reads the first positional argument passed to the script.

When you call the script in CI, it typically looks like:

```sh
./scripts/upload_symbols.sh $(git rev-parse --short HEAD)
```

So `$1` becomes the short Git commit SHA.

Using `${1:-}` ensures:

- If no argument is passed, the variable becomes an empty string
- The script does not crash due to `set -u`

This release value ties the uploaded symbols, deployed build, and crash reports all to the exact same commit. This linkage is critical for production debugging.

#### 2. Validating the Release Argument

```sh
[ -z "$RELEASE" ] && exit 2
```

This is a compact validation check.

- `-z` checks whether the string is empty
- If it is empty → exit with status code 2

Conventionally:

- `0` = success
- `1+` = failure
- `2` = incorrect usage

This prevents symbol uploads from running without a release identifier, which would break traceability in Sentry.

#### 3. Checking If `sentry-cli` Exists

```yaml
if ! command -v sentry-cli >/dev/null 2>&1; then
  exit 0
fi
```

This block checks whether the `sentry-cli` tool is available in the environment.

What’s happening:

- `command -v sentry-cli` checks if it exists
- `>/dev/null 2>&1` suppresses all output
- `!` negates the condition

So this reads as: *"If* `sentry-cli` *is NOT installed, exit successfully."*

Why exit with `0` instead of failing?

Because not every environment needs symbol uploads. Also, dev builds may not install Sentry, and you don’t want CI to fail just because Sentry isn’t configured.

This makes symbol uploading **environment-aware** and **optional**.

Production environments can install `sentry-cli`, while dev environments skip it cleanly.

#### 4. Creating a New Release in Sentry

```sh
sentry-cli releases new "$RELEASE" || true
```

This tells Sentry: “A new release exists with this version identifier.”

Even if the release already exists, the script continues because of:

```sh
|| true
```

This prevents the build from failing if:

- The release was already created
- The command returns a non-critical error

The goal is resilience, not strict enforcement.

#### 5. Uploading Debug Information Files (DIFs)

```sh
sentry-cli upload-dif build/symbols || true
```

This is the core step.

`build/symbols` is generated when you build Flutter with:

```sh
--obfuscate --split-debug-info=build/symbols
```

When you obfuscate Flutter builds:

- Method names are renamed
- Stack traces become unreadable

The symbol files allow Sentry to reverse-map obfuscated stack traces and show readable crash reports.

Without this step, production crashes look like:

```dart
a.b.c.d (Unknown Source)
```

With this step, you get:

```dart
AuthRepository.login()
```

Again, `|| true` ensures the build doesn’t fail if:

- The directory doesn’t exist
- No symbols were generated
- Upload encounters a transient issue

Symbol uploads should not block deployment.

#### 6. Finalizing the Release

```sh
sentry-cli releases finalize "$RELEASE" || true
```

This marks the release as complete in Sentry.

Finalizing signals:

- The release is deployed
- It can begin aggregating crash reports
- It’s ready for production monitoring

Like the previous steps, this is soft-failed with `|| true` to keep CI robust.

::: info What This Script Guarantees

When everything is configured correctly:

1. Production build is obfuscated
2. Debug symbols are generated
3. Symbols are uploaded to Sentry
4. Crashes map back to real source code
5. Release version matches commit SHA

:::

That’s production-grade crash observability.

Now that we've gone through the three helper scripts we've created to optimize and enhance this process, lets now dive into the three workflow .yaml files we're going to create.

---

## Workflow #1: <VPIcon icon="iconfont icon-yaml"/>`PR_CHECKS.YML`

This workflow will be designed to help ensure a certain standard is met once a PR is raised into a certain common or base branch. This will ensure that all quality checks in the incoming code pass before allowing any merge into the base branch.

This is basically a gate that verifies the quality of the code that's about to be merged into the base branch. If your pipeline allows unverified code into your base branch, then your CI becomes decorative, not protective.

Lets break down what's actually needed during every PR Check.

### 1. Dependency Integrity

For Flutter apps, where we manage dependencies with the **pub get** command, it's important to make sure that the integrity of all dependencies are confirmed – up to date as well as compatible.

Every PR should begin with:

```sh
flutter pub get
```

This ensures:

- <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` is valid
- Dependency constraints are consistent
- Lockfiles are not broken
- The project is buildable in a clean environment

If this fails, the branch is not deployable.

### 2. Static Analysis

This ensures code quality and architecture integrity. Static analysis helps prevent common issues like forgotten await, dead code, null safety violations, async misuse, and so on.

Most production bugs aren't business logic errors – they're structural carelessness. Static analysis helps enforce consistency automatically, so code reviews focus on intent, not linting.

```sh
flutter analyze --fatal-infos --fatal-warnings
```

### 3. Formatting

This command ensures that your code is properly formatted based on your organization's coding standard and policies.

```sh
dart format --output=none --set-exit-if-changed .
```

### 4. Tests

This runs the unit, widget and business logic tests to ensure quality and avoid regression leaks, silent behavior changes and feature drift.

```sh
flutter test --coverage
```

### 5. Test Coverage Enforcement

Ideally, running tests is not enough. Your workflow should also enforce a minimum threshold:

```sh
if [ \((lcov --summary coverage/lcov.info | grep lines | awk '{print \)2}' | sed 's/%//') -lt 70 ]; then
  echo "Coverage too low"
  exit 1
fi
```

The command above ensures that a minimum test coverage of 70% is met, with this quality becomes measurable.

The five commands above must be checked (at least) for a **quality gate** to guarantee code quality, security, and integrity.

Now here is the full <VPIcon icon="iconfont icon-yaml"/>`pr_checks.yml` file:

```yaml :collapsed-lines title=".github/workflows/pr_checks.yml"
name: PR Quality Gate

on:
  pull_request:
    branches: develop
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  pr-checks:
    name: Run quality checks on this pull request
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Java
        uses: actions/setup-java@v1
        with:
          java-version: "12.x"

      - name: Setup Flutter
        uses: subosito/flutter-action@v1
        with:
          channel: "stable"

      - name: Install dependencies
        run: flutter pub get

      - name: Run quality checks
        run: ./scripts/quality_checks.sh

      - name: Notify Team (Success)
        if: success()
        run: |
          echo "PR Quality Checks PASSED"
          echo "PR: ${{ github.event.pull_request.html_url }}"
          echo "Branch: \({{ github.head_ref }} → \){{ github.base_ref }}"
          echo "By: @${{ github.actor }}"
          echo "Team notification: @foluwaseyi-dev @olabodegbolu"

      - name: Notify Team (Failure)
        if: failure()
        run: |
          echo "PR Quality Checks FAILED"
          echo "PR: ${{ github.event.pull_request.html_url }}"
          echo "Branch: \({{ github.head_ref }} → \){{ github.base_ref }}"
          echo "By: @${{ github.actor }}"
          echo "Please fix the issues before requesting review 🔧"
          echo "Team notification: @foluwaseyi-dev @olabodegbolu"
```

Every time a developer opens (or updates) a pull request targeting the <VPIcon icon="fas fa-code-branch"/>`develop` branch, this workflow kicks in automatically. Think of it as a bouncer at the door: no code gets through without passing inspection first.

### What Triggers it?

The workflow fires on four events: when a PR is `opened`, `synchronized` (new commits pushed), `reopened`, or marked `ready_for_review`. So drafts won't trigger it – only PRs that are actually ready to be looked at.

### What Does it Actually Do?

It spins up a fresh Ubuntu machine and runs five steps in sequence:

1. **Checkout**: pulls down the branch's code
2. **Setup Java 12**: installs the JDK (likely a dependency for some tooling or build process)
3. **Setup Flutter (stable channel)**: this is a Flutter project, so it grabs the stable Flutter SDK
4. **Install dependencies**: runs `flutter pub get` to pull all Dart/Flutter packages
5. **Run quality checks**: executes the helper shell script (<VPIcon icon="fas fa-folder-open"/>`./scripts/`<VPIcon icon="iconfont icon-shell"/>`quality_checks.sh`) that we created which runs linting, tests, formatting checks, or all of the above

### The Notification Layer

After the checks run, the workflow reports the verdict and it's context-aware:

- **If everything passes**, it logs a success message with the PR URL, branch info, and the person who opened it
- **If something fails**, it logs a failure message and nudges the author to fix issues before requesting a review

Both outcomes tag `@foluwaseyi-dev` and `@olabodegbolu` – the two team members responsible for staying in the loop.

This workflow enforces a "fix it before you merge it" culture. No one can merge broken code into `develop` without the team knowing about it.

---

## Workflow #2: <VPIcon icon="iconfont icon-yaml"/>`android.yml`

It's a better practice to split your workflows based on platform. This helps you properly manage the instructions regarding each platform. This is the reason behind keeping the Android workflow separate.

Unlike `PR _Checks`, this workflow presumes that all checks for quality and standards have been done and the code that runs this workflow already meets the required standards.

Based on our predefined use case, let's create a workflow to handle test deployments when merged to develop or staging, and production level activities when merged to production.

```yaml :collapsed-lines title=".github/workflows/android.yml"
name: Android Build & Release

on:
  push:
    branches:
      - develop
      - staging
      - production

jobs:
  android:
    runs-on: ubuntu-latest
    env:
      FLUTTER_VERSION: 'stable'

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'

      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ env.FLUTTER_VERSION }}

      - name: Install dependencies
        run: flutter pub get

      - name: Determine environment
        id: env
        run: |
          echo "branch=\({GITHUB_REF##*/}" >> \)GITHUB_OUTPUT
          if [ "${GITHUB_REF##*/}" = "develop" ]; then
            echo "ENV=dev" >> $GITHUB_OUTPUT
          elif [ "${GITHUB_REF##*/}" = "staging" ]; then
            echo "ENV=staging" >> $GITHUB_OUTPUT
          else
            echo "ENV=production" >> $GITHUB_OUTPUT
          fi

      # Dev uses hardcoded values no secrets needed
      - name: Generate config (dev)
        if: steps.env.outputs.ENV == 'dev'
        run: ./scripts/generate_config.sh dev "https://dev.api.example.com" "dev_dummy_key"

      # Staging and production inject real secrets
      - name: Generate config (staging/production)
        if: steps.env.outputs.ENV != 'dev'
        run: |
          if [ "${{ steps.env.outputs.ENV }}" = "staging" ]; then
            ./scripts/generate_config.sh staging \
              "${{ secrets.STAGING_BASE_URL }}" \
              "${{ secrets.STAGING_API_KEY }}"
          else
            ./scripts/generate_config.sh production \
              "${{ secrets.PROD_BASE_URL }}" \
              "${{ secrets.PROD_API_KEY }}"
          fi

      # Keystore is only needed for signed builds (staging & production)
      - name: Restore Keystore
        if: steps.env.outputs.ENV != 'dev'
        run: |
          echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/upload-keystore.jks

      # Production builds are obfuscated + split debug info for Play Store
      - name: Build artifact
        run: |
          if [ "${{ steps.env.outputs.ENV }}" = "production" ]; then
            flutter build appbundle --release \
              --obfuscate \
              --split-debug-info=build/symbols
          else
            flutter build appbundle --release
          fi

      # Dev and staging go to Firebase App Distribution for internal testing
      - name: Upload to Firebase App Distribution
        if: steps.env.outputs.ENV == 'dev' || steps.env.outputs.ENV == 'staging'
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          FIREBASE_ANDROID_APP_ID: ${{ secrets.FIREBASE_ANDROID_APP_ID }}
          FIREBASE_GROUPS: ${{ secrets.FIREBASE_GROUPS }}
        run: |
          firebase appdistribution:distribute \
            build/app/outputs/bundle/release/app-release.aab \
            --app "$FIREBASE_ANDROID_APP_ID" \
            --groups "$FIREBASE_GROUPS" \
            --token "$FIREBASE_TOKEN"

      # Only production goes to the Play Store
      - name: Upload to Play Store
        if: steps.env.outputs.ENV == 'production'
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
          packageName: com.your.package
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: production

      - name: Notify Team (Success)
        if: success()
        run: |
          echo "Android Build & Release PASSED"
          echo "Environment: ${{ steps.env.outputs.ENV }}"
          echo "Branch: ${{ steps.env.outputs.branch }}"
          echo "By: @${{ github.actor }}"
          echo "Commit: ${{ github.sha }}"

      - name: Notify Team (Failure)
        if: failure()
        run: |
          echo "Android Build & Release FAILED"
          echo "Environment: ${{ steps.env.outputs.ENV }}"
          echo "Branch: ${{ steps.env.outputs.branch }}"
          echo "By: @${{ github.actor }}"
          echo "Commit: ${{ github.sha }}"
          echo "Check the logs and fix the issue before retrying"
```

This workflow ensures that whenever code lands on the **<VPIcon icon="fas fa-code-branch"/>`develop`, <VPIcon icon="fas fa-code-branch"/>`staging` or <VPIcon icon="fas fa-code-branch"/>`production`** branch, this action is triggered on a fresh Ubuntu machine.

This is triggered by a simple push to any of the tracked branches, no manual intervention needed.

Let's walk through it piece by piece.

### 1. The Setup Phase

Before any Flutter-specific work happens, the workflow lays the foundation:

1. **Checkout**: grabs the latest code from the branch that triggered the run (using the more modern `actions/checkout@v3`).
2. **Java 11 via Temurin**: this is an upgrade from the first workflow we created. Instead of a generic `setup-java@v1`, this uses the `temurin` distribution which is the Eclipse's open-source JDK build. It's the current industry standard for Android toolchains.
3. **Flutter (stable)**: this pulls the stable Flutter SDK, version pinned via an environment variable (`FLUTTER_VERSION: 'stable'`) defined at the job level.
4. **Install dependencies**: this ensures we run `flutter pub get` to pull all packages

### 2. Environment Detection

This is where it gets interesting. This workflow also checks and determines the environment which will help us define the next set of instructions to run.

This command reads the branch name from **GITHUB REF** and maps it to its environment label which we already created in one of our helper scripts.

- develop → ENV=dev
- staging → ENV=staging
- production → ENV=production

It strips the branch name from the full ref path using `\({GITHUB_REF##*/}`, then writes both the branch name and the resolved `ENV` value to `\)GITHUB_OUTPUT`, making them available as named outputs (`steps.env.outputs.ENV`) for every subsequent step.

This means the rest of the pipeline can branch its behaviour based on which environment it's building for, different API keys, different signing configs, different targets – whatever the app needs.

### 3. Config Injection

With the environment resolved, the next step is injecting the right configuration into the app. This is where the <VPIcon icon="iconfont icon-shell"/>`generate_config.sh` script we built earlier gets called directly from the workflow.

For the `dev` environment, hardcoded placeholder values are used. No real secrets are needed, since this build is only meant for internal developer testing:

```yaml
- name: Generate config (dev)
  if: steps.env.outputs.ENV == 'dev'
  run: ./scripts/generate_config.sh dev "https://dev.api.example.com" "dev_dummy_key"
```

For staging and production, however, real secrets are pulled from GitHub Actions secrets and passed directly into the script:

```yaml
- name: Generate config (staging/production)
  if: steps.env.outputs.ENV != 'dev'
  run: |
    if [ "${{ steps.env.outputs.ENV }}" = "staging" ]; then
      ./scripts/generate_config.sh staging \
        "${{ secrets.STAGING_BASE_URL }}" \
        "${{ secrets.STAGING_API_KEY }}"
    else
      ./scripts/generate_config.sh production \
        "${{ secrets.PROD_BASE_URL }}" \
        "${{ secrets.PROD_API_KEY }}"
    fi
```

Notice that these two steps use an `if` condition to make them mutually exclusive. Only one will ever run per job. This keeps the pipeline clean: no complicated branching logic inside the script itself, just a clear decision at the workflow level.

### 4. Keystore Restoration

Android requires signed builds for distribution. The signing keystore file cannot be committed to the repository for obvious security reasons, so it's stored as a Base64-encoded GitHub secret and decoded at build time.

```yaml
- name: Restore Keystore
  if: steps.env.outputs.ENV != 'dev'
  run: |
    echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/upload-keystore.jks
```

This step is skipped entirely for the `dev` environment because dev builds are unsigned debug artifacts meant purely for internal testing on Firebase App Distribution. Only staging and production builds need to be properly signed.

To encode your keystore file as a Base64 string for storing in GitHub secrets, you have to run this locally:

```sh
base64 -i upload-keystore.jks | pbcopy
```

This copies the encoded string to your clipboard, which you can then paste directly into your GitHub repository secrets.

### 5. Building the Artifact

With the environment configured and the keystore in place, the workflow builds the app bundle:

```yaml
- name: Build artifact
  run: |
    if [ "${{ steps.env.outputs.ENV }}" = "production" ]; then
      flutter build appbundle --release \
        --obfuscate \
        --split-debug-info=build/symbols
    else
      flutter build appbundle --release
    fi
```

There's a deliberate difference between how production and non-production builds are compiled.

For production:

- `--obfuscate` renames method and class names in the compiled output, making it significantly harder to reverse engineer the app
- `--split-debug-info=build/symbols` extracts the debug symbols into a separate directory at `build/symbols`

These symbols are what <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh` later ships to Sentry, so obfuscated crash reports remain readable in your monitoring dashboard.

For dev and staging, neither flag is used. This keeps build times faster and makes local debugging easier since stack traces remain human-readable.

### 6. Distributing to Firebase App Distribution

Once the app bundle is built, dev and staging builds are uploaded to Firebase App Distribution so testers can install them immediately:

```yaml
- name: Upload to Firebase App Distribution
  if: steps.env.outputs.ENV == 'dev' || steps.env.outputs.ENV == 'staging'
  env:
    FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
    FIREBASE_ANDROID_APP_ID: ${{ secrets.FIREBASE_ANDROID_APP_ID }}
    FIREBASE_GROUPS: ${{ secrets.FIREBASE_GROUPS }}
  run: |
    firebase appdistribution:distribute \
      build/app/outputs/bundle/release/app-release.aab \
      --app "$FIREBASE_ANDROID_APP_ID" \
      --groups "$FIREBASE_GROUPS" \
      --token "$FIREBASE_TOKEN"
```

Three secrets power this step:

- `FIREBASE_TOKEN`: the authentication token generated from `firebase login:ci`
- `FIREBASE_ANDROID_APP_ID`: the app identifier from the Firebase console
- `FIREBASE_GROUPS`: the tester group(s) that should receive the build notification

Once this step completes, every tester in the specified groups receives an email with a direct download link. No one needs to manually share an APK file over Slack or email.

### 7. Deploying to the Play Store

Production builds skip Firebase entirely and goes straight to the Google Play Store:

```yaml
- name: Upload to Play Store
  if: steps.env.outputs.ENV == 'production'
  uses: r0adkll/upload-google-play@v1
  with:
    serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
    packageName: com.your.package
    releaseFiles: build/app/outputs/bundle/release/app-release.aab
    track: production
```

This uses the `r0adkll/upload-google-play` GitHub Action, which handles the Google Play API interaction under the hood. The only requirements are:

- A Google Play service account with the correct permissions, stored as a JSON secret
- The correct package name matching what is registered in your Play Console
- The `track` set to `production` (you can also use `internal`, `alpha`, or `beta` depending on your release strategy)

Replace `com.your.package` with your actual application ID (the same one defined in your `build.gradle` file).

### 8. The Notification Layer

Just like the PR checks workflow, this workflow reports its outcome clearly:

```yaml
- name: Notify Team (Success)
  if: success()
  run: |
    echo "Android Build & Release PASSED"
    echo "Environment: ${{ steps.env.outputs.ENV }}"
    echo "Branch: ${{ steps.env.outputs.branch }}"
    echo "By: @${{ github.actor }}"
    echo "Commit: ${{ github.sha }}"

- name: Notify Team (Failure)
  if: failure()
  run: |
    echo "Android Build & Release FAILED"
    echo "Environment: ${{ steps.env.outputs.ENV }}"
    echo "Branch: ${{ steps.env.outputs.branch }}"
    echo "By: @${{ github.actor }}"
    echo "Commit: ${{ github.sha }}"
    echo "Check the logs and fix the issue before retrying 🔧"
```

The success notification includes the environment, branch, actor, and shares everything needed to trace exactly what was deployed and who triggered it.

The failure notification includes the same context, with a clear call to action.

---

## Workflow #3: iOS.yml

iOS CI/CD is more complex than Android by nature. This is because Apple's signing requirements involve certificates, provisioning profiles, and entitlements that all need to be in the right place before Xcode will produce a valid archive.

Fastlane helps us handles all of that complexity, and the workflow simply calls into it.

Here is the full <VPIcon icon="iconfont icon-yaml"/>`ios.yml`:

```yaml :collapsed-lines title=".github/workflows/ios.yml"
name: iOS Build & Release

on:
  push:
    branches:
      - develop
      - staging
      - production

jobs:
  ios:
    runs-on: macos-latest
    env:
      FLUTTER_VERSION: 'stable'

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ env.FLUTTER_VERSION }}

      - name: Install dependencies
        run: flutter pub get

      - name: Determine environment
        id: env
        run: |
          echo "branch=\({GITHUB_REF##*/}" >> \)GITHUB_OUTPUT
          if [ "${GITHUB_REF##*/}" = "develop" ]; then
            echo "ENV=dev" >> $GITHUB_OUTPUT
          elif [ "${GITHUB_REF##*/}" = "staging" ]; then
            echo "ENV=staging" >> $GITHUB_OUTPUT
          else
            echo "ENV=production" >> $GITHUB_OUTPUT
          fi

      - name: Generate config (dev)
        if: steps.env.outputs.ENV == 'dev'
        run: ./scripts/generate_config.sh dev "https://dev.api.example.com" "dev_dummy_key"

      - name: Generate config (staging/production)
        if: steps.env.outputs.ENV != 'dev'
        run: |
          if [ "${{ steps.env.outputs.ENV }}" = "staging" ]; then
            ./scripts/generate_config.sh staging \
              "${{ secrets.STAGING_BASE_URL }}" \
              "${{ secrets.STAGING_API_KEY }}"
          else
            ./scripts/generate_config.sh production \
              "${{ secrets.PROD_BASE_URL }}" \
              "${{ secrets.PROD_API_KEY }}"
          fi

      - name: Install Fastlane
        run: |
          cd ios
          gem install bundler
          bundle install

      - name: Import signing certificate
        if: steps.env.outputs.ENV != 'dev'
        run: |
          echo "${{ secrets.IOS_CERTIFICATE_BASE64 }}" | base64 --decode > ios/cert.p12
          security create-keychain -p "" build.keychain
          security import ios/cert.p12 -k build.keychain -P "${{ secrets.IOS_CERTIFICATE_PASSWORD }}" -T /usr/bin/codesign
          security list-keychains -s build.keychain
          security default-keychain -s build.keychain
          security unlock-keychain -p "" build.keychain
          security set-key-partition-list -S apple-tool:,apple: -s -k "" build.keychain

      - name: Install provisioning profile
        if: steps.env.outputs.ENV != 'dev'
        run: |
          echo "${{ secrets.IOS_PROVISIONING_PROFILE_BASE64 }}" | base64 --decode > profile.mobileprovision
          mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
          cp profile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/

      - name: Build iOS (dev)
        if: steps.env.outputs.ENV == 'dev'
        run: flutter build ios --release --no-codesign

      - name: Build & distribute to TestFlight (staging)
        if: steps.env.outputs.ENV == 'staging'
        env:
          APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
          APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_API_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_CONTENT: ${{ secrets.APP_STORE_CONNECT_API_KEY_CONTENT }}
        run: |
          cd ios
          bundle exec fastlane beta

      - name: Build & release to App Store (production)
        if: steps.env.outputs.ENV == 'production'
        env:
          APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
          APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_API_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_CONTENT: ${{ secrets.APP_STORE_CONNECT_API_KEY_CONTENT }}
        run: |
          cd ios
          bundle exec fastlane release

      - name: Upload Sentry symbols (production only)
        if: steps.env.outputs.ENV == 'production'
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        run: ./scripts/upload_symbols.sh $(git rev-parse --short HEAD)

      - name: Notify Team (Success)
        if: success()
        run: |
          echo "iOS Build & Release PASSED"
          echo "Environment: ${{ steps.env.outputs.ENV }}"
          echo "Branch: ${{ steps.env.outputs.branch }}"
          echo "By: @${{ github.actor }}"
          echo "Commit: ${{ github.sha }}"

      - name: Notify Team (Failure)
        if: failure()
        run: |
          echo "iOS Build & Release FAILED"
          echo "Environment: ${{ steps.env.outputs.ENV }}"
          echo "Branch: ${{ steps.env.outputs.branch }}"
          echo "By: @${{ github.actor }}"
          echo "Commit: ${{ github.sha }}"
          echo "Check the logs and fix the issue before retrying 🔧"
```

Let's walk through what is different about this workflow compared to that of android.

### 1. MacOS Runner

```yaml
runs-on: macos-latest
```

This is the major difference.

iOS builds require Xcode, which only runs on macOS. GitHub Actions provides hosted macOS runners, but they are significantly more expensive in terms of compute minutes than Ubuntu runners. Just keep that in mind when thinking about build frequency.

No Java setup is needed here. Flutter on iOS compiles through Xcode directly, so the toolchain requirements are different.

### 2. Installing Fastlane

```yaml
- name: Install Fastlane
  run: |
    cd ios
    gem install bundler
    bundle install
```

Fastlane is a Ruby-based automation tool that handles certificate management, building, and uploading to TestFlight and the App Store.

This step navigates into the <VPIcon icon="fas fa-folder-open"/>`ios/` directory and installs Fastlane along with all its dependencies as defined in the project's <VPIcon icon="iconfont icon-ruby"/>`Gemfile`.

Your <VPIcon icon="fas fa-folder-open"/>`ios/`<VPIcon icon="iconfont icon-ruby"/>`Gemfile` should look something like this:

```ruby title="Gemfile"
source "https://rubygems.org"

gem "fastlane"
```

And your <VPIcon icon="fas fa-folder-open"/>`ios/fastlane/`<VPIcon icon="iconfont icon-ruby"/>`Fastfile` should define at minimum two lanes: one for staging (TestFlight) and one for production (App Store):

```ruby title="ios/fastlane/Fastfile"
default_platform(:ios)

platform :ios do
  lane :beta do
    build_app(scheme: "Runner", export_method: "app-store")
    upload_to_testflight(skip_waiting_for_build_processing: true)
  end

  lane :release do
    build_app(scheme: "Runner", export_method: "app-store")
    upload_to_app_store(force: true, skip_screenshots: true, skip_metadata: true)
  end
end
```

### 3. Certificate and Provisioning Profile Setup

This is the step that trips most teams up the first time. Apple's code signing requires two things to be present on the machine:

1. The signing certificate (a <VPIcon icon="fas fa-key"/>`.p12` file)
2. The provisioning profile

Both are stored as Base64-encoded GitHub secrets and restored at build time.

```yaml
- name: Import signing certificate
  if: steps.env.outputs.ENV != 'dev'
  run: |
    echo "${{ secrets.IOS_CERTIFICATE_BASE64 }}" | base64 --decode > ios/cert.p12
    security create-keychain -p "" build.keychain
    security import ios/cert.p12 -k build.keychain -P "${{ secrets.IOS_CERTIFICATE_PASSWORD }}" -T /usr/bin/codesign
    security list-keychains -s build.keychain
    security default-keychain -s build.keychain
    security unlock-keychain -p "" build.keychain
    security set-key-partition-list -S apple-tool:,apple: -s -k "" build.keychain
```

Breaking this down step by step:

- Decodes the Base64 certificate and write it to <VPIcon icon="fas fa-key"/>`cert.p12`
- Creates a temporary keychain called `build.keychain` with an empty password
- Imports the certificate into that keychain, granting codesign access
- Sets it as the default keychain so Xcode finds it automatically
- Unlocks the keychain so it can be used non-interactively
- Sets partition list to allow access without repeated prompts

The provisioning profile step is simpler:

```yaml
- name: Install provisioning profile
  if: steps.env.outputs.ENV != 'dev'
  run: |
    echo "${{ secrets.IOS_PROVISIONING_PROFILE_BASE64 }}" | base64 --decode > profile.mobileprovision
    mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
    cp profile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/
```

It decodes the profile and copies it into the exact directory where Xcode expects to find provisioning profiles on any macOS system.

To encode your certificate and profile locally, you can run these:

```sh
base64 -i Certificates.p12 | pbcopy   # for the certificate
base64 -i YourApp.mobileprovision | pbcopy   # for the provisioning profile
```

### 4. Building for Each Environment

Dev builds skip signing entirely. They're built without code signing just to verify the project compiles correctly on a clean machine:

```yaml
- name: Build iOS (dev)
  if: steps.env.outputs.ENV == 'dev'
  run: flutter build ios --release --no-codesign
```

Staging builds go through Fastlane's `beta` lane, which builds and uploads to TestFlight. Production builds go through Fastlane's `release` lane, which submits directly to App Store Connect.

Both staging and production steps consume the same three App Store Connect API key secrets: the key ID, the issuer ID, and the key content itself.

Fastlane uses these to authenticate with Apple's API without requiring a manual Apple ID login.

### 5. Sentry Symbol Upload

On production iOS builds, the <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh` script runs after the build completes, passing the current short commit SHA as the release identifier:

```yaml
- name: Upload Sentry symbols (production only)
  if: steps.env.outputs.ENV == 'production'
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
    SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
  run: ./scripts/upload_symbols.sh $(git rev-parse --short HEAD)
```

This is the same script explained earlier in the helper scripts section. It creates a Sentry release, uploads the debug information files, and finalizes the release. Any production crash from this point forward will map back to real, readable source code in your Sentry dashboard.

---

## Secrets and Configuration Reference

For this entire pipeline to work, you need to configure the following secrets in your GitHub repository. Go to **Settings → Secrets and variables → Actions → New repository secret** to add each one.

### Shared (used across environments)

| Secret | Description |
| --- | --- |
| `FIREBASE_TOKEN` | Generated via `firebase login:ci` on your local machine |
| `FIREBASE_ANDROID_APP_ID` | Android app ID from your Firebase console |
| `FIREBASE_GROUPS` | Comma-separated tester group names in Firebase |
| `SENTRY_AUTH_TOKEN` | Auth token from your Sentry account settings |
| `SENTRY_ORG` | Your Sentry organization slug |
| `SENTRY_PROJECT` | Your Sentry project slug |

### Staging

| Secret | Description |
| --- | --- |
| `STAGING_BASE_URL` | Your staging API base URL |
| `STAGING_API_KEY` | Your staging API or encryption key |

### Production

| Secret | Description |
| --- | --- |
| `PROD_BASE_URL` | Your production API base URL |
| `PROD_API_KEY` | Your production API or encryption key |

### Android

| Secret | Description |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded `.jks` keystore file |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Full JSON content of your Play Console service account |

### iOS

| Secret | Description |
| --- | --- |
| `IOS_CERTIFICATE_BASE64` | Base64-encoded `.p12` signing certificate |
| `IOS_CERTIFICATE_PASSWORD` | Password protecting the `.p12` file |
| `IOS_PROVISIONING_PROFILE_BASE64` | Base64-encoded `.mobileprovision` file |
| `APP_STORE_CONNECT_API_KEY_ID` | Key ID from App Store Connect → Users & Access → Keys |
| `APP_STORE_CONNECT_API_ISSUER_ID` | Issuer ID from the same App Store Connect page |
| `APP_STORE_CONNECT_API_KEY_CONTENT` | The full content of the downloaded `.p8` key file |

None of these values should ever appear in your codebase. If any secret is accidentally committed, rotate it immediately.

---

## End-to-End Flow

With all three workflows in place, here is exactly what happens from the moment a developer opens a pull request to the moment a user receives an update:

### 1. Developer Opens a PR into <VPIcon icon="fas fa-code-branch"/>`develop`

The <VPIcon icon="iconfont icon-yaml"/>`pr_checks.yml` workflow fires. It runs formatting checks, static analysis, and the full test suite. If anything fails, the PR cannot be merged and the team is notified immediately. The developer fixes the issues and pushes again, which triggers a fresh run.

### 2. PR is Approved and Merged into <VPIcon icon="fas fa-code-branch"/>`develop`

The <VPIcon icon="iconfont icon-yaml"/>`android.yml` and <VPIcon icon="iconfont icon-yaml"/>`ios.yml` workflows both fire on the push event. They detect the environment as `dev`, inject placeholder config, build unsigned artifacts, and upload them to Firebase App Distribution. Testers receive an email and can install the build on their devices within minutes – no one shared a file manually.

### 3. <VPIcon icon="fas fa-code-branch"/>`develop` is Merged into <VPIcon icon="fas fa-code-branch"/>`staging`

Both platform workflows fire again. This time the environment resolves to <VPIcon icon="fas fa-code-branch"/>`staging`. Real secrets are injected, builds are properly signed, and the artifacts go to Firebase App Distribution (Android) and TestFlight (iOS). QA begins testing the staging build against the staging API.

### 4. <VPIcon icon="fas fa-code-branch"/>`staging` is merged into <VPIcon icon="fas fa-code-branch"/>`production`

Both workflows fire one final time. Production secrets are injected, builds are obfuscated and signed, debug symbols are uploaded to Sentry, and the final artifacts are submitted to the Google Play Store and App Store Connect. The release goes live on Apple and Google's review timelines with no further human intervention required.

From that first PR to a production submission, not a single command was run manually.

---

## Conclusion

Building this pipeline is an upfront investment that pays off from the very first release cycle. What used to be a sequence of error-prone manual steps building locally, signing, uploading, switching configs, and hoping nothing was mixed up is now a fully automated, auditable, and repeatable process that runs the moment code moves between branches.

The architecture we built here does more than just automate builds. The PR quality gate enforces team standards consistently, so code review becomes a conversation about intent rather than a hunt for formatting issues. The environment-aware config injection eliminates an entire class of production incidents where staging keys made it into a live release. The Sentry symbol upload means your team can debug production crashes with full source visibility even from an obfuscated binary.

Every piece of this pipeline also runs locally. The helper scripts in the <VPIcon icon="fas fa-folder-open"/>`scripts/` folder are plain Bash so you can call them from your terminal the same way CI calls them. This eliminates the frustrating cycle of pushing a commit just to test a pipeline change.

As your team grows, this foundation scales with you. You can extend the <VPIcon icon="iconfont icon-yaml"/>`pr_checks.yml` to enforce code coverage thresholds, add a performance benchmarking job, or introduce a dedicated security scanning step. You can extend the platform workflows to support multiple flavors, multiple Firebase projects, or staged rollouts on the Play Store. The architecture stays the same – you're just adding new steps to an already working system.

This ensures that standards are met, code quality remains high, you have a proper team structure, clear process and automated post development activities are in place – and at the end of the day, you'll have an optimized engineering approach that will help your team in so many ways.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Ready Flutter CI/CD Pipeline with GitHub Actions: Quality Gates, Environments, and Store Deployment",
  "desc": "Mobile application development has evolved over the years. The processes, structure, and syntax we use has changed, as well as the quality and flexibility of the apps we build. One of the major improv",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-flutter-ci-cd-pipeline-with-github-actions-quality-gates-environments-and-store-deployment/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
