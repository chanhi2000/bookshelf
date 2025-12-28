---
lang: en-US
title: "Build React custom component library with Theme UI"
description: "Article(s) > Build React custom component library with Theme UI"
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
      content: "Article(s) > Build React custom component library with Theme UI"
    - property: og:description
      content: "Build React custom component library with Theme UI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-react-custom-component-library-theme-ui.html
prev: /programming/js-react/articles/README.md
date: 2022-03-03
isOriginal: false
author:
  - name: Clara Ekekenta
    url : https://blog.logrocket.com/author/claraekekenta/
cover: /assets/image/blog.logrocket.com/build-react-custom-component-library-theme-ui/banner.png
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
  name="Build React custom component library with Theme UI"
  desc="Learn how to build and publish a custom component library in React with Theme UI using TypeScript. Follow our tutorial."
  url="https://blog.logrocket.com/build-react-custom-component-library-theme-ui"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-react-custom-component-library-theme-ui/banner.png"/>

React is a JavaScript toolkit that facilitates the creation of beautiful user interfaces for both online and mobile apps. It easily interfaces with other JavaScript frameworks and libraries and has short, reusable components.

![React Logo](/assets/image/blog.logrocket.com/build-react-custom-component-library-theme-ui/banner.png)

Because of their great modularity, React component libraries speed up UI development and also provide a lot of freedom. There are several [**popular React UI libraries**](/blog.logrocket.com/top-16-react-component-libraries-kits-ui.md); however, they may not offer the level of customization needed for all projects.

