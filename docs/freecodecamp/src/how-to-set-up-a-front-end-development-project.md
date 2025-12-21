---
lang: en-US
title: "JavaScript Tutorial - How to Set Up a Front End Development Project"
description: "Article(s) > JavaScript Tutorial - How to Set Up a Front End Development Project"
icon: fa-brands fa-node
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
      content: "Article(s) > JavaScript Tutorial - How to Set Up a Front End Development Project"
    - property: og:description
      content: "JavaScript Tutorial - How to Set Up a Front End Development Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-set-up-a-front-end-development-project.html
prev: /programming/js-node/articles/README.md
date: 2025-02-13
isOriginal: false
author:
  - name: Hunor Márton Borbély
    url : https://freecodecamp.org/news/author/hunor/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739318785959/23632d35-1d5a-4797-8c7d-fbad6c80a879.png
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
  name="JavaScript Tutorial - How to Set Up a Front End Development Project"
  desc="Let’s say you plan to build a website. Before you start, you want to set up a few tools to make your life easier. But which tools should you have? The JavaScript ecosystem is changing so fast that it can be overwhelming to pick the best tools to use...."
  url="https://freecodecamp.org/news/how-to-set-up-a-front-end-development-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739318785959/23632d35-1d5a-4797-8c7d-fbad6c80a879.png"/>

Let’s say you plan to build a website. Before you start, you want to set up a few tools to make your life easier. But which tools should you have?

The JavaScript ecosystem is changing so fast that it can be overwhelming to pick the best tools to use. To solve this problem, in this article, I’m going to walk you through how to set up a front-end project from scratch.

We'll cover things like must-have editor extensions, adding JavaScript libraries to your project, why you'll use Node.js even if you want to do front-end development, and setting up an application bundler that will generate a live preview as you code in your browser.

