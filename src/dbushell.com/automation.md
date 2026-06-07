---
lang: en-GB
title: "Automation"
description: "Article(s) > Automation"
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
      content: "Article(s) > Automation"
    - property: og:description
      content: "Automation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/automation.html
prev: /programming/js-node/articles/README.md
date: 2013-03-13
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
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
  name="Automation"
  desc="Automation"
  url="https://dbushell.com/2013/03/12/automation/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **13 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

I used to believe hand-crafting every line of code was a necessity. [**I u-turned on that opinion**](/dbushell.com/im-bored-with-code.md) and adopted **CSS preprocessors** with much gusto last year.

It wasn’t so much the syntactical learning curve that initially put me off — they’re familiar if you’ve done any kind of programming — it was the perceived “added complexity” they would bring. For what, one more barrier to entry? The value I’ve since found:

- Code maintainability with includes.
- Understandable media query breakpoints across modular patterns.
- Relief from the repetition of vendor prefixes and fallbacks.

CSS preprocessors have become integral to my workflow. I don’t go overboard. It’s very important to refrain from doing things differently for the sake of it. Yet I now find it painful to work without them.

---

## A new process

I cringe when I think of the amount of PSDs I used to produce. When I first started working agency-side it was expected that the client would see a minimum of three design mock-ups to choose from. I did well whittling that process down to a single, evolving design.

These days there are no final design mock-ups. No sign-off stage. Design and build happens at the same time. I do very little “designing in the browser” — writing code doesn’t exactly allow creativity to flow in that sense — but I get there fast.

This change in methodology has highlighted many more bottlenecks in my design and front-end development. CSS preprocessors were just the tipping point. Today I’m using [<VPIcon icon="iconfont icon-grunt"/>Grunt](http://gruntjs.com/) which performs the following tasks for me:

- CSS preprocessing with [<VPIcon icon="fa-brands fa-sass"/>Sass](http://sass-lang.com/) (via [<VPIcon icon="fas fa-globe"/>Compass](http://compass-style.org/))
- JavaScript linting and minifying with [<VPIcon icon="iconfont icon-github"/>`mishoo/UglifyJS`](https://github.com/mishoo/UglifyJS)
- SVG optimisation/minifying with [<VPIcon icon="iconfont icon-github"/>`svg/svgo`](https://github.com/svg/svgo)
- SVG rasterisation[^1]

[^1]: to create PNGs from SVGs I use a [<VPIcon icon="fas fa-globe"/>PhantomJS](http://phantomjs.org/) script (heavily based on [<VPIcon icon="iconfont icon-github"/>`filamentgroup/grunticon`](https://github.com/filamentgroup/grunticon))

I’m even working on my own Node.js tasks to build HTML includes for faster prototyping. I really like [<VPIcon icon="fas fa-globe"/>Hammer for Mac](http://hammerformac.com/) but its all-or-nothing simplicity sits awkwardly with my additional requirements. [<VPIcon icon="fas fa-globe"/>Mixture](http://mixture.io/) is another tool I look forward to testing.

---

## Dependancy

For projects I’m working on alone these tools have sped up my workflow massively but I worry I’m becoming too dependant.

[<VPIcon icon="fas fa-globe"/>Scott Kellum](http://scottkellum.com/blog/specializing-yourself-into-a-corner.html) has an internal conflict I know all too well:

::: info From *Scott Kellum* (<VPIcon icon="fas fa-globe"/><code>scottkellum.com</code>)

> I’m not saying these tools aren’t valuable because they absolutely are. They are just introducing fragmentation into our community and I am noticing how much of a part of it I have become. I want to share my code with *everyone* who writes CSS, not a subset of that group.

<SiteInfo
  name="Scott Kellum"
  desc="Scott Kellum is an internationally-recognized leader in design for the web, with a specialized focus on dynamic typesetting in digital space."
  url="https://scottkellum.com/blog/specializing-yourself-into-a-corner"
  logo="https://scottkellum.com/favicon.ico"
  preview="https://scottkellum.com/preview.png"/>

:::

Sharing and working with others; occasions where I’ll have to down tools and do things the old fashioned way? That may be painful, but when I look at how complex browsers are becoming the price of automation is one I’m happy to pay.

And what of fragmentation? That is inevitable in my opinion. When I [**wrote**](/smashingmagazine.com/off-canvas-navigation-for-responsive-website.md) and [**spoke**](/dbushell.com/a-responsive-day-out.md) about responsive navigation recently I shared a lot of practical techniques and concepts. The final code; that was less important. Implementation is becoming too nuanced for copy & paste examples. When it comes to sharing I’m starting to find more value in the automated process rather than the final output.

Automation, for me, is here to stay.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Automation",
  "desc": "Automation",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/automation.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