In this tutorial, we’ll review how to build and publish a custom component library in React with [<VPIcon icon="fas fa-globe"/>Theme UI](https://theme-ui.com) using TypeScript.

::: info What is Theme UI?

Theme UI is a library that uses constraint-based design concepts to create themeable user interfaces. With a broad API for best-in-class developer ergonomics, Theme UI can be used to create bespoke component libraries, design systems, web applications, Gatsby themes, and more.

:::

## Getting started

This hands-on tutorial has the following prerequisites:

- [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/) installed
- Ubuntu 20.04, or the OS of your choice
- VS Code, or any IDE of your choice

---

## Project setup

We’ll start by running the following command to create a folder for our project:

```sh
mkdir themecomponentui && cd themecomponentui
```

Next, we’ll initialize a new React project using the `npm init` command to create a <VPIcon icon="iconfont icon-json"/>`package.json` file. Then, we’ll install React and TypeScript with the following command:

```sh
npm i -D react @types/react typescript
```

The `-D` flag in the above command denotes that the modules should be installed as `devDependencies` because we’ll need them during our build process.

With React and TypeScript installed, let’s organize our project according to the below folder structure:

```sh title="file structure"
📦themecomponentui  
┣ 📂src  
┃ ┣ 📂components  
┃ ┃ ┣ 📂Button  
┃ ┃ ┣ 📂Input
```

Now, let’s configure TypeScript for our project.

---

## Configuring TypeScript

We’ll use TypeScript to build the components that will enable us to use the library as a module.

First, we’ll configure TypeScript by creating a <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file using the following command:

```sh
npx tsc --init
```

Then, we’ll update the <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file with the following snippet:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "jsx": "react",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "emitDeclarationOnly": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
  },
  "exclude": [
    "dist",
    "node_modules",
  ],
}
```

In the above code, we added the following configurations:

- `"jsx": "react"`: Transforms JSX code into React code
- `"skipLibCheck": true`: Skips type checking the declaration files
- `"module": "ESNext"`: Generates Modern JavaScript modules for our library (ES6 or higher)
- `"declarationDir": "types"`: Sets up a directory for the .d.ts files
- `"sourceMap": true`: Enables mapping of JavaScript code back to its TypeScript file origins for debugging
- `"outDir": "dist"`: Sets up the directory for project build
- `"moduleResolution": "node"`: Follows Node.js rules for finding modules
- `"emitDeclarationOnly": true`: Allows Rollup to generate JavaScript export type declarations

Now that TypeScript is configured, let’s move on to configuring Rollup.

---

## Configuring Rollup

[<VPIcon icon="fa-brands fa-npm"/>`rollup`](https://npmjs.com/package/rollup) is a JavaScript module bundler that combines tiny chunks of code to create something larger and more sophisticated, like a library or application. Instead of using unique solutions like CommonJS and AMD, it leverages the standardized ES module structure for code.

To get started with Rollup, we’ll install it using the following command:

```sh
npm i -D rollup
```

In the above code, we added the `-D` flag to the Rollup installation command to add it to our `devDependencies`. Once the installation is completed, we’ll also install the following Rollup plugins:

- [<VPIcon icon="fa-brands fa-npm"/>`@rollup/plugin-node-resolve`](https://npmjs.com/package/@rollup/plugin-node-resolve): To resolve third-party modules in `node_modules`
- [<VPIcon icon="fa-brands fa-npm"/>`@rollup/plugin-typescript`](https://npmjs.com/package/@rollup/plugin-typescript): For seamless Rollup and TypeScript integration
- [<VPIcon icon="fa-brands fa-npm"/>`@rollup/plugin-commonjs`](https://npmjs.com/package/@rollup/plugin-commonjs) : To convert CommonJS modules to ES6 modules
- [<VPIcon icon="fa-brands fa-npm"/>`@rollup-plugin-dts`](https://npmjs.com/package/rollup-plugin-dts): To rollup our `.d.ts` files
- [<VPIcon icon="fa-brands fa-npm"/>`@types/rollup-plugin-peer-deps-external`](https://npmjs.com/package/@types/rollup-plugin-peer-deps-external) : To automatically externalize `peerDependencies` in a rollup bundle
- [<VPIcon icon="fa-brands fa-npm"/>`@rollup-plugin-terser`](https://npmjs.com/package/rollup-plugin-terser): To minify the generated ES bundle

We’ll run the following command to install the plugins:

```sh
npm i -D @rollup/plugin-node-resolve \
@rollup/plugin-commonjs \
@rollup/plugin-typescript \
rollup-plugin-peer-deps-external \
rollup-plugin-terser \
rollup-plugin-dts
```

When the installation is complete, we’ll configure Rollup by creating a <VPIcon icon="fa-brands fa-js"/>`rollup.config.js` file in the project root directory using the following snippets:

```js title="rollup.config.js"
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      }, {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom"]
  }, {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
```

In the above code, we configured CommonJS and ES modules to handle the project build process. This will enable us to use named export and tree shaking. It also provides enhanced static analysis, browser support, and compatibility with other JavaScript versions.

Next, we need to specify the path to the CommonJS files and ES modules in the <VPIcon icon="iconfont icon-json"/>`package.json` file. We’ll open the <VPIcon icon="iconfont icon-json"/>`package.json` file and add the following snippet configurations:

```json title="package.json"
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
}
```

Finally, we’ll add the build command inside the `scripts` object:

```json title="package.json"
{
  ...
  "scripts": {
    ...
    "build": "rollup -c"
  },
  ...  
}
```

---

## Creating custom components

Now, let’s create our custom components. First, we’ll install Theme UI:

```sh
npm install -D theme-ui \
@emotion/react \
@emotion/styled \
@mdx-js/react
```

Theme UI is a flexible API framework, so we can choose to use a library of primitive UI components or use the [<VPIcon icon="fas fa-globe"/>`sx` prop](https://theme-ui.com/sx-prop/). For the demonstration purpose of this tutorial, we’ll use the `sx` prop.

---

## Creating the button component

Next, let’s create the button component. We’ll create <VPIcon icon="fa-brands fa-react"/>`Button.tsx` and <VPIcon icon="iconfont icon-typescript"/>`index.ts` files in the <VPIcon icon="fas fa-folder-open"/>`src/components/Button` folder.

Open the <VPIcon icon="fa-brands fa-react"/>`Button.tsx` file and add the following snippets:

```tsx title="src/compmonents/Button/Button.tsx"
/** @jsxImportSource theme-ui */
import * as React from "react";
import { MouseEventHandler } from "react";

