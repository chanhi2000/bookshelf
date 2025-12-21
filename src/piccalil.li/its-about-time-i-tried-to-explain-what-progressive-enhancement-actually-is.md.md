---
lang: en-US
title: "It’s about time I tried to explain what progressive enhancement actually is"
description: "Article(s) > It’s about time I tried to explain what progressive enhancement actually is"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > It’s about time I tried to explain what progressive enhancement actually is"
    - property: og:description
      content: "It’s about time I tried to explain what progressive enhancement actually is"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.html
prev: /programming/css/articles/README.md
date: 2024-07-03
isOriginal: false
author:
  - name: Andy Bell
    url : https://piccalil.li/author/andy-bell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/f490dacf861baa4e0a8f67bc21b2ea40c46ae1e71cd5e5a2729d105b0ff46bad/png?url=https://piccalil.li/og/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/&width=1024&height=526&retina=true
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
  name="It’s about time I tried to explain what progressive enhancement actually is"
  desc="Progressive enhancement hasn’t caught on nearly as much as it should. It’s likely related to folks not being able to envision it working in their real world contexts. This post attempts to alleviate that and reignite the conversation."
  url="https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/f490dacf861baa4e0a8f67bc21b2ea40c46ae1e71cd5e5a2729d105b0ff46bad/png?url=https://piccalil.li/og/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/&width=1024&height=526&retina=true"/>

I’m a long-time proponent of progressive enhancement to the point where readers are almost certainly bored, but I am like I am because **it’s important**. I’ve been saying the following for years:

> **We build for everyone**. Not just for ourselves or our peer groups.

Do you want to build resilient front-ends? Do you want your front-end to work for everyone, regardless of browser and device? Do you want your website to work on poor connections? Do you want your website to work globally?

Have you answered yes to either or all of the above? What you need is **progressive enhancement**.

---

## What is progressive enhancement?

Let’s go for a real simple definition here.

Progressive enhancement is a design and development principle where we build in layers which automatically turn themselves on based on the browser’s capabilities. Enhancement layers are treated as off by default, resulting in a solid baseline experience that is designed to work for everyone.

We do this with a declarative approach which is already baked in to how the browser deals with HTML and CSS. For JavaScript — which is imperative — we only use it as an experience enhancer, rather than a requirement, which means only loading when the core elements of the page — HTML and CSS — are already providing a great user experience.

The idea of progressive enhancement is that **everyone gets the perfect experience for them**, rather than a pre-determined “perfect” experience from a design and development team. It’s a perfect experience for users because everything works, which is far from the truth — in reality — with so-called “graceful degradation”.

Graceful degradation is the opposite to progressive enhancement because a pre-determined “perfect experience” is authored then broken down with support testing strategies instead. The problem with that approach is **everything can and will go wrong in the browser**, so support testing strategies will unlikely never be reached in **a lot of cases**, which results in a broken, unresponsive user interface.

It’s why at the root of progressive enhancement is solid, organised and semantic HTML. If the absolute worst should happen with everything else on your webpage (it will, trust me), then at *least* the user gets a functional, understandable web page.

Above everything, it is better to presume the worst when building a website because when someone actually experiences the worst, they still get a good experience.

---

## It’s not just an anti-JavaScript thing, it’s a mental model rooted in iteration

Building with progressive enhancement principles isn’t anti-JavaScript, but rather, it *rightly* places JavaScript as a nice to have, instead of being a required technology. JavaScript is a fantastic tool to provide rich interactivity to a page, but it is — by its imperative nature — *fragile*. It’s better to enhance existing correctly working functionality than bet against that functionality working in the real world by making an imperative programming language that’s notorious for behaving poorly on the web the barrier to it.

The same goes for new CSS features. We can operate with the latest and greatest features without fear because if a browser doesn’t understand them, it’s all good because we’re building up from a **minimum viable experience**. Luckily CSS is a declarative programming language, so we can determine what our default and enhanced experiences are easily in the same rule a lot of the time.

Let’s say you want to use the new(ish) `cap` unit. [**Allow the cascade to solve the problem for you**](/piccalil.li/a-primer-on-the-cascade-and-specificity.md) by setting the `cap` value *after* a sensible default:

```css
.my-element {
  height: 1.5em;
  height: 1cap;
}
```

When it comes to more complex CSS, break the design down into an acceptable, functional default then build up to the enhanced version — always testing in various browser and device configurations to make sure the minimum viable experience is working as expected with each iteration.

---

## What is a minimum viable experience?

