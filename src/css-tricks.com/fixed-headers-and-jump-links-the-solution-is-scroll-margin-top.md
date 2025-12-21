---
lang: en-US
title: "Fixed Headers and Jump Links? The Solution is scroll-margin-top"
description: "Article(s) > Fixed Headers and Jump Links? The Solution is scroll-margin-top"
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
      content: "Article(s) > Fixed Headers and Jump Links? The Solution is scroll-margin-top"
    - property: og:description
      content: "Fixed Headers and Jump Links? The Solution is scroll-margin-top"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top.html
prev: /programming/css/articles/README.md
date: 2020-02-21
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/02/sticky-header.gif
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
  name="Fixed Headers and Jump Links? The Solution is scroll-margin-top"
  desc="The problem: you click a jump link like Jump which links to something like Header."
  url="https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/02/sticky-header.gif"/>

The problem: you click a jump link like `<a href="#header-3">Jump</a>` which links to something like `<h3 id="header-3">Header</h3>`. That’s totally fine, until you have a `position: fixed;` header at the top of the page obscuring the header you’re trying to link to!

Fixed headers have a nasty habit of hiding the element you’re trying to link to.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/02/hidden-header.png?resize=482%2C177&ssl=1)

There used to be [**all kinds of wild hacks**](/css-tricks.com/hash-tag-links-padding.md) to get around this problem. In fact, in the design of CSS-Tricks as I write, I was like, “*Screw it, I’ll just have a big generous `padding-top` on my in-article headers because I don’t mind that look anyway.”*

But there is actually a really straightforward way of handling this in CSS now.

```css
h3 {
  scroll-margin-top: 5rem; /* whatever is a nice number that gets you past the header */
}
```

[<VPIcon icon="iconfont icon-css-tricks"/>We have an Almanac article on it](http://css-tricks.com/almanac/properties/s/scroll-margin/), which includes browser support, which is essentially everywhere. It’s often talked about in conjunction with [**scroll snapping**](/css-tricks.com/practical-css-scroll-snapping.md), but I find this use case even more practical.

Here’s a simple demo:

<CodePen
  user="chriscoyier"
  slug-hash="GRJpopp"
  title="scroll-margin-top and fixed headers"
  :default-tab="['css','result']"
  :theme="dark"/>

In a related vein, that weird (but cool) “text fragments” link that Chrome shipped takes you to [the middle of the page (<VPIcon icon="fa-brands fa-x-twitter"/>`chriscoyier`)](https://twitter.com/chriscoyier/status/1225199469446090752) instead, which I think is nice.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fixed Headers and Jump Links? The Solution is scroll-margin-top",
  "desc": "The problem: you click a jump link like Jump which links to something like Header.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
