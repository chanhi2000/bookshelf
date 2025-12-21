---
lang: en-US
title: "How to Get the Width/Height of Any Element in Only CSS"
description: "Article(s) > How to Get the Width/Height of Any Element in Only CSS"
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
      content: "Article(s) > How to Get the Width/Height of Any Element in Only CSS"
    - property: og:description
      content: "How to Get the Width/Height of Any Element in Only CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-get-the-width-height-of-any-element-in-only-css.html
prev: /programming/css/articles/README.md
date: 2024-07-25
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3119
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
  name="How to Get the Width/Height of Any Element in Only CSS"
  desc="Unlike JavaScript, there is no simple built-in method in CSS to access an element's width and height. But using some (call it hacky) modern CSS techniques, we can get our hands on the number and even use it."
  url="https://frontendmasters.com/blog/how-to-get-the-width-height-of-any-element-in-only-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3119"/>

Getting the dimension of an element using JavaScript is a trivial task. You barely even need to do anything. If you have a reference to an element, you’ve got the dimensions (i.e. `el.offsetWidth` / `el.offsetHeight`). But we aren’t so lucky in CSS. While we’re able to *react* to elements being particular sizes with `@container` queries, we don’t have access to a straight up number we could use to, for example, display on the screen.

It may sound impossible but it’s doable! There are no simple built-in functions for this, so get ready for some slightly hacky experimentation.

::: note

At time of writing, *only* Chrome (and Edge) have the full support of the features we will be using so consider those browsers to read the article.

:::

Let’s start with a demo:

<CodePen
  user="anon"
  slug-hash="MWMyYeP"
  title="Get width/height of elements using CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

This demo has a simple layout with elements that will all have different sizes. Each rectangular element displays it’s own width/height. You can resize the browser or adjust the content; the values will update automatically.

Don’t try to find the hidden JavaScript, it’s 100% CSS magic, powered mostly by scroll-driven animations.

---

## Why Scroll-Driven Animations?

[<VPIcon icon="fa-brands fa-firefox"/>Scroll-Driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) is one of the most popular new CSS features in 2024. It unlocked a lot of possibilities and solved some common problems.

How are these features relevant to this situation of figuring out an element’s dimensions, though?

The terms “scroll” and “animation” tend to bring to mind, *uhh*, animating stuff on scroll. To be fair, that is the main purpose:

::: info MDN (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

> It allows you to animate property values based on a progression along a scroll-based timeline instead of the default time-based document timeline. This means that you can animate an element by scrolling a scrollable element, rather than just by the passing of time.

<SiteInfo
  name="CSS scroll-driven animations - CSS | MDN"
  desc="The CSS scroll-driven animations module provides functionality that builds on the CSS animations module and Web Animations API. It allows you to animate property values along a scroll-based timeline rather than the default time-based document timeline. This means that you can animate an element by scrolling the element, its scroll container, or its root element, rather than just by the passing of time."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

But we can think about it differently and achieve more than a simple animation on scroll. If you keep reading the MDN page, it explains there are two types of “scroll-based timelines”. In our case, we will consider the “*view progress timeline*”.

::: info MDN (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

> You progress this timeline based on the change in visibility of an element (known as the subject) inside a scroller. The visibility of the subject inside the scroller is tracked as a percentage of progress.

<SiteInfo
  name="CSS scroll-driven animations - CSS | MDN"
  desc="The CSS scroll-driven animations module provides functionality that builds on the CSS animations module and Web Animations API. It allows you to animate property values along a scroll-based timeline rather than the default time-based document timeline. This means that you can animate an element by scrolling the element, its scroll container, or its root element, rather than just by the passing of time."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

With this type of scroll timeline, there are three relevant elements: the scroller which is the container having the scroll, the subject which is an element moving inside the container and the animation that will progress based on the position of the “subject” inside the “scroller”.

The three elements are linked with each other. To identify the progress of the animation we need to know the position of the subject inside the scroller and for this, we need to know the dimension of the scroller, the dimension of the subject, and the offset of the subject (the distance between the subject and the edges of the scroller).

So our equation contains four variables:

1. Dimension of the scroller
2. Dimension of the subject
3. Progress of the animation
4. Offset of the subject

If *three* variables are known, we can automatically find the missing one. In our case, the missing variable will be the “dimension of scroller” and that’s how we are going to find the width/height of any element (an element that will a be scroller).

---

## How Does it Work?

Let’s dive into the theory and get to how scroll-driven animations are actually used to do this. It won’t be long and boring, I promise! I’ll be using `width` as the dimension being measured, but `height` would use the same logic just on the other axis.

Consider the following figure:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/diagram_0.png?resize=1024%2C342&ssl=1)

We have a container (the scroller) and an element inside it (the subject) placed on the left. There are two special positions within the container. The `0%` position is when the element is at the right (inside the container) and the `100%` position is when the element has exited the container from the left (outside the container).

The movement of the subject between `0%` and `100%` will define the percentage of the progression but our element will not move so the percentage will be fixed. Let’s call it `P`. We also know the width of the subject and we need to find the width of the scroller.

Remember the variables we talked about. Considering this configuration, we already know three of them: “the width of the subject”, “the offset of the subject” (fixed to the left edge), and the “progress of the animation” (since the subject is fixed). To make things easier, let’s consider that the width of the scroller is a multiplier of the width of the subject:

$$
W = N * S
$$

The goal is to find the `N` or more precisely, we need to find the relation between the **P** and `N`. I said the **P** is fixed, but in reality it’s only fixed when the scroller width is fixed which is logical. But if the width of the scroller changes, the progress will also change, that’s why we need to find the formula between the progress and the width.

Let’s start with the case where the width of the scroller is equal to twice the width of the subject, we get the following:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/diagram_2.png?resize=482%2C313&ssl=1)

