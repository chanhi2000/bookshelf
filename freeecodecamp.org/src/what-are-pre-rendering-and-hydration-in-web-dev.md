---
lang: en-US
title: "What are Pre-Rendering and Hydration in Web Development? A Deep Dive for Devs"
description: "Article(s) > What are Pre-Rendering and Hydration in Web Development? A Deep Dive for Devs"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Gatsby
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - gatsby
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What are Pre-Rendering and Hydration in Web Development? A Deep Dive for Devs"
    - property: og:description
      content: "What are Pre-Rendering and Hydration in Web Development? A Deep Dive for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-pre-rendering-and-hydration-in-web-dev.html
prev: /programming/js-next/articles/README.md
date: 2024-10-07
isOriginal: false
author: Salvador Villalon Jr
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727985850590/fdb7eb16-52bd-41ec-8e1a-e4fb9068a535.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Gatsby > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-gatsby/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What are Pre-Rendering and Hydration in Web Development? A Deep Dive for Devs"
  desc="Have you ever wondered how Frameworks like Next.js, Gatsby.js, and Remix work? These frameworks use the concepts of Pre-rendering and Hydration, which represent significant advancements in the history of web development. These frameworks leverage the..."
  url="https://freecodecamp.org/what-are-pre-rendering-and-hydration-in-web-dev"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727985850590/fdb7eb16-52bd-41ec-8e1a-e4fb9068a535.png"/>

