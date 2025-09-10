---
lang: en-US
title: "Best Practices for npm and Yarn Libraries"
description: "Article(s) > (7/7) How to Create an npm Library"
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
      content: "Article(s) > (7/7) How to Create an npm Library"
    - property: og:description
      content: "Best Practices for npm and Yarn Libraries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-npm-library/best-practices-for-npm-and-yarn-libraries.html
next: freecodecamp.org/how-to-create-an-npm-library/README.md#conclusion
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
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-best-practices-for-npm-and-yarn-libraries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

Now that you've created, published, and used your own npm package, it's essential to follow best practices to ensure your package is reliable, maintainable, and easy to use. This section will cover key principles and techniques to make your npm library as professional as possible.

---

## Write Meaningful Documentation

A well-documented library helps other developers understand how to use it effectively.

::: info What to Include in Your Documentation

📌 Installation instructions  
📌 Usage examples  
📌 API reference (functions, parameters, return values)  
📌 Versioning and update history  
📌 Contributions guide (if open-source)

:::

For example, a simple <FontIcon icon="fa-brands fa-markdown"/>`README.md` file for my-awesome-library:

```md
# my-awesome-library

A simple npm package for formatting dates.

---

## Installation

### Using npm

````sh
npm install my-awesome-library
`````

### Using Yarn

````sh
yarn add my-awesome-library
````

### Usage

````js
import { formatDate } from "my-awesome-library";

console.log(formatDate(new Date())); // Outputs: 2025-02-04
````

```

---

## Follow Semantic Versioning (SemVer)

Versioning helps maintain compatibility and informs users of changes. npm follows Semantic Versioning (SemVer):

MAJOR.MINOR.PATCH

| Change Type | Example | Meaning |
| --- | --- | --- |
| **Patch** | `1.0.0 → 1.0.1` | Bug fixes, no breaking changes |
| **Minor** | `1.0.0 → 1.1.0` | New features, no breaking changes |
| **Major** | `1.0.0 → 2.0.0` | Breaking changes |

::: note

To bump versions automatically, use:

```sh
npm version patch   # Small bug fix
npm version minor   # New feature added
npm version major   # Breaking changes
```

Then, publish the new version:

```sh
npm publish
```

👉 Use proper versioning to prevent breaking projects that depend on your library.

:::

---

## Keep Dependencies Up to Date

Regularly updating dependencies improves security, performance, and compatibility.

### Check for outdated dependencies:

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

### Update dependencies:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn upgrade
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm update
```

:::

---

## Write Unit Tests for Your Library

Testing ensures your package works correctly before publishing updates.

### Install a Testing Framework (Jest)

```sh
npm install --save-dev jest
```

### Create a Test File (<FontIcon icon="fa-brands fa-js"/>`index.test.js`)

```js
const { formatDate } = require("./index");

test("formats a date correctly", () => {
  expect(formatDate(new Date("2025-02-04"))).toBe("2025-02-04");
});

test("throws an error if input is not a date", () => {
  expect(() => formatDate("not a date")).toThrow("Invalid date");
});
```

### Run Tests

```sh
npm test
```

::: note 👉

You can use CI/CD (for example, GitHub Actions) to run tests automatically on every push.

:::

---

## Using CI/CD for Automated Publishing

### Automate Publishing with GitHub Actions

Create a <FontIcon icon="fas fa-folder-open"/>`.github/workflows/`<FontIcon icon="iconfont icon-yaml"/>`publish.yml` file:

```yaml title=".github/workflows/publish.yml"
name: Publish to npm
on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: "https://registry.npmjs.org/"
      - run: npm install
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

1️⃣ **Create an npm token**:  

```sh
npm token create
```

Copy the token and add it to GitHub Secrets (`NPM_TOKEN`).

2️⃣ **Push code to GitHub** → Auto-publish on npm!

👉 Automating publishing prevents human errors and ensures quality control.

---

## Ensure Cross-Platform Compatibility

- Use **ES modules** (`import/export`) for modern compatibility.
- Include **CommonJS** (`require/module.exports`) support for older environments.
- Test with different **Node.js versions** using CI/CD.

Example `package.json` for dual compatibility:

```json title="package.json"
"type": "module",
"main": "index.cjs",
"exports": {
  "import": "./index.mjs",
  "require": "./index.cjs"
}
```

::: info 👉

This ensures your package works everywhere (Node.js, React, Next.js, and so on).

:::