You can also [<VPIcon icon="fa-brands fa-youtube"/>watch this article as a video](https://youtu.be/BiBjuphZQxA) on YouTube. Let's dive in.

<VidStack src="youtube/BiBjuphZQxA" />

---

## How to Choose a Code Editor

Let’s start with the foundations. As a web developer, you mostly edit text, so you need a good editor. So which one should you use?

Picking an editor is highly based on personal preference, as most editors have very similar features.

If you don’t have a personal preference, I highly recommend [<VPIcon icon="iconfont icon-vscode"/>VS Code](https://vscode.dev/). Lately, it has become the de facto standard editor for web development.

![VS Code is by far the most used editor<br/>[<VPIcon icon="fa-brands fa-stack-overflow"/>(Source: StackOverflow)](https://survey.stackoverflow.co/2024/technology#1-integrated-development-environment)](https://cdn.hashnode.com/res/hashnode/image/upload/v1738945424232/9f41d802-e672-4cd7-ada3-5e8d54000446.png)

One of the greatest features of all the mainstream editors is that you can add extensions to them. Let’s walk through two extensions that are must-haves.

---

## How to Auto-format Your Code in VS Code

Prettier is an extension that makes your code more readable and more consistent.

Let’s say you copy-pasted some code, and it’s hard to read. The tabulation is off, a line is too long, and so on. Then you just save the file, and magically, everything looks as it should be.

![Prettier formats the code based on best practices](https://cdn.hashnode.com/res/hashnode/image/upload/v1738948709710/c64a427d-b868-4704-87db-338ebf079c67.png)

This is what Prettier does. It formats the code based on best practices. It doesn't just fix tabulation and wrap the lines. It also adds parentheses to improve code readability, makes sure you are consistent with quotation marks, and many more.

To make it work in VS Code, we must first install the Prettier extension. To do so, go to the extensions panel in VS Code, search for Prettier, and then install it.

![To install Prettier, go to the Extensions panel, search for Prettier, and install it](https://cdn.hashnode.com/res/hashnode/image/upload/v1738955063143/7e8378e5-cf70-4527-9951-b822a745f4bf.png)

Installing this extension doesn't format your files automatically on save by default. The default behavior is that once you install this extension, you can right-click within a file and select **Format Document**. You can also select part of a file and choose **Format Selection**.

![Right-click within a file and select Format Document to format it](https://cdn.hashnode.com/res/hashnode/image/upload/v1738955102891/2e55eaa7-ec2a-4aca-ad79-b1df82d31e5c.png)

The first time you do this, you need to select the default formatter. VS Code already has a formatter, but it isn’t as powerful as Prettier. Now that you have two formatters, you have to let VS Code know that you want to use Prettier for formatting in the future.

![The first time, you need to select the default formatter](https://cdn.hashnode.com/res/hashnode/image/upload/v1738955119781/d0ef8bc3-54d0-4428-9731-c8857171f3e7.png)

If you wish to auto-format your files when you save them, you need to change the settings. Go to Settings in your VS Code preferences and search for the **Format on Save** option. By default, this is false, so make sure that you tick this checkbox. With this, Prettier formats your files every time you save them.

![Set the Format On Save option in Settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1738955201893/fd3fbec6-5265-4c9b-adab-c1a9d524a635.png)

Formatting can be controversial, though. I highly recommend the default settings, especially for beginners. But if you prefer a different style, you can customize things.

You can indicate with comments to [ignore specific lines](https://prettier.io/docs/en/ignore.html) and create a config file to list your preferences.

In the root folder of your project, you can create a file called **.prettierrc** and add a few options. A typical option could be if you prefer single quotes instead of double quotes in your files. Or if you don't want to have semi-colons at the end of your lines.

![Adding a custom Prettier configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1738955259640/d430386f-de2a-49f3-b252-aee4a9bc1089.png)

With this configuration, you will have a different format once you save your files.

```json title=".prettierrc"
{
  "singleQuote": true,
  "semi": false
}
```

There are many more options, of course. If you want to dig deeper, check out [<VPIcon icon="fas fa-globe"/>Prettier's documentation.](https://prettier.io/docs/en/configuration.html)

---

## Why Do You Need Node for a Front-End Project?

Before we get to the second must-have extension, we need to set up a few other things. First, we need to talk about Node.js. What is Node, and why do you need it even if you work as a front-end developer?

Node is often associated with backend development, but that's not its only job. Node is a JavaScript runtime - this means it runs JavaScript files outside of the browser.

![You can run JavaScript as part of a website in your browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949060189/11f39633-76a1-4c38-92ef-88846ffdeb8f.png)

There are two ways of running JavaScript code. You can either have it as part of a website and run the entire website in a browser, or run only the Javascript file with a runtime like Node.

![You can run JavaScript on its own with Node](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949071655/68552f47-63ba-4cfc-9ba0-abb9218a4857.png)

In the example below, we have a very simple Javascript file that prints "Hello World" to the console. If we have Node installed, we can go to the terminal, navigate to the folder where this file is, and then run it with Node like this. You can see that the file was executed, and the result is in the console.

![Node can run JavaScript files on their own](https://cdn.hashnode.com/res/hashnode/image/upload/v1738947073105/9b56af05-e925-4cd1-9475-b3e49898dd39.png)

That's what Node really is: a tool that runs JavaScript files on their own.

JavaScript mostly behaves the same way in both environments. But there are also differences in what JavaScript can do in a browser vs when it runs with Node.

For instance, when running in the browser, JavaScript can access and modify HTML elements. That's the main point of having JavaScript in the first place.

![In the browser, JavaScript can access and modify your HTML elements](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949133299/b1c6d0a6-ba11-4659-a51e-b72e4bbfde68.png)

In Node, there's no HTML file. JavaScript runs on its own. On the other hand, in Node, JavaScript has access to your file system and can read and write your files.

![With Node, JavaScript can access and modify your File system](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949113586/e8702a9c-91bf-4096-8768-cf06e4e41082.png)

For instance, you can run scripts on your machine to initialize a project. We are going to do that. You can run checks on your files and automatically correct the mistakes. Or you can run your test files.

In short, Node lets you run some tools that make your life much easier as a developer.

To install Node, go to [<VPIcon icon="fa-brands fa-node"/>nodejs.org](http://nodejs.org) and install it. If you are unsure if you already have Node, you can also go to your terminal and run `node -v` to check. If you get a version number, you have Node.

![The website of Node.js](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949153110/c9e63db3-d52b-4122-a31c-6b871ed2e4b5.png)

So, why do people associate Node primarily with backend development? If the backend code is in JavaScript, the servers must run it somehow without a browser. So yes, if you are a backend developer using JavaScript, then you're most probably going to use Node. But Node is much more than that.

---

## How to Run Your Project

Now that we have Node, we can use a live server to see our site live in the browser as we develop it. Without this, you need to manually refresh the browser window every time you make a change.

![A bundler creates a package that you can run in the browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949223269/97bc1d15-4ab6-4204-88d6-257fa471f95d.png)

These tools are called bundlers because they take all your files and turn them into a neat package you can run in the browser. So why do you need them?

- They update your site live in the browser with hot reloading. When you save a file, you immediately see the result in your browser.
- As web development tools have evolved, the browser won't understand your files when you use anything more advanced. For instance, are you using React? Then, you're using the JSX syntax - the one that looks like HTML. The JSX syntax is not part of JavaScript. You need a tool to convert it into plain JavaScript. Otherwise, it won't run in your browser. Or are you using TypeScript? You also need to turn that into JavaScript. Or, if you're using SCSS or any other CSS dialect, you need to convert it to plain CSS.
- If you import libraries using the JavaScript module system, you need a live server to avoid CORS issues in your browser.

This is what bundlers do. They make sure that you can use modern-day tooling while you're developing your application, and they can also create a final production build that you can publish on the internet.

How do you pick a bundler? There are several options, and essentially, they all do the same thing. The difference between them is in their performance, configuration options, and ease of use.

The most used bundler is still [<VPIcon icon="fas fa-globe"/>webpack](https://webpack.js.org/), one of the earliest bundlers in the field. But the one that seems to have taken over the throne and gained more and more popularity is [<VPIcon icon="fas fa-globe"/>Vite](https://vite.dev/). Here's a chart from the latest edition of the State of JavaScript survey.

![[<VPIcon icon="fas fa-globe"/>The sentiment towards WebPack and Vite]](https://2024.stateofjs.com/en-US/libraries/#all_tools_experience)](https://cdn.hashnode.com/res/hashnode/image/upload/v1738947476843/195adbd5-5aba-427e-9b00-c507542235d2.png)

This chart shows that while most developers have used Webpack, they don’t necessarily love it. At the same time, Vite's popularity is rising while still maintaining a positive sentiment.

If you haven't checked out the [<VPIcon icon="fas fa-globe"/>State of JavaScript](https://stateofjs.com/en-US) survey before, I highly recommend going through it. It gives you an excellent overview of the latest trends with JavaScript. You can learn which tools and libraries people love to use and which they will abandon soon. If you feel overwhelmed by all the changes in the JavaScript ecosystem, the results of this survey can be a great guide.

Once we have a folder for our project, let's navigate to it using our terminal. The easiest way to do this is to open the folder in VS Code and then use the built-in terminal. VS Code will open the terminal with the correct folder.

Then, you can run the project in the terminal with the following command. npx is a command line tool that comes with Node. This is one of the reasons we installed Node: to be able to run commands like this.

```sh
npx vite
```

The first time you run this script, it will ask you to install Vite. Say yes. Then, it will show you the URL of a local server, which you can open in a browser to view your project.

```plaintext
  VITE v6.1.0  ready in 162 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Now, if you update a file and save the changes, the new version appears in the browser immediately. It generates a live preview of your site until you stop the script or close the terminal. You can keep it running while you're developing your site.

Once you have finished, you can press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the script. If it gets desynchronized or you break it with an error, restart it by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop it and rerunning the same script. So that's how you run a project with Vite.

---

## How to Add Libraries to Your JavaScript Project

Now that we have Node, we can also use npm or Note Package Manager to add libraries to our project. npm is another tool included with Node. So how does it work?

First, I will walk you through setting things up step by step the manual way so it's clear how the different parts come together. Then, I will show you how to automate most of these steps.

Navigate to your current folder in the terminal and run the following command to initialize the project. This command initializes a <VPIcon icon="iconfont icon-json"/>`package.json` file with some metadata.

```sh
npm init --yes
```

At this point, this file is not very interesting. It contains the project name, description, version number, and so on. You can change these values.

Now, we can add libraries to our package with the npm install command. In a [**previous article**](/freecodecamp.org/render-3d-objects-in-browser-drawing-a-box-with-threejs.md), we used Three.js to render 3D boxes in the browser.

So, as an example, let's install [<VPIcon icon="fas fa-globe"/>Three.js](https://threejs.org/). Go to your terminal again, make sure you are in the correct folder, and run the following command:

```sh
npm install three
```

This command will install Three.js. But how do you know that the keyword is three here, not Three.js?

When you don’t know the package name, you can just google npm and the name of the library you need. Or, if you don't even know the library name, you can also just search for an npm 3D library and see what Google comes up with.

We can go through each package one by one and pick one based on their capabilities and other info. These packages mostly come with descriptions and quick examples to give you an idea of what the library can do for you.

![How to pick a library to use](https://cdn.hashnode.com/res/hashnode/image/upload/v1738949563130/ce677d97-20c4-48ed-a168-b99eb01c84d4.png)

Another indicator you might want to look for is the weekly downloads and the date of the last update to ensure you select an actively maintained library that people still use.

Once you find the package you are looking for, you can see the command to install it at the top right corner: `npm i three`. The `i` here is just shorthand for install. Another way to learn how to install Three.js is to go to its official documentation and check the [installation guide](https://threejs.org/docs/index.html#manual/en/introduction/Installation).

![The <VPIcon icon="iconfont icon-json"/>`package.json` file after initializing the project and installing Three.js](https://cdn.hashnode.com/res/hashnode/image/upload/v1738952468171/7a54e0bb-d88d-428b-911c-cf7a71676562.png)

When we install a package, three things happen:

- It adds the latest version of Three.js in our <VPIcon icon="iconfont icon-json"/>`package.json` file as a project dependency.
- It also creates a package-lock file, which NPM uses to keep track of the dependencies. You should never edit the dependency section of your <VPIcon icon="iconfont icon-json"/>`package.json` file or the package-lock file manually. Instead, you should always use commands like npm install and uninstall to add, remove, or update packages.
- Finally, the <VPIcon icon="fas fa-folder-open"/>`node_modules` folder gets created. This folder contains the source code of Three.js. When we import Three.js in our project, it looks for it in this folder. The content of this folder is also something that you should never change. You can look into it if you're interested in the source code of the library that you're using, but you shouldn't change it.

If something goes wrong and you have an error with your dependencies that you can't figure out, then you can always safely delete the <VPIcon icon="fas fa-folder-open"/>`node_modules` folder and the package-lock file and reinstall your dependencies based on the <VPIcon icon="iconfont icon-json"/>`package.json` file. This is not something that you should do, but you can always go back to having a clean slate.

Now that we have installed Three.js, we can create a simple website that displays a 3D box. It's a simple HTML file and a JavaScript file with the code for the 3D box. The key here is that we import Three.js with the import statement in the JavaScript file. This import will use the package that we just installed.

![Using Three.js in a sample project](https://cdn.hashnode.com/res/hashnode/image/upload/v1738952825715/9828ea05-e75a-4fdf-b1a3-39bd3aa8e380.png)

Then, we can run the project with Vite. Using imports means that we use the module system now. Running a project with the module syntax can be a bit tricky, as the browser gives you CORS errors by default. However, as we are using Vite to run our project, it works seamlessly without any questions. That’s one of the reasons we use Vite.

If you want to learn more about building 3D games with Three.js, check out my [earlier article](https://freecodecamp.org/news/three-js-tutorial/) on building a minimalistic car in the browser.

---

## How to Get Coding Tips While You Code

The second must-have editor extension is ESLint. While Prettier formatted the code, ESLint gives you coding tips.

It helps you catch basic mistakes and avoid patterns that can cause bugs or be misleading when you try to understand the code.

Here’s a simple example where you declare a variable, but then you have a typo, and you try to use another variable that doesn't exist. ESLint will highlight this for you. It will give you an error both at the variable declaration, saying that you created a variable you don't use, and add the usage, saying that you're trying to use a variable that is not declared. With ESLint, it's easy to spot that you made a typo.

![c081f406-f964-4c4c-95ef-83cdc8e403df](https://cdn.hashnode.com/res/hashnode/image/upload/v1738953388793/c081f406-f964-4c4c-95ef-83cdc8e403df.png)

ESLint, of course, is much more complex than just being able to catch simple errors. There are also less obvious use cases where you might not understand why ESLint is complaining. Then, you can always click the link in the error popup for more details explaining why this pattern is harmful and what you can do to avoid it.

So how can we use ESLint in our projects? This time, we need to have an extension and a configuration. First, as we did with Prettier, we must install the ESLint extension. Go to your extensions, search for ESLint, and install it.

![To install ESLint go to the Extensions panel, search for ESLint, and install it](https://cdn.hashnode.com/res/hashnode/image/upload/v1738953594259/a6f02e96-069d-4463-8322-86a23c523df3.png)

We also need to set up ESLint for our project. Before we do that, we need to make sure that the project already has a <VPIcon icon="iconfont icon-json"/>`package.json` file. If you don't already have a <VPIcon icon="iconfont icon-json"/>`package.json` file, we first have to run `npm init --yes` to initialize the project. Then, we can generate an ESLint config with the following command:

```sh
npm init @eslint/config@latest
```

This script will ask you a few questions. Based on your answers, it will customize the configuration and the rules to check. For most cases, you can use the default option.

- The first time, it will ask for permission to install ESLint. Say yes.
- Then, it will ask you whether to use ESLint only for syntax checks or to find problems as well. Choose the second option to get the most help from ESLint.
- Then select that you’ll use it with JavaScript modules. Modern web development projects use the JavaScript module system. We use JavaScript modules if we have imports and exports in our code.
- Then, it will ask what framework we are using. If we select a framework, it will add framework-specific rules to our project. For instance, using it with React will force us to define the prop types. If we don't use a front-end framework, just vanilla JavaScript, then select "None of these".
- Then, it will ask if the project is using TypeScript. Choose based on your preference.
- It asks where you run the code. As we have a front-end project, select "Browser".
- Then, it will ask if you want to install the additional dependencies that are required for the rules based on your selections. Select yes.
- It will also ask what package manager we’re using. We haven't talked a lot about this, but there are multiple package managers that we can use. Select the default: npm.

![Installing ESLint](https://cdn.hashnode.com/res/hashnode/image/upload/v1738953735596/a69f62ac-b5b4-459e-8e78-6956442adfe4.png)

These were a lot of questions. Let's see what happened after we ran this command.

After this step, we have ESLint and some other dependencies based on the answers in the <VPIcon icon="iconfont icon-json"/>`package.json` file as development dependencies. Development dependency means that ESLint won't be part of your website's final code, but we need it during development.

ESLint also became part of our <VPIcon icon="fas fa-folder-open"/>`node_modules` folder, and there are many more packages here now. This is because a dependency can have other dependencies, and the dependencies of the dependencies will also be part of the <VPIcon icon="fas fa-folder-open"/>`node_modules` folder.

ESLint also created a config file that sets up the rules based on your answers. We will see how to customize the rules.

Now that ESLint is working, you should also see errors in the code once something is off. If you go to your JavaScript file and try to use an undeclared variable, ESLint will highlight the issue.

ESLint is also highly customizable. For instance, we might not want to mark an unused variable as an error. First, we go to the error popup and select the identifier of this type of error. Then, we go to the ESLint config and override this error as follows. Here, we can reduce the severity to a warning or completely turn off this rule.

![Turning off ESLint rules in the config](https://cdn.hashnode.com/res/hashnode/image/upload/v1738953834462/387e36f3-81ee-461c-ae02-3ca614c7b765.png)

```js
import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off", // Turn off the No Unused Variables rule
    }
  }
];
```

But if you're a beginner, I recommend following the rules that ESLint has by default. Sometimes, it might be annoying to fix all the seemingly harmless issues, but all these rules are based on industry best practices, so it's good to follow them. For more details, check out [<VPIcon icon="fas fa-globe"/>ESLint's documentation](https://eslint.org/docs/latest/use/configure/rules).

---

## Initialize a Project with Vite

We walked through the step-by-step process of setting up a project. We used `npm init` to initialize the project, manually set up ESLint, and ran our project with Vite. Vite can also initialize the project with a sample application and all the necessary files, which is especially handy when we set up a React project.

Let's see how to set up a vanilla JavaScript and a React project. Let's navigate to a folder in the terminal that will contain our project. We don't need to create a project folder this time because the script will make it for us. Then, run the following command to initialize a project:

```sh
npm create vite@latest
```

This command asks you a few questions.

- First, it will ask you for the project name, which will also be the name of the folder created as the project root.
- Then, it will ask what framework you use. If you don't use any framework and want plain old JavaScript, choose "Vanilla." If you use React, choose React.
- Then, it will ask you if you want to use TypeScript or JavaScript. Here, the default is TypeScript. If you're a beginner in web development, choose JavaScript. If you are more confident with your skills, then go with TypeScript. TypeScript is more complicated, but it has become the industry standard in web development, and most jobs require you to know it. As a beginner, you can go with JavaScript.

![Creating a project with Vite](https://cdn.hashnode.com/res/hashnode/image/upload/v1738953943915/884e22b0-f096-4338-a392-588b032834f4.png)

Now, we can navigate to the new folder created and check out what we have here. If you choose a vanilla JavaScript project, you can see it generated a simple application with HTML, CSS, and some JavaScript files. You can change or even delete these. You'll need an HTML file as an entry point, but you can replace the rest.

![Vite can create a sample application with an HTML, CSS, and JavaScript file](https://cdn.hashnode.com/res/hashnode/image/upload/v1738954107608/0234f409-6f78-4039-b5d1-133c8cd09530.png)

We can run this project with `npx vite` as we did before, but there’s a better way. For a real project, we want to add Vite as a development dependency to ensure consistency with the version we are using.

```json :collapsed-lines title="package.json"
{
  "name": "my-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.1.0"
  }
}
```

The <VPIcon icon="iconfont icon-json"/>`package.json` file shows that Vite has been added as a development dependency. To use this hardcoded version, we first have to install it via `npm install`. This command installs all the dependencies listed in the <VPIcon icon="iconfont icon-json"/>`package.json` file.

```sh
npm install
```

This <VPIcon icon="iconfont icon-json"/>`package.json` file now also has a scripts section. This section can define scripts to run your app locally, create a production build, or test your application. You can run them with `npm run`. So, for instance, to run the application, you can open the terminal with the correct folder and run the following command.

```sh
npm run dev
```

This runs the script labeled as “dev” in the scripts section, which will run the Vite version we just installed with `npm install`.

Vite does not install ESLint when you create a vanilla project, but you can always install it manually, as we did before with `npm init @eslint/config@latest`.

If you choose React as a framework when we initialize the project, we will have a couple more files. For instance, we have an ESLint config with the recommended React settings. We also have a Vite config that enables us to use React and a sample application that we can run.

![Vite can also create a React project for you](https://cdn.hashnode.com/res/hashnode/image/upload/v1738954174340/26c5a9a5-b983-4ed7-8e43-fbab4400e08b.png)

To run this app, we need to install the dependencies. So, let's go to the terminal and run `npm install`. This will install all the dependencies, including React. Then, we can run this app with `npm run dev`, and we will have a working React application.

---

## Summary

In this article, we set up and run a front-end project with Vite. We also covered how to find and add dependencies, how to have consistent and automatic formatting with Prettier, and how to avoid bugs with ESLint.

What happens once you finish developing your app? How do you upload it to the web and share it with the world? That's the topic of a future article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript Tutorial - How to Set Up a Front End Development Project",
  "desc": "Let’s say you plan to build a website. Before you start, you want to set up a few tools to make your life easier. But which tools should you have? The JavaScript ecosystem is changing so fast that it can be overwhelming to pick the best tools to use....",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-set-up-a-front-end-development-project.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
