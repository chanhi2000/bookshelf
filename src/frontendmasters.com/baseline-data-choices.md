---
lang: en-US
title: "Baseline Data Choices"
description: "Article(s) > Baseline Data Choices"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Baseline Data Choices"
    - property: og:description
      content: "Baseline Data Choices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/baseline-data-choices.html
prev: /programming/js-node/articles/README.md
date: 2024-12-26
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4878
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
  name="Baseline Data Choices"
  desc="Why can't we see if a feature is polyfillable or able to be progressively enhanced in the baseline data? There are reasons."
  url="https://frontendmasters.com/blog/baseline-data-choices/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4878"/>

Here’s the (live updating) Baseline widget for view transisions:

<baseline-status featureid="view-transitions"></baseline-status>
<!-- TODO: add baseline-status -->

One of my historical criticisms is that a view of browser support this simplistic might push people away from using a feature when they need not be.

As I write, Safari only just released both forms of support and Firefox remains without support for the View Transition API.

But who cares? Using these features has little negative impact on non-supporting browsers (assuming you do the very little it takes to not have JavaScript throw on an un-supported function call). The View Transition API is quite progressive enhancement friendly.

I also understand that one widget can’t be the entire answer for educating the world on web platform features and when it is appropriate to use them. Entire blog posts can struggle with that.

So I appreciate [<FontIcon icon="fas fa-globe"/>Rachel Andrews chiming in on this](https://12daysofweb.dev/2024/how-to-use-baseline-data/) specifically:

::: info Rachel Andrews (<FontIcon icon="fas fa-globe"/><code>12daysofweb.dev</code>)

<SiteInfo
  name="How to Use Baseline Data | 12 Days of Web"
  desc="Learn about using Baseline with fallback strategies and how Baseline can help you decide about polyfills."
  url="https://12daysofweb.dev/2024/how-to-use-baseline-data/"
  logo="https://12daysofweb.dev/img/favicon.png"
  preview="https://12daysofweb.dev/img/og/how-to-use-baseline-data.png"/>

> The problem with progressive enhancement is that the appetite different people and teams have for it varies. I’ve been telling people for well over twenty years that[<FontIcon icon="fas fa-globe"/>websites do not need to look the same in all browsers](https://web.archive.org/web/20081205022337/http://www.edgeofmyseat.com/blog/it-doesnt-have-to-look-the-same). There are many developers (or their bosses or clients) who very much disagree, even as we approach 2025. This means that any decision around what makes or does not make for good progressive enhancement is entirely subjective.

:::

I disagree with their disagreement! lolz. Progressive enhancement doesn’t hurt anyone, it lets you use features when ready to do so, so being against that as a concept doesn’t work for me.

I think I would like to see something like **“🌟 Progressive Enhancement friendly!”** in the widget somehow.

The story is similar with polyfills. The Baseline widget doesn’t ever say *“it’s not supported, but there is a polyfill you could use!”*, which is something that might be very important information to have when deciding to use a feature. Again Rachel has insight:

> Initially, we considered a path that included polyfills. We thought it might be possible to have a less conservative version of Baseline that also included things with a solid polyfill. What became quickly apparent, however, was that very few features can be completely polyfilled so that you can just drop in the polyfill and use the feature as specified.

In this case, I think I agree with the decision not to include any information about polyfills. In my experience there are precious few truly good polyfills, they *do* have a potential negative user impact, and they are a moving target.

I super appreciate the inside look into how decisions like these are come to!

What we need now is some UI somewhere that helps us figure out what the heck value to use as the `featureId=""` in the [`<baseline-status>` (<FontIcon icon="iconfont icon-github"/>`web-platform-dx/baseline-status`)](https://github.com/web-platform-dx/baseline-status) component.

<SiteInfo
  name="web-platform-dx/baseline-status"
  desc="A Web Component widget displaying Baseline status of a web feature"
  url="https://github.com/web-platform-dx/baseline-status/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b965419e2a1fcc4764de5d492008550cd113ee8514f885d6f92c8ccb52cc7961/web-platform-dx/baseline-status"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Baseline Data Choices",
  "desc": "Why can't we see if a feature is polyfillable or able to be progressively enhanced in the baseline data? There are reasons.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/baseline-data-choices.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
