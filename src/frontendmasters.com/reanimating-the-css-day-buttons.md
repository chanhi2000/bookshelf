---
lang: en-US
title: "Reanimating the CSS Day Buttons"
description: "Article(s) > Reanimating the CSS Day Buttons"
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
      content: "Article(s) > Reanimating the CSS Day Buttons"
    - property: og:description
      content: "Reanimating the CSS Day Buttons"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/reanimating-the-css-day-buttons.html
prev: /programming/css/articles/README.md
date: 2025-03-31
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5489
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
  name="Reanimating the CSS Day Buttons"
  desc="These buttons animate from a square to an arrow, and we look at three different ways to do it, each with their own upsides. "
  url="https://frontendmasters.com/blog/reanimating-the-css-day-buttons/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5489"/>

Are you as excited about [<FontIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/) as I am? While browsing the conference website, I couldn’t help but notice their big firebrick-red buttons. A website isn’t just about displaying content, it’s about creating excitement. Every interaction should feel polished and engaging, especially buttons, which are the primary way users navigate the site.

A well-animated button can capture attention, reinforce branding, and make the experience more enjoyable. In this article, we’ll take a closer look at the existing buttons and explore ways to enhance them with modern CSS techniques.

First, here is a version of the button that is currently on the website. Hover over the button to see its shape change.

<CodePen
  user="amit_sheen"
  slug-hash="WbNyQYm"
  title="CSS Day buttons (01)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The `a` element is wrapped with a `div` that has a solid background color, and the `hover` effect sets the `div`‘s background to `transparent`, revealing the `a`‘s arrow shape, created using a `clip-path`. The transition between the states (the ‘fade’ of the background) creates weird looking triangles.

I think that we can improve on that by using some movement and dynamics.

---

## Approach 1: Background Image Animations

One simple-yet-effective way to add flair to buttons is by animating a `background-image`. Well, we’re not really animating the image, but we can achieve a smooth transition effect that feels dynamic by animating the `background-position` property.

Here is a button that uses a linear transition on the `background-position`:

```css{9}
button {
  border: 2px solid firebrick;
  background: linear-gradient(120deg, white 50%, firebrick 0) 0 0/ 250% 100%;
  color: firebrick;
  padding: 0.6em 1em 0.7em;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-position-x: 100%;
    color: white;
  }
}

```

In this example the background stretches the gradient horizontally to 2.5 times the width of the button, and the background’s position changes from `0%` to `100%`. to better understand this effect, you can use the ‘Visualize background’ checkbox.

<CodePen
  user="amit_sheen"
  slug-hash="bNGKVox"
  title="CSS Day buttons (02)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

So how do you use `background-position` to create the arrow-shaped hover effect? We’ll actually need to layer two backgrounds and control both positions. Here’s how:

<CodePen
  user="amit_sheen"
  slug-hash="XJWYmod"
  title="CSS Day buttons (03)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The pointed shape is created using two simple `conic-gradients`, and again, the background stretches each gradient to 2.5 times the width of the button, so we can set the `background-position` to bring the center of these conics in and out of view.

This method can actually be quite powerful and is great for many applications. And while I love using (and animating) background gradients, maybe for this specific use case it’s not the best option. So let’s try something else…

---

## Approach 2: Clip-Path Transition

Another way to animate shapes in CSS is by using clipping, allowing us to create unique shapes and transitions. In our case, the buttons already have a `clip-path` property, so let’s use it. We’ll set it to the `hover` state, and ‘reset’ the `polygon` on idle.

```.css{7,11}
button {
  display: block;
  border: none;
  background: var(--yearColour);
  color: white;
  padding: 0.6em 1em 0.7em;
  clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%);
  cursor: pointer;
  transition: clip-path 0.5s;
  &:hover {
    clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%);
  }
}

```

::: note

Note that in order to transition the movement, **the number of nodes** in the `polygon` shapes must be the same.

:::

This approach already looks nice, but I think we can do better.

When working with `clip-path` (and clipping in general) you need to remember that the clipping is inwards, removing parts of your elements, and you can’t overflow anything outside the clipped area. If we do want to expand outward from our element, we need to first expend the element itself, and then adjust the clipping.

