---
lang: en-US
title: "How to Speed Up CI in the Age of AI-Written Code"
description: "Article(s) > How to Speed Up CI in the Age of AI-Written Code"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Speed Up CI in the Age of AI-Written Code"
    - property: og:description
      content: "How to Speed Up CI in the Age of AI-Written Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/speed-up-ci-in-the-age-of-ai-written-code.html
prev: /devops/github/articles/README.md
date: 2026-11-13
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/d1609f3b-9a5c-402f-b04d-30349dd2e10e.png
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
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Speed Up CI in the Age of AI-Written Code"
  desc="Coding agents now write code faster than most CI pipelines can check it. In April 2026, GitHub COO Kyle Daigle said that his platform was handling 275 million commits a week, on pace for 14 billion in"
  url="https://freecodecamp.org/news/speed-up-ci-in-the-age-of-ai-written-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/d1609f3b-9a5c-402f-b04d-30349dd2e10e.png"/>

Coding agents now write code faster than most [**CI pipelines**](/freecodecamp.org/learn-continuous-integration-delivery-and-deployment.md#) can check it. In April 2026, [GitHub COO Kyle Daigle said (<VPIcon icon="fa-brands fa-x-twitter"/>`kdaigle`)](https://x.com/kdaigle/status/2040164759836778878) that his platform was handling 275 million commits a week, on pace for 14 billion in the year, up from about 1 billion in 2025. In the same post, he put GitHub Actions at 2.1 billion minutes in a single week, up from 500 million a week in 2023. That second figure shows where all those commits end up: in CI. A 15-minute pipeline is tolerable if a dev pushes a few times a day. When an agent opens ten PRs in an afternoon, that pipeline turns into a queue. You wait for results, agents wait to retry, and the time saved writing code is lost checking it.

Most of that delay comes from a few causes, and each has a known fix. You can speed up CI in five ways:

1. measure where the time goes
2. cache what you can reuse
3. run jobs on faster hardware
4. split tests across parallel jobs
5. skip work that doesn't need to run.

In this article, we'll walk through each fix in order. You’ll learn how to find the slowest steps in your GitHub Actions workflows, cache dependencies and Docker layers with stable keys, and move heavy jobs to faster runners. You’ll also see how to shard tests across a matrix of parallel jobs, and how to skip unneeded work with path filters, affected-only tests, and concurrency groups.

---

## Measure First, Then Optimize

Most teams try to guess which step is slowing things down, and they're often wrong. A job that feels like a test problem may be 90 seconds of installs and 30 seconds of tests.

Start with data you already have. GitHub shows [<VPIcon icon="iconfont icon-github"/>job execution time](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-job-execution-time) for every run, with a timing for each step. Open the last ten runs of your slowest workflow and note the three longest steps. Use the median, not the worst case, since one slow run can be a network blip.

Also separate waiting from working. Queue time, setup time, and run time need different fixes. If jobs sit in a queue for a minute, no test tuning will help.

---

## Cache Dependencies and Build Layers

The fastest work is work you never repeat. Every run starts on a fresh machine, so without a cache you download the same packages again and again.

The [<VPIcon icon="iconfont icon-github"/>dependency caching reference](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching) explains how `actions/cache` works. You give it a path and a key. If the key matches a saved cache, the files are restored. If not, the step runs, and the files are saved when the job ends.

Everything depends on that key. The usual pattern hashes your lockfile, so the key changes only when your dependencies change.

```yaml title=".github/workflows/example.yaml"
- uses: actions/cache@v6
  with:
    path: ~/.npm
    # Key changes only when the lockfile changes
    key: npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      npm-${{ runner.os }}-
```

The `restore-keys` line is the part that tends to get skipped. When the exact key misses, it restores the closest older cache. You still install a few new packages, but not all of them. Be careful with keys that include a timestamp or a commit SHA. Those never match twice, so you save a new cache on every run and never reuse one.

Docker builds need the same thinking. Docker images are built in layers, and a layer is reused only if everything above it is unchanged. Copy your lockfile and install dependencies first, then copy your source code. That way a code change doesn't rebuild the install layer. To keep layers between runs, point BuildKit at the [<VPIcon icon="fa-brands fa-docker"/>GitHub Actions cache backend](https://docs.docker.com/build/cache/backends/gha/) with `cache-from` and `cache-to` set to `type=gha`.

One catch is that these caches live in remote storage. Each restore is a network download, which on a big cache can rival the install it replaces.

---

## Run on Faster Hardware

Caching avoids repeating work. This improvement is different. It runs the work itself on faster machines.

Standard GitHub-hosted runners for private repositories have 2 vCPUs and 7 GB of RAM. [<VPIcon icon="fas fa-globe"/>Avrea](https://avrea.com/) is a drop-in replacement for GitHub Actions runners. You change one line, from `runs-on: ubuntu-latest` to an Avrea label such as `runs-on: avrea-ubuntu-latest`, and the rest of your workflow stays the same. By Avrea's own numbers, jobs run about 2x faster on hardware alone, and up to 10x faster with cache hits.

Independent numbers point the same way. RunsOn maintains a [<VPIcon icon="fas fa-globe"/>public runner benchmark](https://runs-on.com/benchmarks/runners/) that builds three open-source projects on nine runner services with build caches turned off: a Rust test suite, TypeScript typechecks, and a production Docker build of PostHog. In the 4-vCPU x64 category, as of November 2026, Avrea finished all three in about 7 minutes of build time, compared with about 18.5 minutes on GitHub's 4-core runner, not counting runner start-up.

Built-in caching is the other half, and it connects to the section above. Avrea keeps its caches in the same datacenter as its runners, so a restore doesn't cross a slow network. Most of it is pre-configured.

The GitHub Actions cache and package downloads for npm, pip, Go modules, and Cargo work with no workflow changes. Build caches for tools such as Go, Bazel, Gradle, Turborepo, Nx, and sccache are set up on the runner, and some need a small workflow addition. So a team gets cache hits without writing key logic for each tool.

Other providers take other routes. [<VPIcon icon="fas fa-globe"/>Depot](https://depot.dev/) offers faster GitHub Actions runners and remote Docker builds, and now runs its own CI engine that accepts GitHub Actions workflows. [<VPIcon icon="fas fa-globe"/>RunsOn](https://runs-on.com/) is self-hosted: it starts EC2 instances inside your own AWS account, so you pay AWS for compute plus a flat yearly license, instead of a per-minute fee to RunsOn. GitHub's own [<VPIcon icon="iconfont icon-github"/>larger runners](https://docs.github.com/en/actions/concepts/runners/larger-runners), available on Team and Enterprise Cloud plans, add more CPU, RAM, and disk, plus options like static IPs and GPUs, billed by the minute. Check each provider's site for current details, since all of them change often.

---

## Parallelize and Shard Your Tests

Once each job is fast, make sure jobs don't wait in a line. A long test suite on one runner is the classic bottleneck.

Start with independent jobs. Lint, type checks, unit tests, and build rarely need each other. GitHub runs jobs in parallel unless you add `needs`, so remove any `needs` line that's only there for habit.

Next, use a matrix. A [<VPIcon icon="iconfont icon-github"/>matrix strategy](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations) creates one job per combination of values, and they all run at once. Teams often use it for Node versions, but it's also the simplest way to shard tests.

```yaml title=".github/workflows/example.yaml"
strategy:
  fail-fast: false
  matrix:
    shard: [1, 2, 3, 4]
steps:
  # Each job runs one quarter of the suite
  - run: npx jest --shard=${{ matrix.shard }}/4
```

Jest's `--shard` flag splits the suite across jobs by test file. Four shards can turn a twelve-minute suite into about three, plus setup time, if the files take similar time. If a few files are much heavier, one shard will run long, so split those files up. Setting `fail-fast: false` lets every shard finish, so you see all failures at once.

Playwright works the same way. Run [<VPIcon icon="iconfont icon-playwright"/>`npx playwright test --shard=1/4`](https://playwright.dev/docs/test-sharding) in each matrix job, then merge the reports at the end.

Sharding has a limit. Each shard pays its own setup cost, so past a point more shards add cost without saving time. Inside a single job, tools like [<VPIcon icon="fas fa-globe"/>pytest-xdist](https://pytest-xdist.readthedocs.io/en/stable/) spread tests across the CPUs on the machine.

---

## Do Less Work on Every Run

The last one is the cheapest: don't run what you don't need to run.

Path filters are the easiest start. In the [<VPIcon icon="iconfont icon-github"/>workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), the `paths` and `paths-ignore` keys let a workflow run only when certain files change. A change to the docs folder shouldn't trigger a full backend build.

One warning: if a required status check never runs because of a path filter, the pull request stays stuck on a pending check. For required checks, let the workflow run and skip the job with an `if:` condition instead, since GitHub counts a skipped job as passed.

In a monorepo, go further and run only affected tests. Tools such as Nx, Turborepo, and Bazel work out which packages a change touches and skip the rest. In Nx that's `nx affected -t test`, and in Turborepo it's `turbo run test --affected`. Both compare your branch against `main`, so check out enough Git history for that comparison, since `actions/checkout` fetches a single commit by default.

Most commits touch a small part of a large codebase, so the savings add up. This matters more when agents open many small pull requests, each touching a package or two.

Finally, stop paying for runs that no one needs. When you push twice in a row, the first run is already out of date. A [<VPIcon icon="iconfont icon-github"/>concurrency group](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency) cancels it.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  # Cancel the older run when a new push arrives
  cancel-in-progress: true
```

This matters more as AI tools push more commits. Agents may update a branch many times an hour, and each push starts a full run. Don't use it on deploy workflows, though. Cancelling a deploy halfway can leave a bad state, so queue those instead.

---

## Putting It Together

Measure first, because that shows which of the other four fixes is worth your time. Cache with stable keys and order your Dockerfile so slow layers stay put. Move heavy jobs to faster runners, and compare providers on your own workflow. Shard tests until setup time dominates. Then cut needless work with path filters, affected-only tests, and cancelled stale runs.

Make one change at a time and re-check your timings after each. Saving two minutes on a job that runs fifty times a day beats a clever fix on a job that runs once.

::: info About Author

Hope you enjoyed this article. You can [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Speed Up CI in the Age of AI-Written Code",
  "desc": "Coding agents now write code faster than most CI pipelines can check it. In April 2026, GitHub COO Kyle Daigle said that his platform was handling 275 million commits a week, on pace for 14 billion in",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/speed-up-ci-in-the-age-of-ai-written-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
