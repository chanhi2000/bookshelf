---
lang: en-GB
title: "Cotton Coder"
description: "Article(s) > Cotton Coder"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Cotton Coder"
    - property: og:description
      content: "Cotton Coder"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/cotton-coder.html
prev: /programming/js-node/articles/README.md
date: 2024-01-24
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-01-24-cotton-coder.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Cotton Coder"
  desc="The one where I launch a new blog"
  url="https://dbushell.com/2024/01/24/cotton-coder/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-01-24-cotton-coder.png"/>

::: note Update for 10 Jul 2024

Alas life is busy and plans for Cotton Coder are on the back burner. I may have been a little too excited launching it! I’m publishing a [**new microblog**](/dbushell.com/microblog.md) here at `dbushell.com`.

It’s finally happened! My bookmark blog is back!

![Cotton Coder](https://dbushell.com/images/blog/2024/cotton-coder.avif)

🚀 **Cotton Coder is live!**

> The curated bookmark blog of web dev curiosities

**Cotton Coder** is launching as a small project with large ambitions. It starts life as my new bookmark blog. A blog I’ve been meaning to revive for a very long time. I used to curate a blog called Design Heroes that I permanently archived 12 years go.

This new blog is all about:

- Web design
- Web development
- Web technology

I think you see the pattern. If you read my blog here at `dbushell.com` I’m sure you’ll find something useful on Cotton Coder.

---

## Tech Stack

Cotton Coder is built with **Deno** and **Svelte** using my experimental [<VPIcon icon="iconfont icon-github"/>`dbushell/dinossr`](https://github.com/dbushell/dinossr/) framework, another of my [**new projects for 2024**](/dbushell.com/new-projects-for-2024.md). At least for now. I can migrate to SvelteKit easily if I need something more mature.

The blog is backed by a [<VPIcon icon="iconfont icon-github"/>`denoland/denokv`](https://github.com/denoland/denokv) database. I’ve implemented GitHub OAuth login to protect the content editing routes and API endpoints. The [source is available (<VPIcon icon="iconfont icon-github"/>`dbushell/cottoncoder.com`)](https://github.com/dbushell/cottoncoder.com) on GitHub if you’re curious.

---

## Self-Hosted

I was planning to host Cotton Coder on [<VPIcon icon="iconfont icon-deno"/>Deno Deploy](https://deno.com/deploy). Unfortunately right now the isolate cold start times are pretty rough. There is an open [GitHub issue (<VPIcon icon="iconfont icon-github"/>`denoland/deploy_feedback`)](https://github.com/denoland/deploy_feedback/issues/505). Even the most basic *“Hello World”* example suffers. So it’s not just my bad code! I’ve been using Deno Deploy for things like IoT web hooks and small “edge” function tasks. Those work great. But a website response being delayed by seconds is a performance killer.

Solution: I’m self-hosting for now!

The website lives inside Docker containers, in a Proxmox virtual machine, on a firewalled VLAN, proxied by a [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/). This saves me from pointing DNS to my public IP and opening port 443 on my router. It should be secure. I’ll find out quickly if it’s not!

---

## What’s Next

Cotton Coder is not replacing my blog here. I’ve never used this blog for bookmarks anyway. I’ll be publishing to both sites. Over my Christmas break I had a lot of ideas for what Cotton Coder could be. We’ll see what bears fruit. Launching this month was important otherwise the site would sit in a private code repo forever.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cotton Coder",
  "desc": "The one where I launch a new blog",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/cotton-coder.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
