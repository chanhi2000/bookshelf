---
lang: en-US
title: "Upgrade to React Router v6"
description: "Article(s) > Upgrade to React Router v6"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Upgrade to React Router v6"
    - property: og:description
      content: "Upgrade to React Router v6"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/upgrade-to-react-router-v6.html
prev: /programming/js-react/articles/README.md
date: 2021-01-02
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Upgrade to React Router v6"
  desc="React Router Version 6 is great for TypeScript programmers because it comes with type definitions. It also introduces the `useRoutes` hook, which simplifies routing setups in functional React components. Additionally, the new `Outlet` API allows for rendering child components. The article provides examples of how routing was done in React Router v5 and how it has changed in v6."
  url="https://typescript.tv/react/upgrade-to-react-router-v6"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

React Router Version 6 is great for TypeScript programmers because it comes with type definitions. It also introduces the `useRoutes` hook, which simplifies routing setups in functional React components. Additionally, the new `Outlet` API allows for rendering child components. The article provides examples of how routing was done in React Router v5 and how it has changed in v6. React Router Version 6 is great for TypeScript programmers because it ships with type definitions. Another great feature is the `useRoutes` hook, which simplifies routing setups in your functional React components. You can also render child components by using the new `Outlet` API.

---

## Before React Router v6

Prior to React Router v6, you had to install external type definitions along with the React Router packages:

