---
lang: en-US
title: "Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior"
description: "Article(s) > Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior"
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
      content: "Article(s) > Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior"
    - property: og:description
      content: "Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior.html
prev: /programming/css/articles/README.md
date: 2017-12-11
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
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
  "title": "Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior",
  "desc": "Next to dynamic imports, another feature that landed in Chrome 63 is CSS overscroll-behavior: Scrolling is one of the most fundamental ways to interact with a page, but certain patterns can be tricky to deal with. For example, the browsers pull to refresh feature, where swiping down at the top of the page, does a … Continue reading ”Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior”",
  "link": "https://bram.us/2017/12/10/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior/",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(undefined,0.2)"
}
```

Next to [dynamic imports](https://bram.us/2017/11/27/dynamically-import-es-modules-with-dynamic-import/), another feature that landed in Chrome 63 is CSS `overscroll-behavior`:

> Scrolling is one of the most fundamental ways to interact with a page, but certain patterns can be tricky to deal with. For example, the browsers pull to refresh feature, where swiping down at the top of the page, does a hard reload.
> 
> In some cases, you might want to override that behavior and provide your own experience.

The CSS `overscroll-behavior` property allows you to do just that: override the default scroll behavior. With it you can prevent a full reload when a pull-to-refresh gesture is performed *(and inject your own logic)*, disable rubber banding *(no more for need [this nasty hack](https://bram.us/2016/05/02/prevent-overscroll-bounce-in-ios-mobilesafari-pure-css/))*, etc.

~

Another typical use case is one where you have a scrollable piece of content that is layed out above another scrollable piece of content – yes: a modal. The default behavior is that when reaching the scroll boundary of the modal, the content underneath it starts to scroll:

![](https://bram.us/wordpress/wp-content/uploads/2017/12/scroll-behavior-underscroll-default.gif)

Setting `overscroll-behavior: contain;` on the modal will prevent this default behavior, resulting in a better experience :

![](https://bram.us/wordpress/wp-content/uploads/2017/12/scroll-behavior-underscroll-contained.gif)

~

`overscroll-behavior` is available in the new Chrome 63 and in Firefox *(ever since version 36!)*. Other browsers currently [don’t support this](https://caniuse.com/#feat=css-scroll-behavior).

Here’s a pen that demonstrates how it works:

Scroll the content to its bottom edge, wait a little while *(while keeping your cursor over the element)*, and then continue scrolling. Compare the behavior with and without `overscroll-behavior` contained.

[Take control of your scroll: customizing pull-to-refresh and overflow effects →](https://developers.google.com/web/updates/2017/11/overscroll-behavior)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior",
  "desc": "Next to dynamic imports, another feature that landed in Chrome 63 is CSS overscroll-behavior: Scrolling is one of the most fundamental ways to interact with a page, but certain patterns can be tricky to deal with. For example, the browsers pull to refresh feature, where swiping down at the top of the page, does a … Continue reading ”Customizing Pull-to-Refresh and Overflow Effects with CSS’ overscroll-behavior”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
