---
lang: en-US
title: "Getting started with Create React App"
description: "Article(s) > Getting started with Create React App"
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
      content: "Article(s) > Getting started with Create React App"
    - property: og:description
      content: "Getting started with Create React App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/getting-started-with-create-react-app.html
prev: /programming/js-react/articles/README.md
date: 2023-03-28
isOriginal: false
author:
  - name: Karthik Kalyanaraman
    url : https://blog.logrocket.com/author/karthikkalyanaraman/
cover: /assets/image/blog.logrocket.com/getting-started-with-create-react-app/banner.png
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
  name="Getting started with Create React App"
  desc="Create React App is a great tool for quickly getting up and running on new React projects. Let's learn how to use it."
  url="https://blog.logrocket.com/getting-started-with-create-react-app"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/getting-started-with-create-react-app/banner.png"/>

::: note Editor’s Note

This post was updated on 28 March 2023 to include new sections on how to run tests with the React testing library, styling our React app with CSS, and a section on why you should use Create React App. To learn more about React, [<VPIcon icon="fas fa-globe"/>visit our archives here](https://blog.logrocket.com/tag/react/).

:::

![Getting Started With Create React App](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/banner.png)

[<VPIcon icon="fas fa-globe"/>Create React App](https://blog.logrocket.com/tag/create-react-app/) is a popular toolchain for building simple React apps. The goal of this post is to explain the components of Create React App at a deeper level to give you much better control and confidence over the development environment.

---

## Introduction

Before we understand what Create React App solves, let’s first [**learn what a toolchain is**](/blog.logrocket.com/creating-a-react-app-toolchain-from-scratch.md). In simple terms, a toolchain is a set of distinct software development tools linked by specific stages. In other words, any software development framework is made up of a bunch of supporting tools optimized to do specific functions. For instance, in C++ development, we need a compiler to compile the code and a build system like CMake to manage all the dependencies if the project is fairly big. In this case, the compiler and CMake become part of the toolchain.

In React development, different toolchains satisfy different requirements for product development. For instance, Next.js is great for building a server-rendered website, and [**Gatsby**](/blog.logrocket.com/contentful-gatsby-build-static-site-headless-cms.md) is optimized for static, content-oriented websites like blogs and newsletters.

---

## What is Create React App?

Create React App is also a toolchain. It is specifically recommended by the React community for building [**single-page applications**](/blog.logrocket.com/single-page-applications-css-transitions.md) (SPAs) and for learning React (for building “Hello, World!” applications). It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production.

Create React App was created by [Joe Haddad (<VPIcon icon="iconfont icon-github"/>`timer`)](https://github.com/timer) and [Dan Abramov (<VPIcon icon="iconfont icon-github"/>`gaearon`)](https://github.com/gaearon). The GitHub repository is very active and maintained by the creators, along with many open source developers from different parts of the world. If you’re interested in contributing, the repository’s [contributing page (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md) is an excellent place to start.

### Why should you use Create React App?

Create React App is a great tool for quickly getting up and running on new React projects. Some other reasons why you should use this tool are as follows:

- It abstracts away the complex configurations that come with creating a new React project
- It comes with a built-in development server that allows you to see changes in real time as you make them
- It includes a comprehensive set of development tools, such as linting and testing, out-of-the-box
- It is actively maintained and regularly updated with new features and bug fixes

---

## Getting started with Create React App

Now that we have relevant context about Create React App let’s start by installing it. In this tutorial, we will build a simple SPA that displays restaurants on a webpage and lets users rate them.

### Installation and folders

Run the following [<VPIcon icon="fa-brands fa-npm"/>`npx`](https://npmjs.com/package/npx) command on a terminal to install and bootstrap the application using Create React App. Let’s call our application `rate-restaurants`:

```sh
npx create-react-app rate-restaurants
```

This command runs for a few seconds and exits happily after creating a bare-bones React application under a new directory called <VPIcon icon="fas fa-folder-open"/>`rate-restaurants`. Now, `cd` into the <VPIcon icon="fas fa-folder-open"/>`rate-restaurants` directory. The directory looks something like this:

![Create React App Directory Structure](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/create-react-app-directory-structure.png)

### <VPIcon icon="fas fa-folder-open"/>`node_modules`

This folder is part of the npm system. [<VPIcon icon="fa-brands fa-npm"/>npm](https://docs.npmjs.com/files/folders.html) puts local installs of packages in <VPIcon icon="fas fa-folder-open"/>`./node_modules` of the current package root. Basically, the packages you want to use by calling an `import` statement go here.

### <VPIcon icon="fas fa-folder-open"/>`public`

This folder contains the <VPIcon icon="fa-brands fa-html5"/>`index.html` and <VPIcon icon="iconfont icon-json"/>`manifest.json` files. Let’s look at the files inside the <VPIcon icon="fas fa-folder-open"/>`public` folder.

### <VPIcon icon="fa-brands fa-html5"/>`index.html`

This <VPIcon icon="fa-brands fa-html5"/>`index.html` serves as a template for generating <VPIcon icon="fas fa-folder-open"/>`build/`<VPIcon icon="fa-brands fa-html5"/>`index.html`, which is ultimately the main file served on the browser. Let’s take a look at this file’s contents:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

### `Title` and `meta` tags

The [<VPIcon icon="fas fa-globe"/>`<meta>` tags](https://create-react-app.dev/docs/title-and-meta-tags/) provide [<VPIcon icon="iconfont icon-w3c"/>metadata about the HTML document](https://w3schools.com/tags/tag_meta.asp). They describe the content of the page. `<meta>` tags usually aren’t displayed on the webpage but are machine parsable. The bundled scripts are finally placed into the `<body> title` of this HTML file.

---

## What are bundled scripts?

In order to understand this, we need to learn about one more concept in the world of modern JavaScript toolchains, which is [<VPIcon icon="fas fa-globe"/>webpack](https://blog.logrocket.com/tag/webpack/). Think of webpack as a tool that bundles up all your source files and creates a single <VPIcon icon="fa-brands fa-js"/>`bundle.js` file that can be served from the <VPIcon icon="fa-brands fa-html5"/>`index.html` file inside a `<script>` tag.

This way, the number of HTTP requests made within the app is significantly reduced, which directly improves the app’s performance on the network. Besides, webpack also helps in making the code modular and flexible when you supply it with additional config options. Here’s a visual of it:

![Webpack Diagram](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/webpack-diagram.png)

The above figure shows an example recipe app built using React and bundled using webpack. Webpack has a <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` file, which is used to specify the configuration settings. It typically looks something like this:

```js title="webpack.config.js"
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

The `entry` key specifies the [<VPIcon icon="fas fa-globe"/>entry point](https://webpack.js.org/concepts/#entry) for webpack, and `output` specifies the location where the <VPIcon icon="fa-brands fa-js"/>`bundle.js` file will be stored after the build process.

Coming back to <VPIcon icon="fa-brands fa-html5"/>`index.html`, Create React App uses [<VPIcon icon="fa-brands fa-npm"/>`html-webpack-plugin`](https://npmjs.com/package/html-webpack-plugin) for bundling. If you look at the <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` [here (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/21fe19ab0fbae8ca403572beb55b4d11e45a75cf/packages/react-scripts/config/webpack.config.dev.js), the `entry` key points to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`index.js`, which specifies the entry point for webpack. When webpack compiles the assets, it produces a single bundle (or several, if you use [**code splitting**](/blog.logrocket.com/tree-shaking-and-code-splitting-in-webpack.md)). It makes their final paths available to all plugins  —  one such plugin is for injecting scripts into HTML.

The html-webpack-plugin is also enabled to generate the HTML file. In Create React App’s <VPIcon icon="fa-brands fa-js"/>`webpack.config.js`, it is [specified (<VPIcon icon="iconfont icon-github"/>`facebookincubator/create-react-app`)](https://github.com/facebookincubator/create-react-app/blob/21fe19ab0fbae8ca403572beb55b4d11e45a75cf/packages/react-scripts/config/webpack.config.prod.js#L233-L235) that it should read <VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-html5"/>`index.html` as a template. The `inject` option is also set to `true`. With that option, html-webpack-plugin adds a `<script>` with the path provided by webpack right into the final HTML page.

This final page is the one you get in <VPIcon icon="fas fa-folder-open"/>`build/`<VPIcon icon="fa-brands fa-html5"/>`index.html` after running `npm run build`, and the one that gets served from `/` when you run `npm start`. Now that we understand <VPIcon icon="fa-brands fa-html5"/>`index.html`, let’s move on to <VPIcon icon="iconfont icon-json"/>`manifest.json`.

This is a [<VPIcon icon="fa-brands fa-firefox"/>web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) that describes your application, and it’s used by mobile phones if a shortcut is added to the home screen. Let’s look at the contents to understand it further:

```json title="manifest.json"
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

The contents of this file are pretty self-explanatory. But where are these values used? When a user adds a web app to their home screen using Google Chrome or Firefox on Android — or Safari on iOS — the metadata in `manifest.json` determines what icons, names, and branding colors to use when the web app is displayed. [<VPIcon icon="fa-brands fa-google"/>The web app manifest guide](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) provides more context about what each field means, and how your customizations will affect your users’ experience. Basically, the information read from this file is used to populate the web app’s icons, colors, names, etc.

### <VPIcon icon="fas fa-file-image"/>`favicon.ico`

This is simply the icon image file used for our application. You can see this linked inside <VPIcon icon="fa-brands fa-html5"/>`index.html` and <VPIcon icon="iconfont icon-json"/>`manifest.json`. Before moving on to the <VPIcon icon="fas fa-folder-open"/>`src/` directory, let’s look at a couple other files on our root.

### <VPIcon icon="iconfont icon-json"/>`package.json`

This file lists the packages your project depends on and [<VPIcon icon="fa-brands fa-npm"/>which versions of a package](https://docs.npmjs.com/about-semantic-versioning) your project can use. In tandem with either <VPIcon icon="iconfont icon-json"/>`package-lock.json` or <VPIcon icon="fas fa-file-lines"/>`yarn.lock` (more on these files below), it also makes your build reproducible and, therefore, easier to share with other developers.

The `scripts` field is of particular interest here. You can see that the `start`, `build`, `test`, and `eject` commands point to react-scripts’ version of `start`, `build`, `test`, and `eject`. This specifies that when you run npm commands like `npm start`, it will actually run `react-scripts start`.

react-scripts is a set of scripts from the Create React App starter pack. `react-scripts start` sets up the development environment and starts a server, as well as convenient development features such as hot module reloading. You can read [here (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app#whats-included) to see everything it does for you.

### <VPIcon icon="fas fa-file-lines"/>`yarn.lock / package-lock.json`

Before learning the purpose of <VPIcon icon="fas fa-file-lines"/>`yarn.lock`, let’s first understand what Yarn is. [**Yarn is a package manager**](/blog.logrocket.com/javascript-package-managers-compared.md) for JavaScript dependencies. It is an alternative to the default package manager that ships with every Node.js installation, which is called npm. Package managers allow you to use other developers’ solutions to different problems, making it easier for you to develop your own software. Code is shared through packages, sometimes referred to as modules.

Create React App will detect if you have Yarn installed and if so will use that to install dependencies rather than npm. If you don’t have Yarn installed, npm will be used and you will see a <VPIcon icon="iconfont icon-json"/>`package-lock.json` file rather than the <VPIcon icon="fas fa-file-lines"/>`yarn.lock` file.

In order to get consistent installs across machines, Yarn needs more information than the dependencies you configure in your <VPIcon icon="iconfont icon-json"/>`package.json`. Yarn needs to store exactly which versions of each dependency were installed. That’s what the <VPIcon icon="fas fa-file-lines"/>`yarn.lock` file (or <VPIcon icon="iconfont icon-json"/>`package-lock.json` file if npm is used) in the root of your project is for.

---

## Running the React app

Now, let’s fire up the application. To run the app, you can either run `npm start` or `yarn start`. Once you run the command, open `http://localhost:3000` to view the application.

Note that `npm run build` or `yarn build` will build the app for production and store it inside the <VPIcon icon="fas fa-folder-open"/>`build/` folder, which can be deployed to production. For the sake of this tutorial, let’s use `npm start` for development instead of building the app for production. Your app should look like this:

![Create React App Home Screen](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/create-react-app-home.png)

Let’s try and understand what the entry point is for this app. When we looked at webpack, I mentioned that webpack’s entry is <VPIcon icon="fa-brands fa-js"/>`index.js`, which is the entry point for the React application.

The <VPIcon icon="fa-brands fa-js"/>`index.js` file has the following line:

```js title="index.js"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

This line calls [**`ReactDOM`**](/blog.logrocket.com/managing-dom-components-reactdom.md)’s `render()` method, which renders a React element into the DOM in the supplied container and returns a [<VPIcon icon="fa-brands fa-react"/>`reference`](https://reactjs.org/docs/more-about-refs.html) to the component. The React element here is the `<App>` component, and the supplied container is the DOM element `root` (which is referenced in <VPIcon icon="fa-brands fa-html5"/>`index.html`).

`<App>` is the root component of this app. Let’s look at <VPIcon icon="fa-brands fa-react"/>`App.js`, where it is defined:

```jsx title="App.js"
import logo from './logo.svg';
import './App.css';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" > Learn React </a> 
      </header>
    </div>
  );
} 

export default App;
```

The `App` component is a function for defining a React component. This is the code that we are interested in. Any application can be built by stripping stuff out and tweaking the <VPIcon icon="fa-brands fa-react"/>`App.js`. We can even build React components separately inside a <VPIcon icon="fas fa-folder-open"/>`src/components/` folder and import these components inside <VPIcon icon="fa-brands fa-react"/>`App.js`. A typical React application looks something like this:

![Diagram of a React App](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/react-app-diagram.png)

There is a root component, `<App>`, that imports other child components, which in turn import other child components. Data flows from root to children through React properties (called `props`) and flows back up using callback functions. This is the design pattern used by any basic React application.

At this point, we should be able to start building any simple [**single-page application**](/blog.logrocket.com/5-things-not-do-building-react-applications.md) by tweaking <VPIcon icon="fa-brands fa-react"/>`App.js` and adding the necessary components. The <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file can be used for styling the application.

### How to run tests with the React Testing Library

[**React Testing Library**](/blog.logrocket.com/using-react-testing-library-debug-method.md) is a testing utility for React that provides a simple and intuitive way to test React components. It is built on top of the DOM Testing Library, which provides a set of utilities for testing DOM nodes in a browser-like environment.

Instead of concentrating on implementation details, React Testing Library encourages developers to build tests that mimic how consumers interact with the application. As a result, tests created with the React Testing Library ought to be more reliable and less prone to fail when a component’s implementation is changed.

The React Testing Library comes inbuilt with Create React App. This means that you do not have to install additional dependencies before getting started with it in a React application. The first step in using the React testing library is by creating a file ending in <VPIcon icon="fa-brands fa-js"/>`.test.js`. Next, we import React Testing Library into the file by adding the following line at the top of the file:

```js
import { render, screen } from '@testing-library/react';
```

We import the file that we want to test in the next line, as shown below:

```js
import App from './App';
```

The next step is to write out the cases that we want to test for and then check if the component works as expected:

```js
// The imports remain the same 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

In the code block above, we are writing a test case that renders the `App` component and then checks to see if there is any text like `learn react` on the screen. The next step is to run our test with the `yarn test` command. The command will run our test and display it in the terminal as shown below:

![Create React App Testing Part One](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/create-react-app-testing-one.png)

We can check if this is working by intentionally failing out test and then running `yarn test` again:

![Create React App Testing Part Two](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/creating-react-app-testing-two.png)

Our final app will look something like this:

![Final Product of Create React App](/assets/image/blog.logrocket.com/getting-started-with-create-react-app/final-create-react-app.png)

### Writing our app’s stateless components

The first step is to write our app’s stateless components, which we’ll need to build the cards with the data and rating system in them. In order to do this, we create a folder called <VPIcon icon="fas fa-folder-open"/>`components/`inside <VPIcon icon="fas fa-folder-open"/>`src/`and add a file called <VPIcon icon="fa-brands fa-js"/>`Card.js`:

```jsx :collapsed-lines title="components/Card.js"
import React from 'react';

const CardBox = (props) => {
  return <div className="card-body">{props.children}</div>;
};
const Image = (props) => {
  return <img src={props.image} alt="Logo" className="picture" />;
};
const Name = (props) => {
  return <div className="name">{props.name}</div>;
};
const Details = (props) => {
  return <div className="details">{props.details}</div>;
};
const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? 'star selected' : 'star'} onClick={onClick}></div>
);
const Card = (props) => {
  return (
    <CardBox>
      <div className="inner-body">
        <Image image={props.image} />
        <div className="body">
          <div className="inner-body">
            <Name name={props.name} />
          </div>
          <Details details={props.details} />
          <div className="inner-body">
            {[...Array(5)].map((n, i) => (
              <Star
                key={i}
                selected={i < props.starsSelected}
                onClick={() => props.change(props.id, i + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </CardBox>
  );
};
export default Card;
```

As you can see, we are creating a separate stateless component for each element inside the card — namely, the `restaurant name`, `details`, `image`, and the `rating section`. Then, we wrap all of this inside a `Card` component and export it as a `default`:

```jsx :collapsed-lines title="App.js"
import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [restaurants, setRestaurants] = useState([
    {
      id: uuidv4(),
      name: 'Sushi S',
      details: '2301 Moscrop Street, Burnaby, BC V61 23Y',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      starsSelected: 0,
    },
    {
      id: uuidv4(),
      name: 'Agra Tandoori',
      details: '1255 Canada Way, Burnaby, BC V61 23Y',
      image:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      starsSelected: 0,
    },
    {
      id: uuidv4(),
      name: 'Bandidas Taqueria',
      details: '2544 Sanders Avenue, Richmond, BC V6Y 0B5',
      image:
        'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      starsSelected: 0,
    },
  ]);
  const onChange = (id, starsSelected) => {
    setRestaurants(
      [...restaurants].map((restaurant) => {
        if (restaurant.id === id) {
          restaurant.starsSelected = starsSelected;
        }
        return restaurant;
      })
    );
  };

  return (
    <div className="main-body">
      {[...restaurants].map((restaurant, index) => (
        <Card
          key={index}
          name={restaurant.name}
          details={restaurant.details}
          image={restaurant.image}
          starsSelected={restaurant.starsSelected}
          id={restaurant.id}
          change={(id, starsSelected) => onChange(id, starsSelected)}
        />
      ))}
    </div>
  );
}
export default App;
```

In the <VPIcon icon="fa-brands fa-react"/>`App.js`, we import `Card`. The restaurant data is modeled as the `state` of this app. Saving the state separately in a file outside of <VPIcon icon="fa-brands fa-react"/>`App.js` is a better design as the app and its restaurant data grow. In the `return()` function, we pass this data to the `Card` component as props.

Data flows down to child components as properties and flows back up through callbacks, the `OnChange` callback used for updating the star ratings. That’s it! Now, when you go to `http://localhost:3000/`, you should see the rate restaurant app, ready to go.

---

## Styling our React app with CSS

We are done building the functionality of the application. The next step is how to go about styling the application and making it look exactly how we want. Create React App makes it easier for us to use CSS as it comes with inbuilt CSS support. All we need to do is copy the code below and paste it into the <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file:

```css :collapsed-lines title="App.css"
.main-body {
  display: flex;
  flex-direction: column;
  background-color: #11171d;
  min-height: 80rem;
}
.body {
  display: flex;
  flex-direction: column; 
}
.inner-body {
  display: flex;
  flex-direction: row;
}
.card-body {
  display: flex;
  flex-direction: column;
  width: 566px;
  height: 170px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #15202a;
  margin-left: 25rem;
  margin-bottom: 0.1rem;
}
.card-body:hover { 
  background-color: #11171d;
  border: #ffffff;
}
.picture {
  margin-left: 24px;
  margin-top: 17px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
.name {
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-top: 19px;
  min-width: 85px;
  height: 17px;
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.6px;
  color: #ffffff;
}
.details {
  margin-left: 15px;
  margin-top: 7px;
  width: 445px;
  height: 88px;
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.6px;
  color: #ffffff;
}
.star {
  cursor: pointer;
  height: 25px;
  width: 25px;
  margin-left: 0px;
  float: left;
  background-color: grey;
  clip-path: polygon(
  50% 0%,
  63% 38%,
  100% 38%,
  69% 59%,
  82% 100%,
  50% 75%,
  18% 100%,
  31% 59%,
  0% 38%,
  37% 38%
  );
 }
 .star.selected {
  background-color: red;
 }
```

With that done, we see our tastefully styled application when you navigate to the browser. You can, however, choose to use more advanced CSS configurations like Sass and/or CSS frameworks like [**Tailwind CSS**](/blog.logrocket.com/applying-dynamic-styles-tailwind-css.md) or [**styled-components**](/blog.logrocket.com/using-react-popper-styled-components.md) in your application.

---

## Using Hot Module Replacement in webpack

Hot Module Replacement (HMR) is a feature in webpack to inject updated modules into the active runtime. It’s like LiveReload for every module. HMR is opt-in, so you need to input some code at chosen points of your application. The dependencies are handled by the module system.

So, how do you enable this in a project created using Create React App? This is quite simple! Just add the following code inside <VPIcon icon="fa-brands fa-js"/>`index.js`, and HMR is ready to go:

```jsx title="index.js"
// regular imports
ReactDOM.render(<App /> , document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  })
}
```

---

## Apps built using Create React App

Finally, for some motivation to use Create React App for building apps, let’s look at some of the well-known products bootstrapped and built using Create React App. CRA provides a development server, builds scripts, and many other useful features out-of-the-box, which helps developers to focus on writing code and building UI rather than setting up the development environment. Popular apps created with CRA include:

- Facebook: The social media behemoth used CRA to create its Messenger application. React, Redux, and CRA were used to develop the instant messaging and video calling platform, Messenger. The software is accessible via several platforms, including the web, Android, and iOS
- Dropbox: Dropbox, the cloud storage and file hosting service, uses CRA for building its web application. The web application allows users to upload, store, and share files online. The app is built using React, Redux, and CRA, and it is available on multiple platforms, including Windows, macOS, and Linux
- Slack: Slack, the collaboration hub for teams, uses CRA for building its web application. The web application is used by teams to communicate, share files, and collaborate on projects. The app is built using React, Redux, and CRA, and it is available on multiple platforms, including Windows, macOS, and Linux

[This (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/issues/2980) GitHub comments section also has a long list of production-ready apps built using Create React App. A couple of the ideas are even part of Y-Combinator.

---

## Conclusion

I hope you now understand the different elements of Create React App better. What are you waiting for? Fire that terminal up, install Create React App, and start building your awesome ideas!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting started with Create React App",
  "desc": "Create React App is a great tool for quickly getting up and running on new React projects. Let's learn how to use it.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/getting-started-with-create-react-app.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
