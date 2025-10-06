---
lang: en-US
title: "How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS"
description: "Article(s) > How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Github Actions
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS"
    - property: og:description
      content: "How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-automate-flutter-testing-and-builds-with-github-actions-for-android-and-ios.html
prev: /devops/github/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755808732085/6fdd754a-39d4-40d1-8dea-0eb16cc45063.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS"
  desc="GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) tool built directly into GitHub. It allows developers to define workflows, which are sequences of automated steps triggered by events such as pushing code, opening pull requ..."
  url="https://freecodecamp.org/news/how-to-automate-flutter-testing-and-builds-with-github-actions-for-android-and-ios"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755808732085/6fdd754a-39d4-40d1-8dea-0eb16cc45063.png"/>

GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) tool built directly into GitHub. It allows developers to define **workflows**, which are sequences of automated steps triggered by events such as pushing code, opening pull requests, or creating releases.

For Flutter developers, GitHub Actions is a powerful way to automate testing, builds, and deployment across multiple platforms.

This guide will walk you through setting up GitHub Actions for a Flutter project, covering everything from prerequisites to detailed explanations of the workflow.

---

## Why Use GitHub Actions in Flutter Development?

GitHub Actions automated testing ensures that all code changes are validated with unit and integration tests. Continuous integration builds Flutter apps automatically to confirm that new code integrates correctly.

Code analysis and linting can run automatically to enforce style and maintain code quality. Automated releases streamline the process of packaging and distributing apps. Custom workflows can be tailored to fit project-specific needs. Collaboration is also improved because developers can see workflow results directly in pull requests.

By introducing GitHub Actions, Flutter projects become more reliable, maintainable, and efficient.

::: note Prerequisites

Before setting up GitHub Actions for your Flutter project, make sure you have:

1. **Flutter SDK installed locally** so you can create and test the project before pushing to GitHub.
2. **Git installed** to manage version control and push your project to GitHub.
3. **A GitHub account** and a **new repository** created for your Flutter project.
4. **Basic understanding of YAML syntax**, since workflows are defined in `.yml` files.
5. **A GitHub personal access token** (PAT) for releasing builds, which will be stored as a repository secret.

:::

---

## Step 1: Create a New Flutter Project

Start by creating a new Flutter project and navigating into it:

```sh
flutter create gh_flutter
cd gh_flutter
```

Replace `gh_flutter` with your preferred project name. This initializes a Flutter project with the default structure and dependencies.

---

## Step 2: Push the Project to GitHub

Initialize Git inside your project and push it to GitHub:

```sh
git init
git add .
git commit -m "Initial commit"
git remote add origin <repository_url>
git push -u origin main
```

Replace `<repository_url>` with the repository URL you created on GitHub. This links your local Flutter project to GitHub, allowing GitHub Actions to run on your repository.

---

## Step 3: Create a GitHub Actions Workflow

