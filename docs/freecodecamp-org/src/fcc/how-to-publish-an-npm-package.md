---
lang: en-US
title: "How to Publish an npm Package - Explained with Examples"
description: "Article(s) > How to Publish an npm Package - Explained with Examples"
icon: fa-brands fa-node
category:
  - Node.js
  - NPM
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
      content: "Article(s) > How to Publish an npm Package - Explained with Examples"
    - property: og:description
      content: "How to Publish an npm Package - Explained with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-publish-an-npm-package.html
prev: /programming/js-node/articles/README.md
date: 2025-09-25
isOriginal: false
author:
  - name: Ikegah Oliver
    url : https://freecodecamp.org/news/author/Oliverkrane/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758743190885/78dd4f19-53eb-4101-9cf9-7c22ab5f6be2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Publish an npm Package - Explained with Examples"
  desc="If you’ve spent any time working with JavaScript, you’ve most likely come across npm—whether installing packages like Express, Lodash, or React, or running commands like npm init. While using npm is second nature for many JavaScript developers, some ..."
  url="https://freecodecamp.org/news/how-to-publish-an-npm-package"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758743190885/78dd4f19-53eb-4101-9cf9-7c22ab5f6be2.png"/>

If you’ve spent any time working with JavaScript, you’ve most likely come across npm—whether installing packages like Express, Lodash, or React, or running commands like `npm init`. While using npm is second nature for many JavaScript developers, some have never explored how those packages are created, structured, and shared with the rest of the world. Behind each command lies a powerful system for building, managing, and distributing JavaScript code at scale.

This article will guide you through the basics of npm, explain how it functions behind the scenes, and demonstrate step-by-step how to create and publish your own npm package to the official npm registry. Whether you’re a beginner just starting with JavaScript or a seasoned developer who has used npm but never published a package, this guide will help you confidently navigate the entire process, from setup to sharing your code with the global developer community.

---

## What is npm?

Essentially, npm is to JavaScript what pip is to Python or Maven to Java. It enables developers to reuse code written by others (most of the time to fulfil a function in their project), manage dependencies, and share their own code with the world.

You can use npm to:

- Get and utilize code packages in your applications, either as-is or with custom modifications.
- Download and run standalone tools instantly.
- Execute packages directly from the registry without installing them using npx.
- Share your own code with developers around the world through the npm registry.
- Limit access to specific packages so only approved developers can use them.
- Create organizations to manage code, teams, and packages in one place.
- Collaborate as virtual teams using shared organizational accounts.
- Handle different versions of packages and their dependencies with ease.
- Keep your applications up to date by syncing with the latest package updates.
- Explore different packages that offer various solutions to the same problem.
- Connect with developers working on similar challenges and projects.

---

## Components of npm

npm consists of three core components:

- The command line interface (CLI)
- The registry
- The website

---

## The Command Line Interface

There are different npm commands you can run on your terminal. For example, `npm init` can be used to initialize a Node project, `npm install` can be used to install a package. It also allows you to do things like:

- Publish packages (`npm publish`)
- Update packages (`npm update`)
- Manage versioning (`npm version`)
- Run scripts (`npm run build`, `npm test`, and so on)

Think of it as your control panel.

---

## The Registry

