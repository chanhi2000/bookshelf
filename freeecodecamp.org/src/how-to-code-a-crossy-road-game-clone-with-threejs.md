---
lang: en-US
title: "How to Code a Crossy Road Game Clone with Three.js"
description: "Article(s) > How to Code a Crossy Road Game Clone with Three.js"
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Code a Crossy Road Game Clone with Three.js"
    - property: og:description
      content: "How to Code a Crossy Road Game Clone with Three.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-code-a-crossy-road-game-clone-with-threejs.html
prev: /programming/js-node/articles/README.md
date: 2025-02-21
isOriginal: false
author:
  - name: Hunor Márton Borbély
    url : https://freecodecamp.org/news/author/hunor/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740094139765/282432bf-1a5b-40e4-8b74-7aa854fd20ac.png
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
  name="How to Code a Crossy Road Game Clone with Three.js"
  desc="In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with Three.js. The goal of this game is to move a character through an endless path of static and moving obstacles. You have to go around trees and avoid getting hit ..."
  url="https://freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-threejs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740094139765/282432bf-1a5b-40e4-8b74-7aa854fd20ac.png"/>

In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with Three.js. The goal of this game is to move a character through an endless path of static and moving obstacles. You have to go around trees and avoid getting hit by cars.

There's a lot to cover in this tutorial: we will start with setting up the scene, the camera, and the lights. Then you’ll learn how to draw the player and the map with the trees and the cars. We’ll also cover how to animate the vehicles, and we’ll add event handlers to move the player through the map. Finally, we’ll add hit detection between the cars and the player.

This article is a shortened version of the Crossy Road tutorial from my site [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](https://javascriptgametutorials.com/). The extended tutorial is also available as a video on [<FontIcon icon="fa-brands fa-youtube"/>YouTube](https://youtu.be/vNr3_hQ3Bws?ab_channel=HunorM%C3%A1rtonBorb%C3%A9ly).

<VidStack src="youtube/vNr3_hQ3Bws" />

---

## How to Set Up the Game

In this chapter, we’ll set up the drawing canvas, camera, and lights and render a box representing our player.

### Initializing the Project

I recommend using Vite to initialize the project. To do so, go to your terminal and type `npm create vite`, which will create an initial project for you.

```sh

npm create vite my-crossy-road-game # Create app
cd my-crossy-road-game # Navigate to the project
npm install three # Install dependencies
npm run dev # Start development server
```

When generating the project, select **Vanilla** because we won't use any front-end framework for this project. Then navigate to the project folder Vite just created for you and install Three.js with `npm install three`. Finally, you can go to the terminal and type `npm run dev` to start a development server. This way, you can see live the result of your coding in the browser.

### The Drawing Canvas

Now, let's look into this project. The entry point of this project is the <FontIcon icon="fa-brands fa-html5"/>`index.html` file in the root folder. Let's replace the div element with a canvas element with the ID **game**. This is the drawing canvas that Three.js will use to render the scene. This file also has a script tag that points to the main JavaScript file.

```xml title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <canvas class="game"></canvas>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### The <FontIcon icon="fa-brands fa-js"/>`main.js` file

The <FontIcon icon="fa-brands fa-js"/>`main.js` file is the root of our game. Let's replace its content. We’ll define a Three.js scene containing all the 3D elements, including the player, that we will soon define. The scene also includes a camera that we’ll use together with the renderer to render a static frame of it. We’ll define these in the following steps.

```js title="main.js"
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);

const camera = Camera();
player.add(camera);

const renderer = Renderer();
renderer.render(scene, camera);
```

### The Player

Let's start adding the necessary objects to render the first scene. Let's add a simple box to represent the player. We already added the player to the scene in the main file, so let's see how to define this player.

![The player](https://cdn.hashnode.com/res/hashnode/image/upload/v1739804077435/9667f94f-5005-41f8-a6ed-faa6706f0be1.png)

In this file, we write a function that creates a 3D object and exports a property containing the player instance. The player is a singleton. There is only one player object in the game, and every other file can access it through this export.

```js
import * as THREE from "three";

export const player = Player();

