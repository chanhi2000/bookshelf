---
lang: en-US
title: "Setting up our React application"
description: "Article(s) > (1/9) How to create a custom toast component with React" 
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/9) How to create a custom toast component with React"
    - property: og:description
      content: "Setting up our React application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/setting-up-our-react-application.html
date: 2023-06-21
isOriginal: false
author:
  - name: Uzochukwu Eddie Odozi
    url : https://blog.logrocket.com/author/uzochukwuodozi/
cover: /assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to create a custom toast component with React",
  "desc": "Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them.",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to create a custom toast component with React"
  desc="Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them."
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#setting-up-react-application"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

To demonstrate how to create custom toast components, we must first create a React application. I’ll assume that [Node.js](https://nodejs.org/en/) is already installed on your computer. Node.js comes with npm, and we’ll use Vite to build our React app.

First, open a terminal, navigate to the location where you want your app folder to be, and type the following command there:

```jsx
npm create vite
```

Next, simply follow the Vite instructions: name your project folder, choose React as the framework, and make sure to pick JavaScript as the variant. After the installation finishes, just CD into the project folder and install the required dependencies by typing `npm install` or `npm i`:

![Creating A React App With Vite](https://blog.logrocket.com/wp-content/uploads/2020/03/creating-react-app-vite.jpeg)

You can name the project whatever you want. We won’t install any other module inside the project; we’ll simply use the default modules. The default folder structure is as follows:

![Default React Folder Structure](https://blog.logrocket.com/wp-content/uploads/2020/03/default-react-folder-structure.png)

The <FontIcon icon="fas fa-folder-open"/>`src` folder is where we’ll do most of our work. Inside <FontIcon icon="fas fa-folder-open"/>`src`, create a new folder called `components`. We’ll add our toast and button components to this folder.

In React, you can either use class components, which requires you to extend a `React.Component` and create a render function that returns a React element, or functional components, which are plain JavaScript functions that accept props and return React elements. We will use functional components throughout this tutorial, which is also recommended by the React team.

Inside the App.js component, you should remove or adjust the existing contents of the JSX according to the project’s needs. The parent element class should be changed to `app` and include a heading that describes our project. Additionally, we’ll change the function to an arrow function. This is just my personal preference; feel free to use the default function if you prefer:

```jsx
import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1 className="app-title">React Toast Component</h1>
    </div>
  );
};

export default App;
```

Next, empty the contents of <FontIcon icon="fa-brands fa-css3-alt"/>`App.css` and leave it blank for now. Similarly, clear the contents of <FontIcon icon="fa-brands fa-css3-alt"/>`index.css` and keep it empty. We will gradually incorporate these styles as we make progress. <FontIcon icon="fa-brands fa-css3-alt"/>`App.css` will contain styles specific to the app layout, while <FontIcon icon="fa-brands fa-css3-alt"/>`index.css` will serve as the global CSS reset.
