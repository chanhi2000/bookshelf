---
lang: en-US
title: "Never Review a Dependency Update Again"
description: "Article(s) > Never Review a Dependency Update Again"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Never Review a Dependency Update Again"
    - property: og:description
      content: "Never Review a Dependency Update Again"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/never-review-a-dependency-update-again.html
prev: /devops/github/articles/README.md
date: 2026-01-10
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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

[[toc]]

---

<SiteInfo
  name="Never Review a Dependency Update Again"
  desc="Set up a GitHub Actions workflow that automatically approves and merges Dependabot PRs when CI passes. Stop manually clicking merge on dependency updates."
  url="https://typescript.tv/hands-on/never-review-a-dependency-update-again"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Set up a GitHub Actions workflow that automatically approves and merges Dependabot PRs when CI passes. Stop manually clicking merge on dependency updates.

Dependabot creates pull requests to keep your dependencies up to date. But here's the problem: you still need to manually review and merge each PR, even when all checks pass. If you maintain multiple TypeScript projects or have frequent dependency updates (especially with TypeScript itself and its type definitions), this becomes a time sink that pulls you away from actual development work.

Let's fix that with a GitHub Actions workflow that automatically approves and merges Dependabot PRs when your CI pipeline succeeds.

---

## Understanding the Workflow

Automating dependency updates requires three components working together:

1. **Set up branch protection** with a test workflow that validates every change through TypeScript type checking and automated tests. This creates the safety net that catches breaking changes.
2. **Set up Dependabot** to monitor your dependencies and create pull requests when updates become available.
3. **Create the auto-merge workflow** that watches for the Dependabot PRs and automatically approves and merges them once all your CI checks pass.

---

## Set Up Branch Protection

Before automating dependency merges, you need a solid test workflow that acts as your safety net. Create a GitHub Actions workflow that runs your test suite on every push and pull request. This ensures that any breaking changes introduced by dependency updates get caught before merging.

```yaml :collapsed-lines title=".github/workflows/run-tests.yml"
name: 'Run Tests'
 
on:
  push:
    branches:
      - main
  pull_request:
 
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
 
jobs:
  test-job:
    if: contains(github.event.head_commit.message, '[skip ci]') == false
    runs-on: ubuntu-latest
    steps:
      - name: 'Check out repository code in $GITHUB_WORKSPACE'
        uses: actions/checkout@v6
      - name: 'Set up Node.js version specified in file'
        uses: actions/setup-node@v6
        with:
          node-version-file: '.nvmrc'
      - name: 'Run deterministic dependency installation'
        run: npm ci
      - name: 'Run tests'
        run: |
          npx tsc --noEmit
          npm test
```

The workflow includes a TypeScript type checking step (`tsc --noEmit`) that runs before your tests. This catches type errors that dependency updates might introduce, ensuring your TypeScript code remains type-safe. The type checking step assumes you have a <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file in your project root.

The workflow also references a `.nvmrc` file to specify the Node.js version. This file ensures your GitHub Actions runner uses the same Node.js version as your local development environment. Create this file in your repository root with your desired Node.js version:

```sh title=".nvmrc"
24
```

With your test workflow in place, configure branch protection to enforce these checks:

1. Open your repository settings
2. Navigate to the "Branches" section
3. Click on "Add classic branch protection rule"
4. Specify your branch name pattern (typically "main")
5. Enable "Require status checks to pass before merging"
6. Search for and select the status check named "test-job"

This configuration prevents any PR from merging unless your tests pass, creating the quality gate that makes auto-merging safe.

---

## Set Up Dependabot

With branch protection in place, you need Dependabot to create the pull requests that will be automatically merged. Dependabot monitors your dependencies for updates and security vulnerabilities, creating PRs when new versions become available.

Create a Dependabot configuration file at <VPIcon icon="fas fa-folder-open"/>`.github/`<VPIcon icon="iconfont icon-yaml"/>`dependabot.yml`. Note that this file lives directly in the <VPIcon icon="fas fa-folder-open"/>`.github` folder, not inside the <VPIcon icon="fas fa-folder-open"/>`workflows` subdirectory like your GitHub Actions workflows.

