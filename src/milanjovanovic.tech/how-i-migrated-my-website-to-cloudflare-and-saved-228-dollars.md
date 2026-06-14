---
lang: en-US
title: "How I Migrated My Website to Cloudflare and Saved $228"
description: "Article(s) > How I Migrated My Website to Cloudflare and Saved $228"
icon: fas fa-network-wired
category:
  - DevOps
  - Cloudflare
  - Docker
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - cloudflare
  - docker
  - github
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Migrated My Website to Cloudflare and Saved $228"
    - property: og:description
      content: "How I Migrated My Website to Cloudflare and Saved $228"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-i-migrated-my-website-to-cloudflare-and-saved-228-dollars.html
prev: /devops/articles/README.md
date: 2026-07-18
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_203.png
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

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudeflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  name="How I Migrated My Website to Cloudflare and Saved $228"
  desc="This website ran on Netlify for years, at $19 a month. Earlier this month I moved it to Cloudflare Pages: same repo, same GitHub Actions pipeline, zero…"
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloghow-i-migrated-my-website-to-cloudflare-and-saved-228-dollars"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_203.png"/>

Earlier this month, I migrated this website from Netlify to Cloudflare. The site was down for zero seconds, no reader noticed a thing, and the hosting bill went from **$19 a month to $0**. That's $228 a year, for one afternoon of work.

Migrations like this have a scary reputation, so I want to show you the playbook I used:

- The dual-deploy CI setup that removes most of the risk
- Moving DNS without touching the website
- The cutover, and the one thing that broke
- A sidenote on R2, the hidden gem of Cloudflare's free tier

Let's dive in.

---

## What $19 a Month Was Buying

This is not a Netlify hate story. Netlify served this site reliably for years, and the developer experience is genuinely good.

