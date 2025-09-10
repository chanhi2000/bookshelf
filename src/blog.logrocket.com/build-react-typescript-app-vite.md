---
lang: en-US
title: "How to build a React + TypeScript app with Vite"
description: "Article(s) > How to build a React + TypeScript app with Vite"
icon: fa-brands fa-react
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
      content: "Article(s) > How to build a React + TypeScript app with Vite"
    - property: og:description
      content: "How to build a React + TypeScript app with Vite"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-react-typescript-app-vite.html
prev: /programming/js-react/articles/README.md
date: 2023-07-21
isOriginal: false
author:
  - name: Clara Ekekenta
    url : https://blog.logrocket.com/author/claraekekenta/
cover: /assets/image/blog.logrocket.com/build-react-typescript-app-vite/banner.png
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
  name="How to build a React + TypeScript app with Vite"
  desc="We explore the benefits of building an app with React, TypeScript, and Vite, and compare its performance to the same app built with CRA."
  url="https://blog.logrocket.com/build-react-typescript-app-vite"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-react-typescript-app-vite/banner.png"/>

::: note Editor’s note

This tutorial on building a TypeScript app with Vite was last updated on 21 July 2023 to verify accuracy and to add a section on the benefits of using Vite for React apps.

:::

![Build TypeScript App Vite](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/banner.png)

