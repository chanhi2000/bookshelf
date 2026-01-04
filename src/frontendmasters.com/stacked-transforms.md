---
lang: en-US
title: "Stacked Transforms"
description: "Article(s) > Stacked Transforms"
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
      content: "Article(s) > Stacked Transforms"
    - property: og:description
      content: "Stacked Transforms"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/stacked-transforms.html
prev: /programming/css/articles/README.md
date: 2025-07-15
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6457
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
  name="Stacked Transforms"
  desc="A look at what happens when you add a whole list of transforms to an element, and how that interacts with `animation-composition`. "
  url="https://frontendmasters.com/blog/stacked-transforms/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6457"/>

I think the best way for me to show you what I want to show you is to make this blog post a bit like a story. So I’m gonna do that.

So I’m at [<VPIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/) in Amsterdam this past month, and there was a lovely side event called [<VPIcon icon="fas fa-globe"/>CSS Café](https://css.cafe/). I’m 90% sure it was during a talk by Johannes Odland and a coworker of his at[<VPIcon icon="fas fa-globe"/>NRK](https://nrk.no/)(whose name I embarrassingly cannot remember) where they showed off something like an illustration of a buoy floating in the water with waves in front of it. Somehow, someway, the CSS property animation-composition was involved, and I was like *what the heck is that?* I took notes during the presentation, and my notes simply said “animation-composition”, which wasn’t exactly helpful.

I nearly forgot about it when I read Josh Comeau’s blog post [<VPIcon icon="fas fa-globe"/>Partial Keyframes](https://joshwcomeau.com/animation/partial-keyframes/), where he talks about “dynamic, composable CSS keyframes”, which, as I recall was similar to what Johannes was talking about. There is some interesting stuff in Josh’s post — I liked the stuff about comma-separating multiple animations — but alas, nothing about `animation-composition`.

So I figured I’d [<VPIcon icon="fa-brands fa-twitch"/>stream](https://twitch.tv/chriscoyier) about it, and so [<VPIcon icon="fa-brands fa-youtube"/>I did that](https://youtu.be/hL2FnCnVcb4), where I literally read the [<VPIcon icon="fa-brands fa-firefox" />`animation-composition` docs on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition) and played with things. I found their basic/weird demo intriguing and learned from that. Say you’ve got a *thing* and it’s got some transfoms already on it:

```css
.thing {
  transform: translateX(50px) rotate(20deg);
}
```

Then you put a `@keyframes` animation on it also:

```css
.thing {
  transform: translateX(50px) rotate(20deg);
  animation: doAnimation 5s infinite alternate;
}

@keyframes doAnimation {
  from {
    transform: translateX(0)
  }
  to {
    transform: translateX(100px)
  }
}
```

::: note Pop quiz

what is the `translateX()` value going to be at the beginning of that animation?

:::

It’s not a trick question. If you intuition tells you that it’s going to be `translateX(0)`, you’re right. The “new” `transform` in the `@keyframes` is going to “wipe out” any existing `transform` on that element and replace it with what is described in the `@keyframes` animation.

That’s because the default behavior is `animation-composition: replace;`. It’s a perfectly fine default and likely what you’re used to doing.

But there are other possible values for `animation-composition` that behave differently, and we’ll look at those in a second. But first, the fact that `transform` can take a “space-separated” list of values is already kind of interesting. When you do `transform: translateX(50px) rotate(20deg);`, *both* of those values are going to apply. That’s also relatively intuitive once you know it’s possible.

What is less intuitive but very interesting is that you can keep going with more space-separated values, even *repeating* ones that are already there. And there I definitely learned something! Say we tack on another `translateX()` value onto it:

```css
.thing {
  transform: translateX(50px) rotate(20deg) translateX(50px);
}
```

My brain goes: *oh, it’s probably basically the same as* `translateX(100px) rotate(20deg);`. But that’s not true. The transforms apply *one at a time, and in order.* So what actually happens is:

![Illustration depicting three rectangles with arrows indicating movement and rotation, labeled with numbers 1, 2, and 3, on a dotted background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-15-at-10.54.15%E2%80%AFAM.png?resize=1024%2C900&ssl=1)

I’m starting to get this in my head, so I streamed [<VPIcon icon="fa-brands fa-youtube"/>again the next day](https://youtu.be/5HCMskfZf4U) and put it to work.

What popped into my head was a computer language called [<VPIcon icon="fa-brands fa-wikipedia-w"/>Logo](https://en.wikipedia.org/wiki/Logo_(programming_language)) that I played with as a kid in elementary school. Just look at the main image from [<VPIcon icon="fa-brands fa-wikipedia-w"/>the Wikipedia page](https://en.wikipedia.org/wiki/Logo_(programming_language)). And the homepage of [<VPIcon icon="fas fa-file-pdf"/>the manual](https://frontendmasters.com/blog/wp-content/uploads/2025/07/lego-tc-logo-teaching-the-turtle_text.pdf) is very nostoligic for me.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/KochTurtleAnim.gif?resize=400%2C300&ssl=1)

![Cover of the LEGO TC logo book titled 'Teaching the Turtle,' featuring a blue and red LEGO robotic structure on a baseplate with a computer in the background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-15-at-12.44.50%E2%80%AFPM.png?resize=727%2C1024&ssl=1)

We can totally make a “turtle” move like that.

All I did here is put a couple of buttons on the page that append more `transform` values to this turtle element. And sure enough, it moves around just like the turtle of my childhood.

<CodePen
  user="chriscoyier"
  slug-hash="RNPmRWP"
  title="Mr. Turtle the Multi-Transform Hero"
  :default-tab="['css','result']"
  :theme="dark"/>

But Mr. Turtle there doesn’t really have anything to do with `animation-composition`, which was the origin of this whole story. But it’s sets up understanding what *happens* with `animation-composition`. Remember this setup?

```css
.thing {
  transform: translateX(50px) rotate(20deg);
  animation: doAnimation 5s infinite alternate;
}

@keyframes doAnimation {
  from {
    transform: translateX(0)
  }
  to {
    transform: translateX(100px)
  }
}
```

The big question is: **what happens to the `transform` that is already on the element when the `@keyframes` run?**

If we add `animation-composition: add;` it adds what is going on in the `@keyframes` to what is already there, by appending to the end of the list, as it were.

```css{4}
.thing {
  transform: translateX(50px) rotate(20deg);
  animation: doAnimation 5s infinite alternate;
  animation-composition: add;
}

@keyframes doAnimation {
  from {
    transform: translateX(0);
    /* starts as if: 
       transform: translateX(50px) rotate(20deg) translateX(0); */
  }
  to {
    transform: translateX(100px);
    /* ends as if:
      transform: translateX(50px) rotate(20deg) translateX(100px); */
  }
}
```

If we did `animation-composition: accumulate;` it’s slightly different behavior. Rather than appending to the list of space-separated values, it increments the values if it finds a match.

```css{4}
.thing {
  transform: translateX(50px) rotate(20deg);
  animation: doAnimation 5s infinite alternate;
  animation-composition: accumulate;
}

@keyframes doAnimation {
  from {
    transform: translateX(0);
    /* starts as if: 
       transform: translateX(50px) rotate(20deg); */
  }
  to {
    transform: translateX(100px);
    /* ends as if:
      transform: translateX(150px) rotate(20deg) */
  }
}
```

It’s not *just* `transform` that behave this way, I just found it a useful way to grok it. (Which is also why I had space-separated `filter` [**on the mind**](/frontendmasters.com/blur1px-blur1px.md).) For instance, if a `@keyframes` was adjusting opacity and we used `add` or `accumulate`, it would only ever *increase* an opacity value.

```css{12}
.thing {
  opacity: .5;
  
  transform: translateX(50px) rotate(20deg);
  animation: doAnimation 2s infinite alternate;
  animation-composition: add;
}

@keyframes doAnimation {
  from {
    opacity: 0;
    /* thing would never actually be 0 opacity, it would start at 0.5 and go up */
  }
  to {
    opacity: 1;
  }
}
```

So that’s that! Understanding how “stacked” transforms works is very interesting to me and I have a feeling will come in useful someday. And I feel the same way about `animation-composition`. You won’t need it until you need it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stacked Transforms",
  "desc": "A look at what happens when you add a whole list of transforms to an element, and how that interacts with `animation-composition`. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/stacked-transforms.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
