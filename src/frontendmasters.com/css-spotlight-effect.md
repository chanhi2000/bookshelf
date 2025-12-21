---
lang: en-US
title: "CSS Spotlight Effect"
description: "Article(s) > CSS Spotlight Effect"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Spotlight Effect"
    - property: og:description
      content: "CSS Spotlight Effect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-spotlight-effect.html
prev: /programming/css/articles/README.md
date: 2025-05-26
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5939
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
  name="CSS Spotlight Effect"
  desc="We can pass the mouse position from JavaScript to CSS and use it to make unusual and playful effects."
  url="https://frontendmasters.com/blog/css-spotlight-effect/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5939"/>

I recently made [an experiment (<VPIcon icon="fa-brands fa-codepen"/>`amit_sheen`)](https://codepen.io/amit_sheen/embed/gbbzbeR) about*Proximity Reactions*. The idea was to create an interactive effect according to the mouse position relative to elements. Then I made a *less JavaScript, more CSS* version where the only thing JavaScript does is to pass the mouse position into a couple of CSS custom properties. That’s it. All the heavy lifting happened inside the CSS itself, safely away from the JavaScript thread.

<CodePen
  user="amit_sheen"
  slug-hash="gbbzbeR"
  title="Proximity Reactions (CSS version)"
  :default-tab="['css','result']"
  :theme="dark"/>

That got me thinking: if we can get the mouse position in CSS so easily, what else can we build with that? I started tinkering, trying out different interaction patterns, and eventually got to this**Spotlight Effect** that’s easy to create, simple to customize, and looks surprisingly slick, all with just a few lines of CSS.

Let’s take a look at how it works and how you can make it your own, and hopefully you can pick up a few new CSS tricks along the way. 🙂

---

## The Setup

To create a spotlight effect that responds to the mouse position, we need to set up two small things before diving into the CSS.

1. We need a dedicated*spotlight*element in the DOM. This is usually placed near the end of the markup so it can sit on top of everything else when needed.
2. We need just a few lines of JavaScript to pass the mouse coordinates into CSS custom properties.

```html
<div class="spotlight"></div>
```

```js
document.body.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--clientX', e.clientX + 'px');
  document.body.style.setProperty('--clientY', e.clientY + 'px');
});
```

That is all. No fancy libraries, no event throttling, just raw coordinates handed over to CSS, where the real magic happens.

---

## Basic follow

Now that the setup is in place, we can start writing some CSS. We will begin with a very basic version of the spotlight effect: a simple transparent circle that follows the mouse movements. There are many ways to implement this kind of effect. Using`transform`is a common and often more precise approach in some cases. But for our example, we are going to tap into the power of`background-image`. This gives us a lot of creative flexibility, especially when we’ll start creating patterns with gradients later on.

Here is the CSS for our initial spotlight:

```css
.spotlight {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle at var(--clientX, 50%) var(--clientY, 50%), transparent 6em, black 8em);
}
```

Notice that we set`position: fixed`and`inset: 0`, this ensures that it fills the entire viewport, anchoring it to the edges of the body, and stays in place when the user scroll down the page. With that in place, we can position the transparent circle (made with a simple`radial-gradient`) using the CSS custom properties that our JavaScript sets. It really is that simple.

I’m using`em`units for sizing. This makes everything scale relative to the font size, and it makes it very easy to adjust the size of the entire effect just by changing the font size on this element.

Here is the result:

<CodePen
  user="amit_sheen"
  slug-hash="azzaVzv"
  title="Spotlight effect (demo 01)"
  :default-tab="['css','result']"
  :theme="dark"/>

To make the effect feel a bit lighter, I also added a touch of`opacity`. I think it creates a more layered and subtle look. More importantly, I set`pointer-events: none`on the`.spotlight`element. Since this layer sits above everything else in the DOM, we want to make sure it does not block any user interaction with the elements below it. Without this, buttons, links, and other interactive parts of the page would become unresponsive.

I’m**not**using `cursor: none;` here. While it might seem like an good choice for effects like this, hiding the mouse cursor can lead to accessibility issues and negatively impact the user experience. It’s generally best to avoid it.

---

## Making It Interesting

This is where things start to get fun. Instead of a simple circle, we can turn our spotlight into a dynamic, interactive effect that responds to the mouse movement in playful ways. The technique we will use involves layering gradients in the `background-image` and combining them in a gooey visual style. The result is a smooth, organic animation that feels alive under the cursor.

To achieve the gooey effect, we rely on the`filter`property, specifically a combination of`blur`and`contrast`. The blur softens the edges of the shapes, and the high contrast causes overlapping areas to merge into blobs. However, applying contrast on a transparent background does nothing. To fix that, we give the element a solid white`background-color`. Then, to make the white areas effectively transparent against the page, we use`mix-blend-mode: darken`.

![Start with a basic spotlight](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/ZNXB782.png?resize=320%2C321&ssl=1)

![Add a pattern using the`background-image`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Zqil84_4.png?resize=320%2C321&ssl=1)

![Set the`background-color`to white](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/3.png?resize=320%2C321&ssl=1)

![Apply the`filter`for the gooey effect](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/4.png?resize=320%2C321&ssl=1)

![Remove the white parts using`mix-blend-mode`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/5.png?resize=320%2C321&ssl=1)

And here is the code that sets up this visual base:

```css
.spotlight {
  filter: blur(1em) contrast(100);
  mix-blend-mode: darken;
  background-color: white;
}
```

Now that we have this setup, we can start layering more shapes, play with gradients, and watch the gooey interactions evolve as the mouse moves.

---

## The Blob Light

With the gooey base in place, we can use gradients to build more playful visual behaviors. Since `background-image` can accept a comma-separated list of layers, we can stack several gradients with varying styles, sizes, and positions. These layers blend together through the blur and contrast filters, resulting in a smooth, organic effect.

To create a blob-style spotlight, I made the main circle a bit larger and softer, and stacked two repeating linear gradients to form a diagonal grid pattern.

```css
.spotlight {
  background-image:
    radial-gradient(circle at var(--clientX, 50%) var(--clientY, 50%), transparent, black 20em),
    repeating-linear-gradient(45deg, black 0 0.4em, transparent 0 3em),
    repeating-linear-gradient(-45deg, black 0 0.4em, transparent 0 3em);
}
```

This is how the`background-image`looks like**without**the gooey setup:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/AuEuovV8.png?resize=320%2C321&ssl=1)

