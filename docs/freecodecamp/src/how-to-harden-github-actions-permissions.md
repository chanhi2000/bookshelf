---
lang: en-US
title: "How to Harden GitHub Actions Permissions with Least Privilege by Default"
description: "Article(s) > How to Harden GitHub Actions Permissions with Least Privilege by Default"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - gtihub
  - githubactions
  - github-actions
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Harden GitHub Actions Permissions with Least Privilege by Default"
    - property: og:description
      content: "How to Harden GitHub Actions Permissions with Least Privilege by Default"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-harden-github-actions-permissions.html
prev: /devops/github/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: ILYAS RUFAI
    url: https://freecodecamp.org/news/author/rufilboss/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8be1e1cc-0da8-4f7c-b9c4-be21a5fae80e.png
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
  name="How to Harden GitHub Actions Permissions with Least Privilege by Default"
  desc="When a workflow has more permissions than it needs, a simple build job can become a path to repository changes, token misuse, or a wider blast radius than the team intended. The problem is easy to mis"
  url="https://freecodecamp.org/news/how-to-harden-github-actions-permissions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8be1e1cc-0da8-4f7c-b9c4-be21a5fae80e.png"/>

When a workflow has more permissions than it needs, a simple build job can become a path to repository changes, token misuse, or a wider blast radius than the team intended.

The problem is easy to miss because the workflow still passes, so the extra access often goes unnoticed until a review, incident, or failed release exposes it.

This matters because GitHub Actions sits in the middle of code, secrets, releases, and deployment automation. If you tighten permission scope at the workflow and job level, you reduce what an attacker can do if a step, action, or dependency is compromised.

In this tutorial, you'll learn how to identify the permissions a workflow actually needs, reduce those permissions to the minimum practical scope, and verify that the workflow still works when access is intentionally constrained.

Start with one existing workflow, make its permission model explicit, and then remove access that the workflow never uses.

::: note Prerequisites

You should already have a GitHub repository with at least one workflow file and permission to edit repository settings and workflow YAML.

You'll also need a basic understanding of GitHub Actions jobs, permissions, and pull request workflows.

:::

::: important Key Points

- Start with the smallest workflow permission set that still lets the job run.
- Give write access only to the job that needs it.
- Use OIDC for cloud access instead of long-lived credentials when the workflow reaches AWS or another provider.
- Verify that the workflow still succeeds after you remove excess permissions.

:::

---

## What You'll Build

You'll take one existing GitHub Actions workflow and turn it into a tighter version that gives each job only the access it needs.

That usually means a read-only test job, a separate release job with write access, and cloud deployment jobs that use short-lived OIDC credentials instead of stored secrets.

---

## Why the Default Approach Fails

A common pattern is to let a workflow inherit broad repository token access and only think about security after the pipeline is already working. That feels convenient, but it makes every job look more trusted than it really is.

The safer approach is to treat each job as a separate boundary. A build job usually needs read access, while a release job may need a narrow write scope. The goal is not to make every workflow restrictive for its own sake, but to make each permission explicit and easy to review.

For example, a test workflow should usually read code and upload artifacts. It shouldn't automatically be able to push tags, publish releases, or write to package registries.

---

## How to Implement This Safely

### Step 1: Inventory What the Workflow Actually Does

Before you edit YAML, list the actions the workflow performs. For example, a test job may only need to clone code and upload test artifacts, while a release job may need to create a release or push a package.

That split matters because GitHub Actions permissions can be different at the workflow level and the job level.

If you're not sure where to start, inspect the workflow and ask one question: does this job need to read, write, or do both?

Here's a simple permission audit you can apply to most workflows:

| Workflow action | Usually needs |
| --- | --- |
| Clone repository and run tests | `contents: read` |
| Upload build or test artifacts | usually no extra write scope on the repository token |
| Create a release | `contents: write` |
| Publish a package | `packages: write` |
| Request cloud credentials through OIDC | `id-token: write` |

Use the table as a starting point, then reduce access further if your workflow is even simpler.

### Step 2: Set a Minimal Default Permission Scope

Start with the workflow permission block and grant only what the majority of jobs need.

