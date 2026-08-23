---
lang: en-US
title: "CSS3 Marquee"
description: "Article(s) > CSS3 Marquee"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS3 Marquee"
    - property: og:description
      content: "CSS3 Marquee"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css3-marquee.html
prev: /programming/css/articles/README.md
date: 2013-02-13
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: 
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

```component VPCard
{
  "title": "CSS3 Marquee",
  "desc": "Yesterday, I sent out this tweet: <font color=”#FFFF00”><marquee behavior=”alternate” bgcolor=”black” scrollamount=”10”>Sometimes I miss the olden days</marquee></font> — Bramus! (@bramus) February 12, 2013 Rather soon I got a reply by @vormplus: @bramus we should recreate blink and marquee with css3. Add some extra magic to the web 😉 Sparked by this reply I got started … … Continue reading ”CSS3 Marquee”",
  "link": "https://bram.us/2013/02/13/css3-marquee/",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

Yesterday, I sent out [this tweet (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://x.com/bramus/status/301348791381020672):

::: info *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>bramus</code>)

```xml
<font color="#FFFF00">
<marquee  behavior="alternate" bgcolor="black" scrollamount="10">
Sometimes I miss the olden days
</marquee>
</font>
```

<SiteInfo
  name="Bramus (@bramus) / X"
  desc="..."
  url="https://x.com/bramus/status/301348791381020672"
  logo="https://x.com/favicon.ico"
  preview="https://abs.twimg.com/rweb/ssr/default/v2/og/image.png"/>

:::

Rather soon I got [a reply by @vormplus](https://x.com/vormplus/status/301351340137906176):

::: *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>vormplus</code>)

> [@bramus](https://x.com/bramus) we should recreate blink and marquee with css3. Add some extra magic to the web 😉

<SiteInfo
  name="Jan Vantomme (@vormplus) / X"
  desc="..."
  url="https://x.com/vormplus/status/301351340137906176/"
  logo="https://x.com/favicon.ico"
  preview="https://abs.twimg.com/rweb/ssr/default/v2/og/image.png"/>

:::

Sparked by this reply I got started …

Recreating the `<blink>` tag in CSS3 isn’t that hard (it has been done before). Just use an animation and change the `opacity` and *voilà*:

<!-- TODO: jsfiddle -->
<!-- <CodePen
  user="jsfiddle.net/bramus/dXJ2G/embedded/result,html,css,js/"
  slug-hash="undefined"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/> -->

Recreating the `<marquee>` tag in CSS3 turned out to be quite a different beast though, as the first ventures using `position: left` and the like turned out to be a dead end. Eventually I got it working using the [<VPIcon icon="fa-brands fa-firefox"/>element CSS function as a value for the background property](https://developer.mozilla.org/en-US/docs/CSS/element). This, however, **only works in Firefox** (as it’s the only browser supporting it).

<!-- TODO: jsfiddle -->
<!-- <CodePen
  user="jsfiddle.net/bramus/Pm7j5/3/embedded/result,html,css,js/"
  slug-hash="undefined"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/> -->

If you’re wondering why `position: left;` didn’t work, there’s a little FAQ contained in the embed above. Essentially I’m making good use of the fact that the units used in the `background` property are based on the width of the background, and not the width of the containing element.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS3 Marquee",
  "desc": "Yesterday, I sent out this tweet: <font color=”#FFFF00”><marquee behavior=”alternate” bgcolor=”black” scrollamount=”10”>Sometimes I miss the olden days</marquee></font> — Bramus! (@bramus) February 12, 2013 Rather soon I got a reply by @vormplus: @bramus we should recreate blink and marquee with css3. Add some extra magic to the web 😉 Sparked by this reply I got started … … Continue reading ”CSS3 Marquee”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css3-marquee.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
