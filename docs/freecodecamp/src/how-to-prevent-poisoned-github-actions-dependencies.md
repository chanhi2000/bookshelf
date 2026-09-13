---
lang: en-US
title: "How to Prevent Poisoned GitHub Actions Dependencies"
description: "Article(s) > How to Prevent Poisoned GitHub Actions Dependencies"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Prevent Poisoned GitHub Actions Dependencies"
    - property: og:description
      content: "How to Prevent Poisoned GitHub Actions Dependencies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-prevent-poisoned-github-actions-dependencies.html
prev: /devops/github/articles/README.md
date: 2026-09-19
isOriginal: false
author:
  - name: ILYAS RUFAI
    url: https://freecodecamp.org/news/author/rufilboss/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c5ac930c-aa14-434e-a712-48102cc88e44.png
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
  name="How to Prevent Poisoned GitHub Actions Dependencies"
  desc="Your workflow uses actions/checkout@v4. Today, that tag points to a vetted release. Tomorrow, a compromised maintainer or attacker moves the tag to malicious code. Your pipeline runs it with access to"
  url="https://freecodecamp.org/news/how-to-prevent-poisoned-github-actions-dependencies"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c5ac930c-aa14-434e-a712-48102cc88e44.png"/>

Your workflow uses `actions/checkout@v4`. Today, that tag points to a vetted release. Tomorrow, a compromised maintainer or attacker moves the tag to malicious code. Your pipeline runs it with access to `GITHUB_TOKEN`.

Third-party **Actions are dependencies**. A floating tag behaves like an unpinned package dependency. If the reference changes, the workflow can execute different code without any change to your repository.

This article shows you how to prevent poisoned continuous integration (CI) dependencies by pinning Actions to full commit SHAs, validating those pins against release tags, restricting permitted actions, and automating reviewed updates with Dependabot.


::: note Prerequisites

**Who this is for:** Platform and DevSecOps engineers securing GitHub Actions workflows.

- Repository admin access
- Workflows using `uses: org/action@ref` syntax

:::

---

## The Quick Reference:

Here's what you'll learn how to do here:

- Pin every `uses:` reference to a **full commit SHA**, not a moving tag such as `@v4`.
- Validate that each recorded SHA matches the release you reviewed before approving it.
- Maintain an **allowlist** of permitted actions at the organization or repository level.
- Enable **Dependabot** for GitHub Actions version bumps with review.
- Prefer official or verified creators. Mirror critical actions internally if needed.
- Verify pins in pull request checks before merge.

---

## Why Floating Tags Fail

GitHub Actions lets you reference a dependency with a branch name, version tag, or commit SHA. These references don't provide the same level of stability. A branch can change at any time, and a version tag can be moved to a different commit after you review it. A commit SHA identifies one specific revision.

The table below compares the common reference styles and shows why a moving tag creates a supply chain risk:

| Reference style | Risk |
| --- | --- |
| `@main` | Runs whatever code is on the branch when the workflow starts |
| `@v4` | The tag can move, so the same label can execute different code |
| `@v4.2.1` | More specific, but still a mutable tag |
| `@abc1234...` (full SHA) | Identifies one immutable commit |

The first three references fail because the name doesn't permanently identify the code that GitHub will execute. A full SHA solves that specific problem by making the workflow change only when someone changes the reference in the repository.

::: important Key idea

CI pipelines deserve the same dependency discipline as application code.

:::

---

## Pin Actions to Commit SHAs

Pinning an Action means replacing its branch or version tag with the full SHA of the commit you reviewed. GitHub then checks out that exact revision, even if the publisher later moves the original tag.

