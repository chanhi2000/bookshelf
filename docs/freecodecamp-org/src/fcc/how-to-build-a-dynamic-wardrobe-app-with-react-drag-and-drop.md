---
lang: en-US
title: "How to Build a Dynamic Wardrobe App with React Drag and Drop"
description: "Article(s) > How to Build a Dynamic Wardrobe App with React Drag and Drop"
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
      content: "Article(s) > How to Build a Dynamic Wardrobe App with React Drag and Drop"
    - property: og:description
      content: "How to Build a Dynamic Wardrobe App with React Drag and Drop"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-dynamic-wardrobe-app-with-react-drag-and-drop.html
prev: /programming/js-react/articles/README.md
date: 2025-05-05
isOriginal: false
author:
  - name: Timothy Olanrewaju
    url : https://freecodecamp.org/news/author/SmoothTech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746456835547/563ca5bd-27b0-421e-a0f3-a13f97388449.png
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
  name="How to Build a Dynamic Wardrobe App with React Drag and Drop"
  desc="Have you ever found yourself stuck deciding what color outfit to wear? Maybe you’re mixing and matching different tops and bottoms, unsure if the colors go together. It’s a common dilemma - so common that many of us turn to friends or family for a se..."
  url="https://freecodecamp.org/news/how-to-build-a-dynamic-wardrobe-app-with-react-drag-and-drop"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746456835547/563ca5bd-27b0-421e-a0f3-a13f97388449.png"/>

Have you ever found yourself stuck deciding what color outfit to wear? Maybe you’re mixing and matching different tops and bottoms, unsure if the colors go together. It’s a common dilemma - so common that many of us turn to friends or family for a second opinion before stepping out for a meeting or a hangout.

But what if you’re alone and need to make that choice quickly? Imagine having an app where you can drag and drop different clothing colors on your screen, instantly visualizing your outfit. If it looks good, that’s all the validation you need - no more second-guessing your look.

In this tutorial, we’ll build a dynamic wardrobe app using React. You’ll learn to structure components, handle drag-and-drop interactions, and craft a smooth user experience. Let’s get straight into it!

::: note Prerequisites

Before we start coding, make sure you have:

- Basic knowledge of React.
- A code editor of your choice.

:::

---

## Steps to Create a Dynamic Wardrobe using React

We're going to go through how to build this project step by step, so it's easy to follow along. By the end, you'll understand exactly how drag and drop functionality in React works.

### Step 1: Setting Up Your Project

First and foremost, you need to set up React and Tailwind CSS using Vite in a project. If you don't know how to do that, check out this [**article**](/freecodecamp.org/how-to-install-tailwindcss-in-react.md) and follow the steps. When you’re done, come back here, and let’s continue building.

If you already have a React project with Tailwind CSS you want to use, that’s great too.

### Step 2: Setting Up States

We'll start by setting up our states. If you have no idea what states are you can read my article on states [**here**](/freecodecamp.org/react-state-management.md). In this simple project, we’ll have only two states: one for the selected top color (`selectedTop`) and the other for the selected bottom color (`selectedBottom`). We’ll be setting the initial value of both states to **white** (with hex code of #ffffff), as shown below:

```js
const [selectedTop, setSelectedTop] = useState("#ffffff");
const [selectedBottom, setSelectedBottom] = useState("#ffffff");
```

### Step 3: Defining Color Options

Next, we define an array of color options for the outfits:

```js
const colorOptions = [
  "#ff0000", // Red
  "#0000ff", // Blue
  "#ffff00", // Yellow
  "#00ff00", // Green
  "#ff00ff", // Pink
  "#808080", // Gray
  "#000000", // Black
  "#ffffff", // White
];
```

The `colorOptions` array provides a vibrant palette of colors that users can drag onto clothing items.

### Step 4: Implementing Drag and Drop Functionality

