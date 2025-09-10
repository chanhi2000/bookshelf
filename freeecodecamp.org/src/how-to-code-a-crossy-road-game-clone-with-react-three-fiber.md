---
lang: en-US
title: "How to Code a Crossy Road Game Clone with React Three Fiber"
description: "Article(s) > How to Code a Crossy Road Game Clone with React Three Fiber"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Code a Crossy Road Game Clone with React Three Fiber"
    - property: og:description
      content: "How to Code a Crossy Road Game Clone with React Three Fiber"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-code-a-crossy-road-game-clone-with-react-three-fiber.html
prev: /programming/js-react/articles/README.md
date: 2025-02-27
isOriginal: false
author:
  - name: Hunor Márton Borbély
    url : https://freecodecamp.org/news/author/hunor/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740599557930/dcbb214e-c6d2-400e-8b2a-25fd81ac3c47.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Code a Crossy Road Game Clone with React Three Fiber"
  desc="In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with React Three Fiber. In a previous tutorial, I taught you how to build this game using Three.js and vanilla JavaScript. And here, you’ll learn how to make the same..."
  url="https://freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-react-three-fiber"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740599557930/dcbb214e-c6d2-400e-8b2a-25fd81ac3c47.png"/>

In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with React Three Fiber. In a previous [**tutorial**](/freecodecamp.org/how-to-code-a-crossy-road-game-clone-with-threejs.md), I taught you how to build this game using Three.js and vanilla JavaScript. And here, you’ll learn how to make the same game with React Three Fiber instead.

The goal of this game is to move a character through an endless path of static and moving obstacles. You have to go around trees and avoid getting hit by cars.

There's a lot to cover in this tutorial: we will start with setting up the scene, the camera, and the lights. Then you’ll learn how to draw the player and the map with the trees and the cars. We’ll also cover how to animate the vehicles, and we’ll add event handlers to move the player through the map. Finally, we’ll add hit detection between the cars and the player.

