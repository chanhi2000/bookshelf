---
lang: en-US
title: "How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases"
description: "Article(s) > How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases"
icon: fa-brands fa-dart-lang
category: 
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases"
    - property: og:description
      content: "How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-complete-flutter-ci-cd-pipeline-with-codemagic.html
prev: /programming/dart/articles/README.md
date: 2026-03-24
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/914de6f3-5b7f-48ff-a092-1f8d095202e5.png
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

[[toc]]

---

<SiteInfo
  name="How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases"
  desc="If you've spent any time shipping Flutter apps manually, you already know the drill. Someone on the team finishes a feature, builds the APK locally, signs it (hopefully with the right keystore), uploa"
  url="https://freecodecamp.org/news/build-a-complete-flutter-ci-cd-pipeline-with-codemagic"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/914de6f3-5b7f-48ff-a092-1f8d095202e5.png"/>

If you've spent any time shipping Flutter apps manually, you already know the drill. Someone on the team finishes a feature, builds the APK locally, signs it (hopefully with the right keystore), uploads it somewhere, and notifies the QA team. Repeat for iOS. Repeat for staging. Repeat for production.

And somewhere in that chain, something often goes wrong: an incorrect API key, a missed signing step, a build that worked on one machine and failed on another.

The solution is a properly configured CI/CD pipeline that takes that entire chain out of human hands. And in this article, we're building exactly that using Codemagic.

---

## What is Codemagic?

Codemagic is a dedicated CI/CD platform built from the ground up specifically for mobile applications.

Unlike general-purpose CI platforms, Codemagic understands Flutter natively. It ships with Flutter pre-installed on its build machines, has dedicated support for Apple code signing, and integrates directly with both the Google Play Store and App Store Connect. This means less configuration noise and more focus on what actually matters , which is your deployment logic.

The pipeline we'll be building covers three distinct stages across both Android and iOS:

- A pull request gate that blocks unverified code from reaching your base branch
- A staging pipeline that injects real environment config, builds signed artifacts, and ships them to testers via Firebase App Distribution and TestFlight
- A production pipeline that obfuscates builds, uploads crash symbols to Sentry, and submits directly to the Play Store and App Store Connect

::: note Prerequisites

You'll need the following before starting:

- A Flutter app with functional Android and iOS builds
- A Codemagic account with your repository connected
- A Firebase project with App Distribution set up
- A Sentry project configured for your app
- A Google Play Console app with at least an internal track ready
- An Apple Developer account with App Store Connect access
- A Google Play service account with the necessary API permissions
- Familiarity with writing Bash scripts

:::

---

## Understanding Codemagic's YAML Approach

Codemagic offers a visual workflow editor for teams that prefer a GUI – but we're not using that here. The <VPIcon icon="iconfont icon-yaml"/>`codemagic.yaml` approach gives you version-controlled, reviewable, fully reproducible pipeline definitions that live right alongside your application code. Any change to the pipeline goes through the same PR process as any other change. That matters in a team environment.

The file lives at the root of your project:

```sh title="file structure"
your-flutter-app/
  codemagic.yaml     
  lib/
  android/
  ios/
  scripts/
```

Codemagic detects this file when a build is triggered and executes the appropriate workflow based on the rules you define. One file, multiple workflows, all environments – no duplication.

---

## Pipeline Architecture

Before writing any YAML, it helps to define exactly what the pipeline needs to do. The use case here is a team with three protected branches: `develop`, `staging`, and `production`. Each branch represents a distinct stage in the release lifecycle, and the pipeline behaves differently depending on which branch triggered it.

Here is how the three environments map to pipeline behaviour:

### PR into develop

When a developer raises a pull request targeting the `develop` branch, a quality gate workflow fires. It runs code formatting checks, static analysis, the full test suite, and enforces a minimum coverage threshold. The PR cannot be considered clean until all of these pass.

### Push to develop or staging

When code lands on either of these branches, the platform-specific build pipelines trigger. They detect the target branch, inject the correct environment configuration (dev or staging API keys), build signed artifacts, and distribute them to the appropriate testing channels: Firebase App Distribution for Android, TestFlight for iOS.

### Push to production

