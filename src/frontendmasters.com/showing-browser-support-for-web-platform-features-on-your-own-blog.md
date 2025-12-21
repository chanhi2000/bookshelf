---
lang: en-US
title: "Showing Browser Support for Web Platform Features on Your Own Blog"
description: "Article(s) > Showing Browser Support for Web Platform Features on Your Own Blog"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Showing Browser Support for Web Platform Features on Your Own Blog"
    - property: og:description
      content: "Showing Browser Support for Web Platform Features on Your Own Blog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/showing-browser-support-for-web-platform-features-on-your-own-blog.html
prev: /programming/css/articles/README.md
date: 2024-11-15
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4302
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
  name="Showing Browser Support for Web Platform Features on Your Own Blog"
  desc="Baseline now has a baseline-status web component widget that can be used anywhere to show of general browser support. This post gets into what else there is to think about there."
  url="https://frontendmasters.com/blog/showing-browser-support-for-web-platform-features-on-your-own-blog/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4302"/>

It’s a responsible thing to do to mention the browser support of web platform features when you write about them. I could probably do better than I do.

What I tend to do is go for what I feel like the biggest highlights, as well as stick to the Big Three: Chrome, Firefox, and Safari. Saying “this only works in Safari right now” is pretty important information to know, or, “this works in Chrome and Firefox and we’re waiting for Safari support.”

That may be a bit simplistic. I’m aware Edge exists, for the record, it just uses Chromium so it doesn’t feel particularly notable to call that out. Same story with browsers like Opera, Samsung Internet, and Arc: it’s just Chrome. If there really was a big important difference between Regular Chrome and Samsung Internet or whatever, I’d call it out, it just seems awfully rare. I typically just say “Chrome ‘n’ Friends”.

I mostly find Safari and Safari iOS not terribly different either, but if there was a serious difference it would definitely be worth calling out.

I also like to link to a source that is known to update. That typically means whatever the relevant MDN page is or caniuse, which is more and more MDN powered anyway.

I’ve been talking about scroll-driven animations a bunch, so linking to a highly relevant property like [<VPIcon icon="fas fa-globe"/>`animation-timeline` on caniuse](https://caniuse.com/mdn-css_properties_animation-timeline) I feel like is a pertinent thing to do, while also saying something like:

> At the time of this writing, scroll-driven animations are only a Chrome ‘n’ Friends feature, but I see feature flags in both Safari and Firefox so it’s coming!

That caniuse page pulls data directly from MDN anyway, so a link [<VPIcon icon="fa-brands fa-firefox"/>directly to the browser support for that property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline#browser_compatibility) is probably even better. That’s what hash links are for I suppose.

---

## What to Avoid

Screenshots of browser support tables. It’s just going to go out of date, probably faster than you think.

---

## Live Updating Embeds

Ire Aderinokun’s [<VPIcon icon="fas fa-globe"/>CanIUse Embed](https://caniuse.bitsofco.de/) takes this job on. It sucks the data in from caniuse (or MDN) then produces an iframe of that feature. Here’s what it produces for the `text-decoration-skip-ink` feature:

<!-- TODO: embed -->

That’s pretty neat, but…

### The CanIUse Embed is probably worth avoiding for now

While it’s still mostly functional, I think [<VPIcon icon="fas fa-globe"/>the page](https://caniuse.bitsofco.de) has fallen just enough out of date that it’s best to avoid using.

- The “Select Feature” dropdown doesn’t have much by way of new features. Nothing I was trying to use it for was there: scroll-driven animations, anchor positioning, etc.
- The data seems weirdly wrong. Try the CSS selector `:has()` — it lists no support in any browser. That `text-decoration-skip-ink` chart above? That’s also kinda wrong. [<VPIcon icon="fas fa-firefox"/>The MDN chart](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink#browser_compatibility) is much more nuanced, listing support by sub-feature, and accurate.
- It gives you invalid HTML, with nested `<p>` tags.
- It doesn’t link out to a useful canonical source for the specific data.

It’s a cool idea and it could be fixed up, but it’s pretty busted for right now.

---

## Using Baseline

Google has been working on [<VPIcon icon="iconfont icon-webdev"/>Baseline](https://web.dev/baseline) for years now. It’s a bit of a simplified version of understanding browser support. They’ve just recently [released a web component (<VPIcon icon="iconfont icon-github"/>`web-platform-dx/baseline-status`)](https://github.com/web-platform-dx/baseline-status?tab=readme-ov-file) for displaying the Baseline widget wherever.

Here is their example usage:

```html
<script src="https://cdn.jsdelivr.net/npm/baseline-status@1.0.4/baseline-status.min.js" type="module"></script>

<baseline-status featureId="anchor-positioning"></baseline-status>
```

It requires you know what the `featureId` is for whatever you want to embed, and it looks like the place to find that information is [this folder on GitHub (<VPIcon icon="iconfont icon-github"/>`web-platform-dx/web-features`)](https://github.com/web-platform-dx/web-features/tree/main/features).

So it’s useful, compact, and up-to-date, it’s also limited to what they’ve got data on at the moment, which ain’t everything. I couldn’t find the `animation-timeline` I’ve been using as an example, for instance.

---

## What I’d Like to See

Browser support is nuanced, but *just a little*. If you see a big ❌ next to a scroll-driven animations or view transitions feature, you could be put off it and become sour to the idea of learning about new features too soon. But those features are *easily* progressive enhancement territory. It doesn’t mean don’t use it in the same way, say, something like file browser APIs, which directly affect certain apps core experience.

When a feature isn’t supported in a browser, I feel it’s very pertinent information to say:

- Not supported, but it’s polyfillable!
- Not supported, but it’s basic progressive enhancement territory!

I’d love it if these browser support charts/widgets could be more clear about that.

---

## The “When”

::: info Rachel Andrew (<VPIcon icon="fas fa-globe"/><code>rachelandrew.co.uk</code>)

```component VPCard
{
  "title": "When is the right time to share our excitement about new web features? - Rachel Andrew",
  "desc": "When we share content about emerging web platform features, we have to be careful that we aren’t frustrating people with things they can’t use yet. However there is a place for talking about new things, and people who enjoy hearing about them. This post is about some of the ways I try to meet the needs of a browser DevRel team that need to share information about new things, with those of developers who need to know what actually works now. If you write or speak about the web, perhaps some of these ideas will help you too.",
  "link": "https://rachelandrew.co.uk/archives/2024/11/15/when-is-the-right-time-to-share-our-excitement-about-new-web-features/",
  "logo": "https://rachelandrew.co.uk/wp-content/uploads/2022/07/favicon1.png",
  "background": "rgba(0,0,0,0.2)"
}
```

> There’s a good number of developers who love to hear about new things landing on the platform. However there’s a much larger group of people who really just want to do their jobs, and who can’t invest time learning new things until they can use the new things. If we publish all of our material when things are experimental or only available in a single browser, all the noise happens at the wrong time. This leads to people missing the fact that things have become available everywhere. So, don’t forget to write about the Newly and Widely available things, you’ll be speaking to a much bigger audience, and providing people with something they can use in their production sites right away.

:::

I feel like that’s good advice for this very website. There is plenty to talk about on the web without *so much* focus on the very newest and most experimental.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Showing Browser Support for Web Platform Features on Your Own Blog",
  "desc": "Baseline now has a baseline-status web component widget that can be used anywhere to show of general browser support. This post gets into what else there is to think about there.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/showing-browser-support-for-web-platform-features-on-your-own-blog.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
