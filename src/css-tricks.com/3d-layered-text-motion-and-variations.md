---
lang: en-US
title: "3D Layered Text: Motion and Variations"
description: "Article(s) > 3D Layered Text: Motion and Variations"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 3D Layered Text: Motion and Variations"
    - property: og:description
      content: "3D Layered Text: Motion and Variations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-motion-and-variations.html
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

[[toc]]

---

<SiteInfo
  name="3D Layered Text: Motion and Variations"
  desc="In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe."
  url="https://css-tricks.com/3d-layered-text-motion-and-variations"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/bulging-text.jpg"/>

In the previous chapter, we built a basic 3D layered text effect using nothing but HTML and CSS. It looks great and has a solid visual presence, but it’s completely static. That is about to change.

In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.

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

::: warning ⚠️ Motion Warning

This article contains multiple animated examples that may include flashing or fast moving visuals. If you are sensitive to motion, please proceed with caution.

:::

---

## ‘Counter’ Animation

Let’s start things off with a quick animation tip that pairs perfectly with layered 3D text. Sometimes, we want to rotate the element without actually changing the orientation of the text so it stays readable. The trick here is to combine multiple rotations across two axes. First, rotate the text on the z-axis. Then, add a tilt on the x-axis. Finally, rotate the text back on the z-axis.

```css
@keyframes wobble {
  from { transform: rotate(0deg) rotateX(20deg) rotate(360deg); }
  to { transform: rotate(360deg) rotateX(20deg) rotate(0deg); }
}
```

Since we rotate on the z-axis and then reverse that rotation, the text keeps its original orientation. But because we add a tilt on the x-axis in the middle, and the x-axis itself keeps rotating, the angle of the tilt changes as well. This creates a kind of **wobble** effect that shows off the text from every angle and emphasizes the sense of depth.

<CodePen
  link="htps://codepen.io/amit_sheen/VYLoLar/56c8a39dfb7030b9b270745d636b8071"
  title="Layered Text (Demo 3)"
  :default-tab="['css','result']"
  :theme="dark"/>

If we want to take this a few steps further, we can combine the wobble with a **floating** effect. We will animate the `.layers` slightly along the z-axis:

```css
.layers {
  animation: hover 2s infinite ease-in-out alternate;
}

@keyframes hover {
  from { transform: translateZ(0.3em); }
  to { transform: translateZ(0.6em); }
}
```

