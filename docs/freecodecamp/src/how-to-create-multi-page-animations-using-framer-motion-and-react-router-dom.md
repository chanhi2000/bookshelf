---
lang: en-US
title: "How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom"
description: "Article(s) > How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom"
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
      content: "Article(s) > How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom"
    - property: og:description
      content: "How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-multi-page-animations-using-framer-motion-and-react-router-dom.html
prev: /programming/js-react/articles/README.md
date: 2024-06-17
isOriginal: false
author:
  - name: Okosa Leonard
    url : https://freecodecamp.org/news/author/Okosaleo/
cover: https://freecodecamp.org/news/content/images/2024/06/Green-Abstract-Wavy-Background-Motivational-Quote-Facebook-Post.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom"
  desc="Animations are what make plain websites turn into exciting and unforgettable experiences. They give your website a bit of personality and uniqueness and leave the visitor admiring the overall aesthetic. It's a no-brainer that humans love beautiful th..."
  url="https://freecodecamp.org/news/how-to-create-multi-page-animations-using-framer-motion-and-react-router-dom"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/Green-Abstract-Wavy-Background-Motivational-Quote-Facebook-Post.png"/>

Animations are what make plain websites turn into exciting and unforgettable experiences. They give your website a bit of personality and uniqueness and leave the visitor admiring the overall aesthetic.

It's a no-brainer that humans love beautiful things. We all love products that look easy on the eyes.

In this article, we're going to learn how to create animations that wow users with the use of Framer motion and React-Router-Dom.

::: note Prerequisites

To be able to follow what we're doing in this article, you should have some knowledge of [<VPIcon icon="fa-brands fa-react"/>React](https://react.dev/), [<VPIcon icon="fas fa-globe"/>Framer motion](https://framer.com/motion/) and [<VPIcon icon="fas fa-globe"/>React-Router-DOM](https://reactrouter.com/).

To learn Framer motion better, you can study their documentation.

[<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en/download/package-manager) should also be installed on your system, and you should have a working code editor. I'll be using [<VPIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/).

:::

---

## How to Set Up the Project

To set up our project we're going to use Vite to set up our React development environment.

1. Open the terminal in VScode. You can use <kbd>Ctrl</kbd> + <kbd>`</kbd> (backtick)
2. In your terminal, enter the following command:

```sh
npm create vite@latest
```

3. Follow the prompts to name your project and choose your desired framework. In our case, we're using React. This will be a JavaScript project.
4. Go to your project directory and use `npm i` in the terminal.
5. To start your project use `npm run dev`.
6. Remember to clean your project by removing the code in App.js and your CSS files in the `src` folder.

---

## How to Initialize Framer Motion and React-Router-Dom

1. To install Framer-motion in your project open the terminal and enter:

```sh
npm i framer-motion
```

2. To install React-Router-DOM in your project open the terminal and enter:

```sh
npm i react-router-dom
```

---

## How to Set Up Components and Basic Routing with React-Router-DOM

Let's set up our components and the pages we'll be routing to for this project.

1. In <VPIcon icon="fas fa-folder-open"/>`src`, create a new folder named <VPIcon icon="fas fa-folder-open"/>`components`.
2. We'll add four files in this folder named <VPIcon icon="fa-brands fa-react"/>`Home.jsx`, <VPIcon icon="fa-brands fa-react"/>`About.jsx`, <VPIcon icon="fa-brands fa-react"/>`Projects.jsx` and <VPIcon icon="fa-brands fa-react"/>``Navbar.jsx`.
3. Inside the first three, we're going to create a React functional component. Change the content of the `h1` tag in each component:

```jsx
const Home = () => {
 return (
    <div>
     <h1>Home</h1>
    </div>
 )
 }

 export default Home
```

4. In the Navbar, we need to import `Link` from React-Router-DOM to create anchor elements. We then need to create a container housing our logo and nav links. The logo will link the points to our index page.

