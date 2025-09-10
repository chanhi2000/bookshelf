---
lang: en-US
title: "When Do You Use CSS Columns?"
description: "Article(s) > When Do You Use CSS Columns?"
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
      content: "Article(s) > When Do You Use CSS Columns?"
    - property: og:description
      content: "When Do You Use CSS Columns?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/when-do-you-use-css-columns.html
prev: /programming/css/articles/README.md
date: 2022-08-18
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/inline-block-columns.png
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
  name="When Do You Use CSS Columns?"
  desc="That ain't rhetorical: I'm really interested in finding great use cases for CSS multi-column layouts."
  url="https://css-tricks.com/when-do-you-use-css-columns"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/inline-block-columns.png"/>

That ain’t rhetorical: I’m really interested in finding great use cases for CSS multi-column layouts.

The answer seems straightforward. Use columns when you want to split any content into columns, right? Here is generally the sort of example you’ll find in articles that show how CSS mutli-column layouts work, including our very own [Almanac (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/columns/):

<CodePen
  user="geoffgraham"
  slug-hash="yLKQNYP"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>
Right on. But is this an actual use case? *Mmmmmaybe.* If the text is relatively brief, then perhaps it’s a nice touch. That’s how I sold it to myself when redesigning my website a [<VPIcon icon="fas fa-globe"/>few years ago](https://geoffgraham.me/website-redesign-the-homepage/). It’s not that way today, but this is what it looked like then:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/08/mockup-03.jpg?resize=1440%2C1662&ssl=1)

But an entire long-form article split into columns? I love it in newspapers but am hesitant to scroll down a webpage to read one column, only to scroll back up to do it again.

I suppose we can use it to place two elements side-by-side, but flexbox is way more suited for that. Plus, a limitation prevents us from selecting the columns to size them individually. The columns have to be the same width.

One thing columns have going for them is that they are the only CSS layout method that *fragments* content. (That is, unless we’re counting [<VPIcon icon="fas fa-globe"/>CSS Regions](https://drafts.csswg.org/css-regions/)… what happened to those, anyway?!) So, if you wanna split a paragraph up into columns, it’s already possible without additional wrappers.

When else might you need to split a continuous block of content into columns? I remember needing to do that when I had a big ol’ unordered list of items. I like the way lists can make content easy to scan, but long lists can make one side of the page look super heavy. Let’s say, for example, that we were listing out all the post tags for CSS-Tricks in alphabetical groups. A multi-column layout works beautifully for that:

<CodePen
  user="geoffgraham"
  slug-hash="eYMQNKQ"
  title="CSS Multi-Column Tag List"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Go ahead and try resizing the viewport width. Three columns are defined but the number will change based on the amount of available space. Gotta love all that responsive goodness without the media query work!

I was working on a demo for the `:left` pseudo-class and reached for `columns` because it’s a great way to fragment things for printing demos. So, I guess there’s another use case. And while making a demo, I realized that a multi-column layout could be used to create a masonry grid of items, like an image gallery:

<CodePen
  user="geoffgraham"
  slug-hash="qBoQOWd"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

But what else? Are we limited to short paragraphs, long lists, and free-flowing grids?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When Do You Use CSS Columns?",
  "desc": "That ain't rhetorical: I'm really interested in finding great use cases for CSS multi-column layouts.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/when-do-you-use-css-columns.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