When code reaches the production branch, the pipelines switch into release mode. Builds are obfuscated, debug symbols are uploaded to Sentry for crash observability, and the final artifacts are submitted directly to the Play Store and App Store Connect.

Your project structure will look like this:

```sh title="file structure"
codemagic.yaml
📂scripts/
├── generate_config.sh
├── quality_checks.sh
└── upload_symbols.sh
📂lib/core/env/
├── env_ci.dart
└── env_ci.g.dart
```

---

## The Helper Scripts

Rather than cramming logic directly into YAML, this pipeline delegates its core operations to three Bash scripts that live in a <VPIcon icon="fas fa-folder-open"/>`scripts/` folder at the project root. This keeps the YAML readable and, crucially, means you can run the exact same logic on your local machine that CI runs – eliminating an entire class of "works on my machine" issues.

Make all three scripts executable before committing them:

```sh
chmod +x scripts/generate_config.sh
chmod +x scripts/quality_checks.sh
chmod +x scripts/upload_symbols.sh
```

### generate_config.sh

Injecting secrets safely is one of the hardest CI/CD problems in mobile development. The strategy here avoids committing credentials entirely: a Dart file with placeholder values is committed to source control, and at build time the script replaces those placeholders with real values sourced from Codemagic's encrypted secret storage.

```sh
#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/generate_config.sh ENV_NAME BASE_URL ENCRYPTION_KEY
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

echo "✅ Generated config for $ENV_NAME"
```

::: info How it works:

`set -euo pipefail` enforces strict failure behaviour. `-e` exits immediately on any failed command, `-u` exits on undefined variables, and `-o pipefail` catches failures anywhere in a pipeline – not just the last command. In CI, silent failures can produce broken builds that look like they succeeded. This line prevents that.

The script takes three positional arguments: the environment name (`dev`, `staging`, or `production`), the API base URL, and an encryption or API key. The `${1:-}` syntax defaults to an empty string if an argument is missing, which the validation block then catches explicitly with a clear usage message and an exit code of `2` (the conventional code for incorrect usage).

At the heart of the script, `sed` performs three placeholder replacements in a single pass over the template file, writing the result to <VPIcon icon="fa-brands fa-dart-lang"/>`env_ci.g.dart`. That generated file must be added to <VPIcon icon="iconfont icon-git"/>`.gitignore`. It only ever exists inside a running build or on a developer's local machine after they run the script manually.

:::

The two Dart files involved have completely different roles:

<VPIcon icon="fa-brands fa-dart-lang"/>`env_ci.dart` – committed to source control, contains only placeholders:

```dart title="lib/core/env/env_ci.dart"
class EnvConfig {
  static const String baseUrl = '<<BASE_URL>>';
  static const String encryptionKey = '<<ENCRYPTION_KEY>>';
  static const String environment = '<<ENV_NAME>>';
}
```

<VPIcon icon="fa-brands fa-dart-lang"/>`env_ci.g.dart` – generated at build time, contains real values, never committed:

```dart title="lib/core/env/env_ci.g.dart"
// GENERATED FILE — DO NOT COMMIT
class EnvConfig {
  static const String baseUrl = 'https://staging.api.example.com';
  static const String encryptionKey = 'sk_live_xxxxx';
  static const String environment = 'staging';
}
```

Add the generated file to <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```plaintext title=".gitignore"
# Generated environment config
lib/core/env/env_ci.g.dart
```

### quality_checks.sh

This script defines what passing quality means for your codebase. Every check it runs is a gate: if any step fails, the script stops immediately and the build fails.

```sh
#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Running quality checks"

dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test --no-pub --coverage

if command -v dart_code_metrics >/dev/null 2>&1; then
  dart_code_metrics analyze lib --reporter=console || true
fi

echo "✅ Quality checks passed"
```

::: info What each step does:

`dart format --output=none --set-exit-if-changed .`: checks that all Dart files are formatted correctly without modifying them. If any file doesn't match the formatter's output, the command exits with a non-zero code, failing the build. Formatting is non-negotiable here.

`flutter analyze`: runs Dart's static analyser across the entire project. It catches null safety violations, unused imports, missing awaits, dead code, and a wide range of structural issues before they reach a reviewer's eyes.