![Netlify dashboard showing the bandwidth usage for the site, which is ~280 GB per month](https://milanjovanovic.tech/blogs/mnw_203/netlify_bandwidth.png)

But the setup had quietly become redundant. This site compiles to static files, and my [**GitHub Actions pipeline**](/milanjovanovic.tech/how-to-build-ci-cd-pipeline-with-github-actions-and-dotnet.md) already does the building. Netlify's job, at the end of all that, was to put a folder of files behind a CDN.

Serving static files is a commodity in 2026. [<VPIcon icon="fa-brands fa-cloudeflare"/>Cloudflare Pages](https://pages.cloudflare.com) does it for free, with unmetered bandwidth, on one of the largest edge networks in the world.

The hard part is switching without breaking the wiring a website accumulates over the years: DNS records, email authentication, redirects, comment auth.

---

## The Plan

The whole migration hangs on one principle:

**The old host keeps serving production until a single DNS change flips traffic to the new one.**

Everything else is preparation that can't affect the live site:

1. Deploy to Cloudflare Pages *in parallel*, and verify the copy on its own URL.
2. Move DNS hosting to Cloudflare while the records still point at Netlify.
3. Flip the website record to Pages.
4. Let it bake, then decommission Netlify.

At every point, a working version of the site is one DNS record away.

---

## Step 1: One Build, Two Hosts

Cloudflare Pages can clone and build your repo itself, but I skipped that option. My build already runs in GitHub Actions, with environment variables and secrets wired up there, and I didn't want to move the build and the hosting in the same step.

So CI keeps building, and [<VPIcno icon="fa-brands fa-cloudflare"/>wrangler](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare's CLI) uploads the finished `dist/` folder. Cloudflare calls this a **direct upload** deployment, and it turned the migration into one extra step in the workflow:

```yaml
- name: Build 🏗
  run: npm run build

- name: Deploy to Netlify 💫
  run: npx netlify deploy --prod --dir=dist

# Temporary: dual-deploy during the migration so the Pages copy
# can be verified against live Netlify. Delete after the cutover.
- name: Deploy to Cloudflare Pages 💫
  run: npx wrangler@4 pages deploy dist --project-name=mjtech --branch=main
```

Readers kept hitting Netlify. Meanwhile, I had a complete, always-current copy of production at `mjtech.pages.dev` to click through: the blog, search, course pages, the RSS feed, redirects.

![GitHub Actions builds the site once and deploys the same dist folder to two hosts: Netlify, which keeps serving readers, and Cloudflare Pages, which hosts a verification copy at mjtech.pages.dev](https://milanjovanovic.tech/blogs/mnw_203/dual_deploy.png)

Two GitHub secrets make it work (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`), and the first deploy creates the Pages project. If your site has auth, add the new domain to your provider's authorized list (Firebase, in my case), or sign-ins will fail only on the new host.

![Cloudflare Pages deployments list showing production deployments from main and per-branch preview deployments with their own pages.dev URLs](https://milanjovanovic.tech/blogs/mnw_203/cf_pages_deployments.png)

---

## Step 2: Move DNS Without Moving the Website

The domain never left my registrar. Only the **nameservers** changed, which hands DNS hosting to Cloudflare.

Before touching anything, I inventoried every DNS record. The website records are the easy ones: if they're wrong, you notice within seconds. The dangerous ones are the MX records for email, the SPF, DKIM, and DMARC TXT records, domain verifications, and the newsletter sending domain. Break a DKIM record, and your emails quietly start landing in spam folders until someone tells you.

Cloudflare imports your existing records when you add the domain, but the import isn't guaranteed to be complete. In fact, in my case it missed a few important DNS records, so I had to add them manually. Check it against your inventory, record by record, and keep email and verification records **DNS only** (the grey cloud).

Then the nameserver change at the registrar. The imported records still pointed the domain at Netlify, so DNS hosting moved to Cloudflare while the live site kept serving from Netlify, unaffected.

![Before the cutover, Cloudflare DNS still routes visitors to Netlify while the verified Pages copy waits; after the cutover, one record change routes visitors to Cloudflare Pages, and rolling back means repointing that record at Netlify, which still holds the last deploy](https://milanjovanovic.tech/blogs/mnw_203/dns_cutover.png)
<!-- TODO: mermaid화-->

---

## Step 3: The Cutover

With DNS on Cloudflare and the Pages copy verified, the migration moment itself is one click: add your domain as a **custom domain** on the Pages project. Cloudflare repoints the DNS record and provisions a certificate, and the moment it activates, your traffic is served by Cloudflare. (I used the occasion to make the apex domain the canonical host, with <VPIcon icon="fas fa-folder-open"/>`www` redirecting to it.)

The rollback is what makes this step safe. Proxied DNS changes on Cloudflare take effect in seconds, and Netlify still held the latest deploy thanks to the dual-deploy step. If anything had looked wrong, repointing one record would have brought the old setup back within a minute.

Cutover day was July 6. The dual-deploy step went into CI at 3:43 PM. At 6:47 PM, traffic was on Cloudflare and the Netlify step was deleted from the pipeline. Three hours, most of them spent double-checking.

![The Pages project's custom domains tab showing milanjovanovic.tech attached and active, the moment production traffic moved to Cloudflare](https://milanjovanovic.tech/blogs/mnw_203/cf_custom_domains.png)

---

## The One Thing That Broke

Every migration has one.

My <VPIcon icon="iconfont icon-toml"/>`netlify.toml` contained a redirect from <VPIcon icon="iconfont icon-code"/>`/sitemap.xml` to <VPIcon icon="iconfont icon-code"/>`/sitemap-index.xml` (the generator produces the latter, search engines ask for the former). I ported the redirect rules I remembered, and this one, added years ago, wasn't in the group. It 404'd after the cutover.

Cloudflare Pages reads redirects from a <VPIcon icon="fas fa-file-lines"/>`_redirects` file in your build output, so the fix was one line:

```text
/sitemap.xml    /sitemap-index.xml    301
```

Before you decommission a host, read its config file line by line and ask where each rule lives now.

---

## What the Free Tier Gets You

The $0 bill would have justified the move on its own, but it came with upgrades:

- **Preview deployments for every branch.** Any push deploys to `<branch>.mjtech.pages.dev`. The issue you're reading was proofread on one of those URLs.
- **No bandwidth math.** Cloudflare doesn't meter requests or bandwidth for static assets, so I no longer think about traffic spikes.
- **The proxy layer.** The site sits behind Cloudflare's edge: universal SSL, HTTP/3, caching, DDoS protection, and redirect rules that run before a request reaches the origin (that's where my `www` to apex redirect lives).
- **Instant DNS.** Proxied record changes propagate in seconds, which is what made the rollback plan credible.

The trade-off is more eggs in one basket: Cloudflare is now my DNS, CDN, and host. And Pages' own build system is weaker than Netlify's, which I sidestep by building in GitHub Actions and treating Pages as dumb file hosting.

---

## Sidenote: R2 for Database Backups

While I was in the Cloudflare dashboard anyway, I gave [<VPIcno icon="fa-brands fa-cloudflare"/>R2](https://developers.cloudflare.com/r2/), their S3-compatible object storage, a real job.

The free tier includes 10 GB of storage and, unique among the big clouds, **zero egress fees**. Downloading your data costs nothing, which is exactly the property you want for backups.

I use it for [<VPIcon icon="fas fa-globe"/>Katabench](https://katabench.com), the coding platform I'm building. Every night, a cron job on the [**server**](/milanjovanovic.tech/build-your-own-vpn-with-tailscale.md) dumps the production Postgres database and ships it to an R2 bucket with [<VPIcon icon="fas fa-globe"/>rclone](https://rclone.org):

```sh
stamp=$(date -u +%Y%m%dT%H%M%SZ)

# Dump, ship to R2, prune to 30 days of nightlies
docker exec appdb pg_dump -Fc -U postgres coderunner > "appdb-${stamp}.dump"
rclone copyto "appdb-${stamp}.dump" "r2:backups/prod/appdb-${stamp}.dump"
rclone delete --min-age 30d r2:backups/prod/
```

Thirty days of nightly backups, off the server, on the free tier. To rclone, R2 is just S3 with a Cloudflare endpoint.

If you self-host anything, don't skip this piece. A backup on the same box as the database has the same blast radius as the database.

---

## Summary

The playbook, in five lines:

1. **Deploy to both hosts from the same CI build**, and verify the new copy on its own URL while the old one serves production.
2. **Move DNS first, cut over second.** Nameservers can change hands while every record still points at the old host.
3. **Inventory your DNS records before the move.** The email records are the ones that hurt.
4. **Read the old platform's config before deleting it.** Redirects hide in there.
5. **Keep the old host warm until you're sure.** Rollback should be a single DNS record.

Total cost: one afternoon. Total savings: $228 a year, plus branch previews and free off-site backups.

The best migrations are the ones nobody notices.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Migrated My Website to Cloudflare and Saved $228",
  "desc": "This website ran on Netlify for years, at $19 a month. Earlier this month I moved it to Cloudflare Pages: same repo, same GitHub Actions pipeline, zero…",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-i-migrated-my-website-to-cloudflare-and-saved-228-dollars.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