This article is a shortened version of the Crossy Road tutorial from my site [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](https://javascriptgametutorials.com/). The extended tutorial is also available as a video on [<FontIcon icon="fa-brands fa-youtube"/>YouTube](https://youtu.be/ccYrSACDNsw).

<VidStack src="youtube/ccYrSACDNsw" />

---

## React Three Fiber vs Three.js

So you might be wondering - what is React Three Fiber, and how does it compare to Three.js? React Three Fiber uses Three.js under the hood, but it gives us a different way to build up our game with React. It’s also easier to to set up, as React Three Fiber comes with sensible defaults for things like the camera.

React has became a leading front-end framework, and React Three Fiber lets you define a 3D scene using React's well-established patterns. You can break down the game into React components and use hooks for animation, event handling, and hit detection.

Under the hood, React Three Fiber still uses Three.js objects. In fact, in some cases, we will access the underlying Three.js objects and manipulate them directly for better performance. But as we build up the game, we use the familiar React patterns.

So which one should you use? If you are already familiar with React, then React Three Fiber might give more structure to your games. And after reading through this and building along with me, you’ll be better equipped to choose.

---

## How to Set Up the Game

In this chapter, we’ll set up the drawing canvas, camera, and lights and render a box representing our player.

### Initializing the Project

I recommend using Vite to initialize the project. To do so, go to your terminal and type `npm create vite`, which will create an initial project for you.

When generating the project, select **React** (because React Three Fiber uses React).

```sh
# Create app
npm create vite my-crossy-road-game
# Select React as framework
# Select JavaScript

# Navigate to the project
cd my-crossy-road-game

# Update react and react-dom
npm install react@latest react-dom@latest

# Install dependencies
npm install three @react-three/fiber

# Start development server
npm run dev
```

At the time of writing this article, Vite will use React 18 by default. Meanwhile, React 19 is out, and the latest version of React Three Fiber is only compatible with React 19. So let’s update React and react-dom with `npm install react@latest react-dom@latest`.

After initializing the project, navigate to the project folder and install the additional dependencies. We will use Three.js and React Three Fiber with `npm install three @react-three/fiber`.

Finally, you can go to the terminal and type `npm run dev` to start a development server. This way, you can see live the result of your coding in the browser.

### The Drawing Canvas

Let’s create a new component called <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="fa-brands fa-react"/>`Game.jsx`. This will be the root of our game.

The `Scene` component will contain the drawing canvas, the camera, and the lights. We’ll pass on the `Player` component as its child, which will render a box. Later, we will add the `Map` component, including the trees, cars, and trucks. This component is also where the score indicator and the controls come later.

```jsx title="Game.jsx"
import { Scene } from "./components/Scene";
import { Player } from "./components/Player";

export default function Game() {
  return (
    <Scene>
      <Player />
    </Scene>
  );
}
```

### The main.jsx file

To use the new `Game` component as our root, we need to replace the original `App` component in the <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="fa-brands fa-react"/>`main.jsx` file.

This will give you an error for now because we didn’t implement the `Scene` and `Player` components.

Now that we’ve replaced the `App` component, we can delete the original <FontIcon icon="fa-brands fa-react"/>`App.jsx`, <FontIcon icon="fa-brands fa-css3-alt"/>`App.css`, and the <FontIcon icon="fas fa-folder-open"/>`assets` folder.

```jsx title="main.jsx"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./Game.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
```

Let’s also update the <FontIcon icon="fa-brands fa-css3-alt"/>`index.css` file to make sure our drawing canvas fills the entire screen.

```css title="index.css"
body {
  margin: 0;
  display: flex;
  min-height: 100vh;
}

#root {
  width: 100%;
}
```

### The Player

Let's start adding the necessary objects to render the first scene. Let's add a simple box to represent the player. We already added the player to the scene, so let's see how to define this player.

![The player](https://cdn.hashnode.com/res/hashnode/image/upload/v1739804077435/9667f94f-5005-41f8-a6ed-faa6706f0be1.png)

The player will be a simple box. To draw a 3D object, we’ll define a geometry and a material. The geometry defines the object's shape, and the material defines its appearance. Here, we’re using box geometry to define a box. The box geometry takes three arguments: the width, depth, and height of the box along the x, y, and z axes.

```jsx title="Player.jsx"
export function Player() {
  return (
    <group>
      <mesh position={[0, 0, 10]}>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0xffffff} />
      </mesh>
    </group>
  );
}
```

We have different options for the material. The main difference between them is how they react to light, if at all. Here, we're using `meshLambertMaterial`, a simple material that responds to light. We set the color property to white.

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

### The Lights

There are many types of lights in Three.js. Here, we're going to use an ambient light and a directional light.

You can see the result of ambient light only on the left side of the below image. The ambient light brightens the entire scene. It doesn't have a specific position or direction. You can think of it like the light on a cloudy day when it's bright, but there are no shadows. The ambient light is used to simulate indirect light.

![Ambient vs directional light](https://cdn.hashnode.com/res/hashnode/image/upload/v1739800781538/9e140ef9-4133-4151-9fc5-b629504259a8.png)

Now, let's look at the directional light that you can see on the right of the image above. A directional light has a position and a target. It shines light in a specific direction with parallel light rays. Even though it has a position, you can rather think of it as the sun that is shining from very far away. The position here is more to define the direction of the light, but then all the other light rays are also parallel with this light ray. So you can think of it like the sun.

![The directional light shines with parallel light rays](https://cdn.hashnode.com/res/hashnode/image/upload/v1739805160031/4742e1de-5dc0-4443-9716-af18581bfa1e.png)

That's why we're combining an ambient light (so that we have a base brightness all around the scene) with a directional light (to illuminate specific sides of our objects with a brighter color).

### The Scene

After reviewing the different camera and light options, let’s put them together in the `Scene` component. We set up the canvas with an orthographic camera and lights.

```jsx title="Scene.jsx"
import { Canvas } from "@react-three/fiber";

export const Scene = ({ children }) => {
  return (
    <Canvas
      orthographic={true}
      camera={{
        up: [0, 0, 1],
        position: [300, -300, 300],
      }}
    >
      <ambientLight />
      <directionalLight position={[-100, -100, 200]} />
      {children}
    </Canvas>
  );
};
```

We use the `Canvas` component from <FontIcon icon="fa-brands fa-npm"/>`@react-three/fiber`. This component will contain every 3D object on the scene, so it has a `children` prop.

We set the `orthographic` prop to `true` to use an orthographic camera and the `camera` prop to define the camera’s position and orientation. The camera props require vectors or coordinates that are defined by the x, y, and z values.

The `up` prop sets the camera’s up vector. We set it to `[0, 0, 1]` to make the z-axis the up vector. The `position` prop sets the camera’s position. We move the camera to the right along the x-axis, backward along the y-axis, and up along the z-axis.

We also add the lights. We can use React Three Fiber-specific elements within the `Canvas` element. We add the `ambientLight` and `directionalLight` components to add lights to the scene. We position the directional light to the left along the x-axis, backward along the y-axis, and up along the z-axis.

This is how our first scene comes together. We rendered a simple box.

---

## How to Render a Map

Now, let's add all the other objects to the scene. In this chapter, we’ll define the map. The map will consist of multiple rows, each described by metadata. Each row can be a forest, a car, or a truck lane. We’ll go through each type and define the 3D objects representing them.

![The different row types](https://cdn.hashnode.com/res/hashnode/image/upload/v1739803813951/3796e0c0-6f02-4c82-979b-a5192d8c3b8c.png)

The map can be broken down into rows, and each row can be broken down into multiple tiles. The player will move from tile to tile. Trees are also placed on a distinct tile. Cars, on the other hand, do not relate to tiles. They move freely through the lane.

![A row can be broken down into a tile](https://cdn.hashnode.com/res/hashnode/image/upload/v1739803829719/38318821-8496-43d1-9b1c-a5b36d78af14.png)

We define a file for the constants. Here, we define the number of tiles in each row. In this case, there are 17 ties per row, going from -8 to +8. The player will start in the middle at tile zero.

```jsx
export const minTileIndex = -8;
export const maxTileIndex = 8;
export const tilesPerRow = maxTileIndex - minTileIndex + 1;
export const tileSize = 42;
```

### The Starting Row

First, let's add the starting row. We’ll define a couple of components that we’re going to use to render the map, and we’ll render the initial row.

Let's create a new component called `Map`. Soon, we will add this group to the scene.

```jsx title="Map.jsx"
import { Grass } from "./Grass";

export function Map() {
  return (
    <>
      <Grass rowIndex={0} />
    </>
  );
}
```

Then, we set the map's content. Later, we will generate the 3D objects based on the metadata and use it to render the map. For now, let's just use the Grass component. We call the Grass component with the row index, so the grass component will position itself based on this row index.

Now, let's define the Grass component. The Grass component is the foundation and container of the forest rows and is also used for the starting row. It renders a group containing a flat, wide, green box. The dimensions of this box are determined by the constants `tileSize` and `tilesPerRow`. The box also has some height, so it sticks out compared to the road, which will be completely flat.

```jsx title="Grass.jsx"
import { tilesPerRow, tileSize } from "../constants";

export function Grass({ rowIndex, children }) {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0xbaf455} />
      </mesh>
      {children}
    </group>
  );
}
```

The grass can serve as a container for the trees in the row. That's why we wrap the green box into a group so that later, we can also add children to this group. We position the group along the y-axis based on the row index that we received from the Map component. For the initial lane, this is zero, but as we're going to have multiple lanes, we need to place them according to this position.

Now that we have the map container and the grass component, we can finally add the map to the scene.

```jsx title="Game.jsx"
import { Scene } from "./components/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/Map";

export default function Game() {
  return (
    <Scene>
      <Player />
      <Map />
    </Scene>
  );
}
```

### How to Add a Forest Row

Now that we have an empty forest, let's add another row containing trees. We define the map's metadata and render the rows based on this metadata.

![A forest row](https://cdn.hashnode.com/res/hashnode/image/upload/v1739806992172/139197f0-f2c1-4f11-aacf-f1fedeeaf9b0.png)

Let's define the map's metadata. The metadata is an array of objects that contain information about each row. Each row will contain a type that will determine the kind of the row and the rest of the properties depending on the row type.

```jsx
export const rows = [
  {
    type: "forest",
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
];
```

The metadata for a forest includes the type of “forest” and a list of trees. Each tree has a tile index, which represents which tile it is standing on. In this case, we have 17 tiles per row, going from -8 to +8. The trees also have a height, which is actually the height of the crown.

To render the rows, let’s extend the `Map` component to render the rows based on the metadata. We import the metadata and map each row to a separate `Row` component.

Note that the `rowIndex` is off by one compared to the array index because the first item in the metadata array will become the second row (after the starting row).

```jsx title="Map.jsx"
import { rows } from "../metadata";
import { Grass } from "./Grass";
import { Row } from "./Row";

export function Map() {
  return (
    <>
      <Grass rowIndex={0} />

      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
    </>
  );
}
```

Now, let’s define the `Row` component. The `Row` component is essentially a switch case that renders the correct row based on the `type` property of the row. We only support the `forest` type for now, but we will extend this file later to support car and truck lanes.

```jsx title="Row.jsx"
import { Forest } from "./Forest";

export function Row({ rowIndex, rowData }) {
  switch (rowData.type) {
    case "forest": {
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    }
  }
}
```

The `Forest` component contains the row’s foundation, a `Grass` component, and the trees in the row.

The `Grass` component can receive children. We map trees’ metadata to `Tree` components and pass them on as children to the `Grass` component. Each tree gets its `tileIndex`, which will be used for positioning the tree within the row, and its `height`.

```jsx title="Forest.jsx"
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export function Forest({ rowIndex, rowData }) {
  return (
    <Grass rowIndex={rowIndex}>
      {rowData.trees.map((tree, index) => (
        <Tree
          key={index}
          tileIndex={tree.tileIndex}
          height={tree.height}
        />
      ))}
    </Grass>
  );
}
```

Forest rows also have trees. For each item in the trees array, we render a tree. The Tree component will render a 3D object representing the tree. We pass on to this component the tile index that we will use to position the tree within the row and the height.

![A tree](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807310182/40cbb90b-0356-4db5-97bb-cdbe0c8e8cb8.png)

Since we’ve already added the map to the scene, the forest will appear on the screen. But first, we need to define how to render a tree. We are going to represent a tree with two boxes. We're going to have a box for the trunk and one for the crown.

```jsx title="Tree.jsx"
import { tileSize } from "../constants";

export function Tree({ tileIndex, height }) {
  return (
    <group position-x={tileIndex * tileSize}>
      <mesh position-z={height / 2 + 20}>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color={0x7aa21d} />
      </mesh>
      <mesh position-z={10}>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0x4d2926} />
      </mesh>
    </group>
  );
}
```

These are both simple boxes, just like we had before with the player and also in the Grass component. The trunk is placed on top of the ground. We lift it along the Z-axis by half of its height, and the crown is placed on top of the trunk. The crown's height is also based on the height property. These two meshes are wrapped together into a group, and then we position this group along the X-axis based on the tile index property.

### Car Lanes

Now, let's add another row type: car lanes. The process of adding car lanes will follow a similar structure. We define the lanes' metadata, including the vehicles, and then map them into 3D objects.

![The car lane](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807532566/1c9cfdc9-2c45-476c-9ada-09f7abf79328.png)

In the metadata, let's replace the first row with a car lane. The car lane will contain a single red car moving to the left. We have a direction property, which is a boolean flag. If this is true, that means the cars are moving to the right in the lane, and if it's false, then the vehicles are moving to the left. We also have a speed property, which defines how many units each vehicle takes every second.

Finally, we have an array of vehicles. Each car will have an initial tile index, which represents only its initial position because the cars will move later. Each car will also have a color property, which is a hexadecimal color value.

```jsx
export const rows = [
  {
    type: "car",
    direction: false,
    speed: 1,
    vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  },
];
```

Now, to render this lane type, we have to extend our logic to support car lanes. Let’s extend the `Row` Component with support for car lanes. If the type of a row is `car` we map it to a `CarLane` component.

```jsx title="Row.jsx"
import { Forest } from "./Forest";
import { CarLane } from "./CarLane";

export function Row({ rowIndex, rowData }) {
  switch (rowData.type) {
    case "forest": {
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    }
    case "car": {
      return <CarLane rowIndex={rowIndex} rowData={rowData} />;
    }
  }
}
```

The `CarLane` component renders the cars on the road. It has a similar structure to the `Forest` component.

It receives a `rowData` object as a prop, which contains the cars to be rendered. It wraps the cars in a `Road` component and maps over the `rowData.vehicles` array to render each car.

```jsx title="CarLane.jsx"
import { Road } from "./Road";
import { Car } from "./Car";

export function CarLane({ rowIndex, rowData }) {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        />
      ))}
    </Road>
  );
}
```

The Road and Car functions are new here, so let's examine them next. The Road function returns the foundation and container of the car and truck lanes. Similar to the Grass component, it also returns a group containing a gray plane.

![The Road component](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807755293/e731a758-ac20-40f5-819b-82a5ae81e65f.png)

The size of the plane is also determined by the constants `tileSize` and `tilesPerRow`. Unlike the Grass component, though, it doesn't have any height. It's completely flat. The road will also serve as a container for the cars and trucks in the row, so that's why we wrap the plane into a group - so that we can add children to it.

```jsx title="Road.jsx"
import { tilesPerRow, tileSize } from "../constants";

export function Road({ rowIndex, children }) {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh>
        <planeGeometry args={[tilesPerRow * tileSize, tileSize]} />
        <meshLambertMaterial color={0x454a59} />
      </mesh>
      {children}
    </group>
  );
}
```

Now, let's look at the Car. The Car function returns a very simple 3D car model.

![A car](https://cdn.hashnode.com/res/hashnode/image/upload/v1739807975022/dc04c3c1-de94-49fd-ad85-ade999c8862a.png)

It contains a box for the body and a smaller box for the top part. We also have two wheel meshes. Because we never see the cars from underneath, we don't need to separate the wheels into left and right. We can just use one long box for the front wheels and another one for the back wheels.

```jsx :collapsed-lines title="Car.jsx"
import { tileSize } from "../constants";

export function Car({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}) {
  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
    >
      <mesh position={[0, 0, 12]}>
        <boxGeometry args={[60, 30, 15]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh position={[-6, 0, 25.5]}>
        <boxGeometry args={[33, 24, 12]} />
        <meshLambertMaterial color={0xffffff} />
      </mesh>
      <mesh position={[-18, 0, 6]}>
        <boxGeometry args={[12, 33, 12]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      <mesh position={[18, 0, 6]}>
        <boxGeometry args={[12, 33, 12]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
    </group>
  );
}
```

We group all these elements, position them based on the `initialTileIndex` property, and turn them based on the `direction` property. If the car goes to the left, we rotate it by 180°. When we set rotation values in Three.js. We have to set them in radians, so that's why we set it to Math.Pi, which is equivalent to 180°.

You can also find a more extended version of how to draw this car with textures [**in this article**](/freecodecamp.org/three-js-tutorial.md).

Based on the metadata, we can now render a map with several rows. Here’s an example with a few more lanes. Of course, feel free to define your own map.

```jsx :collapsed-lines
export const rows = [
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
```

This article does not cover truck lanes, but they follow a similar structure. The code for it can be found at [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](http://javascriptgametutorials.com/).

---

## How to Animate the Cars

Let's move on and animate the cars in their lanes according to their speed and direction.

This is where things start to diverge from how you would typically use React. The React way would be to update a state or a prop and let React re-render the whole component. This is fast when working with HTML elements, but it is not very effective when working with 3D objects. We want to [<FontIcon icon="fas fa-globe"/>avoid re-rendering](https://r3f.docs.pmnd.rs/advanced/pitfalls#avoid-setstate-in-loops) the whole scene and, instead, update the position of the underlying objects directly.

We only use React to set up the scene and the objects, and then we let Three.js do the heavy lifting. React Three Fiber is just a thin layer on top of Three.js, so we can access the underlying Three.js objects directly to update the position of the cars and trucks.

We are going to use a custom hook, `useVehicleAnimation`**,** to animate the vehicles. This hook will need a reference to the 3D object it should manipulate. Before defining this hook, let’s get a reference to the Three.js group, which represents the car. We use React’s `useRef` hook to store the reference and bind it to the `group` element.

Then, we pass on this reference to the `useVehicleAnimation` hook, along with the direction and speed of the car.

```jsx :collapsed-lines title="Car.jsx"
import { useRef } from "react";
import { tileSize } from "../constants";
import useVehicleAnimation from "../hooks/useVehicleAnimation";

export function Car({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}) {
  const car = useRef(null);
  useVehicleAnimation(car, direction, speed);

  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
      ref={car}
    >
    // ... 
    </group>
  );
}
```

Let’s implement the `useVehicleAnimation` hook to animate the vehicles. It moves them based on their speed and direction until the end of the lane and then re-spawns them at the other end. This way, the vehicles move in an infinite loop.

![The cars move in an infinite loop](https://cdn.hashnode.com/res/hashnode/image/upload/v1739808359961/eca84295-09d7-463a-8d29-e5f8069bb673.png)

This hook uses the `useFrame` hook that React Three Fiber provides. This hook is similar to `setAnimationLoop` in Three.js. It runs a function on every animation frame.

Conveniently, this function receives the time `delta`—the time that passed since the previous animation frame. We multiply this value by the vehicle’s `speed` to get the distance the car took during this time.

```jsx :collapsed-lines
import { useFrame } from "@react-three/fiber";
import { tileSize, minTileIndex, maxTileIndex } from "../constants";

export default function useVehicleAnimation(ref, direction, speed) {
  useFrame((state, delta) => {
    if (!ref.current) return;
    const vehicle = ref.current;

    const beginningOfRow = (minTileIndex - 2) * tileSize;
    const endOfRow = (maxTileIndex + 2) * tileSize;

    if (direction) {
      vehicle.position.x =
        vehicle.position.x > endOfRow
          ? beginningOfRow
          : vehicle.position.x + speed * delta;
    } else {
      vehicle.position.x =
        vehicle.position.x < beginningOfRow
          ? endOfRow
          : vehicle.position.x - speed * delta;
    }
  });
}
```

We directly update the `position.x` property of the underlying Three.js group. If the vehicle reaches the end of the lane, we re-spawn it at the other end.

Note that the reference passed to the hook might be `null` because it is only set after the first render. If the reference is not set, we return early from the function. Then, the animation starts in the next frame.

---

## How to Move the Player

Now, let's move on to animating the player. Moving the player on the map is more complex than moving the vehicles. The player can move in all directions, bump into trees, or get hit by cars, and it shouldn't be able to move outside the map.

In this chapter, we are focusing on two parts: collecting user inputs and executing the movement commands. Player movement is not instant - we need to collect the movement commands into a queue and execute them one by one. We are going to collect user inputs and put them into a queue.

### Collecting User Inputs

To track the movement commands, we create a store for the player. We do not use a state management library, as we don’t need a reactive store. We simply define our state in a regular JavaScript file.

The store will keep track of the player’s position and movement queue. The player starts at the middle of the first row, and the move queue is initially empty.

We will also export two functions: **queueMove** adds the movement command to the end of the move queue, and the **stepCompleted** function removes the first movement command from the queue and updates the player's position accordingly.

```jsx :collapsed-lines
export const state = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
};

export function queueMove(direction) {
  state.movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = state.movesQueue.shift();

  if (direction === "forward") state.currentRow += 1;
  if (direction === "backward") state.currentRow -= 1;
  if (direction === "left") state.currentTile -= 1;
  if (direction === "right") state.currentTile += 1;
}
```

Now we can add event listeners for keyboard events to listen to the arrow keys. The `useEventListeners` hook listens to the arrow keys and calls the `queueMove` function of the player store with the corresponding direction.

```jsx :collapsed-lines
import { useEffect } from "react";
import { queueMove } from "../stores/player";

export default function useEventListeners() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        queueMove("forward");
      } else if (event.key === "ArrowDown") {
        queueMove("backward");
      } else if (event.key === "ArrowLeft") {
        queueMove("left");
      } else if (event.key === "ArrowRight") {
        queueMove("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
```

After defining the event listeners, we also have to import them into the Game component so that they work.

```jsx :collapsed-lines title="Game.jsx"
import { Scene } from "./components/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/Map";
import useEventListeners from "./hooks/useEventListeners";

export default function Game() {
  useEventListeners();

  return (
    <Scene>
      <Player />
      <Map />
    </Scene>
  );
}
```

### Executing Movement Commands

So far, we have collected user inputs and put each command into the `movesQueue` array in the player component. Now, it's time to execute these commands one by one and animate the player.

Let's create a new hook called `usePlayerAnimation`. Its main goal is to take each move command from the `moveQueue` one by one, calculate the player's progress toward executing a step, and position the player accordingly.

![The player movement](https://cdn.hashnode.com/res/hashnode/image/upload/v1739808997988/8adb70d2-bf5d-4e65-8ed9-29e8f297b487.png)

This hook animates the player frame by frame. It uses the `useFrame` hook, just like the `useVehicleAnimation` hook. This time, however, we use a separate `moveClock` that measures each step individually. We pass on `false` to the clock constructor so it doesn’t start automatically. The clock starts at the beginning of a step. At each animation frame, first, we check if there are any more steps to take, and if there are and we’re not currently processing a step, we start the clock.

```jsx :collapsed-lines
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state, stepCompleted } from "../stores/player";
import { tileSize } from "../constants";

export default function usePlayerAnimation(ref) {
  const moveClock = new THREE.Clock(false);

  useFrame(() => {
    if (!ref.current) return;
    if (!state.movesQueue.length) return;
    const player = ref.current;

    if (!moveClock.running) moveClock.start();

    const stepTime = 0.2; // Seconds it takes to take a step
    const progress = Math.min(
      1,
      moveClock.getElapsedTime() / stepTime
    );

    setPosition(player, progress);

    // Once a step has ended
    if (progress >= 1) {
      stepCompleted();
      moveClock.stop();
    }
  });
}

// ...
```

We use the move clock to calculate the progress between the two tiles. The progress indicator can be a number between zero and one. Zero means that the player is still at the beginning of the step, and one means that it’s arrived at its new position.

At each animation frame, we call the `setPosition` function to set the player’s position according to the progress. Once we finish a step, we call the `stepCompleted` function to update the player's position and stop the clock. If there are any more move commands in the `movesQueue`, the clock will restart in the following animation frame.

Now that we know how to calculate the progress for each step, let's look into how to set the player's position based on the progress. The player will jump from tile to tile. Let's break this down into two parts: the movement's horizontal and vertical components.

The player moves from the current tile to the next tile in the direction of the move command. We calculate the player's start and end position based on the current tile and the direction of the move command. Then, we use linear interpolation with a utility function that Three.js provides. This will interpolate between the start and end positions based on the progress.

```jsx :collapsed-lines
// ...
function setPosition(player, progress) {
  const startX = state.currentTile * tileSize;
  const startY = state.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (state.movesQueue[0] === "left") endX -= tileSize;
  if (state.movesQueue[0] === "right") endX += tileSize;
  if (state.movesQueue[0] === "forward") endY += tileSize;
  if (state.movesQueue[0] === "backward") endY -= tileSize;

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

It’s finally time to update the `Player` component to make it all come together. We create a new reference with `useRef` and assign it to the `group` element. Finally, we pass this reference to the `usePlayerAnimation` hook we just implemented.

```jsx :collapsed-lines title="Player.jsx"
import { useRef } from "react";
import usePlayerAnimation from "../hooks/usePlayerAnimation";

export function Player() {
  const player = useRef(null);
  usePlayerAnimation(player);

  return (
    <group ref={player}>
      <mesh position={[0, 0, 10]} castShadow receiveShadow>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0xffffff} flatShading />
      </mesh>
    </group>
  );
}
```

If you did everything right, the player should be able to move around the game board, moving forward, backward, left, and right. But we haven't added any hit detection. So far, the player can move through trees and vehicles and even get off the game board. Let's fix these issues in the following steps.

### Follow the Player with the Camera

We defined the camera in the `Scene` component. By default, it has a static position. Instead of that, we want to move it with the player. We could adjust its position at every animation frame just like the player, but it’s easier to attach the camera to the `Player` component so that they move together.

We can access the camera using the `useThree` hook from <FontIcon icon="fa-brands fa-npm"/>`@react-three/fiber`. This returns a Three.js camera object that we can add to the player group.

We already have a reference to the group representing the player. We can attach the camera to the player by adding it as a child of the player group. Because the player reference is undefined on the first render, we need to use the `useEffect` hook to attach the camera only once the player reference is set.

```jsx :collapsed-lines title="Player.jsx"
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import usePlayerAnimation from "../hooks/usePlayerAnimation";

export function Player() {
  const player = useRef(null);
  const camera = useThree((state) => state.camera);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current) return;

    // Attach the camera to the player
    player.current.add(camera);
  });

  return (
    // ...
  );
}
```

### Restricting Player Movement

Let’s make sure that the player can’t end up in a position that’s invalid. We will check if a move is valid by calculating where it will take the player. If the player would end up in a position outside of the map or in a tile occupied by a tree, we will ignore that move command.

![Calculating where the player will end up](https://cdn.hashnode.com/res/hashnode/image/upload/v1739810555283/310afd32-6e5a-4143-bbe2-e0da558bd6d7.png)

First, we need to calculate where the player would end up if they made a particular move. Whenever we add a new move to the queue, we need to calculate where the player would end up if they made all the moves in the queue and take the current move command. We create a utility function that takes the player's current position and an array of moves and returns the player's final position.

For instance, if the player's current position is 0,0, staying in the middle of the first row, and the moves are forward and left, then the final position will be row 1 tile -1.

```jsx :collapsed-lines
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

```jsx :collapsed-lines
import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { rows } from "../metadata";

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

```jsx :collapsed-lines
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";

export let state = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
};

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    { rowIndex: state.currentRow, tileIndex: state.currentTile },
    [...state.movesQueue, direction]
  );

  if (!isValidMove) return; // Ignore move

  state.movesQueue.push(direction);
}

// ...
```

This way, as you can see, you can move around the map - but you can never move before the first row, you can't go too far to the left or too far to the right, and you also can’t go through a tree anymore.

---

## Hit Detection

To finish the game, let's add hit detection. We check if the player gets hit by a vehicle, and if so, we show an alert popup.

![Calculating bounding boxes for hit detection](https://cdn.hashnode.com/res/hashnode/image/upload/v1739826639155/1497d588-bf60-4fdc-a185-a01a781beafb.png)

We add a new hook that checks from the vehicles’ perspective if they hit the player. So far, the player and the vehicles have handled their own movement independently. They have no notion of each other. To handle hit detection, either the player needs to know about the vehicles or the vehicles need to know about the player.

We’ll choose the former approach because this way, we only need to store one reference to the player in the store, and all the vehicles can check against this reference. Let’s extend the player store with a `ref` property to store the player object’s reference. We also expose a `setRef` method that sets this reference.

```jsx
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";

export const state = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
  ref: null,
};

// ...

export function setRef(ref) {
  state.ref = ref;
}
```

Then, we call the `setRef` method in the `Player` component to set the reference to the player object. We already have the `player` reference, so we can pass its value to the `setRef` method in the `useEffect` hook once it is set.

```jsx :collapsed-lines title="Player.jsx"
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { setRef } from "../stores/player";

export function Player() {
  const player = useRef(null);
  const camera = useThree((state) => state.camera);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current) return;

    // Attach the camera to the player
    player.current.add(camera);

    // Set the player reference in the store
    setRef(player.current);
  });

  return (
    // ...
  );
}
```

Then, let’s define another hook to handle hit detection. We check if the player intersects with any of the vehicles. If they do, we end the game.

This hook is from the perspective of a vehicle. It receives the `vehicle` reference and the `rowIndex`. We check if the vehicle intersects with the player if the player is in the same row, the row before, or the row after the vehicle. We use the `useFrame` hook to run the hit detection logic on every frame.

Then we create bounding boxes for the player and the vehicle to check for an intersection. This might be a bit overkill, as the shape of our objects is known, but it is a nice generic way to handle hit detection.

If the bounding boxes intersect, we show an alert. Once the user clicks OK on the alert, we reload the page.

```jsx :collapsed-lines
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state as player } from "../stores/player";

