---
lang: en-US
title: "Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations"
description: "Article(s) > Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations"
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
      content: "Article(s) > Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations"
    - property: og:description
      content: "Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.html
prev: /programming/css/articles/README.md
date: 2024-08-21
isOriginal: false
author: Temani Afif
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3569
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
  name="Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations"
  desc="We'll make some extremely stylized range sliders with simple semantic HTML and some very fresh CSS. You might be surprised how custom these things can get these days."
  url="https://frontendmasters.com/blog/custom-range-slider-using-anchor-positioning-scroll-driven-animations"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3569"/>

[<VPIcon icon="fa-brands fa-firefox"/>Anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)and[<VPIcon icon="fa-brands fa-firefox"/>scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)are among of the most popular and exciting CSS features of 2024. They unlock a lot of possibilities, and will continue to do so as browser support improves and developers get to know them.

Here is a demo of a custom range slider where I am relying on such features.

<CodePen
  user="t_afif"
  slug-hash="MWdmZPL"
  title="CSS-only Custom range slider with motion"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

This whole UI is a semantic HTML`<input type="range">`, with another semantic`<output>`element showing off the current value, along with quite fancy CSS.

Intuitively, you may think there is a JavaScript code somewhere gathering the value of the input “on change” and updating the position/content of the tooltip. As for the motion, it’s probably a kind of JavaScript library that calculates the speed of the mouse movement to apply a rotation and create that traction illusion.

Actually, there is no JavaScript at all.

It’s hard to believe but CSS has evolved in a way that we can achieve such magic without any scripts or library. You will also see that the code is not that complex. It’s a combination of small CSS tricks that we will dissect together so follow along!

::: note

At the time of writing, only Chrome (and Edge) have the full support of the features we will be using.

:::

---

## Prerequisites

First, let’s start with the HTML structure:

```html
<label>
  Label
  <input type="range" id="one" min="0" max="120" value="20">
  <output for="one" style="--min: 0;--max: 120"></output>
</label>
```

An`input`element and an`output`element are all that we need here. The label part is not mandatory for the functionality, but form elements should always be labelled and you need a wrapper element anyway.

I won’t detail the attributes of the`input`element but note the use of two CSS variables on the`output`element that should have the same values as the `min` and `max` attributes.

In addition to the HTML code, I am going to consider the styling of the range slider and the tooltip as prerequisites as well. I will mainly focus on the new features and skip most of the aesthetic parts, although I have covered some of those aspects in other articles, [like here](/sitepoint.com/css-custom-range-slider.md) where I detail the styling of the range slider.

<CodePen
  user="t_afif"
  slug-hash="KKGpmGE"
  title="CSS only custom range sliders"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

