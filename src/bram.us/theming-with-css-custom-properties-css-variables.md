---
lang: en-US
title: "Theming with CSS Custom Properties (CSS Variables)"
description: "Article(s) > Theming with CSS Custom Properties (CSS Variables)"
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
      content: "Article(s) > Theming with CSS Custom Properties (CSS Variables)"
    - property: og:description
      content: "Theming with CSS Custom Properties (CSS Variables)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/theming-with-css-custom-properties-css-variables.html
prev: /programming/css/articles/README.md
date: 2017-07-23
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2017/07/instant-update.gif
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
  name="Theming with CSS Custom Properties (CSS Variables)"
  desc="Stephanie Liu has replicated the native Slack theming capabilities in the browser using CSS Variables CSS Custom Properties. The essence of the demo is actually quite simple: define the variables on the :root level, and use ‘m where needed. …"
  url="https://bram.us/2017/07/22/theming-with-css-custom-properties-css-variables/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2017/07/instant-update.gif"/>

![](https://bram.us/wordpress/wp-content/uploads/2017/07/instant-update.gif)

Stephanie Liu has replicated the native Slack theming capabilities in the browser using ~~CSS Variables~~ CSS Custom Properties. The essence of the demo is actually quite simple: define the variables on the `:root` level, and use ‘m where needed.

```css
:root {
  --column-bg: #ae0001;
  --menu-bg-hover: #680001;
  --active-item: #D3A625;
  --active-item-text: #680001;
  --hover-item: #BE0002;
  --text-color: #FFFFFF;
  --active-presence: #00FFBA;
  --mention-badge: #DE4C0D;
}
```

```css
.sidebar {
  background: var(--column-bg, #ae0001);
}
```

Here’s a full working demo:

<CodePen
  user="ramenhog"
  slug-hash="yXYNzz"
  title="Slack Theming with CSS Custom Properties"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info 💁‍♂️

You can also use this with Responsive Web Design / Media Queries:

```component VPCard
{
  "title": "CSS Variables tutorial: How to make your HTML responsive with CSS Variables",
  "desc": "By Per Harald Borgen _Learn how to create the following responsiveness with CSS Variables._ A quick tutorial on how to create responsive websites in 2019. If you haven’t heard of CSS Variables before, it’s a new feature of CSS which gives you the po...",
  "link": "/freecodecamp.org/how-to-make-responsiveness-super-simple-with-css-variables.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::

<SiteInfo
  name="Theming with CSS Custom Properties"
  desc="Why you should care about CSS variables and what they mean for app theming"
  url="https://ramenhog.com/blog/2017/06/07/theming-with-css-custom-properties/"
  logo="https://ramenhog.com/favicon-16x16.png"
  preview="https://ramenhog.com/assets/css-variable-theming/theming-with-css-variables.gif"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Theming with CSS Custom Properties (CSS Variables)",
  "desc": "Stephanie Liu has replicated the native Slack theming capabilities in the browser using CSS Variables CSS Custom Properties. The essence of the demo is actually quite simple: define the variables on the :root level, and use ‘m where needed. …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/theming-with-css-custom-properties-css-variables.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