And the full blob effect:

<CodePen
  user="amit_sheen"
  slug-hash="GggXOMG"
  title="Spotlight effect (demo 02)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Fixing the Fuzzy Edges

You may have noticed in the previous example that the edges of the`.spotlight`element appear fuzzy, subtly revealing the content behind it. This is a side effect of the`blur`filter. When there’s nothing beyond the blurred edge for the`contrast`filter to respond to, the gradient just fades out softly. Visually, that results in blurry borders that break the clean feel of the effect.

There are a few ways to deal with this. Like scaling up the element, applying a negative`inset`, or manually setting a larger width and height. But all of these approaches introduce extra complexity, especially since you’d also have to compensate for the mouse coordinates shifting relative to the larger area.

A simpler and more robust fix is to add an`outline`. Just make sure it’s larger than the blur radius and matches the background color. That way, the fuzzy edges get hidden cleanly without affecting the positioning logic at all.

```css
.spotlight {
  outline: 2em solid white;
}
```

We’ll include this`outline`fix in all the following examples to keep things clean and crisp.

---

## Dotted Reveal

The reason the blob in the previous example appears to morph as the mouse moves is that, while the main circle follows the cursor, the grid pattern remains fixed on the screen. The interaction between these two layers creates the illusion of motion and shifting shapes within the spotlight.

Following the same principle, we can build a dotted effect. This time, instead of diagonal lines, we’ll use two radial gradients, and set a`background-size`to create a repeating pattern:

```css
.spotlight {
  background-image:
    radial-gradient(circle at var(--clientX, 50%) var(--clientY, 50%), transparent 6em, black 10em),
    radial-gradient(circle, black 0.2em, transparent 1em),
    radial-gradient(circle, black 0.2em, transparent 1em);
  background-size: 100% 100%, 2em 3em, 2em 3em;
  background-position: 0 0, 0 0, 1em 1.5em;
}
```

The first layer defines the moving mask (just like before), and the next two layers form the repeating dot pattern. By adjusting`background-position`, we offset the second dot layer to create the alternating effect. The result is a playful dotted texture that dynamically follows the mouse.

<CodePen
  user="amit_sheen"
  slug-hash="azzaXgz"
  title="Spotlight effect (demo 03)"
  :default-tab="['css','result']"
  :theme="dark"/>