You can find the huge public database at [<VPIcon icon="fa-brands fa-npm"/>registry.npmjs.org](https://registry.npmjs.org), where packages are stored and shared. It also contains all the meta-information surrounding the package.

Example, when you run:

```sh
npm install express
```

npm fetches the Express package from the registry.

The npm registry enables collaboration by allowing developers to:

- Publish their own packages
- Install packages created by others
- Discover new tools and libraries

Its collaboration features include:

- Open-source packages: The code is publicly visible (usually hosted on GitHub).
- Versioning: Multiple versions of the same package let users safely adopt updates.
- Scoped packages: Namespaces allow teams and organizations to manage ownership.
- Issues & pull requests: Most npm packages link to GitHub, allowing developers too contribute fixes and enhancements.
- Organisations: Teams can manage access to shared private or public packages.

---

## The Website

At [<VPIcon icon="fa-brands fa-npm"/>npmjs.com](https://npmjs.com), this is where you can:

- Browse packages.
- Read documentation.
- View download stats and dependencies.
- Create and manage your account, organization, and package access.

---

## What is the Package.json File?

A very important component of any npm tool that you’ll come across as a JavaScript developer installing an npm package, is the <VPIcon icon="iconfont icon-json"/>`package.json` file. It is a metadata file that lives at the root of every npm or Node project. It tells npm (and other tools) everything it needs to know about your project, like:

- What the project is called.
- What it depends on
- How to run it
- How to version it
- and how to publish it

You can think of it like the blueprint of your JavaScript project. Without it, npm doesn't know how to work with your code.

You can create a <VPIcon icon="iconfont icon-json"/>`package.json` file by typing the command `npm init` in your terminal and filling in the prompts provided. Alternatively, you can create a file named <VPIcon icon="iconfont icon-json"/>`package.json` and manually populate it with JSON content.

### Key Fields in an npm package.json File

The following is a list of commonly used fields and how they interact with npm:

#### 1. `name` and `version`

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0"
}
```

- This is required for publishing.
- `name` must be unique (if publishing to the public npm registry).
- `version` follows semantic versioning (semver) (for example, major.minor.patch).

#### 2. `description`, `keywords`, `author`, and `license`

```json
{
  "description": "A utility to convert markdown to HTML",
  "keywords": ["markdown", "html", "converter"],
  "author": "Ikegah Oliver",
  "license": "MIT"
}
 
```

- Helps npm users discover your package
- Show up on [<VPIcon icon="fa-brands fa-npm"/>npmjs.com](http://npmjs.com).
- Sets collaboratory license

#### 3. `scripts`

```json
{
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "tsc"
  }
}
```

- Defines custom commands.
- Run with npm run test, npm run build, and so on.
- Automates build, test, lint, deploy processes.

#### 4. `main` and `exports`

```json
{
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  }
}
```

- `main`: Entry point for `require()` or import.
- `exports`: Controls exactly what parts of your package are exposed (especially useful for modern ESM and package security).

#### 5. `dependencies` and `devDependencies`

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  }
}
```

- `dependencies` : Core packages your project needs to run in production (for example, `express`).
- `devDependencies` : Packages used only during development, like testing or build tools (for example, `jest`).

#### 6. `engines`

