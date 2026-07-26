---
lang: en-US
title: "What Happens During a Production Deployment? A Behind-the-Scenes Guide"
description: "Article(s) > What Happens During a Production Deployment? A Behind-the-Scenes Guide"
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Happens During a Production Deployment? A Behind-the-Scenes Guide"
    - property: og:description
      content: "What Happens During a Production Deployment? A Behind-the-Scenes Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-happens-during-a-production-deployment.html
prev: /devops/articles/README.md
date: 2026-08-04
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/43567dce-ecbe-412e-ab40-2ef6e07dde0e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Happens During a Production Deployment? A Behind-the-Scenes Guide"
  desc="You push your code. A few minutes later, it is live for real users. Between those two moments runs a long chain of machinery: builds, artefacts, migrations, health checks, traffic shifts. Every produc"
  url="https://freecodecamp.org/news/what-happens-during-a-production-deployment"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/43567dce-ecbe-412e-ab40-2ef6e07dde0e.png"/>

You push your code. A few minutes later, it is live for real users.

Between those two moments runs a long chain of machinery: builds, artefacts, migrations, health checks, traffic shifts. Every production engineer depends on that chain, and many teams still build and operate it themselves.

Deployment infrastructure has quietly become operational overhead. It started as a technical necessity, something every team had to assemble because nothing else existed.

Today it is a second system your engineers maintain alongside the product, consuming on-call rotations, sprint capacity, and 2 a.m. attention that could go somewhere better.

In this article, we'll walk through each stage of a real production deployment: the build, the artefact it produces, database migrations, health checks, rolling updates, and rollbacks. Along the way, we'll look at why [**platform-as-a-service (PaaS)**](/freecodecamp.org/my-team-s-experience-moving-from-aws-to-a-paas.md) tools handle most of these steps for you, and what it costs a team to keep handling them itself.

---

## The Build: Turning Code into Something That Can Run

A deployment does not ship your source code as-is. It ships the result of a build. The build stage takes your code and turns it into something a server can run.

What this looks like depends on your stack. A Java or Go project gets compiled into a binary. A JavaScript front end gets bundled and minified. A Python app gets its dependencies resolved and pinned. In most modern setups, all of this gets packed into a [**container image**](/freecodecamp.org/an-introduction-to-docker-and-containers-for-beginners.md), which is a frozen snapshot of your app plus everything it needs to run.

The build stage also runs your tests. Unit tests, linting, and security scans all happen here. If any of them fail, the deployment stops before it can touch production. This is the cheapest place to catch a bug. A failed build costs you a few minutes. A failed deployment can cost you customers.

