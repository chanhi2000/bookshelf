---
lang: en-US
title: "Gradient Text with a Drop Shadow"
description: "Article(s) > Gradient Text with a Drop Shadow"
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
      content: "Article(s) > Gradient Text with a Drop Shadow"
    - property: og:description
      content: "Gradient Text with a Drop Shadow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/gradient-text-with-a-drop-shadow.html
prev: /programming/css/articles/README.md
date: 2024-09-20
isOriginal: false
author: Marc Grabanski
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896
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
  name="Gradient Text with a Drop Shadow"
  desc="Gradient text is pretty easy to do these days with `background-clip: text;` — but it kills your ability to use `text-shadow`. SVG to the rescue. "
  url="https://frontendmasters.com/blog/gradient-text-with-a-drop-shadow/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896"/>

During our annual promotion, we had this branding for the countdown timer:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/sale.jpg?resize=800%2C376&ssl=1)

The “Ends in X days!” needed to be HTML text since it’s dynamic based on the sale end date. Note that it both colored with a gradient and has both a stroke and a drop shadow.

We can achieve a text gradient by clipping the background to the text with `background-clip: text`, like this:

```css
.Countdown {
  background: linear-gradient(#fff000, #ff3600);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

This creates a gradient background and then clips the background to the text. Then we hide the actual text itself with `color: transparent`. Here’s the demo:

<CodePen
  user="1Marc"
  slug-hash="GRVKpbj"
  title="Simple Text Gradient"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Now I want to add a shadow behind it… sounds simple, right? Of course not.

The obvious way, using `text-shadow`, looks bad because `color: transparent` makes the text itself transparent, and the shadow it renders is actually *above* the background we’re setting.

<CodePen
  user="1Marc"
  slug-hash="MWNgKxN"
  title="Why you can't use text gradient with text shadow"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

So that’s out.

---

## Pseudo Element Solution: Gradient Text with a Drop Shadow

We can use a pseudo element that replicates the text and layers itself behind the background of the main text, and we can then use `text-shadow` on *that* safely:

```css
.Countdown::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  color: #000;
  text-shadow: -4px 4px 1px #000, 3px 2px 1px #000, -1px -2px 1px #000, 2px 6px 3px #000;
}
```

Note the multiple shadows are in multiple directions simulating stroked text.

<CodePen
  user="1Marc"
  slug-hash="GRVKZRd"
  title="Simple Text Gradient with Shadow with a Pseudo Element"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

It’s not ideal since we also have to add the text to the `data` attribute in order to be inserted into the pseudo element:

```html
<p class="Countdown CountdownFont" 
  data-text="Ends in 7 days">
  Ends in 7 days
</p>
```

That is repetitive, heavier, and error-prone. It also means that if you need to change the text contents via JavaScript, you’ll also need to keep the `data` attribute updated as well. Not to mention negative `z-index` can have trouble when there is other elements backgrounds involved.

---

## SVG Solution: Gradient Text with a Drop Shadow

Although it’s the most complex of the methods, you can apply both effects to an SVG, no problem!

<CodePen
  user="1Marc"
  slug-hash="RwXbaGy"
  title="Simple Text Gradient with Shadow with an SVG"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

In the code we use the `linearGradient` SVG element to draw the text, and a series of `feDropShadow` filters to the text span element:

```xml
<svg width="auto" height="auto">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff000" />
      <stop offset="100%" stop-color="#ff3600" />
    </linearGradient>
  </defs>
  <filter id="shadow">
    <feDropShadow dx="-4" dy="4" stdDeviation="1" flood-color="black" flood-opacity="0.5"/>
    <feDropShadow dx="3" dy="2" stdDeviation="2" flood-color="black" flood-opacity="0.5"/>
    <feDropShadow dx="-1" dy="-2" stdDeviation="1" flood-color="black" flood-opacity="0.5"/>
    <feDropShadow dx="2" dy="6" stdDeviation="3" flood-color="black" flood-opacity="0.5"/>
  </filter>
  <text x="10" y="50" font-family="Rubik Mono One" font-size="40" fill="url(#gradient)">
    <tspan filter="url(#shadow)">Ends in 7 Days</tspan>
  </text>
</svg>
```

The nice thing here is there’s only one place to change the text, and the text remains selectable and accessible like any other web text. Do note that *wrapping* SVG `<text>` isn’t particularly well supported and probably best to avoid.

---

## Other Examples in the Wild

I did find this quick shot of gradient text and text shadow a nice reference of types of effects:

<CodePen
  user="1Marc"
  slug-hash="vMavPr"
  title="A quick shot of gradient text and text-shadow"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Finally, Ana Tudor has some wild CodePens blending tons of SVG Filters together to make wild text effects:

<CodePen
  user="1Marc"
  slug-hash="gONbppb"
  title="No image dusty SVG filter effect"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Have fun!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Gradient Text with a Drop Shadow",
  "desc": "Gradient text is pretty easy to do these days with `background-clip: text;` — but it kills your ability to use `text-shadow`. SVG to the rescue. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/gradient-text-with-a-drop-shadow.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