All of the values in the last two examples (color stops, gradient sizes and positions, blur and contrast settings, and more) can be tweaked to create**wildly**different effects. I spent a lot of time experimenting before landing on these particular numbers, and I encourage you to do the same. Go ahead and fork one of the demos, adjust the gradients, play with the filter values, and see where your creativity takes you. And if you discover something cool, don’t forget to send it my way.

---

## Movement Interaction

In the previous examples, only the main circle responded to the cursor movement, but those same CSS variables can drive other visual elements as well. Here is an example that lays out a grid of squares using a`conic-gradient`. By offsetting its position by a fraction of the cursor coordinates (a factor of negative 0.25 in this case) we achieve a subtle parallax effect.

```css
.spotlight {
  background-image:
    radial-gradient(circle at var(--clientX, 50%) var(--clientY, 50%), transparent, black 14em),
    conic-gradient(from 270deg at 1em 1em, #aaa 90deg, transparent 0);
  background-size: 100% 100%, 3em 3em;
  background-position: 
    0 0, 
    calc(var(--clientX, 50%) * -0.25) calc(var(--clientY, 50%) * -0.25); /* only the conic layer moves */
}
```

You can comment out the`background-position`to see its affect, and feel free to tweak the offset factor and see how the motion transforms.

<CodePen
  user="amit_sheen"
  slug-hash="LEEgVyw"
  title="Spotlight effect (demo 04)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: tip

try adding a transition on the background’s position to add even more motion. 

```css
.spotlight {
  transition: background-position 0.5s ease-out;
}
```

:::

Remember these values can be used for anything. They’re just variables, and that means you can plug them into any CSS property that accepts dynamic values. For example, here’s an example where the mouse’s X position controls the amount of blur, and the Y position determines the size of the central circle.

<CodePen
  user="amit_sheen"
  slug-hash="myyzJoW"
  title="Spotlight effect (demo 05)"
  :default-tab="['css','result']"
  :theme="dark"/>

With just two custom properties, you’re suddenly controlling not only movement, but also style and intensity. You could just as easily hook the mouse into opacity, gradient angles, or any part of the effect you want to feel dynamic. What would you change in your effect?

---

## The Full Reveal

Up until now, we’ve been revealing only what’s inside the spotlight, with everything else hidden behind the dark blur. But what if we want to fully reveal the page in certain cases? For example, when hovering over a specific element, we might want to turn the effect off entirely and let the full content show.

Surprisingly, you don’t need any JavaScript to do this. With one clever CSS selector, we can ‘listen’ for a hover on elements with a specific class and adjust the effect accordingly.

```css
.spotlight {
  transition: opacity 1s, background-color 1s;

  body:has(.reveal:hover) & {
    opacity: 0;
    background-color: black;
  }
}
```

Now, any element with`class="reveal"`will temporarily disable the spotlight effect when hovered.

In terms of styling, there are a few ways to disable the effect. You could scale the gradient out, reduce the blur, or even hide the entire`.spotlight`element. In this case, I went with a combination of lowering the opacity and changing the background color. This gave me a subtle fade effect both in and out.

<CodePen
  user="amit_sheen"
  slug-hash="gbbBaeK"
  title="Spotlight effect (demo 06)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Light Spotlight

Until now, the hidden part of the page has been covered in black, creating a dark spotlight effect. But what if your design calls for a light version, with white as the cover color?

Turns out it’s pretty straightforward. All we need to do is invert the colors in our`.spotlight`element’s styles. Anything that was black becomes white, anything that was white becomes black (transparent stays as-is). And just as important, make sure to change the`mix-blend-mode` from `darken` to `lighten` so that the blending works correctly with the inverted color scheme.

<CodePen
  user="amit_sheen"
  slug-hash="raaQRWP"
  title="Spotlight effect (demo 07)"
  :default-tab="['css','result']"
  :theme="dark"/>

Of course, these values don’t have to be hard coded. You can define the colors and blend mode using CSS custom properties, giving you full control over the theme. Better yet, we can respond to user preferences using the`light-dark()` function and the`prefers-color-scheme`query to decide whether to use a light or dark spotlight effect.

```css
:root {
  color-scheme: light dark;

  --spotlight-cover: light-dark(white, black);
  --spotlight-reveal: light-dark(black, white);

  @media (prefers-color-scheme: dark) {
    --spotlight-blend-mode: darken;
  }
  
  @media (prefers-color-scheme: light) {
    --spotlight-blend-mode: lighten;
  }
}
```