export default function useHitDetection(vehicle, rowIndex) {
  useFrame(() => {
    if (!vehicle.current) return;
    if (!player.ref) return;

    if (
      rowIndex === player.currentRow ||
      rowIndex === player.currentRow + 1 ||
      rowIndex === player.currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicle.current);

      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(player.ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        window.alert("Game over!");
        window.location.reload();
      }
    }
  });
}
```

Finally, we call this hook in the vehicle components. In the `Car` component, we pass the `car` reference and the `rowIndex` to the `useHitDetection` hook.

```jsx :collapsed-lines
import { useRef } from "react";
import { tileSize } from "../constants";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import useHitDetection from "../hooks/useHitDetection";

export function Car({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}) {
  const car = useRef(null);
  useVehicleAnimation(car, direction, speed);
  useHitDetection(car, rowIndex);

  return (
    // ...
  );
}
```

---

## Next Steps

Congratulations, you’ve reached the end of this tutorial, and we’ve covered all the main features of the game. We rendered a map, animated the vehicles, added event handling for the player, and added hit detection.

I hope you had great fun creating this game. This game, of course, is far from perfect, and there are various improvements you can make if you’d like to keep working on it.

You can find the extended tutorial with interactive demos on [<FontIcon icon="fas fa-globe"/>JavaScriptGameTutorials.com](http://javascriptgametutorials.com/). There, we also cover how to add shadows and truck lanes and how to generate an infinite number of rows as the player moves forward. We also add UI elements for the controls and the score indicator, and we add a result screen with a button to reset the game.

Alternatively, you can find the extended tutorial on [<FontIcon icon="fa-brands fa-youtube"/>YouTube](https://youtube.com/ccYrSACDNsw).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Code a Crossy Road Game Clone with React Three Fiber",
  "desc": "In this tutorial, you’ll learn how to create a clone of the mobile game Crossy Road with React Three Fiber. In a previous tutorial, I taught you how to build this game using Three.js and vanilla JavaScript. And here, you’ll learn how to make the same...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-code-a-crossy-road-game-clone-with-react-three-fiber.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
