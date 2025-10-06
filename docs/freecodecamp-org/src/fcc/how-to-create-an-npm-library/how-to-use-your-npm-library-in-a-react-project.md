---
lang: en-US
title: "How to Use Your npm Library in a React Project"
description: "Article(s) > (6/7) How to Create an npm Library"
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/7) How to Create an npm Library"
    - property: og:description
      content: "How to Use Your npm Library in a React Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-npm-library/how-to-use-your-npm-library-in-a-react-project.html
date: 2025-02-08
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create an npm Library",
  "desc": "In the world of JavaScript development, npm (Node Package Manager) has become an essential tool for managing dependencies and sharing reusable code. Whether you're building a simple website or a complex web application, npm libraries help streamline ...",
  "link": "/freecodecamp.org/how-to-create-an-npm-library/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an npm Library"
  desc="In the world of JavaScript development, npm (Node Package Manager) has become an essential tool for managing dependencies and sharing reusable code. Whether you're building a simple website or a complex web application, npm libraries help streamline ..."
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-how-to-use-your-npm-library-in-a-react-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

Now that we’ve published our npm package, let’s see how to install, import, and use it inside a React project created with **Vite**. This section will guide you through the process using both npm and Yarn.

---

## Installing Your Package

### Step 1: Create a New React Project with Vite (if needed)

If you don’t have an existing React project, create one using Vite:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
npm create vite@latest my-react-app --template react
cd my-react-app
npm install
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
yarn create vite@latest my-react-app --template react
cd my-react-app
yarn install
```

:::

Once the installation is complete, you can start the development server:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn dev
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm run dev
```

:::

### Step 2: Install Your npm Package

Now, install the npm library we created earlier (`my-awesome-library`).

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
npm install my-awesome-library
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
yarn add my-awesome-library
```

:::

---

## Importing and Using the Library in a React Component

Once installed, you can use the library inside a React component.

Open <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="fa-brands fa-react"/>`App.jsx` and modify it as follows:

```jsx title="App.jsx"
import React from "react";
import { formatDate } from "my-awesome-library";

function App() {
  const today = new Date();
  return (
    <div>
      <h1>Formatted Date</h1>
      <p>{formatDate(today)}</p>
    </div>
  );
}

export default App;
```

Now, run your Vite React app:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn dev
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm run dev
```

:::

This will display a formatted date on the webpage, confirming that our library is working!

---

## Handling Package Updates and Versioning

To update your npm package in your project:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn upgrade my-awesome-library
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm update my-awesome-library
```

:::

If you want to check outdated dependencies:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn outdated
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm outdated
```

:::

---

## Using a Local Version of Your Package in Development

If you’re still making changes to your npm package and want to test it in your React project **before publishing**, you can use `npm link` or `yarn link`.

### Step 1: Link Your Package Locally

Go to your package’s project folder:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
cd ~/path-to-my-awesome-library
yarn link
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
cd ~/path-to-my-awesome-library
npm link
```

:::

### Step 2: Use It in Your React Project

Navigate to your React app and link the package:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
cd ~/path-to-my-react-app
yarn link my-awesome-library

```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
cd ~/path-to-my-react-app
npm link my-awesome-library
```

:::

Now, when you import and use `my-awesome-library`, it will use the local version instead of the published one.

---

## Publishing an Update to Your Package

If you’ve made changes to your package and want to publish a new version:

1️⃣ **Update the version number** in <FontIcon icon="iconfont icon-json"/>`package.json` (use `npm version patch` for small updates).  
2️⃣ **Run** `npm publish` to upload the new version.  
3️⃣ **Run** `npm update my-awesome-library` in your React project to get the latest version.

---

## Final Thoughts on Using npm Libraries in React (Vite Edition)

By now, you should have a fully functional npm package and know how to install, use, and update it in a React project using Vite.

✔️ Vite is faster than Create React App and provides better performance for development.  
✔️ npm and Yarn make dependency management easy.  
✔️ `npm link` allows local testing before publishing.  
✔️ Keeping dependencies updated ensures stability.

This workflow is essential for developers looking to create, maintain, and distribute reusable React components or JavaScript utilities.
