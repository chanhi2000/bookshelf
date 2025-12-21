---
lang: en-US
title: "The Deep Card Conundrum"
description: "Article(s) > The Deep Card Conundrum"
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
      content: "Article(s) > The Deep Card Conundrum"
    - property: og:description
      content: "The Deep Card Conundrum"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-deep-card-conundrum.html
prev: /programming/css/articles/README.md
date: 2025-12-04
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7957
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
  name="The Deep Card Conundrum"
  desc="What if you could make a card like a 3D portal, with layers of depth? You probably should just click to see, it's a very compelling look."
  url="https://frontendmasters.com/blog/the-deep-card-conundrum/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7957"/>

In the world of web design, we often talk about “cards”. Those neat little rectangles that group information together are the bread and butter of modern UI. But usually, these cards are as flat as the screens they live on. Maybe they have a subtle drop shadow to hint at elevation, but that’s where the illusion ends.

But what if a card wasn’t just a surface? What if it was a *window*?

Enter the **Deep Card**.

<CodePen
  link="https://codepen.io/anon/ZYWrKoP/ebbe7336c4eac3acf7e9fde40387c8bc"
  title="deep card (demo 01)"
  :default-tab="['css','result']"
  :theme="dark"/>

Imagine a card that isn’t just a 2D plane, but a container with actual volume. A card that holds a miniature 3D world inside it. When you rotate this card, you don’t just see it skew, you see the elements inside it shift in perspective, revealing their depth. It’s like holding a glass box filled with floating objects.

The effect is mesmerizing. It transforms a static element into something tactile and alive. It invites interaction. Whether it’s for a digital trading card game, a premium product showcase, or just a portfolio piece that screams “look at me,” the Deep Card adds a layer of polish and “wow” factor that flat design simply can’t match.

But as I quickly discovered, building this illusion, especially one that feels right and performs smoothly, is a bit more of a puzzle than it first appears.

---

## The CSS Trap

There are plenty of JavaScript libraries out there that can handle this, but I’m a bit of a CSS purist (read: stubborn). I’ve spent years pushing stylesheets to their absolute limits, and I was convinced that a clean, performant, pure CSS solution was hiding in plain sight.

On paper, the logic seems flawless. If you’ve dabbled in 3D CSS before, you know the drill:

1. **Set the Stage**: Take a container element and give it some `perspective`.
2. **Build the World**: Position the child elements in 3D space (`translateZ`, `rotateX`, etc.).
3. **Preserve the Illusion**: Apply `transform-style: preserve-3d` so all those children share the same 3D space.

Simple, right?

But here’s the catch. For a true “card” effect, you need the content to stay *inside* the card boundaries. If a 3D star floats “up” towards the viewer, you don’t want it to break the frame, you want it to be clipped by the card’s edges, reinforcing the idea that it’s inside a container.

So, naturally, you add `overflow: clip` (or `hidden`) to the card. And that is the exact moment everything falls apart.

![Comparison of overflow properties in CSS: left shows 'overflow: visible;' with layered rectangles, right shows 'overflow: clip;' with clipped edges.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/t0LtCaNQ.png?resize=1024%2C567&ssl=1)

<CodePen
  link="https://codepen.io/anon/RNaQZew/af221d197a7af667776c8a1936e186e6"
  title="Deep Card (demo 02)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Spec Says No

Suddenly, your beautiful 3D scene flattens out. The depth vanishes. The magic is gone.

