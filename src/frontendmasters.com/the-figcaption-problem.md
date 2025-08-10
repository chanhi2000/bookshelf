---
lang: en-US
title: "The Figcaption Problem"
description: "Article(s) > The Figcaption Problem"
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
      content: "Article(s) > The Figcaption Problem"
    - property: og:description
      content: "The Figcaption Problem"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-figcaption-problem.html
prev: /programming/css/articles/README.md
date: 2025-07-24
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6532
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
  name="The Figcaption Problem"
  desc="When an image isn't "
  url="https://frontendmasters.com/blog/the-figcaption-problem/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6532"/>

There is this *problem* with this, when it comes to layout:

```html
<figure>
  <img src="image.jpg" alt="good description of image" />
  <figcaption>This is a pretty long caption that I want for the image. It's such a long bit of text that it's likely going to wrap in the layout.</figcaption>
</figure>
```

The problem isn’t with the HTML, that’s fine.

The problem is when the *image* is less wide than the *container* and we want the *figcaption* to only be as wide as the *image* is.

We want this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/browser.png?resize=1024%2C667&ssl=1)

We want that orange buddy. That’s the `<figure>` element sitting in the middle of this article, centered, with an `<img>` inside that isn’t the full width of the article, and a `<figcaption>` inside that wraps at the edges of the image.

**_How hard can that be?!_**

Well — it certainly is weird.

This all started with a post from Jeff Bridgforth that piqued my interest:

See, I’d run into this myself. On my own blog, I often post photos that are not the full width of the page and want to center them or float them to a side or something. **And the thing that limits the width of the `<figcaption>` is the parent `<figure>` itself, not the `<img>`. So how do you limit the `<figcaption>` width?**

On my own blog, I was just like *screw it* and set a `max-inline-size` on them.

![Me going, eh, screw it: `figcaption { max-inline-size: 300px; }`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-24-at-8.15.00-AM.png?resize=997%2C1024&ssl=1)

For the most part I chalked it up as a design decision that had kind of a cool look. But it still bugged me. Like the image above where the figcaption still ends up *wider* than the image.

There is a proper solution here.

Jeff was smart enough to [<FontIcon icon="fas fa-globe"/>blog the entire conversation and solutions that came out of his post](https://jeffbridgforth.com/having-figure-match-width-of-contained-image/). And frankly he did a good job and this blog post probably isn’t entirely necessary. But hey if it helps more people when they run into this, that’s cool.

Allow me to jump straight to the end and showcase the best solution, by Stephanie Eckles:

<CodePen
  user="5t3ph"
  slug-hash="JodpOOR"
  title="figure/figcaption issue"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There it is, the perfect solution here.

```css
figure {
  inline-size: fit-content;
  margin-inline: auto;
}
figcaption {
  contain: inline-size;
}

/* Probably in your reset stylesheet, which is good. */
img {
  max-width: 100%; 
}
```

---

## Wouldn’t you think you could just `min-content` the `<figure>`?

Like:

```css
figure {
  inline-size: min-content;
}
```

That’s what my brain does and I heard from others the same. The image would be the smallest content within the figure (otherwise it would be just a word), so the figure should kinda shrink-wrap around the image.

The thing is… *you can and it works*… unless… you use the classic reset stylesheet thing:

```css
img {
  max-width: 100%;
}
```

I’m a fan of this. It’s protection against a too-wide image busting out of a container. It’s a classic, and it’s important. This is more like reality, where `width` and `height` attributes are on the image, because that’s a best-practice for maintaining aspect ratio space as the image is loading.

```html
<img src="..." alt="..." width="4000" height="2000" />
```

```css
img {
  /* prevent blowouts */
  max-width: 100%;

  /* maintain aspect ratio */
  height: auto;

  /* opinionated, but removes line-height space below block images */
  display: block;
}
```

But if we do this, we’re essentially wiping away the intinstic size of the image and the `min-content` width becomes based on the `figcaption` instead and we get smashy-smashy thin time:

![Nope.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-24-at-9.57.51-AM.png?resize=1018%2C770&ssl=1)

What’s with mixing logical properties like `inline-size` in some places and non-logical properties like `max-width` in others? I’m a fan of almost *always* using logical properties, but for most images, even changing to a vertical writing mode shouldn’t rotate images, so properties like `width` make sense.

---

## The Best Tricks Are About Using The Images Intrinsic Size Instead Of The Figcaption

The core of the trick is:

```css
figcaption {
  contain: inline-size;
}
```

That says: *don’t factor in the figcaption in determining the intrinsic inline-size of the parent.*

There was a way to do this before, as Temani Afif pointed out, with weirder trickery:

```css
figcaption {
  inline-size: 0; /* or width */
  min-inline-size: 100%; */ or min-width */
}
```

---

## Combined Demos

<CodePen
  user="chriscoyier"
  slug-hash="QwjENQj"
  title="Demo of figure/figcaption Issues"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Video

While I was wrapping my mind around all this, I [popped on a stream (<FontIcon icon="fa-brands fa-twitch"/>chriscoyier)](https://twitch.tv/chriscoyier) to do it. This isn’t like a straightforward tutorial, it’s the exploratory poking around and trying stuff that lead to my own better understanding (and the demos and this blog post).

<VidStack src="youtube/Tsumy1v3zk4" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Figcaption Problem",
  "desc": "When an image isn't ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-figcaption-problem.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