`flutter test --no-pub --coverage`: runs the full test suite and generates a coverage report at `coverage/lcov.info`. The `--no-pub` flag skips `pub get` since dependencies are already installed. The coverage file is used downstream to enforce a minimum threshold.

The `dart_code_metrics` block is deliberately optional and non-blocking (`|| true`). The tool may not be installed in every environment, and its findings are advisory rather than hard failures. You can remove the `|| true` later to make it mandatory once your team has adopted the tool.

The final `echo` line only executes if every step above it passed , because `set -e` would have exited the script on any earlier failure. If you see it in the logs, the branch is clean.

:::

### <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh`

When Flutter production builds are compiled with `--obfuscate`, stack traces in crash reports become unreadable. This script uploads the debug symbol files that Sentry needs to reverse that obfuscation and show readable crash reports.

```sh
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

::: info How it works:

The script takes a single argument: a release identifier. In practice, this is always the short Git commit SHA, passed from the workflow as `$(git rev-parse --short HEAD)`. This ties the uploaded symbols, the deployed build, and the crash reports in Sentry to the exact same commit , which is essential for production debugging.

If `sentry-cli` is not installed in the environment, the script exits with `0` rather than failing. This makes symbol uploads environment-aware: production machines install the CLI, development environments skip the step cleanly without breaking the build.

Each `sentry-cli` command uses `|| true` for resilience. Symbol uploads should never block a deployment , if the upload encounters a transient issue, the build should still succeed and the symbols can be re-uploaded manually from the stored artifacts.

The three commands do the following in sequence: `releases new` registers the release version in Sentry, `upload-dif` sends the debug information files from `build/symbols` (generated by `--split-debug-info`), and `releases finalize` marks the release as deployed and ready to aggregate crash reports.

:::

---

## The codemagic.yaml Structure

A <VPIcon icon="iconfont icon-yaml"/>`codemagic.yaml` file is organized around workflows. Each workflow is an independent pipeline definition with its own trigger rules, environment configuration, build scripts, and publishing targets. Multiple workflows live inside the same file under a top-level `workflows` key.

The skeleton looks like this:

```yaml title="codemagic.yaml"
workflows:
  pr-quality-gate:
    # triggers on pull requests
    # runs quality checks only

  android-pipeline:
    # triggers on push to develop, staging, production
    # handles Android builds and distribution

  ios-pipeline:
    # triggers on push to develop, staging, production
    # handles iOS builds and distribution
