---
lang: en-US
title: "Web Monetization is Still Inching Along, But Still Too Difficult"
description: "Article(s) > Web Monetization is Still Inching Along, But Still Too Difficult"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Web Monetization is Still Inching Along, But Still Too Difficult"
    - property: og:description
      content: "Web Monetization is Still Inching Along, But Still Too Difficult"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/web-monetization-is-still-inching-along-but-still-too-difficult.html
prev: /programming/css/articles/README.md
date: 2025-11-24
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/7838
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Web Monetization is Still Inching Along, But Still Too Difficult"
  desc="Just a simple link tag in HTML can point to an online wallet to take payments, and a JavaScript API to react to them. But it's (still) early days."
  url="https://blog.master.dev/web-monetization-is-still-inching-along-but-still-too-difficult/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/7838"/>

I was a big fan of [<VPIcon icon="fas fa-globe"/>Coil](https://coil.com/) back when it existed. The surface story of Coil was it was a browser extension you could install and you’d hook it up to an “online wallet” (with currency in it). Then websites could put a `<meta>` (or `<link>`?) tag on their website that was essentially a public key to *their* online wallet.

You’d tell Coil how much money you were good for and it would sprinkle out your funds automatically to sites you visited that had this set up. It was a little “thanks for making a website that I visit, here’s a money” thing. You could blacklist sites and whatnot, yadda yadda. Not 100 miles different than [<VPIcon icon="iconfont icon-brave"/>Brave Rewards](https://brave.com/brave-rewards/).

But what I actually liked about Coil wasn’t this micropayments-for-visits thing, it was that it was tangible steps along the way to making this stuff into Web Standards and built-into web browsers proper. No extensions needed, it just works across all web browsers. *That*, is something I *really* wanted to see.

Why did I want to see that?

- **It would be incredibly easy to use.** I use Apple Pay and I imagine it as similar. I’d say Apple Pay about doubles the ease of checking out, if not more. And people use Google Pay and Microsoft Wallet and whatever else for the same reason. This would be for everyone instead of proprietarily locked to operating systems.
- **It would be safe to use.** No more typing your credit card numbers into fields and just hoping that the website receiving them does it securely during transfer and doesn’t do anything with storage.
- **It could be anonymous.** What if you subscribe to a website and *not* get email spam from them… because they don’t even have your email address at all. I really liked the idea of websites unlocking premium features in this way, be it removing advertising, “pro” accounts, high-quality downloads, whatever.
- **It could normalize non-credit-card payments.** Your online wallet could have money in it soley to a connection to your bank in your regular currency. It could be your credit card. It could be a cryptocurrency. I think it would be nice to not have the assumption always be a credit card.

Anyway. As much as I like those ideas, I hadn’t been following if it’s going anywhere or note. Coil passed the torch to [<VPIcon icon="fas fa-globe"/>Interleger](https://interledger.org/). And apparently Interleger is still going as I learned through Thomas Steiner’s post [<VPIcon icon="fas fa-globe"/>Using the Web Monetization API for fun and profit](https://blog.tomayac.com/2025/11/07/using-the-web-monetization-api-for-fun-and-profit/).

Now instead of a Coil browser extension, there is an [<VPIcon icon="fa-brands fa-chrome"/>Interleger browser extension](https://chromewebstore.google.com/detail/web-monetization/oiabcfomehhigdepbbclppomkhlknpii). The point is largely the same though. This browser looks at the page you are on to see if it has a monetization wallet it points to, like:

```html
<link rel="monetization" href="https://ilp.gatehub.net/150644339/usd" />
```

If it does, the wallet attached to that user’s browser extension doles out virtual bucks to the wallet attached to the website.

Thomas points out, which is the exciting part for me:

::: info

We actually have [<VPIcon icon="fa-brands fa-chrome"/>code in Chromium](https://groups.google.com/a/chromium.org/d/msgid/blink-dev/d91487a5-108c-46e7-accd-d44b734a0b34%40igalia.com) to make native Web Monetization happen, implemented by Igalia and funded by the Interledger Foundation. I hope they can share the experiment results soon.

:::

That’s actual progress right there.

I tried giving this a whirl myself, and it kinda went downhill from here. The browser extension supports a handful of wallets:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-7.41.46-AM.png?resize=1024%2C618&ssl=1)

1. Interledger
2. GateHub
3. Chimoney

Thomas did GateHub, which supports USD (I’m not a big crypto guy), so I went with that at first. Something went weird with the verification process, and I ended up having to re-submit a few times, but ultimately it went through.

Now I have a GateHub account, but two major issues.

**Problem #1** is that I have no idea what the Wallet Address is. GateHub gives you a number as your Wallet Address, which is not a valid Wallet Address for the browser extension:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2025/11/CleanShot-2025-11-24-at-12.21.17%402x.png?resize=1024%2C630&ssl=1)

**Problem #2** is there is no way to put USD into GateHub. Every single one of these options:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-12.23.09-PM.png?resize=1024%2C453&ssl=1)

Says:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-12.23.30-PM.png?resize=1024%2C495&ssl=1)

So it’s useless to me. It might work if you’re a crypto bro (or broette) and can transfer them in from elsewhere 🤷.

I tried the other Wallets that the browser extension offers.

Interleger doesn’t support the US:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-8.26.24-AM.png?resize=1024%2C818&ssl=1)

Apparently there [<VPIcon icon="fas fa-globe"/>isn’t a single wallet provider in the entire UK](https://mastodon.social/@Edent/115510907765350208), so, uhhh, jeez.

I looked at Chimoney, but it’s *only* a “native app” (e.g iOS) and that kind of non-support for the web doesn’t interest me.

So, for now, the whole thing is a flop. To be fair, [<VPIcon icon="fas fa-globe"/>Thomas got his all working](https://blog.tomayac.com/2025/11/07/using-the-web-monetization-api-for-fun-and-profit/), so it’s not impossible.

I feel like these bits need to be ultra-polished and easy to do *first*, then developers can dig into all this and figure out cool things to do with it, *then* the standards should get finished up. Then ideally it goes out to browsers and we all benefit, but it feels as far away as ever still.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Web Monetization is Still Inching Along, But Still Too Difficult",
  "desc": "Just a simple link tag in HTML can point to an online wallet to take payments, and a JavaScript API to react to them. But it's (still) early days.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/web-monetization-is-still-inching-along-but-still-too-difficult.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