```json
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

- Specifies Node.js version your package supports.
- Helps warn users before they install with an unsupported version.

#### 7. `private`

```json
{
  "private":"true"
}
```

- Prevents accidental publishing to the public npm registry.
- Used for monorepos and internal-only projects.

#### 8. `files` (optional)

```json
{
  "files":["/dist", "README.md"]
}
```

- Controls what files get included when you run npm publish.
- Reduces package size, omits build artifacts or test files.

A minimal npm <VPIcon icon="iconfont icon-json"/>`package.json` file looks like this:

```json
{
  "name": "@oliver/markdown-to-html",
  "version": "1.0.0",
  "description": "Converts markdown to HTML with styles",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "keywords": ["markdown", "html", "converter"],
  "author": "Ikegah Oliver",
  "license": "MIT",
  "dependencies": {
    "marked": "^5.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "files": ["dist/", "README.md"]
}
```

The <VPIcon icon="iconfont icon-json"/>`package.json` file plays a central role in every npm workflow. It defines your project's identity, lists its dependencies, specifies useful scripts, and outlines how the package should behave when published. Without it, npm can't properly install packages, run commands, or publish your code to the registry.

---

## How npm Works

When you type `npm install` in your terminal, npm initiates a behind-the-scenes process to install the necessary packages for your project. Depending on how you run the command, the process varies slightly as follows:

### Method 1 - <VPIcon icon="iconfont icon-json"/>`package.json` Already Has Dependencies

If your <VPIcon icon="iconfont icon-json"/>`package.json` lists packages under `dependencies` or `devDependencies`, npm will:

1. **Read those entries:** It looks at the names and version ranges of each dependency.
2. **Contact the registry:** npm queries [<VPIcon icon="fa-brands fa-npm"/>registry.npmjs.org](https://registry.npmjs.org) to fetch metadata about each required package.
3. **Download the correct versions:** It selects versions that match your version rules (such as ^4.17.0) and downloads the `.tgz` files.
4. **Unpack and install:** It places the packages into the <VPIcon icon="fas fa-folder-open"/>`node_modules` directory and caches them.
5. **Update <VPIcon icon="iconfont icon-json"/>`package-lock.json`:** It logs the exact versions and dependency tree in this file to ensure consistent installs later.

### Method 2 - You Run `npm install <package-name>` Without Existing Dependencies

If your <VPIcon icon="iconfont icon-json"/>`package.json` doesn't have any dependencies yet and you run something like this in your terminal:

```sh
npm install express
```

Then npm will run:

1. **Resolve the package version:** It fetches the latest version of Express (unless you specify a version manually).
2. **Download and install:** The tarball is downloaded and placed in the <VPIcon icon="fas fa-folder-open"/>`node_modules/` folder that is automatically generated. A tarball is the zipped-up version of the package (`express` in this case), containing the package’s JavaScript files, a <VPIcon icon="iconfont icon-json"/>`package.json`, a `README`, and anything else the author included for distribution that npm downloads and extracts onto your machine.
3. **Add to <VPIcon icon="iconfont icon-json"/>`package.json`:** npm automatically adds the packa to your -endencies list like this:

```json
"dependencies": {
  "express": "^4.18.2"
}
```

4. **Create a <VPIcon icon="iconfont icon-json"/>`package-lock.json` (if it doesn't exist):** It writes all the version info to lock things down for future installs.

Note: If you run `npm install --save-dev jest`It’ll add the package under devDependencies instead.

---

## How to Publish an npm Library

To follow through with this guide section, you will need to have the following prerequisites:

- Stable network connection
- A code editor with a terminal (like VSCode)
- Basic knowledge of JavaScript and Node
- A basic understanding of the Markdown Markup language (for README documentation)

Now, let’s dive into publishing an npm library. Assuming you just built and tested a fantastic JavaScript tool that you would like to share with the world, and allow people to use it in their projects and applications, the steps below will guide you from having the tool on your local machine to making it publicly available as an npm package for anyone to install and enjoy:

### Step 1: Create a free npm account

Before publishing, you will need an npm account.

- Go to [<VPIcon icon="fa-brands fa-npm"/>npmjs.com/signup](https://npmjs.com/signup).
- Fill in the form with your username, email, and password.
- Confirm your email address by clicking the link in the verification email.

### Step 2: Log in from the Command Line

Once you’ve created your account, you need to log in through your terminal. Run:

```sh
npm login
```

npm will prompt you for your username, password, and email address. If everything is correct, npm will generate an authentication token and store it locally, so you don’t have to log in every time.

### Step 3: Create a <VPIcon icon="iconfont icon-json"/>`package.json` file

If your project doesn't already have a <VPIcon icon="iconfont icon-json"/>`package.json` file, create one by typing this command in your terminal:

```sh
npm init
```

You will be prompted to fill in the following information:

- **name**: Must be unique if it’s public.
- **version**: Start with 1.0.0 (it represents the first version of your project; subsequently, you will change it accordingly after each update push)
- **description**: One-line summary of your package.
- **entry point**: Entry file of your project, usually <VPIcon icon="fa-brands fa-js"/>`index.js` or <VPIcon icon="fas fa-folder-open"/>`dist/`<VPIcon icon="fa-brands fa-js"/>`index.js`.
- **keywords**: Help others discover your package.
- **author**: Your name or GitHub handle.
- **license**: Use MIT, ISC, or another open-source license.

When you’re done, npm will generate a <VPIcon icon="iconfont icon-json"/>`package.json` like this:

```json title="package.json"
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "A demo package for npm publishing",
  "main": "index.js",
  "keywords": ["demo", "npm", "tutorial"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 4: Add a <VPIcon icon="fa-brands fa-markdown"/>`README.md`

Explain what your package does and how to use it in a <VPIcon icon="fa-brands fa-markdown"/>`README.md` file. The README appears on your package page on [<VPIcon icon="fa-brands fa-npm"/>npmjs.com](http://npmjs.com). Example content:

````md
# my-awesome-package

A simple package that says hello.

---

## Usage

```js
const greet = require('my-awesome-package');
console.log(greet('Oliver'));
// Output: Hello, Oliver!
````

### Step 5:Add an <VPIcon icon="fa-brands fa-npm"/>`.npmignore` file

This will exclude folders like <VPIcon icon="fas fa-folder-open"/>`node_modules`, `dist`, or <VPIcon icon="fas fa-file-lines"/>`.env`, and any other file or folder within the package you don’t wish to publish. 

Example content:

```plaintext title=".npmignore"
node_modules
.env
di
```

### Step 6: Check if the package name you chose is available

Before publishing, check if the package name you chose is not already taken. To check, run this command on your terminal:

```sh
npm search my-awesome-package
```

Or enter the URL [<VPIcon icon="fa-brands fa-npm"/>https://npmjs.com/package/my-awesome-package](https://npmjs.com/package/my-awesome-package) in your browser (replace my-awesome-package with the name you chose). If no package page shows up, the name is not taken.

If the package name has been taken, change it in your <VPIcon icon="iconfont icon-json"/>`package.json` and any documentation (<VPIcon icon="fa-brands fa-markdown"/>`README.md`), the name is reflected, or publish it under a scope. A scope is like a namespace tied to your npm username or organization. It ensures your package name is unique, even if the base name is common. For example, if my-awesome-package is taken, you can publish under a scope by setting the name section in its <VPIcon icon="iconfont icon-json"/>`package.json` like this:

```json title="package.json"
{
  "name": "@yourname/my-awesome-package"
}
```

### Step 6: Publish your package

You are now ready to publish. Run:

```sh
npm publish
```

If you used a scoped name, when publishing, you must make it public:

```sh
npm publish --access public
```

If everything is valid, npm will publish your package and give you a URL like:

```plaintext
https://npmjs.com/package/my-awesome-package
```

---

## How to Verify and Install Your Package

Visit your project page on npm to see it live. For example: [<VPIcon icon="fa-brands fa-npm"/>npmjs.com/package/my-awesome-package](https://npmjs.com/package/my-awesome-package), or search your project name on the npm website search bar.

Now, try installing it in a node project:

```sh
npm install my-awesome-package
```

Test out its features and functionalities, depending on what it is built to do.

---

## How to Update Your Package

If you make changes or update features in your package, you can publish the update.

After applying your changes, you can update the version in your <VPIcon icon="iconfont icon-json"/>`package.json`. Using semantic versioning, you can update it as follows:

- Patch update: 1.0.0 → 1.0.1
- Minor update: 1.0.0 → 1.1.0
- Major update: 1.0.0 → 2.0.0

Or you can use the CLI:

```sh
npm version <update_type>
```

Replace `<update_type>` with your new semantic version.

Now run:

```sh
npm publish
```

---

## Notes and Best Practices

Although publishing to npm is straightforward, you still need to follow best practices to maintain a clean, secure, and user-friendly package.

- Exclude Sensitive Files: Never include <VPIcon icon="fas fa-file-lines"/>`.env`, credentials, or secrets. Use <VPIcon icon="fa-brands fa-npm"/>`.npmignore` or the "files" field in <VPIcon icon="iconfont icon-json"/>`package.json` to control what gets published.
- Test Before Publishing: Run `npm pack` to preview the package and install it locally in another project to ensure everything works.
- Unpublish Carefully: You can unpublish within 72 hours using `npm unpublish --force`, but avoid doing this frequently to prevent breaking other projects that rely on your package.
- Always Bump the Version: npm won’t let you overwrite a version, so use semantic versioning (npm version patch|minor|major) before publishing updates.
- Add Essentials: Include a clear <VPIcon icon="fa-brands fa-markdown"/>`README.md` file, a license, and relevant keywords to make your package discoverable and easy to use.

---

## Beyond the Basics

Now that you've got the hang of the basics, you can put your npm skills to work and level up as a developer. Here are some simple, practical steps you can take:

### Get Involved in Open Source

One of the best ways to gain real-world experience is by contributing to existing projects on npm. Check out their repositories on GitHub and GitLab and see how you can contribute to them. This teaches you how to collaborate, handle code reviews, and manage versions. A great way to start is by looking for projects on GitHub with a "good first issue" label.

### Maintain Your Own Package

Publishing is just the first step. To truly master the process, keep your package up to date. This involves fixing bugs, listening to user feedback, and adding new features. You will quickly learn about versioning, ensuring your package remains compatible with older projects, and effectively manage dependencies.

### Dig into Advanced Features

Explore advanced npm topics like semantic versioning, using private packages, creating scoped packages, and automating your releases with CI/CD pipelines. These are essential skills for any professional developer.

Taking these steps will help you transition from merely understanding npm to confidently utilizing it in real-world scenarios.

---

## Conclusion

Congratulations! You have now learned the essentials of npm from the <VPIcon icon="iconfont icon-json"/>`package.json` file to publishing and maintaining a JavaScript package with the npm library. With this knowledge, you can share your JavaScript tools with the world, collaborate with other developers, and contribute to the growing ecosystem of open-source libraries.

By following best practices, testing locally, and learning from standard errors, you can confidently create packages that are clean, secure, and useful for other developers. Whether you’re building a small utility or a full-fledged framework, publishing on npm gives your ideas visibility and helps you contribute to the wider JavaScript community.

If you’d like to get hands-on experience collaborating on a real package, I published an npm project called [<VPIcon icon="fa-brands fa-npm"/>`route-pilot`](https://npmjs.com/package/route-pilot?activeTab=readme), a powerful CLI tool for testing and analyzing Express.js routes in your Node.js applications. I’m actively seeking contributors who want to enhance the code, add new features, or refine the documentation. It’s a simple way to practice working with npm in a collaborative setting while learning more about open-source development. Head over to the [GitHub repo (<VPIcon icon="iconfont icon-github`oliverTwist2/express-route-tester`"/>)](https://github.com/oliverTwist2/express-route-tester) and join in. We’d love to have you on board!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Publish an npm Package - Explained with Examples",
  "desc": "If you’ve spent any time working with JavaScript, you’ve most likely come across npm—whether installing packages like Express, Lodash, or React, or running commands like npm init. While using npm is second nature for many JavaScript developers, some ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-publish-an-npm-package.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