function Player() {
  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({ color: "white" })
  );
  body.position.z = 10;
  player.add(body);

  return player;
}
```

Initially, the player will be a simple box. To draw a 3D object, we’ll define a geometry and a material. The geometry defines the object's shape, and the material defines its appearance. Here, we’re using box geometry to define a box. The box geometry takes three arguments: the width, depth, and height of the box along the x, y, and z axes.

We have different options for the material. The main difference between them is how they react to light, if at all. Here, we're using **MeshLambertMaterial**, a simple material that responds to light. We set the color property to white.

![Different light options](https://cdn.hashnode.com/res/hashnode/image/upload/v1739804142917/7b6a49e2-30df-40d8-bd4c-7ac1a2725931.png)

Then, we wrap the geometry and the material into a mesh, which we can add to the scene. We can also position this mesh by setting its X, Y, and Z positions. In the case of a box, these set the center position. By setting the Z position of this box, we’re elevating it above the ground by half its height. As a result, the bottom of the box will be standing on the ground.

We also wrap the mesh into a group element. This is not necessary at this point, but having this structure will be handy when animating the player. When it comes to player animation, we want to separate the horizontal and vertical movement. We want this to be able to follow the player with the camera as it moves but not to move the camera up and down when the player is jumping. We will move the group horizontally along the XY plane together with the camera and move the mesh vertically.

### The Camera

Now, let's look into different camera options. There are two main camera options: the perspective camera, as you can see on the left in the image below, and the orthographic camera, which you can see on the right.

The perspective camera is the default camera in Three.js and is the most common camera type across all video games. It creates a perspective projection, which makes things further away appear smaller and things right in front of the camera appear bigger.

On the other hand, the orthographic camera creates parallel projections, which means that objects are the same size regardless of their distance from the camera. We’ll use an orthographic camera here to give our game more of an arcade look.

![Perspective vs orthographic camera](https://cdn.hashnode.com/res/hashnode/image/upload/v1739800656673/d2643544-b44c-418e-a475-2844e6626dbb.png)

In Three.js, we place the 3D objects along the X, Y, and Z axes. We define the coordinate system in a way where the ground is on the XY plane so the player can move left and right along the x-axis, forward and backward along the y-axis, and when the player is jumping, it will go up along the z-axis.

We place the camera in this coordinate system to the right along the x-axis, behind the player along the y-axis, and above the ground. Then, the camera will look back at the origin of the coordinate system to the 0,0,0 coordinate, where the player will be placed initially.

![The coordinate system](https://cdn.hashnode.com/res/hashnode/image/upload/v1739803742848/d202d09f-1c1b-4246-be23-2a6f6af52423.png)

With all this theory in mind, let's define our camera. We create a new file for the camera and export the camera function, which returns an orthographic camera that we'll use to render the scene.

```js :collapsed-lines 
import * as THREE from "three";

export function Camera() {
  const size = 300;
  const viewRatio = window.innerWidth / window.innerHeight;
  const width = viewRatio < 1 ? size : size * viewRatio;
  const height = viewRatio < 1 ? size / viewRatio : size;

  const camera = new THREE.OrthographicCamera(
    width / -2, // left
    width / 2, // right
    height / 2, // top
    height / -2, // bottom
    100, // near
    900 // far
  );

  camera.up.set(0, 0, 1);
  camera.position.set(300, -300, 300);
  camera.lookAt(0, 0, 0);

  return camera;
}
```

To define a camera, we need to define a camera frustum. This will determine how to project the 3D elements onto the screen. In the case of an orthographic camera, we define a box. Everything in the scene within this box will be projected onto the screen. In the image below, the green dot represents the camera position and the gray box around the scene represents the camera frustum.

![The camera frustum](https://cdn.hashnode.com/res/hashnode/image/upload/v1739804878454/3af6d9ba-1d35-4b98-8731-95af5889a1ed.png)

In this function, we set up the camera frustum to fill the browser window, and the width or height will be 300 units, depending on the aspect ratio. The smaller value between width and height will be 300 units, and the other one will fill the available space. If the width is larger than the height, then the height is 300 units. If the height is larger, then the width is 300 units.

![Sizing the scene](https://cdn.hashnode.com/res/hashnode/image/upload/v1739805040485/c7b9aa02-3c5d-4a2e-a1ff-e9941ce83c39.png)

Then, we set the camera's position. We move the camera to the right along the x-axis with 300 units, then behind the player along the y-axis with -300 units, and finally above the ground. We also look back to the origin of the coordinate system, to the 0,0,0 coordinate, where the player is positioned initially. Finally, we set which axis is pointing upwards. Here, we set the z-axis to point upwards.

### The Lights

After setting up the camera, let's set up the lights. There are many types of lights in Three.js. Here, we're going to use an ambient light and a directional light.

You can see the result of ambient light only on the left side of the below image. The ambient light brightens the entire scene. It doesn't have a specific position or direction. You can think of it like the light on a cloudy day when it's bright, but there are no shadows. The ambient light is used to simulate indirect light.

![Ambient vs directional light](https://cdn.hashnode.com/res/hashnode/image/upload/v1739800781538/9e140ef9-4133-4151-9fc5-b629504259a8.png)

Now, let's look at the directional light that you can see on the right of the image above. A directional light has a position and a target. It shines light in a specific direction with parallel light rays. Even though it has a position, you can rather think of it as the sun that is shining from very far away. The position here is more to define the direction of the light, but then all the other light rays are also parallel with this light ray. So you can think of it like the sun.

![The directional light shines with parallel light rays](https://cdn.hashnode.com/res/hashnode/image/upload/v1739805160031/4742e1de-5dc0-4443-9716-af18581bfa1e.png)

That's why we're combining an ambient light (so that we have a base brightness all around the scene) with a directional light (to illuminate specific sides of our objects with a brighter color).

After seeing what the lights look like, let's add an ambient and directional light to the scene in our main file. We also position the directional light to the left along the x-axis, behind the player along the y-axis, and above the ground. By default, the target of the directional light is going to be the 0,0,0 coordinate. We don't have to set that.

```js :collapsed-lines
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
player.add(camera);

