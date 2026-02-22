---
lang: en-US
title: "CSS Logical Properties"
description: "Article(s) > CSS Logical Properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Logical Properties"
    - property: og:description
      content: "CSS Logical Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/getting-started-with-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2020-03-13
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=getting-started-with-css-custom-properties/
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
  name="CSS Logical Properties"
  desc="Create spacing that works regardless of the direction of your content or the environment of your users."
  url="https://piccalil.li/blog/getting-started-with-css-custom-properties"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=getting-started-with-css-custom-properties/"/>

Say you want to put some space between two inline items: what do you do? Probably something like this:

```css
.my-element {
  margin-left: 1em;
}
```

This approach is fine and has been for a long time with CSS, but what happens when the content direction changes? That left margin suddenly becomes problematic because it no longer matches and makes the content look awkward.

![Digram showing how margin-left isn’t effective when the text direction is switched](https://piccalil.b-cdn.net/images/tutorials/logical-properties-margin-left.svg?auto=format&w=1500)

When the direction of content is switched, the left margin is problematic, rather than helpful.

Western languages read **left to right**, but other languages such as Arabic, read **right to left**. Some languages even read **top to bottom**, like traditional Chinese.

Our CSS should be as flexible as possible, so instead of explicitly setting a left, right, top or bottom value to margins, we should instead be using a **logical property**.

Here’s that same example from the start, but with a logical property:

```css
.my-element {
  margin-inline-start: 1em;
}
```

What this now does is instead of saying “add margin to the left”, it says “regardless of direction, put margin on the starting side”. If the language of the document was **right to left**, like **Arabic**, that margin would be on the **right hand side**.

![Digram showing how margin-inline-start is much more effective](https://piccalil.b-cdn.net/images/tutorials/logical-properties-margin-inline.svg?auto=format&w=1500)

When we use logical properties, the margin becomes flexible based on the content direction.

Click the button in this demo to see how the margin is now reactive to the content direction:

<CodePen
  user="piccalilli"
  slug-hash="abOYEwN"
  title="Piccalilli Demo - Logical Properties"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Why is this important?

The web is global and open, so making presumptions about the users of your website is pretty dangerous.

A variety of factors come into play when someone visits your site, such as connection speed, device power and spoken language. They could also be using a [<VPIcon icon="fa-brands fa-google"/>translation extension](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=en-GB). It’s our job as web developers to make our content as flexible as possible to meet user needs, regardless of what those needs are, using the powerful, flexible tools that are given to us by the web platform.

Logical properties are a perfect example of this and they have a [<VPIcon icon="iconfont icon-caniuse"/>huge browser support](https://caniuse.com/#feat=css-logical-props), so you should absolutely use them today.

::: info Resources and further learning

This is only a quick intro to logical properties, but luckily, some other fine folks from around the web have written about them in detail:

```component VPCard
{
  "title": "CSS Logical Properties",
  "desc": "A property like margin-left seems fairly logical, but as Manuel Rego Casasnovas says:",
  "link": "/css-tricks.com/css-logical-properties.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

- [<VPIcon icon="fa-brands fa-firefox"/>CSS Logical Properties and Values - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [Understanding Logical Properties And Values](https://smashingmagazine.com/2018/03/understanding-logical-properties-values/)
<!-- TODO: /smashingmagazine.com/understanding-logical-properties-values.md -->

```component VPCard
{
  "title": "CSS Logical Properties",
  "desc": "I have often remarked that my blog is little more than a place for me to offload my memory. I need not remember the syntax, logic, test results, etc. of every control, widget, style, browser, and so on. I can just write a post and refer to it later. This…",
  "link": "/adrianroselli.com/css-logical-properties.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Logical Properties",
  "desc": "Create spacing that works regardless of the direction of your content or the environment of your users.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/getting-started-with-css-custom-properties.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