Now, let's create the drag and drop functionality, which is the core aspect of this project. We’ll need event handler functions to handle certain events when they are triggered by specific user interaction or browser events - in this case, dragging and dropping.

Here are the event handlers we need to implement the drag and drop functionality:

#### 1. `handleDragStart`

This function is triggered when the user starts dragging a color block from the color palette (typically triggered via `onDragStart` in JSX).

```js
const handleDragStart = (e, color) => {
  e.dataTransfer.setData("color", color);
};
```

Breaking it down:

- `const handleDragStart = (e, color) => { ... }`: This function accepts two parameters - the **drag event object (`e`)** and **color**, a custom value representing the color associated with the color block being dragged.
- `e.dataTransfer.setData("color", color)`:
  - `dataTransfer` is a property of the drag event that holds data being dragged.
  - `.setData("color", color)` stores the value of color under the key "color".

#### 2. `handleDropOnTop`

This function is triggered when the color block is dropped onto the "**top**" section of your outfit interface.

```js
const handleDropOnTop = (e) => {
  e.preventDefault();
  const color = e.dataTransfer.getData("color");
  setSelectedTop(color);
};
```

Breaking it down:

- `const handleDropOnTop = (e) => { … }`: This function takes a single argument `e`, which is the event object representing the drop action.
- `e.preventDefault()`: By default, the browser won’t allow dropping an item unless you explicitly prevent the default behavior. This ensures the drop target can accept the dragged item.
- `const color = e.daaTransfer.getData(“color”)`: retrieves the data previously set during the drag operation using `setData(“color”, color)` in `handleDragStart` .
- `setSelectedTop(color)`: The `color` data will be used to update the `selectedTop` state that tracks the currently selected top clothing color. This will typically cause the UI to re-render, showing the dropped color on the “top” section of the outfit.

#### 3. `handleDropOnBottom`

This function is triggered when the color block is dropped onto the "**bottom**" section of your outfit interface.

```js
const handleDropOnBottom = (e) => {
  e.preventDefault();
  const color = e.dataTransfer.getData("color");
  setSelectedBottom(color);
};
```

Breaking it down:

- `const handleDropOnBottom = (e) => { ... }`: This function takes a single argument `e`, which is the event object representing the drop action.
- `e.preventDefault()`: By default, the browser won’t allow dropping an item unless you explicitly prevent the default behavior. This ensures the drop target can accept the dragged item.
- `const color = e.dataTransfer.getData("color")`: Retrieves the data previously set during the drag operation using `setData("color", color)` in `handleDragStart`.
- `setSelectedBottom(color)`: The `color` data will be used to update the `selectedBottom` state that tracks the currently selected top clothing color. This will typically cause the UI to re-render, showing the dropped color on the “bottom” section of the outfit.

#### 4. `allowDrop`

This event handler function enables a drop target by preventing the browser's default behavior, which otherwise disallows dropping elements.

```js
const allowDrop = (e) => {
  e.preventDefault();
};
```

### Step 5: Building the User Interface

Having finished the functional part of our wardrobe project, we want to build out the visual part that users can see and interact with.

The UI will consist of two parts: a color palette on the left and an outfit preview on the right. The color palette section will include 30 color blocks while the outfit preview section will include a top and bottom, onto which selected colors can be dragged and applied to see how they look together.

This is a visual representation of the UI we’re building out:

