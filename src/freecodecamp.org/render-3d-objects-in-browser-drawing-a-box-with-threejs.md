---
lang: en-US
title: "Three.js Tutorial – How to Render 3D Objects in the Browser"
description: "Article(s) > Three.js Tutorial – How to Render 3D Objects in the Browser"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - three
  - threejs
  - three-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Three.js Tutorial – How to Render 3D Objects in the Browser"
    - property: og:description
      content: "Three.js Tutorial – How to Render 3D Objects in the Browser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/render-3d-objects-in-browser-drawing-a-box-with-threejs.html
prev: /programming/js-node/articles/README.md
date: 2021-02-04
isOriginal: false
author:
  - name: Hunor Márton Borbély
    url : https://freecodecamp.org/news/author/hunor/
cover: https://freecodecamp.org/news/content/images/2021/02/Stack.002-1.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Three.js Tutorial – How to Render 3D Objects in the Browser"
  desc="If you have ever wanted to build a game with JavaScript, you might have come across Three.js.  Three.js is a library that we can use to render 3D graphics in the browser. The whole thing is in JavaScript, so with some logic you can add animation, int..."
  url="https://freecodecamp.org/news/render-3d-objects-in-browser-drawing-a-box-with-threejs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/02/Stack.002-1.jpeg"/>

If you have ever wanted to build a game with JavaScript, you might have come across Three.js.

Three.js is a library that we can use to render 3D graphics in the browser. The whole thing is in JavaScript, so with some logic you can add animation, interaction, or even turn it into a game.

In this tutorial, we will go through a very simple example. We'll render a 3D box, and while doing so we'll learn the fundamentals of Three.js.

Three.js uses WebGL under the hood to render 3D graphics. We could use plain WebGL, but it's very complex and rather low level. On the other hand, Three.js is like playing with Legos.

In this article, we'll go through how to place a 3D object in a scene, set up the lighting and a camera, and render the scene on a canvas. So let’s see how we can do all this.

---

## Define the Scene Object

First, we have to define a scene. This will be a container where we place our 3D objects and lights. The scene object also has some properties, like the background color. Setting that is optional though. If we don't set it, the default will be black.

```js
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Optional, black is default

// ...
```

---

## Geometry + Material = Mesh

Then we add our 3D box to the scene as a mesh. A mesh is a combination of a geometry and a material.

```js
// ...
// Add a cube to the scene
const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // Optional, 0,0,0 is the default
scene.add(mesh);

// ...
```

### What is a Geometry?

A geometry is a rendered shape that we’re building - like a box. A geometry can be build from vertices or we can use a predefined one.

The BoxGeometry is the most basic predefined option. We only have to set the width, height, and depth of the box and that’s it.

You might think that we can't get far by defining boxes, but many games with minimalistic design use only a combination of boxes.

There are other predefined geometries as well. We can easily define a plane, a cylinder, a sphere, or even an icosahedron.