If the job only checks code or runs tests, `contents: read` is usually enough.

```yaml
name: ci

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

With this baseline, the workflow can read repository content, but it doesn't get extra write access by default.

### Step 3: Add Write Access Only Where the Job Needs it

If one job creates a release or publishes a package, give that job a narrower permission set instead of widening the whole workflow.

Keep the write scope on the smallest job that needs it. That keeps the rest of the pipeline easier to audit.

```yaml
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    needs: test
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/release.sh
```

This keeps your build path narrow while still allowing the one job that genuinely needs write access to complete its work.

### Step 4: Use OIDC for Cloud Access When the Workflow Leaves GitHub

If the workflow needs cloud access, configure OIDC instead of storing long-lived credentials in secrets. That way, the job requests a temporary token at runtime, and you avoid keeping static cloud keys in the repository.

```yaml
permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure cloud credentials
        run: echo "Configure OIDC-based credentials here"
```

### Step 5: Verify That Unnecessary Access is Gone

Run the workflow after removing excess permissions and confirm two things.

First, the intended job still succeeds. Second, a step that tries to use a permission you removed should fail clearly.

A good review signal is that the workflow logs show the exact permission scope you set, and any blocked write attempt fails instead of silently succeeding.

If the workflow only works when you widen permissions again, split the job or move the write action into a smaller release workflow.

You can also prove the change by trying one deliberate failure case. For example, run a release step in a branch where the job only has `contents: read`. The step should fail instead of silently publishing a release.

---

## How to Verify This Works

Use a small test branch and push a commit that triggers the workflow.

Then confirm that:

- The read-only job still passes.
- The release job only works when it has explicit write permission.
- A blocked action fails fast instead of receiving a token with broader access.

If you use a security scanner or linting step, keep it in the workflow so the permission change doesn't break normal delivery.

Check the workflow run summary, not just the final status. The logs should show that the job requested only the permissions it actually needs, and the denied action should fail because the token can't write.

That gives you a clear audit trail and a simpler review path for every future change to the workflow.

The strongest signal is a workflow that still passes with the smallest reasonable permission set and fails only when you intentionally remove a needed permission.

If you want an extra confidence check, compare the YAML before and after the change. The new version should show a narrow default at the workflow level and only a small number of job-level exceptions.

---

## When This Breaks Down

This approach isn't magic. Some repositories have workflows that do many different things, and those workflows may need to be split before permission scoping becomes clean.

It can also feel slower at first because every permission change becomes explicit. That is the trade-off: a little more setup now in exchange for a much clearer security boundary later.

Finally, least privilege doesn't replace code review or secret scanning. It only reduces what a compromised workflow can do.

It also has limits when third-party actions need wider access than you expected. In that case, the next step is to review the action itself, not just the workflow that calls it.

---

## Conclusion

In this tutorial, you learned how to narrow GitHub Actions permissions to the minimum needed, split read and write responsibilities across jobs, and verify that the workflow still works after the access model is tightened.

As a next step, you can apply the same pattern to release pipelines, package publishing, or cloud deployment workflows that still rely on broader permissions than they should.

::: info References

<SiteInfo
  name="Use GITHUB_TOKEN for authentication in workflows - GitHub Docs"
  desc="Learn how to use the GITHUB_TOKEN to authenticate on behalf of GitHub Actions."
  url="https://docs-internal.github.com/en/actions/tutorials/authenticate-with-github_token"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

<SiteInfo
  name="Workflow syntax for GitHub Actions - GitHub Docs"
  desc="A workflow is a configurable automated process made up of one or more jobs. You must create a YAML file to define your workflow configuration."
  url="https://docs-internal.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

<SiteInfo
  name="OpenID Connect - GitHub Docs"
  desc="OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider."
  url="https://docs-internal.github.com/en/actions/concepts/security/openid-connect/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Harden GitHub Actions Permissions with Least Privilege by Default",
  "desc": "When a workflow has more permissions than it needs, a simple build job can become a path to repository changes, token misuse, or a wider blast radius than the team intended. The problem is easy to mis",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-harden-github-actions-permissions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