This approach not only makes your spotlight more flexible, but also keeps it aligned with accessibility and user experience best practices.

<CodePen
  user="amit_sheen"
  slug-hash="jEEQoRG"
  title="Spotlight effect (demo 08)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adding Colors

So what about colors beyond just black or white? Black and white are great for creating strong contrast, but what if you want something a bit more… purple?

Well, at this point, we need to slightly rethink our approach. The gooey technique we’ve used so far works beautifully with monochrome because of the way`mix-blend-mode`interacts with light and dark. As soon as you start introducing color, things get trickier. The blend mode can dramatically shift the look and feel depending on how your chosen colors interact with the background and with each other.

You*can*try changing the colors to something like purple or teal, but it will alter the nature of the effect, sometimes in surprising ways, so I encourage you to experiment. And how knows, you might land on exactly the vibe you’re looking for.

<CodePen
  user="amit_sheen"
  slug-hash="ZYYVZPW"
  title="Spotlight effect (demo 09)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Mobile Support

This entire effect relies on mouse movement, so what happens when there’s no mouse? Rather than hiding content on touch devices, we’ll simply disable the effect altogether when we detect a mobile or touch-based screen. That way, users still see everything, just without the fancy spotlight interaction.

We can ensures that a device support hover interactions using the`hover`media query, which is supported on all major browsers. By wrapping the spotlight styles in a`@media (hover: hover)`we can apply the effect only on hover supported devices.

```css
@media (hover: hover) {
  .spotlight {
    /* spotlight styles */
  }
}
```

This media query works well for most cases, but some devices support both touch and mouse input. Think touchscreen laptops or tablets with external mice. In those cases, the effect might kick in when it shouldn’t.

To handle this more gracefully, we can back up our CSS with a small JavaScript snippet. It listens for a touch event and disables the effect as soon as a user interacts via touch. That way, the spotlight effect is removed dynamically if the device leans toward touch input.

```js
const mouseMoveHandler = (e) => {
  document.body.style.setProperty('--clientX', e.clientX + 'px');
  document.body.style.setProperty('--clientY', e.clientY + 'px');
};

document.body.addEventListener('mousemove', mouseMoveHandler);

document.body.addEventListener('touchstart', () => {
  document.body.classList.add('reveal');
  document.body.removeEventListener('mousemove', mouseMoveHandler);
});
```

And one last thing on this topic: we should also account for basic keyboard navigation. We do not want users tabbing into elements that are visually hidden by the effect, so we will also disable it in that case. This can be detected using`body:has(:focus-visible)`, which tells us when one of our elements is focused. You can combine this selector with your`.reveal`logic to ensure the effect is turned off when keyboard navigation kicks in.

```css
@media (hover: hover) {
  .spotlight {
    /* spotlight styles */

    body:has(.reveal:hover, :focus-visible) & {
      opacity: 0;
      background-color: black;
    }
  }
}
```

With this setup, the effect behaves just right: it kicks in only when it makes sense and stays out of the way when it doesn’t. Mobile users still get the full content, and hybrid devices adapt in real time.

---

## The Ultimate Spot

Before we wrap up, here is a quick demo that brings together most of what we explored. A spotlight with a blob gooey effect, crisp edges, theme switching, and full mobile and keyboard navigation support. All within scrollable content, with areas that disable the effect on hover.

<CodePen
  user="amit_sheen"
  slug-hash="wBBNrYa"
  title="Spotlight effect (demo 10)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Taking It Further

All of the ideas in this article are just starting points. Now it’s your turn to run with them. You can play with gradient backgrounds and tweak their sizes and positions. You can experiment with filter settings or try different blend mode options to see what new moods emerge. You might also pull extra data from JavaScript (like the cursor angle relative to an element or the speed of movement) and feed that into your styles for even richer effects.

In this article, I’ve used a single `<div>` for the`.spotlight`element, but feel free to layer in additional elements, icons, text, or graphic shapes within the reveal area. Apply the same technique to multiple elements with their own custom settings. The possibilities are endless, so let your imagination guide you and discover what unique interactions you can build.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Spotlight Effect",
  "desc": "We can pass the mouse position from JavaScript to CSS and use it to make unusual and playful effects.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-spotlight-effect.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
