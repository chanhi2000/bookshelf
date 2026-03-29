---
lang: en-US
title: "Prevent content from being hidden underneath a fixed header by using scroll-margin-top"
description: "Article(s) > Prevent content from being hidden underneath a fixed header by using scroll-margin-top"
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
      content: "Article(s) > Prevent content from being hidden underneath a fixed header by using scroll-margin-top"
    - property: og:description
      content: "Prevent content from being hidden underneath a fixed header by using scroll-margin-top"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/prevent-content-from-being-hidden-underneath-a-fixed-header-by-using-scroll-margin-top.html
prev: /programming/css/articles/README.md
date: 2020-03-02
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/03/hidden-header.png
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
  name="Prevent content from being hidden underneath a fixed header by using scroll-margin-top"
  desc="If you’ve ever implemented a design with a fixed header, you’ve surely had this problem: You click a jump link like <a href=”#header-3”>Jump</a> which links to something like <h3 id=”header-3”>Header</h3>. That&apos;s totally fine, until you have a position: fixed; header at the top of the page obscuring the h3 you&apos;re trying to link to! Fixed … Continue reading ”Prevent content from being hidden underneath a fixed header by using scroll-margin-top”"
  url="https://bram.us/2020/03/01/prevent-content-from-being-hidden-underneath-a-fixed-header-by-using-scroll-margin-top/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/03/hidden-header.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/03/hidden-header.png)

If you’ve ever implemented a design with a fixed header, you’ve surely had this problem:

> You click a jump link like `<a href="#header-3">Jump</a>` which links to something like `<h3 id="header-3">Header</h3>`. That's totally fine, until you have a `position: fixed;` header at the top of the page obscuring the `h3` you're trying to link to!
> 
> Fixed headers have a nasty habit of hiding the element you’re trying to link to.

Thankfully Chris Coyier from CSS-Tricks [**found and shared**](/css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top.md) the straightforward solution:

```css
h3 {
  scroll-margin-top: 5rem; /* whatever is a nice number that gets you past the header */
}
```

::: note Update 🐛

As [<VPIcon icon="fas fa-globe"/>noted](https://bram.us/2020/03/01/prevent-content-from-being-hidden-underneath-a-fixed-header-by-using-scroll-margin-top/#comment-743034) in the comments below this doesn’t work Safari. In that browser you’ll need to use `scroll-snap-margin-top`. All other modern browsers do have excellent [<VPIcon icon="iconfont icon-caniuse"/>support for `scroll-margin-top`](https://caniuse.com/#search=scroll-margin-top) and play nice.

:::

To not have to apply the CSS rule to too many elements, I’d adjust the snippet to use [<VPIcon icon="fa-brands fa-firefox"/>the `:target` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:target).

> The `:target` CSS pseudo-class represents a unique element (the target element) with an `id` matching the URL’s fragment.

That way it will work with any internally linked thing *(headers in all their sizes, anchors, etc)*:

```css
:target {
  scroll-margin-top: 5rem;
}
```

It was also nice to see that Mattias Geniar [<VPIcon icon="fas fa-globe"/>used this solution](https://ma.ttias.be/adding-a-sticky-table-of-contents-in-hugo-to-posts/#offsetting-the-anchor-links-from-the-top) when implementing the [**Smooth Scrolling Sticky Navigation I wrote about**](/bram.us/smooth-scrolling-sticky-scrollspy-navigation.md) earlier *(Mattias is using `scroll-padding-top` though)*.

[Fixed Headers and Jump Links? The solution is `scroll-margin-top`→](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prevent content from being hidden underneath a fixed header by using scroll-margin-top",
  "desc": "If you’ve ever implemented a design with a fixed header, you’ve surely had this problem: You click a jump link like <a href=”#header-3”>Jump</a> which links to something like <h3 id=”header-3”>Header</h3>. That&apos;s totally fine, until you have a position: fixed; header at the top of the page obscuring the h3 you&apos;re trying to link to! Fixed … Continue reading ”Prevent content from being hidden underneath a fixed header by using scroll-margin-top”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/prevent-content-from-being-hidden-underneath-a-fixed-header-by-using-scroll-margin-top.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