const renderer = Renderer();
renderer.render(scene, camera);
```

Note that we add the lights to the scene, but we add the camera to the player. This way, when we animate the player, the camera will follow the player.

### The Renderer

We have defined many things, but we still don’t see anything on the screen. As a final piece, we need to have a renderer to render the scene. A renderer renders the 3D scene into a canvas element.

In this function, we get the canvas element we defined in the HTML and set it as the drawing context. We also set a couple more parameters. We make the background of the 3D scene transparent with the alpha flag, set the pixel ratio, and set the size of the canvas to fill the entire screen.

```js :collapsed-lines
import * as THREE from "three";

export function Renderer() {
  const canvas = document.querySelector("canvas.game");
  if (!canvas) throw new Error("Canvas not found");

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}
```

This is how our first scene comes together. We rendered a simple box.

---

## How to Render a Map

Now, let's add all the other objects to the scene. In this chapter, we’ll define the map. The map will consist of multiple rows, each described by metadata. Each row can be a forest, a car, or a truck lane. We’ll go through each type and define the 3D objects representing them.

![The different row types](https://cdn.hashnode.com/res/hashnode/image/upload/v1739803813951/3796e0c0-6f02-4c82-979b-a5192d8c3b8c.png)

The map can be broken down into rows, and each row can be broken down into multiple tiles. The player will move from tile to tile. Trees are also placed on a distinct tile. Cars, on the other hand, do not relate to tiles. They move freely through the lane.

![A row can be broken down into a tile](https://cdn.hashnode.com/res/hashnode/image/upload/v1739803829719/38318821-8496-43d1-9b1c-a5b36d78af14.png)

We define a file for the constants. Here, we define the number of tiles in each row. In this case, there are 17 ties per row, going from -8 to +8. The player will start in the middle at tile zero.

```js
export const minTileIndex = -8;
export const maxTileIndex = 8;
export const tilesPerRow = maxTileIndex - minTileIndex + 1;
export const tileSize = 42;
```

### The Starting Row

First, let's add the starting row. We’ll define a couple of components that we’re going to use to render the map, and we’ll render the initial row.

Let's create a new component called Map. This file will expose the map's metadata and the 3D objects representing it. Let's export a group called map. This container will contain all the 3D objects for each row. Soon, we will add this group to the scene.

```js
import * as THREE from "three";
import { Grass } from "./Grass";

export const map = new THREE.Group();

const grass = Grass(0);
map.add(grass);
```

Then, we set the map's content. Later, we will generate the 3D objects based on the metadata and use it to reset the map. For now, let's just call the Grass function, which will return another Three.js group. We call the grass function with the row index, so the grass component will position itself based on this row index. Then, we add the returned group to the map.

Now, let's define the Grass component. The Grass function returns the foundation and container of the forest rows and is also used for the starting row. It returns a group containing a flat, wide, green box. The dimensions of this box are determined by the constants **tileSize** and **tilesPerRow**. The box also has some height, so it sticks out compared to the road, which will be completely flat.

```js
import * as THREE from "three";
import { tilesPerRow, tileSize } from "./constants";

export function Grass(rowIndex) {
  const grass = new THREE.Group();
  grass.position.y = rowIndex * tileSize;

  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
    new THREE.MeshLambertMaterial({ color: 0xbaf455 })
  );
  foundation.position.z = 1.5;
  grass.add(foundation);

  return grass;
}
```

The grass can serve as a container for the trees in the row. That's why we wrap the green box into a group so that later, we can also add children to this group. We position the group along the y-axis based on the row index that we received from the Map component. For the initial lane, this is zero, but as we're going to have multiple lanes, we need to place them according to this position.

Now that we have the map container and the grass component, we can finally add the map to the scene.

```js :collapsed-lines
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import { map } from "./Map";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

