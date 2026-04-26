---
lang: en-US
title: "CSS mix-blend-mode not working? Set a background-color!"
description: "Article(s) > CSS mix-blend-mode not working? Set a background-color!"
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
      content: "Article(s) > CSS mix-blend-mode not working? Set a background-color!"
    - property: og:description
      content: "CSS mix-blend-mode not working? Set a background-color!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-mix-blend-mode-not-working-set-a-background-color.html
prev: /programming/css/articles/README.md
date: 2021-01-15
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/01/mix-blend-mode-working.gif
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
  name="CSS mix-blend-mode not working? Set a background-color!"
  desc="💡 If you find your CSS mix-blend-mode not working as expected (on a white background), you need to explicitly set a background-color on the underlying element. The easiest way to do so is to apply background-color: white; on the html and body elements. html, body { background-color: #fff; } ~ Demos + Explanation Without a … Continue reading ”CSS mix-blend-mode not working? Set a background-color!”"
  url="https://bram.us/2021/01/14/css-mix-blend-mode-not-working-set-a-background-color/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/01/mix-blend-mode-working.gif"/>

::: note 💡

If you find your CSS `mix-blend-mode` not working as expected *(on a white background)*, you need to explicitly set a `background-color` on the underlying element. The easiest way to do so is to apply `background-color: white;` on the `html` and `body` elements.

```css
html, body {
    background-color: #fff;
}
```

:::

## Demos + Explanation

### Without a `background-color` set

You’ll notice here that for the “white” sections, the set `mix-blend-mode: difference` does not seem to work. The navigation will stay white and visually blend into the white background. Note that the navigation is not actually gone, as you can still see it shine through whenever a number of any of the sections crosses it.

<CodePen
  user="bramus"
  slug-hash="jOMQLyN"
  title="CSS mix-blend-mode not working? (1/2)"
  :default-tab="['css','result']"
  :theme="dark"/>

**The reason why it doesn’t work is that the white sections don’t really have a white background.** They have no `background-color` set, so they fall back to the default value of `transparent`. Visually this is manifested as a white color, but to the compositor it will still be `transparent`. As the compositor can’t calculate the difference of the `white` text against the `transparent` background, the text will remain `white`.

~

### With a `background-color` set

With `background-color: #fff;` set on the `body`/`html` the compositor does know how to calc the difference, and the demo will behave correctly.

<CodePen
  user="bramus"
  slug-hash="abmQyWW"
  title="CSS mix-blend-mode not working? (2/2)"
  :default-tab="['css','result']"
  :theme="dark"/>

Alternatively we could set this declaration on the sections themselves:

```css
section {
    background-color: #fff;
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS mix-blend-mode not working? Set a background-color!",
  "desc": "💡 If you find your CSS mix-blend-mode not working as expected (on a white background), you need to explicitly set a background-color on the underlying element. The easiest way to do so is to apply background-color: white; on the html and body elements. html, body { background-color: #fff; } ~ Demos + Explanation Without a … Continue reading ”CSS mix-blend-mode not working? Set a background-color!”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-mix-blend-mode-not-working-set-a-background-color.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
