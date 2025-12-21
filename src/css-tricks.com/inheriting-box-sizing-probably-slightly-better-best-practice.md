---
lang: en-US
title: "Inheriting box-sizing Probably Slightly Better Best-Practice"
description: "Article(s) > Inheriting box-sizing Probably Slightly Better Best-Practice"
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
      content: "Article(s) > Inheriting box-sizing Probably Slightly Better Best-Practice"
    - property: og:description
      content: "Inheriting box-sizing Probably Slightly Better Best-Practice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice.html
prev: /programming/css/articles/README.md
date: 2014-09-23
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Inheriting box-sizing Probably Slightly Better Best-Practice"
  desc="I'm a big fan of resetting box-sizing to border-box, so much that we have a special day of the year around here. But there is a little adjustment to setting"
  url="https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

I’m a big fan of resetting [<VPIcon icon="iconfont icon-css-tricks"/>box-sizing](https://css-tricks.com/almanac/properties/b/box-sizing/) to border-box, so much that we have [**a special day of the year**](/css-tricks.com/international-box-sizing-awareness-day.md) around here. But there is a little adjustment to setting it that seems like a pretty good idea.

Here’s the adjusted version:

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

Credit on the inheritence idea to Jon Neal [<VPIcon icon="fas fa-globe"/>here](http://blog.teamtreehouse.com/box-sizing-secret-simple-css-layouts#comment-50223), who says:

::: Jon Neal (<VPIcon icon="fas fa-globe"/><code>blog.teamtreehouse.com</code>)

> This will give you the same result, and make it easier to change the box-sizing in plugins or other components that leverage other behavior.

<SiteInfo
  name="Box-Sizing: The Secret to Simple CSS Layouts"
  desc="Box-sizing is a CSS property that makes CSS layouts work intuitively. Width, padding, and border can be confusing, but box-sizing makes it easy."
  url="https://blog.teamtreehouse.com/box-sizing-secret-simple-css-layouts/"
  logo="https://blog.teamtreehouse.com/wp-content/uploads/2018/08/favicon.png"
  preview="https://blog.teamtreehouse.com/wp-content/uploads/2014/06/windows-and-flowers.jpg"/>

:::

Explaining further, let’s say you have a component that was just designed to work with the default `content-box` `box-sizing`. You just wanted to use it and not mess with it.

```css
.component {
  /* designed to work in default box-sizing */
  /* in your page, you could reset it to normal */
  box-sizing: content-box;
}
```

The trouble is, this doesn’t actually reset the entire component. Perhaps there is a `<header>` inside that component that expects to be in a `content-box` world. If this selector is in your CSS, in “the old way” of doing a `box-sizing` reset…

```css
/* This selector is in most "old way" box-sizing resets */
* {
  box-sizing: border-box;
}
```

Then that header isn’t `content-box` as you might expect, it’s `border-box`. Like:

```html
<div class="component"> <!-- I'm content-box -->
  <header> <!-- I'm border-box still -->
  </header>
</div>
```

In order to make that reset easier and more intuitive, you can use the inheriting snippet up at the top there, and the inheriting will be preserved.

It works:

<CodePen
  user="chriscoyier"
  slug-hash="NWXWPz"
  title="Easy to Reset Box-Sizing"
  :default-tab="['css','result']"
  :theme="dark"/>

This isn’t a majorly huge thing. You might already be using the `box-sizing` reset the “old way” and never have gotten bit by it. That’s the case for me. But as long as we’re promoting a “best practice” style snippet, we might as well hone it to be the best it can be.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Inheriting box-sizing Probably Slightly Better Best-Practice",
  "desc": "I'm a big fan of resetting box-sizing to border-box, so much that we have a special day of the year around here. But there is a little adjustment to setting",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
