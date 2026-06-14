---
lang: en-US
title: "My Team's Experience Moving from AWS to a PaaS"
description: "Article(s) > My Team's Experience Moving from AWS to a PaaS"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > My Team's Experience Moving from AWS to a PaaS"
    - property: og:description
      content: "My Team's Experience Moving from AWS to a PaaS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/my-team-s-experience-moving-from-aws-to-a-paas.html
prev: /devops/aws/articles/README.md
date: 2026-07-01
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/01d97a10-ea77-49e7-a8d9-1471683948b7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="My Team's Experience Moving from AWS to a PaaS"
  desc="Most product teams assume infrastructure ownership is simply part of building software. We did too. It wasn’t until we measured how much engineering time was disappearing into operational work that we"
  url="https://freecodecamp.org/news/my-team-s-experience-moving-from-aws-to-a-paas"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/01d97a10-ea77-49e7-a8d9-1471683948b7.png"/>

Most product teams assume infrastructure ownership is simply part of building software. We did too. It wasn’t until we measured how much engineering time was disappearing into operational work that we realised how expensive that assumption had become.

During a quarterly planning session, one of our engineers asked a question nobody on the team had thought to ask directly before: “How much of our time is actually going into infrastructure, versus building things people use?”

It wasn’t a rhetorical question. We pulled up our sprint history, our incident logs, and our calendars, and tried to answer it honestly.

We were a 7-person internal tooling team inside a larger enterprise organisation. Our mandate was straightforward: make other teams across the company faster through workflow automation, internal dashboards, and integrations between internal systems.

