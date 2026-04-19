---
lang: en-GB
title: "Big Design, Bold Ideas"
description: "Article(s) > Big Design, Bold Ideas"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Big Design, Bold Ideas"
    - property: og:description
      content: "Big Design, Bold Ideas"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/big-design-and-bold-ideas.html
prev: /programming/css/articles/README.md
date: 2026-02-10
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-02-09-big-design-and-bold-ideas.png
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
  name="Big Design, Bold Ideas"
  desc="The one where I’ve only gone and redesigned my website"
  url="https://dbushell.com/2026/02/09/big-design-and-bold-ideas/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-02-09-big-design-and-bold-ideas.png"/>

I’ve only gone and done it again! I redesigned my website. This is the **eleventh** major version. I dare say it’s my best attempt yet. There are similarities to what came before and plenty of fresh CSS paint to modernise the style.

You can visit my [<VPIcon icon="fas fa-globe"/>time machine](https://legacy.dbushell.com/) to see the ten previous designs that have graced my homepage. Almost two decades of work. What a journey!

---

## Why **change?**

I’ve been comfortable and coasting for years. This year feels different. I’ve made a career building for the open web. That is now under attack. Both my career, and the web. A rising sea of slop is drowning out all common sense. I’m seeing peers struggle to find work, others succumb to the chatbot psychosis. There is no good reason for such drastic change. Yet change is being forced by the AI industrial complex on its relentless path of destruction.

I’m not shy about [**my stance on AI**](/dbushell.com/ai-policy-and-the-inevitable.md). No thanks! My new homepage doubles down. I won’t be forced to use AI but I can’t ignore it. Can’t ignore the harm.

Also I just felt like a new look was due.

---

## Design process

Last time I mocked up a [**concept in Adobe XD**](/dbushell.com/i-have-only-gone-and-redesigned-my-website-again.md#design-process). Adobe in now unfashionable and Figma, although swank, has that *Silicon Valley stench*. [<VPIcon icon="iconfont icon-penpot"/>Penpot](https://penpot.app/) is where the cool kids paint pretty pictures of websites. I’m somewhat of an artist myself so I gave Penpot a go.

My current brand [**began in 2016**](/dbushell.com/a-bit-of-a-new-look.md) and [**evolved in 2018**](/dbushell.com/i-have-only-gone-and-redesigned-my-website-again.md). I loved the old design but the rigid layout didn’t afford much room to play with content.

![Homepage penpot mock-ups.](https://dbushell.com/images/blog/2026/2026-design-penpot.avif)

I spent a day pushing pixels and was quite chuffed with the results. I designed my bandit game in Penpot too (below). That gave me the confidence to move into real code.

I’m continuing with [<VPIcon icon="fas fa-globe"/>Atkinson Hyperlegible Next](https://brailleinstitute.org/freefont/) for body copy. I now license [<VPIcon icon="fas fa-globe"/>Ahkio](https://youworkforthem.com/font/T6019/ahkio) for headings. I used *Komika Title* before but the all-caps was unwieldy. I’m too lazy to dig through backups to find my logotype source. If you know what font *“David”* is please tell me!

I worked with [<VPIcon icon="fas fa-globe"/>Axia Create](https://axiacreate.co.uk/) on brand strategy. On that front, we’ll have more exciting news to share later in the year! For now what I realised is that my audience here is technical. The days of small business owners seeking me are long gone. That market is served by Squarespace or Wix. It’s senior tech leads who are entrusted to find and recruit me, and peers within the industry who recommend me. This understanding gave me focus.

---

## Bandit game

To illustrate why AI is lame I made an [<VPIcon icon="fas fa-globe"/>interactive mini-game!](https://dbushell.com/#bandit) The slot machine metaphor should be self-explanatory. I figured a bit of comedy would drive home my [<VPIcon icon="fas fa-globe"/>AI policy](https://dbushell.com/ai/). In the current economy if you don’t have a [<VPIcon icon="fa-brands fa-wikipedia-w"/>sparkle emoji](https://en.wikipedia.org/wiki/Sparkles_emoji) is it even a website?

![This screenshot is just a tribute. [<VPIcon icon="fas fa-globe"/>Play the real game.](https://dbushell.com/#bandit)](https://dbushell.com/images/blog/2026/2026-design-bandit.avif)

The game is built with HTML canvas, web components, and synchronised events I over-complicated to ensure a unique set of prizes. The secret to high performance motion blur is to cheat with pre-rendered PNGs. In hindsight I could have cheated more with a video.

I commissioned [<VPIcon icon="fas fa-globe"/>Declan Chidlow](https://vale.rocks/) to create a bespoke icon set.

![bandit game icon set design](https://dbushell.com/images/blog/2026/2026-design-icons.avif)

Declan delivered! The icons look so much better than the random assortment of placeholders I found. I’m glad I got a proper job done. I have neither the time nor skill for icons.

---

## Other stuff

Declan read my mind because I received a [<VPIcon icon="fas fa-globe"/>88×31 web badge](https://vale.rocks/portfolio/88x31-buttons-badges) bonus gift. I had mocked up a few badges myself in Penpot. Scroll down to see them in the footer. Declan’s badge is first and my attempts follow. I haven’t quite nailed the pixel look yet.

My new menu is built using `<dialog>` with [<VPIcon icon="fas fa-globe"/>invoker commands](https://open-ui.org/components/invokers.explainer/)[^1] and [view transitions](https://htmx.org/essays/view-transitions/)[^2] for a JavaScript-free experience. Modern web standards are so cool when the work together! I do have a tiny JS event listener to polyfill old browsers.

The pixellated footer gradient is done with a WebGL shader. I had [<VPIcon icon="fas fa-globe"/>big plans](https://theycantalk.com/post/710363232083361793/plans) but after several hours and too many Stack Overflow tabs, I moved on to more important things. This may turn into something later but I doubt I’ll progress trying to learn WebGL.

Past features like my [**Wasm static search**](/dbushell.com/search-with-zig-wasm-worker.md) and [**speech synthesis**](/dbushell.com/text-to-speech-synthesis.md) remain on the relevant blog pages. I suspect I’ll be finding random one-off features I forgot to restyle.

[^1]: Declarative HTML attributes that add interactive behaviour without JavaScript. That’s cheating!
[^2]: Yet another web standard API for animations and transitions. They’ve become exceeding efficient at it.

::: info Sources on 'Invoker Commands'

```component VPCard
{
  "title": "Invoker Commands (Explainer) | Open UI",
  "desc": "Adding commandfor and command attributes to <button> and elements would allow authors to assign behaviour to buttons in a more accessible and declarative way, while reducing bugs and simplifying the amount of JavaScript pages are required to ship for interactivity. Buttons with command will - when clicked, touched, or enacted via keypress - dispatch a CommandEvent on the element referenced by commandfor, with some default behaviours.",
  "link": "https://open-ui.org/components/invokers.explainer/",
  "logo": "https://open-ui.org/images/favicon-32x32.png",
  "background": "rgba(0,122,61,0.2)"
}
```

<SiteInfo
  name="Invoker Commands API - Web APIs | MDN"
  desc="The Invoker Commands API provides a way to declaratively assign behaviors to buttons, allowing control of interactive elements when the button is enacted (clicked or invoked via a keypress, such as the spacebar or return key)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Sources on 'View Transition'

```component VPCard
{
  "title": "</> htmx ~ Examples ~ View Transitions",
  "desc": "Carson Gross explores the evolution of web applications and the significance of view transitions in improving user experience. He discusses the limitations of traditional web design, where full-page refreshes create an unpleasant experience, and how modern technologies like CSS transitions and the View Transition API aim to enhance aesthetic smoothness. Carson explains how htmx leverages the View Transition API to bring seamless transitions to hypermedia-driven applications, offering an alternative to single-page applications (SPAs) and highlighting its potential once widely available in HTML.",
  "link": "https://htmx.org/essays/view-transitions//",
  "logo": "https://htmx.org/favicon.svg",
  "background": "rgba(91,150,213,0.2)"
}
```

<SiteInfo
  name="View Transition API - Web APIs | MDN"
  desc="The View Transition API provides a mechanism for easily creating animated transitions between different website views. This includes animating between DOM states in a single-page app (SPA), and animating the navigation between documents in a multi-page app (MPA)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

---

## European alternatives

My homepage ends with another strong message.

> The internet is dominated by US-based big tech. Before backing powers across the Atlantic, consider UK and EU alternatives. The web begins at home.

I remain open to working with clients and collaborators worldwide. I use some *‘big tech’* but I’m making an effort to push for European alternatives. US-based tech does not automatically mean “bad” but the absolute worst is certainly thriving there! Yeah I’m English, far from the smartest kind of European, but I try my best.

---

## What’s **next?**

I’ve been fortunate to find work despite the AI threat. I’m optimistic and I refuse to back down from calling out slop for what it is! I strongly believe others still care about a job well done. I very much doubt the touted “10x productivity” is resulting in 10x profits. The way I see it, I’m cheaper, better, and more ethical than subsidised slop.

Let me know on the socials if you love or hate my new design

::: note

P.S. I published this Sunday because [<VPIcon icon="fa-brands fa-wikipedia-w"/>Heisenbugs](https://en.wikipedia.org/wiki/Heisenbug) only appear in production.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Big Design, Bold Ideas",
  "desc": "The one where I’ve only gone and redesigned my website",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/big-design-and-bold-ideas.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
