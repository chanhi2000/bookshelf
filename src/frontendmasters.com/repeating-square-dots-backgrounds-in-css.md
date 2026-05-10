---
lang: en-US
title: "Repeating Square Dots Backgrounds in CSS"
description: "Article(s) > Repeating Square Dots Backgrounds in CSS"
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
      content: "Article(s) > Repeating Square Dots Backgrounds in CSS"
    - property: og:description
      content: "Repeating Square Dots Backgrounds in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/repeating-square-dots-backgrounds-in-css.html
prev: /programming/css/articles/README.md
date: 2026-05-12
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9617
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
  name="Repeating Square Dots Backgrounds in CSS"
  desc="We look at a couple of ways to essentially draw a little square dot in a slightly larger area and let it repeat, giving us a nice dotted background effect."
  url="https://frontendmasters.com/blog/repeating-square-dots-backgrounds-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9617"/>

I saw this reasonable ask for help the other day.

::: info Pawel Grzybek (<VPIcon icon="fa-brands fa-mastadon"/>`@pawelgrzybek`) *from Mastadon*

Hey all CSS wizards. I need your help.

I would love this bg pattern to be squares instead of little circles (radial-gradient). Is that even possible using pure CSS?

<CodePen
  user="pawelgrzybek"
  slug-hash="OPbVNgN"
  title="bg dot pattern"
  :default-tab="['css','result']"
  :theme="dark"/>

I have seen that on the ATProto website, but they use SVG for it.

<SiteInfo
  name="AT Protocol"
  desc="Building the Social Internet."
  url="https://atproto.com"
  logo="https://atproto.com/favicon.ico"
  preview="https://atproto.com/default-social-card.png"/>

[<VPIcon icon="fa-brands fa-mastadon"/>`@kevinpowell`](https://mastodon.social/@kevinpowell@front-end.social) [<VPIcon icon="fa-brands fa-mastadon"/>`@css`](https://front-end.social/@css) [<VPIcon icon="fa-brands fa-mastadon"/>`@bramus`](https://front-end.social/@bramus) [<VPIcon icon="fa-brands fa-mastadon"/>`@chriscoyier`](https://front-end.social/@chriscoyier) 🙏

```component VPCard
{
  "title": "Paweł Grzybek (@pawelgrzybek@mastodon.social)",
  "desc": "Hey all CSS wizards. I need your help. ...",
  "link": "https://mastodon.social/@pawelgrzybek/116510590035197395/",
  "logo": "https://mastodon.social/packs/assets/favicon-48x48-DMnduFKh.png",
  "background": "rgba(86,56,204,0.2)"
}
```

:::

Note that the example above has little *circular* dots, and what Paweł is asking about are little *square* dots. This is the example look from atproto.com:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/Screenshot-2026-05-12-at-7.58.48-AM.png?resize=1024%2C361&ssl=1)

---

## Repeating a Small Area

My first thought is we’re obviously not drawing all these dots in one big graphic. We’re drawing one, leaving empty space, and using our ol’ pal `background-repeat: repeat;`

In order for the repeating to work, we need to define a smaller space via `background-size`. So let’s say it’s…

```css
html {
  background-size: 100px 100px;
  background-repeat: repeat;
}
```

Now we’ve got a 100px square that will repeat over the entire background. We just need to fill that 100px square with a *smaller* square that repeats.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/repeating-dots.png?resize=1024%2C614&ssl=1)

---

## Drawing the Square Dot

Again my first thought was that we could make it *look* like we’re drawing a small square dot by actually letting a `background-color` show through and covering up everywhere else. So like a three-layer system:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/layers.png?resize=1024%2C512&ssl=1)

```css
html {
  background: 
    linear-gradient(to bottom, transparent 10px, white 10px),
    linear-gradient(to right, transparent 10px, white 10px),
    black;
}
```

If we flatten out that visual, you can see the three shapes smoosh down into a small square, which we then repeat.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/square.png?resize=1024%2C512&ssl=1)

That’s what’s going on here exactly:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019e0546-e9bf-7593-85ff-795f9e678a77"
  title="Dot Backgrounds"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Uh Oh — Transparency?

The problem with the above is that we need a solid color to be the “mask” that covers all the area except the mask. This means we can’t have, for example, one big image behind the dots or a gradient or anything (without more exotic trickery). The problem is we don’t have proper transparency.

What we want to be doing is drawing the dot with one “gradient”, if we can, and leaving the rest of the area empty/transparent.

---

## Enter Conic Gradients

I didn’t think of this! [Eric Meyer had the clever idea (<VPIcon icon="fa-brands fa-mastadon"/>`@Meyerweb`)](https://mastodon.social/@Meyerweb/116510694762069077). The idea is that you can use `conic-gradient` to describe what we want in one go. “Hard stop” color stops are in use here, the classic trick to make a gradient just bands of solid color, not actually gradients. But in this case, three-quarters of the area is transparent, and the last bit is the dot color.

```css
html {
  background-image: 
    conic-gradient(
      from 0deg at 5px 5px, 
      transparent 75%, black 75% 100%
    );
}
```

This took me a sec to understand, but it’s essentially setting the center of the conic gradient at a specific spot, then forcing most of the way around to be transparent and leaving the last bit as the dot.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/CleanShot-2026-05-12-at-09.12.40%402x.png?resize=1024%2C510&ssl=1)

Then we use the same concept as before where we set a smaller `background-size` and let it naturally repeat, and we’ve got square dots with a transparent background!

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019e1cdc-4cbb-71ae-9a94-be2e0102a3b5"
  title="Dot Backgrounds (conic)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Repeating Square Dots Backgrounds in CSS",
  "desc": "We look at a couple of ways to essentially draw a little square dot in a slightly larger area and let it repeat, giving us a nice dotted background effect.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/repeating-square-dots-backgrounds-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
