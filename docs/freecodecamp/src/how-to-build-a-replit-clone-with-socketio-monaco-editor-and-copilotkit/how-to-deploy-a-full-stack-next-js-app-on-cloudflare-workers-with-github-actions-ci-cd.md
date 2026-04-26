---
lang: en-US
title: "How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD"
description: "Article(s) > How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD"
icon: fa-brands fa-js
category:
  - Node.js
  - Next.js
  - Supabase
  - CSS
  - TailwindCSS
  - DevOps
  - Cloudflare
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - supabase
  - css
  - tailwind
  - tailwindcss
  - tailwind-css
  - devops
  - cloudflare
  - github
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD"
    - property: og:description
      content: "How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-full-stack-next-js-app-on-cloudflare-workers-with-github-actions-ci-cd.html
prev: /programming/js-next/articles/README.md
date: 2026-04-29
isOriginal: false
author:
  - name: Md Tarikul Islam
    url: https://freecodecamp.org/news/author/Tarikul001/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cbb9e559-baa7-452c-992a-3416041712ad.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
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
  name="How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD"
  desc="I typically build my projects using Next.js 14 (App Router) and Supabase for authentication along with Postgres. The default deployment choice for a Next.js app is usually Vercel, and for good reason:"
  url="https://freecodecamp.org/news/how-to-deploy-a-full-stack-next-js-app-on-cloudflare-workers-with-github-actions-ci-cd"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cbb9e559-baa7-452c-992a-3416041712ad.png"/>

I typically build my projects using Next.js 14 (App Router) and Supabase for authentication along with Postgres. The default deployment choice for a Next.js app is usually Vercel, and for good reason: it provides an excellent developer experience.

But after running the same project on both platforms for about a week, I started exploring Cloudflare Workers as an alternative. I noticed improvements in latency (lower TTFB) and found the free tier to be more flexible for my use case.

Deploying Next.js apps on Cloudflare used to be challenging. Earlier solutions like Cloudflare Pages had limitations with full Next.js features, and tools like `next-on-pages` often lagged behind the latest releases.

