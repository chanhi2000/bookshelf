---
lang: en-US
title: "The React Router Cheatsheet – Everything You Need to Know"
description: "Article(s) > The React Router Cheatsheet – Everything You Need to Know"
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
      content: "Article(s) > The React Router Cheatsheet – Everything You Need to Know"
    - property: og:description
      content: "The React Router Cheatsheet – Everything You Need to Know"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-router-cheatsheet.html
prev: /programming/js-react/articles/README.md
date: 2021-04-19
isOriginal: false
author: Reed
cover: https://freecodecamp.org/news/content/images/2021/04/the-react-router-cheatsheet.png
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
  name="The React Router Cheatsheet – Everything You Need to Know"
  desc="If you're building React applications for the web, you're going to need to use a dedicated router to display pages and navigate your user around them.  That's why today we're going to go over the most popular and most powerful router for React applic..."
  url="https://freecodecamp.org/news/react-router-cheatsheet"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/04/the-react-router-cheatsheet.png"/>

If you're building React applications for the web, you're going to need to use a dedicated router to display pages and navigate your user around them.

That's why today we're going to go over the most popular and most powerful router for React applications – React Router.

We're going to go over 11 of the essential features you need to know if you're using React Router in your projects today, specifically for the web using the package <FontIcon icon="fa-brands fa-npm"/>`react-router-dom`.

---

## Want Your Own Copy? 📄

