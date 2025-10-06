---
lang: en-US
title: "What is npm?"
description: "Article(s) > (1/7) How to Create an npm Library"
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
      content: "Article(s) > (1/7) How to Create an npm Library"
    - property: og:description
      content: "What is npm?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-npm-library/what-is-npm.html
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
  url="https://freecodecamp.org/news/how-to-create-an-npm-library#heading-what-is-npm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941301640/7189d889-387d-4bd2-bf5c-2cbcbd17faad.png"/>

npm (Node Package Manager) is the default package manager for JavaScript and Node.js. It allows developers to install, share, and manage libraries or dependencies that make building applications easier and more efficient.

npm provides access to a vast ecosystem of open-source packages hosted on the **npm registry**, making it one of the largest software repositories in the world.

npm comes bundled with **Node.js**, meaning that once you install Node.js, you automatically have access to npm. You can check if npm is installed by running the following command in your terminal:

```sh
npm -v
```

This command should return the version of npm installed on your system.

---

## How npm Works

npm operates through three key components:

1. **The npm Registry** - A public repository that hosts open-source JavaScript packages.
2. **The npm CLI (Command Line Interface)** - A tool that allows developers to install, update, and manage packages from the command line.
3. **The package.json File** - A metadata file that keeps track of dependencies, scripts, and project configurations.

When you install a package using npm, it pulls the package from the registry and saves it in the <FontIcon icon="fas fa-folder-open"/>`node_modules` folder within your project.

For example, to install **Lodash**, a popular utility library, you would run:

```sh
npm install lodash
```

This will:

- Download the latest version of `lodash` from the npm registry
- Add it to your <FontIcon icon="fas fa-folder-open"/>`node_modules` folder
- Update the <FontIcon icon="iconfont icon-json"/>`package.json` and <FontIcon icon="iconfont icon-json"/>`package-lock.json` files to reflect the new dependency

---

## The Role of <FontIcon icon="iconfont icon-json"/>`package.json`

The <FontIcon icon="iconfont icon-json"/>`package.json` file is the heart of any npm project. It serves as a blueprint, containing information about the project, including:

- **Project metadata** (name, version, description)
- **Dependencies** (external packages required for the project)
- **Scripts** (commands to automate tasks like starting a server or running tests)
- **Versioning information** (ensuring compatibility between different versions of dependencies)

A typical <FontIcon icon="iconfont icon-json"/>`package.json` file looks like this:

```json title="package.json"
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A sample project demonstrating npm usage",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

- `dependencies` - Lists essential packages required for the application to function.
- `devDependencies` - Includes development-only dependencies (for example, testing and linting tools).
- `scripts` - Defines CLI commands for automating tasks.

To install all dependencies listed in <FontIcon icon="iconfont icon-json"/>`package.json`, simply run:

```sh
npm install
```

This ensures all required packages are downloaded and ready for use.

---

## Key npm Commands

Here are some essential npm commands you’ll use frequently:

| Command | Description |
| --- | --- |
| `npm init -y` | Creates a default <FontIcon icon="iconfont icon-json"/>`package.json` file |
| `npm install <package-name>` | Installs a package and adds it to `dependencies` |
| `npm install <package-name> --save-dev` | Installs a package and adds it to `devDependencies` |
| `npm uninstall <package-name>` | Removes a package from the project |
| `npm update` | Updates all installed dependencies |
| `npm outdated` | Checks for outdated dependencies |
| `npm run <script-name>` | Runs a script defined in <FontIcon icon="iconfont icon-json"/>`package.json` |
