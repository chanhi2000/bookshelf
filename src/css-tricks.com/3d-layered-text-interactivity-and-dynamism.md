---
lang: en-US
title: "3D Layered Text: Interactivity and Dynamicism"
description: "Article(s) > 3D Layered Text: Interactivity and Dynamicism"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 3D Layered Text: Interactivity and Dynamicism"
    - property: og:description
      content: "3D Layered Text: Interactivity and Dynamicism"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-interactivity-and-dynamism.html
prev: /programming/css/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Amit Sheen
    url : https://css-tricks.com/author/amitsheen/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/bulging-text.jpg
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="3D Layered Text: Interactivity and Dynamicism"
  desc="In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time."
  url="https://css-tricks.com/3d-layered-text-interactivity-and-dynamism"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/bulging-text.jpg"/>

In the previous two chapters, we built a layered 3D text effect, added depth and color, and then brought it to life with motion. We explored static structure, animated variations, and even some clever decoration tricks. But everything so far has been hard-coded.

This time, we’re going dynamic.

In this final chapter, we’re stepping into the world of interactivity by adding JavaScript into the mix. We’ll start by generating the layers programmatically, giving us more flexibility and cleaner code (and we’ll never have to copy-paste divs again). Then, we’ll add some interaction. Starting with a simple `:hover` effect, and ending with a fully responsive bulging text that follows your mouse in real time. Let’s go.

::: info 3D Layered Text Article Series

```component VPCard
{
  "title": "3D Layered Text: The Basics",
  "desc": "A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series.",
  "link": "/css-tricks.com/3d-layered-text-the-basics.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Motion and Variations",
  "desc": "In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.",
  "link": "/css-tricks.com/3d-layered-text-motion-and-variations.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Interactivity and Dynamicism",
  "desc": "In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time.",
  "link": "/css-tricks.com/3d-layered-text-interactivity-and-dynamism.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## Clean Up

Before we jump into JavaScript, let us clean things up a bit. We will pause the animations for now and go back to the static example we wrapped up with in the first chapter. No need to touch the CSS just yet. Let us start with the HTML.

We will strip it down to the bare essentials. All we really need is one element with the text. The class stays. It is still the right one for the job.

```html
<div class="layeredText">Lorem Ipsum</div>
```

---

## Scripting

It is time. Let us start adding some JavaScript. Don’t worry, the impact on performance will be minimal. We’re only using JavaScript to set up the layers and define a few CSS variables. That’s it. All the actual style calculations still happen off the main thread, maintain high frames per second, and don’t stress the browser.

We will begin with a simple function called `generateLayers`. This is where all the magic of layer generation will happen. To work its magic, the function will receive the element we want to use as the container for the layers.

```js
function generateLayers(element) {
  // magic goes here
}
```

To trigger the function, we will first create a small variable that holds all the elements with the `layeredText` class. And yes, we can have more than one on the page, as we will see later. Then, we will pass each of these elements into the `generateLayers` function to generate the layers.

```js
const layeredElements = document.querySelectorAll('.layeredText');

layeredElements.forEach(generateLayers);
```

---

## Fail Safe

Now let us dive into the `generateLayers` function itself and start with a small fail safe mechanism. There are situations, especially when working with frameworks or libraries that manage your DOM, where a component might get rendered more than once or a function might run multiple times. It should not happen, but we want to be ready just in case.

So, before we do anything, we will check if the element already contains a `div` with the `.layers` class. If it does, we will simply exit the function and do nothing:

```js
function generateLayers(element) {
  if (element.querySelector('.layers')) return;
  
  // rest of the logic goes here
}
```

::: tip

In the real world, I would treat this as a chance to catch a rendering bug. Instead of silently returning, I would probably send a message back to the dev team with the relevant data and expect the issue to be fixed.

:::

---

## Counting Layers

One last thing we need to cover before we start building the layers is the number of layers. If you remember, we have a CSS variable called `--layers-count`, but that will not help us here. Besides, we want this to be more dynamic than a single hardcoded value.

Here is what we will do. We will define a constant in our JavaScript called `DEFAULT_LAYERS_COUNT`. As the name suggests, this will be our default value. But we will also allow each element to override it by using an attribute like `data-layers="14"`.

Then we will take that number and push it back into the CSS using `setProperty` on the parent element, since we rely on that variable in the styles.

```js
const DEFAULT_LAYERS_COUNT = 24;

