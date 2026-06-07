---
lang: en-GB
title: "Bunny CDN - Migrating from Cloudflare"
description: "Article(s) > Bunny CDN - Migrating from Cloudflare"
icon: iconfont icon-bunny
category:
  - DevOps
  - Bunny
  - Cloudflare
  - Article(s)
tag:
  - blog
  - dbushell.com
  - devops
  - bunny
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Bunny CDN - Migrating from Cloudflare"
    - property: og:description
      content: "Bunny CDN - Migrating from Cloudflare"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/bunny-cdn-edge-storage.html
prev: /devops/bunny/articles/README.md
date: 2025-04-27
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-04-27-bunny-cdn-edge-storage.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Bunny > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/bunny/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="Bunny CDN - Migrating from Cloudflare"
  desc="The one where I give a European Alternatives a trial hop"
  url="https://dbushell.com/2025/04/27/bunny-cdn-edge-storage/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-04-27-bunny-cdn-edge-storage.png"/>

[<VPIcon icon="iconfont icon-bunny"/>Bunny](https://bunny.net/) provide CDN services, edge storage, DNS, JavaScript; you know, the usual suspects. More importantly, Bunny are what’s become known as a [<VPIcon icon="fas fa-globe"/>European alternative](https://european-alternatives.eu/). Something that non-US web folk are starting to pay more attention to.

I moved from [**Netlify to Cloudflare**](/dbushell.com/adios-netlify-hola-cloudflare-pages.md) back in 2023 and have become increasingly more reliant on the giant. I figured it was time to hop ship before I get locked-in forever.

This weekend I moved from Cloudflare to Bunny.

---

## Bunny as a Static Host

I was up far too late Friday night and far too early Saturday morning going down the rabbit hole. As is evident from my inbox [<VPIcon icon="fas fa-globe"/>and notes](https://dbushell.com/notes/2025-04-26T05:30Z/):

![I’m not afraid to ask for help](https://dbushell.com/images/blog/2025/bunny-support.avif)

Bunny doesn’t have a neatly packaged [<VPIcno icon="fa-brands fa-cloudflare"/>Cloudflare Pages](https://pages.cloudflare.com/) like service but you can combine their [<VPIcon icon="iconfont icon-bunny"/>CDN](https://bunny.net/cdn/) and [<VPIcon icon="iconfont icon-bunny"/>Edge Storage](https://bunny.net/storage/) to achieve the same deal. Bunny CDN acts as a proxy and cache for an “origin” server. That origin can be either a 3rd-party web server or one of Bunny’s storage zones. Upload to a storage zone, set that as the origin for a CDN “pull zone”, and then link a domain name. *Ta-da;* static hosting on the edge.

Bunny has an optional [<VPIcon icon="iconfont icon-bunny"/>Shield](https://bunny.net/shield/) that presumably does similar magic to Cloudflare’s firewall. Shrug. I enabled it.

Whilst migrating over I jotted down any problems I ran into.

---

## Points of Pain

Bunny does not allow two-factor auth to be configured prior to confirming your email address. This would be fine except it throws an “API Error” without explanation.

The front-end dashboard is quite keen to surface “API Error” and refuses to elaborate half the time. Opening the console reveals Posthog errors, so that’s working as expected.

![This will never work](https://dbushell.com/images/blog/2025/bunny-try-it.avif)

[<VPIcon icon="iconfont icon-bunny"/>API documentation](https://docs.bunny.net/reference/get_-storagezonename-path-) has a nice demo feature. You can enter an API key and test right in the browser or copy a `curl` command. Except the `storage.bunnycdn.com` endpoint is fixed so all tests result in `401 Unauthorized`. In my case I needed the `uk.storage` regional subdomain. This is explained elsewhere, but having a “Try It” that is guaranteed to fail for most users is poor design. Hence the 5am support tickets.

API limits are not clearly documented. Numbers I found did not match my experience. `429 Too Many Requests` was my friend until I dialled it in (lower than I’d like). I gave up asking support. I haven’t entirely ruled out my jury-rigged deploy script being to blame. Browser upload or FTP is available if you’re not into APIs.

Bunny requires you to manually add a DNS `CNAME` record to link a custom domain to your CDN zone. If you already have that domain in Bunny DNS without a record it should do this automatically, in my opinion (or at least offer to).

Bunny has “Magic Containers”. If you can figure out from their [<VPIcon icon="iconfont icon-bunny"/>marketing word soup](https://bunny.net/magic-containers/) what that means, you’re smarter than me!

---

## Sparks of Joy

The Bunny dashboard is easy to navigate. Cloudflare has gotten so bloated I just click around blindly until the right menu appears.

Bunny support tickets are answered immediately. At least they were this weekend. I’ve found the guides and documentation to be decent overall despite the issues above.

![Do the PWA world a favour and enable CORS on your RSS feed 😉](https://dbushell.com/images/blog/2025/bunny-edge-rule.avif)

Bunny has “Edge Rules”. I’m using those to set headers, handle redirects, etc. They’re easy to create but fiddly to organise if have more than a handful (I have 14 and counting). I always found Cloudflare Rules to be a nightmare so I’ll take any improvement. Bunny doesn’t care bout trailing slashes in URLs `/page`, `/page/`, `/page/index.html` all show the same page. I found [<VPIcon icon="fas fa-globe"/>Gabriel Garrido’s guide](https://garrido.io/notes/bunny-edge-rules-for-html-canonical-urls/) to create a redirect rule.

All in all, Bunny has been pleasant to work with so far. I flipped the DNS switch and migrated from Cloudflare sooner than expected.

---

## Trial Run

I’ll be using Bunny beyond the 15 day free trial because I want to see how actual costs tally up. I will be monitoring performance closely too. I reckon it’ll be hard to beat Cloudflare’s network. I’ll accept a small hit so long as it doesn’t plummet. Who knows? There might even be an improvement.

If Bunny does prove worthy I have more work to do. Bunny lets you deploy JavaScript `Request` → `Response` workers. They’re [<VPIcon icon="fas fa-globe"/>using Deno](https://bunny.net/edge-scripting/) which is neat I guess. Hopefully their own architecture, [<VPIcon icon="fas fa-globe"/>Deno Deploy is slow](https://dbushell.com/notes/2024-09-03T05:44Z/). My contact form is still currently handled by a Cloudflare Worker to send [**PGP encrypted emails**](/dbushell.com/pgp-email-encryption-aws-cloudflare-worker.md). I’ll migrate that next.

My Cloudflare Pages site is still building in the background so I can flip the switch back if something goes wrong. I plan not to.

🐰

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bunny CDN - Migrating from Cloudflare",
  "desc": "The one where I give a European Alternatives a trial hop",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/bunny-cdn-edge-storage.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
