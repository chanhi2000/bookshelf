---
lang: en-US
title: "A Complete Guide to Beginning with TypeScript"
description: "Article(s) > A Complete Guide to Beginning with TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Complete Guide to Beginning with TypeScript"
    - property: og:description
      content: "A Complete Guide to Beginning with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-complete-guide-to-beginning-with-typescript.html
prev: /programming/ts/articles/README.md
date: 2024-09-06
isOriginal: false
author: Cody Lindley
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3728
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Complete Guide to Beginning with TypeScript"
  desc="typescript has a steep learning curve, steeper than javascript itself. understanding both of these at the same time can be overwhelming."
  url="https://frontendmasters.com/blog/a-complete-guide-to-beginning-with-typescript/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3728"/>

This guide is not itself the means to learn TypeScript. This guide addresses issues around getting started (obstacles, preliminary knowledge, etc.) and then points you to curated resources to start learning. Consider this material a prologue or an introduction to the learning process itself so, you have the needed background and context before beginning the learning process.

::: note Prerequisite Knowledge

The list below briefly highlights the knowledge needed before learning TypeScript:

- An intermediate understanding of JavaScript, especially the nature of JavaScript [<FontIcon icon="fa-brands fa-firefox"/>data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#data_types) and the difference between pass-by-value vs. pass-by-reference, is **required**.
- A basic understanding of [<FontIcon icon="fa-brands fa-firefox"/>the difference between dynamically typed languages vs. statically typed languages and weakly typed languages vs. strongly typed languages](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#dynamic_and_weak_typing) in the context of JavaScript.
- The TypeScript compiler is a Node.js CLI tool that takes in TypeScript and outputs JavaScript. One will need a working knowledge of Node.js, npm, and packages. While one can circumvent this learning curve by starting with the [<FontIcon icon="iconfont icon-typescript"/>TypeScript Playground](https://typescriptlang.org/play), eventually, you’ll want to install and use the TypeScript compiler on your local machine via Node.js. Thus, a working understanding of Node.js, npm, and command line tools is needed to run TypeScript on your local computer.

:::

---

## Helpful Background on TypeScript

- TypeScript is a free to use open-source tool maintained by Microsoft. The source can be found on [GitHub (<FontIcon icon="iconfont icon-github"/>`microsoft/TypeScript`)](https://github.com/microsoft/TypeScript).
- [<FontIcon icon="fa-brands fa-firefox"/>JavaScript is a dynamically typed language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#dynamic_and_weak_typing); in simple terms, this means the language allows you to switch value types after definition (aka re-assignment). In statically typed languages assigning a string value to a variable and then re-assigning the value to a be a number value will throw an error. JavaScript does not throw an error when this type of runtime data value switching occurs. JavaScript dynamically re-assigns the type. [<FontIcon icon="fa-brands fa-firefox"/>JavaScript is also weakly typed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion), meaning that JavaScript can convert values depending on how they are used. For example, if you try and add a string to a number, JavaScript will not throw an error it will convert the number to a string and then combine the strings. For example, in JavaScript `"1"+1` becomes `11` because JavaScript converts the number 1 to a string and then combines `"1" + "1"`, which is `"11"`. TypeScript aims to change/eliminate both the dynamic and weakly typed nature of JavaScript just described.
- TypeScript is not one thing. TypeScript is a combination of the following three foundational things:
  - **TypeScript** **Type System:** A syntax layered over the top of JavaScript for the purpose of making JavaScript a statically/strongly typed language (aka “TypeScript Types” or “TypeScript Type System”).
  - **TypeScript Compiler:** A tool that both 1. interrupts (aka type checking) TypeScript syntax added to JavaScript as well as 2. converts TypeScript to JavaScript (aka the “TypeScript Compiler” or “tsc”). The compiler is provided as a Node.js [npm package (<FontIcon icon="fa-brands fa-npm"/>`typescript`)](https://npmjs.com/package/typescript) which provides the “tsc” cli tool.
  - **TypeScript** **Language Service:** The TypeScript language service used by things like VSCode for analyzing TypeScript code as you type it (aka [<FontIcon icon="iconfont icon-vscode"/>IntelliSense](https://code.visualstudio.com/docs/typescript/typescript-tutorial#_intellisense), note that the [<FontIcon icon="iconfont icon-vscode"/>compiler is separate from the language service](https://code.visualstudio.com/docs/typescript/typescript-compiling#_compiler-versus-language-service))
- TypeScript is incredibly popular amongst professional developers. If you want to be a professional web developer or Node.js developer, it will likely be the case today that you will need to know TypeScript.
- TypeScript itself is not sent to a JavaScript runtime. TypeScript must be converted or built by a compiler to standard ECMAScript before it can be run by a JavaScript engine within a host environment (e.g., web browsers and Node.js). The job of transforming TypeScript to JavaScript is handled by the TypeScript compiler.
- Anything that is standard JavaScript is valid TypeScript (i.e., TypeScript is a superset of JavaScript). When you are writing TypeScript-specific syntax (e.g., Type Annotations) you are using syntax that is not standard JavaScript (i.e., not in the ECMAScript specification). While TypeScript can be converted to valid JavaScript, TypeScript itself is not valid JavaScript. If a JavaScript runtime executes TypeScript, it will produce a runtime error because, again, TypeScript is not valid JavaScript.
- TypeScript promises that it will never change the behavior of your program; it will only ever remove itself from your JavaScript.
- One should consider that adopting TypeScript is signing on to a subjective and stricter layer of control beyond JavaScript standards. This means that TypeScript requires not only valid JavaScript but also valid TypeScript. In this sense, TypeScript is another layer of control guiding how one should write JavaScript (e.g., TypeScript aims to change the fact that JavaScript has dynamic types and is weakly typed). When Typescript is not valid, you get an error in addition to the potential errors that come from invalid JavaScript.
- TypeScript is currently in a class of its own. Flow was a similar solution from the past, but it is less popular today. Most developers seeking to write JavaScript and use type annotations use TypeScript. The alternative to solutions like TypeScript and Flow entails abandoning JavaScript for a custom language with a built-in type system that compiles to JavaScript (e.g., Elm, PureScript, ClojureScript, etc.). Compared to languages with built-in type systems, TypeScript is a bolted-on solution to JavaScript, not a new language itself.
- TypeScript can also be used to compile today’s ECMAScript to older versions of ECMAScript (e.g., ES 2023 to EE5). This aspect of TypeScript overlaps with tools like [<FontIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/), [SWC](https://swc.rs/), [esbuild](https://github.com/evanw/esbuild), and [Surcase](https://github.com/alangpierce/sucrase#sucrase/). Note that it’s possible to use TypeScript for its type engine and then hand off compiling to tools like [<FontIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/), [SWC](https://swc.rs/), [esbuild](https://github.com/evanw/esbuild), and [Surcase](https://github.com/alangpierce/sucrase#sucrase/) or use TypeScript alone for both ECMAScript conversion and its type-checking engine.
- Similar to [<FontIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/), [SWC](https://swc.rs/), [esbuild](https://github.com/evanw/esbuild), and [Surcase](https://github.com/alangpierce/sucrase#sucrase/), TypeScript can compile JavaScript from [staged ECMAScript proposals](https://github.com/tc39/proposals) that have not yet been officially added to ECMAScript (i.e. make use of JavaScript code before it becomes part of JavaScript). This allows you to use new futuristic non-standard changes to the ECMAScript language today.
- JavaScript files are typically named with a file extension of “.js”. TypeScript files are typically named with a file extension of “.ts”. If you are using JSX in “.ts” files, these files will have the file extension “.tsx”.
- While not necessarily true in the past, as of today TypeScript aims to be compliant with the direction of ECMAScript. Setting aside type annotations, today TypeScript does not try and introduce non-standard JavaScript syntax that has zero paths to potentially being adopted by JavaScript.

---

## Why Learn/Use TypeScript?

Today, most developers who professionally use JavaScript to build software use TypeScript. They do so for the following reasons: By learning TypeScript and learning it well, you’ll better understand the complicated parts of JavaScript, which will make you a better JavaScript developer.

- It is not uncommon that employers today require or prefer the use of TypeScript to maintain large repositories of JavaScript code. (i.e., to compete in the job market today, you need TypeScript knowledge).
- By using a strongly typed version of JavaScript with clearly defined guard rails, larger teams can enforce strict coding practices that can safeguard the code against less experienced developers.
- The authoring experience through tooling is a superior experience to authoring plain JavaScript. (e.g., [<FontIcon icon="iconfont icon-vscode"/>VS Code offers an enhanced developer experience when using TypeScript](https://code.visualstudio.com/docs/languages/typescript)).

<SiteInfo
  name="TypeScript Programming with Visual Studio Code"
  desc="Get the best out editing TypeScript with Visual Studio Code."
  url="https://code.visualstudio.com/docs/languages/typescript/"
  logo="https://code.visualstudio.com/favicon.ico"
  preview="https://code.visualstudio.com/assets/docs/languages/typescript/typescript-social.png"/>

---

## Getting Started with TypeScript Obstacles

### Steep Learning Curve

Adding on TypeScript can be extremely overwhelming both academically and in practice. This is especially true for those just learning JavaScript as well as those who are seasoned JavaScript developers.

### More Rules, More Errors

TypeScript adds additional rules to the JavaScript language regarding data types and will throw a TypeScript error when JavaScript does not. This can be a bit confusing and frustrating. It can’t be stated enough that TypeScript is bossy and a bit messy, especially if TypeScript expects that all values avoid the [<FontIcon icon="iconfont icon-typescript"/>`any`](https://typescriptlang.org/docs/handbook/2/everyday-types.html#any) type.

### More Code, More Development Time/Management

TypeScript type annotations are nonstandard syntactical overhead. It adds more lines of code to your files (i.e., type annotations) and more files (i.e., type declarations) to your code base. It is simply more information to take in and manage. Given a large code base authored and maintained by developers of differing skills, this may be ideal. But it does have a cost. Grokking TypeScript and TypeScript annotations and appeasing the TypeScript compiler can be frustrating, daunting, and time-consuming.

The fact is, that TypeScript takes more time and adds lines of complexity. Many teams believe the value provided to be worth the overhead. The cost of implementation vs. the value provided is a complicated equation with many variables. How developers evaluate this equation often will say more about the developers than it says objectively about code quality, code durability, or code longevity.

### A Compiler Step

While most professionals are already accustomed to the tooling/building processes that modern JavaScript development requires TypeScript is a far cry from simply writing some code that is executed by a web browser by way of a script element. TypeScript comes with the overhead of compiling it to standard JavaScript.

### Typescripts Type System Brings Strongly Typed Enforceable Mechanics to JavaScript

TypeScript is most well-known for its type system. I’ll briefly explain the tenants and implications of this system so that one can minimally begin to understand its value.

To review, the [<FontIcon icon="fa-brands fa-firefox"/>JavaScript language has eight types of values that can be used by the language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#data_types):

1. `Boolean`
2. `null`
3. `undefined`
4. `Number`
5. `BigInt`
6. `String`
7. `Symbol`
8. `Object`

Behind the scenes, JavaScript dynamically assigns one of these types to JavaScript values and will transparently allow [<FontIcon icon="fa-brands fa-firefox"/>reassignment and coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#dynamic_and_weak_typing) of these types. TypeScript’s main objective is to change this aspect of JavaScript.

In the code example below, I’m using several JavaScript data types (*i.e.*, Strings, Objects, and a Number):

```ts
let firstName = "Sally";
let lastName = "Brown";
let age = 25;

let user1 = {
  firstName: "Bill",
  lastName: "Fae",
  age: 45,
};

const getFullName = (user1) => {
  return `${user.firstName} ${user.lastName}`;
};

console.log(getFullName(user)); // logs "Bill Fae"`
```

Without TypeScript, JavaScript would have no problem if we decided to change the value of age from a number to a string. Or if we decided to change the shape of the user object by adding a new property to the user Object called middleName. JavaScript would also be ok if we passed the getFullName() function an empty object, until the code is run.

However, by using TypeScript and its type system, we can add type annotations to JavaScript that will make JavaScript act more like a programming language that does not allow type reassignment, changes, and JavaScript runtime errors.

Below I am taking the previous code and adding all possible TypeScript type annotations to the JavaScript. You should carefully contrast this code to the previous code with no type annotations.

```ts
let firstName: string = "Sally";
let lastName: string = "Brown";
let age: number = 25;

// define the shape of a user object before defining a user object
interface UserTypeInterface {
  firstName: string;
  lastName: string;
  age: number;
}

// define a user, annotate user with a type interface
let user1: UserTypeInterface = {
  firstName: "Bill",
  lastName: "Fae",
  age: 45,
};

// create a function, that only accepts values matching our UserTypeInterface,
// also, define what should be returned from this function
const getFullName = (user1: UserTypeInterface): string => {
  return `${user.firstName} ${user.lastName}`;
};

console.log(getFullName(user)); // logs "Bill Fae"`
```

By using TypeScript type annotations, we have layered a degree of control over our JavaScript, which enforces patterns from strongly typed languages. For [<FontIcon icon="iconfont icon-typescript"/>example,](https://typescriptlang.org/play?#code/DYUwLgBAZglgTgZzAOQIYFsQC4lxgOwHMIBeCAcgGVVhgBPcgbgFgAoUSYVJNTHMPEVIUAQnAD2Ad3xM2HCKkLZ8AV3QAjEHGEAmAKwtWbRSGHkdANnJs2BMFqioAxqYCqCLQBU6ABxABJfHs4RxcIAG82CGjoeB4MbFwCQiiYrni+JKJU6JMsVQ0tNgBfG3ZwCBUPOCx3L18AoIdnUzJI1hjYxBQErFEYWnIAGhyIdJ6+CgAxVBBh0byIABY9ErKqrQA6dBgAE13QXlaKSnsANznDNidxfCQIJTAplVoj4QAKDbgASn5BYhIAD4Iqk4OAVHB8BAAAYAEnCX02sG6R2KEHhiPGqOhhmKVyMBLKQA) I can no longer change the type of value that age can contain, or the shape of the user object, or create a function that will accept any type of value. What JavaScript would permit in our program is not permitted when using TypeScript. In the video below you will see that TypeScript reports issues where JavaScript does not.

The example above, where I explicitly provided all possible type annotations, is a bit contrived because explicitly providing all possible type annotations is verbose and ignores the fact that the type system can perform [<FontIcon icon="iconfont icon-typescript"/>type inference](https://typescriptlang.org/docs/handbook/type-inference.html#handbook-content) and infer certain types without explicit annotations.

The type system can infer a lot, but it does not infer everything needed to take full advantage of TypeScript. Most developers use inference where they can and then provide additional annotations where needed. In the code below, a mixture of inferences and annotations are used, which is likely closer to the reality of developing TypeScript in the wild.

```ts
let firstName = "Sally"; // simple values can be infered
let lastName = "Brown"; // simple values can be infered
let age = 25; // simple values can be infered

// this is done so that the shape of this object is required
// the shape of an object can't be infered, we have to define it
interface UserTypeInterface {
  firstName: string;
  lastName: string;
  age: number;
}

let user1: UserTypeInterface = {
  firstName: "Bill",
  lastName: "Fae",
  age: 45,
};

// explicitly tell this function the exact shape of the value passed in
// without this, the value passed into the fuction is given a type of any
// which depending upon how you configure TypeScript will throw an error
const getFullName = (user1: UserTypeInterface) => {
  // infer the return type
  return `${user.firstName} ${user.lastName}`;
};

console.log(getFullName(user)); // logs "Bill Fae"`
```

We have only scratched the surface of the type system and type annotations in TypeScript. Imagine if you needed optional values. Or values that are of a limited specific value only. TypeScript can do all that and much more.

As a small and simple example in the code below, I am telling TypeScript that the User object has an optional age property and a property called group with a fixed set of potential property values.

```ts
interface UserTypeInterface {
  firstName: string;
  lastName: string;
  // used ?:, property is not required, but if it is provide has to be number
  age?: number;
  group: "blueTeam" | "redTeam"; // has to be "blueTeam" or "redTeam"
}

let user1: UserTypeInterface = {
  firstName: "Bill",
  lastName: "Fae", // age is optional
  group: "blueTeam",
};
```

The takeaway here should not be an in-depth understanding of the type system or annotations. I’m only trying to communicate broadly the point of the type system and roughly what it fundamentally provides above and beyond JavaScript.

### TypeScript Reports JavaScript Syntax Errors as well as TypeScript Type Errors

TypeScript not only reports issues found by the type system, but it can also report JavaScript syntax errors that will occur during runtime. By using TypeScript, these errors can be surfaced before runtime.

The [<FontIcon icon="iconfont icon-typescript"/>code](https://typescriptlang.org/play?#code/MYewdgzgLgBAagQQDIFUCiMC8MDkAzEEHAbgFgAoCxVDbHAI0JIooBsBTWAWwE8B5egCt2wWNgDeMCjBgAHAE4hZARgBceAIasI7KeRkKlAJlXKANHoOLZqsCCgARdngCWYdgBMKAXxaVyQA) in the video below is filled with JavaScript syntax errors which TypeScript will report on.

### TypeScript & VS Code Provide a Superior Authoring Environment for JavaScript

Developers use TypeScript because it can convert the language into a language that mimics strongly typed languages by way of the type-system while also reporting JavaScript syntax errors without manually executing the JavaScript. However, it’s not until these two aspects of TypeScript are combined with TypeScript development tools these merits become objective benefits.

If a developer has the TypeScript compiler installed, then development environments like VS Code become objectively better in the following ways (click on the links and read the explanations in the VS code documentation):

<SiteInfo
  name="TypeScript editing with Visual Studio Code"
  desc="Learn about TypeScript editing with Visual Studio Code."
  url="https://code.visualstudio.com/docs/typescript/typescript-editing/"
  logo="https://code.visualstudio.com/favicon.ico"
  preview="https://code.visualstudio.com/opengraphimg/opengraph-docs.png"/>

<SiteInfo
  name="TypeScript refactoring with Visual Studio Code"
  desc="Learn about TypeScript refactorings supported by Visual Studio Code."
  url="https://code.visualstudio.com/docs/typescript/typescript-refactoring/"
  logo="https://code.visualstudio.com/favicon.ico"
  preview="https://code.visualstudio.com/opengraphimg/opengraph-docs.png"/>

<SiteInfo
  name="TypeScript debugging with Visual Studio Code"
  desc="TypeScript debugging with Visual Studio Code."
  url="https://code.visualstudio.com/docs/typescript/typescript-debugging/"
  logo="https://code.visualstudio.com/favicon.ico"
  preview="https://code.visualstudio.com/assets/docs/languages/typescript/typescript-social.png"/>

### TypeScript Can Compiling Current and Next Generation ECMAScript to Older ECMAScript

To review, TypeScript can:

1. Convert JavaScript into a language that resembles a strongly typed language.
2. Preemptively notify you of JavaScript syntax errors while authoring.
3. Integrate into VS Code and provide a superior development environment for authoring and maintaining code written in JavaScript.

Lastly, it can take the most current ECMAScript specifications, as well as ECMAScript proposals (i.e., next-generation JavaScript), and compile it into older versions of JavaScript. This allows developers to make use of the most current and even futurist parts of JavaScript today but support much older runtimes that might not support current and futurist parts of JavaScript.

---

## Before Learning Starts

We suggest becoming familiar with the following before you begin hands-on learning:

- [<FontIcon icon="iconfont icon-typescript"/>TypeScript Playground](https://typescriptlang.org/play?strict=false&q=410#handbook-0) – A no-setup online simple TypeScript editor and compiler with tutorials.
- [<FontIcon icon="iconfont icon-vscode"/>TypeScript in VS Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial) (or how TypeScript can augment your code editor of choice)
- [<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en/) & [<FontIcon icon="fa-brands fa-npm"/>npm](https://docs.npmjs.com/cli/v6)
- [<FontIcon icon="iconfont icon-typescript"/>TypeScript Compiler](https://typescriptlang.org/docs/handbook/compiler-options.html) (aka, tsc) – the Node.js CLI tool provided by the [<FontIcon icon="fa-brands fa-npm"/>`typescript` package](https://npmjs.com/package/typescript).

---

## Start Learning

### Step 1 – Introductory TypeScript

Video Courses:

- [TypeScript Fundamentals, v4](https://frontendmasters.com/courses/typescript-v4/) \[$\]

Reading Material:

- [TypeScript for the New Programmer](https://typescriptlang.org/docs/handbook/typescript-from-scratch.html) \[free\]
- [Compiling TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling) \[free\]
- [Editing TypeScript](https://code.visualstudio.com/docs/typescript/typescript-editing) \[free\]
- [TypeScript for JavaScript Programmers](https://typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) \[free\]
- [TypeScript for Functional Programmers](https://typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html) \[free\]
- [TypeScript Fundamentals](https://typescript-training.com/course/fundamentals-v3), v3 \[free\]
- [The TypeScript Handbook](https://typescriptlang.org/docs/handbook/intro.html) \[free\]
- [Learning TypeScript](https://learningtypescript.com/) \[$\]

Exercises:

- [TypeScript Tooling in 5 minutes](https://typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html) \[free\]
- [Learn TypeScript](https://codecademy.com/learn/learn-typescript) \[free – account required\]

### Step 2 – TypeScript Intermediate to Advanced Concepts

Video Courses:

- [TypeScript Learning Path](https://frontendmasters.com/learn/typescript/)
  - [Intermediate TypeScript, v2](https://frontendmasters.com/courses/intermediate-typescript-v2/) \[$\]
  - [Making TypeScript Stick](https://frontendmasters.com/courses/typescript-practice/) \[$\]

Reading Material:

- [Refactoring TypeScript](https://code.visualstudio.com/docs/typescript/typescript-refactoring) \[free\]
- [Debugging TypeScript](https://code.visualstudio.com/docs/typescript/typescript-debugging) \[free\]
- [Intermediate TypeScript](https://typescript-training.com/course/intermediate-v1/01-project-setup/) \[free\]
- [Making TypeScript Stick](https://typescript-training.com/course/making-typescript-stick) \[free\]
- [TypeScript Playground Handbook](https://typescriptlang.org/play?strict=false&q=410#handbook-0) \[free\]

Exercises:

- [TypeScript Playground Examples](https://typescriptlang.org/play?strict=false&q=410#handbook-2) (click on “Examples”, read comments) \[free\]

### Step 3 – TypeScript & Friends

Video Courses:

- [Full Stack TypeScript](https://typescript-training.com/course/full-stack-typescript) – Combines TypeScript and GraphQL \[$\]
- [React and TypeScript, v2](https://frontendmasters.com/courses/react-typescript-v2/) \[$\]
- [Enterprise TypeScript](https://frontendmasters.com/courses/enterprise-typescript/) \[$\]
- [JavaScript and TypeScript Monorepos](https://frontendmasters.com/courses/monorepos/) \[$\]

---

## Commonly Asked Questions

### Should I learn JavaScript and TypeScript at the same time?

If you are new to programming, JavaScript should be isolated and learned before learning TypeScript. TypeScript has a steep learning curve, steeper than JavaScript itself. Understanding both of these at the same time can be overwhelming. Before you approach TypeScript, learn JavaScript in-depth! Especially the fact that JavaScript is a [<FontIcon icon="fa-brands fa-firefox"/>dynamic and weakly typed language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#dynamic_and_weak_typing).

### Is TypeScript itself a programming language?

TypeScript is not a programming language itself. JavaScript is the programming language that TypeScript requires to be considered a programing language. When one suggests that TypeScript is a programming language, they are undoubtedly trying to communicate the belief that type annotations are a language. The type-annotation syntax intermingles with JavaScript syntax at development time. It is technically not a language without JavaScript. That is why “a superset of JavaScript” or “JavaScript with types” are the phrases used to describe TypeScript.

This is JavaScript:

```js
let count = 2;
```

This is JavaScript with a simple TypeScript type annotation (i.e., `: number`):

```ts
let count: number = 2;
```

The programming language in question is still JavaScript, even though a TypeScript type annotation is being added to the JavaScript.

### What is the TypeScript Compiler?

The TypeScript compiler (aka, tsc) is a Node.js CLI tool that can:

1. Compile/transpile TypeScript to JavaScript.
2. Statically analyze the validity of Typescript and JavaScript based on TypeScript rules, configurations, and type annotations or the lack thereof (can also be used by code editors to provide this information as you author JavaScript + TypeScript annotations).

To gain a basic understanding of the compiler, I’m going to walk us through a simplistic use of the tsc Node.js CLI tool.

Go to [<FontIcon icon="fas fa-globe"/>StackBlitz](https://stackblitz.com/) and create a new Node.js project by clicking on “Node.js Blank project” at the top of the screen. You should be looking at a new Node.js project in your browser window.

Go to the terminal of the StackBlitz project you just created and type the following in the terminal, and hit enter:

```sh
npm i typescript
```

This will install TypeScript and the tsc CLI tool into the StackBlitz Node.js project.

![You should be looking at something similar to this](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/typescript-stackblitz.png?resize=1024%2C456&ssl=1)

With TypeScript now installed initialize a TypeScript project by creating a <FontIcon icon="fas fa-file-lines"/>`.tsconfig` from running:

```sh
tsc --init
```

This will add a <FontIcon icon="iconfont icon-json"/>`tsconfig.json` file that is used to configure the TypeScript compiler. Open the “tsconfig.json” file and find and change “target”: “es2016” to “target”: “es5”. Save this file.

Next, change the extension of the <FontIcon icon="fa-brands fa-js"/>`index.js` file to <FontIcon icon="iconfont icon-typescript"/>`index.ts`. And replace the contents of the file with:

```ts
let count: number = 2;
```

Save the file and now let’s use the TypeScript compiler (i.e., tsc) to type check and compile/transpile the “index.ts” file to JavaScript.

In the terminal run:

```sh
tsc index.ts
```

This will create a new file called <FontIcon icon="fa-brands fa-js"/>`index.js`. Open the <FontIcon icon="fa-brands fa-js"/>`index.js` file and take note that the compiler removed the TypeScript type annotation “: number” and change “let” to “var” (Note that “let” was not yet supported in ES5).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/typescript-simple.png?resize=1024%2C489&ssl=1)

Next, let’s purposely create a TypeScript error so we can see the compiler report a type issue.

Replace the contents of the “index.ts” file with:

```ts
let count: string = 2;
```

Save this file.

TypeScript will certainly have an issue with this because the data type of 2 is not a string but a number.

Now run the compiler again using:

```sh
tsc index.ts
```

![Note that both the code editor (red squiggly line under “count”) and the “tsc” CLI tool are reporting a TypeScript error.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/typescript-error-1024x566.png?resize=1024%2C566&ssl=1)

In this short exercise, we used the TypeScript compiler to compile/transpile TypeScript to JavaScript and took note of the type-checking capabilities of the compiler as well as the editor.

**What is Type Checking?**

Type checking is the process of analyzing TypeScript syntax for TypeScript soundness based on TypeScript configurations as well as TypeScript type annotations or lack thereof.

This process can occur when compiling/transpiling using the “tsc” CLI tool or when authoring TypeScript code. For example, code editors like VSCode (via the language service) can use the TypeScript compiler in the background to perform type-checking in real-time:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/incorrect-type-error-1024x309.png?resize=1024%2C309&ssl=1)

Most developers use their code editor to do type checking in real-time and then use build tools to transpile “.ts” and “.tsx” files to “.js” files. For example, [<FontIcon icon="fas fa-globe"/>out of the box, Vite will compile both “.ts and “.tsx files to JavaScript files](https://vitejs.dev/guide/features.html#typescript)” but not perform type checking. It leaves that up to the code editor.

---

## What’s Next?

After reading this guide and consuming the learning material a possible next step would be to investigate the following tools that often go hand and hand with TypeScript:

<SiteInfo
  name="Prettier · Opinionated Code Formatter"
  desc="Opinionated Code Formatter"
  url="https://prettier.io/"
  logo="https://prettier.io/icon.png"
  preview="https://prettier.io/icon.png"/>

<SiteInfo
  name="typescript-eslint"
  desc="The tooling that enables ESLint and Prettier to support TypeScript."
  url="https://typescript-eslint.io/"
  logo="https://typescript-eslint.io/img/favicon/favicon-16x16.png"
  preview="https://typescript-eslint.io/img/logo-twitter-card.png"/>

Make sure to check out the [<FontIcon icon="fas fa-globe"/>learning path on TypeScript](https://frontendmasters.com/learn/typescript/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Complete Guide to Beginning with TypeScript",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-complete-guide-to-beginning-with-typescript.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