React, combined with TypeScript, offers a powerful way to develop scalable and maintainable web applications. TypeScript brings static typing to the world of JavaScript, making it easier to write error-free code. Meanwhile, [<VPIcon icon="fas fa-globe"/>Vite](https://vitejs.dev/) is a fast and lightweight build tool for modern web development, providing a rapid development experience focused on speed and simplicity.

In this article, we’ll delve deep into how to harness the combined strengths of React, TypeScript, and Vite to create an efficient web application. We’ll walk through the process of initiating a new project, integrating TypeScript, setting up React, and utilizing Vite’s capabilities to enhance the development experience.

Whether you’re a seasoned web developer or just starting out, I think you’ll find this article valuable. So grab a cup of coffee and let’s get started!

---

## Unique features of Vite

Vite offers many unique features that set it apart from other build tools and make it an excellent choice for web development. Let’s take a look at some of Vite’s special features:

- **Instant reloading**: Vite offers instant reloading, meaning that changes made to the code are immediately reflected in the browser without needing a full page reload. This speeds up the development process and makes testing and debugging code easier.
- **Optimized build times**: Vite is optimized for fast build times, focusing on minimal overhead. It uses in-memory caching and fast incremental builds to minimize the time required to compile and build the application. This results in shorter build times and a more efficient development experience.
- **Efficient code splitting**: Vite uses efficient code splitting to ensure that the user only downloads the code required for the current page, resulting in faster load times and a better user experience. This is especially important for large and complex applications, where load times can become bottlenecks.
- **Fast and lightweight**: Vite is designed to be fast and lightweight, making it an excellent choice for small and large applications alike. It requires minimal setup and configuration and is easy to use and understand, even for beginners.
- **Native ES module support**: Vite supports the native ES module (ESM) format, the modern standard for JavaScript modules. This allows for faster and more efficient loading of modules and provides a cleaner and more maintainable codebase.

---

## Why combine TypeScript and Vite?

TypeScript and Vite are two powerful tools that have gained widespread popularity in the web development community. While TypeScript provides type safety and a strong foundation for building scalable applications, Vite offers a fast and efficient development experience. So, why combine these two technologies? Let’s take a look.

- **Improved type safety**: TypeScript provides optional type annotations that can catch type-related errors during development. This helps developers to write more robust and maintainable code and reduces the likelihood of bugs and unexpected behavior. With TypeScript and Vite, developers can ensure the code they write is high quality and free from type-related errors.
- **Faster development experience**: Vite was designed with speed and simplicity in mind. It offers instant reloading and optimized build times, making developing web applications more accessible and efficient. By combining TypeScript with Vite, developers can take advantage of TypeScript’s robust type system and Vite’s fast development experience for a more enjoyable and efficient development process.
- **Scalable and maintainable code**: TypeScript is a statically typed language that supports modern JavaScript features and is widely used in large-scale projects. By combining TypeScript with Vite, developers can write scalable and maintainable code that is easy to understand and modify over time.
- **Improved performance**: Vite is optimized for fast build times and minimal overhead, making it an excellent choice for large and complex applications. This results in improved performance and shorter load times for the end user. By combining TypeScript and Vite, developers can build high-performance web applications that deliver a fast and smooth user experience.

---

## Benefits of using React with Vite

Vite offers a unique development experience due to its speed, efficiency, and compatibility with modern JavaScript libraries like React. Here are some specific benefits when using React with Vite:

- **Rapid development cycle**: The biggest advantage of using Vite is its incredibly fast Hot Module Replacement (HMR). Combined with React, this leads to a nearly instantaneous reflection of changes made in the browser during the development process. This rapid feedback loop drastically improves the overall development experience.
- **Seamless JSX support**: React is popular for its [**JSX syntax, a hybrid of JavaScript and HTML**](/blog.logrocket.com/declaring-jsx-types-typescript-5-1.md), offering a more intuitive way to structure component layouts. Vite comes with inbuilt support for JSX. This means you can write and update your React components without any additional configuration, thus accelerating your development process.
- **Efficient bundle size**: Vite utilizes Rollup under the hood for its production build, which is well-known for generating small, efficient bundles. Building large-scale React applications results in faster load times, leading to an enhanced user experience.
- **Intuitive asset handling**: Vite offers superior handling of assets by treating them as JavaScript imports. This lets you directly reference your React components’ images, fonts, and other assets. Vite optimally handles these assets during the production build, improving your application’s performance.
- **Simplified, React-friendly configuration**: Vite is straightforward to configure, especially compared to older bundlers. Vite provides a ready-to-use template for React, enabling you to get a new React project up and running quickly. This focus on simplification allows you to spend more time developing your application and less time on the setup.
- **React Fast Refresh integration**: [<VPIcon icon="fas fa-globe"/>Vite supports React Fast Refresh](https://v2.vitejs.dev/guide/features.html#hot-module-replacement), a potent tool from the React team for fast refreshing during local development. It retains the component state even after a file saves, which results in a seamless and uninterrupted development experience. This is particularly useful in React, where stateful component logic is common.

---

## Creating a Vite project

Now that we understand more about the powerful combination of TypeScript and Vite, let’s dive into the demo portion of this tutorial.

First, ensure that you have Node.js ≥v18 installed on your machine, then create a Vite project by running the following command in the terminal:

```sh
npm create vite@latest
```

This command will prompt you to choose a name for your project. Feel free to choose any name; then press **Enter** to continue. For this demonstration, we’ll use the project name `vite-ts-app`.

Next, you’ll be asked to select a framework for your Vite project. Vite provides a variety of frameworks that may be used for an application: React, Vue.js, Lit, Preact, vanilla JavaScript, and Svelte. For this demo, we’ll select **React**.

Lastly, you’ll be prompted to choose a variant for your application. For this demo, we’re building a TypeScript app with Vite, so we’ll select **TypeScript**.

Here are our selections for the Vite project prompts:

![Creating Vite Project From Terminal](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/creating-vite-project-from-terminal.png)

### Project structure

After processing the project information we just submitted, Vite will generate the project’s folder structure:

```plaintext title="file structure"
📦vite-ts-app
┣ 📂public
┃ ┗ 📜vite.svg
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📜react.svg
┃ ┣ 📜App.css
┃ ┣ 📜App.tsx
┃ ┣ 📜index.css
┃ ┣ 📜main.tsx
┃ ┗ 📜vite-env.d.ts
┣ 📜.gitignore
┣ 📜index.html
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┗ 📜vite.config.ts
```

Below are the key files from the `vite-ts-app` project folder:

- <VPIcon icon="fa-brands fa-html5"/>`index.html`: The main file, typically found in a public directory in a Vite project
- <VPIcon icon="fa-brands fa-react"/>`main.tsx`: Where the code for producing the browser output is executed. This file is common for Vite projects
- <VPIcon icon="iconfont icon-json"/>`vite.config.json`: The configuration file for any Vite project

---

## Running the application

We’ve completed the prompts to create a Vite project. Now, let’s cd into the project folder and use the below commands to run the application:

```sh
cd vite-ts-app
npm install
npm run dev
```

To confirm that the application is running, check the terminal — and you should see the following:

![Vite Application Running Port 1574](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/vite-application-running-port-5174.png)

Press the <kbd>o</kbd> key to open the application in your web browser:

![Vite React Application Preview Web Browser](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/vite-react-application-preview-web-browser.png)

---

## Building a blog application

With the Vite app up and running in our browser, let’s create a blog application using Vite and React that renders some static blog data from a JSON file.

To get started, let’s update the code in the <VPIcon icon="fa-brands fa-react"/>`App.tsx` file to add a navbar to the application’s UI:

```tsx title="App.tsx"
import './App.css'
function App() {

 return (
  <div className="App">
   <div className="navbar">
    <ul>
     <li>Home</li>
     <li>Blog</li>
    </ul>
   </div>
  </div>
 )
}
export default App
```

Next, let’s update the <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file to add some new styles to the application:

```css title="App.css"
* {
 padding: 0px;
 margin: 0px;
 box-sizing: border-box;
}
.navbar {
 background-color: rgb(50, 47, 47);
 color: white;
 padding: 10px;
}
.navbar ul {
 display: flex;
 width: 600px;
 margin: 0px auto;
 font-size: 14px;
 list-style: none;
}
.navbar ul li {
 margin: 10px;
}
```

The resulting UI will look like the following:

![TypeScript Blogging App Navbar Preview](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/typescript-blogging-app-navbar-preview.png)

### Creating the blog data

Next, we’ll need to add data to our blog application. Let’s create a <VPIcon icon="iconfont icon-json"/>`blog.json` file in the project’s root directory and add the following data:

```json title="blog.json"
[
 {
  "id": 1,
  "title": "Building a Todo App with Vue",
  "cover": "https://nextjs.org/static/images/learn/foundations/next-app.png",
  "author":"John Doe"
 }, {
  "id": 2,
  "title": "Getting started with TypeScript",
  "cover": "https://nextjs.org/static/images/learn/foundations/components.png",
  "author":"Claman Joe"
 }
]
```

Here we defined some arrays of blog objects, which we’ll render in our Vite app’s UI.

### Creating a blog component

Now, let’s create a <VPIcon icon="fas fa-folder-open"/>`components` folder in the <VPIcon icon="fas fa-folder-open"/>`src` directory. Then, we’ll create a <VPIcon icon="fa-brands fa-react"/>`Blog.tsx` file and add the below snippet:

```ts :collapsed-lines title="components/Blog.tsx"
import blogData from '../../blog.json'
type Blog = {
  id: number,
  title: string,
  cover: string,
  author: string
}
export function Blog() {
  return (
    <div className="container">
      <div className="blog">
        {blogData.map((blog: Blog) =>
          <div className="card" key={blog.id}>
            <img src={blog.cover} alt="" />
            <div className="details">
              <h2>{blog.title}</h2>
              <h4>{blog.author}</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

This code defines a function that returns a container for blog posts and includes a list of blog cards. Each card displays the title, cover image, and blog post author. The code uses a `map` function to loop through a `blogData` array and create a `card` for each item.

Next, let’s update the <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file to style the `Blog` component:

```css
.App {
 background: rgb(44, 183, 134);
 height: 100vh;
}
.container {
 width: 600px;
 margin: 0px auto;
}
.container .blog {
 display: flex;
 padding: 10px;
}
.container .card {
 background-color: white;
 margin: 10px;
 padding: 10px;
 border-radius: 4px;
 width: 50%;
 font-size: 10px;
 color: rgb(50, 47, 47);
}
.container .card img {
 width: 100%;
}
```

Lastly, let’s update the <VPIcon icon="fa-brands fa-react"/>`App.tsx` component to import and render the `Blog` component:

```tsx title="App.tsx"
import './App.css'
import { Blog} from './components/Blog'

function App() {

 return (
  <div className="App">
   <div className="navbar">
    <ul>
     <li>Home</li>
     <li>Blog</li>
    </ul>
   </div>
    <Blog />
  </div>
 )
}
export default App
```

And with that, we’ve successfully created a blog application using TypeScript and Vite! If all went well, it should look like the image below:

![Vite React Full Blogging Application Preview](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/vite-react-full-blogging-application-preview.png)

---

## Performance comparison: CRA vs. Vite

To [**compare the startup time**](/blog.logrocket.com/vite-3-vs-create-react-app-comparison-migration-guide.md) of a Vite app to an app built with an alternative like Create React App (CRA), we’d need to build and test both apps under similar conditions. To demonstrate this, I built the same demo application that we just created in this tutorial, except I used CRA. Then, I used the performance inspection feature in Chrome DevTools to test the start time for each version of the app.

Here’s the performance result for the TypeScript app built with CRA; the startup time was 99ms:

![Performance TypeScript App Built CRA Chrome DevTools](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/performance-typescript-app-built-cra-chrome-devtools.png)

And here’s the performance of the TypeScript app built with Vite; the startup time was 42ms:

![Performance TypeScript App Built Vite Chrome DevTools](/assets/image/blog.logrocket.com/build-react-typescript-app-vite/performance-typescript-app-built-vite-chrome-devtools.png)  
In our test, the TypeScript application built with Vite started 58 percent faster than the TypeScript application built with Create React App.

---

## Conclusion

In this article, we discussed the many benefits of combining React, TypeScript, and Vite, demonstrated how to build a simple React-based blog application using TypeScript and Vite, and then compared the performance of our app with that of a TypeScript app built with Create React App.

The fusion of React, TypeScript, and Vite presents an array of benefits for web developers — from React’s component-based approach and TypeScript’s enhanced type safety to Vite’s rapid development experience. This blend promotes scalable, maintainable code and superior performance.

Vite’s focus on speed, efficiency, and simplicity helps deliver high-quality, performant web applications. The combination of TypeScript and Vite affords developers of all levels an excellent choice for building high-quality and performant web applications.

I hope you got value from this tutorial. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to build a React + TypeScript app with Vite",
  "desc": "We explore the benefits of building an app with React, TypeScript, and Vite, and compare its performance to the same app built with CRA.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-react-typescript-app-vite.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