![](https://freecodecamp.org/news/content/images/2021/02/freecodecamp-4.001.jpeg)

### How to Work with Material

Then we define a material. A material describes the appearance of an object. Here we can define things like texture, color, or opacity.

In this example we are only going to set a color. There are still different options for materials. The main difference between most of them is how they react to light.

The simplest one is the MeshBasicMaterial. This material doesn't care about light at all, and each side will have the same color. It might not be the best option, though, as you can’t see the edges of the box.

The simplest material that cares about light is the MeshLambertMaterial. This will calculate the color of each vertex, which is practically each side. But it doesn't go beyond that.

![](https://freecodecamp.org/news/content/images/2021/02/freecodecamp-4.002.jpeg)

If you need more precision, there are more advanced materials. The MeshPhongMaterial not only calculates the color by vertex but by each pixel. The color can change within a side. This can help with realism but also costs in performance.

It also depends on the light settings and the geometry if it has any real effect. If we render boxes and use directional light, the result won't change that much. But if we render a sphere, the difference is more obvious.

### How to Position a Mesh

Once we have a mesh we can also position it within the scene and set a rotation by each axis. Later if we want to animate objects in the 3D space we will mostly adjust these values.

For positioning we use the same units that we used for setting the size. It doesn't matter if you are using small numbers or big numbers, you just need to be consistent in your own world.

For the rotation we set the values in radians. So if you have your values in degrees you have to divide them by $180^{\circ}$ then multiply by PI.

![](https://freecodecamp.org/news/content/images/2021/02/freecodecamp-3.004.jpeg)

---

## How to Add Light

Then let's add lights. A mesh with basic material doesn’t need any light, as the mesh will have the set color regardless of the light settings.

But the Lambert material and Phong material require light. If there isn't any light, the mesh will remain in darkness.

```js
// ...

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// ...
```

We'll add two lights - an ambient light and a directional light.

First, we add the ambient light. The ambient light is shining from every direction, giving a base color for our geometry.

To set an ambient light we set a color and an intensity. The color is usually white, but you can set any color. The intensity is a number between 0 and 1. The two lights we define work in an accumulative way so in this case we want the intensity to be around 0.5 for each.

![](https://freecodecamp.org/news/content/images/2021/02/freecodecamp-3.003.jpeg)

The directional light has a similar setup, but it also has a position. The word position here is a bit misleading, because it doesn’t mean that the light is coming from an exact position.

The directional light is shining from very far away with many parallel light rays all having a fixed angle. But instead of defining angles, we define the direction of a single light ray.

In this case, it shines from the direction of the 10,20,0 position towards the 0,0,0 coordinate. But of course, the directional light is not only one light ray, but an infinite amount of parallel rays.

Think of it as the sun. On a smaller scale, light rays of the sun also come down in parallel, and the sun’s position isn't what matters but rather its direction.

And that’s what the directional light is doing. It shines on everything with parallel light rays from very far away.

```js
// ...

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 0); // x, y, z
scene.add(dirLight);

// ...
```

Here we set the position of the light to be from above (with the Y value) and shift it a bit along the X-axis as well. The Y-axis has the highest value. This means that the top of the box receives the most light and it will be the shiniest side of the box.

The light is also moved a bit along the X-axis, so the right side of the box will also receive some light, but less.

And because we don’t move the light position along the Z-axis, the front side of the box will not receive any light from this source. If there wasn't an ambient light, the front side would remain in darkness.

There are other light types as well. The PointLight, for instance, can be used to simulate light bulbs. It has a fixed position and it emits light in every direction. And the SpotLight can be used to simulate the spotlight of a car. It emits light from a single point into a direction along a cone.

---

## How to Set up the Camera

So far, we have created a mesh with geometry and material. And we have also set up lights and added to the scene. We still need a camera to define how we look at this scene.

There are two options here: perspective cameras and orthographic cameras.

![](https://freecodecamp.org/news/content/images/2021/02/Stack.010.jpeg)

Video games mostly use perspective cameras, because how they work is similar to how you see things in real life. Things that are further away appear to be smaller and things that are right in front of you appear bigger.

With orthographic projections, things will have the same size no matter how far they are from the camera. Orthographic cameras have a more minimal, geometric look. They don't distort the geometries - the parallel lines will appear in parallel.

For both cameras, we have to define a view frustum. This is the region in the 3D space that is going to be projected to the screen. Anything outside of this region won't appear on the screen. This is because it is either too close or too far away, or because the camera isn't pointed towards it.

![](https://freecodecamp.org/news/content/images/2021/02/freecodecamp-2.001.jpeg)

With perspective projection, everything within the view frustum is projected towards the viewpoint with a straight line. Things further away from the camera appear smaller on the screen, because from the viewpoint you can see them under a smaller angle.

```js
// ...

// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  45, // field of view in degrees
  aspect, // aspect ratio
  1, // near plane
  100 // far plane
);

// ...
```

To define a perspective camera, you need to set a field of view, which is the vertical angle from the viewpoint. Then you define an aspect ratio of the width and the height of the frame. If you fill the whole browser window and you want to keep its aspect ratio, then this is how you can do it.

Then the last two parameters define how far the near and far planes are from the viewpoint. Things that are too close to the camera will be ignored, and things that are too far away will be ignored as well.

```js
// ...

// Orthographic camera
const width = 10;
const height = width * (window.innerHeight / window.innerWidth);
const camera = new THREE.OrthographicCamera(
  width / -2, // left
  width / 2, // right
  height / 2, // top
  height / -2, // bottom
  1, // near
  100 // far
);

// ...
```

Then there’s the orthographic camera. Here we are not projecting things towards a single point but towards a surface. Each projection line is in parallel. That’s why it doesn’t matter how far objects are from the camera, and that’s why it doesn’t distort geometries.

For orthographic cameras, we have to define how far each plane is from the viewpoint. The left plane is therefor five units to the left, and the right plane is five units to the right, and so on.

```js
// ...

camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// ...
```

Regardless of which camera are we using, we also need to position it and set it in a direction. If we are using an orthographic camera the actual numbers here don’t matter that much. The objects will appear the same size no matter how far away they are from the camera. What matters, though, is their proportion.

Through this whole tutorial, we saw all the examples through the same camera. This camera was moved by the same unit along every axis and it looks towards the 0,0,0 coordinate. Positioning an orthographic camera is like positioning a directional light. It's not the actual position that matters, but its direction.

---

## How to Render the Scene

So we managed to put together the scene and a camera. Now only the final piece is missing that renders the image into our browser.

We need to define a WebGLRenderer. This is the piece that is capable of rendering the actual image into an HTML canvas when we provide a scene and a camera. This is also where we can set the actual size of this canvas – the width and height of the canvas in pixels as it should appear in the browser.

```js :collapsed-lines
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Add a cube to the scene
const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);

// Camera
const width = 10;
const height = width * (window.innerHeight / window.innerWidth);
const camera = new THREE.OrthographicCamera(
  width / -2, // left
  width / 2, // right
  height / 2, // top
  height / -2, // bottom
  1, // near
  100 // far
);

camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Add it to HTML
document.body.appendChild(renderer.domElement);
```

And finally, the last line here adds this rendered canvas to our HTML document. And that’s all you need to render a box. It might seem a little too much for just a single box, but most of these things we only have to set up once.

If you want to move forward with this project, then check out my YouTube video on how to turn this into a simple game. In the video, we create a stack building game. We add game logic, event handlers and animation, and even some physics with Cannon.js.

If you have any feedback or questions on this tutorial, feel free to Tweet me [<FontIcon icon="fa-brands fa-x-twitter"/>`@HunorBorbely`](https://x.com/HunorBorbely) or leave a comment on [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`@HunorMartonBorbely`)](https://youtube.com/@HunorMartonBorbely).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Three.js Tutorial – How to Render 3D Objects in the Browser",
  "desc": "If you have ever wanted to build a game with JavaScript, you might have come across Three.js.  Three.js is a library that we can use to render 3D graphics in the browser. The whole thing is in JavaScript, so with some logic you can add animation, int...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/render-3d-objects-in-browser-drawing-a-box-with-threejs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
