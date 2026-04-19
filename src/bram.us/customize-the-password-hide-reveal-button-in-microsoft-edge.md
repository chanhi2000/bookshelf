---
lang: en-US
title: "Customize the Password Hide/Reveal Button in Microsoft Edge"
description: "Article(s) > Customize the Password Hide/Reveal Button in Microsoft Edge"
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
      content: "Article(s) > Customize the Password Hide/Reveal Button in Microsoft Edge"
    - property: og:description
      content: "Customize the Password Hide/Reveal Button in Microsoft Edge"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/customize-the-password-hide-reveal-button-in-microsoft-edge.html
prev: /programming/css/articles/README.md
date: 2022-01-12
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/01/ms-reveal.png
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
  name="Customize the Password Hide/Reveal Button in Microsoft Edge"
  desc="If you’re using Microsoft Edge, you might have noticed that it sports “Reveal Password” control — a little eye icon — automatically injected on the end side of password inputs: As per Edge Developer Docs: The password input type in Microsoft Edge includes a password reveal control. To make sure that the password is entered … Continue reading ”Customize the Password Hide/Reveal Button in Microsoft Edge”"
  url="https://bram.us/2022/01/11/customize-the-password-hide-reveal-button-in-microsoft-edge/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/01/ms-reveal.png"/>

If you’re using Microsoft Edge, you might have noticed that it sports “Reveal Password” control — a little eye icon — automatically injected on the end side of password inputs:

![](https://bram.us/wordpress/wp-content/uploads/2022/01/ms-reveal.png)

As [<VPIcon icon="fa-brands fa-edge"/>per Edge Developer Docs](https://docs.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal):

::: Customize the password reveal button (<VPIcon icon="fa-brands fa-edge"/><code>docs.microsoft.com/en-us/microsoft-edge</code>)

> The `password` input type in Microsoft Edge includes a password reveal control. To make sure that the password is entered correctly, a user can click the password reveal button or press Alt+F8, to show the characters in the password field.
>
> A password field with dots hiding the characters entered by a user. The password reveal button appears to the right of the password field. The eye-shaped icon appears next to the dots that hide the password text.

<SiteInfo
  name="Customize the password reveal button - Microsoft Edge Developer documentation"
  desc="Guidance on customizing the display of the password reveal button."
  url="https://learn.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="https://learn.microsoft.com/en-us/media/open-graph-image.png"/>

:::

It’s a nice feature I must say, but it’s a bit quirky: it only shows the control as long as the input remains focussed. If you blur the control and later on refocus, you won’t be able to reveal the password, as demonstrated in this video:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2022/01/ms-reveal.mp4" />

When starting from scratch again, i.e. after clearing the password, it’ll work as expected again. I’m pretty sure this is a security feature, to make the stealing of passwords a little harder than simply pressing the password-reveal control.

As an author, you can use the non-standardized `::-ms-reveal` pseudo class to style the reveal password control:

```css
::-ms-reveal {
  border: 1px solid red;
}
```

::: note 🤔

Curious to know why it’s this specific pseudo-element selector? [**You can use the DevTools to discover it yourself**](/bram.us/identify-and-extract-pseudo-element-selectors-from-built-in-html-elements-using-devtools.md).

:::

Unfortunately there’s no easy way to only control only the color of the icon used, as it’s an inlined SVG. Here’s how they did it, as seen in the UA Stylesheet that ships with Edge.

```css
::-ms-reveal {
  background-image: -internal-light-dark(
    -webkit-image-set(url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xLjI2IDkuNkE2Ljk3IDYuOTcgMCAwMTggNGMzLjIgMCA2LjA2IDIuMzMgNi43NCA1LjZhLjUuNSAwIDAwLjk4LS4yQTcuOTcgNy45NyAwIDAwOCAzIDcuOTcgNy45NyAwIDAwLjI4IDkuNGEuNS41IDAgMDAuOTguMnoiIGZpbGw9IldpbmRvd1RleHQiLz48cGF0aCBkPSJNOCA2YTMuNSAzLjUgMCAxMDAgNyAzLjUgMy41IDAgMDAwLTd6TTUuNSA5LjVhMi41IDIuNSAwIDExNSAwIDIuNSAyLjUgMCAwMS01IDB6IiBmaWxsPSJXaW5kb3dUZXh0Ii8+DQo8L3N2Zz4=") 1x),
    -webkit-image-set(url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xLjI2IDkuNkE2Ljk3IDYuOTcgMCAwMTggNGMzLjIgMCA2LjA2IDIuMzMgNi43NCA1LjZhLjUuNSAwIDAwLjk4LS4yQTcuOTcgNy45NyAwIDAwOCAzIDcuOTcgNy45NyAwIDAwLjI4IDkuNGEuNS41IDAgMDAuOTguMnoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNOCA2YTMuNSAzLjUgMCAxMDAgNyAzLjUgMy41IDAgMDAwLTd6TTUuNSA5LjVhMi41IDIuNSAwIDExNSAwIDIuNSAyLjUgMCAwMS01IDB6IiBmaWxsPSIjZmZmZmZmIi8+DQo8L3N2Zz4=") 1x)
  );
}
```

To change the color, you’ll have to overwrite the entire `background-image`.

::: note 🔥

The `-internal-light-dark()` function you see there definitely caught my eye. If you’re visiting a site using a light theme, the function will return the first `image-set`. In Dark Mode, it’ll yield the second `image-set`.

This function first [<VPIcon icon="fa-brands fa-google"/>landed in Chromium in 2019](https://docs.google.com/document/d/1RRyQSdohsl8S9kQIdC6rYwwVy6cY15gjkGMgyadTORg/edit#heading=h.2b9x5ibuijn6) as `-internal-light-dark-color()`. Later on [it got renamed (<VPIcon icon="iconfont icon-github"/>`chromium/chromium`)](https://github.com/chromium/chromium/commit/42267a718b56e0da01b82c4aee8b342f24e45c1b#diff-2975a4e2f7577db24fde5cf797a6a3c0394010bd2553fc02985a040106898e60) to its current form.

Unfortunately this handy `-internal-light-dark()` function is not available in the Author Origin.

:::

Addiontally, if you’re thinking of using CSS to always show the `::-ms-reveal` control using `display: block !important;` then I’ll have to disappoint you: the control does show it, but it’s not functional.

```css
::-ms-reveal {
  display: block !important; /* Will always show the control but clicking it won't reveal already filled values */
}
```

In his post [<VPIcon icon="fas fa-globe"/>How to hide Microsoft Edge’s password reveal button](https://stefanjudis.com/snippets/how-to-hide-microsoft-edges-password-reveal-button/), [Stefan Judis](https://twitter.com/stefanjudis/) warns for this automatically provided control: if you’re sporting your own Show/Hide Password logic, it might conflict with Edge’s one. To cater for this, Stefan suggests to hide Edge’s provided toggle:

```css
::-ms-reveal {
  display: none;
}
```

Alternatively you could opt to hide your own implementation when `::-ms-reveal` support is detected:

```css
@supports(selector(::-ms-reveal)) {
  .my_custom_password_toggle {
    display: none;
  }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Customize the Password Hide/Reveal Button in Microsoft Edge",
  "desc": "If you’re using Microsoft Edge, you might have noticed that it sports “Reveal Password” control — a little eye icon — automatically injected on the end side of password inputs: As per Edge Developer Docs: The password input type in Microsoft Edge includes a password reveal control. To make sure that the password is entered … Continue reading ”Customize the Password Hide/Reveal Button in Microsoft Edge”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/customize-the-password-hide-reveal-button-in-microsoft-edge.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