Inside your project, create a workflow configuration file. Workflows must be placed inside <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`. Create a file named <VPIcon icon="iconfont icon-yaml"/>`ci.yml`:

```yaml :collapsed-lines title=".github/workflows/ci.yaml"
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  flutter_test:
    name: Run Flutter Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - run: flutter pub get
      - run: flutter --version
      - run: flutter analyze
      - run: flutter test

  build_iOSApp:
    name: Build Flutter App (iOS)
    needs: [flutter_test]
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.0'
          dart-verion: '3.3.4'
          channel: 'stable'
      - run: flutter pub get
      - run: flutter clean
      - run: |
          flutter build ios --no-codesign
          cd build/ios/iphoneos
          mkdir Payload
          cd Payload
          ln -s ../Runner.app
          cd ..
          zip -r app.ipa Payload

  build_androidApk:
    name: Build Flutter App (Android)
    needs: [flutter_test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - run: flutter pub get
      - run: flutter clean
      - run: flutter build apk --debug
      - uses: ncipollo/release-action@v1
        with:
          artifacts: "build/app/outputs/apk/debug/*"
          tag: v1.0.${{ github.run_number}}
          token: ${{ secrets.TOKEN}}
```

This workflow is named `CI` and is meant for **Continuous Integration** (running tests and building apps automatically whenever code is pushed or a pull request is created).

### Triggers

In GitHub Actions, **triggers** define the events that cause a workflow to run. For this workflow, it runs automatically when certain events happen in the repository. Specifically, it listens to:

1. `push`: Whenever new code is pushed to the <VPIcon icon="fas fa-code-branch"/>`main` branch, the workflow will start.
2. `pull_request`: Whenever a pull request is opened or updated that targets the <VPIcon icon="fas fa-code-branch"/>`main` branch, the workflow will also start.

This ensures that both direct updates to the main branch and contributions through pull requests are validated and tested.

```yaml title=".github/workflows/ci.yaml"
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

This code runs the workflow when:

- You push commits to the <VPIcon icon="fas fa-code-branch"/>`main` branch.
- A pull request is opened or updated targeting <VPIcon icon="fa-brands fa-code-branch"/>`main`.

### Jobs

There are 3 jobs in the workflow:

**Job 1:** `flutter_test` runs unit tests and analysis.

```yaml title=".github/workflows/ci.yaml"
jobs:
  flutter_test:
    runs-on: ubuntu-latest
```

It uses **Ubuntu** as the runner.

Here are the steps it follows:

#### 1. Checks out code

```yaml title=".github/workflows/ci.yaml"
- uses: actions/checkout@v3
```

Downloads your repo into the runner.

#### 2. Sets up Java (needed for Flutter Android builds)

```yaml title=".github/workflows/ci.yaml"
- uses: actions/setup-java@v3
  with:
    distribution: 'temurin'
    java-version: '17'
```

#### 3. Sets up Flutter SDK

```yaml title=".github/workflows/ci.yaml"
- uses: subosito/flutter-action@v2
  with:
    channel: 'stable'
```

This installs the Flutter stable channel.

#### 4. Runs commands

1. `flutter pub get` installs dependencies.
2. `flutter --version` checks installed Flutter version.
3. `flutter analyze` analyzes Dart code for errors.
4. `flutter test` runs unit/widget tests.

If this job fails, later jobs won’t run.

**Job 2**: `build_iOSApp` builds an iOS <VPIcon icon="iconfont icon-ios"/>`.ipa` file.

```yaml title=".github/workflows/ci.yaml"
build_iOSApp:
  needs: [flutter_test]
  runs-on: macos-latest

steps:
- uses: actions/checkout@v3

- uses: subosito/flutter-action@v2
  with:
    flutter-version: '3.22.0'

- name: Install CocoaPods dependencies
  run: |
    cd ios
    pod install

- name: Build iOS App
  run: flutter build ipa --release --no-codesign
```

This runs only **after** `flutter_test` succeeds and uses **macOS** runner (needed for iOS builds).

After installing CocoaPods dependencies, the workflow executes `flutter build ipa --release --no-codesign`. This shell command tells Flutter to package your iOS app into an <VPIcon icon="iconfont icon-ios"/>`.ipa` file inside the runner’s build directory. The `--no-codesign` flag allows building without signing credentials, which is convenient for CI pipelines.

Here are the steps it follows:

1) Checks out repo + sets up Java (same as before).
2) Sets up Flutter but this time pins:

```yaml
flutter-version: '3.19.0'
dart-verion: '3.3.4'   # typo: should be `dart-version`
channel: 'stable'
```

3) Runs build:

- `flutter pub get` fetches packages.
- `flutter clean` cleans old builds.
- `flutter build ios --no-codesign` builds iOS app without signing.

4) After building:

- Goes into <VPIcon icon="fas fa-folder-open"/>`build/ios/iphoneos`
- Creates a <VPIcon icon="fas fa-folder-open"/>`Payload` folder (needed for IPA structure).
- Symlinks the generated `Runner.app` into <VPIcon icon="fas fa-folder-open"/>`Payload`.
- Zips the folder to `app.ipa`.

::: info Result

An unsigned <VPIcon icon="iconfont icon-ios"/>`.ipa` file.

:::

**Job 3**: `build_androidApk` builds a debug Android <VPIcon icon="fa-brands fa-android"/>`.apk` and uploads it as a release artifact.

```yaml title=".github/workflows/ci.yaml"
build_androidApk:
  needs: [flutter_test]
  runs-on: ubuntu-latest

steps:
- uses: actions/checkout@v3

- uses: subosito/flutter-action@v2
  with:
    flutter-version: '3.22.0'

- name: Build Android APK
  run: flutter build apk --release
```

This runs only after tests pass.

For Android, after setting up the Flutter environment, the workflow calls `flutter build apk --release`. This command compiles and packages the Android app into an <VPIcon icon="fa-brands fa-android"/>`.apk` file ready for distribution. The resulting file is placed inside the <VPIcon icon="fas fa-folder-open"/>`build/app/outputs/flutter-apk` directory of the project.

Here are the steps it follows:

1) Checks out repo, sets up Java, and sets up Flutter.

2) Runs:

- `flutter pub get`
- `flutter clean`
- `flutter build apk --debug` creates a debug APK.

3) Uploads APK using `ncipollo/release-action@v1`:

```yaml
artifacts: "build/app/outputs/apk/debug/*"
tag: v1.0.${{ github.run_number }}
token: ${{ secrets.TOKEN }}
```

