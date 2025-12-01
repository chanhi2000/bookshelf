---
lang: en-US
title: "Say Hello to CSS Container Queries"
description: "Article(s) > Say Hello to CSS Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Say Hello to CSS Container Queries"
    - property: og:description
      content: "Say Hello to CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/say-hello-to-css-container-queries.html
prev: /programming/css/articles/README.md
date: 2021-04-20
isOriginal: false
author:
  - name: Robin Rendle
    url : https://css-tricks.com/author/robinrendle/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/container-queries.png
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
  name="Say Hello to CSS Container Queries"
  desc="Container queries are finally here! Now available behind a flag in the latest version of Chrome Canary, you can go ahead and experiment to your heart’s"
  url="https://css-tricks.com/say-hello-to-css-container-queries"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/container-queries.png"/>

Container queries are finally here! Now available behind a flag in the latest version of [<VPIcon icon="fa-brands fa-chrome"/>Chrome Canary](https://google.com/intl/en/chrome/canary/), you can go ahead and experiment to your heart’s content. Oh, and if you’re not familiar with container queries then check out this post by Ethan Marcotte about [<VPIcon icon="fas fa-globe"/>why they’re so dang important](https://ethanmarcotte.com/wrote/on-container-queries/).

Ahmad Shadeed described his excitement and [<VPIcon icon="fas fa-globe"/>showcased a ton of great use cases](https://ishadeed.com/article/say-hello-to-css-container-queries/) for problems that container queries solves:

> I haven’t been more excited for a CSS feature like I’m now in the past six years I spent as a front-end developer. The prototype of container queries is now available behind a flag in Chrome Canary. Thanks to efforts from smart people like [<VPIcon icon="fas fa-globe"/>Miriam Suzanne](https://css.oddbird.net/rwd/query/contain/) and other folks.
> 
> I remember seeing a lot of jokes about the support for CSS container queries, but they are finally there.

Once you’ve activated the feature in `chrome://flags` you can then begin to write code like this:

```css
.parent {
  container: layout inline-size;
}

@container (min-width: 400px) {
  .child {
    display: flex;
    flex-wrap: wrap;
  }
}
```

First off, you need to tell the parent component that a child needs to change size (that’s the `container: layout inline-size` part). Next, you can use a new kind of query called `@container` which will detect when the parent of an element changes width.

Andy Bell also made [**a bunch of great examples**](/piccalil.li/container-queries-are-actually-coming.md) when he argued that we often need elements to change based on the size of the parent element more so than the width of the browser window, especially when it comes to typography:

> Most importantly with container queries, we can set typography *contextually*! This for me is **the most needed feature** in design system implementations and why I constantly wish we had container queries. We can respond with media queries and set font sizes etc that way, but when you have no idea where an element will end up, this isn’t an ideal approach. Now we have container queries, we can make type adjustments that actually make sense a lot easier than before.

This post reminds me that Miriam Suzanne made an excellent [<VPIcon icon="fas fa-globe"/>proposal](https://css.oddbird.net/rwd/query/explainer/) where you can read more about how container queries were designed and all the various snaffus and problems that came up along the way. It’s so neat to see a document like this that shows CSS being improved in public.

Personally, I believe this is the biggest improvement to CSS since Grid. It opens up all sorts of elegant solutions to problems we work around on a daily basis. I hit a snag just the other day when I wanted to set the type of an element in a sidebar depending on the width of the element wrapping it. And gah — it just wasn’t possible without introducing a bunch of weird hacks!

Container queries aren’t just some far-flung pipe dream now. They’re here to stay.

<SiteInfo
  name="Say Hello To CSS Container Queries"
  desc="Let's learn about how CSS container queries work with lots of examples and use-cases."
  url="https://ishadeed.com/article/say-hello-to-css-container-queries"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/cq/twitter-card-1.jpg"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Say Hello to CSS Container Queries",
  "desc": "Container queries are finally here! Now available behind a flag in the latest version of Chrome Canary, you can go ahead and experiment to your heart’s",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/say-hello-to-css-container-queries.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
