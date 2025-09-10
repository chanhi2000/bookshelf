---
lang: en-US
title: "Guide to CSS animation for JavaScript developers"
description: "Article(s) > Guide to CSS animation for JavaScript developers"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Guide to CSS animation for JavaScript developers"
    - property: og:description
      content: "Guide to CSS animation for JavaScript developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-to-css-animation-for-javascript-developers.html
prev: /programming/css/articles/README.md
date: 2021-06-23
isOriginal: false
author:
  - name: Edidiong Asikpo
    url: https://blog.logrocket.com/author/edidiongasikpo/
cover: /assets/image/blog.logrocket.com/guide-to-css-animation-for-javascript-developers/banner.png
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
  name="Guide to CSS animation for JavaScript developers"
  desc="CSS animations can make memorable, interactive experiences for websites. Learn how to use them with JavaScript for better user experiences."
  url="https://blog.logrocket.com/guide-to-css-animation-for-javascript-developers"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/guide-to-css-animation-for-javascript-developers/banner.png"/>

It’s been well-documented that the human brain is hardwired for motion. Humans are more likely to pay attention to how elements move rather than focusing on static elements.

CSS animations take advantage of this human behavior. When animation is added to a website, it draws a user’s attention to important areas of a product, creating a lasting effect and generally enhancing experience.

In this post, we’ll review the benefits of CSS animations, different CSS animation properties, and different examples where JavaScript developers can use CSS animations to make websites more interactive and user-friendly.

Each of these examples will be accompanied by a Codepen demo and a detailed explanation to make the examples more realistic, practical, and informative.

---

## An overview of CSS animations

Before delving into understanding how to use CSS animation as a JavaScript developer, let’s quickly review what exactly CSS animation is, why you need to know it, and what impact it has on the look and feel of a website.

### What are CSS animations?

As the name implies, [<VPIcon icon="fa-brands fa-firefox"/>CSS animation allows users to animate some CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) by following a declarative pattern where users can specify what changes in the CSS property over a period of time.

CSS animations make it possible to animate transitions from one CSS style configuration to another.

### Why you should understand CSS animations

The web development ecosystem has moved to a point where [**JavaScript developers can’t avoid understanding and animating CSS**](/blog.logrocket.com/web-animation-with-html-css-and-javascript.md). A user interface without animation is like a video game without motion, and nobody likes playing text-only games anymore!

The need to build more interactive websites is answered with CSS animations.

### What is the positive impact of CSS animations on websites?

Have you ever looked at a website and wondered whether the page was loading or broken? This common experience can cause frustration for users encountering it.

By using CSS animations, developers can mitigate this frustration by adding a loading animation that signals to the user that something is happening, keeping them on the page longer.

When done well, animations can add valuable interaction, personality, and an appealing user experience to website interfaces.