const renderer = Renderer();
renderer.render(scene, camera);
```

### How to Add a Forest Row

Now that we have an empty forest, let's add another row containing trees. We define the map's metadata and render the rows based on this metadata.

![A forest row](https://cdn.hashnode.com/res/hashnode/image/upload/v1739806992172/139197f0-f2c1-4f11-aacf-f1fedeeaf9b0.png)

Back in the Map component, let's define the map's metadata. The metadata is an array of objects that contain information about each row. Each row will contain a type that will determine the kind of the row and the rest of the properties depending on the row type.

```js
import * as THREE from "three";
import { Grass } from "./Grass";

export const metadata = [
  {
    type: "forest",
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
];

export const map = new THREE.Group();

const grass = Grass(0);
map.add(grass);
```

The metadata for a forest includes the type of “forest” and a list of trees. Each tree has a tile index, which represents which tile it is standing on. In this case, we have 17 tiles per row, going from -8 to +8. The trees also have a height, which is actually the height of the crown.

To render the rows, we loop over this array and generate 3D objects for each row based on the row type. For the forest type, it calls the Grass function again, which will return a Three.js group. We call this Grass function with the row index so the Grass function can position itself along the y-axis. The row index is off by one compared to the array index because the first item in the metadata will become the second row right after the starting row, which is not part of the metadata.

```js :collapsed-lines
import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export const metadata = [
  {
    type: "forest",
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
];

export const map = new THREE.Group();

const grass = Grass(0);
map.add(grass);

metadata.forEach((rowData, index) => {
  const rowIndex = index + 1;

  if (rowData.type === "forest") {
    const row = Grass(rowIndex);

    rowData.trees.forEach(({ tileIndex, height }) => {
      const three = Tree(tileIndex, height);
      row.add(three);
    });

    map.add(row);
  }
});
```

Forest rows also have trees. For each item in the trees array, we render a tree. The Tree function will return a 3D object representing the tree.

![A tree](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807310182/40cbb90b-0356-4db5-97bb-cdbe0c8e8cb8.png)

We pass on to this function the tile index that we will use to position the tree within the row and the height. We add the trees to the group the Grass function returned, and then we add the whole group returned by the Grass function to the map.

```js :collapsed-lines
import * as THREE from "three";
import { tileSize } from "../constants";

export function Tree(tileIndex, height) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({ color: 0x4d2926 })
  );
  trunk.position.z = 10;
  tree.add(trunk);

  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, height),
    new THREE.MeshLambertMaterial({ color: 0x7aa21d })
  );
  crown.position.z = height / 2 + 20;
  tree.add(crown);

  return tree;
}
```

Since we’ve already added the map to the scene, the forest will appear on the screen. But first, we need to define how to render a tree. We are going to represent a tree with two boxes. We're going to have a box for the trunk and one for the crown.

These are both simple boxes, just like we had before with the player and also in the Grass component. The trunk is placed on top of the ground. We lift it along the Z-axis by half of its height, and the crown is placed on top of the trunk. The crown's height is also based on the height property. These two meshes are wrapped together into a group, and then we position this group along the X-axis based on the tile index property.

### Car Lanes

Now, let's add another row type: car lanes. The process of adding car lanes will follow a similar structure. We define the lanes' metadata, including the vehicles, and then map them into 3D objects.

![The car lane](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807532566/1c9cfdc9-2c45-476c-9ada-09f7abf79328.png)

In the Map component in the metadata, let's replace the first row with a car lane. The car lane will contain a single red car moving to the left. We have a direction property, which is a boolean flag. If this is true, that means the cars are moving to the right in the lane, and if it's false, then the vehicles are moving to the left. We also have a speed property, which defines how many units each vehicle takes every second.

Finally, we have an array of vehicles. Each car will have an initial tile index, which represents only its initial position because the cars will move later. Each car will also have a color property, which is a hexadecimal color value.

```js :collapsed-lines
import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export const metadata = [
  {
    type: "car",
    direction: false,
    speed: 1,
    vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  },
];

. . .
```

Now, to render this lane type, we have to extend our logic to support car lanes. We add another if block that is very similar to the rendering of the forest. In the case of a car type, we call the Road function, which will also return a Three.js group. We also call this function with the row index to position the group according to the lane.

Then, for each item in the vehicles array, we create a 3D object representing the car with the Car function. We add the cars to the group returned by the Road function, and we add the whole group to the map. For the car function, we also pass on the initial tile index that we will use to position the car within the row, the direction, and the color.

```js :collapsed-lines
import * as THREE from "three";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Car } from "./Car";

export const metadata = [
  {
    type: "car",
    direction: false,
    speed: 1,
    vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  },
];

export const map = new THREE.Group();

const grass = Grass(0);
map.add(grass);