![449e4294-8917-470e-ad06-cf54d1809296](https://cdn.hashnode.com/res/hashnode/image/upload/v1746193425525/449e4294-8917-470e-ad06-cf54d1809296.png)

#### Creating the Color Palette Section

To display all the colors provided in our `colorOptions` array, we need to first map through the array consisting of color values and render a `<div>` for each color.

Each `<div>`:

- Acts as a **draggable color block** with fixed width and height.
- Has a semi-circular appearance using Tailwind CSS classes and inline styling to apply the specific background color.
- Triggers the `handleDragStart` function when dragging begins, passing the event and the selected color.
- Has a unique key for React's rendering optimization.
- If the color is white (`#ffffff`), it conditionally displays the text "**White**" in light gray for visibility.

This setup allows users to visually identify and drag different color options to the top or bottom of an outfit on the UI.

```js :collapsed-lines
return (
  <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg min-h-screen">
    <h1 className="text-3xl font-extrabold mb-8 text-indigo-700">
      Dynamic Wardrobe
    </h1>

    <div className="flex flex-col md:flex-row w-full gap-8">
      {/* Color palette section */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Color Palette
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Drag colors to the outfit pieces
        </p>
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <div
              key={color}
              className="w-12 h-12 rounded-md shadow-sm cursor-move flex items-center justify-center"
              style={{ backgroundColor: color, border: "1px solid #ddd" }}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, color)}
            >
              {color === "#ffffff" && (
                <span className="text-xs text-gray-400">White</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
```

#### Creating the Outfit Preview

Finally, let's implement the outfit preview section, which is the fun part. There are two parts to the outfit display: the top and the bottom section. Let’s look at them one after the other:

#### Top Section

This section acts as a **drop target for the top clothing color**. It consists of a div with an SVG that allows for color filling.

```js
<div
  className="w-full flex items-center justify-center"
  onDrop={handleDropOnTop}
  onDragOver={allowDrop}
>
  {/* T-shirt */}
  <svg viewBox="0 0 24 24" width="180" height="140">
    <path
      d="M16 2H8L6 6v3h2v13h8V9h2V6l-2-4z"
      fill={selectedTop}
      stroke="#333"
      strokeWidth="0.2"
    />
  </svg>
</div>;
```

In this section:

- `onDrop={handleDropOnTop}`: Sets the top outfit color, when a color is dropped at the top div.
- `allowDrop` is called via `onDragOver` to enable dropping.
- The T-shirt SVG is drawn and its fill color is controlled by `selectedTop`, which updates when a new color is dropped.

#### Bottom Section

This section acts as a **drop target for the bottom clothing color**. It consists of a div with an SVG that allows for color filling.

```js
<div
  className="w-full flex items-center justify-center -mt-8"
  onDrop={handleDropOnBottom}
  onDragOver={allowDrop}
>
  <svg viewBox="0 0 200 200" width="120" height="140">
    {/* Pants */}
    <path
      d="M60,20 L140,20 L150,180 L110,180 L100,100 L90,180 L50,180 L60,20 Z"
      fill={selectedBottom}
      stroke="#333"
      strokeWidth="2"
    />
    {/* Waistband */}
    <rect x="60" y="18" width="80" height="5" fill="#444" />
    {/* Center seam */}
    <path d="M100,20 L100,100" stroke="#000" strokeWidth="1" />
  </svg>
</div>;
```

In this section:

- `onDrop={handleDropOnBottom}`: Sets the bottom outfit color, when a color is dropped at the bottom div.
- `allowDrop` is called via `onDragOver` to enable dropping.
- The pant SVG is drawn and its fill color is controlled by `selectedBottom`, which updates when a new color is dropped.
- Extra details like a waistband (rect) and a seam (path) add realism.
    

That completes the UI section of our project.

### Step 6: Putting It All Together

Now that you’ve learned about the integral aspects, here is the full code that will give you the entire look and functionality:

```js :collapsed-lines
import { useState } from "react";

export default function App() {
  // State for selected colors
  const [selectedTop, setSelectedTop] = useState("#ffffff");
  const [selectedBottom, setSelectedBottom] = useState("#ffffff");

  // Color options for clothing
  const colorOptions = [
    "#ff0000", // Red
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#00ff00", // Green
    "#ff00ff", // Pink
    "#808080", // Gray
    "#000000", // Black
    "#ffffff", // White
    "#ffa500", // Orange
    "#800080", // Purple
    "#8B0000", // Dark Red
    "#006400", // Dark Green
    "#00008B", // Dark Blue
    "#4B0082", // Indigo
    "#228B22", // Forest Green
    "#20B2AA", // Light Sea Green
    "#87CEEB", // Sky Blue
    "#4682B4", // Steel Blue
    "#9932CC", // Dark Orchid
    "#FF1493", // Deep Pink
    "#FF4500", // Orange Red
    "#FFD700", // Gold
    "#F0E68C", // Khaki
    "#F5DEB3", // Wheat
    "#D2B48C", // Tan
    "#A0522D", // Sienna
    "#8B4513", // Saddle Brown
    "#BC8F8F", // Rosy Brown
    "#708090", // Slate Gray
    "#2F4F4F", // Dark Slate Gray
  ];

  // Drag and drop handlers
  const handleDragStart = (e, color) => {
    e.dataTransfer.setData("color", color);
  };

  const handleDropOnTop = (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    setSelectedTop(color);
  };

  const handleDropOnBottom = (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    setSelectedBottom(color);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700">
        Dynamic Wardrobe
      </h1>

      <div className="flex flex-col md:flex-row w-full gap-8">
        {/* Color palette section */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Color Palette
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Drag colors to the outfit pieces
          </p>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <div
                key={color}
                className="w-12 h-12 rounded-md shadow-sm cursor-move flex items-center justify-center"
                style={{ backgroundColor: color, border: "1px solid #ddd" }}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, color)}
              >
                {color === "#ffffff" && (
                  <span className="text-xs text-gray-400">White</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Outfit visualization section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Outfit Preview
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              {/* Outfit container - better positioning */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Top Section - accepts drag and drop */}
                <div
                  className="w-full flex items-center justify-center"
                  onDrop={handleDropOnTop}
                  onDragOver={allowDrop}
                >
                  {/* T-shirt */}
                  <svg viewBox="0 0 24 24" width="180" height="140">
                    <path
                      d="M16 2H8L6 6v3h2v13h8V9h2V6l-2-4z"
                      fill={selectedTop}
                      stroke="#333"
                      strokeWidth="0.2"
                    />
                  </svg>
                </div>
                <div
                  className="w-full flex items-center justify-center -mt-8"
                  onDrop={handleDropOnBottom}
                  onDragOver={allowDrop}
                >
                  <svg viewBox="0 0 200 200" width="120" height="140">
                    {/* Pants */}
                    <path
                      d="M60,20 L140,20 L150,180 L110,180 L100,100 L90,180 L50,180 L60,20 Z"
                      fill={selectedBottom}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    {/* Waistband */}
                    <rect x="60" y="18" width="80" height="5" fill="#444" />
                    {/* Center seam */}
                    <path d="M100,20 L100,100" stroke="#000" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Here’s our dynamic wardrobe in full flow:

![e840ecd6-665f-41b4-a590-02e91302cf26](https://cdn.hashnode.com/res/hashnode/image/upload/v1746197218776/e840ecd6-665f-41b4-a590-02e91302cf26.gif)

---

## Conclusion

This dynamic wardrobe project demonstrates the power of React's drag and drop API combined with state management. Not only is it a fun project to build, but it also taught you important concepts like managing state in React components, implementing drag and drop functionality, creating responsive layouts with Tailwind CSS and using SVG for interactive visuals.

If you enjoyed reading this tutorial, you could [<VPIcon icon="fas fa-globe"/>Buy Me a Coffee](https://buymeacoffee.com/timothyolanrewaju). You can also connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`timothy-olanrewaju750`)](https://linkedin.com/in/timothy-olanrewaju750) for more programming-related posts and articles.

See you on the next one!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Dynamic Wardrobe App with React Drag and Drop",
  "desc": "Have you ever found yourself stuck deciding what color outfit to wear? Maybe you’re mixing and matching different tops and bottoms, unsure if the colors go together. It’s a common dilemma - so common that many of us turn to friends or family for a se...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-dynamic-wardrobe-app-with-react-drag-and-drop.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
