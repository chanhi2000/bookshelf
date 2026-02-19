---
lang: en-US
title: "CSS Border-Radius Can Do That?"
description: "Article(s) > CSS Border-Radius Can Do That?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - 9elements.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Border-Radius Can Do That?"
    - property: og:description
      content: "CSS Border-Radius Can Do That?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/9elements.com/css-border-radius-can-do-that.html
prev: /programming/css/articles/README.md
date: 2018-10-19
isOriginal: false
author:
  - name: Nils Binder
    url: https://9elements.com/blog/author/nils-binder
cover: https://datocms-assets.com/138996/1734423383-2e8mcskastwt5uwjzjiqxq-2432x843-1216w-fill-center.avif
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
  name="CSS Border-Radius Can Do That?"
  desc="Combining finest craftsmanship with elegant design to ship innovative digital experiences."
  url="https://9elements.com/blog/css-border-radius-can-do-that/"
  logo="https://9elements.com/assets/images/meta/favicon.svg"
  preview="https://datocms-assets.com/138996/1734423383-2e8mcskastwt5uwjzjiqxq-2432x843-1216w-fill-center.avif"/>

**How to create very cool effects with a rarely used feature.**

::: note TL/DR

When you use eight values specifying border-radius in CSS, you can create organic looking shapes. WOW. No time to read it all ?— we made a visual tool for you. [<VPIcon icon="fas fa-globe"/>Find it here](https://9elements.github.io/fancy-border-radius/)

<SiteInfo
  name="Fancy Border Radius Generator"
  desc="Generator to build organic shapes with CSS3 border-radius"
  url="https://9elements.github.io/fancy-border-radius//"
  logo="https://9elements.github.io/favicon-16x16.png"
  preview="https://9elements.github.io/fancy-border-radius/fancy-border-radius.png"/>

:::

---

## Introduction

During this year’s [Frontend Conference Zurich](https://frontendconf.ch/) [Rachel Andrew (<VPIcon icon="fa-brands fa-medium" />`@rachelandrew`)](https://medium.com/@rachelandrew)  talked about [<VPIcon icon="fa-brands fa-vimeo"/>Unlocking the Power of CSS Grid Layout](https://vimeo.com/287981360). At the end of her talk, she mentioned something about an old CSS property that got stuck in my head:

> “The Image is set round just by using the well-supported border-radius. Don’t forget that old CSS still exists and is useful. You don’t need to use something fancy for every effect.” — Rachel Andrew

Shortly after I heard this talk, I thought that you certainly could create more than just circles and started to dig deeper into what can be done using border-radius.

---

## Mastering border-radius

### Single value

Let’s start with the basics. Hope this will not bore you. You are probably familiar with CSS, and you also know border-radius. It is around for some years now, mostly used with a single value like this: `border-radius: 1em` and was maybe one of the most discussed/loved CSS3 features back in 2010 when [<VPIcon icon="fas fa-globe"/>css3please.com](http://css3please.com/) was your best friend.

Whenever you only use a single value, all corners are rounded by this value:

![a square with corners that are 30% rounded.](https://9elements.com/blog/css-border-radius-can-do-that/0KBqedE-Wt-320.webp)

As you can see in the example above, next to fixed length values like `px`, `rem` or `em` you can also use percentages. Those are mostly used to create a circle by setting border-radius to 50%. The percentage value is based on the width and height of the given element. So when you use it on a rectangle, you will no longer have symmetrical corners. Here’s an example showing the difference between `border-radius: 110px` and  `border-radius: 30%` applied to a rectangle.

![Notice that the corners on the right side are not symmetrical and keep that in mind. We’ll come back to this later](https://9elements.com/blog/css-border-radius-can-do-that/3io8xdW_1e-320.webp)

### Four different values

When you use more than one value, you start setting values for each corner, beginning in the top left corner and then moving clockwise. Again you can also use percentages, and you could also mix percentages with fixed-length values.

![](https://9elements.com/blog/css-border-radius-can-do-that/pjTWce8ymF-320.webp)

### Eight values separated by a slash (this is where it gets interesting)

I think most of you have already done everything I explained above. Now we get to the exciting part. What happens, if you separate values with a slash and specify up to eight values? Let’s see, what the spec says about that:

“If values are given before and after the slash, then the values before the slash set the horizontal radius and the values after the slash set the vertical radius. If there is no slash, then the values set both radii equally.” [<VPIcon icon="iconfont icon-w3c"/>W3C](https://w3.org/TR/css-backgrounds-3/#border-radius)

So, values before the slash are responsible for horizontal distances whereas values after the slash define the vertical lengths. But what does that mean? Remember percentage values on rectangular shapes? We had different absolute values for vertical and horizontal distances and asymmetrically rounded corners, and that is precisely what you get when you use the *slash syntax*.

So when you compare `border-radius: 4em 8em` to `border-radius: 4em / 8em` the results are quite different.

![The symmetrical corners on the left form quarter of a circle, whereas the asymmetrical corners on the right are part of an ellipsis.](https://9elements.com/blog/css-border-radius-can-do-that/O4IFZdQC9k-320.webp)

The shapes that you get with this look a little odd, to be honest. But remember the circles you create with `border-radius: 50%`. You get a circle because both values defining one side add up to 100% (50% + 50% = 100%) and there is no straight line left, that reminds you of the original square. If you apply the same logic to the full eight value border-radius syntax, you can create a shape that looks a little like a plectrum or an organic cell:

![](https://9elements.com/blog/css-border-radius-can-do-that/FNv4YIop2g-320.webp)

![In the end it is four overlapping ellipses that build the final shape. Easy ha!](https://9elements.com/blog/css-border-radius-can-do-that/uWBDCQ7HQg-320.webp)

::: note Don’t panic… we made a visual generator for you

It took me some time to get used to this syntax. Somehow it is not that intuitive. To make things a little easier for you, we built a little tool, that helps you create your very own organic shape.

<SiteInfo
  name="Fancy Border Radius Generator"
  desc="Generator to build organic shapes with CSS3 border-radius"
  url="https://9elements.github.io/fancy-border-radius//"
  logo="https://9elements.github.io/favicon-16x16.png"
  preview="https://9elements.github.io/fancy-border-radius/fancy-border-radius.png"/>

:::

---

---

## Do(n’t) Cross The Streams

Now that you know about the 8 values in total, you might feel a little sad, because our border-radius-tool doesn’t give you the option to set each value separately…Sit tight, here is the [<VPIcon icon="fas fa-globe"/>8-POINT-FULL-CONTROL](https://9elements.github.io/fancy-border-radius/full-control.html#10.10.10.10-90.90.90.90-.) version.

If you’re old enough, you might remember this [<VPIcon icon="fa-brands fa-youtube"/>quote](https://youtu.be/jyaLZHiJJnE) from the 1984s [<VPIcon icon="fas fa-globe"/>Ghostbusters](https://imdb.com/title/tt0087332/?ref_=nv_sr_2) movie:

“Don’t Cross The Streams.” — “Why?” — “It would be bad.”

There is something similar going on here: If you cross the handles on one side, the shape behaves…let’s say unpredictably. But [<VPIcon icon="fas fa-globe"/>see for yourself](https://9elements.github.io/fancy-border-radius/full-control.html#65.57.51.47-73.49.58.52-.), after all, it’s not going to end up in total protonic reversal or something, but don’t say, that I didn’t warn you.

::: note PS.

Many Thanks to [simurai (<VPIcon icon="fa-brands fa-medium" />`@simurai`)](https://medium.com/@simurai). Back in 2010, he created some [<VPIcon icon="fas fa-globe"/>CSS3 BonBon Buttons](http://simurai.com/archive/buttons/). Even though they look a little outdated, it is the only place I ever encountered and learned about the slash syntax.

:::

::: info See this cool feature in action.

![Photos by gratisography.com](https://9elements.com/blog/css-border-radius-can-do-that/zSbNAaEXw3-320.webp)

<CodePen
  user="enbee81"
  slug-hash="LBMKqV"
  title="border-radius"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Border-Radius Can Do That?",
  "desc": "Combining finest craftsmanship with elegant design to ship innovative digital experiences.",
  "link": "https://chanhi2000.github.io/bookshelf/9elements.com/css-border-radius-can-do-that.html",
  "logo": "https://9elements.com/assets/images/meta/favicon.svg",
  "background": "rgba(0,5,4,0.2)"
}
```
