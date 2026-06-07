---
lang: en-US
title: "How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App"
description: "Article(s) > How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App"
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - master.dev
  - devops
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App"
    - property: og:description
      content: "How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/vibe-coding-deployment.html
prev: /devops/articles/README.md
date: 2026-02-24
isOriginal: false
author:
  - name: Marc Grabanski
    url: https://master.dev/blog/author/marcgrabanski/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/8655
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
  name="How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App"
  desc="Some solid advice from a couple of Frontend Masters courses made for a fast, secure, and ready to scale deployment system."
  url="https://master.dev/blog/vibe-coding-deployment/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/8655"/>

As the CEO of Frontend Masters, I spend a lot of time thinking about what courses we publish, which instructors we bring on, and whether the content actually helps developers level up. But thinking about great content and actually using the courses to learn are different things. Recently, I got to do both at once!

On the nights and weekends, I built [<VPIcon icon="fas fa-globe"/>Goalzi](https://goalzi.com/), a social app for setting and sharing life goals, and it started with me wanting to actually learn Go. I worked through Melkey’s [<VPIcon icon="iconfont icon-frontendmasters"/>Complete Go](https://master.dev/courses/complete-go/) course on Frontend Masters to get the fundamentals down, then wrote the original <VPIcon icon="fa-brands fa-golang"/>`main.go` from scratch. It reminded me of the old PHP days, where you had one file, a bunch of functions, and raw SQL, and somehow it all worked. I leaned into that. No layers, no framework, just the Go standard library and a single file. It felt great.

That approach got me about 90% of the way there. The last 10% is where AI (Cursor, mostly) did the heavy lifting: the engagement features, the email system, the onboarding, all the polish that turns a working app into something worth shipping. There’s a quote, “the last 10% of a project is 90% of the work,” and that always ends up being true. So honestly, I don’t think I would have shipped it without AI. It was also a great excuse to try the latest tools and models firsthand. As someone running an ed-tech company, I need to keep my skills sharp, and there’s no substitute for actually building something to understand what’s going on in the industry.

And the thing I built? A social network for goal setting and cheering each other on. I think the idea is genuinely inspiring. Will people use it? I have no idea, lol. But I hope they do.

![Screenshot of a goal tracking application showing recent updates from users setting fitness and reading goals.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/goalzi.png?resize=1024%2C852&ssl=1)

If you build a vibe-coded app, you still need to deploy it. And if you’re going to deploy it, you may as well do it in a way that scales. That’s where Erik Reinert’s [<VPIcon icon="iconfont icon-frontendmasters"/>Cloud Infrastructure: Start-Up to Scale](https://master.dev/courses/cloud-infrastructure/) came in. It’s the kind of course where being technically comfortable already lets you move fast and just absorb the infrastructure patterns without getting lost.

Here’s what I ended up with.

---

## The Stack

Goalzi is a Go backend, Postgres, server-rendered HTML templates, and vanilla JS and CSS. No frontend framework. Users sign in with Google, set goals, post updates, follow each other, and leave cheers and comments.

The deployment stack:

- **AWS App Runner** to serve the app
- **Docker** (multi-stage build) to containerize it
- **Amazon ECR** to store images
- **AWS SSM Parameter Store** for secrets
- **AWS SES** for email
- **Supabase** for hosted Postgres
- **Route 53** for DNS

---

## Why Erik’s Cloud Deployment Course, and What it Gave Me

The course walks through three phases of deployment: Start-up, Growth, and Scale. The core idea is that you containerize from day one, even if you’re a team of one, because that decision compounds over time. A VPS might feel simpler at first, but you pay for it later when you need to grow or move.

That framing was exactly what I needed. I had gotten something running on App Runner, but I had skipped steps. The IAM roles were sloppier than they should have been. I wasn’t handling secrets properly. Migrations were kind of an afterthought.

Erik’s course made each piece concrete. He shows you exactly how to set up Parameter Store entries, scope an IAM role to only what App Runner needs, push images to ECR with a real tagging strategy, and wire it all together. Watching it as a practitioner reminded me why we obsess over instructors who actually work in the systems they teach.

---

## From “It Works on My Machine” to One Command

The goal was simple: `make deploy` handles everything. No manual steps, no “oh right, I also need to run that migration.”

Here’s what it does:

1. Runs `go test` against the full codebase
2. Reads the production database URL from SSM (`/goalzi-service/postgres-url`) and runs all pending SQL migrations via a one-off Docker container
3. Builds the Docker image for `linux/amd64`, tagged with the current git SHA
4. Pushes the SHA-tagged image to ECR
5. Retags it as `latest` and pushes again, so App Runner picks it up and deploys within a couple of minutes

For deploys with no schema changes, `SKIP_MIGRATE=1 make deploy` skips straight to step 3. HTTPS is handled automatically. No servers to patch.

---

## Secrets Done Right

Nothing production-sensitive is in the repo. The database connection string lives only in SSM. App Runner pulls the Google OAuth credentials directly from Parameter Store at runtime using an IAM role scoped to exactly what it needs.

This is one of the things Erik makes very concrete in the course: setting up Parameter Store, creating the IAM role, and writing the policy that limits access to only that service’s parameters. Seeing it done properly confirmed I had it wrong before and showed me a cleaner way to structure it.

The result: I could open-source the whole repo tomorrow, and nothing would leak.

---

## Migrations That Run the Same Everywhere

Migrations are plain SQL files in a <VPIcon icon="fas fa-folder-open"/>`migrations/` directory, applied in order. Locally, they run against a Docker Compose Postgres instance. In production, the same files run via a one-off Docker container using the prod URL pulled from SSM. Same files, same order, across both environments, running automatically on every deploy.

---

## Syncing Production Data to Local

`make sync-from-prod` reads the prod DB URL from SSM, dumps only the app tables, spins up local Postgres via Docker Compose if needed, and restores the dump. I use this constantly for debugging real user issues, testing features against realistic data, and verifying backfill migrations before running them on the real database.

---

## Email That Lands in the Inbox

Goalzi sends transactional emails for cheers, comments, and follows, as well as a monthly digest. The setup includes AWS SES with SMTP credentials, domain verification via Route 53, DKIM CNAME records, SPF, and DMARC.

The thing that trips people up: SES starts in sandbox mode. Everything looks fine in testing, but it only sends to verified addresses. Requesting production access is a separate step, so don’t skip it. I also built a small internal endpoint to fire off a test email before any deploy that touches email templates. It’s saved me from shipping broken emails more than once.

---

## The Honest Version

I built Goalzi fast. AI-assisted, single file, shipped before it was clean. But the deployment is not fast and loose. Tests run on every deploy. Secrets are managed properly. Migrations are versioned and automated. The whole thing is reproducible.

That combination works really well. I can iterate quickly because I trust the deploy. I trust the deploy because I can’t skip the safety steps.

As CEO, I constantly talk about the quality of Frontend Masters’ content. It was genuinely satisfying to sit down as a regular user, follow along with one of our courses, and walk away with a better-deployed product. Erik built something I’d recommend to anyone doing real work on AWS, and now I can say that from experience, not just from reading the curriculum doc.

::: info

[<VPIcon icon="fas fa-globe"/>Goalzi](https://goalzi.com/) is live. Set a goal. Tell someone about it.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Setup Production-Grade Deployment for My (Somewhat) Vibe-Coded App",
  "desc": "Some solid advice from a couple of Frontend Masters courses made for a fast, secure, and ready to scale deployment system.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/vibe-coding-deployment.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
