---
lang: en-US
title: "Animating a CSS Gradient Border"
description: "Article(s) > Animating a CSS Gradient Border"
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
      content: "Article(s) > Animating a CSS Gradient Border"
    - property: og:description
      content: "Animating a CSS Gradient Border"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/animating-a-css-gradient-border.html
prev: /programming/css/articles/README.md
date: 2021-01-30
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/01/css-animated-border-gradient-resized.gif
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
  name="Animating a CSS Gradient Border"
  desc="Recently, Stephanie Eckles sent out a call to revive the use of CSS border-image. Not to use it with images — which requires a pretty nasty syntax — but to create Gradient Borders in CSS. 🎉 Time to revive an old CSS property! When `border-image` was announced, I was off-put b/c the syntax was so … Continue reading ”Animating a CSS Gradient Border”"
  url="https://bram.us/2021/01/29/animating-a-css-gradient-border/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/01/css-animated-border-gradient-resized.gif"/>

Recently, [Stephanie Eckles (<VPIcon icon="fa-brands fa-x-twitter"/>`5t3ph`)](https://twitter.com/5t3ph) sent out a call to revive the use of CSS `border-image`. Not to use it with images — which requires a pretty nasty syntax — but to create Gradient Borders in CSS.

::: info Stephanie Eckles *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>@5t3ph</code>)

> Time to revive an old CSS property!
> 
> When `border-image` was announced, I was off-put b/c the syntax was so wild.
> 
> But with modern browsers, it's the *easiest* way to create gradient borders.
> 
> Learn more about CSS borders in the new ModernCSS tutorial:

<SiteInfo
  name="The 3 CSS Methods for Adding Element Borders | Modern CSS Solutions"
  desc="In CSS, sometimes a `border` is not really a `border`. In this episode, we'll cover the differences between `border`, `outline`, and `box-shadow` and when to choose each."
  url="https://moderncss.dev/the-3-css-methods-for-adding-element-borders//"
  logo="https://moderncss.dev/favicon.png"
  preview="https://moderncss.dev/img/social/the-3-css-methods-for-adding-element-borders.png"/>

:::

Curious to see what we can do with them, I whipped up a few demos using CodePen.

The most simple usage is to set some type of [<VPIcon icon="fa-brands fa-firefox"/>CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients) as the `border-image`:

```css
div {
    border: 3em solid;
    border-image: linear-gradient(to right, green, yellow) 1;
}
```

<CodePen
  user="bramus"
  slug-hash="NWbKXYG"
  title="CSS Gradient Border"
  :default-tab="['css','result']"
  :theme="dark"/>

Then I wondered if I could animate the border, so that it would rotate along the edge.

To animate the border gradient you’ll need to add an angle in there — using a Custom Property — which you animate using some `@keyframes`.

```css
div {
  --angle: 0deg;
  /* … */
  border-image: linear-gradient(var(--angle), green, yellow) 1;
  animation: 10s rotate linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}
```

By using a Custom Property we can have the browser properly automatically interpolate this value from `0deg` to `360deg` instead of needing to add individual keyframes for every 1 degree increase. For this to work we have to register the Custom Property using [**the amazing `@property` at-rule**](/web.dev/at-property.md)

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
```

::: note

As `@property` is only supported in Chromium at the time of writing, the demos from here on down will only work in browsers based upon it (e.g. Google Chrome, Microsoft Edge, …).

For browsers that don’t support it you could add individual keyframes for each step, [as shown in this demo (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/XWMwPgO?editors=0110). However, for demonstration purposes I’m not including the extra code in any of the demos below.

:::

<CodePen
  user="bramus"
  slug-hash="eYBOvGW"
  title="CSS Gradient Border"
  :default-tab="['css','result']"
  :theme="dark"/>

While the effect here looks quite nice it won’t play nice with more than two colors. Take this rainbow animated gradient border for example:

<CodePen
  user="bramus"
  slug-hash="vYyBbBq"
  title="CSS Rainbow Gradient Border (Animated, Attempt 1)"
  :default-tab="['css','result']"
  :theme="dark"/>

🕵️‍♂️ You can see best what’s going on by toggling the fill option there … ugh, that’s not what we want!

To fix that I first thought of using a radial gradient but what I need is [<VPIcon icon="fa-brands fa-firefox"/>a conic gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient()#composition_of_a_conic_gradient):

![](https://bram.us/wordpress/wp-content/uploads/2021/01/conic-vs-radial-gradient.png)

This way each color of the gradient will extend nicely into the border, resulting in a correct animation.

```css
div {
    /* … */
    border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
}
```

::: note 💁‍♂️

To make the end of the gradient blend nicely into its begin color, we have to repeat the said color — e.g. `red` — as the last entry.

:::

<CodePen
  user="bramus"
  slug-hash="rNWByYz"
  title="CSS Rainbow Gradient Border (Animated)"
  :default-tab="['css','result']"
  :theme="dark"/>

When toggling the fill you can see that `border-image` here stretches out the color perpendicular to its edge, instead of letting the gradient “pass”. This might not be 100% what you want, but for me it was exactly what I aimed for 🙂

::: note 🎩

For non-Houdini browsers you can [check out this fork (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/XWMwPgO?editors=0110), which uses individual keyframes to animate the gradient.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animating a CSS Gradient Border",
  "desc": "Recently, Stephanie Eckles sent out a call to revive the use of CSS border-image. Not to use it with images — which requires a pretty nasty syntax — but to create Gradient Borders in CSS. 🎉 Time to revive an old CSS property! When `border-image` was announced, I was off-put b/c the syntax was so … Continue reading ”Animating a CSS Gradient Border”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/animating-a-css-gradient-border.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
