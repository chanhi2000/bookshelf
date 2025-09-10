---
lang: en-US
title: "Build a micro-frontend application with React"
description: "Article(s) > Build a micro-frontend application with React"
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
      content: "Article(s) > Build a micro-frontend application with React"
    - property: og:description
      content: "Build a micro-frontend application with React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-micro-frontend-application-react.html
prev: /programming/js-react/articles/README.md
date: 2024-11-04
isOriginal: false
author:
  - name: Harsh Patel
    url : https://blog.logrocket.com/author/harshpatel/
cover: /assets/image/blog.logrocket.com/build-micro-frontend-application-react/banner.png
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
  name="Build a micro-frontend application with React"
  desc="Learn to build scalable micro-frontend applications using React, discussing their advantages over monolithic frontend applications."
  url="https://blog.logrocket.com/build-micro-frontend-application-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-micro-frontend-application-react/banner.png"/>

::: note Editor’s note

This article was last updated by [<VPIcon icon="fas fa-globe"/>Muhammed Ali](https://blog.logrocket.com/author/muhammedali/) on 4 November 2024 to cover common issues when building micro-frontends and their solutions, as well as examples of micro-frontend communication strategies such as event-based communication and [**using React’s Context API**](/blog.logrocket.com/react-context-tutorial.md).

:::

![Build A Micro-Frontend Application With React](/assets/image/blog.logrocket.com/build-micro-frontend-application-react/banner.png)

Working on large-scale projects and managing their codebases can be a big challenge for teams. Although micro-frontends have been in the picture for a while, they are growing in popularity because of their unique features.

With a micro-frontend, multiple teams can work on individual modules of the same project without impacting the other modules; it doesn’t matter how many modules are added to a current system.

In this article, we’ll cover the basics of what a micro-frontend is and learn how to implement one using React. We’ll also discuss the advantages of using micro-frontends in your applications. Let’s get started!

---

## Introduction to micro-frontends

The current web development trend involves building a monolithic frontend app that sits on top of a microservice architecture. But, as developers on different teams contribute to this frontend monolith, it becomes increasingly difficult to maintain. Microservices provide a solution for this.

The term micro-frontend extends the concept of microservices to the frontend; a micro-frontend is to the frontend what microservices are to the backend. Essentially, the goal of a micro-frontend is to treat a web app as a composition of features owned by different, independent teams with different missions; each team works end-to-end, from databases to the UI.

Micro-frontends don’t follow any particular structure and have no fixed boundaries. Your project will likely evolve as time passes, and you may need to revise your micro-frontend as you go along:

![Micro Frontend Structure Diagram<br/>Image source: [<VPIcon icon="fas fa-globe"/>https://microfrontends.com/](https://microfrontends.com/)](https://blog.logrocket.com/wp-content/uploads/2023/02/1-micro-frontend-structure-diagram.png)

React is a popular frontend tech stack, so it’s a great choice for implementing a micro-frontend. The micro-frontend architecture is still fairly new and being adopted by different frameworks, so best practices are still evolving. Therefore, you may find it challenging to implement a micro-frontend from scratch. Here is where the [<VPIcon icon="iconfont icon-github"/>`jherr/create-mf-app`](https://github.com/jherr/create-mf-app) package comes in.

According to its docs, create-mf-app creates either a module federation application, API server, or library based on one of its templates. It is framework agnostic, meaning it supports multiple frameworks and libraries including Preact, React, and Svelte.

---

## Best practices for micro-frontends

Let’s cover some best practices for you to keep in mind when implementing a micro-frontend architecture.

### Isolate team code

Each team should develop its features as an independent app, without using a shared state or depending on global variables. Consequently, there should be no sharing of runtime, even if all teams use the same framework.

### Establish team prefixes

When isolation is not yet possible, teams should agree on the ownership of namespaces to avoid possible collisions, i.e., CSS, events, local storage, etc.

### Build a resilient web app

Each independent team should implement resilient features; even if JavaScript is not enabled or fails, the feature should still work. Additionally, you should foster performance through universal rendering and progressive enhancement.

### Use native browser API over custom APIs

You should favor browser events for communication instead of building a global pub/sub system; keep cross-team APIs simple.

---

## Advantages of using a micro-frontend

Simply put, micro-frontends make web applications more maintainable. If you’ve ever been part of building a large application, you know it’s very tedious to manage everything; [**micro-frontends work similarly to the divide-and-conquer rule**](/blog.logrocket.com/micro-frontend-apps-single-spa.md).

Now, let’s understand the most valuable benefits of using a micro-frontend.

### Deployment and security

A significant advantage of the micro-frontend architecture is that you can separate a single body into individual pieces that can be deployed independently. [<VPIcon icon="fas fa-globe"/>Vercel](https://vercel.com/blog/monorepos) can support an individual repo with different frontends regardless of the language or framework, deploying them together. Otherwise, you can use deployment services like [<VPIcon icon="fas fa-globe"/>Netlify](https://netlify.com/). Once the micro-frontend is deployed, you can use it as an individual frontend only.

To secure your micro-frontend, you can use an SSL certificate like Wildcard, a single or multi-domain, or a [<VPIcon icon="fas fa-globe"/>SAN SSL certificate](https://cheapsslshop.com/uc-san-ssl-certificates). One SAN or multi-domain SSL certificate can secure multiple sites and subdomains.

### Technology agnosticism and scalability

With a micro-frontend architecture, you can combine any language or framework in a single project, like React, Vue, Angular, etc. Each frontend team can independently choose and upgrade its own tech stack without an obligation to coordinate with other teams.

### Faster development

Your team can develop and deploy your frontend whenever you want. There are zero dependencies associated with individual modules, meaning releases can be done quickly. The main goal of defining the micro-frontend is faster iterations.

### Easier learning curve

Each team handles an isolated app feature, which is easier for new developers to understand compared to a frontend monolith. Consequently, the learning curve is linear, translating to lower input costs and higher overall output for new developers.

### Vertical domain ownership

Before the introduction of micro-frontends, vertical domain ownership was only possible on the backend via the microservices architecture. Companies could scale product development among independent teams to promote ownership of the backend, but, the frontend remained monolithic.

With the introduction of the micro-frontend, the frontend is split into components with vertical domains owned by each team, ranging from the database to the UI.

### Code reusability

Micro-frontends foster code reusability because one team can implement and deploy a component that can be reused by multiple teams.

### Easy testing

Before jumping into integration testing, it’s better to test individual pieces of an application. Teams will test the micro-frontend before testing the application, thereby decreasing the chances of bugs in the real system.

Apart from that, other advantages include a small codebase that’s easily maintainable and the ability to quickly add or remove any module from the system.

---

## React’s role in micro-frontend architecture

React enables the development of components and also supports a modular approach in web development which is helpful in developing microfrontends. It is compatible with various state management libraries and context providers. This makes React suitable for micro-frontend architectures.

A major advantage of using React is its ecosystem and community support, which offers many libraries and tools that can be integrated into micro-frontends for routing, state management, and UI component libraries, enhancing the development experience.

---

## Prerequisites

In this tutorial, we’ll build a micro-frontend with React. To follow along, you’ll need the following:

- Basic knowledge of JavaScript, React, and webpack
- The latest version of [**Node.js installed in your system**](/blog.logrocket.com/exploring-competitive-features-node-js-v18-v19.md) (v19 at the time of writing)

To follow along with the code, you can [check out the GitHub repo (<VPIcon icon="iconfont icon-github"/>`lawrenceagles/micro-frontend-react`)](https://github.com/lawrenceagles/micro-frontend-react) for this project.

---

## Bootstrapping micro-frontends

Create an application folder called <VPIcon icon="fas fa-folder-open"/>`micro-frontend-react`. To bootstrap a React micro-frontend app, from this folder, run `npx create-mf-app` and pass the following data to the interactive terminal:

- Name: `home`
- Project type: `Application`
- Port number: `3000`

Select **React**, **JavaScript**, and **Tailwind** as your stack. A React micro-frontend application called `home` will be bootstrapped for you. In your terminal, you should see the following:

![Bootstrap Micro Frontend React](https://blog.logrocket.com/wp-content/uploads/2023/02/2-bootstrap-micro-frontend-react.png)

To test the app from the `home` folder, run `yarn install` to install all dependencies. Then, run `yarn start` to start the `dev-server`. If everything was successful, you should see the following on your screen:

![React JavaScript Tailwind Project Structure](https://blog.logrocket.com/wp-content/uploads/2023/02/3-react-javascript-tailwind-project-structure.png)

From the `about` folder, repeat the steps from above using the following data:

- Name: `about`
- Project type: `Application`
- Port number: `3001`

Like before, select **React**, **JavaScript**, and **Tailwind** as your stack, and the application will be bootstrapped for you.

Finally, to test the app, install the required dependencies by running `yarn install`. Then, start the `dev-server` by running `yarn start`. If everything was successful, you should see the following on your screen:

![Test Micro Frontend App Dependencies](https://blog.logrocket.com/wp-content/uploads/2023/02/4-test-micro-frontend-app-dependencies.png)

---

## Implementing a micro-frontend

In our micro-frontend implementation, the `home` application will contain and expose two components, `Header` and `Footer`. The `about` application imports and consumes these components.

To implement this, in the <VPIcon icon="fas fa-folder-open"/>`src` directory in the `home` application, create two components, <VPIcon icon="fa-brands fa-react"/>`Header.jsx` and <VPIcon icon="fa-brands fa-react"/>`Footer.jsx`. Add the following respective code snippets to <VPIcon icon="fa-brands fa-react"/>`Header.jsx` and <VPIcon icon="fa-brands fa-react"/>`Footer.jsx`:

```jsx title="Header.jsx"
import React from "react"

export default function Header() {
  return (
    <div className="p-5 bg-blue-500 text-white -text-3xl font-bold">
        Micro Frontend Header
    </div>
  )
}
```

```jsx title="Footer.jsx"
import React from "react"
export default function Footer() {
  return (
    <div className="p-5 bg-blue-500 text-white -text-3xl font-bold">
        Micro Frontend Footer
    </div>
  )
}
```

Next, update the <VPIcon icon="fa-brands fa-react"/>`App.jsx` component to use the following navbars:

```jsx title="App.jsx"
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "./Header"
import Footer from "./Footer";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Header />
    <div className="my-10">
      Home page Content
    </div>
    <Footer />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
```

Test the app by restarting the server, and you’ll get the following:

![Update App JSX Component Use Navbar](https://blog.logrocket.com/wp-content/uploads/2023/02/5-update-app-jsx-component-use-navbar.png)

We need to build the `about` page in the `about` app. To do so, update the <VPIcon icon="fa-brands fa-react"/>`App.jsx` component in the `about` app, as shown below:

```jsx title="App.jsx"
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <div class="text-center">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
        class="rounded-full w-32 mb-4 mx-auto"
        alt="Avatar"
      />
      <h5 class="text-xl font-medium leading-tight mb-2">John Doe</h5>
      <p class="text-gray-500">Web designer</p>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
```

Restart the `dev-server`, and you’ll get the following:

![Restart App About Page](https://blog.logrocket.com/wp-content/uploads/2023/02/6-restart-app-about-page.png)

From the UI above, we see the need for header and footer navigation. But, we don’t need to create duplicate copies because we can share them via micro-frontends.

---

## Adding module federation

We noted above that the `about` page in the `about` app needs to consume the `Header` and `Footer` components of the home application. To do this, we need to add module federation.

We’ll begin by turning the `Header` and `Footer` components of the `home` application into micro-frontends so that components in other applications can consume them.

Open the <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` file in the `home` app, which is already created and configured by the `create-mf-app` package. First, update the `exposes` property in the `ModuleFederationPlugin` configuration, as seen below:

```js title="webpack.config.js"
exposes: {
  "./Header": "./src/Header.jsx",
  "./Footer": "./src/Footer.jsx"
},
```

In the code above, we specified that the `home` application exposes the `Header` and `Footer` components as micro-frontends. Consequently, these components can be shared.

Now, rebuild and restart the server with the following commands:

```sh
yarn build
yarn start
```

Although nothing changes in the UI, a remote entry file has been created for us under the hood. To view the remote entry file, navigate your browser to the URL `localhost:3000/remoteEntry.js`, and you’ll see the following:

![React Micro Service Entry File](https://blog.logrocket.com/wp-content/uploads/2023/02/7-react-micro-service-entry-file.png)

This remote entry file, <VPIcon icon="fa-brands fa-js"/>`remoteEntry.js`, is a manifest file of all the modules that are exposed by the `home` application.

To complete our setup, copy the link of the manifest file `localhost:3000/remoteEntry.js`, then update the `remotes` property of the `ModuleFederationPlugin` configuration in the <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` file in the `about` app, as seen below:

```js title="webpack.config.js"
remotes: {
  home: "home@http://localhost:3000/remoteEntry.js",
},
```

The code above specifies that the `about` component has a remote micro-frontend application called `home` that shares its module with it. With this setup, we can access any of the components exposed from the `home` application.

Now, update the `App.jsx` component of the `about` application with the shared navbars, as seen below:

```jsx :collapsed-lines title="App.jsx"
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "home/Header";
import Footer from "home/Footer";
const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Header />
    <div class="text-center">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
        class="rounded-full w-32 mb-4 mx-auto"
        alt="Avatar"
      />
      <h5 class="text-xl font-medium leading-tight mb-2">John Doe</h5>
      <p class="text-gray-500">Web designer</p>
    </div>
    <Footer />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
```

Now, rebuild and restart the server with the following commands and you’ll see the following in your browser:

```sh
yarn build
yarn start
```

![Restart Dev Server Browser Output](https://blog.logrocket.com/wp-content/uploads/2023/02/restart-dev-server-browser-output.png)

From the code above and the displayed UI, we see that we have successfully shared components between two applications using micro-frontends.

---

## Other options for communication between micro-frontends

- **Event-based communication**: Use a publish/subscribe model for micro-frontends to communicate with each other without being directly coupled. Event-based communication is best for micro-frontends that operate independently and need to notify others about certain events without sharing a lot of data
- **Shared libraries/State management**: Utilize shared libraries or [**state management solutions (like Redux)**](/blog.logrocket.com/understanding-redux-tutorial-examples.md) that can be accessed by multiple micro-frontends to manage and synchronize state. This is suitable for scenarios where micro-frontends need to share and manage a global state or when there are complex data dependencies between them
- **Context API**: Leverage React’s Context API to provide a way to pass data through the component tree without having to pass props down manually at every level. Context API is ideal for passing down common data or functions to deeply nested components within the same micro-frontend or across closely related micro-frontends.

For more information, check out this article about [**methods for microservice communication**](/blog.logrocket.com/methods-for-microservice-communication.md).

---

## Micro-frontend challenges and solutions

While building micro-frontends, there are some challenges you might encounter. In this section, you will learn about them and their possible solutions.

### Styling consistency

Ensuring a consistent styling across different micro-frontends can be tasking especially when they are being developed by different teams. Adopting CSS-in-JS libraries like [<VPIcon icon="fas fa-globe"/>Styled Components](https://styled-components.com/) or [<VPIcon icon="iconfont icon-github"/>`emotion-js/emotion`](https://github.com/emotion-js/emotion/tree/main#readme) in React micro-frontends can encapsulate styles at the component level, avoiding global conflicts.

### State management across micro-frontends

Managing state across micro-frontends, especially when actions in one micro-frontend need to update the state in another, can complicate state management.

You can handle shared state management libraries like Redux or [<VPIcon icon="fas fa-globe"/>Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) with careful namespace management ensures smooth state synchronization. Implementing a global event bus or leveraging the Context API can also enable state sharing and actions across micro-frontends.

### Versioning and dependency management

Micro-frontends may depend on different versions of libraries or React itself, leading to potential runtime issues or bloated bundle sizes.

webpack’s [<VPIcon icon="fas fa-globe"/>Module Federation](https://webpack.js.org/concepts/module-federation/) allows you to share libraries across micro-frontends, ensuring that only a single version of React and other shared libraries are loaded.

---

## Conclusion

In this article, we explored the concept of micro-frontends with examples, discussing their advantages over monolithic frontend applications and other available setups. Micro-frontends offer some great features and are easy to adopt.

With create-mf-app, we implemented the micro-frontend architecture as easily as using Create React App. Personally, I like the micro-frontend style because it’s easily maintained among teams. Additionally, frontend building and security are managed pretty elegantly.

I hope you enjoyed this article, and be sure to leave a comment if you have any questions. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a micro-frontend application with React",
  "desc": "Learn to build scalable micro-frontend applications using React, discussing their advantages over monolithic frontend applications.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-micro-frontend-application-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
