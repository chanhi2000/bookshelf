---
lang: en-US
title: "Introducing Yarn: An Alternative to npm"
description: "Article(s) > (3/7) How to Create an npm Library"
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
      content: "Article(s) > (3/7) How to Create an npm Library"
    - property: og:description
      content: "Introducing Yarn: An Alternative to npm"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-npm-library/introducing-yarn-an-alternative-to-npm.html
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
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-introducing-yarn-an-alternative-to-npm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

While **npm** is the default package manager for Node.js, another powerful alternative exists: **Yarn**. Developed by Facebook in 2016, Yarn was created to improve speed, security, and reliability in dependency management.

In this section, we’ll explore what Yarn is, how it differs from npm, and when you might prefer using Yarn over npm.

---

## What is Yarn?

Yarn (**Yet Another Resource Negotiator**) is a package manager that works similarly to npm but with a focus on performance, security, and consistency. It offers:

🚀 **Faster dependency installation** thanks to parallel downloads  
🔐 **More secure package management** using checksum verification  
📦 **Reliable dependency resolution** with an offline cache

To check if you have Yarn installed, run:

```sh
yarn -v
```

If you don’t have it yet, you can install it globally using npm:

```sh
npm install --global yarn
```

Once installed, you can use it just like npm to manage dependencies.

---

## Differences Between npm and Yarn

Although npm and Yarn serve the same purpose, they have some key differences:

| Feature | npm | Yarn |
| --- | --- | --- |
| **Speed** | Installs packages one at a time | Installs multiple packages in parallel (faster) |
| **Lock File** | `package-lock.json` | `yarn.lock` |
| **Offline Cache** | Not available (by default) | Can install packages from local cache |
| **Security** | Verifies package integrity but lacks checksum enforcement | Uses checksum verification for security |
| **Monorepo Support** | Supports workspaces but not optimized | Built-in support for monorepos with `workspaces` |

### Performance Comparison

When installing dependencies, Yarn is often faster because it downloads packages in parallel, while npm installs them sequentially.

For example, to install all dependencies in a project:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn install
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm install
```

:::

Yarn can also install packages from a local cache, meaning it doesn't always need to fetch dependencies from the internet.

### Common Yarn Commands vs. npm

Many npm commands have an equivalent in Yarn:

| Action | npm Command | Yarn Command |
| --- | --- | --- |
| Initialize a new project | `npm init` | `yarn init` |
| Install all dependencies | `npm install` | `yarn install` |
| Install a package | `npm install package-name` | `yarn add package-name` |
| Install a dev dependency | `npm install package-name --save-dev` | `yarn add package-name --dev` |
| Remove a package | `npm uninstall package-name` | `yarn remove package-name` |
| Update all packages | `npm update` | `yarn upgrade` |
| Run a script | `npm run script-name` | `yarn script-name` |

For example, installing `axios` using Yarn:

```sh
yarn add axios
```

---

## When to Use Yarn Instead of npm

Yarn is a great choice when:

- **You want faster installations** - Yarn installs multiple packages in parallel, making it faster than npm.
- **You need better dependency consistency** - The `yarn.lock` file ensures that all developers use the same dependency versions.
- **You're working with monorepos** - Yarn’s built-in **workspaces** make it easier to manage multiple projects within the same repository.
- **You want improved security** - Yarn’s checksum verification prevents corrupted packages from being installed.

Still, npm has improved significantly in recent years, especially with npm v7+, making it a viable choice for most projects.

### Switching Between npm and Yarn

If your project was originally set up using npm but you want to switch to Yarn, you can:

```sh
# 1️⃣ Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# 2️⃣ Run Yarn to install dependencies
yarn install
```

This will generate a yarn.lock file, ensuring all dependencies are managed by Yarn moving forward.

Both npm and Yarn are powerful tools for package management. Choosing between them depends on your project’s needs:

✔️ Use **npm** if you want the default, widely used package manager that works well with most projects.  
✔️ Use **Yarn** if you need faster installs, better security, and monorepo support.

Ultimately, both tools allow you to **install, manage, and publish** JavaScript packages efficiently.
