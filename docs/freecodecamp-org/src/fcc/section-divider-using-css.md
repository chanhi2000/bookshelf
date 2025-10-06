---
lang: en-US
title: "How to Create a Section Divider Using CSS"
description: "Article(s) > How to Create a Section Divider Using CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Section Divider Using CSS"
    - property: og:description
      content: "How to Create a Section Divider Using CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/section-divider-using-css.html
prev: /programming/css/articles/README.md
date: 2022-02-26
isOriginal: false
author: Temani Afif
cover: https://freecodecamp.org/news/content/images/2022/02/section-divider.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Section Divider Using CSS"
  desc="It's always cool to have a fancy section divider on your website. And it's even better if we can make them responsive and easy to adjust. This is what you will learn in this article. We will explore different section dividers made using only CSS and ..."
  url="https://freecodecamp.org/news/section-divider-using-css"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/02/section-divider.png"/>

It's always cool to have a fancy section divider on your website. And it's even better if we can make them responsive and easy to adjust. This is what you will learn in this article.

We will explore different section dividers made using only CSS and some optimized code that's easy to manipulate.

Here's an example of section dividers in action:

![Overview of 2 sections Dividers applied to the FreeCodeCamp header](https://freecodecamp.org/news/content/images/2022/02/image-90.png)

Before we dig into the technical part, I have created an [<VPIcon icon="fas fa-globe"/>online generator](https://css-generators.com/section-divider/) for section dividers. All you have to do is to select your configuration and get the CSS code in no time.

Alright, I can hear saying: "Why a boring tutorial? I'll simply use the generator whenever I need it!"

Sure, you can do that - but it's always good to know what's happening under the hood so you understand the code you are using and so you're able to manually adjust it.

Then you'll be able to create your own personalized divider after understanding the ones I made!

So let's dive in and learn how it's done.

---

## How to Create a Slanted Divider for Your Website

![Illustration of a slanted divider](https://freecodecamp.org/news/content/images/2022/02/slanted-divider.png)

In the above figure, we have two elements separated with a slanted gap. To achieve this effect, we will cut a portion from each one. Let's look at a step-by-step illustration to better understand.

![A step-by-step illustration to create a slanted divider](https://freecodecamp.org/news/content/images/2022/02/image-81.png)

Initially, we have two elements placed above each other. We first start by cutting the bottom part of the top element (step (2)) using `clip-path` like below:

```css
clip-path: polygon(0 0,100% 0,100% 100%,0 calc(100% - 50px));
```

We have a four points path where we make the bottom left one a bit higher to create the cut effect. You can notice the use of `calc(100% - 50px)` instead of `100%`.

We do the same for the second element in step (3) using:

```css
clip-path: polygon(0 0,100% 50px,100% 100%,0 100%);
```

This time we are lowering the top right corner by the same amount of pixels (`50px` instead of `0`). If you are not familiar with `clip-path`, here is a figure to better see the points.

![Illustration of the clip-path points](https://freecodecamp.org/news/content/images/2022/02/image-82.png)

The points are nothing but x,y coordinates in a 2D space with the range `[0 100%]`. You can easily identify the four corners, and from there we can find any other points.

Finally, we add a negative `margin-top` to the second element to reduce the space and get a gap equal to `10px`. The final code will be:

```css
.top {
  clip-path: polygon(0 0,100% 0,100% 100%,0 calc(100% - 50px));
}
.bottom {
  clip-path: polygon(0 0,100% 50px,100% 100%,0 100%);
  margin-top: -40px;
}
```

That's the code you will get from the [<VPIcon icon="fas fa-globe"/>the online generator](https://css-generators.com/section-divider/) I made. We can improve it by introducing CSS variables:

```css
:root {
  --size: 50px; /* size of the cut */
  --gap: 10px;  /* the gap */
}
.top {
  clip-path: polygon(0 0,100% 0,100% 100%,0 calc(100% - var(--size)));
}
.bottom {
  clip-path: polygon(0 0,100% var(--size),100% 100%,0 100%);
  margin-top: calc(var(--gap) - var(--size));
}
```

As I said in the introduction, we have some simple code that's easy to adjust that produces a responsive section divider.

---

## How to Create a Full-Width Arrow Divider for Your Website

![Illustration of the full-width arrow divider](https://freecodecamp.org/news/content/images/2022/02/image-83.png)

This one is pretty similar to the previous divider. We will simply deal with more `clip-path` points.

![A step-by-step illustration to create a full width arrow divider](https://freecodecamp.org/news/content/images/2022/02/image-84.png)

I think you probably have the idea by now. We follow the same steps and we end with the following code:

```css
.top {
  clip-path: polygon(0 0,100% 0,100% calc(100% - 50px),50% 100%,0 calc(100% - 50px));
}
.bottom {
  clip-path: polygon(0 0,50% 50px,100% 0,100% 100%,0 100%);
  margin-top: -40px;
}
```

And below is another illustration to understand the new points we are using for this section divider.

![Illustration of the clip-path points](https://freecodecamp.org/news/content/images/2022/02/image-85.png)

At first glance, it may look difficult but it's really pretty easy.

We are creating shapes by linking different points inside the 2D space of our element. The trick is to create 2 "puzzle shapes" (I just coined this term) to create the illusion of a section divider. With some practice, you can easily create your divider by following the same logic.

Before we move to the next one here is the code using CSS variables:

```css
:root {
  --size: 50px; /* size of the cut */
  --gap: 10px;  /* the gap */
}
.top {
  clip-path: polygon(0 0,100% 0,100% calc(100% - var(--size)),50% 100%,0 calc(100% - var(--size)));
}
.bottom {
  clip-path: polygon(0 0,50% var(--size),100% 0,100% 100%,0 100%);
  margin-top: calc(var(--gap) - var(--size));
}
```

You can already see a pattern in the code of our dividers since we are using the same technique. Two `clip-path`, a negative `margin-top`, and two CSS variables. As simple as that!

---

## How to Create an Arrow Divider for Your Website

![Illustration of the arrow divider](https://freecodecamp.org/news/content/images/2022/02/image-86.png)

This divider is a bit trickier than the previous ones because I will add another variable which is the angle of the arrow. The technique remains the same but we will have more math to calculate the coordinates of the points.

For this one, my [v<VPIcon icon="fas fa-globe"/>online generator](https://css-generators.com/section-divider/) will be very useful (especially if you're not comfortable with math formulas) so you can easily get the final values without trouble.

For the curious ones, here is the generic code:

```css
:root {
  --size: 50px;   /* size of the cut */
  --gap: 10px;    /* the gap */
  --angle: 90deg; /* angle of the arrow */
}
.top {
  clip-path: polygon(0 0,100% 0,100% calc(100% - var(--size)),calc(50% + tan(var(--angle)/2)*var(--size)) calc(100% - var(--size)),50% 100%,calc(50% - tan(var(--angle)/2)*var(--size)) calc(100% - var(--size)),0 calc(100% - var(--size)));
}
.bottom {
  clip-path: polygon(0 0,calc(50% - tan((180deg - var(--angle))/4)*var(--gap) - tan(var(--angle)/2)*var(--size)) 0,50% calc(var(--size) + (1/sin(var(--angle)/2) - 1)*var(--gap)),calc(50% + tan((180deg - var(--angle))/4)*var(--gap) + tan(var(--angle)/2)*var(--size)) 0,100% 0,100% 100%,0 100%);
  margin-top: calc(var(--gap) - var(--size));
}
```

I can hear you screaming seeing this, but don't worry if you don't fully understand it. I am still creating different shapes using `clip-path` but this time the calculation is a bit more complex.

The above is valid CSS code but at the time of writing this, there is no support for trigonometric functions so it won't work in any browser. Either you calculate the values manually or use [<VPIcon icon="fas fa-globe"/>the online generator](https://css-generators.com/section-divider/) to get the `clip-path` values.

Until now, we have made 3 different dividers using the same technique. Each time we consider a new shape by playing with the `clip-path` values. You can create any divider using the same technique, and the combinations are unlimited. The only limit is your imagination.

It's a good exercise to get familiar with `clip-path`. What I recommend is using a pen and paper to draw the shape you have in mind. You identify the different points of your shape. Then you convert them into `clip-path` values.

You can find a lot of online tools that can help you. My favorite one is:

https://bennettfeely.com/clippy/

```component VPCard
{
  "title": "Clippy — CSS clip-path maker",
  "desc": "",
  "link": "https://bennettfeely.com/clippy/",
  "logo": "https://bennettfeely.com/clippy/pics/favicon.png",
  "background": "rgba(241,241,236,0.2)"
}
```

---

## How to Create a Rounded Divider for Your Website

![Illustration of the rounded divider](https://freecodecamp.org/news/content/images/2022/02/image-87.png)

For this divider, we are going to use `mask` instead of `clip-path`. The difference between `clip-path` and `mask` is that `mask` relies on images to cut/hide parts of an element. When talking about images we also talk about gradients.

Here is an illustration to understand what kind of gradients we need:

![Illustration of the gradients used with the mask property](https://freecodecamp.org/news/content/images/2022/02/image-89.png)

For the first element, we need two gradients: a `linear-gradient()` to create a rectangular shape at the top, leaving a space at the bottom, and a `radial-gradient()` to create a circle placed at the bottom. Both of them combined will give us the final shape for the first element.

The second element needs only one `radial-gradient()` to create a hole at the top to complete the puzzle.

Our code will be:

```css
.top {
  mask: 
    linear-gradient(#000 0 0) top/100% calc(100% - 50px) no-repeat,
    radial-gradient(farthest-side,#000 98%,#0000) bottom/100px 100px no-repeat;
}
.bottom {
  mask: radial-gradient(60px at 50% -10px,#0000 98%,#000);
  margin-top: -40px;
}
```

And with CSS variables it will be:

```css
:root {
  --size: 50px; /* size of the cut */
  --gap: 10px;  /* the gap */
}
.top {
  mask: 
    linear-gradient(#000 0 0) top/100% calc(100% - var(--size)) no-repeat,
    radial-gradient(farthest-side,#000 98%,#0000) bottom/calc(2*var(--size)) calc(2*var(--size)) no-repeat;
}
.bottom {
  mask: radial-gradient(calc(var(--gap) + var(--size)) at 50% calc(-1*var(--gap)),#0000 98%,#000);
  margin-top: calc(var(--gap) - var(--size));
}
```

Even with the mask method, the code pattern is still the same as the one using clip-path.

---

## Wrapping up

Now, in addition to having a [<VPIcon icon="fas fa-globe"/>cool online generator for section dividers](https://css-generators.com/section-divider/), you also know the secret behind creating them.

You may have noticed in the generator that each divider comes with 2 directions but I only explained one for each divider. I did this on purpose to let you try to understand what values we need to update to get the opposite direction. You can do it - it's not difficult and you will learn a lot by doing it.

I will be releasing more generators in the future so bookmark this link: [<VPIcon icon="fas fa-globe"/>css-generators.com](https://css-generators.com/) and follow me [on X (<VPIcon icon="fa-brands fa-x-twitter"/>`ChallengesCss`)](https://x.com/ChallengesCss) to not miss them.

Thank you for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Section Divider Using CSS",
  "desc": "It's always cool to have a fancy section divider on your website. And it's even better if we can make them responsive and easy to adjust. This is what you will learn in this article. We will explore different section dividers made using only CSS and ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/section-divider-using-css.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
