---
lang: en-US
title: "How to Publish Your Library to npm"
description: "Article(s) > (5/7) How to Create an npm Library"
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
      content: "Article(s) > (5/7) How to Create an npm Library"
    - property: og:description
      content: "How to Publish Your Library to npm"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-npm-library/how-to-publish-your-library-to-npm.html
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
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-how-to-publish-your-library-to-npm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

Now that we’ve created our npm package, the next step is **publishing it to the npm registry** so others can install and use it. In this section, we’ll cover how to publish the package step by step.

---

## Creating an npm Account

Before publishing, you need an npm account.

### Step 1: Sign Up for npm

1. Go to [https://npmjs.com/signup](https://npmjs.com/signup) and create an account.
2. Verify your email address.

### Step 2: Log in to npm from the Terminal

Run the following command in your terminal:

```sh
npm login
```

You will be prompted to enter:

- Your npm username
- Your password
- Your email (associated with your npm account)

If the login is successful, you’ll see a message:

```plaintext title="output"
Logged in as your-username on https://registry.npmjs.org/
```

---

## Configuring package.json for Publishing

### Step 3: Ensure Your Package Name is Unique

Every npm package needs a unique name. Run the following command to check if your desired name is available:

```sh
npm search my-awesome-library
```

If the name is already taken, you’ll need to modify <VPIcon icon="iconfont icon-json"/>`package.json` and change the `"name"` field.

### Step 4: Add Metadata and Keywords

Open `package.json` and ensure it includes useful metadata:

```json{2} title="package.json"
{
  "name": "my-awesome-library",
  "version": "1.0.0",
  "description": "A simple npm package for formatting dates",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/my-awesome-library.git"
  },
  "keywords": ["date", "formatter", "utility", "npm package"],
  "author": "Your Name <your-email@example.com>",
  "license": "MIT"
}
```

🔹 **repository** - Useful if you plan to host the project on GitHub.  
🔹 **keywords** - Helps people discover your package on npm.  
🔹 **license** - Specifies how others can use your package (for example, MIT, GPL, and so on).

---

## Publishing the Package

### Step 5: Publish Your Package to npm

Run the following command inside your project folder:

```sh
npm publish
```

If successful, you’ll see output similar to:

```plaintext title="output"
+ my-awesome-library@1.0.0
```

Your package is now available at:

**📌 [https://www.npmjs.com/package/my-awesome-library](https://npmjs.com/package/my-awesome-library)**

### Step 6: Making Changes and Updating the Package

If you want to release a new version, update the `version` field in <VPIcon icon="iconfont icon-json"/>`package.json`. npm follows Semantic Versioning (SemVer):

- **Patch:** Bug fixes (1.0.0 → 1.0.1)
- **Minor:** New features, backward-compatible (1.0.0 → 1.1.0)
- **Major:** Breaking changes (1.0.0 → 2.0.0)

Instead of manually updating `package.json`, use:

```sh
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

Then, publish the new version:

```sh
npm publish
```

If you accidentally publish a package and need to remove it:

```sh
npm unpublish my-awesome-library --force
```

::: note

You can only unpublish packages **within 72 hours** of publishing.

:::

🎯 **You’ve successfully published your own npm library!** Now, other developers can install it using:

```sh
npm install my-awesome-library
```

By following Semantic Versioning, writing clear documentation, and maintaining your package, you contribute to the open-source ecosystem and make your code reusable.