The subject is in the middle between `0%` and `100%` so the progress in this case is `50%`. For `N = 2` we get `P = 50%`.

Let’s try for `N = 3`:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/diagram_3.png?resize=482%2C313&ssl=1)

Now we have two extra slots in addition to the `0%` and `100%`. If we suppose that the subject can only be placed inside one of the 4 slots, we can have the following progress: `0%`, `33.33%`, `66.67%`, `100%`. But the subject is always placed at the before-the-last slot so the progress in this case is equal to `66.67%` or, seen differently, it’s equal to `100% - 100%/3` (`100%/3` is the progression step).

Are you seeing the pattern? If the width of the scroller is equal to `N` times the width of the subject we will have `N+1` slots (including `0%` and `100%`) so the step between each slot is equal to `100%/N` and the subject is located at the before-the-last slot so the progress is equal to `100% - 100%/N`.

We have our equation: `P = 100% - 100%/N` so `N = 100%/(100% - P)`.

If we convert the percentage to values between `0` and `1` we get `N = 1/(1 - P)` and the width we are looking for is equal to `W = N * S = S/(1 - P)`.

Now If we consider a width for the subject equal to `1px`, we get `W = 1px/(1 - P)` and without the unit, we have `W = 1/(1 - P)`.

---

## Let’s Write Some Code

Enough theory! Let’s transform all this into code. We start with this structure:

```html
<div class="container"></div>
```

```css
.container {
  overflow: auto;
  position: relative;
}
.container:before {
  content: "";
  position: absolute;
  left: 0;
  width: 1px;
}
```

The scroller element is the container and the subject element is a pseudo-element. I am using `position: absolute` so the subject doesn’t affect the width of the container (the value we need to calculate). Like described in the previous section, it’s placed at the left of the container with `1px` of width.

Next, we define a named timeline linked to the pseudo-element (the subject)

```css
.container {
  timeline-scope: --cx;
}
.container:before {
  view-timeline: --cx inline
}
```

The [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline) description of the property:

> The `view-timeline` CSS shorthand property is used to define a named view progress timeline, which is progressed through based on the change in visibility of an element (known as the subject) inside a scrollable element (scroller). `view-timeline` is set on the subject.

We consider the inline (horizontal) axis. We need to also use `timeline-scope` to give the container access to the view progress. By default, a named timeline is scoped to the element where it’s defined (and its descendants) but we can change this to make it available at any level.