To really sell the effect, we will leave the original span in place — like a shadowed anchor — change its color to transparent, and animate the blur factor of its [<VPIcon icon="iconfont icon-css-tricks"/>`text-shadow`](https://css-tricks.com/almanac/properties/t/text-shadow/):

```css
span {
  color: transparent;
  animation: shadow 2s infinite ease-in-out alternate;
}

@keyframes shadow {
  from { text-shadow: 0 0 0.1em #000; }
  to { text-shadow: 0 0 0.2em #000; }
}
```

Syncing those two animations together gives the whole thing a more realistic feel:

<CodePen
  link="htps://codepen.io/amit_sheen/raOeBJp/f60143e5e33d2cfa880ff7e0922da049"
  title="Layered Text (Demo 4)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Splitting Letters

OK, this is starting to look a lot better now that things are moving. But the whole word is still moving as one. Can we make each letter move independently? The answer, as usual, is “yes, but…”

It is absolutely possible to split each word into a separate letters and animate them individually. But it also means a lot more elements moving on the screen, and that can lead to performance issues. If you go this route, try not to animate too many letters at once, and consider reducing the number of layers.

In the next example, for instance, I reduced the layer count to sixteen. There are five letters, and to place them side by side, I gave the `.scene` a `display: flex`, then added a small delay to each letter using [<VPIcon icon="iconfont icon-css-tricks"/>`:nth-child`](https://css-tricks.com/almanac/pseudo-selectors/n/nth-child/):
<CodePen
  user=""
  slug-hash="Angles"
  title=""
  :default-tab="['css','result']"
  :theme="dark"/>Until now, we have only been moving the text along the z-axis, but we can definitely take it further. Each layer can be moved or rotated in any direction you like, and if we base those transformations on the `--n` variable, we can create all sorts of interesting effects. Here are a few I played with, just to give you some ideas.

In the first one, I am animating the `translateX` to create a **shifting** effect:

<CodePen
  link="htps://codepen.io/amit_sheen/wBKMdjW/e7c45a8f32b6458a85034e3c0a340812"
  title="Layered Text (Demo 5)"
  :default-tab="['css','result']"
  :theme="dark"/>

In the others, I am adding a bit of rotation. The first one is applied to the y-axis for the **sloping** effect:

<CodePen
  link="htps://codepen.io/amit_sheen/bNVpGMa/1d260c5be84033b728d18bcf3b937402"
  title="Layered Text (Demo 6-2)"
  :default-tab="['css','result']"
  :theme="dark"/>

This next example applies rotation on the x-axis for the **tilting**:

<CodePen
  link="htps://codepen.io/amit_sheen/azvNbRo/025b2aeee88554c5432bbeeb31daf939"
  title="Layered Text (Demo 6-3)"
  :default-tab="['css','result']"
  :theme="dark"/>

And, finally, we can apply it on the z-axis for a **rotating** example:

<CodePen
  link="htps://codepen.io/amit_sheen/qEOZBJd/14051d996d62a18869974df58d70cad0"
  title="Layered Text (Demo 6-4)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Layer Delay

Working with separate layers does not just let us tweak the animation for each one; it also lets us adjust the `animation-delay` for every layer individually, which can lead to some really interesting effects. Let us take this **pulsing** example:

<CodePen
  link="htps://codepen.io/amit_sheen/qEOZEYj/3440dbe6c772792d9da7edda6e356ca8"
  title="Layered Text (Demo 7)"
  :default-tab="['css','result']"
  :theme="dark"/>

Right now, the animation is applied to the `.layeredText` element itself, and I am simply changing its scale:

```css
.layeredText {
  animation: pulsing 2s infinite ease-out;
}

@keyframes pulsing {
  0%, 100% { scale: 1; }
  20% { scale: 1.2; }
}
```

But we can apply the animation to each layer separately and give each one a slight delay. Note that the `span` is part of the stack. It is a layer, too, and sometimes you will want to include it in the animation:

```css
.layer {
  --delay: calc(var(--n) * 0.3s);
}

:is(span, .layer) {
  animation: pulsing 2s var(--delay, 0s) infinite ease-out;
}
```

Here I am using the [<VPIcon icon="iconfont icon-css-tricks"/>`:is`](https://css-tricks.com/almanac/pseudo-selectors/i/is/) selector to target both the individual layers and the `span` itself with the same animation. The result is a much more lively and engaging effect:

<CodePen
  link="htps://codepen.io/amit_sheen/ogjxgMo/4154f7659c6bfe2ccac29fe75e5ad939"
  title="Layered Text (Demo 8)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Pseudo Decorations

In the previous chapter, I mentioned that I usually prefer to save pseudo elements for decorative purposes. This is definitely a technique worth using. We can give each layer one or two pseudo elements, add some content, position them however we like, and the 3D effect will already be there.

It can be anything from simple outlines to more playful shapes. Like **arrows**, for example:

<CodePen
  link="htps://codepen.io/amit_sheen/VYveMmg/0f02404ccc551fd90270ae6915ab6e5f"
  title="Layered Text (Demo 9)"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that I am using the `:is` selector to include the `span` here, too, but sometimes we will not want to target all the layers — only a specific portion of them. In that case, we can use `:nth-child` to select just part of the stack. For example, if I want to target only the bottom twelve layers (out of twenty four total), the decoration only covers half the height of the text. I can do something like `:nth-child(-n + 12)` , and the full selector would be:

```css
:is(span, .layer:nth-child(-n + 12))::before {
  /* pseudo style */
}
```

This is especially useful when the decoration overlaps with the text, and you do not want to cover it or make it hard to read.

<CodePen
  link="htps://codepen.io/amit_sheen/OPyNVvP/45741e6a4e668e2d96d8e74ee6a48068"
  title="Layered Text (Demo 10)"
  :default-tab="['css','result']"
  :theme="dark"/>

Of course, you can animate these pseudo elements too. So how about a 3D “**Loading**” text with a built-in spinner?

<CodePen
  link="htps://codepen.io/amit_sheen/EaVPQpe/9791bd762440035ae602783a54f1143d"
  title="Layered Text (Demo 11)"
  :default-tab="['css','result']"
  :theme="dark"/>

I made a few changes to pull this off. First, I selected twelve layers from the middle of the stack using a slightly more advanced selector: `.layer:nth-child(n + 6):nth-child(-n + 18)`. This targets the layers from number six to eighteen.

Second, to fake the shadow, I added a blur filter to the `span`‘s pseudo element. This creates a nice soft effect, but it can cause performance issues in some cases, so use it with care.

```css
:is(span, .layer:nth-child(n + 6):nth-child(-n + 18))::before {
  /* spinner style */
}

span {
  /* span style */

  &::before {
    filter: blur(0.1em);
  }
}
```

---

## Face Painting

But you don’t have to use pseudo elements to add some visual interest. You can also style any text with a custom pattern using `background-image`. Just select the top layer with the `:last-child` selector, set its text color to `transparent` so the background shows through, and use `background-clip: text`.

```css
.layer {
  /* layer style */
    
  &:last-child {
    color: transparent;
    background-clip: text;
    background-image: ... /* use your imagination */
  }
}
```

Here is a small demo using striped **lines** with `repeating-linear-gradient`, and **rings** made with `repeating-radial-gradient`:

<CodePen
  link="htps://codepen.io/amit_sheen/XJmddwY/cdd0ccb903ccef1fe86bed2a674436a7"
  title="Layered Text (Demo12)"
  :default-tab="['css','result']"
  :theme="dark"/>

And, yes, you can absolutely use an **image** too:

<CodePen
  link="htps://codepen.io/amit_sheen/pvjybba/fb4ee6af8d472b94be4123118ac64a89"
  title="Layered Text (Demo12-2)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Animating Patterns

Let us take the previous idea a couple of steps further. Instead of applying a pattern just to the top layer, we will apply it to all the layers, creating a full 3D pattern effect. Then we will animate it.

We’ll start with the colors. First, we give all the layers a `transparent` text color. The color we used before will now be stored in a custom property called `--color`, which we will use in just a moment.

```css
.layer {
  --n: calc(var(--i) / var(--layers-count));
  --color: hsl(200 30% calc(var(--n) * 100%));

  color: transparent;
}
```

Now let’s define the background, and we’ll say we want a moving **checkerboard** pattern. We can create it using `repeating-conic-gradient` with two colors. The first will be our `--color` variable, and the second could be `transparent`. But in this case, I think black with very low opacity works better.

We just need to set the [<VPIcon icon="iconfont icon-css-tricks"/>`background-size`](https://css-tricks.com/almanac/properties/b/background-size/) to control the pattern scale, and of course, make sure to apply `background-clip: text` here too:

```css
.layer {
  --n: calc(var(--i) / var(--layers-count));
  --color: hsl(200 30% calc(var(--n) * 100%));

  color: transparent;
  background-image:
    repeating-conic-gradient(var(--color) 0 90deg, hsl(0 0% 0% / 5%) 0 180deg);
  background-size: 0.2em 0.2em;
  background-clip: text;
  transform: translateZ(calc(var(--i) * var(--layer-offset)));
  animation: checkers 24s infinite linear;
}

@keyframes checkers {
  to { background-position: 1em 0.4em; }
}
```

As you can see, I have already added the [<VPIcon icon="iconfont icon-css-tricks"/>`animation`](https://css-tricks.com/almanac/properties/a/animation/) property. In this case, it is very simple to animate the pattern. Just slowly move the [<VPIcon icon="iconfont icon-css-tricks"/>`background-position`](https://css-tricks.com/almanac/properties/b/background-position/), and that is it. Now we have text with a moving 3D pattern:

<CodePen
  link="htps://codepen.io/amit_sheen/bNVEoWE/049e2c0741eefc70e1c983af7bcbb11f"
  title="Layered Text (Demo 14)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Variable Fonts

So far, we have been using a single font, and as I mentioned earlier, font choice is mostly a matter of taste or brand guidelines. But since we are already working with layered text, we absolutely have to try it with [**variable fonts**](/css-tricks.com/one-file-many-options-using-variable-fonts-web.md). The idea behind variable fonts is that each one includes axes you can manipulate to change its appearance. These can include width, weight, slant, or just about anything else.

Here are a few examples I really like. The first one uses the [<VPIcon icon="fa-brands fa-google"/>Climate Crisis](https://fonts.google.com/specimen/Climate+Crisis) font, which has a `YEAR` axis that ranges from 1979 to 2025. With each year, the letters melt slightly and shrink a bit. It is a powerful ecological statement, and when you stack the text in layers, you can actually see the changes and get a pretty striking 3D effect:

<CodePen
  link="htps://codepen.io/amit_sheen/bNVpeKa/e10f6983bf27b1b037cc42c5786c1b77"
  title="Layered Text (Demo 15-1)"
  :default-tab="['css','result']"
  :theme="dark"/>

Another great option is [<VPIcon icon="fa-brands fa-google"/>Bitcount](https://fonts.google.com/specimen/Bitcount), a variable font with a classic weight axis ranging from 100 to 900. By changing the weight based on the layer index, you get a layered effect that looks like peaks rising across the text:

<CodePen
  link="htps://codepen.io/amit_sheen/EaVKyQz/294d460943eccd531e10b20652fcc6f7"
  title="Layered Text (Demo 15-2)"
  :default-tab="['css','result']"
  :theme="dark"/>

And here is an example that might give your browser a bit of a workout. The font [<VPIcon icon="fa-brands fa-google"/>Kablammo](https://fonts.google.com/specimen/Kablammo) includes a `MORF` axis, and adjusting it completely changes the shape of each letter. So, I figured it would be fun to animate that axis (yes, `font-variation-settings` is animatable), and add a short delay between the layers, like we saw earlier, to give the animation a more dynamic and lively feel.

<CodePen
  link="htps://codepen.io/amit_sheen/empZzLX/91f672b29cf098e5ddfde7d51480c4fa"
  title="Layered Text (Demo 16)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Delayed Position

Before we wrap up this second chapter, I want to show you one more animation. By now you have probably noticed that there is always more than one way to do things, and sometimes it is just a matter of finding the right approach. Even the positioning of the layers, which we have been handling statically with `translateZ`, can be done a little differently.

If we animate the layers to move along the z-axis, from zero to the full height of the text, and add an equal delay between each one, we end up with the same visual 3D effect, only in motion.

```css
.layer {
  --n: calc(var(--i) / var(--layers-count));
  --delay: calc(var(--n) * -3s);

  animation: layer 3s var(--delay) infinite ease-in-out;
}

@keyframes layer {
  from { transform: translateZ(0); }
  to { transform: translateZ(calc(var(--layers-count) * var(--layer-offset))); }
}
```

This is a more advanced technique, suited for more complex animations. It is not something you need for every use case, but for certain effects, it can look very cool.

<CodePen
  link="htps://codepen.io/amit_sheen/ogjxEPQ/59de89f3f74fbaae9cd856c8167b0fbe"
  title="Layered Text (Demo 17)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping Up

So far, we have brought the layered text effect to life with movement, variation, and creative styling. We also saw how even small changes can have a huge visual impact when applied across layers.

But everything we have done so far has been pre defined and self contained. In the next chapter, we are going to add a layer of interactivity. Literally. From simple `:hover` transitions to using JavaScript to track the mouse position, we will apply real-time transformations and build a fully responsive bulging effect.

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
  "title": "3D Layered Text: Motion and Variations",
  "desc": "In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-motion-and-variations.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