- Uploads all debug APKs as release artifacts.
- Tags release as `v1.0.<run_number>` (e.g., `v1.0.5`).
- Uses a GitHub **Personal Access Token** (`TOKEN`) stored in repo secrets.

---

## Step 4: Generate and Add a GitHub Token

The Android build job releases APKs using the `release-action`. To authenticate, you must provide a GitHub personal access token. To do this, go to **GitHub Settings → Developer settings → Personal access tokens**.

Generate a new token with `repo` permissions and copy the token immediately. Then go to your repository → Settings → Secrets → New repository secret. Add the token with the name `TOKEN`.

Now the workflow can use `${{ secrets.TOKEN }}` securely.

---

## Step 5: Understanding the Workflow

This workflow is triggered when code is pushed to the <VPIcon icon="fas fa-code-branch"/>`main` branch or when a pull request is opened against it. Let’s break it down:

### Flutter Test Job

- **Environment:** Runs on `ubuntu-latest`.

**Steps:**

1. `actions/checkout@v3` fetches the source code.
2. `actions/setup-java@v3` installs Java, required for some Flutter tools.
3. `subosito/flutter-action@v2` installs Flutter on the runner.
4. `flutter pub get` installs dependencies.
5. `flutter analyze` checks for code issues.
6. `flutter test` runs test cases.

This job ensures your code compiles, passes linting, and has no failing tests.

### iOS App Build Job

- **Environment:** Runs on `macos-latest` because iOS builds require macOS.
- **Dependencies:** This job runs only if `flutter_test` passes (`needs: [flutter_test]`).

**Steps:** Similar setup as before, but after cleaning old builds with `flutter clean`, it runs `flutter build ios --no-codesign` to build an iOS app without requiring a signing certificate. The shell commands package the app into an <VPIcon icon="iconfont icon-ios"/>`.ipa` file.

### Android APK Build Job

- **Environment:** Runs on `ubuntu-latest`.
- **Dependencies:** Also depends on `flutter_test`.

**Steps:**

1. Installs Flutter.
2. Runs `flutter clean` and then builds the Android APK.
3. Uses `ncipollo/release-action@v1` to upload the APK as a GitHub release, tagged automatically with a version like `v1.0.<run_number>`.

---

## Step 6: Push and Enable the Workflow

Save your file as <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yml` and push the changes:

```sh
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

When you push your changes to GitHub, the workflow file is picked up automatically. To confirm that it is running, open your repository on GitHub and click on the **Actions** tab at the top of the page. You will see a list of workflow runs, each tied to the commit message that triggered them.

Click on the most recent run to expand the details. Inside, you’ll find separate jobs for **Android** and **iOS** builds. Each job will show its status in real time:

1. A **yellow dot** with “In progress” indicates the job is still running.
2. A **green check mark** with “Success” means the job finished successfully.
3. A **red cross** with “Failed” means something went wrong.

This way, you can immediately tell whether your Android and iOS builds passed or if one of them needs attention.

![Running for Flutter Test](https://cdn.hashnode.com/res/hashnode/image/upload/v1701417493045/31e8f9db-b4b7-445c-ab6d-caa8cbc8dfdf.png)

![Building for iOS](https://cdn.hashnode.com/res/hashnode/image/upload/v1701417512470/d27378ea-5bf2-487e-a0b0-9c2a9ffaa92e.png)

![Building for Android](https://cdn.hashnode.com/res/hashnode/image/upload/v1701417526668/31b6e5c9-c43f-46ef-a25c-7f2321eda443.png)

![Jobs completed](https://cdn.hashnode.com/res/hashnode/image/upload/v1701417477229/cbae6ba2-f51c-4f2a-81bc-cdb3345a5319.png)

![Showcase 2 app releases on the right hand side with versions](https://cdn.hashnode.com/res/hashnode/image/upload/v1701439224779/7fb85ed3-00ae-4154-8032-ffeb9bb5e1b1.png)

![Detailed app release versioning showcase](https://cdn.hashnode.com/res/hashnode/image/upload/v1701439234845/02c24d1e-09cd-4b4e-b9ea-fe96d4516f0c.png)

---

## Final Notes

With this setup, you now have:

- Automated testing whenever you push or open a pull request.
- Automatic iOS builds on macOS runners.
- Automatic Android builds with APKs released to GitHub.

This ensures that every change is tested and that builds are consistently generated without manual steps.

::: info 

For more details, see the official GitHub Actions documentation:

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate Flutter Testing and Builds with GitHub Actions for Android and iOS",
  "desc": "GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) tool built directly into GitHub. It allows developers to define workflows, which are sequences of automated steps triggered by events such as pushing code, opening pull requ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-automate-flutter-testing-and-builds-with-github-actions-for-android-and-ios.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
