---
lang: en-US
title: "Create React App: A quick setup guide"
description: "Article(s) > Create React App: A quick setup guide"
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
      content: "Article(s) > Create React App: A quick setup guide"
    - property: og:description
      content: "Create React App: A quick setup guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/create-react-app-a-quick-setup-guide.html
prev: /programming/js-react/articles/README.md
date: 2021-06-08
isOriginal: false
author:
  - name: Esteban Herrera
    url : https://blog.logrocket.com/author/ehrrera/
cover: /assets/image/blog.logrocket.com/create-react-app-a-quick-setup-guide/banner.png
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
  name="Create React App: A quick setup guide"
  desc="Our quick tutorial on Create React App covers how to set up a React app and configure some important features."
  url="https://blog.logrocket.com/create-react-app-a-quick-setup-guide-b812f0aad03c"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/create-react-app-a-quick-setup-guide/banner.png"/>

::: note Editor’s Note

This blog post was reviewed and updated with relevant information in June 2021.

:::

![create react app set up guide](/assets/image/blog.logrocket.com/create-react-app-a-quick-setup-guide/banner.png)

[<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`](https://github.com/facebook/create-react-app) is one of the most popular tools for creating a React app. Why?

Because with just three dependencies, you get support for React, JSX, ES6, polyfills, a development server, auto prefixed CSS, tests, service workers, and much more.

This post presents a quick guide to set up a React app with this tool and configure some of its more important features.

The only prerequisite for using this tool is having Node.js version 6 or superior installed.

---

## Creating a React app with Create React App

Use one of the following commands to create a new app:

```sh
# Using npx
npx create-react-app app-name
```

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
#Using yarn 0.25+
yarn create react-app app-name
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
#Using npm init <initializer>
npm init react-app app-name
```

:::

These commands create a directory with the given app name of the app and an initial project structure (see the template [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md)), as well as install hundreds of packages as the dependencies.

Now, if you look at the generated <FontIcon icon="iconfont icon-json"/>`package.json` file, you’ll only see three dependencies: react, react-dom, and react-scripts.

react-scripts is the library that handles all the configuration and brings most of the dependencies of the project, like babel, ESlint, and webpack (if you’re curious, see the complete list in its [<FontIcon icon="iconfont icon-json"/>`package.json`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/package.json) file).

Understanding react-scripts is the key to understanding the inner workings of Create React App.

### Upgrading versions of the dependencies

One of the advantages of having so few dependencies is that they are easy to both upgrade or downgrade.

You only have to execute `npm install` with the flags `--save --save-exact` to specify the exact version. The <FontIcon icon="iconfont icon-json"/>`package.json` will be updated and the new versions of the dependencies downloaded.

For example, to change to version 1.1.4 of react-scripts, execute:

```sh
npm install --save --save-exact react-scripts@1.1.4
# or yarn add --exact react-scripts@1.1.4
```

Also, don’t forget to consult the changelog of [react-scripts (<FontIcon icon="iconfont icon-json"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md) and [React (<FontIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/master/CHANGELOG.md) to look for breaking changes.

### Configuring linting in Create React App and ESLint

ESLint is configured by default (you can see the configuration [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/package.json)), and its output is shown in the terminal as well as the browser console.

Officially, [you cannot override this configuration (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/issues/808). If you want to enforce a coding style, you can install and use [<FontIcon icon="iconfont icon-github"/>`jlongster/prettier`](https://github.com/jlongster/prettier) (it’s not integrated right now).

The only thing you can do is configure your code editor to report linting warnings by installing an ESLint plugin for your editor and adding a <FontIcon icon="fas fa-file-lines"/>`.eslintrc` file to the project root:

```js
{
  "extends": "react-app"
}
```

Or, you can add your custom rules to this file, but they will only work in your editor.

Unofficially, you can use something like [react-app-rewired to override the default configuration (<FontIcon icon="fa-brands fa-medium"/>`adamdziendziel`)](https://medium.com/@adamdziendziel/custom-eslint-config-with-create-react-app-d6f66e8d61).

### Starting the application

To run the application, execute `npm start`, which is a shortcut to:

```sh
react-scripts start
```

This script executes a Webpack development server:

- With hot reloading enabled (if you make a change to the application, this is reloaded in the browser to reflect that change)
- Using port `3000` by default (or another one if the chosen port is occupied)

In Mac, the app is opened in Chrome if it’s installed. Otherwise, like in other OS, the default browser is used.

In addition, errors are shown in the console terminal as well as the browser.

You can see the whole start script [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/start.js).

### Adding images and styles

You have two options when adding images, styles or by using other files (like fonts):

- The <FontIcon icon="fas fa-folder-open"/>`src` folder, using the module system
- The <FontIcon icon="fas fa-folder-open"/>`public` folder, as static assets

Everything you place inside the <FontIcon icon="fas fa-folder-open"/>`src` folder will be handled by Webpack, which means the files will be minified and included in the bundle generated at build time.

This also means that the assets can be imported in JavaScript:

```js
import './styles.css';
import logo from './logo.png';
// ...
const image = <img src={logo} className="image" alt="Logo" />;
```

Importing images that are less than 10,000 bytes returns a data URI instead of a path to the actual image as long as they have the following extensions:

- BMP
- GIF
- JPG or JPEG
- PNG

Another advantage of using this folder is that if you don’t reference the file correctly, or if you accidentally delete it, a compilation error is generated.

On the other hand, you can also add files to the <FontIcon icon="fas fa-folder-open"/>`public` folder. However, you’ll miss the advantages described above because they will not be processed by webpack, they will only be copied into the <FontIcon icon="fas fa-folder-open"/>`build` folder.

Something else to keep in mind is that you cannot reference files inside the <FontIcon icon="fas fa-folder-open"/>`src` folder in the <FontIcon icon="fas fa-folder-open"/>`public` folder.

However, to reference the files in the <FontIcon icon="fas fa-folder-open"/>`public` folder, you can use the variable `PUBLIC_URL` like this:

```jsx
<img src="%PUBLIC_URL%/logo" alt="logo" />
```

Or with the variable `process.env.PUBLIC_URL` in JavaScript:

```jsx
const image = <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />;
```

### Setting environment variables with Create React App

In addition to the variable `PUBLIC_URL`, there’s a special built-in environment variable called `NODE_ENV` that cannot be overridden:

- When using `npm start` takes the value `development`
- When using `npm run build` takes the value `production`
- When using `npm test` takes the value `test`

You can also define custom environment variables that will be injected at build time. They must start with `REACT_APP_`, otherwise, they will be ignored.

You can define them using the terminal:

::: tabs

@tab:active <FontIcon icon="fas fa-gears"/>

```batch
SET "REACT_APP_TITLE=App" && npm start
```

@tab <FontIcon icon="iconfont icon-powershell"/>

```pwsh
($env:REACT_APP_TITLE = "App") -and (npm start)
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
#Linux and mac
REACT_APP_TITLE=App npm start
```

:::

Or one of the following files in the root of your project (files on the left have more priority than files on the right):

- When using `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- When using `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
- When using `npm test`: `.env.test.local`, `.env.test`, `.env`

As explained before, all these variables can be used with `process.env` inside a component:

```jsx
render() {
  return (
    <div>
      {process.env.NODE_ENV}
    </div>
  );
}
```

Or in <FontIcon icon="fas fa-folder-open"/>`public/`<FontIcon icon="fa-brands fa-html5"/>`index.html`:

```js
<title>%REACT_APP_TITLE%</title>
```

In addition to `NODE_ENV`, there are other predefined environment variables that you can set for development settings, like `BROWSER`, `HOST`, and `PORT`, as well as some production settings like `PUBLIC_URL` and `GENERATE_SOURCEMAP`.

See the complete list [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md).

### Proxying server requests

It’s common to serve the frontend and backend of your app in the same server and port. However, you cannot do this because Create React App runs the app in its own development server.

So you have three options.

The first one is to run the back-end server on another port and make requests like this:

```js
fetch('http://localhost:5000/endpoint')
```

With this approach, you need to set the [<FontIcon icon="fa-brands fa-wikipedia-w"/>CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers [<FontIcon icon="fas fa-globe"/>on your server](https://enable-cors.org/server_expressjs.html).

The second one is to tell the development server to proxy any request to your back-end server by adding a proxy field to your <FontIcon icon="iconfont icon-json"/>`package.json` file. For example, using:

```json title="package.json"
{
  ...
  "scripts": {
    ...
  },
  "proxy": "http://localhost:5000"
}
```

Instead of making a request like this:

```js
fetch('http://localhost:5000/endpoint')
```

After restarting the server, you should make them like this:

```js
fetch('/endpoint')
```

If this is not enough for you, a third option is to configure the proxy of each endpoint individually, like this:

```json title="package.json"
{
  ...
  "scripts": {
    ...
  },
  "proxy": {
    "/api": { // Matches any request starting with /api
      "target": "http://localhost:5000/api",
      "timeout": 5000
      ...
    },
    "/socket": {
      "target": "http://localhost:5000/api",
      "ws": true // Indicate this is a WebSocket proxy.
      ...
    }
  }
}
```

The configuration properties are the same as the ones supported by [<FontIcon icon="iconfont icon-github"/>`chimurai/http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware#options) or [<FontIcon icon="iconfont icon-github"/>`nodejitsu/node-http-proxy`](https://github.com/nodejitsu/node-http-proxy#options).

### Configuring a progressive web app

A [<FontIcon icon="fa-brands fa-google"/>service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) is registered in `src/index.js`. If you don’t want to enable it just remove the call to `registerServiceWorker()`.

The service worker is only enabled in the production version of the application. However, if the app has already been executed, the service worker will already be installed in the browser and should be removed using `unregister()`:

```js
import { unregister } from './registerServiceWorker';
```

Service workers require HTTPS (otherwise registration will fail, although the app will remain functional). However, to facilitate local testing, this doesn’t apply to localhost.

A [<FontIcon icon="fa-brands fa-google"/>web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) where you can configure the app name, icons and other metadata about your application is located at `public/manifest.json`.

### Testing the app

Create React App uses [<FontIcon icon="fas fa-globe"/>Jest](https://facebook.github.io/jest/) as its test runner and [<FontIcon icon="iconfont icon-github"/>`jsdom/jsdom`](https://github.com/jsdom/jsdom) to provide browser global variables like `window` or `document`.

Test files should follow any of these naming conventions:

- If they end with `.js`, `.jsx`, `.mjs`, the files should be located in a directory named `__tests__` (matching the expression `<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}`)
- They should end with `.test.js` or `.specs.js` (matching the expression `<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}`)

Executing npm test will run the tests by executing the script:

```sh
react-scripts test --env=jsdom
```

You can see the complete script [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/test.js).

The tests will be run in watch mode. Every time you save a file, the tests are re-run. However, this mode also includes an interactive command-line interface with an option to enter a test name pattern to avoid running all tests.

If you just need to execute or configure something before running your tests, add it to the file <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="fa-brands fa-js"/>`setupTests.js`, which will be executed automatically before any test.

If you need a coverage report, you can execute the command `npm test --coverage`, optionally configuring in the <FontIcon icon="iconfont icon-json"/>`package.json` file the options:

- [<FontIcon icon="fas fa-globe"/>collectCoverageFrom](https://jestjs.io/docs/en/configuration.html#collectcoveragefrom-array) to indicate a set of files for which coverage information should be collected
- [<FontIcon icon="fas fa-globe"/>coverageReporters](https://jestjs.io/docs/en/configuration.html#coveragereporters-array-string) to indicate formats when writing coverage reports
- [<FontIcon icon="fas fa-globe"/>coverageThreshold](https://jestjs.io/docs/en/configuration.html#coveragethreshold-object) to configure minimum threshold enforcement for coverage results
- [<FontIcon icon="fas fa-globe"/>snapshotSerializers](https://jestjs.io/docs/en/configuration.html#snapshotserializers-array-string) to specify a list of paths to functions that serialize values

For example:

```json title="package.json"
{
  ...
  "scripts": {
    
  },
  "jest": {
    "coverageReporters": ["json"],
    "coverageThreshold": {
      "global": {
        "lines": 80
      }
    },
  }
}
```

### Deploying the app

You can create a production version of your app in the build directory with npm run build, which is a shortcut to:

```sh
react-scripts build
```

You can see the complete script [here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/build.js).

After this, you may copy the content of this build directory to a web server or you use packages like [<FontIcon icon="iconfont icon-github"/>`indexzero/http-server`](https://github.com/indexzero/http-server) or [<FontIcon icon="iconfont icon-github"/>`zeit/serve`](https://github.com/zeit/serve) to test your application from that directory.

One thing to take into account is that Create React App assumes that you will host your app at the server root. If this is not the case, you need to specify the homepage field in your <FontIcon icon="iconfont icon-json"/>`package.json` file so the correct root path can be inferred:

```json title="package.json"
{
  ...
  "scripts": {
    ...
  },
  "homepage": "http://example.com/myapp"
}
```

However, if you are not using a router with HTML5 pushState history API or not using routing at all, you can use a dot to make sure that all the asset paths are relative to index.html:

```json title="package.json"
"homepage": "."
```

In the user manual of Create React App, [<FontIcon icon="fa-brands fa-reaft"/>you can find instructions to deploy your app](https://create-react-app.dev/docs/deployment/) using:

- Express
- Azure
- Firebase
- GitHub Pages
- Heroku
- Netlify
- Now
- S3 and CloudFront
- Surge

### Ejecting the app

Ejecting will copy all the configuration files, scripts, and dependencies to your project while removing the dependency to `react-scripts`.

Execute `npm run eject` to perform this operation.

Here’s an extract of the output:

![create react app npm output](https://storage.googleapis.com/blog-images-backup/0*4msZVtYhbYoIRDo1)

[And here you can see the whole script (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/eject.js) it executes.

This operation cannot be reverted. Use it when the configuration options the tool offers are not enough for you anymore.

### Conclusion

This post covered the most important features you may configure when using Create React App. Now you might want to take a closer look at [react-scripts (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts), the core of Create React App, to get a deep knowledge of how it works.

Although Create React App is a popular tool, it is not for everyone. There might be better alternatives depending on the type of application you’re developing. For example, [<FontIcon icon="iconfont icon-github"/>`gatsbyjs/gatsby`](https://github.com/gatsbyjs/gatsby) for static sites or [<FontIcon icon="iconfont icon-github"/>`zeit/next.js`](https://github.com/zeit/next.js) for server-side rendering. Consult [more alternatives here (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app#popular-alternatives).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create React App: A quick setup guide",
  "desc": "Our quick tutorial on Create React App covers how to set up a React app and configure some important features.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/create-react-app-a-quick-setup-guide-b812f0aad03c.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
