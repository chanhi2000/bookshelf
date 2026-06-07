---
lang: en-GB
title: "A Focused Redesign"
description: "Article(s) > A Focused Redesign"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - dbushell.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Focused Redesign"
    - property: og:description
      content: "A Focused Redesign"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/blog-redesign.html
prev: /programming/css/articles/README.md
date: 2025-03-21
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-03-21-blog-redesign.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Focused Redesign"
  desc="The one where I redesign my blog (kind of)"
  url="https://dbushell.com/2025/03/21/blog-redesign/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-03-21-blog-redesign.png"/>

It’s time to lock-in! You might have noticed a change with my blog posts ([**take a look**](/dbushell.com/blog-redesign.md) if you’re in an RSS reader). If you’re on a phone there isn’t much of a difference to see.

I love my design so this is more of a re*align* than a re*design*. I know what you’re thinking, a single centred column of text? Inspired! But I really do think it’s the best format to read long-form content. My asymmetrical layout remains for other pages, including my [<VPIcon icon="fas fa-globe"/>notes blog](https://dbushell.com/notes/).

Following my [**2020 redesign**](/dbushell.com/i-have-only-gone-and-redesigned-my-website-again.md) I made a [<VPIcon icon="fas fa-globe"/>time machine](https://legacy.dbushell.com/) (see [**behind the scenes**](/dbushell.com/step-into-my-time-machine.md)) to visit my homepage throughout eight design iterations. My latest design has lasted a while and this refresh gives it new life.

---

## Zoomers and readability

My new layout is friendlier to zoomers — I mean literally people who **zoom-in**. I zoom-in regularly. As I’ve gotten older my eyes have gotten knackered. I like big boring undistracted text. This change minimises layout shift with zoom. Last year I also made an experimental change mixing [**`rem` and `px` units**](/dbushell.com/rem-or-px.md) to improve base font size adaptability.

Although I like reading big text I’m not a fan of *huge* text by default. I think it’s better to use sensible on-par font sizes and just avoid messing up the built-in accessibility inherent to the web.

I also like **legible fonts** and [<VPIcon icon="fas fa-globe"/>Atkinson Hyperlegible](https://brailleinstitute.org/freefont/) is the *bee knees*. I switched from [<VPIcon icon="iconfont icon-bunny"/>Raleway](https://fonts.bunny.net/family/raleway), which I originally chose from a limited set of early [<VPIcon icon="fa-brands fa-firefox"/>variable web fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide). I’ve increasingly struggled with Raleway’s roundness. Coupled with its large x-height I find letters look too similar. I changed to [<VPIcon icon="fas fa-globe"/>0xProto](https://dbushell.com/notes/2025-03-14T10:21Z/) for code snippets too. With these two font changes my eyes feel ten years younger!

---

## Dark mode

Speaking of eyes, mine don’t appreciate staring into a lightbulb. So much so that I almost regret making a career out of sitting in front of one. I’ve heard studies say *actually* dark mode is bad for me. All I know is *my* eyes get less strain from dark mode.

Contradictory, I prefer the design aesthetics of light themes. They feel friendlier, warmer. I find that dark website designs are dominated by the dark background. Whereas light ones give focus to the foreground allowing more expression. That said, in [current year] brands with a digital presence — all of them? — should have a colour scheme for both. Dark mode is an unnecessarily divisive subject. Don’t [<VPIcon icon="fas fa-globe"/>force dark mode](https://iamvishnu.com/posts/please-dont-force-dark-mode), or light mode. Provide both and everyone is happy

But what should the **default mode** be?

My website has always been light with a hidden dark mode. (I’ve made the setting more prominent now; see top-left.) Although I’ve provided the option for “system setting” — this allows for automatic light/dark switching — **I default to *light*** because my “brand” was primarily designed with the light colour scheme in mind. That might be controversial! Should websites honour the system preference as default, or give it as an option?

I would default to it but:

1. I’m not entirely happy with my dark colour scheme yet
2. I’m not happy with [<VPIcon icon="fas fa-globe"/>CSS light-dark()](https://dbushell.com/notes/2024-11-14T07:34Z/)

I expect in the next year (or two, or more) CSS theming options will be easier and I’ll default to the system preference. I’ll do it sooner if I get chastised on social media!

At the risk of sounding ungrateful I’m increasingly finding new CSS syntax and APIs to be rather unintuitive and unwieldy. It doesn’t help that rendering bugs and the [**Chrome-onlyness**](/dbushell.com/the-patient-programmer.md#all-joking-aside) of new standards leaves me wondering whether I did something wrong, or it’s just broken. I’m not all that savvy to the politics of [<VPIcon icon="fas fa-globe"/>Interop](https://wpt.fyi/interop-2025), but please, can browser vendors **fix the stuff we have**, before kowtowing to the stuff Google wants? Styling a `<table>` is still a nightmare.

I keep ending blog posts with a moan. So on a positive note, I’ll link to [<VPIcon icon="fas fa-globe"/>Open Up With Brad Frost: Episode 1](https://geoffgraham.me/open-up-with-brad-frost-episode-1/) — great stuff!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Focused Redesign",
  "desc": "The one where I redesign my blog (kind of)",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/blog-redesign.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