![stages of code deployment](https://cdn.hashnode.com/uploads/covers/66c6d8f04fa7fe6a6e337edd/9a8b5d93-802c-4898-bd07-91a90041f93a.svg)

Teams that run their own pipelines spend real effort here. They maintain build servers, cache dependencies, and debug flaky test runners.

None of that work ships a feature. It is pure upkeep, and it never ends. A PaaS bakes this whole stage into the platform. You push code, and the platform detects your language, builds it the same way every time, and fails fast when something is wrong. The build still happens. Your engineers just stop paying for it in hours.

---

## The Artefact: One Version, Frozen in Time

The output of a build is called an artefact. It might be a container image, a compiled binary, or a zipped bundle. Whatever the format, the artefact has one job: to be exact. It represents one precise version of your app, frozen at one point in time.

This matters more than it sounds. The artefact that passed your tests must be the exact same one that reaches production. If you rebuild between testing and shipping, you risk shipping something slightly different. A dependency may have updated. A build flag may have changed. "It worked in staging" often means "we built it twice and got two different results."

Good pipelines build once and promote the same artefact through every stage. Artefacts get versioned and stored in a registry, so any version can be pulled and run again later. That stored history is also what makes rollbacks possible, which we will get to soon.

On a PaaS, artefact handling is standard practice by default. Every deploy produces a numbered release. The platform stores it, tracks it, and can restore it. You do not have to design a registry strategy, write promotion scripts, or assign an engineer to own them. The discipline is built in.

---

## Database Migrations: The Riskiest Step

Before new code goes live, the database often has to change with it. Maybe the new version needs a new column or a new table. These changes are called migrations, and they are the most dangerous part of most deployments.

Why? Code is easy to replace. Data is not. If you deploy a bad code version, you can swap it out. If a migration corrupts or drops data, there may be no clean way back. Migrations also create a tricky window of time. For a few minutes, old code and new code may run against the same database at once. Both versions have to work with the schema during that window.

The safe pattern is to make migrations backwards-compatible. Add the new column first, deploy code that can handle both shapes, then clean up the old column in a later release. It takes more steps, but each step is safe on its own.

A PaaS cannot write your migrations for you. No tool can know what your data means. But a good platform gives migrations a defined place in the release process, runs them in order, and logs exactly what ran and when. That structure prevents the classic failure where someone runs a migration by hand and forgets to tell the team.

---

## Health Checks: Proving the New Version Is Alive

Once the new version starts, the platform does not just trust it. It checks. A health check is a small endpoint in your app, often just a route that returns "OK." The platform calls it over and over. If the app answers, it is considered healthy. If it does not, the platform assumes something is wrong.

There are usually two kinds of checks. A readiness check asks, "Are you ready to receive traffic?" A liveness check asks, "Are you still working, or should I restart you?" The difference matters. An app can be alive but not ready, such as when it is still warming up a cache.

Health checks are the gatekeepers of a deployment. No traffic reaches a new version until it proves it can handle requests. Without them, you would be routing real users to an app that might still be crashing on startup.

Every serious PaaS runs health checks automatically. You define the endpoint, and the platform handles the polling, the timeouts, and the decisions. Teams that build this themselves tune all of those settings by hand, and they usually learn the right values through painful trial and error. That tuition is paid in engineering time, on a problem the industry solved years ago.

---

## Rolling Updates: Replacing the Plane's Engine Mid-Flight

Here is the hard part. Your old version is serving live traffic right now. You need to replace it without dropping a single request. The most common answer is a [<VPIcon icon="iconfont icon-k8s"/>rolling update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/).

It works like this. Say you have four copies of your app running. The platform starts one copy of the new version and waits for its health checks to pass. Then it shifts a slice of traffic to it and shuts down one old copy. It repeats this, one copy at a time, until only the new version remains. Users never notice, because at every moment there are enough healthy copies to serve everyone.

Some teams use variations of this idea. A blue-green deployment runs the full new version beside the old one, then flips all traffic at once. A canary release sends a tiny share of users to the new version first, watching for errors before going wider.

Doing this by hand means writing orchestration logic, managing load balancer rules, and handling every edge case where a step fails halfway. That is months of engineering effort to build and a permanent tax to maintain, all for behavior a PaaS ships as the default. On a platform, you get zero-downtime releases out of the box, not as a project your team has to staff.

---

## Rollbacks: The Escape Hatch

Sometimes the new version passes every check and still breaks something real. An error rate climbs. A page loads blank. Now speed matters more than anything, and the fastest fix is rarely a new patch. It is a rollback: redeploying the previous artefact that you already know works.

This is why frozen, versioned artefacts are so important. A rollback is only fast if the old version is stored, tested, and ready to run. Teams that rebuild from an old commit under pressure are gambling at the worst possible time.

On most PaaS platforms, a rollback is one command or one click. The platform keeps your release history and can restore any previous version in seconds. That single feature has saved more on-call engineers' nights than perhaps any other.

---

## When You Don't Need a PaaS

The case for handing deployment to a platform is strong, but it isn't universal. There are teams for whom owning the pipeline is not overhead; it is a deliberate and justified engineering decision.

### When Compliance Demands It

Regulated industries like finance, healthcare, government, often operate under requirements that a standard PaaS cannot satisfy out of the box. Data residency rules may dictate exactly which physical infrastructure your builds touch. Audit requirements may demand a level of provenance and access logging that a managed platform doesn't expose.

Security controls may need to extend into the build environment itself, not just the runtime. In these contexts, the cost of owning the pipeline is real, but it is the cost of operating in that industry.

### When Deployment is Your Product

If your company sells deployment infrastructure, a CI/CD platform, a release orchestration tool, an internal developer platform, then your pipeline is not overhead at all. It is the product.

The engineers maintaining it are doing product work, not distraction work. The same applies to platform engineering teams at large organizations whose explicit charter is to build and own the deployment layer for dozens of other internal teams. In both cases, the question of "why are we running this ourselves" has an obvious answer: because this is what we do.

### When Your Infrastructure is Genuinely Unusual

Most PaaS platforms are optimized for stateless web services and standard container workloads. If your system falls outside that envelope, GPU clusters, real-time systems with strict latency requirements, hybrid on-premise and cloud deployments, hardware-in-the-loop testing, a general-purpose platform may simply not fit.

Shoehorning an unusual workload into a PaaS often produces more friction than building narrow, purpose-built deployment tooling around the specific constraints you actually have.

The common thread across all three cases is specificity. The teams that are right to own their pipelines can usually state clearly why a platform doesn't fit. If the answer is "we've always done it this way" or "we like having control," that's worth questioning. If the answer is "our compliance requirements mandate X" or "we sell this," that's a reason.

---

## Should You Still Be Running This Yourself?

A PaaS does not make any of these steps disappear. The build still runs. Artefacts still get stored. Migrations still execute, health checks still poll, and traffic still shifts one copy at a time. Abstracting these mechanics does not eliminate them. It standardizes them, and pushes their maintenance onto a team whose entire product is deployment.

That is the question every product team should now ask plainly: why are we still building and operating this machinery ourselves? A decade ago, a custom pipeline was unavoidable. Today it is a choice, and for most teams it is the wrong one. Every hour spent debugging a flaky build agent, tuning a health check timeout, or patching orchestration scripts is an hour taken from the product your customers actually pay for. The pipeline does not differentiate you. It cannot. Your competitors' deploys work the same way yours do.

Know how the chain works, because on-call at 2 a.m. demands it. But knowing how it works is not a reason to own it. "We built our own deployment system" is not a badge of honor anymore. It is an admission that your team maintains a second product with no customers. Unless deployment infrastructure is your business, hand the machinery to a platform, and put your engineers back on the work only they can do.

::: info About Author

Hope you enjoyed this article. You can [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Happens During a Production Deployment? A Behind-the-Scenes Guide",
  "desc": "You push your code. A few minutes later, it is live for real users. Between those two moments runs a long chain of machinery: builds, artefacts, migrations, health checks, traffic shifts. Every produc",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-happens-during-a-production-deployment.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
