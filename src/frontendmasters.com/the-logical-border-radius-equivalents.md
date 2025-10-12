---
lang: en-US
title: "The Logical Border Radius Equivalents"
description: "Article(s) > The Logical Border Radius Equivalents"
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
      content: "Article(s) > The Logical Border Radius Equivalents"
    - property: og:description
      content: "The Logical Border Radius Equivalents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-logical-border-radius-equivalents.html
prev: /programming/css/articles/README.md
date: 2024-12-02
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4650
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
  name="The Logical Border Radius Equivalents"
  desc="I find this hard to remember and it’s come up for me a few times lately so I’m writing it down gosh darn it! The individual corner border-radius values, like border-top-right-radius (which is hard enough to remember on its own) have logical property versions, meaning that should the flow of the document change, the border […]"
  url="https://frontendmasters.com/blog/the-logical-border-radius-equivalents/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4650"/>

I find this hard to remember and it’s come up for me a few times lately so I’m writing it down gosh darn it!

The individual corner `border-radius` values, like `border-top-right-radius` (which is hard enough to remember on its own) have logical property versions, meaning that should the flow of the document change, the border radius values should come along for the ride.

- `border-top-right-radius` = `border-start-end-radius`
- `border-top-left-radius` = `border-start-start-radius`
- `border-bottom-right-radius` = `border-end-end-radius`
- `border-bottom-left-radius` = `border-end-start-radius`

(By “equivalent” I mean the these turn out the same in left-to-right, top-to-bottom languages like English, Spanish, French, etc. In other directional situations, these are not equivalent, which is kinda the point.)

The syntax is:

```css
border-<BLOCK_DIRECTION>-<INLINE_DIRECTION>-radius
```

You’d choose the logical versions if you were using border-radius on elements where the flow was relevant. Here’s an example of a [“tag” shape (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/azozXNW/c42db23b0d5f93105fe3769d69065606) on some inline text, and you’d potentially *want* the direction to flip.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/Screenshot-2024-11-29-at-3.59.05%E2%80%AFPM.png?resize=886%2C552&ssl=1)

If border-radius is being applied entirely as an aesthetic thing and it makes more sense to apply physical directionality rather than text-flow directionality, which is entirely common, feel free to use the classic properties.

I feel these newer logical properties for border-radius took an understandability hit, as while “border-top-right-radius” is hard to remember because of trying to remember the right order of the words, at least once you’ve got it, it’s clear where that radius is going to apply. Whereas with “border-start-end-radius” you just have to know (or guess and test) which direction “start” applies to and which direction “end” applies to.

Something like `border-inline-start-block-end-radius` would solve that, but I do understand that is an awfully long property name and might suffer from confusion. If someone accidentally mentally grouped it like “border-inline” “start-block” “end-radius”, that’s, uh, a meaningless jumble.

There is an interesting gotcha Michelle Barker found in [<VPIcon icon="fas fa-globe"/>Logical Border Radius](https://css-irl.info/logical-border-radius/) with vertical writing modes, so if that comes up for you read what she’s got to say there.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Logical Border Radius Equivalents",
  "desc": "I find this hard to remember and it’s come up for me a few times lately so I’m writing it down gosh darn it! The individual corner border-radius values, like border-top-right-radius (which is hard enough to remember on its own) have logical property versions, meaning that should the flow of the document change, the border […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-logical-border-radius-equivalents.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
