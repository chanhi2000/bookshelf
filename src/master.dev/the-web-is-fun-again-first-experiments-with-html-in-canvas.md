---
lang: en-US
title: "The Web Is Fun Again: First Experiments with HTML in Canvas"
description: "Article(s) > The Web Is Fun Again: First Experiments with HTML in Canvas"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Web Is Fun Again: First Experiments with HTML in Canvas"
    - property: og:description
      content: "The Web Is Fun Again: First Experiments with HTML in Canvas"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas.html
prev: /programming/css/articles/README.md
date: 2026-04-21
isOriginal: false
author:
  - name: Amit Sheen
    url: https://master.dev/blog/author/amitsheen/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9400
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="The Web Is Fun Again: First Experiments with HTML in Canvas"
  desc="An experimental API let's us put HTML within those opening and closing canvas tags and render it to the canvas, while remaining interactive. Lots of possibility here! "
  url="https://master.dev/blog/the-web-is-fun-again-first-experiments-with-html-in-canvas/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9400"/>

Every once in a while, the platform drops something that makes you want to build strange demos again, or at least weirder ones. The [new HTML in Canvas API (<VPIcon icon="iconfont icon-github"/>`WICG/html-in-canvas`)](https://github.com/WICG/html-in-canvas) is a perfect example of one of those moments.

The promise is simple and exciting: take native HTML, render it into canvas workflows, and then apply visual effects with 2D Canvas, WebGL, or WebGPU. In other words, you can keep real semantic elements in your markup while treating their rendered output as pixels.

::: important Support Status

To enable it, go to `chrome://flags/#canvas-draw-element` and turn on the “Canvas Draw Element” flag. After enabling, you can start experimenting with the API in your local environment.

As of now, this API is still experimental, only available in Chromium-based browsers (146+) and behind a flag. That means you need to enable it manually to experiment with it, and it is not yet a production-ready feature.

The main demos below have a collapsed video after them so you can see the effect if you happen to be in a non-supporting browser.

:::

<CodePen
  link="https://codepen.io/amit_sheen/pen/EagOyyK/e82acffbffe52508b5691bcae49a5aab"
  title="HTML-in-Canvas (Demo 01)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://videopress.com/474d481c-b628-4b07-b064-26ac09c753be" />

This combination of HTML rendering and semantics, with Canvas’s visual freedom and shader-style effects, feels like a missing piece we have wanted for years.

---

## Basic Elements of HTML in Canvas

To understand the HTML in Canvas APIs, we’ll start with a simple example that demonstrates the core concepts.

### 1. Plain HTML First

Let’s start with a plain `div` that contains real content: a heading, a card, a short paragraph, and a tiny form with an input and a button, so we’ll have some interactive elements to play with.

```html
<div class="content">
  <h1>HTML in Canvas</h1>
  <div class="card">
    <p>...text</p>
    <form>
      <input type="text" placeholder="name">
      <button>Submit</button>
    </form>
  </div>
</div>
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/xbEQOOE/ab2a0337c735df78eada1f0c16556e8f"
  title="HTML-in-Canvas (Demo 02)"
  :default-tab="['css','result']"
  :theme="dark"/>

This is just regular HTML and CSS. Nothing special yet.

### 2. Wrap it with Canvas

Now, to render that content inside a canvas, we wrap it with `<canvas>`:

```html
<canvas width="500" height="300" layoutsubtree>
  <div class="content">
    ... content ...
  </div>
</canvas>
```

::: note

Notice that I added the `layoutsubtree` attribute to the canvas, **this is mandatory for the HTML-in-Canvas API to work**, as this attribute opts canvas descendants into layout and hit testing so they behave like real DOM content. In practice, `layoutsubtree` is the opt-in switch that turns your canvas children into a proper render source for the HTML-in-Canvas pipeline.

:::

Putting content inside the canvas means it is treated as real DOM elements, and you can interact with them as usual, but they are not rendered (i.e., they are ‘invisible’) until you explicitly draw them into the canvas.

---

## Write JavaScript

Now let’s wire up the JavaScript APIs. First, we need to get references to the canvas, its 2D context, and the content element we want to draw:

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const content = canvas.querySelector('.content');
```

Next, we need to trigger the `canvas.requestPaint()` for the browser to fire a `paint` event. It’s important to call `requestPaint()` at least once to kickstart the rendering pipeline, even if nothing changed yet, as it gives us the initial snapshot of the content. Without this initial call, you may have no paint event yet, and no frame to draw from.

```js
canvas.requestPaint();
```

And finally, we set up the `paint` event listener to draw the content into the canvas. This is your render callback for HTML-in-Canvas: when paint happens, this is where you copy DOM rendering into canvas pixels.

```js
canvas.addEventListener('paint', () => {
  ctx.reset();
  ctx.drawElementImage(content, 0, 0);
});
```

Inside the `paint` event listener, we call `ctx.drawElementImage(content, 0, 0)`. This is the core method of the HTML-in-Canvas API that takes the current rendered output of the specified DOM element (in this case, `.content`) and draws it into the canvas at the specified coordinates (0, 0).

The `ctx.reset()` call before it is important to clear any previous drawing state, ensuring that each paint starts with a clean slate. This is especially crucial if you plan to apply transformations or styles in the future, as it prevents unintended carryover from previous frames.

And now we have the (same) content rendered inside the canvas!

<CodePen
  link="https://codepen.io/amit_sheen/pen/XJjyeYw/ed4f4061ea4e525c4f21ddc2a849c3f4"
  title="HTML-in-Canvas (Demo 03)"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that the content is still fully interactive, and you can click the input and button as usual, but their visual representation is now part of the canvas rendering. What you **see** are pixels on a canvas, that are generated from real HTML elements, allowing you to apply any canvas effects or transformations to them as needed.

---

## The Thing About Size

In the previous example, we set the canvas size explicitly with `width="500"` and `height="300"`. If I’m being honest, in all my experiments with this API, size and resizing are the only areas that felt a bit undercooked in its current state, and I hope this area gets smoother over time.

There are two main reasons why sizing here feels different.

1. Originally, canvas was not meant to have children. It does not behave like a regular `div` container, it doesn’t default to `width: 100%`, and doesn’t know how to grow its height based on its content.
2. The canvas element has its own `width` and `height` attributes that define its drawing surface, and these **can be** independent of the size of the content inside it, which can be very confusing at first.

This means we need to size the canvas intentionally. One option is to use absolute values on the width and height attributes, as in the earlier example, which sets both the element size and the drawing surface size. The other option is to skip fixed attributes, size the canvas dynamically with CSS, and then sync the drawing surface with the element’s rendered size.

The most convenient way to do that is with a simple observer that forwards the element’s external dimensions into the canvas itself:

```js
const observer = new ResizeObserver(([entry]) => {
  canvas.width = entry.devicePixelContentBoxSize[0].inlineSize;
  canvas.height = entry.devicePixelContentBoxSize[0].blockSize;
});
observer.observe(canvas, { box: 'device-pixel-content-box' });
```

And here is a simple example of a canvas with some responsive cards. The canvas has no explicit size, and is set to `width: 100%` and `height: 100%` in the CSS, so it’s adapting to the viewport size. The observer is syncing the canvas drawing surface to match the rendered size of the canvas element, so the pixels are always crisp and not stretched.

<CodePen
  link="https://codepen.io/amit_sheen/pen/WbGYxRm/6b9541f02a58ce8491d9289bd98a94af"
  title="HTML-in-Canvas (Demo 04)"
  :default-tab="['css','result']"
  :theme="dark"/>

([Open the demo in a new tab (<VPIcon icon="fa-brands fa-codepen" />`amit_sheen`)](https://codepen.io/amit_sheen/pen/WbGYxRm/6b9541f02a58ce8491d9289bd98a94af) and resize the window to see how the grid adapts.)

<VidStack src="https://videopress.com/0de428d3-ee00-435c-8547-3e114e263403" />

---

## Moving Things Around

So now we have painted pixels on a canvas that represent real elements still sitting in the DOM. But what if we want to move those elements around? What if we want to apply transforms to the canvas, or to the source DOM elements?

The official explainer is very explicit about this: “The canvas’s current transformation matrix is applied when drawing into the canvas. CSS transforms on the source element are **ignored** for drawing (but continue to affect hit testing/accessibility).”

This means that if we apply `translate` on the source HTML element, interaction moves with that element, but the pixels in the canvas are still drawn from the element’s original drawing position.

On the other hand, if we apply transform on the canvas drawing context itself, the pixels move, but the DOM elements do not, and interaction stays where the elements are in the DOM.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/gSoZIXYc.png?resize=1024%2C319&ssl=1)

In the image above, the container on the right has `translate: 0 100px`, so the DOM elements move down, but in the canvas they are still drawn in their original location. On the left side, the canvas uses `ctx.translate(0, 100)`, so the drawing moves down, but the DOM elements stay in place.

The fix is to synchronize the transform on both sides. Since the `drawElementImage()` method returns a transform value, we can set the transform in the canvas, and use the returned value to apply the same transform to the DOM element.

```js
canvas.addEventListener('paint', () => {
  ctx.reset();

  /* Add transform to canvas */
  ctx.translate(250, 150);
  ctx.rotate((input.value.length - 30) * Math.PI / 180);
  ctx.translate(-250, -150);

  /* Draw HTML content into canvas and get the transform applied to it. */
  const transform = ctx.drawElementImage(content, 0, 0);

  /* Apply the same transform to the HTML content, so it matches the canvas. */
  content.style.transform = transform.toString();
});
```

Notice that the rotation is driven by the input’s text length. Click into the input and start typing to see the element rotate. The canvas rendering rotates along with the DOM elements, because the same transform is applied to both, and visuals and interaction stay aligned.

<CodePen
  link="https://codepen.io/amit_sheen/pen/LERXzJp/c4f61ba29e228a7ebe819c3a1406e7e2"
  title="HTML-in-Canvas (Demo 05)"
  :default-tab="['css','result']"
  :theme="dark"/>

And if we’re playing with transforms, I wanted to push that idea a bit further. In the next demo, I mapped the same HTML content between four draggable control points using homography and a bit of math. This one is less about practical UI and more about exploring how far this API can be stretched while still keeping real DOM content in the loop. Feel free to drag the points and play with it.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ogzQGOL/767a0207778c26cd8e887371a53d125a"
  title="HTML-in-Canvas (Demo 06)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://videopress.com/89a0a033-d6c5-4574-8ba5-ddd5dce950fd" />

---

## Basic Pixel Manipulation

Okay, we turned real elements into pixels on a canvas, but what does that actually give us? Until now, we haven’t really treated pixels as independent units, so let’s start.

The idea here is simple: create an array of all canvas pixels, iterate through it one pixel at a time, and do whatever you want with those values. We’ll begin with a simple example of replacing all pure-green pixels (which we will use for text and borders) with a colorful gradient based on their position.

```css
.content {
  /* Pure green text and border */
  color: #0f0;
  border: 4px solid currentColor;
}
```

To get the pixel array, we call `getImageData` inside the `paint` event listener, right after drawing the HTML content into the canvas.

```js
canvas.addEventListener('paint', () => {
  // First draw the HTML content into the canvas
  ctx.reset();
  ctx.drawElementImage(content, 0, 0);

  // Then read the pixels from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
});
```

::: note

Remember! `data` is now an array where each pixel is represented by 4 cells: red, green, blue, and alpha (opacity). So the array length is 4 times the number of pixels in the canvas.

```js
data.length === canvas.width * canvas.height * 4
```

:::

Now we can loop through all pixels. Notice that we increment by 4 each time, so every iteration handles one full pixel.

```js
for (let i = 0; i < data.length; i += 4) {
  ...
}
```

Inside that loop, we can do anything. For this example, we’ll check each of the RGB values to see if the pixel is pure green (`#0f0`), and if it is, we will calculate a new color based on the pixel’s position, and create a colorful gradient.

```js
for (let i = 0; i < data.length; i += 4) {

  // Check if the pixel is pure green (#0f0)
  if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) {

    // Calculate the pixel's position
    const pixelX = (i / 4) % canvas.width;
    const pixelY = Math.floor((i / 4) / canvas.width);
  
    // Calculate a hue based on the pixel's position and convert it to RGB
    const hue = (pixelX + pixelY) % 360;
    const [r, g, b] = hslToRgb(hue);
  
    // Replace the green pixel with the new color
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
}
```

And after we finish updating the values in `data`, we need to draw the updated pixels back into the canvas with `putImageData`:

```js
// Draw the modified pixels into the canvas
ctx.putImageData(imageData, 0, 0);
```

And here is the result. Note that input and button are still at their original color, because we didn’t change those elements’ color.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ogzQoNY/6ea679c8ea5e624d056a8fb04fcc0548"
  title="HTML-in-Canvas (Demo 07)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you inspect the elements, you will see that the text and borders are still just green in the DOM, but on the canvas, they have been replaced with a colorful gradient.

---

## Moving Pixels Around

Okay, so we changed the color of each pixel, and that’s cool, but when we talk about pixel manipulation, we usually want to see them move.

The key issue here is that pixels are not elements. They are just values in an array. You cannot call `translate()` on them and move them somewhere else. To “move” a pixel, you simply draw its value into a different pixel.

### The Buffer Zone

Because JavaScript is asynchronous and the loop iterates over pixels one by one, we don’t want to mutate the source while we are still reading from it. A common best practice is to keep a buffer copy of the original data as a stable reference, then write the new values into `data`.

We save that buffer in the `paint` event listener, right after reading from canvas:

```js
// Read the pixels from the canvas
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

// Save the original pixel data as a source of reference
const originalPixelData = [...data];
```

Now we can redraw any pixel anywhere. For example, here is a simple X/Y distortion pass: for each pixel, we compute its coordinates, calculate an offset on each axis, use that offset to find a source pixel, and copy the source RGBA into the current pixel.

```js
// Loop through the pixels
for (let i = 0; i < data.length; i += 4) {

  // Calculate the pixel's coordinates
  const pixelX = (i / 4) % canvas.width;
  const pixelY = Math.floor((i / 4) / canvas.width);

  // Calculate the wave offset for this pixel based on its coordinates
  const offsetX = waveSize[0] * Math.cos(((pixelX % waveSpacing[0]) / waveSpacing[0]) * 2 * Math.PI);
  const offsetY = waveSize[1] * Math.sin(((pixelY % waveSpacing[1]) / waveSpacing[1]) * 2 * Math.PI);

  // Calculate the coordinates of the source pixel
  const newX = Math.max(0, Math.min(canvas.width - 1, pixelX + Math.round(offsetX)));
  const newY = Math.max(0, Math.min(canvas.height - 1, pixelY + Math.round(offsetY)));

  // Calculate the index of the source pixel in the original pixel data array
  const newIndex = (newY * canvas.width + newX) * 4;

  // Save the offset pixel values from the original pixel data
  data[i] = originalPixelData[newIndex];
  data[i + 1] = originalPixelData[newIndex + 1];
  data[i + 2] = originalPixelData[newIndex + 2];
  data[i + 3] = originalPixelData[newIndex + 3];
}
```

And here is the result:

<CodePen
  link="https://codepen.io/amit_sheen/pen/Kwgryqj/630bdabade0956d21074c2e57eac0429"
  title="HTML-in-Canvas (Demo 08)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Mouse Interaction

One of the most common things to do once you start moving pixels around, is to add some mouse interaction. This is pretty straightforward: listen to `mousemove`, get the mouse position relative to the canvas, and use that data however you like.

The big difference here is that the render loop is no longer driven directly inside the `paint` event listener. When canvas content changes, we still capture the source data into `originalPixelData` (same as before), but for the actual pixel remap we now need live mouse coordinates, so that part runs inside the `mousemove` callback.

```js
canvas.onpaint = (event) => {
    // Draw the elements and read the pixels from the canvas
    // Save the original pixel data as a source of reference
}

canvas.addEventListener('mousemove', (e) => {
    // Loop through the pixels
    for (let i = 0; i < data.length; i += 4) {
      // Do stuff based on `e.clientX` and `e.clientY`
    }
    // Draw the modified pixels into the canvas
});`
```

Here is a simple example that calculates the distance of each pixel from the mouse. It is basically the same idea as the previous example, but now we compute the offset relative to the mouse position. If a pixel is outside the effect radius, it keeps its original value.

```js
// Calculate the distance (d) from the mouse to the pixel
const dx = pixelX - e.pageX + 32;
const dy = pixelY - e.pageY + 32;
const d = Math.sqrt(dx * dx + dy * dy);

if (d < effectSize) {

  // Calculate the offset for this pixel
  const offset = Math.sin(Math.sqrt(d / effectSize) * Math.PI) * -10;

  // Calculate the coordinates of the source pixel
  const newX = clamp(pixelX + Math.round(offset * (dx / d)), 0, canvas.width - 1);
  const newY = clamp(pixelY + Math.round(offset * (dy / d)), 0, canvas.height - 1);

// Calculate the index of the source pixel in the original pixel data array
newIndex = (newY * canvas.width + newX) * 4;

} else {
  // If the pixel is outside the wave radius, keep its original color
  newIndex = i;
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgjwyXR/3697eeeb173fa8b909f3dd69ae85af99"
  title="HTML-in-Canvas (Demo 09)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://videopress.com/5022bdce-2ff6-4b94-99b3-dc6b8609b01a" />

---

## Render Loop

So far, we have moved things with the mouse, sliders, and even by typing in an input field. But in many cases, we just need continuous motion. For that, we need a render loop that re-calculates pixel values and redraws the canvas every frame.

The basic structure looks like this:

```js
// Start the animation loop
render(performance.now());

function render(nowMs) {
  // Loop through the pixels and calculate new values
  for (let i = 0; i < data.length; i += 4) {
          ...
  }

  // Then draw the modified pixels into the canvas
  ctx.putImageData(imageData, 0, 0);

  // Request the next animation frame to keep the animation going
  requestAnimationFrame(render);
}
```

`nowMs` is the current timestamp (in milliseconds) passed automatically by `requestAnimationFrame` into `render(nowMs)`, and we can use that value to create time-based animations.

As a simple example, I took the rainbow demo from before, but this time the color is recalculated on every frame based on time.

```js
// Calculate a hue based on the pixel's position and the current time
const hue = (pixelX + pixelY + nowMs * effectSpeed) % 360;
```

And here is the result:

<CodePen
  link="https://codepen.io/amit_sheen/pen/VYKVyNJ/684cae02f76e096c0ae6903870ee2ed4"
  title="HTML-in-Canvas (Demo 10)"
  :default-tab="['css','result']"
  :theme="dark"/>

Of course, these are still just small demos to explain the core ideas behind pixel manipulation. But once the basics click, it becomes very easy to extend them and build original effects on top of them, and I hope this also sparks your own creative itch to experiment and build something weird and wonderful.

When I started playing with this API, it reminded me of an old Daniel Shiffman (Coding train) video where he used pixel manipulation to create a fire effect, and I wondered what it would feel like to do that on real DOM elements.

If you are curious, here is [<VPIcon icon="fa-brands fa-youtube"/>Daniel’s great video](https://youtu.be/X0kjv0MozuY), and this is how I implemented the effect on a real text input, utilizing the same pixel manipulation techniques we covered in this post.

<CodePen
  user="https://codepen.io/amit_sheen/pen/jEMQZMY/8037bb33bb9233be0974cc60cd3bea5f"
  title="HTML-in-Canvas (Demo 11)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Now for the Serious Stuff: Shaders

Until now, we were playing. Transforms and pixel manipulation are great up to a certain point, but when you really want to go wild, you call shaders.

Turning native elements into pixels opens the door to the GPU’s raw power via WebGL and WebGPU. These technologies can push visual effects to a completely different level without sacrificing performance.

### It’s Not About Shaders

Explaining shaders in depth is a full article on its own, but at a high level, a shader is just a tiny program that runs on the graphics card and determines how things should be drawn. Instead of manually editing pixels one by one on the CPU, you describe a visual rule, and the GPU applies that rule across huge amounts of pixels in parallel.

If you want a fun visual reference for this idea, there is an old but great Mythbusters demo showing the difference between CPU-style processing (one pixel after another, like we did so far) and GPU-style processing (many pixels in parallel).

<VidStack src="youtube/8_ZTvG1WQxM" />

---

## The Smallest Shader Pipeline

To understand how to use WebGL with the HTML in Canvas API, let’s start with a minimal setup to get the first shader-based frame on screen. We will build the most basic shader possible, which creates a tinted gradient across the canvas, and then we can extend it with more complex effects.

The flow: capture HTML, feed it into a GPU texture, run a shader, and render the result back to the canvas. Once this flow works, we can experiment with all the wild effects that shader programming allows.

### 1.  Get the canvas and a WebGL context

At this stage, we are no longer working with a 2D canvas context. Instead of using `ctx`, we move to a WebGL context (`gl`) so the rendering path runs through the GPU.

```js
const canvas = document.querySelector('canvas');
const content = canvas.querySelector('.content');
const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true });
```

### 2. Create a Tiny Shader Program

A basic shader setup consists of four main ingredients: First, we define the “rules” that tell the computer exactly where to place our content and how to color it (Shaders). Second, we translate these rules into a language the graphics card can actually understand (Compile & Link). Third, we set up a flat, invisible surface across the screen to project our image onto (Geometry). Finally, we prepare the image itself so the system knows exactly how to smoothly read and display its pixels on that surface (Texture).

```js
// 1. Shaders (Shortened)
const vsSource = `
  attribute vec2 p; varying vec2 v;
  void main() { v = vec2(p.x, -p.y) * 0.5 + 0.5; gl_Position = vec4(p, 0, 1); }
`;
const fsSource = `
  precision mediump float; varying vec2 v; uniform sampler2D u;
  void main() { 
    vec4 c = texture2D(u, v);
    vec3 tint = mix(vec3(1.5, 0.5, 0.5), vec3(0.5, 0.5, 1.5), v.x);
    gl_FragColor = vec4(c.rgb * tint * c.a, c.a); 
  }
`;

// 2. Compile & Link
const program = gl.createProgram();
[vsSource, fsSource].forEach((src, i) => {
  const s = gl.createShader(i ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  gl.attachShader(program, s);
});
gl.linkProgram(program);
gl.useProgram(program);

// 3. Geometry
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
const pos = gl.getAttribLocation(program, 'p');
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

// 4. Texture
gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Required (no mipmaps)`
```

### 3. Create the Render Function

Now that the shader is ready, we can copy the HTML into the canvas on each frame, but this time through the WebGL path. Instead of `ctx.drawElementImage(...)` (which is a 2D-canvas direct draw call), we upload the element snapshot into a GPU texture with `gl.texElementImage2D(...)`, and then render that texture with `gl.drawArrays(...)`.

```js
function render() {
    gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, content);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
```

### 4. Draw Your Shader

At this point, if we want a continuous animation, we can schedule the next frame from inside `render()` by adding `requestAnimationFrame(render)` at the end of the function. When the output is static, like in this example, calling `render` from the `paint` callback is enough.

```js
canvas.addEventListener('paint', () => requestAnimationFrame(render));
canvas.requestPaint();
```

Notice we still schedule rendering for the next frame instead of calling `render()` directly, to avoid loop-related issues. Also, prefer `requestPaint`-driven flow and avoid direct render calls when possible, as calling render without a valid paint snapshot can throw errors like “no cached paint record for element”.

<CodePen
  link="https://codepen.io/amit_sheen/pen/KwgrQqR/a486464a688794e777aa0a0ecdd72b36"
  title="HTML-in-Canvas (Demo 12)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Same Pipeline, Wildly Different Shaders

Now it’s the fun part: once the pipeline is in place, everything opens up. The structure is the same, the tools are the same, and the building blocks are the same, but from there, you can create the wildest shaders you can imagine.

You probably noticed the classic trail ripple demo at the beginning of this post. I have a feeling we are going to see that pattern a lot soon. It is already a great baseline effect, and in a similar style, you can build a much more expressive cursor treatment.

<CodePen
  link="https://codepen.io/amit_sheen/pen/NPREyzy/1d5636998f0a98a5b2af02c89484789b"
  title="HTML-in-Canvas (Demo 13)"
  :default-tab="['css','result']"
  :theme="dark"/>

Of course, we are not limited to mouse movement only. We can also react to clicks themselves, like in this demo.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ZYpmxYd/597373bb1d295feb751ae42bcfa890cc"
  title="HTML-in-Canvas (Demo 14)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://videopress.com/c0dd0399-cb99-4ea6-9606-435c6be4ed2d" />

And we can even react to drag gestures, then animate the content as if it has physical tension.

<CodePen
  link="https://codepen.io/amit_sheen/pen/NPREYqL/0a167f6402718992470aa377211551a2"
  title="HTML-in-Canvas (Demo 15)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://videopress.com/04c6a87b-1c28-4f1a-8ed4-20a3b2285d06" />

We can also go in a softer direction and use subtle ambient effects for atmosphere.

<CodePen
  link="https://codepen.io/amit_sheen/pen/MYjzVaM/eb4501f32f9d025cf56b8667dd84baf6"
  title="HTML-in-Canvas (Demo 16)"
  :default-tab="['css','result']"
  :theme="dark"/>

And here is one more, just because I really liked it.

<CodePen
  link="https://codepen.io/amit_sheen/pen/dPpQmGv/42adf6e00961d1c6e5b890a30ef6e5ae"
  title="HTML-in-Canvas (Demo 17)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Final Thoughts

If there is one takeaway from all of this, it is that HTML in Canvas is not just a new API; it is a new workflow mindset. We keep real HTML, semantics, forms, and interactions, but we can render the final output as pure pixels and treat the UI as a visual playground.

What excites me most is the range this technology unlocks. It can serve playful demos, expressive interactions, visual storytelling, and many practical UI ideas that were previously awkward to build with traditional rendering paths.

We are still at the beginning, which is exactly why this is the right time to experiment, push boundaries, and publish weird ideas that might become tomorrow’s standard patterns.

So, what is your weird idea?

---

Also, check out the HiC (HTML-in-Canvas) Showroom with many more effects!

[Explore the Showroom ➡️](https://hicshowroom.com/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Web Is Fun Again: First Experiments with HTML in Canvas",
  "desc": "An experimental API let's us put HTML within those opening and closing canvas tags and render it to the canvas, while remaining interactive. Lots of possibility here! ",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