Have you ever wondered how Frameworks like [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/), [<VPIcon icon="iconfont icon-gatsby"/>Gatsby.js](https://gatsbyjs.com/), and [Remix](https://remix.run/) work?

These frameworks use the concepts of Pre-rendering and Hydration, which represent significant advancements in the history of web development.

These frameworks leverage these concepts to create toolchains that build efficient web applications. In this article, we’ll discuss Pre-rendering and Hydration and why they are important features to use when building single-page applications.

To understand these concepts, we need to explore why they were created and what problem they are trying to solve. Let's take a look at the beginning of web applications.

---

## Web Development in the Past: Traditional Server-Side Rendering

Back in the days of traditional server-side rendering, rendering and interactivity were separated. We used server-side languages like [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en), [<VPIcon icon="fa-brands fa-php"/>PHP](https://php.net/), [<VPIcon icon="fa-brands fa-java"/>Java](https://java.com/en/), and [<VPIcon icon="iconfont icon-rails"/>Ruby on Rails](https://rubyonrails.org/).

Within our servers, we created **views** using templating languages like [<VPIcon icon="fa-brands fa-wikipedia-w"/>JSP](https://en.wikipedia.org/wiki/Jakarta_Server_Pages) and [EJS](https://ejs.co/). Views are HTML pages, and you could inject JavaScript or Java inside them to add functionality, dynamic data retrieved from database queries, and interactive segments with languages like [<VPIcon icon="iconfont icon-jquery"/>JQuery](https://jquery.com/).

### The Downside of Traditional Server-Side Rendering

#### 1. Performance Issues

- A request to the server needed to be made every time the user requested a page!
  - This meant there would be a full-page reload.
  - Complex queries could result in slower speeds.

#### 2. Scalability Challenges

- **Global Reach**: A **Dynamic CDN** was needed to cache your dynamic files. CDNs are better suited for static content, but companies like Cloudflare created [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare-Workers](https://cloudflare.com/products/cloudflare-workers/) to help with the process.
- **Upscaling Servers**: If more users started using the application, there would be an increase in demand on the server. You might have needed to invest more in resources such as scaling up by adding more servers.

#### 3. Duplicate Logic

- You may have duplicate code. For example, if you were trying to validate form fields, you'd have to validate in both the EJS file and your API endpoint.

Let's look at the code snippet below to see an example of this duplicate Logic:

::: tabs

@tab:active Code in EJS

```js
<form action='/submit-form' method='POST' id="myForm">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />
  <button type="submit">Submit</button>
</form>

<script>
  document
    .getElementById('myForm')
    .addEventListener('submit', function (event) {
      const email = document.getElementById('email').value;

      if (!email.includes('@')) {
        alert('Please enter a valid email.');
        event.preventDefault();
      }
    });
</script>
```

@tab Code in Express.js

```js
import express from "express";
const app = express();
const path = require("path");
const port = 3000;

// To received form data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// view engine setup. Need a folder called views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // To render the view
  res.render("index", { errors: null });
});

app.post("/submit-form", (req, res) => {
  const email = req.body.email;

  if (!email.includes("@")) {
    res.status(400).send("Invalid email.");
    return;
  }
  // Proceed with form processing
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
```

:::

Traditional Server-Side Rendering had significant downsides, but the introduction of **single-page applications** marked a new era in web development.

---

## Traditional Server-Side Rendering vs. Single-Page Applications

::: info What is a Single Page Application (SPA)?

A Single-page application (SPA) is a web app implementation that loads only a single web document and then updates the body content of that single document via JavaScript APIs such as Fetch when different content is to be shown. Allows users to use websites without loading whole new pages from the server.

> Source: ([<VPIcon icon="fa-brands fa-firefox"/>Source: MDN](https://developer.mozilla.org/en-US/docs/Glossary/SPA))

:::

A popular way to implement SPA is by using React. React lets you create fast applications and simplifies updating the UI more easily than DOM manipulation methods.

It offers several advantages:

- **Improved User Experience**
  - An SPA loads a single HTML file and dynamically updates the content as the user interacts with it. All of this is done without a full page reload.
  - An SPA can update the state of the UI easily and provide instant feedback to users based on actions taken on the app.
- **Reduced Server Load**
  - Most of the work is done by the browser. This reduces the load on the server!
- **Better Scalability**
  - The browser is now doing most of the work. We can now deploy dedicated servers focused on serving data via APIs. We can easily scale horizontally. We have the option of using servers or serverless functions like [<VPIcon icon="fa-brands fa-aws"/>AWS lambda](https://aws.amazon.com/lambda/).
  - An SPA can be hosted on a static CDN like [<VPIcon icon="fas fa-globe"/>Netlify](https://docs.netlify.com/platform/what-is-netlify/).

With the addition of toolchains like [<VPIcon icon="fas fa-globe"/>Vite](https://vitejs.dev/) and [<VPIcon icon="fa-brands fa-react"/>Create React App](https://create-react-app.dev/) to automate the setup of a modern JavaScript application, engineers no longer had to worry about configuring Webpack manually.

There are some downsides to implementing SPAs. The big one is that it relies on the browser to load all the JavaScript and HTML for us. This means that on mobile devices and for people with slow internet, users may experience delays in seeing the page. Let’s examine the flow to explain this:

### Single Page Application Flow

> ![Single Page Application React Flow.<br/>([<VPIcon icon="fa-brands fa-youtube"/>Source: How NextJS REALLY Works](https://youtu.be/d2yNsZd5PMs?si=RmnywZJEAuurseQm))](https://cdn.hashnode.com/res/hashnode/image/upload/v1725392287290/04dba828-9903-4ca6-bf8e-0c0d875d587b.png?auto=compress,format&format=webp)

<VidStack src="youtube/d2yNsZd5PMs" />

Several steps are needed for the users to finally see the HTML page.

First, the browser fetches the HTML. This initial HTML will be blank and incorrect. Why? Because the content comes from JavaScript. This means that it takes time for the browser to fetch JavaScript, load it, and execute it. Since the initial HTML is wrong, web crawlers and search engines will not find relevant content on the website and skip it.

Take a look at the below GIF. Here JavaScript is disabled on the Chrome Developer Tools. The website fails to load without JavaScript. If JavaScript is enabled but the internet connection is slow, users may see a blank page for an extended period.

![Single Page Application JavaScript Disabled Test.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725392877108/d5a2eb1c-f784-4879-b02f-8c340d405c9c.gif?auto=format,compress&gif-q=60&format=webm)

This was a big problem. This led to Web Development evolving into **the Pre-Rendering era.**

---

## Entering a New World with Pre-Rendering and Hydration

### Why is Pre-Rendering Important?

People realized that we could generate the HTML in advance. It could be generated from our server or at build time, depending on the methods used.

Pre-rendering can be done in two ways - [<VPIcon icon="iconfont icon-nextjs"/>Server Side Rendering (SSR)](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering) or [<VPIcon icon="iconfont icon-nextjs"/>Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

### What is Server Side Rendering?

React components are rendered on the server, and the resulting HTML is sent to the browser. This can improve SEO and initial load times. **The rendering process occurs on each page request.**

### What is Static Site Generation (SSG)?

**Static HTML pages are generated at build time.** These pages can be served quickly without requiring a server to render them on the fly.

Either method is beneficial! **Now the HTML that the user receives will be correct.** They will see a page with content instead of a blank page as seen using Vite or Create React App.

But there is a problem: the HTML the user receives is not interactive. They cannot click on it or submit a form. How can we add interactivity to our app? By Hydrating properly🚰 🌊!

### What is Hydration?

[<VPIcon icon="fa-brands fa-react"/>Hydration](https://react.dev/reference/react-dom/hydrate#hydrating-server-rendered-html) is what adds interactivity to our app. It loads the JavaScript that makes our app interactive.

::: info

In React, "hydration" is how React "attaches" to existing HTML that was already rendered by React in a server environment. During hydration, React will attempt to attach event listeners to the existing markup and take over rendering the app on the client. 

> *[<VPIcon icon="fa-brands fa-react"/>Source: React Docs](https://react.dev/reference/react-dom/hydrate#hydrating-server-rendered-html))*

:::

Let's see what the flow looks like for an app that uses Pre-Rendering and Hydration:

![Pre-rendering flow.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725392958385/eaee78cb-736c-4d49-8fb7-c9cb098d3652.png?auto=compress,format&format=webp)

### What is Reconciliation?

::: info

Reconciliation is the process by which React determines the most efficient way to update the UI in response to changes in data or component hierarchy.

> *(Source: [<VPIcon icon="fas fa-globe"/>What is the difference between virtual and real DOM (React)?](https://educative.io/answers/what-is-the-concept-of-reconciliation-in-react))*

:::

Reconciliation is when React figures out how to update the UI in response to changes in data or components hierarchy.

When components are rendered, a Virtual DOM is created. If there are changes in state or props, then a new Virtual DOM is created. React then uses its diff algorithm to compare the new Virtual DOM with the previous Virtual DOM to check for changes. This is **reconciliation**.

Based on the changes found, **React is not going to update the entire UI**. Instead, it will **select which elements need to be updated.** This [<VPIcon icon="fas fa-globe"/>article](https://educative.io/answers/what-is-the-concept-of-reconciliation-in-react) helped me understand Reconciliation.

### Pre-rendering and Hydration in Action

During the Pre-rendering and Hydration flow, first, the user will see HTML with the correct content.

Then Hydration kicks in and loads JavaScript to give interactivity to the application.

Let's simulate the process of what happens if the Hydration process takes a long time (due to a slow internet connection) or if the user has JavaScript disabled.

Here is a gif where I disable JavaScript on my Portfolio. I created my portfolio using [<VPIcon icon="iconfont icon-gatsby"/>Gatsby](https://gatsbyjs.com/) a static-site-generation framework (it also has server-side rendering capabilities):

![Portfolio JavaScript Disabled Test.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725554638438/698fd854-e828-44cd-996a-e01b154803d1.gif?auto=format,compress&gif-q=60&format=webm)

Even though there is no JavaScript, I can still see content on my portfolio. That’s because the user received **pre-render HTML**! You can see that I cannot click on the **dropdown menu items or the buttons** that say About Me, Projects, and Experience. That’s because the JavaScript did not load so the user cannot interact with it.

### A Mental Model for Hydration

[**Josh Comeau**](https://joshwcomeau.com/) created a cool mental model for Hydration. Josh calls it the **“Two Pass Rendering.”**

::: info

***The first pass, at compile-time, produces all of the static non-personal content and leaves holes where the dynamic content will go. Then, after the React app has mounted on the user's device, a second pass stamps in all the dynamic bits that depend on the client state.

> *Source: [<VPIcon icon="fas fa-globe"/>The Perils of Hydration](https://joshwcomeau.com/react/the-perils-of-rehydration/#mental-models-13)*

:::

To Summarize:

1. **The First Pass**: the user sees the pre-render HTML. It contains static content, but it is missing the dynamic content.
2. **The Second Pass:** JavaScript starts loading and fills in the missing dynamic pieces that depend on the client state.

### Potential Errors When Working with Pre-rendering and Hydration Frameworks

When working with frameworks like Next.js, the server will return static pre-render HTML, and then Hydration occurs which loads JavaScript.

But we must be careful when working with dynamic data and client-only properties. For example, take a look at this code:

#### Dynamic Data Error

```jsx
function HydrationErrors() {
  return (
    <>
      <h1>Hydration Errors</h1>

      <div>
        <p>Today date in milliseconds is {new Date().getTime()}</p>
      </div>
    </>
  );
}
```

Here, the server will generate HTML with a timestamp in milliseconds. For example: `1724869161034`. The Hydration process begins, and then the client loads the HTML. Time has passed and the timestamp is different, it is now `172486193750`! This scenario causes the following error:

![Mismatch text content from server and client hydration error.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725555403697/ebb398ec-cd58-4b9a-aa63-c43a9b511eeb.png?auto=compress,format&format=webp)

This happens because the `getTime()` function will generate a different timestamp.

This means that the server and client generate different HTML. The Network Tab shows us the server's response. It is a different HTML from what the client loads.

**The server's response below:**

![Different server html generated.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725555472118/d76c7ad0-92ab-4b77-92ea-b3d9d6a3b4fe.png?auto=compress,format&format=webp)

**The client's response below:**

![Different client html generated.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725555518535/af27855d-d362-44e3-8007-b01fde1d2455.png?auto=compress,format&format=webp)

**To Fix the Error:**

```jsx
function HydrationErrors() {
  const [date, setDate] = useState<number>();

  useEffect(() => {
    setDate(new Date().getTime());
  }, []);

  return (
    <>
      <h1>Hydration Errors</h1>

      <div>
        <p>Today date in milliseconds is {date}</p>
      </div>
    </>
  );
}
```

You can use the `useEffect` hook. Why would this work? Because the HTML that the server and client render will contain an empty `date` state variable.

Once the component mounts, the `useEffect` activates and adds the dynamic data from the state variable or you can use the `suppressHydrationWarning` flag and set it to true.

```jsx
  <p suppressHydrationWarning={true}>Today date in milliseconds is {date}</p>
```

#### Using Client-Only Properties Error

Remember you cannot use `window` or `localStorage`. They do not exist on the server. Take the following example:

```js
function HydrationErrors() {
  return (
    <>
      <div>
        {typeof window !== "undefined" && <p>This p tag will appear</p>}
      </div>
    </>
  );
}
```

Here, the server returns HTML with an empty `<div>` tag, but the client loads HTML that includes the `<p>` tag. This creates a **HYDRATION ERROR!**

This is the error that you get:

![Cannot use client-side properties hydration error.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725555844562/443c435c-308a-4422-b184-b2f321672519.png?auto=compress,format&format=webp)

The Network Tab shows us the server's response. It is an empty `<div>` tag.

**The server's response below:**

![Different server html generated.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725555958286/aeeaa522-3266-4b60-856d-d0cd3bf4d9c9.png?auto=compress,format&format=webp)

But the client loads HTML that says "This p tag will appear".

**The client's response below:**

![Different client html generated.](https://cdn.hashnode.com/res/hashnode/image/upload/v1725556187527/173bf82a-1754-4835-9921-adea0f2e864a.png?auto=compress,format&format=webp)

This demo was inspired by [Deeecode The Web (<VPIcon icon="fa-brands fa-youtube"/>`@deeecode`)](https://youtube.com/@deeecode) in [<VPIcon icon="fa-brands fa-youtube"/>Why Do HYDRATION ERRORS Exist? And how to solve them](https://youtu.be/7UOyuEHYmSE?si=Ql8z5D_pAryvTyFf). He gives a great explanation of why Hydration Errors occur. I recommend watching it!

<VidStack src="youtube/7UOyuEHYmSE" />
---

## How Does it Relate to Frameworks like Gatsby.js, Next.js, and Remix?

Everything we have discussed is what all these frameworks focus on.

Static-Site Generation and Server-Side Rendering can be implemented using Gatsby.js, Next.js, and Remix. They focus on creating a pre-render HTML ready for the user to see, then initiate Hydration to add interactivity to the app.

Gatsby.js, Next.js, and Remix do not replace the concept of single-page applications - they add to the process. Take a look at this flow:

![Pre-rendering and Single Page Application combined flow. (Source: How NextJS REALLY Works)](https://cdn.hashnode.com/res/hashnode/image/upload/v1725556321232/7d8629fd-b528-4cd7-9bc2-7de0bf1ab630.png?auto=compress,format&format=webp)

It is adding to the current SPA flow! If you did not have Pre-rendering, the process starts where the pink box begins, with an incomplete HTML.

---

## Moving Forward

This article is meant as an introduction to pre-rendering and hydration.

Next.js first implemented these concepts with the [<VPIcon icon="iconfont icon-nextjs"/>Pages Router](https://nextjs.org/docs/pages). Pages Router was great and introduced the world to functions like `getServerSideProps`, `getStaticPaths`, and `getStaticProps` to implement Static-Site Generation and Server-Side Rendering.

::: info

These implementations had their pros and cons. For example, Josh W Comeau mentioned that with `getServerSideProps`:

1. This strategy only works at the route level, for components at the very top of the tree. We can't do this in any component.
2. Each meta-framework came up with its own approach. Next.js has one approach, Gatsby has another, Remix has yet another. It hasn't been standardized.
3. All of our React components will *always* hydrate on the client, even when there's no need for them to do so.

> *Source: [<VPIcon icon="fas fa-globe"/>Making Sense of React Server Components](https://joshwcomeau.com/react/server-components/)*

:::

The React team saw this too and created a new paradigm called [<VPIcon icon="fa-brands fa-react"/>React Server Components (RSC)](https://react.dev/reference/rsc/server-components). To implement RSC, the Vercel team created the [<VPIcon icon="iconfont icon-nextjs"/>App Router](https://nextjs.org/docs/app). App Router still uses the concepts of pre-rendering and hydration, but it no longer uses `getStaticProps`, `getStaticPaths`, and `getServerSideProps`. It uses RSC and other great App Router features to implement better web applications. I recommend taking a look at App Router when you get a chance.

---

## Conclusion

Thanks for reading this far 😃!

I learned a lot from writing this article. I started this research because I used Gatsby to create my [<VPIcon icon="fas fa-globe"/>portfolio version 4](https://salvador-villalon.netlify.app/) and Next.js in my job, but I did not understand the concepts behind these frameworks and why they were created.

I made a web application to demonstrate the topics covered in the article.

- [<VPIcon icon="fas fa-globe"/>Application](https://the-nextjs-pagesrouter-guide.vercel.app/)
- [GitHub Repo (<VPIcon icon="iconfont icon-github"/>`salvillalon45/the-nextjs-pagesrouter-guide`)](https://github.com/salvillalon45/the-nextjs-pagesrouter-guide)

In the GitHub repo you can find the code snippets for the following:

- A page implementing getStaticProps and getStaticPaths
- A page implementing getStaticProps
- A page implementing getServerSideProps with Client Side fetching
- A page to demonstrate Hydration Errors
- Using the API directory to implement our own API routes

### Resources

Here are some key learning resources I used to write this article in case you want to dig in even deeper:

- [<VPIcon icon="fa-brands fa-youtube"/>What is Hydration?](https://youtu.be/R-BKadZWYnQ?si=imNFJL36knSPdF7S) by Builder
- [<VPIcon icon="fa-brands fa-youtube"/>What Exactly is REACT HYDRATION? And why does it matter?](https://youtu.be/87i0pejrULw?si=e179x9x2KkaR8AxL) by Deeecode The Web
- [<VPIcon icon="fa-brands fa-youtube"/>How NextJS REALLY Works](https://youtu.be/d2yNsZd5PMs?si=UZYKHUrajdXQd1y4&t=1) by Theo Browne
- [<VPIcon icon="fa-brands fa-youtube"/>Next.js - GetServerSideProps vs GetStaticProps](https://youtu.be/xfX8nVpaycU?si=ZV-r2piDoWhLAKMi) by Morado Web Development