function generateLayers(element) {  
  if (element.querySelector('.layers')) return;
  
  const layersCount = element.dataset.layers || DEFAULT_LAYERS_COUNT;
  element.style.setProperty('--layers-count', layersCount);
}
```

---

## Adding Content

Now we have everything we need, and we can finally generate the layers. We will store the original text content in a variable. Then we will build the markup, setting the `innerHTML` of the parent element to match the structure we used in all the previous examples. That means a `span` with the original content, followed by a `div` with the `.layers` class.

Inside that `div`, we will run a loop based on the number of layers, adding a new layer in each iteration:

```js
function generateLayers(element) {

  // previous code

  const content = element.textContent;

  element.innerHTML = `
    <span>${content}</span>
    <div class="layers" aria-hidden="true">
      ${Array.from({ length: layersCount}, (_, i) =>
        `<div class="layer" style="--i: ${i + 1};">${content}</div>`
      ).join('')}
    </div>
  `;
}
```

And that is it. Our 3D text is ready, and all the layers are now built entirely through JavaScript. Try playing around with it. Change the text inside the `layeredText` element. Add your name, your project name, your brand. Let me know how it looks.

CodePen Embed Fallback

**Quick note:** I also removed the `--layers-count` variable from the CSS, since it is now set dynamically with JavaScript. While I was at it, I moved the font settings out of the `.layeredText` element, since they should be applied globally or to a more appropriate wrapper. Just a bit of housekeeping to keep things clean.

---

## Normalizing Height

Since we already added a way to set the number of layers dynamically, let us take advantage of it.

Here is an example with three different `div` elements, each using a different number of layers. The first one (A) has 8 layers, the second (B) has 16, and the third (C) has 24. CodePen Embed Fallback

You can clearly see the difference in height between the letters, since the total height depends on the number of layers. When it comes to color though, we used the normalized value (remember that?), so the gradient looks consistent regardless of height or layer count.

We can just as easily normalize the total height of the layers. All we need to do is replace the `--layer-offset` variable with a new one called `--text-height`. Instead of setting the distance between each layer, we define the total height for the full stack. That lets us multiply the normalized value by `--text-height`, and get a consistent size no matter how many layers we have.

```css
.layeredText {
  --text-height: 36px;

  .layer {
    --n: calc(var(--i) / var(--layers-count));

    transform: translateZ(calc(var(--n) * var(--text-height)));
    color: hsl(200 30% calc(var(--n) * 100%));
  }
}
```

CodePen Embed Fallback

---

## Counter Interaction

We are ready to start reacting to user input. But before we do anything, we need to think about the things we do *not* want to interact with, and that means the extra layers.

We already handled them for screen readers using `aria-hidden`, but even with regular mouse interactions, these layers can get in the way. In some cases, they might block access to clickable elements underneath.

To avoid all of that, we will add `pointer-events: none;` to the `.layers` element. This makes the layers completely ‘transparent’ to mouse clicks and hover effects.

```css
.layers {
  pointer-events: none;
}
```

---

## Hovering Links

Now we can finally start responding to user input and adding a bit of interaction. Let’s say I want to use this 3D effect on links, as a hover effect. It might be a little over the top, but we are here to have fun.

We will start with this simple markup, just a paragraph of Lorem ipsum, but with two links inside. Each link has the `.layeredText` class. Right now, those links will already have depth and layers applied, but that is not what we want. We want the 3D effect to appear only on hover.

To make that happen, we will define a new `:hover` block in `.layeredText` and move all the 3D related styles into it. That includes the color and shadow of the `span`, the color and `translateZ` of each `.layer`, and to make it look even better, we will also animate the [<FontIcon icon="iconfont icon-css-tricks"/>`opacity`](https://css-tricks.com/almanac/properties/o/opacity/) of the layers.

```css
.layeredText {
  &:hover {
    span {
      color: black;
      text-shadow: 0 0 0.1em #003;
    }

    .layer {
      color: hsl(200 30% calc(var(--n) * 100%));
      transform: translateZ(calc(var(--i) * var(--layer-offset) + 0.5em));
      opacity: 1;
    }
  }
}
```

Now we need to define the base appearance, the styles that apply when there is no hover. We will give the `span` and the layers a soft bluish color, apply a simple `transition`, and set the layers to be fully transparent by default.

```css
.layeredText {
  display: inline-block;

  span, .layer {
    color: hsl(200 100% 75%);
    transition: all 0.5s;
  }

  .layer {
    opacity: 0;
  }
}
```

Also, I added `display: inline-block;` to the `.layeredText` element. This helps prevent unwanted line breaks and allows us to apply transforms to the element, if needed. The result is a hover effect that literally makes each word pop right off the page:

CodePen Embed Fallback

Of course, if you are using this as a hover effect but you also have some elements that should always appear with full depth, you can easily define that in your CSS.

For example, let us say we have both a heading and a link with the `.layeredText` class, but we want the heading to always show the full 3D effect. In this case, we can update the hover block selector to target both:

```css
.layeredText {
  &:is(h1, :hover) {
    /* full 3D styles here */
  }
}
```

This way, links will only show the effect on hover, while the heading stays bold and dimensional all the time.

CodePen Embed Fallback

---

## Mouse Position

Now we can start working with the mouse position in JavaScript. To do that, we need two things: the position of the mouse on the page, and the position of each element on the page.

We will start with the mouse position, since that part is easy. All we need to do is add a `mousemove` listener, and inside it, define two CSS variables on the `body`: `--mx` for the horizontal mouse position, and `--my` for the vertical position.

```js
window.addEventListener('mousemove', e => {
  document.body.style.setProperty('--mx', e.pageX);
  document.body.style.setProperty('--my', e.pageY);
});
```

Notice that I am using `e.pageX` and `e.pageY`, not `e.clientX` and `e.clientY`. That is because I want the mouse position relative to the entire page, not just the viewport. This way it works correctly even when the page is scrolled.

---

## Position Elements

Now we need to get the position of each element, specifically the `top` and `left` values. We will define a function called `setRects` that loops through all `layeredElements`, finds their position using a `getBoundingClientRect` function, and sets it to a couple of CSS custom properties.

```js
function setRects() {
  layeredElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--top', rect.top + window.scrollY);
    element.style.setProperty('--left', rect.left + window.scrollX);
  });
}
```

Once again, I am using `window.scrollX` and `scrollY` to get the position relative to the entire page, not just the viewport.

Keep in mind that reading layout values from the DOM can be expensive in terms of performance, so we want to do it as little as possible. We will run this function once after all the layers are in place, and again only when the page is resized, since that could change the position of the elements.

```js
setRects();
window.addEventListener('resize', setRects);
```

---

## The Moving Red Dot

That is it. We are officially done writing JavaScript for this article. At this point, we have the mouse position and the position of every element stored as CSS values.

Great. So, what do we do with them?

Remember the examples from the previous chapter where we used [<FontIcon icon="iconfont icon-css-tricks"/>`background-image`](https://css-tricks.com/almanac/properties/b/background-image/)? That is the key. Let us take that same idea and use a simple radial gradient, from red to white.

```css
.layer {
  background-clip: text;
  color: transparent;
  background-image: radial-gradient(circle at center, red 24px, white 0);
}
```

But instead of placing the center of the circle in the middle of the element, we will shift it based on the mouse position. To calculate the position of the mouse relative to the element, we simply subtract the element’s position from the mouse position. Then we multiply by `1px`, since the value must be in pixels, and plug it into the `at` part of the gradient.

```css
.layer {
  background-image:
    radial-gradient(
      circle at calc((var(--mx) - var(--left)) * 1px)
                calc((var(--my) - var(--top)) * 1px),
      red 24px,
      white 0
    );
}
```

The result is text with depth and a small red dot that follows the movement of your mouse.

CodePen Embed Fallback

Okay, a small red dot is not exactly mind blowing. But remember, you are not limited to that. Once you have the mouse position, you can use it to drive all sorts of dynamic effects. In just a bit, we will start building the bulging effect that kicked off this entire series, but in other cases, depending on your needs, you might want to normalize the mouse values first.

---

## Normalizing Mouse Position

Just like we normalized the index of each layer earlier, we can normalize the mouse position by dividing it by the total width or height of the body. This gives us a value between `0` and `1`.

```js
document.body.style.setProperty('--nx', e.pageX / document.body.clientWidth);
document.body.style.setProperty('--ny', e.pageY / document.body.clientHeight);
```

Normalizing the mouse values lets us work with relative positioning that is independent of screen size. This is perfect for things like adding a responsive tilt to the text based on the mouse position.

CodePen Embed Fallback

---

## Bulging Text

Now we are finally ready to build the last example. The idea is very similar to the red dot example, but instead of applying the `background-image` only to the top layer, we will apply it across all the layers. The color is stored in a custom variable and used to paint the gradient.

```css
.layer {
  --color: hsl(200 30% calc(var(--n) * 100%));

  color: transparent;
  background-clip: text;
  background-image:
    radial-gradient(
      circle at calc((var(--mx) - var(--left)) * 1px)
                calc((var(--my) - var(--top)) * 1px),
                var(--color) 24px,
                transparent 0
    );
}
```

Now we get something similar to the red dot we saw earlier, but this time the effect spreads across all the layers.

CodePen Embed Fallback

---

## Brighter Base

We are almost there. Before we go any further with the layers, I want to make the base text look a bit weaker when the hover effect is not active. That way, we create a stronger contrast when the full effect kicks in.

So, we will make the `span` text transparent and increase the opacity of its shadow:

```css
span {
  color: transparent;
  text-shadow: 0 0 0.1em #0004;
}
```

Keep in mind, this makes the text nearly unreadable when the hover effect is not active. That is why it is important to use a proper media query to detect whether the device supports hover. Apply this styling only when it does, and adjust it for devices that do not.

```css
@media (hover: hover) {
  /* when hover is supported */
}
```

---

## Fixing Sizes

This is it. The only thing left is to fine tune the size of the gradient for each layer. And we are done. But I do not want the bulge to have a linear shape. Using the normalized value alone will give me evenly spaced steps across all layers. That results in a shape with straight edges, like a cone.

To get a more convex appearance, we can take advantage of the new trigonometric functions available in CSS. We will take the normalized value, multiply it by 90 degrees, and pass it through a [<FontIcon icon="fa-brands fa-firefox"/>`cos()`](https://developer.mozilla.org/en-US/docs/Web/CSS/cos) function. Just like the normalized value, the cosine will return a number between `0` and `1`, but with a very different distribution. The spacing between values is non-linear, which gives us that smooth convex curve.

```css
--cos: calc(cos(var(--n) * 90deg));
```

Now we can use this variable inside the gradient. Instead of giving the color a fixed radius, we will multiply `--cos` by whatever size we want the effect to be. I also added an absolute value to the calculation, so that even when `--cos` is very low (close to zero), the gradient still has a minimum visible size.

And, of course, we do not want sharp, distracting edges. We want a smooth fade. So, instead of giving the `transparent` a hard stop point, we will give it a larger value. The difference between the `var(--color)` and the `transparent` values will control how soft the transition is.

```css
background-image:
  radial-gradient(
    circle at calc((var(--mx) - var(--left)) * 1px)
              calc((var(--my) - var(--top)) * 1px),
              var(--color) calc(var(--cos) * 36px + 24px),
              transparent calc(var(--cos) * 72px)
  );
