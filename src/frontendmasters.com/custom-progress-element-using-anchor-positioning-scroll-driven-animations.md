---
lang: en-US
title: "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations"
description: "Article(s) > Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations"
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
      content: "Article(s) > Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations"
    - property: og:description
      content: "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.html
prev: /programming/css/articles/README.md
date: 2024-11-13
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4369
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
  name="Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations"
  desc="A single HTML `progress` element can have quite an elaborate design with custom colors, a tooltip showing the active %, and even an entrance animation. "
  url="https://frontendmasters.com/blog/custom-progress-element-using-anchor-positioning-scroll-driven-animations/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4369"/>

In[**a previous article**](/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md), we made [a cool CSS-only range slider (<VPIcon icon="fa-brands fa-codepen"/>`t_afif`)](https://codepen.io/t_afif/pen/MWdmZPL) powered by anchor positioning and scroll-driven animations. Using minimal HTML and a few CSS tricks we created something that would have required a lot of JavaScript if we built it 2 years ago.

In this article, we will do the same with the`<progress>`element and try to make it as cool as the range slider above.

Enough suspense! Here is a demo of what we are making (it’s animated, so hit Rerun if you missed it).

<CodePen
  user="t_afif"
  slug-hash="JjQVYgJ"
  title="Progress element with tooltip II (Chrome only)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Cool, right? Don’t search for the hidden JavaScript code because there is none. As for the HTML, it’s *nothing* but the`<progress>`element. This leaves us with complex CSS, which is admittedly a bit hard to decipher. But that’s what we’re here for, so let’s dissect it!

::: note

At the time of writing, only Chrome (and Edge) have the full support of the features we will be using.

:::

I highly recommend you read[**the previous article**](/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md)before this one. It’s not mandatory but I will be reusing many CSS tricks so this one will be easier to understand if you already know some of the tricks.

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
  "title": "Custom progress element using the attr() function",
  "desc": "Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier.",
  "link": "/frontendmasters.com/custom-progress-element-using-the-attr-function.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## The Initial Configuration

We said that the HTML is as simple as the`<progress>`element, which is true, but it’s more complex because this native element has an internal structure that is browser-specific. It’s one of those situations where we need to use different vendor prefixes and repeat the style more than once.

### HTML Structure

Here is the structure when using Chrome, Safari, and Edge:

```html
<progress>
 <div pseudo="-webkit-progress-inner-element">
   <div pseudo="-webkit-progress-bar">
     <div pseudo="-webkit-progress-value"></div>
   </div>
 </div>
<progress>
```

And the one when using Firefox:

```html
<progress>
  <div pseudo="-moz-progress-bar"></div>
</progress>
```

::: note

For the sake of simplicity, I will only consider the first structure in this article. When Firefox has better support for the features, I will update the article.

:::

### CSS Structure

Let’s start with some basic styling.

```css
progress {
  width: 200px;
  height: 40px;
  appearance: none;
}
progress::-webkit-progress-value {
  background: #7AB317;
}
```

Nothing fancy so far. Let’s disable the default appearance, add some dimension, and color the progress. It’s the same color for all, but later we will have custom colors.

<CodePen
  user="t_afif"
  slug-hash="ZEgjbOE"
  title="The initial structure"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

That’s it for the initial configuration, let’s move to the interesting parts!

---

## Adding The Tooltip

To create the tooltip I will rely on the`::before`pseudo-element (or the`::after`if you want) and I will pick the code of shape from[<VPIcon icon="fas fa-globe"/>my online collection](https://css-generators.com/tooltip-speech-bubble/). I will be using #5 and #6 but you have up to 100 choices!

```css
progress {
  position: relative;
}
progress::before {
  position: absolute;
  content: "00%";
  /* 
     the code of the tooltip shape 
     copied from the generator 
  */
}
```

<CodePen
  user="t_afif"
  slug-hash="abejNXO"
  title="Adding the tooltip"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Anchor Positioning

Now we have to position the tooltip correctly and here enter Anchor Positioning. This is probably the easiest part and here is the code:

```css
progress::-webkit-progress-value {
  anchor-name: --progress;
}
progress::before {
  position: absolute;
  position-anchor: --progress;
  position-area: top right;
}
progress.bottom::before {
  position-area: bottom right;
}
```

Even if you are unfamiliar with the feature, the code should be self-explanatory. The progress value is the anchor, and the pseudo-element is relatively positioned to that anchor. Then we define the position to be`top right`(or`bottom right`)

The result so far:

<CodePen
  user="t_afif"
  slug-hash="wvVxGZj"
  title="Adjusting the tooltip position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Still not perfect but we can already see that the tooltip is following the progression. We need to rectify the position to make sure the tail is aligned with the corner. A simple translation can fix this:

```css
progress::-webkit-progress-value {
  anchor-name: --progress;
}
progress::before {
  position-anchor: --progress;
  position-area: top right;
  /* --h is the variable that controls the height of the tail */
  translate: -50% calc(-1.2*var(--h));
}
progress.bottom::before {
  position-area: bottom right;
  translate: -50% calc(1.2*var(--h));
}
```

The logic is similar to the translation you combine with`left: 0`or`top: 0`to center an element.

<CodePen
  user="t_afif"
  slug-hash="RwXBazZ"
  title="Fixing the tooltip position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Scoping

I would like to note that using`position: relative`is important here. If you remove it, all the tooltips will be above each other considering the last progress element. This is because I am using the same`anchor-name`and`position: relative`will limit the scope of the anchors. It will make sure each anchor is only available to its progress element.

Another property that allows you to control the scope; it is`anchor-scope`. Instead of`position: relative`you can do the following:

```css
progress {
  anchor-scope: all;
}
```

Scoping is probably the issue you will face the most when working with multiple anchors so don’t forget about it.

---

## Getting The Progress Value

You probably wonder what kind of CSS magic allows me to get the progress value. The magic is called Scroll-Driven Animations. This is the trickiest part because I will be using a feature that is designed to create cool animations on scroll but in this case, has nothing to do with scrolling and isn’t being used to animate. Weird right?

Like with[**the range slider**](/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md#toc-3), I will rely on “view progress timeline”. We can track the position of an element (the subject) inside a container (the scroller). With the range slider, we had the thumb that we can slide/move with the mouse and here we have the progress value.

::: note

But the progress value is static, it doesn’t move. How can we track the position of a fixed element!?

:::

It doesn’t move but it has a different size based on the progression (more precisely a different width) and this is enough to make it have a different position each time. I know it’s a bit confusing so let’s make a figure.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/s_C72B641192C43333719DB09FE368DD770798849971BE8F1E36E6A0C4EFB7ACED_1730713291487_image.png?resize=574%2C297&ssl=1)

We have three progress elements with different progression. Considering the structure we saw previously, the progress value is the green element (the`::-webkit-progress-value`) having a width relative to the main element (the`<progress>`). In all the cases, the progress value is always placed at the left which means the distance between its right edge and the right edge of the main element is variable.

That distance is the key here because it can be interpreted as a movement. It’s like at`100%`of progression the progress value is at`right: 0`and if we decrease the progression, it moves to the left until it reaches`right: 100%`at`0%`of progression. We can express this using Scroll-Driven animations and convert that distance/movement into a value!

```css :collapsed-lines
@property --x {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0; 
}
progress {
  animation: x linear;
  animation-timeline: --progress;
  timeline-scope: --progress;
  animation-range: entry 100% exit 100%;
}
@keyframes x {
  0%   {--x: 100}
  100% {--x: 0  }
}
progress::-webkit-progress-bar {
  overflow: auto;
}
progress::-webkit-progress-value {
  view-timeline: --progress inline;
}
```

We first define the subject by applying`view-timeline`to the progress value. We have a horizontal movement so we consider the inline axis. Then, we define the scroller by adding`overflow: auto`(or`overflow: hidden`).

::: note

Why use the`::-webkit-progress-bar`instead of the`progress`?

:::

Technically, both are the same since both have the same width and behave as a container for the progress value (the subject) but remember the tooltip element which is the`::before`pseudo-element. If we apply overflow to`progress`, we will hide it.

After that, we define a linear animation that animates an integer variable from`100`to`0`. Then we use`animation-timeline`to link the animation with the view-timeline we defined on the subject. The last piece of the puzzle is the use of`animation-range`which is the trickiest part so here is a figure to understand better.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/s_C72B641192C43333719DB09FE368DD770798849971BE8F1E36E6A0C4EFB7ACED_1730716083456_image.png?resize=697%2C389&ssl=1)

::: info MDN (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

From[<VPIcon icon="fa-brands fa-firefox"/>the MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range), we can read:

> `entry`Represents the range of a named view progress timeline from the point where the subject element first starts to enter the scroll port (0% progress), to the point where it has completely entered the scroll port (100%).

When we have a 100% progression, the progress value is placed at the right and is completely visible so we can consider “*it has completely entered the scroll port (100%)*” hence the use of`entry 100%`.

> `exit`Represents the range of a named view progress timeline from the point where the subject element first starts to exit the scroll port (0% progress), to the point where it has completely exited the scroll port (100%).

When we have a 0% progression, the progress value has a width equal to 0 so both their right and left edges are touching the left edge of the scroller so we can consider “*it has completely exited the scroll port (100%).*” hence the use of`exit 100%`.

This means that when we have a 100% progression, the animation is at 0%, and`--x`is equal to 100. When we have a 0% progression the animation is at 100% and`--x`is equal to 0. In other words,`--x`will contain the progress value we want!

:::

If you are a bit lost, don’t worry. We are dealing with a new feature and new concepts so it requires a lot of practice to get used to them. For this reason, I invite you to read[**the previous article**](/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md)so you have more examples to study. I also went a bit fast here because I already explained a lot of stuff there (like the use of`timeline-scope`).

Finally, we show the value within the pseudo element using a counter.

```css
progress::before {
  content: counter(val) "%";
  counter-reset: val var(--x);
}
```

<CodePen
  user="t_afif"
  slug-hash="poMZdqJ"
  title="Showing the progress value"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Let’s improve the coloration now. We can use the value of`--x`combined with`color-mix()`to create a dynamic coloration.

```css
progress {
  --_c: color-mix(in hsl, #E80E0D, #7AB317 calc(1% * var(--x)));
}
```

When`--x`is equal to`0`we get`color-mix(in hsl,#E80E0D,#7AB317 0%)`and the first color is used. When`--x`is equal to`100`we get`color-mix(in hsl,#E80E0D,#7AB317 100%)`and the second color is used. When we have a value between`0`and`100`we get a mix of both colors and that mix will depend on the progression!

The color is stored within a variable`--_c`so we can easily use it in different places. In our case, it will color the tooltip and the progress value.

<CodePen
  user="t_afif"
  slug-hash="YzoBmLb"
  title="Progress element with tooltip (Chrome only)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Our progress element is now perfect!

Take the time to digest what you have learned so far before moving to the next section. Consider this as a checkpoint because we have done the important parts. What comes next is some fancy animations and another example for you to study as homework.

---

## Adding The Animation

Here is the demo I shared in the introduction to remind you about the animation we are making:


I had an idea to animate the width of the progress value for 0 to its defined width. The tooltip is anchored to the progress value and`--x`depends on that width so it should be easy. Unfortunately, It doesn’t work. For some reason, I cannot apply an animation to the progress value. It’s probably due to the essential nature of the element.

::: details

Here is a simplified demo illustrating what I tried and didn’t work. Maybe some of you can find out what’s wrong.

<CodePen
  user="t_afif"
  slug-hash="yLmxaNe"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

:::

To overcome this limitation, I will define a new animation within the main element as follows:

```css
@property --y {
  syntax: '<number>';
  inherits: true;
  initial-value: 1; 
}
progress {
  animation: y 2s .5s both;
}
@keyframes y {
  0%   {--y: 0}
  100% {--y: 1}
}
```

Then I will use the`--y`variable within the properties that need to animate.

I will start with the progress value where I will create a gradient animation instead of a simple coloration. I will update the below:

```css
progress::-webkit-progress-value {
  background: var(--_c);
}
```

With the following:

```css
progress::-webkit-progress-value {
  background: 
    conic-gradient(var(--_c) 0 0)
    0/calc(var(--y)*100%) 100% no-repeat;
}
```

When`--y`will animate, the width of the gradient will also animate from`0%`to`100%`creating the first animation

<CodePen
  user="t_afif"
  slug-hash="zYgLXzP"
  title="Animating the progress value"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

If you are wondering what’s going on with that gradient syntax, check this “[**How to correctly define a one-color gradient**](/css-tip.com/one-color-gradient.md)”

Now, we need to do the same with the tooltip position. We update the following:

```css
progress::before {
  position-area: top right;
}
```

With

```css
progress::before {
  position-area: top center;
  justify-self: unsafe start;
  left: calc(100% * var(--y));
}
```

We need the tooltip to slide the whole progress value so we have to consider a new position area, which is`top center`. Then, the`left`property will animate from`0%`to`100%`.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/s_C72B641192C43333719DB09FE368DD770798849971BE8F1E36E6A0C4EFB7ACED_1730755343342_image.png?resize=696%2C298&ssl=1)

The use of`position-area: top center`will apply a default alignment for the tooltip that we need to override to be able to use`left`. That’s the purpose of`justify-self: start`.

As for the`unsafe`keyword, it’s related to a quirk you will face at least once when working with anchor positioning. In[<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/css-anchor-position-1/#position-area), you can read:

::: info CSS Anchor Positioning - W3 (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

```component VPCard
{
  "title": "CSS Anchor Positioning",
  "desc": "This specification defines anchor positioning, where a positioned element can size and position itself relative to one or more “anchor elements” elsewhere on the page. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.",
  "link": "https://w3.org/TR/css-anchor-position-1/#position-area",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

> If the box overflows its inset-modified containing block, but would still fit within its original containing block, by default it will “shift” to stay within its original containing block, even if that violates its normal alignment.

:::

To make it easy, there is a mechanism that may change the element’s position to keep it within specific boundaries. This can be useful in some cases but not here that’s why I am using`unsafe`to disable that behavior. You can try removing that value and see what is happening.

<CodePen
  user="t_afif"
  slug-hash="yLmqWgK"
  title="Animating the tooltip"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

We are almost done. We are missing the traction effect and the value animation. They are the easiest part:

```css
progress::before {
  content: counter(val) "%";
  counter-reset: val calc(var(--y) * var(--x));
  animation: rotate 2s .5s both cubic-bezier(.18,.4,.8,1.9);
}
@keyframes rotate {
  50% { rotate: calc(var(--x) * -.2deg) }
}
```

Inside the counter, we use`calc(var(--y) * var(--x))`instead of`var(--x)`to animate the value and we consider another animation to animate the`rotate`property based on the`--x`value.

All the tooltips will spend the same amount of time to travel different distances so to have a realistic traction effect the rotation needs to get bigger if the distance is bigger (if the value of progress is bigger) that’s why rather than using a fixed angle value, I am using a dynamic value that depends on`--x`.

It’s probably very subtle but if you run the demo many times and look closely you will notice the difference. The use of`cubic-bezier`is also important because it adds that braking effect at the end.

<CodePen
  user="t_afif"
  slug-hash="JjQVYgJ"
  title="Progress element with tooltip II (Chrome only)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

We did it! A cool CSS-only effect using only the`<progress>`element.

---

## One More Example: Circular Progress Elements

Don’t leave yet! It’s time for your homework. Here is another demo where I transform the progress element into a circular one. It’s your turn to dissect the code and try to understand what’s happening. If you want a real challenge, try to build it alone before checking my code!

<CodePen
  user="t_afif"
  slug-hash="PovMVjJ"
  title="Circular progress element using scroll-driven animation"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

And here is the version with the animation where I am simply reusing the same techniques detailed previously.

<CodePen
  user="t_afif"
  slug-hash="ZEgjNxm"
  title="Circular progress element using scroll-driven animation II"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Conclusion

I hope you enjoyed this CSS experimentation. It was a good exercise and we explored a lot of modern features. You will probably not use these components in a real project but you will for sure need some of the CSS tricks you have learned.

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
  "title": "Custom progress element using the attr() function",
  "desc": "Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier.",
  "link": "/frontendmasters.com/custom-progress-element-using-the-attr-function.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "A single HTML `progress` element can have quite an elaborate design with custom colors, a tooltip showing the active %, and even an entrance animation. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