Why not define the scope at the `html` level, then?

Enlarging the scope to all the elements may sound like a good idea, but it’s not. We may need to use the same code for different elements so limiting the scope allows us to reuse the same code and keep the same naming.

I won’t spend too much time detailing the scope feature but don’t forget about it. If the code doesn’t work as intended, it’s probably a scoping issue.

Now let’s define the animation:

```css
@property --x {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
.container {
  animation: x linear;
  animation-timeline: --cx;
  animation-range: entry 100% exit 100%; 
}
@keyframes x {
  0%   { --x: 0; }
  100% { --x: 1; }
}
```

We define a `keyframes` that animates a variable from `0` to `1`. We have [<VPIcon icon="fa-brands fa-firefox"/>to register that variable](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) with a `number` type to be able to animate it. We run the animation on the container with a linear easing and define the timeline using `animation-timeline`.

At this step, we told the browser to consider the named timeline defined on the pseudo-element (the subject) as the reference for the animation progress. And that progress will be stored in the `--x` variable. At `50%`, we have `--x: 0.5`, at `70%`, we have `--x: 0.7`, and so on.

The last step is to add the formula we identified earlier:

```css
@property --w {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0; 
}
.container {
  --w: calc(1/(1 - var(--x)));
}
```

The `--w` variable will contain the width in pixel of the container as a unitless value. It’s important to notice the “unitless” part. It gives us a lot of flexibility as we can integrate it within any formula. If you are a CSS hacker like me, you know what I mean!

What about that `animation-range: entry 100% exit 100%;`?

In addition to using a named timeline to define which element control the progress, we can also control the range of the animation. In other words, we can explicitly define where the `0%` and `100%` progress are located within the timeline.

Let’s get back to the first figure where I am showing the `0%` and `100%` progress.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/diagram_1.png?resize=1024%2C342&ssl=1)

The `0%` is when the subject has **completely** entered the scroller from the right. We can express this using `animation-range-start: entry 100%`.

The `100%` is when the subject has **completely** exited the scroller from the left. We can express this using `animation-range-end: exit 100%`.

Or using the shorthand:

```css
animation-range: entry 100% exit 100%;
```