```

And just like that, we get an interactive effect that follows the mouse and gives the impression of bulging 3D text:

CodePen Embed Fallback

---

## Wrapping Up

At this point, our 3D layered text has gone from a static stack of HTML elements to a fully interactive, mouse-responsive effect. We built dynamic layers with JavaScript, normalized depth and scale, added responsive hover effects, and used live input to shape gradients and create a bulging illusion that tracks the user’s every move.

But more than anything, this chapter was about control. Controlling structure through code. Controlling behavior through input. And controlling perception through light, color, and movement. And we did it all with native web technologies.

This is just the beginning. You can keep going with noise patterns, lighting, reflections, physics, or more advanced motion behaviors. Now you have the tools to explore them, and to create bold, animated, expressive typography that jumps right off the screen.

Now go make something that moves.

::: info 3D Layered Text Article Series

```component VPCard
{
  "title": "3D Layered Text: The Basics",
  "desc": "A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series.",
  "link": "/css-tricks.com/3d-layered-text-the-basics.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Motion and Variations",
  "desc": "In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.",
  "link": "/css-tricks.com/3d-layered-text-motion-and-variations.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Interactivity and Dynamicism",
  "desc": "In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time.",
  "link": "/css-tricks.com/3d-layered-text-interactivity-and-dynamism.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "3D Layered Text: Interactivity and Dynamicism",
  "desc": "In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-interactivity-and-dynamism.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