metadata.forEach((rowData, index) => {
  const rowIndex = index + 1;

  if (rowData.type === "forest") {
    const row = Grass(rowIndex);

    rowData.trees.forEach(({ tileIndex, height }) => {
      const three = Tree(tileIndex, height);
      row.add(three);
    });

    map.add(row);
  }

  if (rowData.type === "car") {
    const row = Road(rowIndex);

    rowData.vehicles.forEach((vehicle) => {
      const car = Car(
        vehicle.initialTileIndex,
        rowData.direction,
        vehicle.color
      );
      row.add(car);
    });

    map.add(row);
  }
});
```

The Road and Car functions are new here, so let's examine them next. The Road function returns the foundation and container of the car and truck lanes. Similar to the Grass function, it also returns a group containing a gray plane.

![The Road component](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807755293/e731a758-ac20-40f5-819b-82a5ae81e65f.png)

The size of the plane is also determined by the constants `tileSize` and `tilesPerRow`. Unlike the grass function, though, it doesn't have any height. It's completely flat. The road will also serve as a container for the cars and trucks in the row, so that's why we wrap the plane into a group - so that we can add children to it.

```js
import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  const foundation = new THREE.Mesh(
    new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
    new THREE.MeshLambertMaterial({ color: 0x454a59 })
  );
  road.add(foundation);

  return road;
}
```

Now, let's look at the Car. The Car function returns a very simple 3D car model.

![A car](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807975022/dc04c3c1-de94-49fd-ad85-ade999c8862a.png)

It contains a box for the body and a smaller box for the top part. We also have two wheel meshes. Because we never see the cars from underneath, we don't need to separate the wheels into left and right. We can just use one long box for the front wheels and another one for the back wheels.

```js :collapsed-lines
import * as THREE from "three";
import { tileSize } from "./constants";

export function Car(initialTileIndex, direction, color) {
  const car = new THREE.Group();
  car.position.x = initialTileIndex * tileSize;
  if (!direction) car.rotation.z = Math.PI;

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color })
  );
  main.position.z = 12;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(33, 24, 12),
    new THREE.MeshLambertMaterial({ color: "white" })
  );
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  car.add(cabin);

  const frontWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  frontWheel.position.x = 18;
  frontWheel.position.z = 6;
  car.add(frontWheel);

  const backWheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333 })
  );
  backWheel.position.x = -18;
  backWheel.position.z = 6;
  car.add(backWheel);

  return car;
}
```

We group all these elements, position them based on the `initialTileIndex` property, and turn them based on the `direction` property. If the car goes to the left, we rotate it by 180°. When we set rotation values in Three.js. We have to set them in radians, so that's why we set it to Math.Pi, which is equivalent to 180°.

You can also find a more extended version of how to draw this car with textures [**in this article**](/freecodecamp.org/three-js-tutorial.md).

Based on the metadata, we can now render a map with several rows. Here’s an example with a few more lanes. Of course, feel free to define your own map.

```js :collapsed-lines
// ...

export const metadata = [
  {
    type: "car",
    direction: false,
    speed: 188,
    vehicles: [
      { initialTileIndex: -4, color: 0xbdb638 },
      { initialTileIndex: -1, color: 0x78b14b },
      { initialTileIndex: 4, color: 0xa52523 },
    ],
  },
  {
    type: "forest",
    trees: [
      { tileIndex: -5, height: 50 },
      { tileIndex: 0, height: 30 },
      { tileIndex: 3, height: 50 },
    ],
  },
  {
    type: "car",
    direction: true,
    speed: 125,
    vehicles: [
      { initialTileIndex: -4, color: 0x78b14b },
      { initialTileIndex: 0, color: 0xbdb638 },
      { initialTileIndex: 5, color: 0xbdb638 },
    ],
  },
  {
    type: "forest",
    trees: [
      { tileIndex: -8, height: 30 },
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
    ],
  },
];

. . .
```

This article does not cover truck lanes, but they follow a similar structure. The code for it can be found at [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](http://JavaScriptGameTutorials.com).

---

## How to Animate the Cars

Let's move on and animate the cars in their lanes according to their speed and direction. To move the vehicles, we first need to be able to access them. So far, we have added them to the scene, and theoretically, we could traverse the scene and figure out which object represents a vehicle. But it's much easier to collect their references in our metadata and access them through these references.

Let's modify the Map generation. After generating a car, we not only add them to the container group but also save the reference together with their metadata. After this, we can go to the metadata and access each vehicle in the scene.

```js :collapsed-lines
// ...