Our [<VPIcon icon="fa-brands fa-aws"/>Amazon Web Services (AWS)](https://aws.amazon.com/) environment wasn’t poorly built. It was, by most standards, mature infrastructure. Containerised services on ECS, automated deployments through GitHub Actions, CloudWatch observability, and properly scoped IAM roles across environments. Nothing about it would have raised concerns in an architecture review.

What it cost us wasn’t visible on an invoice. It was visible in calendars, in context-switching, and in how often “infrastructure work” quietly displaced the backlog we were actually accountable for.

That conversation eventually led us to evaluate and migrate to [<VPIcon icon="iconfont icon-sevalla"/>Sevalla](http://sevalla.com/), a Platform-as-a-Service infrastructure control for operational simplicity. The migration took three weeks. The effects were measurable within a month.

In this article, we'll walk through what our AWS setup looked like before migrating, what the migration process actually involved, the specific metrics that changed afterwards, and the trade-offs we accepted along the way.

---

## Before the Migration

Our AWS setup was respectable. We weren’t running something embarrassingly manual. We had:

- ECS for container orchestration
- RDS for databases
- CloudWatch for logs and metrics
- A CI/CD pipeline through GitHub Actions
- IAM roles managed across environments
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>CloudFormation](https://aws.amazon.com/cloudformation/) templates maintained by one senior engineer

It worked. Deployments were automated. The system was stable.

The problem wasn’t that anything was broken. The problem was what it cost us to keep it running smoothly.

---

## The Number That Started the Conversation

During a quarterly planning session, we tried to honestly account for where engineering time was going.

We estimated that across the team, roughly 12–15 hours per week were being spent on infrastructure-related work that wasn’t directly delivering value to internal users. This included:

- Deployment pipeline maintenance and debugging (~4 hrs/week)
- CloudWatch log investigation and alert tuning (~3 hrs/week)
- IAM permissions management and access reviews (~2 hrs/week)
- Dependency updates, security patches for infrastructure components (~2 hrs/week)
- Ad hoc incidents, environment drift, cost anomaly investigations (~3–4 hrs/week)

At a fully-loaded engineer cost, 12–15 hours per week is the equivalent of roughly one-third of a full-time engineer, every week, spent on keeping the lights on rather than building anything.

For a team whose backlog was already longer than we could realistically tackle, that number was hard to justify.

---

## The Deployment Process: What “Reasonably Automated” Actually Meant

Our deployment pipeline was good by most standards. Push to `main`, GitHub Actions triggered a build, pushed an image to ECR, and updated the ECS service. On a good day, a deployment took about 12 minutes from merge to live.

But “reasonably automated” came with caveats.

Only one engineer fully understood the pipeline. If something failed mid-deployment, like a task definition mismatch, an IAM permission error, or a CloudFormation stack conflict, most of the team would either wait for that engineer or spend significant time reading AWS documentation to diagnose it themselves.

Rollbacks were manual. There was no clean one-click rollback. Rolling back meant redeploying the previous image tag, which required knowing what that tag was, triggering the pipeline again, and waiting another 12 minutes. In an incident, those 12 minutes mattered.

Environment parity was fragile. We had staging and production environments. Keeping them consistent required discipline and periodic reconciliation. Configuration drift happened more than we’d like to admit, and it occasionally caused releases to behave differently in production than they had in staging.

New team members couldn’t deploy confidently. Onboarding a new engineer to the deployment process took the better part of a day, and most new hires remained hesitant to trigger deployments independently for weeks. The pipeline was automated, but the knowledge wasn’t.

---

## What the Migration Actually Involved

We moved over the course of about three weeks, migrating services incrementally rather than cutting over all at once.

The largest time investment was translating our environment variable configuration and secrets management from AWS Parameter Store into Sevalla’s environment configuration. That took roughly half a day.

The CI/CD migration was straightforward. We replaced our ECS deployment step with Sevalla’s Git-connected deployment. The GitHub integration picked up our repository directly.

Database migration was the most careful part. We ran both databases in parallel for two weeks, verified data consistency, then cut over DNS. There was no data loss, and no downtime.

Total migration effort across the team: approximately 40 hours spread over three weeks, mostly concentrated in two engineers.

---

## What Changed After the Migration

### Deployment time dropped from ~12 minutes to ~3 minutes

This wasn’t the most important change, but it was the most immediately visible one. Faster deployments meant faster feedback loops. A fix could be in production and verified within minutes rather than waiting out a build cycle.

Over a typical week with 8–10 deployments, that’s roughly 90 minutes of cumulative waiting time recovered, per week.

### Any engineer could deploy confidently on day one

This was the change that mattered most operationally. The deployment process became visible, documented by the interface itself, and required no specialist knowledge to operate. A new engineer joining the team could deploy their first change independently on their first day.

The informal “deployment gatekeeper” role that had quietly formed around our most AWS-experienced engineer effectively dissolved.

### Rollbacks went from a 12-minute manual process to a 30-second action

Every deployment in Sevalla retains a one-click rollback to the previous build. During the first month after migration, we used this twice: once for a regression we caught quickly, and once during a failed database migration we immediately needed to reverse.

Both incidents that previously would have required hours of manual intervention were resolved in under a minute.

### Infrastructure maintenance time dropped to approximately 2–3 hours per week

We no longer maintain IAM roles, CloudWatch alerts, CloudFormation templates, or ECS task definitions. The infrastructure surface area we own shrank dramatically.

Our estimate of 12–15 hours per week of infrastructure work fell to roughly 2–3 hours per week . It now involves  primarily monitoring application behaviour and reviewing build logs. That’s a recovery of approximately 10 hours per week of engineering time redirected toward the actual backlog.

Over a quarter, that’s roughly 130 hours, or about three full working weeks, returned to product work.

Looking back, we had quietly become a platform team. Not because we intended to, but because every infrastructure decision created more infrastructure to own.

### Log visibility improved without any additional tooling

One outcome we didn’t anticipate: production visibility got better even though we invested less in it.

On AWS, meaningful log analysis required CloudWatch Insights queries, proper log group configuration, and knowing where to look. Useful observability required deliberate setup effort.

On Sevalla, build logs, runtime logs, and deployment history are accessible directly from the dashboard without configuration. When something went wrong in production, the time from “something is broken” to “here is what happened” dropped from 10–20 minutes of searching across tools to under 2 minutes in most cases.

---

## What We Gave Up

Intellectual honesty requires listing the trade-offs.

First, we have less infrastructure flexibility. If we needed custom networking topology, specialised compute instances, or fine-grained storage configuration, Sevalla wouldn't cover those requirements. For an internal tooling team, none of those needs has materialised. But they could.

Also, some AWS-native integrations required reworking. We used a few Lambda functions that had to be refactored into services. That added some migration complexity we hadn’t fully anticipated.

---

## The Actual Lesson

The migration confirmed something that’s easy to miss when you’re inside it: the cost of infrastructure ownership for a product team isn’t primarily the cloud bill. It’s the engineering attention.

For our team, 10 hours per week of recovered time across a 7-person team meant a 28% increase in capacity available for work that users actually care about. That’s not a marginal improvement. It’s a meaningful change in what the team can realistically ship.

That outcome isn’t specific to Sevalla. Any infrastructure simplification that genuinely reduces operational burden would produce a similar result.

The question worth asking isn’t whether your team *can* manage infrastructure. It’s whether managing infrastructure is the best use of the engineering capacity you have.

For an internal tooling team whose value is measured entirely by what it ships, not by how it deploys, the answer, for us, was clearly no.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "My Team's Experience Moving from AWS to a PaaS",
  "desc": "Most product teams assume infrastructure ownership is simply part of building software. We did too. It wasn’t until we measured how much engineering time was disappearing into operational work that we",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/my-team-s-experience-moving-from-aws-to-a-paas.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
