---
lang: en-US
title: "Dark mode and variable fonts"
description: "Article(s) > Dark mode and variable fonts"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Dark mode and variable fonts"
    - property: og:description
      content: "Dark mode and variable fonts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/dark-mode-and-variable-fonts.html
prev: /programming/css/articles/README.md
date: 2020-04-23
isOriginal: false
author:
  - name: Robin Rendle
    url : https://css-tricks.com/author/robinrendle/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/04/dark-light-text-backgrounds.png
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
  name="Dark mode and variable fonts"
  desc="Not so long ago, we wrote about dark mode in CSS and I’ve been thinking about how white text on a black background is pretty much always harder to read than"
  url="https://css-tricks.com/dark-mode-and-variable-fonts"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/04/dark-light-text-backgrounds.png"/>

Not so long ago, we wrote about [**dark mode in CSS**](/css-tricks.com/dark-modes-with-css.md) and I’ve been thinking about how white text on a black background is pretty much always harder to read than black text on a white background. After thinking about this for a while, I realized that we can fix that problem by making the text thinner in dark mode using variable fonts!

Here’s an example of the problem where I’m using the typeface [<VPIcon icon="fa-brands fa-google"/>Yanone Kaffeesatz](https://fonts.google.com/specimen/Yanone+Kaffeesatz?vfonly&selection.family=Yanone+Kaffeesatz:wght@453;469&sidebar.open) from Google Fonts. Notice that the section with white text on a black background looks heavier than the section with black text on a white background.

<CodePen
  user="anon"
  slug-hash="wvKwoQX"
  title="Font-weight light/dark test 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Oddly enough, these two bits of text are actually using the same `font-weight` value of `400`. But to my eye, the white text looks extra bold on a black background.

Stare at this example for a while. This is just how white text looks on a darker background; it’s how our eyes perceive shapes and color. And this might not be a big issue in some cases but reading light text on a dark background is always way more difficult for readers. And if we don’t take care designing text in a dark mode context, then it can feel as if the text is vibrating as we read it.

How do we fix this?

Well, this is where variable fonts come in! We can use a lighter font weight to make the text easier to read whenever dark mode is active:

```css
body {
  font-weight: 400;
}

@media (prefers-color-scheme: dark) {
  body {
    font-weight: 350;
  }
}
```

Here’s how that looks with this new example:

<CodePen
  user="anon"
  slug-hash="oNjvBpp"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

This is better! The two variants now look a lot more balanced to me.

Again, it’s only a small difference, but all great designs consist of micro adjustments like this. And I reckon that, if you’re already using variable fonts and loading all these weights, then you should definitely adjust the text so it’s easier to read.

This effect is easier to spot if we compare the differences between longer paragraphs of text. Here we go, this time in [<VPIcon icon="fa-brands fa-google"/>Literata](https://fonts.google.com/specimen/Literata?vfonly&selection.family=Literata:wght@400;562;700&sidebar.open):

<CodePen
  user="anon"
  slug-hash="wvKvmVZ"
  title="Font-weight light/dark test 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that the text on the right *feels* bolder, but it just isn’t. It’s simply an optical allusion — both examples above have a font-weight of 500. So to fix this issue we can do the same as the example above:

```css
body {
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  body {
    font-weight: 400;
  }
}
```

<CodePen
  user="anon"
  slug-hash="zYvOymL"
  title="Font weight test / side by side 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Again, it’s a slight change but it’s important because at these sizes every typographic improvement we make helps the reading experience.

---

## Oh and here’s a quick Google fonts tip!

Google Fonts lets you add a font to your website by adding a `<link>` in the `<head>` of the document, like this:

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Rosario:wght@515&display=swap" rel="stylesheet"> 
</head>
```

That’s using the Rosario typeface and adding a font-weight of `515` — that’s the bit in the code above that says `wght@515`. Even if this happens to be a variable font, only this font weight will be downloaded. If we try to do something like this though…

```css
body {
  font-weight: 400;
}
```

…nothing will happen! In fact, the font won’t load at all. Instead, we need to declare which range of font-weight values we want by doing the following:

```html
<link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@300..500&display=swap" rel="stylesheet">
```

This `@300..500` bit in the code above is what tells Google Fonts to download a font file with all the weights between `300` and `500`. Alternatively, adding a `;` between each weight will then only download weights `300` and `500` – so, for example, you can’t pick weight `301`:

```html
<link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@300;500&display=swap" rel="stylesheet">
```

It took me a few minutes to figure out what was going wrong and why the font wasn’t loading at all, so hopefully the Google Fonts team can make that a bit clearer with the embed codes in the future. Perhaps there should be an option or a toggle somewhere to select a range or specific weights (or maybe I just didn’t see it).

Either way, I think all this is why variable fonts can be so gosh darn helpful; they allow us to adjust text in ways that we’ve never been able to do before. So, yay for variable fonts!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Dark mode and variable fonts",
  "desc": "Not so long ago, we wrote about dark mode in CSS and I’ve been thinking about how white text on a black background is pretty much always harder to read than",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/dark-mode-and-variable-fonts.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