- [<VPIcon icon="fa-brands fa-npm"/>`@types/react-router`](https://npmjs.com/package/@types/react-router/v/5.1.9) 5.1.9 (optional, because it gets hoisted from `@types/react-router-dom`)
- [<VPIcon icon="fa-brands fa-npm"/>`@types/react-router-dom`](https://npmjs.com/package/@types/react-router-dom/v/5.1.7) 5.1.7
- [<VPIcon icon="fa-brands fa-npm"/>`react-router`](https://npmjs.com/package/react-router/v/5.2.0) 5.2.0
- [<VPIcon icon="fa-brands fa-npm"/>`react-router-dom`](https://npmjs.com/package/react-router-dom/v/5.2.0) 5.2.0

This is an example of how routing with React Router v5 was done:

### Router component

```tsx{3,8,10} title="index.tsx"
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
 
import App from './App';
 
const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
 
const container = document.getElementById('root');
 
ReactDOM.render(element, container);
```

### Route configuration

Route setup separated by layouts. Routes are evaluated in order. The `Switch` component guarantees that there are only exclusive matches. No other `Route` definition will be rendered if there is a match. If there is no match, the wildcard route of `*` will be used to render a page not found view:

```tsx{2,11,17} title="App.tsx"
import React from 'react';
import {Route, Switch} from 'react-router';
 
import AccountLayout from './account/AccountLayout';
import MainLayout from './main/MainLayout';
import PageNotFoundView from './error/PageNotFoundView';
 
const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={MainLayout} />
        <Route path='/account' component={AccountLayout} />
        <Route path='*'>
          <PageNotFoundView />
        </Route>
      </Switch>
    </>
  );
};
 
export default App;
```

### Links and Layouts

The main layout shows how to link to different views by using the `Link` component:

```tsx{3} title="main/MainLayout.tsx"
import React from 'react';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
 
import MainView from './MainView';
 
const MainLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to='/'>Main Page</Link></li>
          <li><Link to='/account/add'>Add Account</Link></li>
          <li><Link to='/account/list'>List Accounts</Link></li>
          <li><Link to='/account/1'>View Account</Link></li>
          <li><Link to='/something-else'>Not Found</Link></li>
        </ul>
      </nav>
      <Route exact path='/' component={MainView} />
    </>
  );
};
 
export default MainLayout;
```

The account layout defines child routes of the application with their respective components. Pay attention to the order of the routes: `/account/:id` comes last because the `:id` parameter will match anything after `/account` and would also match `/account/add` and others.

```tsx{15} title="account/AccountLayout.tsx"
import React from 'react';
import {Redirect} from 'react-router';
import {Link, Route, Switch} from 'react-router-dom';
 
import AccountAddView from './AccountAddView';
import AccountDetailView from './AccountDetailView';
import AccountListView from './AccountListView';
 
const AccountLayout: React.FC = (): JSX.Element => {
  return (
    <div style={{backgroundColor: 'yellow'}}>
      <Switch>
        <Route exact path='/account/add' component={AccountAddView} />
        <Route exact path='/account/list' component={AccountListView} />
        <Route exact path='/account/:id' component={AccountDetailView} />
        <Redirect exact from='/account' to='/account/list' />
      </Switch>
      <br />
      <button>
        <Link to='/'>Back</Link>
      </button>
    </div>
  );
};
 
export default AccountLayout;
```

### Props from routes

If you want to use matching parameters from your routes, you will have to define `RouteComponentProps` in your React component:

```tsx{2,8-10} title="account/AccountDetailView.tsx"
import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
 
interface MatchParams {
  id: string
}
 
interface Props extends RouteComponentProps<MatchParams> {
 // ...
}
 
const AccountDetailView: React.FC<Props> = ({match}: Props): JSX.Element => {
  const params = match.params;
  return <>{`View Account ID "${params.id}"`}</>;
};
 
export default AccountDetailView;
```

---

## React Router v6

### Installation

You don't need to install additional typings with React Router v6. You will be good by adding just these two packages to your web application:

- [<VPIcon icon="fa-brands fa-npm"/>`react-router`](https://npmjs.com/package/react-router/v/6.0.0-beta.0) 6.0.0-beta.0
- [<VPIcon icon="fa-brands fa-npm"/>`react-router-dom`](https://npmjs.com/package/react-router-dom/v/6.0.0-beta.0) 6.0.0-beta.0

### Router

You will have to wrap your main app component in a Router component:

```tsx{3,8,10} title="index.tsx"
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
 
import App from './App';
 
const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
 
const container = document.getElementById('root');
 
ReactDOM.render(element, container);
```

If you don't follow this rule, you are likely to run into the following error:

```plaintext
Uncaught Error: useRoutes() may be used only in the context of a component.
```

### Nested Routing

When your app is wrapped in a `<Router>` component, you can define its routes. React Router v6 provides a `useRoutes` hook to do that:

```tsx{2,37} :collapsed-lines title="App.tsx"
import React from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
 
import AccountAddView from './account/AccountAddView';
import AccountDetailView from './account/AccountDetailView';
import AccountLayout from './account/AccountLayout';
import AccountListView from './account/AccountListView';
 
import MainLayout from './main/MainLayout';
import MainView from './main/MainView';
 
import PageNotFoundView from './error/PageNotFoundView';
 
const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <MainView />},
      {path: '404', element: <PageNotFoundView />},
      {path: 'account', element: <Navigate to='/account/list' />},
    ],
  };
 
  const accountRoutes = {
    path: 'account',
    element: <AccountLayout />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: ':id', element: <AccountDetailView />},
      {path: 'add', element: <AccountAddView />},
      {path: 'list', element: <AccountListView />},
    ],
  };
 
  const routing = useRoutes([mainRoutes, accountRoutes]);
 
  return <>{routing}</>;
};
 
export default App;
```

By looking at the code above, you may have noticed that React Router supports nested routing where you can define routes for different parts of your application with different layouts. This is possible because of the `<Outlet />` component, which is a placeholder for the elements that should be rendered on the child routes / paths.

Here is the code of the `AccountLayout` component to showcase the new Outlet API:

```ts{2,7} title="account/AccountLayout.tsx"
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
 
const AccountLayout: React.FC = (): JSX.Element => {
  return (
    <div style={{backgroundColor: 'yellow'}}>
      <Outlet />
      <br />
      <button>
        <Link to='/'>Back</Link>
      </button>
    </div>
  );
};
 
export default AccountLayout;
```

### Navigation

Navigation between different views is done with the `Link` component, which uses `navigate` under the hood and is the preferred way to make URL navigations. The use of `history` and `useHistory` is deprecated and should be replaced with the `useNavigate` hook. The React Router team provides a [Migration Guide (<VPIcon icon="iconfont icon-github" />`ReactTraining/react-router`)](https://github.com/ReactTraining/react-router/blob/v6.0.0-beta.0/docs/advanced-guides/migrating-5-to-6.md#use-navigate-instead-of-history) in this regard.

```tsx title="main/MainLayout.tsx"
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
 
const MainLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to='/'>Main Page</Link></li>
          <li><Link to='/account/add'>Add Account</Link></li>
          <li><Link to='/account/list'>List Accounts</Link></li>
          <li><Link to='/account/1'>View Account</Link></li>
          <li><Link to='/something-else'>Not Found</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
 
export default MainLayout;
```

### Props and `match`

There is no more need to extend your component's props with the properties of `match`. You can retrieve parameters from your routing with the `useParams` hook:

```tsx{2,5} title="account/AccountDetailView.tsx"
import React from 'react';
import {useParams} from 'react-router-dom';
 
const AccountDetailView: React.FC = (): JSX.Element => {
  const params = useParams();
  return <>{`View Account ID "${params.id}"`}</>;
};
 
export default AccountDetailView;
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Upgrade to React Router v6",
  "desc": "React Router Version 6 is great for TypeScript programmers because it comes with type definitions. It also introduces the `useRoutes` hook, which simplifies routing setups in functional React components. Additionally, the new `Outlet` API allows for rendering child components. The article provides examples of how routing was done in React Router v5 and how it has changed in v6.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/upgrade-to-react-router-v6.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