If you are new to scroll-driven animations, this part is not easy to grasp, so don’t worry if you don’t fully understand it. It requires some practice to build a mental model for it. Here is a [good online tool](https://scroll-driven-animations.style/tools/view-timeline/ranges/) that can help you visualize the different values.

Now, we do the same for the height and we are done. Here is the first demo again so you can inspect the full code.

<CodePen
  user="anon"
  slug-hash="MWMyYeP"
  title="Get width/height of elements using CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that I am using another pseudo-element to *show* the values. Let’s consider this as our first use case. Being able to get the width/height of any element and show them using only CSS is super cool!

```css
.size::after {
  content: counter(w) "x" counter(h);
  counter-reset: w var(--w) h var(--h);
}
```

---

## Are There Any Drawbacks?

Even if it seems to work fine, I still consider this as a “hack” to be used with caution. I am pretty sure it will fail in many situations so don’t consider this as a robust solution.

I also said “any element” in the title but in reality not all of them. It’s mandatory to be able to have a child element (the subject) so we cannot apply this trick to elements like `<img>` for example.

You also need to add `overflow: auto` (or `hidden`) to the container to make it the scroller for the subject. If you plan to have overflowing content then this solution will give you some trouble.

The value you will get using this method will include the padding but not the border! Pay attention to this part and compare the values you get with the ones of the Dev tools. You may need to perform another calculation to get the real dimension of the element by adding or subtracting specific amounts.

Another drawback is related to the use of `1px` as our unit. We assumed that the size is a multiplier of `1px` (which is true in most cases) but if your element is having a size like `185.15px`, this trick won’t work. We can overcome this by using a smaller width for the subject (something like `0.01px`) but I don’t think it is worth making this hack more complex.

---

## A Few Use Cases

The first use case we saw is to *show* the dimension of the element which is a cool feature and can be a good one for debugging purposes. Let’s dig into more use cases.

### Getting the Screen Dimension

We already have the viewport units `vh` and `vw` that works fine but this method can give us the unitless pixel values. You may ask how to do this since the viewport is not a real element. The solution is to rely on `position: fixed` applied to any element on the page. A fixed element is positioned relative to the viewport so its scroller will the viewport.

<CodePen
  user="anon"
  slug-hash="eYwZgqL"
  title="Get screen dimension using only CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

If you check the code, you will see that I am relying on the HTML pseudo-element for the subject and I don’t need to define any overflow or position on the HTML element. Plus the values are available globally since they are defined inside the HTML element!

For this particular case, I also have [**another CSS trick to get the screen dimension**](/css-tip.com/screen-dimension.md) with an easier method:

<CodePen
  user="anon"
  slug-hash="ExBVLBW"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

### Calculating the Scrollbar Width

There is a slight difference between the two screen width calculating methods above. The first demo will not include the scrollbar width if the page has a lot of content but the second one will. This means that If we combine both methods we can get the width of scrollbar!

<CodePen
  user="anon"
  slug-hash="rNEjyNj"
  title="Screen width/height (CSS-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool right? In addition to the screen dimension, you can also have the width of the scrollbar. Both values are available at root level so you can use them anywhere on the page.

If you want, you can also get the scrollbar width using a different method like I am detailing here: [**Get the scrollbar width using only CSS**](/css-tip.com/width-scrollbar.md)

### Counting Stuff

All the calculations we did were based on the `1px` size of the subject. If we change this to something else we can do some interesting counting. For example, if we consider `1lh` (the height of the line box) we can count the number of lines inside a text.

<CodePen
  user="anon"
  slug-hash="BagKWdm"
  title="Counting the number of lines inside a text"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is the version where you can edit the content. The number of lines will adjust based on the content you will enter.

<CodePen
  user="anon"
  slug-hash="RwzapLK"
  title="Dynamic line counting"
  :default-tab="['css','result']"
  :theme="dark"/>

Note how I am playing with the scope in this example. I am making the variable available at a higher level to be able to show the count inside a different element. Not only we can count the numbers of lines but we can also show the result anywhere on the page.

Can you think about something else to count? Share your example in the comment section.

### Transferring Sizes

Being able to control the scope means that we can transfer the size of an element to another one on the page.

Here is an example where resizing the left element will also resize the right one!

<CodePen
  user="anon"
  slug-hash="OJeNzoz/ab8922c47f1f81858cbada8db185cc48"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

Another important part of this trick is being able to get the width/height values as integer. This allows us to use them within any formula and append any unit to them.

Here is an example, where resizing the left element will rotate/scale the right one.

<CodePen
  user="anon"
  slug-hash="rNEeydE"
  title="Transferring sizes (resize the left element)"
  :default-tab="['css','result']"
  :theme="dark"/>

I have mapped the width with the rotation and the height with the scaling. Cool right? We can get the width/height of an element, have them as an integer, and transfer them to another element to do whatever we want. CSS is magic!

---

## Conclusion

I hope you enjoyed this funny experiment. I still insist on the fact that it’s a hacky workaround to do something that was not possible using CSS. Use it for fun, use it to experiment with more CSS-only ideas but think twice before including this into a real project. Using one line of JavaScript code to get the dimension of an element is safer. Not all CSS-only tricks are a good replacement for JavaScript.

This said, if you find an interesting use case or you have another CSS-only experimentation where this trick can be useful, share it in the comment section.

If you’re interested in more experimentation with scroll-eriven animations check the following articles:

::: info Article Series

```component VPCard
{
  "title": "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "A single HTML `progress` element can have quite an elaborate design with custom colors, a tooltip showing the active %, and even an entrance animation. ",
  "link": "/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "We'll make some extremely stylized range sliders with simple semantic HTML and some very fresh CSS. You might be surprised how custom these things can get these days.",
  "link": "/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get the Width/Height of Any Element in Only CSS",
  "desc": "Unlike JavaScript, there is no simple built-in method in CSS to access an element's width and height. But using some (call it hacky) modern CSS techniques, we can get our hands on the number and even use it.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-get-the-width-height-of-any-element-in-only-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```