export interface ButtonProps {
  label?: string;
  color?: string;
  fontFamily?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  return (<>
    <button 
      onClick={props.onClick}
      sx={{ color: props.color, fontFamily: props.fontFamily }}
    >
      {props.label}
    </button>
  </>);
};
export default Button;
```

In the above code, we added the `/** @jsxImportSource theme-ui */` comment to the top of the file to enable the Theme UI `sx` props.

Next, we imported the React framework `MouseEventHandler` method to enable button click events.

Then, we defined the `interface` `ButtonProps`, specifying the `Button` component properties. The `?` symbol denotes an optional property (e.g., `color?: string`), meaning TypeScript will not throw an error if we do not provide that property in the component.

Next, we created the `Button` component and set the styling using Theme UI’s `sx` props with other properties.

Now, let’s export the `Button` component in the <VPIcon icon="iconfont icon-typescript"/>`index.ts` file using the following snippet:

```ts title="src/components/Button/index.ts"
export { default } from './Button'
```

---

## Creating the `Input` component

We’ll create the `Input` component by creating <VPIcon icon="fa-brands fa-react"/>`Input.tsx` and <VPIcon icon="iconfont icon-typescript"/>`index.ts` files in the <VPIcon icon="fas fa-folder-open"/>`src/components/Input` folder.

---

Open the <VPIcon icon="fa-brands fa-react"/>`Input.tsx` file, and add the following snippet:

```tsx title="src/components/Input/Input.tsx"
/** @jsxImportSource theme-ui */
import * as React from "react";
import { ChangeEventHandler } from "react"

export interface InputProps {
  label?: string;
  disabled?: boolean;
  fontFamily?: string;
  placeholder?: string;
  paddding?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: InputProps) => {
  return (<>
    <div>
      <label htmlFor={props.id ? props.id : 'text'}>{props.label}</label>
      <input type='text' id={props.id ? props.id : 'text'} disabled={props.disabled} placeholder={props.placeholder} sx={{ padding: !props.paddding && "4px", display: 'block' }}></input>;
    </div>
  </>);
};
export default Input;
```

In the above code, we added the `/** @jsxImportSource theme-ui */` comment at the start of the file to use the Theme UI’s `sx` prop to style the component.

Next, we defined the `Input` component’s `interface`. The `onChange?` property will enable us to add an `onChange` event to the input.

We created the `Input` component, which takes in `props` that match the `InputProps` interface, and styled the component using Theme UI’s `sx` prop and other properties.

Now, let’s export the `Input` component in the <VPIcon icon="iconfont icon-typescript"/>`index.ts` file using the following command:

```ts title="src/components/Input/index.ts"
export { default } from './Input'
```

We’ll create an <VPIcon icon="iconfont icon-typescript"/>`index.ts` file in the <VPIcon icon="fas fa-folder-open"/>`src/components` folder, and export the components like so:

```ts title="src/components/index.ts"
export { default as Button } from './Button';
export { default as Input } from './Input'
```

Now, we’ll build the project:

```sh
npm run build
```

The above command will create a <VPIcon icon="fas fa-folder-open"/>`dist` folder in the project root directory.

---

## Publishing to npm

The next step is to publish our newly created components to npm so that we can use them in our project and share them with friends.

To get started, log into your npm account:

```sh
npm login
```

If you don’t have an account, you can [<VPIcon icon="fa-brands fa-npm"/>sign up for an npm account here](https://npmjs.com).

After logging in, enter your account credentials to get authenticated. An OTP code will be sent to your registered email address. Enter the OTP pin when requested.

Now, publish your package by running the following command:

```sh
npm publish --access public
```

You’ve successfully published a React custom component library to npm!

---

## Conclusion

In this tutorial, we introduced the Theme UI library and demonstrated how to use Theme UI to build a custom React component library. We also demonstrated how to configure TypeScript and Rollup for the project build and how to publish a custom library to npm. You can extend this tutorial by creating more components with Theme UI, such as forms, boxes, and grids.

Thanks for reading. Please feel free to share and comment below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build React custom component library with Theme UI",
  "desc": "Learn how to build and publish a custom component library in React with Theme UI using TypeScript. Follow our tutorial.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-react-custom-component-library-theme-ui.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