As for the tooltip, I have a[<VPIcon icon="fas fa-globe"/>big collection of 100 different tooltip shapes](https://css-generators.com/tooltip-speech-bubble/)and I am going to use the #41 and #42. I also have a[two-part article](/smashingmagazine.com/modern-css-tooltips-speech-bubbles-part1.md)detailing the creation of most of the tooltips.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/s_3FEC3DE430682F2526F00121B6B9A21346D04C3B20F98BA491C64590EEBAAF65_1723504367208_image.png?resize=989%2C307&ssl=1)

You don’t *need* the fancy styled tooltip output, nor do you need the custom styling of the range slider itself, it’s just fun and offers some visual control you might want. Here’s a “naked” demo without all that:

<CodePen
  user="t_afif"
  slug-hash="oNrojEJ"
  title="Naked range slider demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

---

## The Tooltip Position

The first thing we are going to do is to correctly place the tooltip above (or below) the thumb element of the slider. This will be the job of Anchor positioning and here is the code:

```css
input[type="range" i]::-webkit-slider-thumb {
  anchor-name: --thumb;
}
output {
  position-anchor: --thumb;
  position: absolute;
  position-area: top; /* or bottom */
}
```

That’s all! No more than four CSS declarations and our tooltip is correctly placed and will follow the movement of the slider thumb.

Anchor positioning is an upgrade of`position: absolute` here. Instead of positioning the element relatively to an ancestor having`position: relative`we can consider any element on the page called an “anchor”. To define an anchor we use`anchor-name`with whatever value you want. It’s mandatory to use the dashed indent notation like with custom properties. That same value can later be used within the absolute element to link it with the “anchor” using`position-anchor`.

Defining the anchor is not enough, we also need to correctly position the element. For this, we have the`position-area`.

::: info

The`position-area`[<VPIcon icon="fas fa-firefox"/>CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)property enables an anchor-positioned element to be positioned relative to the edges of its associated anchor element by placing the positioned element on one or more tiles of an implicit 3×3 grid, where the anchoring element is the center cell.

<SiteInfo
  name="position-area - CSS: Cascading Style Sheets | MDN"
  desc="The position-area CSS property enables an anchor-positioned element to be positioned relative to the edges of its associated anchor element by placing the positioned element on one or more tiles of an implicit 3x3 grid, where the anchoring element is the center cell."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/position-area/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

[<VPIcon icon="fas fa-globe"/>Here is an online tool](https://anchor-tool.com/) to visualize the different values.

We’re using `position-area: top` on the `<output>`, and a `bottom` class flips that to `position-area: bottom` to re-position it and make the design work below.

Here is the demo so far:

<CodePen
  user="t_afif"
  slug-hash="ZEdaxpL"
  title="Adding the position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

Hmmmm, there is an issue! Both tooltips are linked to the same thumb. This is understandable, because I used the same anchor name so the first one will get ignored.

*Use a different name*, you say, and that’s correct but it’s not the optimal solution. We can still keep the same name and instead, limit the scope using[<VPIcon icon="iconfont icon-w3c"/>`anchor-scope`](https://w3.org/TR/css-anchor-position-1/#anchor-scope).

```css
label {
  anchor-scope: --thumb;
}
```

The above code should limit the scope of the anchor`--thumb`to the`label`element and its descendant. In other words, the anchor cannot be seen outside the`label`element.

Another fix is to add`position: relative`to`label`. I won’t detail how it works but it has to do with the creation of a containing block.

<CodePen
  user="t_afif"
  slug-hash="ZEdaxwa"
  title="Correcting the position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

Hmmmmm. We have fixed the scoping problem but the position of the tooltip is still not good. If you move the thumb to the edges, the tooltip is no longer following. It’s limited to the boundary of the slider. It’s kind of strange, but it’s by design.

By adding `position: relative` we create a containing block for the tooltip and we trigger the following behavior described by[<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/css-anchor-position-1/#anchor-scope):

> If the box overflows its inset-modified containing block, but would still fit within its original containing block, by default it will “shift” to stay within its original containing block, even if that violates its normal alignment. This behavior makes it more likely that positioned boxes remain visible and within their intended bounds, even when their containing block ends up smaller than anticipated.

To fix this, we can use negative margin `margin-inline: -4em` or a negative inset `inset: 0 -4em` to allow the element to go outside the boundary

<CodePen
  user="t_afif"
  slug-hash="BaXmbNL"
  title="Correcting the edge cases"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

Of course, it applies to only this particular demo. You may need a different fix in different situations but at least you are aware of this quirk so don’t forget about it!

---

## The Tooltip Content

Now that our tooltip is correctly positioned, let’s move to the content. This is where scroll-driven animations enter the story. I know what you are thinking: *“We have nothing to scroll, so how are we going to use scroll-driven animations?”*

If you read[<VPIcon icon="fa-brands fa-firefox"/>the MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)you will find something called a “*view progress timeline*”:

> You progress this timeline based on the change in visibility of an element (known as the subject) inside a scroller. The visibility of the subject inside the scroller is tracked as a percentage of progress — by default, the timeline is at 0% when the subject is first visible at one edge of the scroller, and 100% when it reaches the opposite edge.

This is perfect for us since we have a thumb (the subject) that moves inside the input (the scroller) so we don’t really need to have anything else to scroll.

We start by defining the timeline as follows:

```css
input {
  overflow: hidden; /* or `auto` */
}
input[type="range" i]::-webkit-slider-thumb {
  view-timeline: --thumb-view inline;
}`
```

Similar to what we did with the anchor, we give a name and the axis (`inline`) which is the horizontal one in our default writing mode. Then, we define`overflow: hidden`on the input element. This will make the input our scroller while the thumb is the subject.

If you forget about the overflow (so easy to forget!), another element will get used as the scroller, and won’t really know which one, and nothing will work as expected. Always remember that you need to define the subject using`view-timeline`and the scroller using`overflow`. I will repeat it again: **don’t forget to define overflow on the scroller element!**

Next, we define the animation:

```css
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0; 
}
label {
  timeline-scope: --thumb-view;
}
output {
  animation: range linear both;
  animation-timeline: --thumb-view;
}
@keyframes range {
  0%   { --val: var(--max) }
  100% { --val: var(--min) }
}
```

Let’s start with`timeline-scope`. This is yet another scoping issue that will give you a lot of headaches. With anchor positioning, we saw that an anchor is by default available everywhere on the page and we have to limit its scope. With scroll-driven animations, the scope is limited to the element where it’s defined (the subject) and its descendant so we have to increase the scope to make it available to other elements. Two different implementations but the same issue.

Never**ever**forget about scoping when working with both features. Sometimes, everything is correctly defined and you are only missing`timeline-scope`or`position: relative`somewhere.

Next we define an animation that animates an integer between the `min` and `max` variables, then link that animation with the timeline we previously defined using`animation-timeline`.

Why the `max` is at 0% and the `min` at 100%? Isn’t that backwards, you ask?

Intuitively, we tend to think “from left to right” but this looks like it’s “from right to left”. To understand this, we need to consider the “scroll” part of the feature.

I know that we don’t have scrolling in our case but consider the following example to better understand.

<CodePen
  user="t_afif"
  slug-hash="xxoPQWj"
  title="Illustrating the 'left to right' logic"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

When you scroll the container “from left to right” you have a red circle that moves “from right to left”. We still have the “from left to right” behavior but it’s linked to the scroll. As for the content, it will logically move in the opposite direction “from right to left”.

When the scroll is at the left, the element is at the right and when the scroll is at the right, the element is at the left. The same logic applies to our thumb even if there is nothing to scroll. When the thumb is at the right edge, this is our`0%`state and we need to have the `max` value there. The left edge will be the`100%`state and it’s the `min` value.

The last step is to show the value using a pseudo-element and`counter()`

```css
output::before {
  content: counter(num);
  counter-reset: num var(--val);
}
```

And we are done!

<CodePen
  user="t_afif"
  slug-hash="BagmGPy"
  title="Adding the content"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

Wait a minute, the values aren’t good! We are not reaching the min and max values. For the first slider, we are supposed to go from`0`to`120`but instead, we have`9`and`111`.

Another trick related to the scroll part of the feature and here is a figure to illustrate what is happening:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/DLxrh0pl.png?resize=977%2C254&ssl=1)

The movement of the thumb is limited to the input container (the scroller) but the`0%`and`100%`state are defined to be outside the scroller. In our case, the subject cannot reach the`0%`and`100%`since it cannot go outside but luckily we can update the`0%`and`100%`state:

We can either use`animation-range`to make both states inside the container:

```css
output {
  animation: range linear both;
  animation-timeline: --thumb-view;
  animation-range: entry 100% exit 0%;
}
```

![](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_3FEC3DE430682F2526F00121B6B9A21346D04C3B20F98BA491C64590EEBAAF65_1723632516189_image.png?ssl=1)

Or we consider`view-timeline-inset`with a value equal to the width of the thumb.

```css
input[type="range" i]::-webkit-slider-thumb{
  anchor-name: --thumb;
  view-timeline: --thumb-view inline;
  view-timeline-inset: var(--s); /* --s is defined on an upper element and is used to define the size of the thumb */
}
```

The first method seems better as we don’t have to know the size of the thumb (the subject) but keep in mind both methods.The `view-timeline-inset`property may be more suitable in some situations.

<CodePen
  user="t_afif"
  slug-hash="JjqNEbZ"
  title="CSS-only Custom range slider"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

Now our slider is perfect!

A lot of stuff to remember, right? Between the scoping issues, the range we have to correct, the overflow we should not forget, the `min` that should be at`100%`and `max` that should be at`0%`, etc. Don’t worry, I feel the same. They are new features with new mechanisms so it requires a lot of practice to get used to them and build a clear mental model. If you are a bit lost, that’s fine! No need to understand everything at once. Take the time to play with the different demos, read the doc of each property, and try things on your own.

---

## Adding Motion

Now let’s move to the fun part, those silly wobbly animations. A tooltip that follows the thumb with dynamic content is good but it’s even better if we add some motion to it.

You may think this is gonna be the hardest part but actually it’s the easiest one, and here is the relevant code:

```css :collapsed-lines
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0; 
}
@property --e {
  syntax: '<number>';
  inherits: true;
  initial-value: 0; 
}
output {
  animation: range linear both;
  animation-timeline: --thumb-view;
  animation-range: entry 100% exit 0%;
}
output:before {
  content: counter(num);
  counter-reset: num var(--val);
  --e: var(--val);
  transition: --e .1s ease-out;
  rotate: calc((var(--e) - var(--val))*2deg);
}
@keyframes range {
  0%   { --val: var(--max) }
  100% { --val: var(--min) }
}
```

We add a new CSS variable`--e`with a number type. This variable will be equal to the`--val`variable. Until now, nothing fancy. We have two variables having the same value but one of them has a `transition`. Here comes the magic.

When you move the thumb, the animation will update the`--val`variable inside the output element. The pseudo-element will then inherit that value to update the content and also update`--e`. But since we are applying a transition to`--e`, it will not have an instant update but a smooth one (well, you know how transitions work!). This means that for a brief moment, both`--e`and`--val`will not be equal thus their difference is different from 0. We use that difference inside the rotation!

In addition to this, the difference can get bigger if you move the thumb fast or slow. Let’s suppose the current value is equal to`5`. If you move the thumb rapidly to the value`50`, the difference will be equal to`45`hence we get a big rotation. If you move to the value`7`, the difference will be equal to`2`and the rotation won’t be that big.

Here is the full demo again so you can play with it. Try different speeds of movement and see how the rotation is different each time.

<CodePen
  user="t_afif"
  slug-hash="MWdmZPL"
  title="CSS-only Custom range slider with motion"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

If you want to dig more into this technique and see more examples I advise you to [<VPIcon icon="fas fa-globe"/>read this article by Bramus](https://bram.us/2023/10/23/css-scroll-detection/).

<SiteInfo
  name="Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
  desc="Combine Scroll-Driven Animations with @property, transition-delay, calc(), sign() and abs() … and you can do Scroll Detection using only CSS!"
  url="https://bram.us/2023/10/23/css-scroll-detection/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/10/sda-badass-short-020p-10fps.gif"/>

---

## Another Example

Let’s try a different idea.

<CodePen
  user="t_afif"
  slug-hash="vYweZQa"
  title="CSS-only Custom range slider"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>  

This time, I am adjusting the tooltip position (and its tail) to remain within the horizontal boundary of the input element. Can you figure out how it’s done? This will be your homework!

For the tooltip part, I already did the job for you. I will redirect you again to[<VPIcon icon="fas fa-globe"/>my online collection](https://css-generators.com/tooltip-speech-bubble/)where you can get the code of the tooltip shape. Within that code, I am already defining one variable that controls the tail position.

---

## Conclusion

CSS is cool. A few years ago, doing such stuff with CSS would have been impossible. You would probably need one or two JavaScript libraries to handle the position of the tooltip, the dynamic content, the motion, etc. Now, all it takes is a few lines of CSS.

It’s still early to adopt those features and include them in real projects but I think it’s a good time to explore them and get an overview of what could be done in the near future. If you want more “futuristic” experimentation make sure to check[<VPIcon icon="fas fa-globe"/>my CSS Tip website](https://css-tip.com/)where I regularly share cool demos!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "We'll make some extremely stylized range sliders with simple semantic HTML and some very fresh CSS. You might be surprised how custom these things can get these days.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