```

Each workflow can define its own machine type, environment variables, triggering conditions, and step scripts. This is what makes a single <VPIcon icon="iconfont icon-yaml"/>`codemagic.yaml` powerful: you're not managing three separate files, but you still get complete isolation between pipeline stages.

---

## PR Quality Gate

Every PR raised against `develop` must pass a quality gate before any merge is allowed. This workflow runs on Codemagic's Linux machines since it doesn't need to produce a signed artifact for any platform – it only needs to verify the code.

```yaml title="codemagic.yaml"
workflows:
  pr-quality-gate:
    name: PR Quality Gate
    max_build_duration: 30
    instance_type: linux_x2

    triggering:
      events:
        - pull_request
      branch_patterns:
        - pattern: develop
          include: true
          source: true

    environment:
      flutter: stable

    scripts:
      - name: Install dependencies
        script: flutter pub get

      - name: Run quality checks
        script: ./scripts/quality_checks.sh

      - name: Enforce coverage threshold
        script: |
          COVERAGE=\((lcov --summary coverage/lcov.info | grep lines | awk '{print \)2}' | sed 's/%//')
          if [ \((echo "\)COVERAGE < 70" | bc) -eq 1 ]; then
            echo "Test coverage is at ${COVERAGE}% — minimum required is 70%"
            exit 1
          fi
          echo "Coverage at ${COVERAGE}% — threshold met"

    publishing:
      email:
        recipients:
          - your-team@example.com
        notify:
          success: true
          failure: true
```

::: info Let's walk through what each section is doing.

- `instance_type: linux_x2`: Codemagic offers different machine types for different workloads. For a quality gate that only needs to run Dart tooling, a Linux machine is perfectly sufficient and significantly cheaper than a macOS instance. You reserve the macOS machines for builds that actually need Xcode.
- `triggering`: This is how Codemagic decides when to run a workflow. The `pull_request` event fires whenever a PR is opened or updated. The `branch_patterns` block tells Codemagic to watch for PRs targeting `develop` specifically. The `source: true` flag means this pattern applies to the target branch of the PR, not the source branch – so any branch raising a PR into `develop` will trigger this workflow.
- `environment`: Codemagic's Flutter-aware machines come with multiple Flutter versions available. Setting `flutter: stable` pins the workflow to the current stable channel without requiring any manual SDK installation step. This is one of the areas where Codemagic saves setup time compared to a general-purpose runner.

:::

**Quality checks script**

The workflow delegates to <VPIcon icon="iconfont icon-shell"/>`quality_checks.sh` rather than inlining commands. This keeps the YAML readable and ensures the exact same logic runs when a developer calls the script locally. The script handles formatting, analysis, and test execution internally.

**Coverage enforcement**

After the tests run, `lcov` parses the coverage report generated by `flutter test --coverage` and extracts the line coverage percentage. If it falls below 70%, the build fails with a clear message. This threshold is something your team should agree on , 70% is a reasonable starting point for most projects.

`publishing`

Codemagic has native email notification support built in. Rather than scripting `echo` statements into CI logs, you declare recipients directly in the workflow and Codemagic handles delivery. Both success and failure states are covered.

---

## Android Pipeline

The Android workflow handles all three environments in a single workflow definition, using Codemagic's environment variable groups and conditional scripting to behave differently depending on which branch triggered the build.

```yaml :collapsed-lines title="codemagic.yaml"
  android-pipeline:
    name: Android Build & Release
    max_build_duration: 60
    instance_type: linux_x2

    triggering:
      events:
        - push
      branch_patterns:
        - pattern: develop
          include: true
        - pattern: staging
          include: true
        - pattern: production
          include: true

    environment:
      flutter: stable
      android_signing:
        - android_keystore
      groups:
        - staging_secrets
        - production_secrets
        - firebase_credentials
        - sentry_credentials

    scripts:
      - name: Install dependencies
        script: flutter pub get

      - name: Detect environment
        script: |
          BRANCH=$(git rev-parse --abbrev-ref HEAD)
          if [ "$BRANCH" = "develop" ]; then
            echo "ENV=dev" >> $CM_ENV
          elif [ "$BRANCH" = "staging" ]; then
            echo "ENV=staging" >> $CM_ENV
          else
            echo "ENV=production" >> $CM_ENV
          fi

      - name: Generate environment config
        script: |
          if [ "$ENV" = "dev" ]; then
            ./scripts/generate_config.sh dev "https://dev.api.example.com" "dev_dummy_key"
          elif [ "$ENV" = "staging" ]; then
            ./scripts/generate_config.sh staging "\(STAGING_BASE_URL" "\)STAGING_API_KEY"
          else
            ./scripts/generate_config.sh production "\(PROD_BASE_URL" "\)PROD_API_KEY"
          fi

      - name: Build Android artifact
        script: |
          if [ "$ENV" = "production" ]; then
            flutter build appbundle --release \
              --obfuscate \
              --split-debug-info=build/symbols
          else
            flutter build appbundle --release
          fi

      - name: Distribute to Firebase App Distribution
        script: |
          if [ "\(ENV" = "dev" ] || [ "\)ENV" = "staging" ]; then
            firebase appdistribution:distribute \
              build/app/outputs/bundle/release/app-release.aab \
              --app "$FIREBASE_ANDROID_APP_ID" \
              --groups "$FIREBASE_GROUPS" \
              --token "$FIREBASE_TOKEN"
          fi

      - name: Submit to Play Store
        script: |
          if [ "$ENV" = "production" ]; then
            echo "$GOOGLE_PLAY_SERVICE_ACCOUNT_JSON" > /tmp/service_account.json
            flutter pub global activate fastlane 2>/dev/null || true
            fastlane supply \
              --aab build/app/outputs/bundle/release/app-release.aab \
              --json_key /tmp/service_account.json \
              --package_name com.your.package \
              --track production
          fi

      - name: Upload Sentry symbols
        script: |
          if [ "$ENV" = "production" ]; then
            ./scripts/upload_symbols.sh $(git rev-parse --short HEAD)
          fi

    artifacts:
      - build/app/outputs/bundle/release/app-release.aab
      - build/symbols/**

    publishing:
      email:
        recipients:
          - your-team@example.com
        notify:
          success: true
          failure: true
```

Here is what each section is doing and why it's designed this way.

`android_signing`

This is one of Codemagic's most valuable features. Instead of manually decoding a Base64 keystore and writing it to disk inside a script, you upload your keystore file directly to Codemagic's encrypted key storage under Teams → Code signing identities → Android keystores. You give it a reference name – `android_keystore` in this case – and Codemagic handles decoding, placement, and `key.properties` generation automatically before your build scripts run.

This eliminates an entire category of signing-related build failures.

`groups`

Codemagic lets you organize secrets into named groups in the environment variables section of your team settings. Rather than declaring individual secrets inline, you reference groups. The groups used here are:

- `staging_secrets`: contains `STAGING_BASE_URL` and `STAGING_API_KEY`
- `production_secrets`: contains `PROD_BASE_URL` and `PROD_API_KEY`
- `firebase_credentials`: contains `FIREBASE_TOKEN`, `FIREBASE_ANDROID_APP_ID`, `FIREBASE_GROUPS`
- `sentry_credentials`: contains `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`

**Environment detection with** `$CM_ENV`

Codemagic exposes a special file path via the `$CM_ENV` variable. Writing `KEY=VALUE` to this file makes that variable available to every subsequent script step in the same build. This is how the branch name gets translated into an environment label that the rest of the pipeline reads.

**Build differentiation**

Production builds use `--obfuscate` and `--split-debug-info=build/symbols`. Dev and staging builds skip both flags for faster compilation and readable local stack traces.

**Firebase distribution**

The Firebase CLI distributes dev and staging builds to testers. Because Codemagic's Linux machines come with Node.js available, you can install the Firebase CLI with `npm install -g firebase-tools` as a setup step if it is not already present, or invoke it via `npx`.

**Play Store submission**

Production app bundles go to the Play Store using Fastlane's `supply` command. The service account JSON is written to a temporary file from the environment variable and passed to Fastlane directly. Replace `com.your.package` with your actual application ID.

`artifacts`

The artifacts section tells Codemagic which files to preserve after the build completes. These files become downloadable from the Codemagic build dashboard. The debug symbols are captured here as well, which is useful for manual Sentry uploads if the automated step ever needs to be re-run.

---

## iOS Pipeline

iOS on Codemagic is where the platform's advantage becomes most visible. Apple code signing on a general-purpose runner requires a multi-step keychain dance involving `security` commands, certificate imports, and provisioning profile placement. Codemagic handles all of that automatically through its native signing integration.

```yaml :collapsed-lines title="codemagic.yaml"
  ios-pipeline:
    name: iOS Build & Release
    max_build_duration: 90
    instance_type: mac_mini_m2

    triggering:
      events:
        - push
      branch_patterns:
        - pattern: develop
          include: true
        - pattern: staging
          include: true
        - pattern: production
          include: true

    environment:
      flutter: stable
      ios_signing:
        distribution_type: app_store
        bundle_identifier: com.your.bundle.id
      groups:
        - staging_secrets
        - production_secrets
        - app_store_credentials
        - sentry_credentials

    scripts:
      - name: Install dependencies
        script: flutter pub get

      - name: Install Fastlane dependencies
        script: |
          cd ios
          gem install bundler --user-install
          bundle install

      - name: Detect environment
        script: |
          BRANCH=$(git rev-parse --abbrev-ref HEAD)
          if [ "$BRANCH" = "develop" ]; then
            echo "ENV=dev" >> $CM_ENV
          elif [ "$BRANCH" = "staging" ]; then
            echo "ENV=staging" >> $CM_ENV
          else
            echo "ENV=production" >> $CM_ENV
          fi

      - name: Generate environment config
        script: |
          if [ "$ENV" = "dev" ]; then
            ./scripts/generate_config.sh dev "https://dev.api.example.com" "dev_dummy_key"
          elif [ "$ENV" = "staging" ]; then
            ./scripts/generate_config.sh staging "\(STAGING_BASE_URL" "\)STAGING_API_KEY"
          else
            ./scripts/generate_config.sh production "\(PROD_BASE_URL" "\)PROD_API_KEY"
          fi

      - name: Build iOS (dev — no signing)
        script: |
          if [ "$ENV" = "dev" ]; then
            flutter build ios --release --no-codesign
          fi

      - name: Build and ship to TestFlight (staging)
        script: |
          if [ "$ENV" = "staging" ]; then
            flutter build ipa --release \
              --export-options-plist=/Users/builder/export_options.plist
            cd ios && bundle exec fastlane beta
          fi

      - name: Build and release to App Store (production)
        script: |
          if [ "$ENV" = "production" ]; then
            flutter build ipa --release \
              --obfuscate \
              --split-debug-info=build/symbols \
              --export-options-plist=/Users/builder/export_options.plist
            cd ios && bundle exec fastlane release
          fi

      - name: Upload Sentry symbols
        script: |
          if [ "$ENV" = "production" ]; then
            ./scripts/upload_symbols.sh $(git rev-parse --short HEAD)
          fi

    artifacts:
      - build/ios/ipa/*.ipa
      - build/symbols/**
      - /tmp/xcodebuild_logs/*.log

    publishing:
      app_store_connect:
        api_key: $APP_STORE_CONNECT_PRIVATE_KEY
        key_id: $APP_STORE_CONNECT_KEY_IDENTIFIER
        issuer_id: $APP_STORE_CONNECT_ISSUER_ID
        submit_to_testflight: true
        submit_to_app_store: false
      email:
        recipients:
          - your-team@example.com
        notify:
          success: true
          failure: true
```

Here's what is different from the Android workflow and why.

`mac_mini_m2`

iOS builds require Xcode, which means they need macOS. Codemagic provides Apple Silicon Mac Mini instances. These are meaningfully faster than Intel-based runners for Flutter and Xcode workloads, and Codemagic provisions them on demand without any infrastructure management on your side.

`ios_signing`

This is the section that replaces the entire keychain setup sequence. You upload your distribution certificate and provisioning profile once to Codemagic's code signing identities under your team settings. The `distribution_type: app_store` tells Codemagic to use App Store distribution signing, and `bundle_identifier` ties it to your specific app. Before your scripts run, Codemagic installs the certificate and profile automatically on the build machine.

No `security` commands, no keychain creation, no Base64 decoding. It's handled internally.

`flutter build ipa`

On iOS, the build output is an `.ipa` file rather than an `.aab`. Flutter's `flutter build ipa` command produces this directly when provided with an export options plist. The plist tells Xcode how to sign and package the output. Codemagic generates this file automatically based on your `ios_signing` configuration and places it at `/Users/builder/export_options.plist`.

**Fastlane lanes**

Codemagic installs Fastlane via Bundler in the `ios/` directory, then calls the appropriate lane based on the detected environment. The `beta` lane uploads to TestFlight, and the `release` lane submits to the App Store.

`publishing.app_store_connect`

Codemagic has a native App Store Connect publisher. Rather than scripting the upload manually, you declare your API credentials in the publishing block and Codemagic handles the submission. The `submit_to_testflight: true` flag means staging builds are automatically available to TestFlight testers after the build completes. For production, you would flip `submit_to_app_store` to `true` instead.

**Xcode logs as artifacts**

The line `/tmp/xcodebuild_logs/*.log` captures raw Xcode build logs as downloadable artifacts. When an iOS build fails and the error message in the Codemagic dashboard is not specific enough, these logs are where you find the real cause.

---

## Environment Variables and Secrets Reference

All secrets are configured in Codemagic under Teams → Environment variables. Group them logically so they can be referenced cleanly in the YAML.

### `staging_secrets` group

| Variable | Description |
| --- | --- |
| `STAGING_BASE_URL` | Staging API base URL |
| `STAGING_API_KEY` | Staging API or encryption key |

### `production_secrets` group

| Variable | Description |
| --- | --- |
| `PROD_BASE_URL` | Production API base URL |
| `PROD_API_KEY` | Production API or encryption key |

### `firebase_credentials` group

| Variable | Description |
| --- | --- |
| `FIREBASE_TOKEN` | Generated via `firebase login:ci` |
| `FIREBASE_ANDROID_APP_ID` | Android app ID from Firebase console |
| `FIREBASE_GROUPS` | Comma-separated tester group names |

### `app_store_credentials` group

| Variable | Description |
| --- | --- |
| `APP_STORE_CONNECT_PRIVATE_KEY` | Contents of the `.p8` key file from App Store Connect |
| `APP_STORE_CONNECT_KEY_IDENTIFIER` | Key ID from App Store Connect |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID from App Store Connect |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Full JSON of your Play Console service account |

### `sentry_credentials` group

| Variable | Description |
| --- | --- |
| `SENTRY_AUTH_TOKEN` | Auth token from Sentry account settings |
| `SENTRY_ORG` | Your Sentry organization slug |
| `SENTRY_PROJECT` | Your Sentry project slug |

For Android code signing, upload your keystore directly under Teams → Code signing identities → Android keystores rather than storing it as an environment variable.

For iOS, upload your distribution certificate and provisioning profile under Teams → Code signing identities → iOS certificates.

---

## End-to-End Flow

With the full <VPIcon icon="iconfont icon-yaml"/>`codemagic.yaml` in place, here is the complete picture of what happens across a typical release cycle.

A developer finishes a feature and raises a PR into `develop`. Codemagic detects the pull request event and triggers the `pr-quality-gate` workflow on a Linux machine. The quality checks script runs formatting, analysis, tests, and coverage threshold check. If anything fails, Codemagic marks the build as failed, sends the team an email, and the PR cannot be considered ready. The developer pushes a fix, Codemagic runs again, and only when everything passes does the PR move forward.

Once the PR merges into `develop`, both the `android-pipeline` and `ios-pipeline` trigger simultaneously. Each detects `develop` as the source branch, maps it to the dev environment, injects placeholder config, builds an unsigned release artifact, and ships it to Firebase App Distribution. Testers have an installable build within minutes of the merge completing.

When `develop` is merged into `staging`, the same two platform pipelines fire again. This time real secrets are injected , the staging API URL, the staging encryption key. Android builds are signed with the keystore Codemagic manages automatically. iOS builds go through Fastlane's `beta` lane to TestFlight. The Codemagic App Store Connect publisher handles the TestFlight upload natively. QA now has a properly signed, properly configured staging build to test against.

When `staging` is promoted to `production`, the pipelines enter release mode. Production secrets are injected. Android builds are obfuscated with debug symbols split into `build/symbols`. iOS builds go through `flutter build ipa` with obfuscation enabled. Both platform pipelines call <VPIcon icon="iconfont icon-shell"/>`upload_symbols.sh` with the current commit SHA, linking the Sentry release to the exact code that shipped. The Android bundle goes to the Play Store via Fastlane. The iOS IPA is submitted to App Store Connect via Codemagic's native publisher. The team receives a success notification.

That's the full cycle. No terminal, no manual step, no shared Slack message saying "I think I deployed staging."

---

## Conclusion

The pipeline we just built covers the full release lifecycle: automated quality enforcement, environment-aware config injection, platform-specific signed builds, tester distribution, crash observability, and store submission , all from a single <VPIcon icon="iconfont icon-yaml"/>`codemagic.yaml` file.

What Codemagic brings to this setup is a tighter integration with the mobile ecosystem specifically. The keystore management, native App Store Connect publisher, pre-installed Flutter toolchain, and Apple Silicon Mac instances aren't add-ons you configure , they're part of the platform's core. This translates into fewer steps to maintain, fewer failure surfaces, and a pipeline that's easier to reason about when something does go wrong.

The scripts in your <VPIcon icon="fas fa-folder-open"/>`scripts/` folder remain completely platform-agnostic. If your team ever needs to move pipelines, those scripts move with you unchanged. The YAML changes, but the logic doesn't.

What you have at the end of this setup is a release process your team can trust: one where "did it deploy?" is answered by a notification, not a question in Slack.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Complete Flutter CI/CD Pipeline with Codemagic: From PR Quality Gates to Automated Store Releases",
  "desc": "If you've spent any time shipping Flutter apps manually, you already know the drill. Someone on the team finishes a feature, builds the APK locally, signs it (hopefully with the right keystore), uploa",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-complete-flutter-ci-cd-pipeline-with-codemagic.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
