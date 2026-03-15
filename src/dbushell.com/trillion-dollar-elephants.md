---
lang: en-GB
title: "Trillion Dollar Elephants"
description: "Article(s) > Trillion Dollar Elephants"
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
      content: "Article(s) > Trillion Dollar Elephants"
    - property: og:description
      content: "Trillion Dollar Elephants"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/trillion-dollar-elephants.html
prev: /programming/css/articles/README.md
date: 2025-09-08
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-09-08-trillion-dollar-elephants.png
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
  name="Trillion Dollar Elephants"
  desc="The one where I say what needs to be said"
  url="https://dbushell.com/2025/09/08/trillion-dollar-elephants/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-09-08-trillion-dollar-elephants.png"/>

I was hesitant to post this because the WHATWG & friends war party is strong on the defence! I’d ask for parley but this is going to get spicy so I won’t feign friendship. I want my web career to survive. I want the web to be better.

I want to address **the trillion dollar elephants in the room.**

![*Big Browser* apologists when you mention money (dramatised)](https://dbushell.com/images/blog/2025/oliphaunt-lotr.avif)

Quick heads-up: I do believe most individuals involved are good people trying to do a good job. I’m just venting frustration (and torturing a metaphor).

---

## Interop Time!

Browser teams at ~~trillion dollar companies~~ [<VPIcon icon="fa-brands fa-safari"/>Apple](https://webkit.org/blog/17320/submit-your-ideas-for-interop-2026/), [Google](https://web.dev/blog/interop-2026-proposals), and [<VPIcon icon="fa-brands fa-edge"/>Microsoft](https://blogs.windows.com/msedgedev/2025/09/04/calling-for-interop-2026-proposals/), are asking for [Interop 2026 proposals (<VPIcon icon="iconfont icon-github"/>`web-platform-tests/interop`)](https://github.com/web-platform-tests/interop). Along with other web platform contributors like [<VPIcon icon="fas fa-globe"/>Igalia](https://igalia.com/2025/09/04/Call-for-Proposals-Interop-2026.html) and Mozilla — well some Mozilla employees; I can’t find an official blog.

I’ve [<VPIcon icon="fas fa-globe"/>noted before](https://dbushell.com/notes/2025-04-15T10:32Z/) I’m skeptical of Interop but I decided to play their game this year. I submitted a proposal for [XSLT 3.0 (<VPIcon icon="iconfont icon-github"/>`web-platform-tests/interop`)](https://github.com/web-platform-tests/interop/issues/1012). Seems like a good candidate? [<VPIcon icon="iconfont icon-w3c"/>Well specced](https://w3.org/TR/xslt-30/) with what looks like a [test suite (<VPIcon icon="iconfont icon-github"/>`w3c/xslt30-test`)](https://github.com/w3c/xslt30-test/). I expect my proposal to be ignored or disqualified. Regardless, this blog post isn’t about XSLT drama. That’s just a symptom. I just didn’t want the lack of proposal to be more ammunition for the inevitable firing squad.

I’m not as cynical as some regarding Interop. I believe there is genuine attempt to engage with web developers here. I just wish they’d finish what they start before marching on.

With Interop comes [**Baseline**](/dbushell.com/baseless.md)[^1]

[^1]: A summary of web platform support across browsers based on spurious self-reporting and lack of real-world testing. Invented by *Big Browser*.

::: details Sources on 'Baseline"

```component VPCard
{
  "title": "Baseless",
  "desc": "The one where I provide my time and service for free",
  "link": "/dbushell.com/baseless.md",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```

<SiteInfo
  name="Baseline  |  web.dev"
  desc="Web Platform Baseline brings clarity to information about browser support for web platform features. Baseline gives you clear information about which web platform features are ready to use in your projects today. When reading an article, or choosing a library for your project, if the features used are all part of Baseline, you can trust the level of browser compatibility."
  url="https://web.dev/baseline/"
  logo="https://gstatic.com/devrel-devsite/prod/vb733f83c4d98b98a393545fb4caff59cc746f444c6f32fab64ef45038fb6ff9b/web/images/favicon.png"
  preview="https://web.dev/static/images/social-wide.jpg"/>

<SiteInfo
  name="Baseline (compatibility) - Glossary | MDN"
  desc="Baseline identifies the availability of web platform features across popular browsers, including APIs, CSS properties, and JavaScript syntax. Baseline describes web features as being either widely available or newly available. Features that do not meet the Baseline criteria are said to have limited availability."
  url="https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Baseline (<VPIcon icon="iconfont icon-webdev"/><code>web.dev</code>)

> Baseline gives you **clear** information about which web platform features are ready to use in your projects today. When reading an article, or choosing a library for your project, if the features used are all part of Baseline, you can **trust** the level of browser compatibility.

<SiteInfo
  name="Baseline  |  web.dev"
  desc="Web Platform Baseline brings clarity to information about browser support for web platform features. Baseline gives you clear information about which web platform features are ready to use in your projects today. When reading an article, or choosing a library for your project, if the features used are all part of Baseline, you can trust the level of browser compatibility."
  url="https://web.dev/baseline/"
  logo="https://gstatic.com/devrel-devsite/prod/vb733f83c4d98b98a393545fb4caff59cc746f444c6f32fab64ef45038fb6ff9b/web/images/favicon.png"
  preview="https://web.dev/static/images/social-wide.jpg"/>

:::

That quote would be accurate… if “clear” and “trust” were replaced by “confusing” and “doubt”. My opinions on Baseline are summed up in one image I [**shitposted**](/dbushell.com/baseless.md) back in June.

![Not my proudest work.](https://dbushell.com/images/blog/2025/baseless-workmarks.avif)

That’s obviously a joke, but I build *a lot* of websites and the reality is not as rosy as what Devrel PR wants you to believe. I wonder though, how can this process improve? Before you say: *“please report bugs”* let me get to my serious point.

---

## About Those Elephants

Let’s put the [<VPIcon icon="fas fa-globe"/>white guy surveys](https://devographics.com/) down and ask the real questions.

Browser engine teams are custodians of the web platform and open web standards. That’s a big responsibility. Most are employed by **trillion dollar companies**. Those companies consider the web and its users a product and themselves the owner. It’s an awkward juxtaposition.

Are we just going to keep ignoring it?

They ask for bug reports with no compensation. The last [<VPIcon icon="fa-brands fa-safari"/>bug I reported](https://bugs.webkit.org/show_bug.cgi?id=282592) cost me over $1000† to isolate, reproduce, and write-up. Why should I work for free? Sure, I get to improve the web, but why shouldn’t I profit when those companies do?

†approximate USD equivalent for my time (and my rate is cheap [<VPIcon icon="fas fa-globe"/>for a white guy](https://2024.stateofhtml.com/en-US/demographics/#yearly_salary))

Any mention of “trillion dollar company” is immediately shot down; browser teams have a small budget. Not their fault. But if *Google et al.* refuse to invest appropriate funds into an open web, why should I be silent? That’s kind of a major problem. Who is in a better position to fix that? A loudmouth blogger, or employees who work there?

Don’t get upset when I point out the trillion dollar elephant over your shoulder. Don’t act like I’m the problem. You’re employed by the problem. And if you’re not, why on earth would you defend this status quo?

Just to be absolutely clear, am I saying browser vendors should pay developers who are solicited for their professional expertise? Yes I am. If their work is accepted under an agreed criteria. How is such a system structured? Not my problem.

---

## TL;DR

Let’s stop pretending we’re on equal footing, in this together for the betterment of a free and open web. Whilst there are trillion dollar elephants in the room these are my terms:

- If you want professional consultation: **pay me**
- If you want professional bug reports: **pay me**
- If you want professional testing: **pay me**

Sorry, is that such a radical idea?

I think every professional web developer should be saying the same thing.

If you want me to change my tune: change the situation. I’d prefer if you echoed my call for more funding. Maybe there are internal efforts? Fantastic! Telling me I’m wrong and that I should allow my time and expertise to be exploited is another option, I guess.

---

### Postscript

P.S. “trillion dollar” applies to [<VPIcon icon="fa-brands fa-wikipedia-w"/>market cap](https://en.wikipedia.org/wiki/Market_capitalization) not cash on hand. That means *share price × number of shares*. It’s fiction. The stock market is a casino. Like any [<VPIcon icon="fa-brands fa-wikipedia-w"/>shitcoin](https://en.wikipedia.org/wiki/Meme_coin) if too many shares are sold the price plummets. [<VPIcon icon="fas fa-globe"/>Apple](https://companiesmarketcap.com/apple/cash-on-hand/), [<VPIcon icon="fas fa-globe"/>Google](https://companiesmarketcap.com/alphabet-google/cash-on-hand/), and [<VPIcon icon="fas fa-globe"/>Microsoft](https://companiesmarketcap.com/microsoft/cash-on-hand/) each have between $50–100 billion in the bank. Mozilla is not publicly traded but their [<VPIcon icon="fa-brands fa-firefox"/>2023 financial position](https://assets.mozilla.net/annualreport/2024/mozilla-fdn-2023-fs-final-short-1209.pdf) lists $263 million in *“cash and cash equivalents”* (**edit:** [**$1.4 billion in reserves**](/dbushell.com/mozilla-slopaganda.md)).

P.P.S. my terms also apply to VC-funded companies that open source a few products and exploit “the community” for free labour. I’ve fallen for that trick.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Trillion Dollar Elephants",
  "desc": "The one where I say what needs to be said",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/trillion-dollar-elephants.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