> Animations can make UI elements resemble the real world, making them smoothly change while giving the feeling of continuity, action, and progress instead of changing in a blink of an eye. — [<VPIcon icon="fas fa-globe"/>Patrícia Silva, “How to Make CSS Animations”](https://imaginarycloud.com/blog/how-to-make-css-animations/)

---

## CSS animations explained

Animations consist of two components: a style describing the CSS animation and keyframes that indicate the sequence of the animation’s style.

Let’s break these two components down to understand them effectively.

### Styles describing CSS animations

For every animation you create, you must describe the characteristics of the animation. This gives you total control over deciding exactly what the animation can or cannot do.

Some examples of properties you can configure include the duration, direction, and number of times the animation repeats.

To describe the animation, you can use either the `animation` shorthand property or the `animation` sub-properties.

#### `Animation` shorthand property

The `animation` shorthand property is a shorthand for the eight `animation` sub-properties. It prevents you from wasting time typing the sub-property names and animates elements that require all eight sub-properties:

```css
/* Here’s the syntax of the animation shorthand property */
.element {
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
}
```

When you apply this code to an element, the `animation` shorthand property animates the element on the page with all eight sub-properties:

<CodePen
  user="edyasikpo"
  slug-hash="KKWyRyz"
  title="Animation shorthand property - CSS Animation Tutorial"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

#### `Animation` **sub-properties**

The eight sub-properties make up the actual `animation` shorthand property and configure the element’s animation in CSS. It becomes useful when you don’t want to use all the sub-properties simultaneously or when you forget the order of arrangement in the animation property:

```css
/* Here’s the syntax of the animation sub-properties. */
.element {
  animation-name: name;
  animation-duration: duration;
  animation-timing-function: timing-function;
  animation-delay: delay;
  animation-iteration-count: count;
  animation-direction: direction;
  animation-fill-mode: fill-mode;
  animation-play-state: play-state;
}
```

Again, when you apply the code to the element, it renders an animated square:

<CodePen
  user="edyasikpo"
  slug-hash="ZEeaoLp"
  title="Animation sub-properties - CSS Animation Tutorial"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Note that you can’t use the `animation` shorthand property and the `animation` sub-properties together because they produce the same thing. They should be used individually based on what you are trying to achieve.

You can learn more about [<VPIcon icon="fa-brands fa-firefox"/>each sub-property and its value in the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

As you move into keyframes, it is imperative to know that using styles to describe a CSS animation cannot work without keyframes indicating the animation’s sequence.

For example, the demo below includes the `animation-name`, `animation-duration`, and `animation-timing-function` sub-properties that should make the heartbeat.

However, you can’t see any animation on the heart because the `@keyframes` at-rule property is not configured yet:

---

## Using `@keyframe` to indicate an animation sequence

Keyframes describe how an animated element renders at a given time during the animation sequence. Since the animation’s timing is defined in the CSS style using the `animation` shorthand property or its sub-properties, keyframes use a percentage to indicate the animation sequence.

To use keyframes, create a `@keyframes` at-rule with the same name passed to the `animation-name` property. In the heartbeat demo, the `animation-name` is `heartbeat`, so you must name the `@keyframes` at-rule `heartbeat` as well.

Each `@keyframes` at-rule contains a style list of keyframe selectors, specifying percentages for the animation when the keyframe occurs, and a block containing the styles for that keyframe:

```css
@keyframes heartbeat {
  0% {
    transform: scale(1) rotate(-45deg);
  }

  20% {
    transform: scale(1.25) rotate(-45deg);
  }

  40% {
    transform: scale(1.5) rotate(-45deg);
  }
}
```

`0%` indicates the first moment of the animation sequence while `100%` indicates the final state of the animation.

Now that you understand `@keyframes`, let’s include it in the heart demo and see if anything changes:

As you can see, the heart is now beating!

When you added a CSS `@keyframes` at-rule to make the size of the heart scale from `0%` to `40%`, you set:

- 0% of the time to no transformation
- 20% of the time to scale the heart to 125% of its initial size through `scale(1.25)`
- 40% of the time to scale the heart 150% of its initial size through `scale(1.5)`

`rotate(-45deg)` was added to maintain the original direction of the heart you created with CSS.

---

## Animation examples for JavaScript developers

In this section, we’ll review two examples where JavaScript developers can use CSS animation to make websites more interactive and improve a user’s experience.

### Filling a form

Forms are components that are seen on almost every website. More often than not, filling in online forms can be tedious.

In this example, you will look at a login form and see how controlling the animation with JavaScript can make the website more interactive for the user. When a user tries to add their email address and password in the login form below, there’s no animation applied to the form:

While having a form without animation is totally fine, it is not visually appealing to the user and will most likely not catch their attention.

But in the animated login page below, the characters in the **Email** and **Password** fields move up simultaneously when the user starts to input their information:

While this is a subtle animation, it catches the attention of the user and improves their experience in the following ways:

- It signifies to the user that they’ve clicked on an input field
- The user is now aware they can start typing

This can create a more user-friendly environment that is memorable and eye-catching.

### Scrolling through a page

When a user scrolls through a website that isn’t animated, they can often miss important information.

Let’s scroll through two pages with a list of information, one with static elements and one with animated elements:

Because the animation brings the content from the left and the right in the second list, it can slow the users down to ensure they read each option, unlike the first page without the animation. It also helps users keep scrolling to the end to view all the information available to them.

That, my friend, is the power of adding animations to a website!

---

## Need some animation inspiration?

Here’s a list of five companies using CSS animation to create a better experience for their users. If you take a glance these websites, the interaction is engaging, keeping you scrolling to the end of the page or interacting with one of the CTAs on the page:

- [GitHub](https://github.com/)
- [Species in Pieces](http://species-in-pieces.com/)
- [Lava](https://lovvelavva.com/)
- [Netlify](https://netlify.com/)
- [Sequoir](https://sequoir.com/)

Of course, these are not the only websites in the world using CSS animations, but these five will most likely give you the inspiration you need.

---

## Conclusion

In summary, CSS animations are the tools you need to create memorable experiences for your users as a JavaScript developer. You can find all the [Codepen animated CSS demos in this post here (<VPIcon icon="fa-brands fa-codepen"/>`edyasikpo`)](https://codepen.io/edyasikpo).

If you have any questions, share them in the comment section below, and I’ll reply to every comment.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Guide to CSS animation for JavaScript developers",
  "desc": "CSS animations can make memorable, interactive experiences for websites. Learn how to use them with JavaScript for better user experiences.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-to-css-animation-for-javascript-developers.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
