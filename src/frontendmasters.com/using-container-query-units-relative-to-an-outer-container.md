---
lang: en-US
title: "Using Container Query Units Relative to an Outer Container"
description: "Article(s) > Using Container Query Units Relative to an Outer Container"
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
      content: "Article(s) > Using Container Query Units Relative to an Outer Container"
    - property: og:description
      content: "Using Container Query Units Relative to an Outer Container"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-container-query-units-relative-to-an-outer-container.html
prev: /programming/css/articles/README.md
date: 2025-05-06
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5761
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
  name="Using Container Query Units Relative to an Outer Container"
  desc="Container units (e.g. cqi) are only able to reference the closest container. But if you register a custom property and set that higher up, you can get your hands on other containers units."
  url="https://frontendmasters.com/blog/using-container-query-units-relative-to-an-outer-container/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5761"/>

Recently, Matt Wilcox[<FontIcon icon="fas fa-globe"/>posted on Mastodon](https://mstdn.social/@mattwilcox/114386944917360151):

> The fact you can’t specify*which*container for container query units is a ballache. The moment you have nested containers you’re \[screwed\]; because if you want the calculated gap from the row’s container; but you’re inside a nested container… tough. Your units are wrong. And you can’t just say “no; not relative to*this*container; relative to the named outer container!”

First off, if you’re not familiar with container queries and container query units, you can check out one of the many resources on the topic, for example this[<FontIcon icon="fas fa-globe"/>interactive guide](https://ishadeed.com/article/css-container-query-guide/)by Ahmad Shadeed, which I believe is the most recent out of all the detailed ones I’ve seen. As always, the date of the resources used is important for web stuff, especially since these units in particular have changed their name since[they were first proposed (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5888)and we got an early draft of the spec.

Now, the problem at hand: let’s say we have an`.inner-container`inside an`.outer-container`– they are both made to be containers:

```css
[class*='container'] { container-type: size }
```

We want any`.inner-child`of the`.inner-container`to be able to use length values set in container query units relative to the`.outer-container`(more precisely, to its`content-box`dimensions). The problem is, if we do something like this (a`20cqw`light blue strip at the start of the gradient going towards 3 o’clock):

```css
.inner-child {
  background: linear-gradient(90deg, #0a9396 20cqw, #0000)
}
```

… then the`20cqw`value is`20%`(a fifth) of the`content-box`width of the`.inner-container`. This can be seen below, where we have purple guidelines`20%`of the width apart.

![Screenshot illustrating how a background sized to cqw on the child of the inner container is a fifth of the inner container's width.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/437958325-f8239b65-787e-498d-a43d-15c3373490a0-1.png?resize=1024%2C633&ssl=1)

what 20cqw represents

But what we want is for that`20cqw`value to be`20%`of the`content-box`width of the`.outer-container`.

Strictly for the queries themselves, we could do something like this:

```css
.outer-container { container: outer/ size }
.inner-container { container: inner/ size }

@container outer (min-width: 500px) {
  .inner-child { background: darkorange }
}
```

This allows us to set certain styles on the`.inner-child`elements based on where the`width`of the`.outer-container`(which isn’t the*nearest*container for`.inner-child`) is situated relative to the`500px`threshold.

But we cannot do something like this to specify which container should be the one that the query units used on`.inner-child`are relative to:

```css
.inner-child {
  /* can't do this */
  background: linear-gradient(90deg, #0a9396 outer 20cqw, #0000)
}
```

Nor can we do this:

```css
.inner-child {
  /* can't do this either */
  --s: outer 20cqw;
  background: linear-gradient(90deg, #0a9396 var(--s), #0000)
}
```

However, we*are*getting closer!

What if we move the`--s`variable uspstream? After all, a`20cqw`length value set on the`.inner-container`is`20%`of the`content-box`width of its nearest container, which is the`.outer-container`. This would mean our code becomes:

```css
[class*='container'] { container-type: size }

.inner-container {
  --s: 20cqw;
  background: 
    repeating-linear-gradient(45deg, #bb3e03 0 5px, #0000 0 1em) 
      0/ var(--s) no-repeat
}

.inner-child {
  background: 
    linear-gradient(90deg, #0a9396cc var(--s), #0000)
}
```

We also give the`.inner-container`a similar`background`restricted to`20cqw`from the left along the*x*axis and make the`.inner-child`semi-transparent, just to check if the`--s`values overlap (which is what we want,`--s`being`20%`or a fifth of the`.outer-container`width). However,[this fails (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/xbbgKzp), as it can be seen below:

![Screenshot. Both the inner container and its child have a background sized to `20cqw`. However, the container query units are relative to the outer container only for the inner container, the container query units used on its child being still relative to the inner container (one fifth of its `content-box` width).](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/437957569-0be163ba-6508-49d8-8f4e-7dd96d7d38fe.png?resize=1024%2C633&ssl=1)

For the`.inner-container`the`20cqw`of the`--s`is taken to be`20%`of the`content-box`width of its nearest container,`.outer-container`(dashed dark blue boundary). However, for the`.inner-child`, the`20cqw`of the`--s`aren’t taken to mean the same value. Instead, they are taken to mean`20%`of the`.content-box`width of the`.inner-container`(dotted dark red boundary).

Boo!

But what happens if we also register`--s`?

```css
@property --s {
  syntax: '<length>';
  initial-value: 0px;
  inherits: true
}
```

Bingo,[this works (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/GggNemJ)!

<CodePen
  user="thebabydino"
  slug-hash="GggNemJ"
  title="Container query unit values relative to outer container"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![Screenshot. Both the inner container and its child have a background sized to 20cqw, the container query units being relative to the outer container.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/437957622-82985165-4171-456f-9e16-319410410db1-1.png?resize=1024%2C633&ssl=1)

I hope you’ve enjoyed this little trick.

Where would you use this?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Container Query Units Relative to an Outer Container",
  "desc": "Container units (e.g. cqi) are only able to reference the closest container. But if you register a custom property and set that higher up, you can get your hands on other containers units.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-container-query-units-relative-to-an-outer-container.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