That changed with the introduction of [<VPIcon icon="fas fa-globe"/>`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). It allows you to compile a standard Next.js application into a Cloudflare Worker, supporting features like SSR, ISR, middleware, and the Image component – all without requiring major code changes.

In this guide, I’ll walk you through the exact steps I used to deploy my full-stack Next.js + Supabase application to Cloudflare Workers.

This article is the runbook I wish I had when I started.

---

## Why Choose Cloudflare Workers Over Vercel?

When deploying a Next.js application, Vercel is often the default choice. It offers a smooth developer experience and tight integration with Next.js.

But Cloudflare Workers provides a compelling alternative, especially when you care about global performance and cost efficiency.

Here’s a high-level comparison (at the time of writing):

| Concern | Vercel (Hobby) | Cloudflare Workers (Free Tier) |
| --- | --- | --- |
| Requests | Fair usage limits | Millions of requests per day |
| Cold starts | ~100–300 ms (region-based) | Near-zero (V8 isolates) |
| Edge locations | Limited regions for SSR | 300+ global edge locations |
| Bandwidth | ~100 GB/month (soft cap) | Generous / no strict cap on free tier |
| Custom domains | Supported | Supported |
| Image optimization | Counts toward usage | Available via `IMAGES` binding |
| Pricing beyond free | Starts at ~$20/month | Low-cost, usage-based pricing |

::: important Key Takeaways

- **Lower latency globally**: Cloudflare runs your app across hundreds of edge locations, reducing response time for users worldwide.
- **Minimal cold starts**: Thanks to V8 isolates, functions start almost instantly.
- **Cost efficiency**: The free tier is generous enough for portfolios, blogs, and many small-to-medium apps.

:::

::: note Trade-offs to Consider

Cloudflare Workers use a V8 isolate runtime, not a full Node.js environment. That means:

- Some Node.js APIs like `fs` or `child_process` aren't available
- Native binaries or certain libraries may not work

That said, for most modern stacks – like Next.js + Supabase + Stripe + Resend – this limitation is rarely an issue.

In short, choose **Vercel** if you want the simplest, plug-and-play Next.js deployment. Choose **Cloudflare Workers** if you want better edge performance and more flexible scaling.

:::

::: note Prerequisites

Before getting started, make sure you have the following set up. Most of these take only a few minutes:

- **Node.js 18+** and **pnpm 9+** (you can also use npm or yarn, but this guide uses pnpm.)
- A **Cloudflare account** 👉 [<VPIcno icon="fa-brands fa-cloudflare"/>`dash.cloudflare.com/sign-up`](https://dash.cloudflare.com/sign-up)
- A **Supabase account** (if your app uses a database) 👉 [`supabase.com`](https://supabase.com)
- A **GitHub repository** for your project (required later for CI/CD setup)
- A **domain name** (optional) – You’ll get a free `*.workers.dev` URL by default.

### Install Wrangler (Cloudflare CLI)

We’ll use Wrangler to build and deploy the application:

```sh
pnpm add -D wrangler
```

---

## The Stack

Here’s the tech stack used in this project:

- **Next.js (v14.2.x):** Using the App Router with Edge runtime for both public and dashboard routes
- **Supabase:** Handles authentication, Postgres database, and Row-Level Security (RLS)
- **Tailwind CSS** + UI utilities: For styling, along with lightweight animation using Framer Motion
- **Cloudflare Workers:** Deployment powered by `@opennextjs/cloudflare` and `wrangler`
- **GitHub Actions:** Used to automate CI/CD and deployments

::: note

If you're using Next.js **15 or later**, you can remove the  
`--dangerouslyUseUnsupportedNextVersion` flag from the build script, as it's only required for certain Next.js 14 setups.

:::

---

## Step 1 — Install the Cloudflare Adapter

From inside your existing Next.js project, install the OpenNext adapter along with Wrangler (Cloudflare’s CLI tool):

```sh
pnpm add @opennextjs/cloudflare
pnpm add -D wrangler
```

Then add the deploy scripts to <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",

    "cloudflare-build": "opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion",
    "preview":          "pnpm cloudflare-build && opennextjs-cloudflare preview",
    "deploy":           "pnpm cloudflare-build && wrangler deploy",
    "upload":           "pnpm cloudflare-build && opennextjs-cloudflare upload",
    "cf-typegen":       "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

What each script does:

| Script | What it does |
| --- | --- |
| `pnpm cloudflare-build` | Compiles your Next app into `.open-next/` (the Worker bundle). No upload. |
| `pnpm preview` | Builds and runs the Worker locally with `wrangler dev`. Closest thing to prod. |
| `pnpm deploy` | Builds and uploads to Cloudflare. **This ships to production.** |
| `pnpm upload` | Builds and uploads a *new version* without promoting it (for staged rollouts). |
| `pnpm cf-typegen` | Regenerates <VPIcon icon="iconfont icon-typescript"/>`cloudflare-env.d.ts` types after editing <VPIcon icon="iconfont icon-json"/>`wrangler.jsonc`. |

::: note Heads up

the Pages-based `@cloudflare/next-on-pages` is a different tool. We are **not** using Pages — we're deploying as a real Worker. Don't mix the two.

:::

---

## Step 2 — Wire OpenNext into `next dev`

So that `pnpm dev` can read your Cloudflare bindings (env vars, R2, KV, D1, …) the same way production will, edit <VPIcon icon="fa-brands fa-js"/>`next.config.mjs`:

```js title="next.config.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NODE_ENV !== "production") {
  const { initOpenNextCloudflareForDev } = await import(
    "@opennextjs/cloudflare"
  );
  initOpenNextCloudflareForDev();
}

export default nextConfig;
```

We only call it in development so `next build` stays fast and CI doesn't spin up a Miniflare instance for nothing.

---

## Step 3 — Local Environment Setup with <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars`

When working with Cloudflare Workers locally, Wrangler uses a file called <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars` to store environment variables (instead of <VPIcon icon="iconfont icon-dotenv"/>`.env.local` used by Next.js).

A simple and reliable approach is to keep an example file in your repo and ignore the real one.

### Example: <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars.example` (committed)

```sh title=".dev.vars.example"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-ANON-KEY"
NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL="admin@example.com"
```

### Set Up Your Local Environment

Run the following commands:

```sh
cp .dev.vars.example .dev.vars
cp .dev.vars .env.local
```

- <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars` is used by Wrangler (`wrangler dev`)
- <VPIcon icon="iconfont icon-dotenv"/>`.env.local` is used by Next.js (`next dev`)

### Why Use Both Files?

- `next dev` reads from <VPIcon icon="iconfont icon-dotenv"/>`.env.local`
- `wrangler dev` (used in `pnpm preview`) reads from <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars`

Keeping both files in sync ensures your app behaves consistently in development and when running in the Cloudflare runtime.

### Update <VPIcon icon="iconfont icon-git"/>`.gitignore`

Make sure these files are ignored:

```plaintext title=".gitignore"
.dev.vars
.env*.local
.open-next
.wrangler
```

---

## Step 4 — Deploy Your App from Your Local Machine