Essentially, provide the most possible value to a user with the least amount of technical capability. It’s all about the [<VPIcon icon="fas fa-globe"/>rule of least power](https://adactio.com/journal/14327).

I think the best way to describe that is [**link up to a post I wrote last year**](/piccalil.li/how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product.md) and pick out this part:

> A good example of a minimum viable experience is an email client that is just a HTML form that when submitted, sends an email to the specified address. You could then enhance this minimum viable experience if JavaScript is available by adding client-side validation, auto-complete and all of the other handy tricks our modern email clients give us. The important thing is that when JavaScript fails, we can still provide the basic capability that the user needs.

---

## Almost no one will get your “ideal” experience, especially not all the time

I’m writing this article on a train to London, tethering on my phone. Currently my connection speed is just shy of 2mbps and constantly cuts out. What happens if I load a heavy website, built to be the “perfect” experience? I get a blank white screen and a console full of errors.

That’s just me right now, but **life happens** and people are never in the perfect state you might imagine them to be during production. [<VPIcon icon="fas fa-globe"/>Here’s an example of how finding information on a power cut was next to impossible](https://andy-bell.co.uk/this-is-why-performance-matters/) because the *extremely heavy* user interface couldn’t load on a dodgy mobile connection. Always remember that [<VPIcon icon="fa-brands fa-wikipedia-w"/>the quality of internet connections worldwide varies, massively](https://en.wikipedia.org/wiki/List_of_sovereign_states_by_Internet_connection_speeds#Mobile_connection) .

Instead of building to make you and the stakeholders happy at the point of your project timeline: make everyone happy by building with progressive enhancement instead because more money — by proxy of more successful user sessions — sure makes stakeholders happy.

---

## “Designers won’t work like this”

Have you communicated that with them, or are you making an assumption?

Honestly, in the [<VPIcon icon="fas fa-globe"/>*years* that I have helped organisations with CSS and design system consultancy](https://piccalil.li/author/andy-bell), if you paid me £1 for every time I heard something like this, I would have retired comfortably by now.

What I *did* find in these engagements was a culture of hand-off, rather than a culture of collaboration. My recommendation was almost never to embrace a certain framework to “fix problems”, but instead to build better production processes between designers and developers that are rooted in communication, respect and empathy. The tech choices simply are not important until that is sorted.

I’m going to write more about this stuff in the coming months because I think it’s really important, but in short, you can simplify *a lot* by not chucking designs over the fence and expecting them to be built verbatim. Work instead in cycles and prototypes to test ideas before the main production build.

The final deliverable of a web-based design is **on the web**, just like the final deliverable of a print design **is print**. Instead of handing off, designers and developers need to work in collaboration with each other in design implementation with a culture of **flexibility**.

Is something not working out as expected? Iterate in the browser as a team with prototypes to get a better output that works for everyone. Even if this means going back to design tools initially, make no absolute decisions about pictures of websites, but instead, make them about actual websites.

Looping back to progressive enhancement, all of the above will assist in that. Working in the actual deliverable’s medium — the web — in cycles/iterations/sprints, with progressive enhancement at the root will — I promise — result in smaller codebases, simpler UIs and happier users!

---

## Lastly, it’s not a quick fix

Sorry! Progressive enhancement is not a command you can run in terminal or a package you can install. It’s a complete shift in mental model. It’s pretty damn painful if you’re coming from the traditional [<VPIcon icon="fas fa-globe"/>collective hallucination of pixel perfection](https://resilientwebdesign.com/) too, I’m afraid.

It is worth pursuing though, I promise. Over the 15+ years of my career, [<VPIcon icon="fas fa-globe"/>working with some of the largest organisations in the world](https://piccalil.li/author/andy-bell), **nothing** has come close to being as effective as progressive enhancement on **all fronts**.

Think of it like a design system. You know that’s gonna be long-winded process and expensive to set up to be a major part of your organisation’s workflow. The up front pain is worth it though because in the long term, design systems that are well maintained and documented are so often a huge cost saver.

The same goes for progressive enhancement. It’s *hard* to embrace, but let me tell ya, picking up a 12+ month old project that Just Works™ rather than spend ages updating packages — or in the worst case, declare the project “dead” — is a huge momentum boost. Hours of bug fixing and quirks are often saved too, as a nice bonus.

The speed and cheapness of ongoing feature additions and maintenance of a progressively enhanced project is unmatched. The other option is compounding technical debt and the risk that one day, that very specific, fragile mentality of pixel perfection is what ends up costing a fortune in the long run.

---

## Now you know, it’s time to make it happen

And we’re here to help! I’ve been prattling on about progressive enhancement for years, but admittedly, I’m not providing tangible strategies that can be used in the real world. That’s hard for me to do without knowing what **your real world constraints are**, so please tell me.

Let us know and we’ll produce content that actually helps you! I don’t think progressive enhancement needs renaming either. I think instead, content tuned to people’s real world contexts is what makes it resonate more universally. The industry feels like it’s shifting in the right direction (if you ignore the obsession with AI), so a meaningful push towards progressive enhancement seems like a good idea to me, anyway.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "It’s about time I tried to explain what progressive enhancement actually is",
  "desc": "Progressive enhancement hasn’t caught on nearly as much as it should. It’s likely related to folks not being able to envision it working in their real world contexts. This post attempts to alleviate that and reignite the conversation.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
