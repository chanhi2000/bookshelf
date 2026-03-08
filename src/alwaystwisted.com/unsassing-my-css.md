---
lang: en-US
title: "Un-Sass’ing my CSS Always Twisted"
description: "Article(s) > Un-Sass’ing my CSS Always Twisted"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Un-Sass’ing my CSS Always Twisted"
    - property: og:description
      content: "Un-Sass’ing my CSS Always Twisted"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/unsassing-my-css.html
prev: /programming/css/articles/README.md
date: 2025-08-12
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/unsass-my-css.png
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
  name="Un-Sass’ing my CSS Always Twisted"
  desc="Discover how to transition from Sass to modern CSS, exploring new features for transparency and colour manipulation in your design projects."
  url="https://alwaystwisted.com/articles/UnSassing-my-CSS.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/unsass-my-css.png"/>

If you’ve been following me for a while, you’ll know that I’m a big fan of Sass. Whether it's writing articles, running workshops, curating the Sass News email newsletter, or serving as the tech editor for SitePoint, commissioning two fresh Sass articles each week, it’s safe to say I’ve been an enthusiastic supporter of Sass for the last fourteen years.

---

## However

I’m currently assisting a client with what could be the beginning of a brand new Design System through several smaller projects. The website is somewhere between ten to fifteen years old, and the front-end team, while embedded, cannot necessarily keep pace with the advancements in modern CSS. This is largely due to the constraints of the old codebase, which make it challenging to adopt new practices and technologies.

Because of this, we decided to leverage ‘the platform’ as much as possible. We’re not using a preprocessor; instead, we’re relying on features that are ‘newly available’ or ‘widely available’ with Baseline, using modern CSS and almost all the toys in the box.

The only thing we are using is a small script that compiles all the CSS files into one larger file, following the ⁠@import order. This is because, architecturally, we are colocating a component’s CSS file with its corresponding HTML file in the same folder, but not within the same file (yuck!).

---

## Un-Sass’ing?

With this in mind, I thought I’d start another little series of articles. This time, I’ll be showcasing how aspects of modern CSS can replace your favourite CSS preprocessor, what I’m goint to call “Un-Sass’ing.”

---

## Adding Transparency To A Colour

As we work in an agile environment, not everything is fully developed or finalised yet. One of the requirements we've encountered is the need to create transparent backgrounds. Since we are not using Sass for this project, I wondered if we could achieve similar effects using CSS.

In my search, I [discovered the `⁠color()` function (<VPIcon icon="fa-brands fa-bluesky"/>`sturobson.com`)](https://bsky.app/profile/sturobson.com/post/3lw5hz5aink2d), and Manuel kindly shared some other [examples of different ways to implement transparency in using modern CSS (<VPIcon icon="fa-brands fa-codepen" />`matuzo`)](https://codepen.io/matuzo/pen/EaVwEoJ?editors=0100).

### The Sass Way

In previous projects using Sass, we could easily add transparency to colours using the `⁠rgba()` function. This function allows us to define a colour with an alpha value, which determines the level of transparency. For instance, we would typically define a colour variable at the beginning of our stylesheet, like this:

```scss
$primary-color: #c0ffee;
color: rgba($primary-color, 0.4);
```

By using ⁠`rgba()`, Sass interprets ⁠`$primary-color` as a colour value and allows us to specify the alpha channel without needing to break down the colour into its red, green, and blue components manually. This approach made it straightforward to create semi-transparent backgrounds, hover effects, or overlays, enhancing the visual depth of our designs.

### The CSS Way

Now, with modern CSS, we have a variety of options to achieve similar results without relying on a preprocessor. One effective method is using the `⁠color()` function, which allows us to define a colour based on a CSS variable and adjust its transparency.

According to the ~[<VPIcon icon="fa-brands fa-firefox"/>MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)~, the ⁠`color()` function enhances our ability to work with colours in CSS, making it easier to create visually appealing designs that adapt to different contexts. This flexibility allows us to maintain a streamlined workflow while achieving the desired effects, such as transparency, without the need for a preprocessor.

For example, we can create a transparent background using the following syntax:

```css
:root {
  --color-primary: #bada55;
}
.component {
  background-color: color(from var(--color-primary) srgb r g b / 0.2);
}
```

In this example, `⁠var(--color-primary)` retrieves the primary colour defined in CSS variables, while ⁠srgb specifies the colour space. The `⁠r g b` components extract the red, green, and blue values, and the ⁠`/ 0.2` at the end sets the alpha channel for transparency, allowing us to effectively control the opacity of the colour.

---

## The Other CSS Ways

In addition to the `color()` function, modern CSS provides several other methods for adding transparency and manipulating colours using CSS custom properties:

### Using `rgba()` Directly

You can use the `rgba()` function directly in CSS to define colours with transparency by referencing a custom property:

```css
:root {
  --color-primary: #bada55;
}
.component {
  background-color: rgba(var(--color-primary), 0.4);
}
```

### Utilising `hsla()`

The `hsla()` function allows you to work with colours in the HSL colour space, providing another way to define colours with transparency using custom properties:

```css
:root {
  --color-primary: hsl(91, 52%, 59%);
}
.component {
  background-color: hsla(var(--color-primary), 0.4);
}
```

### Mixing with `⁠color-mix()`

The `⁠color-mix()` function allows you to blend a custom property with another colour, including transparency, to create a new colour effect:

```css
:root {
  --color-primary: #bada55;
}
.component {
  background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
}
```

---

## Fin

I still have some trepidation about fully transitioning to CSS-only solutions. While modern CSS offers a wealth of features that can effectively replace many of the functionalities traditionally provided by Sass, I believe that making decisions on tooling should be based on a project-by-project basis. Each project has its unique requirements, and the choice between using Sass or relying solely on CSS should reflect the specific needs and goals of that project.

Sass still has its benefits, particularly in managing complex styles and maintaining a consistent design system. However, as the demand for modern design solutions increases, it’s evident that there is a growing array of new CSS capabilities that can handle many tasks we previously relied on Sass for.

This article may mark the beginning on "Un-Sass’ing" CSS, where I could continue to showcase how to replace favoured Sass functionality with modern CSS techniques.

Would you like to learn more about what and how we can replace Sass with CSS? [Let me know (<VPIcon icon="fa-brands fa-bluesky"/>`sturobson.com`)](https://bsky.app/profile/sturobson.com)!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Un-Sass’ing my CSS Always Twisted",
  "desc": "Discover how to transition from Sass to modern CSS, exploring new features for transparency and colour manipulation in your design projects.",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/unsassing-my-css.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