This first example is **bad** because both references use mutable version tags. The workflow may run different Action code later without a corresponding change in your repository:

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
```

This second example is **good** because each reference uses a full 40-character commit SHA. The comments preserve the readable release versions for maintainers, but GitHub uses the SHA rather than the comments:

```yaml
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
- uses: actions/setup-node@4992456781334f2795ae9dd169f5041797d85689 # v4.4.0
```

Find the SHA on the action's GitHub release page or:

```sh
gh api repos/actions/checkout/git/ref/tags/v4.2.2 --jq '.object.sha'
```

Use the exact release tag you reviewed. Add a comment with the human-readable version for maintainability. The comment helps a reviewer, but it's not part of the security control. GitHub executes the commit identified by the SHA.

Don't use a shortened SHA. A full 40-character SHA makes accidental collisions and ambiguous reviews less likely.

---

## Validate the Commit SHAs

A full SHA protects the workflow from a tag moving after you merge it, but you still need to validate the SHA before approving it. The release tag and commit should be reviewed together. This check compares the commit behind the reviewed tag with the commit recorded in the workflow:

```sh
#!/usr/bin/env bash
set -euo pipefail

repository="actions/checkout"
release_tag="v4.2.2"
expected_sha="11bd71901bbe5b1630ceea73d27597364c9af683"

actual_sha="$({
  git ls-remote "https://github.com/${repository}.git" \
    "refs/tags/${release_tag}" "refs/tags/${release_tag}^{}"
} | awk -v tag="refs/tags/${release_tag}" '
  $2 == tag "^{}" { print $1; found = 1 }
  $2 == tag { fallback = $1 }
  END { if (!found) print fallback }
')"

if [[ "${actual_sha}" != "${expected_sha}" ]]; then
  printf 'SHA mismatch for %s %s\n' "${repository}" "${release_tag}" >&2
  printf 'Expected: %s\nActual:   %s\n' "${expected_sha}" "${actual_sha}" >&2
  exit 1
fi

printf 'Validated %s@%s\n' "${repository}" "${expected_sha}"
```

This is release-reference validation, not a claim that a repository is trustworthy. Read the action source, review its permissions, and record why you approved the dependency. For higher-assurance environments, mirror critical actions internally and validate the mirrored artifact through your normal repository controls.

---

## Enable Dependabot for Actions

Dependabot is GitHub's automated dependency-update service. For GitHub Actions, it checks the workflow references for newer releases and opens pull requests that update them. This gives you a reviewable place to inspect and approve an Action update instead of changing pins manually or using floating tags.

Create <VPIcon icon="fas fa-folder-open"/>`.github/`<VPIcon icon="iconfont icon-yaml"/>`dependabot.yml`:

```yaml title=".github/dependabot.yml"
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      actions:
        patterns:
          - "*"