```css{6-7}
.button-v2 {
  display: block;
  border: none;
  background: var(--yearColour);
  color: white;
  padding: 0.6em 1.3em 0.7em;
  clip-path: polygon(2.5% 0%, 97.5% 0%, 97.5% 50%, 97.5% 100%, 2.5% 100%, 2.5% 50%);
  cursor: pointer;
  transition: clip-path 0.5s;
  
  &:hover {
    clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%);
  }
}
```

In the above example I’ve increased the inline `padding`, making the element wider, then adjusted the idle state of the `polygon` to remove the added width. Now the clipping is not just inward, but also expands out, which not only creates a more dynamic effect but also reduces the risk of cutting into the button’s content.

Here is a live demo of the two versions, In my opinion, this second shape looks slightly better overall. Which one do you like?

<CodePen
  user="amit_sheen"
  slug-hash="JojZGYy"
  title="CSS Day buttons (04)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Solving the Challenge of the Dotted Button

While the previous techniques work well for solid buttons, the CSS Day website also has a dotted-style button. These require a different approach, since `background-image` and `clip-path` alone don’t handle dotted outlines effectively.

---

## Approach 3: Pseudo-Elements and Transforms

Somehow, whenever there’s an animation or interaction that feels tricky to implement, it often turns out that pseudo-elements (e.g. `::before` and `::after`) are the solution. They’re like the hidden superpower of every element, allowing us to do some really cool things.

In this case, we can achieve a clean and elegant solution using pseudo-elements. The idea is pretty straightforward: ensure each pseudo-element spans the full width of the button and half the height. We place one element at the top of the button and the second at the bottom. Then, on hover, we apply a skew transformation to the elements. Simple enough? Here’s a live demo:

<CodePen
  user="amit_sheen"
  slug-hash="QwWxdbx"
  title="CSS Day buttons (05)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Let’s break down what we added:

- We applied `position: relative;` to the button as we’re going to position the pseudo-elements using `position: absolute`.
- For the pseudo-elements, we started with shared styling: positioning, size, color, `z-index`, and of course, a `transition` so everything moves smoothly.
- The `::before` pseudo-element is placed at `top: 0;` to serve as the background for the top half of the button, and the `::after` pseudo-element is positioned at `bottom: 0;` to cover the bottom half.
- We added a `transform` with a simple `skew` function along the X-axis, and used `calc` to adjust the direction of the skew in the `::after` element so the skew effects are applied in two different directions.
- The last thing we added is a `hover` state that defines the desired skew angle, transforming the button into an arrow shape.

So how do pseudo-elements help us solve the dotted button challenge? It’s simple: all we need to do is change the text color of the button and the background color of the pseudo-elements, then apply a dotted border. The key is to ensure that the `::before` has a border on the sides and top, while the `::after` gets a border on the sides and bottom.

```css
.button.dotted {
  color: firebrick;

  &::before, &::after {
    background-color: white;
    border: dotted firebrick;
  }
  &::before {
    border-width: 2px 2px 0;
  }
  &::after {
    border-width: 0 2px 2px;
  }
}
```

That’s it. I’ve also added a version that changes the button color after the shape shifts on hover. Here are live examples of both versions:

<CodePen
  user="amit_sheen"
  slug-hash="OPJEWjv"
  title="CSS Day buttons (06)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Wrapping Up

We’ve reanimated the CSS Day 2025 buttons by experimenting with different CSS techniques:

1. **Background-image animations** for smooth gradient transitions.
2. **Clip-path effects** for unique button shapes.
3. **Pseudo-elements** to create a dynamic dotted button effect.

Each approach offers distinct advantages (and some drawbacks), and it’s important to familiarize ourselves with various animation options so that we can choose the most suitable one for each case based on the design needs, the desired effect, and the button’s context

Want to take this further? Try incorporating CSS Variables for more flexibility or mixing in `@keyframes` for even more animation control. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reanimating the CSS Day Buttons",
  "desc": "These buttons animate from a square to an arrow, and we look at three different ways to do it, each with their own upsides. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/reanimating-the-css-day-buttons.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