Once `pnpm preview` is working correctly, you're ready to deploy your application:

```sh
pnpm deploy
```

Under the hood that runs:

```sh
pnpm cloudflare-build && wrangler deploy
```

The first time, Wrangler will:

1. Compile your app to `.open-next/worker.js`.
2. Upload the script + assets to Cloudflare.
3. Print your live URL, e.g. `https://porfolio.<your-account>.workers.dev`.

Open it in a browser. Congratulations — you're on Cloudflare's edge in 330+ cities. The page should be served in **<100 ms** TTFB from anywhere.

[Here's the live version of my own portfolio deployed this way](https://portfolio.tarikuldev.workers.dev/)

---

## Step 5 — Push Your Secrets to the Worker

Local <VPIcon icon="iconfont icon-dotenv"/>`.dev.vars` is **not** uploaded by `wrangler deploy`. You have to push secrets explicitly:

```sh
wrangler secret put NEXT_PUBLIC_SUPABASE_URL
wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
wrangler secret put NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL
```

Each command prompts you for the value and stores it encrypted on Cloudflare. Or do it visually:

> Cloudflare Dashboard → **Workers & Pages** → your worker → **Settings** → **Variables and Secrets** → **Add**.
<!-- TODO: mermaid화 -->

Important: `NEXT_PUBLIC_*` vars are inlined into the client bundle at build time, so they also need to be available when pnpm cloudflare-build runs (locally, that's your .env.local; in CI, see Step 10).

---

## Step 6 — Set Up Continuous Deployment with GitHub Actions

Once your local deployment is working, the next step is automating deployments so every push to the <VPIcon icon="fas fa-code-branch"/>`main` branch updates production automatically.

With this workflow:

- Pull requests will run validation checks
- Production deploys only happen after successful builds
- Broken code never reaches your live site

Create the following file inside your project:

```yaml :collapsed-lines title=".github/workflows/deploy.yml"
name: CI / Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: cloudflare-deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    name: Lint and Build
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL: ${{ secrets.NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL }}

  deploy:
    name: Deploy to Cloudflare Workers
    needs: verify
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Build and Deploy
        run: pnpm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL: ${{ secrets.NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL }}
```

### Required GitHub repo secrets

Go to GitHub repo → Settings → Secrets and variables → Actions → New repository secret and add:

| Secret | Where to get it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | [<VPIcno icon="fa-brands fa-cloudflare"/>`dash.cloudflare.com/profile/api-tokens`](https://dash.cloudflare.com/profile/api-tokens) → "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar, "Account ID" |
| `CLOUDFLARE_ACCOUNT_SUBDOMAIN` | Your `*.workers.dev` subdomain (used only for the deployment URL link) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings |
| `NEXT_PUBLIC_DASHBOARD_DEFAULT_EMAIL` | Email pre-filled on `/dashboard/login` |

That's it. Push it to `main` and it'll go live in about 90 seconds. PRs run lint and build only, so broken code never reaches production.

---

## Step 7 — Updating the Project (the Daily Workflow)

After the initial setup, the loop is boringly simple — which is the whole point. Here's what I actually do day-to-day:

### Code Change

```sh
git checkout -b feat/new-section
# ...edit files...
pnpm dev                # iterate locally
pnpm preview            # final smoke test on the Worker runtime
git commit -am "feat: add new section"
git push origin feat/new-section
```

Open a PR and the **verify** that the job runs. Then review, merge, and the deploy it. The job ships to Cloudflare automatically.

### Updating env Vars / Secrets

```sh
# Local
nano .dev.vars

# Production
wrangler secret put NEXT_PUBLIC_SUPABASE_URL
# ...etc.
```

---

## Final Thoughts

When I started this migration, I was nervous about leaving Vercel — the Next.js DX there is genuinely excellent. But the moment you push beyond a hobby site, Cloudflare's economics and edge performance are not close.

With `@opennextjs/cloudflare`, the developer experience has also caught up: my `pnpm dev` loop is identical, my `pnpm preview` mimics production, and `git push` deploys globally in ~90 seconds.

If you've been holding off because the old Cloudflare Pages + Next.js story was rough, that era is over. Try this runbook on a side project this weekend and see for yourself.

If you found this useful, the full repo is here — feel free to clone it as a starter.

Happy shipping.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Full-Stack Next.js App on Cloudflare Workers with GitHub Actions CI/CD",
  "desc": "I typically build my projects using Next.js 14 (App Router) and Supabase for authentication along with Postgres. The default deployment choice for a Next.js app is usually Vercel, and for good reason:",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-full-stack-next-js-app-on-cloudflare-workers-with-github-actions-ci-cd.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