metadata.forEach((rowData, index) => {
  const rowIndex = index + 1;

  if (rowData.type === "forest") {
    const row = Grass(rowIndex);

    rowData.trees.forEach(({ tileIndex, height }) => {
      const three = Tree(tileIndex, height);
      row.add(three);
    });

    map.add(row);
  }

  if (rowData.type === "car") {
    const row = Road(rowIndex);

    rowData.vehicles.forEach((vehicle) => {
      const car = Car(
        vehicle.initialTileIndex,
        rowData.direction,
        vehicle.color
      );
      vehicle.ref = car; // Add a reference to the car object in metadata
      row.add(car);
    });

    map.add(row);
  }
});
```

Next, let's go to the main file and define an animate function that will be called on every animation frame. For now, we only call the `animateVehicles` function, which we will define next. Later, we will extend this function with logic to animate the player and to have hit detection.

```js :collapsed-lines
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import { map } from "./Map";
import { animateVehicles } from "./animateVehicles";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();

  renderer.render(scene, camera);
}
```

We also move the renderer render call here to render the scene on every animation loop. To call this function on every frame, we pass it on to the renderer’s `setAnimationLoop` function. This is similar to `requestAnimationFrame` in plain JavaScript, except that it calls itself at the end of the function, so we don't have to call it again.

Now, let's implement the `animateVehicles` function. As this function is part of the animate function, this function is called on every animation frame. Here, we use a Three.js clock to calculate how much time passed between the animation frames. Then, we loop over the metadata, take every vehicle from every car or truck lane, and move them along the x-axis based on their speed, direction, and the time passed.

```js :collapsed-lines
import * as THREE from "three";
import { metadata as rows } from "./Map";
import { minTileIndex, maxTileIndex, tileSize } from "./constants";

const clock = new THREE.Clock();

export function animateVehicles() {
  const delta = clock.getDelta();

  // Animate cars and trucks
  rows.forEach((rowData) => {
    if (rowData.type === "car" || rowData.type === "truck") {
      const beginningOfRow = (minTileIndex - 2) * tileSize;
      const endOfRow = (maxTileIndex + 2) * tileSize;

      rowData.vehicles.forEach(({ ref }) => {
        if (!ref) throw Error("Vehicle reference is missing");

        if (rowData.direction) {
          ref.position.x =
            ref.position.x > endOfRow
              ? beginningOfRow
              : ref.position.x + rowData.speed * delta;
        } else {
          ref.position.x =
            ref.position.x < beginningOfRow
              ? endOfRow
              : ref.position.x - rowData.speed * delta;
        }
      });
    }
  });
}
```

If a car reaches the end of the lane, we respawn it at the other end, depending on its direction. This creates an infinite loop in which cars go from left to right or right to left, depending on their direction. Once they reach the end of the lane, they start over from the beginning. With this function, we should have a scene where all the cars are moving in their lanes.

![The cars move in an infinite loop](https://cdn.hashnode.com/res/hashnode/image/upload/v1739808359961/eca84295-09d7-463a-8d29-e5f8069bb673.png)

---

## How to Move the Player

Now, let's move on to animating the player. Moving the player on the map is more complex than moving the vehicles. The player can move in all directions, bump into trees, or get hit by cars, and it shouldn't be able to move outside the map.

In this chapter, we are focusing on two parts: collecting user inputs and executing the movement commands. Player movement is not instant - we need to collect the movement commands into a queue and execute them one by one. We are going to collect user inputs and put them into a queue. We collect both click events from the control buttons on the screen and from keyboard events.

### Collecting User Inputs

To check the movement commands, let's extend the player component with state. We keep track of the player's position and the movement queue. The player starts at the middle of the first row, and the move queue is initially empty.

We will also export two functions: `queueMove` adds the movement command to the end of the move queue, and the `stepCompleted` function removes the first movement command from the queue and updates the player's position accordingly.

```js :collapsed-lines
// ...

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;
}
```

Now, we can add event listeners for keyboard events to listen to the arrow keys. They all call the player's **queueMove** function, which we just defined for the player with the corresponding direction.

```js
import { queueMove } from "./Player";

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    queueMove("forward");
  } else if (event.key === "ArrowDown") {
    queueMove("backward");
  } else if (event.key === "ArrowLeft") {
    queueMove("left");
  } else if (event.key === "ArrowRight") {
    queueMove("right");
  }
});
```

After defining the event listeners, we also have to import them into the main file so that they work.

```js
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import { map } from "./Map";
import { animateVehicles } from "./animateVehicles";
import "./style.css";
import "./collectUserInput"; // Import event listeners
// ...
```

### Executing Movement Commands

So far, we have collected user inputs and put each command into the `movesQueue` array in the player component. Now, it's time to execute these commands one by one and animate the player.

Let's create a new function called `animatePlayer`. Its main goal is to take each move command from the `moveQueue` one by one, calculate the player's progress toward executing a step, and position the player accordingly.

![The player movement](https://cdn.hashnode.com/res/hashnode/image/upload/v1739808997988/8adb70d2-bf5d-4e65-8ed9-29e8f297b487.png)

This function animates the player frame by frame. It will also be part of the animate function. We also use a separate move clock that measures each step individually. We pass on false to the clock constructor so it doesn't start automatically. The clock only starts at the beginning of a step. At each animation frame, first, we check if there are any more steps to take, and if there are and we don't currently process a step, then we can start the clock. Once the clock is ticking we animate the player from tile to tile with each step.

```js :collapsed-lines
import * as THREE from "three";
import { movesQueue, stepCompleted } from "./Player";

