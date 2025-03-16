---
lang: en-US
title: "Chilled Out Text Underlines"
description: "Article(s) > Chilled Out Text Underlines"
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
      content: "Article(s) > Chilled Out Text Underlines"
    - property: og:description
      content: "Chilled Out Text Underlines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/chilled-out-text-underlines.html
prev: /programming/css/articles/README.md
date: 2025-03-12
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5316
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
  name="Chilled Out Text Underlines"
  desc="Blue links with underlines is a good default style for links in body text, but it's a bit intense. Maybe we can chill it out a bit and be a bit more flexible. "
  url="https://frontendmasters.com/blog/chilled-out-text-underlines/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5316"/>

I sometimes struggle with what the perfect look for a link within body text should look like. It needs to be clearly a link, but also not styled so intensely it distracts from reading a paragraph. I *generally* like the idea that links are blue and underlined, as that’s as close to a default familiar look as we have for links, but I’m flexible. Links that are a “brand” color and distinct from the text color seem fine to me, particularly if also underlined.

Here’s how links look with entirely default styles:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-12-at-11.29.57%E2%80%AFAM.png?resize=836%2C254&ssl=1)

Me, I think that look is a bit intense. I think it can be improved by keeping the spirit of what is going on there but chilling it out a bit.

---

## Nudge the Underline Away

I think the characters are a bit more legible if we move that underline away a little. Let’s make the font `system-ui` and kick that underline away a smidge:

```css
a {
  text-underline-offset: 2px;
}
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-12-at-11.32.12%E2%80%AFAM.png?resize=844%2C380&ssl=1)

I think that’s broadly better, regardless of `font-family`, `line-height`, etc.

---

## Add Opacity to the Underline

This is the part that chills the link style out the most, while still reading strongly as a link. We’ve got `text-decoration-color` to use for this, which we can just apply a chilled out color directly. But we can be a bit smarter!

- Rather than setting a 2nd static color, let’s leverage the `currentColor`. That way it’s not yet-another-color we have to manage.
- Let’s use this alteration for our `:hover` and `:focus` styles, which can be another hard choice!

The [**relative color syntax**](/frontendmasters.com/relative-color-syntax-basic-use-cases.md) would be cool here, but full cross-browser support is a smidge away on that yet, so let’s use the [<FontIcon icon="fas fa-globe"/>better-supported](https://caniuse.com/mdn-css_types_color_color-mix) `color-mix()` instead.

For a smidge of [<FontIcon icon="fas fa-globe"/>extra trickery](https://bsky.app/profile/anatudor.bsky.social/post/3lk52ep2lvs25) we’ll only apply the opacity underline when the link is “not” hovered or focused, meaning when it is that will be removed:

```css
a:not(:is(:hover, :focus)) {
  text-decoration-color: 
    color-mix(in srgb, currentColor, transparent 75%);
}
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-12-at-11.40.25%E2%80%AFAM.png?resize=838%2C380&ssl=1)

---

## Color Away!

By using `currentColor` it means that whatever color the links are, we get this chilled out style that comes along for the ride no matter what.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-12-at-11.42.01%E2%80%AFAM.png?resize=830%2C386&ssl=1)

Possibly a decent candidate for a default stylesheet.

Is all this accessible? My guess is that as long as the color of the link has enough contrast against the background, and the keyboard focus styles are strong, it’s fine. But if I’m wrong feel free to correct me here.

---

## Demo

<CodePen
  user="chriscoyier"
  slug-hash="mydqdPN"
  title="Chilled Out Text Underlines"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Chilled Out Text Underlines",
  "desc": "Blue links with underlines is a good default style for links in body text, but it's a bit intense. Maybe we can chill it out a bit and be a bit more flexible. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/chilled-out-text-underlines.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