[<FontIcon icon="fas fa-download"/>Click here to download the cheatsheet in PDF format](https://reedbarger.com/resources/react-router-cheatsheet-2021) (it takes 5 seconds).

It includes all of the essential information here as a convenient PDF guide.

---

## Install React Router

The very first step to using React Router is to install the appropriate package.

They are technically three different packages: React Router, React Router DOM, and React Router Native.

The primary difference between them lies in their usage. React Router DOM is for web applications and React Router Native is for mobile applications made with React Native.

The first thing that you'll need to do is install React Router DOM using npm (or yarn):

```sh
npm install react-router-dom
```

---

## Basic React Router Setup

Once it's installed, we can bring in our first component which is required to use React router which is called BrowserRouter.

Note that there are multiple types of routers that <FontIcon icon="fa-brands fa-npm"/>`react-router-dom` provides aside from BrowserRouter which we won't go into. It's a common practice to alias (rename) BrowserRoute as simply 'Router' when it is imported.

If we want to provide routes within our entire application it needs to be wrapped around our entire component tree. That's why you will usually see it wrapped around or within the main app component:

```jsx
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      {/* routes go here, as children */}
    </Router>
  );
}
```

This is the primary function of the BrowserRouter: to be able to declare individual routes within our application.

Note that any router-specific data cannot be accessed outside of the Router component. For example, we cannot access history data outside of the router (that is, with the `useHistory` hook) and we cannot create a Route outside of a Router component.

---

## Route Component

The next component is the Route component.

We declare routes within the Router component as children. We can declare as many routes as we like and we need to provide at least two props to each route, `path` and `component` (or `render`):

```jsx
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Route path="/about" component={About} />
    </Router>
  );
}

function About() {
  return <>about</>   
}
```

The `path` prop specifies on what path of our app a given route is located.

For an about page, for example, we might want that route to be accessible on the path `/about`.

The `render` or `component` props are used to display a specific component for our path.

The `component` props can only receive a reference to a given component, whereas `render` is more typically used for applying some conditional logic to render one component or another. For render you can either use a reference to a component, or use a function:

```jsx
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/" render={() => <Home />} />
      <Route path="/about" component={About} />
    </Router>
  );
}

function Home() {
  return <>home</>;
}

function About() {
  return <>about</>;
}
```

It's worth noting that you can potentially drop the `render` or `component` prop entirely and use the component that you want to associate with a given route as a child of Route:

```jsx
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/about">
        <About />
      </Route>
    </Router>
  );
}
```

Finally, if want a component (such as a navbar) to be visible on every page, put it still within the browser router, but above (or below) the declared routes:

```jsx
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}

function Navbar() {
  // visible on every page
  return <>navbar</>
}

function Home() {
  return <>home</>;
}

function About() {
  return <>about</>;
}
```

---

## Switch Component

When we begin to add multiple routes, we'll notice something strange.

Let's say we have a route for the home page and about page. Even though we specify two different paths, `/` and `/about`, when I visit the about page we'll see both the home and the about components.

We can fix this with the exact prop, on the home route to make sure that our router matches exactly the path `/` instead of `/about`:

```jsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
```

When it comes to switching between different routes that our router should show, there is in fact a dedicated component that you should be using if you have multiple routes within your router and that is the Switch component.

The switch component should be included within the router and we can place all of our routes within it:

```jsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
```

The switch component looks through all of its child routes and it displays the first one whose path matches the current URL.

This component is what we want to use in most cases for most applications, because we have multiple routes and multiple plate pages in our app but we only want to show one page at a time.

If for some reason you do want multiple pages to be displayed at the same time, you might consider not using the switch component.

---

## 404 Route

If we attempt to go to a path that doesn't exist in our application, what are we going to see?

We're not going to see anything if we don't have a route corresponding to that. How do we make a catch-all route?

If a user attempts to go to a page for which we don't have a defined route, we can create a route and then set the path to an asterisk `*`:

```js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}
```

This will match any attempt to visit a page that doesn't exist and we can connect it to a not found component to tell our users that they have "landed on a page that doesn't exist."

---

## Link Component

Let's say that within our NavBar, we actually want to create some links so we can move around our application more easily instead of having to change the URL manually in the browser.

We can do so with another special component from React Router DOM called the Link component. It accepts the `to` prop, which specifies where we want the link to navigate our user to. In our case, we might have a home and about link:

```js
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```

The link component allows us to provide some inline styles just like any standard React component. It also gives us a helpful `component` prop, so we can set our link as our own custom component for even easier styling.

---

## NavLink Component

Additionally, React Router DOM gives us a NavLink component which is helpful in the event that we want to apply some special styles.

If we are on the current path that the link points to, this allows us to create some active link styles to tell our users, by looking at our link, what page they're on.

For example, if our users are on the homepage, we could tell them as much by using the `activeStyle` prop to make our link bold and red when they're on the homepage:

```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <NavLink
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/about">
        About
      </NavLink>
    </nav>
  );
}
```

There is also an `activeClassName` prop which can be set as well if you do not want to include inline styles or want more reusable styles to perform the same function as `activeStyle`.

---

## Redirect Component

Another very helpful component that React Router DOM gives us is the redirect component.

This may seem strange to have a component that performs a function of redirecting our user when it's displayed, but this is very functional.

Whenever we're using something like a private route and we have a condition in which the user is not authenticated, we want to redirect them back to the login page.

Here is an example of an implementation of a private route component that ensures that a user is authenticated before it shows them a particular route that has been declared with this component.

Otherwise, if they're not authenticated, they will be redirected to a public route (presumably a route to login) once the redirect component is displayed:

```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/hidden" component={Hidden} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  // useAuth is some custom hook to get the current user's auth state
  const isAuth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function Home() {
  return <>home</>;
}

function Hidden() {
  return <>hidden</>;
}
```

The redirect component is very simple to use, very declarative, and allows us to see the great benefit of React Router DOM being component-based, just like everything in React.

---

## `useHistory` Hook

On top of all of these powerful components, there are some very useful hooks that React Router DOM gives us.

They are mainly helpful by supplying additional information that we can use within our components. They can be called as normal React hooks for which we can use their values exactly as we like.

Perhaps the most powerful hook is the `useHistory` hook. We can call it up at the top of any component that is declared within our router component and get back `history` data, which includes information such as the location associated with our component.

This tells us all about where the user currently is, such as the pathname that they're on, as well as any query parameters that might be appended to our URL. All of the location data is accessible from `history.location`:

```jsx
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();

  console.log(history.location.pathname); // '/about'

  return (
    <>
     <h1>The about page is on: {history.location.pathname}</h1>
    </>
  );
}
```

Additionally, the history object directly includes helpful methods that allows us to programmatically direct our user to different pages in our app.

This is very helpful, for example, for redirecting our user after logging in, or in any situation where we need to take a user from one page to another.

We can push users from one page to another using `history.push`. When we use the push method, we just need to supply the path that we want to take our users to using this method. It adds this new page on to the stack (so to speak) of our history:

```jsx
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();

  console.log(history.location.pathname); // '/about'

  return (
    <>
     <h1>The about page is on: {history.location.pathname}</h1>
     <button onClick={() => history.push('/')}>Go to home page</button>
    </>
  );
}
```

We can also redirect our users with `history.replace`, which also accepts a path value, but clears out everything in history, after the navigation is performed. This is helpful for situations where going back in history is no longer needed, such as after users have been logged out.

---

## `useLocation` Hook

The `useLocation` hook includes all of the same information that the `useHistory` hook does.

It is important to note that if you need both location data and to use history to programmatically navigate your user, make sure to `useHistory`. However, if you only want location data, all you need to do is call `useLocation` or get back all of the location data on an object that is identical to the data provided on `history. location`:

```js
import { useLocation } from "react-router-dom";

function About() {
  const location = useLocation();

  console.log(location.pathname); // '/about'

  return (
    <>
     <h1>The about page is on: {location.pathname}</h1>
    </>
  );
}
```

---

## `useParams` Hook + Dynamic Routes

One thing that we didn't cover when it comes to routes is that we can naturally create dynamic routes. This means routes that are not fixed and determined, but can be any number of characters.

Dynamic routes are helpful in situations where we have, let's say, a blog post with a unique slug. How do we make sure that we display the appropriate data and appropriate components, given that our blog post slug can be completely different?

To declare a route parameter on a given route, it must be prefixed with a colon `:`. If I wanted to create a dynamic route, "/blog/:postSlug", for a blog post component, it might look like the following:

```js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blog/:postSlug" component={BlogPost} />
      </Switch>
    </Router>
  );
}

function Home() {
  return <>home</>;
}

function BlogPost() {
  return <>blog post</>;
}
```

We're now matching the appropriate component or whatever the slug is. But within our BlogPost component, how do we receive that post slug data?

We can access any route params of a declared route with its associated component using the `useParams` hook.

`useParams` will return an object which will contain properties that match our route params (in this case, `postSlug`). We can use object destructuring to immediately access and declare as a variable with the name `postSlug`:

```js
import React from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blog/:postSlug" component={BlogPost} />
      </Switch>
    </Router>
  );
}

function Home() {
  return <>home</>;
}

function BlogPost() {
  const [post, setPost] = React.useState(null);
  const { postSlug } = useParams();

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postSlug}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postSlug]);

  if (!post) return null;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </>
  );
}
```

If we go to the route `/blog/my-blog-post`, I can access the string `my-blog-post` on the `postSlug` variable and fetch that post's associated data within `useEffect`.

---

## `useRouteMatch` Hook

If we want to know whether the given component is on a certain page, we can use the `useRouteMatch` hook.

For example, within our blog post, to see if the page that we're on matches the route `/blog/:postSlug`, we can get back a boolean value that will tell us if the route that we're on matches the pattern that we specified:

```js
import { useRouteMatch } from "react-router-dom";

function BlogPost() {
  const isBlogPostRoute = useRouteMatch("/blog/:postSlug");

  // display, hide content, or do something else
}
```

This is helpful in conditions in which we want to show something specific, based off of whether we're on a certain route or not.

---

## Want to keep this guide for future reference?

[<FontIcon icon="fas fa-download"/>Click here to download the cheatsheet as a helpful PDF](https://reedbarger.com/resources/react-router-cheatsheet-2021).

Here are 3 quick wins you get when you grab the downloadable version:

- You’ll get tons of copyable code snippets for easy reuse in your own projects.
- It is a great reference guide to strengthen your skills as a React developer and for job interviews.
- You can take, use, print, read, and re-read this guide literally anywhere that you like.

---

## Become a Professional React Developer

React is hard. You shouldn't have to figure it out yourself.

I've put everything I know about React into a single course, to help you reach your goals in record time:

Click below to try the React Bootcamp for yourself:

[![Click to join the React Bootcamp](https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/react-bootcamp-cta-alt.png)](https://thereactbootcamp.com)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The React Router Cheatsheet – Everything You Need to Know",
  "desc": "If you're building React applications for the web, you're going to need to use a dedicated router to display pages and navigate your user around them.  That's why today we're going to go over the most popular and most powerful router for React applic...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-router-cheatsheet.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
