---
lang: en-GB
title: "Deno’s Decline (6 Regions and Falling)"
description: "Article(s) > Deno’s Decline (6 Regions and Falling)"
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
      content: "Article(s) > Deno’s Decline (6 Regions and Falling)"
    - property: og:description
      content: "Deno’s Decline (6 Regions and Falling)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/denos-decline.html
prev: /programming/js-node/articles/README.md
date: 2025-04-28
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-04-28-denos-decline.png
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
  name="Deno’s Decline (6 Regions and Falling)"
  desc="The one where I nosey through rather telling git commits"
  url="https://dbushell.com/2025/04/28/denos-decline/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-04-28-denos-decline.png"/>

The future of [<VPIcon icon="iconfont icon-deno"/>Deno Land Inc.](https://deno.com/) is not looking bright. Their commercial product [<VPIcon icon="iconfont icon-deno"/>Deno Deploy](https://deno.com/deploy) claims to be “edge” hosting with “massive global scale”.

> JavaScript applications on Deno Deploy run server-side logic geographically close to users, offering low latency and great performance.

Except that’s *a bit of a stretch* if we’re being honest.

Deno provide a [<VPIcon icon="iconfont icon-deno"/>list of regions](https://docs.deno.com/deploy/manual/regions/) in their documentation (take a peek if you want spoilers). Between ’23–2024 I gave Deno Deploy a fair shot but my [<VPIcon icon="fas fa-globe"/>personal experience](https://dbushell.com/notes/2024-09-03T05:44Z/) was negative. I left [feedback amongst others’ (<VPIcon icon="iconfont icon-github"/>`denoland/deploy_feedback`)](https://github.com/denoland/deploy_feedback/issues/505) and moved on.

Well, I did keep an eye on one thing…

---

## Serverless, anyone?

Back in [January 2024 (<VPIcon icon="iconfont icon-github"/>`denoland/docs`)](https://github.com/denoland/docs/commit/6d7d022ffa14595a23450bb7370743cd821b1958) a few people noted that Deno Deploy had dropped from 35 regions to **just twelve (12)** worldwide.

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>Elefunc</code>)

> For example, Seoul moved to Tokyo, response times went from 8ms to 42ms!

```component VPCard
{
  "title": "X에서 ❮λ❯ Elefunc 🌐 님",
  "desc": "⚠️ Deno Deploy dropped from 35 regions to just 12! The new list is not available in their documentation! This is a huge reduction in availability and quality! For example, Seoul moved to Tokyo, response times went from 8ms to 42ms! 3x smaller networ 5x slower responses",
  "link": "https://x.com/Elefunc/status/1750442433144647933/",
  "logo": "https://abs.twimg.com/favicons/twitter.3.ico",
  "background": "rgba(62,65,68,0.2)"
}
```

:::

I would have been happy seeing 42ms to begin with. Anyway, the original 35 wasn’t impressive but twelve is frankly pitiful if I’m being brutally honest, which I am (because it gets worse). I’ve never quite understood what “serverless” means but I think Deno are taking it too literally.

To provide an unfair comparison, [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://cloudflare.com/en-gb/network/) boast “335 cities in 125+ countries”. I don’t know what a respectable number is for Deno Deploy. Only that it’s between 12 and 335 but I suspect we’ll never find out.

[<VPIcon icon="iconfont icon-deno"/>Bunny](https://bunny.net/network/) advertise 119 Point of Presences (PoPs) in 77 countries. Bunny has [<VPIcon icon="iconfont icon-deno"/>edge scripting](https://bunny.net/blog/introducing-bunny-edge-scripting-a-better-way-to-build-and-deploy-applications-at-the-edge/) using the Deno runtime. Is that their own infrastructure, or Deno’s [<VPIcon icon="iconfont icon-deno"/>enterprise](https://deno.com/enterprise) offering? [<VPIcon icon="iconfont icon-deno"/>Netlify uses Deno](https://deno.com/blog/netlify-subhosting) for edge functions but their 70+ PoPs is restricted to [“High-Performance Edge”](https://netlify.com/platform/core/high-performance-edge/) (with a “custom” price tag). Now I’m curious, if (big if) Enterprise Deno is doing well, why scale back for us mortals?

By [December 2024 (<VPIcon icon="iconfont icon-github"/>`denoland/docs`)](https://github.com/denoland/docs/commit/26786eb3fd07d908d5bf650f0166b2d104158d31) Deno Deploy dropped from twelve to **seven (7)** regions. The platform lost Frankfurt, Mumbai, Sydney, Tel Aviv, and Texas.

All that remained was:

1. Tokyo
2. Singapore
3. London
4. Netherlands
5. Sao Paolo
6. North Virginia
7. California

At this point it’s worth noting that `deno.com` is suspiciously absent from the [<VPIcon icon="fas fa-globe"/>Wayback Machine](https://web.archive.org/web/20250000000000*/https://deno.com) — [<VPIcon icon="fas fa-globe"/>who does that?](https://wiki.archiveteam.org/index.php/List_of_websites_excluded_from_the_Wayback_Machine) No matter, GitHub has the receipts.

In [January 2025 (<VPIcon icon="iconfont icon-github"/>`denoland/docs`)](https://github.com/denoland/docs/commit/51a14702efa8380f65009168b26b94b3b5b4ef72) that number dropped to **six (6)**, losing Tokyo, and swapping Netherlands for Frankfurt. This leaves only Singapore to serve East Asia, and presumably Oceania. As to where Africa, the Middle East, West Asia, and India are served from is anyone’s guess, [<VPIcon icon="fas fa-globe"/>Frankfurt?](https://visitfrankfurt.travel/)

In [February 2025 (<VPIcon icon="iconfont icon-github"/>`denoland/docs`)](https://github.com/denoland/docs/commit/a071addcd73c9119c057ba2409f5b4f6133ba1d9) the wording was also changed:

```diff
- We will update the list as we add more regions.
+ This list will be maintained to reflect the latest summary of our regions.
```

Deno removed “add more” and replaced it with “reflect the latest”. 😬 That does not suggest Deno are confident in scaling back up any time soon. I feel like there should be a name for this [**type of commit**](/dbushell.com/never-have-never-will.md). Any suggestions?

This downward trajectory is obviously not a good look for Deno. Do phrases like “global scale” and “edge hosting” carry any legal weight? At what point does *creative marketing* become *false advertising* become straight up fraud?

---

## Elsewhere in Denoland

What of Deno Land Inc’s other products?

Deno’s [Fresh web framework (<VPIcon icon="iconfont icon-github"/>`denoland/fresh`)](https://github.com/denoland/fresh/releases) hasn’t had a release since October 2024. Update cadence and [activity (<VPIcon icon="iconfont icon-github"/>`denoland/fresh`)](https://github.com/denoland/fresh/graphs/commit-activity) on Fresh is slowing down.

[Deno KV (<VPIcon icon="iconfont icon-github"/>`denoland/denokv`)](https://github.com/denoland/denokv) looks like nothing short of **abandonware**. No official release since [v0.7 - Dec 21, 2023 (<VPIcon icon="iconfont icon-github"/>`denoland/denokv`)](https://github.com/denoland/denokv/releases/tag/0.7.0). Versions 8–10 are tagged in the repo but not released. [<VPIcon icon="iconfont icon-deno"/>Deno’s blog](https://deno.com/blog?tag=deno-kv) has had no KV-related announcements since 2023 either.

Don’t get me started on [**JSR**](/dbushell.com/jsr-and-deno-final-review.md), or as I’ve taken to calling it, [<VPIcon icon="fas fa-globe"/>“NPM at home”](https://knowyourmeme.com/memes/we-have-food-at-home). Packaging in Deno has [**been a mess**](/dbushell.com/the-deno-package-paradox.md) following the [<VPIcon icon="iconfont icon-deno"/>Deno rug pull](https://deno.com/blog/http-imports). Deno was original designed to fix Node’s magic module resolution and NPM dependency. That philosophy and any innovation in modern JavaScript has been long gone from the project.

And what of the Deno runtime itself? [Deno releases (<VPIcon icon="iconfont icon-github"/>`denoland/deno`)](https://github.com/denoland/deno/releases) are nothing but Node compatibility fixes. An endless chase. [<VPIcon icon="fas fa-globe"/>Deno sat on SQLite](https://dbushell.com/notes/2024-09-26T17:15Z/) for *years* until Node.js forced their hand. The [<VPIcon icon="iconfont icon-deno"/>Deno 2.2](https://deno.com/blog/v2.2) headline feature was… wait for it… 🎉 **telemetry!**

Yeah, Deno is done.

If you sense some ire here it’s because I went all-in on Deno. I was fooled. I was rugged pulled. (I was warned. I have [<VPIcon icon="fas fa-globe"/>Paul’s voice](https://paulrobertlloyd.com/) in my head like Obi-Wan.) I should have known better. That’s my mistake, and I own it.

Nah! To be honest I’m looking at [<VPIcon icon="iconfont icon-bun"/>Bun’s releases](https://bun.sh/blog) and finding myself intrigued. If only Bun could [fix this issue (<VPIcon icon="iconfont icon-github"/>`oven-sh/bun`)](https://github.com/oven-sh/bun/issues/18239). I’m a JavaScript fool and I’m ready for another VC-funded clownshow. LET’S GO BABY!

::: note Update on Bun

After publishing this I was made aware of [<VPIcon icon="fas fa-globe"/>Bun’s unsavoury connections](https://dbushell.com/notes/2025-09-10T12:08Z/).

:::

::: note P.S.

I have launched a [<VPIcon icon="fas fa-globe"/>third RSS feed](https://dbushell.com/merge/rss.xml) merging both my [<VPIcon icon="fas fa-globe"/>blog](https://dbushell.com/rss.xml) and [<VPIcon icon="fas fa-globe"/>notes](https://dbushell.com/notes/rss.xml) feeds. If that’s your kind of thing. Blog is infrequence long-form, notes are more regular, casual short-form. I need to squeeze it into the bar below somehow.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Deno’s Decline (6 Regions and Falling)",
  "desc": "The one where I nosey through rather telling git commits",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/denos-decline.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