```

Dependabot opens pull requests when pinned SHAs have newer releases. Review and merge like application dependencies.

Don't configure Dependabot to merge these updates automatically until you have a review process for action changes. An update can contain new permissions, changed scripts, or a new transitive dependency.

For each update pull request, compare the old and new commit, inspect the action's release notes, and review changes to `action.yml` JavaScript bundles, shell scripts, and workflow permissions. Confirm that the new commit belongs to the release you intended to adopt. Run the workflow in a test repository or environment when the action handles deployment, publishing, credentials, or other high-impact operations.

The goal isn't to reject every update. The goal is to make the trust decision visible and repeatable. A reviewer should be able to answer three questions before merging: what code changed, why is the new version needed, and what permissions can that code use?

---

## Allowlist Actions

An Action allowlist is a repository or organization policy that limits which publishers and repositories workflows are allowed to call. It reduces the chance that a contributor introduces an unknown or unreviewed Action into a trusted pipeline.

Organization administrators can configure it at **Settings → Actions → Policies → Allow specified actions**. Choose the narrowest policy that matches your workflows, then add only the Action repositories your teams have reviewed.

Example allowlist patterns:

```text
actions/checkout@*
actions/setup-node@*
actions/cache@*
docker/*
my-org/*
```

With this policy, Actions that don't match the approved patterns are denied. Repositories under the organization inherit the policy, subject to the organization's GitHub plan and repository settings.

For a single repo without an org policy, use **Settings → Actions → General → Allow actions created by GitHub, and select non-GitHub actions** and restrict to verified creators only.

An allowlist limits which action identities may run. It doesn't replace SHA pinning. A permitted action should still be referenced by a reviewed full SHA in every workflow.

---

## Enforce Pins in Pull Requests

Run a workflow linter in CI and add a repository check that fails when a workflow introduces a non-SHA reference. Pin the checker itself before using it in a protected workflow. Replace the placeholder below with the full commit SHA you verified for the actionlint release you selected:

```yaml
name: actionlint

on:
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
      - uses: rhysd/actionlint@03d0035246f3e81f36aed592ffb4bebf33a03106 # v1.7.7
        with:
          args: -color
```

Resolve the release tag, review the commit, and record the full 40-character SHA just as you did for `actions/checkout`.

You can also use a small check to catch common floating references. Treat this as a backup signal, not a YAML parser or a complete supply chain policy:

```yaml
      - name: Reject floating action tags
        run: |
          if grep -RInE '^[[:space:]]*-?[[:space:]]*uses:[[:space:]]*[^#]+@(main|master|v[0-9]+)([[:space:]]|$)' .github/workflows/; then
            echo "Floating action refs found. Pin to full SHA."
            exit 1
          fi
```

The check should run on pull requests and on protected branches. A pull request can pass this test and still contain a malicious commit, so combine it with code review, the allowlist, and the SHA validation process.

---

## Vet Third-Party Actions

Before adding a community action to the allowlist:

1. Read the action's `action.yml` and entry script.
2. Check star history, maintainer reputation, and open security issues.
3. Pin SHA and fork to `my-org/action-name` if the action is critical but externally maintained.

Also inspect the permissions available to the workflow. An action that can read repository secrets or write releases deserves more scrutiny than an action that only formats a file. Set the workflow's top-level permissions to the minimum required, then grant additional permissions to individual jobs only when needed.

::: tip How to Verify This Works

1. Run the SHA validation script for every action you approve and expect all comparisons to pass.
2. Open a test pull request that changes an action to`@main`, and confirm the CI gate fails.
3. Add a trailing comment after a floating tag and confirm your parser or linter still rejects it.
4. Confirm organization policy blocks a disallowed action in a test workflow.
5. Confirm Dependabot opens an action update pull request and that the change receives normal review.
6. Review the workflow run permissions and verify that the action can't access credentials it doesn't need.

:::

::: info When This Breaks Down

1. **Emergency patches:** SHA pinning slows hotfixes. Dependabot plus on-call review is safer than temporarily using a floating tag.
2. **Composite actions in private repos:** pin internal actions the same way as public ones.
3. **Reusable workflows:** pin the reusable workflow ref to SHA as well as steps inside it.
4. **Annotated tags and mirrors:** resolve annotated tags to their commit before recording a SHA, and validate internal mirrors through your own change-control process.
5. **False sense of safety:** pinning without reading code still trusts the maintainer at pin time. Combine pinning with allowlists, least-privilege permissions, and review.

:::

---


## Conclusion

In this tutorial, you learned how to prevent poisoned CI dependencies by pinning GitHub Actions to reviewed commit SHAs, validating those references, allowlisting trusted actions, enabling Dependabot updates, and enforcing pins in pull request checks.

The result is a layered control: a reviewed immutable reference, a restricted set of permitted actions, automated update proposals, and a pull request check that catches regressions before merge.

::: info References

- [GitHub Actions, Security hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [GitHub, Dependabot version updates for Actions](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot)
- [StepSecurity, Pin GitHub Actions](https://stepsecurity.io/blog/pinning-github-actions-for-enhanced-security)
- [OpenSSF, Source compromise defenses (<VPIcon icon="iconfont icon-github"/>`ossf/scorecard`)](https://github.com/ossf/scorecard/blob/main/docs/checks.md#pinned-dependencies)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Prevent Poisoned GitHub Actions Dependencies",
  "desc": "Your workflow uses actions/checkout@v4. Today, that tag points to a vetted release. Tomorrow, a compromised maintainer or attacker moves the tag to malicious code. Your pipeline runs it with access to",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-prevent-poisoned-github-actions-dependencies.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
