---
lang: en-US
title: "How to Create Your Own npm Library"
description: "Article(s) > (4/7) How to Create an npm Library"
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
      content: "Article(s) > (4/7) How to Create an npm Library"
    - property: og:description
      content: "How to Create Your Own npm Library"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-npm-library/how-to-create-your-own-npm-library.html
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
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-how-to-create-your-own-npm-library"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

Creating your own npm library is a great way to **share reusable code**, contribute to the open-source community, or even streamline development across multiple projects. In this section, we’ll walk through the step-by-step process of setting up, coding, and preparing a library for publishing on npm.

---

## Setting Up a New Package

Before writing code, you need to set up an npm package. Follow these steps:

### Step 1: Create a New Project Folder

```sh
mkdir my-awesome-library
cd my-awesome-library
```

### Step 2: Initialize npm

Run the following command to create a <VPIcon icon="iconfont icon-json"/>`package.json` file:

```sh
npm init
```

You will be prompted to enter details such as:

- Package name
- Version
- Description
- Entry point (default: <VPIcon icon="fa-brands fa-js"/>`index.js`)
- Author
- License

💡 To skip the prompts and create a default <VPIcon icon="iconfont icon-json"/>`package.json`, use:

```sh
npm init -y
```

---

## Writing Modular and Reusable Code

Now, let’s create a simple utility library that provides a function to format dates.

### Step 3: Create an <VPIcon icon="fa-brands fa-js"/>`index.js` File

Inside the project folder, create a file named `index.js` and add the following code:

```js
function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }
  return date.toISOString().split("T")[0];
}

module.exports = { formatDate };
```

---

## Adding Dependencies and Peer Dependencies

Your library might depend on external packages. For example, let’s use date-fns for better date formatting.

To install it as a dependency, run:

```sh
npm install date-fns
```

Then, modify `index.js` to use `date-fns`:

```js title="iodex.js"
const { format } = require("date-fns");

function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }
  return format(date, "yyyy-MM-dd");
}

module.exports = { formatDate };
```

If you're creating a React-specific library, you should add React as a peer dependency:

```sh
npm install react --save-peer
```

This ensures users of your library install React separately, preventing version conflicts.

Before publishing, you should test how your package works when installed as a dependency.

### Step 4: Link the Package Locally

Run the following command in your package folder:

```sh
npm link
```

Then, in another project where you want to use your package, navigate to that project and run:

```sh
npm link my-awesome-library
```

Now, you can import and use your function:

```js
const { formatDate } = require("my-awesome-library");

console.log(formatDate(new Date())); // Output: 2025-02-04 (or the current date)
```

Once you're happy with your package, it's time to **publish it on npm**.
