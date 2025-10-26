---
lang: en-US
title: "CSS Bursts with Conic Gradients"
description: "Article(s) > CSS Bursts with Conic Gradients"
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
      content: "Article(s) > CSS Bursts with Conic Gradients"
    - property: og:description
      content: "CSS Bursts with Conic Gradients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-bursts-with-conic-gradients.html
prev: /programming/css/articles/README.md
date: 2025-04-03
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5521
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
  name="CSS Bursts with Conic Gradients"
  desc="Using hard color stops with `repeating-conic-gradient()` and the double-stop syntax, we can pretty easily create a burst background. Then get fancier."
  url="https://frontendmasters.com/blog/css-bursts-with-conic-gradients/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5521"/>

You can make stripes with CSS gradients pretty easily. It’s that classic thing where you don’t fade a color from one to another, you just *switch* colors by having two colors share the same “color stop”. I made this one time to explain that:

<CodePen
  user="chriscoyier"
  slug-hash="rNVXNRY"
  title="Moving to a Hard Stop Gradient"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
background: linear-gradient(
  to right, 
  red,
  red 50%,
  blue 50%,
  blue
);
```

To turn that into stripes, we can set the `background-size` smaller and let it repeat. But perhaps the more-correct tool is to use `repeating-linear-gradient()` which automatically handles, ya know, repeating the gradient.

<CodePen
  user="chriscoyier"
  slug-hash="XJWOEvV"
  title="Repeating linear gradients"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
background: repeating-linear-gradient(
  #d84315,
  #d84315 10px,
  #fbc02d 10px,
  #fbc02d 20px
);
```

I think it’s a bit lesser-known, but there is an updated syntax to gradients where you can list *two* color stop lengths instead of just one, so the above code actually can get a little simpler:

<CodePen
  user="chriscoyier"
  slug-hash="ByaMVGO"
  title="Repeating linear gradients (simpler syntax)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
background: repeating-linear-gradient(
  #d84315 0 10px,
  #fbc02d 10px 20px
);
```

OK that took me a minute to get to the point lol.

It occurred to me that these hard-stops can work for `conic-gradient()` as well. I was literally *trying* to make a burst background and was pleasantly surprised when I tried this and it worked.

<CodePen
  user="chriscoyier"
  slug-hash="wBvNXZQ"
  title="CSS Burst"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
background-image: repeating-conic-gradient(
  black 0deg 10deg,
  #666 10deg 11deg
);
```

I was actually trying to set some text in the middle, so I wanted to start the burst away from the center. Easy enough with a radial gradient sitting on top of it.

<CodePen
  user="chriscoyier"
  slug-hash="RNwvJXM"
  title="CSS Burst with text"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

While I was thinking about this, I happed to see the Robinhood homepage and it was pretty burstin’.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-03-at-8.38.07%E2%80%AFAM.png?resize=1024%2C627&ssl=1)

See how that burst has lines breaking it up. I bet you could figure out how to do that by laying on more radial gradients, or perhaps a repeating radial gradient with transparent color stops.

Ughgkgh fine I’ll do it.

<CodePen
  user="chriscoyier"
  slug-hash="vEYbaER"
  title="CSS Burst with text"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

But I’ll let you figure out how to animate that. I bet you could do it with `@property` on some custom properties that you sneak into those gradient definitions.

This also reminds me that I worked on some bursts one time that were a bit more randomized using SVG. Feel free to click to reset what’s going on below:

<CodePen
  user="chriscoyier"
  slug-hash="OJXNeyP"
  title="Gray Burst"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Bursts with Conic Gradients",
  "desc": "Using hard color stops with `repeating-conic-gradient()` and the double-stop syntax, we can pretty easily create a burst background. Then get fancier.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-bursts-with-conic-gradients.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
