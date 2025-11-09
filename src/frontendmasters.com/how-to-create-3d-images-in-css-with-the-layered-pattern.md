---
lang: en-US
title: "How to Create 3D Images in CSS with the Layered Pattern"
description: "Article(s) > How to Create 3D Images in CSS with the Layered Pattern"
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
      content: "Article(s) > How to Create 3D Images in CSS with the Layered Pattern"
    - property: og:description
      content: "How to Create 3D Images in CSS with the Layered Pattern"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-create-3d-images-in-css-with-the-layered-pattern.html
prev: /programming/css/articles/README.md
date: 2025-11-20
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url : https://frontendmasters.com/blog/author/sunkanmifafowora/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7802
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
  name="How to Create 3D Images in CSS with the Layered Pattern"
  desc="Repeat the same content over and over on top of each other, and you can move each of them just a smidge in 3D space creating the illusion of shape."
  url="https://frontendmasters.com/blog/how-to-create-3d-images-in-css-with-the-layered-pattern/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7802"/>

3D CSS has been around for a while. The earliest implementation of 3D CSS you can find is in one of W3C’s [earliest specifications on 3D transforms](https://w3.org/TR/2009/WD-css3-3d-transforms-20090320/) in 2009. That’s exactly 15 years after [CSS was introduced to the web in 1994](https://w3.org/Style/CSS20/history.html), so it’s a really long time!

A common pattern you would see in 3D transformations is the **layered pattern**, which gives you the *illusion* of 3D CSS, and this is mostly used with text, like this demo below from Noah Blon:

<CodePen
  user="anon"
  slug-hash="ExwmWq"
  title="3D CSS Typography"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Or in [Amit Sheen (<VPIcon icon="fas fa-codepen"/>`amit_sheen`)](https://codepen.io/amit_sheen)’s demos like this one:

<CodePen
  link="https://codepen.io/amit_sheen/pen/KwpLrJe/a41446c5e20cbbdb945beb731d860f63"
  title="Layered Text"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The layered pattern, as its name suggests, stacks multiple items into layers, adjusting the Z position and colors of each item with respect to their index value in order to create an illusion of 3D.

**Yes, most 3D CSS are just illusions.** However, did you know that we can apply the same pattern, but for images? In this article, we will look into how to create a layered pattern for images to create a 3D image in CSS.

In order for you to truly understand how 3D CSS works, here’s a quick list of things you need to do before proceeding:

1. [**How the CSS perspective works**](/css-tricks.com/how-css-perspective-works.md)
2. A good understanding of [<VPIcon icon="fas fa-globe"/>the x, y, and z coordinates](https://byjus.com/maths/co-ordinates-of-a-point-in-three-dimensions/)
3. [**Sometimes, you have to think in cubes**](/css-tricks.com/css-in-3d-learning-to-think-in-cubes-instead-of-boxes.md) (bonus)

This layered pattern can be an accessibility problem because duplicated content is read as many times as its repeated. That’s true for text, however, for images this can be circumvented by just leaving all the but first `alt` attribute empty or setting all the duplicated divs with `aria-hidden="true"` (this one also works for text). This would hide the duplicated content from the user.

---

## The HTML

Let’s start with the basic markup structure. We’re linking up an identical `<img>` over and over in multiple layers:

```html :collapsed-lines
<div class="scene"> 
  <div class="image-container">
    <div class="original">
      <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt="Gradient colored image with all colors present starting from the center point">
    </div>
    
    <div class="layers" aria-hidden="true">
      <div class="layer" style="--i: 1;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
      <div class="layer" style="--i: 2;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
      <div class="layer" style="--i: 3;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
      <div class="layer" style="--i: 4;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
      <div class="layer" style="--i: 5;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
      ...
      <div class="layer" style="--i: 35;"><img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt=""></div>
    </div>
  </div>
</div>
```

The first `<div>` has a “scene” class wrapped around all the layers. Each layer `<div>` has an **index** custom property set `--i` in the `style` attribute. This index value is very important, as we will use it later to calculate positioning values. Notice how the `<div>` with class “original” doesn’t have the `aria-hidden` attribute? That’s because we want the screen reader to read that first image and not the rest.

We’re using the `style` indexing approach and not `sibling-index()` / `sibling-count()` because they are [<VPIcon icon="fa-brands fa-firefox"/>not yet supported globally across all major browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index#browser_compatibility). In the future with better support, we could remove the inline styles and use `sibling-index()` wherever we’re using `--i` in calculations and `sibling-count()` when you need to total (35 in this blog post).

It’s important we start with a container for our scene as well because we will apply the CSS `perspective` property, which controls the *depth* of our 3D element.

---

## The CSS

Setting the scene, we use a `1000px` value for the perspective. A large perspective value is typically good, so the 3D element won’t be too close to the user, but feel free to still use any perspective value of your choice.

We then set all the elements, including the image container `<div>`s to have a `transform-style` of `preserve-3d`. This allows the stacked items to be visible in the 3D space.

```css
.scene {
  perspective: 1000px;
}

.scene * {
  transform-style: preserve-3d;
}
```

<CodePen
  user="anon"
  slug-hash="RNrdBYa"
  title="3D CSS image - part 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Everything looks a little janky, but that’s expected until we add a bit more CSS to make it look cool.

We need to calculate the offset distance between each of the stacked layers, that is, the distance each layer will have against each other in order for it to appear together or completely separated.

![Illustration of layered blocks showing layer offsets in a 3D perspective with a gradient background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/2TvXFOKc.png?resize=1024%2C768&ssl=1)

On the image container, we set two variables: the offset distance to be just `2px` and the total layers. These would be used to calculate the offset on the Z-axis and the colors between them to make it appear as a single whole 3D element.

```css
.image-container{
  ...
  --layers-count: 35;
  --layer-offset: 2.5px;
}
```

That’s not all, we now calculate the distance between each layer using the index `--i` and the offset on the `translateZ()` function inside the layer class:

```css
.layer {
  transform: translateZ(calc(var(--i) * var(--layer-offset)));
  ...
}
```

The next step is to use a normalized value (because the index would be too big) to calculate how dark and saturated we want each image to be, so it appears darker in 3D as it goes down in index value. i.e:

```css
.layer {
  ...
  --n: calc(var(--i) / var(--layers-count));
  filter: 
    brightness(calc(0.4 + var(--n) * 0.8))
    saturate(calc(0.8 + var(--n) * 0.4));
}
```

I’m adding `0.4` to the multiplied value of 80% and `--n`. If `--n` is `2/35` for example, our brightness value would equal to `0.45` (`0.4` + `2/36` x `0.8`) and the saturation would be equal to `0.83`. If `--``n` is `3/35`, the brightness value would be `0.47`, while the saturation would be `0.82` and so on.

And that’s it! We’re all set! (sike! Not yet).

We just need to set the `position` property to `absolute` and `inset` to be `0` for all the layers so they can be on top of each other. Don’t forget to set the height and width to any desired length, and the `position` property of the `image-container` class to `relative` while you’re at it. Here’s the code if you’ve been following:

```css :collapsed-lines
.image-container {
  position: relative;
  width: 300px;
  height: 300px;
  transform: rotateX(20deg) rotateY(-10deg);
  --layers-count: 35;
  --layer-offset: 2.5px;
}

.layers,
.layer {
  position: absolute;
  inset: 0;
}

.layer {
  transform: translateZ(calc(var(--i) * var(--layer-offset)));
  --n: calc(var(--i) / var(--layers-count));
  filter: 
    brightness(calc(0.4 + var(--n) * 0.8))
    saturate(calc(0.8 + var(--n) * 0.4));
}
```

::: info Here’s a quick breakdown of the mathematical calculations going on:

- `translateZ()` makes the items stacked visible by calculating them based on their index multiplied by `--layer-offset`. This moves it away from the user, which is our main 3D affect here.
- `--n` is used to normalize the index to a 0-1 range
- `filter` is then used with `--n` to calculate the saturation and brightness of the 3D element

:::

That’s actually where most of the logic lies. This next part is just basic sizing, positioning, and polish.

```css :collapsed-lines
.layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

.original {
  position: relative;
  z-index: 1;
  width: 18.75rem;
  height: 18.75rem;
}

.original img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
  box-shadow: 0 20px 60px rgba(0 0 0 / 0.6);
}
```

Check out the final result. Doesn’t it look so cool?!

<CodePen
  user="anon"
  slug-hash="azdPmBJ"
  title="3D CSS image: part 2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## We’re not done yet!

Who’s ready for a little bit more *interactivity*? 🙋🏾 I know I am. Let’s add a rotation animation to emphasize the 3D affet.

```css{3}
.image-container {
  ...
  animation: rotate3d 8s ease-in-out infinite alternate; 
}

@keyframes rotate3d {
  0% {
    transform: rotateX(-20deg) rotateY(30deg);
  }
  100% {
    transform: rotateX(-15deg) rotateY(-40deg);
  }
}
```

Our final result looks like this! Isn’t this so cool?

<CodePen
  user="anon"
  slug-hash="KwVYjQq"
  title="3D CSS image: part 3"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Bonus: Adding a control feature

Remember how this article is about images and not gradients? Although the image used was an image of a gradient, I’d like to take things a step further by being able to control things like `perspective`, layer offset, and its rotation. The bonus step is adding a *form of controls*.

We first need to add the boilerplate HTML and styling for the controls:

```html :collapsed-lines
<div class="controls">
  <h3>3D Controls</h3>
  <label>Perspective: <span id="perspValue">1000px</span></label>
  <input type="range" id="perspective" min="200" max="2000" value="1000">

  <label>Layer Offset: <span id="offsetValue">2px</span></label>
  <input type="range" id="offset" min="0.5" max="5" step="0.1" value="2">

  <label>Rotate X: <span id="rotXValue">20°</span></label>
  <input type="range" id="rotateX" min="-90" max="90" value="20">

  <label>Rotate Y: <span id="rotYValue">-10°</span></label>
  <input type="range" id="rotateY" min="-90" max="90" value="-10">

  <div class="image-selector">
    <label>Try Different Images:</label>
    <button data-img="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" class="active">Abstract Gradient</button>
    <button data-img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4">Mountain Landscape</button>
    <button data-img="https://images.unsplash.com/photo-1518791841217-8f162f1e1131">Cat Portrait</button>
    <button data-img="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05">Foggy Forest</button>
  </div>
</div>
```

This would give us access to a host of images to select from, and we would also be able to rotate the main 3D element as we please using `<input>` type `range` and `<button>`s.

The CSS is to add basic styles to the form controls. Nothing too complicated:

```css :collapsed-lines
.controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.15rem;
  height: 20rem;
  border-radius: 10px;
  overflow-y: scroll;
  color: white;
  max-width: 250px;
}

.controls h3 {
  margin-bottom: 15px;
  font-size: 1.15rem;
}

.controls label {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 15px 0 5px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.controls input {
  width: 100%;
}

.controls span {
  font-weight: bold;
}

.image-selector {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgb(255 255 255 / 0.2);
}

.image-selector button {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  background: rgb(255 255 255 / 0.2);
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.image-selector button:hover {
  background: rgb(255 255 255 / 0.3);
}

.image-selector button.active {
  background: rgb(255 255 255 / 0.4);
  border-color: white;
}
```

[This creates the controls (<VPIcon icon="fa-brands fa-codepen"/>`sunkanmii-the-styleful`)](https://codepen.io/sunkanmii-the-styleful/pen/wBMZVBd) like we want. We haven’t finished, though. Try making some adjustments, and you’d notice that it doesn’t do anything. Why? Because we haven’t applied any JS!

The code below would affect the rotation values on the x and y axis, layer offset, and perspective. It would also change the images to any of the other 3 specified:

```js :collapsed-lines
const scene = document.querySelector(".scene");
const container = document.querySelector(".image-container");

document.getElementById("perspective").addEventListener("input", (e) => {
  const val = e.target.value;
  scene.style.perspective = val + "px";
  document.getElementById("perspValue").textContent = val + "px";
});

document.getElementById("offset").addEventListener("input", (e) => {
  const val = e.target.value;
  container.style.setProperty("--layer-offset", val + "px");
  document.getElementById("offsetValue").textContent = val + "px";
});

document.getElementById("rotateX").addEventListener("input", (e) => {
  const val = e.target.value;
  updateRotation();
  document.getElementById("rotXValue").textContent = val + "°";
});

document.getElementById("rotateY").addEventListener("input", (e) => {
  const val = e.target.value;
  updateRotation();
  document.getElementById("rotYValue").textContent = val + "°";
});

function updateRotation() {
  const x = document.getElementById("rotateX").value;
  const y = document.getElementById("rotateY").value;
  container.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}

// Image selector
document.querySelectorAll(".image-selector button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const imgUrl = btn.dataset.img;

    // Update all images
    document.querySelectorAll("img").forEach((img) => {
      img.src = imgUrl;
    });

    // Update active button
    document
      .querySelectorAll(".image-selector button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});`
```

Plus we pop into the CSS and remove the animation, as we can control it ourselves now. Viola! We have a full working demo with various form controls and an image change feature. Go on, change the image to something else to view the result.

<CodePen
  user="anon"
  slug-hash="vELMoMZ"
  title="3D CSS: final demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Bonus: 3D CSS… Steak

Using this same technique, you know what else we can build? a 3D CSS steak!

<CodePen
  user="anon"
  slug-hash="ByjexvJ"
  title="3D CSS Steak - black and white!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It’s currently in black & white. Let’s make it show some color, shall we?

<CodePen
  user="anon"
  slug-hash="azdrGMz"
  title="3D CSS Steak - colored!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info Summary of things I’m doing to make this work:

- Create a scene, adding the CSS `perspective` property
- Duplicate a single image into separate containers
- Apply transform-style’s `preserve-3d` on all divs to position them in the 3D space
- Calculate the normalized value of all items by dividing the index by the total number of images
- Calculate the brightness of each image container by multiplying the normalized value by 0.9
- Set `translateZ()` based on the index of each element multiplied by an offset value. i.e in my case, it is `1.5px` for the first one and `0.5px` for the second, and that’s it!!

:::

That was fun! Let me know if you’ve done this or tried to do something like it in your own work before.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create 3D Images in CSS with the Layered Pattern",
  "desc": "Repeat the same content over and over on top of each other, and you can move each of them just a smidge in 3D space creating the illusion of shape.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-create-3d-images-in-css-with-the-layered-pattern.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