const moveClock = new THREE.Clock(false);

export function animatePlayer() {
  if (!movesQueue.length) return;

  if (!moveClock.running) moveClock.start();

  const stepTime = 0.2; // Seconds it takes to take a step
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  setPosition(progress);

  // Once a step has ended
  if (progress >= 1) {
    stepCompleted();
    moveClock.stop();
  }
}

. . .
```

We use the move clock to calculate the progress between the two tiles. The progress indicator can be a number between zero and one. Zero means that the player is still at the beginning of the step, and one means that it’s arrived at its new position.

At each animation frame, we call the `setPosition` function to set the player’s position according to the progress. Once we finish a step, we call the `stepCompleted` function to update the player's position and stop the clock. If there are any more move commands in the `movesQueue`, the clock will restart in the following animation frame.

Now that we know how to calculate the progress for each step, let's look into how to set the player's position based on the progress. The player will jump from tile to tile. Let's break this down into two parts: the movement's horizontal and vertical components.

The player moves from the current tile to the next tile in the direction of the move command. We calculate the player's start and end position based on the current tile and the direction of the move command. Then, we use linear interpolation with a utility function that Three.js provides. This will interpolate between the start and end positions based on the progress.

```js :collapsed-lines
import * as THREE from "three";
import {
  player,
  position,
  movesQueue,
  stepCompleted,
} from "./components/Player";
import { tileSize } from "./constants";

. . .

function setPosition(progress) {
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (movesQueue[0] === "left") endX -= tileSize;
  if (movesQueue[0] === "right") endX += tileSize;
  if (movesQueue[0] === "forward") endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8 + 10;
}
```

For the vertical component, we use a sine function to make it look like jumping. We are basically mapping the progress to the first part of a sine wave.

Below you can see what a sine wave looks like. It goes from 0 to 2 Pi. So if you multiply the progress value, which is going from 0 to 1 with Pi, then the progress will map into the first half of this sine wave. The sign function then will give us a value between zero and one.

To make the jump look higher, we can multiply this with a value. In this case, we multiply the result of the sine function by eight, so as a result, the player will have a jump where the maximum height of the jump will be eight units.

We also need to add the original Z position to the value - otherwise, the player will sink halfway into the ground after the first step.

![For the vertical movement we use a sine wave](https://cdn.hashnode.com/res/hashnode/image/upload/v1739810397620/89119f6e-ced5-4cdb-8254-96fbf66479ed.png)

Now that we’ve defined the **animatePlayer** function, let's add it to the animate loop.

```js :collapsed-lines
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { DirectionalLight } from "./DirectionalLight";
import { player } from "./Player";
import { map, initializeMap } from "./Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import "./style.css";
import "./collectUserInput";

. . .

function animate() {
  animateVehicles();
  animatePlayer();

  renderer.render(scene, camera);
}
```

If you did everything right, the player should be able to move around the game board, moving forward, backward, left, and right. But we haven't added any hit detection. So far, the player can move through trees and vehicles and even get off the game board. Let's fix these issues in the following steps.

### Restricting Player Movement

Let’s make sure that the player can’t end up in a position that’s invalid. We will check if a move is valid by calculating where it will take the player. If the player would end up in a position outside of the map or in a tile occupied by a tree, we will ignore that move command.

![Calculating where the player will end up](https://cdn.hashnode.com/res/hashnode/image/upload/v1739810555283/310afd32-6e5a-4143-bbe2-e0da558bd6d7.png)

First, we need to calculate where the player would end up if they made a particular move. Whenever we add a new move to the queue, we need to calculate where the player would end up if they made all the moves in the queue and take the current move command. We create a utility function that takes the player's current position and an array of moves and returns the player's final position.

For instance, if the player's current position is 0,0, staying in the middle of the first row, and the moves are forward and left, then the final position will be row 1 tile -1. 

```js :collapsed-lines
export function calculateFinalPosition(currentPosition, moves) {
  return moves.reduce((position, direction) => {
    if (direction === "forward")
      return {
        rowIndex: position.rowIndex + 1,
        tileIndex: position.tileIndex,
      };
    if (direction === "backward")
      return {
        rowIndex: position.rowIndex - 1,
        tileIndex: position.tileIndex,
      };
    if (direction === "left")
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex - 1,
      };
    if (direction === "right")
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex + 1,
      };
    return position;
  }, currentPosition);
}
```

Now that we have this utility function to calculate where the player will end up after taking a move, let's create another utility function to calculate whether the player would end up in a valid or invalid position. In this function, we use the `calculateFinalPosition` function that we just created. Then, we’ll check if the player would end up outside the map or on a tile occupied by a tree.

![Check if the player bumps into a tree](https://cdn.hashnode.com/res/hashnode/image/upload/v1739810684106/71c45122-b10c-4623-b575-184c1cf1fecb.png)

If the move is invalid, we return false. First, we check if the final position is before the starting row or if the tile number is outside the range of the tiles. Then, we check the metadata of the row the player will end up in. Here, the index is off by one because the row metadata doesn't include the starting row. If we end up in a forest row, we check whether a tree occupies the tile we move to. If any of this is true, we return false.

```js :collapsed-lines
import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "./constants";
import { metadata as rows } from "./Map";

