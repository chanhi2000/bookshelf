---
lang: en-US
title: "Absolute Positioning Inside Relative Positioning"
description: "Article(s) > Absolute Positioning Inside Relative Positioning"
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
      content: "Article(s) > Absolute Positioning Inside Relative Positioning"
    - property: og:description
      content: "Absolute Positioning Inside Relative Positioning"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/absolute-positioning-inside-relative-positioning.html
prev: /programming/css/articles/README.md
date: 2020-07-24
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-24-at-11.46.02-AM.png
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
  name="Absolute Positioning Inside Relative Positioning"
  desc="A page element with relative positioning gives you the control to absolutely position children elements inside of it."
  url="https://css-tricks.com/absolute-positioning-inside-relative-positioning"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-24-at-11.46.02-AM.png"/>

A page element with **relative positioning** gives you the control to **absolutely position** children elements inside of it.

To some, this is obvious. To others, this may be one of those [<VPIcon icon="iconfont icon-css-tricks"/>CSS “Ah-ha!” Moments](https://css-tricks.com/people-share-their-css-ah-ha-moments/). I remember it being a big deal for me when I first “got it”.

Here is a visual:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-24-at-11.46.02-AM-1024x663.png?resize=1024%2C663&ssl=1)

The relative positioning on the parent is the **big deal** here. Look what would happen if you forgot that:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-24-at-11.46.45-AM-1022x1024.png?resize=1022%2C1024&ssl=1)

This is a significant change. What is happening is the absolutely positioned elements are positioning themselves in relation to the body element instead of their direct parent. So if the browser window grows, that one in the bottom left is going to stick with the browser window, not hang back inside like his well-behaved brother from the first image.

Once you “wrap” your head around this concept (rim-shot) you will find little uses for it all over the place, and start noticing examples of other places using it. It’s like when you learn a new word and then you start hearing it everywhere. Yeah.

You can play with the above demo here:

<CodePen
  user="chriscoyier"
  slug-hash="bGEZONq"
  title="Relative Children"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## How about some examples?

I’d be delighted.

![A “close” button you always want positioned in the upper left of a box (to replicate an operating system window).](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/abs-pos-close.png?resize=70%2C70)

![A “home” button placed in the upper right of the window so that your users never feel too lost](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/abs-pos-home.png?resize=70%2C70)

![A reminder on a sign up form to remind users that if they are already members to sign in above.](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/abs-pos-signin.png?resize=70%2C70)

![“Back to top” links to be placed in the lower right of each big block of text.](https://i0.wp.com/css-tricks.com/wp-content/csstricks-uploads/abs-pos-top.png?resize=70%2C70)

[<VPIcon icon="iconfont icon-css-tricks"/>View Demo](https://css-tricks.com/examples/AbsoluteInsideRelative) [<VPIcon icon="fas fa-file-zipper"/>Download Files](https://css-tricks.com/examples/AbsoluteInsideRelative.zip)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Absolute Positioning Inside Relative Positioning",
  "desc": "A page element with relative positioning gives you the control to absolutely position children elements inside of it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/absolute-positioning-inside-relative-positioning.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