The configuration below sets up Dependabot to check both your npm packages and GitHub Actions workflow dependencies. This keeps your TypeScript dependencies, type definitions (`@types/*` packages), and GitHub Actions up to date automatically.

```yaml title=".github/dependabot.yml"
version: 2
updates:
  - package-ecosystem: 'github-actions'
    directory: '/'
    schedule:
      day: 'tuesday'
      interval: 'monthly'
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      day: 'tuesday'
      interval: 'monthly'
    pull-request-branch-name:
      separator: '-'
    open-pull-requests-limit: 99
    target-branch: 'main'
    commit-message:
      prefix: 'chore'
      include: 'scope'
```

This configuration schedules Dependabot to check for updates monthly on Tuesdays. You can adjust the schedule to daily or weekly if you prefer more frequent updates.

---

## Set Up Auto-Merge Workflow

Now comes the core automation that ties everything together. This workflow watches for Dependabot PRs and automatically approves and merges them when your CI checks pass. The magic happens through GitHub's [<VPIcon icon="iconfont icon-github"/>auto-merge feature](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request#about-auto-merge), which queues the PR for merging and waits for all required status checks to complete successfully.

Create the workflow file:

```yaml title=".github/workflows/merge-dependencies.yml"
name: 'Merge Dependencies'
 
on: [pull_request_target]
 
permissions:
  pull-requests: write
  contents: write
 
jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: ${{ github.event.pull_request.user.login == 'dependabot[bot]' }}
    steps:
      - name: 'Enable auto-merge on PR'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: 'Approve PR'
        run: gh pr review --approve "$PR_URL"
        env:
          PR_URL: ${{github.event.pull_request.html_url}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

The `if`-condition ensures the workflow only runs for PRs created by Dependabot. The workflow skips execution for all other PRs, preventing accidental auto-merges of human-created PRs.

The workflow uses the `pull_request_target` trigger instead of the standard `pull_request` trigger. This is crucial because [<VPIcon icon="iconfont icon-github"/>GitHub changed how Dependabot PRs will run](https://github.blog/changelog/2021-02-19-github-actions-workflows-triggered-by-dependabot-prs-will-run-with-read-only-permissions/) in 2021. Dependabot PRs now run with read-only permissions by default for security reasons. Using `pull_request_target` allows the workflow to run with write permissions needed to approve and merge the PR.

The workflow explicitly requests write access to pull requests and repository contents. Without these permissions, the workflow cannot approve PRs or trigger merges.

Once you commit this workflow to your repository, it approves the PR and enables auto-merge, which means the PR will merge itself as soon as your test workflow completes successfully. If your tests fail, the PR stays open and waits for you to investigate.

The workflow requires final configuration changes in your repository settings:

1. Navigate to "Settings", then "General", and enable "Allow auto-merge". Without this setting, the workflow cannot activate auto-merge on pull requests.
2. Consider enabling "Automatically delete head branches" to keep your branch list clean. This automatically removes the branch after a PR merges, preventing your repository from accumulating stale branches.

If you added the auto-merge workflow after Dependabot already created some PRs, those existing PRs won't trigger the automation. To fix this, comment on those PRs with `@dependabot recreate`. This forces Dependabot to recreate the PR, which triggers your auto-merge workflow.

Tip:

Once the workflow runs successfully, you'll see the following comment:

> github-actions bot approved these changes

---

## Debugging and Testing GitHub Actions

The [GitHub Actions extension for VS Code (<VPIcon icon="iconfont icon-vscode"/>`GitHub.vscode-github-actions`)](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions) provides syntax highlighting, validation, and IntelliSense for workflow files, making it easier to write correct YAML configurations.

For local testing, [act (<VPIcon icon="iconfont icon-github" />`nektos/act`)](https://github.com/nektos/act) lets you run GitHub Actions workflows on your machine using Docker. This speeds up the development cycle by letting you test workflows without pushing commits to trigger them on GitHub. To test the test job created earlier, start your Docker daemon and run:

```sh
act -j test-job --container-architecture linux/amd64
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Never Review a Dependency Update Again",
  "desc": "Set up a GitHub Actions workflow that automatically approves and merges Dependabot PRs when CI passes. Stop manually clicking merge on dependency updates.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/never-review-a-dependency-update-again.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