export function endsUpInValidPosition(currentPosition, moves) {
  // Calculate where the player would end up after the move
  const finalPosition = calculateFinalPosition(
    currentPosition,
    moves
  );

  // Detect if we hit the edge of the board
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    // Invalid move, ignore move command
    return false;
  }

  // Detect if we hit a tree
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some(
      (tree) => tree.tileIndex === finalPosition.tileIndex
    )
  ) {
    // Invalid move, ignore move command
    return false;
  }

  return true;
}
```

Finally, let's extend the player's `queueMove` function with the `endsUpInValidPosition` function to check if a move is valid. If the `endsUpInValidPosition` function returns false, we cannot take this step. In this case, we return early from the function before the move is added to the `movesQueue` array. So we are ignoring the move.

```js :collapsed-lines
import * as THREE from "three";
import { endsUpInValidPosition } from "./endsUpInValidPosition";

// ...

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return; // Return if the move is invalid

  movesQueue.push(direction);
}

// ...
```

This way, as you can see, you can move around the map - but you can never move before the first row, you can't go too far to the left or too far to the right, and you also can’t go through a tree anymore.

---

## Hit Detection

To finish the game, let's add hit detection. We check if the player gets hit by a vehicle, and if so, we show an alert popup.

![Calculating bounding boxes for hit detection](https://cdn.hashnode.com/res/hashnode/image/upload/v1739826639155/1497d588-bf60-4fdc-a185-a01a781beafb.png)

Let's define another function to define hit detection. We check if the player intersects with any of the vehicles. In this function, we check which row the player is currently in. The index is off by one because the row metadata does not include the starting row. If the player is in the starting row, we get undefined. We ignore that case. If the player is in a car or truck lane, we loop over the vehicles in the row and check if they intersect with the player. We create bounding boxes for the player and the vehicle to check for intersections.

```js :collapsed-lines
import * as THREE from "three";
import { metadata as rows } from "./Map";
import { player, position } from "./Player";

export function hitTest() {
  const row = rows[position.currentRow - 1];
  if (!row) return;

  if (row.type === "car" || row.type === "truck") {
    const playerBoundingBox = new THREE.Box3();
    playerBoundingBox.setFromObject(player);

    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw Error("Vehicle reference is missing");

      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        window.alert("Game over!");
        window.location.reload();
      }
    });
  }
}
```

If the bounding boxes intersect, we show an alert. Once the user clicks OK on the alert, we reload the page. We call this function in the **animate** function, which will run it on every frame.

```js :collapsed-lines
import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { player } from "./Player";
import { map } from "./Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import "./style.css";
import "./collectUserInput";

. . .

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest(); // Add hit detection

  renderer.render(scene, camera);
}
```

---

## Next Steps

Congratulations, you’ve reached the end of this tutorial, and we’ve covered all the main features of the game. We rendered a map, animated the vehicles, added event handling for the player, and added hit detection.

I hope you had great fun creating this game. This game, of course, is far from perfect, and there are various improvements you can make if you’d like to keep working on it.

You can find the extended tutorial with interactive demos on [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](http://JavaScriptGameTutorials.com). There, we also cover how to add shadows and truck lanes and how to generate an infinite number of rows as the player moves forward. We also add UI elements for the controls and the score indicator, and we add a result screen with a button to reset the game.

Alternatively, you can find the extended tutorial on [<FontIcon icon="fa-brands fa-youtube"/>YouTube](https://youtu.be/vNr3_hQ3Bws?ab_channel=HunorM%C3%A1rtonBorb%C3%A9ly).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Code a Crossy Road Game Clone with Three.js",
  "desc": "In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with Three.js. The goal of this game is to move a character through an endless path of static and moving obstacles. You have to go around trees and avoid getting hit ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-code-a-crossy-road-game-clone-with-threejs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