```jsx
import {Link} from "react-router-dom"

const Navbar () => {
  return (
    <div className="nav">
      <div className="logo">
        <Link className="nav-link" to="/">Lennythedev</Link>
      </div>
      <div>
        <div className="nav-links">
          <div className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/">About</Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/">Projects</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

5. Now let's go to our <VPIcon icon="fa-brands fa-js"/>`index.js` or <VPIcon icon="fa-brands fa-js"/>`main.js` file. The goal is to wrap our entire app with `BrowserRouter` which will enable routing within our application.

```jsx title="main.jsx"
import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
```

6. Now in <VPIcon icon="fa-brands fa-react"/>`App.jsx`, we're going to complete the final step of our configuration. We'll import our components, and some features from React-Router-DOM and render our components. By using `useLocation` feature from React-Router-DOM, we can set the current location of the routes by setting the key to the current path.

```jsx title="App.jsx"
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';

function App() {
  const location = useLocation();
  return (
    <>
       <NavBar />
       <AnimatePresence mode='wait'>
       <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/projects' element={<Projects />}/>
        <Route path='/about' element={<About />}/>
       </Routes>
       </AnimatePresence>
    </>
  )
}

export default App
```

7. Now we can add our styling in <VPIcon icon="fa-brands fa-css3-alt"/>`App.css`:

```css :collapsed-lines title="App.css"
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  font-family: "Fira Sans Condensed", sans-serif;
}

html,
body {
  font-family: "Fira Sans Condensed", sans-serif;
  background: rgb(0, 162, 255);
}

.nav {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  cursor: pointer;
}

.logo, .nav-item {
  margin: 2em;
  font-weight: 400;
  font-size: 1.5vw;
}

h1{
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 500;
  font-size: 10vw;
  line-height: 1;
  text-transform: uppercase;
}

a {
  text-decoration: none;
  font-weight: 500;
}
```

8. After following all the steps your app should look like this:

![styled webpage without animation](https://freecodecamp.org/news/content/images/2024/06/Annotation-2024-06-14-200041.png)

---

## How to Create Transitions Using Framer Motion

Finally let's create our animation for transitions between pages.

1. Create a file in components named <VPIcon icon="fa-brands fa-react"/>``Box.jsx` and `import motion from framer-motion`.
2. We can then return two divs, with `classNames` of `slide-in` and `slide-out` one for sliding in and another for sliding out.
3. We insert our animation in these divs with the help of framer-motion:

```jsx title="Box.jsx"
import { motion } from "framer-motion"

export default function Box() {
  return(
    <div>
     <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
     />
     <motion.div
     className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
     />
    </div>
  )
}
```

4. Next, we add our styling in our CSS file for `slide-in` and `slide-out` in our App.css

```css
.slide-in {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0f0f0f;
  transform-origin: bottom;
}

.slide-out {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #0f0f0f;
  transform-origin: top;
}
```

5. Finally, the last step is to use `AnimatePresence` from framer-motion in our <VPIcon icon="fa-brands fa-react"/>`App.jsx` file and wrap the entire App in `AnimatePresence` and set the mode as wait. If you want to learn more about a `AnimatePresence` visit the framer-motion docs.

```jsx title="App.jsx"
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <>
       <NavBar />
       <AnimatePresence mode='wait'>
       <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/projects' element={<Projects />}/>
        <Route path='/about' element={<About />}/>
       </Routes>
       </AnimatePresence>
    </>
  )
}

export default App
```

6. Finally, our work should look the same as the video below:

<VidStack src="youtube/Sb1txpdycpA" />

---

## Conclusion

Creating multi-page animations with Framer Motion and React-Router-Dom enhances user experience by providing smooth transitions.

This integration leverages the power of Framer Motion's animation capabilities with React-Router-Dom's routing features, resulting in dynamic, interactive web applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Multi-Page Animations Using Framer Motion & React-Router-Dom",
  "desc": "Animations are what make plain websites turn into exciting and unforgettable experiences. They give your website a bit of personality and uniqueness and leave the visitor admiring the overall aesthetic. It's a no-brainer that humans love beautiful th...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-multi-page-animations-using-framer-motion-and-react-router-dom.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