Why? Because according to the [CSS Transforms Module Level 2 specification](https://w3.org/TR/css-transforms-2/#grouping-property-values), applying any “grouping property” like `overflow` (with any value other than `visible`), `opacity` less than 1, or `filter`, forces the element to flatten.

::: note The sad reality

A value of `preserve-3d` for `transform-style` is ignored if the element has any grouping property values.

:::

In other words: you can have a 3D container, or you can clip its content. **You cannot do both on the same element.**

For a long time, this felt like a dead end. How do you keep the 3D depth while keeping the elements contained?!

---

## Faking It

If the spec says we can’t have both perspective and clipping, maybe we can cheat. If we can’t use real 3D depth, perhaps we can fake it.

Faking perspective is a time-honored tradition in 2D graphics. You can simulate depth by manipulating the size and position of elements based on their “distance” from the viewer. In CSS terms, this means using `scale()` to make things smaller as they get “further away” and `translate()` to move them relative to the card’s angle.

```css
.card {
  /* --mouse-x and --mouse-y values ranage from -1 to 1 */
  --tilt-x: calc(var(--mouse-y, 0.1) * -120deg); 
  --tilt-y: calc(var(--mouse-x, 0.1) * 120deg); 
  transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
}

.card-layer {
  /* Fake perspective with scale and translate */
  scale: calc(1 - var(--i) * 0.02);
  translate:
    calc(var(--mouse-x) * (var(--i)) * -20%)
    calc(var(--mouse-y) * (var(--i)) * -20%);
}
```

This technique can work wonders. There are some brilliant examples out there, like [this one by Jhey (<VPIcon icon="fa-brands fa-x-twitter"/>`jh3yy`)](https://x.com/jh3yy/status/1987670585133187417), that pull off the effect beautifully without using a single line of `perspective` or `preserve-3d`.

It’s a solid approach. It’s performant, it works across browsers, and for subtle effects, it’s often indistinguishable from the real thing.

**But it has a ceiling.**

The illusion holds up well within a limited range of motion. But the moment you push it too far, say, by rotating the card to a sharp angle or trying to flip it 180 degrees, the math starts to show its cracks. The perspective flattens out, and the movement stops feeling natural.

<CodePen
  link="https://codepen.io/anon/raeJPLq/35bcca4b4b9aa9f3e8c8a2d52b989181"
  title="deep card (demo 03)"
  :default-tab="['css','result']"
  :theme="dark"/>

As you can see, when the card turns, the inner elements lose their spatial relationship. The magic evaporates. So while this is a great tool for the toolbox, it wasn’t the complete solution I was looking for. I wanted the real deal. Full 3D, full rotation, full clipping.

---

## Road to a Nowhere

I spent years (on and off, I’m not *that* obsessed) trying to crack this. I was convinced there had to be a way to have my cake and eat it too.

Theoretically, there *is* a way. If you can’t clip the container, you have to clip the children.

Imagine using `clip-path` on every single layer inside the card. You would need to calculate, in real-time, exactly where the edges of the card are relative to the viewer, and then apply a dynamic clipping mask to each child element so that it cuts off exactly at those boundaries.

This involves a lot of math, even for me. We’re talking about projecting 3D coordinates onto a 2D plane, calculating intersections, and handling the trigonometry of the user’s perspective.

![A textured blackboard covered with various mathematical equations, diagrams, and symbols, creating a complex academic backdrop.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/Rw8ilzFF.png?resize=1024%2C512&ssl=1)

I was almost ready to give up and accept that maybe, just maybe, this was one of those things CSS just wasn’t meant to do. And then, I got a message from [<VPIcon icon="fa-brands fa-x-twitter"/>`CubiqNation`](https://x.com/CubiqNation).

---

## The Breakthrough

This wasn’t the first time someone had asked me about this topic. As someone who’s known for pushing CSS 3D to its limits, I get this question a lot. People assume I have the answer. But, well… I didn’t.

So when Cubiq messaged me, showing me a GIF of a fully rotating card with deep 3D elements and asking how to achieve it, I went into auto-pilot. I gave him the standard explanation on why the spec forbids it, why `overflow` flattens the context, and how he could try to fake it with `scale` and `translate`.

I thought that was the end of it, but then, he surprised me.

![A screenshot of a messaging app conversation featuring a user's message expressing excitement about a discovery.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image.png?resize=602%2C230&ssl=1)

---

## My Personal Blind Spot

I’ve tried many tricks over the years, but one property I religiously avoided was `perspective-origin`.

If you really dig into how CSS calculates perspective, you realize that `perspective-origin` doesn’t just shift your point of view. It fundamentally skews the entire viewport. It creates this weird, unnatural distortion that usually looks terrible.

::: info

I cover this at length in my talk [<VPIcon icon="fa-brands fa-youtube"/>3D in CSS, and the True Meaning of Perspective](https://youtu.be/LzDf8BizhmQ), if you’re into that sort of thing.

:::

Cubiq, however, didn’t have my baggage. He looked at the problem with fresh eyes and realized something brilliant: just as `perspective-origin` can be used to *create* distortion, it can also be used to *correct* it.

::: note

Alternate blog post title idea: **Finally, we found one good use for `perspective-origin`!** 🤣

:::

---

## The Solution

Here is the magic formula that Cubiq came up with:

```css
.card-container {
  transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
}

.card {
  perspective: calc(
    cos(var(--tilt-x)) * cos(var(--tilt-y)) * var(--perspective)
  );
  perspective-origin: 
    calc(cos(var(--tilt-x)) * sin(var(--tilt-y)) * var(--perspective) * -1 + 50%)
    calc(sin(var(--tilt-x)) * var(--perspective) + 50%);
  overflow: clip;
}
```

It looks a bit scary at first glance, but the logic is actually quite elegant.

Since we are using `overflow: clip`, the 3D context is flattened. This means the browser treats the card as a flat surface and renders its children onto that surface. Normally, this flattening would kill the 3D effect of the children. They would look like a flat painting on a rotating wall.

But here is the trick: **We use** `perspective` **and** `perspective-origin` **to counter-act the rotation.**

By dynamically calculating the `perspective-origin` based on the card’s tilt, we are essentially telling the browser: “Hey, I know you flattened this element, but I want you to render the perspective of its children *as if* the viewer is looking at them from this specific angle.”

We are effectively projection-mapping the 3D scene onto the 2D surface of the card. The math ensures that the projection aligns perfectly with the card’s physical rotation, creating the illusion of a deep, 3D space inside a container that the browser considers “flat.”

<CodePen
  link="https://codepen.io/anon/JoXWpYB/a3a2a25cca5bad7f5e83d17519abf503"
  title="deep card (demo 04)"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s not about moving the world inside of the card, it’s about tricking the flat projection to look 3D by aligning the viewer’s perspective with the card’s rotation.

---

## The Lesson

I love this solution not just because it works (and it works beautifully), but because it taught me a humbling lesson.

I had written off `perspective-origin` as a “bad” property. I had a mental block against it because I only saw it as a source of distortion. I was so focused on the “right” way to do 3D, that I blinded myself to the tools that could actually solve the problem.

Cubiq didn’t have that bias. He saw a math problem: “I need the projection to look like X when the rotation is Y.” And he found the property that controls projection.

---

## Breaking It Down

Now that we know it’s possible, let’s break down exactly what’s happening here, step by step, and look at some examples of what you can do with it. Let’s start with the basics.

### The HTML

At its core, the structure is simple. We have a `.card-container` that holds the `.card`, which in turn contains the `.card-content`, that is the ‘front’ of the card and where all the inner layers live. and the `card-back` for the back face.

```html
<div class="outer-container">
  <div class="card">
    <div class="card-content">
      <!-- Inner layers go here -->
    </div>
    <div class="card-back">
      <!-- Back face content -->
    </div>
  </div>
</div>
```

Inside the `.card-content`, we can now add `.card-layers` with multiple layers in it. Here I’m setting a `--i` custom property on each layer to later control its depth.

```html
<div class="card-layers">
  <div class="card-layer" style="--i: 0"></div>
  <div class="card-layer" style="--i: 1"></div>
  <div class="card-layer" style="--i: 2"></div>
  <div class="card-layer" style="--i: 3"></div>
  <!-- more layers as needed -->
</div>
```

Now we can fill each layer with content, images, text, or whatever we want.

### The Movement

To create the rotation effect, we need to track the mouse position and convert it into tilt angles for the card. So the first thing we need to do is to map the mouse position into two CSS variables, `--mouse-x` and `--mouse-y`.

This is done with few simple lines of JavaScript:

```js
const cardContainer = document.querySelector('.card-container');

window.addEventListener('mousemove', (e) => {
  const rect = cardContainer.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * 2 - 1;
  const y = (e.clientY - rect.top) / rect.height * 2 - 1;
  cardContainer.style.setProperty('--mouse-x', x);
  cardContainer.style.setProperty('--mouse-y', y);
});
```

This gives us normalized values between -1 and 1 on each axis, so we can use them regardless of the card size or aspect ratio.

We convert these values to `--tilt-x` and `--tilt-y` in CSS, by multiplying them by the number of degrees we want the card to rotate:

```css
--tilt-x: calc(var(--mouse-y, 0.1) * -120deg);
--tilt-y: calc(var(--mouse-x, 0.1) * 120deg);
```

The higher the degree value, the more dramatic the rotation. 20–30 degrees will give us a subtle effect, while 180 degrees will spin the card all the way around.

Notice that `--mouse-x` affects `--tilt-y`, because movement of the mouse along the X axis should actually rotate the card around the Y axis, and vice versa. Also, we multiply `--mouse-y` by a negative number, because the Y axis on the screen is inverted compared to the mathematical Y axis.

Now that we have `--tilt-x` and `--tilt-y`, we can start using them. And first, we apply them to the card container to rotate it in 3D space:

```css
.card {
  transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
}
```

This gives us the basic rotation effect. The card will now tilt and spin based on the mouse position.

### The Perspective

We need to remember that we need to set **two** different perspectives: one for the card’s container (to create the 3D effect), and one for the card’s content (to maintain the depth of the inner elements).

on the `.card-container` we set a standard perspective:

```css
.card-container {
  perspective: var(--perspective);
}
```

You can set `--perspective` to any value you like, but a good starting point is around `800px`. Lower values will create a more dramatic perspective, while higher values will make it more subtle.

To preserve the 3D space and making sure all the inner elements share the same 3D context, we set `transform-style: preserve-3d`. I’m using the universal selector here to apply it to all children elements:

```css
* {
  transform-style: preserve-3d;
}
```

To deal with the inner perspective, we set up the `perspective` and `perspective-origin` on the `.card-content` element, which holds all the inner layers:

```css
.card-content {
  perspective: calc(
    cos(var(--tilt-x)) * cos(var(--tilt-y)) * var(--perspective)
  );
  perspective-origin: 
    calc(cos(var(--tilt-x)) * sin(var(--tilt-y)) * var(--perspective) * -1 + 50%)
    calc(sin(var(--tilt-x)) * var(--perspective) + 50%);
  overflow: clip;
}
```

Note that we added `overflow: clip` to the `.card-content` to ensure that the inner elements are clipped by the card boundaries. This combination of `perspective`, `perspective-origin`, and `overflow: clip` is what allows us to maintain the 3D depth of the inner elements while keeping them contained within the card.

### The Depth

Now that we have the rotation and perspective set up, we can start adding depth to the inner layers. Each layer will be positioned in 3D space using `translateZ`, based on its `--i` value.

```css
.card-layer {
  position: absolute;
  transform: translateZ(calc(var(--i) * 1rem));
}
```

This will space out the layers along the Z axis, creating the illusion of depth. You can adjust the multiplier (here `1rem`) to control how far apart the layers are.

---

## Putting It All Together

Using the techniques outlined above, we can create a fully functional Deep Card that responds to mouse movement, maintains 3D depth, and clips its content appropriately.

Here is a complete ‘boilerplate’ example:

<CodePen
  link="https://codepen.io/anon/QwNmjqo/3209fa5150d0d591176cbffac7129892"
  title="Deep Card (demo 05)"
  :default-tab="['css','result']"
  :theme="dark"/>

You can customize it to your needs, set the number of layers, their depth, and add content within each layer to create a wide variety of Deep Card effects.

---

## Getting Deeper

To improve the Deep Card effect and further enhance the perception of depth, we can add shadows and darkening effects to the layers.

One way to achieve darker colors is just using darker colors. We can calculate the brightness of each layer based on its depth, making deeper layers darker to simulate light falloff.

```css
.card-layer {
  color: hsl(0 0% calc(100% - var(--i) * 9%));
}
```

Another technique is to add semi-transparent background to each layer. This way each layer is like screen that slightly darkens the layers behind it, enhancing the depth effect.

```css
.card-layer {
  background-color: #2224;
}
```

Here is an example of a two cards with different effects: The first card uses darker colors for deeper layers, while the second card uses semi-transparent overlays to create a more pronounced depth effect.

<CodePen
  link="https://codepen.io/anon/bNpMoKq/71f99a6de6c2d62e80d7acfc1157da24"
  title="Deep Card (demo 06)"
  :default-tab="['css','result']"
  :theme="dark"/>

Choose the one that fits your design best, or combine both techniques for an even richer depth experience.

---

## The `z-index` Effect

You might notice that I’m placing all the layers inside a container (`.card-layers`) rather than making them direct children of `.card-content`. The reason is that since we’re moving the layers along the Z axis, we don’t want them to be direct children of an element with `overflow: clip;` (like `.card-content`).

As mentioned earlier, once you set `overflow: clip;` on `.card-content`, its `transform-style` becomes `flat`, which means all of its direct children are rendered on a single plane. Their stacking order is determined by `z-index`, not by their position along the Z axis. By wrapping the layers in a container, we preserve their 3D positioning and allow the depth effect to work as intended.

### The Twist

Now that we understand this limitation, let’s turn it to our advantage and see what kinds of effects we can create with it.

Here are the exact same two cards as in the previous example, but this time without a `.card-layers` container. The layers are direct children of `.card-content`:

<CodePen
  link="https://codepen.io/anon/VYaxybX/060e427f5276054c778606a9b50be906"
  title="Deep Card (demo 07)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adding Interaction

We often use cards that need to display extra information. One of my favorite things to do in these cases is to rotate the card 180 degrees and reveal the additional content on the back side. Now, we can do exactly that, and build an entire 3D world inside the card.

<CodePen
  link="https://codepen.io/anon/pvyLELR/1d666cd030f54aad4d970aaaf9873046"
  title="Deep Card (demo 07)"
  :default-tab="['css','result']"
  :theme="dark"/>

In this example, we have a front face (`.card-content`) and a back face (`.card-back`). When the user clicks the card, we toggle a checkbox that rotates the card 180 degrees, revealing the back face.

```html
<label class="card-container">
  <input type="checkbox">
  <div class="card">
    <div class="card-content">
      <!-- front face content -->
    </div>
    <div class="card-back">
      <!-- back face content -->
    </div>
  </div>
</label>
```

```css
.card-container {
  cursor: pointer;
    
  &:has(input:checked) .card {
    rotate: y 180deg;
  }
  
  input[type="checkbox"] {
    display: none;
  }
}
```

You can also use a `button` or any other interactive element to toggle the rotation, depending on your use case, and use any animation technique you like to make the rotation smooth.

---

## Inner Movement

Of course, we can also use any animation on the inner layers to create dynamic effects. It can be wild and complex, or subtle and elegant. The key is that since the layers are in 3D space, any movement along the Z axis will enhance the depth effect.

Here a simple example with parallax layers. each layer animates it’s background position on the X axis, and to enhance the depth effect, I’m animating the layers at different speeds based on their depth:

```css
.card-layer {
  animation: layer calc(var(--i) * 8s) infinite linear;
}
```

And the result:

<CodePen
  link="https://codepen.io/anon/bNpMQxj/5bd4b50fedc6080cfa517d9cf625d81e"
  title="Deep Card (demo 9)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Deep Text Animation

This technique works beautifully with the concept of layered text, opening up a world of creative possibilities. There’s so much you can do with it, from subtle depth effects to wild, animated 3D lettering.

I actually [**wrote an entire article about this**](/css-tricks.com/3d-layered-text-motion-and-variations.md), featuring 20+ examples, and every single one of them looks fantastic inside a Deep Card. Here’s one of the examples from that article, now living inside a card:

<CodePen
  link="https://codepen.ioanon/JoXLJQy/657423f3dbb8bf5781b534b8b79de0c5"
  title="Deep Card (demo 10)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Going Full 360

up until now, we’ve mostly focused on layering our inner content and using the Z axis to create depth. But we can definitely take it a step further, break out of the layering concept, and build a fully 3D object that you can spin around in all directions.

<CodePen
  link="https://codepen.io/anon/QwNrEoP/9438cf97b6330d2e5f3c30726291c472"
  title="Deep Card (demo 11)"
  :default-tab="['css','result']"
  :theme="dark"/>

From here, the possibilities are truly endless. You can keep experimenting—add more interactions, more layers, or even create effects on both sides of the card to build two complete worlds, one on each face. Or, go all in and design an effect that dives deep into the card itself. The only real limit is your imagination.

---

## Conclusion

The **Deep Card** is now a solved problem. We can have our cake (3D depth), eat it (clipping), and even spin it around 360 degrees without breaking the illusion.

So, the next time you hit a wall with CSS, and you’re sure you’ve tried everything, maybe take a second look at those properties you swore you’d never use. You might just find your answer hiding in the documentation you skipped.

Now, go build something deep.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Deep Card Conundrum",
  "desc": "What if you could make a card like a 3D portal, with layers of depth? You probably should just click to see, it's a very compelling look.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-deep-card-conundrum.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
