---
lang: en-US
title: "Containers & Context"
description: "Article(s) > Containers & Context"
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
      content: "Article(s) > Containers & Context"
    - property: og:description
      content: "Containers & Context"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/containers-context.html
prev: /articles/README.md
date: 2025-01-03
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4904
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Containers & Context"
  desc="If you've applied `container` to an element, know that, for the next little while, that makes a new "
  url="https://frontendmasters.com/blog/containers-context/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4904"/>

I ran into what I thought was a `z-index` bug in Safari (or, Safari had it right and Chrome and Firefox had it wrong). I made [a reduced test case here (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/KwPmYrJ).

<CodePen
  user="chriscoyier"
  slug-hash="KwPmYrJ"
  title="z-index bug on iOS?"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/CleanShot-2024-12-22-at-07.57.33%402x-1024x837-1.png?resize=1024%2C837&ssl=1)

But it’s not a bug.

::: info

[<FontIcon icon="fas fa-globe"/>Stephanie Eckles let me know](https://front-end.social/@5t3ph/113697426219955556) about a [change to the specs (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10544):

> `RESOLVED: container-type does not force layout containment, but does force an independent formatting context`

:::

This apparently means declaring a container *doesn’t* force a new formatting context anymore and thus my negative `z-index` would “work” as I wanted it to.

Chrome and Firefox have made the change and it out in the stable version of those browsers. [<FontIcon icon="fas fa-globe"/>Safari’s update](https://mastodon.social/@smfr/113698830197560450) will roll out… at some point.

That’s an interesting situation isn’t it?! It looks and feels like a bug, but really it’s just a situation of a spec change and varied levels of browser support for that change. It’s not a matter of support-or-no-support of a feature, it’s a side effect. As far as I know, not practically testable. Just something that has to be lived with until all browsers implement it the same.

It’s a decently beefy change (affecting important stuff like positioning), and almost certainly for the better (because you can still force a formatting context if you want, it’s just nice to have the option). Since I became aware of this, I helped someone else having the same problem. In both cases, we totally aborted what we were trying to do as there didn’t seem to be any workaround that felt great. Probably a metaphor in there somewhere.

Despite improved tools over the years (i.e. `@supports` and `CSS.supports()`) sometimes figuring out browser support is still just hard. Guaranteed I would have been tripped up by Stoyan Stefanov’s issue with [<FontIcon icon="fas fa-globe"/>@supports and @font-face troubles](https://phpied.com/supports-and-font-face-troubles/) as well. Good thing we blog, eh?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containers & Context",
  "desc": "If you've applied `container` to an element, know that, for the next little while, that makes a new ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/containers-context.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
